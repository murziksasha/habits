# 11 — Testing Strategy

## Goals

- Protect **domain rules** (XP, Elo, hearts, freemium gates)
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
| `@eduforge/web` | Playwright e2e smoke | Playwright | Yes + running web/api |

## Commands

```bash
# All turbo unit/integration package tests
pnpm test

# Units only (same turbo graph; integration runs if not skipped)
pnpm test:unit

# API integration (Postgres required, seed recommended)
pnpm test:integration

# Skip integration when DB unavailable
SKIP_INTEGRATION=1 pnpm --filter @eduforge/api test

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
3. Admin login → `/admin`  
4. `/play` bot CTA  

## Conventions

- Colocate `*.test.ts` next to source  
- Prefer pure functions for unit tests  
- Integration: unique emails via timestamp  
- E2E: workers=1, assume pre-running servers  
