# 27 — Weekly race, class team challenges, DOM asserts

## Weekly playground race

- 5 challenges rotated by ISO week (`weeklyRaceChallengeIds`)
- Leaderboard: XP from those challenges solved **this week** (`unlockedAt >= week start`)
- `GET /playground/race/weekly` — weekKey, challenge set, entries + informational `bonusXp` for top 3
- UI block on `/playground`
- `GET /playground/me` includes `race: { solved, total }`

## Class team challenges

- Table: `class_playground_challenges` (migration `0014_class_pg_challenges`)
- Teacher: `POST /playground/class/:classId/assign` `{ challengeIds, dueAt? }`
- Progress: `GET /playground/class/:classId` — solvedCount / totalStudents
- Student: `GET /playground/class-mine` — list with solved flag
- Delete: `DELETE /playground/class/:classId/:assignmentId`
- Class page UI + playground “Class challenges” panel

## DOM assertions (iframe)

- Challenge field `domAsserts: { selector, minCount?, textIncludes?, attr? }[]`
- Client `runDomAsserts(htmlDoc, asserts)` — sandbox iframe + postMessage
- Must pass DOM asserts before XP submit for HTML/CSS challenges
- Server still validates `expectedSourceContains` for XP integrity

## Tests

- weekly race helpers, html domAsserts presence
