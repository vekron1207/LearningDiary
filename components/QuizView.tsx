'use client';

import { useState, useEffect } from 'react';
import type { Quiz, QuizQuestion, QuizScore } from '@/lib/types';
import { shuffle, sample } from '@/lib/shuffle';

function gradeFromPct(pct: number): { letter: string; color: string; darkColor: string } {
  if (pct === 100) return { letter: 'A+', color: '#16A34A', darkColor: '#4ADE80' };
  if (pct >= 90)   return { letter: 'A',  color: '#22C55E', darkColor: '#4ADE80' };
  if (pct >= 80)   return { letter: 'B',  color: '#3B82F6', darkColor: '#60A5FA' };
  if (pct >= 70)   return { letter: 'C',  color: '#F97316', darkColor: '#FB923C' };
  if (pct >= 60)   return { letter: 'D',  color: '#EAB308', darkColor: '#FDE047' };
  return           { letter: 'F',  color: '#EF4444', darkColor: '#F87171' };
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];
const MIXED_DRAW = 12;

const LEVEL_COLORS: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
  A1: { bg: '#DCFCE7', text: '#166534', darkBg: '#14532D', darkText: '#86EFAC' },
  A2: { bg: '#DBEAFE', text: '#1E40AF', darkBg: '#1E3A8A', darkText: '#93C5FD' },
  B1: { bg: '#FEF3C7', text: '#92400E', darkBg: '#78350F', darkText: '#FCD34D' },
  B2: { bg: '#FCE7F3', text: '#9D174D', darkBg: '#831843', darkText: '#F9A8D4' },
};

function LevelBadge({ level, isDark }: { level: string; isDark: boolean }) {
  const c = LEVEL_COLORS[level] ?? { bg: '#F3F4F6', text: '#374151', darkBg: '#1F2937', darkText: '#D1D5DB' };
  return (
    <span className="quiz-level-badge" style={{ background: isDark ? c.darkBg : c.bg, color: isDark ? c.darkText : c.text }}>
      {level}
    </span>
  );
}

/* A question prepared for a run: options shuffled so the correct answer
   moves position each attempt (you can't memorise "it's B"). */
interface PreparedQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  level?: string;
}

function prepare(q: QuizQuestion): PreparedQ {
  // Shuffle by index so duplicate option strings can't mis-map the correct answer
  const order = shuffle(q.options.map((_, i) => i));
  return {
    id: q.id,
    question: q.question,
    options: order.map(i => q.options[i]),
    correctIndex: order.indexOf(q.correctIndex),
    explanation: q.explanation,
    level: q.level,
  };
}

type RunDesc = { kind: 'quiz'; idx: number } | { kind: 'mixed' };

export default function QuizView({
  quizzes, trackId, color, darkColor, isDark,
}: {
  quizzes: Quiz[]; trackId: string; color: string; darkColor: string; isDark: boolean;
}) {
  const SCORES_KEY = `learning-diary-quiz-${trackId}`;
  const accent = isDark ? darkColor : color;
  const showMixed = quizzes.length >= 2;
  const mixedId = `mixed-${quizzes.map(q => q.id).join('|')}`;
  const mixedPoolSize = quizzes.reduce((n, q) => n + q.questions.length, 0);
  const mixedCount = Math.min(MIXED_DRAW, mixedPoolSize);

  type Screen = 'select' | 'quiz' | 'result';
  const [screen, setScreen]       = useState<Screen>('select');
  const [runDesc, setRunDesc]     = useState<RunDesc>({ kind: 'quiz', idx: 0 });
  const [run, setRun]             = useState<PreparedQ[]>([]);
  const [runMeta, setRunMeta]     = useState<{ id: string; title: string; level: string }>({ id: '', title: '', level: 'A1' });
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers]     = useState<(number | null)[]>([]);
  const [selected, setSelected]   = useState<number | null>(null);
  const [scores, setScores]       = useState<Record<string, QuizScore>>({});
  const [newBest, setNewBest]     = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SCORES_KEY);
      if (saved) setScores(JSON.parse(saved));
    } catch { /* storage unavailable */ }
  }, [SCORES_KEY]);

  const totalQ      = run.length;
  const currentQ    = run[questionIdx];
  const hasAnswered = selected !== null;

  function start(desc: RunDesc) {
    let questions: PreparedQ[];
    let meta: { id: string; title: string; level: string };
    if (desc.kind === 'mixed') {
      const pool = quizzes.flatMap(q => q.questions);
      questions = sample(pool, mixedCount).map(prepare);
      meta = { id: mixedId, title: 'Mixed Review', level: 'A1' };
    } else {
      const quiz = quizzes[desc.idx];
      questions = shuffle(quiz.questions).map(prepare);
      meta = { id: quiz.id, title: quiz.title, level: quiz.level };
    }
    setRunDesc(desc);
    setRun(questions);
    setRunMeta(meta);
    setQuestionIdx(0);
    setSelected(null);
    setAnswers(new Array(questions.length).fill(null));
    setNewBest(false);
    setScreen('quiz');
  }

  function handleSelectOption(optIdx: number) {
    if (hasAnswered) return;
    setSelected(optIdx);
    setAnswers(prev => { const next = [...prev]; next[questionIdx] = optIdx; return next; });
  }

  function handleNext() {
    if (questionIdx < totalQ - 1) {
      setQuestionIdx(q => q + 1);
      setSelected(null);
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    const finalAnswers = [...answers];
    finalAnswers[questionIdx] = selected;
    const correct = finalAnswers.filter((a, i) => a === run[i].correctIndex).length;

    const quizId = runMeta.id;
    const prev   = scores[quizId];
    const isNewBest = !prev || correct > prev.best;
    const updated: QuizScore = {
      best:     isNewBest ? correct : prev.best,
      total:    totalQ,
      attempts: (prev?.attempts ?? 0) + 1,
    };
    const newScores = { ...scores, [quizId]: updated };
    setScores(newScores);
    setAnswers(finalAnswers);
    setNewBest(isNewBest && (prev?.attempts ?? 0) > 0);
    try { localStorage.setItem(SCORES_KEY, JSON.stringify(newScores)); } catch { /* quota */ }
    setScreen('result');
  }

  /* ── SELECT SCREEN ── */
  if (screen === 'select') {
    return (
      <div className="quiz-view">
        <div className="quiz-select-header">
          <h2 className="quiz-select-title">Test Your Knowledge</h2>
          <p className="quiz-select-sub">Questions and answer options are shuffled every attempt, so you learn the German — not the position. Your best scores are saved.</p>
        </div>

        <div className="quiz-grid">
          {showMixed && (() => {
            const s = scores[mixedId];
            const pct = s ? Math.round((s.best / s.total) * 100) : null;
            const g = pct !== null ? gradeFromPct(pct) : null;
            return (
              <div className="quiz-card quiz-card--mixed" style={{ borderColor: accent }}>
                <div className="quiz-card-top">
                  <span className="quiz-mixed-badge" style={{ background: accent }}>🎲 Mixed</span>
                  {g && <span className="quiz-card-grade" style={{ color: isDark ? g.darkColor : g.color }}>{g.letter}</span>}
                </div>
                <h3 className="quiz-card-title">Mixed Review</h3>
                <p className="quiz-card-desc">A fresh random draw of {mixedCount} questions from all {quizzes.length} sets — different every time.</p>
                {s ? (
                  <div className="quiz-card-score">
                    <div className="quiz-card-score-bar-wrap">
                      <div className="quiz-card-score-bar" style={{ width: `${pct}%`, background: isDark ? g!.darkColor : g!.color }} />
                    </div>
                    <span className="quiz-card-score-text">Best: {s.best}/{s.total} · {pct}%{s.attempts > 1 && <span className="quiz-card-attempts"> ({s.attempts} attempts)</span>}</span>
                  </div>
                ) : (
                  <p className="quiz-card-not-attempted">Not attempted yet</p>
                )}
                <button className="quiz-start-btn" style={{ background: accent }} onClick={() => start({ kind: 'mixed' })}>
                  Start Mixed Review — {mixedCount} questions
                </button>
              </div>
            );
          })()}

          {quizzes.map((quiz, idx) => {
            const s   = scores[quiz.id];
            const pct = s ? Math.round((s.best / s.total) * 100) : null;
            const g   = pct !== null ? gradeFromPct(pct) : null;
            return (
              <div key={quiz.id} className="quiz-card">
                <div className="quiz-card-top">
                  <LevelBadge level={quiz.level} isDark={isDark} />
                  {g && <span className="quiz-card-grade" style={{ color: isDark ? g.darkColor : g.color }}>{g.letter}</span>}
                </div>
                <h3 className="quiz-card-title">{quiz.title}</h3>
                <p className="quiz-card-desc">{quiz.description}</p>
                {s ? (
                  <div className="quiz-card-score">
                    <div className="quiz-card-score-bar-wrap">
                      <div className="quiz-card-score-bar" style={{ width: `${pct}%`, background: isDark ? g!.darkColor : g!.color }} />
                    </div>
                    <span className="quiz-card-score-text">
                      Best: {s.best}/{s.total} · {pct}%
                      {s.attempts > 1 && <span className="quiz-card-attempts"> ({s.attempts} attempts)</span>}
                    </span>
                  </div>
                ) : (
                  <p className="quiz-card-not-attempted">Not attempted yet</p>
                )}
                <button className="quiz-start-btn" style={{ background: accent }} onClick={() => start({ kind: 'quiz', idx })}>
                  {s ? 'Retake Quiz' : 'Start Quiz'} — {quiz.questions.length} questions
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── QUIZ SCREEN ── */
  if (screen === 'quiz' && currentQ) {
    const progressPct = ((questionIdx + (hasAnswered ? 1 : 0)) / totalQ) * 100;
    const isCorrect   = hasAnswered && selected === currentQ.correctIndex;

    return (
      <div className="quiz-view">
        <div className="quiz-in-progress">
          <div className="quiz-q-header">
            <div className="quiz-q-meta">
              <LevelBadge level={currentQ.level ?? runMeta.level} isDark={isDark} />
              <span className="quiz-q-counter">Question {questionIdx + 1} of {totalQ}</span>
            </div>
            <button className="quiz-exit-btn" onClick={() => setScreen('select')}>✕ Exit</button>
          </div>

          <div className="quiz-progress-track">
            <div className="quiz-progress-fill" style={{ width: `${progressPct}%`, background: accent }} />
          </div>

          <div className="quiz-question-wrap">
            <p className="quiz-question-text">{currentQ.question}</p>
          </div>

          <div className="quiz-options">
            {currentQ.options.map((opt, i) => {
              let state: 'default' | 'correct' | 'wrong' | 'missed' = 'default';
              if (hasAnswered) {
                if (i === currentQ.correctIndex) state = 'correct';
                else if (i === selected)          state = 'wrong';
              }
              return (
                <button
                  key={i}
                  className={`quiz-option quiz-option--${state}`}
                  onClick={() => handleSelectOption(i)}
                  disabled={hasAnswered}
                  style={state === 'correct' ? { borderColor: isDark ? '#4ADE80' : '#16A34A', background: isDark ? '#052E16' : '#F0FDF4' } :
                         state === 'wrong'   ? { borderColor: isDark ? '#F87171' : '#DC2626', background: isDark ? '#2D0A0A' : '#FEF2F2' } :
                         !hasAnswered        ? { cursor: 'pointer' } : {}}
                >
                  <span
                    className="quiz-option-label"
                    style={
                      state === 'correct' ? { background: isDark ? '#16A34A' : '#22C55E', color: '#fff' } :
                      state === 'wrong'   ? { background: isDark ? '#DC2626' : '#EF4444', color: '#fff' } :
                      hasAnswered         ? { opacity: 0.5 } : {}
                    }
                  >
                    {OPTION_LABELS[i]}
                  </span>
                  <span className="quiz-option-text">{opt}</span>
                  {state === 'correct' && <span className="quiz-option-icon">✓</span>}
                  {state === 'wrong'   && <span className="quiz-option-icon quiz-option-icon--wrong">✗</span>}
                </button>
              );
            })}
          </div>

          {hasAnswered && currentQ.explanation && (
            <div className={`quiz-explanation quiz-explanation--${isCorrect ? 'correct' : 'wrong'}`}
              style={{ borderColor: isCorrect ? (isDark ? '#4ADE80' : '#22C55E') : (isDark ? '#F87171' : '#EF4444') }}
            >
              <span className="quiz-explanation-icon">{isCorrect ? '✓' : 'ℹ'}</span>
              <p className="quiz-explanation-text">{currentQ.explanation}</p>
            </div>
          )}

          {hasAnswered && (
            <div className="quiz-next-wrap">
              <button className="quiz-next-btn" style={{ background: accent }} onClick={handleNext}>
                {questionIdx < totalQ - 1 ? 'Next Question →' : 'See Results →'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── RESULT SCREEN ── */
  if (screen === 'result') {
    const correct = answers.filter((a, i) => a === run[i].correctIndex).length;
    const pct     = Math.round((correct / totalQ) * 100);
    const grade   = gradeFromPct(pct);
    const gradeColor = isDark ? grade.darkColor : grade.color;

    return (
      <div className="quiz-view">
        <div className="quiz-result">
          {newBest && <div className="quiz-new-best" style={{ color: accent }}>🎉 New best score!</div>}

          <div className="quiz-result-score-wrap">
            <div className="quiz-result-score" style={{ color: gradeColor }}>
              {correct}<span className="quiz-result-score-denom">/{totalQ}</span>
            </div>
            <div className="quiz-result-grade" style={{ color: gradeColor }}>{grade.letter}</div>
          </div>

          <p className="quiz-result-pct">{pct}% correct — {runMeta.title}</p>

          <div className="quiz-breakdown">
            {run.map((q, i) => {
              const isOk  = answers[i] === q.correctIndex;
              const chosen = answers[i];
              return (
                <div key={`${q.id}-${i}`} className={`quiz-breakdown-row quiz-breakdown-row--${isOk ? 'ok' : 'fail'}`}>
                  <span className="quiz-breakdown-icon" style={{ color: isOk ? (isDark ? '#4ADE80' : '#16A34A') : (isDark ? '#F87171' : '#DC2626') }}>
                    {isOk ? '✓' : '✗'}
                  </span>
                  <div className="quiz-breakdown-body">
                    <p className="quiz-breakdown-question">{q.question}</p>
                    {!isOk && (
                      <p className="quiz-breakdown-answer">
                        <span className="quiz-breakdown-wrong">Your answer: {chosen !== null ? q.options[chosen] : '—'}</span>
                        <span className="quiz-breakdown-correct" style={{ color: isDark ? '#4ADE80' : '#16A34A' }}>
                          Correct: {q.options[q.correctIndex]}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="quiz-result-actions">
            <button className="quiz-start-btn" style={{ background: accent }} onClick={() => start(runDesc)}>
              Try Again
            </button>
            <button className="quiz-back-btn" onClick={() => setScreen('select')}>
              ← All Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
