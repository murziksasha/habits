import { describe, expect, it } from "vitest";
import { buildGuestSubmitResult } from "./submit-lesson.js";

describe("buildGuestSubmitResult", () => {
  const exercises = [
    { id: "ex1", type: "mcq", correctIndex: 1 },
    { id: "ex2", type: "mcq", correctIndex: 0 },
  ];

  it("grades passed lesson without awarding XP or certificates", () => {
    const answers = [
      { exerciseId: "ex1", answer: 1 },
      { exerciseId: "ex2", answer: 0 },
    ];
    const nextLesson = {
      id: "next-1",
      titleUk: "Next",
      titleEn: "Next",
      href: "/courses/test/lessons/next-1",
    };

    const res = buildGuestSubmitResult({
      exercises,
      answers,
      isExam: false,
      passThreshold: 0.7,
      nextLesson,
    });

    expect(res.guest).toBe(true);
    expect(res.accuracy).toBe(1);
    expect(res.passed).toBe(true);
    expect(res.correctCount).toBe(2);
    expect(res.total).toBe(2);
    expect(res.xpGain).toBe(0);
    expect(res.nextLesson).toEqual(nextLesson);
    expect((res as Record<string, unknown>).character).toBeUndefined();
    expect((res as Record<string, unknown>).certificate).toBeUndefined();
    expect((res as Record<string, unknown>).hearts).toBeUndefined();
    expect((res as Record<string, unknown>).streakDays).toBeUndefined();
  });

  it("does not claim certificate or award XP on exam pass", () => {
    const answers = [
      { exerciseId: "ex1", answer: 1 },
      { exerciseId: "ex2", answer: 0 },
    ];
    const res = buildGuestSubmitResult({
      exercises,
      answers,
      isExam: true,
      passThreshold: 0.8,
      nextLesson: null,
    });

    expect(res.guest).toBe(true);
    expect(res.isExam).toBe(true);
    expect(res.passed).toBe(true);
    expect(res.examFailed).toBe(false);
    expect(res.xpGain).toBe(0);
    expect((res as Record<string, unknown>).certificate).toBeUndefined();
  });

  it("handles failed attempt properly", () => {
    const answers = [
      { exerciseId: "ex1", answer: 0 }, // wrong
      { exerciseId: "ex2", answer: 1 }, // wrong
    ];
    const res = buildGuestSubmitResult({
      exercises,
      answers,
      isExam: true,
      passThreshold: 0.7,
      nextLesson: {
        id: "next-1",
        titleUk: "Next",
        titleEn: "Next",
        href: "/courses/test/lessons/next-1",
      },
    });

    expect(res.guest).toBe(true);
    expect(res.accuracy).toBe(0);
    expect(res.passed).toBe(false);
    expect(res.isExam).toBe(true);
    expect(res.examFailed).toBe(true);
    expect(res.nextLesson).toBeNull();
    expect(res.xpGain).toBe(0);
  });
});

