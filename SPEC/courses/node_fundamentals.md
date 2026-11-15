# Node.js Fundamentals

Slug: `node_fundamentals`
Group: deep
Hub: `/node-fundamentals`
Freemium: first 6 non-exam lesson(s) open without Pro.
Prerequisites: `js_fundamentals`
Recommended next: `express_fundamentals`, `sysadmin`

## What this course is

Runtime, modules, fs/path, env, http server, npm, async, events/streams, process resilience, and service reliability — deep track + unit exams.

## Program

### `runtime` — Node runtime

- `nf-what` — What is Node.js [free] (3 exercises)
- `nf-repl-cli` — node CLI [free] (3 exercises)
- `nf-runtime-exam` — Exam: runtime [exam] (4 exercises)

### `modules` — Modules

- `nf-cjs` — CommonJS require [free] (3 exercises)
- `nf-esm` — ESM import/export [free] (3 exercises)
- `nf-mod-exam` — Exam: modules [exam] (4 exercises)

### `fs-path` — fs & path

- `nf-path` — path module [free] (3 exercises)
- `nf-fs` — fs read/write intro (3 exercises)
- `nf-fs-exam` — Exam: fs/path [exam] (4 exercises)

### `env` — Env & config

- `nf-env` — process.env (3 exercises)
- `nf-dotenv` — .env pattern (2 exercises)
- `nf-env-exam` — Exam: env [exam] (4 exercises)

### `http` — http server

- `nf-http-create` — http.createServer (3 exercises)
- `nf-req-res` — req / res (3 exercises)
- `nf-http-exam` — Exam: http [exam] (4 exercises)

### `npm` — npm & scripts

- `nf-package` — package.json (3 exercises)
- `nf-deps` — dependencies vs devDependencies (3 exercises)
- `nf-npm-exam` — Exam: npm [exam] (4 exercises)

### `async-node` — Async in Node

- `nf-event-loop` — Event loop idea (3 exercises)
- `nf-promises` — Promises / async await (3 exercises)
- `nf-async-exam` — Exam: async [exam] (4 exercises)

### `events_streams` — Events & streams

- `nf-events` — EventEmitter basics (3 exercises)
- `nf-streams` — Readable streams idea (3 exercises)
- `nf-events-exam` — Exam: events/streams [exam] (4 exercises)
- `nf-json-errors` — JSON & errors lite [free] (4 exercises)

### `node_resilience_scenarios` — Scenario: Process Resilience & Failure Handling

- `node-scen-unhandled-rejection` — Unhandled rejections & graceful shutdown (3 exercises)
- `node-scen-stream-backpressure` — Memory safety: stream backpressure & pipeline (2 exercises)
- `node-scen-fs-error-handling` — Safe file I/O & timeout aborts (2 exercises)
- `node-scen-exam` — Exam: Node resilience [exam] (4 exercises)

### `production_patterns` — Config Validation, Cancellation & Service Reliability

- `nf-config-shutdown` — Fail-fast config, AbortController & graceful shutdown (3 exercises)
- `nf-logs-blocking-tests` — Structured logs, blocking CPU work & node:test (3 exercises)
- `nf-prod-exam` — Exam: production Node service [exam] (4 exercises)

### `capstone` — Capstone

- `nf-capstone-server` — Mini: tiny HTTP server (1 exercises)
- `nf-cap-exam` — Final Node exam [exam] (6 exercises)

## Depth now

- Units: 15
- Lessons: 50
- Exams: 15
- Free non-exam lessons: 6
- Exercise types in seed: code_fill, code_order, code_output, code_project, code_read, match, mcq

## Expansion (Nov 2026)

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `buffers_bytes` — Buffers, bytes, and encodings (4 lessons including exam)
- `child_process_ipc` — Child processes and IPC (4 lessons including exam)
- `workers_threads` — Worker threads and shared memory (4 lessons including exam)
- `node_diagnostics` — Signals, diagnostics, and channels (4 lessons including exam)
