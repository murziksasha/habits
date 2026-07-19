# 47 — Mini recommendations + slug-based hub

## Smart next (`GET /learning/next`)

Adds programming mini recommendations:

| Kind | When | Priority |
|------|------|----------|
| `programming_mini_race` | weekly race mini not done this week | ~18 |
| `programming_minis_race` | race still open this week | 17 |
| `programming_mini` | unfinished mini (non-race) | ~15.5 → 13 |
| `programming_minis_board` | some minis incomplete | 12.5 |
| `programming_minis_done` | all minis complete | 13 → playground |
| `playground` | always available | 6 |

See SPEC 53 for race-first ordering.

Feed size increased to **10** items.

## Mini board API

`GET /learning/programming/minis`

```json
{
  "minis": [{ "slug", "lessonId", "titleUk", "unitSlug", "completed", "missing" }],
  "total": 10,
  "completed": 3,
  "allDone": false,
  "slugs": ["html-mini-card", "..."]
}
```

Uses `PROGRAMMING_MINI_LESSON_SLUGS`.

## Hub UI

`/programming` detects minis via **slug** (`isProgrammingMiniSlug`) with title fallback for legacy seed.

## OpenAPI

Documented: `/learning/next`, `/learning/programming/minis`, `/learning/programming/units`.

## Related

- SPEC 46 mini achievements
- SPEC 45 hub minis
