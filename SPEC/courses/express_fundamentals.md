# Express Fundamentals

Slug: `express_fundamentals`
Group: deep
Hub: `/express-fundamentals`
Access: Free for every account (no Pro, trial, or paywall).
Prerequisites: `node_fundamentals`
Recommended next: `rest_api_design`, `postgresql_apps`, `go_fundamentals`

## What this course is

App, routes, middleware, REST, validation resilience, auth vs ownership, Router, and ForgeBoard API — deep track + unit exams.

## Local ForgeBoard Labs

- **Milestone 5 (`forgeboard-m5-express` v1.0.0)** on lesson `ef-forgeboard-api-lab` — `/labs/forgeboard-m5-express-v1.0.0.zip` (`assessmentMode: "local_practice"`, runtime: Node >= 20, pnpm >= 9, Express 4/5 + Zod)

## Program

### `intro` — Express intro

- `ef-what` — What is Express (5 exercises, including a bilingual concept card)
- `ef-install` — Install & import (5 exercises, including a bilingual concept card)
- `ef-intro-exam` — Exam: intro [exam] (4 exercises)

### `app-basics` — App basics

- `ef-create-app` — express() + listen (5 exercises, including a bilingual concept card)
- `ef-first-route` — First GET route (5 exercises, including a bilingual concept card)
- `ef-app-exam` — Exam: app [exam] (4 exercises)

### `routes` — Routes

- `ef-methods` — HTTP methods on app (5 exercises, including a bilingual concept card)
- `ef-params-query` — params & query (5 exercises, including a bilingual concept card)
- `ef-routes-exam` — Exam: routes [exam] (4 exercises)

### `middleware` — Middleware

- `ef-use-next` — app.use & next() (5 exercises, including a bilingual concept card)
- `ef-json-static` — express.json & static (5 exercises, including a bilingual concept card)
- `ef-mw-exam` — Exam: middleware [exam] (4 exercises)

### `rest` — REST responses

- `ef-status-json` — status + json (5 exercises, including a bilingual concept card)
- `ef-rest-paths` — RESTful paths (5 exercises, including a bilingual concept card)
- `ef-rest-exam` — Exam: REST [exam] (4 exercises)

### `json-body` — JSON body

- `ef-json-mw` — express.json middleware (6 exercises, including a bilingual concept card)
- `ef-post-create` — POST create pattern (6 exercises, including a bilingual concept card)
- `ef-json-exam` — Exam: JSON body [exam] (6 exercises)

### `errors` — Error handling

- `ef-error-mw` — Error middleware (5 exercises, including a bilingual concept card)
- `ef-try-catch` — try/catch in handlers (5 exercises, including a bilingual concept card)
- `ef-err-exam` — Exam: errors [exam] (4 exercises)

### `routers` — Routers

- `ef-router` — express.Router (5 exercises, including a bilingual concept card)
- `ef-mount-prefix` — Mount prefixes (5 exercises, including a bilingual concept card)
- `ef-router-exam` — Exam: routers [exam] (4 exercises)

### `express_resilience_scenarios` — Scenario: Validation Middleware & Failure Handling

- `exp-scen-validation-middleware` — Schema validation middleware & 400 Bad Request (5 exercises, including a bilingual concept card)
- `exp-scen-async-error-forwarding` — Async route error forwarding & next(err) (4 exercises, including a bilingual concept card)
- `exp-scen-centralized-error-handler` — Centralized 4-argument error handler (4 exercises, including a bilingual concept card)
- `exp-scen-exam` — Exam: validation & error resilience [exam] (4 exercises)

### `api_contracts_authz` — Validated CRUD, Pagination & Auth vs Ownership

- `ef-auth-vs-authz` — Authentication (401) vs authorization & ownership (403) (5 exercises, including a bilingual concept card)
- `ef-pagination-contracts` — Pagination, filtering & consistent API error contracts (5 exercises, including a bilingual concept card)
- `ef-contracts-exam` — Exam: API contracts & authorization [exam] (4 exercises)

### `capstone` — Capstone

- `ef-capstone-api` — Mini: REST /health API (3 exercises, including a bilingual concept card)
- `ef-forgeboard-api-lab` — ForgeBoard M5: Validated REST API with Ownership Checks (5 exercises, including a bilingual concept card)
- `ef-cap-exam` — Final Express exam [exam] (6 exercises)

## Depth now

- Units: 15
- Lessons: 51
- Exams: 15
- Free non-exam lessons: 7
- Exercise types in seed: code_fill, code_order, code_output, code_project, code_read, match, mcq

## Expansion (Nov 2026)

Applied transfer: `express-transfer-reservation` in `testing_express` checks owner scope, validation, concurrent retries, key conflicts, and idempotency scope.

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `cookies_sessions` — Cookies, flags, and sessions (4 lessons including exam)
- `uploads_limits` — File uploads and body limits (4 lessons including exam)
- `security_headers` — Security headers, CORS, and rate limits (4 lessons including exam)
- `testing_express` — Testing Express: the app, routes, and middleware (4 lessons including exam)

The cookies and sessions unit covers browser session restoration, CSRF limitations, session-store expiry and safe secret rotation with bilingual choices.

The upload unit covers parser defaults, separate size and nesting bounds, untrusted file metadata, route-scoped media checks, and cleanup of temporary files.

The headers unit explains CSP as defense in depth, CORS limitations, and separate IP/account limits with proxy trust matched to deployment topology.

The testing unit distinguishes a fixed port from Supertest's ephemeral server, covers Express 4/5 promise handling, and includes a runnable-syntax middleware stub example.
