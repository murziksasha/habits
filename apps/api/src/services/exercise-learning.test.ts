import { describe, expect, it, vi } from "vitest";

vi.mock("../db.js", () => ({ db: {} }));

const { planExerciseLearning, reviewSessionXp, clampWrongAttempts } = await import(
  "./exercise-learning.js"
);

const now = new Date("2026-10-28T10:00:00Z");
const replayable = () => true;

describe("exercise learning planner", () => {
  it("logs attempts with firstTry + confidence, skips concept", () => {
    const { attempts } = planExerciseLearning(
      [
        { lessonId: "L", exerciseId: "a", type: "mcq", correct: true, confidence: 3 },
        { lessonId: "L", exerciseId: "b", type: "mcq", correct: true, wrongAttempts: 2 },
        { lessonId: "L", exerciseId: "c", type: "concept", correct: true },
      ],
      new Map(),
      now,
      { replayable },
    );
    expect(attempts).toHaveLength(2);
    expect(attempts[0]).toMatchObject({ firstTry: true, confidence: 3 });
    expect(attempts[1]).toMatchObject({ firstTry: false, wrongAttempts: 2, confidence: null });
  });

  it("tracks new mistakes due now and leaves clean answers alone", () => {
    const { reviews } = planExerciseLearning(
      [
        { lessonId: "L", exerciseId: "a", type: "mcq", correct: true },
        { lessonId: "L", exerciseId: "b", type: "mcq", correct: true, wrongAttempts: 1 },
      ],
      new Map(),
      now,
      { replayable },
    );
    expect(reviews).toHaveLength(1);
    expect(reviews[0]).toMatchObject({ exerciseId: "b", isNew: true });
    expect(reviews[0]!.dueAt.getTime()).toBe(now.getTime());
  });

  it("advances existing review on a clean answer", () => {
    const existing = new Map([["L:a", { ease: 250, intervalDays: 1, repetitions: 1, lapses: 0 }]]);
    const { reviews } = planExerciseLearning(
      [{ lessonId: "L", exerciseId: "a", type: "mcq", correct: true, confidence: 3 }],
      existing,
      now,
      { replayable },
    );
    expect(reviews[0]!.isNew).toBe(false);
    expect(reviews[0]!.repetitions).toBe(2);
    expect(reviews[0]!.dueAt.getTime()).toBeGreaterThan(now.getTime());
  });

  it("does not track non-replayable exercises", () => {
    const { reviews } = planExerciseLearning(
      [{ lessonId: "L", exerciseId: "v", type: "typing", correct: false }],
      new Map(),
      now,
      { replayable: () => false },
    );
    expect(reviews).toHaveLength(0);
  });

  it("caps review XP per session and per day", () => {
    expect(reviewSessionXp(3, 0)).toBe(6);
    expect(reviewSessionXp(50, 0)).toBe(20);
    expect(reviewSessionXp(10, 50)).toBe(10);
    expect(reviewSessionXp(10, 60)).toBe(0);
    expect(clampWrongAttempts("x")).toBe(0);
    expect(clampWrongAttempts(99)).toBe(20);
  });
});
