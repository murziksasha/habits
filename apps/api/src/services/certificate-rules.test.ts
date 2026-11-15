import { describe, expect, it } from "vitest";
import { isFullCourseComplete, lessonCountsAsCurrentMastery } from "./certificate-rules.js";

describe("isFullCourseComplete", () => {
  it("rejects empty course", () => {
    expect(isFullCourseComplete([], [])).toBe(false);
  });

  it("requires every lesson including exams", () => {
    const lessons = ["l1", "l2", "exam"];
    expect(isFullCourseComplete(lessons, ["l1", "l2"])).toBe(false);
    expect(isFullCourseComplete(lessons, ["l1", "l2", "exam"])).toBe(true);
  });

  it("is not satisfied by 70% progress", () => {
    const lessons = Array.from({ length: 10 }, (_, i) => `l${i}`);
    const seven = lessons.slice(0, 7);
    expect(isFullCourseComplete(lessons, seven)).toBe(false);
    expect(isFullCourseComplete(lessons, lessons)).toBe(true);
  });

  it("ignores extra completed ids not in course", () => {
    expect(isFullCourseComplete(["a", "b"], ["a", "b", "other"])).toBe(true);
  });

  it("requires the current content version for rewritten lessons", () => {
    expect(lessonCountsAsCurrentMastery({ status: "completed", lessonContentVersion: 1, completedContentVersion: null })).toBe(true);
    expect(lessonCountsAsCurrentMastery({ status: "completed", lessonContentVersion: 2, completedContentVersion: null })).toBe(false);
    expect(lessonCountsAsCurrentMastery({ status: "completed", lessonContentVersion: 2, completedContentVersion: 2 })).toBe(true);
    expect(lessonCountsAsCurrentMastery({ status: "available", lessonContentVersion: 2, completedContentVersion: 2 })).toBe(false);
  });
});
