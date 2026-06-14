'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Item, Phase, Section, StoredState, Track } from '@/lib/types';
import FriendDots from './FriendDots';
import QuizView from './QuizView';
import {
  isFirebaseConfigured,
  signInWithGoogle,
  signOutUser,
  onAuthChange,
  getUserDocRef,
  setDoc,
  onSnapshot,
  registerUserProfile,
  type User,
} from '@/lib/firebase';


type FilterType = 'all' | 'todo' | 'done';
type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

/* Unique ID per browser tab — detects Firestore echo from our own saves */
const DEVICE_ID = typeof window !== 'undefined'
  ? (() => {
      const k = 'diary-device-id';
      const e = sessionStorage.getItem(k);
      if (e) return e;
      const id = Math.random().toString(36).slice(2);
      sessionStorage.setItem(k, id);
      return id;
    })()
  : 'ssr';

/* ── Phase theme tokens ── */
/* On OLED black, phase colours become faint colour washes — just enough to signal the phase */
const PHASE_THEME: Record<string, {
  color: string; light: string; border: string;
  darkBg: string; darkBorder: string;
  /* Brighter variant for text/indicators on OLED black */
  bright: string;
}> = {
  proj: { color: '#3B82F6', light: '#EFF6FF', border: '#3B82F633', darkBg: '#030912', darkBorder: '#3B82F622', bright: '#60A5FA' },
  p1:   { color: '#22C55E', light: '#F0FDF4', border: '#22C55E33', darkBg: '#020C05', darkBorder: '#22C55E22', bright: '#4ADE80' },
  p2:   { color: '#6366F1', light: '#EEF2FF', border: '#6366F133', darkBg: '#05040F', darkBorder: '#6366F122', bright: '#818CF8' },
  p3:   { color: '#F97316', light: '#FFF7ED', border: '#F9731633', darkBg: '#0D0500', darkBorder: '#F9731622', bright: '#FB923C' },
  p4:   { color: '#F43F5E', light: '#FFF1F2', border: '#F43F5E33', darkBg: '#0D0204', darkBorder: '#F43F5E22', bright: '#FB7185' },
};

function getSyntheticTheme(color: string, darkColor: string) {
  return { color, light: color + '15', border: color + '33', darkBg: '#050505', darkBorder: color + '22', bright: darkColor };
}

function getWeekNumber(startDate: string): number {
  if (!startDate) return 1;
  const diff = Date.now() - new Date(startDate).getTime();
  return Math.min(Math.max(1, Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1), 30);
}

/* ── Icons ── */
function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M5 2H2C1.44772 2 1 2.44772 1 3V10C1 10.5523 1.44772 11 2 11H9C9.55228 11 10 10.5523 10 10V7M7 1H11M11 1V5M11 1L5 7"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.22s ease', flexShrink: 0 }}>
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M8 1a5 5 0 0 1 3.47 8.53l-.47.47V12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1.99l-.47-.48A5 5 0 0 1 8 1ZM6.5 13.5h3M7.25 13.5v1h1.5v-1"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function UnlockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 11V7a5 5 0 0 1 9.9-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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

/* ── Custom Checkbox ── */
function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`custom-cb${checked ? ' checked' : ''}`}
    >
      {checked && (
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

const LANG_ORDER = ['python', 'java', 'javascript'] as const;
type SolutionLang = typeof LANG_ORDER[number];
const LANG_LABEL: Record<SolutionLang, string> = { python: 'Python', java: 'Java', javascript: 'JavaScript' };

/* ── Item Row ── */
function ItemRow({ item, checked, onToggle, trackId }: { item: Item; checked: boolean; onToggle: () => void; trackId: string }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [solutionLang, setSolutionLang] = useState<SolutionLang>('python');

  // Prefer multi-lang `solutions`, fall back to legacy `solution` (Python-only)
  const s = item.solutions ?? (item.solution ? { python: item.solution } : undefined);
  const availLangs = s ? LANG_ORDER.filter(l => !!s[l]) : [];
  const hasSolution = availLangs.length > 0;
  const activeLang: SolutionLang = availLangs.includes(solutionLang) ? solutionLang : (availLangs[0] ?? 'python');
  const currentCode = s ? (s[activeLang] ?? '') : '';

  return (
    <div className={`item-row${checked ? ' completed' : ''}`}>
      <Checkbox checked={checked} onChange={onToggle} />
      <div className="item-content">
        <div className="item-top">
          {item.tag && <span className={`diff-badge diff-${item.tag}`}>{item.tag}</span>}
          <span className="item-text">{item.text}</span>
          <FriendDots trackId={trackId} itemId={item.id} />
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="item-link" title="Open reference">
              <ExternalIcon />
            </a>
          )}
          {item.details && (
            <button
              className="details-toggle"
              onClick={() => setDetailsOpen(v => !v)}
              aria-expanded={detailsOpen}
              title={detailsOpen ? 'Hide details' : 'Show details'}
            >
              <ChevronIcon open={detailsOpen} />
            </button>
          )}
        </div>
        {item.note && (
          <div className="item-note">
            <BulbIcon />
            {item.note}
          </div>
        )}
        {item.details && (
          <div className={`item-details${detailsOpen ? ' open' : ''}`}>
            <div className="item-details-inner">{item.details}</div>
          </div>
        )}
        {hasSolution && checked && (
          <div className="solution-wrap">
            <button
              className={`reveal-btn${solutionOpen ? ' open' : ''}`}
              onClick={() => setSolutionOpen(v => !v)}
              aria-expanded={solutionOpen}
            >
              {solutionOpen ? <UnlockIcon /> : <LockIcon />}
              {solutionOpen ? 'Hide solution' : 'Reveal solution'}
            </button>
            {solutionOpen && (
              <div className="solution-code-wrap" data-lang={activeLang}>
                <div className="solution-lang-tabs">
                  {availLangs.map(lang => (
                    <button
                      key={lang}
                      data-lang={lang}
                      className={`solution-lang-tab${activeLang === lang ? ' active' : ''}`}
                      onClick={() => setSolutionLang(lang)}
                    >
                      {LANG_LABEL[lang]}
                    </button>
                  ))}
                </div>
                <pre className="solution-code">{currentCode}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Section Card ── */
function SectionCard({
  section, sectionIndex, isOpen, onToggle, checks, onItemToggle, filter, phaseColor, trackId,
}: {
  section: Section; sectionIndex: number; isOpen: boolean; onToggle: () => void;
  checks: Record<string, boolean>; onItemToggle: (id: string) => void;
  filter: FilterType; phaseColor: string; trackId: string;
}) {
  const done    = section.items.filter(i => checks[i.id]).length;
  const total   = section.items.length;
  const allDone = done === total;
  const pct     = total ? Math.round((done / total) * 100) : 0;

  const visibleItems = section.items.filter(item => {
    if (filter === 'todo') return !checks[item.id];
    if (filter === 'done') return !!checks[item.id];
    return true;
  });

  if (filter !== 'all' && visibleItems.length === 0) return null;

  return (
    <div
      className={`section-card${allDone ? ' all-done' : ''}`}
      style={{ borderLeftColor: allDone ? undefined : phaseColor }}
    >
      <button className="section-header" onClick={onToggle}>
        <div className="section-header-left">
          <span className="section-index">{String(sectionIndex).padStart(2, '0')}</span>
          <div className="section-title-wrap">
            <span className="section-title">{section.title}</span>
            <span className="section-week">{section.week}</span>
          </div>
        </div>
        <div className="section-header-right">
          <div className="section-mini-bar">
            <div className="section-mini-fill" style={{ width: `${pct}%`, background: allDone ? '#16A34A' : phaseColor }} />
          </div>
          <span className="section-count" style={{ color: allDone ? '#15803D' : undefined }}>
            {done}/{total}
          </span>
          <ChevronIcon open={isOpen} />
        </div>
      </button>

      <div className={`section-body${isOpen ? ' open' : ''}`}>
        <div className="section-body-inner">
          <div className="item-list">
            {visibleItems.map(item => (
              <ItemRow
                key={item.id}
                item={item}
                checked={!!checks[item.id]}
                onToggle={() => onItemToggle(item.id)}
                trackId={trackId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Phase Summary Panel ── */
function PhaseSummaryPanel({ phase, checks, theme, isDark }: {
  phase: Phase; checks: Record<string, boolean>;
  theme: typeof PHASE_THEME[string]; isDark: boolean;
}) {
  const allItems  = phase.sections.flatMap(s => s.items);
  const done      = allItems.filter(i => checks[i.id]).length;
  const total     = allItems.length;
  const pct       = total ? Math.round((done / total) * 100) : 0;
  const accent    = isDark ? theme.bright : theme.color;

  return (
    <div className="phase-summary" style={{
      background:  isDark ? theme.darkBg    : theme.light,
      borderColor: isDark ? theme.darkBorder : theme.border,
    }}>
      <div className="phase-summary-header">
        <div>
          <div className="phase-summary-label">{phase.label} · {phase.weeks}</div>
          <div className="phase-summary-stat">
            <span style={{ color: accent }}>{done}</span>
            <span className="phase-summary-of">/{total} complete</span>
          </div>
        </div>
        <div className="phase-summary-pct" style={{ color: accent }}>{pct}%</div>
      </div>

      <div className="phase-progress-bar">
        <div className="phase-progress-fill" style={{ width: `${pct}%`, background: accent }} />
      </div>

      <div className="phase-sections-grid">
        {phase.sections.map(sec => {
          const sDone  = sec.items.filter(i => checks[i.id]).length;
          const sTotal = sec.items.length;
          const sPct   = sTotal ? Math.round((sDone / sTotal) * 100) : 0;
          return (
            <div key={sec.id} className="phase-section-stat">
              <div className="phase-section-name">{sec.title}</div>
              <div className="phase-section-bar">
                <div className="phase-section-fill" style={{ width: `${sPct}%`, background: accent }} />
              </div>
              <div className="phase-section-count">{sDone}/{sTotal}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Resources View ── */
function ResourcesView({ resources, checks, onToggle }: {
  resources: import('@/lib/types').Resource[];
  checks: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const done = resources.filter(r => checks[r.id]).length;
  return (
    <div className="resources-view">
      <div className="resources-header">
        <h2 className="resources-title">Resources</h2>
        <span className="resources-count">{done}/{resources.length} bookmarked</span>
      </div>
      <div className="resources-grid">
        {resources.map(r => (
          <div key={r.id} className={`resource-card${checks[r.id] ? ' done' : ''}`}>
            <div className="resource-card-top">
              <Checkbox checked={!!checks[r.id]} onChange={() => onToggle(r.id)} />
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                {r.text}
                <ExternalIcon />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Sync status dot ── */
function SyncDot({ status, dotOnly = false }: { status: SyncStatus; dotOnly?: boolean }) {
  const label = status === 'synced' ? 'Synced' : status === 'syncing' ? 'Saving…' : status === 'error' ? 'Sync error' : '';
  return (
    <>
      <span className={`sync-dot ${status}`} />
      {!dotOnly && label && <span className="sync-label">{label}</span>}
    </>
  );
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */
function FriendsIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function DiaryApp({ track, onBack, onShowProfile, isDark, onToggleDark }: {
  track: Track;
  onBack: () => void;
  onShowProfile: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}) {
  const STORAGE_KEY = `learning-diary-${track.id}-v1`;

  const [checks,       setChecks]       = useState<Record<string, boolean>>({});
  const [completedAt,  setCompletedAt]  = useState<Record<string, string>>({});
  const [activeTab,    setActiveTab]    = useState<string>(track.phases[0].id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [startDate,    setStartDate]    = useState<string>('');
  const [filter,       setFilter]       = useState<FilterType>('all');
  const [isLoaded,     setIsLoaded]     = useState(false);

  /* Sync state */
  const [user,         setUser]         = useState<User | null>(null);
  const [syncStatus,   setSyncStatus]   = useState<SyncStatus>('idle');
  const [showUserMenu, setShowUserMenu] = useState(false);
  /* Gate saves until first Firestore snapshot is received — prevents a device
     with no local progress from overwriting a higher-progress remote document */
  const [syncReady,    setSyncReady]    = useState(false);

  const firestoreUnsubRef = useRef<(() => void) | null>(null);
  const saveTimerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRemoteRef     = useRef<string>('');
  const menuRef           = useRef<HTMLDivElement>(null);

  /* ── 1. Load all state from localStorage on mount ── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as StoredState;
        setChecks(data.checks        ?? {});
        setCompletedAt(data.completedAt ?? {});
        if (data.activeTab)   setActiveTab(data.activeTab);
        setOpenSections(data.openSections ?? {});
        setStartDate(data.startDate || new Date().toISOString());
      } else {
        setStartDate(new Date().toISOString());
      }
    } catch {
      setStartDate(new Date().toISOString());
    }
    setIsLoaded(true);
  }, []);

  /* ── 2. Persist everything to localStorage + notify leaderboard context ── */
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ checks, completedAt, activeTab, openSections, startDate }));
    } catch { /* quota exceeded */ }
    window.dispatchEvent(new CustomEvent('diary-progress-updated'));
  }, [checks, completedAt, activeTab, openSections, startDate, isLoaded]);

  /* ── 3. Firebase auth + Firestore real-time subscription ── */
  useEffect(() => {
    if (!isFirebaseConfigured || !isLoaded) return;

    const unsubAuth = onAuthChange((newUser) => {
      setUser(newUser);
      if (firestoreUnsubRef.current) { firestoreUnsubRef.current(); firestoreUnsubRef.current = null; }
      if (!newUser) { setSyncStatus('idle'); setSyncReady(false); return; }

      registerUserProfile(newUser.uid, newUser.displayName ?? newUser.email ?? 'User').catch(() => {});
      setSyncReady(false); // wait for first snapshot before allowing saves
      const docRef = getUserDocRef(newUser.uid, track.id);
      if (!docRef) return;

      setSyncStatus('syncing');
      const unsub = onSnapshot(docRef, (snap) => {
        if (!snap.exists()) {
          /* No remote doc yet — safe to start saving local progress */
          setSyncReady(true);
          setSyncStatus('synced');
          return;
        }
        const data = snap.data();
        if (data.deviceId === DEVICE_ID) { setSyncStatus('synced'); return; }

        /* Merge strategy: an item is checked if it's checked on EITHER device.
           Progress only moves forward — a device with less progress never
           overwrites a device with more progress. */
        setChecks(local => {
          const remote = data.checks ?? {};
          const merged: Record<string, boolean> = {};
          for (const key of new Set([...Object.keys(remote), ...Object.keys(local)])) {
            merged[key] = !!(remote[key] || local[key]);
          }
          return merged;
        });
        /* completedAt: keep local timestamp for conflicts (set on this device),
           pull in any keys that only exist remotely */
        setCompletedAt(local => ({ ...(data.completedAt ?? {}), ...local }));
        if (data.startDate) setStartDate(data.startDate);

        /* Set lastRemoteRef to the raw remote snapshot so the save effect will
           push the merged result back if local had extra progress */
        lastRemoteRef.current = JSON.stringify({
          checks:      data.checks      ?? {},
          completedAt: data.completedAt ?? {},
          startDate:   data.startDate   ?? '',
        });
        setSyncReady(true);
        setSyncStatus('synced');
      }, () => setSyncStatus('error'));

      firestoreUnsubRef.current = unsub;
    });

    return () => { unsubAuth(); if (firestoreUnsubRef.current) firestoreUnsubRef.current(); };
  }, [isLoaded]);

  /* ── 5. Save synced fields to Firestore (debounced 1 s) ── */
  useEffect(() => {
    if (!isLoaded || !user || !isFirebaseConfigured || !syncReady) return;
    const currentSnapshot = JSON.stringify({ checks, completedAt, startDate });
    if (currentSnapshot === lastRemoteRef.current) return;

    setSyncStatus('syncing');
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(async () => {
      const docRef = getUserDocRef(user.uid, track.id);
      if (!docRef) return;
      try {
        await setDoc(docRef, { checks, completedAt, startDate, deviceId: DEVICE_ID, updatedAt: new Date().toISOString() });
        lastRemoteRef.current = currentSnapshot;
        setSyncStatus('synced');
      } catch { setSyncStatus('error'); }
    }, 1000);

    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [checks, completedAt, startDate, isLoaded, user, syncReady]);

  /* ── 6. Close user menu on outside click or Escape ── */
  useEffect(() => {
    if (!showUserMenu) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowUserMenu(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowUserMenu(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => { document.removeEventListener('mousedown', handleClick); document.removeEventListener('keydown', handleKey); };
  }, [showUserMenu]);

  /* ── Handlers ── */
  const toggleCheck = useCallback((id: string) => {
    setChecks(prev => {
      const next = { ...prev, [id]: !prev[id] };
      setCompletedAt(ca => {
        if (next[id]) return { ...ca, [id]: new Date().toISOString() };
        const u = { ...ca }; delete u[id]; return u;
      });
      return next;
    });
  }, []);

  const toggleSection = useCallback((id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const expandAll = useCallback((phase: Phase) => {
    setOpenSections(prev => { const n = { ...prev }; phase.sections.forEach(s => { n[s.id] = true; }); return n; });
  }, []);

  const collapseAll = useCallback((phase: Phase) => {
    setOpenSections(prev => { const n = { ...prev }; phase.sections.forEach(s => { n[s.id] = false; }); return n; });
  }, []);

  const switchTab = useCallback((id: string) => { setActiveTab(id); setFilter('all'); }, []);

  const toggleTheme = onToggleDark;

  const handleSignIn  = useCallback(async () => { try { await signInWithGoogle(); } catch { /* cancelled */ } }, []);
  const handleSignOut = useCallback(async () => { await signOutUser(); setSyncStatus('idle'); }, []);

  /* ── Derived values ── */
  const allLearningItems = useMemo(() => track.phases.flatMap(p => p.sections.flatMap(s => s.items)), [track]);
  const totalItems  = allLearningItems.length + track.resources.length;
  const totalDone   = allLearningItems.filter(i => checks[i.id]).length + track.resources.filter(r => checks[r.id]).length;
  const overallPct  = totalItems ? Math.round((totalDone / totalItems) * 100) : 0;

  const activePhase = track.phases.find(p => p.id === activeTab);
  const phaseTheme  = PHASE_THEME[activeTab] ?? getSyntheticTheme(track.color, track.darkColor);
  const anyOpen     = activePhase ? activePhase.sections.some(s => openSections[s.id]) : false;

  if (!isLoaded) return <div className="diary-loading">Loading your diary…</div>;

  return (
    <div className={`diary${isDark ? ' dark' : ''}`}>
      {/* ── Sticky Header ── */}
      <header className="diary-header">
        <div className="header-inner">
          <div className="header-left">
            <button className="back-btn" onClick={onBack} title="All tracks">← <span className="back-label">All Tracks</span></button>
            <span className="diary-title">Learning Diary</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="header-right">
              <span className="overall-pct">{overallPct}%</span>
              <span className="overall-count">&nbsp;{totalDone}/{totalItems}</span>
            </div>

            {/* Dark mode toggle */}
            <button className="theme-toggle" onClick={toggleTheme} title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Sign-in button (only when Firebase configured + not signed in) */}
            {isFirebaseConfigured && !user && (
              <button className="sync-btn" onClick={handleSignIn}>
                <GoogleIcon />
                Sync
              </button>
            )}

            {/* Avatar trigger + dropdown (only when signed in) */}
            {user && (
              <div className="user-menu-wrap" ref={menuRef}>
                <button
                  className="avatar-trigger"
                  onClick={() => setShowUserMenu(v => !v)}
                  aria-label="Account menu"
                  aria-expanded={showUserMenu}
                >
                  <div className="avatar-circle">
                    {(user.displayName ?? user.email ?? 'U')[0].toUpperCase()}
                  </div>
                  <SyncDot status={syncStatus} dotOnly />
                </button>

                {showUserMenu && (
                  <div className="user-dropdown" role="menu">
                    <div className="dropdown-profile">
                      <div className="avatar-circle-lg">
                        {(user.displayName ?? user.email ?? 'U')[0].toUpperCase()}
                      </div>
                      <div>
                        {user.displayName && <div className="dropdown-name">{user.displayName}</div>}
                        <div className="dropdown-email">{user.email}</div>
                      </div>
                    </div>

                    <div className="dropdown-status">
                      <SyncDot status={syncStatus} />
                    </div>

                    <button className="dropdown-item-btn" onClick={() => { setShowUserMenu(false); onShowProfile(); }}>
                      <FriendsIcon />
                      Friends &amp; Progress
                    </button>

                    <button className="dropdown-signout-btn" onClick={() => { handleSignOut(); setShowUserMenu(false); }}>
                      <SignOutIcon />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="header-progress">
          <div className="header-progress-fill" style={{ width: `${overallPct}%` }} />
        </div>
      </header>

      <main className="diary-main">
        <div className="diary-content">

          {/* ── Tab Bar ── */}
          <nav className="tab-bar">
            {track.phases.map(phase => {
              const pItems  = phase.sections.flatMap(s => s.items);
              const pDone   = pItems.filter(i => checks[i.id]).length;
              const active  = activeTab === phase.id;
              const pTheme  = PHASE_THEME[phase.id] ?? getSyntheticTheme(track.color, track.darkColor);
              const accent  = isDark ? pTheme.bright : pTheme.color;
              return (
                <button
                  key={phase.id}
                  className={`tab-btn${active ? ' active' : ''}`}
                  onClick={() => switchTab(phase.id)}
                  style={active ? { borderBottomColor: accent, color: accent } : {}}
                >
                  <span className="tab-label">{phase.label}</span>
                  <span className="tab-progress">{pDone}/{pItems.length}</span>
                </button>
              );
            })}
            {(() => {
              const active = activeTab === 'resources';
              const rDone  = track.resources.filter(r => checks[r.id]).length;
              return (
                <button
                  className={`tab-btn${active ? ' active' : ''}`}
                  onClick={() => switchTab('resources')}
                  style={active ? {
                    borderBottomColor: '#6B6560',
                    color: isDark ? '#C8C4BE' : '#1A1714',
                  } : {}}
                >
                  <span className="tab-label">Resources</span>
                  <span className="tab-progress">{rDone}/{track.resources.length}</span>
                </button>
              );
            })()}
            {track.quizzes?.length ? (() => {
              const active = activeTab === 'quiz';
              const accent = isDark ? track.darkColor : track.color;
              return (
                <button
                  className={`tab-btn${active ? ' active' : ''}`}
                  onClick={() => switchTab('quiz')}
                  style={active ? { borderBottomColor: accent, color: accent } : {}}
                >
                  <span className="tab-label">Quiz</span>
                  <span className="tab-progress">{track.quizzes!.length}</span>
                </button>
              );
            })() : null}
          </nav>

          {/* ── Content ── */}
          {activeTab === 'quiz' && track.quizzes?.length ? (
            <QuizView quizzes={track.quizzes} trackId={track.id} color={track.color} darkColor={track.darkColor} isDark={isDark} />
          ) : activeTab === 'resources' ? (
            <ResourcesView resources={track.resources} checks={checks} onToggle={toggleCheck} />
          ) : activePhase ? (
            <div className="phase-view">
              <PhaseSummaryPanel phase={activePhase} checks={checks} theme={phaseTheme} isDark={isDark} />

              <div className="phase-controls">
                <div className="filter-group">
                  {(['all', 'todo', 'done'] as FilterType[]).map(f => (
                    <button
                      key={f}
                      className={`filter-btn${filter === f ? ' active' : ''}`}
                      onClick={() => setFilter(f)}
                    >
                      {f === 'all' ? 'All' : f === 'todo' ? 'To-do' : 'Done'}
                    </button>
                  ))}
                </div>
                <button
                  className="expand-btn"
                  onClick={() => anyOpen ? collapseAll(activePhase) : expandAll(activePhase)}
                >
                  {anyOpen ? 'Collapse all' : 'Expand all'}
                </button>
              </div>

              <div className="section-list">
                {activePhase.sections.map((section, idx) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    sectionIndex={idx + 1}
                    isOpen={!!openSections[section.id]}
                    onToggle={() => toggleSection(section.id)}
                    checks={checks}
                    onItemToggle={toggleCheck}
                    filter={filter}
                    phaseColor={isDark ? phaseTheme.bright : phaseTheme.color}
                    trackId={track.id}
                  />
                ))}
              </div>
            </div>
          ) : null}

        </div>
      </main>
    </div>
  );
}
