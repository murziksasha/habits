# Ops runbook (EduForge)

## Services

| Service | Default port | Health |
|---------|--------------|--------|
| web (Next) | 3000 | HTTP `/` |
| api (Hono) | 4000 | `/health`, `/ready` (DB+Redis) |
| realtime (Socket.IO) | 4001 | `/health` |

Compose: root `docker-compose.yml` (dev). Env: `DATABASE_URL`, `REDIS_URL`, `AUTH_SECRET`, `WEB_ORIGIN`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_REALTIME_URL`.

## Migrations

```bash
pnpm db:migrate
pnpm db:seed   # dev/demo only — never seed prod passwords in real deploy
```

Zero-downtime: run migrations before rolling API; avoid long locks on hot tables. Course slugs are `varchar` — no `ALTER TYPE`.

## Backups

1. **Postgres**: daily `pg_dump -Fc` (or managed snapshot). Retain ≥7 days.
2. **Restore**: `pg_restore` into empty DB → migrate if needed → verify `/ready`.
3. **Redis**: ephemeral (seek queue, rate limit, idempotency). No durable restore required.
4. Test restore quarterly.

## Cron / digests

See [CRON.md](./CRON.md). Protect with `CRON_SECRET`. Feature flags:

- `FEATURE_PARENT_DIGEST` (default on)
- `FEATURE_PUSH_REENGAGE` (default on)
- `FEATURE_STRICT_CSRF=1` for cookie Origin checks
- `FEATURE_LABS=1` / web `?labs=1`

## Realtime multi-instance

- Set `REDIS_URL`.
- Socket.IO Redis adapter auto-enables when packages resolve.
- Seek queue uses Redis via `SeekQueueStore`.

## Feature flags

`GET /me/flags` returns non-secret flags. Implementation: `@eduforge/shared` `resolveFeatureFlags`.

## Incident cheat sheet

| Symptom | Check |
|---------|--------|
| 503 `/ready` | Postgres / Redis connectivity |
| Auth loops | `AUTH_SECRET`, cookie domain, `WEB_ORIGIN` CORS |
| Rate limited | Redis or in-memory limit; wait `retryAfter` |
| Stripe | Webhook signature secret, `planExpiresAt` |
| Empty matchmaking | Realtime + Redis seek backend |

## Admin first deploy

1. Change default admin password immediately.
2. Set VAPID keys for push.
3. Set Stripe keys + portal.
4. Disable seed credentials in prod docs.

## Related

- [CRON.md](./CRON.md)
- [CONTENT-DX.md](./CONTENT-DX.md)
- [CURRENT.md](./CURRENT.md)
