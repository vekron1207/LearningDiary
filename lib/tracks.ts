import { PHASES as JOB_PHASES, RESOURCES as JOB_RESOURCES } from './data';
import { LC_PHASES, LC_RESOURCES } from './data-leetcode';
import { JS_PHASES, JS_RESOURCES } from './data-js';
import { DE_PHASES, DE_RESOURCES } from './data-german';
import { DE_QUIZZES } from './data-german-quiz';
import type { Track } from './types';

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
    description: 'A1 to B2 German — alphabet and greetings through grammar, cases, past tenses, passive voice, and conversational fluency.',
    icon: '🇩🇪',
    color: '#8B5CF6',
    darkColor: '#A78BFA',
    phases: DE_PHASES,
    resources: DE_RESOURCES,
    quizzes: DE_QUIZZES,
  },
];

export function getTrack(id: string): Track | undefined {
  return TRACKS.find(t => t.id === id);
}
