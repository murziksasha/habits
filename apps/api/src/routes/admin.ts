import { Hono } from "hono";
import { and, asc, desc, eq, gte, inArray, ne, sql } from "drizzle-orm";
import {
  activityEvents,
  assignmentSubmissions,
  certificates,
  characters,
  courses,
  learningMilestones,
  lessons,
  parentStudentLinks,
  skillAttempts,
  units,
  userCourseProgress,
  userLessonProgress,
  users,
} from "@eduforge/db";
import {
  PLAYGROUND_CHALLENGES,
  PROGRAMMING_MINI_LESSON_SLUGS,
  weeklyMinisRaceSlugs,
  isoWeekBounds,
} from "@eduforge/shared";
import { z } from "zod";
import { adminMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { runInactivePushReengage } from "../services/reengage.js";
import { runParentDigestBatch } from "./parents.js";
import { runHomeworkReminders } from "./reminders.js";
import { buildWeeklyStats } from "./reports.js";
import { sendMail, weeklyReportEmail } from "../email.js";

type Vars = { user: AuthedUser };

export const adminRoutes = new Hono<{ Variables: Vars }>();

adminRoutes.use("*", adminMiddleware);

adminRoutes.get("/stats", async (c) => {
  const [userCount] = await db.select({ n: sql<number>`count(*)::int` }).from(users);
  const [lessonCount] = await db.select({ n: sql<number>`count(*)::int` }).from(lessons);
  const [courseCount] = await db.select({ n: sql<number>`count(*)::int` }).from(courses);
  const [xpSum] = await db
    .select({ n: sql<number>`coalesce(sum(${characters.globalXp}),0)::int` })
    .from(characters);
  return c.json({
    users: userCount?.n ?? 0,
    lessons: lessonCount?.n ?? 0,
    courses: courseCount?.n ?? 0,
    totalGlobalXp: xpSum?.n ?? 0,
  });
});

adminRoutes.get("/users", async (c) => {
  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
      plan: users.plan,
      createdAt: users.createdAt,
      displayName: characters.displayName,
      globalXp: characters.globalXp,
      globalLevel: characters.globalLevel,
    })
    .from(users)
    .leftJoin(characters, eq(characters.userId, users.id))
    .orderBy(desc(users.createdAt))
    .limit(200);
  return c.json({ users: rows });
});

const userPatchSchema = z.object({
  role: z.enum(["user", "admin"]).optional(),
  plan: z.enum(["free", "premium"]).optional(),
});

adminRoutes.patch("/users/:id", async (c) => {
  const actor = c.get("user");
  const id = c.req.param("id") as string;
  const body = await c.req.json().catch(() => null);
  const parsed = userPatchSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  const [updated] = await db
    .update(users)
    .set({
      ...(parsed.data.role ? { role: parsed.data.role } : {}),
      ...(parsed.data.plan ? { plan: parsed.data.plan } : {}),
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning();
  if (!updated) return c.json({ error: "not_found" }, 404);
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "user_patch",
    targetType: "user",
    targetId: id,
    meta: parsed.data,
  });
  return c.json({
    user: {
      id: updated.id,
      email: updated.email,
      role: updated.role,
      plan: updated.plan,
    },
  });
});

adminRoutes.get("/audit", async (c) => {
  const { adminAuditLog } = await import("@eduforge/db");
  const rows = await db
    .select()
    .from(adminAuditLog)
    .orderBy(desc(adminAuditLog.createdAt))
    .limit(50);
  return c.json({ entries: rows });
});

adminRoutes.get("/courses", async (c) => {
  const list = await db.query.courses.findMany({ orderBy: [asc(courses.sortOrder)] });
  return c.json({ courses: list });
});

adminRoutes.get("/courses/:slug/tree", async (c) => {
  const slug = c.req.param("slug");
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
  return c.json({
    course,
    units: courseUnits.map((u) => ({
      ...u,
      lessons: courseLessons.filter((l) => l.unitId === u.id),
    })),
  });
});

const lessonUpsertSchema = z.object({
  unitId: z.string().uuid().optional(),
  slug: z.string().min(1).max(64).optional(),
  titleUk: z.string().min(1).max(128),
  sortOrder: z.number().int().optional(),
  baseXp: z.number().int().optional(),
  difficulty: z.number().int().min(1).max(5).optional(),
  isFree: z.boolean().optional(),
  exercises: z.array(z.record(z.unknown())).optional(),
});

adminRoutes.post("/lessons", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = lessonUpsertSchema.extend({
    unitId: z.string().uuid(),
    courseId: z.string().uuid(),
    slug: z.string().min(1).max(64),
  }).safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input", details: parsed.error.flatten() }, 400);
  const [created] = await db
    .insert(lessons)
    .values({
      unitId: parsed.data.unitId,
      courseId: parsed.data.courseId,
      slug: parsed.data.slug,
      titleUk: parsed.data.titleUk,
      sortOrder: parsed.data.sortOrder ?? 0,
      baseXp: parsed.data.baseXp ?? 15,
      difficulty: parsed.data.difficulty ?? 1,
      isFree: parsed.data.isFree ?? false,
      exercises: parsed.data.exercises ?? [],
    })
    .returning();
  return c.json({ lesson: created }, 201);
});

adminRoutes.patch("/lessons/:id", async (c) => {
  const id = c.req.param("id") as string;
  const body = await c.req.json().catch(() => null);
  const parsed = lessonUpsertSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  const [updated] = await db
    .update(lessons)
    .set({
      titleUk: parsed.data.titleUk,
      ...(parsed.data.slug ? { slug: parsed.data.slug } : {}),
      ...(parsed.data.sortOrder !== undefined ? { sortOrder: parsed.data.sortOrder } : {}),
      ...(parsed.data.baseXp !== undefined ? { baseXp: parsed.data.baseXp } : {}),
      ...(parsed.data.difficulty !== undefined ? { difficulty: parsed.data.difficulty } : {}),
      ...(parsed.data.isFree !== undefined ? { isFree: parsed.data.isFree } : {}),
      ...(parsed.data.exercises !== undefined ? { exercises: parsed.data.exercises } : {}),
    })
    .where(eq(lessons.id, id))
    .returning();
  if (!updated) return c.json({ error: "not_found" }, 404);
  return c.json({ lesson: updated });
});

adminRoutes.delete("/lessons/:id", async (c) => {
  const id = c.req.param("id") as string;
  const [deleted] = await db.delete(lessons).where(eq(lessons.id, id)).returning();
  if (!deleted) return c.json({ error: "not_found" }, 404);
  return c.json({ ok: true });
});

adminRoutes.get("/lessons/:id", async (c) => {
  const id = c.req.param("id") as string;
  const lesson = await db.query.lessons.findFirst({ where: eq(lessons.id, id) });
  if (!lesson) return c.json({ error: "not_found" }, 404);
  return c.json({ lesson });
});

const unitSchema = z.object({
  courseId: z.string().uuid(),
  slug: z.string().min(1).max(64),
  titleUk: z.string().min(1).max(128),
  sortOrder: z.number().int().optional(),
});

adminRoutes.post("/units", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = unitSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  const [created] = await db
    .insert(units)
    .values({
      courseId: parsed.data.courseId,
      slug: parsed.data.slug,
      titleUk: parsed.data.titleUk,
      sortOrder: parsed.data.sortOrder ?? 0,
    })
    .returning();
  return c.json({ unit: created }, 201);
});

adminRoutes.get("/progress/overview", async (c) => {
  const rows = await db
    .select({
      slug: courses.slug,
      titleUk: courses.titleUk,
      learners: sql<number>`count(distinct ${userCourseProgress.userId})::int`,
      totalXp: sql<number>`coalesce(sum(${userCourseProgress.xp}),0)::int`,
    })
    .from(courses)
    .leftJoin(userCourseProgress, eq(userCourseProgress.courseId, courses.id))
    .groupBy(courses.id)
    .orderBy(asc(courses.sortOrder));
  return c.json({ courses: rows });
});

/** Ops dashboard: parent links, digests, weekly email readiness */
adminRoutes.get("/ops/summary", async (c) => {
  const since7 = new Date(Date.now() - 7 * 86400000);

  const [linkCount] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(parentStudentLinks)
    .where(
      and(
        eq(parentStudentLinks.status, "active"),
        ne(parentStudentLinks.parentUserId, parentStudentLinks.studentUserId),
      ),
    );

  const [digests7] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(activityEvents)
    .where(
      and(
        eq(activityEvents.kind, "parent_digest_sent"),
        gte(activityEvents.createdAt, since7),
      ),
    );

  const [weeklyOptIn] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(users)
    .where(eq(users.weeklyEmailEnabled, true));

  const recentDigests = await db
    .select({
      userId: activityEvents.userId,
      payload: activityEvents.payload,
      createdAt: activityEvents.createdAt,
      displayName: characters.displayName,
    })
    .from(activityEvents)
    .leftJoin(characters, eq(characters.userId, activityEvents.userId))
    .where(eq(activityEvents.kind, "parent_digest_sent"))
    .orderBy(desc(activityEvents.createdAt))
    .limit(15);

  return c.json({
    parentLinksActive: linkCount?.n ?? 0,
    digestsSentLast7d: digests7?.n ?? 0,
    weeklyEmailOptIn: weeklyOptIn?.n ?? 0,
    recentDigests: recentDigests.map((r) => ({
      parentUserId: r.userId,
      parentName: r.displayName ?? "—",
      studentId: (r.payload as { studentId?: string })?.studentId ?? null,
      source: (r.payload as { source?: string })?.source ?? "—",
      createdAt: r.createdAt,
    })),
  });
});

adminRoutes.post("/ops/push-reengage", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const days = Math.min(30, Math.max(1, Number(body.days ?? 3)));
  const result = await runInactivePushReengage(days);
  return c.json({ ok: true, ...result });
});

adminRoutes.post("/ops/parent-digests", async (c) => {
  const result = await runParentDigestBatch();
  return c.json({ ok: true, ...result });
});

adminRoutes.post("/ops/homework-reminders", async (c) => {
  const result = await runHomeworkReminders();
  return c.json({ ok: true, ...result });
});

/** Preview weekly learner report for a user (no send) */
adminRoutes.get("/ops/weekly-preview/:userId", async (c) => {
  const userId = c.req.param("userId") as string;
  const stats = await buildWeeklyStats(userId);
  if (!stats) return c.json({ error: "not_found" }, 404);
  const mail = weeklyReportEmail(stats);
  return c.json({ stats, preview: mail.text, subject: mail.subject });
});

/** Admin: trigger learner weekly send-all (same as reports, admin-gated here) */
adminRoutes.post("/ops/weekly-learners", async (c) => {
  const all = await db.query.users.findMany({
    where: eq(users.weeklyEmailEnabled, true),
  });
  const cutoff = new Date(Date.now() - 6 * 86400000);
  let sent = 0;
  let skipped = 0;
  for (const u of all) {
    if (u.lastWeeklyEmailAt && u.lastWeeklyEmailAt > cutoff) {
      skipped += 1;
      continue;
    }
    const stats = await buildWeeklyStats(u.id);
    if (!stats) continue;
    await sendMail(weeklyReportEmail(stats));
    await db
      .update(users)
      .set({ lastWeeklyEmailAt: new Date() })
      .where(eq(users.id, u.id));
    sent += 1;
  }
  return c.json({ ok: true, sent, skipped, total: all.length });
});

export type AdminMetrics = {
  windowDays: number;
  since: string;
  totals: {
    users: number;
    premium: number;
    certificates: number;
    streakShieldsHeld: number;
    avgStreakDays: number;
  };
  engagement: {
    activeUsers: number;
    activeUsers30d: number;
    lessonsCompleted: number;
    xpFromAttempts: number;
    homeworkCompleted: number;
  };
  programming: {
    learners: number;
    lessonsCompletedAll: number;
    lessonsCompletedWindow: number;
    lessonsTotal: number;
  };
  playground: {
    catalogChallenges: number;
    solvesWindow: number;
    solvesAllTime: number;
  };
  minis: {
    catalog: number;
    completionsAllTime: number;
    raceParticipantsThisWeek: number;
    raceFeatured: number;
  };
  exams: {
    catalog: number;
    passedAllTime: number;
    passedWindow: number;
    deepTrackLearners: number;
  };
  topActivityKinds: { kind: string; n: number }[];
};

export async function buildAdminMetrics(daysRaw?: number): Promise<AdminMetrics> {
  const days = Math.min(90, Math.max(7, Number(daysRaw ?? 7)));
  const since = new Date(Date.now() - days * 86400000);
  const since30 = new Date(Date.now() - 30 * 86400000);

  const [usersTotal] = await db.select({ n: sql<number>`count(*)::int` }).from(users);
  const [premium] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(users)
    .where(eq(users.plan, "premium"));

  const [active7] = await db
    .select({ n: sql<number>`count(distinct ${activityEvents.userId})::int` })
    .from(activityEvents)
    .where(gte(activityEvents.createdAt, since));

  const [lessons7] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(activityEvents)
    .where(
      and(
        eq(activityEvents.kind, "lesson_completed"),
        gte(activityEvents.createdAt, since),
      ),
    );

  const [xp7] = await db
    .select({
      n: sql<number>`coalesce(sum(${skillAttempts.xpGained}), 0)::int`,
    })
    .from(skillAttempts)
    .where(gte(skillAttempts.createdAt, since));

  const [pgSolves7] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(learningMilestones)
    .where(
      and(
        sql`${learningMilestones.code} like 'pg_ch_%'`,
        gte(learningMilestones.unlockedAt, since),
      ),
    );

  const [pgSolvesAll] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(learningMilestones)
    .where(sql`${learningMilestones.code} like 'pg_ch_%'`);

  const progCourse = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  let programming = {
    learners: 0,
    lessonsCompletedAll: 0,
    lessonsCompletedWindow: 0,
    lessonsTotal: 0,
  };
  if (progCourse) {
    const [learners] = await db
      .select({
        n: sql<number>`count(distinct ${userCourseProgress.userId})::int`,
      })
      .from(userCourseProgress)
      .where(eq(userCourseProgress.courseId, progCourse.id));
    const [doneAll] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.courseId, progCourse.id),
          eq(userLessonProgress.status, "completed"),
        ),
      );
    const [doneW] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.courseId, progCourse.id),
          eq(userLessonProgress.status, "completed"),
          gte(userLessonProgress.completedAt, since),
        ),
      );
    const [lt] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(lessons)
      .where(eq(lessons.courseId, progCourse.id));
    programming = {
      learners: learners?.n ?? 0,
      lessonsCompletedAll: doneAll?.n ?? 0,
      lessonsCompletedWindow: doneW?.n ?? 0,
      lessonsTotal: lt?.n ?? 0,
    };
  }

  const [certs] = await db.select({ n: sql<number>`count(*)::int` }).from(certificates);
  const [hwDone] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(assignmentSubmissions)
    .where(
      and(
        eq(assignmentSubmissions.status, "completed"),
        gte(assignmentSubmissions.completedAt, since),
      ),
    );

  const [shields] = await db
    .select({
      n: sql<number>`coalesce(sum(${characters.streakFreezes}), 0)::int`,
    })
    .from(characters);

  const [avgStreak] = await db
    .select({
      n: sql<number>`coalesce(avg(${characters.streakDays}), 0)::float`,
    })
    .from(characters);

  const topKinds = await db
    .select({
      kind: activityEvents.kind,
      n: sql<number>`count(*)::int`,
    })
    .from(activityEvents)
    .where(gte(activityEvents.createdAt, since))
    .groupBy(activityEvents.kind)
    .orderBy(sql`count(*) desc`)
    .limit(12);

  const [active30] = await db
    .select({ n: sql<number>`count(distinct ${activityEvents.userId})::int` })
    .from(activityEvents)
    .where(gte(activityEvents.createdAt, since30));

  // Programming minis stats
  let minisCompletionsAll = 0;
  let raceParticipants = 0;
  const raceSlugs = weeklyMinisRaceSlugs();
  const { startsAt: weekStart } = isoWeekBounds();
  if (progCourse) {
    const miniSlugs = [...PROGRAMMING_MINI_LESSON_SLUGS];
    const progLessons = await db.query.lessons.findMany({
      where: eq(lessons.courseId, progCourse.id),
    });
    const miniIds = progLessons
      .filter((l) => miniSlugs.includes(l.slug as (typeof miniSlugs)[number]))
      .map((l) => l.id);
    if (miniIds.length) {
      const [mc] = await db
        .select({ n: sql<number>`count(*)::int` })
        .from(userLessonProgress)
        .where(
          and(
            eq(userLessonProgress.courseId, progCourse.id),
            eq(userLessonProgress.status, "completed"),
            inArray(userLessonProgress.lessonId, miniIds),
          ),
        );
      minisCompletionsAll = mc?.n ?? 0;
    }
    const raceIds = progLessons
      .filter((l) => raceSlugs.includes(l.slug))
      .map((l) => l.id);
    if (raceIds.length) {
      const [rp] = await db
        .select({
          n: sql<number>`count(distinct ${userLessonProgress.userId})::int`,
        })
        .from(userLessonProgress)
        .where(
          and(
            eq(userLessonProgress.courseId, progCourse.id),
            eq(userLessonProgress.status, "completed"),
            inArray(userLessonProgress.lessonId, raceIds),
            gte(userLessonProgress.completedAt, weekStart),
          ),
        );
      raceParticipants = rp?.n ?? 0;
    }
  }

  return {
    windowDays: days,
    since: since.toISOString(),
    totals: {
      users: usersTotal?.n ?? 0,
      premium: premium?.n ?? 0,
      certificates: certs?.n ?? 0,
      streakShieldsHeld: shields?.n ?? 0,
      avgStreakDays: Math.round((avgStreak?.n ?? 0) * 10) / 10,
    },
    engagement: {
      activeUsers: active7?.n ?? 0,
      activeUsers30d: active30?.n ?? 0,
      lessonsCompleted: lessons7?.n ?? 0,
      xpFromAttempts: xp7?.n ?? 0,
      homeworkCompleted: hwDone?.n ?? 0,
    },
    programming,
    playground: {
      catalogChallenges: PLAYGROUND_CHALLENGES.length,
      solvesWindow: pgSolves7?.n ?? 0,
      solvesAllTime: pgSolvesAll?.n ?? 0,
    },
    minis: {
      catalog: PROGRAMMING_MINI_LESSON_SLUGS.length,
      completionsAllTime: minisCompletionsAll,
      raceParticipantsThisWeek: raceParticipants,
      raceFeatured: raceSlugs.length,
    },
    exams: await (async () => {
      const [catalog] = await db
        .select({ n: sql<number>`count(*)::int` })
        .from(lessons)
        .where(eq(lessons.isExam, true));
      const [passedAll] = await db
        .select({ n: sql<number>`count(*)::int` })
        .from(userLessonProgress)
        .innerJoin(lessons, eq(lessons.id, userLessonProgress.lessonId))
        .where(
          and(
            eq(userLessonProgress.status, "completed"),
            eq(lessons.isExam, true),
          ),
        );
      const [passedW] = await db
        .select({ n: sql<number>`count(*)::int` })
        .from(userLessonProgress)
        .innerJoin(lessons, eq(lessons.id, userLessonProgress.lessonId))
        .where(
          and(
            eq(userLessonProgress.status, "completed"),
            eq(lessons.isExam, true),
            gte(userLessonProgress.completedAt, since),
          ),
        );
      const deepSlugs = [
        "typescript",
        "html_semantics",
        "css_layout",
        "qa_theory",
        "js_fundamentals",
        "react_fundamentals",
        "sql_fundamentals",
        "node_fundamentals",
        "express_fundamentals",
      ];
      const deepCourses = await db.query.courses.findMany();
      const deepIds = deepCourses.filter((c) => deepSlugs.includes(c.slug)).map((c) => c.id);
      let deepTrackLearners = 0;
      if (deepIds.length) {
        const [row] = await db
          .select({
            n: sql<number>`count(distinct ${userCourseProgress.userId})::int`,
          })
          .from(userCourseProgress)
          .where(inArray(userCourseProgress.courseId, deepIds));
        deepTrackLearners = row?.n ?? 0;
      }
      return {
        catalog: catalog?.n ?? 0,
        passedAllTime: passedAll?.n ?? 0,
        passedWindow: passedW?.n ?? 0,
        deepTrackLearners,
      };
    })(),
    topActivityKinds: topKinds,
  };
}

function metricsToCsv(m: AdminMetrics): string {
  const esc = (v: string | number) => {
    const s = String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows: [string, string | number][] = [
    ["windowDays", m.windowDays],
    ["since", m.since],
    ["users", m.totals.users],
    ["premium", m.totals.premium],
    ["certificates", m.totals.certificates],
    ["streakShieldsHeld", m.totals.streakShieldsHeld],
    ["avgStreakDays", m.totals.avgStreakDays],
    ["activeUsers", m.engagement.activeUsers],
    ["activeUsers30d", m.engagement.activeUsers30d],
    ["lessonsCompleted", m.engagement.lessonsCompleted],
    ["xpFromAttempts", m.engagement.xpFromAttempts],
    ["homeworkCompleted", m.engagement.homeworkCompleted],
    ["programmingLearners", m.programming.learners],
    ["programmingLessonsWindow", m.programming.lessonsCompletedWindow],
    ["programmingLessonsAll", m.programming.lessonsCompletedAll],
    ["programmingLessonsTotal", m.programming.lessonsTotal],
    ["playgroundCatalog", m.playground.catalogChallenges],
    ["playgroundSolvesWindow", m.playground.solvesWindow],
    ["playgroundSolvesAll", m.playground.solvesAllTime],
    ["minisCatalog", m.minis.catalog],
    ["minisCompletionsAllTime", m.minis.completionsAllTime],
    ["minisRaceParticipantsWeek", m.minis.raceParticipantsThisWeek],
    ["minisRaceFeatured", m.minis.raceFeatured],
    ["examsCatalog", m.exams.catalog],
    ["examsPassedAllTime", m.exams.passedAllTime],
    ["examsPassedWindow", m.exams.passedWindow],
    ["deepTrackLearners", m.exams.deepTrackLearners],
  ];
  for (const k of m.topActivityKinds) {
    rows.push([`activity:${k.kind}`, k.n]);
  }
  const lines = ["metric,value", ...rows.map(([k, v]) => `${esc(k)},${esc(v)}`)];
  return lines.join("\n");
}

/** Rich product metrics for admin dashboard (7d / 30d windows) */
adminRoutes.get("/metrics", async (c) => {
  const days = Number(c.req.query("days") ?? 7);
  const data = await buildAdminMetrics(days);
  return c.json(data);
});

/** Same metrics as CSV download */
adminRoutes.get("/metrics.csv", async (c) => {
  const days = Number(c.req.query("days") ?? 7);
  const data = await buildAdminMetrics(days);
  const csv = metricsToCsv(data);
  const filename = `eduforge-metrics-${data.windowDays}d.csv`;
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
});
