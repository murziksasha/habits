import { describe, expect, it } from "vitest";
import {
  canAccessLesson,
  canPlayRatedChess,
  canStartLesson,
  maxHearts,
  regenerateHearts,
} from "./entitlements.js";

describe("canAccessLesson", () => {
  it("allows premium any index", () => {
    expect(canAccessLesson({ plan: "premium", lessonIndexInCourse: 99 })).toBe(true);
  });

  it("allows free first 5 only", () => {
    expect(canAccessLesson({ plan: "free", lessonIndexInCourse: 0 })).toBe(true);
    expect(canAccessLesson({ plan: "free", lessonIndexInCourse: 4 })).toBe(true);
    expect(canAccessLesson({ plan: "free", lessonIndexInCourse: 5 })).toBe(false);
  });
});

describe("hearts", () => {
  it("max hearts by plan", () => {
    expect(maxHearts("free")).toBe(5);
    expect(maxHearts("premium")).toBe(999);
  });

  it("blocks free users with zero hearts", () => {
    expect(canStartLesson({ plan: "free", hearts: 0 })).toBe(false);
    expect(canStartLesson({ plan: "free", hearts: 1 })).toBe(true);
    expect(canStartLesson({ plan: "premium", hearts: 0 })).toBe(true);
  });

  it("regens about 1 heart per 30 minutes", () => {
    const past = new Date(Date.now() - 65 * 60 * 1000);
    const r = regenerateHearts({
      plan: "free",
      hearts: 1,
      heartsUpdatedAt: past,
    });
    expect(r.hearts).toBe(3);
    expect(r.changed).toBe(true);
  });

  it("does not exceed max", () => {
    const past = new Date(Date.now() - 10 * 60 * 60 * 1000);
    const r = regenerateHearts({
      plan: "free",
      hearts: 4,
      heartsUpdatedAt: past,
    });
    expect(r.hearts).toBe(5);
  });
});

describe("rated chess quota", () => {
  it("limits free plan", () => {
    expect(canPlayRatedChess({ plan: "free", ratedGamesToday: 4 })).toBe(true);
    expect(canPlayRatedChess({ plan: "free", ratedGamesToday: 5 })).toBe(false);
    expect(canPlayRatedChess({ plan: "premium", ratedGamesToday: 100 })).toBe(true);
  });
});
