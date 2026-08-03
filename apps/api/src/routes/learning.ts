import { Hono } from "hono";
import { and, asc, desc, eq, gte, inArray, sql } from "drizzle-orm";
import {
  activityEvents,
  certificates,
  characters,
  courses,
  flashcardReviews,
  learningMilestones,
  lessons,
  placementResults,
  studySessions,
  units,
  userCourseProgress,
  userLessonProgress,
  users,
} from "@eduforge/db";
import {
  ENGLISH_PLACEMENT,
  isoWeekBounds,
  isoWeekKey,
  levelFromXp,
  PROGRAMMING_MINI_LESSON_SLUGS,
  PROGRAMMING_PLACEMENT,
  PROGRAMMING_UNIT_ORDER,
  scorePlacement,
  scoreProgrammingPlacement,
  weeklyMinisRaceSlugs,
  weeklyMinisRaceXpBonus,
} from "@eduforge/shared";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";

type Vars = { user: AuthedUser };

export const learningRoutes = new Hono<{ Variables: Vars }>();

/** Activity heatmap for last N days (default 84 = 12 weeks) */
learningRoutes.get("/calendar", authMiddleware, async (c) => {
  const user = c.get("user");
  const days = Math.min(120, Math.max(14, Number(c.req.query("days") ?? 84)));
  const since = new Date(Date.now() - days * 86400000);

  const events = await db
    .select({
      day: sql<string>`to_char(${activityEvents.createdAt} at time zone 'UTC', 'YYYY-MM-DD')`,
      count: sql<number>`count(*)::int`,
    })
    .from(activityEvents)
    .where(
      and(eq(activityEvents.userId, user.id), gte(activityEvents.createdAt, since)),
    )
    .groupBy(sql`to_char(${activityEvents.createdAt} at time zone 'UTC', 'YYYY-MM-DD')`);

  const map = new Map(events.map((e) => [e.day, e.count]));
  const series: { date: string; count: number; level: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    const count = map.get(key) ?? 0;
    const level = count === 0 ? 0 : count < 2 ? 1 : count < 5 ? 2 : count < 10 ? 3 : 4;
    series.push({ date: key, count, level });
  }

  const activeDays = series.filter((s) => s.count > 0).length;
  const maxStreak = (() => {
    let best = 0;
    let cur = 0;
    for (const s of series) {
      if (s.count > 0) {
        cur += 1;
        best = Math.max(best, cur);
      } else cur = 0;
    }
    return best;
  })();

  return c.json({ days, series, activeDays, maxStreakInWindow: maxStreak });
});

/** Smart next steps: unfinished lessons, due cards, weak review, placement */
learningRoutes.get("/next", authMiddleware, async (c) => {
  const user = c.get("user");
  const recommendations: {
    kind: string;
    titleUk: string;
    titleEn: string;
    href: string;
    priority: number;
    meta?: Record<string, unknown>;
  }[] = [];

  // In-progress course: last lesson or next available
  const progress = await db
    .select({
      courseId: userCourseProgress.courseId,
      lastLessonId: userCourseProgress.lastLessonId,
      slug: courses.slug,
      titleUk: courses.titleUk,
      titleEn: courses.titleEn,
      icon: courses.icon,
      completedLessons: userCourseProgress.completedLessons,
    })
    .from(userCourseProgress)
    .innerJoin(courses, eq(courses.id, userCourseProgress.courseId))
    .where(eq(userCourseProgress.userId, user.id));

  for (const p of progress) {
    if (p.lastLessonId) {
      recommendations.push({
        kind: "continue_course",
        titleUk: `Продовжити: ${p.titleUk}`,
        titleEn: `Continue: ${p.titleEn || p.titleUk}`,
        href: `/courses/${p.slug}/lessons/${p.lastLessonId}`,
        priority: 10 + p.completedLessons,
        meta: { courseSlug: p.slug, icon: p.icon },
      });
    } else {
      recommendations.push({
        kind: "start_course",
        titleUk: `Почати: ${p.titleUk}`,
        titleEn: `Start: ${p.titleEn || p.titleUk}`,
        href: `/courses/${p.slug}`,
        priority: 5,
        meta: { courseSlug: p.slug },
      });
    }
  }

  // Courses never started
  const allCourses = await db.query.courses.findMany({
    orderBy: [asc(courses.sortOrder)],
  });
  const started = new Set(progress.map((p) => p.courseId));
  for (const course of allCourses) {
    if (!started.has(course.id)) {
      recommendations.push({
        kind: "explore_course",
        titleUk: `Спробуй: ${course.titleUk}`,
        titleEn: `Try: ${course.titleEn || course.titleUk}`,
        href: `/courses/${course.slug}`,
        priority: 3,
        meta: { courseSlug: course.slug, icon: course.icon },
      });
    }
  }

  // Weak lessons
  const weak = await db
    .select({
      lessonId: lessons.id,
      titleUk: lessons.titleUk,
      slug: courses.slug,
      bestScore: userLessonProgress.bestScore,
    })
    .from(userLessonProgress)
    .innerJoin(lessons, eq(lessons.id, userLessonProgress.lessonId))
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .where(
      and(
        eq(userLessonProgress.userId, user.id),
        sql`${userLessonProgress.bestScore} < 0.85`,
        sql`${userLessonProgress.attempts} > 0`,
      ),
    )
    .orderBy(asc(userLessonProgress.bestScore))
    .limit(3);

  for (const w of weak) {
    recommendations.push({
      kind: "review_weak",
      titleUk: `Повтори: ${w.titleUk}`,
      titleEn: `Review: ${w.titleUk}`,
      href: `/courses/${w.slug}/lessons/${w.lessonId}`,
      priority: 12,
      meta: { bestScore: w.bestScore },
    });
  }

  recommendations.push({
    kind: "flashcards",
    titleUk: "Картки SRS",
    titleEn: "SRS flashcards",
    href: "/flashcards",
    priority: 8,
  });
  recommendations.push({
    kind: "quests",
    titleUk: "Щоденні квести",
    titleEn: "Daily quests",
    href: "/quests",
    priority: 7,
  });
  recommendations.push({
    kind: "tutor",
    titleUk: "Запитай репетитора",
    titleEn: "Ask the tutor",
    href: "/tutor",
    priority: 4,
  });

  const placement = await db.query.placementResults.findFirst({
    where: and(
      eq(placementResults.userId, user.id),
      eq(placementResults.courseSlug, "english"),
    ),
    orderBy: [desc(placementResults.createdAt)],
  });
  if (!placement) {
    recommendations.push({
      kind: "placement",
      titleUk: "Placement test (English)",
      titleEn: "English placement test",
      href: "/placement",
      priority: 15,
    });
  }

  const progPlacement = await db.query.placementResults.findFirst({
    where: and(
      eq(placementResults.userId, user.id),
      eq(placementResults.courseSlug, "programming"),
    ),
    orderBy: [desc(placementResults.createdAt)],
  });
  if (!progPlacement) {
    recommendations.push({
      kind: "placement_programming",
      titleUk: "Placement: Програмування",
      titleEn: "Programming placement",
      href: "/placement/programming",
      priority: 14,
    });
  } else {
    recommendations.push({
      kind: "programming_hub",
      titleUk: "Path програмування",
      titleEn: "Programming path",
      href: "/programming",
      priority: 11,
      meta: { level: progPlacement.levelLabel },
    });
  }

  // Unfinished programming mini-projects (high priority bite-sized goals)
  const progCourse = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (progCourse) {
    const miniSlugs = [...PROGRAMMING_MINI_LESSON_SLUGS];
    const raceSlugs = weeklyMinisRaceSlugs();
    const raceSet = new Set(raceSlugs);
    const progLessons = await db.query.lessons.findMany({
      where: eq(lessons.courseId, progCourse.id),
    });
    const miniBySlug = new Map(
      progLessons
        .filter((l) => (miniSlugs as string[]).includes(l.slug))
        .map((l) => [l.slug, l]),
    );
    const doneProg = await db.query.userLessonProgress.findMany({
      where: and(
        eq(userLessonProgress.userId, user.id),
        eq(userLessonProgress.courseId, progCourse.id),
        eq(userLessonProgress.status, "completed"),
      ),
    });
    const doneSet = new Set(doneProg.map((p) => p.lessonId));

    // Weekly race minis first (not yet completed at all — race counts week completion;
    // recommend unfinished race slugs that user still needs for race score)
    const { startsAt: weekStart } = isoWeekBounds();
    const raceDoneThisWeek = await db.query.userLessonProgress.findMany({
      where: and(
        eq(userLessonProgress.userId, user.id),
        eq(userLessonProgress.courseId, progCourse.id),
        eq(userLessonProgress.status, "completed"),
        gte(userLessonProgress.completedAt, weekStart),
      ),
    });
    const raceDoneWeekIds = new Set(raceDoneThisWeek.map((p) => p.lessonId));

    let racePri = 18;
    for (const slug of raceSlugs) {
      const les = miniBySlug.get(slug);
      if (!les) continue;
      if (raceDoneWeekIds.has(les.id)) continue;
      recommendations.push({
        kind: "programming_mini_race",
        titleUk: `🏁 Race mini: ${les.titleUk}`,
        titleEn: `🏁 Race mini: ${les.titleEn || les.titleUk}`,
        href: `/courses/programming/lessons/${les.id}`,
        priority: racePri,
        meta: { lessonSlug: slug, race: true },
      });
      racePri -= 0.3;
    }
    if (raceSlugs.some((s) => {
      const les = miniBySlug.get(s);
      return les && !raceDoneWeekIds.has(les.id);
    })) {
      recommendations.push({
        kind: "programming_minis_race",
        titleUk: "🏁 Тижнева minis-гонка",
        titleEn: "🏁 Weekly minis race",
        href: "/programming",
        priority: 17,
        meta: { raceSlugs },
      });
    }

    // Other unfinished minis (not already pushed as race)
    let miniPriority = 15.5;
    for (const slug of miniSlugs) {
      if (raceSet.has(slug)) continue; // already handled above
      const les = miniBySlug.get(slug);
      if (!les || doneSet.has(les.id)) continue;
      recommendations.push({
        kind: "programming_mini",
        titleUk: `🧩 Mini: ${les.titleUk}`,
        titleEn: `🧩 Mini: ${les.titleEn || les.titleUk}`,
        href: `/courses/programming/lessons/${les.id}`,
        priority: miniPriority,
        meta: { lessonSlug: slug },
      });
      miniPriority -= 0.5;
      if (miniPriority < 13) break;
    }
    // If all minis done, nudge playground / achievements
    const allMinisDone =
      miniSlugs.length > 0 &&
      miniSlugs.every((s) => {
        const les = miniBySlug.get(s);
        return les && doneSet.has(les.id);
      });
    if (allMinisDone) {
      recommendations.push({
        kind: "programming_minis_done",
        titleUk: "🏆 Усі mini-projects! Playground?",
        titleEn: "🏆 All minis done! Try playground?",
        href: "/playground",
        priority: 13,
      });
    } else if (miniBySlug.size > 0) {
      recommendations.push({
        kind: "programming_minis_board",
        titleUk: "🧩 Mini-projects board",
        titleEn: "🧩 Mini-projects board",
        href: "/programming",
        priority: 12.5,
      });
    }
  }

  recommendations.push({
    kind: "playground",
    titleUk: "Code playground",
    titleEn: "Code playground",
    href: "/playground",
    priority: 6,
  });

  // Unit exams ready (all non-exam lessons in unit completed, exam not passed)
  const examLessons = await db.query.lessons.findMany({
    where: eq(lessons.isExam, true),
  });
  if (examLessons.length) {
    const lpAll = await db.query.userLessonProgress.findMany({
      where: eq(userLessonProgress.userId, user.id),
    });
    const doneSet = new Set(
      lpAll.filter((p) => p.status === "completed").map((p) => p.lessonId),
    );
    const unitIds = [...new Set(examLessons.map((l) => l.unitId))];
    const unitLessons = await db.query.lessons.findMany({
      where: inArray(lessons.unitId, unitIds),
    });
    const byUnit = new Map<string, typeof unitLessons>();
    for (const l of unitLessons) {
      const list = byUnit.get(l.unitId) ?? [];
      list.push(l);
      byUnit.set(l.unitId, list);
    }
    const courseMap = new Map(
      (await db.query.courses.findMany()).map((c) => [c.id, c]),
    );
    let examRecs = 0;
    for (const ex of examLessons) {
      if (examRecs >= 3) break;
      if (doneSet.has(ex.id)) continue;
      const peers = byUnit.get(ex.unitId) ?? [];
      const nonExam = peers.filter((l) => !l.isExam);
      if (!nonExam.length || !nonExam.every((l) => doneSet.has(l.id))) continue;
      const course = courseMap.get(ex.courseId);
      if (!course) continue;
      recommendations.push({
        kind: "exam_ready",
        titleUk: `📝 Контрольна: ${ex.titleUk}`,
        titleEn: `📝 Exam: ${ex.titleEn || ex.titleUk}`,
        href: `/courses/${course.slug}/lessons/${ex.id}`,
        priority: 19,
        meta: { courseSlug: course.slug, lessonId: ex.id, isExam: true },
      });
      examRecs += 1;
    }
  }

  // Deep tracks not started
  for (const slug of [
    "html_semantics",
    "css_layout",
    "qa_theory",
    "typescript",
    "js_fundamentals",
    "react_fundamentals",
    "sql_fundamentals",
    "node_fundamentals",
    "express_fundamentals",
    "embedded_cpp",
  ] as const) {
    const c = allCourses.find((x) => x.slug === slug);
    if (!c || started.has(c.id)) continue;
    recommendations.push({
      kind: "deep_track",
      titleUk: `Deep track: ${c.titleUk}`,
      titleEn: `Deep track: ${c.titleEn || c.titleUk}`,
      href: `/courses/${slug}`,
      priority: 8,
      meta: { courseSlug: slug },
    });
  }

  recommendations.sort((a, b) => b.priority - a.priority);
  return c.json({ recommendations: recommendations.slice(0, 12), placement, progPlacement });
});

/** Per-user unit exam board across all courses */
learningRoutes.get("/exams/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const courseFilter = c.req.query("course");

  const allCourses = await db.query.courses.findMany({
    orderBy: [asc(courses.sortOrder)],
  });
  const courseList = courseFilter
    ? allCourses.filter((c) => c.slug === courseFilter)
    : allCourses;

  const lpAll = await db.query.userLessonProgress.findMany({
    where: eq(userLessonProgress.userId, user.id),
  });
  const lpMap = new Map(lpAll.map((p) => [p.lessonId, p]));

  const summary = {
    totalExams: 0,
    passed: 0,
    ready: 0,
    locked: 0,
  };

  const byCourse: {
    courseSlug: string;
    titleUk: string;
    titleEn: string;
    icon: string;
    exams: {
      lessonId: string;
      unitId: string;
      unitSlug: string;
      unitTitleUk: string;
      titleUk: string;
      titleEn: string;
      status: "locked" | "ready" | "passed";
      bestScore: number;
      passThreshold: number;
      href: string;
    }[];
  }[] = [];

  for (const course of courseList) {
    const courseUnits = await db.query.units.findMany({
      where: eq(units.courseId, course.id),
      orderBy: [asc(units.sortOrder)],
    });
    const courseLessons = await db.query.lessons.findMany({
      where: eq(lessons.courseId, course.id),
      orderBy: [asc(lessons.sortOrder)],
    });
    const exams = courseLessons.filter((l) => l.isExam);
    if (!exams.length) continue;

    const rows = [];
    for (const ex of exams) {
      const unit = courseUnits.find((u) => u.id === ex.unitId);
      const nonExam = courseLessons.filter((l) => l.unitId === ex.unitId && !l.isExam);
      const unitDone = nonExam.every((l) => lpMap.get(l.id)?.status === "completed");
      const lp = lpMap.get(ex.id);
      const passed = lp?.status === "completed";
      let status: "locked" | "ready" | "passed" = "locked";
      if (passed) status = "passed";
      else if (unitDone) status = "ready";
      summary.totalExams += 1;
      if (status === "passed") summary.passed += 1;
      else if (status === "ready") summary.ready += 1;
      else summary.locked += 1;
      rows.push({
        lessonId: ex.id,
        unitId: ex.unitId,
        unitSlug: unit?.slug ?? "",
        unitTitleUk: unit?.titleUk ?? "",
        titleUk: ex.titleUk,
        titleEn: ex.titleEn || ex.titleUk,
        status,
        bestScore: lp?.bestScore ?? 0,
        passThreshold: ex.passThreshold ?? 0.7,
        href: `/courses/${course.slug}/lessons/${ex.id}`,
      });
    }
    byCourse.push({
      courseSlug: course.slug,
      titleUk: course.titleUk,
      titleEn: course.titleEn || course.titleUk,
      icon: course.icon,
      exams: rows,
    });
  }

  return c.json({ summary, courses: byCourse });
});

/** Full progress export for the learner */
learningRoutes.get("/export", authMiddleware, async (c) => {
  const user = c.get("user");
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  const u = await db.query.users.findFirst({ where: eq(users.id, user.id) });

  const courseProg = await db
    .select({
      slug: courses.slug,
      titleUk: courses.titleUk,
      xp: userCourseProgress.xp,
      level: userCourseProgress.level,
      completedLessons: userCourseProgress.completedLessons,
    })
    .from(userCourseProgress)
    .innerJoin(courses, eq(courses.id, userCourseProgress.courseId))
    .where(eq(userCourseProgress.userId, user.id));

  const lessonProg = await db
    .select({
      lessonId: userLessonProgress.lessonId,
      titleUk: lessons.titleUk,
      courseSlug: courses.slug,
      status: userLessonProgress.status,
      bestScore: userLessonProgress.bestScore,
      attempts: userLessonProgress.attempts,
      completedAt: userLessonProgress.completedAt,
    })
    .from(userLessonProgress)
    .innerJoin(lessons, eq(lessons.id, userLessonProgress.lessonId))
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .where(eq(userLessonProgress.userId, user.id));

  const [fc] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(flashcardReviews)
    .where(eq(flashcardReviews.userId, user.id));

  const [focus] = await db
    .select({
      sec: sql<number>`coalesce(sum(${studySessions.durationSec}), 0)::int`,
    })
    .from(studySessions)
    .where(eq(studySessions.userId, user.id));

  const milestones = await db.query.learningMilestones.findMany({
    where: eq(learningMilestones.userId, user.id),
  });

  const placements = await db.query.placementResults.findMany({
    where: eq(placementResults.userId, user.id),
    orderBy: [desc(placementResults.createdAt)],
  });

  const payload = {
    exportedAt: new Date().toISOString(),
    user: {
      id: user.id,
      email: u?.email,
      plan: u?.plan,
      preferredLocale: u?.preferredLocale,
    },
    character: ch
      ? {
          displayName: ch.displayName,
          globalXp: ch.globalXp,
          globalLevel: ch.globalLevel,
          streakDays: ch.streakDays,
        }
      : null,
    courses: courseProg,
    lessons: lessonProg,
    flashcardReviews: fc?.n ?? 0,
    focusSec: focus?.sec ?? 0,
    milestones,
    placements: placements.map((p) => ({
      courseSlug: p.courseSlug,
      score: p.score,
      levelLabel: p.levelLabel,
      createdAt: p.createdAt,
    })),
  };

  return c.json(payload);
});

/** Placement test questions (no answers) */
learningRoutes.get("/placement/english", authMiddleware, async (c) => {
  const user = c.get("user");
  const last = await db.query.placementResults.findFirst({
    where: and(
      eq(placementResults.userId, user.id),
      eq(placementResults.courseSlug, "english"),
    ),
    orderBy: [desc(placementResults.createdAt)],
  });
  return c.json({
    questions: ENGLISH_PLACEMENT.map((q) => ({
      id: q.id,
      promptUk: q.promptUk,
      promptEn: q.promptEn,
      options: q.options,
    })),
    lastResult: last
      ? {
          score: last.score,
          levelLabel: last.levelLabel,
          recommendedUnitSlug: last.recommendedUnitSlug,
          createdAt: last.createdAt,
        }
      : null,
  });
});

const placementSubmitSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      index: z.number().int().min(0).max(10),
    }),
  ),
});

learningRoutes.post("/placement/english", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = placementSubmitSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const result = scorePlacement(parsed.data.answers);
  const [row] = await db
    .insert(placementResults)
    .values({
      userId: user.id,
      courseSlug: "english",
      score: result.score,
      levelLabel: result.level.label,
      answers: { answers: parsed.data.answers },
      recommendedUnitSlug: result.level.recommendedUnitSlug,
    })
    .returning();

  await logActivity(db, user.id, "placement_completed", {
    courseSlug: "english",
    level: result.level.label,
    score: result.score,
  });
  await notifyUser(db, user.id, {
    type: "placement",
    titleUk: `Placement: ${result.level.label}`,
    titleEn: `Placement: ${result.level.label}`,
    bodyUk: result.level.titleUk,
    bodyEn: result.level.titleEn,
    href: "/placement",
  });

  // Milestone
  await ensureMilestone(user.id, "placement_english", "Placement English", "English placement");

  // Link to first lesson of recommended unit if exists
  let startHref = "/courses/english";
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, "english"),
  });
  if (course) {
    const unit = await db.query.units.findFirst({
      where: and(
        eq(units.courseId, course.id),
        eq(units.slug, result.level.recommendedUnitSlug),
      ),
    });
    if (unit) {
      const first = await db.query.lessons.findFirst({
        where: eq(lessons.unitId, unit.id),
        orderBy: [asc(lessons.sortOrder)],
      });
      if (first) startHref = `/courses/english/lessons/${first.id}`;
    }
  }

  return c.json({
    result: {
      score: result.score,
      correct: result.correct,
      total: result.total,
      levelLabel: result.level.label,
      titleUk: result.level.titleUk,
      titleEn: result.level.titleEn,
      recommendedUnitSlug: result.level.recommendedUnitSlug,
      startHref,
    },
    id: row.id,
  });
});

learningRoutes.get("/placement/programming", authMiddleware, async (c) => {
  const user = c.get("user");
  const last = await db.query.placementResults.findFirst({
    where: and(
      eq(placementResults.userId, user.id),
      eq(placementResults.courseSlug, "programming"),
    ),
    orderBy: [desc(placementResults.createdAt)],
  });
  return c.json({
    questions: PROGRAMMING_PLACEMENT.map((q) => ({
      id: q.id,
      promptUk: q.promptUk,
      promptEn: q.promptEn,
      options: q.options,
    })),
    lastResult: last
      ? {
          score: last.score,
          levelLabel: last.levelLabel,
          recommendedUnitSlug: last.recommendedUnitSlug,
          createdAt: last.createdAt,
        }
      : null,
  });
});

learningRoutes.post("/placement/programming", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = placementSubmitSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const result = scoreProgrammingPlacement(parsed.data.answers);
  const [row] = await db
    .insert(placementResults)
    .values({
      userId: user.id,
      courseSlug: "programming",
      score: result.score,
      levelLabel: result.level.label,
      answers: { answers: parsed.data.answers },
      recommendedUnitSlug: result.level.recommendedUnitSlug,
    })
    .returning();

  await logActivity(db, user.id, "placement_completed", {
    courseSlug: "programming",
    level: result.level.label,
    score: result.score,
  });
  await notifyUser(db, user.id, {
    type: "placement",
    titleUk: `Programming: ${result.level.label}`,
    titleEn: `Programming: ${result.level.label}`,
    bodyUk: result.level.titleUk,
    bodyEn: result.level.titleEn,
    href: "/programming",
  });
  await ensureMilestone(
    user.id,
    "placement_programming",
    "Placement Programming",
    "Programming placement",
  );

  let startHref = "/programming";
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (course) {
    const unit = await db.query.units.findFirst({
      where: and(
        eq(units.courseId, course.id),
        eq(units.slug, result.level.recommendedUnitSlug),
      ),
    });
    if (unit) {
      const first = await db.query.lessons.findFirst({
        where: eq(lessons.unitId, unit.id),
        orderBy: [asc(lessons.sortOrder)],
      });
      if (first) startHref = `/courses/programming/lessons/${first.id}`;
    }
  }

  return c.json({
    result: {
      score: result.score,
      correct: result.correct,
      total: result.total,
      levelLabel: result.level.label,
      titleUk: result.level.titleUk,
      titleEn: result.level.titleEn,
      recommendedUnitSlug: result.level.recommendedUnitSlug,
      startHref,
    },
    id: row.id,
  });
});

learningRoutes.get("/milestones", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.learningMilestones.findMany({
    where: eq(learningMilestones.userId, user.id),
    orderBy: [desc(learningMilestones.unlockedAt)],
  });
  return c.json({ milestones: rows });
});

/** Per-unit completion for programming course */
learningRoutes.get("/programming/units", authMiddleware, async (c) => {
  const user = c.get("user");
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (!course) return c.json({ units: [] });

  const courseUnits = await db.query.units.findMany({
    where: eq(units.courseId, course.id),
    orderBy: [asc(units.sortOrder)],
  });
  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
  });
  const progress = await db.query.userLessonProgress.findMany({
    where: and(
      eq(userLessonProgress.userId, user.id),
      eq(userLessonProgress.courseId, course.id),
    ),
  });
  const done = new Set(
    progress.filter((p) => p.status === "completed").map((p) => p.lessonId),
  );

  const unitStats = courseUnits.map((u) => {
    const ul = courseLessons.filter((l) => l.unitId === u.id);
    const completed = ul.filter((l) => done.has(l.id)).length;
    return {
      slug: u.slug,
      titleUk: u.titleUk,
      titleEn: u.titleEn,
      total: ul.length,
      completed,
      done: ul.length > 0 && completed === ul.length,
    };
  });

  return c.json({
    units: unitStats,
    order: PROGRAMMING_UNIT_ORDER,
  });
});

/** Mini-project completion board for programming path */
learningRoutes.get("/programming/minis", authMiddleware, async (c) => {
  const user = c.get("user");
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (!course) {
    return c.json({ minis: [], total: 0, completed: 0, allDone: false });
  }

  const miniSlugs = [...PROGRAMMING_MINI_LESSON_SLUGS];
  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
  });
  const courseUnits = await db.query.units.findMany({
    where: eq(units.courseId, course.id),
  });
  const unitById = new Map(courseUnits.map((u) => [u.id, u]));
  const progress = await db.query.userLessonProgress.findMany({
    where: and(
      eq(userLessonProgress.userId, user.id),
      eq(userLessonProgress.courseId, course.id),
    ),
  });
  const done = new Set(
    progress.filter((p) => p.status === "completed").map((p) => p.lessonId),
  );

  const minis = miniSlugs.map((slug) => {
    const les = courseLessons.find((l) => l.slug === slug);
    const unit = les ? unitById.get(les.unitId) : undefined;
    return {
      slug,
      lessonId: les?.id ?? null,
      titleUk: les?.titleUk ?? slug,
      titleEn: les?.titleEn || les?.titleUk || slug,
      unitSlug: unit?.slug ?? null,
      completed: les ? done.has(les.id) : false,
      missing: !les,
    };
  });
  const completed = minis.filter((m) => m.completed).length;
  return c.json({
    minis,
    total: miniSlugs.length,
    completed,
    allDone: completed >= miniSlugs.length && miniSlugs.length > 0,
    slugs: miniSlugs,
  });
});

/**
 * Leaderboard: users ranked by # of completed programming mini-projects.
 * Public-ish (auth required like other learning routes).
 */
learningRoutes.get("/programming/minis/leaderboard", authMiddleware, async (c) => {
  const user = c.get("user");
  const limit = Math.min(50, Math.max(5, Number(c.req.query("limit") ?? 15)));

  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (!course) return c.json({ entries: [], totalMinis: 0, me: null });

  const miniSlugs = [...PROGRAMMING_MINI_LESSON_SLUGS];
  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
  });
  const miniLessonIds = courseLessons
    .filter((l) => (miniSlugs as string[]).includes(l.slug))
    .map((l) => l.id);

  if (!miniLessonIds.length) {
    return c.json({ entries: [], totalMinis: miniSlugs.length, me: null });
  }

  const rows = await db
    .select({
      userId: userLessonProgress.userId,
      completed: sql<number>`count(*)::int`,
      displayName: characters.displayName,
      globalLevel: characters.globalLevel,
    })
    .from(userLessonProgress)
    .innerJoin(characters, eq(characters.userId, userLessonProgress.userId))
    .where(
      and(
        eq(userLessonProgress.courseId, course.id),
        eq(userLessonProgress.status, "completed"),
        inArray(userLessonProgress.lessonId, miniLessonIds),
      ),
    )
    .groupBy(
      userLessonProgress.userId,
      characters.displayName,
      characters.globalLevel,
    )
    .orderBy(sql`count(*) desc`, desc(characters.globalLevel))
    .limit(limit);

  const entries = rows.map((r, i) => ({
    rank: i + 1,
    userId: r.userId,
    displayName: r.displayName ?? "—",
    globalLevel: r.globalLevel ?? 1,
    minisCompleted: r.completed,
    allDone: r.completed >= miniSlugs.length,
  }));

  const meRow = entries.find((e) => e.userId === user.id);
  let me = meRow ?? null;
  if (!me) {
    const [own] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, user.id),
          eq(userLessonProgress.courseId, course.id),
          eq(userLessonProgress.status, "completed"),
          inArray(userLessonProgress.lessonId, miniLessonIds),
        ),
      );
    const n = own?.n ?? 0;
    me = {
      rank: 0,
      userId: user.id,
      displayName: "you",
      globalLevel: 0,
      minisCompleted: n,
      allDone: n >= miniSlugs.length,
    };
  }

  return c.json({
    entries,
    totalMinis: miniSlugs.length,
    me,
  });
});

/** Weekly minis race: 3 featured minis this ISO week, scored by completions this week */
learningRoutes.get("/programming/minis/race", authMiddleware, async (c) => {
  const user = c.get("user");
  const weekKey = isoWeekKey();
  const { startsAt, endsAt } = isoWeekBounds();
  const raceSlugs = weeklyMinisRaceSlugs(weekKey);

  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (!course) {
    return c.json({ weekKey, raceSlugs, entries: [], me: null });
  }

  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
  });
  const raceLessons = courseLessons.filter((l) => raceSlugs.includes(l.slug));
  const raceIds = raceLessons.map((l) => l.id);
  const raceMeta = raceSlugs.map((slug) => {
    const les = raceLessons.find((l) => l.slug === slug);
    return {
      slug,
      lessonId: les?.id ?? null,
      titleUk: les?.titleUk ?? slug,
      titleEn: les?.titleEn || les?.titleUk || slug,
    };
  });

  if (!raceIds.length) {
    return c.json({
      weekKey,
      raceSlugs,
      raceMeta,
      startsAt,
      endsAt,
      entries: [],
      me: null,
      totalRace: raceSlugs.length,
    });
  }

  const rows = await db
    .select({
      userId: userLessonProgress.userId,
      score: sql<number>`count(*)::int`,
      displayName: characters.displayName,
    })
    .from(userLessonProgress)
    .innerJoin(characters, eq(characters.userId, userLessonProgress.userId))
    .where(
      and(
        eq(userLessonProgress.courseId, course.id),
        eq(userLessonProgress.status, "completed"),
        inArray(userLessonProgress.lessonId, raceIds),
        gte(userLessonProgress.completedAt, startsAt),
        sql`${userLessonProgress.completedAt} <= ${endsAt}`,
      ),
    )
    .groupBy(userLessonProgress.userId, characters.displayName)
    .orderBy(sql`count(*) desc`)
    .limit(20);

  const entries = rows.map((r, i) => ({
    rank: i + 1,
    userId: r.userId,
    displayName: r.displayName ?? "—",
    score: r.score,
    bonusXp: weeklyMinisRaceXpBonus(i + 1),
  }));

  const meEntry = entries.find((e) => e.userId === user.id);
  let meScore = meEntry?.score ?? 0;
  if (!meEntry) {
    const [own] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, user.id),
          eq(userLessonProgress.courseId, course.id),
          eq(userLessonProgress.status, "completed"),
          inArray(userLessonProgress.lessonId, raceIds),
          gte(userLessonProgress.completedAt, startsAt),
          sql`${userLessonProgress.completedAt} <= ${endsAt}`,
        ),
      );
    meScore = own?.n ?? 0;
  }

  const bonusCode = `prog_minis_race_${weekKey}`;
  const claimed = await db.query.learningMilestones.findFirst({
    where: and(
      eq(learningMilestones.userId, user.id),
      eq(learningMilestones.code, bonusCode),
    ),
  });

  // Which race minis the current user completed this week
  const myDone = await db.query.userLessonProgress.findMany({
    where: and(
      eq(userLessonProgress.userId, user.id),
      eq(userLessonProgress.courseId, course.id),
      eq(userLessonProgress.status, "completed"),
      inArray(userLessonProgress.lessonId, raceIds),
      gte(userLessonProgress.completedAt, startsAt),
    ),
  });
  const myDoneIds = new Set(myDone.map((d) => d.lessonId));

  return c.json({
    weekKey,
    raceSlugs,
    raceMeta: raceMeta.map((m) => ({
      ...m,
      completedThisWeek: m.lessonId ? myDoneIds.has(m.lessonId) : false,
    })),
    startsAt,
    endsAt,
    totalRace: raceSlugs.length,
    entries,
    me: {
      rank: meEntry?.rank ?? 0,
      score: meScore,
      bonusXp: meEntry ? weeklyMinisRaceXpBonus(meEntry.rank) : 0,
      canClaim:
        Boolean(meEntry && meEntry.rank <= 3 && weeklyMinisRaceXpBonus(meEntry.rank) > 0) &&
        !claimed,
      claimed: Boolean(claimed),
    },
  });
});

learningRoutes.post("/programming/minis/race/claim-bonus", authMiddleware, async (c) => {
  const user = c.get("user");
  const weekKey = isoWeekKey();
  const code = `prog_minis_race_${weekKey}`;
  const already = await db.query.learningMilestones.findFirst({
    where: and(
      eq(learningMilestones.userId, user.id),
      eq(learningMilestones.code, code),
    ),
  });
  if (already) {
    return c.json({ ok: false, error: "already_claimed", xpGain: 0 });
  }

  const { startsAt, endsAt } = isoWeekBounds();
  const raceSlugs = weeklyMinisRaceSlugs(weekKey);
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (!course) return c.json({ ok: false, error: "no_course", xpGain: 0 });

  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
  });
  const raceIds = courseLessons
    .filter((l) => raceSlugs.includes(l.slug))
    .map((l) => l.id);
  if (!raceIds.length) return c.json({ ok: false, error: "no_race", xpGain: 0 });

  const rows = await db
    .select({
      userId: userLessonProgress.userId,
      score: sql<number>`count(*)::int`,
    })
    .from(userLessonProgress)
    .where(
      and(
        eq(userLessonProgress.courseId, course.id),
        eq(userLessonProgress.status, "completed"),
        inArray(userLessonProgress.lessonId, raceIds),
        gte(userLessonProgress.completedAt, startsAt),
        sql`${userLessonProgress.completedAt} <= ${endsAt}`,
      ),
    )
    .groupBy(userLessonProgress.userId)
    .orderBy(sql`count(*) desc`);

  const rank = rows.findIndex((r) => r.userId === user.id) + 1;
  if (rank < 1 || rank > 3) {
    return c.json({ ok: false, error: "not_eligible", rank: rank || null, xpGain: 0 });
  }

  const xpGain = weeklyMinisRaceXpBonus(rank);
  if (!xpGain) {
    return c.json({ ok: false, error: "no_bonus", rank, xpGain: 0 });
  }

  await db.insert(learningMilestones).values({
    userId: user.id,
    code,
    titleUk: `Minis race ${weekKey} #${rank}`,
    titleEn: `Minis race ${weekKey} #${rank}`,
  });

  const row = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  let character = row;
  if (row) {
    const globalXp = row.globalXp + xpGain;
    const [updated] = await db
      .update(characters)
      .set({ globalXp, globalLevel: levelFromXp(globalXp) })
      .where(eq(characters.id, row.id))
      .returning();
    character = updated;
  }

  await logActivity(db, user.id, "prog_minis_race_bonus", {
    weekKey,
    rank,
    xpGain,
  });
  await notifyUser(db, user.id, {
    type: "race",
    titleUk: `🏅 Minis race #${rank}`,
    titleEn: `🏅 Minis race #${rank}`,
    bodyUk: `+${xpGain} XP`,
    bodyEn: `+${xpGain} XP`,
    href: "/programming",
  });

  const score = rows.find((r) => r.userId === user.id)?.score ?? 0;
  const { evaluateAchievements } = await import("../engagement.js");
  const newAchievements = await evaluateAchievements(db, user.id, {
    minisRaceScore: score,
    minisRaceRank: rank,
  });

  return c.json({ ok: true, rank, xpGain, character, newAchievements });
});

async function ensureMilestone(
  userId: string,
  code: string,
  titleUk: string,
  titleEn: string,
) {
  const existing = await db.query.learningMilestones.findFirst({
    where: and(
      eq(learningMilestones.userId, userId),
      eq(learningMilestones.code, code),
    ),
  });
  if (existing) return existing;
  const [created] = await db
    .insert(learningMilestones)
    .values({ userId, code, titleUk, titleEn })
    .returning();
  return created;
}

/** Evaluate simple path milestones after activity */
export async function evaluateLearningMilestones(userId: string) {
  const [lessonsDone] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(userLessonProgress)
    .where(
      and(
        eq(userLessonProgress.userId, userId),
        eq(userLessonProgress.status, "completed"),
      ),
    );
  const n = lessonsDone?.n ?? 0;
  if (n >= 1) await ensureMilestone(userId, "first_lesson", "Перший урок", "First lesson");
  if (n >= 10) await ensureMilestone(userId, "lessons_10", "10 уроків", "10 lessons");
  if (n >= 50) await ensureMilestone(userId, "lessons_50", "50 уроків", "50 lessons");

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, userId),
  });
  if ((ch?.streakDays ?? 0) >= 7) {
    await ensureMilestone(userId, "streak_7", "Серія 7 днів", "7-day streak");
  }
  if ((ch?.globalLevel ?? 0) >= 5) {
    await ensureMilestone(userId, "level_5", "Рівень 5", "Level 5");
  }

  // Programming unit completions
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (!course) return;

  const courseUnits = await db.query.units.findMany({
    where: eq(units.courseId, course.id),
  });
  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
  });
  const progress = await db.query.userLessonProgress.findMany({
    where: and(
      eq(userLessonProgress.userId, userId),
      eq(userLessonProgress.courseId, course.id),
      eq(userLessonProgress.status, "completed"),
    ),
  });
  const doneIds = new Set(progress.map((p) => p.lessonId));
  let unitsDone = 0;
  for (const u of courseUnits) {
    const ul = courseLessons.filter((l) => l.unitId === u.id);
    if (ul.length && ul.every((l) => doneIds.has(l.id))) {
      unitsDone += 1;
      await ensureMilestone(
        userId,
        `prog_unit_${u.slug}`,
        `Unit: ${u.titleUk}`,
        `Unit: ${u.titleEn || u.titleUk}`,
      );
    }
  }
  if (unitsDone >= 3) {
    await ensureMilestone(userId, "prog_units_3", "3 units коду", "3 code units");
  }

  // Mini-project milestones
  try {
    const { PROGRAMMING_MINI_LESSON_SLUGS } = await import("@eduforge/shared");
    const miniDone = courseLessons.filter(
      (l) =>
        (PROGRAMMING_MINI_LESSON_SLUGS as readonly string[]).includes(l.slug) &&
        doneIds.has(l.id),
    );
    if (miniDone.length >= 1) {
      await ensureMilestone(
        userId,
        "prog_mini_1",
        "Перший mini-project",
        "First mini-project",
      );
    }
    if (miniDone.length >= 3) {
      await ensureMilestone(
        userId,
        "prog_mini_3",
        "3 mini-projects",
        "3 mini-projects",
      );
    }
    if (miniDone.length >= PROGRAMMING_MINI_LESSON_SLUGS.length) {
      await ensureMilestone(
        userId,
        "prog_mini_all",
        "Усі mini-projects path",
        "All path mini-projects",
      );
      try {
        const { maybeIssueMinisCertificate } = await import("./certificates.js");
        await maybeIssueMinisCertificate(userId, course.id);
      } catch {
        /* optional */
      }
    }
  } catch {
    /* optional */
  }
  if (unitsDone >= courseUnits.length && courseUnits.length > 0) {
    await ensureMilestone(
      userId,
      "prog_path_complete",
      "Programming path завершено",
      "Programming path complete",
    );
    // Path certificate: issue (≥70% of lessons; full path = 100%) or upgrade title if already issued
    try {
      const { maybeIssueCertificate } = await import("./certificates.js");
      const pathUk = "Сертифікат: Programming Path";
      const pathEn = "Certificate: Programming Path";
      const cert = await maybeIssueCertificate(
        userId,
        course.id,
        "programming",
        "Programming Path",
        "Programming Path",
      );
      if (cert && (cert.titleUk !== pathUk || cert.titleEn !== pathEn)) {
        await db
          .update(certificates)
          .set({ titleUk: pathUk, titleEn: pathEn })
          .where(eq(certificates.id, cert.id));
      }
    } catch {
      /* optional */
    }
  }
}
