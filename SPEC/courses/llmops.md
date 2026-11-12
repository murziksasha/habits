# LLMOps: Traces, Evals & Budget

Slug: `llmops`
Group: deep
Hub: `/llmops`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `agentic_systems`, `node_fundamentals`
Recommended next: `ai_security`, `devops`

## What this course is

Tracing and token cost (LangSmith, Arize Phoenix, W&B), golden fixture evals in CI without live model calls, HTTP vs GraphQL/gRPC/events, Kafka vs RabbitMQ and idempotent consumers, cloud model decisions (Bedrock, Vertex AI, Azure), serverless vs always-on, and token budgets.

## Program

### `lo_traces` — Traces, Spans, and Token Cost

- `lo-tr-spans` — Why Traces Matter: LangSmith, Phoenix, and W&B [free] (3 exercises)
- `lo-tr-tokens` — Token Growth Across Turns and Reading Span Bottlenecks [free] (3 exercises)
- `lo-tr-exam` — Checkpoint: Traces and Token Cost [exam] (3 exercises)

### `lo_evals` — Golden Fixtures in CI Without Live Model Calls

- `lo-ev-fixtures` — Why CI Grades Golden Fixtures Instead of Live Models [free] (3 exercises)
- `lo-ev-metrics` — Deterministic Invariants to Assert on Fixtures [free] (3 exercises)
- `lo-ev-exam` — Checkpoint: Golden Fixture Evals [exam] (3 exercises)

### `lo_apis` — APIs: HTTP, GraphQL, gRPC, and Request vs Event

- `lo-ap-contracts` — The Agent Lives on HTTP: When GraphQL or gRPC Makes Sense [free] (3 exercises)
- `lo-ap-events` — Request vs Event: Avoiding Timeout Traps (3 exercises)
- `lo-ap-exam` — Checkpoint: APIs and Events [exam] (3 exercises)

### `lo_queues` — Queues: Kafka vs RabbitMQ, At-Least-Once, and Idempotency

- `lo-qu-brokers` — Kafka vs RabbitMQ as a Durable Handoff (3 exercises)
- `lo-qu-idempotency` — Idempotent Consumers and Dead-Letter Queues (3 exercises)
- `lo-qu-exam` — Checkpoint: Queues and Delivery [exam] (3 exercises)

### `lo_cloud` — Cloud Consoles: Bedrock, Vertex AI, and Azure

- `lo-cl-consoles` — Three Consoles, Same Decision: Model ID, Region, Budget Cap (3 exercises)
- `lo-cl-iam` — Workload Identity Over Static Keys and Safe Region Changes (3 exercises)
- `lo-cl-exam` — Checkpoint: Cloud LLM Consoles [exam] (3 exercises)

### `lo_cost` — Serverless vs Always-On, Retries, and Token Budget Limits

- `lo-co-compute` — Serverless vs Always-On and Retry Storms (3 exercises)
- `lo-co-budget` — Token Budget as a Product Limit (3 exercises)
- `lo-co-exam` — Checkpoint: Compute and Budgets [exam] (3 exercises)

## Depth now

- Units: 6
- Lessons: 18
- Exams: 6
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_read, match, mcq
