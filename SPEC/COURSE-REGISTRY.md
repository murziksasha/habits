# Course registry

App-level map of course slug → hub → freemium. DB stores `varchar` slugs; registry is in `@eduforge/shared` (`COURSE_SLUGS`, `COURSE_META`, `COURSE_GROUP`).

## Matrix

| Slug | Group | Hub | Free lessons / course | Notes |
|------|-------|-----|------------------------|--------|
| `programming` | code | `/programming` | `FREE_LESSONS_PER_COURSE` | Primary code path + early terminal/Git/HTTP/debugging units |
| `typescript` | deep | `/typescript` | same | Deep track + strict unions + ForgeBoard M3 |
| `html_semantics` | deep | `/html-semantics` | same | Deep track + accessible interactions + ForgeBoard M1 |
| `css_layout` | deep | `/css-layout` | same | Deep track + cascade layers, logical props, container queries |
| `js_fundamentals` | deep | `/js-fundamentals` | same | Deep track + event loop, AbortController + ForgeBoard M2 |
| `react_fundamentals` | deep | `/react-fundamentals` | same | Deep track + Thinking in React + ForgeBoard M4 |
| `sql_fundamentals` | deep | `/sql-fundamentals` | same | Oracle 1Z0-071 + executable dataset diagnosis & PostgreSQL comparison notes |
| `node_fundamentals` | deep | `/node-fundamentals` | same | Deep track + config, signals, structured logs, worker offload |
| `express_fundamentals` | deep | `/express-fundamentals` | same | Deep track + validated REST, ownership checks + ForgeBoard M5 |
| `embedded_cpp` | deep | `/embedded-cpp` | same | MilTech C++ deep track + host/browser sim vs MCU hardware boundaries |
| `qa_theory` | deep | `/qa-theory` | same | Conceptual QA, risk matrix, test plans, bug reports |
| `software_testing` | deep | `/software-testing` | same | Executable testing (unit, RTL, API/DB integration, E2E) + ForgeBoard M7 |
| `postgresql_apps` | deep | `/postgresql-apps` | same | PostgreSQL modeling, migrations, CRUD, ACID transactions, EXPLAIN + ForgeBoard M6 |
| `git_workflows` | deep | `/git-workflows` | same | Team Git workflows, rebase rules, conflict resolution, bisect, reflog + ForgeBoard M8 |
| `web_security` | deep | `/web-security` | same | OWASP Top 10:2025, trust boundaries, XSS, IDOR, CSRF, sessions + ForgeBoard M9 |
| `ai_development` | deep | `/ai-development` | same | Task specs, saved AI diff review, hallucination/supply-chain verification + ForgeBoard M10 |
| `nextjs_fullstack` | deep | `/nextjs-fullstack` | same | App Router, Server/Client boundaries, DAL, Server Actions + ForgeBoard M11 |
| `applied_algorithms` | deep | `/applied-algorithms` | same | Web complexity, Maps/Sets, stacks/queues, cycle-safe trees + ForgeBoard M12 |
| `english` | skill | `/courses/english` | same | Core skill + engineering issues/PRs/tradeoffs |
| `typing` | skill | `/courses/typing` | same | Accuracy-first touch typing + code/docs symbol drills |
| `speed_reading` | skill | `/courses/speed_reading` | same | RSVP, chunking + technical spec comprehension |
| `logic` | skill | `/courses/logic` | same | Sequences, invariants, counterexamples, De Morgan bug triage |
| `sysadmin` | skill | `/courses/sysadmin` | same | SOHO + Linux console + local service troubleshooting (`ss`, `journalctl`, perms, restore). Not a primary-nav item |
| `devops` | skill | `/courses/devops` | same | `forge-status` + `ForgeBoard` M13 delivery & recovery runbooks. Not a primary-nav item |
| `chess` | chess | `/play` | same + free rated/day | Theory, puzzles, endgame accuracy review & live rated chess |

Constants live in `packages/shared/src/entitlements.ts` (`FREE_LESSONS_PER_COURSE`, hearts, rated chess).

`devops` now has Stay up and On call after the survey, on `/courses/devops`, with the capstone last.

## Rules

1. **No new root nav entry** per deep track — link from `/learn`, `/courses`, `/programming`.
2. **No Postgres ENUM migration** for new slug — add to `COURSE_SLUGS` + content seed.
3. **Hub** for code deep tracks is `/programming` (stack tree), not a top-level nav item.
4. Freemium gate uses lesson index in course (`canAccessLesson`).

## Adding a course

1. Add slug to `COURSE_SLUGS` + `COURSE_META` + `COURSE_GROUP`.
2. Seed content in `packages/content`.
3. Run EN completeness gate / `content.test.ts`.
4. Document free tier impact if different from default.
