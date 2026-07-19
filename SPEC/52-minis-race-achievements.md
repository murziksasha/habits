# 52 — Minis race achievements + dashboard + metrics

## Achievements

| Code | Unlock |
|------|--------|
| `code_minis_race_run` | `minisRaceScore >= 1` |
| `code_minis_race_podium` | `minisRaceRank` 1–3 |
| `code_minis_race_win` | `minisRaceRank === 1` |

Triggered on `POST /learning/programming/minis/race/claim-bonus` via `evaluateAchievements`.

## Dashboard

Card: weekly minis race score, rank, claim hint → `/programming`.

## Admin metrics

`buildAdminMetrics.minis`:

| Field | Meaning |
|-------|---------|
| `catalog` | 10 mini slugs |
| `completionsAllTime` | completed mini lesson rows |
| `raceParticipantsThisWeek` | distinct users with ≥1 race mini this week |
| `raceFeatured` | 3 |

CSV export includes these keys.

## Related

- SPEC 51 weekly race
- SPEC 42–43 admin metrics
