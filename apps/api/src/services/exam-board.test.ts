import { describe, expect, it } from "vitest";
import type { ExamBoard } from "./exam-board.js";
import { examBoardSummaryOnly, resolveExamRowStatus } from "./exam-board.js";

describe("resolveExamRowStatus", () => {
  const exam = { contentVersion: 2 };
  const unit = [{ id: "lesson", isExam: false, contentVersion: 2 }];

  it("keeps a version-1 completion locked when the unit is now version 2", () => {
    const progress = new Map([
      ["lesson", { status: "completed", completedContentVersion: 1 }],
      ["exam", { status: "completed", completedContentVersion: 1 }],
    ]);
    expect(resolveExamRowStatus(exam, progress.get("exam"), unit, progress)).toBe("locked");
  });

  it("is ready when the current unit is done and the exam is not", () => {
    const progress = new Map([["lesson", { status: "completed", completedContentVersion: 2 }]]);
    expect(resolveExamRowStatus(exam, undefined, unit, progress)).toBe("ready");
  });

  it("is passed only for the current exam version", () => {
    const progress = new Map([
      ["lesson", { status: "completed", completedContentVersion: 2 }],
      ["exam", { status: "completed", completedContentVersion: 2 }],
    ]);
    expect(resolveExamRowStatus(exam, progress.get("exam"), unit, progress)).toBe("passed");
  });
});

describe("examBoardSummaryOnly", () => {
  it("returns summary slice", () => {
    const board: ExamBoard = {
      summary: { totalExams: 3, passed: 1, ready: 1, locked: 1 },
      courses: [],
    };
    expect(examBoardSummaryOnly(board)).toEqual({
      totalExams: 3,
      passed: 1,
      ready: 1,
      locked: 1,
    });
  });
});

describe("exam board status logic (pure)", () => {
  function statusFor(opts: {
    passed: boolean;
    unitDone: boolean;
  }): "locked" | "ready" | "passed" {
    if (opts.passed) return "passed";
    if (opts.unitDone) return "ready";
    return "locked";
  }

  it("maps unit completion to ready/locked/passed", () => {
    expect(statusFor({ passed: true, unitDone: false })).toBe("passed");
    expect(statusFor({ passed: false, unitDone: true })).toBe("ready");
    expect(statusFor({ passed: false, unitDone: false })).toBe("locked");
  });
});
