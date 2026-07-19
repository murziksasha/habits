import { Hono } from "hono";
import { and, eq, gt, lt, or } from "drizzle-orm";
import {
  assignmentSubmissions,
  classAssignments,
  classes,
} from "@eduforge/db";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { notifyUser } from "../engagement.js";

type Vars = { user: AuthedUser };

export const reminderRoutes = new Hono<{ Variables: Vars }>();

/**
 * Scan open homework and send due-soon / overdue notifications.
 * Callable by admin or via CRON_SECRET header for scheduled jobs.
 */
export async function runHomeworkReminders() {
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // Due within 24h (still assigned)
  const dueSoon = await db
    .select({
      submissionId: assignmentSubmissions.id,
      userId: assignmentSubmissions.userId,
      titleUk: classAssignments.titleUk,
      titleEn: classAssignments.titleEn,
      dueAt: classAssignments.dueAt,
      className: classes.name,
    })
    .from(assignmentSubmissions)
    .innerJoin(
      classAssignments,
      eq(classAssignments.id, assignmentSubmissions.assignmentId),
    )
    .innerJoin(classes, eq(classes.id, classAssignments.classId))
    .where(
      and(
        eq(assignmentSubmissions.status, "assigned"),
        gt(classAssignments.dueAt, now),
        lt(classAssignments.dueAt, in24h),
      ),
    );

  // Overdue
  const overdue = await db
    .select({
      submissionId: assignmentSubmissions.id,
      userId: assignmentSubmissions.userId,
      titleUk: classAssignments.titleUk,
      titleEn: classAssignments.titleEn,
      dueAt: classAssignments.dueAt,
      className: classes.name,
    })
    .from(assignmentSubmissions)
    .innerJoin(
      classAssignments,
      eq(classAssignments.id, assignmentSubmissions.assignmentId),
    )
    .innerJoin(classes, eq(classes.id, classAssignments.classId))
    .where(
      and(
        eq(assignmentSubmissions.status, "assigned"),
        lt(classAssignments.dueAt, now),
      ),
    );

  let sent = 0;

  for (const row of dueSoon) {
    await notifyUser(db, row.userId, {
      type: "reminder",
      titleUk: "Дедлайн скоро",
      titleEn: "Due soon",
      bodyUk: `${row.titleUk} (${row.className}) — до ${row.dueAt?.toISOString() ?? ""}`,
      bodyEn: `${row.titleEn || row.titleUk} (${row.className}) due soon`,
      href: "/homework",
    });
    sent += 1;
  }

  for (const row of overdue) {
    await notifyUser(db, row.userId, {
      type: "reminder",
      titleUk: "Прострочене ДЗ",
      titleEn: "Overdue homework",
      bodyUk: `${row.titleUk} (${row.className})`,
      bodyEn: `${row.titleEn || row.titleUk} (${row.className})`,
      href: "/homework",
    });
    sent += 1;
  }

  return {
    dueSoon: dueSoon.length,
    overdue: overdue.length,
    notificationsSent: sent,
  };
}

reminderRoutes.post("/homework/run", async (c) => {
  const cron = process.env.CRON_SECRET;
  const secret =
    c.req.header("x-cron-secret") ??
    c.req.header("authorization")?.replace(/^Bearer\s+/i, "");

  // Production: require CRON_SECRET. Dev (no secret): allow.
  if (cron && secret !== cron) {
    return c.json({ error: "unauthorized" }, 401);
  }

  const result = await runHomeworkReminders();
  return c.json({ ok: true, ...result });
});

/** Authenticated user: personal due digest (no spam blast) */
reminderRoutes.get("/homework/mine", authMiddleware, async (c) => {
  const user = c.get("user");
  const now = new Date();
  const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const rows = await db
    .select({
      titleUk: classAssignments.titleUk,
      titleEn: classAssignments.titleEn,
      dueAt: classAssignments.dueAt,
      status: assignmentSubmissions.status,
      className: classes.name,
      lessonId: classAssignments.lessonId,
    })
    .from(assignmentSubmissions)
    .innerJoin(
      classAssignments,
      eq(classAssignments.id, assignmentSubmissions.assignmentId),
    )
    .innerJoin(classes, eq(classes.id, classAssignments.classId))
    .where(
      and(
        eq(assignmentSubmissions.userId, user.id),
        eq(assignmentSubmissions.status, "assigned"),
        or(
          and(gt(classAssignments.dueAt, now), lt(classAssignments.dueAt, in48h)),
          lt(classAssignments.dueAt, now),
        ),
      ),
    );

  return c.json({
    reminders: rows.map((r) => ({
      ...r,
      overdue: r.dueAt ? r.dueAt.getTime() < now.getTime() : false,
    })),
  });
});
