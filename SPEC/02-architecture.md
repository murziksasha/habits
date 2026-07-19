# 02 — Architecture

## High-level diagram

```
                    ┌─────────────┐
                    │  Browser    │
                    │  (Next.js)  │
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
      ┌─────────┐   ┌───────────┐   ┌────────────┐
      │ web     │   │ api       │   │ realtime   │
      │ :3000   │──▶│ Hono      │   │ Socket.IO  │
      │         │   │ :4000     │   │ :4001      │
      └─────────┘   └─────┬─────┘   └──────┬─────┘
                          │                │
                    ┌─────▼────┐     ┌─────▼────┐
                    │ Postgres │     │  Redis   │
                    └──────────┘     └──────────┘
```

## Monorepo layout

```
apps/
  web/                 Next.js UI (Ukrainian)
  api/                 REST API (Hono)
  realtime/            Chess WebSocket service
packages/
  shared/              XP, Elo, entitlements, Zod schemas, UI strings
  chess-core/          chess.js wrappers, puzzle helpers
  content/             Versioned seed course content
  db/                  Drizzle schema, migrations, seed
docker/                Dockerfiles + nginx sample
SPEC/                  This specification
```

## Package dependency graph

```
web ──────────► shared
api  ──► shared, db, chess-core
realtime ──► shared, db, chess-core
db ──► content, shared
content  (leaf)
chess-core  (leaf)
```

## Design principles

1. **Server authority** — lesson grading and chess moves validated on the server; clients never declare raw XP.  
2. **Shared domain math** — level curves, Elo, freemium gates live in `@eduforge/shared`.  
3. **Content as data** — lessons/exercises are JSON in DB (seeded from `packages/content`).  
4. **Separation of realtime** — long-lived chess sockets are not mixed into the REST process.  
5. **Self-host ready** — Docker Compose for Postgres, Redis, api, realtime, web.  

## Runtime processes

| Process | Responsibility |
|---------|----------------|
| `web` | SSR/CSR UI, static marketing, lesson players |
| `api` | Auth, courses, billing, leaderboards, admin |
| `realtime` | Chess matchmaking + game rooms |
| `postgres` | Durable state |
| `redis` | Available for queues/rate limits (matchmaking in-memory MVP with Redis present) |

## Auth model

- Credential register/login  
- Session token: random hex stored as **SHA-256 hash** in `sessions`  
- Client: HTTP-only cookie *and/or* `Authorization: Bearer` (SPA uses Bearer from `localStorage`)  
- Password reset tokens similarly hashed  

## Trust boundaries

- Public: marketing, leaderboards (read)  
- Authenticated user: courses, progress, play  
- Admin role: `/admin/*` API and UI  
