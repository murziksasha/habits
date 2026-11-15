import { describe, expect, it } from "vitest";
import { composeLearningSession, type SessionPlanItem } from "./session-plan.js";

const review: SessionPlanItem = {
  kind: "review_weak",
  titleUk: "Повторити",
  titleEn: "Review",
  href: "/review-lesson",
};
const next: SessionPlanItem = {
  kind: "continue_course",
  titleUk: "Далі",
  titleEn: "Continue",
  href: "/next-lesson",
};
const second: SessionPlanItem = {
  kind: "continue_course",
  titleUk: "Ще",
  titleEn: "Another",
  href: "/second-lesson",
};
const exam: SessionPlanItem = {
  kind: "exam_ready",
  titleUk: "Контрольна",
  titleEn: "Exam",
  href: "/exam",
};

describe("composeLearningSession", () => {
  it("keeps a five-minute session to one review", () => {
    expect(composeLearningSession(5, [next, review]).map((step) => step.role)).toEqual(["review"]);
  });

  it("uses the next lesson when a five-minute session has nothing to review", () => {
    expect(composeLearningSession(5, [next, exam]).map((step) => step.href)).toEqual([next.href]);
  });

  it("adds one new lesson to a ten-minute session", () => {
    const plan = composeLearningSession(10, [next, review, exam]);
    expect(plan.map((step) => step.role)).toEqual(["review", "new"]);
    expect(plan.map((step) => step.href)).toEqual([review.href, next.href]);
  });

  it("closes a twenty-minute session with a second lesson or the ready exam", () => {
    expect(composeLearningSession(20, [review, next, second]).map((step) => step.href)).toEqual([
      review.href,
      next.href,
      second.href,
    ]);
    expect(composeLearningSession(20, [review, next, exam]).map((step) => step.role)).toEqual([
      "review",
      "new",
      "close",
    ]);
  });
});
