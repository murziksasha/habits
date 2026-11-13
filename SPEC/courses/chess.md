# Chess

Slug: `chess`
Group: chess
Hub: `/play`
Freemium: first 7 non-exam lesson(s) open without Pro.

## What this course is

Theory, puzzles, and live games with other players.

## Program

### `rules` — Правила

- `board-pieces` — Дошка та фігури [free] (2 exercises)
- `king-check` — Шах і мат [free] (2 exercises)
- `special-moves` — Спеціальні ходи [free] (2 exercises)

### `tactics` — Тактика

- `mate-in-1-a` — Мат в 1: частина А [free] (2 exercises)
- `mate-in-1-b` — Мат в 1: частина Б [free] (2 exercises)
- `forks` — Вилки (2 exercises)
- `pins-skewers` — Зв'язки (2 exercises)
- `more-puzzles` — Ще задачі (2 exercises)
- `back-rank-mates` — Мати на останній горизонталі (2 exercises)
- `opening-ideas` — Ідеї дебюту (2 exercises)

### `endgames-intro` — Endgame intro

- `opposition-basics` — Opposition basics [free] (3 exercises)
- `king-pawn` — King and pawn (2 exercises)
- `ladder-mate` — Ladder mate (2 exercises)

### `tactics-boost` — Tactics boost

- `fork-basics` — Fork basics [free] (2 exercises)
- `pin-basics` — Pin basics (2 exercises)
- `discovered-attack` — Discovered attack (2 exercises)

### `tactics-practice-2` — Tactics practice 2

- `mate-patterns-recap` — Mate patterns (2 exercises)
- `fork-drill` — Fork drill (2 exercises)
- `pin-drill` — Pin drill (2 exercises)
- `skewer-intro` — Skewer intro (2 exercises)
- `tactics-mix-2` — Tactics mix 2 (2 exercises)

### `mixed-tactics-endgames` — Mixed Tactics & Endgame Decisions

- `tactic-double-attack` — Double attack & forks (3 exercises)
- `tactic-deflection-clearance` — Deflection & square clearance (2 exercises)
- `tactic-back-rank-traps` — Back-rank tactical traps (2 exercises)
- `checkpoint-tactics` — Checkpoint: tactical mastery [exam] (4 exercises)
- `endgame-king-pawn-races` — King and pawn: square rule & key squares (2 exercises)
- `endgame-rook-activity` — Rook endgames: Lucena & Philidor (2 exercises)
- `endgame-minor-piece-conversion` — Minor piece conversion & opposite bishops (2 exercises)
- `endgame-stalemate-tricks` — Stalemate traps & defensive saves (2 exercises)
- `checkpoint-endgames` — Checkpoint: endgame technique [exam] (4 exercises)

### `endgame-accuracy-review` — Endgame Principles & Mixed Tactical Review

- `king-opposition-passed-pawn` — King Opposition & Passed Pawns (2 exercises)
- `mixed-calculation-checkpoint` — Checkpoint: Mixed Endgame Calculation [exam] (2 exercises)

## Depth now

- Units: **34**
- Lessons: **188**
- Exams: **24**
- Free non-exam lessons: 14
- Exercise types in seed: chess_lesson, chess_puzzle, mcq, explain

## Expansion (Nov 2026)

Additional bilingual (uk+en) units in `packages/content/src/expansion/chess-exp.ts`.

- `opening-principles-plus` — Opening principles in more depth
- `pawn-structures` — Pawn structures
- `middlegame-plans` — Middlegame plans
- `rook-endgames-plus` — Rook endgames
- `calculation-hygiene` — Calculation hygiene
- `practical-study` — Practical play and study

## Deep track (Nov 2026)

21 bilingual units (126 lessons, 21 exams) in
`packages/content/src/expansion/chess-deep.ts`, appended after the
expansion units. Curriculum and rationale:
[`SPEC/DEEP-ENGLISH-CHESS-PLAN.md`](../DEEP-ENGLISH-CHESS-PLAN.md).
Openings are taught as plans and pawn structures, not move trees.
Every `chess_lesson` and `chess_puzzle` FEN in the *whole* course
(not only the deep track) is validated by `packages/content/src/chess-fen.test.ts`
and, for deep positions, `scripts/gen-expansion/deep/validate_fens.mjs`
(263 deep positions legal: 105 lessons, 158 puzzles, 47 ended in mate).

Course page groups (`COURSE_PARTS`): Rules and early tactics (original
units), First endgames and structures (the Nov 2026 expansion), then the
deep parts below.

### Rules and calculation tools (`ch-part-foundations`)

- `ch-deep-notation` — Notation and complete rules
- `ch-deep-calc-viz` — Calculation and visualisation

### Tactics and mate patterns (`ch-part-tactics`)

- `ch-deep-tactics-hidden` — Hidden motifs (decoy, overload, interference, x-ray, attraction)
- `ch-deep-tactics-remove` — Removing defenders and sacrifices (Greek gift)
- `ch-deep-mates-classic` — Classic mates (smothered, Arabian, Anastasia, Boden, Legal)
- `ch-deep-mates-attack` — Mates in the king attack
- `ch-deep-tactics-mix` — Mixed motifs and practical tactics

### Openings as ideas (`ch-part-openings`)

- `ch-deep-italian-ruy` — Italian and Ruy Lopez
- `ch-deep-qg-london` — Queen's Gambit and London
- `ch-deep-sicilian-french` — Sicilian and French
- `ch-deep-caro-kid` — Caro-Kann and King's Indian

### Middlegame strategy (`ch-part-middlegame`)

- `ch-deep-planning` — Evaluation and planning
- `ch-deep-minor-pieces` — Bishop versus knight
- `ch-deep-attack-king` — Attacking the king
- `ch-deep-pawn-play` — Pawn play (hanging pawns and chains extend, do not repeat, earlier IQP lessons)

### Endgames (`ch-part-endgames`)

- `ch-deep-kp-theory` — King and pawn theory
- `ch-deep-rook-theory` — Rook endings in full (Lucena, Philidor, Vancura, short-side)
- `ch-deep-minor-end` — Minor-piece and queen endings (KBN mate, queen vs pawn on the 7th)

### Games, practice, mind (`ch-part-practice`)

- `ch-deep-famous-1` — Classic games (Greco, Morphy Opera build-up, Immortal, Evergreen, Byrne–Fischer 1956)
- `ch-deep-famous-2` — Modern model games (Fischer–Spassky, Kasparov–Topalov, Karpov, Tal, study method)
- `ch-deep-tournament` — Tournament practice and psychology

Flashcard decks: `chess-tactics-patterns`, `chess-opening-ideas`.
Learning path: `chess-mastery`. `/placement/chess` uses the course-agnostic
MCQ bank from early units (enough questions; no dedicated chess bank).
