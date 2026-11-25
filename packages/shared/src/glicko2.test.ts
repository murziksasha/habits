import { describe, expect, it } from "vitest";
import {
  chessReviewIntervalDays,
  chessSrsNext,
  glicko2Update,
  puzzleAttemptScore,
  puzzleRatingFromDifficulty,
  GLICKO2_DEFAULT,
} from "./glicko2.js";

describe("glicko2", () => {
  it("matches Glickman's reference example", () => {
    const r = glicko2Update(
      { rating: 1500, rd: 200, volatility: 0.06 },
      [
        { rating: 1400, rd: 30, score: 1 },
        { rating: 1550, rd: 100, score: 0 },
        { rating: 1700, rd: 300, score: 0 },
      ],
      0.5,
      { clampRd: false },
    );
    expect(r.rating).toBeCloseTo(1464.06, 1);
    expect(r.rd).toBeCloseTo(151.52, 1);
    expect(r.volatility).toBeCloseTo(0.05999, 4);
  });

  it("no games only inflates RD", () => {
    const r = glicko2Update({ rating: 1500, rd: 200, volatility: 0.06 }, []);
    expect(r.rating).toBe(1500);
    expect(r.rd).toBeGreaterThan(200);
  });

  it("RD drops below 120 after 30 puzzles near the learner's level", () => {
    let p = { ...GLICKO2_DEFAULT };
    for (let i = 0; i < 30; i++) {
      p = glicko2Update(p, [{ rating: p.rating + (i % 2 ? 100 : -100), rd: 150, score: i % 3 === 0 ? 0 : 1 }]);
    }
    expect(p.rd).toBeLessThan(120);
  });

  it("difficulty seeds and scores", () => {
    expect(puzzleRatingFromDifficulty(1)).toBe(800);
    expect(puzzleRatingFromDifficulty(5)).toBe(1800);
    expect(puzzleAttemptScore({ solved: true, firstTry: true, hintsUsed: 0, revealed: false })).toBe(1);
    expect(puzzleAttemptScore({ solved: true, firstTry: false, hintsUsed: 0, revealed: false })).toBe(0.5);
    expect(puzzleAttemptScore({ solved: true, firstTry: true, hintsUsed: 1, revealed: false })).toBe(0.5);
    expect(puzzleAttemptScore({ solved: false, firstTry: true, hintsUsed: 0, revealed: true })).toBe(0);
  });

  it("chess review ladder 1/3/7/21", () => {
    expect([0, 1, 2, 3, 9].map(chessReviewIntervalDays)).toEqual([1, 3, 7, 21, 21]);
  });

  it("chess SRS climbs 1/3/7/21 and resets on a miss", () => {
    let st = chessSrsNext(null, false);
    expect(st).toEqual({ repetitions: 0, lapses: 0, intervalDays: 1 });
    const days: number[] = [];
    for (let i = 0; i < 5; i++) {
      st = chessSrsNext(st, true);
      days.push(st.intervalDays);
    }
    // Miss → due in 1 day, then 3 → 7 → 21.
    expect(days).toEqual([3, 7, 21, 21, 21]);
    st = chessSrsNext(st, false);
    expect(st).toEqual({ repetitions: 0, lapses: 1, intervalDays: 1 });
  });
});
