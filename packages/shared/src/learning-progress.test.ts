import { describe, expect, it } from "vitest";
import {
  classifyAttemptOutcome,
  computeLongestStudyRun,
  computePersonalBests,
  computeWeeklyRecap,
} from "./learning-progress.js";

describe("classifyAttemptOutcome", () => {
  it("uses recorded outcome directly without marking reconstructed", () => {
    const res = classifyAttemptOutcome({
      metrics: { outcome: "passed", accuracy: 0.4, isExam: true, passThreshold: 0.7 },
      lesson: { isExam: true, passThreshold: 0.9 },
    });
    expect(res).toEqual({
      outcome: "passed",
      reconstructed: false,
      score: 0.4,
      isExam: true,
      passThreshold: 0.7,
    });
  });

  it("reconstructs older normal lesson attempts against 0.5 threshold", () => {
    expect(
      classifyAttemptOutcome({
        metrics: { accuracy: 0.5, lessonId: "l1" },
        lesson: { isExam: false, passThreshold: null },
      }),
    ).toEqual({
      outcome: "passed",
      reconstructed: true,
      score: 0.5,
      isExam: false,
      passThreshold: 0.5,
    });

    expect(
      classifyAttemptOutcome({
        metrics: { accuracy: 0.49, lessonId: "l1" },
        lesson: { isExam: false, passThreshold: null },
      }),
    ).toEqual({
      outcome: "failed",
      reconstructed: true,
      score: 0.49,
      isExam: false,
      passThreshold: 0.5,
    });
  });

  it("reconstructs older exam attempts against custom or default 0.7 threshold", () => {
    expect(
      classifyAttemptOutcome({
        metrics: { accuracy: 0.65, lessonId: "e1" },
        lesson: { isExam: true, passThreshold: null },
      }),
    ).toEqual({
      outcome: "failed",
      reconstructed: true,
      score: 0.65,
      isExam: true,
      passThreshold: 0.7,
    });

    expect(
      classifyAttemptOutcome({
        metrics: { accuracy: 0.8, lessonId: "e2" },
        lesson: { isExam: true, passThreshold: 0.8 },
      }),
    ).toEqual({
      outcome: "passed",
      reconstructed: true,
      score: 0.8,
      isExam: true,
      passThreshold: 0.8,
    });
  });

  it("yields unknown when lesson metadata or score is missing on legacy attempts", () => {
    const missingLesson = classifyAttemptOutcome({
      metrics: { accuracy: 0.95, lessonId: "deleted-id" },
      lesson: null,
    });
    expect(missingLesson.outcome).toBe("unknown");
    expect(missingLesson.reconstructed).toBe(false);
    expect(missingLesson.score).toBe(0.95);

    const missingScore = classifyAttemptOutcome({
      metrics: { lessonId: "l1" },
      lesson: { isExam: false, passThreshold: null },
    });
    expect(missingScore.outcome).toBe("unknown");
    expect(missingScore.score).toBeNull();
  });
});

describe("computeLongestStudyRun", () => {
  it("finds longest consecutive UTC day streak regardless of input order/dupes", () => {
    const run = computeLongestStudyRun([
      "2026-11-01",
      "2026-11-02",
      "2026-11-02",
      "2026-11-04",
      "2026-11-05",
      "2026-11-06",
      "2026-11-07",
    ]);
    expect(run).toEqual({
      days: 4,
      startDate: "2026-11-04",
      endDate: "2026-11-07",
    });
  });

  it("handles empty set", () => {
    expect(computeLongestStudyRun([])).toEqual({
      days: 0,
      startDate: null,
      endDate: null,
    });
  });
});

describe("computePersonalBests", () => {
  it("excludes failed and unknown attempts from success counts while preserving study days", () => {
    const bests = computePersonalBests([
      // Day 1: 1 passed, 1 failed, 1 unknown
      { createdAt: new Date("2026-11-02T10:00:00Z"), outcome: "passed", score: 1, xpGained: 20, courseSlug: "english" },
      { createdAt: new Date("2026-11-02T11:00:00Z"), outcome: "failed", score: 0.2, xpGained: 5, courseSlug: "english" },
      { createdAt: new Date("2026-11-02T12:00:00Z"), outcome: "unknown", score: 0.9, xpGained: 15, courseSlug: "english" },
      // Day 2: 2 passed (same week)
      { createdAt: new Date("2026-11-03T10:00:00Z"), outcome: "passed", score: 0.8, xpGained: 20, courseSlug: "chess" },
      { createdAt: new Date("2026-11-03T12:00:00Z"), outcome: "passed", score: 1, xpGained: 20, courseSlug: "chess" },
      // Day 3: failed only -> still counts as consecutive lesson-active study day!
      { createdAt: new Date("2026-11-04T09:00:00Z"), outcome: "failed", score: 0.1, xpGained: 0, courseSlug: "logic" },
    ]);

    expect(bests.bestDaySuccesses).toEqual({ count: 2, date: "2026-11-03" });
    expect(bests.bestWeekSuccesses.count).toBe(3);
    expect(bests.bestWeekSuccesses.weekStart).toBe("2026-11-02");
    expect(bests.bestWeekSuccesses.weekEnd).toBe("2026-11-08");
    expect(bests.longestStudyRunDays).toEqual({
      days: 3,
      startDate: "2026-11-02",
      endDate: "2026-11-04",
    });
  });
});

describe("computeWeeklyRecap", () => {
  it("compares this week against the exact same elapsed window of previous week in UTC", () => {
    // Now: Wednesday 2026-11-11 12:00:00Z (elapsed = 2 days + 12 hours from Monday 2026-11-09 00:00Z)
    // Previous equivalent ends at Wednesday 2026-11-04 12:00:00Z
    const now = new Date("2026-11-11T12:00:00.000Z");
    const recap = computeWeeklyRecap({
      now,
      newCompletionsCurrent: 2,
      newCompletionsPrevious: 1,
      attempts: [
        // Previous week inside elapsed window (Mon + Wed 11:00Z)
        { createdAt: new Date("2026-11-02T10:00:00Z"), outcome: "passed", score: 0.8, xpGained: 20, courseSlug: "english" },
        { createdAt: new Date("2026-11-04T11:00:00Z"), outcome: "failed", score: 0.4, xpGained: 5, courseSlug: "english" },
        // Previous week AFTER elapsed cutoff (Wed 13:00Z & Fri) — must NOT be included!
        { createdAt: new Date("2026-11-04T13:00:00Z"), outcome: "passed", score: 1.0, xpGained: 25, courseSlug: "english" },
        { createdAt: new Date("2026-11-06T10:00:00Z"), outcome: "passed", score: 1.0, xpGained: 25, courseSlug: "english" },
        // Current week
        { createdAt: new Date("2026-11-09T00:00:00Z"), outcome: "passed", score: 1.0, xpGained: 25, courseSlug: "english" },
        { createdAt: new Date("2026-11-10T18:00:00Z"), outcome: "passed", score: 0.8, xpGained: 20, courseSlug: "chess" },
      ],
    });

    expect(recap.current.successfulAttempts).toBe(2);
    expect(recap.current.studyDays).toBe(2);
    expect(recap.current.newCompletions).toBe(2);
    expect(recap.current.averageScore).toBeCloseTo(0.9);

    expect(recap.previous.successfulAttempts).toBe(1);
    expect(recap.previous.studyDays).toBe(2);
    expect(recap.previous.newCompletions).toBe(1);
    expect(recap.previous.averageScore).toBeCloseTo(0.6);

    expect(recap.deltas.successfulAttempts).toBe(1);
    expect(recap.deltas.newCompletions).toBe(1);
    expect(recap.deltas.studyDays).toBe(0);
    expect(recap.deltas.averageScore).toBeCloseTo(0.3);
  });
});
