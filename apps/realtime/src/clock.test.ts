import { describe, expect, it } from "vitest";
import { clockState, pliesOf, sideToMove, timeoutOutcome } from "./clock.js";

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const AFTER_E4 = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1";

describe("clock", () => {
  it("drains only the side to move", () => {
    const g = { fen: AFTER_E4, pgn: "e4", whiteTimeMs: 60_000, blackTimeMs: 60_000, lastMoveAt: new Date(1_000) };
    const c = clockState(g, 11_000);
    expect(c).toEqual({ turn: "b", whiteTimeMs: 60_000, blackTimeMs: 50_000, flagged: null });
  });
  it("flags at zero", () => {
    const g = { fen: START, pgn: "", whiteTimeMs: 5_000, blackTimeMs: 60_000, lastMoveAt: new Date(0) };
    expect(clockState(g, 5_000).flagged).toBe("w");
    expect(clockState(g, 4_999).flagged).toBeNull();
  });
  it("ignores negative elapsed (clock skew)", () => {
    const g = { fen: START, pgn: "", whiteTimeMs: 5_000, blackTimeMs: 5_000, lastMoveAt: new Date(10_000) };
    expect(clockState(g, 0).whiteTimeMs).toBe(5_000);
  });
  it("aborts before both sides moved, otherwise the flagged side loses", () => {
    expect(timeoutOutcome("w", 0)).toEqual({ kind: "abort" });
    expect(timeoutOutcome("b", 1)).toEqual({ kind: "abort" });
    expect(timeoutOutcome("w", 2)).toEqual({ kind: "finish", result: "0-1" });
    expect(timeoutOutcome("b", 7)).toEqual({ kind: "finish", result: "1-0" });
  });
  it("helpers", () => {
    expect(sideToMove(AFTER_E4)).toBe("b");
    expect(pliesOf("e4 e5 Nf3")).toBe(3);
    expect(pliesOf(null)).toBe(0);
  });
});
