import { describe, expect, it } from "vitest";
import { capturedFromHistory } from "./captured-pieces";

describe("capturedFromHistory", () => {
  it("counts captures from history with material difference", () => {
    const c = capturedFromHistory(null, ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qxg2"]);
    expect(c.byWhite).toEqual(["p"]);
    expect(c.byBlack).toEqual(["p", "p"]);
    expect(c.diff).toBe(-1);
  });
  it("promotion counts as material gained, not a missing pawn", () => {
    const c = capturedFromHistory("8/4P3/8/8/8/2k5/8/K7 w - - 0 1", ["e8=Q"]);
    expect(c.byWhite).toEqual([]);
    expect(c.diff).toBe(8);
  });
});
