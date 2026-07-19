# 43 — Metrics CSV export + content pack (git/sql mini)

## Metrics CSV

| Endpoint | Auth |
|----------|------|
| `GET /admin/metrics.csv?days=7` | admin |

Flat key-value CSV:

```
metric,value
windowDays,7
users,42
...
activity:lesson_completed,120
```

Shared builder: `buildAdminMetrics` (JSON + CSV).

UI: **Export CSV** on `/admin/metrics`.

## Content pack — more mini-projects

| Lesson | Unit | Type |
|--------|------|------|
| `git-mini-commit` | git | `code_project` bash + NOTES.md |
| `sql-mini-join` | sql | `code_project` query.sql + README |

Full mini set: html, css, js, react, **git**, **sql**.

## Related

- SPEC 42 admin metrics
- SPEC 33–34 code projects
