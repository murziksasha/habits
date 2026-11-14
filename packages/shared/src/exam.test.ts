import { describe, expect, it } from "vitest";
import {
  DEFAULT_EXAM_PASS_THRESHOLD,
  examPassed,
  examPassThreshold,
  lessonCompleteThreshold,
  resolveExamVariantId,
  isTransferCheckDue,
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

  it("deterministically resolves stable exam variants across attempts", () => {
    const v1 = resolveExamVariantId("user-1", "lesson-exam-1", 0);
    const v1Again = resolveExamVariantId("user-1", "lesson-exam-1", 0);
    expect(v1).toBe(v1Again);
    expect(["variant_A", "variant_B", "variant_C"]).toContain(v1);

    const v2 = resolveExamVariantId("user-1", "lesson-exam-1", 1);
    expect(["variant_A", "variant_B", "variant_C"]).toContain(v2);
  });

  it("detects 7-day and 30-day transfer check-in due dates", () => {
    const now = new Date("2026-11-14T12:00:00Z");

    // Verified 2 days ago -> not due
    const recent = isTransferCheckDue(new Date("2026-11-12T12:00:00Z"), now);
    expect(recent.due).toBe(false);

    // Verified 8 days ago -> 7-day due
    const sevenDay = isTransferCheckDue(new Date("2026-11-06T12:00:00Z"), now);
    expect(sevenDay.due).toBe(true);
    expect(sevenDay.interval).toBe(7);

    // Verified 35 days ago -> 30-day due
    const thirtyDay = isTransferCheckDue(new Date("2026-10-10T12:00:00Z"), now);
    expect(thirtyDay.due).toBe(true);
    expect(thirtyDay.interval).toBe(30);
  });
});
