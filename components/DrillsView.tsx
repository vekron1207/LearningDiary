'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DrillSet, Drill } from '@/lib/types';
import { shuffle } from '@/lib/shuffle';

type Screen = 'select' | 'run' | 'done';
interface Score { best: number; total: number; attempts: number; }

function norm(s: string) { return s.trim().toLowerCase().replace(/\s+/g, ' '); }

/* One interactive exercise. Owns its input state; reports the result up. */
function DrillCard({ drill, accent, onChecked }: { drill: Drill; accent: string; onChecked: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null); // blank + options
  const [typed, setTyped]       = useState('');                  // blank free-type
  const [built, setBuilt]       = useState<number[]>([]);        // order: chosen token indices
  const [checked, setChecked]   = useState(false);
  const [correct, setCorrect]   = useState(false);
  // Options shuffled once per card mount so the answer isn't always in the same spot
  const [opts] = useState<string[] | undefined>(() => drill.options ? shuffle(drill.options) : undefined);

  const usedBank = new Set(built);

  function finish(ok: boolean) {
    setCorrect(ok);
    setChecked(true);
    onChecked(ok);
  }

  /* blank with options → check on click */
  function pickOption(i: number) {
    if (checked) return;
    setSelected(i);
    finish(opts![i] === drill.answer);
  }
  function checkTyped() {
    if (checked || !typed.trim()) return;
    finish(norm(typed) === norm(drill.answer ?? ''));
  }
  function checkOrder() {
    if (checked || built.length === 0) return;
    const answer = built.map(i => drill.tokens![i]).join(' ');
    finish(norm(answer) === norm((drill.solution ?? []).join(' ')));
  }

  /* ── BLANK ── */
  if (drill.kind === 'blank') {
    const parts = drill.prompt.split('___');
    return (
      <div className="dr-card">
        {drill.gloss && <div className="dr-gloss">{drill.gloss}</div>}
        <p className="dr-prompt">
          {parts[0]}
          <span className="dr-blank" style={checked ? { borderColor: correct ? '#22C55E' : '#EF4444' } : { borderColor: accent }}>
            {checked ? drill.answer : (drill.options ? (selected !== null ? drill.options[selected] : '␣') : (typed || '␣'))}
          </span>
          {parts[1]}
        </p>

        {opts ? (
          <div className="dr-options">
            {opts.map((opt, i) => {
              const isAns = opt === drill.answer;
              const state = !checked ? '' : isAns ? ' dr-correct' : (i === selected ? ' dr-wrong' : '');
              return (
                <button key={i} className={`dr-opt${state}`} onClick={() => pickOption(i)} disabled={checked}>
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="dr-type-row">
            <input
              className="dr-input"
              value={typed}
              onChange={e => setTyped(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') checkTyped(); }}
              placeholder="Type the missing word…"
              disabled={checked}
              autoFocus
            />
            {!checked && <button className="dr-check" style={{ background: accent }} onClick={checkTyped} disabled={!typed.trim()}>Check</button>}
          </div>
        )}

        {checked && <Feedback correct={correct} answer={drill.answer} explanation={drill.explanation} />}
      </div>
    );
  }

  /* ── ORDER (sentence / translation builder) ── */
  return (
    <div className="dr-card">
      {drill.gloss && <div className="dr-gloss">{drill.gloss}</div>}
      <p className="dr-prompt">{drill.prompt}</p>

      <div className="dr-build" style={{ borderColor: checked ? (correct ? '#22C55E' : '#EF4444') : accent }}>
        {built.length === 0 && <span className="dr-build-empty">Tap the words in order…</span>}
        {built.map((tokIdx, slot) => (
          <button key={slot} className="dr-tile dr-tile-placed" onClick={() => !checked && setBuilt(b => b.filter((_, s) => s !== slot))}>
            {drill.tokens![tokIdx]}
          </button>
        ))}
      </div>

      <div className="dr-bank">
        {drill.tokens!.map((tok, i) => (
          <button
            key={i}
            className="dr-tile"
            style={usedBank.has(i) ? { visibility: 'hidden' } : undefined}
            onClick={() => !checked && !usedBank.has(i) && setBuilt(b => [...b, i])}
            disabled={checked}
          >
            {tok}
          </button>
        ))}
      </div>

      {!checked && (
        <div className="dr-order-actions">
          <button className="dr-reset" onClick={() => setBuilt([])} disabled={built.length === 0}>Clear</button>
          <button className="dr-check" style={{ background: accent }} onClick={checkOrder} disabled={built.length === 0}>Check</button>
        </div>
      )}

      {checked && (
        <Feedback
          correct={correct}
          answer={(drill.solution ?? []).join(' ')}
          explanation={drill.explanation}
        />
      )}
    </div>
  );
}

function Feedback({ correct, answer, explanation }: { correct: boolean; answer?: string; explanation?: string }) {
  return (
    <div className={`dr-feedback${correct ? ' ok' : ' fail'}`}>
      <div className="dr-feedback-head">{correct ? '✓ Correct' : '✗ Not quite'}</div>
      {!correct && answer && <div className="dr-feedback-answer">Answer: <strong>{answer}</strong></div>}
      {explanation && <div className="dr-feedback-exp">{explanation}</div>}
    </div>
  );
}

export default function DrillsView({
  sets, trackId, color, darkColor, isDark,
}: {
  sets: DrillSet[]; trackId: string; color: string; darkColor: string; isDark: boolean;
}) {
  const accent = isDark ? darkColor : color;
  const SCORES_KEY = `learning-diary-drill-${trackId}`;

  const [scores, setScores] = useState<Record<string, Score>>({});
  const [screen, setScreen] = useState<Screen>('select');
  const [setIdx, setSetIdx] = useState(0);
  const [runDrills, setRunDrills] = useState<Drill[]>([]);
  const [pos, setPos]       = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    try { const raw = localStorage.getItem(SCORES_KEY); if (raw) setScores(JSON.parse(raw)); } catch { /* unavailable */ }
  }, [SCORES_KEY]);

  const activeSet = sets[setIdx];
  const drill = runDrills[pos];

  function start(idx: number) {
    setSetIdx(idx); setRunDrills(shuffle(sets[idx].drills)); setPos(0); setNumCorrect(0); setResult(null); setScreen('run');
  }

  const onChecked = useCallback((ok: boolean) => {
    setResult(ok);
    if (ok) setNumCorrect(n => n + 1);
  }, []);

  function next() {
    if (pos < runDrills.length - 1) {
      setPos(p => p + 1);
      setResult(null);
    } else {
      const total = runDrills.length;
      const prev = scores[activeSet.id];
      const best = Math.max(numCorrect, prev?.best ?? 0);
      const updated = { best, total, attempts: (prev?.attempts ?? 0) + 1 };
      const nextScores = { ...scores, [activeSet.id]: updated };
      setScores(nextScores);
      try { localStorage.setItem(SCORES_KEY, JSON.stringify(nextScores)); } catch { /* quota */ }
      setScreen('done');
    }
  }

  /* ── SELECT ── */
  if (screen === 'select') {
    return (
      <div className="dr-view">
        <div className="dr-intro">
          <h2 className="dr-title">Practice Drills</h2>
          <p className="dr-sub">Fill in the blanks and build sentences with instant correction and explanations. Each set mixes vocabulary and the chapter’s grammar.</p>
        </div>
        <div className="dr-set-grid">
          {sets.map((s, i) => {
            const sc = scores[s.id];
            const pct = sc ? Math.round((sc.best / sc.total) * 100) : null;
            return (
              <div key={s.id} className="dr-set">
                <div className="dr-set-chapter" style={{ color: accent }}>{s.chapter}</div>
                <h3 className="dr-set-title">{s.title.replace(/^Kapitel \d+ — /, '')}</h3>
                <p className="dr-set-desc">{s.description}</p>
                {sc ? (
                  <div className="dr-set-score">Best: {sc.best}/{sc.total} · {pct}%{sc.attempts > 1 && <span className="dr-set-attempts"> ({sc.attempts} tries)</span>}</div>
                ) : (
                  <div className="dr-set-score dr-set-none">Not attempted yet</div>
                )}
                <button className="dr-check dr-start" style={{ background: accent }} onClick={() => start(i)}>
                  {sc ? 'Practice again' : 'Start'} — {s.drills.length} drills
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── DONE ── */
  if (screen === 'done') {
    const total = runDrills.length;
    const pct = Math.round((numCorrect / total) * 100);
    return (
      <div className="dr-view">
        <div className="dr-done">
          <div className="dr-done-score" style={{ color: accent }}>{numCorrect}<span className="dr-done-denom">/{total}</span></div>
          <p className="dr-done-pct">{pct}% correct — {activeSet.chapter}</p>
          <div className="dr-done-actions">
            <button className="dr-check dr-start" style={{ background: accent }} onClick={() => start(setIdx)}>Try again</button>
            <button className="dr-back" onClick={() => setScreen('select')}>← All sets</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── RUN ── */
  if (!drill) return null;
  return (
    <div className="dr-view">
      <div className="dr-run-head">
        <button className="dr-exit" onClick={() => setScreen('select')}>✕ Exit</button>
        <span className="dr-counter">Drill {pos + 1} of {runDrills.length}</span>
        <span className="dr-kind-badge">{drill.kind === 'blank' ? 'Fill in' : 'Build'}</span>
      </div>
      <div className="dr-progress"><div className="dr-progress-fill" style={{ width: `${((pos + (result !== null ? 1 : 0)) / runDrills.length) * 100}%`, background: accent }} /></div>

      <DrillCard key={drill.id} drill={drill} accent={accent} onChecked={onChecked} />

      {result !== null && (
        <div className="dr-next-wrap">
          <button className="dr-check dr-next" style={{ background: accent }} onClick={next}>
            {pos < runDrills.length - 1 ? 'Next →' : 'See results →'}
          </button>
        </div>
      )}
    </div>
  );
}
