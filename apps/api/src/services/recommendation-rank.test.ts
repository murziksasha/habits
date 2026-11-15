import { describe, expect, it } from "vitest";
import { applyFocusPriority, focusCourseSlug } from "./recommendation-rank.js";

describe("focus-course recommendations", () => {
  it("chooses the course with the latest passed lesson", () => {
    const slug = focusCourseSlug(
      [
        { slug: "english", courseId: "en", lastLessonId: "old", completedLessons: 40 },
        { slug: "electrical_engineering", courseId: "ee", lastLessonId: "new", completedLessons: 2 },
      ],
      [
        { courseId: "en", completedAt: new Date("2026-01-01") },
        { courseId: "ee", completedAt: new Date("2026-11-01") },
      ],
    );
    expect(slug).toBe("electrical_engineering");
  });

  it("keeps the open course ahead of placement and programming races", () => {
    const ranked = applyFocusPriority(
      [
        { kind: "placement", priority: 15, href: "/placement" },
        { kind: "programming_mini_race", priority: 18, href: "/programming" },
        {
          kind: "continue_course",
          priority: 12,
          href: "/courses/electrical_engineering/lessons/1",
          meta: { courseSlug: "electrical_engineering" },
        },
        {
          kind: "review_weak",
          priority: 20,
          href: "/courses/electrical_engineering/lessons/2",
          meta: { courseSlug: "electrical_engineering" },
        },
        {
          kind: "spaced_review",
          priority: 14,
          href: "/courses/electrical_engineering/lessons/3",
          meta: { courseSlug: "electrical_engineering" },
        },
        {
          kind: "explore_course",
          priority: 3,
          href: "/courses/english",
          meta: { courseSlug: "english" },
        },
      ],
      "electrical_engineering",
    );
    const order = [...ranked].sort((a, b) => b.priority - a.priority).map((item) => item.kind);
    expect(order.slice(0, 3)).toEqual(["continue_course", "review_weak", "spaced_review"]);
    expect(ranked.find((item) => item.kind === "placement")?.priority).toBeLessThan(20);
    expect(ranked.find((item) => item.kind === "programming_mini_race")?.priority).toBeLessThan(20);
  });
});
