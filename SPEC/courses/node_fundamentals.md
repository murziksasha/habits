# Node.js Fundamentals

Slug: `node_fundamentals`
Group: deep
Hub: `/node-fundamentals`
Access: Free for every account (no Pro, trial, or paywall).
Prerequisites: `js_fundamentals`
Recommended next: `express_fundamentals`, `rest_api_design`

## What this course is

Runtime, modules, fs/path, env, http server, npm, async, events/streams, process resilience, and service reliability — deep track + unit exams.

## Program

### `runtime` — Node runtime

- `nf-what` — What is Node.js (5 exercises, including a bilingual concept card)
- `nf-repl-cli` — node CLI (4 exercises, including a bilingual concept card)
- `nf-runtime-exam` — Exam: runtime [exam] (4 exercises)

### `modules` — Modules

- `nf-cjs` — CommonJS require (5 exercises, including a bilingual concept card)
- `nf-esm` — ESM import/export (5 exercises, including a bilingual concept card)
- `nf-mod-exam` — Exam: modules [exam] (4 exercises)

### `fs-path` — fs & path

- `nf-path` — path module (5 exercises, including a bilingual concept card)
- `nf-fs` — fs read/write intro (5 exercises, including a bilingual concept card)
- `nf-fs-exam` — Exam: fs/path [exam] (4 exercises)

### `env` — Env & config

- `nf-env` — process.env (5 exercises, including a bilingual concept card)
- `nf-dotenv` — .env pattern (4 exercises, including a bilingual concept card)
- `nf-env-exam` — Exam: env [exam] (4 exercises)

### `http` — http server

- `nf-http-create` — http.createServer (5 exercises, including a bilingual concept card)
- `nf-req-res` — req / res (5 exercises, including a bilingual concept card)
- `nf-http-exam` — Exam: http [exam] (4 exercises)

### `npm` — npm & scripts

- `nf-package` — package.json (5 exercises, including a bilingual concept card)
- `nf-deps` — dependencies vs devDependencies (5 exercises, including a bilingual concept card)
- `nf-npm-exam` — Exam: npm [exam] (4 exercises)

### `async-node` — Async in Node

- `nf-event-loop` — Event loop idea (5 exercises, including a bilingual concept card)
- `nf-promises` — Promises / async await (5 exercises, including a bilingual concept card)
- `nf-async-exam` — Exam: async [exam] (4 exercises)

### `events_streams` — Events & streams

- `nf-events` — EventEmitter basics (5 exercises, including a bilingual concept card)
- `nf-streams` — Readable streams idea (5 exercises, including a bilingual concept card)
- `nf-events-exam` — Exam: events/streams [exam] (4 exercises)
- `nf-json-errors` — JSON & errors lite (6 exercises, including a bilingual concept card)

### `node_resilience_scenarios` — Scenario: Process Resilience & Failure Handling

- `node-scen-unhandled-rejection` — Unhandled rejections & graceful shutdown (4 exercises, including a bilingual concept card)
- `node-scen-stream-backpressure` — Memory safety: stream backpressure & pipeline (3 exercises, including a bilingual concept card)
- `node-scen-fs-error-handling` — Safe file I/O & timeout aborts (4 exercises, including a bilingual concept card)
- `node-scen-exam` — Exam: Node resilience [exam] (4 exercises)

### `production_patterns` — Config Validation, Cancellation & Service Reliability

- `nf-config-shutdown` — Fail-fast config, AbortController & graceful shutdown (4 exercises, including a bilingual concept card)
- `nf-logs-blocking-tests` — Structured logs, blocking CPU work & node:test (4 exercises, including a bilingual concept card)
- `nf-prod-exam` — Exam: production Node service [exam] (4 exercises)

### `capstone` — Capstone

- `nf-capstone-server` — Mini: tiny HTTP server (3 exercises, including a bilingual concept card)
- `nf-cap-exam` — Final Node exam [exam] (6 exercises)

## Depth now

- Units: 15
- Lessons: 51
- Exams: 15
- Free non-exam lessons: 6
- Exercise types in seed: code_fill, code_order, code_output, code_project, code_read, match, mcq

## Expansion (Nov 2026)

Applied transfer: `node-transfer-import` in `node_diagnostics` handles stream backpressure, record-size limits, conditional atomic publication, and cancellation at shutdown.

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `buffers_bytes` — Buffers, bytes, and encodings (4 lessons including exam)
- `child_process_ipc` — Child processes and IPC (4 lessons including exam)
- `workers_threads` — Worker threads and shared memory (4 lessons including exam)
- `node_diagnostics` — Signals, diagnostics, and channels (4 lessons including exam)

The buffer unit distinguishes UTF-8 bytes from JavaScript UTF-16 code units, explains partial initialization and shared backing memory, and supplies bilingual choice options. The buffer-copy check accepts `Buffer.from(other)` rather than `Buffer.alloc(other)`.

The child-process unit covers argument validation, bounded output, spawn errors, timeouts and platform-dependent signals; it explains why escalation timers must be cleared after exit.

The worker unit covers structured cloning, transferable ownership, pooled-buffer caveats and atomic increments using bilingual exercises.

The diagnostics unit covers bounded shutdown, synchronous diagnostic subscribers and request-scoped asynchronous context in both locales.
