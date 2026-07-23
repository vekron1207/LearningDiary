import type { ContentBlock, Flashcard, Item, Drill, QuizQuestion, Phase, Section, StudyModule } from './types';

/* Build a vocabulary table ContentBlock from a list of cards. */
export function vocabTable(cards: Flashcard[]): ContentBlock {
  return {
    kind: 'table',
    caption: 'Tip: study these in the **Flashcards** tab with audio and spaced repetition.',
    headers: ['German', 'English', 'Plural / note', 'Example'],
    rows: cards.map(c => [
      (c.gender ? `${c.gender} ` : '') + c.de,
      c.en,
      c.plural ?? '—',
      c.example ?? '—',
    ]),
  };
}

/* Standard chapter overview block. */
export function overview(objectives: string[], time: string, difficulty: string, vocab: number, grammar: string, situations: string): ContentBlock[] {
  return [
    { kind: 'heading', text: 'Learning objectives' },
    { kind: 'list', items: objectives },
    {
      kind: 'table',
      headers: ['At a glance', ''],
      rows: [
        ['Estimated time', time],
        ['Difficulty', difficulty],
        ['Vocabulary', `${vocab} words`],
        ['Grammar', grammar],
        ['Real-life situations', situations],
      ],
    },
    { kind: 'callout', tone: 'tip', text: 'Work the loop: **read the lesson → study the flashcards → do the drills → take the quiz.**' },
  ];
}

/* Assemble a full chapter package (Lessons + Flashcards + Drills + Quiz)
   from its raw content, so every chapter shares one consistent shape. */
export function makeChapter(opts: {
  n: number;
  label: string;
  subtitle: string;
  objectives: string[];
  grammarSummary: string;
  situations: string;
  lessons: Item[];
  vocab: Flashcard[];
  drills: Drill[];
  quiz: QuizQuestion[];
}): StudyModule {
  const chapter = `Kapitel ${opts.n}`;
  const section: Section = {
    id: `de-k${opts.n}`,
    title: `${opts.label} — ${opts.subtitle}`,
    week: opts.subtitle,
    items: [
      {
        id: `k${opts.n}-overview`,
        text: 'Overview — what you’ll learn',
        content: overview(opts.objectives, '2–3 hours', 'A1 · beginner', opts.vocab.length, opts.grammarSummary, opts.situations),
      },
      ...opts.lessons,
      {
        id: `k${opts.n}-vocab`,
        text: `Vocabulary — ${opts.subtitle}`,
        content: [
          { kind: 'para', text: 'Learn each noun **with its article and plural**. Cover the English column and test yourself.' },
          vocabTable(opts.vocab),
        ],
      },
    ],
  };
  const phase: Phase = {
    id: `de-k${opts.n}-phase`,
    label: opts.label,
    weeks: `A1 · ${chapter}`,
    theme: 'info',
    sections: [section],
  };
  return {
    id: `k${opts.n}`,
    label: opts.label,
    phase,
    flashcards: [{ id: `deck-k${opts.n}`, title: `${opts.label} — ${opts.subtitle}`, chapter, description: `${opts.vocab.length} words`, cards: opts.vocab }],
    drills: [{ id: `drill-k${opts.n}`, title: `${opts.label} — ${opts.subtitle}`, chapter, description: 'Grammar & vocabulary practice', drills: opts.drills }],
    quizzes: [{ id: `de-quiz-k${opts.n}`, title: `${opts.label} — ${opts.subtitle}`, level: 'A1', description: 'Vocabulary & grammar check.', questions: opts.quiz }],
  };
}
