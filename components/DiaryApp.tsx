'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { PHASES, RESOURCES } from '@/lib/data';
import type { Item, Phase, Section, StoredState } from '@/lib/types';
import {
  isFirebaseConfigured,
  signInWithGoogle,
  signOutUser,
  onAuthChange,
  getUserDocRef,
  setDoc,
  onSnapshot,
  type User,
} from '@/lib/firebase';

const STORAGE_KEY = 'learning-diary-v2';

type FilterType  = 'all' | 'todo' | 'done';
type SyncStatus  = 'idle' | 'syncing' | 'synced' | 'error';

/* Unique ID per browser tab — used to detect Firestore echo from our own saves */
const DEVICE_ID = typeof window !== 'undefined'
  ? (() => {
      const k = 'diary-device-id';
      const existing = sessionStorage.getItem(k);
      if (existing) return existing;
      const id = Math.random().toString(36).slice(2);
      sessionStorage.setItem(k, id);
      return id;
    })()
  : 'ssr';

/* ── Phase theme tokens ── */
const PHASE_THEME: Record<string, { color: string; light: string; border: string }> = {
  proj: { color: '#1E3A8A', light: '#EFF6FF', border: '#1E3A8A33' },
  p1:   { color: '#14532D', light: '#F0FDF4', border: '#14532D33' },
  p2:   { color: '#1E40AF', light: '#EFF6FF', border: '#1E40AF33' },
  p3:   { color: '#9A3412', light: '#FFF7ED', border: '#9A341233' },
  p4:   { color: '#991B1B', light: '#FEF2F2', border: '#991B1B33' },
};

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

/* ── Item Row ── */
function ItemRow({ item, checked, onToggle }: { item: Item; checked: boolean; onToggle: () => void }) {
  return (
    <div className={`item-row${checked ? ' completed' : ''}`}>
      <Checkbox checked={checked} onChange={onToggle} />
      <div className="item-content">
        <div className="item-top">
          {item.tag && <span className={`diff-badge diff-${item.tag}`}>{item.tag}</span>}
          <span className="item-text">{item.text}</span>
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="item-link" title="Open reference">
              <ExternalIcon />
            </a>
          )}
        </div>
        {item.note && (
          <div className="item-note">
            <BulbIcon />
            {item.note}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Section Card ── */
function SectionCard({
  section, sectionIndex, isOpen, onToggle, checks, onItemToggle, filter, phaseColor,
}: {
  section: Section; sectionIndex: number; isOpen: boolean; onToggle: () => void;
  checks: Record<string, boolean>; onItemToggle: (id: string) => void;
  filter: FilterType; phaseColor: string;
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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Phase Summary Panel ── */
function PhaseSummaryPanel({ phase, checks, theme }: {
  phase: Phase; checks: Record<string, boolean>;
  theme: { color: string; light: string; border: string };
}) {
  const allItems = phase.sections.flatMap(s => s.items);
  const done     = allItems.filter(i => checks[i.id]).length;
  const total    = allItems.length;
  const pct      = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="phase-summary" style={{ background: theme.light, borderColor: theme.border }}>
      <div className="phase-summary-header">
        <div>
          <div className="phase-summary-label">{phase.label} · {phase.weeks}</div>
          <div className="phase-summary-stat">
            <span style={{ color: theme.color }}>{done}</span>
            <span className="phase-summary-of">/{total} complete</span>
          </div>
        </div>
        <div className="phase-summary-pct" style={{ color: theme.color }}>{pct}%</div>
      </div>

      <div className="phase-progress-bar">
        <div className="phase-progress-fill" style={{ width: `${pct}%`, background: theme.color }} />
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
                <div className="phase-section-fill" style={{ width: `${sPct}%`, background: theme.color }} />
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
function ResourcesView({ checks, onToggle }: { checks: Record<string, boolean>; onToggle: (id: string) => void }) {
  const done = RESOURCES.filter(r => checks[r.id]).length;
  return (
    <div className="resources-view">
      <div className="resources-header">
        <h2 className="resources-title">Resources</h2>
        <span className="resources-count">{done}/{RESOURCES.length} bookmarked</span>
      </div>
      <div className="resources-grid">
        {RESOURCES.map(r => (
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

/* ── Sync dot ── */
function SyncDot({ status }: { status: SyncStatus }) {
  return <span className={`sync-dot ${status}`} title={
    status === 'synced'  ? 'Synced to cloud' :
    status === 'syncing' ? 'Saving...' :
    status === 'error'   ? 'Sync error — data saved locally' :
    'Not synced yet'
  } />;
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */
export default function DiaryApp() {
  const [checks,       setChecks]       = useState<Record<string, boolean>>({});
  const [completedAt,  setCompletedAt]  = useState<Record<string, string>>({});
  const [activeTab,    setActiveTab]    = useState<string>(PHASES[0].id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [startDate,    setStartDate]    = useState<string>('');
  const [filter,       setFilter]       = useState<FilterType>('all');
  const [isLoaded,     setIsLoaded]     = useState(false);

  /* Sync state */
  const [user,       setUser]       = useState<User | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');

  /* Refs — never trigger re-renders */
  const firestoreUnsubRef = useRef<(() => void) | null>(null);
  const saveTimerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* Tracks the JSON snapshot of the last data received from Firestore.
     Before saving, we compare current state to this — if they match, we skip
     the save (it was a remote update, not a local change). */
  const lastRemoteRef = useRef<string>('');

  /* ── 1. Load from localStorage on mount (client only) ── */
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

  /* ── 2. Persist EVERYTHING to localStorage (all state, every change) ── */
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const data: StoredState = { checks, completedAt, activeTab, openSections, startDate };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { /* quota exceeded — silently ignore */ }
  }, [checks, completedAt, activeTab, openSections, startDate, isLoaded]);

  /* ── 3. Firebase auth + Firestore real-time subscription ── */
  useEffect(() => {
    if (!isFirebaseConfigured || !isLoaded) return;

    const unsubAuth = onAuthChange((newUser) => {
      setUser(newUser);

      /* Clean up previous subscription whenever auth changes */
      if (firestoreUnsubRef.current) {
        firestoreUnsubRef.current();
        firestoreUnsubRef.current = null;
      }

      if (!newUser) { setSyncStatus('idle'); return; }

      const docRef = getUserDocRef(newUser.uid);
      if (!docRef) return;

      setSyncStatus('syncing');

      const unsub = onSnapshot(docRef, (snap) => {
        if (!snap.exists()) { setSyncStatus('synced'); return; }
        const data = snap.data();

        /* Skip our own saves echoing back (same tab/device) */
        if (data.deviceId === DEVICE_ID) { setSyncStatus('synced'); return; }

        /* Capture remote snapshot BEFORE setState, so the Firestore save effect
           sees this as "no local change needed" and skips re-saving. */
        lastRemoteRef.current = JSON.stringify({
          checks:      data.checks      ?? {},
          completedAt: data.completedAt ?? {},
          startDate:   data.startDate   ?? '',
        });

        /* Apply remote state — React 18 batches these */
        setChecks(data.checks           ?? {});
        setCompletedAt(data.completedAt ?? {});
        if (data.startDate) setStartDate(data.startDate);
        setSyncStatus('synced');
      }, () => {
        setSyncStatus('error');
      });

      firestoreUnsubRef.current = unsub;
    });

    return () => {
      unsubAuth();
      if (firestoreUnsubRef.current) firestoreUnsubRef.current();
    };
  }, [isLoaded]);

  /* ── 4. Save checks/completedAt/startDate to Firestore (debounced 1s) ── */
  useEffect(() => {
    if (!isLoaded || !user || !isFirebaseConfigured) return;

    const currentSnapshot = JSON.stringify({ checks, completedAt, startDate });

    /* Skip if this state was just received from Firestore (not a local edit) */
    if (currentSnapshot === lastRemoteRef.current) return;

    setSyncStatus('syncing');
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(async () => {
      const docRef = getUserDocRef(user.uid);
      if (!docRef) return;
      try {
        await setDoc(docRef, {
          checks,
          completedAt,
          startDate,
          deviceId:  DEVICE_ID,
          updatedAt: new Date().toISOString(),
        });
        /* Record what we just saved so future echoes are ignored */
        lastRemoteRef.current = currentSnapshot;
        setSyncStatus('synced');
      } catch {
        setSyncStatus('error');
      }
    }, 1000);

    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [checks, completedAt, startDate, isLoaded, user]);

  /* ── Handlers ── */
  const toggleCheck = useCallback((id: string) => {
    setChecks(prev => {
      const next = { ...prev, [id]: !prev[id] };
      setCompletedAt(ca => {
        if (next[id]) return { ...ca, [id]: new Date().toISOString() };
        const updated = { ...ca };
        delete updated[id];
        return updated;
      });
      return next;
    });
  }, []);

  const toggleSection = useCallback((id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const expandAll = useCallback((phase: Phase) => {
    setOpenSections(prev => {
      const next = { ...prev };
      phase.sections.forEach(s => { next[s.id] = true; });
      return next;
    });
  }, []);

  const collapseAll = useCallback((phase: Phase) => {
    setOpenSections(prev => {
      const next = { ...prev };
      phase.sections.forEach(s => { next[s.id] = false; });
      return next;
    });
  }, []);

  const switchTab = useCallback((id: string) => {
    setActiveTab(id);
    setFilter('all');
  }, []);

  const handleSignIn = useCallback(async () => {
    try { await signInWithGoogle(); }
    catch { /* user cancelled */ }
  }, []);

  const handleSignOut = useCallback(async () => {
    if (!window.confirm('Sign out? Your progress stays saved locally.')) return;
    await signOutUser();
    setSyncStatus('idle');
  }, []);

  /* ── Derived values ── */
  const allLearningItems = useMemo(() => PHASES.flatMap(p => p.sections.flatMap(s => s.items)), []);
  const totalItems = allLearningItems.length + RESOURCES.length;
  const totalDone  = allLearningItems.filter(i => checks[i.id]).length
                   + RESOURCES.filter(r => checks[r.id]).length;
  const overallPct = totalItems ? Math.round((totalDone / totalItems) * 100) : 0;
  const currentWeek = getWeekNumber(startDate);

  const activePhase = PHASES.find(p => p.id === activeTab);
  const phaseTheme  = PHASE_THEME[activeTab] ?? PHASE_THEME['proj'];
  const anyOpen     = activePhase ? activePhase.sections.some(s => openSections[s.id]) : false;

  if (!isLoaded) {
    return <div className="diary-loading">Loading your diary…</div>;
  }

  return (
    <div className="diary">
      {/* ── Sticky Header ── */}
      <header className="diary-header">
        <div className="header-inner">
          <div className="header-left">
            <span className="diary-title">Learning Diary</span>
            <span className="diary-subtitle">
              Backend Eng · {currentWeek < 30 ? `Week ${currentWeek} of 30` : 'Week 30'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="header-right">
              <span className="overall-pct">{overallPct}%</span>
              <span className="overall-count">&nbsp;{totalDone}/{totalItems}</span>
            </div>

            {/* Auth / Sync UI */}
            {isFirebaseConfigured && (
              <div className="sync-section">
                {user ? (
                  <button className="user-pill" onClick={handleSignOut} title="Click to sign out">
                    <span className="avatar-circle">
                      {(user.displayName ?? user.email ?? 'U')[0].toUpperCase()}
                    </span>
                    <SyncDot status={syncStatus} />
                  </button>
                ) : (
                  <button className="sync-btn" onClick={handleSignIn}>
                    <GoogleIcon />
                    Sync
                  </button>
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
            {PHASES.map(phase => {
              const pItems = phase.sections.flatMap(s => s.items);
              const pDone  = pItems.filter(i => checks[i.id]).length;
              const active = activeTab === phase.id;
              const theme  = PHASE_THEME[phase.id];
              return (
                <button
                  key={phase.id}
                  className={`tab-btn${active ? ' active' : ''}`}
                  onClick={() => switchTab(phase.id)}
                  style={active ? { borderColor: theme.color, color: theme.color, background: theme.light } : {}}
                >
                  <span className="tab-label">{phase.label}</span>
                  <span className="tab-progress">{pDone}/{pItems.length}</span>
                </button>
              );
            })}
            {(() => {
              const active = activeTab === 'resources';
              const rDone  = RESOURCES.filter(r => checks[r.id]).length;
              return (
                <button
                  className={`tab-btn${active ? ' active' : ''}`}
                  onClick={() => switchTab('resources')}
                  style={active ? { borderColor: '#6B6560', color: '#1A1714', background: '#EDEBE6' } : {}}
                >
                  <span className="tab-label">Resources</span>
                  <span className="tab-progress">{rDone}/{RESOURCES.length}</span>
                </button>
              );
            })()}
          </nav>

          {/* ── Content ── */}
          {activeTab === 'resources' ? (
            <ResourcesView checks={checks} onToggle={toggleCheck} />
          ) : activePhase ? (
            <div className="phase-view">
              <PhaseSummaryPanel phase={activePhase} checks={checks} theme={phaseTheme} />

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
                    phaseColor={phaseTheme.color}
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
