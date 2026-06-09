'use client';

import { useState, useEffect, useRef } from 'react';
import { TRACKS } from '@/lib/tracks';
import type { Track } from '@/lib/types';
import { isFirebaseConfigured, signInWithGoogle, signOutUser, onAuthChange, registerUserProfile, type User } from '@/lib/firebase';

function getTrackProgress(track: Track): { done: number; total: number } {
  try {
    const raw = localStorage.getItem(`learning-diary-${track.id}-v1`);
    if (!raw) return { done: 0, total: 0 };
    const data = JSON.parse(raw) as { checks?: Record<string, boolean> };
    const checks = data.checks ?? {};
    const total = track.phases.flatMap(p => p.sections.flatMap(s => s.items)).length + track.resources.length;
    const done = Object.values(checks).filter(Boolean).length;
    return { done, total };
  } catch {
    return { done: 0, total: 0 };
  }
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function FriendsIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrackCard({ track, onSelect }: { track: Track; onSelect: () => void }) {
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  useEffect(() => {
    setProgress(getTrackProgress(track));
  }, [track]);

  const pct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;
  const started = progress.done > 0;

  return (
    <div
      className="track-card"
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect()}
      style={{ '--track-color': track.color } as React.CSSProperties}
    >
      <div className="track-icon-area">
        <div className="track-icon-halo" />
        <div className="track-monogram" style={{ background: track.color }}>
          {track.id === 'javascript' ? 'JS' : track.id === 'leetcode' ? 'LC' : 'JR'}
        </div>
      </div>
      <div className="track-card-body">
        <div className="track-card-text">
          <h2 className="track-name">{track.label}</h2>
          <p className="track-desc">{track.description}</p>
        </div>

        <div className="track-stats">
          <div className="track-progress-bar">
            <div
              className="track-progress-fill"
              style={{ width: `${pct}%`, background: track.color }}
            />
          </div>
          <div className="track-progress-meta">
            {started ? (
              <>
                <span className="track-pct-label" style={{ color: track.color }}>{pct}%</span>
                <span className="track-stat-text">{progress.done}/{progress.total} done</span>
              </>
            ) : (
              <span className="track-stat-text">{progress.total} items</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeScreen({
  onSelectTrack,
  onShowProfile,
  isDark,
  onToggleDark,
}: {
  onSelectTrack: (id: string) => void;
  onShowProfile: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return onAuthChange(setUser);
  }, []);

  useEffect(() => {
    if (!user || !isFirebaseConfigured) return;
    registerUserProfile(user.uid, user.displayName ?? user.email ?? 'User').catch(() => {});
  }, [user]);

  useEffect(() => {
    if (!showMenu) return;
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current?.contains(e.target as Node)) return;
      setShowMenu(false);
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showMenu]);

  return (
    <div className={`diary home-screen${isDark ? ' dark' : ''}`}>
      <div className="home-blobs" aria-hidden="true">
        <div className="home-blob home-blob-green" />
        <div className="home-blob home-blob-orange" />
        <div className="home-blob home-blob-yellow" />
      </div>
      <header className="diary-header">
        <div className="header-inner">
          <div className="header-left">
            <span className="diary-title">Learning Diary</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="theme-toggle" onClick={onToggleDark} title={isDark ? 'Light mode' : 'Dark mode'}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            {isFirebaseConfigured && !user && (
              <button className="sync-btn" onClick={() => signInWithGoogle()}>
                <GoogleIcon />
                Sync
              </button>
            )}
            {user && (
              <div style={{ position: 'relative' }}>
                <button
                  className="avatar-trigger"
                  onClick={() => setShowMenu(v => !v)}
                  aria-label="Account menu"
                >
                  <div className="avatar-circle">
                    {(user.displayName ?? user.email ?? 'U')[0].toUpperCase()}
                  </div>
                </button>
                {showMenu && (
                  <div ref={dropdownRef} className="user-dropdown" role="menu">
                    <div className="dropdown-profile">
                      <div className="avatar-circle-lg">
                        {(user.displayName ?? user.email ?? 'U')[0].toUpperCase()}
                      </div>
                      <div>
                        {user.displayName && <div className="dropdown-name">{user.displayName}</div>}
                        <div className="dropdown-email">{user.email}</div>
                      </div>
                    </div>
                    <button className="dropdown-item-btn" onClick={() => { setShowMenu(false); onShowProfile(); }}>
                      <FriendsIcon />
                      Friends &amp; Progress
                    </button>
                    <button className="dropdown-signout-btn" onClick={() => { signOutUser(); setShowMenu(false); }}>
                      <SignOutIcon />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="diary-main">
        <div className="diary-content home-content">
          <div className="home-intro">
            <div className="home-eyebrow">
              <span className="home-eyebrow-line" />
              <span className="home-eyebrow-text">Learning Diary</span>
            </div>
            <h1 className="home-title">What are you<br />learning today?</h1>
          </div>
          <div className="track-grid">
            {TRACKS.map(track => (
              <TrackCard
                key={track.id}
                track={track}
                onSelect={() => onSelectTrack(track.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
