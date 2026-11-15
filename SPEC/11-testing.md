# 11 — Testing Strategy

## Goals

- Protect **domain rules** (XP, Elo, hearts, open lesson access)
- Protect **grading** of all exercise types
- Protect **chess move/puzzle** helpers
- Validate **content seed structure**
- **HTTP integration** against real Postgres
- **Matchmaking** pure logic
- **Playwright e2e** smoke for critical UX paths

## Layout

| Package / app | Tests | Tool | Needs DB? |
|---------------|-------|------|-----------|
| `@eduforge/shared` | XP, Elo, entitlements, schemas | Vitest | No |
| `@eduforge/chess-core` | applyMove, puzzles | Vitest | No |
| `@eduforge/content` | Course tree shape, exercise ids | Vitest | No |
| `@eduforge/api` | `gradeExercise` + integration HTTP | Vitest | Integration: yes |
| `@eduforge/realtime` | matchmaking pure helpers | Vitest | No |
| `@eduforge/web` | Pure helpers and component unit tests; browser e2e separately | Vitest / Playwright | Unit: no; e2e: yes + running web/api |

## Commands

```bash
# Package test scripts (API integration is a separate command)
pnpm test

# Workspace unit suites; API default config excludes integration.test.ts
pnpm test:unit

# API integration (Postgres required, seed recommended)
pnpm test:integration

# API unit suite (no Postgres required)
pnpm --filter @eduforge/api test

# Playwright e2e (web + api must be running)
pnpm test:e2e

# Skip e2e
SKIP_E2E=1 pnpm test:e2e
```

### Prerequisites

**Integration**

```bash
docker compose up postgres redis -d
pnpm db:migrate
pnpm db:seed
pnpm test:integration
```

**E2E**

```bash
pnpm dev   # web :3000, api :4000, realtime :4001
pnpm --filter @eduforge/web exec playwright install chromium
pnpm test:e2e
```

## What integration covers

`apps/api/src/integration.test.ts`:

1. Health  
2. Register / duplicate email  
3. Login / me  
4. Courses list + English tree  
5. Load lesson + perfect submit → XP  
6. Password reset (dev token)  
7. Admin stats  
8. Non-admin forbidden on `/admin`  
9. Leaderboard + chess rating  

Uses Hono `app.request()` via exported `createApp()` — no live port needed, only DB.

Electrical engineering content is gated by `@eduforge/content` tests: 60 units, 360 lessons, version-2 lesson bodies, bilingual prompts, exam shape, and explain samples that pass `gradeExercise`. Circuit reference labs are gated by `@eduforge/circuit-engine` `project-labs.test.ts`. A 503 from an unavailable engine is specified and is not covered by the Postgres integration file yet. Browser desktop and mobile passes of the lab editor were not run in the authoring session that landed the version-2 course.

## Learning-quality review (2026-11-15)

Review of commit `2bc27f6` ran the complete shared, content, API unit, and web unit suites:

| Package | Passed tests |
| --- | ---: |
| `@eduforge/shared` | 260 |
| `@eduforge/content` | 81 |
| `@eduforge/api` | 138 |
| `@eduforge/web` | 34 |
| **Total** | **513** |

The shared build and typechecks for all four packages also passed. This is a recorded review result, not a claim that future commits or a deployed instance have passed. Postgres integration and browser desktop/mobile checks were not run in that review because the local services were not running. The circuit-engine suite had 26 passing tests in the preceding course audit; it was not rerun for `2bc27f6`.

Added regression coverage includes tiny-value scalar/complex tolerances, zero/wrong-sign charge answers, repeated-keyword explanations, reported assistance and theory-only evidence, current-version Continue targets and exam readiness, submission visibility/slug checks, and stable choice permutations. Web helper tests do not exercise mouse/keyboard interaction or editor recovery in a browser.

Outstanding recovery, recommendation, mastery, and locale scenarios are tracked in [CURRENT](./CURRENT.md#learning-quality-follow-up). Existing green suites do not cover all of those behaviors.

## What matchmaking tests cover

`apps/realtime/src/matchmaking.test.ts`:

- Opponent matching by time control + rated  
- No self-match  
- Remove by user / socket  
- Color assignment  

## What e2e covers

`apps/web/e2e/smoke.spec.ts`:

1. Landing `lang=uk`  
2. Register → dashboard → English lesson  
3. Admin login with **real TOTP** (seed secret) → `/admin` (`e2e/helpers.ts`, `e2e/mfa.spec.ts`)  
4. Optional backup-code login (re-seed if code consumed)  
5. `/play` bot CTA  

## Conventions

- Colocate `*.test.ts` next to source  
- Prefer pure functions for unit tests  
- Integration: unique emails via timestamp  
- E2E: workers=1, assume pre-running servers  
