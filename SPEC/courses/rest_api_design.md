# REST API Design

Slug: `rest_api_design`
Group: deep
Hub: `/rest-api-design`
Access: Free for every account (no Pro, trial, or paywall).
Prerequisites: `express_fundamentals`
Recommended next: `postgresql_apps`, `web_security`

## What this course is

Resource URLs, HTTP methods and status codes, idempotency, versioning, pagination and problem+json errors, auth, rate limits, and OpenAPI as a contract — 24 bilingual lessons.

## Program

### `resources_urls` — Resources and URLs

- `rest-noun-url` — A URL names a resource with a noun, not an action in the path
- `rest-nested-limit` — URL depth: parent context or a direct identifier
- `rest-collection-item` — A collection and an item behave differently: a list, creation, one resource
- `resources_urls-exam` — Exam: REST resources [exam]

### `methods_status` — Methods and status codes

- `rest-get-safe` — GET and HEAD: safe semantics and caching conditions
- `rest-post-201` — POST by contract; PUT replaces, PATCH applies changes
- `rest-status-class` — The status class carries meaning: 2xx success, 4xx a client error, 5xx a server error
- `methods_status-exam` — Exam: methods and codes [exam]

### `idempotency_safety` — Idempotency and safe retries

- `rest-put-idem` — Idempotent effects and concurrent-update risks
- `rest-idem-key` — Idempotency keys: a POST retry contract
- `rest-safe-retry` — A retry on 408/429/503: with backoff, only when the operation allows it
- `idempotency_safety-exam` — Exam: idempotency [exam]

### `rest_versioning` — Versioning and compatibility

- `rest-uri-vs-header` — You version on purpose: /v1 in the path or a profile in a header
- `rest-compat-additive` — Check change compatibility against real clients
- `rest-deprecation` — You retire a stale version on a schedule: Deprecation, Sunset, and documentation
- `rest_versioning-exam` — Exam: API versioning [exam]

### `rest_lists_errors` — Lists, filters, and errors

- `rest-cursor-offset` — Pagination: offset is simpler, a cursor is more stable under inserts
- `rest-filter-sort` — Filtering and sorting are explicit parameters, not hidden magic in a GET body
- `rest-problem-json` — An error for a machine and a human: application/problem+json, not arbitrary text
- `rest_lists_errors-exam` — Exam: lists and errors [exam]

### `rest_auth_docs` — Auth, rate limits, and the contract

- `rest-auth-schemes` — Bearer, API keys, and sessions: protect secrets and check permissions
- `rest-rate-limit` — A request limit: 429, Retry-After, and visible counters
- `rest-openapi` — OpenAPI is a contract, not only a pretty docs page
- `rest_auth_docs-exam` — Exam: auth and the contract [exam]

### `rest_applied_orders` — Orders without duplicates

- `rest-applied-retry-contract` — Safe POST retry with server-side deduplication (6 exercises, including a concept card)
- `rest-applied-list-contract` — Stable pagination and public error contract (6 exercises, including a concept card)
- `rest_applied_orders-exam` — Exam: order contract [exam] (4 exercises)

Reference for safe retries: [RFC 9110 HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2).
