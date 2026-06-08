import type { Phase, Resource } from './types';

// Full JavaScript Mastery content — populated in a follow-up session
export const JS_PHASES: Phase[] = [
  {
    id: 'js-placeholder',
    label: 'Coming Soon',
    weeks: 'Topic 01',
    theme: 'warning',
    sections: [
      {
        id: 'js-ph-s',
        title: 'JavaScript Mastery — Content Loading',
        week: 'Full content coming soon',
        items: [
          { id: 'js-ph-1', text: 'Data Types & Type System', note: '8 types, typeof, == vs ===, falsy list, coercion' },
          { id: 'js-ph-2', text: 'Built-in Methods — Array, String, Object, Math', note: 'map/filter/reduce, all string methods, Object.keys/values/entries' },
          { id: 'js-ph-3', text: 'Functions & Closures', note: 'Declarations vs expressions vs arrow, IIFE, HOF, currying, memoization' },
          { id: 'js-ph-4', text: 'Scope & Hoisting', note: 'var/let/const, TDZ, execution context' },
          { id: 'js-ph-5', text: 'this Keyword — 4 binding rules', note: 'Implicit, explicit (call/apply/bind), new, arrow' },
          { id: 'js-ph-6', text: 'Prototypes & ES6 Classes', note: 'Prototype chain, extends/super, private fields' },
          { id: 'js-ph-7', text: 'Async JavaScript & Promises (full)', note: 'Event loop, Promise.all/allSettled/any/race, async/await patterns' },
          { id: 'js-ph-8', text: 'Error Handling', note: '5 error types, try/catch/finally, custom errors, unhandled rejections' },
          { id: 'js-ph-9', text: 'Modern JS', note: 'Destructuring, spread/rest, optional chaining, nullish coalescing, Map, Set' },
          { id: 'js-ph-10', text: 'Top 50 Interview Q&A (with detailed answers)', note: 'Core language, async, DOM, performance patterns' },
          { id: 'js-ph-11', text: 'React Patterns', note: 'All hooks, compound components, render props, HOC, performance, error boundaries' },
        ],
      },
    ],
  },
];

export const JS_RESOURCES: Resource[] = [
  { id: 'jsr1', text: 'MDN Web Docs — definitive JS reference', url: 'https://developer.mozilla.org' },
  { id: 'jsr2', text: 'JavaScript.info — the modern JS tutorial', url: 'https://javascript.info' },
  { id: 'jsr3', text: "You Don't Know JS (YDKJS) — deep dives", url: 'https://github.com/getify/You-Dont-Know-JS' },
  { id: 'jsr4', text: 'javascript-questions by lydiahallie — 100+ Q&A', url: 'https://github.com/lydiahallie/javascript-questions' },
  { id: 'jsr5', text: 'React documentation', url: 'https://react.dev' },
];
