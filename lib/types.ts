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
