import { describe, expect, it } from "vitest";
import {
  funnelDeltas,
  funnelHistoryToCsv,
  isProductEventKind,
  PRODUCT_EVENT_KINDS,
} from "./product-analytics.js";

describe("product-analytics", () => {
  it("lists core funnel kinds", () => {
    expect(PRODUCT_EVENT_KINDS).toContain("first_lesson_complete");
    expect(PRODUCT_EVENT_KINDS).toContain("exam_passed");
    expect(PRODUCT_EVENT_KINDS).not.toContain("paywall_shown");
  });

  it("isProductEventKind validates", () => {
    expect(isProductEventKind("first_lesson_complete")).toBe(true);
    expect(isProductEventKind("paywall_shown")).toBe(false);
    expect(isProductEventKind("not_a_real_event")).toBe(false);
  });

  it("funnelDeltas computes percent change", () => {
    const d = funnelDeltas(
      {
        firstLessonComplete: 12,
        lessonCompleted: 100,
        examPassed: 3,
        examFailed: 1,
      },
      {
        firstLessonComplete: 10,
        lessonCompleted: 50,
        examPassed: 0,
        examFailed: 2,
      },
    );
    const first = d.find((x) => x.key === "firstLessonComplete")!;
    expect(first.pctChange).toBe(20);
    const lessons = d.find((x) => x.key === "lessonCompleted")!;
    expect(lessons.pctChange).toBe(100);
    const examNew = d.find((x) => x.key === "examPassed")!;
    expect(examNew.pctChange).toBeNull();
    const examFail = d.find((x) => x.key === "examFailed")!;
    expect(examFail.pctChange).toBe(-50);
  });

  it("funnelHistoryToCsv includes header and rows", () => {
    const csv = funnelHistoryToCsv({
      windowDays: 7,
      current: {
        firstLessonComplete: 2,
        lessonCompleted: 10,
        examPassed: 0,
        examFailed: 0,
        windowDays: 7,
      },
      previous: {
        firstLessonComplete: 1,
        lessonCompleted: 5,
        examPassed: 0,
        examFailed: 0,
        windowDays: 7,
      },
      deltas: funnelDeltas(
        {
          firstLessonComplete: 2,
          lessonCompleted: 10,
          examPassed: 0,
          examFailed: 0,
        },
        {
          firstLessonComplete: 1,
          lessonCompleted: 5,
          examPassed: 0,
          examFailed: 0,
        },
      ),
    });
    expect(csv.startsWith("metric,current,previous")).toBe(true);
    expect(csv).toContain("firstLessonComplete,2,1,100,7");
    expect(csv).toContain("lessonCompleted,10,5,100,7");
  });
});
