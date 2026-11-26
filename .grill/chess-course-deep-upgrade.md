# Grill: Chess course deep upgrade

Date: 2026-11-25

## Intent

Turn the EduForge «Шахи» course from a broad but shallow collection of lessons into a course that actually trains a player. Puzzles must be correct, play like real chess (the opponent answers, any winning move counts), explain why, and come back when missed. Games against the bot and online must be reviewable so the learner's own mistakes become training material. Plan every phase as one deep, file-level plan, not a menu of optional phases.

## Constraints

- Target learner: a teen or adult who knows the rules and plays up to about 1400–1600 Lichess puzzle rating. Difficulty 5 is about 1800. No pre-reader kids track.
- Product copy is Ukrainian + English via `getUI(locale)` and bilingual content fields. No Russian. Use «туровий ендшпіль» (not «ладейний») and «Лусена» consistently.
- Existing exercise IDs stay stable. Fixes happen in place under the same IDs, so user progress, `exercise_reviews` rows and XP history do not break. Content changes ship through `pnpm content:sync`.
- Domain logic stays in `@eduforge/chess-core`. Online moves stay server-validated. The server grader must agree with the client.
- The chess course stays free.
- Stockfish is used offline for content QA (box/CI script). Runtime hints and review use the existing coach service, optionally a server UCI engine via `STOCKFISH_PATH`.
- Puzzle sources must be license-clean: Lichess puzzle database (CC0), positions from public historical games, or hand-authored.
- Sounds are synthetic Web Audio, off by default. No third-party audio files.
- react-chessboard stays on v4 (^4.7.2) for this plan. v5 has a different options-object API and is a separate migration.

## Key decisions

- Decision: plan all eight phases in one deep plan, ordered puzzle engine → contract → rating/SRS → new content → games/review → endgame trainer → opening trainer → board/UX/bot. Reason: the user wants a clear, complete plan; correctness of puzzles blocks everything else. Alternative considered: the original 5-phase menu starting with board cosmetics.
- Decision: the puzzle engine auto-plays the opponent's reply after about 500 ms, using the engine-best defence stored in content. Reason: today the learner has to play both sides and guess the book defence (about 47 multi-ply puzzles). Alternative considered: keep manual both-side play with a "show reply" button.
- Decision: accept any move that reaches the puzzle goal, using precomputed `acceptedAlternatives` per ply plus a `goal` field (`mate | win_material | draw | promote`) and an eval threshold checked offline. The server grader uses the same rule. Reason: alternative mates (e.g. `ch-transfer-mate-check-p1` has three) are marked wrong today. Alternative considered: run an engine at runtime to judge any move (too heavy, nondeterministic).
- Decision: thread the promotion choice through `onMove(from, to, promo)`, the v4 promotion dialog, client and server. Reason: the three Saavedra items (`c8=R`), including an exam item, are unsolvable with auto-queen. Alternative considered: auto-queen with a special-case for puzzles.
- Decision: add an offline Stockfish QA script plus a vitest gate over stored QA results. It checks that the solution is best or within margin, that the key move is unique, alternative mates, that scripted defence is engine-best, that "hold the draw" puzzles are not lost, and implausible material. Reason: the audit found ~15 broken items that the existing legality test cannot see. Alternative considered: manual review only.
- Decision: fix broken items in place with the same IDs. Hopeless constructed positions (Greek gift set, etc.) are replaced by real-game positions under the same IDs. Reason: progress safety. Alternative considered: delete and re-add with new IDs.
- Decision: convert opening/positional "thematic move" items into a new `chess_plan` exercise type: diagram + pick 1 of 3 with a per-option explanation. Reason: those moves are often not engine-best and are about ideas, not forcing lines. Alternative considered: keep them as single-answer puzzles.
- Decision: deduplicate exam FENs so exams never replay a teach puzzle. Reason: ~45 FEN groups are reused, so exams test memory, not skill. Alternative considered: keep reuse as spaced review.
- Decision: content contract gets `themes[]` (Lichess-style keys, localized labels), two-step `hintUk/En` (piece, then square), optional per-ply `explanationUk/En`, `source`, `rating`, `goal`, `acceptedAlternatives`, `defence`. All 184 puzzles get tagged. Reason: themes, hints and explanations are the core teaching value. Alternative considered: a single free-text explanation only.
- Decision: chess gets the hint ladder and an XP penalty for hints. Reason: hints exist for other courses; chess has none today. Alternative considered: free hints.
- Decision: Glicko-2 puzzle rating per user and a rating per puzzle, separate from game Elo. It drives placement and adaptive selection. Reason: one game Elo cannot place puzzles. Alternative considered: difficulty 1–5 only.
- Decision: chess-aware SRS on top of `exercise_reviews`: fixed steps 1/3/7/21 days and theme siblings when a puzzle is missed. Reason: the generic mistake notebook ignores themes. Alternative considered: a new separate SRS table.
- Decision: add about 250 Lichess CC0 puzzles through an import pipeline + the QA script, 4–6 per teach lesson, d1→d5 curve. About 80 handwritten explanations; theme templates for the rest. Famous combinations come from real games. Reason: volume and a proper curve at the target strength. Alternative considered: hand-author everything.
- Decision: store full PGN/move history for bot and online games (fixes threefold), with post-game review, blunder marking (≥150 cp drop), blunders turned into personal puzzles into SRS, and a draw offer in `apps/realtime/src/index.ts`. Reason: own mistakes are the best material, and threefold currently never triggers. Alternative considered: review without blunder marking.
- Decision: endgame trainer = play from FEN vs bot with a goal check (win: Lucena, KBN, opposition; hold: Philidor, Vancura, rook pawn). A small tablebase is optional. Alternative considered: endgames only as puzzles.
- Decision: opening repertoire trainer = move trees for the 8 course openings with SRS per line, and the bot opening book aligned to the course openings. Alternative considered: openings as theory lessons only.
- Decision: board/UX/bot polish comes last: last-move highlight, flip, board themes, coordinates via `showBoardNotation`, captured pieces, synthetic sounds off by default, low-time warning, bot quiescence + tapered eval, bot personalities tied to course progress. Reason: cosmetics do not fix learning. Alternative considered: board polish first (original plan).

## Surfaced assumptions

- The original plan's audit was partly wrong: there are 184 puzzles, not ~36. `theme` does not exist in data. `explanationUk/En` already exists in the TypeScript type but is unused and missing from Zod.
- The current coach hint (`apps/api/src/stockfish-coach.ts`) is a depth-2 material + mobility heuristic, not Stockfish. Blunder marking needs a stronger evaluator to be trustworthy.
- `apps/realtime/src/matchmaking.ts` holds only pure helpers. Socket handlers, including the future draw offer, live in `apps/realtime/src/index.ts`.
- `showBoardOrientation` is not a coordinates prop in v4; the right prop is `showBoardNotation`.
- The Web Worker for the bot already exists (`apps/web/src/app/play/chess-bot-worker.ts`), used only for the strong level.
- Lichess puzzle CSV stores the FEN before the opponent's first move; the import must apply that move first.
- Content fixes do not need DB migrations; rating, PGN history and repertoire SRS do.

## Open questions

- Whether to run a server-side UCI engine (`STOCKFISH_PATH`) in production for review and blunder marking, or keep review heuristic-only on small instances.
- Whether the optional tablebase (≤5 pieces) is worth its size for the endgame trainer, or the bot plus a goal check is enough.
- Whether puzzle rating should be visible to learners from day one, or only after a placement run.

## Out of scope

- Migrating react-chessboard to v5.
- A runtime engine inside the browser for judging arbitrary puzzle moves.
- Third-party sound packs or audio files.
- A pre-reader kids track and a new paywall for chess.
- Arrow-key move entry and coach arrows on the board.
