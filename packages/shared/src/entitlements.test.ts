import { describe, expect, it } from "vitest";
import {
  accessMatrix,
  canAccessLesson,
  canPlayRatedChess,
  canStartLesson,
  maxHearts,
  regenerateHearts,
} from "./entitlements.js";

describe("canAccessLesson", () => {
  it("allows all plans at any lesson index", () => {
    expect(canAccessLesson({ plan: "premium", lessonIndexInCourse: 99 })).toBe(true);
    expect(canAccessLesson({ plan: "free", lessonIndexInCourse: 0 })).toBe(true);
    expect(canAccessLesson({ plan: "free", lessonIndexInCourse: 4 })).toBe(true);
    expect(canAccessLesson({ plan: "free", lessonIndexInCourse: 5 })).toBe(true);
    expect(canAccessLesson({ plan: "free", lessonIndexInCourse: 99 })).toBe(true);
  });
});

describe("hearts", () => {
  it("uses one heart cap for every account", () => {
    expect(maxHearts("free")).toBe(5);
    expect(maxHearts("premium")).toBe(5);
    expect(maxHearts("family")).toBe(5);
  });

  it("canStartLesson always returns true", () => {
    expect(canStartLesson({ plan: "free", hearts: 0 })).toBe(true);
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
  it("always allows rated chess for every plan", () => {
    expect(canPlayRatedChess({ plan: "free", ratedGamesToday: 4 })).toBe(true);
    expect(canPlayRatedChess({ plan: "free", ratedGamesToday: 5 })).toBe(true);
    expect(canPlayRatedChess({ plan: "free", ratedGamesToday: 100 })).toBe(true);
    expect(canPlayRatedChess({ plan: "premium", ratedGamesToday: 100 })).toBe(true);
  });
});

describe("access matrix", () => {
  it("opens lessons and rated chess and keeps a shared heart cap", () => {
    const m = accessMatrix();
    expect(m.lessons).toBe("all");
    expect(m.hearts).toBe(5);
    expect(m.heartRegenMinutes).toBeGreaterThan(0);
    expect(m.ratedChessPerDay).toBe("unlimited");
    expect(m.hintsPerDay).toBe("unlimited");
  });
});
