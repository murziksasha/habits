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

| Flag / env | Default | Notes |
|------------|---------|--------|
| `FEATURE_STRICT_CSRF` | **on in production** | Origin/Referer check for cookie mutations; set `=0` to disable |
| `FEATURE_EMAIL_VERIFY` | on | Send verification on register |
| `FEATURE_REQUIRE_EMAIL_VERIFY` | off | Block login until verified (non-admin) |
| `ALLOW_DEV_BILLING` | on non-prod / **off prod** | `/billing/dev-upgrade`, `/trial`, `/dev-downgrade` |
| `ISSUE_BEARER_TOKENS` | on non-prod / off prod | Raw session token in JSON; web uses cookie only |
| `JUDGE_MODE` | local (dev) / **off (prod)** | Use `docker` in production; never `local` on shared hosts |
| `JUDGE_ALLOW_LOCAL` | off | Escape hatch only |
| `JUDGE_DOCKER_FALLBACK_LOCAL` | off | Must stay off in production |
| `CRON_SECRET` | required in prod | Parent digests / reminders |

## Security checklist (production)

1. `AUTH_SECRET` long random; never default `dev-secret-change-me`
2. `WEB_ORIGIN` exact browser origin (CORS + CSRF)
3. Stripe keys set → demo billing auto-blocked unless `ALLOW_DEV_BILLING=1` (staging only)
4. `JUDGE_MODE=docker` or leave unset (off); Redis up for rate limits
5. TLS at edge + optional HSTS (API sets HSTS when `NODE_ENV=production`)
6. Change/remove seed admin passwords; never `pnpm db:seed` on real prod with defaults
7. SMTP configured for password reset + email verify
8. Run migration `0027_email_verify_security` + `0028_oauth_family_2fa`
9. Optional: Google OAuth client + redirect `…/auth/oauth/google/callback`
10. Optional: `STRIPE_PRICE_FAMILY` for family checkout

## Metrics & product funnel

| Endpoint | Use |
|----------|-----|
| `GET /metrics` | Ops counts, latency, `productFunnel7d`, `judge.queue`, OTel span stats |
| `GET /analytics/funnel?days=7` | Admin-only funnel (first_lesson, paywall_shown, exams) |
| `POST /analytics/events` | Client events: `paywall_shown`, `paywall_cta_click`, onboarding_* |

Protect `/metrics` with `METRICS_TOKEN` in production. SLOs (targets): API p95 &lt; 500ms for auth/lesson submit; `/ready` 99.9%; judge fail-closed when disabled.

## Observability (OTel)

```bash
docker compose --profile otel up -d otel-collector
# API env:
# OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
```

Spans export OTLP/HTTP JSON when endpoint set (`apps/api/src/otel.ts`).

## Incident cheat sheet

| Symptom | Check |
|---------|--------|
| 503 `/ready` | Postgres / Redis connectivity |
| Auth loops | `AUTH_SECRET`, cookie domain, `WEB_ORIGIN` CORS |
| 403 `csrf_origin` | `WEB_ORIGIN` mismatch or `FEATURE_STRICT_CSRF` |
| 403 `dev_billing_disabled` | Expected in prod without Stripe path / ALLOW_DEV_BILLING |
| `judge_disabled` | Set `JUDGE_MODE=docker` or use client playground |
| Rate limited | Redis or in-memory limit; wait `retryAfter` |
| Stripe | Webhook signature secret, `planExpiresAt` |
| Empty matchmaking | Realtime + Redis seek backend |

## Admin first deploy

1. Change default admin password immediately.
2. Enroll admin TOTP (`ADMIN_MFA_ENFORCE` / production).
3. Set VAPID keys for push.
4. Set Stripe keys + portal.
5. Disable seed credentials in prod docs.
6. Confirm judge mode and CSRF flags.

## Related

- [CRON.md](./CRON.md)
- [CONTENT-DX.md](./CONTENT-DX.md)
- [CURRENT.md](./CURRENT.md)
