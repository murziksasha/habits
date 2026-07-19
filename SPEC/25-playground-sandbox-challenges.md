# 25 — Playground sandbox + challenges + more depth

## Isolated JS/TS execution

- Client `runJsInIframe`: sandboxed iframe (`allow-scripts` only, no same-origin)
- `postMessage` result channel + timeout (anti infinite loop)
- Fallback: same-thread `Function` runner if needed
- Activity log includes `isolated: true|false`

## Auto-test challenges

- Catalog: `PLAYGROUND_CHALLENGES` in `@eduforge/shared`
- Client runs code → submits `stdout` to API
- `POST /playground/challenge/submit` verifies via `matchChallengeStdout`
- First solve: milestone `pg_ch_<id>` + XP + notification
- UI: challenge chips on `/playground`, Run also checks active challenge

## API

| Method | Path | Notes |
|--------|------|--------|
| GET | `/playground/meta` | langs, examples, challenge summaries |
| GET | `/playground/challenges` | + `solved` flags |
| POST | `/playground/log` | run telemetry |
| POST | `/playground/challenge/submit` | `{ challengeId, stdout }` |

## Depth lessons (added)

- `react-depth-effects` (useEffect)
- `git-depth-rebase`
- `node-depth-env`
- `express-depth-errors`
- `ts-depth-union`

## Tests

- `playground.test.ts` — strip TS, stdout match, catalogs
