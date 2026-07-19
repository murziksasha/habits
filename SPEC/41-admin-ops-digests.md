# 41 — Admin ops: digests & cron buttons

## API (`adminMiddleware`)

| Method | Path | Action |
|--------|------|--------|
| GET | `/admin/ops/summary` | Parent links, digests 7d, weekly opt-in, recent digest log |
| POST | `/admin/ops/parent-digests` | `runParentDigestBatch()` |
| POST | `/admin/ops/homework-reminders` | `runHomeworkReminders()` |
| POST | `/admin/ops/weekly-learners` | Learner weekly emails (6d throttle) |
| GET | `/admin/ops/weekly-preview/:userId` | Preview learner weekly text |

## UI

`/admin` section **Ops / cron**:

- Counters: active parent links, digests last 7d, weekly email opt-in
- Buttons: run parent digests, homework reminders, learner weekly
- Result JSON + recent digest activity list

## Related

- SPEC 39–40 parent digests
- SPEC 17 homework reminders / CRON_SECRET
- SPEC 20 weekly learner report
