# REST API Design

Slug: `rest_api_design`
Group: deep
Hub: `/rest-api-design`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `express_fundamentals`
Recommended next: `web_security`, `nextjs_fullstack`

## What this course is

Resource URLs, HTTP methods and status codes, idempotency, versioning, pagination and problem+json errors, auth, rate limits, and OpenAPI as a contract — 24 bilingual lessons.

## Program

### `resources_urls` — Resources and URLs

- `rest-noun-url` — A URL names a resource with a noun, not an action in the path
- `rest-nested-limit` — Nesting is short: two levels of depth, then a direct identifier
- `rest-collection-item` — A collection and an item behave differently: a list, creation, one resource
- `resources_urls-exam` — Exam: REST resources [exam]

### `methods_status` — Methods and status codes

- `rest-get-safe` — GET and HEAD are safe: no side effects; they are cacheable
- `rest-post-201` — POST is not idempotent; PUT replaces entirely, PATCH is partial
- `rest-status-class` — The status class carries meaning: 2xx success, 4xx a client error, 5xx a server error
- `methods_status-exam` — Exam: methods and codes [exam]

### `idempotency_safety` — Idempotency and safe retries

- `rest-put-idem` — An idempotent request can be retried with the same effect
- `rest-idem-key` — An idempotency key makes a POST retry safe
- `rest-safe-retry` — A retry on 408/429/503: with backoff, only when the operation allows it
- `idempotency_safety-exam` — Exam: idempotency [exam]

### `rest_versioning` — Versioning and compatibility

- `rest-uri-vs-header` — You version on purpose: /v1 in the path or a profile in a header
- `rest-compat-additive` — A compatible change is adding a field; removing or renaming is a break
- `rest-deprecation` — You retire a stale version on a schedule: Deprecation, Sunset, and documentation
- `rest_versioning-exam` — Exam: API versioning [exam]

### `rest_lists_errors` — Lists, filters, and errors

- `rest-cursor-offset` — Pagination: offset is simpler, a cursor is more stable under inserts
- `rest-filter-sort` — Filtering and sorting are explicit parameters, not hidden magic in a GET body
- `rest-problem-json` — An error for a machine and a human: application/problem+json, not arbitrary text
- `rest_lists_errors-exam` — Exam: lists and errors [exam]

### `rest_auth_docs` — Auth, rate limits, and the contract

- `rest-auth-schemes` — The secret goes in Authorization, not in the URL: a Bearer, a key, or a session
- `rest-rate-limit` — A request limit: 429, Retry-After, and visible counters
- `rest-openapi` — OpenAPI is a contract, not only a pretty docs page
- `rest_auth_docs-exam` — Exam: auth and the contract [exam]
