# Cron & scheduled ops

Batch jobs for digests, reminders, and re-engagement. Prefer **HTTPS** + secret header in production.

## Auth patterns

| Header | Value |
|--------|--------|
| `x-cron-secret` | `$CRON_SECRET` |
| `Authorization: Bearer …` | same as `CRON_SECRET`, **or** admin session token |

If `CRON_SECRET` is unset and `NODE_ENV !== production`, some endpoints allow open calls (dev only).

Set in env: `CRON_SECRET=` (see `.env.example`).

## Recommended schedule (UTC)

| Job | Endpoint | Schedule | Notes |
|-----|----------|----------|--------|
| Parent digests | `POST /parents/digest/run` **or** `POST /admin/ops/parent-digests` | Weekly Sun 18:00 | Throttle ~6d per parent→child; quiet weeks still get soft email |
| Homework reminders | `POST /admin/ops/homework-reminders` **or** reminders run | Daily 08:00 | Due &lt;24h + overdue |
| Learner weekly email | `POST /admin/ops/weekly-learners` | Weekly Sun 17:00 | Opt-in `weeklyEmailEnabled` |
| Push re-engage | `POST /admin/ops/push-reengage` body `{"days":3}` | Daily 16:00 | `lastActiveDate` older than N days; throttle via `push_reengage_sent` |
| Weekly quest remind | `POST /admin/ops/weekly-quest-remind` body `{"limit":300}` | Wed+Sat 15:00 | Incomplete weekly build/lessons; throttle 2d via `weekly_quest_remind` |
| Judge worker drain | `POST /judge/worker/drain` body `{"max":5}` | Every 10–30s if async judge used | Auth: `JUDGE_WORKER_SECRET` or `CRON_SECRET` |

### Dry-run notes

- Parent digests / push re-engage: run once against staging with a known inactive test user; verify throttle keys in Redis / activity log before production schedule.
- Judge drain: safe no-op when queue empty; result store TTL is in-process/Redis (see `@eduforge/judge` queue).
- Prefer admin Ops UI dry-check (buttons) then enable cron.

Admin UI: `/admin` → Ops buttons (including **Push re-engage (3d)**).

## curl examples

```bash
export API=https://api.example.com
export CRON_SECRET=replace-me

# Parent digests (public cron path)
curl -sS -X POST "$API/parents/digest/run" \
  -H "x-cron-secret: $CRON_SECRET"

# Same via admin
curl -sS -X POST "$API/admin/ops/parent-digests" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Judge queue worker (optional multi-process)
curl -sS -X POST "$API/judge/worker/drain" \
  -H "x-cron-secret: $CRON_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"max":10}'

# Push re-engage inactive 3+ days
curl -sS -X POST "$API/admin/ops/push-reengage" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"days":3}'

# Homework reminders
curl -sS -X POST "$API/admin/ops/homework-reminders" \
  -H "x-cron-secret: $CRON_SECRET"
```

## systemd timer sketch

```ini
# /etc/systemd/system/eduforge-digest.service
[Service]
Type=oneshot
EnvironmentFile=/etc/eduforge.env
ExecStart=/usr/bin/curl -fsS -X POST ${API_URL}/parents/digest/run -H "x-cron-secret: ${CRON_SECRET}"
```

```ini
# /etc/systemd/system/eduforge-digest.timer
[Timer]
OnCalendar=Sun *-*-* 18:00:00 UTC
Persistent=true
```

## GitHub Actions (optional)

A scheduled workflow can call the same endpoints with repo secrets `API_URL` + `CRON_SECRET`. Keep unit/typecheck as the default required CI path; e2e remains a full stack job.

## Related

- `SPEC/40-parent-digest-cron-ci.md` — original parent digest batch
- `SPEC/17-parents-gradebook.md` — homework CRON
- `apps/api/src/services/reengage.ts` — push re-engage implementation
- `apps/api/src/email.ts` — digest / weekly HTML templates
