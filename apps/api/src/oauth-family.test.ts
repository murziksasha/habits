import { describe, expect, it } from "vitest";
import {
  FAMILY_DEFAULT_SEATS,
  canAccessLesson,
  canStartLesson,
} from "@eduforge/shared";

describe("oauth/family contracts", () => {
  it("default family seats", () => {
    expect(FAMILY_DEFAULT_SEATS).toBeGreaterThanOrEqual(2);
  });

  it("free access rules apply to family members", () => {
    expect(canAccessLesson({ plan: "free", lessonIndexInCourse: 10 })).toBe(true);
    expect(canStartLesson({ plan: "free", hearts: 0 })).toBe(true);
  });
});
