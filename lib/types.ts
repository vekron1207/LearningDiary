/* ── Rich structured content (preferred over plain `details` string) ──
   Inline formatting inside any `text`/cell: **bold** and `term` (backticks). */
export type ContentBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'para'; text: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  | { kind: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { kind: 'examples'; items: Array<{ de: string; en: string }> }
  | { kind: 'callout'; tone?: 'tip' | 'warn'; text: string }
  | { kind: 'code'; text: string };

export interface Item {
  id: string;
  text: string;
  url?: string;
  note?: string;
  tag?: 'easy' | 'medium' | 'hard';
  details?: string;
  content?: ContentBlock[];
  solution?: string;
  solutions?: { python?: string; java?: string; javascript?: string };
}

export interface Section {
  id: string;
  title: string;
  week: string;
  items: Item[];
}

export type PhaseTheme = 'info' | 'success' | 'warning' | 'danger';

export interface Phase {
  id: string;
  label: string;
  weeks: string;
  theme: PhaseTheme;
  sections: Section[];
}

export interface Resource {
  id: string;
  text: string;
  url: string;
}

export interface StoredState {
  checks: Record<string, boolean>;
  completedAt: Record<string, string>;
  activeTab: string;
  openSections: Record<string, boolean>;
  startDate: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  level?: string;
}

export interface Quiz {
  id: string;
  title: string;
  level: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizScore {
  best: number;
  total: number;
  attempts: number;
}

/* ── Flashcards (active recall + spaced repetition) ── */
export interface Flashcard {
  id: string;
  de: string;              // front — German word/phrase
  en: string;              // back — English meaning
  gender?: 'der' | 'die' | 'das';
  plural?: string;         // plural form, e.g. "die Väter"
  example?: string;        // German example sentence
  exampleEn?: string;      // its translation
  emoji?: string;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  chapter: string;         // e.g. "Kapitel 5"
  description?: string;
  cards: Flashcard[];
}

/* ── Interactive drills ── */
export type DrillKind = 'blank' | 'order';

export interface Drill {
  id: string;
  kind: DrillKind;
  prompt: string;          // sentence with ___ (blank) or an instruction/English gloss (order)
  gloss?: string;          // supporting translation shown under the prompt
  /* blank */
  answer?: string;         // correct fill
  options?: string[];      // multiple choice; omit for free typing
  /* order */
  tokens?: string[];       // scrambled word bank
  solution?: string[];     // correct ordered tokens
  explanation?: string;
}

export interface DrillSet {
  id: string;
  title: string;
  chapter: string;
  description?: string;
  drills: Drill[];
}

/* A self-contained study package: lessons + flashcards + drills for the
   same goal, surfaced as one tab with an internal Lessons/Flashcards/Drills
   switch. */
export interface StudyModule {
  id: string;              // tab id
  label: string;           // tab label, e.g. "Kapitel 5–7"
  phase: Phase;            // the lessons (rendered like any phase)
  flashcards?: FlashcardDeck[];
  drills?: DrillSet[];
  quizzes?: Quiz[];
}

export interface Track {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  darkColor: string;
  phases: Phase[];
  resources: Resource[];
  quizzes?: Quiz[];
  studyModules?: StudyModule[];
}

/* All checkable learning items for a track — phases plus every study module.
   Deduplicated by id, since shared content (e.g. Kapitel 5–7 appearing both
   standalone and inside Test 1) must be counted once. */
export function trackLearningItemIds(track: Track): string[] {
  const phaseItems = track.phases.flatMap(p => p.sections.flatMap(s => s.items.map(i => i.id)));
  const modItems   = (track.studyModules ?? []).flatMap(m => m.phase.sections.flatMap(s => s.items.map(i => i.id)));
  return [...new Set([...phaseItems, ...modItems])];
}

export function trackTotalCount(track: Track): number {
  return trackLearningItemIds(track).length + track.resources.length;
}

export interface FriendInfo {
  uid: string;
  displayName: string;
  addedAt: string;
}

export interface FriendTrackSnap {
  done: number;
  checks: Record<string, boolean>;
}

export type FriendProgress = Record<string, FriendTrackSnap>; /* trackId → snap */
