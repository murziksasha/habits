# JavaScript Fundamentals

Slug: `js_fundamentals`
Group: deep
Hub: `/js-fundamentals`
Access: Free for every account (no Pro, trial, or paywall).
Prerequisites: `programming`, `html_semantics`, `css_layout`
Recommended next: `typescript`, `browser_web_apis`, `node_fundamentals`

## What this course is

Deep JS: types, operators, functions, arrays, objects, async/await, DOM, modules, errors/prototypes + unit exams.

## Local ForgeBoard Labs

- **Milestone 2 (`forgeboard-m2-js` v1.0.0)** on lesson `jsf-forgeboard-board-lab` — `/labs/forgeboard-m2-js-v1.0.0.zip` (`assessmentMode: "local_practice"`, runtime: Node >= 20, pnpm >= 9)

## Program

### `values` — Values & types

- `jsf-values` — typeof & primitives (5 exercises, including a bilingual concept card)
- `jsf-const-let` — const / let (5 exercises, including a bilingual concept card)
- `jsf-values-exam` — Exam: values [exam] (4 exercises)

### `operators` — Operators

- `jsf-eq` — == vs === (5 exercises, including a bilingual concept card)
- `jsf-truthy` — Truthy / falsy (5 exercises, including a bilingual concept card)
- `jsf-ops-exam` — Exam: operators [exam] (4 exercises)

### `functions` — Functions

- `jsf-fn-decl` — Declarations & arrows (5 exercises, including a bilingual concept card)
- `jsf-fn-params` — Default & rest (5 exercises, including a bilingual concept card)
- `jsf-fn-exam` — Exam: functions [exam] (4 exercises)

### `arrays` — Arrays

- `jsf-arr-basics` — push / map / filter (5 exercises, including a bilingual concept card)
- `jsf-arr-find` — find / includes / length (5 exercises, including a bilingual concept card)
- `jsf-arr-exam` — Exam: arrays [exam] (4 exercises)

### `objects` — Objects

- `jsf-obj-lit` — Literals & access (5 exercises, including a bilingual concept card)
- `jsf-destruct` — Destructuring (5 exercises, including a bilingual concept card)
- `jsf-obj-exam` — Exam: objects [exam] (4 exercises)

### `async` — Async

- `jsf-promise` — Promises (5 exercises, including a bilingual concept card)
- `jsf-async-await` — async / await (5 exercises, including a bilingual concept card)
- `jsf-fetch` — fetch intro (5 exercises, including a bilingual concept card)
- `jsf-async-exam` — Exam: async [exam] (5 exercises)

### `dom` — DOM basics

- `jsf-dom-select` — querySelector (5 exercises, including a bilingual concept card)
- `jsf-dom-events` — addEventListener (5 exercises, including a bilingual concept card)
- `jsf-dom-exam` — Exam: DOM [exam] (4 exercises)

### `modules` — Modules

- `jsf-mod-export` — export / import (6 exercises, including a bilingual concept card)
- `jsf-mod-exam` — Exam: modules [exam] (4 exercises)

### `scope_closures` — Scope & closures

- `jsf-scope-blocks` — Block vs function scope (5 exercises, including a bilingual concept card)
- `jsf-closures-practice` — Closures & loop bindings (5 exercises, including a bilingual concept card)
- `jsf-scope-exam` — Exam: scope & closures [exam] (4 exercises)

### `recursion` — Recursion

- `jsf-rec-basics` — Base case & call stack (5 exercises, including a bilingual concept card)
- `jsf-rec-traversal` — Recursive traversal & calculations (5 exercises, including a bilingual concept card)
- `jsf-rec-exam` — Exam: recursion [exam] (4 exercises)

### `this_classes` — this, constructors & classes

- `jsf-this-context` — this context & arrow functions (6 exercises, including a bilingual concept card)
- `jsf-classes` — Classes, extends & super (5 exercises, including a bilingual concept card)
- `jsf-this-exam` — Exam: this & classes [exam] (4 exercises)

### `collections` — Collections & copying

- `jsf-map-set` — Map & Set (5 exercises)
- `jsf-nullish-clone` — ?. vs ?? & cloning (4 exercises)
- `jsf-collections-exam` — Exam: collections [exam] (4 exercises)

### `time` — Time & timers

- `jsf-date` — Date & elapsed time (5 exercises)
- `jsf-timers` — setTimeout, setInterval & cleanup (5 exercises)
- `jsf-time-exam` — Exam: time & timers [exam] (4 exercises)

### `page_widgets` — Page widgets: classes & events

- `jsf-dom-widgets-core` — classList & event delegation (5 exercises)
- `jsf-tabs-modal` — Widgets: tabs & modal dialog (5 exercises)
- `jsf-widgets-exam` — Exam: page widgets [exam] (4 exercises)

### `errors_proto` — Errors & prototypes

- `jsf-try-catch` — try / catch / finally (4 exercises)
- `jsf-proto` — Prototype chain (4 exercises)
- `jsf-iter` — Iterables & for..of (4 exercises)
- `jsf-errors-exam` — Exam: errors/proto [exam] (4 exercises)
- `jsf-async-fetch-lite` — Async fetch lite (6 exercises)

### `async_dom_debugging` — Debug: Async & DOM Behavior

- `js-dbg-async-race` — Debug: async race conditions (4 exercises)
- `js-dbg-dom-events` — Debug: event bubbling & delegation bugs (4 exercises)
- `js-dbg-dom-lifecycle` — Debug: DOM lifecycle & listener leaks (3 exercises)
- `js-dbg-cumulative-task` — Applied task: async task queue with DOM (3 exercises)
- `js-dbg-exam` — Exam: debugging async & DOM [exam] (4 exercises)

### `event_loop_concurrency` — Event Loop, Cancellation & Modules

- `jsf-elc-microtasks` — Event Loop: Microtasks vs Macrotasks (3 exercises)
- `jsf-elc-abort-http` — Cancellation, Concurrent Requests & HTTP Errors (4 exercises)
- `jsf-elc-immutability-devtools` — Immutable Updates, Module Boundaries & Debugging (3 exercises)
- `jsf-elc-exam` — Checkpoint: Event Loop & Concurrency [exam] (3 exercises)

### `capstone` — Capstone

- `jsf-capstone-counter` — Mini: counter logic (3 exercises)
- `jsf-forgeboard-board-lab` — Lab: Interactive ForgeBoard Board (M2) (2 exercises)
- `jsf-cap-exam` — Final JS exam [exam] (6 exercises)

## Depth now

- Units: 25
- Lessons: 104
- Exams: 25
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_output, code_project, code_read, match, mcq

## References

- MDN JavaScript & Fetch/AbortController Guides: https://developer.mozilla.org/

## Expansion (Nov 2026)

Applied transfer: `js-transfer-search-race` in `proxy_meta` handles stale fetch results, cancellation, and safe text rendering.

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `classes_oop` — Classes, inheritance and private fields (4 lessons including exam)
- `collections_maps` — Map, Set and weak collections (4 lessons including exam)
- `iterators_generators` — Iterators and generators (4 lessons including exam)
- `regexp_text` — Regular expressions and Unicode (4 lessons including exam)
- `dates_intl` — Date, time and Intl (4 lessons including exam)
- `proxy_meta` — Proxy, Symbol and Reflect (4 lessons including exam)

Lessons inserted into existing units (before the unit exam):

- `values` ← `jsf-bigint` — BigInt and safe integers
- `values` ← `jsf-object-is` — Object.is and SameValueZero
- `operators` ← `jsf-nullish-assign` — ??, ??= and logical assignment
- `operators` ← `jsf-optional-chain` — Optional chaining and safe calls
- `functions` ← `jsf-rest-spread-fn` — Rest parameters and call-site spread
- `functions` ← `jsf-defaults-tdz` — Default parameters and the TDZ
- `arrays` ← `jsf-reduce-patterns` — reduce: accumulators and patterns
- `arrays` ← `jsf-flatmap-at` — flatMap, at and with
- `objects` ← `jsf-freeze-seal` — freeze, seal and preventExtensions
- `objects` ← `jsf-groupby-fromentries` — Object.groupBy and fromEntries
- `async` ← `jsf-promise-combinators` — Promise.all, allSettled, race and any
- `async` ← `jsf-abort-controller` — AbortController and cancelling fetch
- `dom` ← `jsf-event-delegation` — Event delegation
- `dom` ← `jsf-dom-tokens-data` — classList and data-* attributes
- `modules` ← `jsf-dynamic-import` — Dynamic import() and code splitting
- `errors_proto` ← `jsf-error-cause` — Error cause and custom errors
