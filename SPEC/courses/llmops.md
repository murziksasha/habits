# LLMOps: Traces, Evals & Budget

Slug: `llmops`
Group: deep
Hub: `/llmops`
Access: Free for every account (no Pro, trial, or paywall).
Prerequisites: `agentic_systems`, `node_fundamentals`
Recommended next: `ai_security`, `devops`

## What this course is

Tracing and token cost (LangSmith, Arize Phoenix, W&B), golden fixture evals in CI without live model calls, HTTP vs GraphQL/gRPC/events, Kafka vs RabbitMQ and idempotent consumers, cloud model decisions (Bedrock, Vertex AI, Azure), serverless vs always-on, and token budgets.

## Program

### `lo_traces` — Traces, Spans, and Token Cost

- `lo-tr-spans` — Why Traces Matter: LangSmith, Phoenix, and W&B (4 exercises, including a concept card)
- `lo-tr-tokens` — Token Growth Across Turns and Reading Span Bottlenecks (4 exercises, including a concept card)
- `lo-tr-exam` — Checkpoint: Traces and Token Cost [exam] (3 exercises)

### `lo_evals` — Golden Fixtures in CI Without Live Model Calls

- `lo-ev-fixtures` — Why CI Grades Golden Fixtures Instead of Live Models (4 exercises, including a concept card)
- `lo-ev-metrics` — Deterministic Invariants to Assert on Fixtures (4 exercises, including a concept card)
- `lo-ev-exam` — Checkpoint: Golden Fixture Evals [exam] (3 exercises)

### `lo_apis` — APIs: HTTP, GraphQL, gRPC, and Request vs Event

- `lo-ap-contracts` — The Agent Lives on HTTP: When GraphQL or gRPC Makes Sense (4 exercises, including a concept card)
- `lo-ap-events` — Request vs Event: Avoiding Timeout Traps (4 exercises, including a concept card)
- `lo-ap-exam` — Checkpoint: APIs and Events [exam] (3 exercises)

### `lo_queues` — Queues: Kafka vs RabbitMQ, At-Least-Once, and Idempotency

- `lo-qu-brokers` — Kafka vs RabbitMQ as a Durable Handoff (4 exercises, including a concept card)
- `lo-qu-idempotency` — Idempotent Consumers and Dead-Letter Queues (4 exercises, including a concept card)
- `lo-qu-exam` — Checkpoint: Queues and Delivery [exam] (3 exercises)

### `lo_cloud` — Cloud Consoles: Bedrock, Vertex AI, and Azure

- `lo-cl-consoles` — Three Consoles, Same Decision: Model ID, Region, Budget Cap (4 exercises, including a concept card)
- `lo-cl-iam` — Workload Identity Over Static Keys and Safe Region Changes (4 exercises, including a concept card)
- `lo-cl-exam` — Checkpoint: Cloud LLM Consoles [exam] (3 exercises)

### `lo_cost` — Serverless vs Always-On, Retries, and Token Budget Limits

- `lo-co-compute` — Serverless vs Always-On and Retry Storms (4 exercises, including a concept card)
- `lo-co-budget` — Token Budget as a Product Limit (4 exercises, including a concept card)
- `lo-co-exam` — Checkpoint: Compute and Budgets [exam] (3 exercises)

## Depth now

- Units: 10
- Lessons: 30
- Exams: 10
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_read, concept, match, mcq

## Expansion (Nov 2026)

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `lo_prompt_versions` — Prompt versions and a release, as for code (3 lessons including exam)
- `lo_canary_rollout` — A canary and shadow traffic for a model (3 lessons including exam)
- `lo_semantic_slo` — A semantic cache and a model-response SLO (3 lessons including exam)
- `lo_applied_release_gate` — Fixed eval fixtures, cost traces, and rollback decisions (3 lessons including exam)
