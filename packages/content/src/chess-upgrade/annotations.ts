/**
 * Authored hints and explanations (Phase 2). Template explanations for the remaining
 * puzzles are produced by chess-explanation-templates.ts at load time.
 */
import type { ChessPuzzleExercise } from "../types.js";

export type PuzzleAnnotation = Partial<
  Pick<
    ChessPuzzleExercise,
    "themes" | "hintUk" | "hintEn" | "hintPiece" | "hintSquare" | "hintSquareUk" | "hintSquareEn" | "explanationUk" | "explanationEn" | "explanationKind" | "plyExplanations" | "source"
  >
>;

export const CHESS_ANNOTATIONS: Record<string, PuzzleAnnotation> = {};
