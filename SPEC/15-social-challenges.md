# 15 — Social, Weekly Challenges & Certificates

## Friends

Tables: `friendships` (`pending` | `accepted` | `blocked`)

| Endpoint | Description |
|----------|-------------|
| `GET /friends` | Friends + pending in/out |
| `POST /friends/request` | `{ email }` or `{ userId }` |
| `POST /friends/:id/accept` | Accept request |
| `POST /friends/:id/reject` | Decline / cancel |

UI: `/friends`  
Notifications on request and accept.

## Weekly challenges

Tables: `weekly_challenges`, `weekly_challenge_progress`

- Auto-created per ISO week (`2026-W29`) with target **200 XP**
- Lesson XP (global gain) increments progress via `addWeeklyXp`
- Completion → notification + activity event
- `GET /challenges/current` → challenge, my progress, weekly leaderboard

UI: `/challenges`

## Certificates

Table: `certificates`

- Issued when **100%** of a course’s lessons are completed (including unit exams — exam lessons must be `completed`, which already enforces their pass threshold)
- Unique public code `EF-XXXXXXXX`
- `GET /certificates/mine` (auth) — includes course titles/icon + lesson counts
- `GET /certificates/verify/:code` (public) — same payload for share/print pages

UI: `/certificates`, `/certificates/[code]`

- Branded certificate art (platform logo / product name / brand colors)
- Download **PDF** and **PNG**; print-friendly landscape A4
- QR + verification code for public authenticity check

## OpenAPI

- `GET /openapi.json` — machine-readable subset
- `GET /docs` — simple HTML index

## Migration

`0005_social_challenges`
