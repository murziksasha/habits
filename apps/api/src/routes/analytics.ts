import { Hono } from "hono";
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import {
  activityEvents,
  characters,
  classAssignments,
  classMembers,
  classPlaygroundChallenges,
  classes,
  learningMilestones,
  organizationMembers,
  organizations,
  userLessonProgress,
  users,
  assignmentSubmissions,
  courses,
} from "@eduforge/db";
import { playgroundXpForCodes } from "@eduforge/shared";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";

type Vars = { user: AuthedUser };

export const analyticsRoutes = new Hono<{ Variables: Vars }>();

async function assertTeacherAccess(userId: string, classId: string) {
  const cls = await db.query.classes.findFirst({
    where: eq(classes.id, classId),
  });
  if (!cls) return null;
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.id, cls.organizationId),
  });
  if (!org) return null;
  if (org.ownerUserId === userId) return { cls, org, role: "owner" as const };
  const mem = await db.query.organizationMembers.findFirst({
    where: and(
      eq(organizationMembers.organizationId, org.id),
      eq(organizationMembers.userId, userId),
    ),
  });
  if (mem && (mem.role === "teacher" || mem.role === "owner")) {
    return { cls, org, role: mem.role };
  }
  return null;
}

analyticsRoutes.get("/class/:classId", authMiddleware, async (c) => {
  const user = c.get("user");
  const classId = c.req.param("classId") as string;
  const access = await assertTeacherAccess(user.id, classId);
  if (!access && user.role !== "admin") {
    return c.json({ error: "forbidden" }, 403);
  }

  const members = await db
    .select({
      userId: classMembers.userId,
      displayName: characters.displayName,
      globalXp: characters.globalXp,
      globalLevel: characters.globalLevel,
      streakDays: characters.streakDays,
      lastActiveDate: characters.lastActiveDate,
      email: users.email,
    })
    .from(classMembers)
    .leftJoin(characters, eq(characters.userId, classMembers.userId))
    .leftJoin(users, eq(users.id, classMembers.userId))
    .where(eq(classMembers.classId, classId));

  const studentIds = members.map((m) => m.userId);
  const since7 = new Date(Date.now() - 7 * 86400000);
  const since30 = new Date(Date.now() - 30 * 86400000);

  let activity7 = 0;
  let activity30 = 0;
  let lessonsCompleted7 = 0;
  let avgBestScore: number | null = null;

  if (studentIds.length) {
    const [a7] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(activityEvents)
      .where(
        and(
          inArray(activityEvents.userId, studentIds),
          gte(activityEvents.createdAt, since7),
        ),
      );
    activity7 = a7?.n ?? 0;

    const [a30] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(activityEvents)
      .where(
        and(
          inArray(activityEvents.userId, studentIds),
          gte(activityEvents.createdAt, since30),
        ),
      );
    activity30 = a30?.n ?? 0;

    const [lc] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(activityEvents)
      .where(
        and(
          inArray(activityEvents.userId, studentIds),
          eq(activityEvents.kind, "lesson_completed"),
          gte(activityEvents.createdAt, since7),
        ),
      );
    lessonsCompleted7 = lc?.n ?? 0;

    const [avg] = await db
      .select({
        v: sql<number>`avg(${userLessonProgress.bestScore})::float`,
      })
      .from(userLessonProgress)
      .where(
        and(
          inArray(userLessonProgress.userId, studentIds),
          sql`${userLessonProgress.attempts} > 0`,
        ),
      );
    avgBestScore = avg?.v ?? null;
  }

  const assignments = await db.query.classAssignments.findMany({
    where: eq(classAssignments.classId, classId),
  });

  const hwStats = [];
  for (const a of assignments) {
    const subs = await db.query.assignmentSubmissions.findMany({
      where: eq(assignmentSubmissions.assignmentId, a.id),
    });
    const completed = subs.filter((s) => s.status === "completed").length;
    const total = Math.max(studentIds.length, 1);
    hwStats.push({
      assignmentId: a.id,
      titleUk: a.titleUk,
      dueAt: a.dueAt,
      completed,
      total: studentIds.length,
      completionRate: studentIds.length ? completed / studentIds.length : 0,
      avgScore:
        subs.filter((s) => s.score != null).length > 0
          ? subs.reduce((acc, s) => acc + (s.score ?? 0), 0) /
            subs.filter((s) => s.score != null).length
          : null,
    });
  }

  const active7 = members.filter((m) => {
    if (!m.lastActiveDate) return false;
    return m.lastActiveDate >= since7.toISOString().slice(0, 10);
  }).length;

  // Playground solves per student
  const pgByUser = new Map<string, { solved: number; xp: number }>();
  if (studentIds.length) {
    const ms = await db.query.learningMilestones.findMany({
      where: and(
        inArray(learningMilestones.userId, studentIds),
        sql`${learningMilestones.code} like 'pg_ch_%'`,
      ),
    });
    const codesByUser = new Map<string, string[]>();
    for (const m of ms) {
      const list = codesByUser.get(m.userId) ?? [];
      list.push(m.code);
      codesByUser.set(m.userId, list);
    }
    for (const [uid, codes] of codesByUser) {
      pgByUser.set(uid, playgroundXpForCodes(codes));
    }
  }

  // Programming lesson counts
  const progCourse = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  const progDone = new Map<string, number>();
  if (progCourse && studentIds.length) {
    const rows = await db
      .select({
        userId: userLessonProgress.userId,
        n: sql<number>`count(*)::int`,
      })
      .from(userLessonProgress)
      .where(
        and(
          inArray(userLessonProgress.userId, studentIds),
          eq(userLessonProgress.courseId, progCourse.id),
          eq(userLessonProgress.status, "completed"),
        ),
      )
      .groupBy(userLessonProgress.userId);
    for (const r of rows) progDone.set(r.userId, r.n);
  }

  const classPgAssigns = await db.query.classPlaygroundChallenges.findMany({
    where: eq(classPlaygroundChallenges.classId, classId),
  });

  // Per-student summary
  const students = members.map((m) => {
    const pg = pgByUser.get(m.userId) ?? { solved: 0, xp: 0 };
    return {
      userId: m.userId,
      displayName: m.displayName ?? "—",
      email: m.email ?? "",
      globalXp: m.globalXp ?? 0,
      globalLevel: m.globalLevel ?? 1,
      streakDays: m.streakDays ?? 0,
      lastActiveDate: m.lastActiveDate,
      activeLast7: Boolean(
        m.lastActiveDate && m.lastActiveDate >= since7.toISOString().slice(0, 10),
      ),
      playgroundSolved: pg.solved,
      playgroundXp: pg.xp,
      programmingLessons: progDone.get(m.userId) ?? 0,
    };
  });

  students.sort((a, b) => b.globalXp - a.globalXp);

  const classPgSolvedAvg =
    students.length > 0
      ? students.reduce((s, x) => s + x.playgroundSolved, 0) / students.length
      : 0;

  return c.json({
    classId,
    className: access?.cls.name ?? "",
    summary: {
      students: studentIds.length,
      activeLast7Days: active7,
      activityEvents7d: activity7,
      activityEvents30d: activity30,
      lessonsCompleted7d: lessonsCompleted7,
      avgLessonScore: avgBestScore,
      homeworkCount: assignments.length,
      homeworkAvgCompletion:
        hwStats.length > 0
          ? hwStats.reduce((a, h) => a + h.completionRate, 0) / hwStats.length
          : 0,
      playgroundAssignCount: classPgAssigns.length,
      playgroundAvgSolved: classPgSolvedAvg,
    },
    students,
    homework: hwStats,
  });
});

analyticsRoutes.get("/org/:orgId", authMiddleware, async (c) => {
  const user = c.get("user");
  const orgId = c.req.param("orgId") as string;
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.id, orgId),
  });
  if (!org) return c.json({ error: "not_found" }, 404);

  const isOwner = org.ownerUserId === user.id;
  const mem = await db.query.organizationMembers.findFirst({
    where: and(
      eq(organizationMembers.organizationId, orgId),
      eq(organizationMembers.userId, user.id),
    ),
  });
  if (!isOwner && user.role !== "admin" && (!mem || mem.role === "student")) {
    return c.json({ error: "forbidden" }, 403);
  }

  const classList = await db.query.classes.findMany({
    where: eq(classes.organizationId, orgId),
  });

  const classesOut = [];
  for (const cls of classList) {
    const [cnt] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(classMembers)
      .where(eq(classMembers.classId, cls.id));
    classesOut.push({
      id: cls.id,
      name: cls.name,
      students: cnt?.n ?? 0,
      href: `/schools/class/${cls.id}`,
    });
  }

  return c.json({
    org: { id: org.id, name: org.name },
    classes: classesOut,
    totalStudents: classesOut.reduce((a, c) => a + c.students, 0),
  });
});
