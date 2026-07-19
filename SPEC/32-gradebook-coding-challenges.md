# 32 — Gradebook coding columns + more playground challenges

## Gradebook

Shared builder `buildGradebook(classId)` powers:

| Endpoint | Use |
|----------|-----|
| `GET /gradebook/class/:classId.csv` | CSV download |
| `GET /gradebook/class/:classId` | JSON for UI |

### Per-student columns

| Field | Source |
|-------|--------|
| `programmingLessons` | Completed lessons in `programming` course |
| `programmingXp` | Course XP for programming |
| `playgroundSolved` / `playgroundXp` | `pg_ch_*` milestones |
| `courseXpTotal` | Sum of all course XP |
| `homework[]` | Existing assignment scores |
| `classPlayground[]` | Class-assigned PG challenges (solved flag) |

### CSV header (order)

```
displayName, email, globalLevel, globalXp,
programmingLessons, programmingXp, playgroundSolved, playgroundXp,
hw:*, pg:*, courseXpTotal
```

`hw:*` = homework title; `pg:*` = class playground assignment title (`done` / empty).

### Meta (JSON)

```json
{
  "programmingLessonsTotal": 28,
  "playgroundChallengesTotal": 24,
  "playgroundMaxXp": …
}
```

## Playground challenges (new)

| id | Lang |
|----|------|
| `ch-js-palindrome` | JS |
| `ch-js-count-vowels` | JS |
| `ch-bash-pwd` | Bash (`/playground`) |
| `ch-sql-count` | SQL `COUNT(*) AS n` |
| `ch-html-list` | HTML + DOM |
| `ch-css-grid` | CSS grid |

## SQL mock

`runMockSql` supports:

```sql
SELECT COUNT(*) [AS alias] FROM users|orders [WHERE col = value]
```

## UI

Class page CSV button hint: `gradebook.colsHint`.

## Related

- SPEC 17 gradebook base
- SPEC 27 class playground assigns
- SPEC 31 parent coding progress
