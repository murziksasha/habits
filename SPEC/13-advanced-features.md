# 13 — Advanced Features

## Redis rate limiting

- Module: `apps/api/src/rate-limit.ts` + `redis.ts`
- Uses Redis sorted sets when `REDIS_URL` is set; falls back to in-memory
- Applied to auth (`register`/`login`/`forgot`) and coach hints

## SMTP email

- Module: `apps/api/src/email.ts` (nodemailer)
- Env: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- Without SMTP: logs mail to console (dev) + `resetUrl` still returned in non-production

## Chess coach (Stockfish-style hints)

- `apps/api/src/stockfish-coach.ts` — minimax material/mobility engine
- `POST /coach/hint` `{ fen, depth? }` → best move + eval + UK/EN comment
- UI: button on `/play` during a game

## Tournaments

Tables: `tournaments`, `tournament_players`, `tournament_pairings`

| Action | Endpoint |
|--------|----------|
| List | `GET /tournaments` |
| Create | `POST /tournaments` |
| Join | `POST /tournaments/:id/join` |
| Pair round | `POST /tournaments/:id/pair` (host) |
| Report result | `POST /tournaments/:id/pairings/:pid/result` |
| Finish | `POST /tournaments/:id/finish` |

UI: `/tournaments`, `/tournaments/[id]`

## B2B / Schools

Tables: `organizations`, `organization_members`, `classes`, `class_members`

| Action | Endpoint |
|--------|----------|
| My orgs | `GET /orgs/mine` |
| Create org | `POST /orgs` |
| Org detail | `GET /orgs/:id` |
| Create class | `POST /orgs/:id/classes` |
| Join class by code | `POST /orgs/classes/join` |
| Class roster + progress | `GET /orgs/classes/:classId` |

UI: `/schools`, `/schools/[id]`, `/schools/class/[classId]`

Org roles: `owner` | `teacher` | `student` (separate from platform `user`/`admin`).

## i18n (UK + EN)

- Dictionaries in `@eduforge/shared` (`getUI(locale)`)
- `LocaleProvider` + UK/EN toggle in nav
- `document.documentElement.lang` updates on switch
- Lesson content remains mixed (English course + UK prompts for skills)
