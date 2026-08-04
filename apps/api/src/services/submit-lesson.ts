import { and, eq } from "drizzle-orm";
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
  applyStreakOnActivity,
  canStartLesson,
  chessPuzzleXpAward,
  globalXpFromCourseGain,
  lessonCompleteThreshold,
  lessonXpAward,
  levelFromXp,
  logicXpAward,
  maxHearts,
  readingXpAward,
  regenerateHearts,
  typingXpAward,
  type Plan,
} from "@eduforge/shared";
import type { AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { evaluateAchievements, logActivity, notifyUser } from "../engagement.js";
import { gradeExercise } from "../grade.js";
import { maybeIssueCertificate } from "../routes/certificates.js";
import { addWeeklyXp } from "../routes/challenges.js";
import { completeHomeworkForLesson } from "../routes/homework.js";

export type SubmitAnswer = { exerciseId: string; answer: unknown };

export type SubmitLessonInput = {
  user: AuthedUser;
  lessonId: string;
  answers: SubmitAnswer[];
  usedHint?: boolean;
};

export type SubmitLessonError = {
  ok: false;
  status: 404 | 402;
  error: "not_found" | "no_hearts";
  hearts?: number;
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
  const results = exercises.map((ex) => {
    const a = answers.find((x) => x.exerciseId === ex.id);
    const graded = gradeExercise(ex, a?.answer);
    return { exerciseId: ex.id, type: ex.type, ...graded };
  });

  const correctCount = results.filter((r) => r.correct).length;
  // Partial credit when exercises expose `partial` (projects, multi-check, comprehension)
  const accuracy = exercises.length
    ? results.reduce((sum, r) => {
        if (typeof r.partial === "number") return sum + Math.min(1, Math.max(0, r.partial));
        return sum + (r.correct ? 1 : 0);
      }, 0) / exercises.length
    : 0;
  const isExam = Boolean(lesson.isExam);
  const completeBar = lessonCompleteThreshold({
    isExam,
    passThreshold: lesson.passThreshold,
  });
  const passed = accuracy + 1e-9 >= completeBar;

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
        hearts: maxHearts(plan),
      })
      .returning();
    cp = created;
  } else {
    const regen = regenerateHearts({
      plan,
      hearts: cp.hearts,
      heartsUpdatedAt: cp.heartsUpdatedAt,
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

  if (!canStartLesson({ plan, hearts: cp.hearts })) {
    return { ok: false, status: 402, error: "no_hearts", hearts: cp.hearts };
  }

  let hearts = cp.hearts;
  let heartLost = false;
  if (plan !== "premium" && !passed) {
    hearts = Math.max(0, hearts - 1);
    heartLost = true;
  }

  const newCourseXp = cp.xp + xpGain;
  const newCourseLevel = levelFromXp(newCourseXp);
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

  const character = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  const weight = COURSE_GLOBAL_WEIGHT[course.slug] ?? 1;
  const globalGain = globalXpFromCourseGain(xpGain, weight);
  const today = new Date().toISOString().slice(0, 10);
  let streak = character?.streakDays ?? 0;
  let freezesLeft = character?.streakFreezes ?? 0;
  let streakProtected = false;
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
    const newGlobalXp = character.globalXp + globalGain;
    const dailyXp =
      character.dailyXpDate === today
        ? (character.dailyXp ?? 0) + globalGain
        : globalGain;
    await db
      .update(characters)
      .set({
        globalXp: newGlobalXp,
        globalLevel: levelFromXp(newGlobalXp),
        streakDays: streak,
        streakFreezes: freezesLeft,
        lastActiveDate: today,
        dailyXp,
        dailyXpDate: today,
      })
      .where(eq(characters.id, character.id));
  }

  await db.insert(skillAttempts).values({
    userId: user.id,
    courseSlug: course.slug,
    metrics: { accuracy, results, lessonId: lesson.id },
    xpGained: xpGain,
  });

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

  let homeworkCompleted = 0;
  if (passed) {
    await logActivity(db, user.id, isExam ? "exam_passed" : "lesson_completed", {
      courseSlug: course.slug,
      lessonId: lesson.id,
      xpGain,
      isExam,
      accuracy,
    });
    await addWeeklyXp(user.id, globalGain);
    homeworkCompleted = await completeHomeworkForLesson(user.id, lesson.id, accuracy);
    const { bumpDailyQuests } = await import("../routes/quests.js");
    await bumpDailyQuests(user.id, "lessons", 1);
    if (globalGain > 0) await bumpDailyQuests(user.id, "xp", globalGain);
    if (isExam) await bumpDailyQuests(user.id, "exams", 1);
  } else if (isExam) {
    const wrongTypes = [
      ...new Set(results.filter((r) => !r.correct).map((r) => String(r.type || "unknown"))),
    ];
    await logActivity(db, user.id, "exam_failed", {
      courseSlug: course.slug,
      lessonId: lesson.id,
      accuracy,
      passThreshold: completeBar,
      wrongTypes,
      wrongExerciseIds: results.filter((r) => !r.correct).map((r) => r.exerciseId),
    });
    await notifyUser(db, user.id, {
      type: "learning",
      titleUk: "Контрольна: час на повторення",
      titleEn: "Exam: time to review",
      bodyUk: `Точність ${Math.round(accuracy * 100)}%. Відкрий /review — слабкі типи: ${wrongTypes.slice(0, 4).join(", ") || "—"}.`,
      bodyEn: `Score ${Math.round(accuracy * 100)}%. Open /review — weak types: ${wrongTypes.slice(0, 4).join(", ") || "—"}.`,
      href: "/review?from=exam",
    });
  }

  // Persist last fail context for tutor (any lesson, not only exams)
  if (!passed) {
    const wrong = results.filter((r) => !r.correct).slice(0, 6);
    await logActivity(db, user.id, "lesson_fail_context", {
      courseSlug: course.slug,
      lessonId: lesson.id,
      isExam,
      accuracy,
      wrong: wrong.map((r) => ({
        exerciseId: r.exerciseId,
        type: r.type,
        missing: r.meta?.missing ?? null,
        partial: r.partial ?? null,
      })),
    });
  }

  const chAfter = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  const dailyGoalMet = Boolean(
    chAfter &&
      chAfter.dailyXpDate === today &&
      chAfter.dailyXp >= (chAfter.dailyGoalXp || 50),
  );

  const newAchievements = await evaluateAchievements(db, user.id, {
    lessonCompleted: passed,
    courseSlug: course.slug,
    streakDays: chAfter?.streakDays,
    globalLevel: chAfter?.globalLevel,
    dailyGoalMet,
    examPassed: isExam && passed,
  });
  if (passed) {
    const { evaluateLearningMilestones } = await import("../routes/learning.js");
    await evaluateLearningMilestones(user.id);
  }

  let certificate = null;
  if (passed) {
    certificate = await maybeIssueCertificate(
      user.id,
      course.id,
      course.slug,
      course.titleUk,
      course.titleEn || course.titleUk,
    );
  }

  const updatedCharacter = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });

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
      levelUp: newCourseLevel > (cp.level ?? 1),
      firstClear,
      results,
      character: updatedCharacter,
      hearts,
      maxHearts: maxHearts(plan),
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
    },
  };
}
