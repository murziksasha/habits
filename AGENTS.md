# Agent Profile

Product: **EduForge** (this repo). Specs and code use that name. The workspace folder may be `habits`.

Precedence: user message + system harness > this file > improvisation.
Do not restyle answers to “fewest words / code only.” Architecture and safety here still apply.

Code, comments, specs, and API error codes: **English**.
UI copy: **Ukrainian + English** through `getUI(locale)` in `@eduforge/shared` (default locale `uk`). Do not hardcode a new user-facing string in a component when a shared key belongs there.
File writes: **UTF-8** (never UTF-16).

## Plan vs execute

- **Plan** (user asks for a plan, or Plan mode): use `enter_plan_mode` / `exit_plan_mode`. Write the plan, **stop**. Do not edit code until the user approves.
- **Execute** (default after a concrete implementation request, or after plan approval): run tools and edits without asking permission for routine file changes, tests, and installs.

**Always confirm with the user before:** `git push` / force-push, merge, changing shared permissions, deleting branches, dropping or wiping Postgres, `docker compose down -v`, restoring an instance backup (the `RESTORE` word), deleting `BACKUP_DIR` undo files, editing `.env` secrets, `pnpm db:seed` against a shared or production database, production Docker changes, setting `JUDGE_MODE=local` or a docker-to-host fallback, or running account-delete / unverified hard-delete / outbound cron (digest, push) against real users.

## Source of truth

Read the matching doc **before** changing that domain. Index: `SPEC/README.md`. Day-to-day product truth: `SPEC/CURRENT.md`. Specs `01`–`89` are historical feature logs. One topic → one file; do not invent parallel rules.

| Work | Read first |
| --- | --- |
| Local run, env, scripts | `README.md`, `SPEC/10-infrastructure.md`, `SPEC/OPS.md`, `.env.example` |
| Tests / e2e | `SPEC/11-testing.md` |
| Layout / processes | `SPEC/02-architecture.md` |
| HTTP / auth / roles | `SPEC/04-api-reference.md`, `SPEC/08-auth-billing-admin.md` |
| UI, routes, IA, copy | `SPEC/09-frontend.md`, `SPEC/CURRENT.md` |
| Courses / content / slugs | `SPEC/05-courses-and-content.md`, `SPEC/CONTENT-DX.md`, `SPEC/COURSE-REGISTRY.md` |
| XP, hearts, streaks, Elo | `SPEC/06-gamification.md` |
| Chess sockets | `SPEC/07-chess-realtime.md` |
| Classroom / parents | `SPEC/16-classroom-homework.md`, `SPEC/17-parents-gradebook.md` |
| Admin / MFA | `SPEC/72-admin-platform-v2.md` |
| Security, OAuth, 2FA, lifecycle | `SPEC/77-security-retention-pack.md`, `SPEC/78-oauth-2fa-family-teacher.md`, `SPEC/89-unverified-lifecycle.md` |
| Cron / backups | `SPEC/CRON.md`, `SPEC/88-instance-backup.md`, `SPEC/OPS.md` |

New API routes inherit the same auth as existing siblings: public stays public, user routes use `authMiddleware`, admin routes use `adminMiddleware`, dangerous admin mutations call `requireStepUp`. Do not add unauthenticated or all-role access unless the spec says so.

The product is **free**. Do not add checkout, trials, paywalls, or plan gates. `users.plan` is a legacy label and does not lock lessons or chess.

Invariants (details live in the docs above):

- Server grades lessons and chess moves. Clients never award raw XP.
- Domain math lives in `@eduforge/shared` (`gradeExercise`, XP curves, Elo, `regenerateHearts`, feature flags, `COURSE_SLUGS`).
- Hearts: max 5 for every account, −1 when lesson accuracy is under 0.5, +1 every 30 minutes.
- Elo starts at 1000. Only rated, finished, human games update it. Bot games do not. K=32 under 30 games, else K=20.
- Repeat lesson completion awards about 35% XP.
- Course slugs are `varchar` plus `isCourseSlug` / `COURSE_SLUGS`. Do not `ALTER TYPE` for a new course.
- Sessions store a SHA-256 hash. Production web is cookie-first; raw Bearer in JSON only outside production or with `X-Issue-Bearer`.
- Production CSRF origin check stays on unless `FEATURE_STRICT_CSRF=0`.
- Judge is fail-closed: production default off; `JUDGE_MODE=docker` for isolation; no silent fallback to the host.
- Unverified accounts: inactive after 7 days, deleted after 30 if email stays unconfirmed.
- Lesson submit idempotency window is 180s.
- API errors use stable `{ error: "snake_code" }` bodies.
- Realtime chess stays in `apps/realtime`, not inside the REST process.
- Tutor calls go through `apps/api/src/xai.ts` (SpaceXAI). Do not dump official solutions into tutor prompts.

## Frontend (Next.js)

`apps/web` — Next.js 15 App Router, React 19, Tailwind.

```
apps/web/src/app/            routes
apps/web/src/components/     feature components
apps/web/src/components/ui   primitives (Button, Card, EmptyState, Skeleton, Badge, …)
apps/web/src/lib/            api client, auth, locale
```

- Named function exports. Do not introduce `React.FC` as a new style.
- Prefer `import type` for type-only imports.
- Server data: `fetch` via `src/lib/api.ts`. UI state: `useState` and existing context (`AuthProvider`, `LocaleProvider`). Do not add React Query, Zustand, or React Hook Form unless the user asks.
- Copy: `getUI(locale)` from `@eduforge/shared`.
- Match `components/ui` and `PageLoading`. Follow `SPEC/CURRENT.md` IA: deep tracks and labs are not new primary-nav slots.
- Protected pages use `useRequireAuth`.

## Backend and packages

```
apps/api/src/routes/{domain}.ts    Hono routers
apps/api/src/services/{name}.ts    learning-core logic already extracted
apps/api/src/auth.ts               authMiddleware, adminMiddleware, requireStepUp
packages/shared/src/               XP, Elo, grade, UI strings, Zod, flags
packages/db/src/schema/            Drizzle domain barrels
packages/content/                  seed lessons
packages/chess-core/               move and puzzle helpers
packages/judge/                    code judge (fail-closed in prod)
apps/realtime/src/                 Socket.IO matchmaking and rooms
```

- Stack: pnpm workspaces, Turborepo, Hono, Drizzle, Postgres, Redis, Socket.IO, TypeScript, Vitest.
- Routes parse HTTP and call services or shared pure functions. Do not put XP, Elo, or grading formulas only in a route.
- Zod-parse input. Return `{ error: "snake_code" }` with the right status. Map unique violations through `isUniqueViolation`.
- New course or exercise kind: shared registry + content seed + Zod, then a note in the matching `SPEC/` file. Do not fork a second rules doc.

## Verification

Scoped to the package you touched:

- `pnpm --filter @eduforge/<pkg> test`
- `pnpm --filter @eduforge/<pkg> typecheck`
- After changing `@eduforge/shared` (or another built workspace lib), `pnpm --filter @eduforge/<pkg> build` before typechecking dependents.
- API integration (Postgres up, migrated): `pnpm test:integration`. Skip with `SKIP_INTEGRATION=1` only when no database is available, and say so.
- User-visible UI: exercise the flow in the browser when browser tools exist; otherwise Playwright `pnpm test:e2e` with web `:3000` and api `:4000` running (`SKIP_E2E=1` skips it).
- Root gate only when asked: `pnpm ci` (typecheck + unit) or `pnpm ci:full` (adds integration).

Package `lint` scripts currently print `ok`. Typecheck and Vitest are the real gates.

Do not claim tests or build passed without command output. Install missing deps and fix TS errors before the final reply.

**Circuit breaker:** max **2** automated fix attempts per failure. If an edit introduces syntax/parse errors twice, revert those files to `git HEAD`, stop looping, report.

Windows: PowerShell — chain with `;`, not `&&`. Prefer `write` over many tiny patches on large TSX. Use `block_until_ms` on `run_terminal_command`; do not poll with scheduler loops.

## Subagents

Use a subagent for a long isolated test/typecheck fix cycle or a wide codebase search.
Do **not** spawn one for a small one-file change. The main agent owns the user-facing result and must read subagent output before saying done. Compact report: status, files, test results.

