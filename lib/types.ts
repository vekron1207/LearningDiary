export interface Item {
  id: string;
  text: string;
  url?: string;
  note?: string;
  tag?: 'easy' | 'medium' | 'hard';
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
