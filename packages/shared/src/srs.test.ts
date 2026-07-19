import { describe, expect, it } from "vitest";
import { applySrsRating, defaultSrsState } from "./srs.js";

describe("applySrsRating", () => {
  it("resets on again", () => {
    const s = applySrsRating(
      { ease: 250, intervalDays: 10, repetitions: 5, lapses: 0 },
      1,
    );
    expect(s.repetitions).toBe(0);
    expect(s.nextIntervalDays).toBe(0);
    expect(s.lapses).toBe(1);
  });

  it("schedules first good review for 1 day", () => {
    const s = applySrsRating(defaultSrsState(), 3);
    expect(s.repetitions).toBe(1);
    expect(s.nextIntervalDays).toBe(1);
  });

  it("grows interval after several goods", () => {
    let st = defaultSrsState();
    for (let i = 0; i < 4; i++) {
      const n = applySrsRating(st, 3);
      st = {
        ease: n.ease,
        intervalDays: n.intervalDays,
        repetitions: n.repetitions,
        lapses: n.lapses,
      };
    }
    expect(st.intervalDays).toBeGreaterThanOrEqual(3);
  });
});
