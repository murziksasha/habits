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
    expect(PRODUCT_EVENT_KINDS).toContain("paywall_shown");
    expect(PRODUCT_EVENT_KINDS).toContain("paywall_cta_click");
  });

  it("isProductEventKind validates", () => {
    expect(isProductEventKind("first_lesson_complete")).toBe(true);
    expect(isProductEventKind("paywall_shown")).toBe(true);
    expect(isProductEventKind("not_a_real_event")).toBe(false);
  });

  it("funnelDeltas computes percent change", () => {
    const d = funnelDeltas(
      {
        firstLessonComplete: 12,
        lessonCompleted: 100,
        paywallShown: 0,
        paywallCtaClick: 5,
        examPassed: 3,
        examFailed: 1,
      },
      {
        firstLessonComplete: 10,
        lessonCompleted: 50,
        paywallShown: 0,
        paywallCtaClick: 0,
        examPassed: 3,
        examFailed: 2,
      },
    );
    const first = d.find((x) => x.key === "firstLessonComplete")!;
    expect(first.pctChange).toBe(20);
    const lessons = d.find((x) => x.key === "lessonCompleted")!;
    expect(lessons.pctChange).toBe(100);
    const cta = d.find((x) => x.key === "paywallCtaClick")!;
    expect(cta.pctChange).toBeNull(); // prev 0, current > 0
    const exam = d.find((x) => x.key === "examPassed")!;
    expect(exam.pctChange).toBe(0);
  });

  it("funnelHistoryToCsv includes header and rows", () => {
    const csv = funnelHistoryToCsv({
      windowDays: 7,
      current: {
        firstLessonComplete: 2,
        lessonCompleted: 10,
        paywallShown: 1,
        paywallCtaClick: 0,
        examPassed: 0,
        examFailed: 0,
        windowDays: 7,
      },
      previous: {
        firstLessonComplete: 1,
        lessonCompleted: 5,
        paywallShown: 0,
        paywallCtaClick: 0,
        examPassed: 0,
        examFailed: 0,
        windowDays: 7,
      },
      deltas: funnelDeltas(
        {
          firstLessonComplete: 2,
          lessonCompleted: 10,
          paywallShown: 1,
          paywallCtaClick: 0,
          examPassed: 0,
          examFailed: 0,
        },
        {
          firstLessonComplete: 1,
          lessonCompleted: 5,
          paywallShown: 0,
          paywallCtaClick: 0,
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
