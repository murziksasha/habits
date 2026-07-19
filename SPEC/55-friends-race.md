# 55 — Friends weekly minis race

## Product

Compare **this ISO week’s programming minis race** with accepted friends (and self).

Complements:

- SPEC 51 global weekly minis race
- SPEC 54 all-time friends minis board

## API

`GET /friends/race` (auth)

```json
{
  "weekKey": "2026-W29",
  "raceSlugs": ["html-mini-card", "css-mini-hero", "js-mini-counter"],
  "totalRace": 3,
  "startsAt": "...",
  "endsAt": "...",
  "entries": [
    {
      "rank": 1,
      "userId": "...",
      "displayName": "Ada",
      "score": 2,
      "totalRace": 3,
      "isSelf": false
    }
  ],
  "me": { "...": "..." }
}
```

Score = number of this week’s featured minis completed with `completedAt` in ISO week bounds.

## UI

`/friends` section **Weekly minis race vs friends**:

- Ranked list, self highlighted
- Link to `/programming` race board

## Related

- SPEC 51–54 minis race / friends
