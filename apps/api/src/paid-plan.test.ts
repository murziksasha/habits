import { describe, expect, it } from "vitest";
import { isPaidPlan, maxHearts, canAccessLesson } from "@eduforge/shared";

describe("paid plan gates (family + premium)", () => {
  it("family unlocks hearts and freemium lessons", () => {
    expect(isPaidPlan("family")).toBe(true);
    expect(maxHearts("family")).toBe(999);
    expect(canAccessLesson({ plan: "family", lessonIndexInCourse: 99 })).toBe(true);
    expect(canAccessLesson({ plan: "free", lessonIndexInCourse: 99 })).toBe(false);
  });
});
