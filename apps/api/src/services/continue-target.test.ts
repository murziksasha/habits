import { describe, expect, it } from "vitest";
import { pickContinueLessonId, type ContinueLesson, type ContinueProgress } from "./continue-target.js";

const units = [
  { id: "u1", sortOrder: 1 },
  { id: "u2", sortOrder: 2 },
];

const lessons: ContinueLesson[] = [
  { id: "l1", unitId: "u1", sortOrder: 1, isExam: false, contentVersion: 2 },
  { id: "l2", unitId: "u1", sortOrder: 2, isExam: false, contentVersion: 2 },
  { id: "exam", unitId: "u1", sortOrder: 3, isExam: true, contentVersion: 2 },
  { id: "l3", unitId: "u2", sortOrder: 1, isExam: false, contentVersion: 2 },
];

function done(lessonId: string, version = 2): ContinueProgress {
  return { lessonId, status: "completed", completedContentVersion: version };
}

describe("pickContinueLessonId", () => {
  it("stays on an unfinished lesson", () => {
    expect(pickContinueLessonId(lessons, units, [], "l2")).toBe("l2");
  });

  it("moves past a lesson completed on the current version", () => {
    expect(pickContinueLessonId(lessons, units, [done("l1")], "l1")).toBe("l2");
  });

  it("does not treat a version-1 completion as current for a version-2 lesson", () => {
    expect(
      pickContinueLessonId(lessons, units, [{ lessonId: "l1", status: "completed", completedContentVersion: 1 }], "l1"),
    ).toBe("l1");
  });

  it("skips a locked exam and returns null when the course is current", () => {
    expect(pickContinueLessonId(lessons, units, [done("l1")], "l1")).not.toBe("exam");
    expect(
      pickContinueLessonId(lessons, units, [done("l1"), done("l2"), done("exam"), done("l3")], "l3"),
    ).toBeNull();
  });
});
