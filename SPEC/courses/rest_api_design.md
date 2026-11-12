# REST API Design

Slug: `rest_api_design`
Group: deep
Hub: `/rest-api-design`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `express_fundamentals`
Recommended next: `web_security`, `nextjs_fullstack`

## What this course is

Resource URLs, HTTP methods and status codes, idempotency, and practical REST API contracts.

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

