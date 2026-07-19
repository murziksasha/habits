import { describe, expect, it } from "vitest";
import { applyMove, createGame, isPuzzleSolved, tryPuzzleMove } from "./index.js";

const START =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

describe("createGame", () => {
  it("starts from default position", () => {
    const g = createGame();
    expect(g.fen()).toContain("rnbqkbnr");
  });
});

describe("applyMove", () => {
  it("applies legal e4", () => {
    const r = applyMove(START, { from: "e2", to: "e4" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.san).toBe("e4");
      expect(r.over).toBe(false);
      expect(r.result).toBeNull();
    }
  });

  it("rejects illegal move", () => {
    const r = applyMove(START, { from: "e2", to: "e5" });
    expect(r.ok).toBe(false);
  });

  it("detects checkmate", () => {
    const mateFen = "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1";
    const m = applyMove(mateFen, { from: "e1", to: "e8" });
    expect(m.ok).toBe(true);
    if (m.ok) {
      expect(m.over).toBe(true);
      expect(m.result).toBe("1-0");
    }
  });
});

describe("puzzles", () => {
  it("isPuzzleSolved compares SAN ignoring markers", () => {
    expect(isPuzzleSolved(START, ["Re8#"], ["Re8"])).toBe(true);
    expect(isPuzzleSolved(START, ["Re8#"], ["Re7"])).toBe(false);
  });

  it("tryPuzzleMove accepts correct SAN", () => {
    const fen = "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1";
    const r = tryPuzzleMove(fen, { from: "e1", to: "e8" }, "Re8#");
    expect(r.ok).toBe(true);
  });

  it("tryPuzzleMove rejects wrong move", () => {
    const fen = "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1";
    const r = tryPuzzleMove(fen, { from: "e1", to: "e2" }, "Re8#");
    expect(r.ok).toBe(false);
  });
});
