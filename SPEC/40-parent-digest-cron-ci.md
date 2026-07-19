# 40 — Parent digest cron + CI e2e hook

## Cron batch digests

`POST /parents/digest/run`

| Auth | When |
|------|------|
| `x-cron-secret: $CRON_SECRET` | Production cron |
| No secret in non-production | Local dev |
| Admin Bearer token | Manual admin run |

### Behavior (`runParentDigestBatch`)

For each **active** parent→child link (skip self-placeholder):

1. Throttle: skip if `parent_digest_sent` activity for that pair in last **6 days**
2. Build digest via `buildChildDigest`
3. Skip empty weeks (no lessons/XP/PG/HW)
4. `sendMail(parentChildDigestEmail(...))`
5. Log `parent_digest_sent` with `{ studentId, source: "cron" }`

Returns: `{ sent, skipped, errors, links }`

### Example cron

```bash
curl -X POST http://localhost:4000/parents/digest/run \
  -H "x-cron-secret: $CRON_SECRET"
```

Suggested schedule: weekly Sunday 18:00 UTC.

## Shared builder

`buildChildDigest(studentId, parentUserId)` — used by GET digest, POST send, and cron.

## CI

GitHub Actions optional `e2e` job:

- Runs on `workflow_dispatch` or `vars.RUN_E2E == true`
- Default `SKIP_E2E=1` so PRs stay green without a live stack
- Installs Playwright chromium when enabled

Unit + typecheck remain the default required path (`pnpm ci`).

## Related

- SPEC 39 parent digest UI
- SPEC 17 parents / CRON_SECRET for homework reminders
