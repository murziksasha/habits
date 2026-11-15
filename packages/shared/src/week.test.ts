import { describe, expect, it } from "vitest";
import {
  COURSE_GROUP,
  COURSE_SLUGS,
  weeklyMinisRaceSlugs,
  weeklyMinisRaceXpBonus,
} from "./courses.js";
import { isoWeekBounds, isoWeekKey, previousWeekElapsedWindow } from "./week.js";

describe("iso week", () => {
  it("formats week key", () => {
    const key = isoWeekKey(new Date("2026-07-18T12:00:00Z"));
    expect(key).toMatch(/^2026-W\d{2}$/);
  });

  it("bounds cover Monday–Sunday UTC regardless of UTC midnight boundary", () => {
    // 2026-11-09 is Monday 00:05 UTC; in UTC-5 this is Sunday evening local time,
    // and 2026-11-15T23:30Z is Sunday night UTC (Monday morning in UTC+2).
    const monEarly = isoWeekBounds(new Date("2026-11-09T00:05:00Z"));
    const sunLate = isoWeekBounds(new Date("2026-11-15T23:30:00Z"));
    expect(monEarly.weekKey).toBe(sunLate.weekKey);
    expect(monEarly.startsAt.toISOString()).toBe("2026-11-09T00:00:00.000Z");
    expect(monEarly.endsAt.toISOString()).toBe("2026-11-15T23:59:59.999Z");
    expect(monEarly.startsAt.getUTCDay()).toBe(1);
    expect(sunLate.endsAt.getUTCDay()).toBe(0);
  });

  it("computes identical elapsed window for previous week", () => {
    const now = new Date("2026-11-12T06:15:00.000Z");
    const win = previousWeekElapsedWindow(now);
    expect(win.current.startsAt.toISOString()).toBe("2026-11-09T00:00:00.000Z");
    expect(win.previous.startsAt.toISOString()).toBe("2026-11-02T00:00:00.000Z");
    expect(win.previous.endsAt.toISOString()).toBe("2026-11-05T06:15:00.000Z");
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

describe("course groups", () => {
  it("isCourseSlug / listCourseRegistry", async () => {
    const { isCourseSlug, listCourseRegistry, parseCourseSlug } = await import("./courses.js");
    expect(isCourseSlug("programming")).toBe(true);
    expect(isCourseSlug("nope")).toBe(false);
    expect(parseCourseSlug("english")).toBe("english");
    expect(parseCourseSlug("x")).toBeNull();
    expect(listCourseRegistry().length).toBe(COURSE_SLUGS.length);
  });

  it("every COURSE_SLUGS has a group", () => {
    for (const s of COURSE_SLUGS) {
      expect(COURSE_GROUP[s]).toBeTruthy();
    }
    expect(COURSE_GROUP.programming).toBe("code");
    expect(COURSE_GROUP.css_layout).toBe("deep");
    expect(COURSE_GROUP.js_fundamentals).toBe("deep");
    expect(COURSE_GROUP.react_fundamentals).toBe("deep");
    expect(COURSE_GROUP.sql_fundamentals).toBe("deep");
    expect(COURSE_GROUP.node_fundamentals).toBe("deep");
    expect(COURSE_GROUP.express_fundamentals).toBe("deep");
    expect(COURSE_GROUP.embedded_cpp).toBe("deep");
    expect(COURSE_GROUP.english).toBe("skill");
  });
});
