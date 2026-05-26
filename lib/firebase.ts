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
  setDoc,
  onSnapshot,
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
export function getUserDocRef(uid: string): DocumentReference | null {
  if (!db) return null;
  return doc(db, 'users', uid, 'diary', 'state');
}

export { setDoc, onSnapshot };
export type { User };
