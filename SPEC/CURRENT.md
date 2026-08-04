# CURRENT — Product surface freeze & IA map

**Status:** Active (2026-07)  
**Scope:** Consolidation after SPECs 01–71. Prefer quality, IA, and platform over new surface area.

## North star

EduForge is a **Learning OS** for skills + coding (with chess as a strong pillar), not an unbounded feature kitchen sink.

Primary journeys:

1. Register → first free lesson → daily return (streak / next step)
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
36. XSS sanitize (comments/notes/tutor/chat); `FEATURE_STRICT_CSRF` **on by default in production**  
37. Feature flags (`resolveFeatureFlags`, `GET /me/flags`, metrics flags)  
38. Ops runbook `SPEC/OPS.md` + course registry `SPEC/COURSE-REGISTRY.md`  
39. Tutor: last-fail context + no-solution-dump guardrail  

### Security & retention pack (2026-08 audit)

48. Judge fail-closed: prod default `JUDGE_MODE=off` unless `docker`; no silent docker→local fallback  
49. Dev billing gated: `ALLOW_DEV_BILLING` / non-prod default; blocked in real production  
50. Security headers: Next CSP baseline + API `X-Content-Type-Options` / `X-Frame-Options` / HSTS prod; nginx headers  
51. Cookie-first web: session `token` omitted from JSON in production unless `X-Issue-Bearer: 1`  
52. Email verification: `email_verified_at` + tokens; resend; soft banner; optional hard gate  
53. Parent invite entropy (16 hex) + claim rate limit; password letter+digit policy  
54. Continue CTA + unified Review inbox (weak lessons + flashcards)  
55. Progressive hints L1–L3; skill tree `/programming/tree`; portfolio `/portfolio`; teacher desk `/teacher`  
56. Landing honesty (core loop only); compact More menu  
57. Account privacy: change password, GDPR JSON export on profile, `POST /auth/account/delete`  
58. Lesson summary `nextLesson` one-tap continue; Learn “mission of the day”  
59. Pricing respects `devBilling` flag (hides demo trial/downgrade when off)  
60. Google OAuth (`/auth/oauth/google/*`, `oauth_accounts`)  
61. User TOTP 2FA for all accounts (login challenge + profile enroll/disable)  
62. Family plan (`plan=family`, seats, invites, child premium inheritance)  
63. Teacher homework heat board (`GET /homework/teacher/board`, `/teacher` UI)  
64. Daily mission card (`DailyQuestsCard` on dashboard + learn)  
65. Teacher quick-assign homework from desk; family activate via demo billing  
66. Family plan expiry clears seats; `isPaidPlan` freemium gates for family  

### UX user pack (SPEC 79)

67. Thin dashboard + single `PrimaryMission`; Learn owns quests/toolkit  
68. Register → `postRegisterPath` (intent/friend/learn); onboarding wizard persona/track  
69. Persona nav (student/parent/teacher) desktop + mobile bottom  
70. Lesson: human miss labels, celebration, share summary, skeleton/retry, hearts low, a11y progress  
71. Course freemium path bar + lock labels; paywall recovery CTAs  
72. ⌘K command palette + search tools hub; landing guest trial + persona cards  
73. Streak calendar (dashboard/profile); parent/teacher home shells  
74. Shared `packages/shared/src/ux.ts` pure helpers + unit tests  

### UX polish wave (SPEC 80)

75. Lesson result sheet + explanation delay; coach tip F/Esc  
76. `safeNextPath` + login default `/learn`; `useRequireAuth` deep links  
77. Programming hub continue CTA + freemium + skeleton  
78. Paywall regen estimate; review/friends empty states  
79. Profile change role wizard; onboarding complete `value` + exclusive persona  

### UX chrome pack (SPEC 81)

80. PageLoading: quests, flashcards, certificates, play  
81. Sticky Continue on secondary surfaces  
82. `GET /me/hearts` + nav HeartsChrome regen countdown  
83. Offline/network toast + lesson submit retry  

### UX surface quality (SPEC 82)

84. PageLoading: achievements, bookmarks, shop, tutor, leaderboard, challenges, calendar  
85. Courses catalog progress chips + Continue card  
86. Hearts chrome mobile + refresh event after submit  
87. Auto-retry lesson submit on `online`  

### UX hubs / errors / keys (SPEC 83)

88. DeepCourseHub PageLoading for all deep tracks + stack/tree  
89. `error.tsx` toast + bilingual + `global-error.tsx`  
90. Lesson keyboard help modal (`?`)  
91. Sticky Continue hidden during live chess match  

### UX PageLoading sweep (SPEC 84)

92. PageLoading: notes, focus, feedback, portfolio, homework, placement, export, schools, family  
93. Empty states: notes, homework  
94. Sticky hidden during play seek + match  

### Admin / schools / labs / a11y (SPEC 85)

95. AdminShell PageLoading + a11y drawer / landmarks  
96. Admin pages PageLoading (home, users, metrics, feedback, audit, content)  
97. Schools detail + class PageLoading / empty  
98. Referrals + export Labs polish (badge, share, toast)  
99. A11y: muted contrast, reduced-motion, aria-current, sticky complement  

### Labs / tournaments / auth a11y (SPEC 86)

100. Reports Labs polish (badge, toast, PageLoading)  
101. Tournaments list/detail shells  
102. 404 bilingual recovery CTAs  
103. Parent child EmptyState; admin security/courses loading  
104. Login/register alert live regions; pricing flags gate  

### Studio / classroom / visual (SPEC 87)

105. Node Studio shell (Labs badge, auth, PageLoading)  
106. Live classroom shell (connection status, sticky hide, chat a11y)  
107. Admin appearance + billing polish  
108. Playwright visual regression baseline (`e2e/visual.spec.ts`)  

### P2 strategic foundations (scaffolds live — see SPEC/P2-STRATEGIC.md)

40. Multi-lang judge `@eduforge/judge` + `POST /judge/run` (`JUDGE_MODE=local|docker|off`)  
41. Video LMS exercise type + player; MDX `videoUrl` authoring  
42. Landing RSC + client islands (strangler, not full rewrite)  
43. MDX pipeline `parseMdxLesson` / `mdxToExercises`  
44. OTel-compatible spans + optional OTLP export  
45. Adaptive next-step re-rank (`adaptiveScore`)  
46. Live classroom Socket.IO + `/classroom/live/[classId]`  
47. Native mobile WebView shell `apps/mobile`  

Still later: CRDT collab, judge worker pool, OAuth/SSO, family plan, store binaries, trained ML, full RSC migration, video CDN.

### Auth model (current)

- Primary: **httpOnly** `eduforge_session` cookie (`credentials: include`)  
- Dual-support: `Authorization: Bearer` still accepted; successful Bearer **promotes** cookie  
- Web: no session secret in `localStorage` (legacy key cleared on migrate)  
- Production responses omit raw `token` unless `X-Issue-Bearer: 1` or `ISSUE_BEARER_TOKENS=1`  
- Email verify soft-banner when `emailVerified === false`; hard gate via `FEATURE_REQUIRE_EMAIL_VERIFY`

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
