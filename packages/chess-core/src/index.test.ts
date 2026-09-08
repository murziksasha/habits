import { describe, expect, it } from "vitest";
import {
  applyFischerIncrement,
  applyMove,
  createGame,
  gameTermination,
  isChessSquare,
  isPuzzleSolved,
  tryPuzzleMove,
} from "./index.js";

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

describe("move validation", () => {
  it("rejects non-square / oversized from-to", () => {
    expect(isChessSquare("e4")).toBe(true);
    expect(isChessSquare("e4e4e4e4e4")).toBe(false);
    const r = applyMove(START, { from: "e2".repeat(40), to: "e4" });
    expect(r.ok).toBe(false);
  });
});

describe("draw rules", () => {
  it("K vs K is insufficient material", () => {
    const t = gameTermination("8/8/8/4k3/8/4K3/8/8 w - - 0 1");
    expect(t.over).toBe(true);
    expect(t.reason).toBe("insufficient");
    expect(t.result).toBe("1/2-1/2");
  });

  it("K+N vs K is insufficient material", () => {
    const t = gameTermination("8/8/8/4k3/8/4K3/4N3/8 w - - 0 1");
    expect(t.reason).toBe("insufficient");
  });

  it("50-move (halfmove 100) is a draw", () => {
    const t = gameTermination("8/8/8/4k3/4p3/8/4K3/8 w - - 100 80");
    expect(t.over).toBe(true);
    expect(t.reason).toBe("fifty");
  });

  it("en passant that would leave king in check is illegal (pin)", () => {
    // Rook on e7 pins the e5 pawn; capturing en passant would open the e-file.
    const fen = "4k3/4r3/8/3pP3/8/8/8/4K3 w - d6 0 1";
    const r = applyMove(fen, { from: "e5", to: "d6" });
    expect(r.ok).toBe(false);
  });
});

describe("Fischer increment", () => {
  it("adds increment after a move", () => {
    expect(applyFischerIncrement(60_000, 2_000)).toBe(62_000);
    expect(applyFischerIncrement(0, 3_000)).toBe(3_000);
  });
});
