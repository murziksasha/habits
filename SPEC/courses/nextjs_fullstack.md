# Full-Stack Applications with Next.js

Slug: `nextjs_fullstack`
Group: deep
Hub: `/nextjs-fullstack`
Access: Free for every account (no Pro, trial, or paywall).
Prerequisites: `react_fundamentals`, `express_fundamentals`, `postgresql_apps`
Recommended next: `applied_algorithms`, `devops`

## What this course is

App Router, explicit Server/Client boundaries, isolated server data access, validated mutations, authz beyond middleware, caching/error states, and Next.js ForgeBoard.

## Local ForgeBoard Labs

- **Milestone 11 (`forgeboard-m11-nextjs` v1.0.0)** on lesson `nx-forgeboard-app-lab` — `/labs/forgeboard-m11-nextjs-v1.0.0.zip` (`assessmentMode: "local_practice"`, runtime: Node >= 20, pnpm >= 9)

## Program

### `nx_app_routing` — App Router, Layouts, Loading & Error States

- `nx-ar-files` — Special Files in App Router Segments (2 exercises)
- `nx-ar-exam` — Checkpoint: App Router Foundations [exam] (1 exercises)

### `nx_server_client_boundaries` — Server vs Client Component Boundaries

- `nx-scb-boundary` — Pushing 'use client' Down the Component Tree (2 exercises)
- `nx-scb-exam` — Checkpoint: Server & Client Boundaries [exam] (1 exercises)

### `nx_data_access` — Server Data Access, Streaming & Secret Isolation

- `nx-da-env` — Private Env Vars & Server-Only Data Access (2 exercises)
- `nx-da-exam` — Checkpoint: Server Data Access [exam] (1 exercises)

### `nx_mutations_actions` — Mutations: Route Handlers & Server Actions

- `nx-ma-contracts` — Validating & Authorizing Every Mutation Endpoint (2 exercises)
- `nx-ma-exam` — Checkpoint: Secure Mutations [exam] (1 exercises)

### `nx_identity_authz` — Identity & Authorization Beyond Middleware

- `nx-ia-dal` — Defense in Depth: Never Rely Solely on Middleware (1 exercises)
- `nx-ia-exam` — Checkpoint: Identity & Authz [exam] (1 exercises)

### `nx_caching_failures` — Caching, Revalidation & Failure States

- `nx-cf-stale-cache` — Preventing Cross-User Cache Leaks & Stale Reads (2 exercises)
- `nx-cf-exam` — Checkpoint: Caching & Failures [exam] (1 exercises)

### `nx_deploy_diagnostics_capstone` — Build Diagnostics & Next.js ForgeBoard Lab

- `nx-dd-prod-diag` — Diagnosing Hydration Mismatches & Build Traps (1 exercises)
- `nx-forgeboard-app-lab` — Lab: ForgeBoard Full-Stack Boundaries in Next.js (M11) (2 exercises)
- `nx-dd-exam` — Checkpoint: Next.js Full-Stack [exam] (1 exercises)

## Depth now

- Units: 10
- Lessons: 28
- Exams: 10
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_project, code_read, match, mcq

## References

- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components

## Expansion (Nov 2026)

Applied transfer: `nx-transfer-tenant-inbox` in `nx_middleware_edges` separates server authorization, client form state, mutations, and tenant-aware caching.

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `nx_streaming_ppr` — Streaming, Suspense, and partial prerendering (4 lessons including exam)
- `nx_metadata_assets` — Metadata, images, and fonts (4 lessons including exam)
- `nx_middleware_edges` — Middleware, parallel routes, and edges (4 lessons including exam)
