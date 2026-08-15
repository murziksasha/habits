import { describe, expect, it } from "vitest";
import { buildReviewReasons } from "./review-queue.js";

describe("buildReviewReasons", () => {
  it("flags low mastery", () => {
    const r = buildReviewReasons({ bestScore: 0.5, attempts: 1, status: "completed" });
    expect(r.some((x) => x.code === "low_mastery")).toBe(true);
    expect(r[0]!.labelEn).toMatch(/Mastery 50%/);
  });

  it("surfaces leech reason with retry guidance", () => {
    const reasons = buildReviewReasons({
      bestScore: 0.4,
      attempts: 5,
      status: "available",
      leech: true,
    });
    expect(reasons.some((r) => r.code === "leech")).toBe(true);
    expect(reasons.find((r) => r.code === "leech")?.labelEn).toMatch(/hints/i);
  });

  it("flags leech on many low attempts", () => {
    const r = buildReviewReasons({
      bestScore: 0.4,
      attempts: 5,
      status: "completed",
    });
    expect(r.some((x) => x.code === "leech")).toBe(true);
    expect(r.some((x) => x.code === "many_attempts")).toBe(true);
  });

  it("flags exam-related boost", () => {
    const r = buildReviewReasons({
      bestScore: 0.9,
      attempts: 1,
      status: "completed",
      threshold: 0.85,
      examCourseMatch: true,
    });
    // 0.9 >= 0.85 so no low_mastery; exam_related still present
    expect(r.some((x) => x.code === "exam_related")).toBe(true);
  });
});
