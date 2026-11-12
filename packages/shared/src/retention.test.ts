import { describe, expect, it } from "vitest";
import {
  daysBetween,
  daysUntilRetention,
  estimateRetention,
  retentionSummary,
  stabilityDays,
} from "./retention.js";

describe("retention model", () => {
  it("stability grows with score and practice", () => {
    expect(stabilityDays({ bestScore: 0.9, attempts: 1 })).toBeGreaterThan(
      stabilityDays({ bestScore: 0.5, attempts: 1 }),
    );
    expect(stabilityDays({ bestScore: 0.9, attempts: 5 })).toBeGreaterThan(
      stabilityDays({ bestScore: 0.9, attempts: 1 }),
    );
  });

  it("leeches get shorter stability", () => {
    const leech = stabilityDays({ bestScore: 0.5, attempts: 6 });
    const normal = stabilityDays({ bestScore: 0.75, attempts: 6 });
    expect(leech).toBeLessThan(normal);
  });

  it("retention is 1 right after practice and decays", () => {
    const base = { bestScore: 0.8, attempts: 2 };
    expect(estimateRetention({ ...base, daysSince: 0 })).toBe(1);
    const d1 = estimateRetention({ ...base, daysSince: 1 });
    const d10 = estimateRetention({ ...base, daysSince: 10 });
    expect(d1).toBeLessThan(1);
    expect(d10).toBeLessThan(d1);
    expect(d10).toBeGreaterThanOrEqual(0);
  });

  it("handles bad input safely", () => {
    expect(stabilityDays({ bestScore: Number.NaN, attempts: -3 })).toBeGreaterThan(0);
    expect(estimateRetention({ bestScore: 2, attempts: 1, daysSince: -5 })).toBe(1);
  });

  it("dueInDays reaches 0 once retention is below target", () => {
    const base = { bestScore: 0.6, attempts: 1 };
    expect(daysUntilRetention({ ...base, daysSince: 0 })).toBeGreaterThan(0);
    expect(daysUntilRetention({ ...base, daysSince: 365 })).toBe(0);
  });

  it("summary uses lastPracticedAt", () => {
    const now = new Date("2026-10-28T00:00:00Z");
    const s = retentionSummary(
      { bestScore: 0.9, attempts: 3, lastPracticedAt: "2026-10-18T00:00:00Z" },
      now,
    );
    expect(daysBetween("2026-10-18T00:00:00Z", now)).toBe(10);
    expect(s.retentionPct).toBeGreaterThan(0);
    expect(s.retentionPct).toBeLessThan(100);
    expect(s.stabilityDays).toBeGreaterThan(1);
  });
});
