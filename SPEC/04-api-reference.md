# 04 — API Reference

Base URL (local): `http://localhost:4000`  
CORS: configured for `WEB_ORIGIN` with credentials.  
Auth header: `Authorization: Bearer <session_token>` (or cookie `eduforge_session`).

Machine-readable: `GET /openapi.json` (v1.8) · human: `GET /docs`.

## Health & ops

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | No | Service health |
| GET | `/metrics` | Optional | Lightweight ops counts |
| GET | `/openapi.json` | No | OpenAPI 3 document |
| GET | `/docs` | No | HTML docs shell |

## Auth (`/auth`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | No | `{ email, password, displayName, referralCode? }` |
| POST | `/auth/login` | No | `{ email, password }` |
| POST | `/auth/logout` | Yes | Invalidate session |
| GET | `/auth/me` | Yes | User + character |
| PATCH | `/auth/me/character` | Yes | `displayName` / `avatarKey` |
| GET | `/auth/onboarding` | Yes | Checklist |
| POST | `/auth/onboarding/complete` | Yes | `{ key }` |
| POST | `/auth/forgot-password` | No | `{ email }` |
| POST | `/auth/reset-password` | No | `{ token, password }` |

## Courses (`/courses`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/courses` | No | List courses |
| GET | `/courses/progress/me` | Yes | Per-course progress |
| GET | `/courses/:slug` | Yes | Units, lessons, locks, hearts |
| GET | `/courses/:slug/lessons/:id` | Yes | Lesson payload |
| POST | `/courses/:slug/lessons/:id/submit` | Yes | Grade + XP; exams need ≥70%; returns `isExam` / `passed` / `examFailed` |

## Learning OS (`/learning`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/learning/calendar` | Yes | Heatmap days |
| GET | `/learning/next` | Yes | Smart next (exams ready, minis, deep tracks) |
| GET | `/learning/exams/me` | Yes | Unit exam board locked/ready/passed |
| GET | `/learning/export` | Yes | Progress JSON export |
| GET/POST | `/learning/placement/english` | Yes | English placement |
| GET/POST | `/learning/placement/programming` | Yes | Programming placement |
| GET | `/learning/milestones` | Yes | Unlocked milestones |
| GET | `/learning/programming/units` | Yes | Unit completion stats |
| GET | `/learning/programming/minis` | Yes | Mini-project board |
| GET | `/learning/programming/minis/leaderboard` | Yes | All-time minis ranks |
| GET | `/learning/programming/minis/race` | Yes | Weekly minis race |
| POST | `/learning/programming/minis/race/claim-bonus` | Yes | Top-3 XP claim |

## Playground (`/playground`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/playground/meta` | No | Languages + examples |
| POST | `/playground/log` | Yes | Log run |
| GET | `/playground/challenges` | Yes | Challenges + solved |
| POST | `/playground/challenge/submit` | Yes | Submit for XP |
| GET | `/playground/leaderboard` | No | Playground XP board |
| GET | `/playground/race/weekly` | Yes/No | Weekly PG race |
| POST | `/playground/race/claim-bonus` | Yes | Claim race bonus |

## Chess REST (`/chess`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/chess/rating/me` | Yes | Elo stats |
| GET | `/chess/games/me` | Yes | Recent games |
| GET | `/chess/games/:id` | Yes | Game detail |
| GET | `/chess/can-rated` | Yes | Freemium quota |

Realtime: [07-chess-realtime](./07-chess-realtime.md). Coach: `POST /coach/hint`.

## Leaderboard (`/leaderboard`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/leaderboard/global` | No | Top global XP |
| GET | `/leaderboard/chess` | No | Top Elo |
| GET | `/leaderboard/course/:slug` | No | Top course XP |

## Billing (`/billing`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/billing/status` | Yes | Plan + Stripe flag |
| POST | `/billing/checkout` | Yes | Stripe Checkout URL |
| POST | `/billing/webhook` | Stripe | Subscription events |
| POST | `/billing/dev-upgrade` | Yes | Demo Premium |
| POST | `/billing/dev-downgrade` | Yes | Demo Free |

## Engagement & social

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/engagement/achievements` | Yes | Achievements |
| GET | `/engagement/notifications` | Yes | Inbox |
| POST | `/engagement/notifications/read-all` | Yes | Mark all read |
| POST | `/engagement/notifications/:id/read` | Yes | Mark one |
| GET | `/engagement/activity` | Yes | My activity |
| GET | `/engagement/activity/feed` | Yes | Global feed |
| GET | `/friends` | Yes | Friends + pending |
| GET | `/friends/minis` | Yes | Minis vs friends |
| GET | `/friends/race` | Yes | Weekly race vs friends |
| POST | `/friends/request` | Yes | Add by email/userId |
| POST | `/friends/:id/accept` | Yes | Accept |
| POST | `/friends/:id/reject` | Yes | Reject |
| GET | `/challenges/current` | Yes | Weekly XP challenge |
| GET | `/certificates/mine` | Yes | My certificates |
| GET | `/certificates/verify/:code` | No | Public verify |
| GET | `/profiles/:userId` | Yes | Public profile + minis |
| POST | `/feedback` | Yes | User → developer feedback |
| GET | `/feedback/mine` | Yes | My feedback |
| GET | `/feedback/admin` | Admin | All feedback |
| PATCH | `/feedback/admin/:id` | Admin | Triage status |

## Schools, homework, gradebook, parents

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET/POST | `/orgs/*` | Yes | Orgs, classes, join |
| GET/POST | `/homework/*` | Yes | Assignments, catalog, bulk |
| GET | `/gradebook/class/:classId` | Yes | JSON gradebook |
| GET | `/gradebook/class/:classId.csv` | Yes | CSV export |
| GET/POST | `/parents/*` | Yes | Invite, claim, progress, digests |
| POST | `/parents/digest/run` | Cron/admin | Batch parent digests |
| POST | `/reminders/homework/run` | Cron | Homework reminders |
| GET | `/analytics/class/:classId` | Teacher | Class analytics |
| GET | `/analytics/org/:orgId` | Owner | Org rollup |

## Learning tools

| Prefix | Highlights |
|--------|------------|
| `/flashcards` | decks, due, review, stats |
| `/tutor` | chat, history, status |
| `/reports` | weekly stats, prefs, send |
| `/shop` | catalog, buy (shields) |
| `/review` | weak lesson queue |
| `/quests` | daily quests + claim |
| `/notes`, `/focus`, `/bookmarks` | study tools |
| `/search` | courses + users |
| `/chat` | class chat |
| `/referrals` | referral code |
| `/comments` | lesson comments |
| `/speech` | pronounce tip, score |
| `/push` | VAPID, subscribe, test |
| `/tournaments` | chess tournaments |

## Public branding

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/public/branding` | No | Published theme + product name |

## Auth MFA (admin TOTP)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/auth/mfa/status` | totpEnabled / enforce |
| POST | `/auth/mfa/totp/setup` | Generate secret |
| POST | `/auth/mfa/totp/confirm` | Enable TOTP |
| POST | `/auth/mfa/totp/verify` | Complete MFA login (TOTP or backup code) |
| POST | `/auth/mfa/step-up` | Issue step-up token (TOTP or backup) |
| POST | `/auth/mfa/backup-codes/regenerate` | New backup codes (TOTP required) |
| GET | `/auth/sessions` | List own sessions |
| DELETE | `/auth/sessions/:id` | Revoke session |
| POST | `/auth/sessions/revoke-others` | Revoke all except current |

## Admin (`/admin`) — role `admin` (+ MFA when enforced)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/admin/stats` | Counts |
| GET/PATCH | `/admin/users` | Users (role → step-up) |
| POST | `/admin/users/:id/reset-mfa` | Clear TOTP (step-up) |
| GET | `/admin/courses`, `/admin/courses/:slug/tree` | CMS tree |
| POST/PATCH | `/admin/courses`, `/admin/courses/:id` | Draft create / metadata |
| POST | `/admin/courses/:id/publish` | Publish (step-up + validation) |
| POST | `/admin/courses/:id/archive` | Archive (step-up) |
| DELETE | `/admin/courses/:id` | Delete draft (step-up) |
| CRUD | `/admin/lessons`, POST `/admin/units` | Content CMS |
| GET/PUT/POST | `/admin/appearance*` | Theme draft / publish / revert |
| GET | `/admin/overview/*` | Billing, classroom, engagement, programming |
| GET | `/admin/progress/overview` | Aggregates |
| GET | `/admin/ops/summary` | Digests / links |
| POST | `/admin/ops/parent-digests` | Run digests |
| POST | `/admin/ops/homework-reminders` | Run reminders |
| POST | `/admin/ops/weekly-learners` | Learner weekly email |
| GET | `/admin/ops/weekly-preview/:userId` | Preview |
| GET | `/admin/metrics` | Product metrics JSON |
| GET | `/admin/metrics.csv` | Metrics CSV |

See [SPEC 72](./72-admin-platform-v2.md).

## Error shape

```json
{ "error": "unauthorized" }
```

Common codes: `400 invalid_input`, `401 unauthorized`, `402 premium_required | no_hearts`, `403 forbidden`, `404 not_found`, `409 email_taken`.
