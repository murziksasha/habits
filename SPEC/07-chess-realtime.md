# 07 — Chess Realtime

## Services

- **Realtime app** (`apps/realtime`) on port `4001`  
- Health: `GET /health`  
- Transport: Socket.IO (websocket + polling)  
- Auth: handshake `auth.token` or cookie session  

## Client flows

### Online PvP

1. Connect with session token  
2. Emit `seek` `{ timeControl: "3+0"|"5+0"|"10+0", rated: boolean }`  
3. Server queues seekers; pair same time control + rated flag  
4. Create `chess_games` row, join room `game:<id>`  
5. Emit `match_found` to both sides (`youAre: "w"|"b"`)  
6. Moves: `move` `{ gameId, from, to, promotion? }`  
7. Server validates via `@eduforge/chess-core` `applyMove`  
8. Broadcast `moved`; on terminal position emit `game_over` + Elo  

Other events: `cancel_seek`, `join_game`, `resign`.

### Bot practice (client-side)

- UI path `/play` starts local game vs simple random/capture-preferring bot  
- No DB game, no Elo, onboarding flag `triedChess` still set  

## Time controls

Defined in shared `CHESS_TIME_CONTROLS`:

- `3+0` → 180s  
- `5+0` → 300s  
- `10+0` → 600s  

Server drains clocks using elapsed time between moves; timeout decides winner.

## Rules engine

- Library: `chess.js`  
- Illegal moves rejected with `illegal_move`  
- Puzzle helper: SAN compare ignoring check/mate markers  

## Freemium rated games

`canPlayRatedChess` blocks free users after `FREE_RATED_CHESS_PER_DAY` (5).  
Counter stored on `chess_ratings.rated_games_today` + date string.

## Security notes

- Socket middleware requires valid session  
- Only white/black may join their game  
- Turn enforcement on each move  
