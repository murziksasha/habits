# 17 — Parents, Gradebook CSV & Homework Reminders

## Parent portal

Table: `parent_student_links`

| Field | Notes |
|-------|--------|
| `parentUserId` / `studentUserId` | Linked accounts |
| `status` | `pending` \| `active` \| `revoked` |
| `inviteCode` | Student-generated; cleared on claim |

### Flow

1. **Student** → `POST /parents/invite` → gets code  
2. **Parent** → `POST /parents/claim` `{ inviteCode }` → link active  
3. Parent views `GET /parents/children` and `GET /parents/children/:id/progress`  
4. Either party can `POST /parents/links/:id/revoke`  

UI: `/parents`, `/parents/child/[studentId]`

Child progress also exposes **programming path** (units), **playground challenges**, and **certificates** (see SPEC 31).

Weekly **parent digest** (7d metrics + email): SPEC 39 —  
`GET/POST /parents/children/:id/digest`.

## Gradebook CSV

| Endpoint | Description |
|----------|-------------|
| `GET /gradebook/class/:classId.csv` | CSV download (Bearer auth) |
| `GET /gradebook/class/:classId` | JSON for UI |

Columns: name, email, level, global XP, **programming lessons/XP**, **playground solved/XP**, one column per homework (score% or status), class PG assigns (`done`), total course XP. See SPEC 32.

UI: **Export CSV** button on class page.

## Homework reminders

| Endpoint | Description |
|----------|-------------|
| `POST /reminders/homework/run` | Batch: due &lt;24h + overdue → notifications. Auth: `CRON_SECRET` via `x-cron-secret` or Bearer (if set). Open in dev without secret. |
| `GET /reminders/homework/mine` | Personal due-soon/overdue list |

Cron example:

```bash
curl -X POST http://localhost:4000/reminders/homework/run \
  -H "x-cron-secret: $CRON_SECRET"
```

UI: banner on `/homework` for personal reminders.

## Env

```
CRON_SECRET=optional-shared-secret
```

## Migration

`0007_parents`
