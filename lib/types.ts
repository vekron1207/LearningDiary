export interface Item {
  id: string;
  text: string;
  url?: string;
  note?: string;
  tag?: 'easy' | 'medium' | 'hard';
  details?: string;
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

export interface Track {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  darkColor: string;
  phases: Phase[];
  resources: Resource[];
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
