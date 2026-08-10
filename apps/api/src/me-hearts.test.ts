import { describe, expect, it } from "vitest";
import {
  HEART_REGEN_MINUTES,
  isPaidPlan,
  maxHearts,
  minutesUntilHeartRegen,
  regenerateHearts,
  type Plan,
} from "@eduforge/shared";

/**
 * Contract helpers for GET /me/hearts chrome aggregation.
 */
describe("me hearts chrome contract", () => {
  it("premium reports unlimited max", () => {
    expect(isPaidPlan("premium")).toBe(true);
    expect(maxHearts("premium" as Plan)).toBeGreaterThanOrEqual(999);
  });

  it("free regen aligns with countdown helper", () => {
    const now = new Date("2026-08-04T12:00:00Z");
    const updated = new Date("2026-08-04T11:40:00Z");
    const regen = regenerateHearts({
      plan: "free",
      hearts: 2,
      heartsUpdatedAt: updated,
      now,
    });
    expect(regen.hearts).toBe(2); // 20 min < 30 cycle
    const mins = minutesUntilHeartRegen({
      hearts: regen.hearts,
      maxHearts: maxHearts("free"),
      heartsUpdatedAt: regen.heartsUpdatedAt,
      regenMinutes: HEART_REGEN_MINUTES,
      now,
    });
    expect(mins).toBe(10);
  });

  it("lowest hearts is the restrictive chrome signal", () => {
    const rows = [
      { hearts: 5, slug: "english" },
      { hearts: 1, slug: "programming" },
      { hearts: 3, slug: "chess" },
    ];
    const best = rows.reduce((a, b) => (b.hearts < a.hearts ? b : a));
    expect(best.slug).toBe("programming");
    expect(best.hearts).toBe(1);
  });
});
