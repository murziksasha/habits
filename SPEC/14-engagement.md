# 14 — Engagement Stage

## Achievements

- Catalog: `@eduforge/shared` `ACHIEVEMENT_CATALOG`
- Tables: `achievements`, `user_achievements`
- Unlock engine: `apps/api/src/engagement.ts` → `evaluateAchievements`
- Triggers: lesson complete, streak, level, daily goal, class join, tournament join
- API: `GET /engagement/achievements`
- UI: `/achievements` + nav link

## Notifications

- Table: `notifications`
- Created on achievement unlock (and extensible)
- API:
  - `GET /engagement/notifications`
  - `POST /engagement/notifications/read-all`
  - `POST /engagement/notifications/:id/read`
- UI: bell in header (`NotificationsBell`)

## Activity feed

- Table: `activity_events`
- Events: `lesson_completed`, `achievement_unlocked`, `class_joined`, `tournament_joined`, …
- API: `GET /engagement/activity` (mine), `GET /engagement/activity/feed` (global)
- UI: dashboard activity list

## PWA

- `public/manifest.webmanifest`
- Icons: `icon-192.svg`, `icon-512.svg`
- Service worker: `public/sw.js` (production only registration)
- Metadata: `manifest` + `themeColor` + apple web app

## Ops metrics

- `GET /metrics` — counts, redis ping, uptime
- Optional auth: `Authorization: Bearer $METRICS_TOKEN`
- Health also exposes `uptimeSec`

## Seed

`pnpm db:seed` upserts achievement catalog.
