# CURRENT — Product surface freeze & IA map

**Status:** Active (2026-07)  
**Scope:** Consolidation after SPECs 01–71. Prefer quality, IA, and platform over new surface area.

## North star

EduForge is a **Learning OS** for skills + coding (with chess as a strong pillar), not an unbounded feature kitchen sink.

Primary journeys:

1. Register → confirm email (7d/30d policy) → first free lesson → daily return (streak / next step)
2. Programming path + playground (+ deep tracks via hub)
3. Freemium → Premium
4. Schools / homework / parents (B2B, supporting)

## Feature classification

| Class | Meaning | Examples |
|-------|---------|----------|
| **Core** | Always surfaced in primary IA | Auth, `/learn`, courses, programming path, playground, XP/hearts/streak, freemium, lesson player |
| **Supporting** | Discoverable, secondary nav | Chess play, friends, leaderboard, flashcards, review, quests, tutor, certificates, homework, schools, parents |
| **Labs** | Keep API/UI routes; not primary nav | Chat, referrals, export, focus timer, reports email, shop cosmetics |
| **Ops** | Role-gated | Admin CMS, metrics, digests, audit |

Deep tracks (`typescript`, `html_semantics`, `css_layout`, `qa_theory`, `js_*`, `react_*`, `sql_*`, `node_*`, `express_*`) are **Core content** but **not** primary nav entries — reach via `/learn`, `/courses`, `/programming`.

## Information architecture (target)

### Desktop primary (≤6 + More)

| Slot | Route | Notes |
|------|-------|--------|
| Home | `/dashboard` | Thin shell: next action, streak, progress |
| Learn | `/learn` | Learning map (recommended home of curriculum) |
| Courses | `/courses` | Catalog by group |
| Code | `/programming` | Path hub (deep tracks linked from here) |
| Play | `/play` or `/playground` | Chess / sandbox — primary uses Play + playground in More if needed |
| Social | `/friends` | Friends + light social |

**More:** toolkit (flashcards, review, quests, notes, tutor, shop), schools/parents/homework, certificates, leaderboard, search, pricing, feedback, admin (role).

### Mobile bottom (5)

`Learn · Code · Play · Courses · Profile` — Home/dashboard remains reachable from logo or profile.

### Explicitly removed from global nav clutter

- Per-deep-track top-level links (`/js-fundamentals`, `/react-fundamentals`, …)
- Labs items (chat, export, referrals, focus) — still routable, under More → Toolkit / lower priority or omitted from default More

## Non-goals (near term)

- Full multi-language Docker code judge
- Native mobile apps
- Video LMS / AI-generated full courses
- New deep track without content DX + IA justification

## Platform priorities (see improvement program)

1. ~~IA + onboarding consolidation~~ (nav + CURRENT freeze)  
2. ~~Auth session hygiene~~ (cookie-first + Bearer dual-support), error contract, `/me/home`  
2b. Email verification + unverified lifecycle (7d inactive / 30d delete) — SPEC 72  
3. Backend modularization of learning core:  
   `services/exam-board`, `next-steps`, `minis-race`, `home`, `submit-lesson`  
4. Exercise type safety + EN gate (all courses; skill tracks via `skill-prompt-en` map)  
5. Strict CI: frozen-lockfile + integration(Redis) + **e2e stack on every push**  
6. Realtime: Redis seek queue + optional Socket.IO redis adapter  
7. Observability: structured JSON logs, `x-request-id`, `/ready` (DB+Redis), latency on `/metrics`  
8. Shared `gradeExercise` (API + client soft-grade aligned)  
9. DB schema domain barrels under `packages/db/src/schema/`  
10. Course slugs: **varchar + app registry** (`isCourseSlug` / `COURSE_SLUGS`) — no ALTER TYPE per course  
11. Onboarding v2: 4 core steps + primary CTA  
12. Mastery: weak lessons → next-steps priority + `/review` queue when ≥2 weak  
13. Freemium matrix + `/billing/entitlements` + PaywallCard / pricing compare  
14. Design system light: `components/ui` (Button, Card, EmptyState, Skeleton, Badge)  
15. Content DX guide: `SPEC/CONTENT-DX.md`  
16. Retention emails: CTA buttons, exams in parent digest, inactive nudge  
17. Stripe Customer Portal `POST /billing/portal`  
18. A11y: skip link, focus-visible rings, MCQ + text + order keyboard  
19. Push re-engage: `POST /admin/ops/push-reengage` (inactive ≥3d)  
20. Admin content: live ExercisePlayer preview + open lesson link  
21. Match keyboard + lesson Esc exit + share profile card  
22. Cron runbook: `SPEC/CRON.md`  
23. OG metadata: `/u/[id]`, `/certificates/[code]` via public APIs  
24. Friend invite deep link `/friends?add=userId` + share cards  
25. Certificate share UI + e2e smoke for profile/friends/cert  
26. Guest friend growth: `/register?friend=` + `/login?friend=` auto-request; guest `/friends?add=` → register  
27. Session security: `GET /auth/sessions`, `POST /auth/logout-others` + profile UI  
28. Dynamic OG images: `opengraph-image.tsx` for public profile + certificate  
29. Lesson focus mode: hide nav chrome + notes/comments (toggle **F** / button)  
30. Lesson submit idempotency: `idempotencyKey` body or header (Redis or memory, 180s)  
31. Lesson summary: per-exercise misses + check `missing` meta  
32. Labs soft-hide: referrals/export/focus/reports only with `?labs=1` or More toggle  
33. Mastery v2: exam fail → review `?from=exam` + wrong types; leeches; spaced re-practice in next-steps  
34. Grade partial credit (projects, comprehension, staticAsserts) used in lesson accuracy  
35. JS static checks + playground hazard preflight + iframe timeout cap  
36. XSS sanitize (comments/notes/tutor); optional `FEATURE_STRICT_CSRF` origin check  
37. Feature flags (`resolveFeatureFlags`, `GET /me/flags`, metrics flags)  
38. Ops runbook `SPEC/OPS.md` + course registry `SPEC/COURSE-REGISTRY.md`  
39. Tutor: last-fail context + no-solution-dump guardrail  

### P2 strategic foundations (scaffolds live — see SPEC/P2-STRATEGIC.md)

40. Multi-lang judge `@eduforge/judge` + `POST /judge/run` (`JUDGE_MODE=local|docker`)  
41. Video LMS exercise type + player; MDX `videoUrl` authoring  
42. Landing RSC + client islands (strangler, not full rewrite)  
43. MDX pipeline `parseMdxLesson` / `mdxToExercises`  
44. OTel-compatible spans + optional OTLP export  
45. Adaptive next-step re-rank (`adaptiveScore`)  
46. Live classroom Socket.IO + `/classroom/live/[classId]`  
47. Native mobile WebView shell `apps/mobile`  

Still later: CRDT collab, judge worker pool, store binaries, trained ML, full RSC migration, video CDN.

### Auth model (current)

- Primary: **httpOnly** `eduforge_session` cookie (`credentials: include`)  
- Dual-support: `Authorization: Bearer` still accepted; successful Bearer **promotes** cookie  
- Web: no session secret in `localStorage` (legacy key cleared on migrate)  
- Integration/e2e may still use Bearer explicitly

## KPIs

- Time to first completed lesson  
- D1 / D7 retention  
- Lessons / user / week  
- Free → Premium conversion  
- Exam pass rate  
- Homework completion (B2B)  

## Rules for new work

1. No new primary nav item without removing another or moving to More.  
2. New courses should not require a dedicated root nav entry.  
3. Prefer extending `/learning/next` and `/learn` over new “hub” pages.  
4. Every feature needs a KPI or explicit “labs” label.  
5. SPEC docs: update this file + relevant existing SPEC; avoid unbounded SPEC N+1 for tiny UX tweaks.

## Related

- [01-product-overview.md](./01-product-overview.md)  
- [57-nav-primary.md](./57-nav-primary.md)  
- [65-learning-maturity.md](./65-learning-maturity.md)  
- [58-docs-freeze.md](./58-docs-freeze.md) (historical closeout 01–58; product continued through 71)  
- [COURSE-REGISTRY.md](./COURSE-REGISTRY.md)  
- [OPS.md](./OPS.md) · [CRON.md](./CRON.md) · [CONTENT-DX.md](./CONTENT-DX.md)  
