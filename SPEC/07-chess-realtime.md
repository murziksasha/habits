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

- UI path `/play` supports three engine levels via `@eduforge/chess-core` `chooseBotMove(fen, level)`:
  - **Learner**: 1-ply search scoring hanging pieces/safe captures and development; ~25% random legal moves.
  - **Club**: Depth-2 alpha-beta search with MVV-LVA capture ordering, piece-square tables (development, center control, castling), and occasional second-best move selection among moves within 35 cp.
  - **Strong**: Depth-3 alpha-beta search with near-zero noise, executed off the main thread in a Web Worker (`chess-bot-worker.ts`) with automatic Club fallback.
- Natural opening book for move 1 for all levels.
- Pre-game selector for level and color (White or Black). Bot plays White from move 1 when user chooses Black.
- Shows level name (no fake Elo).
- Preserved invariants: No DB `chess_games` row, no Elo updates. Onboarding flag `triedChess` is recorded.
- Deep-linkable via `/play?level=club|learner|strong`.

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

## Promotion

The board never auto-queens: when a pawn reaches the last rank the learner picks Q/R/B/N in an overlay (`promote-q|r|b|n`). The chosen piece is sent with the move (`move { from, to, promotion }`) to the bot game and the realtime server.

## Board learning hints

Layered UI feedback rendered via `ChessBoardFrame` on top of `@eduforge/chess-core`:

- **Check chip**: Sits above the board (`role="status"`). Identifies attacker (`Шах · ферзь` / `Check · queen`), or `Шах · подвійний` / `Check · double`. King gets a red inset ring; attacker(s) get a thinner red ring.
- **Center cards**:
  - Checkmate: Compact card with `Мат` and `[attacker] · [you won/lost]` (or `Задачу розв’язано` in puzzles). Dismissable on click in `/play`; king and attacker rings remain visible for study.
  - Stalemate: Quiet card with `Пат · нічия` (no rings).
- **Move indicators**:
  - Green radial dots on empty legal destination squares.
  - Amber inset ring on legal capture squares (including en passant).
  - Selected square receives brand tint.
  - Selected piece with no legal moves shows `Немає ходу` / `No legal move`.
- **Surfaces**:
  - `/play` (bot, seek, invite): full treatment (check chip, mate/stalemate cards, move dots, click-to-move and drag).
  - Puzzles: side to move play; mate/stalemate card on solved terminal move (`Задачу розв’язано`); 2.5s hold (`LESSON_MATE_RESULT_MS`).
  - Lesson diagrams: explore mode allowing pieces of either color to preview legal dots only; no check chip, cards, or move execution.

## Freemium rated games

`canPlayRatedChess` blocks free users after `FREE_RATED_CHESS_PER_DAY` (5).  
Counter stored on `chess_ratings.rated_games_today` + date string.

## Security notes

- Socket middleware requires valid session  
- Only white/black may join their game  
- Turn enforcement on each move  

## Game history, review and draw offers (deep upgrade, phase 5)

- Moves are applied on top of the full history (`applyMoveWithHistory(start_fen, pgn SANs, move)` in `@eduforge/chess-core`), so **threefold repetition** ends online and bot games (`termination: "threefold"`).
- `chess_games` (migration `0043_chess_games_history.sql`, additive): `start_fen`, `moves` (`[{ san, uci, fen, clockMs }]`), `kind` (`online | bot | endgame | opening`), `bot_level`, `termination`, draw-offer columns, `analysis_status`.
- Bot games are saved on finish with `POST /chess/games/bot` (`{ sans, playerColor, botLevel, resigned }`); the server replays every move and rejects illegal ones (`400 illegal_move`). Unrated, no Elo.
- `GET /chess/games/:id` returns `annotations` and lazily queues analysis; `GET /chess/games/:id/pgn` exports PGN; `POST /chess/cron/analyze` (CRON_SECRET) analyses finished games.
- Analysis (`apps/api/src/services/chess-game-analysis.ts`): with `STOCKFISH_PATH`, one UCI process per game, 120 ms per position, 30 s cap; drop ≥150 cp = blunder (only within ±500), 80–149 mistake, 40–79 inaccuracy; positions above +800 are not labelled. Games under 20 plies are skipped. Each blunder becomes a row in `chess_personal_puzzles` (best engine line, 1 or 3 plies) on the 1/3/7/21 ladder (`GET /chess/personal-puzzles/due`, `POST /chess/personal-puzzles/:id/attempt`); `/review/mistakes` reports `ownGameDue`. Without an engine only material drops ≥300 cp are flagged (`possible_blunder`).
- Draw offers (socket): `offer_draw`, `accept_draw`, `decline_draw`; events `draw_offered`, `draw_declined`, `draw_offer_expired`. One offer per player per 10 moves; a pending offer burns when the receiver moves. The bot accepts only when its own evaluation is ≤ −100 cp.
- UI: move list beside the board (`move-history-panel.tsx`), review page `/play/review/[gameId]` (⟨⟨ ⟨ ⟩ ⟩⟩, ←/→/Home/End), "My games" on `/play`, own-game puzzles in `/play/puzzles`.
