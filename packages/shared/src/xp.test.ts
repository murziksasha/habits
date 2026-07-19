import { describe, expect, it } from "vitest";
import { applyElo, DEFAULT_ELO, expectedScore } from "./chess-rating.js";
import { regenerateHearts } from "./entitlements.js";
import {
  chessGameXpAward,
  globalXpFromCourseGain,
  lessonXpAward,
  levelFromXp,
  logicXpAward,
  readingXpAward,
  typingXpAward,
  xpForLevel,
  xpProgressInLevel,
} from "./xp.js";

describe("xp levels", () => {
  it("level 1 at 0 xp", () => {
    expect(levelFromXp(0)).toBe(1);
    expect(xpForLevel(1)).toBe(0);
  });

  it("levels up with more xp", () => {
    expect(levelFromXp(xpForLevel(5))).toBe(5);
    expect(levelFromXp(xpForLevel(5) - 1)).toBe(4);
  });

  it("progress ratio is between 0 and 1", () => {
    const p = xpProgressInLevel(50);
    expect(p.ratio).toBeGreaterThanOrEqual(0);
    expect(p.ratio).toBeLessThanOrEqual(1);
    expect(p.needed).toBeGreaterThan(0);
  });

  it("awards positive lesson xp", () => {
    expect(lessonXpAward({ accuracy: 1, firstClear: true })).toBeGreaterThan(15);
    expect(lessonXpAward({ accuracy: 0, firstClear: false })).toBeGreaterThan(0);
  });

  it("typing / reading / logic / chess awards", () => {
    expect(typingXpAward(40, 0.95)).toBeGreaterThan(typingXpAward(20, 0.5));
    expect(readingXpAward(300, 1)).toBeGreaterThan(readingXpAward(100, 0.2));
    expect(logicXpAward(3, false)).toBeGreaterThan(logicXpAward(3, true));
    expect(chessGameXpAward("win", true)).toBeGreaterThan(chessGameXpAward("loss", false));
  });

  it("global weight multiplies", () => {
    expect(globalXpFromCourseGain(10, 1.1)).toBe(11);
  });
});

describe("elo", () => {
  it("equal ratings expected 0.5", () => {
    expect(expectedScore(1500, 1500)).toBeCloseTo(0.5);
  });

  it("winner gains rating", () => {
    const { whiteDelta, blackDelta } = applyElo(1000, 1000, "1-0");
    expect(whiteDelta).toBeGreaterThan(0);
    expect(blackDelta).toBeLessThan(0);
  });

  it("draw keeps near zero for equals", () => {
    const { whiteDelta, blackDelta } = applyElo(DEFAULT_ELO, DEFAULT_ELO, "1/2-1/2");
    expect(whiteDelta).toBe(0);
    expect(blackDelta).toBe(0);
  });
});

describe("hearts smoke", () => {
  it("premium always full", () => {
    const r = regenerateHearts({
      plan: "premium",
      hearts: 0,
      heartsUpdatedAt: new Date(),
    });
    expect(r.hearts).toBe(999);
  });
});
