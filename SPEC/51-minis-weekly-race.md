# 51 — Weekly programming minis race

## Product

Each ISO week features **3 mini-projects** (rotated from `PROGRAMMING_MINI_LESSON_SLUGS`).

Score = how many of those 3 the user **completed this week** (`completedAt` in week bounds).

Top 3 can claim bonus XP once:

| Rank | XP |
|------|-----|
| 1 | 30 |
| 2 | 18 |
| 3 | 12 |

Milestone code: `prog_minis_race_{weekKey}` (prevents double claim).

## Shared

- `weeklyMinisRaceSlugs(weekKey?)`
- `weeklyMinisRaceXpBonus(rank)`

## API

| Method | Path |
|--------|------|
| GET | `/learning/programming/minis/race` |
| POST | `/learning/programming/minis/race/claim-bonus` |

## UI

`/programming` mini section:

- Featured 3 race minis (✓ if done this week)
- Top 5 race leaderboard
- Claim bonus button when eligible

## Related

- SPEC 27 playground weekly race
- SPEC 50 all-time minis leaderboard
