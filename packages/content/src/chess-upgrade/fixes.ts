/**
 * In-place puzzle fixes (same ids), SPEC/CHESS-DEEP-UPGRADE-PLAN.md §1.6.
 * Every position here was searched and verified with Stockfish 17.1 (built-in KPK
 * bitbase for pawn endings) so that exactly one move reaches the goal.
 */
import type { ChessPuzzleExercise } from "../types.js";

export type PuzzleFix = Partial<Omit<ChessPuzzleExercise, "id" | "type">>;

export const CHESS_FIXES: Record<string, PuzzleFix> = {
  // e4? only draws: the king must lead the pawn.
  "ch-tct-13": {
    solutionSans: ["Kf2"],
    goal: "best_move",
    promptUk: "Білі ходять і виграють. Пішак сам не дійде: знайдіть єдиний виграшний хід.",
    promptEn: "White to move and win. The pawn cannot run alone: find the only winning move.",
    themes: ["pawnEndgame", "keySquares"],
  },
  // Knight + king vs king is a draw; the h-pawn makes the fork decisive.
  "ch-t2": {
    fen: "r3k3/8/8/1N6/8/8/7P/4K3 w - - 0 1",
    solutionSans: ["Nc7+"],
    goal: "win_material",
    themes: ["fork"],
  },
  // Vancura: the rook attacks the a6-pawn from the side; only that move draws.
  "ch-d-vancura-p1": {
    fen: "R7/6k1/P7/8/8/1K6/8/3r4 b - - 0 1",
    solutionSans: ["Rd6"],
    goal: "draw",
    promptUk: "Чорні ходять і рятуються. Встановіть позицію Ванкури: тура атакує пішака a6 збоку.",
    promptEn: "Black to move and draw. Set up the Vancura position: the rook attacks the a6-pawn from the side.",
    themes: ["vancura", "rookEndgame"],
  },
  "ch-deep-rook-theory-exam-p6": {
    fen: "R7/6k1/P7/8/2K5/4r3/8/8 b - - 0 1",
    solutionSans: ["Re6"],
    goal: "draw",
    promptUk: "Чорні ходять і рятуються. Єдиний хід — тура на 6-ту горизонталь збоку від пішака.",
    promptEn: "Black to move and draw. The only move puts the rook on the 6th rank, beside the pawn.",
    themes: ["vancura", "rookEndgame"],
  },
  // Rook pawn: the king must race to the corner.
  "ch-d-rook-pawn-p1": {
    fen: "4k3/8/6K1/8/7P/8/8/8 b - - 0 1",
    solutionSans: ["Kf8"],
    goal: "draw",
    promptUk: "Чорні ходять і рятуються. Проти крайнього пішака король мусить встигнути в кут h8.",
    promptEn: "Black to move and draw. Against a rook pawn the king must reach the h8 corner in time.",
    themes: ["rookPawn", "pawnEndgame"],
  },
  "ch-deep-kp-theory-exam-p6": {
    fen: "5k2/8/6K1/8/7P/8/8/8 b - - 0 1",
    solutionSans: ["Kg8"],
    goal: "draw",
    promptUk: "Чорні ходять і рятуються: королем у кут.",
    promptEn: "Black to move and draw: king to the corner.",
    themes: ["rookPawn", "pawnEndgame"],
  },
  // Key squares / opposition: only one king move wins.
  "ch-d-key-squares-p1": {
    fen: "8/8/3k4/8/8/3PK3/8/8 w - - 0 1",
    solutionSans: ["Kd4"],
    goal: "best_move",
    promptUk: "Білі ходять і виграють. Король — попереду пішака: займіть опозицію на шляху до ключових полів.",
    promptEn: "White to move and win. King in front of the pawn: take the opposition on the way to the key squares.",
    themes: ["keySquares", "opposition", "pawnEndgame"],
  },
  "ch-d-kp-practice-p1": {
    fen: "8/8/4k3/8/8/2KP4/8/8 w - - 0 1",
    solutionSans: ["Kc4"],
    goal: "best_move",
    promptUk: "Білі ходять і виграють. Лише один хід королем веде до ключових полів.",
    promptEn: "White to move and win. Only one king move heads for the key squares.",
    themes: ["keySquares", "pawnEndgame"],
  },
  "ch-tct-21": {
    fen: "8/3k4/8/4K3/3P4/8/8/8 w - - 0 1",
    solutionSans: ["Kd5"],
    goal: "best_move",
    promptUk: "Білі ходять і виграють. Займіть пряму опозицію.",
    promptEn: "White to move and win. Take the direct opposition.",
    themes: ["opposition", "pawnEndgame"],
  },
  "ch-d-opp-types-p1": {
    fen: "8/4k3/8/8/8/8/2P2K2/8 w - - 0 1",
    solutionSans: ["Ke3"],
    goal: "best_move",
    promptUk: "Білі ходять і виграють. Візьміть дальню опозицію: та сама вертикаль, непарна кількість полів між королями.",
    promptEn: "White to move and win. Take the distant opposition: same file, an odd number of squares between the kings.",
    themes: ["opposition", "pawnEndgame"],
  },
  // KBN finale: unique forced mate in two (chess.js brute force), dark-squared bishop, h8 corner.
  "ch-d-kbn-mate-p1": {
    fen: "6k1/4BN2/6K1/8/8/8/8/8 w - - 0 1",
    solutionSans: ["Nh6+", "Kh8", "Bf6#"],
    goal: "mate",
    promptUk: "Фінал KBN: шах конем заганяє короля в кут h8, і слон ставить мат.",
    promptEn: "The KBN finale: a knight check drives the king into the h8 corner, and the bishop mates.",
    themes: ["bishopKnightMate", "mateIn2"],
  },
  "ch-deep-minor-end-exam-p6": {
    fen: "8/5K1k/6N1/6B1/8/8/8/8 w - - 0 1",
    solutionSans: ["Nf8+", "Kh8", "Bf6#"],
    goal: "mate",
    promptUk: "KBN: мат у 2 ходи в правильному куті.",
    promptEn: "KBN: mate in 2 in the right corner.",
    themes: ["bishopKnightMate", "mateIn2"],
  },
  // Saavedra: c8=Q? Rc4+ and …Rc5 stalemate ideas; c8=R wins.
  "ch-d-ep-promote-p2": {
    solutionSans: ["c8=R"],
    goal: "promote",
    themes: ["underPromotion", "promotion"],
  },
};

/** Exact FEN repeats that are deliberate reviews (allowed by the dedup gate). */
export const CHESS_REVIEWS: Record<string, string> = {
  "ch-p11": "ch-p1",
  "ch-tp2-2": "ch-p1",
  "ch-eg3": "ch-p4",
};

/**
 * QA waivers: historical lines and rules drills where an engine flag is expected.
 * The gate only accepts flags on these ids.
 */
export const CHESS_QA_WAIVERS: Record<string, string> = {
  "ch-d-evergreen-p1": "Historical game line (Anderssen–Dufresne 1852); taught as played.",
  "ch-d-immortal-p1": "Historical game line (Anderssen–Kieseritzky 1851); taught as played.",
  "ch-d-greco-p1": "Classic Greco pattern from a historical game; taught as played.",
  "ch-d-greco-p2": "Classic Greco pattern from a historical game; taught as played.",
  "ch-d-legal-p1": "Légal's mate: opening trap line, opponent replies are the instructive ones.",
  "ch-d-kasparov-topalov-p1": "Historical game line (Kasparov–Topalov 1999); taught as played.",
  "ch-d-ep-promote-p1": "Rules drill: en passant notation, not a best-move puzzle.",
};
