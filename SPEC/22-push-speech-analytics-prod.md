# 22 — Web Push, Pronunciation, Teacher Analytics, Production Hardening

## Web Push

- Table: `push_subscriptions` (endpoint unique, p256dh, auth)
- Lib: `web-push` + VAPID (`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`)
- Ephemeral keys generated if env unset (dev only)
- API:
  - `GET /push/vapid-public-key`
  - `POST /push/subscribe`
  - `DELETE /push/subscribe`
  - `GET /push/status`
  - `POST /push/test`
- `notifyUser` also attempts push
- SW: `public/sw.js` — `push` + `notificationclick`
- UI: `PushToggle` on `/profile`; SW registered in all envs

## Audio pronunciation

- Client: Web Speech API (`speechSynthesis` + `SpeechRecognition`)
- Components: `SpeakButton`, helpers in `lib/speech.ts`
- API tips/scoring: `POST /speech/pronounce-tip`, `POST /speech/score`
- Wired into MCQ/translate exercises + flashcard study

## Teacher analytics

- `GET /analytics/class/:classId` — teacher/owner/admin
  - students, active 7d, activity 7/30d, lessons completed 7d, avg score
  - homework completion rates, class leaderboard
- `GET /analytics/org/:orgId` — class rollup
- UI: top of school class page

## Production hardening

- OpenAPI expanded (`/openapi.json` v1.2.0) + styled `/docs`
- E2E smoke: landing CTAs, flashcards, placement, push profile, openapi paths
- Landing rewritten: UK/EN, 6 feature cards, API docs link, stronger CTA

## Migration

`0012_push_analytics`
