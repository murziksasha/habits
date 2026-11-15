import { describe, expect, it } from "vitest";
import {
  buildInterleavedSet,
  isMixedPracticeExercise,
  mixedLessonWeight,
  seededRandom,
  type MixedPool,
} from "./interleave.js";

function pool(id: string, bestScore: number, n: number, type = "mcq"): MixedPool {
  return {
    lessonId: id,
    courseSlug: "js_fundamentals",
    lessonTitleUk: `Урок ${id}`,
    bestScore,
    exercises: Array.from({ length: n }, (_, i) => ({
      id: `${id}-e${i}`,
      type,
      promptUk: "?",
      options: ["a", "b"],
      correctIndex: 0,
    })),
  };
}

describe("interleaved practice", () => {
  it("filters to auto-gradable types", () => {
    expect(isMixedPracticeExercise({ id: "a", type: "mcq" })).toBe(true);
    expect(isMixedPracticeExercise({ id: "a", type: "video" })).toBe(false);
    expect(isMixedPracticeExercise({ id: "a", type: "concept" })).toBe(false);
    expect(isMixedPracticeExercise({ id: "a", type: "code_output" })).toBe(false);
    expect(isMixedPracticeExercise({ id: "a", type: "code_output", options: ["1"] })).toBe(true);
  });

  it("weights weak lessons higher", () => {
    expect(mixedLessonWeight(0)).toBe(3);
    expect(mixedLessonWeight(1)).toBe(1);
  });

  it("is deterministic for a seed", () => {
    const pools = [pool("a", 0.5, 4), pool("b", 0.9, 4), pool("c", 0.7, 4)];
    const x = buildInterleavedSet(pools, { count: 6, seed: 42 }).map((i) => i.exercise.id);
    const y = buildInterleavedSet(pools, { count: 6, seed: 42 }).map((i) => i.exercise.id);
    expect(x).toEqual(y);
    expect(seededRandom(7)()).toBe(seededRandom(7)());
  });

  it("interleaves lessons (no two consecutive from the same lesson when avoidable)", () => {
    const pools = [pool("a", 0.5, 5), pool("b", 0.5, 5), pool("c", 0.5, 5)];
    const set = buildInterleavedSet(pools, { count: 6, seed: 3 });
    expect(set).toHaveLength(6);
    for (let i = 1; i < set.length; i++) {
      expect(set[i]!.lessonId).not.toBe(set[i - 1]!.lessonId);
    }
  });

  it("respects maxPerLesson, count and skips empty pools", () => {
    const pools = [pool("a", 0.2, 10), pool("v", 0.2, 3, "video")];
    const set = buildInterleavedSet(pools, { count: 10, seed: 1, maxPerLesson: 2 });
    expect(set).toHaveLength(2);
    expect(new Set(set.map((s) => s.exercise.id)).size).toBe(2);
    expect(buildInterleavedSet([], { count: 5 })).toEqual([]);
  });
});
