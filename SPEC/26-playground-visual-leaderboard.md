# 26 — More challenges, HTML/CSS checks, playground leaderboard

## Challenges expansion

~18 challenges across JS, TS, SQL, JSON, Bash, **HTML**, **CSS**.

### Source / visual checks (HTML & CSS)

- `expectedSourceContains: string[]` — all needles must appear in submitted source
- Whitespace collapsed; case-insensitive by default
- CSS challenges may set `starterHtml` for preview pane
- Server: `evaluatePlaygroundChallenge({ stdout, source })`
- Client submits `source` (HTML code or CSS pane) on Run

## Leaderboard

- `GET /playground/leaderboard` — rank by sum of solved challenge XP
- Fields: `rank`, `displayName`, `score` (XP), `solved` count
- Also `totalChallenges`, `maxXp`
- UI: top-10 on `/playground`, full tab on `/leaderboard?tab=playground`
- `GET /playground/me` — personal solved/xp progress

## Tests

- `playground.test.ts` — source match, evaluate, xp sum, catalog size
