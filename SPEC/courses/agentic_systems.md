# Agentic Systems & RAG

Slug: `agentic_systems`
Group: deep
Hub: `/agentic-systems`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `python_for_ai`, `ai_development`
Recommended next: `llmops`, `ai_security`

## What this course is

Script vs model vs agent, tool schemas, planning & reflection against objective checks, multi-agent tradeoffs (LangGraph, CrewAI, AutoGen, Semantic Kernel as architecture choices), hybrid RAG, and vector store tradeoffs.

## Program

### `ag_choose` — Plain Script vs One Model Call vs an Agent

- `ag-ch-ladder` — Cost and Failure Surface: Pick the Simplest Pattern [free] (3 exercises)
- `ag-ch-surface` — Complexity Ladder and Hard Step Caps [free] (3 exercises)
- `ag-ch-exam` — Checkpoint: Choosing the Right Pattern [exam] (3 exercises)

### `ag_tools` — Tool Schemas, Idempotent Tools, and Model-Readable Errors

- `ag-tl-schema` — Tool Contracts and Errors the Model Can Read [free] (3 exercises)
- `ag-tl-idempotent` — Idempotent Tools Under Retries [free] (3 exercises)
- `ag-tl-exam` — Checkpoint: Agent Tools [exam] (3 exercises)

### `ag_plan_reflect` — Task Splitting and Verification-Backed Reflection

- `ag-pr-split` — Splitting Tasks vs Vibes-Based Self-Critique [free] (3 exercises)
- `ag-pr-check` — Reflection Against an Actual Check (3 exercises)
- `ag-pr-exam` — Checkpoint: Planning and Reflection [exam] (3 exercises)

### `ag_multi` — Single Agent vs Multi-Role and Framework Choices

- `ag-ma-roles` — When One Agent Beats Several Roles (and Vice Versa) (3 exercises)
- `ag-ma-pick` — Explicit State Transitions Without Role Ping-Pong (3 exercises)
- `ag-ma-exam` — Checkpoint: Multi-Agent Patterns [exam] (3 exercises)

### `ag_rag` — Chunking, Embeddings, Hybrid Search, and GraphRAG

- `ag-rg-chunk-hybrid` — Chunking and Why Hybrid Search Beats Vector-Only (3 exercises)
- `ag-rg-graphrag` — When Relationships Earn GraphRAG (and When They Do Not) (3 exercises)
- `ag-rg-exam` — Checkpoint: RAG and Retrieval [exam] (3 exercises)

### `ag_vectors` — Vector Stores: Managed vs Self-Host, Filters, Freshness, and Truth

- `ag-vs-stores` — Store Tradeoffs and the Post-Filtering Trap (3 exercises)
- `ag-vs-freshness` — Index Freshness: The Store Does Not Know Which Chunk Is True (3 exercises)
- `ag-vs-exam` — Checkpoint: Vector Stores [exam] (3 exercises)

## Depth now

- Units: 9
- Lessons: 27
- Exams: 9
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_read, match, mcq

## Expansion (Nov 2026)

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `ag_memory_session` — Agent memory: session, facts, and forgetting (3 lessons including exam)
- `ag_hitl_gates` — A human in the loop: confirming risky actions (3 lessons including exam)
- `ag_timeouts_budget` — Limits on an agent's steps, time, and cost (3 lessons including exam)
