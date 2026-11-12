import { Hono } from "hono";
import { and, asc, desc, eq, gte, inArray, sql } from "drizzle-orm";
import {
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
  learningHistoryQuerySchema,
  learningProgressQuerySchema,
  levelFromXp,
  parsePagination,
  PROGRAMMING_MINI_LESSON_SLUGS,
  PROGRAMMING_PLACEMENT,
  PROGRAMMING_UNIT_ORDER,
  scorePlacement,
  scoreProgrammingPlacement,
  updateLearningGoalSchema,
  weeklyMinisRaceSlugs,
  weeklyMinisRaceXpBonus,
} from "@eduforge/shared";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";
import { buildExamBoard } from "../services/exam-board.js";
import {
  getLearningHistory,
  getLearningProgress,
  getStudyCalendar,
  updateLearningGoal,
} from "../services/learning-progress.js";
import { buildMinisRace } from "../services/minis-race.js";
import { buildNextRecommendations } from "../services/next-steps.js";

type Vars = { user: AuthedUser };

export const learningRoutes = new Hono<{ Variables: Vars }>();

/** Study heatmap for last N UTC days (default 84 = 12 weeks), backed by submitted lessons. */
learningRoutes.get("/calendar", authMiddleware, async (c) => {
  const user = c.get("user");
  const rawDays = c.req.query("days");
  const parsedDays = rawDays === undefined ? 84 : Number(rawDays);
  const days = Number.isFinite(parsedDays)
    ? Math.min(120, Math.max(14, Math.floor(parsedDays)))
    : 84;
  const cal = await getStudyCalendar(user.id, { days });
  return c.json(cal);
});

/** Learner statistics, charts, weekly recap, personal bests, progression, and weekly goal. */
learningRoutes.get("/progress", authMiddleware, async (c) => {
  const user = c.get("user");
  const parsed = learningProgressQuerySchema.safeParse({
    days: c.req.query("days"),
    course: c.req.query("course"),
  });
  if (!parsed.success) {
    return c.json({ error: "invalid_input" }, 400);
  }
  const progress = await getLearningProgress(user.id, parsed.data);
  return c.json(progress);
});

/** Paginated attempt history (newest first, cursor-paginated, default 20, max 50). */
learningRoutes.get("/history", authMiddleware, async (c) => {
  const user = c.get("user");
  const parsed = learningHistoryQuerySchema.safeParse({
    days: c.req.query("days"),
    course: c.req.query("course"),
    limit: c.req.query("limit"),
    cursor: c.req.query("cursor"),
  });
  if (!parsed.success) {
    return c.json({ error: "invalid_input" }, 400);
  }
  const result = await getLearningHistory(user.id, parsed.data);
  if (!result.ok) {
    return c.json({ error: result.error }, 400);
  }
  return c.json(result.data);
});

/** Save, update, or remove (null) recurring weekly target of successful attempts (1..1000). */
learningRoutes.put("/goal", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = updateLearningGoalSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "invalid_input" }, 400);
  }
  const updated = await updateLearningGoal(user.id, parsed.data.weeklyTarget);
  if (!updated) {
    return c.json({ error: "no_character" }, 404);
  }
  return c.json(updated);
});

/** Smart next steps: unfinished lessons, due cards, weak review, placement */
learningRoutes.get("/next", authMiddleware, async (c) => {
  const user = c.get("user");
  const result = await buildNextRecommendations(user.id, 12);
  return c.json(result);
});

/** Per-user unit exam board across all courses */
learningRoutes.get("/exams/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const courseFilter = c.req.query("course");
  const board = await buildExamBoard(user.id, courseFilter);
  return c.json(board);
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
    exportVersion: 2,
    user: {
      id: user.id,
      email: u?.email,
      preferredLocale: u?.preferredLocale,
      emailVerifiedAt: u?.emailVerifiedAt ?? null,
      role: u?.role,
      createdAt: u?.createdAt,
    },
    character: ch
      ? {
          displayName: ch.displayName,
          avatarKey: ch.avatarKey,
          globalXp: ch.globalXp,
          globalLevel: ch.globalLevel,
          streakDays: ch.streakDays,
          streakFreezes: ch.streakFreezes,
          dailyGoalXp: ch.dailyGoalXp,
          onboarding: ch.onboarding,
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
  const { limit } = parsePagination(
    { limit: c.req.query("limit") },
    { max: 50, def: 15 },
  );

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
  const race = await buildMinisRace(user.id);
  return c.json(race);
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
    // Path certificate: issue (100% lessons) or upgrade title if already issued
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
