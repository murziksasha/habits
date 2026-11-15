# Chess board: check chip, mate card, legal-move dots

Date: 2026-10-30

## Intent

During a chess game, a learner should see that a king is in check, see who is checking, see checkmate or stalemate as a board-centered result, and click a piece to step onto a legal square.

## Constraints

- Copy is Ukrainian and English through `getUI(locale)`. No new hardcoded user-facing strings in components.
- Domain helpers live in `@eduforge/chess-core`. Clients do not invent legal moves.
- Online moves stay server-validated. Promotion sent to the server stays `"q"`.
- Rated games stay symmetric: both humans see the same hints.
- Lesson quizzes must not be answered by a mate or stalemate card.

## Key decisions

- Check chip names the attacker: `Шах · ферзь` / `Check · queen`, plus a red ring on the king and a thinner ring on the attacker. Double check says `Шах · подвійний` / `Check · double` and rings both attackers, with no single piece name.
- The chip is for whoever is in check. It stays until that check ends. It sits in a one-line strip at the screen-top edge of the board column, outside the 8×8, so no square is covered. Playing Black does not move the strip.
- Checkmate replaces the chip with a compact center card. Rings stay. Two lines: `Мат`, then `ферзь · ви перемогли` or `ферзь · ви програли` (`Checkmate`, then `queen · you won` / `you lost`). Double mate uses `подвійний` / `double`. Click the card or the board to dismiss and study. `Нова гра` stays in the side panel. After dismiss, the chip does not return. Rings stay.
- Stalemate gets a quiet center card: `Пат · нічия` / `Stalemate · draw`. No attacker and no rings. Same dismiss behavior. Resign, timeout, repetition, fifty-move, and insufficient material stay side-panel only.
- Click your piece on your turn: dots on empty legal squares, a capture ring on each legal capture. Click the dot or ring to move. Drag still works and shows the same dots from the moment the piece is picked up. Click the same piece, or a non-destination, to cancel. Click another own piece to switch. No dot on a move that leaves your king in check. Opponent pieces show nothing. Off-turn clicks do nothing.
- A selected piece with no legal move stays highlighted and shows `Немає ходу` / `No legal move` on that square until the next click. During check, the check strip stays. The no-move label does not replace it.
- Castling is one dot on the king's destination (two dots if both sides are legal). En passant is a capture ring on the empty destination square. Promotion stays automatic queen on click and drag.
- Surfaces:
  - `/play` (bot, seek, invite): full treatment.
  - Puzzles: play like a game for the side to move. Mate card only after the correct move, and only if that position is checkmate. Second line is `Задачу розв’язано` / `Puzzle solved`, not win/loss. Wrong moves never open a card. Non-mate solves (forks, `Bxf7+`) keep today's result sheet. A future stalemate solution uses the stalemate card plus `Задачу розв’язано`.
  - Lesson diagrams: click any piece to preview its legal moves in this position, including the side not to move. Dots only. No check chip, no mate card, no stalemate card, no `Немає ходу`. A second click does not move. Drag stays off.
- A solved mate puzzle holds the lesson 2.5s, then advances or submits, including the last exercise. Other exercises keep the 1.1s sheet. The mate card is not click-to-dismiss and does not block the lesson. During those 2.5s the board is not faded to 60%, so the card and rings stay readable. `pointer-events: none` still prevents extra moves. The green result sheet below still appears.
- Screen readers get an updated click-or-drag hint and live announcements on the strip, the no-move label, and the cards. No arrow-key move entry. No sound.

## Surfaced assumptions

- One attacker means one piece name. If the attacker list is unexpectedly empty, the chip says `Шах` / `Check` with the king ring only.
- Side-panel result strings stay as they are (`Перемога!`, `Поразка`, `Нічия`). The card uses the shorter lines agreed above.
- Lesson-diagram explore generates moves by giving that piece's color the turn. If chess.js rejects that FEN, the click shows no dots and no error chip.
- `react-chessboard` 4.7 square and drag callbacks are confirmed against installed types during implementation. The behavior above does not depend on a particular prop name.

## Out of scope

- Promotion picker, sound, arrow-key play, coach-hint arrows.
- Check, mate, or stalemate chrome on lesson diagrams.
- Center cards for resign, timeout, or non-stalemate draws.
- A card on every solved puzzle.
- Elo, server validation, and puzzle solution data.

