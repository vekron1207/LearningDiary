import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  type DocumentReference,
} from 'firebase/firestore';

/* All Firebase config values come from environment variables.
   Set these in .env.local for local dev, or in Vercel's dashboard for production. */
const cfg = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/* Gracefully disabled if env vars are not set */
export const isFirebaseConfigured = !!(cfg.apiKey && cfg.authDomain && cfg.projectId);

const app    = isFirebaseConfigured
  ? (getApps().length === 0 ? initializeApp(cfg) : getApps()[0])
  : null;

export const auth = app ? getAuth(app) : null;
export const db   = app ? getFirestore(app) : null;

/* ── Auth helpers ── */
export async function signInWithGoogle() {
  if (!auth) return;
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export async function signOutUser() {
  if (!auth) return;
  return signOut(auth);
}

export function onAuthChange(cb: (user: User | null) => void) {
  if (!auth) { cb(null); return () => {}; }
  return onAuthStateChanged(auth, cb);
}

/* ── Firestore helpers ── */
export function getUserDocRef(uid: string, trackId: string = 'job-switch'): DocumentReference | null {
  if (!db) return null;
  return doc(db, 'users', uid, 'diary', trackId);
}

export { setDoc, onSnapshot };
export type { User };

/* ── Friend sharing ── */

/** Deterministic 9-char code from UID: first 8 alphanumeric chars formatted as XXXX-XXXX */
export function generateFriendCode(uid: string): string {
  return (uid.slice(0, 4) + '-' + uid.slice(4, 8)).toUpperCase();
}

/** Register / update user profile so friends can look them up by code. Safe to call on every sign-in. */
export async function registerUserProfile(uid: string, displayName: string): Promise<void> {
  if (!db) return;
  const code = generateFriendCode(uid).replace('-', ''); // stored without dash for easy lookup
  await setDoc(doc(db, 'friendCodes', code), { uid, displayName }, { merge: true });
}

/** Resolve a friend code entered by the user → their uid + displayName, or null if not found. */
export async function resolveFriendCode(code: string): Promise<{ uid: string; displayName: string } | null> {
  if (!db) return null;
  const normalized = code.replace(/[-\s]/g, '').toUpperCase();
  const snap = await getDoc(doc(db, 'friendCodes', normalized));
  if (!snap.exists()) return null;
  return snap.data() as { uid: string; displayName: string };
}

/** Write a friend entry into the caller's friends subcollection. */
export async function addFriend(myUid: string, friendUid: string, friendDisplayName: string): Promise<void> {
  if (!db) return;
  await setDoc(doc(db, 'users', myUid, 'friends', friendUid), {
    displayName: friendDisplayName,
    addedAt: new Date().toISOString(),
  });
}

/** Real-time listener on the caller's friends list. Returns unsubscribe fn. */
export function onFriendsChange(
  uid: string,
  cb: (friends: import('./types').FriendInfo[]) => void,
): () => void {
  if (!db) { cb([]); return () => {}; }
  return onSnapshot(collection(db, 'users', uid, 'friends'), snap => {
    cb(snap.docs.map(d => ({
      uid: d.id,
      displayName: d.data().displayName as string,
      addedAt: d.data().addedAt as string,
    })));
  });
}

/** Fetch a friend's diary progress across all tracks (one-shot read). */
export async function getFriendProgress(
  friendUid: string,
): Promise<import('./types').FriendProgress> {
  if (!db) return {};
  const TRACK_IDS = ['job-switch', 'leetcode', 'javascript'];
  const result: import('./types').FriendProgress = {};
  await Promise.all(
    TRACK_IDS.map(async trackId => {
      try {
        const snap = await getDoc(doc(db!, 'users', friendUid, 'diary', trackId));
        if (snap.exists()) {
          const checks = (snap.data().checks ?? {}) as Record<string, boolean>;
          result[trackId] = { done: Object.values(checks).filter(Boolean).length, checks };
        }
      } catch { /* permission denied = friend hasn't shared yet */ }
    }),
  );
  return result;
}

/** Real-time listener on a friend's progress across all tracks. Returns unsubscribe fn. */
export function onFriendProgressChange(
  friendUid: string,
  cb: (progress: Record<string, { done: number; checks: Record<string, boolean> }>) => void,
): () => void {
  if (!db) { cb({}); return () => {}; }
  const TRACK_IDS = ['job-switch', 'leetcode', 'javascript'];
  const snaps: Record<string, { done: number; checks: Record<string, boolean> }> = {};
  const unsubs = TRACK_IDS.map(trackId =>
    onSnapshot(
      doc(db!, 'users', friendUid, 'diary', trackId),
      snap => {
        if (snap.exists()) {
          const checks = (snap.data().checks ?? {}) as Record<string, boolean>;
          snaps[trackId] = { done: Object.values(checks).filter(Boolean).length, checks };
        } else {
          delete snaps[trackId];
        }
        cb({ ...snaps });
      },
      () => { /* permission denied — friend hasn't shared */ },
    )
  );
  return () => unsubs.forEach(u => u());
}
