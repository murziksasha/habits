import { beforeEach, describe, expect, it, vi } from "vitest";
import { DAILY_XP_CAP } from "@eduforge/shared";

const state = vi.hoisted(() => ({
  lesson: null as Record<string, unknown> | null,
  course: null as Record<string, unknown> | null,
  prevLp: null as Record<string, unknown> | null,
  cp: null as Record<string, unknown> | null,
  character: null as Record<string, unknown> | null,
  nextLesson: null as Record<string, unknown> | null,
  unitLessons: [] as Record<string, unknown>[],
  unitProgress: [] as Record<string, unknown>[],
  characterUpdatePayloads: [] as Record<string, unknown>[],
  skillAttemptInserts: [] as Record<string, unknown>[],
  activityLogs: [] as { kind: string; payload: Record<string, unknown> }[],
  lootShouldFail: false,
  lootDropOverride: null as Record<string, unknown> | null,
}));

vi.mock("../db.js", () => {
  const mkTableProxy = (tableName: string) => ({ __table: tableName });
  return {
    db: {
      query: {
        lessons: {
          findFirst: vi.fn(async (args?: { where?: unknown }) => {
            void args;
            // First call gets current lesson; getNextCourseLesson also queries lessons
            if (state._readingNext) {
              state._readingNext = false;
              return state.nextLesson;
            }
            return state.lesson;
          }),
          findMany: vi.fn(async () => state.unitLessons),
        },
        courses: {
          findFirst: vi.fn(async () => state.course),
        },
        userLessonProgress: {
          findFirst: vi.fn(async () => state.prevLp),
          findMany: vi.fn(async () => state.unitProgress),
        },
        userCourseProgress: {
          findFirst: vi.fn(async () => state.cp),
        },
        characters: {
          findFirst: vi.fn(async () => state.character),
        },
      },
      insert: vi.fn((tbl: { __table?: string }) => ({
        values: vi.fn((vals: Record<string, unknown>) => {
          if (tbl?.__table === "skill_attempts") {
            state.skillAttemptInserts.push(vals);
          }
          if (tbl?.__table === "user_course_progress") {
            state.cp = { id: "cp-1", ...vals };
          }
          return {
            returning: vi.fn(async () => [state.cp ?? vals]),
          };
        }),
      })),
      update: vi.fn((tbl: { __table?: string }) => ({
        set: vi.fn((vals: Record<string, unknown>) => {
          if (tbl?.__table === "characters") {
            state.characterUpdatePayloads.push(vals);
            state.character = { ...(state.character ?? {}), ...vals };
          }
          if (tbl?.__table === "user_course_progress") {
            state.cp = { ...(state.cp ?? {}), ...vals };
          }
          return {
            where: vi.fn(() => ({
              returning: vi.fn(async () => [state.character ?? state.cp ?? vals]),
            })),
          };
        }),
      })),
    },
    __mkTableProxy: mkTableProxy,
  };
});

vi.mock("@eduforge/db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@eduforge/db")>();
  return {
    ...actual,
    characters: { ...actual.characters, __table: "characters" },
    courses: { ...actual.courses, __table: "courses" },
    lessons: { ...actual.lessons, __table: "lessons" },
    skillAttempts: { ...actual.skillAttempts, __table: "skill_attempts" },
    userCourseProgress: { ...actual.userCourseProgress, __table: "user_course_progress" },
    userLessonProgress: { ...actual.userLessonProgress, __table: "user_lesson_progress" },
  };
});

vi.mock("../engagement.js", () => ({
  logActivity: vi.fn(async (_db: unknown, _uid: string, kind: string, payload: Record<string, unknown>) => {
    state.activityLogs.push({ kind, payload });
  }),
  notifyUser: vi.fn(async () => undefined),
  evaluateAchievements: vi.fn(async () => []),
}));

vi.mock("./loot-apply.js", () => ({
  applyLootDrop: vi.fn(async (_userId: string, drop: Record<string, unknown>) => {
    if (state.lootShouldFail) {
      throw new Error("loot_apply_failed");
    }
    const usedDrop = state.lootDropOverride ?? drop;
    return {
      character: state.character,
      drop: usedDrop,
    };
  }),
}));

vi.mock("./submit-side-effects.js", () => ({
  runSubmitSideEffects: vi.fn(async () => ({
    homeworkCompleted: 0,
    newAchievements: [],
    certificate: null,
    newPathBadges: [],
  })),
}));

import { submitLesson } from "./submit-lesson.js";
import { applyLootDrop } from "./loot-apply.js";

const user = {
  id: "user-1",
  email: "u@test.com",
  role: "user",
  plan: "free",
} as never;

const mcqLesson = {
  id: "lesson-1",
  courseId: "course-1",
  unitId: "unit-1",
  slug: "l1",
  titleUk: "Урок 1",
  titleEn: "Lesson 1",
  sortOrder: 1,
  baseXp: 15,
  difficulty: 1,
  isFree: true,
  isExam: false,
  passThreshold: null,
  exercises: [{ id: "e1", type: "mcq", promptUk: "Q", options: ["A", "B"], correctIndex: 0 }],
};

const englishCourse = {
  id: "course-1",
  slug: "english",
  titleUk: "Англійська",
  titleEn: "English",
  status: "published",
  isVisible: true,
};

describe("submitLesson progression, daily cap, and reward failures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    state.lesson = { ...mcqLesson };
    state.course = { ...englishCourse };
    state.prevLp = null;
    state.cp = {
      id: "cp-1",
      userId: "user-1",
      courseId: "course-1",
      xp: 0,
      level: 1,
      hearts: 5,
      heartsUpdatedAt: new Date(),
      completedLessons: 0,
    };
    state.character = {
      id: "ch-1",
      userId: "user-1",
      displayName: "Tester",
      globalXp: 0,
      globalLevel: 1,
      streakDays: 0,
      lastActiveDate: null,
      dailyXp: 0,
      dailyXpDate: null,
      dailyGoalXp: 50,
      streakFreezes: 0,
      onboarding: {},
      progression: {
        lastLevelAwarded: 1,
        skillPoints: 0,
        talents: {},
        unlockedTitles: ["rookie"],
        unlockedFrames: ["none"],
      },
    };
    state.nextLesson = null;
    state.unitLessons = [];
    state.unitProgress = [];
    state.characterUpdatePayloads = [];
    state.skillAttemptInserts = [];
    state.activityLogs = [];
    state.lootShouldFail = false;
    state.lootDropOverride = null;
    (state as { _readingNext?: boolean })._readingNext = false;
  });

  it("handles course-only level-up while keeping character level unchanged", async () => {
    // Course XP 90 -> +30 crosses 100 (course L1 -> L2); character XP 0 -> +30 stays L1
    state.cp!.xp = 90;
    state.cp!.level = 1;
    state.character!.globalXp = 0;
    state.character!.globalLevel = 1;

    const res = await submitLesson({
      user,
      lessonId: "lesson-1",
      answers: [{ exerciseId: "e1", answer: 0 }],
    });

    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.body.courseLevelBefore).toBe(1);
    expect(res.body.courseLevelAfter).toBe(2);
    expect(res.body.courseLevelUp).toBe(true);
    expect(res.body.levelUp).toBe(true);
    expect(res.body.characterLevelBefore).toBe(1);
    expect(res.body.characterLevelAfter).toBe(1);
    expect(res.body.characterLevelUp).toBe(false);
    expect(res.body.levelChangeTrigger).toBe("lesson");
    expect(res.body.characterXpGain).toBeGreaterThan(0);
    expect(applyLootDrop).not.toHaveBeenCalled();

    const attempt = state.skillAttemptInserts[0] as { metrics: Record<string, unknown> };
    expect(attempt.metrics.outcome).toBe("passed");
    expect(attempt.metrics.courseLevelBefore).toBe(1);
    expect(attempt.metrics.courseLevelAfter).toBe(2);
    expect(attempt.metrics.characterLevelBefore).toBe(1);
    expect(attempt.metrics.characterLevelAfter).toBe(1);
    expect(attempt.metrics.levelChangeTrigger).toBe("lesson");
  });

  it("handles character-only level-up and keeps levelUp (course) false", async () => {
    // Course XP 0 -> stays L1; character XP 90 -> +30 crosses 100 (L1 -> L2)
    state.cp!.xp = 0;
    state.cp!.level = 1;
    state.character!.globalXp = 90;
    state.character!.globalLevel = 1;
    state.lootDropOverride = {
      kind: "freeze",
      amount: 1,
      labelUk: "+1 щит серії",
      labelEn: "+1 streak shield",
      icon: "🛡️",
    };

    const res = await submitLesson({
      user,
      lessonId: "lesson-1",
      answers: [{ exerciseId: "e1", answer: 0 }],
    });

    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.body.courseLevelUp).toBe(false);
    expect(res.body.levelUp).toBe(false);
    expect(res.body.characterLevelBefore).toBe(1);
    expect(res.body.characterLevelAfter).toBe(2);
    expect(res.body.characterLevelUp).toBe(true);
    expect(res.body.levelChangeTrigger).toBe("lesson");
    expect(applyLootDrop).toHaveBeenCalledTimes(1);

    const rewards = res.body.grantedRewards as { kind: string; source: string }[];
    expect(rewards.some((r) => r.kind === "skill_points" && r.source === "level_up")).toBe(true);
    expect(rewards.some((r) => r.kind === "freeze" && r.source === "loot")).toBe(true);
  });

  it("handles simultaneous course and character level-ups", async () => {
    state.cp!.xp = 90;
    state.cp!.level = 1;
    state.character!.globalXp = 90;
    state.character!.globalLevel = 1;

    const res = await submitLesson({
      user,
      lessonId: "lesson-1",
      answers: [{ exerciseId: "e1", answer: 0 }],
    });

    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.body.courseLevelUp).toBe(true);
    expect(res.body.levelUp).toBe(true);
    expect(res.body.characterLevelUp).toBe(true);
    expect(res.body.courseLevelBefore).toBe(1);
    expect(res.body.courseLevelAfter).toBe(2);
    expect(res.body.characterLevelBefore).toBe(1);
    expect(res.body.characterLevelAfter).toBe(2);
    expect(res.body.levelChangeTrigger).toBe("lesson");
  });

  it("applies level rewards using the final level AFTER the daily XP cap", async () => {
    const today = new Date().toISOString().slice(0, 10);
    // Character is 10 XP away from Level 2, but only 5 XP left under DAILY_XP_CAP today!
    state.character!.globalXp = 90;
    state.character!.globalLevel = 1;
    state.character!.dailyXpDate = today;
    state.character!.dailyXp = DAILY_XP_CAP - 5;

    const res = await submitLesson({
      user,
      lessonId: "lesson-1",
      answers: [{ exerciseId: "e1", answer: 0 }],
    });

    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.body.characterXpGain).toBe(5);
    expect(res.body.dailyCapReached).toBe(true);
    expect(res.body.characterLevelBefore).toBe(1);
    expect(res.body.characterLevelAfter).toBe(1);
    expect(res.body.characterLevelUp).toBe(false);

    // Crucially: progression must NOT have awarded Level 2 skill points or updated lastLevelAwarded to 2!
    const charUpdate = state.characterUpdatePayloads[0] as {
      globalXp: number;
      globalLevel: number;
      progression: { skillPoints: number; lastLevelAwarded: number };
    };
    expect(charUpdate.globalXp).toBe(95);
    expect(charUpdate.globalLevel).toBe(1);
    expect(charUpdate.progression.skillPoints).toBe(0);
    expect(charUpdate.progression.lastLevelAwarded).toBe(1);
    expect(applyLootDrop).not.toHaveBeenCalled();
  });

  it("still succeeds when level-up loot fails and excludes failed loot from grantedRewards", async () => {
    state.character!.globalXp = 90;
    state.character!.globalLevel = 1;
    state.lootShouldFail = true;

    const res = await submitLesson({
      user,
      lessonId: "lesson-1",
      answers: [{ exerciseId: "e1", answer: 0 }],
    });

    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.body.characterLevelUp).toBe(true);
    const rewards = res.body.grantedRewards as { kind: string; source: string }[];
    // Skill points from applyLevelUps were saved and included, but failed loot is NOT in grantedRewards
    expect(rewards.some((r) => r.kind === "skill_points" && r.source === "level_up")).toBe(true);
    expect(rewards.some((r) => r.source === "loot")).toBe(false);
  });

  it("awards 0 course XP and 0 character XP on failed exam", async () => {
    state.lesson!.isExam = true;
    state.lesson!.passThreshold = 0.7;

    const res = await submitLesson({
      user,
      lessonId: "lesson-1",
      answers: [{ exerciseId: "e1", answer: 1 }], // wrong
    });

    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.body.passed).toBe(false);
    expect(res.body.examFailed).toBe(true);
    expect(res.body.outcome).toBe("failed");
    expect(res.body.xpGain).toBe(0);
    expect(res.body.characterXpGain).toBe(0);
    expect(res.body.levelChangeTrigger).toBeNull();
  });

  it("submits code_judge in text mode and awards normal XP", async () => {
    state.lesson!.exercises = [
      {
        id: "cj1",
        type: "code_judge",
        language: "javascript",
        starter: "",
        tests: [{ type: "stdout_contains", value: "Hello" }],
        requiredSource: ["console.log"],
      },
    ];

    const res = await submitLesson({
      user,
      lessonId: "lesson-1",
      answers: [
        {
          exerciseId: "cj1",
          answer: { mode: "text", source: 'console.log("Hello");' },
        },
      ],
    });

    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.body.passed).toBe(true);
    expect(res.body.accuracy).toBe(1);
    expect(res.body.xpGain).toBeGreaterThan(0);
  });

  it("returns judge_unavailable (503) without penalizing user when judge is disabled", async () => {
    state.lesson!.exercises = [
      {
        id: "cj1",
        type: "code_judge",
        language: "javascript",
        starter: "",
        tests: [{ type: "stdout_contains", value: "Hello" }],
      },
    ];

    const prevHearts = state.character?.hearts ?? 5;

    // By default in test environment getJudgeMode() may return local or off, let's test mode: "behavior"
    // with judge off or mocked
    const res = await submitLesson({
      user,
      lessonId: "lesson-1",
      answers: [
        {
          exerciseId: "cj1",
          // Client sends spoofed ok: true in behavior mode
          answer: { mode: "behavior", source: "console.log(1)", ok: true },
        },
      ],
    });

    // In dev / test when local or off:
    // If judge is off: returns judge_unavailable status 503
    // Or if local judge runs: it checks source and rejects client's spoofed ok: true
    if (!res.ok) {
      expect(res.status).toBe(503);
      expect(res.error).toBe("judge_unavailable");
      // Hearts must NOT be deducted
      expect(state.character?.hearts ?? 5).toBe(prevHearts);
    } else {
      // If local judge ran, accuracy must NOT be 1 from client's spoofed ok: true!
      expect(res.body.accuracy).toBe(0);
    }
  });

  it("records assisted evidence when the answer used a hint", async () => {
    const res = await submitLesson({
      user,
      lessonId: "lesson-1",
      answers: [{ exerciseId: "e1", answer: 0, hintsUsed: 1 }],
    });
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.body.evidenceLevel).toBe("assisted");
  });

  it("does not mark a theory-only lesson as self-verified", async () => {
    state.lesson!.exercises = [{ id: "c1", type: "concept", promptUk: "Theory" }];
    const res = await submitLesson({
      user,
      lessonId: "lesson-1",
      answers: [{ exerciseId: "c1", answer: { acknowledged: true } }],
    });
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.body.passed).toBe(true);
    expect(res.body.evidenceLevel).toBe("insufficient_data");
  });

  it("hides an unpublished course and a lesson from another slug", async () => {
    state.course!.status = "draft";
    const hidden = await submitLesson({ user, lessonId: "lesson-1", answers: [{ exerciseId: "e1", answer: 0 }] });
    expect(hidden.ok).toBe(false);
    if (hidden.ok) return;
    expect(hidden.status).toBe(404);
    expect(hidden.error).toBe("not_found");

    state.course!.status = "published";
    const mismatch = await submitLesson({
      user,
      lessonId: "lesson-1",
      courseSlug: "electrical_engineering",
      answers: [{ exerciseId: "e1", answer: 0 }],
    });
    expect(mismatch.ok).toBe(false);
    if (mismatch.ok) return;
    expect(mismatch.error).toBe("not_found");
  });

  it("rejects an exam until the current unit lessons are complete", async () => {
    state.lesson!.isExam = true;
    state.unitLessons = [
      { id: "taught", isExam: false, contentVersion: 2 },
    ];
    state.unitProgress = [{ lessonId: "taught", status: "completed", completedContentVersion: 1 }];
    const res = await submitLesson({
      user,
      lessonId: "lesson-1",
      answers: [{ exerciseId: "e1", answer: 0 }],
    });
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.status).toBe(403);
    expect(res.error).toBe("exam_locked");
  });
});
