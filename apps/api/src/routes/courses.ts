import { Hono } from "hono";
import { and, asc, eq } from "drizzle-orm";
import {
  characters,
  courses,
  lessons,
  skillAttempts,
  units,
  userCourseProgress,
  userLessonProgress,
} from "@eduforge/db";
import {
  COURSE_GLOBAL_WEIGHT,
  applyStreakOnActivity,
  canAccessLesson,
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
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { evaluateAchievements, logActivity, notifyUser } from "../engagement.js";
import { gradeExercise } from "../grade.js";
import { rateLimit } from "../rate-limit.js";
import { maybeIssueCertificate } from "./certificates.js";
import { addWeeklyXp } from "./challenges.js";
import { completeHomeworkForLesson } from "./homework.js";

type Vars = { user: AuthedUser };

export const courseRoutes = new Hono<{ Variables: Vars }>();

courseRoutes.get("/", async (c) => {
  const list = await db.query.courses.findMany({
    orderBy: [asc(courses.sortOrder)],
  });
  return c.json({ courses: list });
});

courseRoutes.get("/progress/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db
    .select({
      courseId: userCourseProgress.courseId,
      xp: userCourseProgress.xp,
      level: userCourseProgress.level,
      completedLessons: userCourseProgress.completedLessons,
      hearts: userCourseProgress.hearts,
      slug: courses.slug,
      titleUk: courses.titleUk,
      icon: courses.icon,
      color: courses.color,
    })
    .from(userCourseProgress)
    .innerJoin(courses, eq(courses.id, userCourseProgress.courseId))
    .where(eq(userCourseProgress.userId, user.id));
  return c.json({ progress: rows });
});

courseRoutes.get("/:slug", authMiddleware, async (c) => {
  const user = c.get("user");
  const slug = c.req.param("slug") as typeof courses.slug.enumValues[number];
  const course = await db.query.courses.findFirst({ where: eq(courses.slug, slug) });
  if (!course) return c.json({ error: "not_found" }, 404);

  const courseUnits = await db.query.units.findMany({
    where: eq(units.courseId, course.id),
    orderBy: [asc(units.sortOrder)],
  });
  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
    orderBy: [asc(lessons.sortOrder)],
  });
  let progress = await db.query.userCourseProgress.findFirst({
    where: and(
      eq(userCourseProgress.userId, user.id),
      eq(userCourseProgress.courseId, course.id),
    ),
  });

  const plan = user.plan as Plan;
  if (progress) {
    const regen = regenerateHearts({
      plan,
      hearts: progress.hearts,
      heartsUpdatedAt: progress.heartsUpdatedAt,
    });
    if (regen.changed) {
      const [updated] = await db
        .update(userCourseProgress)
        .set({ hearts: regen.hearts, heartsUpdatedAt: regen.heartsUpdatedAt })
        .where(eq(userCourseProgress.id, progress.id))
        .returning();
      progress = updated;
    }
  } else if (plan === "premium") {
    progress = {
      id: "",
      userId: user.id,
      courseId: course.id,
      xp: 0,
      level: 1,
      hearts: maxHearts(plan),
      heartsUpdatedAt: new Date(),
      completedLessons: 0,
      lastLessonId: null,
    };
  }

  const lessonProgress = await db.query.userLessonProgress.findMany({
    where: and(
      eq(userLessonProgress.userId, user.id),
      eq(userLessonProgress.courseId, course.id),
    ),
  });
  const lpMap = new Map(lessonProgress.map((p) => [p.lessonId, p]));

  // global index for freemium
  const sorted = [...courseLessons].sort((a, b) => {
    if (a.unitId === b.unitId) return a.sortOrder - b.sortOrder;
    const ua = courseUnits.find((u) => u.id === a.unitId)?.sortOrder ?? 0;
    const ub = courseUnits.find((u) => u.id === b.unitId)?.sortOrder ?? 0;
    return ua - ub || a.sortOrder - b.sortOrder;
  });

  const unitsPayload = courseUnits.map((u) => ({
    ...u,
    lessons: sorted
      .filter((l) => l.unitId === u.id)
      .map((l) => {
        const idx = sorted.findIndex((x) => x.id === l.id);
        const accessible =
          l.isFree ||
          canAccessLesson({ plan, lessonIndexInCourse: idx });
        const lp = lpMap.get(l.id);
        const nonExam = sorted.filter(
          (x) => x.unitId === u.id && !x.isExam,
        );
        const nonExamDone = nonExam.every(
          (x) => lpMap.get(x.id)?.status === "completed",
        );
        const isExam = Boolean(l.isExam);
        const examLocked = isExam && !nonExamDone && lp?.status !== "completed";
        return {
          id: l.id,
          slug: l.slug,
          titleUk: l.titleUk,
          titleEn: l.titleEn,
          sortOrder: l.sortOrder,
          baseXp: l.baseXp,
          difficulty: l.difficulty,
          isFree: l.isFree,
          isExam,
          passThreshold: l.passThreshold ?? (isExam ? 0.7 : null),
          examLocked,
          locked: !accessible || examLocked,
          status: lp?.status ?? "available",
          bestScore: lp?.bestScore ?? 0,
          completedAt: lp?.completedAt ?? null,
        };
      }),
  }));

  const hearts = progress?.hearts ?? maxHearts(plan);
  const freeLessonCount = sorted.filter(
    (l, i) =>
      l.isFree || canAccessLesson({ plan: "free" as Plan, lessonIndexInCourse: i }),
  ).length;
  const freeCompleted = sorted.filter((l, i) => {
    const free =
      l.isFree || canAccessLesson({ plan: "free" as Plan, lessonIndexInCourse: i });
    return free && lpMap.get(l.id)?.status === "completed";
  }).length;

  return c.json({
    course,
    units: unitsPayload,
    freemium: {
      freeLessonCount,
      freeCompleted,
      freeLeft: Math.max(0, freeLessonCount - freeCompleted),
      isPremium: plan === "premium",
    },
    progress: progress
      ? {
          xp: progress.xp,
          level: progress.level,
          hearts,
          maxHearts: maxHearts(plan),
          completedLessons: progress.completedLessons,
        }
      : {
          xp: 0,
          level: 1,
          hearts: maxHearts(plan),
          maxHearts: maxHearts(plan),
          completedLessons: 0,
        },
  });
});

courseRoutes.get("/:slug/lessons/:lessonId", authMiddleware, async (c) => {
  const user = c.get("user");
  const lessonId = c.req.param("lessonId") as string;
  const lesson = await db.query.lessons.findFirst({ where: eq(lessons.id, lessonId) });
  if (!lesson) return c.json({ error: "not_found" }, 404);

  const course = await db.query.courses.findFirst({ where: eq(courses.id, lesson.courseId) });
  if (!course) return c.json({ error: "not_found" }, 404);

  const allLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
    orderBy: [asc(lessons.sortOrder)],
  });
  const unitsAll = await db.query.units.findMany({ where: eq(units.courseId, course.id) });
  const sorted = [...allLessons].sort((a, b) => {
    const ua = unitsAll.find((u) => u.id === a.unitId)?.sortOrder ?? 0;
    const ub = unitsAll.find((u) => u.id === b.unitId)?.sortOrder ?? 0;
    return ua - ub || a.sortOrder - b.sortOrder;
  });
  const idx = sorted.findIndex((l) => l.id === lesson.id);
  const plan = user.plan as Plan;
  const accessible =
    lesson.isFree || canAccessLesson({ plan, lessonIndexInCourse: idx });
  if (!accessible) return c.json({ error: "premium_required" }, 402);

  if (lesson.isExam) {
    const unitLessons = sorted.filter((l) => l.unitId === lesson.unitId && !l.isExam);
    const lpRows = await db.query.userLessonProgress.findMany({
      where: and(
        eq(userLessonProgress.userId, user.id),
        eq(userLessonProgress.courseId, course.id),
      ),
    });
    const done = new Set(
      lpRows.filter((p) => p.status === "completed").map((p) => p.lessonId),
    );
    const unitReady = unitLessons.every((l) => done.has(l.id));
    if (!unitReady) {
      return c.json({ error: "exam_locked", message: "Finish unit lessons first" }, 403);
    }
  }

  let progress = await db.query.userCourseProgress.findFirst({
    where: and(
      eq(userCourseProgress.userId, user.id),
      eq(userCourseProgress.courseId, course.id),
    ),
  });
  if (!progress) {
    const [created] = await db
      .insert(userCourseProgress)
      .values({
        userId: user.id,
        courseId: course.id,
        hearts: maxHearts(plan),
      })
      .returning();
    progress = created;
  } else {
    const regen = regenerateHearts({
      plan,
      hearts: progress.hearts,
      heartsUpdatedAt: progress.heartsUpdatedAt,
    });
    if (regen.changed) {
      const [updated] = await db
        .update(userCourseProgress)
        .set({ hearts: regen.hearts, heartsUpdatedAt: regen.heartsUpdatedAt })
        .where(eq(userCourseProgress.id, progress.id))
        .returning();
      progress = updated;
    }
  }

  if (!canStartLesson({ plan, hearts: progress.hearts })) {
    return c.json(
      {
        error: "no_hearts",
        hearts: progress.hearts,
        maxHearts: maxHearts(plan),
      },
      402,
    );
  }

  return c.json({
    lesson: {
      ...lesson,
      isExam: Boolean(lesson.isExam),
      passThreshold: lesson.passThreshold ?? (lesson.isExam ? 0.7 : null),
    },
    course,
    indexInCourse: idx,
    hearts: progress.hearts,
    maxHearts: maxHearts(plan),
  });
});

courseRoutes.post("/:slug/lessons/:lessonId/submit", authMiddleware, async (c) => {
  const user = c.get("user");
  const limited = await rateLimit({
    key: `submit:${user.id}`,
    limit: 60,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
  }
  const lessonId = c.req.param("lessonId") as string;
  const body = await c.req.json().catch(() => null);
  const answers = (body?.answers ?? []) as {
    exerciseId: string;
    answer: unknown;
  }[];

  const lesson = await db.query.lessons.findFirst({ where: eq(lessons.id, lessonId) });
  if (!lesson) return c.json({ error: "not_found" }, 404);
  const course = await db.query.courses.findFirst({ where: eq(courses.id, lesson.courseId) });
  if (!course) return c.json({ error: "not_found" }, 404);

  const exercises = (lesson.exercises as { id: string; type: string; [k: string]: unknown }[]) ?? [];
  const results = exercises.map((ex) => {
    const a = answers.find((x) => x.exerciseId === ex.id);
    const graded = gradeExercise(ex, a?.answer);
    return { exerciseId: ex.id, type: ex.type, ...graded };
  });

  const correctCount = results.filter((r) => r.correct).length;
  const accuracy = exercises.length ? correctCount / exercises.length : 0;
  const isExam = Boolean(lesson.isExam);
  const completeBar = lessonCompleteThreshold({
    isExam,
    passThreshold: lesson.passThreshold,
  });
  const passed = accuracy + 1e-9 >= completeBar;

  // XP by course type
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
    const usedHint = Boolean(body?.usedHint);
    xpGain = results.reduce((sum, r) => {
      if (!r.correct) return sum;
      const ex = exercises.find((e) => e.id === r.exerciseId);
      return sum + logicXpAward(Number(ex?.difficulty ?? lesson.difficulty), usedHint);
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
  // firstClear XP only when this attempt newly completes the lesson
  const firstClear = passed && (!prevLp || prevLp.status !== "completed");
  if (isExam && !passed) {
    // Failed exam: no XP (non-exam lessons keep previous partial XP behavior)
    xpGain = 0;
  } else if (prevLp && prevLp.status === "completed") {
    xpGain = Math.max(1, Math.floor(xpGain * 0.35));
  } else if (!isExam && !passed) {
    // Unchanged product rule: incomplete normal lessons still grant computed XP
  }

  // Upsert lesson progress
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

  // Course progress
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
    return c.json({ error: "no_hearts", hearts: cp.hearts }, 402);
  }

  // Lose a heart on failed lesson (free plan only)
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

  // Global character XP + streak (shield / freeze on gap)
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

  // Onboarding flags
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
    const { bumpDailyQuests } = await import("./quests.js");
    await bumpDailyQuests(user.id, "lessons", 1);
    if (globalGain > 0) await bumpDailyQuests(user.id, "xp", globalGain);
    if (isExam) await bumpDailyQuests(user.id, "exams", 1);
  } else if (isExam) {
    await logActivity(db, user.id, "exam_failed", {
      courseSlug: course.slug,
      lessonId: lesson.id,
      accuracy,
      passThreshold: completeBar,
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
    const { evaluateLearningMilestones } = await import("./learning.js");
    await evaluateLearningMilestones(user.id);
  }

  let certificate = null;
  if (passed) {
    certificate = await maybeIssueCertificate(
      user.id,
      course.id,
      course.slug,
      course.slug === "programming"
        ? "Програмування"
        : course.slug === "typescript"
          ? "TypeScript"
          : course.titleUk,
      course.slug === "programming"
        ? "Programming"
        : course.slug === "typescript"
          ? "TypeScript"
          : course.titleEn || course.titleUk,
    );
  }

  const updatedCharacter = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });

  return c.json({
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
  });
});
