import { describe, expect, it } from "vitest";
import { evaluatePuzzleMove, gradePuzzleLine, isPromotionMove, type PuzzleSpec } from "./puzzle.js";

const SAAVEDRA: PuzzleSpec = {
  fen: "8/2P5/8/8/3r4/8/2K5/k7 w - - 0 1",
  solutionSans: ["c8=R", "Ra4", "Kb3"],
  goal: "promote",
};
const THREE_MATES: PuzzleSpec = {
  fen: "7k/6p1/5QK1/8/8/8/8/8 w - - 0 1",
  solutionSans: ["Qxg7#"],
  goal: "mate",
};
const CLEARANCE: PuzzleSpec = {
  fen: "6k1/5ppp/8/8/4N3/8/4QPPP/6K1 w - - 0 1",
  solutionSans: ["Nf6+", "Kh8", "Qe8#"],
  goal: "mate",
};

describe("evaluatePuzzleMove", () => {
  it("accepts the main-line move and returns the opponent reply", () => {
    const r = evaluatePuzzleMove(SAAVEDRA, [], { from: "c7", to: "c8", promotion: "r" });
    expect(r).toMatchObject({ ok: true, san: "c8=R", done: false, nextOpponentSan: "Ra4" });
  });

  it("rejects the queen promotion in Saavedra (stalemate trap)", () => {
    const r = evaluatePuzzleMove(SAAVEDRA, [], { from: "c7", to: "c8", promotion: "q" });
    expect(r).toEqual({ ok: false, reason: "wrong" });
  });

  it("finishes after the learner's last ply", () => {
    const r = evaluatePuzzleMove(SAAVEDRA, ["c8=R", "Ra4"], "Kb3");
    expect(r).toMatchObject({ ok: true, done: true, alternative: false });
  });

  it("accepts any checkmate as a solution", () => {
    for (const san of ["Qxg7#", "Qd8#", "Qf8#"]) {
      const r = evaluatePuzzleMove(THREE_MATES, [], san);
      expect(r, san).toMatchObject({ ok: true, done: true });
    }
  });

  it("accepts precomputed alternatives on the main line", () => {
    const spec: PuzzleSpec = { ...SAAVEDRA, acceptedAlternatives: { 0: ["Kb3"] } };
    // Kb3 is not winning in reality; this only checks the mechanism.
    expect(evaluatePuzzleMove(spec, [], "Kb3")).toMatchObject({ ok: true, done: true, alternative: true });
    expect(evaluatePuzzleMove(spec, [], "Kc1")).toEqual({ ok: false, reason: "wrong" });
  });

  it("follows an alternative line with its own opponent reply", () => {
    const spec: PuzzleSpec = { ...CLEARANCE, alternativeLines: [["Nd6", "h6"]] };
    // The alternative line continues with its own reply.
    const r = evaluatePuzzleMove(spec, [], "Nd6");
    expect(r).toMatchObject({ ok: true, done: false, nextOpponentSan: "h6", alternative: true });
  });

  it("rejects a wrong move and an opponent-side move", () => {
    expect(evaluatePuzzleMove(CLEARANCE, [], "Qe3")).toEqual({ ok: false, reason: "wrong" });
    expect(evaluatePuzzleMove(CLEARANCE, [], "Kh8")).toEqual({ ok: false, reason: "illegal" });
    expect(evaluatePuzzleMove(CLEARANCE, ["Nf6+"], "Kh8")).toEqual({ ok: false, reason: "not_your_turn" });
  });

  it("detects promotion moves", () => {
    expect(isPromotionMove(SAAVEDRA.fen, "c7", "c8")).toBe(true);
    expect(isPromotionMove(SAAVEDRA.fen, "c2", "b3")).toBe(false);
  });
});

describe("gradePuzzleLine", () => {
  it("grades a full line with the opponent reply", () => {
    expect(gradePuzzleLine(SAAVEDRA, ["c8=R", "Ra4", "Kb3"])).toMatchObject({ solved: true, playerSans: ["c8=R", "Kb3"] });
  });

  it("accepts an alternative mate in one", () => {
    expect(gradePuzzleLine(THREE_MATES, ["Qd8#"])).toMatchObject({ solved: true, alternativesUsed: 1 });
  });

  it("rejects a forged opponent reply", () => {
    expect(gradePuzzleLine(CLEARANCE, ["Nf6+", "gxf6", "Qe8#"]).solved).toBe(false);
    expect(gradePuzzleLine(CLEARANCE, ["Nf6+", "gxf6", "Qe8#"]).error).toBe("opponent_mismatch");
  });

  it("rejects illegal, incomplete, and padded lines", () => {
    expect(gradePuzzleLine(SAAVEDRA, ["c8=Q"]).solved).toBe(false);
    expect(gradePuzzleLine(SAAVEDRA, ["c8=R", "Ra4"]).error).toBe("incomplete");
    expect(gradePuzzleLine(THREE_MATES, ["Qd8#", "Kh7"]).solved).toBe(false);
    expect(gradePuzzleLine(SAAVEDRA, "c8=R").solved).toBe(false);
    expect(gradePuzzleLine(SAAVEDRA, []).solved).toBe(false);
  });
});
