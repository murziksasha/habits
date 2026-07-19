import { describe, expect, it } from "vitest";
import { weeklyMinisRaceSlugs, weeklyMinisRaceXpBonus } from "./courses.js";
import { isoWeekBounds, isoWeekKey } from "./week.js";

describe("iso week", () => {
  it("formats week key", () => {
    const key = isoWeekKey(new Date("2026-07-18T12:00:00Z"));
    expect(key).toMatch(/^2026-W\d{2}$/);
  });

  it("bounds cover Monday–Sunday UTC", () => {
    const { startsAt, endsAt, weekKey } = isoWeekBounds(new Date("2026-07-18T12:00:00Z"));
    expect(startsAt.getUTCDay()).toBe(1); // Monday
    expect(endsAt.getTime()).toBeGreaterThan(startsAt.getTime());
    expect(weekKey).toBe(isoWeekKey(new Date("2026-07-18T12:00:00Z")));
  });
});

describe("weekly minis race", () => {
  it("picks 3 mini slugs per week", () => {
    const ids = weeklyMinisRaceSlugs("2026-W28");
    expect(ids.length).toBe(3);
    expect(new Set(ids).size).toBe(3);
  });

  it("bonus only top 3", () => {
    expect(weeklyMinisRaceXpBonus(1)).toBe(30);
    expect(weeklyMinisRaceXpBonus(3)).toBe(12);
    expect(weeklyMinisRaceXpBonus(4)).toBe(0);
  });
});
