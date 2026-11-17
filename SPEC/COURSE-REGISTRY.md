# Course registry & learning map

App-level map of course slug → group → hub → prerequisites and progression. DB stores `varchar` slugs; registry is in `@eduforge/shared` (`COURSE_SLUGS`, `COURSE_META`, `COURSE_GROUP`, `COURSE_PREREQUISITES`, `LEARNING_PATHS`).

**Access:** All 36 courses, lessons, exercises, exams, and rated chess are **100% free for every user**. There are no paywalls, subscriptions, Pro tiers, or trial gates.

## Matrix

| Slug | Group | Hub | Prerequisites | Recommended Next | Notes |
|------|-------|-----|---------------|------------------|-------|
| `programming` | code | `/programming` | none | `html_semantics`, `css_layout`, `git_workflows`, `js_fundamentals` | Primary code path: HTML → CSS → JS → TS → React → Git → Node → Express → SQL → QA |
| `typescript` | deep | `/typescript` | `js_fundamentals` | `react_fundamentals`, `express_fundamentals`, `applied_algorithms` | Deep track + strict unions + ForgeBoard M3 (`forgeboard-m3-ts`) |
| `html_semantics` | deep | `/html-semantics` | `programming` | `css_layout`, `web_accessibility` | Deep track + accessible interactions + ForgeBoard M1 (`forgeboard-m1-a11y`) |
| `css_layout` | deep | `/css-layout` | `programming`, `html_semantics` | `js_fundamentals`, `frontend_performance` | Deep track + cascade layers, logical props, container queries |
| `js_fundamentals` | deep | `/js-fundamentals` | `programming`, `html_semantics`, `css_layout` | `typescript`, `browser_web_apis`, `node_fundamentals` | Deep track + event loop, AbortController + ForgeBoard M2 (`forgeboard-m2-js`) |
| `react_fundamentals` | deep | `/react-fundamentals` | `js_fundamentals`, `typescript` | `software_testing`, `nextjs_fullstack` | Deep track + Thinking in React + ForgeBoard M4 (`forgeboard-m4-react`) |
| `sql_fundamentals` | deep | `/sql-fundamentals` | `programming` | `postgresql_apps` | Oracle 1Z0-071 checklist + query repair & PostgreSQL comparison notes (44 units, 177 lessons, 44 exams) |
| `node_fundamentals` | deep | `/node-fundamentals` | `js_fundamentals` | `express_fundamentals`, `rest_api_design` | Deep track + config, signals, structured logs, worker offload |
| `express_fundamentals` | deep | `/express-fundamentals` | `node_fundamentals` | `rest_api_design`, `postgresql_apps`, `go_fundamentals` | Deep track + validated REST, ownership checks + ForgeBoard M5 (`forgeboard-m5-express`) |
| `embedded_cpp` | deep | `/embedded-cpp` | none | `sysadmin` | MilTech C++ deep track + host/browser sim vs MCU hardware boundaries |
| `qa_theory` | deep | `/qa-theory` | `programming` | `software_testing` | Conceptual QA, risk matrix, test plans, bug reports |
| `software_testing` | deep | `/software-testing` | `js_fundamentals`, `react_fundamentals`, `express_fundamentals` | `web_security`, `ai_development`, `devops` | Executable testing (unit, RTL, API/DB integration, E2E) + ForgeBoard M7 (`forgeboard-m7-testing`) |
| `postgresql_apps` | deep | `/postgresql-apps` | `express_fundamentals`, `sql_fundamentals` | `software_testing`, `web_security`, `nextjs_fullstack` | PostgreSQL modeling, migrations, CRUD, ACID transactions, EXPLAIN + ForgeBoard M6 (`forgeboard-m6-postgres`) |
| `git_workflows` | deep | `/git-workflows` | `programming` | `js_fundamentals`, `ai_development` | Team Git workflows, rebase rules, conflict resolution, bisect, reflog + ForgeBoard M8 (`forgeboard-m8-git`) |
| `web_security` | deep | `/web-security` | `express_fundamentals`, `postgresql_apps` | `ai_development`, `nextjs_fullstack`, `devops` | OWASP Top 10:2025, trust boundaries, XSS, IDOR, CSRF, sessions + ForgeBoard M9 (`forgeboard-m9-security`) |
| `ai_development` | deep | `/ai-development` | `typescript`, `git_workflows`, `software_testing` | `python_for_ai`, `nextjs_fullstack`, `applied_algorithms` | Task specs, saved AI diff review, hallucination/supply-chain verification + ForgeBoard M10 (`forgeboard-m10-ai`) |
| `python_for_ai` | deep | `/python-for-ai` | `programming` | `agentic_systems`, `typescript` | Read and repair agent-style Python (values, collections, contracts, JSON/HTTP, async). Discover via `/courses`, `/learn`, `/paths` |
| `agentic_systems` | deep | `/agentic-systems` | `python_for_ai`, `ai_development` | `llmops`, `ai_security` | Script vs model vs agent, tool schemas, reflection against checks, RAG & vector stores. Discover via `/courses`, `/learn`, `/paths` |
| `llmops` | deep | `/llmops` | `agentic_systems`, `node_fundamentals` | `ai_security`, `devops` | Traces, offline CI fixture evals, HTTP vs GraphQL/gRPC/events, token budgets. Discover via `/courses`, `/learn`, `/paths` |
| `ai_security` | deep | `/ai-security` | `agentic_systems`, `web_security` | `ai_product` | Defensive agent security: trust boundaries, data/instruction separation, allowlists/HITL, secrets. Discover via `/courses`, `/learn`, `/paths` |
| `ai_product` | deep | `/ai-product` | `agentic_systems`, `ai_security` | `devops` | Model/Python routing, product boundaries, approve/edit/undo HITL, empty/abstain UX. Discover via `/courses`, `/learn`, `/paths` |
| `nextjs_fullstack` | deep | `/nextjs-fullstack` | `react_fundamentals`, `express_fundamentals`, `postgresql_apps` | `applied_algorithms`, `devops` | App Router, Server/Client boundaries, DAL, Server Actions + ForgeBoard M11 (`forgeboard-m11-nextjs`) |
| `applied_algorithms` | deep | `/applied-algorithms` | `js_fundamentals`, `typescript` | `devops`, `go_fundamentals` | Web complexity, Maps/Sets, stacks/queues, cycle-safe trees + ForgeBoard M12 (`forgeboard-m12-algorithms`) |
| `go_fundamentals` | deep | `/go-fundamentals` | `programming` | `devops`, `web_security` | Packages, types, slices, interfaces, goroutines and testing. Discover via `/courses`, `/learn`, `/paths` |
| `web_accessibility` | deep | `/web-accessibility` | `html_semantics`, `css_layout` | `frontend_performance`, `react_fundamentals` | POUR, keyboard, ARIA, contrast and WCAG 2.2 testing. Discover via `/courses`, `/learn`, `/paths` |
| `rest_api_design` | deep | `/rest-api-design` | `express_fundamentals` | `postgresql_apps`, `web_security` | Resource URLs, HTTP methods, status codes, idempotency, versioning and API errors (24 lessons). Discover via `/courses`, `/learn`, `/paths` |
| `frontend_performance` | deep | `/frontend-performance` | `js_fundamentals`, `react_fundamentals` | `nextjs_fullstack`, `browser_web_apis` | Critical path, bundles, images, cache and Core Web Vitals. Discover via `/courses`, `/learn`, `/paths` |
| `browser_web_apis` | deep | `/browser-web-apis` | `js_fundamentals` | `frontend_performance`, `web_security` | DOM, fetch, storage, observers, workers and platform APIs. Discover via `/courses`, `/learn`, `/paths` |
| `english` | skill | `/courses/english` | none | none | Core skill A1–C1 + engineering issues, PRs, and workplace communication |
| `typing` | skill | `/courses/typing` | none | none | Accuracy-first touch typing + code and documentation symbol drills |
| `speed_reading` | skill | `/courses/speed_reading` | none | none | RSVP, chunking + technical specification comprehension |
| `logic` | skill | `/courses/logic` | none | none | Sequences, invariants, counterexamples, De Morgan bug triage |
| `sysadmin` | skill | `/courses/sysadmin` | none | `devops` | Workstation & SOHO troubleshooting (`ss`, `journalctl`, perms, restore) + local container operation (Podman/rootless Docker) |
| `devops` | skill | `/courses/devops` | `sysadmin`, `express_fundamentals`, `postgresql_apps`, `software_testing` | `applied_algorithms` | Continuous delivery, CI/CD, registries, IaC, Kubernetes, observability, and on-call reliability + ForgeBoard M13 (`forgeboard-m13-devops`) |
| `electrical_engineering` | skill | `/courses/electrical_engineering` | none | `embedded_cpp`, `programming` | Electrical engineering v2: 10 stages, 60 modules, 360 lessons including 60 exams, seven graded SPICE lab cards, three capstones. Lab: `/courses/electrical_engineering/lab`. Publication requires reviewed content; sync does not republish drafts |
| `chess` | chess | `/play` | none | none | Theory, puzzles, endgame accuracy review, bot sparring, and live rated chess |

## Rules

1. **No new root nav entry** per deep track — link from `/learn`, `/courses`, `/programming`.
2. **No Postgres ENUM migration** for new slug — add to `COURSE_SLUGS` + content seed.
3. **Hub** for code deep tracks is `/programming` (stack tree), not a top-level nav item.
4. **Course prerequisites are guidance**, not hard locks. Unit exams require current-version completion of their non-exam unit lessons for authenticated opening and submission. This readiness rule is not a payment gate.

## Adding a course

1. Add slug to `COURSE_SLUGS` + `COURSE_META` + `COURSE_GROUP` in `@eduforge/shared`.
2. Seed content in `packages/content`.
3. Run EN completeness gate (`content.test.ts` and `quality-gate.test.ts`).
4. Document learning objectives, prerequisites, and recommended next connections.
