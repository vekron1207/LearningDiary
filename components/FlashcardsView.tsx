'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { FlashcardDeck, Flashcard } from '@/lib/types';
import { shuffle } from '@/lib/shuffle';

type Mode = 'all' | 'difficult' | 'favorites';
type Screen = 'select' | 'study' | 'done';

/* Per-card spaced-repetition state (Leitner boxes 0–5). */
interface CardState { box: number; fav: boolean; }
type Store = Record<string, CardState>;

const MASTERED_BOX = 4;

/* Speak German text with the browser's speech engine (no external service). */
function speak(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    u.rate = 0.92;
    const voice = window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith('de'));
    if (voice) u.voice = voice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch { /* speech unavailable */ }
}

function SpeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

export default function FlashcardsView({
  decks, trackId, color, darkColor, isDark,
}: {
  decks: FlashcardDeck[]; trackId: string; color: string; darkColor: string; isDark: boolean;
}) {
  const accent = isDark ? darkColor : color;
  const STORE_KEY = `learning-diary-flash-${trackId}`;

  const [store, setStore]       = useState<Store>({});
  const [loaded, setLoaded]     = useState(false);
  const [screen, setScreen]     = useState<Screen>('select');
  const [deckIdx, setDeckIdx]   = useState(0);
  const [queue, setQueue]       = useState<Flashcard[]>([]);
  const [pos, setPos]           = useState(0);
  const [flipped, setFlipped]   = useState(false);
  const [reviewed, setReviewed] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setStore(JSON.parse(raw));
    } catch { /* unavailable */ }
    setLoaded(true);
  }, [STORE_KEY]);

  const persist = useCallback((next: Store) => {
    setStore(next);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch { /* quota */ }
  }, [STORE_KEY]);

  const cardState = useCallback((id: string): CardState => store[id] ?? { box: 0, fav: false }, [store]);

  const deck = decks[deckIdx];
  const card = queue[pos];

  const deckStats = useMemo(() => decks.map(d => {
    const mastered = d.cards.filter(c => (store[c.id]?.box ?? 0) >= MASTERED_BOX).length;
    const fav      = d.cards.filter(c => store[c.id]?.fav).length;
    return { mastered, fav, total: d.cards.length };
  }), [decks, store]);

  function buildQueue(d: FlashcardDeck, mode: Mode): Flashcard[] {
    let cards = d.cards.slice();
    if (mode === 'difficult') cards = cards.filter(c => (store[c.id]?.box ?? 0) < 2);
    if (mode === 'favorites') cards = cards.filter(c => store[c.id]?.fav);
    // Shuffle first, then a stable sort by box → least-known first, but random order within each box (fresh every redo)
    return shuffle(cards).sort((a, b) => (store[a.id]?.box ?? 0) - (store[b.id]?.box ?? 0));
  }

  function start(idx: number, mode: Mode) {
    const q = buildQueue(decks[idx], mode);
    if (q.length === 0) return;
    setDeckIdx(idx);
    setQueue(q);
    setPos(0);
    setFlipped(false);
    setReviewed(0);
    setScreen('study');
  }

  const grade = useCallback((known: boolean) => {
    if (!card) return;
    const prev = cardState(card.id);
    const box = known ? Math.min(prev.box + 1, 5) : 0;
    persist({ ...store, [card.id]: { ...prev, box } });
    setReviewed(r => r + 1);
    if (pos < queue.length - 1) {
      setPos(p => p + 1);
      setFlipped(false);
    } else {
      setScreen('done');
    }
  }, [card, cardState, persist, store, pos, queue.length]);

  const toggleFav = useCallback(() => {
    if (!card) return;
    const prev = cardState(card.id);
    persist({ ...store, [card.id]: { ...prev, fav: !prev.fav } });
  }, [card, cardState, persist, store]);

  /* Keyboard shortcuts during study */
  useEffect(() => {
    if (screen !== 'study') return;
    function onKey(e: KeyboardEvent) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped(f => !f); }
      else if (e.key === 's' || e.key === 'S') { if (card) speak(card.de); }
      else if (flipped && (e.key === '1')) grade(false);
      else if (flipped && (e.key === '2')) grade(true);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, flipped, card, grade]);

  if (!loaded) return null;

  /* ── SELECT ── */
  if (screen === 'select') {
    return (
      <div className="fc-view">
        <div className="fc-intro">
          <h2 className="fc-title">Flashcards</h2>
          <p className="fc-sub">Active recall with spaced repetition. Tap a card to flip, rate how well you knew it, and the hardest words come back sooner. Audio is spoken by your browser.</p>
        </div>
        <div className="fc-deck-grid">
          {decks.map((d, i) => {
            const st = deckStats[i];
            const pct = Math.round((st.mastered / st.total) * 100);
            return (
              <div key={d.id} className="fc-deck">
                <div className="fc-deck-chapter" style={{ color: accent }}>{d.chapter}</div>
                <h3 className="fc-deck-title">{d.title.replace(/^Kapitel \d+ — /, '')}</h3>
                <p className="fc-deck-desc">{d.description}</p>
                <div className="fc-deck-bar-wrap">
                  <div className="fc-deck-bar" style={{ width: `${pct}%`, background: accent }} />
                </div>
                <div className="fc-deck-meta">{st.mastered}/{st.total} mastered{st.fav > 0 && ` · ${st.fav} ★`}</div>
                <div className="fc-deck-actions">
                  <button className="fc-btn fc-btn-primary" style={{ background: accent }} onClick={() => start(i, 'all')}>Study all</button>
                  <button className="fc-btn" onClick={() => start(i, 'difficult')} disabled={d.cards.filter(c => (store[c.id]?.box ?? 0) < 2).length === 0}>Difficult</button>
                  <button className="fc-btn" onClick={() => start(i, 'favorites')} disabled={st.fav === 0}>★ Favorites</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── DONE ── */
  if (screen === 'done') {
    const st = deckStats[deckIdx];
    return (
      <div className="fc-view">
        <div className="fc-done">
          <div className="fc-done-emoji">🎉</div>
          <h2 className="fc-done-title">Session complete</h2>
          <p className="fc-done-sub">You reviewed <strong>{reviewed}</strong> card{reviewed !== 1 ? 's' : ''} in {deck.chapter}. Mastered so far: <strong>{st.mastered}/{st.total}</strong>.</p>
          <div className="fc-done-actions">
            <button className="fc-btn fc-btn-primary" style={{ background: accent }} onClick={() => start(deckIdx, 'all')}>Study again</button>
            <button className="fc-btn" onClick={() => setScreen('select')}>← All decks</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── STUDY ── */
  if (!card) return null;
  const st = cardState(card.id);
  return (
    <div className="fc-view">
      <div className="fc-study-head">
        <button className="fc-exit" onClick={() => setScreen('select')}>✕ Exit</button>
        <span className="fc-counter">{pos + 1} / {queue.length}</span>
        <button className={`fc-fav${st.fav ? ' on' : ''}`} onClick={toggleFav} title="Toggle favorite" style={st.fav ? { color: accent } : undefined}>
          <StarIcon filled={st.fav} />
        </button>
      </div>
      <div className="fc-progress"><div className="fc-progress-fill" style={{ width: `${(pos / queue.length) * 100}%`, background: accent }} /></div>

      <div className={`fc-card${flipped ? ' flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
        <div className="fc-card-inner">
          {/* Front */}
          <div className="fc-face fc-front">
            {card.emoji && <div className="fc-emoji">{card.emoji}</div>}
            <div className="fc-de">
              {card.gender && <span className="fc-gender" style={{ color: accent }}>{card.gender} </span>}
              {card.de}
            </div>
            <button className="fc-speak" onClick={(e) => { e.stopPropagation(); speak(card.de); }} title="Listen (S)">
              <SpeakerIcon />
            </button>
            <div className="fc-hint">Tap or press Space to flip</div>
          </div>
          {/* Back */}
          <div className="fc-face fc-back">
            <div className="fc-en">{card.en}</div>
            {card.plural && card.plural !== '—' && <div className="fc-plural">Plural: {card.plural}</div>}
            {card.example && (
              <div className="fc-example">
                <button className="fc-speak-sm" onClick={(e) => { e.stopPropagation(); speak(card.example!); }} title="Listen"><SpeakerIcon /></button>
                <div>
                  <div className="fc-example-de">{card.example}</div>
                  {card.exampleEn && <div className="fc-example-en">{card.exampleEn}</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {flipped ? (
        <div className="fc-grade">
          <button className="fc-grade-btn fc-again" onClick={() => grade(false)}>Again <kbd>1</kbd></button>
          <button className="fc-grade-btn fc-got" style={{ background: accent, borderColor: accent }} onClick={() => grade(true)}>Got it <kbd>2</kbd></button>
        </div>
      ) : (
        <div className="fc-grade fc-grade-hint">Rate yourself after you flip</div>
      )}
    </div>
  );
}
