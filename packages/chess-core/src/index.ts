import { Chess, type Square } from "chess.js";

export type MoveInput = {
  from: string;
  to: string;
  promotion?: "q" | "r" | "b" | "n";
};

export function createGame(fen?: string): Chess {
  return fen ? new Chess(fen) : new Chess();
}

export function applyMove(fen: string, move: MoveInput): {
  ok: true;
  fen: string;
  san: string;
  over: boolean;
  result: "1-0" | "0-1" | "1/2-1/2" | null;
} | { ok: false; error: string } {
  try {
    const game = new Chess(fen);
    const result = game.move({
      from: move.from as Square,
      to: move.to as Square,
      promotion: move.promotion,
    });
    if (!result) return { ok: false, error: "illegal_move" };

    let gameResult: "1-0" | "0-1" | "1/2-1/2" | null = null;
    if (game.isGameOver()) {
      if (game.isCheckmate()) {
        gameResult = game.turn() === "w" ? "0-1" : "1-0";
      } else {
        gameResult = "1/2-1/2";
      }
    }

    return {
      ok: true,
      fen: game.fen(),
      san: result.san,
      over: game.isGameOver(),
      result: gameResult,
    };
  } catch {
    return { ok: false, error: "illegal_move" };
  }
}

export function isPuzzleSolved(startFen: string, solutionSans: string[], playedSans: string[]): boolean {
  if (playedSans.length < solutionSans.length) return false;
  return solutionSans.every((san, i) => normalizeSan(playedSans[i] ?? "") === normalizeSan(san));
}

function normalizeSan(san: string): string {
  return san.replace(/[+#]/g, "").trim();
}

export function tryPuzzleMove(
  fen: string,
  move: MoveInput,
  expectedSan: string,
): { ok: true; fen: string; san: string } | { ok: false; error: string } {
  const applied = applyMove(fen, move);
  if (!applied.ok) return applied;
  if (normalizeSan(applied.san) !== normalizeSan(expectedSan)) {
    return { ok: false, error: "wrong_move" };
  }
  return { ok: true, fen: applied.fen, san: applied.san };
}

export { Chess };
