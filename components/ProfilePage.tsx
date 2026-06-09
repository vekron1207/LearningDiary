'use client';

import { useState, useEffect, useCallback } from 'react';
import { TRACKS } from '@/lib/tracks';
import type { FriendInfo, FriendProgress } from '@/lib/types';
import {
  isFirebaseConfigured,
  signInWithGoogle,
  signOutUser,
  onAuthChange,
  generateFriendCode,
  registerUserProfile,
  resolveFriendCode,
  addFriend,
  onFriendsChange,
  getFriendProgress,
  type User,
} from '@/lib/firebase';

function getTrackTotal(trackId: string): number {
  const track = TRACKS.find(t => t.id === trackId);
  if (!track) return 1;
  return track.phases.flatMap(p => p.sections.flatMap(s => s.items)).length + track.resources.length;
}

function getMonogram(trackId: string): string {
  if (trackId === 'javascript') return 'JS';
  if (trackId === 'leetcode') return 'LC';
  return 'JR';
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return ''; }
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

function SignOutIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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

function FriendCard({ friend, progress }: { friend: FriendInfo; progress: FriendProgress }) {
  const initial = (friend.displayName || 'F')[0].toUpperCase();
  return (
    <div className="friend-card">
      <div className="friend-card-header">
        <div className="friend-avatar">{initial}</div>
        <div className="friend-card-meta">
          <span className="friend-name">{friend.displayName}</span>
          {friend.addedAt && (
            <span className="friend-since">added {formatDate(friend.addedAt)}</span>
          )}
        </div>
      </div>
      <div className="friend-tracks">
        {TRACKS.map(track => {
          const snap = progress[track.id];
          const done = snap?.done ?? 0;
          const total = getTrackTotal(track.id);
          const pct = total ? Math.round((done / total) * 100) : 0;
          return (
            <div key={track.id} className="friend-track-row">
              <div className="friend-track-monogram" style={{ background: track.color }}>
                {getMonogram(track.id)}
              </div>
              <div className="friend-track-bar-wrap">
                <div
                  className="friend-track-bar-fill"
                  style={{ width: `${pct}%`, background: track.color }}
                />
              </div>
              <span className="friend-track-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProfilePage({ onBack, isDark, onToggleDark }: {
  onBack: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<FriendInfo[]>([]);
  const [friendProgress, setFriendProgress] = useState<Record<string, FriendProgress>>({});
  const [codeInput, setCodeInput] = useState('');
  const [addStatus, setAddStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [addMessage, setAddMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return onAuthChange(u => setUser(u));
  }, []);

  useEffect(() => {
    if (!user || !isFirebaseConfigured) return;
    registerUserProfile(user.uid, user.displayName ?? user.email ?? 'User').catch(() => {});
  }, [user]);

  useEffect(() => {
    if (!user || !isFirebaseConfigured) return;
    return onFriendsChange(user.uid, setFriends);
  }, [user]);

  const loadProgress = useCallback((friend: FriendInfo) => {
    setFriendProgress(prev => {
      if (prev[friend.uid]) return prev; // already loaded
      getFriendProgress(friend.uid).then(p => {
        setFriendProgress(curr => ({ ...curr, [friend.uid]: p }));
      });
      return prev;
    });
  }, []);

  useEffect(() => {
    friends.forEach(loadProgress);
  }, [friends, loadProgress]);

  async function handleAddFriend() {
    if (!user || !codeInput.trim()) return;
    setAddStatus('loading');
    setAddMessage('');
    try {
      const result = await resolveFriendCode(codeInput.trim());
      if (!result) {
        setAddStatus('error');
        setAddMessage('Code not found. Double-check and try again.');
        return;
      }
      if (result.uid === user.uid) {
        setAddStatus('error');
        setAddMessage("That's your own code!");
        return;
      }
      if (friends.some(f => f.uid === result.uid)) {
        setAddStatus('error');
        setAddMessage(`${result.displayName} is already in your friends list.`);
        return;
      }
      await addFriend(user.uid, result.uid, result.displayName);
      setAddStatus('success');
      setAddMessage(`Added ${result.displayName}!`);
      setCodeInput('');
      setTimeout(() => { setAddStatus('idle'); setAddMessage(''); }, 3000);
    } catch {
      setAddStatus('error');
      setAddMessage('Something went wrong. Please try again.');
    }
  }

  function copyCode() {
    if (!user) return;
    const code = generateFriendCode(user.uid);
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }

  const friendCode = user ? generateFriendCode(user.uid) : '';

  return (
    <div className={`diary${isDark ? ' dark' : ''}`}>
      <header className="diary-header">
        <div className="header-inner">
          <div className="header-left">
            <button className="back-btn" onClick={onBack}>
              ← <span className="back-label">Home</span>
            </button>
            <span className="diary-title">Learning Diary</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="theme-toggle" onClick={onToggleDark}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            {user && (
              <button className="sync-btn" onClick={() => signOutUser()} title="Sign out">
                <SignOutIcon />
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="diary-main">
        <div className="diary-content profile-content">

          {!isFirebaseConfigured && (
            <div className="profile-notice">
              Firebase is not configured. Friend sharing requires a Firebase project.
            </div>
          )}

          {isFirebaseConfigured && !user && (
            <div className="profile-signin-gate">
              <p className="profile-signin-text">Sign in to generate your share code and follow friends.</p>
              <button className="sync-btn" style={{ fontSize: '14px', padding: '10px 18px' }} onClick={() => signInWithGoogle()}>
                <GoogleIcon />
                Sign in with Google
              </button>
            </div>
          )}

          {isFirebaseConfigured && user && (
            <>
              {/* Your share code */}
              <section className="profile-section">
                <h2 className="profile-section-title">Your share code</h2>
                <div className="friend-code-card">
                  <p className="friend-code-hint">
                    Give this code to friends — they enter it to follow your learning progress.
                  </p>
                  <div className="friend-code-display">
                    <span className="friend-code">{friendCode}</span>
                    <button className={`friend-code-copy${copied ? ' copied' : ''}`} onClick={copyCode}>
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </section>

              {/* Add a friend */}
              <section className="profile-section">
                <h2 className="profile-section-title">Add a friend</h2>
                <div className="add-friend-card">
                  <div className="add-friend-row">
                    <input
                      className="friend-code-input"
                      value={codeInput}
                      onChange={e => setCodeInput(e.target.value.toUpperCase())}
                      onKeyDown={e => e.key === 'Enter' && handleAddFriend()}
                      placeholder="XXXX-XXXX"
                      maxLength={9}
                      spellCheck={false}
                    />
                    <button
                      className="add-friend-btn"
                      onClick={handleAddFriend}
                      disabled={addStatus === 'loading' || !codeInput.trim()}
                    >
                      {addStatus === 'loading' ? 'Adding…' : 'Add'}
                    </button>
                  </div>
                  {addMessage && (
                    <p className={`add-friend-msg ${addStatus}`}>{addMessage}</p>
                  )}
                </div>
              </section>

              {/* Friends list */}
              <section className="profile-section">
                <h2 className="profile-section-title">
                  Friends{friends.length > 0 ? ` · ${friends.length}` : ''}
                </h2>
                {friends.length === 0 ? (
                  <p className="profile-empty-hint">
                    No friends added yet. Share your code above to get started.
                  </p>
                ) : (
                  <div className="friends-list">
                    {friends.map(friend => (
                      <FriendCard
                        key={friend.uid}
                        friend={friend}
                        progress={friendProgress[friend.uid] ?? {}}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
