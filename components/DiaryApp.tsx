'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { PHASES, RESOURCES } from '@/lib/data';
import type { Item, Phase, Section, StoredState } from '@/lib/types';

const STORAGE_KEY = 'learning-diary-v2';

type FilterType = 'all' | 'todo' | 'done';

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
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          {item.tag && (
            <span className={`diff-badge diff-${item.tag}`}>{item.tag}</span>
          )}
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
  const done  = section.items.filter(i => checks[i.id]).length;
  const total = section.items.length;
  const allDone = done === total;
  const pct   = total ? Math.round((done / total) * 100) : 0;

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
function PhaseSummaryPanel({
  phase, checks, theme,
}: {
  phase: Phase; checks: Record<string, boolean>;
  theme: { color: string; light: string; border: string };
}) {
  const allItems  = phase.sections.flatMap(s => s.items);
  const done      = allItems.filter(i => checks[i.id]).length;
  const total     = allItems.length;
  const pct       = total ? Math.round((done / total) * 100) : 0;

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

/* ── Main DiaryApp ── */
export default function DiaryApp() {
  const [checks,       setChecks]       = useState<Record<string, boolean>>({});
  const [completedAt,  setCompletedAt]  = useState<Record<string, string>>({});
  const [activeTab,    setActiveTab]    = useState<string>(PHASES[0].id);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [startDate,    setStartDate]    = useState<string>('');
  const [filter,       setFilter]       = useState<FilterType>('all');
  const [isLoaded,     setIsLoaded]     = useState(false);

  /* Load from localStorage exactly once on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as StoredState;
        setChecks(data.checks       ?? {});
        setCompletedAt(data.completedAt ?? {});
        if (data.activeTab) setActiveTab(data.activeTab);
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

  /* Persist to localStorage — only AFTER we have loaded (guard prevents overwriting with empty state) */
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const data: StoredState = { checks, completedAt, activeTab, openSections, startDate };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* localStorage might be full — silently ignore */
    }
  }, [checks, completedAt, activeTab, openSections, startDate, isLoaded]);

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

  /* Switch tab and reset filter */
  const switchTab = useCallback((id: string) => {
    setActiveTab(id);
    setFilter('all');
  }, []);

  /* Overall stats */
  const allLearningItems = useMemo(() => PHASES.flatMap(p => p.sections.flatMap(s => s.items)), []);
  const totalItems    = allLearningItems.length + RESOURCES.length;
  const totalDone     = allLearningItems.filter(i => checks[i.id]).length
                      + RESOURCES.filter(r => checks[r.id]).length;
  const overallPct    = totalItems ? Math.round((totalDone / totalItems) * 100) : 0;
  const currentWeek   = getWeekNumber(startDate);

  const activePhase = PHASES.find(p => p.id === activeTab);
  const phaseTheme  = PHASE_THEME[activeTab] ?? PHASE_THEME['proj'];
  const anyOpen     = activePhase ? activePhase.sections.some(s => openSections[s.id]) : false;

  if (!isLoaded) {
    return (
      <div className="diary-loading">
        <span>Loading your diary…</span>
      </div>
    );
  }

  return (
    <div className="diary">
      {/* ── Sticky Header ── */}
      <header className="diary-header">
        <div className="header-inner">
          <div className="header-left">
            <span className="diary-title">Learning Diary</span>
            <span className="diary-subtitle">
              Backend Eng · {currentWeek < 30 ? `Week ${currentWeek} of 30` : 'Week 30 — Final stretch!'}
            </span>
          </div>
          <div className="header-right">
            <span className="overall-pct">{overallPct}%</span>
            <span className="overall-count">&nbsp;{totalDone}/{totalItems}</span>
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
            {/* Resources tab */}
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

              {/* Controls */}
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

              {/* Sections */}
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
