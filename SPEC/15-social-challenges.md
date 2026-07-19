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

- Issued when ≥ **70%** of a course’s lessons are completed
- Unique public code `EF-XXXXXXXX`
- `GET /certificates/mine` (auth)
- `GET /certificates/verify/:code` (public)

UI: `/certificates`, `/certificates/[code]` (print-friendly)

## OpenAPI

- `GET /openapi.json` — machine-readable subset
- `GET /docs` — simple HTML index

## Migration

`0005_social_challenges`
