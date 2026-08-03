# EduForge — Product & Technical Specification

This folder is the **source of truth** for the EduForge educational SaaS monorepo. All documents are written in **English**.

## Document index

| # | Document | Description |
|---|----------|-------------|
| 01 | [Product Overview](./01-product-overview.md) | Vision, audience, features, locale |
| 02 | [Architecture](./02-architecture.md) | Monorepo layout, services, data flow |
| 03 | [Domain Model](./03-domain-model.md) | Entities, relationships, schema |
| 04 | [API Reference](./04-api-reference.md) | REST endpoints and auth |
| 05 | [Courses & Content](./05-courses-and-content.md) | Course types, exercises, seeding |
| 06 | [Gamification](./06-gamification.md) | XP, levels, hearts, streaks, Elo |
| 07 | [Chess Realtime](./07-chess-realtime.md) | Matchmaking, Socket.IO, bot mode |
| 08 | [Auth, Billing & Admin](./08-auth-billing-admin.md) | Sessions, freemium, CMS |
| 09 | [Frontend](./09-frontend.md) | Next.js routes and UX |
| 10 | [Infrastructure](./10-infrastructure.md) | Docker, env, runbooks |
| 11 | [Testing](./11-testing.md) | Test strategy and commands |
| 12 | [Production & Ops](./12-production-ops.md) | CI, rate limits, daily goals, invites |
| 13 | [Advanced Features](./13-advanced-features.md) | Redis, SMTP, coach, tournaments, B2B, i18n |
| 14 | [Engagement](./14-engagement.md) | Achievements, notifications, activity, PWA, metrics |
| 15 | [Social & Challenges](./15-social-challenges.md) | Friends, weekly challenges, certificates, OpenAPI |
| 16 | [Classroom Homework](./16-classroom-homework.md) | Class assignments, auto-complete, teacher board |
| 17 | [Parents & Gradebook](./17-parents-gradebook.md) | Parent portal, CSV export, due reminders |
| 18 | [Extra UX](./18-bookmarks-chat-referrals.md) | Bookmarks, chat, search, referrals, dark mode |
| 19 | [Learning tools](./19-shop-review-quests.md) | Shop, review queue, daily quests, notes, focus, public profiles |
| 20 | [SRS / Tutor / Reports / i18n content](./20-flashcards-tutor-reports-i18n.md) | Flashcards, SpaceXAI tutor, weekly email, dual-language content |
| 21 | [Learning OS](./21-learning-os.md) | Calendar heatmap, placement, export, comments, next steps |
| 22 | [Push / Speech / Analytics / Prod](./22-push-speech-analytics-prod.md) | Web push, pronunciation, teacher analytics, OpenAPI & e2e |
| 23 | [Programming track](./23-programming-track.md) | Mimo-style HTML→QA path, code exercises, hub |
| 24 | [Playground / depth / HW](./24-playground-depth-homework.md) | Multi-lang playground, depth lessons, bulk programming homework |
| 25 | [Sandbox challenges](./25-playground-sandbox-challenges.md) | Iframe JS sandbox, XP challenges, more depth lessons |
| 26 | [Visual + PG leaderboard](./26-playground-visual-leaderboard.md) | HTML/CSS source checks, more challenges, playground XP board |
| 27 | [Race / class / DOM](./27-race-class-dom.md) | Weekly race, class PG challenges, iframe DOM asserts |
| 28 | [Tutor code / achievements](./28-tutor-code-achievements-race.md) | Code tutor prompt, programming + PG achievements, race claim |
| 29 | [Monaco / stacks / CI](./29-monaco-stacks-ci.md) | Monaco playground, stack hubs, CI scripts |
| 30 | [Monaco lessons / cert / analytics](./30-monaco-exercises-cert-analytics.md) | Monaco in code exercises, path cert, class PG analytics |
| 31 | [Parent coding + PG share](./31-parent-programming-share.md) | Parent path/PG progress, playground share URL |
| 32 | [Gradebook coding + PG](./32-gradebook-coding-challenges.md) | Gradebook prog/PG columns, new challenges, SQL COUNT |
| 33 | [Code project + embed](./33-code-project-embed.md) | Multi-file exercises, public embed playground |
| 34 | [Project preview + minis](./34-project-preview-minis.md) | Live iframe preview, CSS/React mini-projects |
| 35 | [Soft grade / hints / PG HW](./35-soft-grade-hints-pg-hw.md) | Client soft-grade, hints, playground on homework |
| 36 | [Skip / attempts / tutor link](./36-skip-attempts-tutor.md) | 3-try skip, attempt counter, tutor deep-link |
| 37 | [Solution reveal + e2e](./37-solution-reveal-e2e.md) | Show/apply solution after 3 fails, e2e smoke |
| 38 | [Streak shield](./38-streak-shield.md) | Shield pack, cap 5, notify on use, dashboard badge |
| 39 | [Parent weekly digest](./39-parent-weekly-digest.md) | 7d child digest + email to parent |
| 40 | [Digest cron + CI e2e](./40-parent-digest-cron-ci.md) | Batch parent digests, optional e2e job |
| 41 | [Admin ops digests](./41-admin-ops-digests.md) | Admin panel buttons for digests & reminders |
| 42 | [Admin metrics](./42-admin-metrics.md) | Product metrics: programming, PG, engagement |
| 43 | [Metrics CSV + content pack](./43-metrics-csv-content-pack.md) | CSV export, git/sql mini-projects |
| 44 | [Minis complete + OpenAPI](./44-mini-complete-openapi.md) | Node/Express minis, OpenAPI 1.4 |
| 45 | [Hub minis + dashboard](./45-hub-minis-dashboard.md) | TS mini, hub mini board, dashboard card |
| 46 | [QA mini + achievements](./46-qa-mini-achievements.md) | qa-mini-case, code_mini_3/all achievements |
| 47 | [Mini recommendations](./47-mini-recommendations.md) | learning/next minis, minis API, slug hub |
| 48 | [Minis board + cert](./48-minis-board-cert.md) | API board UI, Programming Minis certificate |
| 49 | [Profile minis + cert badges](./49-profile-minis-cert-badges.md) | Public minis progress, certificate badges |
| 50 | [Minis leaderboard](./50-minis-leaderboard.md) | Rank by mini-projects on programming hub |
| 51 | [Minis weekly race](./51-minis-weekly-race.md) | 3 featured minis/week, top-3 XP claim |
| 52 | [Race achievements + metrics](./52-minis-race-achievements.md) | Race achievements, dashboard, admin minis |
| 53 | [Race next + e2e](./53-race-next-e2e.md) | Race minis in /learning/next, e2e smoke |
| 54 | [Friends minis](./54-friends-minis.md) | Compare mini-projects with friends |
| 55 | [Friends race](./55-friends-race.md) | Weekly minis race vs friends |
| 56 | [Profile hub](./56-profile-hub.md) | Own profile minis + cert badges |
| 57 | [Nav primary](./57-nav-primary.md) | Desktop primary + More menu |
| 58 | [Docs freeze](./58-docs-freeze.md) | SPEC closeout + core doc sync |
| 59 | [TypeScript course](./59-typescript-course.md) | Full TS track (separate from programming unit) |
| 60 | [Unit exams](./60-unit-exams.md) | Control tests per unit, ≥70% pass |
| 61 | [User feedback](./61-user-feedback.md) | Feedback to developers + admin triage |
| 62 | [HTML Semantics](./62-html-semantics.md) | Deep semantic HTML track |
| 63 | [CSS Flex & Grid](./63-css-layout-flex-grid.md) | Deep layout Flexbox + Grid |
| 64 | [QA Theory](./64-qa-theory-deep.md) | Deep testing theory track |
| 65 | [Learning maturity](./65-learning-maturity.md) | Learn map, exams board, DOM checks, tutor, metrics |
| 66 | [Mobile / onboarding / harden](./66-mobile-onboarding-hardening.md) | Bottom nav, onboarding, submit limits |
| 67 | [JS deep + trial + audit](./67-js-fundamentals-trial-audit.md) | js_fundamentals course, trial 7d, admin audit |
| 68 | [React + trial expiry](./68-react-fundamentals-trial-expiry.md) | react_fundamentals, plan expiry, audit UI |
| 69 | [SQL + exam quest](./69-sql-fundamentals-exam-quest.md) | sql_fundamentals deep track, exams daily quest |
| 70 | [Node fundamentals](./70-node-fundamentals.md) | node_fundamentals deep track |
| 71 | [Express fundamentals](./71-express-fundamentals.md) | express_fundamentals deep track |
| 72 | [Admin Platform v2](./72-admin-platform-v2.md) | Modular admin, TOTP 2FA, theming, course CMS |
| 73 | [Embedded C++ · MilTech](./73-embedded-cpp-miltech.md) | embedded_cpp deep track (C++/RTOS/UAV stack) |
| 74 | [Client C++ runner](./74-cpp-wasm-playground.md) | JSCPP/mock playground + code_run (no server judge) |
| 75 | [React Studio + WebContainers roadmap](./75-react-studio-webcontainers-roadmap.md) | In-app React preview; WC Phase W → SPEC 76 |
| 76 | [WebContainers Node Studio](./76-webcontainers-node-studio.md) | /studio/node Node+npm+Express/Next preview |

**Status:** SPECs **01–71** implemented.

## Product name

**EduForge** — multi-course learning platform with character progression and live chess.

## Stack (summary)

- **Monorepo:** pnpm workspaces + Turborepo  
- **Web:** Next.js 15 (App Router), React 19, Tailwind, Ukrainian UI  
- **API:** Hono on Node  
- **Realtime:** Socket.IO (chess)  
- **DB:** PostgreSQL + Drizzle ORM  
- **Cache/queues:** Redis (matchmaking-ready)  
- **Billing:** Stripe (optional) + dev upgrade  

## Related root docs

- Root [README.md](../README.md) — quick start  
- `.env.example` — environment variables  
