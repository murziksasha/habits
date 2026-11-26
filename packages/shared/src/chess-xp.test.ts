import { describe, expect, it } from "vitest";
import { chessPuzzleXpAward } from "./xp.js";

describe("chessPuzzleXpAward", () => {
  it("full XP without hints", () => {
    expect(chessPuzzleXpAward(3, true)).toBe(25);
    expect(chessPuzzleXpAward(3, false)).toBe(20);
  });
  it("hint step 1 costs 30%, step 2 costs 60%", () => {
    expect(chessPuzzleXpAward(3, false, 1)).toBe(14);
    expect(chessPuzzleXpAward(3, false, 2)).toBe(8);
  });
  it("revealed solution gives 0 and hints are clamped", () => {
    expect(chessPuzzleXpAward(5, true, 0, true)).toBe(0);
    expect(chessPuzzleXpAward(3, false, 9)).toBe(8);
    expect(chessPuzzleXpAward(3, false, -4)).toBe(20);
  });
});
