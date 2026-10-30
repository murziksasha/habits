import { describe, expect, it } from "vitest";
import {
  applyFischerIncrement,
  applyMove,
  checkInfo,
  createGame,
  destinations,
  exploreDestinations,
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

describe("checkInfo", () => {
  it("queen check names one attacker", () => {
    const fen = "k3q3/8/8/8/8/8/8/4K3 w - - 0 1";
    const info = checkInfo(fen);
    expect(info.inCheck).toBe(true);
    expect(info.king).toBe("e1");
    expect(info.attackers).toEqual([{ square: "e8", type: "q" }]);
    expect(info.double).toBe(false);
  });

  it("double check returns two", () => {
    const fen = "k3r3/8/8/b7/8/8/8/4K3 w - - 0 1";
    const info = checkInfo(fen);
    expect(info.inCheck).toBe(true);
    expect(info.king).toBe("e1");
    expect(info.attackers).toHaveLength(2);
    expect(info.double).toBe(true);
    const squares = info.attackers.map((a) => a.square).sort();
    expect(squares).toEqual(["a5", "e8"]);
  });

  it("a pinned piece is not listed as an attacker when it does not attack the king", () => {
    const fen = "4k3/4q3/6B1/7r/8/8/8/4K3 w - - 0 1";
    const info = checkInfo(fen);
    expect(info.inCheck).toBe(true);
    expect(info.attackers).toEqual([{ square: "e7", type: "q" }]);
  });

  it("returns inCheck: false on quiet position", () => {
    const info = checkInfo(START);
    expect(info.inCheck).toBe(false);
    expect(info.attackers).toEqual([]);
    expect(info.double).toBe(false);
  });
});

describe("destinations", () => {
  it("no castle dot while the king is in check. Castle dot on the king destination when legal.", () => {
    const checkFen = "k3q3/8/8/8/8/8/8/R3K2R w KQkq - 0 1";
    const destsInCheck = destinations(checkFen, "e1");
    const targetSquaresInCheck = destsInCheck.map((d) => d.to);
    expect(targetSquaresInCheck).not.toContain("g1");
    expect(targetSquaresInCheck).not.toContain("c1");

    const quietFen = "4k3/8/8/8/8/8/8/R3K2R w KQkq - 0 1";
    const destsQuiet = destinations(quietFen, "e1");
    const targetSquaresQuiet = destsQuiet.map((d) => d.to);
    expect(targetSquaresQuiet).toContain("g1");
    expect(targetSquaresQuiet).toContain("c1");
    const g1Dest = destsQuiet.find((d) => d.to === "g1");
    expect(g1Dest?.capture).toBe(false);
  });

  it("en passant destination is a capture", () => {
    const epFen = "4k3/8/8/3pP3/8/8/8/4K3 w - d6 0 1";
    const dests = destinations(epFen, "e5");
    const epDest = dests.find((d) => d.to === "d6");
    expect(epDest).toBeDefined();
    expect(epDest?.capture).toBe(true);
  });
});

describe("exploreDestinations", () => {
  it("explore returns moves for the side not to move on a quiet diagram", () => {
    const dests = exploreDestinations(START, "e7");
    expect(dests.length).toBeGreaterThan(0);
    const toSquares = dests.map((d) => d.to);
    expect(toSquares).toContain("e6");
    expect(toSquares).toContain("e5");
  });

  it("returns [] when the swapped FEN is illegal", () => {
    const illegalSwapFen = "4k3/8/8/8/8/8/4q3/4K3 w - - 0 1";
    const dests = exploreDestinations(illegalSwapFen, "e2");
    expect(dests).toEqual([]);
  });
});
