import { describe, expect, it } from "vitest";
import {
  evaluateMasteryEvidence,
  evidenceForLessonSubmit,
  getEvidenceLevelLabels,
  masteryEvidenceRank,
  NON_EVALUATIVE_EXERCISE_KINDS,
} from "./mastery-evidence.js";

describe("mastery-evidence", () => {
  it("never grants evidence for non-evaluative formats (theory, video, rsvp)", () => {
    for (const kind of NON_EVALUATIVE_EXERCISE_KINDS) {
      const result = evaluateMasteryEvidence({
        exerciseKind: kind,
        isFirstAttempt: true,
        firstCheckPassed: true,
        hintsUsed: 0,
        solutionRevealed: false,
        correct: true,
        priorEvidenceLevel: "insufficient_data",
      });
      expect(result).toBe("insufficient_data");
    }
  });

  it("caps at assisted if hints were used or solution revealed", () => {
    const withHints = evaluateMasteryEvidence({
      exerciseKind: "code",
      isFirstAttempt: true,
      firstCheckPassed: true,
      hintsUsed: 2,
      solutionRevealed: false,
      correct: true,
      priorEvidenceLevel: "insufficient_data",
    });
    expect(withHints).toBe("assisted");

    const withSolution = evaluateMasteryEvidence({
      exerciseKind: "code",
      isFirstAttempt: true,
      firstCheckPassed: true,
      hintsUsed: 0,
      solutionRevealed: true,
      correct: true,
      priorEvidenceLevel: "insufficient_data",
    });
    expect(withSolution).toBe("assisted");
  });

  it("awards self_verified on clean first-check pass without hints or solution reveal", () => {
    const clean = evaluateMasteryEvidence({
      exerciseKind: "code",
      isFirstAttempt: true,
      firstCheckPassed: true,
      hintsUsed: 0,
      solutionRevealed: false,
      correct: true,
      priorEvidenceLevel: "insufficient_data",
    });
    expect(clean).toBe("self_verified");
  });

  it("upgrades to retained_verified after transfer check or >= 7 days retention", () => {
    const retainedAfterDays = evaluateMasteryEvidence({
      exerciseKind: "code",
      isFirstAttempt: true,
      firstCheckPassed: true,
      hintsUsed: 0,
      solutionRevealed: false,
      correct: true,
      priorEvidenceLevel: "self_verified",
      daysSinceFirstVerification: 14,
    });
    expect(retainedAfterDays).toBe("retained_verified");

    const retainedTransferCheck = evaluateMasteryEvidence({
      exerciseKind: "sql",
      isFirstAttempt: true,
      firstCheckPassed: true,
      hintsUsed: 0,
      solutionRevealed: false,
      correct: true,
      priorEvidenceLevel: "self_verified",
      verificationMethod: "transfer_check",
    });
    expect(retainedTransferCheck).toBe("retained_verified");
  });

  it("does not treat an acknowledged theory card as self-verified", () => {
    const level = evidenceForLessonSubmit({
      exercises: [{ id: "c1", type: "concept" }],
      results: [{ exerciseId: "c1", type: "concept", correct: true }],
      answers: [{ exerciseId: "c1" }],
      passed: true,
      passThreshold: 0.8,
      isExam: false,
      isFirstAttempt: true,
    });
    expect(level).toBe("insufficient_data");
  });

  it("caps a passed lesson at assisted when a hint, solution, or earlier miss was used", () => {
    const base = {
      exercises: [{ id: "q1", type: "mcq" }],
      results: [{ exerciseId: "q1", type: "mcq", correct: true }],
      passed: true,
      passThreshold: 0.8,
      isExam: false,
      isFirstAttempt: true,
    };
    expect(
      evidenceForLessonSubmit({ ...base, answers: [{ exerciseId: "q1", hintsUsed: 1 }] }),
    ).toBe("assisted");
    expect(
      evidenceForLessonSubmit({ ...base, answers: [{ exerciseId: "q1", solutionRevealed: true }] }),
    ).toBe("assisted");
    expect(
      evidenceForLessonSubmit({ ...base, answers: [{ exerciseId: "q1", wrongAttempts: 2 }] }),
    ).toBe("assisted");
    expect(evidenceForLessonSubmit({ ...base, answers: [{ exerciseId: "q1" }] })).toBe("self_verified");
  });

  it("ranks evidence levels in strict ascending order", () => {
    expect(masteryEvidenceRank("insufficient_data")).toBe(0);
    expect(masteryEvidenceRank("assisted")).toBe(1);
    expect(masteryEvidenceRank("self_verified")).toBe(2);
    expect(masteryEvidenceRank("retained_verified")).toBe(3);
  });

  it("returns dual-language labels for all levels", () => {
    const levels = ["insufficient_data", "assisted", "self_verified", "retained_verified"] as const;
    for (const level of levels) {
      const labels = getEvidenceLevelLabels(level);
      expect(labels.labelUk.length).toBeGreaterThan(0);
      expect(labels.labelEn.length).toBeGreaterThan(0);
    }
  });
});
