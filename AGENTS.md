# Agent profile — EduForge

Precedence: user message + system harness > this file > improvisation.

**EduForge** is a learning SaaS (English, chess, typing, speed reading, logic, programming) with character progression and live chess. Product name in code and packages is `eduforge` (`@eduforge/*`).

Code, comments, and `SPEC/` are **English**. User-facing copy is **Ukrainian + English** via `@eduforge/shared` (`UI` / `getUI`). File writes: **UTF-8** (never UTF-16).

## Plan vs execute

- **Plan** (user asks for a plan, or Plan mode): use `enter_plan_mode` / `exit_plan_mode`. Write the plan, **stop**. Do not edit code until the user approves.
- **Execute** (a concrete implementation request, or after plan approval): edit, test, and install without asking for routine file changes.

**Confirm with the user before:** `git push` / force-push, merge, deleting branches, `docker compose down -v` or wiping Postgres/Redis volumes, `pnpm db:seed` against a shared database, editing `.env` secrets, production Compose/nginx changes, instance-backup restore (`RESTORE`), or flipping deployed flags (`JUDGE_MODE`, `ALLOW_DEV_BILLING`, `FEATURE_STRICT_CSRF`, `CRON_SECRET`).

## Source of truth

Read the matching doc **before** changing that domain. Index: `SPEC/README.md`. Day-to-day product truth is `SPEC/CURRENT.md`. Specs `01`–`88` are historical feature logs. One topic → one file. Do not invent a parallel doc tree.

| Work | Read first |
| --- | --- |
| What exists, IA, what not to add | `SPEC/CURRENT.md` |
| Local run, env, ports | `README.md`, `.env.example`, `SPEC/10-infrastructure.md` |
| Ops, flags, backups, cron | `SPEC/OPS.md`, `SPEC/CRON.md` |
| Layout / processes | `SPEC/02-architecture.md` |
| Schema | `SPEC/03-domain-model.md`, `packages/db/src/schema/` |
| HTTP | `SPEC/04-api-reference.md`, `apps/api/src/routes/openapi.ts` (`GET /docs`) |
| Courses, lessons, new slug | `SPEC/CONTENT-DX.md`, `SPEC/COURSE-REGISTRY.md` |
| XP, hearts, streaks, Elo | `SPEC/06-gamification.md` |
| Chess sockets | `SPEC/07-chess-realtime.md` |
| Auth, billing, admin, MFA | `SPEC/08-auth-billing-admin.md`, `SPEC/72-admin-platform-v2.md`, `SPEC/77-security-retention-pack.md`, `SPEC/78-oauth-2fa-family-teacher.md` |
| Web routes / UX | `SPEC/09-frontend.md` |
| Tests | `SPEC/11-testing.md` |

New HTTP routes inherit the auth of their sibling (`authMiddleware`, `adminMiddleware`, or public read). Do not add unauthenticated writes. Register the route in `apps/api/src/app.ts` and add a path to the hand-written OpenAPI doc.

## Layout

pnpm workspaces + Turborepo. Package manager: **pnpm** (do not use npm/yarn).

```
apps/web        Next.js 15 App Router, React 19, Tailwind     :3000
apps/api        Hono on Node                                   :4000
apps/realtime   Socket.IO chess (Express)                      :4001
apps/mobile     WebView shell scaffold (Expo not installed)
packages/shared XP, Elo, entitlements, gradeExercise, Zod, i18n, flags
packages/db     Drizzle schema, migrations, seed
packages/content  Seed courses + MDX pipeline
packages/chess-core
packages/judge  Code judge + queue (fail-closed in production)
SPEC/           Product and technical docs
```

Dependency direction: `web` → `shared`. `api` and `realtime` → `shared`, `db`, `chess-core` (`api` also → `judge`). `db` → `content`, `shared`. `content` and `chess-core` are leaves. No app imports another app.

Workspace packages emit `dist/`. After changing `shared`, `db`, `content`, or `chess-core`, rebuild that package before typecheck/test of dependents (`pnpm --filter @eduforge/<pkg> build`). Turbo `typecheck` / `test` already depend on `^build`.

## Invariants

Details live in the docs above. Do not break these:

- **Server authority.** Clients never grant XP, hearts, Elo, exam pass, or entitlements. Grading is `gradeExercise` in `@eduforge/shared` (API and client soft-grade stay aligned).
- **Freemium.** First 5 non-exam lessons per course are free (`FREE_LESSONS_PER_COURSE`). Dev billing (`/billing/dev-upgrade`) stays off in real production.
- **Sessions.** Random token, **SHA-256** in `sessions`, cookie `eduforge_session`. Raw Bearer in JSON only outside production or with `X-Issue-Bearer: 1`.
- **Authz.** `authMiddleware` / `adminMiddleware` / `optionalAuth` in `apps/api/src/auth.ts`. Admin mutations that need step-up use `requireStepUp` (`X-Admin-StepUp`). TOTP sessions stay gated (`mfa_required`).
- **CSRF.** Origin check is on in production (`FEATURE_STRICT_CSRF`).
- **Judge.** Production default `JUDGE_MODE=off` unless `docker`. No silent fallback to the host.
- **Course slugs** are `varchar` plus `COURSE_SLUGS` in `packages/shared/src/courses.ts`. Do not `ALTER TYPE` an enum. New tracks are not primary-nav items; reach them from `/learn`, `/courses`, `/programming`.
- **Content.** `promptUk` requires `promptEn`. Seed via `packages/content` → `pnpm db:seed`. Do not hand-insert course trees.
- **Lesson submit** stays idempotent (`idempotencyKey`, ~180s).
- **User text** (comments, notes, tutor, chat) goes through shared sanitize helpers.
- API errors are stable snake_case codes: `{ "error": "unauthorized" }` with the right HTTP status. Not prose messages as the contract.

## Web

- App Router. A route is an RSC `page.tsx` shell plus a `*-client.tsx` island (see `apps/web/src/app/learn`).
- Interactive UI lives in client components. Shared chrome and primitives: `apps/web/src/components` and `components/ui`.
- HTTP only through `apps/web/src/lib/api.ts` (`credentials: "include"`, Bearer only when a real token exists).
- Copy comes from `@eduforge/shared` i18n. Add both UK and EN keys together.
- Tailwind. Path alias `@/*` → `apps/web/src/*`.
- Match existing page shells (`PageLoading`, empty states, persona nav). Do not add a new top-level nav slot for a deep track or a Labs route.

## API and data

```
apps/api/src/routes/<topic>.ts    HTTP
apps/api/src/services/<topic>.ts  non-trivial rules
packages/db/src/schema/<domain>.ts
```

- ESM. Relative imports in `apps/api`, `apps/realtime`, and `packages/*` use a `.js` suffix.
- Validate bodies with Zod. Query with Drizzle from `@eduforge/db`.
- Schema changes: edit the schema barrel, `pnpm db:generate`, commit the SQL under `packages/db/drizzle`. Do not edit an already-applied migration to “tweak” it.
- Chess moves and matchmaking stay in `chess-core` + `apps/realtime`. Do not fold long-lived sockets into the Hono process.
- `lint` scripts are stubs (`echo ok`). Typecheck and Vitest are the gates.

## Verification

Scope to the package you touched:

- Unit: `pnpm --filter @eduforge/<pkg> test`
- Types: `pnpm --filter @eduforge/<pkg> typecheck`
- Several packages: `pnpm test:unit` or `pnpm typecheck` from the repo root
- API + Postgres: `pnpm test:integration` (migrate + seed first; `SKIP_INTEGRATION=1` to skip)
- Web e2e: stack on :3000/:4000, then `pnpm --filter @eduforge/web test:e2e` (`SKIP_E2E=1` to skip)
- Full CI shape: `pnpm ci` (typecheck + unit). `pnpm ci:full` adds integration.

Do not claim tests or a build passed without command output. Install missing deps and fix type errors before the final reply.

UI behavior: exercise the flow in the browser when the change is user-visible. Playwright visual baselines live in `apps/web/e2e`; do not refresh snapshots unless the user asked.

**Circuit breaker:** max **2** automated fix attempts per failure. If an edit introduces syntax/parse errors twice, revert those files to `git HEAD`, stop looping, report.

Windows PowerShell: chain with `;`, not `&&`. Prefer one full write over many tiny patches on large TSX (CRLF duplication). Use `block_until_ms` on long commands.

## Subagents

Use a subagent for a long isolated test/typecheck cycle or a wide search. Do not spawn one for a small one-file change. The main agent owns the user-facing result and must read subagent output before saying done.
