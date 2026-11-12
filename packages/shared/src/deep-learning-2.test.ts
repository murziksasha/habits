import { describe, expect, it } from "vitest";
import { buildCalibration, normalizeConfidence } from "./calibration.js";
import {
  isFirstTry,
  isGraduatedReview,
  shouldTrackMistake,
  srsRatingFromOutcome,
} from "./exercise-srs.js";
import { buildUnitMasteryMap, lessonMasteryState } from "./unit-mastery.js";
import { countWords, gradeExplanation } from "./explain.js";
import { gradeExercise } from "./grade.js";
import { exerciseSchema, isKnownExerciseType } from "./exercises.js";

describe("calibration", () => {
  it("normalizes confidence", () => {
    expect(normalizeConfidence(3)).toBe(3);
    expect(normalizeConfidence("2")).toBe(2);
    expect(normalizeConfidence(7)).toBeNull();
    expect(normalizeConfidence(null)).toBeNull();
  });

  it("needs data below 5 rated answers", () => {
    const r = buildCalibration([{ confidence: 3, firstTry: true }]);
    expect(r.tipCode).toBe("need_data");
    expect(r.score).toBeNull();
  });

  it("detects overconfidence", () => {
    const rows = Array.from({ length: 6 }, (_, i) => ({ confidence: 3, firstTry: i < 2 }));
    const r = buildCalibration(rows);
    expect(r.tipCode).toBe("overconfident");
    expect(r.overconfidence).toBeCloseTo(4 / 6);
  });

  it("detects underconfidence and good calibration", () => {
    const under = buildCalibration(
      Array.from({ length: 5 }, () => ({ confidence: 1, firstTry: true })),
    );
    expect(under.tipCode).toBe("underconfident");
    const good = buildCalibration([
      ...Array.from({ length: 9 }, () => ({ confidence: 3, firstTry: true })),
      { confidence: 3, firstTry: false },
    ]);
    expect(good.tipCode).toBe("calibrated");
    expect(good.score).toBeGreaterThan(0.9);
  });
});

describe("exercise srs", () => {
  it("first try and mistake tracking", () => {
    expect(isFirstTry({ correct: true })).toBe(true);
    expect(isFirstTry({ correct: true, wrongAttempts: 1 })).toBe(false);
    expect(shouldTrackMistake({ correct: true })).toBe(false);
    expect(shouldTrackMistake({ correct: true, wrongAttempts: 2 })).toBe(true);
    expect(shouldTrackMistake({ correct: false })).toBe(true);
    expect(shouldTrackMistake({ correct: true, confidence: 1 })).toBe(true);
  });

  it("maps outcomes to SM-2 ratings", () => {
    expect(srsRatingFromOutcome({ correct: false })).toBe(1);
    expect(srsRatingFromOutcome({ correct: true, wrongAttempts: 1 })).toBe(2);
    expect(srsRatingFromOutcome({ correct: true, confidence: 1 })).toBe(2);
    expect(srsRatingFromOutcome({ correct: true })).toBe(3);
    expect(srsRatingFromOutcome({ correct: true, confidence: 3 })).toBe(4);
  });

  it("graduates after spaced reps", () => {
    expect(isGraduatedReview({ repetitions: 4, intervalDays: 30 })).toBe(true);
    expect(isGraduatedReview({ repetitions: 2, intervalDays: 30 })).toBe(false);
  });
});

describe("unit mastery map", () => {
  const now = new Date("2026-10-28T00:00:00Z");
  it("classifies lesson states", () => {
    expect(lessonMasteryState(null, null)).toBe("new");
    expect(lessonMasteryState({ attempts: 1, status: "available" }, null)).toBe("learning");
    expect(
      lessonMasteryState({ status: "completed", bestScore: 1, completedAt: now }, 95),
    ).toBe("mastered");
    expect(
      lessonMasteryState({ status: "completed", bestScore: 1, completedAt: now }, 40),
    ).toBe("fading");
  });

  it("summarizes units", () => {
    const map = buildUnitMasteryMap(
      [
        {
          slug: "u1",
          titleUk: "Юніт",
          lessons: [
            {
              id: "l1",
              slug: "a",
              titleUk: "A",
              progress: { status: "completed", bestScore: 1, attempts: 2, completedAt: now },
            },
            { id: "l2", slug: "b", titleUk: "B", progress: null },
          ],
        },
      ],
      now,
    );
    expect(map[0]!.completed).toBe(1);
    expect(map[0]!.total).toBe(2);
    expect(map[0]!.mastered).toBe(1);
    expect(map[0]!.avgRetentionPct).toBe(100);
    expect(map[0]!.state).toBe("learning");
    expect(map[0]!.lessons[1]!.state).toBe("new");
  });
});

describe("explain in your own words", () => {
  const ex = {
    id: "x1",
    type: "explain",
    promptUk: "Поясніть замикання",
    promptEn: "Explain closures",
    minWords: 8,
    keyIdeas: [
      { labelUk: "функція", labelEn: "function", anyOf: ["функці", "function"] },
      { labelUk: "зовнішні змінні", labelEn: "outer variables", anyOf: ["зовнішн", "outer"] },
      { labelUk: "після завершення", labelEn: "after return", anyOf: ["після", "after", "return"] },
    ],
  };

  it("is a known validated type", () => {
    expect(isKnownExerciseType("explain")).toBe(true);
    expect(exerciseSchema.safeParse(ex).success).toBe(true);
  });

  it("counts words", () => {
    expect(countWords("  one, two!  three ")).toBe(3);
  });

  it("passes with enough key ideas", () => {
    const g = gradeExplanation(
      "A closure is a function that keeps access to outer variables even after the outer function returns.",
      ex,
    );
    expect(g.correct).toBe(true);
    expect(g.missing).toEqual([]);
    expect(gradeExercise(ex, { text: "Замикання — це функція, яка памʼятає зовнішні змінні навіть після завершення." }).correct).toBe(true);
  });

  it("fails when too short or missing ideas", () => {
    expect(gradeExplanation("function outer", ex).tooShort).toBe(true);
    const g = gradeExercise(ex, "It is something about code that I do not really remember now at all.");
    expect(g.correct).toBe(false);
    expect((g.meta?.missing as string[]).length).toBeGreaterThan(0);
  });
});
