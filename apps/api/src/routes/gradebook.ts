import { Hono } from "hono";
import { and, eq, inArray, sql } from "drizzle-orm";
import {
  assignmentSubmissions,
  characters,
  classAssignments,
  classMembers,
  classPlaygroundChallenges,
  classes,
  courses,
  learningMilestones,
  lessons,
  organizationMembers,
  userCourseProgress,
  userLessonProgress,
  users,
} from "@eduforge/db";
import {
  PLAYGROUND_CHALLENGES,
  playgroundChallengeById,
  playgroundXpForCodes,
} from "@eduforge/shared";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";

type Vars = { user: AuthedUser };

export const gradebookRoutes = new Hono<{ Variables: Vars }>();

async function canTeachClass(user: AuthedUser, classId: string) {
  if (user.role === "admin") return true;
  const cls = await db.query.classes.findFirst({ where: eq(classes.id, classId) });
  if (!cls) return false;
  if (cls.teacherUserId === user.id) return true;
  const mem = await db.query.organizationMembers.findFirst({
    where: and(
      eq(organizationMembers.organizationId, cls.organizationId),
      eq(organizationMembers.userId, user.id),
    ),
  });
  return mem?.role === "owner" || mem?.role === "teacher";
}

function csvEscape(v: string | number | null | undefined) {
  const s = v == null ? "" : String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

type GradebookStudent = {
  userId: string;
  displayName: string | null;
  email: string | null;
  globalXp: number | null;
  globalLevel: number | null;
  courseXpTotal: number;
  programmingLessons: number;
  programmingXp: number;
  playgroundSolved: number;
  playgroundXp: number;
  homework: {
    assignmentId: string;
    titleUk: string;
    status: string;
    score: number | null;
  }[];
  classPlayground: {
    assignmentId: string;
    challengeId: string;
    titleUk: string;
    solved: boolean;
    xpReward: number;
  }[];
};

async function buildGradebook(classId: string): Promise<{
  className: string;
  students: GradebookStudent[];
  assignments: { id: string; titleUk: string; dueAt: Date | null }[];
  classPlayground: {
    id: string;
    challengeId: string;
    titleUk: string;
    titleEn: string;
    xpReward: number;
  }[];
  meta: {
    programmingLessonsTotal: number;
    playgroundChallengesTotal: number;
    playgroundMaxXp: number;
  };
} | null> {
  const cls = await db.query.classes.findFirst({ where: eq(classes.id, classId) });
  if (!cls) return null;

  const students = await db
    .select({
      userId: classMembers.userId,
      displayName: characters.displayName,
      email: users.email,
      globalXp: characters.globalXp,
      globalLevel: characters.globalLevel,
    })
    .from(classMembers)
    .leftJoin(characters, eq(characters.userId, classMembers.userId))
    .leftJoin(users, eq(users.id, classMembers.userId))
    .where(eq(classMembers.classId, classId));

  const studentIds = students.map((s) => s.userId);

  const assignments = await db.query.classAssignments.findMany({
    where: eq(classAssignments.classId, classId),
  });

  const classPg = await db.query.classPlaygroundChallenges.findMany({
    where: eq(classPlaygroundChallenges.classId, classId),
  });

  const classPgEnriched = classPg.map((a) => {
    const ch = playgroundChallengeById(a.challengeId);
    return {
      id: a.id,
      challengeId: a.challengeId,
      titleUk: a.titleUk || ch?.titleUk || a.challengeId,
      titleEn: a.titleEn || ch?.titleEn || a.challengeId,
      xpReward: ch?.xpReward ?? 0,
    };
  });

  // Course XP totals
  const courseXpMap = new Map<string, number>();
  const progXpMap = new Map<string, number>();
  if (studentIds.length) {
    const courseRows = await db
      .select({
        userId: userCourseProgress.userId,
        xp: userCourseProgress.xp,
        courseId: userCourseProgress.courseId,
      })
      .from(userCourseProgress)
      .where(inArray(userCourseProgress.userId, studentIds));
    for (const r of courseRows) {
      courseXpMap.set(r.userId, (courseXpMap.get(r.userId) ?? 0) + r.xp);
    }
  }

  const progCourse = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  let programmingLessonsTotal = 0;
  const progLessonsMap = new Map<string, number>();
  if (progCourse) {
    const allProgLessons = await db.query.lessons.findMany({
      where: eq(lessons.courseId, progCourse.id),
    });
    programmingLessonsTotal = allProgLessons.length;

    if (studentIds.length) {
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
      for (const r of rows) progLessonsMap.set(r.userId, r.n);

      const progXpRows = await db
        .select({
          userId: userCourseProgress.userId,
          xp: userCourseProgress.xp,
        })
        .from(userCourseProgress)
        .where(
          and(
            inArray(userCourseProgress.userId, studentIds),
            eq(userCourseProgress.courseId, progCourse.id),
          ),
        );
      for (const r of progXpRows) progXpMap.set(r.userId, r.xp);
    }
  }

  // Playground milestones
  const pgByUser = new Map<string, { solved: number; xp: number; codes: Set<string> }>();
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
      const stats = playgroundXpForCodes(codes);
      pgByUser.set(uid, {
        solved: stats.solved,
        xp: stats.xp,
        codes: new Set(codes.map((c) => c.replace(/^pg_ch_/, ""))),
      });
    }
  }

  // Homework submissions bulk
  const assignmentIds = assignments.map((a) => a.id);
  const allSubs =
    assignmentIds.length && studentIds.length
      ? await db.query.assignmentSubmissions.findMany({
          where: inArray(assignmentSubmissions.assignmentId, assignmentIds),
        })
      : [];
  const subKey = (userId: string, assignmentId: string) => `${userId}:${assignmentId}`;
  const subMap = new Map(
    allSubs.map((s) => [subKey(s.userId, s.assignmentId), s]),
  );

  const enriched: GradebookStudent[] = students.map((s) => {
    const pg = pgByUser.get(s.userId) ?? {
      solved: 0,
      xp: 0,
      codes: new Set<string>(),
    };
    const hw = assignments.map((a) => {
      const sub = subMap.get(subKey(s.userId, a.id));
      return {
        assignmentId: a.id,
        titleUk: a.titleUk,
        status: sub?.status ?? "missing",
        score: sub?.score ?? null,
      };
    });
    const classPlayground = classPgEnriched.map((a) => ({
      assignmentId: a.id,
      challengeId: a.challengeId,
      titleUk: a.titleUk,
      solved: pg.codes.has(a.challengeId),
      xpReward: a.xpReward,
    }));
    return {
      userId: s.userId,
      displayName: s.displayName,
      email: s.email,
      globalXp: s.globalXp,
      globalLevel: s.globalLevel,
      courseXpTotal: courseXpMap.get(s.userId) ?? 0,
      programmingLessons: progLessonsMap.get(s.userId) ?? 0,
      programmingXp: progXpMap.get(s.userId) ?? 0,
      playgroundSolved: pg.solved,
      playgroundXp: pg.xp,
      homework: hw,
      classPlayground,
    };
  });

  enriched.sort((a, b) => (b.globalXp ?? 0) - (a.globalXp ?? 0));

  return {
    className: cls.name,
    students: enriched,
    assignments: assignments.map((a) => ({
      id: a.id,
      titleUk: a.titleUk,
      dueAt: a.dueAt,
    })),
    classPlayground: classPgEnriched,
    meta: {
      programmingLessonsTotal,
      playgroundChallengesTotal: PLAYGROUND_CHALLENGES.length,
      playgroundMaxXp: PLAYGROUND_CHALLENGES.reduce((s, ch) => s + ch.xpReward, 0),
    },
  };
}

/** CSV gradebook for a class: students × homework + programming/PG metrics */
gradebookRoutes.get("/class/:classId.csv", authMiddleware, async (c) => {
  const user = c.get("user");
  const classId = c.req.param("classId") as string;
  if (!(await canTeachClass(user, classId))) {
    return c.json({ error: "forbidden" }, 403);
  }

  const data = await buildGradebook(classId);
  if (!data) return c.json({ error: "not_found" }, 404);

  const header = [
    "displayName",
    "email",
    "globalLevel",
    "globalXp",
    "programmingLessons",
    "programmingXp",
    "playgroundSolved",
    "playgroundXp",
    ...data.assignments.map((a) => `hw:${a.titleUk || a.id.slice(0, 8)}`),
    ...data.classPlayground.map((a) => `pg:${a.titleUk || a.challengeId}`),
    "courseXpTotal",
  ];

  const lines = [header.map(csvEscape).join(",")];

  for (const s of data.students) {
    const hwCols = s.homework.map((h) => {
      if (h.status === "missing") return "";
      if (h.status === "completed") {
        return h.score != null ? Math.round(h.score * 100) : "done";
      }
      return h.status;
    });
    const pgCols = s.classPlayground.map((p) => (p.solved ? "done" : ""));

    lines.push(
      [
        s.displayName,
        s.email,
        s.globalLevel,
        s.globalXp,
        s.programmingLessons,
        s.programmingXp,
        s.playgroundSolved,
        s.playgroundXp,
        ...hwCols,
        ...pgCols,
        s.courseXpTotal,
      ]
        .map(csvEscape)
        .join(","),
    );
  }

  const csv = lines.join("\n");
  const filename = `gradebook-${data.className.replace(/\s+/g, "-").slice(0, 40)}.csv`;
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
});

/** JSON summary (same data, for UI table) */
gradebookRoutes.get("/class/:classId", authMiddleware, async (c) => {
  const user = c.get("user");
  const classId = c.req.param("classId") as string;
  if (!(await canTeachClass(user, classId))) {
    return c.json({ error: "forbidden" }, 403);
  }

  const data = await buildGradebook(classId);
  if (!data) return c.json({ error: "not_found" }, 404);

  return c.json({
    students: data.students,
    assignments: data.assignments,
    classPlayground: data.classPlayground,
    meta: data.meta,
  });
});
