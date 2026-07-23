import { PHASES as JOB_PHASES, RESOURCES as JOB_RESOURCES } from './data';
import { LC_PHASES, LC_RESOURCES } from './data-leetcode';
import { JS_PHASES, JS_RESOURCES } from './data-js';
import { phaseKapitel57, DE_FLASHCARDS, DE_DRILLS, DE_KAPITEL_QUIZZES } from './data-german-kapitel';
import { GERMAN_CHAPTERS_BEFORE, GERMAN_CHAPTERS_AFTER } from './data-german-course';
import type { Track, StudyModule } from './types';

/* Kapitel 5–7 also appear as standalone chapters, reusing the exact same
   content as the "Test 1" package (so progress is shared, not duplicated). */
function soloChapter(idx: number, label: string): StudyModule {
  const section = phaseKapitel57.sections[idx];
  return {
    id: `k${idx + 5}`,
    label,
    phase: { id: `${section.id}-solo`, label, weeks: `A1 · ${label}`, theme: 'info', sections: [section] },
    flashcards: [DE_FLASHCARDS[idx]],
    drills: [DE_DRILLS[idx]],
    quizzes: [DE_KAPITEL_QUIZZES[idx]],
  };
}

export const TRACKS: Track[] = [
  {
    id: 'job-switch',
    label: 'Java Roadmap',
    description: '30-week Java/Spring/LeetCode plan for switching to backend engineering. Structured phases from core Java to system design to job applications.',
    icon: '🚀',
    color: '#22C55E',
    darkColor: '#4ADE80',
    phases: JOB_PHASES,
    resources: JOB_RESOURCES,
  },
  {
    id: 'leetcode',
    label: 'LeetCode Patterns',
    description: 'NeetCode 150 / Blind 75 organized by algorithm pattern. Arrays through DP — every pattern with the key insight.',
    icon: '🧩',
    color: '#F97316',
    darkColor: '#FB923C',
    phases: LC_PHASES,
    resources: LC_RESOURCES,
  },
  {
    id: 'javascript',
    label: 'JavaScript Mastery',
    description: 'Complete JS reference and interview prep. Data types through async patterns, 50 detailed Q&A, and React hooks.',
    icon: '⚡',
    color: '#EAB308',
    darkColor: '#FDE047',
    phases: JS_PHASES,
    resources: JS_RESOURCES,
  },
  {
    id: 'german',
    label: 'German Learning',
    description: 'Goethe A1 Kapitel 5–7 — Familie & Alltag, Freizeit, Im Büro. Lessons, flashcards, drills and quizzes in one package.',
    icon: '🇩🇪',
    color: '#8B5CF6',
    darkColor: '#A78BFA',
    phases: [],
    resources: [],
    studyModules: [
      ...GERMAN_CHAPTERS_BEFORE,                 // Kapitel 1–4
      soloChapter(0, 'Kapitel 5'),
      soloChapter(1, 'Kapitel 6'),
      soloChapter(2, 'Kapitel 7'),
      ...GERMAN_CHAPTERS_AFTER,                  // Kapitel 8–12
      {
        id: 'kapitel',
        label: 'Test 1',
        phase: phaseKapitel57,
        flashcards: DE_FLASHCARDS,
        drills: DE_DRILLS,
        quizzes: DE_KAPITEL_QUIZZES,
      },
    ],
  },
];

export function getTrack(id: string): Track | undefined {
  return TRACKS.find(t => t.id === id);
}

const TRACK_MONOGRAMS: Record<string, string> = {
  'job-switch': 'JR',
  leetcode: 'LC',
  javascript: 'JS',
  german: 'DE',
};

export function getTrackMonogram(id: string): string {
  return TRACK_MONOGRAMS[id] ?? id.slice(0, 2).toUpperCase();
}
