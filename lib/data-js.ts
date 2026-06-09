import type { Phase, Resource } from './types';

/* ════════════════════════════════════════════════════════
   RESOURCES
   ════════════════════════════════════════════════════════ */
export const JS_RESOURCES: Resource[] = [
  /* Reference */
  { id: 'jsr1', text: 'MDN — JavaScript complete reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference' },
  { id: 'jsr2', text: 'javascript.info — The Modern JavaScript Tutorial', url: 'https://javascript.info' },
  { id: 'jsr3', text: "You Don't Know JS (YDKJS) — free deep-dive book series", url: 'https://github.com/getify/You-Dont-Know-JS' },
  { id: 'jsr4', text: 'Eloquent JavaScript — free full book online', url: 'https://eloquentjavascript.net' },
  /* Async / Event Loop */
  { id: 'jsr5', text: 'MDN — Concurrency model & Event Loop', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop' },
  { id: 'jsr6', text: 'javascript.info — Promises, async/await (full chapter)', url: 'https://javascript.info/async' },
  { id: 'jsr7', text: 'JSV9000 — interactive visual event loop playground', url: 'https://www.jsv9000.app' },
  { id: 'jsr8', text: "Jake Archibald — Tasks, microtasks, queues and schedules (blog)", url: 'https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules' },
  /* Interview prep */
  { id: 'jsr9',  text: 'javascript-questions by lydiahallie — 150+ Q&A with explanations', url: 'https://github.com/lydiahallie/javascript-questions' },
  { id: 'jsr10', text: 'Front End Interview Handbook — JS questions', url: 'https://www.frontendinterviewhandbook.com/javascript-questions' },
  { id: 'jsr11', text: 'BFE.dev — JS / React coding interview questions', url: 'https://bigfrontend.dev' },
  { id: 'jsr12', text: 'Great Frontend — system design & coding rounds', url: 'https://www.greatfrontend.com' },
  /* React */
  { id: 'jsr13', text: 'React official docs — react.dev', url: 'https://react.dev' },
  { id: 'jsr14', text: 'React hooks reference — all built-in hooks', url: 'https://react.dev/reference/react' },
  { id: 'jsr15', text: 'Josh Comeau — Joy of React articles', url: 'https://www.joshwcomeau.com/tutorials/react' },
  { id: 'jsr16', text: 'TkDodo\'s React Query / React patterns blog', url: 'https://tkdodo.eu/blog' },
];

/* ════════════════════════════════════════════════════════
   PHASE 1 — ASYNC JAVASCRIPT & THE EVENT LOOP
   ════════════════════════════════════════════════════════ */
const phaseEventLoop: Phase = {
  id: 'js-event-loop',
  label: 'Async & Event Loop',
  weeks: 'Topic 01',
  theme: 'info',
  sections: [
    {
      id: 'js-el-runtime',
      title: 'The JavaScript Runtime',
      week: 'Foundations',
      items: [
        {
          id: 'js-el-1',
          text: 'JavaScript is single-threaded — one call stack, one thing at a time',
          tag: 'easy',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop',
          note: 'Async ≠ multi-threaded. Browser/Node provide APIs on other threads.',
          details: 'JS has ONE call stack and executes ONE function at a time.\nAsync operations don\'t run JS in parallel — the browser/Node.js handles them externally.\nWhen they finish, a callback is queued for the event loop to pick up.\n\nThis is why blocking the call stack (e.g. a huge for-loop) freezes the browser —\nno other code, including UI events, can run while the stack is occupied.\n\nPractical rule: keep each "tick" of work short. Use async for anything slow.',
        },
        {
          id: 'js-el-2',
          text: 'Call Stack — LIFO structure tracking function execution frames',
          tag: 'easy',
          url: 'https://developer.mozilla.org/en-US/docs/Glossary/Call_stack',
          note: 'Each call pushes a frame, each return pops it.',
          details: 'When a function is called, a new execution frame is pushed onto the stack.\nWhen it returns, the frame is popped.\n\nExample:\n  function a() { b(); }\n  function b() { c(); }\n  function c() { console.log("hi"); }\n  a();\n  // Stack at peak: [global] → [a] → [b] → [c]\n\n"Uncaught RangeError: Maximum call stack size exceeded"\n→ infinite recursion / too many nested calls → stack overflow.',
        },
        {
          id: 'js-el-3',
          text: 'Web APIs — setTimeout, fetch, addEventListener live OUTSIDE the call stack',
          tag: 'easy',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API',
          note: 'JS calls them, browser runs them, then queues the callback.',
          details: 'The browser provides these APIs (the JS engine does NOT run them):\n  • setTimeout / setInterval\n  • fetch / XMLHttpRequest\n  • addEventListener (DOM events)\n  • requestAnimationFrame\n  • Geolocation, WebSockets, …\n\nFlow:\n  1. JS calls setTimeout(fn, 1000)\n  2. Browser starts a 1s timer on a separate thread\n  3. JS continues executing — stack is free\n  4. After 1s, browser pushes fn into the task queue\n  5. Event loop moves fn to call stack when stack is empty\n\nThis is why setTimeout(fn, 0) doesn\'t run IMMEDIATELY — it still waits for\nthe current call stack to empty and all microtasks to drain.',
        },
        {
          id: 'js-el-4',
          text: 'Heap — unstructured memory where objects are allocated',
          tag: 'easy',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management',
          note: 'Garbage collected; the stack only holds primitive values & references.',
          details: 'The memory heap is where objects, arrays, and closures live.\nThe call stack holds:\n  • Primitive values (number, bool, string, etc.)\n  • References (pointers) to heap objects\n\nGarbage collection (mark-and-sweep) frees heap objects that are unreachable.\nMemory leaks: forgotten event listeners, large closures, detached DOM nodes\nkept in global variables — GC can\'t collect them because they\'re still reachable.',
        },
      ],
    },
    {
      id: 'js-el-queues',
      title: 'Task Queue & Microtask Queue',
      week: 'Queues',
      items: [
        {
          id: 'js-el-5',
          text: 'Task Queue (Macrotask Queue) — setTimeout, setInterval, I/O, UI events',
          tag: 'medium',
          url: 'https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules',
          note: 'Event loop picks ONE macrotask per iteration, then drains all microtasks.',
          details: 'Macrotask sources:\n  • setTimeout / setInterval callbacks\n  • I/O callbacks (Node.js file/network)\n  • UI rendering tasks\n  • postMessage, MessageChannel\n  • setImmediate (Node.js only)\n\nEvent loop behavior:\n  1. Pick ONE task from the task queue\n  2. Run it to completion (no preemption)\n  3. Drain the entire microtask queue\n  4. Optionally: render the frame (browser)\n  5. Repeat\n\nsetTimeout(fn, 0) is NOT instant — browser minimum is ~4ms;\nNode.js is typically 1ms. The "0" just means "as soon as possible".',
        },
        {
          id: 'js-el-6',
          text: 'Microtask Queue — Promise callbacks, queueMicrotask(), MutationObserver',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide',
          note: 'Microtasks run BEFORE the next macrotask — the entire queue is drained.',
          details: 'Microtask sources:\n  • Promise .then / .catch / .finally callbacks\n  • async/await (the code after each "await")\n  • queueMicrotask(fn)\n  • MutationObserver callbacks\n\nKey rule: after EVERY macrotask (and after sync code), ALL microtasks run before\nthe next macrotask starts.\n\nDanger: a microtask that queues another microtask creates an infinite loop\nthat starves the task queue (and freezes the UI):\n  function loop() { Promise.resolve().then(loop); }\n  loop(); // 💀 UI freezes',
        },
        {
          id: 'js-el-7',
          text: 'Event loop algorithm — the exact order the engine follows',
          tag: 'medium',
          url: 'https://javascript.info/event-loop',
          note: 'Sync → microtasks → render → next macrotask → repeat.',
          details: 'Full browser event loop order per iteration:\n  1. Execute current macrotask (or initial script) to completion\n  2. Drain microtask queue completely (including newly added microtasks)\n  3. Render frame if needed (requestAnimationFrame, layout, paint)\n  4. Pick next macrotask from task queue\n  5. Go to step 1\n\nNode.js event loop phases (libuv):\n  timers → I/O callbacks → idle/prepare → poll → check (setImmediate) → close\n  + process.nextTick() and Promise callbacks drain between EVERY phase',
        },
        {
          id: 'js-el-8',
          text: 'queueMicrotask(fn) — lightweight alternative to Promise.resolve().then(fn)',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask',
          note: 'Same queue, but no Promise object overhead.',
          details: 'queueMicrotask(() => console.log("micro"));\n// Equivalent to:\nPromise.resolve().then(() => console.log("micro"));\n\nBut queueMicrotask:\n  • Creates no Promise object → less memory\n  • No catch-able rejection → simpler for fire-and-forget\n  • Available in browsers and Node 11+\n\nUse it in library/framework code when you need deferred-but-high-priority\ncallbacks without the overhead of Promise creation.',
        },
        {
          id: 'js-el-9',
          text: 'requestAnimationFrame — runs before each browser paint, ~60fps',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame',
          note: 'Use for smooth animation; pauses in hidden tabs.',
          details: 'rAF callbacks fire after microtasks but before the browser paints:\n  microtasks → rAF callbacks → layout/paint → next macrotask\n\nWhy not setTimeout(fn, 16)?\n  • setTimeout drifts — does not sync to display refresh rate\n  • rAF is called exactly when the browser is about to paint → no wasted frames\n  • rAF pauses automatically in background tabs → saves CPU/battery\n\nPattern:\n  function animate() {\n    updatePosition();\n    drawFrame();\n    requestAnimationFrame(animate); // schedule next frame\n  }\n  requestAnimationFrame(animate);',
        },
      ],
    },
    {
      id: 'js-el-ordering',
      title: 'Ordering & Classic Interview Questions',
      week: 'Interview',
      items: [
        {
          id: 'js-el-10',
          text: 'Output order: sync → microtasks → macrotasks',
          tag: 'hard',
          url: 'https://www.jsv9000.app',
          note: 'Classic interview question — predict the console output.',
          details: 'console.log("1");                              // sync\nsetTimeout(() => console.log("2"), 0);         // macrotask\nPromise.resolve().then(() => console.log("3")); // microtask\nconsole.log("4");                              // sync\n\nOutput: 1, 4, 3, 2\n\nStep-by-step:\n  Sync code runs first → prints 1, 4\n  Microtask queue drains → Promise.then prints 3\n  Next macrotask runs → setTimeout prints 2\n\nRemember: microtasks ALWAYS beat macrotasks.',
        },
        {
          id: 'js-el-11',
          text: 'async/await and event loop — code before first await is synchronous',
          tag: 'hard',
          url: 'https://javascript.info/async-await',
          note: 'await suspends the function, not the whole thread.',
          details: 'async function foo() {\n  console.log("B");        // runs synchronously\n  await Promise.resolve(); // suspends foo\n  console.log("D");        // microtask — runs after sync\n}\nconsole.log("A");\nfoo();\nconsole.log("C");\n\nOutput: A, B, C, D\n\nWhy:\n  A → sync (before foo)\n  B → sync (inside foo, before first await)\n  foo suspends, control returns to caller\n  C → sync (after foo() call)\n  Microtasks drain: D → resumes after await\n\nKey rule: everything in an async function before the first await\nruns synchronously, just like regular code.',
        },
        {
          id: 'js-el-12',
          text: 'Multiple awaits — each await creates a microtask checkpoint',
          tag: 'hard',
          url: 'https://javascript.info/promise-chaining',
          note: 'n awaits = n microtask "turns" before resumption.',
          details: 'async function foo() {\n  await 1;  // suspends once → resumes after 1 microtask turn\n  await 2;  // suspends again → resumes after another turn\n  console.log("foo done");\n}\nasync function bar() {\n  await 1;\n  console.log("bar done");\n}\nfoo();\nbar();\n\nOutput: "bar done", "foo done"\n\nWhy: both functions pause at their first await.\nBoth resume in the next microtask turn.\nbar has only 1 await, foo has 2 → bar finishes first.\n\nThis is why deeply awaited code can be "overtaken" by shallower async code.',
        },
        {
          id: 'js-el-13',
          text: 'setTimeout inside Promise chain — macrotask nested in microtask',
          tag: 'hard',
          url: 'https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules',
          note: 'The setTimeout still goes to the macrotask queue regardless of nesting.',
          details: 'Promise.resolve()\n  .then(() => {\n    setTimeout(() => console.log("timeout"), 0);\n    console.log("then");\n  });\nconsole.log("sync");\n\nOutput: "sync", "then", "timeout"\n\nEven though setTimeout is called inside a .then() (microtask),\nit still schedules a macrotask — it cannot "inherit" microtask priority.\n\nPractical implication: if you need something to run before the next\npaint but after current microtasks, use queueMicrotask — not setTimeout.',
        },
      ],
    },
  ],
};

/* ════════════════════════════════════════════════════════
   PHASE 2 — PROMISES IN DEPTH
   ════════════════════════════════════════════════════════ */
const phasePromises: Phase = {
  id: 'js-promises',
  label: 'Promises',
  weeks: 'Topic 02',
  theme: 'success',
  sections: [
    /* ── Section 1: Fundamentals ── */
    {
      id: 'js-prom-fundamentals',
      title: 'Promise Fundamentals',
      week: 'States & Construction',
      items: [
        {
          id: 'js-prom-1',
          text: 'Promise — an object representing eventual completion or failure of async work',
          tag: 'easy',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
          note: 'A proxy for a value not yet known at creation time.',
          details: 'A Promise is in one of three states:\n  • pending   — initial state, neither fulfilled nor rejected\n  • fulfilled — operation completed successfully (has a value)\n  • rejected  — operation failed (has a reason/error)\n\nOnce a Promise is fulfilled OR rejected it is "settled".\nA settled Promise NEVER changes state — immutable result.\n\nBasic constructor:\n  const p = new Promise((resolve, reject) => {\n    // async work here\n    if (success) resolve(value);\n    else         reject(new Error("reason"));\n  });\n\nThe executor function runs synchronously — only the resolution is async.',
        },
        {
          id: 'js-prom-2',
          text: 'Promise executor runs synchronously — resolution is async',
          tag: 'medium',
          url: 'https://javascript.info/promise-basics',
          note: 'Code inside new Promise(...) runs immediately.',
          details: 'console.log("1");\nconst p = new Promise((resolve) => {\n  console.log("2");   // ← runs synchronously!\n  resolve("done");\n});\np.then(v => console.log("3:", v)); // ← async (microtask)\nconsole.log("4");\n\nOutput: 1, 2, 4, 3: done\n\nWhy: The executor body runs immediately when new Promise() is called.\nThe .then() callback is always async — it goes to the microtask queue\neven if the promise is already resolved.\n\nThis prevents race conditions — .then handlers never run synchronously.',
        },
        {
          id: 'js-prom-3',
          text: 'Promise.resolve(value) and Promise.reject(reason) — static shortcuts',
          tag: 'easy',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve',
          note: 'Creates an already-settled promise. Used for testing & wrapping values.',
          details: '// Immediately fulfilled:\nPromise.resolve(42).then(v => console.log(v)); // 42\n\n// Immediately rejected:\nPromise.reject(new Error("oops")).catch(e => console.log(e.message)); // oops\n\nSpecial case — passing a thenable to Promise.resolve():\n  Promise.resolve(anotherPromise) // returns anotherPromise itself (same reference)\n  Promise.resolve({ then: fn })   // adopts the thenable\'s state\n\nUse Promise.resolve() to:\n  • Normalise a value that might or might not be a Promise\n  • Start a clean Promise chain: Promise.resolve().then(...).then(...)',
        },
        {
          id: 'js-prom-4',
          text: '"Resolved" ≠ "fulfilled" — a Promise can be resolved to another Promise',
          tag: 'hard',
          url: 'https://tc39.es/ecma262/#sec-promise-resolve-functions',
          note: 'Resolved means "fate decided", not necessarily fulfilled.',
          details: 'Confusing terminology — the spec distinguishes:\n  • resolved  — fate is determined (may still be pending if resolved to a Promise)\n  • fulfilled — settled with a value\n  • rejected  — settled with a reason\n\nExample:\n  const inner = new Promise(res => setTimeout(res, 1000, "hi"));\n  const outer = Promise.resolve(inner); // outer is "resolved" but still PENDING\n  // outer follows inner — fulfills with "hi" after 1 second\n\nPractically: when you call resolve(aPromise), your promise "follows" that promise.\nThis is why returning a Promise from .then() causes chaining to wait for it.',
        },
      ],
    },

    /* ── Section 2: .then / .catch / .finally ── */
    {
      id: 'js-prom-chaining',
      title: '.then / .catch / .finally',
      week: 'Chaining & Errors',
      items: [
        {
          id: 'js-prom-5',
          text: '.then(onFulfilled, onRejected) — both arguments are optional',
          tag: 'easy',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then',
          note: 'Always returns a NEW Promise — the original is unchanged.',
          details: 'promise.then(onFulfilled, onRejected)\n  • onFulfilled — called with the resolved value\n  • onRejected  — called with the rejection reason\n  • Either can be omitted (pass null / undefined)\n\n.then() ALWAYS returns a new Promise:\n  • If handler returns a value    → new Promise fulfills with that value\n  • If handler throws             → new Promise rejects with that error\n  • If handler returns a Promise  → new Promise follows that inner Promise\n  • If handler is omitted         → fulfillment/rejection passes through\n\nThis return behaviour is what enables chaining.',
        },
        {
          id: 'js-prom-6',
          text: '.catch(fn) is sugar for .then(undefined, fn)',
          tag: 'easy',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch',
          note: '.catch only handles rejections — fulfilled values pass through.',
          details: 'promise.catch(onRejected)\n// exactly equivalent to:\npromise.then(undefined, onRejected)\n\nImportant: .catch() also returns a new Promise.\nIf your handler returns normally, the chain RECOVERS — continues as fulfilled:\n\n  Promise.reject(new Error("bad"))\n    .catch(e => "recovered")      // returns "recovered" → fulfilled\n    .then(v => console.log(v));   // prints "recovered"\n\nIf your handler throws again, the chain stays rejected:\n  .catch(e => { throw e; })       // still rejected',
        },
        {
          id: 'js-prom-7',
          text: '.finally(fn) — runs on both fulfillment and rejection, passes value through',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally',
          note: 'Perfect for cleanup: hide spinner, close DB connection, reset state.',
          details: 'promise\n  .then(data => process(data))\n  .catch(err => log(err))\n  .finally(() => hideSpinner()); // always runs\n\nKey behaviours:\n  • The callback receives NO argument (value or reason)\n  • Returns a Promise that passes the ORIGINAL value/reason through\n  • If finally throws or returns a rejected Promise, that rejection wins\n\n  Promise.resolve(42)\n    .finally(() => console.log("done")) // prints "done"\n    .then(v => console.log(v));          // prints 42 (original value passed through)',
        },
        {
          id: 'js-prom-8',
          text: 'Error propagation — a throw skips all .then handlers until the next .catch',
          tag: 'medium',
          url: 'https://javascript.info/promise-error-handling',
          note: 'Think of it like a try/catch around the entire chain.',
          details: 'Promise.resolve()\n  .then(() => { throw new Error("boom"); })\n  .then(() => console.log("skipped 1"))\n  .then(() => console.log("skipped 2"))\n  .catch(e => console.log("caught:", e.message)) // "caught: boom"\n  .then(() => console.log("chain continues"));   // "chain continues"\n\nRules:\n  • A rejection (throw or reject) skips subsequent .then() calls\n  • It is caught by the next .catch() in the chain\n  • After .catch() handles it, the chain continues as fulfilled\n  • Unhandled rejections trigger UnhandledPromiseRejection warning/event',
        },
        {
          id: 'js-prom-9',
          text: 'Missing return in .then — classic silent bug',
          tag: 'hard',
          url: 'https://javascript.info/promise-chaining',
          note: 'Not returning a Promise from .then means the next .then won\'t wait.',
          details: '// BUG — missing return:\nfetch("/api/user")\n  .then(res => {\n    res.json();          // ← forgot return!\n  })\n  .then(user => console.log(user)); // undefined 😱\n\n// CORRECT:\nfetch("/api/user")\n  .then(res => res.json())    // ← return the inner Promise\n  .then(user => console.log(user)); // works\n\nIf you return nothing (undefined), the next .then fires immediately\nwith undefined — the inner async work runs in parallel, not in sequence.\nThis is one of the most common Promise bugs in real code.',
        },
      ],
    },

    /* ── Section 3: Combinators ── */
    {
      id: 'js-prom-combinators',
      title: 'Promise Combinators',
      week: 'all / allSettled / any / race',
      items: [
        {
          id: 'js-prom-10',
          text: 'Promise.all(iterable) — all fulfill or first rejection short-circuits',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
          note: 'Results array preserves input order regardless of completion order.',
          details: 'const [user, posts, comments] = await Promise.all([\n  fetchUser(id),\n  fetchPosts(id),\n  fetchComments(id),\n]);\n// All 3 requests run in PARALLEL — waits for the slowest one\n\nBehaviour:\n  • Fulfills with an array of results in the same order as input\n  • Rejects immediately if ANY promise rejects (other results are ignored)\n  • Non-Promise values in the iterable are treated as Promise.resolve(value)\n\nUse when: you need ALL results and any failure is fatal.\nAvoid when: you want partial results even if some fail → use allSettled.',
        },
        {
          id: 'js-prom-11',
          text: 'Promise.allSettled(iterable) — waits for ALL, never rejects',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled',
          note: 'Returns [{status, value}] or [{status, reason}] for each input.',
          details: 'const results = await Promise.allSettled([\n  fetch("/api/a"),\n  fetch("/api/b"),   // even if this rejects...\n  fetch("/api/c"),\n]);\n\nresults.forEach(r => {\n  if (r.status === "fulfilled") use(r.value);\n  else                         logError(r.reason);\n});\n\nEach result object:\n  { status: "fulfilled", value: ... }\n  { status: "rejected",  reason: ... }\n\nUse when: partial success is acceptable — e.g. loading dashboard widgets\nwhere some might fail independently.',
        },
        {
          id: 'js-prom-12',
          text: 'Promise.any(iterable) — first fulfillment wins; rejects only if ALL reject',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any',
          note: 'Throws AggregateError if all promises reject.',
          details: 'const fastest = await Promise.any([\n  fetch("https://mirror-1.example.com/file"),\n  fetch("https://mirror-2.example.com/file"),\n  fetch("https://mirror-3.example.com/file"),\n]);\n// Uses whichever mirror responds successfully first\n\nBehaviour:\n  • Fulfills with the FIRST fulfilled value\n  • Ignores individual rejections\n  • Only rejects (AggregateError) if EVERY promise rejects\n\nDifference from race:\n  Promise.race fulfills/rejects with the first SETTLED promise.\n  Promise.any  only cares about the first FULFILLED promise.',
        },
        {
          id: 'js-prom-13',
          text: 'Promise.race(iterable) — first settlement (fulfill OR reject) wins',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race',
          note: 'Classic use: timeout pattern — race a fetch against a delayed rejection.',
          details: 'function withTimeout(promise, ms) {\n  const timeout = new Promise((_, reject) =>\n    setTimeout(() => reject(new Error("Timed out")), ms)\n  );\n  return Promise.race([promise, timeout]);\n}\n\nawait withTimeout(fetch("/api/slow"), 5000);\n// Rejects with "Timed out" if fetch takes > 5s\n\nBehaviour:\n  • Settles (fulfill or reject) with the FIRST settled promise\n  • Other promises continue running — their results are just ignored\n\nImportant: the "losing" promises are NOT cancelled — they keep running\nin the background. Use AbortController to actually cancel fetch requests.',
        },
        {
          id: 'js-prom-14',
          text: 'Combinator cheat sheet — choosing the right one',
          tag: 'medium',
          url: 'https://javascript.info/promise-api',
          note: 'All 4 accept any iterable; non-Promise values are auto-wrapped.',
          details: 'Promise.all(ps)        → need ALL results; one failure = total failure\nPromise.allSettled(ps) → want ALL results regardless of failures\nPromise.any(ps)        → want FIRST success; ignore individual failures\nPromise.race(ps)       → want FIRST settlement (success or failure)\n\nMnemonic:\n  all         → "all or nothing"\n  allSettled  → "wait for everyone, no giving up"\n  any         → "optimistic — first win"\n  race        → "first across the line (good or bad)"\n\nEdge cases:\n  Promise.all([])        → fulfills with [] immediately\n  Promise.allSettled([]) → fulfills with [] immediately\n  Promise.any([])        → rejects with AggregateError immediately\n  Promise.race([])       → pending FOREVER (never settles)',
        },
      ],
    },

    /* ── Section 4: Patterns & Gotchas ── */
    {
      id: 'js-prom-patterns',
      title: 'Patterns & Common Gotchas',
      week: 'Real-world usage',
      items: [
        {
          id: 'js-prom-15',
          text: 'Promisification — wrapping callback-based APIs in a Promise',
          tag: 'medium',
          url: 'https://javascript.info/promisify',
          note: 'Node.js util.promisify() does this automatically for (err, result) callbacks.',
          details: '// Manual promisification\nfunction readFileAsync(path) {\n  return new Promise((resolve, reject) => {\n    fs.readFile(path, "utf8", (err, data) => {\n      if (err) reject(err);\n      else     resolve(data);\n    });\n  });\n}\n\n// Node.js built-in:\nconst { promisify } = require("util");\nconst readFileAsync = promisify(fs.readFile);\n\n// Or use fs.promises directly (Node 10+):\nconst data = await fs.promises.readFile(path, "utf8");\n\nPattern: resolve on success, reject with Error on failure.\nAlways reject with an Error object — not a string.',
        },
        {
          id: 'js-prom-16',
          text: 'Promise constructor anti-pattern — wrapping a Promise in a new Promise',
          tag: 'hard',
          url: 'https://stackoverflow.com/questions/23803743/what-is-the-explicit-promise-construction-antipattern-and-how-do-i-avoid-it',
          note: 'If you already have a Promise, never wrap it in new Promise().',
          details: '// ❌ Anti-pattern (explicit construction anti-pattern):\nfunction getData() {\n  return new Promise((resolve, reject) => {\n    fetch("/api/data")\n      .then(res => resolve(res.json()))\n      .catch(err => reject(err));\n  });\n}\n\n// ✅ Correct — just return the chain:\nfunction getData() {\n  return fetch("/api/data").then(res => res.json());\n}\n\nProblems with the anti-pattern:\n  • Swallows errors thrown synchronously in the executor\n  • Harder to read\n  • Unnecessary Promise object created\n  • Easy to forget to call reject → Promise hangs forever',
        },
        {
          id: 'js-prom-17',
          text: 'Unhandled Promise rejection — always attach a .catch() or use try/catch',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event',
          note: 'In Node.js 15+ unhandled rejections crash the process by default.',
          details: '// Unhandled rejection — will warn/crash:\nPromise.reject(new Error("forgot to catch"));\n\n// Always handle:\nPromise.reject(new Error("handled")).catch(console.error);\n\n// Global handler (last resort, not a substitute for proper handling):\nwindow.addEventListener("unhandledrejection", event => {\n  console.error("Unhandled:", event.reason);\n  event.preventDefault(); // suppresses console warning\n});\n\n// In Node.js:\nprocess.on("unhandledRejection", (reason) => {\n  console.error("Unhandled rejection:", reason);\n  process.exit(1);\n});\n\nBest practice: always end Promise chains with .catch() and\nalways await inside try/catch in async functions.',
        },
        {
          id: 'js-prom-18',
          text: 'Sequential vs Parallel with Promise.all — the key performance pattern',
          tag: 'hard',
          url: 'https://javascript.info/async-await#error-handling',
          note: 'Sequential = each waits for the previous. Parallel = all start immediately.',
          details: '// ❌ Sequential (slow — each waits for previous):\nconst user    = await fetchUser(1);    // starts at t=0, finishes at t=1s\nconst profile = await fetchProfile(1); // starts at t=1s, finishes at t=2s\n// Total time: ~2 seconds\n\n// ✅ Parallel (fast — all start at the same time):\nconst [user, profile] = await Promise.all([\n  fetchUser(1),    // starts at t=0\n  fetchProfile(1), // starts at t=0\n]);\n// Total time: ~1 second (the slower of the two)\n\nRule of thumb:\n  Independent async operations → run in parallel with Promise.all\n  Dependent operations (B needs result of A) → sequential await is correct\n\nAvoiding sequential when you don\'t need to is one of the biggest\nperformance wins in real async code.',
        },
      ],
    },
  ],
};

/* ════════════════════════════════════════════════════════
   PHASE 3 — ASYNC / AWAIT PATTERNS
   ════════════════════════════════════════════════════════ */
const phaseAsyncAwait: Phase = {
  id: 'js-async-await',
  label: 'async / await',
  weeks: 'Topic 03',
  theme: 'warning',
  sections: [
    /* ── Section 1: async Function Basics ── */
    {
      id: 'js-aa-basics',
      title: 'async Function Basics',
      week: 'Syntax & Mechanics',
      items: [
        {
          id: 'js-aa-1',
          text: 'async functions ALWAYS return a Promise — return value is auto-wrapped',
          tag: 'easy',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function',
          note: 'Even returning a plain value wraps it in Promise.resolve().',
          details: 'async function greet() {\n  return "hello";\n}\ngreet(); // → Promise { "hello" }\ngreet().then(console.log); // "hello"\n\nThrowing inside an async function rejects the returned Promise:\nasync function fail() {\n  throw new Error("oops");\n}\nfail().catch(e => console.log(e.message)); // "oops"\n\nAll async function forms:\n  async function foo() {}          // declaration\n  const foo = async function() {}  // expression\n  const foo = async () => {}       // arrow\n  class A { async method() {} }    // method\n\nNote: async generators also exist: async function* gen() { yield await fetch(...); }',
        },
        {
          id: 'js-aa-2',
          text: 'await pauses the async function — NOT the whole thread',
          tag: 'easy',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await',
          note: 'The event loop is free while awaiting — other code can run.',
          details: 'async function loadData() {\n  console.log("before");\n  const data = await fetch("/api");  // pauses HERE\n  console.log("after", data);       // resumes here\n}\nloadData();\nconsole.log("this runs while fetch is in flight");\n\nOutput:\n  "before"\n  "this runs while fetch is in flight"\n  "after" [data]\n\nawait can pause on:\n  • A Promise       → waits for it to settle\n  • A non-Promise   → equivalent to await Promise.resolve(value)\n                      (still async — defers to next microtask)\n  • A thenable      → treated like a Promise\n\nawait is only valid inside an async function (or top-level in ES modules).',
        },
        {
          id: 'js-aa-3',
          text: 'await unwraps nested Promises — no matter how deeply nested',
          tag: 'medium',
          url: 'https://javascript.info/async-await',
          note: 'await Promise.resolve(Promise.resolve(42)) gives 42, not a Promise.',
          details: 'async function demo() {\n  const a = await Promise.resolve(42);          // 42\n  const b = await Promise.resolve(Promise.resolve(99)); // 99, not a Promise\n  const c = await 7;                             // 7 (non-Promise, still async)\n  console.log(a, b, c); // 42 99 7\n}\n\nThis recursive unwrapping is handled by the Promise resolution procedure.\nYou cannot get a "Promise of a Promise" out of await — it always resolves fully.\n\nException: await on a non-thenable object returns the object itself:\n  await { name: "obj" } → { name: "obj" } (no unwrapping)',
        },
        {
          id: 'js-aa-4',
          text: 'Top-level await — valid in ES Modules without an async wrapper',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#top_level_await',
          note: 'Only works in .mjs files or <script type="module">. Blocks module loading.',
          details: '// In an ES Module (file.mjs or <script type="module">):\nconst config = await fetch("/config.json").then(r => r.json());\nexport const API_URL = config.apiUrl; // safe to export\n\nBefore top-level await, you had to use an IIFE:\n(async () => {\n  const config = await fetch("/config.json").then(r => r.json());\n  // use config...\n})();\n\nTop-level await BLOCKS the entire module from completing until resolved.\nImporters of this module will also wait — be careful with slow awaits\nat the top level as they delay the whole import chain.',
        },
      ],
    },

    /* ── Section 2: Error Handling ── */
    {
      id: 'js-aa-errors',
      title: 'Error Handling',
      week: 'try / catch / finally',
      items: [
        {
          id: 'js-aa-5',
          text: 'try/catch/finally replaces .catch()/.finally() for async/await code',
          tag: 'easy',
          url: 'https://javascript.info/async-await#error-handling',
          note: 'Catches both thrown errors AND rejected Promises awaited inside.',
          details: 'async function loadUser(id) {\n  try {\n    const res  = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    const user = await res.json();\n    return user;\n  } catch (err) {\n    console.error("Failed to load user:", err.message);\n    return null;  // recover with a default\n  } finally {\n    hideSpinner(); // always runs\n  }\n}\n\ncatch handles:\n  • Network errors from fetch\n  • Errors thrown manually (throw new Error(...))\n  • Errors thrown by any awaited Promise\n\nfinally runs whether try succeeded or catch ran — perfect for cleanup.',
        },
        {
          id: 'js-aa-6',
          text: 'Granular error handling — catch different error types separately',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch',
          note: 'JS has no typed catch — check error.name or use instanceof.',
          details: 'async function process() {\n  try {\n    await riskyOperation();\n  } catch (err) {\n    if (err instanceof NetworkError) {\n      retry();\n    } else if (err.name === "ValidationError") {\n      showUserMessage(err.message);\n    } else {\n      throw err; // re-throw unknown errors\n    }\n  }\n}\n\nAlways re-throw errors you don\'t specifically handle.\nSilently swallowing all errors hides bugs:\n  catch (err) { }  // ← never do this\n\nFor per-Promise granularity, attach .catch() directly:\n  const a = await promiseA.catch(() => defaultA);\n  const b = await promiseB; // if this rejects, propagates up',
        },
        {
          id: 'js-aa-7',
          text: 'Per-await error handling — .catch() on individual awaited Promises',
          tag: 'medium',
          url: 'https://javascript.info/async-await#error-handling',
          note: 'Lets one failure return a default while others proceed normally.',
          details: '// Using .catch() inline lets you handle one error without catching everything:\nasync function loadDashboard() {\n  const user    = await fetchUser().catch(() => null);\n  const posts   = await fetchPosts().catch(() => []);\n  const notices = await fetchNotices().catch(() => []);\n  // If any individual fetch fails, it returns its default — others still work\n  return { user, posts, notices };\n}\n\nComparison:\n  try { const x = await a(); const y = await b(); }\n  catch (e) { /* catches BOTH a and b errors */ }\n\n  const x = await a().catch(defaultX); // handles a errors only\n  const y = await b().catch(defaultY); // handles b errors only',
        },
      ],
    },

    /* ── Section 3: Concurrency Patterns ── */
    {
      id: 'js-aa-concurrency',
      title: 'Concurrency Patterns',
      week: 'Sequential vs Parallel',
      items: [
        {
          id: 'js-aa-8',
          text: 'Sequential execution — each await waits before starting the next',
          tag: 'easy',
          url: 'https://javascript.info/async-await',
          note: 'Correct when B depends on A\'s result. Slow when they\'re independent.',
          details: '// Each operation waits for the previous one:\nasync function sequential() {\n  const a = await stepA(); // 1s\n  const b = await stepB(a.id); // needs a.id → must be sequential, 1s\n  const c = await stepC(b.result); // needs b.result → must wait, 1s\n  return c;\n}\n// Total: ~3 seconds — correct when there are dependencies\n\n// Wrong reason to be sequential (independent data):\nasync function slowAndWrong() {\n  const user  = await fetchUser(1);  // 1s\n  const posts = await fetchPosts(1); // 1s — doesn\'t need user first!\n  return { user, posts };\n}\n// Total: ~2 seconds — wasteful',
        },
        {
          id: 'js-aa-9',
          text: 'Parallel execution with Promise.all — start all, await all',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
          note: 'Start Promises before awaiting — do NOT await each individually.',
          details: '// ✅ Correct parallel pattern:\nasync function parallel() {\n  const userPromise  = fetchUser(1);  // started immediately (no await)\n  const postsPromise = fetchPosts(1); // started immediately\n  const [user, posts] = await Promise.all([userPromise, postsPromise]);\n  return { user, posts };\n}\n// Total: ~1 second (max of the two)\n\n// Shorthand (same thing):\nconst [user, posts] = await Promise.all([fetchUser(1), fetchPosts(1)]);\n\n// ❌ Common mistake — looks parallel but is sequential:\nasync function notActuallyParallel() {\n  const user  = await fetchUser(1);  // starts AND waits\n  const posts = await fetchPosts(1); // only starts after user is done\n}\n// Key insight: Promises start running when CREATED, not when awaited.',
        },
        {
          id: 'js-aa-10',
          text: 'Parallel with partial failure — Promise.allSettled + await',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled',
          note: 'Use when some results can fail without failing everything.',
          details: 'async function loadWidgets() {\n  const results = await Promise.allSettled([\n    fetchStats(),\n    fetchActivity(),\n    fetchRecommendations(),\n  ]);\n\n  const [stats, activity, recs] = results.map(r =>\n    r.status === "fulfilled" ? r.value : null\n  );\n\n  return { stats, activity, recs };\n}\n// Even if fetchActivity() fails, stats and recs still load\n\nDifference from Promise.all:\n  Promise.all       → one rejection = whole thing rejects\n  Promise.allSettled → always resolves with all results (success or failure)',
        },
        {
          id: 'js-aa-11',
          text: 'Async iteration — for await...of for streams and async generators',
          tag: 'hard',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of',
          note: 'Consumes async iterables one item at a time: ReadableStream, async generators.',
          details: '// Reading a stream:\nconst response = await fetch("/large-file");\nconst reader = response.body.getReader();\n// Manual reading...\n\n// Or with async generator:\nasync function* paginate(url) {\n  let page = 1, hasMore = true;\n  while (hasMore) {\n    const data = await fetch(`${url}?page=${page}`).then(r => r.json());\n    yield data.items;\n    hasMore = data.hasNextPage;\n    page++;\n  }\n}\n\nfor await (const items of paginate("/api/posts")) {\n  renderItems(items); // processes one page at a time\n}\n\nfor await...of works on:\n  • Async generators (async function*)\n  • Objects with [Symbol.asyncIterator]\n  • ReadableStream (browser Streams API)',
        },
      ],
    },

    /* ── Section 4: Common Mistakes ── */
    {
      id: 'js-aa-mistakes',
      title: 'Common Mistakes',
      week: 'Gotchas & Fixes',
      items: [
        {
          id: 'js-aa-12',
          text: 'await inside .forEach() does NOT work — forEach ignores returned Promises',
          tag: 'hard',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach',
          note: 'Use for...of for sequential, or Promise.all(arr.map()) for parallel.',
          details: '// ❌ Bug — forEach doesn\'t await:\nasync function processAll(ids) {\n  ids.forEach(async (id) => {\n    await processOne(id); // forEach launches these but doesn\'t await them\n  });\n  console.log("done?"); // prints BEFORE any processOne finishes!\n}\n\n// ✅ Sequential — for...of:\nasync function processAll(ids) {\n  for (const id of ids) {\n    await processOne(id); // truly sequential, one at a time\n  }\n  console.log("done"); // prints after all are finished\n}\n\n// ✅ Parallel — Promise.all + map:\nasync function processAll(ids) {\n  await Promise.all(ids.map(id => processOne(id))); // all at once\n  console.log("done");\n}\n\nSame problem applies to .map(), .filter(), .reduce() — none await callbacks.',
        },
        {
          id: 'js-aa-13',
          text: 'Forgetting await — the silent bug that returns a Promise instead of the value',
          tag: 'medium',
          url: 'https://eslint.org/docs/rules/no-floating-promises',
          note: 'Enable @typescript-eslint/no-floating-promises and no-await-in-loop ESLint rules.',
          details: '// ❌ Forgot await:\nasync function getUser(id) {\n  const user = fetchUser(id); // returns Promise, not user!\n  console.log(user.name);    // undefined — user is a Promise object\n  return user.id;            // undefined\n}\n\n// ✅ With await:\nasync function getUser(id) {\n  const user = await fetchUser(id); // now it\'s the actual user object\n  console.log(user.name);           // works\n  return user.id;\n}\n\n// Also: forgotten await on fire-and-forget (unhandled rejection risk):\ndeleteUser(id);        // ❌ rejection silently ignored\nawait deleteUser(id);  // ✅ rejection surfaces as a thrown error\n\nTypeScript + ESLint can catch many of these statically.',
        },
        {
          id: 'js-aa-14',
          text: 'async in React useEffect — must use an inner async function or IIFE',
          tag: 'hard',
          url: 'https://react.dev/reference/react/useEffect',
          note: 'useEffect callback must return void or a cleanup function — not a Promise.',
          details: '// ❌ Wrong — useEffect callback cannot be async:\nuseEffect(async () => {\n  const data = await fetchData();\n  setData(data);\n}, []); // Returns a Promise, not a cleanup fn — React warns\n\n// ✅ Option 1: inner async function\nuseEffect(() => {\n  async function load() {\n    const data = await fetchData();\n    setData(data);\n  }\n  load();\n  return () => { /* cleanup */ };\n}, []);\n\n// ✅ Option 2: IIFE\nuseEffect(() => {\n  (async () => {\n    const data = await fetchData();\n    setData(data);\n  })();\n}, []);\n\n// ✅ Option 3: use a data-fetching library (React Query, SWR)\n// — handles loading/error state, caching, dedup, stale-while-revalidate',
        },
        {
          id: 'js-aa-15',
          text: 'Mixing .then() and await in the same function — confusing but legal',
          tag: 'medium',
          url: 'https://javascript.info/async-await',
          note: 'Consistent style is better — pick one or the other per function.',
          details: '// Legal but confusing mix:\nasync function mixed() {\n  const a = await fetchA();\n  return fetchB(a.id).then(b => b.value); // .then inside async fn\n}\n\n// Why it works: async fn awaits the returned Promise implicitly.\n// But it\'s harder to read and debug.\n\n// ✅ Consistent async/await style:\nasync function clean() {\n  const a = await fetchA();\n  const b = await fetchB(a.id);\n  return b.value;\n}\n\nLegitimate use case for mixing:\n  // .catch() for per-promise handling while using await everywhere else:\n  const result = await fetchData().catch(() => defaultValue);\n  // This IS a common, readable pattern worth knowing.',
        },
        {
          id: 'js-aa-16',
          text: 'async/await with Promise.race — timeout pattern',
          tag: 'hard',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race',
          note: 'Clean timeout wrapper reusable around any async operation.',
          details: 'function timeout(ms) {\n  return new Promise((_, reject) =>\n    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)\n  );\n}\n\nasync function fetchWithTimeout(url, ms = 5000) {\n  try {\n    return await Promise.race([\n      fetch(url),\n      timeout(ms),\n    ]);\n  } catch (err) {\n    if (err.message.startsWith("Timed out")) {\n      throw new Error("Request took too long");\n    }\n    throw err; // re-throw network errors\n  }\n}\n\n// Usage:\nconst res = await fetchWithTimeout("/api/slow", 3000);\n\nNote: the original fetch is NOT cancelled — use AbortController\nfor true cancellation to free up the network connection.',
        },
      ],
    },
  ],
};

/* ════════════════════════════════════════════════════════
   PHASE 4 — ADVANCED JS INTERVIEW Q&A
   ════════════════════════════════════════════════════════ */
const phaseAdvancedJS: Phase = {
  id: 'js-advanced-qa',
  label: 'Advanced JS Q&A',
  weeks: 'Topic 04',
  theme: 'danger',
  sections: [
    /* ── Section 1: Closures & Scope ── */
    {
      id: 'js-adv-closures',
      title: 'Closures & Scope',
      week: 'Most asked topic',
      items: [
        {
          id: 'js-adv-1',
          text: 'Closure — a function that remembers its outer scope after the outer function returns',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
          note: 'The inner function holds a live reference to the outer scope — not a copy.',
          details: 'function makeCounter() {\n  let count = 0;              // outer variable\n  return function () {         // inner function = closure\n    count++;                   // still has access to count\n    return count;\n  };\n}\nconst counter = makeCounter();\ncounter(); // 1\ncounter(); // 2\ncounter(); // 3\n// makeCounter() has returned, but count lives on inside the closure\n\nWhy closures matter in interviews:\n  • Data privacy / encapsulation (private variables)\n  • Factory functions and partial application\n  • Callbacks and event handlers that remember context\n  • Module pattern (before ES modules existed)\n\nKey point: each call to makeCounter() creates an INDEPENDENT closure\nwith its own count. Closures don\'t share state unless they close over\nthe same variable.',
        },
        {
          id: 'js-adv-2',
          text: 'Classic closure bug — var in a loop captures the final value, not each iteration\'s',
          tag: 'hard',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#creating_closures_in_loops_a_common_mistake',
          note: 'var is function-scoped; all iterations share the same variable.',
          details: '// ❌ Bug with var:\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 3, 3, 3\n// All three callbacks share the SAME i — by the time they run, i = 3\n\n// ✅ Fix 1: use let (block-scoped — new binding per iteration):\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n// Output: 0, 1, 2\n\n// ✅ Fix 2: IIFE to capture each value:\nfor (var i = 0; i < 3; i++) {\n  ((j) => setTimeout(() => console.log(j), 100))(i);\n}\n// Output: 0, 1, 2\n\nThis is one of the most common JS interview questions.',
        },
        {
          id: 'js-adv-3',
          text: 'Closure for private state — the module pattern',
          tag: 'medium',
          url: 'https://javascript.info/closure',
          note: 'Variables inside a closure are inaccessible from outside — true privacy.',
          details: 'function createBankAccount(initialBalance) {\n  let balance = initialBalance; // private — can\'t be accessed directly\n\n  return {\n    deposit(amount)  { balance += amount; },\n    withdraw(amount) {\n      if (amount > balance) throw new Error("Insufficient funds");\n      balance -= amount;\n    },\n    getBalance() { return balance; },\n  };\n}\n\nconst account = createBankAccount(100);\naccount.deposit(50);\naccount.getBalance(); // 150\naccount.balance;      // undefined — truly private!\n\nModern alternative: ES2022 class private fields (#balance)\nBut closure-based privacy still appears often in interviews.',
        },
        {
          id: 'js-adv-4',
          text: 'Hoisting — var declarations and function declarations are moved to the top',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting',
          note: 'Only the DECLARATION is hoisted, not the initialisation.',
          details: 'console.log(x); // undefined (not ReferenceError!) — var declaration hoisted\nvar x = 5;\nconsole.log(x); // 5\n\n// Function DECLARATIONS are fully hoisted (including body):\ngreet(); // "hello" — works before declaration\nfunction greet() { console.log("hello"); }\n\n// Function EXPRESSIONS are NOT fully hoisted:\nhi(); // TypeError: hi is not a function\nvar hi = function() { console.log("hi"); };\n// var hi is hoisted (undefined), but the function assignment is not\n\nlet / const:\n  • Also "hoisted" to top of block — but NOT initialised\n  • Accessing them before declaration → ReferenceError (Temporal Dead Zone)',
        },
        {
          id: 'js-adv-5',
          text: 'Temporal Dead Zone (TDZ) — let/const exist but are unreadable before their declaration',
          tag: 'hard',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz',
          note: 'TDZ starts at block entry and ends at the declaration line.',
          details: '{\n  // TDZ for x begins here ↓\n  console.log(x); // ReferenceError: Cannot access \'x\' before initialization\n  let x = 10;     // TDZ ends here — x is now accessible\n  console.log(x); // 10\n}\n\nWhy TDZ exists:\n  • Prevents using variables before they\'re meaningfully initialised\n  • Encourages declaring variables at the top of their scope\n  • Makes code easier to reason about\n\nCommon TDZ trap — default parameter referencing another param:\n  function foo(a = b, b = 1) {} // ReferenceError — b is in TDZ when a is set\n  function foo(b = 1, a = b) {} // ✅ fine — b is initialised first',
        },
      ],
    },

    /* ── Section 2: this Keyword ── */
    {
      id: 'js-adv-this',
      title: 'the "this" Keyword',
      week: '4 binding rules',
      items: [
        {
          id: 'js-adv-6',
          text: 'this — determined by HOW a function is called, not where it is defined',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this',
          note: 'Exception: arrow functions — they inherit this from enclosing lexical scope.',
          details: 'The 4 binding rules (in priority order):\n\n1. new binding — new creates a fresh object; this = new object\n   const obj = new Foo(); // this inside Foo = obj\n\n2. Explicit binding — call/apply/bind set this explicitly\n   foo.call(obj);    // this = obj\n   foo.apply(obj);   // this = obj\n   const bound = foo.bind(obj); bound(); // this = obj\n\n3. Implicit binding — object before the dot\n   obj.method();     // this = obj\n\n4. Default binding — standalone call\n   foo();            // this = undefined (strict mode) or globalThis\n\nArrow functions ignore all 4 rules — they capture this from where\nthey are WRITTEN (lexical this), not how they are called.',
        },
        {
          id: 'js-adv-7',
          text: 'call vs apply vs bind — explicit this binding',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call',
          note: 'call and apply invoke immediately; bind returns a new function.',
          details: 'function greet(greeting, punctuation) {\n  return `${greeting}, ${this.name}${punctuation}`;\n}\nconst user = { name: "Varun" };\n\n// call — args spread out:\ngreet.call(user, "Hello", "!");   // "Hello, Varun!"\n\n// apply — args as an array:\ngreet.apply(user, ["Hi", "."]);   // "Hi, Varun."\n\n// bind — returns NEW function with this locked:\nconst greetVarun = greet.bind(user);\ngreetVarun("Hey", "?");           // "Hey, Varun?"\n\nMemory trick:\n  call  → Comma separated args\n  apply → Array of args\n  bind  → returns a Bound function\n\nCommon use: borrowing methods:\n  Array.prototype.slice.call(arguments) // convert arguments to real array',
        },
        {
          id: 'js-adv-8',
          text: 'Arrow functions have no own "this" — they inherit it lexically',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions',
          note: 'Cannot be used as constructors. .bind()/.call()/.apply() don\'t change their this.',
          details: '// Classic "this" trap with regular function:\nclass Timer {\n  constructor() { this.count = 0; }\n  start() {\n    setInterval(function() {\n      this.count++; // ❌ this = undefined (strict) or window\n    }, 1000);\n  }\n}\n\n// ✅ Fix 1: arrow function (inherits this from start method):\nstart() {\n  setInterval(() => {\n    this.count++; // ✅ this = Timer instance\n  }, 1000);\n}\n\n// ✅ Fix 2: bind:\nsetInterval(function() { this.count++; }.bind(this), 1000);\n\n// ✅ Fix 3: save reference:\nconst self = this;\nsetInterval(function() { self.count++; }, 1000);\n\nArrows also lack: arguments object, prototype, new.target.',
        },
      ],
    },

    /* ── Section 3: Prototypes ── */
    {
      id: 'js-adv-proto',
      title: 'Prototypes & Inheritance',
      week: 'The prototype chain',
      items: [
        {
          id: 'js-adv-9',
          text: 'Prototype chain — every object has a [[Prototype]] link to another object',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain',
          note: 'Property lookup walks up the chain until found or null is reached.',
          details: 'const animal = { breathes: true };\nconst dog = Object.create(animal);\ndog.barks = true;\n\nconsole.log(dog.barks);   // true  — own property\nconsole.log(dog.breathes);// true  — found on animal via prototype chain\nconsole.log(dog.flies);   // undefined — not found anywhere, chain ends at null\n\nChain: dog → animal → Object.prototype → null\n\nKey methods:\n  Object.getPrototypeOf(obj)  // get [[Prototype]]\n  Object.create(proto)        // create object with specific prototype\n  obj.hasOwnProperty("key")   // true only if OWN property (not inherited)\n  "key" in obj                // true if own OR inherited\n\n__proto__ is the accessor for [[Prototype]] — readable but\nObject.getPrototypeOf / Object.create are preferred.',
        },
        {
          id: 'js-adv-10',
          text: 'ES6 class is syntactic sugar over prototypal inheritance',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes',
          note: 'Under the hood: methods go on the prototype, not each instance.',
          details: '// ES6 class:\nclass Animal {\n  constructor(name) { this.name = name; }\n  speak() { return `${this.name} makes a sound`; }\n}\nclass Dog extends Animal {\n  speak() { return `${this.name} barks`; }\n}\n\n// Equivalent prototype code:\nfunction Animal(name) { this.name = name; }\nAnimal.prototype.speak = function() { return `${this.name} makes a sound`; };\nfunction Dog(name) { Animal.call(this, name); }\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nDog.prototype.speak = function() { return `${this.name} barks`; };\n\nclass advantages:\n  • Cleaner syntax\n  • super() enforced in constructor\n  • Private fields: #field (true privacy)\n  • Static methods and fields\n  • No accidental call without new',
        },
        {
          id: 'js-adv-11',
          text: 'instanceof — checks if a constructor\'s prototype exists in the chain',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof',
          note: 'Fails across iframes (different realms have different Array, Object, etc.).',
          details: 'class Animal {}\nclass Dog extends Animal {}\nconst d = new Dog();\n\nd instanceof Dog;    // true\nd instanceof Animal; // true  — Animal.prototype is in d\'s chain\nd instanceof Object; // true  — everything is\n\n// What instanceof actually checks:\n// Is Animal.prototype anywhere in d\'s [[Prototype]] chain?\n\n// Pitfall — typeof null:\ntypeof null; // "object" — famous bug in JS spec\nnull instanceof Object; // false — correct way to check\n\n// Array across iframes:\nconst arr = iframe.contentWindow.Array();\narr instanceof Array; // false! Different Array constructor\nArray.isArray(arr);   // true — works across realms, use this instead',
        },
      ],
    },

    /* ── Section 4: Type Coercion ── */
    {
      id: 'js-adv-coercion',
      title: 'Type Coercion & Equality',
      week: '== vs === & gotchas',
      items: [
        {
          id: 'js-adv-12',
          text: '== uses Abstract Equality — coerces types. === uses Strict Equality — never coerces',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness',
          note: 'Always use === in production code. == exists for null checks.',
          details: '// === never coerces — fast rule: same type AND same value\n1 === 1        // true\n1 === "1"      // false — different types\nnull === null  // true\nnull === undefined // false\n\n// == coerces with complex rules:\n1 == "1"       // true  — string coerced to number\n0 == false     // true  — false → 0\n"" == false    // true  — both → 0\nnull == undefined // true  — special rule\nnull == 0      // false — null only == undefined\n\n// Famous gotchas:\n[] == false     // true  — [] → "" → 0; false → 0\n[] == ![]       // true  — ![] is false; [] == false → true\n{} == false     // false — {} stays as object\n\nOnly legitimate use of ==:\n  if (x == null) // catches both null AND undefined in one check',
        },
        {
          id: 'js-adv-13',
          text: 'typeof quirks — the 8 possible return values and their surprises',
          tag: 'medium',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
          note: 'typeof null === "object" is a bug that will never be fixed.',
          details: 'typeof undefined   // "undefined"\ntypeof true        // "boolean"\ntypeof 42          // "number"\ntypeof "hi"        // "string"\ntypeof Symbol()    // "symbol"\ntypeof 42n         // "bigint"\ntypeof function(){} // "function"\ntypeof {}          // "object"\ntypeof []          // "object"  ← not "array"!\ntypeof null        // "object"  ← famous bug, means null since JS 1.0\n\nBetter checks:\n  Array.isArray(x)           // is it an array?\n  x === null                 // is it null?\n  x instanceof Date          // is it a Date?\n  Object.prototype.toString.call(x) // "[object Array]" etc. — most accurate\n\ntypeof is safe on undeclared variables (returns "undefined"):\n  typeof undeclaredVar // "undefined" — no ReferenceError',
        },
        {
          id: 'js-adv-14',
          text: 'Falsy values — the complete list of 8 values that coerce to false',
          tag: 'easy',
          url: 'https://developer.mozilla.org/en-US/docs/Glossary/Falsy',
          note: 'Everything else is truthy — including "0", "false", [], {}.',
          details: 'The 8 falsy values in JavaScript:\n  false\n  0\n  -0\n  0n        (BigInt zero)\n  ""        (empty string)\n  null\n  undefined\n  NaN\n\nTricky truthy values (interview favourites):\n  "0"       → truthy (non-empty string)\n  "false"   → truthy\n  []        → truthy (empty array)\n  {}        → truthy (empty object)\n  function(){} → truthy\n\nNaN gotcha:\n  NaN === NaN  // false — NaN is the only value not equal to itself!\n  Number.isNaN(NaN) // true — use this\n  isNaN("hello")    // true — coerces first, then checks (unreliable)',
        },
      ],
    },

    /* ── Section 5: Performance & Patterns ── */
    {
      id: 'js-adv-patterns',
      title: 'Performance & Patterns',
      week: 'Real-world interview topics',
      items: [
        {
          id: 'js-adv-15',
          text: 'Event delegation — one listener on a parent handles events for all children',
          tag: 'medium',
          url: 'https://javascript.info/event-delegation',
          note: 'Works because DOM events bubble up. Essential for dynamic lists.',
          details: '// ❌ Without delegation — N listeners:\ndocument.querySelectorAll(".btn").forEach(btn => {\n  btn.addEventListener("click", handleClick);\n});\n// Problem: new buttons added dynamically won\'t have listeners\n// Problem: 1000 rows = 1000 event listeners = memory pressure\n\n// ✅ With delegation — 1 listener on parent:\ndocument.getElementById("list").addEventListener("click", (e) => {\n  const btn = e.target.closest(".btn");\n  if (!btn) return;\n  handleClick(btn);\n});\n\nBenefits:\n  • Works for dynamically added elements automatically\n  • Far fewer listeners → better memory\n  • Single place to add/remove the listener\n\ne.target = element that was actually clicked\ne.currentTarget = element the listener is attached to',
        },
        {
          id: 'js-adv-16',
          text: 'Debounce — delays execution until N ms after the LAST call',
          tag: 'hard',
          url: 'https://javascript.info/task/debounce',
          note: 'Use for: search input, window resize, form validation.',
          details: 'function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\n// Usage:\nconst search = debounce((query) => fetchResults(query), 300);\ninput.addEventListener("input", (e) => search(e.target.value));\n// Only calls fetchResults 300ms after the user STOPS typing\n\nAnalogy: "Wait until you stop talking, THEN respond"\n\nDifference from throttle:\n  Debounce  → resets timer on each call; fires once after silence\n  Throttle  → fires at most once per interval regardless of call frequency',
        },
        {
          id: 'js-adv-17',
          text: 'Throttle — limits execution to at most once per N ms interval',
          tag: 'hard',
          url: 'https://developer.mozilla.org/en-US/docs/Glossary/Throttle',
          note: 'Use for: scroll handlers, mousemove, resize, API rate limiting.',
          details: 'function throttle(fn, interval) {\n  let lastTime = 0;\n  return function (...args) {\n    const now = Date.now();\n    if (now - lastTime >= interval) {\n      lastTime = now;\n      fn.apply(this, args);\n    }\n  };\n}\n\n// Usage:\nconst onScroll = throttle(() => updateScrollProgress(), 100);\nwindow.addEventListener("scroll", onScroll);\n// Fires at most once every 100ms, no matter how fast you scroll\n\nAnalogy: "You can call me, but only once per minute"\n\nProduction: use lodash.debounce / lodash.throttle — they handle\nedge cases (trailing call, leading call, cancel) correctly.',
        },
        {
          id: 'js-adv-18',
          text: 'Memory leaks — 4 most common causes in JavaScript',
          tag: 'hard',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management',
          note: 'Chrome DevTools → Memory tab → Heap Snapshot to diagnose.',
          details: '1. Accidental global variables:\n   function leak() { x = "I am global now"; } // missing let/const/var\n   Fix: always use let/const; "use strict" makes this a ReferenceError\n\n2. Forgotten event listeners:\n   element.addEventListener("click", handler);\n   element.remove(); // DOM removed but listener still holds reference!\n   Fix: element.removeEventListener("click", handler)\n        or use AbortController / { signal } option\n\n3. Detached DOM nodes:\n   let btn = document.getElementById("btn");\n   document.body.removeChild(btn); // removed from DOM\n   // but btn variable still references it → not garbage collected\n   Fix: btn = null after removing from DOM\n\n4. Closures capturing large objects:\n   function outer() {\n     const largeData = new Array(1_000_000).fill("x");\n     return () => largeData[0]; // entire array kept alive\n   }\n   Fix: only keep what the closure needs; nullify references',
        },
        {
          id: 'js-adv-19',
          text: 'WeakMap & WeakSet — hold weak references that allow garbage collection',
          tag: 'hard',
          url: 'https://javascript.info/weakmap-weakset',
          note: 'Not enumerable — no iteration, no size, no clear(). Keys must be objects.',
          details: 'WeakMap use cases:\n\n1. Private data associated with objects:\n   const _private = new WeakMap();\n   class Person {\n     constructor(name) { _private.set(this, { name }); }\n     getName() { return _private.get(this).name; }\n   }\n   // When the Person instance is GCed, its entry in WeakMap is auto-removed\n\n2. Cache without memory leaks:\n   const cache = new WeakMap();\n   function process(obj) {\n     if (cache.has(obj)) return cache.get(obj);\n     const result = expensiveCompute(obj);\n     cache.set(obj, result);\n     return result;\n   }\n   // If obj is GCed, cache entry is auto-removed — no need to manually clean up\n\nWeakSet: same idea but stores objects, not key-value pairs.\nUse case: tracking visited objects in a traversal without preventing GC.',
        },
      ],
    },
  ],
};

/* ════════════════════════════════════════════════════════
   PHASE 5 — REACT INTERVIEW Q&A
   ════════════════════════════════════════════════════════ */
const phaseReactQA: Phase = {
  id: 'js-react-qa',
  label: 'React Q&A',
  weeks: 'Topic 05',
  theme: 'info',
  sections: [
    /* ── Section 1: Core Hooks ── */
    {
      id: 'js-rq-core-hooks',
      title: 'Core Hooks',
      week: 'useState · useEffect · useRef',
      items: [
        {
          id: 'js-rq-1',
          text: 'useState — functional updates, initializer fn, batching in React 18',
          tag: 'medium',
          url: 'https://react.dev/reference/react/useState',
          note: 'Never mutate state directly — always replace with a new value.',
          details: '// Functional update — safe when new state depends on previous:\nsetCount(prev => prev + 1); // ✅ always uses latest state\nsetCount(count + 1);        // ❌ stale closure risk in async code\n\n// Initializer function — runs ONCE on mount (expensive default):\nconst [state, setState] = useState(() => expensiveCompute()); // ✅\nconst [state, setState] = useState(expensiveCompute());       // ❌ runs every render\n\n// React 18 auto-batching — multiple setState calls = ONE re-render:\nfunction handleClick() {\n  setCount(c => c + 1); // ┐\n  setName("Varun");     // ┤ batched → 1 re-render\n  setOpen(true);        // ┘\n}\n// Pre-React 18: only batched inside React event handlers\n// React 18: batched EVERYWHERE — setTimeout, Promises, native events\n\n// Force synchronous update (rare): use flushSync from react-dom',
        },
        {
          id: 'js-rq-2',
          text: 'useEffect — dependency array rules, cleanup, and common mistakes',
          tag: 'hard',
          url: 'https://react.dev/reference/react/useEffect',
          note: 'Every value used inside useEffect that can change must be in the deps array.',
          details: 'useEffect(() => { /* effect */ }, deps)\n\nDependency array behaviour:\n  []        → runs once after mount, cleanup on unmount\n  [a, b]    → runs after mount AND whenever a or b change\n  (omitted) → runs after EVERY render (usually a bug)\n\nCleanup function (returned from effect):\n  useEffect(() => {\n    const sub = subscribe(userId, handler);\n    return () => sub.unsubscribe(); // runs before next effect OR unmount\n  }, [userId]);\n\nCommon mistakes:\n  1. Stale closure — reading state/props not in deps array\n  2. Missing cleanup → memory leaks, duplicate subscriptions\n  3. Object/array in deps → new reference every render → infinite loop\n     Fix: useMemo the object, or move it inside the effect\n  4. async directly in useEffect → use inner async fn (see Phase 3)\n\nuseLayoutEffect: same API but fires synchronously after DOM mutations,\nbefore paint — use for measuring DOM or avoiding flicker.',
        },
        {
          id: 'js-rq-3',
          text: 'useRef — three use cases: DOM access, mutable box, previous value',
          tag: 'medium',
          url: 'https://react.dev/reference/react/useRef',
          note: 'Mutating .current never triggers a re-render — it\'s a plain object.',
          details: '// 1. DOM access:\nconst inputRef = useRef(null);\n<input ref={inputRef} />\nuseEffect(() => inputRef.current.focus(), []);\n\n// 2. Mutable box — store value that persists across renders without re-rendering:\nconst timerRef = useRef(null);\nconst start = () => { timerRef.current = setInterval(tick, 1000); };\nconst stop  = () => { clearInterval(timerRef.current); };\n// A regular variable would reset on every render\n// A state variable would cause unnecessary re-renders\n\n// 3. Previous value pattern:\nfunction usePrevious(value) {\n  const ref = useRef();\n  useEffect(() => { ref.current = value; }); // runs after render\n  return ref.current; // returns value from PREVIOUS render\n}\n\nKey distinction:\n  useState → causes re-render on change\n  useRef   → never causes re-render, survives re-renders',
        },
        {
          id: 'js-rq-4',
          text: 'useCallback — memoizes a function reference; only helps with referential stability',
          tag: 'hard',
          url: 'https://react.dev/reference/react/useCallback',
          note: 'Pointless unless the function is a dep of useEffect or passed to React.memo child.',
          details: '// Without useCallback — new fn reference every render:\nfunction Parent() {\n  const handleClick = () => doSomething(); // new reference each render\n  return <MemoChild onClick={handleClick} />; // MemoChild re-renders anyway!\n}\n\n// With useCallback — stable reference:\nconst handleClick = useCallback(() => doSomething(), []);\n// MemoChild now skips re-render if other props haven\'t changed\n\nuseCallback IS worth it when:\n  ✅ Passed to a React.memo() wrapped child component\n  ✅ Listed in useEffect deps (prevents effect from re-running)\n  ✅ Listed in useMemo deps\n\nuseCallback is NOT worth it when:\n  ❌ The child is not wrapped in React.memo\n  ❌ The function is only used in JSX event handlers without memo\n  ❌ The deps change every render anyway\n\nuseCallback(fn, deps) === useMemo(() => fn, deps)',
        },
        {
          id: 'js-rq-5',
          text: 'useMemo — memoizes an expensive computed value across renders',
          tag: 'hard',
          url: 'https://react.dev/reference/react/useMemo',
          note: 'Profile first — premature useMemo adds overhead for simple computations.',
          details: '// Expensive computation — only recalculate when list changes:\nconst sortedList = useMemo(\n  () => [...list].sort((a, b) => a.name.localeCompare(b.name)),\n  [list]\n);\n\n// Referential stability for objects/arrays passed as props or deps:\nconst config = useMemo(() => ({ theme, language }), [theme, language]);\n// Without useMemo: new object every render → child always re-renders\n\nWhen useMemo IS worth it:\n  ✅ Genuinely expensive computation (filtering/sorting 10k+ items)\n  ✅ Result passed as prop to React.memo() child\n  ✅ Result used as a dependency in useEffect/useCallback\n\nWhen NOT worth it:\n  ❌ Simple expressions (string concat, math, array of 5 items)\n  ❌ The deps change every render anyway\n\nMeasure with React DevTools Profiler before adding.',
        },
      ],
    },

    /* ── Section 2: Advanced Hooks ── */
    {
      id: 'js-rq-adv-hooks',
      title: 'Advanced Hooks',
      week: 'useReducer · useContext · Custom',
      items: [
        {
          id: 'js-rq-6',
          text: 'useReducer — better than useState for complex, related state updates',
          tag: 'medium',
          url: 'https://react.dev/reference/react/useReducer',
          note: 'dispatch is stable across renders — safe in useEffect deps without useCallback.',
          details: 'const [state, dispatch] = useReducer(reducer, initialState);\n\n// Reducer — pure function: (state, action) → newState\nfunction reducer(state, action) {\n  switch (action.type) {\n    case "increment": return { ...state, count: state.count + 1 };\n    case "reset":     return initialState;\n    default:          return state;\n  }\n}\n\n// Usage:\ndispatch({ type: "increment" });\ndispatch({ type: "reset" });\n\nChoose useReducer over useState when:\n  • Next state depends on previous in complex ways\n  • Multiple sub-values that update together\n  • State transitions have names (increment, reset, fetch_start)\n  • You want to test state logic in isolation (pure reducer)\n\nPair with useContext to share across a tree without prop drilling\n→ poor man\'s Redux / Zustand.',
        },
        {
          id: 'js-rq-7',
          text: 'useContext — share values without prop drilling; re-renders ALL consumers on change',
          tag: 'medium',
          url: 'https://react.dev/reference/react/useContext',
          note: 'Split contexts by update frequency to avoid unnecessary re-renders.',
          details: 'const ThemeContext = createContext("light");\n\nfunction App() {\n  const [theme, setTheme] = useState("light");\n  return (\n    <ThemeContext.Provider value={theme}>\n      <DeepChild />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction DeepChild() {\n  const theme = useContext(ThemeContext); // no prop drilling!\n  return <div className={theme}>...</div>;\n}\n\nPerformance gotcha:\n  Every component calling useContext(Ctx) re-renders when the\n  context VALUE changes — even if they don\'t use the changed part.\n\nFix — split contexts by update frequency:\n  <UserContext.Provider value={user}>       // changes rarely\n    <ThemeContext.Provider value={theme}>   // changes more often\n      <App />\n    </ThemeContext.Provider>\n  </UserContext.Provider>\n\nFor complex global state, prefer Zustand / Jotai / Redux Toolkit.',
        },
        {
          id: 'js-rq-8',
          text: 'Custom hooks — extract and reuse stateful logic between components',
          tag: 'medium',
          url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
          note: 'Must start with "use". Can call other hooks. Returns whatever is useful.',
          details: '// Custom hook — encapsulates fetch logic:\nfunction useFetch(url) {\n  const [data,    setData]    = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error,   setError]   = useState(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    setLoading(true);\n    fetch(url)\n      .then(r => r.json())\n      .then(d  => { if (!cancelled) setData(d); })\n      .catch(e => { if (!cancelled) setError(e); })\n      .finally(() => { if (!cancelled) setLoading(false); });\n    return () => { cancelled = true; }; // cleanup — prevent stale update\n  }, [url]);\n\n  return { data, loading, error };\n}\n\n// Usage — shared across any component:\nconst { data, loading, error } = useFetch("/api/users");\n\nRules of hooks (must follow even in custom hooks):\n  1. Only call hooks at the top level — not inside loops, conditions, or nested fns\n  2. Only call hooks from React functions or other custom hooks',
        },
      ],
    },

    /* ── Section 3: Reconciliation & Performance ── */
    {
      id: 'js-rq-perf',
      title: 'Reconciliation & Performance',
      week: 'Virtual DOM · key · memo',
      items: [
        {
          id: 'js-rq-9',
          text: 'Reconciliation — React diffs the new render tree against the previous one',
          tag: 'hard',
          url: 'https://react.dev/learn/preserving-and-resetting-state',
          note: 'Same position + same type = UPDATE (keep state). Different type = UNMOUNT + MOUNT.',
          details: 'React\'s diffing algorithm (O(n) via two heuristics):\n\n1. Different element type → tear down old tree, build new one\n   Before: <Counter />   After: <p>hi</p>\n   → Counter is unmounted (state lost), <p> is mounted fresh\n\n2. Same element type → update existing node, recurse into children\n   Before: <div className="a">  After: <div className="b">\n   → Only className attribute updated — DOM node reused\n\n3. Lists — React uses the key prop to match old vs new children\n   Without key: React matches by index → wrong updates on reorder\n   With key:    React matches by identity → correct updates\n\nState preservation rule:\n  State lives in the TREE POSITION, not the component.\n  Same component at same position = state preserved.\n  Same component at different position = state reset.\n  <Counter key="a" /> vs <Counter key="b" /> → different instances.',
        },
        {
          id: 'js-rq-10',
          text: 'key prop — tells React which list item is which across re-renders',
          tag: 'medium',
          url: 'https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key',
          note: 'Never use array index as key when the list can be reordered or filtered.',
          details: '// ❌ Index as key — breaks on reorder/insert/delete:\n{items.map((item, i) => <Row key={i} item={item} />)}\n// React matches by index — wrong component gets wrong data after reorder\n\n// ✅ Stable unique ID:\n{items.map(item => <Row key={item.id} item={item} />)}\n\nWhen index key IS acceptable:\n  • Static list that never reorders\n  • Items have no state and no expensive rendering\n  • e.g. rendering an array of strings as <li> tags\n\nkey as reset trick:\n  <Profile key={userId} userId={userId} />\n  // Changing userId causes full remount — resets all internal state\n  // Useful to avoid complex useEffect reset logic\n\nkey must be unique among siblings, not globally.',
        },
        {
          id: 'js-rq-11',
          text: 'React.memo — skips re-render if props are shallowly equal to last render',
          tag: 'hard',
          url: 'https://react.dev/reference/react/memo',
          note: 'Shallow comparison — objects and arrays with same content but new reference will still re-render.',
          details: 'const MemoChild = React.memo(function Child({ name, onClick }) {\n  console.log("rendered");\n  return <button onClick={onClick}>{name}</button>;\n});\n\n// Parent re-renders → Child skips if name and onClick haven\'t changed\n\nWhen React.memo helps:\n  ✅ Child renders often but props rarely change\n  ✅ Child is expensive to render (complex tree, large list)\n  ✅ Props are primitives or stable references (from useCallback/useMemo)\n\nWhen React.memo does NOT help:\n  ❌ Props are inline objects/functions → new reference every parent render:\n     <MemoChild style={{ color: "red" }} onClick={() => {}} />\n     // new {} and () => {} each time → memo is bypassed\n\nCustom comparison:\n  React.memo(Child, (prevProps, nextProps) => {\n    return prevProps.id === nextProps.id; // return true = skip render\n  });\n\nProfile first — React.memo itself has overhead.',
        },
        {
          id: 'js-rq-12',
          text: 'React.lazy + Suspense — code-split components, load only when needed',
          tag: 'medium',
          url: 'https://react.dev/reference/react/lazy',
          note: 'Reduces initial bundle size. The lazy component must be a default export.',
          details: 'import { lazy, Suspense } from "react";\n\n// The import() call splits this into a separate chunk:\nconst HeavyChart = lazy(() => import("./HeavyChart"));\n\nfunction Dashboard() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      <HeavyChart /> {/* loaded only when Dashboard renders */}\n    </Suspense>\n  );\n}\n\nHow it works:\n  1. First render of HeavyChart triggers the import()\n  2. Suspense catches the "pending" signal, shows fallback\n  3. Once chunk loads, Suspense renders the real component\n\nBest split points:\n  • Route-level components (biggest win)\n  • Heavy third-party components (charts, editors, maps)\n  • Features behind a modal or toggle\n\nWith React Router:\n  const Page = lazy(() => import("./pages/Dashboard"));\n  <Route path="/dashboard" element={\n    <Suspense fallback={<Loading />}><Page /></Suspense>\n  } />',
        },
      ],
    },

    /* ── Section 4: React 18 ── */
    {
      id: 'js-rq-react18',
      title: 'React 18 Features',
      week: 'Concurrent · Transitions · Suspense',
      items: [
        {
          id: 'js-rq-13',
          text: 'Concurrent rendering — React can pause, resume, and abandon renders',
          tag: 'hard',
          url: 'https://react.dev/blog/2022/03/29/react-v18',
          note: 'Opt-in via createRoot(). Enables all React 18 concurrent features.',
          details: 'React 17 rendering: synchronous — once started, can\'t be interrupted.\nReact 18 concurrent: React can PAUSE a render mid-way, do something more\nurgent (like handling a keypress), then resume or throw away the work.\n\nMigration:\n  // React 17:\n  ReactDOM.render(<App />, root);\n\n  // React 18 (opt-in to concurrent features):\n  const root = ReactDOM.createRoot(document.getElementById("root"));\n  root.render(<App />);\n\nThis unlocks: useTransition, useDeferredValue, Suspense for data,\nautomatic batching, and streaming SSR with selective hydration.\n\nKey guarantee: the UI always stays responsive — low-priority renders\nyield to high-priority user interactions.',
        },
        {
          id: 'js-rq-14',
          text: 'useTransition — mark state updates as non-urgent; keep UI responsive',
          tag: 'hard',
          url: 'https://react.dev/reference/react/useTransition',
          note: 'Urgent update (input) renders immediately; transition update can be interrupted.',
          details: 'const [isPending, startTransition] = useTransition();\n\nfunction handleSearch(query) {\n  setInputValue(query);            // urgent — update input immediately\n  startTransition(() => {\n    setFilteredResults(filter(query)); // non-urgent — can be interrupted\n  });\n}\n\nreturn (\n  <>\n    <input value={inputValue} onChange={e => handleSearch(e.target.value)} />\n    {isPending ? <Spinner /> : <ResultsList results={filteredResults} />}\n  </>\n);\n\nWithout useTransition: typing in the search box feels laggy because\nReact re-renders the (potentially huge) list on every keystroke.\n\nWith useTransition: input updates instantly; list update is deferred\nand can be interrupted by the next keystroke — smooth UX.\n\nstartTransition (no hook) is the same without the isPending flag.',
        },
        {
          id: 'js-rq-15',
          text: 'useDeferredValue — defer re-rendering of a CHILD component with new data',
          tag: 'hard',
          url: 'https://react.dev/reference/react/useDeferredValue',
          note: 'useTransition = you control the state update. useDeferredValue = you only have the value.',
          details: 'function SearchPage({ query }) {\n  const deferredQuery = useDeferredValue(query);\n  const isStale = query !== deferredQuery;\n\n  return (\n    <div style={{ opacity: isStale ? 0.5 : 1 }}>\n      <ResultsList query={deferredQuery} /> {/* renders with old value first */}\n    </div>\n  );\n}\n\nHow it works:\n  1. query changes → component re-renders immediately with new query\n  2. deferredQuery still has OLD value → ResultsList not re-rendered yet\n  3. When React has idle time → deferred render fires with new value\n  4. If query changes again before deferred render → old deferred is abandoned\n\nDifference:\n  useTransition: wrap the setState call (need access to state setter)\n  useDeferredValue: wrap the VALUE (useful when you receive it as a prop)',
        },
        {
          id: 'js-rq-16',
          text: 'Automatic batching — React 18 batches ALL state updates, everywhere',
          tag: 'medium',
          url: 'https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching',
          note: 'Pre-React 18: only event handlers were batched. Now Promises, setTimeout, native events too.',
          details: '// React 17 — only batched inside React event handlers:\nsetTimeout(() => {\n  setCount(c => c + 1);  // re-render 1\n  setFlag(f => !f);      // re-render 2\n  // Two separate renders!\n}, 0);\n\n// React 18 — batched everywhere:\nsetTimeout(() => {\n  setCount(c => c + 1);  // ┐\n  setFlag(f => !f);      // ┘ ONE re-render\n}, 0);\n\n// Also batched in:\nawait fetch("/api").then(() => {\n  setData(d);   // ┐\n  setDone(true); // ┘ ONE re-render\n});\n\n// Opt out (rare — e.g. third-party DOM library integration):\nimport { flushSync } from "react-dom";\nflushSync(() => setCount(c => c + 1));  // immediate render\nflushSync(() => setFlag(f => !f));      // another immediate render',
        },
      ],
    },

    /* ── Section 5: Patterns & Architecture ── */
    {
      id: 'js-rq-patterns',
      title: 'Patterns & Architecture',
      week: 'Error Boundaries · Controlled · Common Q',
      items: [
        {
          id: 'js-rq-17',
          text: 'Controlled vs uncontrolled components — who owns the state?',
          tag: 'medium',
          url: 'https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components',
          note: 'Controlled = React state drives the value. Uncontrolled = DOM drives it via ref.',
          details: '// Controlled — React is the single source of truth:\nfunction Form() {\n  const [value, setValue] = useState("");\n  return (\n    <input\n      value={value}                       // driven by state\n      onChange={e => setValue(e.target.value)}\n    />\n  );\n}\n// ✅ Easy to validate, format, sync, derive other state from\n// ❌ Slightly more boilerplate\n\n// Uncontrolled — DOM holds state, React reads when needed:\nfunction Form() {\n  const inputRef = useRef();\n  const handleSubmit = () => console.log(inputRef.current.value);\n  return <input ref={inputRef} defaultValue="" />;\n}\n// ✅ Less re-renders, simpler for file inputs, quick integrations\n// ❌ Hard to validate in real-time, hard to reset programmatically\n\nRule of thumb: prefer controlled. Use uncontrolled for:\n  • File inputs (always uncontrolled — browser security)\n  • Integrating with non-React DOM libraries\n  • Quick prototypes',
        },
        {
          id: 'js-rq-18',
          text: 'Error Boundaries — catch render errors in a component subtree',
          tag: 'hard',
          url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary',
          note: 'Must be a class component (no hook equivalent yet). Use react-error-boundary library.',
          details: '// Manual class component:\nclass ErrorBoundary extends React.Component {\n  state = { hasError: false, error: null };\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true, error }; // update state to show fallback\n  }\n\n  componentDidCatch(error, info) {\n    logToSentry(error, info.componentStack); // log to error tracking\n  }\n\n  render() {\n    if (this.state.hasError) return <FallbackUI error={this.state.error} />;\n    return this.props.children;\n  }\n}\n\n// Usage:\n<ErrorBoundary fallback={<p>Something went wrong</p>}>\n  <RiskyComponent />\n</ErrorBoundary>\n\n// ✅ Simpler: react-error-boundary library:\nimport { ErrorBoundary } from "react-error-boundary";\n<ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>\n  <RiskyComponent />\n</ErrorBoundary>\n\nDoes NOT catch: event handlers, async errors, SSR errors, errors in the boundary itself.',
        },
        {
          id: 'js-rq-19',
          text: 'Common interview questions — quick-fire answers',
          tag: 'medium',
          url: 'https://www.frontendinterviewhandbook.com/react-questions',
          note: 'Memorise these cold — they come up in every React interview.',
          details: 'Q: What triggers a re-render in React?\nA: setState / useState setter, useReducer dispatch, parent re-render,\n   context value change, forceUpdate.\n\nQ: What is the difference between state and props?\nA: Props — passed from parent, read-only in child.\n   State — owned by the component, mutable via setter.\n\nQ: Can you call hooks conditionally?\nA: No — hooks must be called in the same order every render.\n   React relies on call order to associate state with each hook.\n\nQ: What is lifting state up?\nA: Moving state to the nearest common ancestor so siblings can share it.\n\nQ: What is the difference between useEffect and useLayoutEffect?\nA: useEffect fires AFTER paint (async).\n   useLayoutEffect fires AFTER DOM mutations but BEFORE paint (sync).\n   Use useLayoutEffect only to avoid visible flicker.\n\nQ: Why shouldn\'t you use array index as a key?\nA: React uses keys to match old vs new list items. Index changes when\n   items are inserted/removed/reordered → wrong component gets wrong state.\n\nQ: What is prop drilling and how do you fix it?\nA: Passing props through many intermediate layers.\n   Fix: useContext, component composition, state management library.',
        },
      ],
    },
  ],
};

/* ════════════════════════════════════════════════════════
   EXPORTS
   ════════════════════════════════════════════════════════ */
export const JS_PHASES: Phase[] = [
  phaseEventLoop,
  phasePromises,
  phaseAsyncAwait,
  phaseAdvancedJS,
  phaseReactQA,
];
