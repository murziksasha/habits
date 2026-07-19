# 42 — Admin product metrics dashboard

## API

`GET /admin/metrics?days=7|14|30` (admin only)

### Response (summary)

| Block | Fields |
|-------|--------|
| `totals` | users, premium, certificates, streakShieldsHeld, avgStreakDays |
| `engagement` | activeUsers (window), activeUsers30d, lessonsCompleted, xpFromAttempts, homeworkCompleted |
| `programming` | learners, lessonsCompletedAll/Window, lessonsTotal |
| `playground` | catalogChallenges, solvesWindow, solvesAllTime |
| `topActivityKinds` | kind + count (top 12 in window) |

## UI

`/admin/metrics` — window toggle 7/14/30d, stat cards, activity table.  
Linked from `/admin` header.

## Related

- SPEC 41 admin ops
- Public ops metrics: `GET /metrics` (SPEC 22) — different, lightweight
