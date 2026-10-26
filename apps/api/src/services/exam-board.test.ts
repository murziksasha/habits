import { describe, expect, it } from "vitest";
import type { ExamBoard } from "./exam-board.js";
import { examBoardSummaryOnly } from "./exam-board.js";

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
