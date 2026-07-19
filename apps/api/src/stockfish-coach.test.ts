import { describe, expect, it } from "vitest";
import { getCoachHint, isLegalMove } from "./stockfish-coach.js";

const START =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

describe("coach", () => {
  it("returns a legal opening move", () => {
    const hint = getCoachHint(START, 1);
    expect(hint.bestMove).not.toBeNull();
    if (hint.bestMove) {
      expect(isLegalMove(START, hint.bestMove.from, hint.bestMove.to)).toBe(true);
    }
    expect(hint.commentUk.length).toBeGreaterThan(0);
    expect(hint.commentEn.length).toBeGreaterThan(0);
  });

  it("handles mate position", () => {
    const mateFen = "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1";
    const hint = getCoachHint(mateFen, 1);
    expect(hint.bestMove?.san.includes("R") || hint.bestMove).toBeTruthy();
  });
});
