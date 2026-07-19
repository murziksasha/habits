# 54 — Friends minis comparison

## API

`GET /friends/minis` (auth)

Returns accepted friends **and self**, ranked by completed programming mini-projects:

```json
{
  "totalMinis": 10,
  "entries": [
    {
      "rank": 1,
      "userId": "...",
      "displayName": "Ada",
      "minisCompleted": 8,
      "total": 10,
      "allDone": false,
      "isSelf": false
    }
  ],
  "me": { ... }
}
```

## UI

`/friends` section **Minis vs friends**:

- Ranked list with progress
- Highlight self
- Link to programming hub

## Related

- SPEC 50 all-time minis leaderboard (global)
- SPEC 15 friends
