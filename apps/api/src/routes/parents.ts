import { Hono } from "hono";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import {
  activityEvents,
  assignmentSubmissions,
  certificates,
  characters,
  classAssignments,
  classes,
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
  playgroundChallengeById,
  playgroundXpForCodes,
} from "@eduforge/shared";
import { randomBytes } from "node:crypto";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";
import { parentChildDigestEmail, sendMail } from "../email.js";

type Vars = { user: AuthedUser };

export const parentRoutes = new Hono<{ Variables: Vars }>();

/** 16 hex chars (~64 bit) + rate limits on claim reduce brute-force risk */
function code() {
  return randomBytes(8).toString("hex").toUpperCase();
}

/** Student generates invite code for parent to claim */
parentRoutes.post("/invite", authMiddleware, async (c) => {
  const user = c.get("user");
  const inviteCode = code();
  // Store pending link with parentUserId temporarily = student (placeholder) until parent claims?
  // Better model: student creates invite code stored on a pending row with parentUserId null — schema requires parent.
  // Use: student creates invite; parent claims by code → creates link parent→student.

  // Find existing pending invite for this student (parentUserId = studentId as marker for unclaimed)
  // Cleaner: store invite_code only with student as studentUserId and parentUserId = student until claimed, then update.
  // Actually use studentUserId = me, parentUserId = me, status pending, invite_code set; on claim update parentUserId.

  const existing = await db.query.parentStudentLinks.findFirst({
    where: and(
      eq(parentStudentLinks.studentUserId, user.id),
      eq(parentStudentLinks.status, "pending"),
      eq(parentStudentLinks.parentUserId, user.id),
    ),
  });

  if (existing) {
    const newCode = code();
    await db
      .update(parentStudentLinks)
      .set({ inviteCode: newCode })
      .where(eq(parentStudentLinks.id, existing.id));
    return c.json({ inviteCode: newCode });
  }

  await db.insert(parentStudentLinks).values({
    parentUserId: user.id, // placeholder until parent claims
    studentUserId: user.id,
    status: "pending",
    inviteCode,
  });

  return c.json({ inviteCode });
});

/** Parent claims invite code */
parentRoutes.post("/claim", authMiddleware, async (c) => {
  const user = c.get("user");
  const { rateLimit, clientIp } = await import("../rate-limit.js");
  const ip = clientIp({ get: (n) => c.req.header(n) ?? null });
  const rl = await rateLimit({
    key: `parent-claim:${user.id}:${ip}`,
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (!rl.ok) {
    return c.json({ error: "rate_limited", retryAfterSec: rl.retryAfterSec }, 429);
  }
  const body = await c.req.json().catch(() => ({}));
  const inviteCode = String(body.inviteCode ?? "")
    .trim()
    .toUpperCase();
  if (!inviteCode || inviteCode.length < 12) return c.json({ error: "invalid_input" }, 400);

  const link = await db.query.parentStudentLinks.findFirst({
    where: and(
      eq(parentStudentLinks.inviteCode, inviteCode),
      eq(parentStudentLinks.status, "pending"),
    ),
  });
  if (!link) return c.json({ error: "not_found" }, 404);
  if (link.studentUserId === user.id) {
    return c.json({ error: "cannot_link_self" }, 400);
  }

  // Remove placeholder uniqueness conflict if parent already linked
  const already = await db.query.parentStudentLinks.findFirst({
    where: and(
      eq(parentStudentLinks.parentUserId, user.id),
      eq(parentStudentLinks.studentUserId, link.studentUserId),
      eq(parentStudentLinks.status, "active"),
    ),
  });
  if (already) return c.json({ error: "already_linked" }, 409);

  await db
    .update(parentStudentLinks)
    .set({
      parentUserId: user.id,
      status: "active",
      acceptedAt: new Date(),
      inviteCode: null,
    })
    .where(eq(parentStudentLinks.id, link.id));

  const parentCh = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  await notifyUser(db, link.studentUserId, {
    type: "parent",
    titleUk: "Батьківський доступ",
    titleEn: "Parent linked",
    bodyUk: `${parentCh?.displayName ?? "Батько/мати"} підключився до вашого прогресу`,
    bodyEn: `${parentCh?.displayName ?? "A parent"} linked to your progress`,
    href: "/parents",
  });
  await logActivity(db, user.id, "parent_linked", { studentId: link.studentUserId });

  return c.json({ ok: true, studentUserId: link.studentUserId });
});

/** Parent lists linked students */
parentRoutes.get("/children", authMiddleware, async (c) => {
  const user = c.get("user");
  const links = await db.query.parentStudentLinks.findMany({
    where: and(
      eq(parentStudentLinks.parentUserId, user.id),
      eq(parentStudentLinks.status, "active"),
    ),
  });

  const children = [];
  for (const l of links) {
    const ch = await db.query.characters.findFirst({
      where: eq(characters.userId, l.studentUserId),
    });
    const u = await db.query.users.findFirst({
      where: eq(users.id, l.studentUserId),
    });
    children.push({
      linkId: l.id,
      userId: l.studentUserId,
      displayName: ch?.displayName ?? "—",
      email: u?.email ?? "",
      globalXp: ch?.globalXp ?? 0,
      globalLevel: ch?.globalLevel ?? 1,
      streakDays: ch?.streakDays ?? 0,
      dailyXp: ch?.dailyXp ?? 0,
      dailyGoalXp: ch?.dailyGoalXp ?? 50,
    });
  }
  return c.json({ children });
});

/** Student lists parents */
parentRoutes.get("/parents", authMiddleware, async (c) => {
  const user = c.get("user");
  const links = await db.query.parentStudentLinks.findMany({
    where: and(
      eq(parentStudentLinks.studentUserId, user.id),
      eq(parentStudentLinks.status, "active"),
    ),
  });
  const parents = [];
  for (const l of links) {
    if (l.parentUserId === l.studentUserId) continue;
    const ch = await db.query.characters.findFirst({
      where: eq(characters.userId, l.parentUserId),
    });
    parents.push({
      linkId: l.id,
      userId: l.parentUserId,
      displayName: ch?.displayName ?? "—",
    });
  }
  // pending invite code if any
  const pending = await db.query.parentStudentLinks.findFirst({
    where: and(
      eq(parentStudentLinks.studentUserId, user.id),
      eq(parentStudentLinks.status, "pending"),
      eq(parentStudentLinks.parentUserId, user.id),
    ),
  });
  return c.json({
    parents,
    pendingInviteCode: pending?.inviteCode ?? null,
  });
});

/** Parent: child progress overview */
parentRoutes.get("/children/:studentId/progress", authMiddleware, async (c) => {
  const user = c.get("user");
  const studentId = c.req.param("studentId") as string;

  const link = await db.query.parentStudentLinks.findFirst({
    where: and(
      eq(parentStudentLinks.parentUserId, user.id),
      eq(parentStudentLinks.studentUserId, studentId),
      eq(parentStudentLinks.status, "active"),
    ),
  });
  if (!link && user.role !== "admin") return c.json({ error: "forbidden" }, 403);

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, studentId),
  });
  const courseProg = await db
    .select({
      courseSlug: courses.slug,
      titleUk: courses.titleUk,
      xp: userCourseProgress.xp,
      level: userCourseProgress.level,
      completedLessons: userCourseProgress.completedLessons,
    })
    .from(userCourseProgress)
    .innerJoin(courses, eq(courses.id, userCourseProgress.courseId))
    .where(eq(userCourseProgress.userId, studentId));

  const hw = await db
    .select({
      titleUk: classAssignments.titleUk,
      status: assignmentSubmissions.status,
      score: assignmentSubmissions.score,
      dueAt: classAssignments.dueAt,
      completedAt: assignmentSubmissions.completedAt,
      className: classes.name,
    })
    .from(assignmentSubmissions)
    .innerJoin(
      classAssignments,
      eq(classAssignments.id, assignmentSubmissions.assignmentId),
    )
    .innerJoin(classes, eq(classes.id, classAssignments.classId))
    .where(eq(assignmentSubmissions.userId, studentId))
    .orderBy(desc(classAssignments.createdAt))
    .limit(20);

  // Playground challenge milestones
  const milestones = await db.query.learningMilestones.findMany({
    where: eq(learningMilestones.userId, studentId),
  });
  const pgCodes = milestones
    .filter((m) => m.code.startsWith("pg_ch_"))
    .map((m) => m.code);
  const pgStats = playgroundXpForCodes(pgCodes);
  const solvedChallenges = pgCodes
    .map((code) => {
      const id = code.slice("pg_ch_".length);
      const ch = playgroundChallengeById(id);
      if (!ch) return null;
      return {
        id: ch.id,
        lang: ch.lang,
        titleUk: ch.titleUk,
        titleEn: ch.titleEn,
        xpReward: ch.xpReward,
      };
    })
    .filter(Boolean);

  // Programming path: per-unit lesson completion
  const progCourse = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  let programming: {
    lessonsCompleted: number;
    lessonsTotal: number;
    unitsDone: number;
    unitsTotal: number;
    pathComplete: boolean;
    units: {
      slug: string;
      titleUk: string;
      titleEn: string;
      done: number;
      total: number;
      complete: boolean;
    }[];
  } | null = null;

  if (progCourse) {
    const courseUnits = await db.query.units.findMany({
      where: eq(units.courseId, progCourse.id),
    });
    const courseLessons = await db.query.lessons.findMany({
      where: eq(lessons.courseId, progCourse.id),
    });
    const progress = await db.query.userLessonProgress.findMany({
      where: and(
        eq(userLessonProgress.userId, studentId),
        eq(userLessonProgress.courseId, progCourse.id),
        eq(userLessonProgress.status, "completed"),
      ),
    });
    const doneIds = new Set(progress.map((p) => p.lessonId));
    const unitRows = courseUnits.map((u) => {
      const ul = courseLessons.filter((l) => l.unitId === u.id);
      const done = ul.filter((l) => doneIds.has(l.id)).length;
      return {
        slug: u.slug,
        titleUk: u.titleUk,
        titleEn: u.titleEn || u.titleUk,
        done,
        total: ul.length,
        complete: ul.length > 0 && done === ul.length,
      };
    });
    const unitsDone = unitRows.filter((u) => u.complete).length;
    programming = {
      lessonsCompleted: doneIds.size,
      lessonsTotal: courseLessons.length,
      unitsDone,
      unitsTotal: courseUnits.length,
      pathComplete: courseUnits.length > 0 && unitsDone === courseUnits.length,
      units: unitRows,
    };
  }

  const certs = await db
    .select({
      code: certificates.code,
      titleUk: certificates.titleUk,
      titleEn: certificates.titleEn,
      issuedAt: certificates.issuedAt,
      courseSlug: courses.slug,
    })
    .from(certificates)
    .innerJoin(courses, eq(courses.id, certificates.courseId))
    .where(eq(certificates.userId, studentId))
    .orderBy(desc(certificates.issuedAt));

  const progMilestones = milestones
    .filter((m) => m.code.startsWith("prog_") || m.code.startsWith("pg_"))
    .map((m) => ({
      code: m.code,
      titleUk: m.titleUk,
      titleEn: m.titleEn,
      unlockedAt: m.unlockedAt,
    }));

  return c.json({
    character: ch,
    courses: courseProg,
    homework: hw,
    playground: {
      solved: pgStats.solved,
      xp: pgStats.xp,
      total: PLAYGROUND_CHALLENGES.length,
      maxXp: PLAYGROUND_CHALLENGES.reduce((s, ch) => s + ch.xpReward, 0),
      challenges: solvedChallenges,
    },
    programming,
    certificates: certs,
    milestones: progMilestones,
  });
});

async function assertParentOf(parentUserId: string, studentId: string, isAdmin: boolean) {
  if (isAdmin) return true;
  const link = await db.query.parentStudentLinks.findFirst({
    where: and(
      eq(parentStudentLinks.parentUserId, parentUserId),
      eq(parentStudentLinks.studentUserId, studentId),
      eq(parentStudentLinks.status, "active"),
    ),
  });
  return Boolean(link);
}

export type ChildDigest = {
  periodDays: number;
  since: string;
  studentId: string;
  childName: string;
  globalLevel: number;
  streakDays: number;
  lessonsCompleted: number;
  xpApprox: number;
  programmingLessonsWeek: number;
  playgroundSolvedWeek: number;
  homeworkCompletedWeek: number;
  examsPassedWeek: number;
  parentId: string;
  parentName: string;
  parentEmail: string;
  locale: string;
};

/** Build 7-day parent digest stats for one child (parent identity for email). */
export async function buildChildDigest(
  studentId: string,
  parentUserId: string,
): Promise<ChildDigest | null> {
  const since = new Date(Date.now() - 7 * 86400000);
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, studentId),
  });
  const parentCh = await db.query.characters.findFirst({
    where: eq(characters.userId, parentUserId),
  });
  const parentUser = await db.query.users.findFirst({
    where: eq(users.id, parentUserId),
  });
  if (!parentUser) return null;

  const [lessonActivity] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(activityEvents)
    .where(
      and(
        eq(activityEvents.userId, studentId),
        eq(activityEvents.kind, "lesson_completed"),
        gte(activityEvents.createdAt, since),
      ),
    );

  const [xpRow] = await db
    .select({
      xp: sql<number>`coalesce(sum(${skillAttempts.xpGained}), 0)::int`,
    })
    .from(skillAttempts)
    .where(
      and(eq(skillAttempts.userId, studentId), gte(skillAttempts.createdAt, since)),
    );

  const progCourse = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  let programmingLessonsWeek = 0;
  if (progCourse) {
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, studentId),
          eq(userLessonProgress.courseId, progCourse.id),
          eq(userLessonProgress.status, "completed"),
          gte(userLessonProgress.completedAt, since),
        ),
      );
    programmingLessonsWeek = row?.n ?? 0;
  }

  const pgMs = await db.query.learningMilestones.findMany({
    where: and(
      eq(learningMilestones.userId, studentId),
      gte(learningMilestones.unlockedAt, since),
    ),
  });
  const playgroundSolvedWeek = pgMs.filter((m) => m.code.startsWith("pg_ch_")).length;

  const [hwDone] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(assignmentSubmissions)
    .where(
      and(
        eq(assignmentSubmissions.userId, studentId),
        eq(assignmentSubmissions.status, "completed"),
        gte(assignmentSubmissions.completedAt, since),
      ),
    );

  const [examDone] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(userLessonProgress)
    .innerJoin(lessons, eq(lessons.id, userLessonProgress.lessonId))
    .where(
      and(
        eq(userLessonProgress.userId, studentId),
        eq(userLessonProgress.status, "completed"),
        eq(lessons.isExam, true),
        gte(userLessonProgress.completedAt, since),
      ),
    );

  return {
    periodDays: 7,
    since: since.toISOString(),
    studentId,
    childName: ch?.displayName ?? "Learner",
    globalLevel: ch?.globalLevel ?? 1,
    streakDays: ch?.streakDays ?? 0,
    lessonsCompleted: lessonActivity?.n ?? 0,
    xpApprox: xpRow?.xp ?? 0,
    programmingLessonsWeek,
    playgroundSolvedWeek,
    homeworkCompletedWeek: hwDone?.n ?? 0,
    examsPassedWeek: examDone?.n ?? 0,
    parentId: parentUserId,
    parentName: parentCh?.displayName ?? "Parent",
    parentEmail: parentUser.email ?? "",
    locale: parentUser.preferredLocale ?? "uk",
  };
}

async function wasDigestSentRecently(
  parentUserId: string,
  studentId: string,
  withinMs = 6 * 86400000,
) {
  const cutoff = new Date(Date.now() - withinMs);
  const rows = await db.query.activityEvents.findMany({
    where: and(
      eq(activityEvents.userId, parentUserId),
      eq(activityEvents.kind, "parent_digest_sent"),
      gte(activityEvents.createdAt, cutoff),
    ),
  });
  return rows.some((r) => (r.payload as { studentId?: string })?.studentId === studentId);
}

/** Cron: email digests for all active parent→child links (throttle 6 days). */
export async function runParentDigestBatch() {
  const links = await db.query.parentStudentLinks.findMany({
    where: eq(parentStudentLinks.status, "active"),
  });

  let sent = 0;
  let skipped = 0;
  let errors = 0;

  for (const link of links) {
    // Skip unclaimed placeholders (parent == student)
    if (link.parentUserId === link.studentUserId) {
      skipped += 1;
      continue;
    }
    if (await wasDigestSentRecently(link.parentUserId, link.studentUserId)) {
      skipped += 1;
      continue;
    }

    const digest = await buildChildDigest(link.studentUserId, link.parentUserId);
    if (!digest?.parentEmail) {
      skipped += 1;
      continue;
    }

    try {
      const mail = parentChildDigestEmail({
        email: digest.parentEmail,
        parentName: digest.parentName,
        childName: digest.childName,
        locale: digest.locale,
        lessonsCompleted: digest.lessonsCompleted,
        xpApprox: digest.xpApprox,
        streakDays: digest.streakDays,
        programmingLessonsWeek: digest.programmingLessonsWeek,
        playgroundSolvedWeek: digest.playgroundSolvedWeek,
        homeworkCompletedWeek: digest.homeworkCompletedWeek,
        examsPassedWeek: digest.examsPassedWeek,
        globalLevel: digest.globalLevel,
      });
      await sendMail(mail);
      await logActivity(db, link.parentUserId, "parent_digest_sent", {
        studentId: link.studentUserId,
        source: "cron",
      });
      sent += 1;
    } catch {
      errors += 1;
    }
  }

  return { sent, skipped, errors, links: links.length };
}

/** Parent: 7-day digest for a linked child (programming + PG + HW) */
parentRoutes.get("/children/:studentId/digest", authMiddleware, async (c) => {
  const user = c.get("user");
  const studentId = c.req.param("studentId") as string;
  if (!(await assertParentOf(user.id, studentId, user.role === "admin"))) {
    return c.json({ error: "forbidden" }, 403);
  }

  const digest = await buildChildDigest(studentId, user.id);
  if (!digest) return c.json({ error: "not_found" }, 404);
  return c.json({ digest });
});

/** Parent: email weekly digest about child to parent's address */
parentRoutes.post("/children/:studentId/digest/send", authMiddleware, async (c) => {
  const user = c.get("user");
  const studentId = c.req.param("studentId") as string;
  if (!(await assertParentOf(user.id, studentId, user.role === "admin"))) {
    return c.json({ error: "forbidden" }, 403);
  }

  const digest = await buildChildDigest(studentId, user.id);
  if (!digest?.parentEmail) return c.json({ error: "no_email" }, 400);

  const mail = parentChildDigestEmail({
    email: digest.parentEmail,
    parentName: digest.parentName,
    childName: digest.childName,
    locale: digest.locale,
    lessonsCompleted: digest.lessonsCompleted,
    xpApprox: digest.xpApprox,
    streakDays: digest.streakDays,
    programmingLessonsWeek: digest.programmingLessonsWeek,
    playgroundSolvedWeek: digest.playgroundSolvedWeek,
    homeworkCompletedWeek: digest.homeworkCompletedWeek,
    examsPassedWeek: digest.examsPassedWeek,
    globalLevel: digest.globalLevel,
  });
  const result = await sendMail(mail);
  await logActivity(db, user.id, "parent_digest_sent", { studentId, source: "manual" });

  return c.json({ ok: true, ...result, preview: mail.text });
});

/**
 * Cron / admin: batch parent digests.
 * Auth: CRON_SECRET via x-cron-secret or Bearer, or admin session.
 */
parentRoutes.post("/digest/run", async (c) => {
  const cron = process.env.CRON_SECRET;
  const secret =
    c.req.header("x-cron-secret") ??
    c.req.header("authorization")?.replace(/^Bearer\s+/i, "");

  let allowed = false;
  if (cron && secret === cron) allowed = true;
  if (!cron && process.env.NODE_ENV !== "production") allowed = true;

  if (!allowed) {
    const { getUserFromToken } = await import("../auth.js");
    const token =
      c.req.header("authorization")?.replace(/^Bearer\s+/i, "") ?? undefined;
    const u = await getUserFromToken(token);
    if (u?.role === "admin") allowed = true;
  }

  if (!allowed) return c.json({ error: "unauthorized" }, 401);

  const result = await runParentDigestBatch();
  return c.json({ ok: true, ...result });
});

parentRoutes.post("/links/:id/revoke", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const link = await db.query.parentStudentLinks.findFirst({
    where: eq(parentStudentLinks.id, id),
  });
  if (!link) return c.json({ error: "not_found" }, 404);
  if (
    link.parentUserId !== user.id &&
    link.studentUserId !== user.id &&
    user.role !== "admin"
  ) {
    return c.json({ error: "forbidden" }, 403);
  }
  await db
    .update(parentStudentLinks)
    .set({ status: "revoked" })
    .where(eq(parentStudentLinks.id, id));
  return c.json({ ok: true });
});
