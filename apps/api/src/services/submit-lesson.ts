import { and, asc, eq, gt } from "drizzle-orm";
import {
  characters,
  courses,
  lessons,
  skillAttempts,
  userCourseProgress,
  userLessonProgress,
} from "@eduforge/db";
import {
  COURSE_GLOBAL_WEIGHT,
  DAILY_XP_CAP,
  FRAME_CATALOG,
  TITLE_CATALOG,
  applyStreakOnActivity,
  chessPuzzleXpAward,
  globalXpFromCourseGain,
  lessonCompleteThreshold,
  lessonXpAward,
  levelFromXp,
  logicXpAward,
  maxHearts,
  normalizeProgression,
  readingXpAward,
  regenerateHearts,
  rollLevelUpLoot,
  typingXpAward,
  utcDateKey,
  type GrantedRewardItem,
  type LevelChangeTrigger,
  type LootDrop,
  type Plan,
} from "@eduforge/shared";
import type { AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";
import { gradeExercise } from "../grade.js";
import { log } from "../logger.js";
import { buildXpPatch } from "./character-progression.js";
import { applyLootDrop } from "./loot-apply.js";
import { runSubmitSideEffects } from "./submit-side-effects.js";

export type SubmitAnswer = { exerciseId: string; answer: unknown };

export type GradedExerciseResult = {
  exerciseId: string;
  type: string;
  correct: boolean;
  partial?: number;
  meta?: Record<string, unknown>;
  [k: string]: unknown;
};

export type LessonGradingResult = {
  results: GradedExerciseResult[];
  correctCount: number;
  accuracy: number;
  passThreshold: number;
  passed: boolean;
  isExam: boolean;
  examFailed: boolean;
};

export type NextLessonSummary = {
  id: string;
  titleUk: string;
  titleEn: string | null;
  href: string;
};

function lootDropToRewardItem(drop: LootDrop): GrantedRewardItem {
  switch (drop.kind) {
    case "xp":
      return {
        kind: "bonus_xp",
        amount: drop.amount ?? 0,
        labelUk: drop.labelUk,
        labelEn: drop.labelEn,
        icon: drop.icon,
        source: "loot",
      };
    case "freeze":
      return {
        kind: "freeze",
        amount: drop.amount ?? 1,
        labelUk: drop.labelUk,
        labelEn: drop.labelEn,
        icon: drop.icon,
        source: "loot",
      };
    case "avatar":
      return {
        kind: "avatar",
        key: drop.key,
        labelUk: drop.labelUk,
        labelEn: drop.labelEn,
        icon: drop.icon,
        source: "loot",
      };
    case "title":
      return {
        kind: "title",
        key: drop.key,
        labelUk: drop.labelUk,
        labelEn: drop.labelEn,
        icon: drop.icon,
        source: "loot",
      };
    case "frame":
      return {
        kind: "frame",
        key: drop.key,
        labelUk: drop.labelUk,
        labelEn: drop.labelEn,
        icon: drop.icon,
        source: "loot",
      };
    case "skill_point":
      return {
        kind: "skill_points",
        amount: drop.amount ?? 1,
        labelUk: drop.labelUk,
        labelEn: drop.labelEn,
        icon: drop.icon,
        source: "loot",
      };
  }
}

export function gradeLessonAttempt(
  exercises: { id: string; type: string; [k: string]: unknown }[],
  answers: SubmitAnswer[],
  isExam: boolean,
  passThreshold?: number | null,
): LessonGradingResult {
  const results = exercises.map((ex) => {
    const a = answers.find((x) => x.exerciseId === ex.id);
    const graded = gradeExercise(ex, a?.answer);
    return { exerciseId: ex.id, type: ex.type, ...graded };
  });

  const correctCount = results.filter((r) => r.correct).length;
  const accuracy = exercises.length
    ? results.reduce((sum, r) => {
        if (typeof r.partial === "number") return sum + Math.min(1, Math.max(0, r.partial));
        return sum + (r.correct ? 1 : 0);
      }, 0) / exercises.length
    : 0;

  const completeBar = lessonCompleteThreshold({
    isExam,
    passThreshold,
  });
  const passed = accuracy + 1e-9 >= completeBar;

  return {
    results,
    correctCount,
    accuracy,
    passThreshold: completeBar,
    passed,
    isExam,
    examFailed: isExam && !passed,
  };
}

export async function getNextCourseLesson(
  courseId: string,
  courseSlug: string,
  currentSortOrder: number,
): Promise<NextLessonSummary | null> {
  const next = await db.query.lessons.findFirst({
    where: and(
      eq(lessons.courseId, courseId),
      gt(lessons.sortOrder, currentSortOrder),
    ),
    orderBy: [asc(lessons.sortOrder)],
  });
  if (!next) return null;
  return {
    id: next.id,
    titleUk: next.titleUk,
    titleEn: next.titleEn ?? null,
    href: `/courses/${courseSlug}/lessons/${next.id}`,
  };
}

export type GuestSubmitResultBody = {
  guest: true;
  accuracy: number;
  passed: boolean;
  results: GradedExerciseResult[];
  correctCount: number;
  total: number;
  isExam: boolean;
  examFailed: boolean;
  passThreshold: number;
  nextLesson: NextLessonSummary | null;
  xpGain: 0;
};

export function buildGuestSubmitResult(opts: {
  exercises: { id: string; type: string; [k: string]: unknown }[];
  answers: SubmitAnswer[];
  isExam: boolean;
  passThreshold?: number | null;
  nextLesson: NextLessonSummary | null;
}): GuestSubmitResultBody {
  const grading = gradeLessonAttempt(
    opts.exercises,
    opts.answers,
    opts.isExam,
    opts.passThreshold,
  );
  return {
    guest: true,
    accuracy: grading.accuracy,
    passed: grading.passed,
    results: grading.results,
    correctCount: grading.correctCount,
    total: opts.exercises.length,
    isExam: grading.isExam,
    examFailed: grading.examFailed,
    passThreshold: grading.passThreshold,
    nextLesson: grading.passed ? opts.nextLesson : null,
    xpGain: 0,
  };
}

export type SubmitLessonInput = {
  user: AuthedUser;
  lessonId: string;
  answers: SubmitAnswer[];
  usedHint?: boolean;
};

export type SubmitLessonError = {
  ok: false;
  status: 404;
  error: "not_found";
};

export type SubmitLessonSuccess = {
  ok: true;
  status: 200;
  body: Record<string, unknown>;
};

export type SubmitLessonResult = SubmitLessonError | SubmitLessonSuccess;

/**
 * Grade a lesson attempt, update progress/XP/streak, side-effects (quests, certs).
 * Thin HTTP layer lives in courses routes.
 */
export async function submitLesson(
  input: SubmitLessonInput,
): Promise<SubmitLessonResult> {
  const { user, lessonId, answers, usedHint } = input;

  const lesson = await db.query.lessons.findFirst({ where: eq(lessons.id, lessonId) });
  if (!lesson) return { ok: false, status: 404, error: "not_found" };
  const course = await db.query.courses.findFirst({ where: eq(courses.id, lesson.courseId) });
  if (!course) return { ok: false, status: 404, error: "not_found" };

  const exercises =
    (lesson.exercises as { id: string; type: string; [k: string]: unknown }[]) ?? [];
  const grading = gradeLessonAttempt(
    exercises,
    answers,
    Boolean(lesson.isExam),
    lesson.passThreshold,
  );
  const { results, correctCount, accuracy, isExam, passThreshold: completeBar, passed } = grading;
  const outcome: "passed" | "failed" = passed ? "passed" : "failed";

  let xpGain = 0;
  if (course.slug === "typing") {
    const typingRes = results.find((r) => r.type === "typing");
    const wpm = Number(typingRes?.meta?.wpm ?? 0);
    const acc = Number(typingRes?.meta?.accuracy ?? accuracy);
    xpGain = typingXpAward(wpm, acc);
  } else if (course.slug === "speed_reading") {
    const comp = results.find((r) => r.type === "comprehension");
    const rsvp = results.find((r) => r.type === "rsvp");
    const comprehension = Number(comp?.meta?.comprehension ?? accuracy);
    const wpm = Number(rsvp?.meta?.wpm ?? 250);
    xpGain = readingXpAward(wpm, comprehension);
  } else if (course.slug === "logic") {
    xpGain = results.reduce((sum, r) => {
      if (!r.correct) return sum;
      const ex = exercises.find((e) => e.id === r.exerciseId);
      return sum + logicXpAward(Number(ex?.difficulty ?? lesson.difficulty), Boolean(usedHint));
    }, 0);
  } else if (course.slug === "chess") {
    xpGain = results.reduce((sum, r) => {
      if (!r.correct) return sum;
      const ex = exercises.find((e) => e.id === r.exerciseId);
      if (ex?.type === "chess_puzzle") {
        return sum + chessPuzzleXpAward(Number(ex.difficulty ?? 1), true);
      }
      return sum + 8;
    }, 0);
  } else {
    xpGain = lessonXpAward({
      baseXp: lesson.baseXp,
      accuracy,
      firstClear: true,
      difficulty: lesson.difficulty,
    });
  }

  const prevLp = await db.query.userLessonProgress.findFirst({
    where: and(
      eq(userLessonProgress.userId, user.id),
      eq(userLessonProgress.lessonId, lesson.id),
    ),
  });
  const firstClear = passed && (!prevLp || prevLp.status !== "completed");
  if (isExam && !passed) {
    xpGain = 0;
  } else if (prevLp && prevLp.status === "completed") {
    xpGain = Math.max(1, Math.floor(xpGain * 0.35));
  }

  if (prevLp) {
    await db
      .update(userLessonProgress)
      .set({
        status: passed ? "completed" : prevLp.status,
        bestScore: Math.max(prevLp.bestScore, accuracy),
        attempts: prevLp.attempts + 1,
        completedAt: passed ? prevLp.completedAt ?? new Date() : prevLp.completedAt,
      })
      .where(eq(userLessonProgress.id, prevLp.id));
  } else {
    await db.insert(userLessonProgress).values({
      userId: user.id,
      lessonId: lesson.id,
      courseId: course.id,
      status: passed ? "completed" : "available",
      bestScore: accuracy,
      attempts: 1,
      completedAt: passed ? new Date() : null,
    });
  }

  const plan = user.plan as Plan;
  const characterEarly = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  const progressionEarly = characterEarly
    ? normalizeProgression(characterEarly.progression)
    : null;

  let cp = await db.query.userCourseProgress.findFirst({
    where: and(
      eq(userCourseProgress.userId, user.id),
      eq(userCourseProgress.courseId, course.id),
    ),
  });
  if (!cp) {
    const [created] = await db
      .insert(userCourseProgress)
      .values({
        userId: user.id,
        courseId: course.id,
        xp: 0,
        level: 1,
        hearts: maxHearts(plan, progressionEarly),
      })
      .returning();
    cp = created;
  } else {
    const regen = regenerateHearts({
      plan,
      hearts: cp.hearts,
      heartsUpdatedAt: cp.heartsUpdatedAt,
      progression: progressionEarly,
    });
    if (regen.changed) {
      const [updated] = await db
        .update(userCourseProgress)
        .set({ hearts: regen.hearts, heartsUpdatedAt: regen.heartsUpdatedAt })
        .where(eq(userCourseProgress.id, cp.id))
        .returning();
      cp = updated;
    }
  }

  const hearts = cp.hearts;
  const heartLost = false;

  const courseLevelBefore = cp.level ?? 1;
  const newCourseXp = cp.xp + xpGain;
  const newCourseLevel = levelFromXp(newCourseXp);
  const courseLevelUp = newCourseLevel > courseLevelBefore;
  const completedLessons =
    firstClear && passed ? cp.completedLessons + 1 : cp.completedLessons;

  await db
    .update(userCourseProgress)
    .set({
      xp: newCourseXp,
      level: newCourseLevel,
      completedLessons,
      lastLessonId: lesson.id,
      hearts,
      heartsUpdatedAt: heartLost ? new Date() : cp.heartsUpdatedAt,
    })
    .where(eq(userCourseProgress.id, cp.id));

  const character = characterEarly;
  const weight = COURSE_GLOBAL_WEIGHT[course.slug] ?? 1;
  const globalGain = xpGain > 0 ? globalXpFromCourseGain(xpGain, weight) : 0;
  const today = utcDateKey();
  let streak = character?.streakDays ?? 0;
  let freezesLeft = character?.streakFreezes ?? 0;
  let streakProtected = false;
  let characterXpGain = 0;
  let characterLevelBefore: number | null = character ? character.globalLevel : null;
  let characterLevelAfter: number | null = character ? character.globalLevel : null;
  let characterLevelUp = false;
  let dailyCapReached = false;
  const grantedRewards: GrantedRewardItem[] = [];

  if (character) {
    const streakResult = applyStreakOnActivity({
      lastActiveDate: character.lastActiveDate,
      today,
      streakDays: character.streakDays ?? 0,
      streakFreezes: character.streakFreezes ?? 0,
    });
    streak = streakResult.streakDays;
    freezesLeft = streakResult.streakFreezes;
    streakProtected = streakResult.protected;
    if (streakResult.protected) {
      await notifyUser(db, user.id, {
        type: "streak",
        titleUk: "🛡️ Щит серії спрацював!",
        titleEn: "🛡️ Streak shield used!",
        bodyUk: `Серію ${streak} днів збережено. Залишилось щитів: ${freezesLeft}`,
        bodyEn: `Your ${streak}-day streak was saved. Shields left: ${freezesLeft}`,
        href: "/shop",
      });
      await logActivity(db, user.id, "streak_shield_used", {
        streakDays: streak,
        freezesLeft,
      });
    }

    const prevLevel = character.globalLevel;
    const prevProgression = normalizeProgression(character.progression);
    const alreadyToday = character.dailyXpDate === today ? (character.dailyXp ?? 0) : 0;
    const dailyXpRemaining = Math.max(0, DAILY_XP_CAP - Math.max(0, alreadyToday));

    // Apply daily XP cap BEFORE level rewards so progression/loot uses final capped level
    const xpPatch = buildXpPatch(character, globalGain, {
      applyIntellect: true,
      applySpark: true,
      dailyXpRemaining,
    });
    characterXpGain = xpPatch.effectiveGain;
    dailyCapReached =
      xpPatch.dailyCapApplied || (globalGain > 0 && dailyXpRemaining === 0);
    const dailyXp = alreadyToday + xpPatch.effectiveGain;

    await db
      .update(characters)
      .set({
        globalXp: xpPatch.globalXp,
        globalLevel: xpPatch.globalLevel,
        progression: xpPatch.progression,
        streakDays: streak,
        streakFreezes: freezesLeft,
        lastActiveDate: today,
        dailyXp,
        dailyXpDate: today,
      })
      .where(eq(characters.id, character.id));

    characterLevelBefore = prevLevel;
    characterLevelAfter = xpPatch.globalLevel;

    if (xpPatch.globalLevel > prevLevel) {
      const spGained = Math.max(
        0,
        xpPatch.progression.skillPoints - prevProgression.skillPoints,
      );
      if (spGained > 0) {
        grantedRewards.push({
          kind: "skill_points",
          amount: spGained,
          labelUk: `+${spGained} оч. навичок`,
          labelEn: `+${spGained} skill point${spGained === 1 ? "" : "s"}`,
          icon: "⭐",
          source: "level_up",
        });
      }
      const prevTitles = new Set(prevProgression.unlockedTitles);
      for (const titleId of xpPatch.progression.unlockedTitles) {
        if (prevTitles.has(titleId)) continue;
        const def = TITLE_CATALOG.find((t) => t.id === titleId);
        grantedRewards.push({
          kind: "title",
          key: titleId,
          labelUk: def?.titleUk ?? titleId,
          labelEn: def?.titleEn ?? titleId,
          icon: "🏷️",
          source: "level_up",
        });
      }
      const prevFrames = new Set(prevProgression.unlockedFrames);
      for (const frameId of xpPatch.progression.unlockedFrames) {
        if (prevFrames.has(frameId)) continue;
        const def = FRAME_CATALOG.find((f) => f.id === frameId);
        grantedRewards.push({
          kind: "frame",
          key: frameId,
          labelUk: def?.titleUk ?? frameId,
          labelEn: def?.titleEn ?? frameId,
          icon: "🖼️",
          source: "level_up",
        });
      }

      // Level-up loot drop (cosmetics / shields / bonus SP / bonus XP)
      try {
        const drop = rollLevelUpLoot(xpPatch.globalLevel);
        const lootRes = await applyLootDrop(user.id, drop, { notify: true });
        if (lootRes) {
          grantedRewards.push(lootDropToRewardItem(lootRes.drop));
          if (lootRes.character && lootRes.character.globalLevel > xpPatch.globalLevel) {
            characterLevelAfter = lootRes.character.globalLevel;
            if (lootRes.drop.kind === "xp") {
              const postLootProg = normalizeProgression(lootRes.character.progression);
              const extraSp = Math.max(
                0,
                postLootProg.skillPoints - xpPatch.progression.skillPoints,
              );
              if (extraSp > 0) {
                grantedRewards.push({
                  kind: "skill_points",
                  amount: extraSp,
                  labelUk: `+${extraSp} оч. навичок`,
                  labelEn: `+${extraSp} skill point${extraSp === 1 ? "" : "s"}`,
                  icon: "⭐",
                  source: "level_up",
                });
              }
            }
          }
          await logActivity(db, user.id, "level_up_loot", {
            level: characterLevelAfter,
            drop: lootRes.drop,
            trigger: "lesson",
          });
        }
      } catch (err) {
        log.warn("level_up_loot_failed", {
          userId: user.id,
          level: xpPatch.globalLevel,
          err: err instanceof Error ? err.message : String(err),
        });
      }
    }

    characterLevelUp =
      characterLevelBefore !== null &&
      characterLevelAfter !== null &&
      characterLevelAfter > characterLevelBefore;
  }

  if (character) {
    const o = { ...(character.onboarding ?? {}) };
    let dirty = false;
    if (!o.completedFirstLesson && passed) {
      o.completedFirstLesson = true;
      dirty = true;
    }
    if (course.slug === "typing" && !o.triedTyping) {
      o.triedTyping = true;
      dirty = true;
    }
    if (dirty) {
      await db
        .update(characters)
        .set({ onboarding: o })
        .where(eq(characters.id, character.id));
    }
  }

  const chAfter = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  const dailyGoalMet = Boolean(
    chAfter &&
      chAfter.dailyXpDate === today &&
      chAfter.dailyXp >= (chAfter.dailyGoalXp || 50),
  );

  // Non-critical side effects (notify, cert, quests, analytics) — best-effort
  const side = await runSubmitSideEffects({
    user,
    courseSlug: course.slug,
    courseId: course.id,
    courseTitleUk: course.titleUk,
    courseTitleEn: course.titleEn || course.titleUk,
    lessonId: lesson.id,
    passed,
    firstClear,
    isExam,
    accuracy,
    completeBar,
    xpGain,
    globalGain,
    results,
    streakDays: chAfter?.streakDays,
    globalLevel: chAfter?.globalLevel,
    dailyGoalMet,
  });
  const { homeworkCompleted, newAchievements, certificate, newPathBadges } = side;

  if (certificate) {
    grantedRewards.push({
      kind: "certificate",
      key: certificate.code,
      labelUk: certificate.titleUk,
      labelEn: certificate.titleEn ?? certificate.titleUk,
      icon: "📜",
      source: "lesson",
    });
  }
  for (const pb of newPathBadges) {
    grantedRewards.push({
      kind: "path_badge",
      key: pb.id,
      amount: pb.rewardSkillPoints,
      labelUk: pb.titleUk,
      labelEn: pb.titleEn,
      icon: pb.icon,
      source: "lesson",
    });
  }
  for (const ach of newAchievements) {
    grantedRewards.push({
      kind: "achievement",
      key: ach.code,
      labelUk: ach.titleUk,
      labelEn: ach.titleEn,
      icon: ach.icon,
      source: "lesson",
    });
  }

  const levelChangeTrigger: LevelChangeTrigger =
    courseLevelUp || characterLevelUp ? "lesson" : null;

  if (levelChangeTrigger === "lesson") {
    await logActivity(db, user.id, "level_up_lesson", {
      trigger: "lesson",
      courseSlug: course.slug,
      lessonId: lesson.id,
      courseLevelBefore,
      courseLevelAfter: newCourseLevel,
      characterLevelBefore,
      characterLevelAfter,
    }).catch(() => undefined);
  }

  await db.insert(skillAttempts).values({
    userId: user.id,
    courseSlug: course.slug,
    metrics: {
      accuracy,
      results,
      lessonId: lesson.id,
      outcome,
      isExam,
      passThreshold: completeBar,
      firstClear,
      characterXpGained: characterXpGain,
      courseLevelBefore,
      courseLevelAfter: newCourseLevel,
      characterLevelBefore,
      characterLevelAfter,
      levelChangeTrigger,
      grantedRewards,
    },
    xpGained: xpGain,
  });

  const updatedCharacter = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });

  // Next lesson in course path (by sortOrder) for one-tap continue
  const nextLesson = passed
    ? await getNextCourseLesson(course.id, course.slug, lesson.sortOrder)
    : null;

  return {
    ok: true,
    status: 200,
    body: {
      accuracy,
      correctCount,
      total: exercises.length,
      xpGain,
      globalGain,
      courseXp: newCourseXp,
      courseLevel: newCourseLevel,
      courseLevelBefore,
      courseLevelAfter: newCourseLevel,
      courseLevelUp,
      levelUp: courseLevelUp,
      characterXpGain,
      characterLevelBefore,
      characterLevelAfter,
      characterLevelUp,
      levelChangeTrigger,
      dailyCapReached,
      grantedRewards,
      outcome,
      firstClear,
      results,
      character: updatedCharacter,
      hearts,
      maxHearts: maxHearts(plan, progressionEarly),
      heartLost,
      streakProtected,
      streakDays: streak,
      streakFreezes: freezesLeft,
      newAchievements,
      certificate: certificate
        ? { code: certificate.code, titleUk: certificate.titleUk }
        : null,
      homeworkCompleted,
      isExam,
      passed,
      passThreshold: completeBar,
      examFailed: isExam && !passed,
      nextLesson,
    },
  };
}
