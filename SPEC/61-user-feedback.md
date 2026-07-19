# 61 — User feedback → developer

## Product

Authenticated learners send feedback (bug / idea / content / other). Admins triage.

## Schema

Table `feedback_messages`:

| Field | Notes |
|-------|--------|
| userId | required |
| category | `bug` \| `idea` \| `content` \| `other` |
| message | 5–4000 chars |
| pagePath | optional |
| status | `new` \| `triaged` \| `done` \| `wontfix` |
| adminNote | optional |

## API

| Method | Path | Auth |
|--------|------|------|
| POST | `/feedback` | user (rate-limited) |
| GET | `/feedback/mine` | user |
| GET | `/feedback/admin?status=` | admin |
| PATCH | `/feedback/admin/:id` | admin |

On create: activity `feedback_sent`; notify admin users.

## UI

- `/feedback` — form + my list
- `/admin/feedback` — triage
- Nav **More** → Feedback

## Related

- SPEC 14 engagement notifications
