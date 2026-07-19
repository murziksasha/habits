# 53 — Race minis in smart next + e2e

## Smart next priorities

When programming course exists:

| Kind | Priority | When |
|------|----------|------|
| `programming_mini_race` | ~18 | Featured race mini not completed **this week** |
| `programming_minis_race` | 17 | Any race mini still open this week → hub |
| `programming_mini` | ~15.5 | Other unfinished minis (not race) |
| `programming_minis_board` | 12.5 | Board link |
| `programming_minis_done` | 13 | All minis complete |

Race uses `weeklyMinisRaceSlugs()` + `completedAt >= weekStart`.

## E2E smoke

- Programming hub: expect minis/race/path copy visible  
- Dashboard: programming / race / playground teaser  

## Related

- SPEC 47 next recommendations  
- SPEC 51–52 minis race  
