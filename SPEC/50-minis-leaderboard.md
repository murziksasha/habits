# 50 — Programming minis leaderboard

## API

`GET /learning/programming/minis/leaderboard?limit=15` (auth)

Ranks users by count of completed lessons whose slug is in `PROGRAMMING_MINI_LESSON_SLUGS`.

```json
{
  "entries": [
    {
      "rank": 1,
      "userId": "...",
      "displayName": "Ada",
      "globalLevel": 4,
      "minisCompleted": 10,
      "allDone": true
    }
  ],
  "totalMinis": 10,
  "me": { "rank": 3, "minisCompleted": 4, "allDone": false }
}
```

If the current user is outside top N, `me.rank` is `0` with their count.

## UI

`/programming` mini section:

- Top 8 rows (link to public profile)
- Highlight self
- Show own score if not in top list

## OpenAPI

`/learning/programming/minis/leaderboard`

## Related

- SPEC 46–49 minis path
