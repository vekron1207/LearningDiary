'use client';

import { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { TRACKS } from '@/lib/tracks';
import type { FriendInfo } from '@/lib/types';
import {
  isFirebaseConfigured,
  onAuthChange,
  onFriendsChange,
  onFriendProgressChange,
  type User,
} from '@/lib/firebase';

/* ── Types ── */
interface TrackSnap {
  done: number;
  total: number;
  checks: Record<string, boolean>;
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  isMe: boolean;
  rank: number;
  totalDone: number;
  totalItems: number;
  pct: number;
  byTrack: Record<string, TrackSnap>;
}

type FriendSnap = Record<string, { done: number; checks: Record<string, boolean> }>;

interface ContextValue {
  leaderboard: LeaderboardEntry[];
  competitiveMessage: string;
  getFriendsDoneItem: (trackId: string, itemId: string) => Array<{ uid: string; displayName: string }>;
  refreshMyProgress: () => void;
}

/* ── Color utility (exported for FriendDots) ── */
const ACCENT_COLORS = [
  '#E85D04', '#DC2626', '#7C3AED', '#2563EB',
  '#0891B2', '#059669', '#CA8A04', '#DB2777',
];

export function getFriendColor(uid: string): string {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = ((hash * 31) + uid.charCodeAt(i)) >>> 0;
  return ACCENT_COLORS[hash % ACCENT_COLORS.length];
}

/* ── Internal helpers ── */
const TRACK_IDS = TRACKS.map(t => t.id);

function getTrackTotal(trackId: string): number {
  const track = TRACKS.find(t => t.id === trackId);
  if (!track) return 1;
  return track.phases.flatMap(p => p.sections.flatMap(s => s.items)).length + track.resources.length;
}

const TOTAL_ALL_ITEMS = TRACKS.reduce((sum, t) => sum + getTrackTotal(t.id), 0);

function readLocalProgress(): FriendSnap {
  if (typeof window === 'undefined') return {};
  const result: FriendSnap = {};
  for (const trackId of TRACK_IDS) {
    try {
      const raw = localStorage.getItem(`learning-diary-${trackId}-v1`);
      if (raw) {
        const data = JSON.parse(raw);
        const checks = (data.checks ?? {}) as Record<string, boolean>;
        result[trackId] = { done: Object.values(checks).filter(Boolean).length, checks };
      }
    } catch { /* ignore */ }
  }
  return result;
}

function buildLeaderboard(
  meUser: User | null,
  mySnaps: FriendSnap,
  friends: FriendInfo[],
  friendsSnaps: Record<string, FriendSnap>,
): LeaderboardEntry[] {
  const entries: Omit<LeaderboardEntry, 'rank'>[] = [];

  if (meUser) {
    const byTrack: Record<string, TrackSnap> = {};
    let totalDone = 0;
    for (const trackId of TRACK_IDS) {
      const s = mySnaps[trackId];
      const total = getTrackTotal(trackId);
      const done = s?.done ?? 0;
      totalDone += done;
      byTrack[trackId] = { done, total, checks: s?.checks ?? {} };
    }
    entries.push({
      uid: meUser.uid,
      displayName: meUser.displayName ?? meUser.email ?? 'You',
      isMe: true,
      totalDone,
      totalItems: TOTAL_ALL_ITEMS,
      pct: TOTAL_ALL_ITEMS ? Math.round((totalDone / TOTAL_ALL_ITEMS) * 100) : 0,
      byTrack,
    });
  }

  for (const friend of friends) {
    const snaps = friendsSnaps[friend.uid] ?? {};
    const byTrack: Record<string, TrackSnap> = {};
    let totalDone = 0;
    for (const trackId of TRACK_IDS) {
      const s = snaps[trackId];
      const total = getTrackTotal(trackId);
      const done = s?.done ?? 0;
      totalDone += done;
      byTrack[trackId] = { done, total, checks: s?.checks ?? {} };
    }
    entries.push({
      uid: friend.uid,
      displayName: friend.displayName,
      isMe: false,
      totalDone,
      totalItems: TOTAL_ALL_ITEMS,
      pct: TOTAL_ALL_ITEMS ? Math.round((totalDone / TOTAL_ALL_ITEMS) * 100) : 0,
      byTrack,
    });
  }

  entries.sort((a, b) => b.totalDone - a.totalDone);
  return entries.map((e, i) => ({ ...e, rank: i + 1 }));
}

function buildCompetitiveMessage(lb: LeaderboardEntry[]): string {
  const me = lb.find(e => e.isMe);
  if (!me || lb.length < 2) return '';
  if (me.rank === 1) {
    const gap = me.totalDone - lb[1].totalDone;
    if (gap === 0) return "Dead even — one item decides it! ⚡";
    return `You're leading by ${gap} item${gap === 1 ? '' : 's'}! Keep the pressure on 🔥`;
  }
  const gap = lb[0].totalDone - me.totalDone;
  if (gap <= 3)  return `So close! ${gap} item${gap === 1 ? '' : 's'} to first place 💪`;
  if (gap <= 15) return `${gap} items behind. Time to grind 💻`;
  return `${gap} items behind. The climb starts now 🚀`;
}

/* ── Context ── */
const FriendsProgressContext = createContext<ContextValue>({
  leaderboard: [],
  competitiveMessage: '',
  getFriendsDoneItem: () => [],
  refreshMyProgress: () => {},
});

export function useFriendsProgress() {
  return useContext(FriendsProgressContext);
}

export function FriendsProgressProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]             = useState<User | null>(null);
  const [friends, setFriends]       = useState<FriendInfo[]>([]);
  const [friendsSnaps, setFriends$] = useState<Record<string, FriendSnap>>({});
  const [tick, setTick]             = useState(0);

  const subsRef = useRef<Record<string, () => void>>({});

  /* Auth */
  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return onAuthChange(u => setUser(u));
  }, []);

  /* Friends list */
  useEffect(() => {
    if (!user || !isFirebaseConfigured) return;
    return onFriendsChange(user.uid, setFriends);
  }, [user]);

  /* Per-friend Firestore subscriptions */
  useEffect(() => {
    const currentUids = new Set(friends.map(f => f.uid));

    for (const uid of Object.keys(subsRef.current)) {
      if (!currentUids.has(uid)) {
        subsRef.current[uid]();
        delete subsRef.current[uid];
        setFriends$(prev => { const n = { ...prev }; delete n[uid]; return n; });
      }
    }

    for (const friend of friends) {
      if (subsRef.current[friend.uid]) continue;
      subsRef.current[friend.uid] = onFriendProgressChange(friend.uid, snaps => {
        setFriends$(prev => ({ ...prev, [friend.uid]: snaps }));
      });
    }
  }, [friends]);

  /* Full cleanup on unmount */
  useEffect(() => {
    const subs = subsRef.current;
    return () => { Object.values(subs).forEach(u => u()); };
  }, []);

  /* Auto-refresh when DiaryApp saves to localStorage */
  useEffect(() => {
    const handler = () => setTick(t => t + 1);
    window.addEventListener('diary-progress-updated', handler);
    return () => window.removeEventListener('diary-progress-updated', handler);
  }, []);

  const refreshMyProgress = useCallback(() => setTick(t => t + 1), []);

  const leaderboard = useMemo(() => {
    void tick; // re-read localStorage when tick bumps
    return buildLeaderboard(user, readLocalProgress(), friends, friendsSnaps);
  }, [user, friends, friendsSnaps, tick]);

  const competitiveMessage = useMemo(() => buildCompetitiveMessage(leaderboard), [leaderboard]);

  const getFriendsDoneItem = useCallback((trackId: string, itemId: string) => {
    return friends
      .filter(f => friendsSnaps[f.uid]?.[trackId]?.checks?.[itemId] === true)
      .map(f => ({ uid: f.uid, displayName: f.displayName }));
  }, [friends, friendsSnaps]);

  return (
    <FriendsProgressContext.Provider value={{ leaderboard, competitiveMessage, getFriendsDoneItem, refreshMyProgress }}>
      {children}
    </FriendsProgressContext.Provider>
  );
}
