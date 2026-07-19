import { describe, expect, it } from "vitest";
import {
  DEFAULT_EXAM_PASS_THRESHOLD,
  examPassed,
  examPassThreshold,
  lessonCompleteThreshold,
} from "./exam.js";

describe("exam helpers", () => {
  it("defaults threshold to 0.7", () => {
    expect(examPassThreshold(null)).toBe(DEFAULT_EXAM_PASS_THRESHOLD);
    expect(examPassThreshold(undefined)).toBe(0.7);
  });

  it("examPassed respects bar", () => {
    expect(examPassed(0.69, 0.7)).toBe(false);
    expect(examPassed(0.7, 0.7)).toBe(true);
    expect(examPassed(1, 0.7)).toBe(true);
  });

  it("lessonCompleteThreshold differs for exams", () => {
    expect(lessonCompleteThreshold({ isExam: false })).toBe(0.5);
    expect(lessonCompleteThreshold({ isExam: true })).toBe(0.7);
    expect(lessonCompleteThreshold({ isExam: true, passThreshold: 0.8 })).toBe(0.8);
  });
});
