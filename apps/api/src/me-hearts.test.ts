import { describe, expect, it } from "vitest";
import {
  canStartLesson,
  HEART_REGEN_MINUTES,
  maxHearts,
  minutesUntilHeartRegen,
  regenerateHearts,
} from "@eduforge/shared";

/**
 * Contract helpers for GET /me/hearts.
 */
describe("me hearts contract", () => {
  it("lesson access never blocked by hearts", () => {
    expect(canStartLesson({ hearts: 0 })).toBe(true);
  });

  it("free regen aligns with countdown helper", () => {
    const now = new Date("2026-08-04T12:00:00Z");
    const updated = new Date("2026-08-04T11:40:00Z");
    const regen = regenerateHearts({
      hearts: 2,
      heartsUpdatedAt: updated,
      now,
    });
    expect(regen.hearts).toBe(2); // 20 min < 30 cycle
    const mins = minutesUntilHeartRegen({
      hearts: regen.hearts,
      maxHearts: maxHearts(),
      heartsUpdatedAt: regen.heartsUpdatedAt,
      regenMinutes: HEART_REGEN_MINUTES,
      now,
    });
    expect(mins).toBe(10);
  });

  it("lowest hearts is the restrictive signal", () => {
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
