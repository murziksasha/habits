# 28 — Code tutor, programming achievements, race bonus

## Code tutor

- System prompt `SYSTEM_PROGRAMMING` when `courseSlug=programming` or message looks like code
- Fallback local tutor answers for HTML/CSS/JS/React/Node/SQL/Git keywords
- Default tutor course select: `programming`
- Hub links: Tutor, Playground, Review

## Achievements

| Code | Trigger |
|------|---------|
| `code_first_lesson` | 1 programming lesson |
| `code_lessons_5` | 5 programming lessons |
| `code_lessons_15` | 15 programming lessons |
| `pg_first_challenge` | 1 playground challenge |
| `pg_challenges_5` | 5 challenges |
| `pg_challenges_10` | 10 challenges |

Evaluated in `evaluateAchievements` on lesson complete + challenge submit.

## Weekly race bonus claim

- `POST /playground/race/claim-bonus`
- Eligible if rank 1–3 this week; once per `pg_race_bonus_{weekKey}`
- Awards `weeklyRaceXpBonus(rank)` XP

## E2E

- Smoke: `/playground` loads after admin login
