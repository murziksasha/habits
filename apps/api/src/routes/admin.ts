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
import {
  adminMiddleware,
  requireStepUp,
  type AuthedUser,
} from "../auth.js";
import { db } from "../db.js";
import { runInactivePushReengage } from "../services/reengage.js";
import { runParentDigestBatch } from "./parents.js";
import { runHomeworkReminders } from "./reminders.js";
import { buildWeeklyStats } from "./reports.js";
import { sendMail, weeklyReportEmail } from "../email.js";
import {
  courseSlugPattern,
  DEFAULT_PLATFORM_THEME,
  platformThemeSchema,
  validateExercises,
  type PlatformTheme,
} from "@eduforge/shared";
import { platformSettings, organizations, classes } from "@eduforge/db";

type Vars = { user: AuthedUser; sessionToken?: string };

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
  if (parsed.data.role) {
    const denied = await requireStepUp(c);
    if (denied) return denied;
  }
  // Prevent demoting the last admin
  if (parsed.data.role === "user") {
    const [adminCount] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(users)
      .where(eq(users.role, "admin"));
    if ((adminCount?.n ?? 0) <= 1 && id) {
      const target = await db.query.users.findFirst({ where: eq(users.id, id) });
      if (target?.role === "admin") {
        return c.json({ error: "last_admin" }, 400);
      }
    }
  }
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
  const slug = c.req.param("slug") ?? "";
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
  titleEn: z.string().max(128).optional(),
  sortOrder: z.number().int().optional(),
  baseXp: z.number().int().optional(),
  difficulty: z.number().int().min(1).max(5).optional(),
  isFree: z.boolean().optional(),
  isExam: z.boolean().optional(),
  passThreshold: z.number().min(0).max(1).nullable().optional(),
  exercises: z.array(z.record(z.unknown())).optional(),
});

const courseCreateSchema = z.object({
  slug: z.string().regex(courseSlugPattern),
  titleUk: z.string().min(1).max(128),
  titleEn: z.string().min(1).max(128),
  descriptionUk: z.string().min(1).max(2000),
  descriptionEn: z.string().max(2000).optional(),
  icon: z.string().min(1).max(16),
  color: z.string().min(1).max(16),
  category: z.enum(["skill", "code", "deep", "chess"]).optional(),
  sortOrder: z.number().int().optional(),
});

const coursePatchSchema = courseCreateSchema.partial().omit({ slug: true }).extend({
  isVisible: z.boolean().optional(),
});

adminRoutes.post("/courses", async (c) => {
  const actor = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = courseCreateSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "invalid_input", details: parsed.error.flatten() }, 400);
  }
  const existing = await db.query.courses.findFirst({
    where: eq(courses.slug, parsed.data.slug),
  });
  if (existing) return c.json({ error: "slug_taken" }, 409);
  const [created] = await db
    .insert(courses)
    .values({
      ...parsed.data,
      descriptionEn: parsed.data.descriptionEn ?? "",
      category: parsed.data.category ?? "skill",
      status: "draft",
      contentSource: "cms",
      sortOrder: parsed.data.sortOrder ?? 100,
    })
    .returning();
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "course_create",
    targetType: "course",
    targetId: created.id,
    meta: { slug: created.slug },
  });
  return c.json({ course: created }, 201);
});

adminRoutes.patch("/courses/:id", async (c) => {
  const actor = c.get("user");
  const id = c.req.param("id");
  const body = await c.req.json().catch(() => null);
  const parsed = coursePatchSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  const [updated] = await db
    .update(courses)
    .set({ ...parsed.data })
    .where(eq(courses.id, id))
    .returning();
  if (!updated) return c.json({ error: "not_found" }, 404);
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "course_patch",
    targetType: "course",
    targetId: id,
    meta: parsed.data,
  });
  return c.json({ course: updated });
});

adminRoutes.post("/courses/:id/publish", async (c) => {
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const actor = c.get("user");
  const id = c.req.param("id");
  const course = await db.query.courses.findFirst({ where: eq(courses.id, id) });
  if (!course) return c.json({ error: "not_found" }, 404);
  if (!course.titleEn?.trim()) {
    return c.json({ error: "publish_failed", details: ["titleEn_required"] }, 400);
  }
  const courseUnits = await db.query.units.findMany({ where: eq(units.courseId, id) });
  if (!courseUnits.length) {
    return c.json({ error: "publish_failed", details: ["need_unit"] }, 400);
  }
  const courseLessons = await db.query.lessons.findMany({ where: eq(lessons.courseId, id) });
  if (!courseLessons.length) {
    return c.json({ error: "publish_failed", details: ["need_lesson"] }, 400);
  }
  const errors: string[] = [];
  for (const lesson of courseLessons) {
    if (!lesson.titleEn?.trim()) errors.push(`lesson:${lesson.slug}:titleEn_required`);
    const v = validateExercises(lesson.exercises);
    if (!v.ok) errors.push(...v.errors.map((e) => `lesson:${lesson.slug}:${e}`));
    if (lesson.isExam && lesson.passThreshold != null) {
      if (lesson.passThreshold <= 0 || lesson.passThreshold > 1) {
        errors.push(`lesson:${lesson.slug}:passThreshold`);
      }
    }
  }
  if (errors.length) return c.json({ error: "publish_failed", details: errors }, 400);
  const [updated] = await db
    .update(courses)
    .set({ status: "published", publishedAt: new Date(), isVisible: true })
    .where(eq(courses.id, id))
    .returning();
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "course_publish",
    targetType: "course",
    targetId: id,
    meta: { stepUp: true, slug: course.slug },
  });
  return c.json({ course: updated });
});

adminRoutes.post("/courses/:id/archive", async (c) => {
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const actor = c.get("user");
  const id = c.req.param("id");
  const [updated] = await db
    .update(courses)
    .set({ status: "archived", isVisible: false })
    .where(eq(courses.id, id))
    .returning();
  if (!updated) return c.json({ error: "not_found" }, 404);
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "course_archive",
    targetType: "course",
    targetId: id,
    meta: { stepUp: true },
  });
  return c.json({ course: updated });
});

adminRoutes.delete("/courses/:id", async (c) => {
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const actor = c.get("user");
  const id = c.req.param("id");
  const course = await db.query.courses.findFirst({ where: eq(courses.id, id) });
  if (!course) return c.json({ error: "not_found" }, 404);
  if (course.status === "published") {
    return c.json({ error: "archive_first" }, 400);
  }
  const [progressN] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(userCourseProgress)
    .where(eq(userCourseProgress.courseId, id));
  if ((progressN?.n ?? 0) > 0 && course.status !== "draft") {
    return c.json({ error: "has_progress_archive_instead" }, 400);
  }
  await db.delete(courses).where(eq(courses.id, id));
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "course_delete",
    targetType: "course",
    targetId: id,
    meta: { stepUp: true, slug: course.slug },
  });
  return c.json({ ok: true });
});

adminRoutes.post("/lessons", async (c) => {
  const actor = c.get("user");
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
      titleEn: parsed.data.titleEn ?? "",
      sortOrder: parsed.data.sortOrder ?? 0,
      baseXp: parsed.data.baseXp ?? 15,
      difficulty: parsed.data.difficulty ?? 1,
      isFree: parsed.data.isFree ?? false,
      isExam: parsed.data.isExam ?? false,
      passThreshold: parsed.data.passThreshold ?? null,
      exercises: parsed.data.exercises ?? [],
    })
    .returning();
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "lesson_create",
    targetType: "lesson",
    targetId: created.id,
    meta: { slug: created.slug, unitId: created.unitId },
  });
  return c.json({ lesson: created }, 201);
});

adminRoutes.patch("/lessons/:id", async (c) => {
  const actor = c.get("user");
  const id = c.req.param("id") as string;
  const body = await c.req.json().catch(() => null);
  const parsed = lessonUpsertSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  if (parsed.data.exercises) {
    const v = validateExercises(parsed.data.exercises);
    // Soft warn only for draft saves — still save but surface validation
    if (!v.ok && body?.strict === true) {
      return c.json({ error: "invalid_exercises", details: v.errors }, 400);
    }
  }
  const [updated] = await db
    .update(lessons)
    .set({
      titleUk: parsed.data.titleUk,
      ...(parsed.data.titleEn !== undefined ? { titleEn: parsed.data.titleEn } : {}),
      ...(parsed.data.slug ? { slug: parsed.data.slug } : {}),
      ...(parsed.data.sortOrder !== undefined ? { sortOrder: parsed.data.sortOrder } : {}),
      ...(parsed.data.baseXp !== undefined ? { baseXp: parsed.data.baseXp } : {}),
      ...(parsed.data.difficulty !== undefined ? { difficulty: parsed.data.difficulty } : {}),
      ...(parsed.data.isFree !== undefined ? { isFree: parsed.data.isFree } : {}),
      ...(parsed.data.isExam !== undefined ? { isExam: parsed.data.isExam } : {}),
      ...(parsed.data.passThreshold !== undefined
        ? { passThreshold: parsed.data.passThreshold }
        : {}),
      ...(parsed.data.exercises !== undefined ? { exercises: parsed.data.exercises } : {}),
    })
    .where(eq(lessons.id, id))
    .returning();
  if (!updated) return c.json({ error: "not_found" }, 404);
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "lesson_patch",
    targetType: "lesson",
    targetId: id,
    meta: { titleUk: parsed.data.titleUk },
  });
  return c.json({ lesson: updated });
});

adminRoutes.post("/lessons/reorder", async (c) => {
  const actor = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = z
    .object({
      items: z.array(z.object({ id: z.string().uuid(), sortOrder: z.number().int() })).min(1),
    })
    .safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  for (const item of parsed.data.items) {
    await db
      .update(lessons)
      .set({ sortOrder: item.sortOrder })
      .where(eq(lessons.id, item.id));
  }
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "lessons_reorder",
    targetType: "lesson",
    targetId: "",
    meta: { count: parsed.data.items.length },
  });
  return c.json({ ok: true });
});

adminRoutes.delete("/lessons/:id", async (c) => {
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const actor = c.get("user");
  const id = c.req.param("id") as string;
  const [deleted] = await db.delete(lessons).where(eq(lessons.id, id)).returning();
  if (!deleted) return c.json({ error: "not_found" }, 404);
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "lesson_delete",
    targetType: "lesson",
    targetId: id,
    meta: { stepUp: true },
  });
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
  titleEn: z.string().max(128).optional(),
  sortOrder: z.number().int().optional(),
});

adminRoutes.post("/units", async (c) => {
  const actor = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = unitSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  const [created] = await db
    .insert(units)
    .values({
      courseId: parsed.data.courseId,
      slug: parsed.data.slug,
      titleUk: parsed.data.titleUk,
      titleEn: parsed.data.titleEn ?? "",
      sortOrder: parsed.data.sortOrder ?? 0,
    })
    .returning();
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "unit_create",
    targetType: "unit",
    targetId: created.id,
    meta: { slug: created.slug, courseId: created.courseId },
  });
  return c.json({ unit: created }, 201);
});

adminRoutes.patch("/units/:id", async (c) => {
  const actor = c.get("user");
  const id = c.req.param("id") as string;
  const body = await c.req.json().catch(() => null);
  const parsed = z
    .object({
      titleUk: z.string().min(1).max(128).optional(),
      titleEn: z.string().max(128).optional(),
      slug: z.string().min(1).max(64).optional(),
      sortOrder: z.number().int().optional(),
    })
    .safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  const [updated] = await db
    .update(units)
    .set({ ...parsed.data })
    .where(eq(units.id, id))
    .returning();
  if (!updated) return c.json({ error: "not_found" }, 404);
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "unit_patch",
    targetType: "unit",
    targetId: id,
    meta: parsed.data,
  });
  return c.json({ unit: updated });
});

adminRoutes.delete("/units/:id", async (c) => {
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const actor = c.get("user");
  const id = c.req.param("id") as string;
  const unit = await db.query.units.findFirst({ where: eq(units.id, id) });
  if (!unit) return c.json({ error: "not_found" }, 404);
  const course = await db.query.courses.findFirst({ where: eq(courses.id, unit.courseId) });
  if (course?.status === "published") {
    // still allow with step-up; cascade deletes lessons
  }
  const [deleted] = await db.delete(units).where(eq(units.id, id)).returning();
  if (!deleted) return c.json({ error: "not_found" }, 404);
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "unit_delete",
    targetType: "unit",
    targetId: id,
    meta: { stepUp: true, slug: deleted.slug },
  });
  return c.json({ ok: true });
});

adminRoutes.post("/units/reorder", async (c) => {
  const actor = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = z
    .object({
      items: z.array(z.object({ id: z.string().uuid(), sortOrder: z.number().int() })).min(1),
    })
    .safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  for (const item of parsed.data.items) {
    await db.update(units).set({ sortOrder: item.sortOrder }).where(eq(units.id, item.id));
  }
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "units_reorder",
    targetType: "unit",
    targetId: "",
    meta: { count: parsed.data.items.length },
  });
  return c.json({ ok: true });
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
  const actor = c.get("user");
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const result = await runParentDigestBatch();
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "ops_parent_digests",
    targetType: "ops",
    targetId: "",
    meta: { stepUp: true, ...result },
  });
  return c.json({ ok: true, ...result });
});

adminRoutes.post("/ops/homework-reminders", async (c) => {
  const actor = c.get("user");
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const result = await runHomeworkReminders();
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "ops_homework_reminders",
    targetType: "ops",
    targetId: "",
    meta: { stepUp: true, ...result },
  });
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
  const actor = c.get("user");
  const denied = await requireStepUp(c);
  if (denied) return denied;
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
  const result = { sent, skipped, total: all.length };
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "ops_weekly_learners",
    targetType: "ops",
    targetId: "",
    meta: { stepUp: true, ...result },
  });
  return c.json({ ok: true, ...result });
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
        "embedded_cpp",
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

/* ——— Appearance / branding ——— */

async function getSetting(key: string) {
  return db.query.platformSettings.findFirst({
    where: eq(platformSettings.key, key),
  });
}

adminRoutes.get("/appearance", async (c) => {
  const published = await getSetting("theme_published");
  const draft = await getSetting("theme_draft");
  const history = await getSetting("theme_history");
  return c.json({
    published: (published?.value as PlatformTheme | undefined) ?? DEFAULT_PLATFORM_THEME,
    draft: (draft?.value as PlatformTheme | undefined) ?? null,
    history: (history?.value as PlatformTheme[] | undefined) ?? [],
  });
});

adminRoutes.put("/appearance/draft", async (c) => {
  const actor = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = platformThemeSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "invalid_input", details: parsed.error.flatten() }, 400);
  }
  if (parsed.data.branding.logoUrl && parsed.data.branding.logoUrl.length > 200_000) {
    return c.json({ error: "logo_too_large" }, 400);
  }
  const existing = await getSetting("theme_draft");
  if (existing) {
    await db
      .update(platformSettings)
      .set({
        value: parsed.data as unknown as Record<string, unknown>,
        updatedAt: new Date(),
        updatedByUserId: actor.id,
      })
      .where(eq(platformSettings.id, existing.id));
  } else {
    await db.insert(platformSettings).values({
      key: "theme_draft",
      value: parsed.data as unknown as Record<string, unknown>,
      updatedByUserId: actor.id,
    });
  }
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "appearance_draft",
    targetType: "platform_settings",
    targetId: "theme_draft",
    meta: { productName: parsed.data.branding.productName },
  });
  return c.json({ ok: true, draft: parsed.data });
});

adminRoutes.post("/appearance/publish", async (c) => {
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const actor = c.get("user");
  const draftRow = await getSetting("theme_draft");
  const publishedRow = await getSetting("theme_published");
  const theme = (draftRow?.value as PlatformTheme | undefined) ?? DEFAULT_PLATFORM_THEME;
  const parsed = platformThemeSchema.safeParse(theme);
  if (!parsed.success) return c.json({ error: "invalid_draft" }, 400);

  // History: keep last 3 published
  const histRow = await getSetting("theme_history");
  const prev = (histRow?.value as PlatformTheme[] | undefined) ?? [];
  const nextHist = [
    (publishedRow?.value as PlatformTheme | undefined) ?? DEFAULT_PLATFORM_THEME,
    ...prev,
  ].slice(0, 3);

  if (publishedRow) {
    await db
      .update(platformSettings)
      .set({
        value: parsed.data as unknown as Record<string, unknown>,
        updatedAt: new Date(),
        updatedByUserId: actor.id,
      })
      .where(eq(platformSettings.id, publishedRow.id));
  } else {
    await db.insert(platformSettings).values({
      key: "theme_published",
      value: parsed.data as unknown as Record<string, unknown>,
      updatedByUserId: actor.id,
    });
  }
  if (histRow) {
    await db
      .update(platformSettings)
      .set({ value: nextHist as unknown as Record<string, unknown>, updatedAt: new Date() })
      .where(eq(platformSettings.id, histRow.id));
  } else {
    await db.insert(platformSettings).values({
      key: "theme_history",
      value: nextHist as unknown as Record<string, unknown>,
    });
  }
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "appearance_publish",
    targetType: "platform_settings",
    targetId: "theme_published",
    meta: { stepUp: true, productName: parsed.data.branding.productName },
  });
  return c.json({ ok: true, published: parsed.data });
});

adminRoutes.post("/appearance/revert", async (c) => {
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const actor = c.get("user");
  const histRow = await getSetting("theme_history");
  const hist = (histRow?.value as PlatformTheme[] | undefined) ?? [];
  if (!hist.length) return c.json({ error: "no_history" }, 400);
  const [prev, ...rest] = hist;
  const publishedRow = await getSetting("theme_published");
  if (publishedRow) {
    await db
      .update(platformSettings)
      .set({
        value: prev as unknown as Record<string, unknown>,
        updatedAt: new Date(),
        updatedByUserId: actor.id,
      })
      .where(eq(platformSettings.id, publishedRow.id));
  }
  if (histRow) {
    await db
      .update(platformSettings)
      .set({ value: rest as unknown as Record<string, unknown>, updatedAt: new Date() })
      .where(eq(platformSettings.id, histRow.id));
  }
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "appearance_revert",
    targetType: "platform_settings",
    targetId: "theme_published",
    meta: { stepUp: true },
  });
  return c.json({ ok: true, published: prev });
});

/* ——— Domain overview modules (read-only) ——— */

adminRoutes.get("/overview/billing", async (c) => {
  const [premium] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(users)
    .where(eq(users.plan, "premium"));
  const [total] = await db.select({ n: sql<number>`count(*)::int` }).from(users);
  const [expiring] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(users)
    .where(
      and(
        eq(users.plan, "premium"),
        gte(users.planExpiresAt, new Date()),
        sql`${users.planExpiresAt} < now() + interval '7 days'`,
      ),
    );
  return c.json({
    premium: premium?.n ?? 0,
    users: total?.n ?? 0,
    expiringTrial7d: expiring?.n ?? 0,
    stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
  });
});

adminRoutes.get("/overview/classroom", async (c) => {
  const [orgN] = await db.select({ n: sql<number>`count(*)::int` }).from(organizations);
  const [classN] = await db.select({ n: sql<number>`count(*)::int` }).from(classes);
  const [hwN] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(assignmentSubmissions);
  return c.json({
    organizations: orgN?.n ?? 0,
    classes: classN?.n ?? 0,
    assignmentSubmissions: hwN?.n ?? 0,
  });
});

adminRoutes.get("/overview/parents", async (c) => {
  const since7 = new Date(Date.now() - 7 * 86400000);
  const [activeLinks] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(parentStudentLinks)
    .where(
      and(
        eq(parentStudentLinks.status, "active"),
        ne(parentStudentLinks.parentUserId, parentStudentLinks.studentUserId),
      ),
    );
  const [pendingLinks] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(parentStudentLinks)
    .where(eq(parentStudentLinks.status, "pending"));
  const [digests7] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(activityEvents)
    .where(
      and(
        eq(activityEvents.kind, "parent_digest_sent"),
        gte(activityEvents.createdAt, since7),
      ),
    );
  return c.json({
    activeLinks: activeLinks?.n ?? 0,
    pendingLinks: pendingLinks?.n ?? 0,
    digestsLast7d: digests7?.n ?? 0,
  });
});

adminRoutes.get("/overview/engagement", async (c) => {
  const { ACHIEVEMENT_CATALOG, SHOP_CATALOG, DAILY_QUEST_DEFS } = await import(
    "@eduforge/shared"
  );
  return c.json({
    achievements: ACHIEVEMENT_CATALOG.length,
    shopItems: SHOP_CATALOG.length,
    dailyQuests: DAILY_QUEST_DEFS.length,
  });
});

adminRoutes.get("/overview/programming", async (c) => {
  const {
    PLAYGROUND_CHALLENGES,
    PROGRAMMING_MINI_LESSON_SLUGS,
    weeklyMinisRaceSlugs,
  } = await import("@eduforge/shared");
  return c.json({
    playgroundChallenges: PLAYGROUND_CHALLENGES.length,
    minis: PROGRAMMING_MINI_LESSON_SLUGS.length,
    raceThisWeek: weeklyMinisRaceSlugs(),
  });
});

adminRoutes.get("/security/status", async (c) => {
  const user = c.get("user");
  const { adminMfaEnforce, getSessionMfaVerified } = await import("../mfa.js");
  const mfaVerified = await getSessionMfaVerified(c.get("sessionToken"));
  return c.json({
    totpEnabled: user.totpEnabled,
    mfaVerified,
    mfaEnforced: adminMfaEnforce(),
  });
});

adminRoutes.post("/users/:id/reset-mfa", async (c) => {
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const actor = c.get("user");
  const id = c.req.param("id");
  const [updated] = await db
    .update(users)
    .set({
      totpEnabled: false,
      totpSecretEnc: null,
      totpVerifiedAt: null,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning();
  if (!updated) return c.json({ error: "not_found" }, 404);
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "reset_mfa",
    targetType: "user",
    targetId: id,
    meta: { stepUp: true },
  });
  return c.json({ ok: true });
});
