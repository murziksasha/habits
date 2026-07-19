import { describe, expect, it } from "vitest";
import {
  addStreakFreezes,
  applyStreakOnActivity,
  MAX_STREAK_FREEZES,
} from "./streak.js";

describe("applyStreakOnActivity", () => {
  it("same day keeps streak", () => {
    const r = applyStreakOnActivity({
      lastActiveDate: "2026-07-18",
      today: "2026-07-18",
      streakDays: 5,
      streakFreezes: 2,
    });
    expect(r.sameDay).toBe(true);
    expect(r.streakDays).toBe(5);
    expect(r.streakFreezes).toBe(2);
  });

  it("consecutive day increments", () => {
    const r = applyStreakOnActivity({
      lastActiveDate: "2026-07-17",
      today: "2026-07-18",
      streakDays: 5,
      streakFreezes: 1,
    });
    expect(r.streakDays).toBe(6);
    expect(r.protected).toBe(false);
    expect(r.streakFreezes).toBe(1);
  });

  it("gap with shield protects", () => {
    const r = applyStreakOnActivity({
      lastActiveDate: "2026-07-15",
      today: "2026-07-18",
      streakDays: 10,
      streakFreezes: 2,
    });
    expect(r.protected).toBe(true);
    expect(r.streakDays).toBe(10);
    expect(r.streakFreezes).toBe(1);
    expect(r.reset).toBe(false);
  });

  it("gap without shield resets", () => {
    const r = applyStreakOnActivity({
      lastActiveDate: "2026-07-10",
      today: "2026-07-18",
      streakDays: 10,
      streakFreezes: 0,
    });
    expect(r.reset).toBe(true);
    expect(r.streakDays).toBe(1);
  });

  it("first activity starts at 1", () => {
    const r = applyStreakOnActivity({
      lastActiveDate: null,
      today: "2026-07-18",
      streakDays: 0,
      streakFreezes: 0,
    });
    expect(r.streakDays).toBe(1);
  });
});

describe("addStreakFreezes", () => {
  it("caps at MAX", () => {
    expect(addStreakFreezes(4, 3)).toBe(MAX_STREAK_FREEZES);
    expect(addStreakFreezes(0, 2)).toBe(2);
  });
});
