# 12 — Production & Ops (Stage)

## CI

GitHub Actions: `.github/workflows/ci.yml`

| Job | What |
|-----|------|
| `unit` | build packages, unit tests (`SKIP_INTEGRATION=1`), typecheck |
| `integration` | Postgres 16 service, migrate, seed, API integration tests |

Triggers: push/PR to `main` or `master`.

## Rate limiting

In-memory sliding window (`apps/api/src/rate-limit.ts`):

- Keys: `auth:{action}:{ip}`
- Limit: 20 requests / 15 minutes for `register`, `login`, `forgot-password`
- Response: `429 { error: "rate_limited", retryAfterSec }`

For multi-instance deploys, replace with Redis later.

## Daily XP goal

Character fields:

- `dailyXp` — XP toward goal today  
- `dailyXpDate` — ISO date  
- `dailyGoalXp` — default **50**  

Updated on lesson submit (global XP gain). Dashboard shows progress bar; resets when date changes (`/auth/me`).

## Chess private invite

Realtime Socket.IO events:

| Event | Role |
|-------|------|
| `create_invite` | Host creates `waiting` game (white), unrated |
| `join_invite` | Guest takes black → `active` + `match_found` |
| URL | `/play?invite=<gameId>` auto-joins |

Invite games are **unrated**.

## Web error UX

- `app/not-found.tsx` — 404  
- `app/error.tsx` — client error boundary with retry  

## Checklist before production

- [ ] Strong `AUTH_SECRET`  
- [ ] Change default admin password  
- [ ] TLS + reverse proxy  
- [ ] Stripe live keys + webhooks  
- [ ] Redis-backed rate limits if multi-node  
- [ ] Postgres backups  
