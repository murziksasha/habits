import { Hono } from "hono";
import { and, asc, desc, eq } from "drizzle-orm";
import {
  assignmentSubmissions,
  characters,
  classAssignments,
  classMembers,
  classes,
  courses,
  lessons,
  organizationMembers,
  units,
} from "@eduforge/db";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";

type Vars = { user: AuthedUser };

export const homeworkRoutes = new Hono<{ Variables: Vars }>();

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

async function isClassStudent(userId: string, classId: string) {
  const m = await db.query.classMembers.findFirst({
    where: and(eq(classMembers.classId, classId), eq(classMembers.userId, userId)),
  });
  return Boolean(m);
}

const createSchema = z.object({
  classId: z.string().uuid(),
  titleUk: z.string().min(1).max(200),
  titleEn: z.string().max(200).optional(),
  courseId: z.string().uuid(),
  lessonId: z.string().uuid(),
  dueAt: z.string().datetime().optional().nullable(),
});

/** Teacher: create assignment + fan-out submissions to class members */
homeworkRoutes.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  if (!(await canTeachClass(user, parsed.data.classId))) {
    return c.json({ error: "forbidden" }, 403);
  }

  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, parsed.data.lessonId),
  });
  if (!lesson || lesson.courseId !== parsed.data.courseId) {
    return c.json({ error: "invalid_lesson" }, 400);
  }

  const [assignment] = await db
    .insert(classAssignments)
    .values({
      classId: parsed.data.classId,
      createdByUserId: user.id,
      titleUk: parsed.data.titleUk,
      titleEn: parsed.data.titleEn ?? parsed.data.titleUk,
      courseId: parsed.data.courseId,
      lessonId: parsed.data.lessonId,
      dueAt: parsed.data.dueAt ? new Date(parsed.data.dueAt) : null,
    })
    .returning();

  const members = await db.query.classMembers.findMany({
    where: eq(classMembers.classId, parsed.data.classId),
  });

  if (members.length) {
    await db.insert(assignmentSubmissions).values(
      members.map((m) => ({
        assignmentId: assignment.id,
        userId: m.userId,
        status: "assigned" as const,
      })),
    );

    const course = await db.query.courses.findFirst({
      where: eq(courses.id, parsed.data.courseId),
    });
    const href = `/courses/${course?.slug ?? "english"}/lessons/${parsed.data.lessonId}`;

    for (const m of members) {
      await notifyUser(db, m.userId, {
        type: "homework",
        titleUk: "Нове домашнє завдання",
        titleEn: "New homework",
        bodyUk: parsed.data.titleUk,
        bodyEn: parsed.data.titleEn ?? parsed.data.titleUk,
        href: `/homework`,
      });
      void href;
    }
  }

  await logActivity(db, user.id, "homework_created", {
    assignmentId: assignment.id,
    classId: parsed.data.classId,
  });

  return c.json({ assignment }, 201);
});

/** Teacher: lessons grouped by unit for a course (programming homework picker) */
homeworkRoutes.get("/catalog", authMiddleware, async (c) => {
  const user = c.get("user");
  const slug = (c.req.query("course") ?? "programming") as string;
  const course = await db.query.courses.findFirst({ where: eq(courses.slug, slug as never) });
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
    course: {
      id: course.id,
      slug: course.slug,
      titleUk: course.titleUk,
      titleEn: course.titleEn,
    },
    units: courseUnits.map((u) => ({
      id: u.id,
      slug: u.slug,
      titleUk: u.titleUk,
      titleEn: u.titleEn,
      lessons: courseLessons
        .filter((l) => l.unitId === u.id)
        .map((l) => ({
          id: l.id,
          slug: l.slug,
          titleUk: l.titleUk,
          titleEn: l.titleEn,
          isFree: l.isFree,
          difficulty: l.difficulty,
        })),
    })),
    // silence unused
    _viewer: user.id,
  });
});

const bulkSchema = z.object({
  classId: z.string().uuid(),
  courseId: z.string().uuid(),
  lessonIds: z.array(z.string().uuid()).min(1).max(20),
  titlePrefix: z.string().max(100).optional(),
  dueAt: z.string().datetime().optional().nullable(),
});

/** Assign multiple lessons (e.g. whole programming unit) */
homeworkRoutes.post("/bulk", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = bulkSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  if (!(await canTeachClass(user, parsed.data.classId))) {
    return c.json({ error: "forbidden" }, 403);
  }

  const created = [];
  for (const lessonId of parsed.data.lessonIds) {
    const lesson = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonId),
    });
    if (!lesson || lesson.courseId !== parsed.data.courseId) continue;

    const titleUk =
      (parsed.data.titlePrefix ? `${parsed.data.titlePrefix}: ` : "HW: ") + lesson.titleUk;
    const [assignment] = await db
      .insert(classAssignments)
      .values({
        classId: parsed.data.classId,
        createdByUserId: user.id,
        titleUk,
        titleEn: titleUk,
        courseId: parsed.data.courseId,
        lessonId,
        dueAt: parsed.data.dueAt ? new Date(parsed.data.dueAt) : null,
      })
      .returning();

    const members = await db.query.classMembers.findMany({
      where: eq(classMembers.classId, parsed.data.classId),
    });
    if (members.length) {
      await db.insert(assignmentSubmissions).values(
        members.map((m) => ({
          assignmentId: assignment.id,
          userId: m.userId,
          status: "assigned" as const,
        })),
      );
      for (const m of members) {
        await notifyUser(db, m.userId, {
          type: "homework",
          titleUk: "Нове домашнє завдання",
          titleEn: "New homework",
          bodyUk: titleUk,
          bodyEn: titleUk,
          href: "/homework",
        });
      }
    }
    created.push(assignment);
  }

  await logActivity(db, user.id, "homework_bulk", {
    classId: parsed.data.classId,
    count: created.length,
  });

  return c.json({ assignments: created, count: created.length }, 201);
});

/** Student: my open/completed homework */
homeworkRoutes.get("/mine", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db
    .select({
      submissionId: assignmentSubmissions.id,
      status: assignmentSubmissions.status,
      score: assignmentSubmissions.score,
      completedAt: assignmentSubmissions.completedAt,
      assignmentId: classAssignments.id,
      titleUk: classAssignments.titleUk,
      titleEn: classAssignments.titleEn,
      dueAt: classAssignments.dueAt,
      lessonId: classAssignments.lessonId,
      courseId: classAssignments.courseId,
      courseSlug: courses.slug,
      lessonTitleUk: lessons.titleUk,
      className: classes.name,
      classId: classes.id,
    })
    .from(assignmentSubmissions)
    .innerJoin(
      classAssignments,
      eq(classAssignments.id, assignmentSubmissions.assignmentId),
    )
    .innerJoin(courses, eq(courses.id, classAssignments.courseId))
    .innerJoin(lessons, eq(lessons.id, classAssignments.lessonId))
    .innerJoin(classes, eq(classes.id, classAssignments.classId))
    .where(eq(assignmentSubmissions.userId, user.id))
    .orderBy(desc(classAssignments.createdAt));

  const now = Date.now();
  const items = rows.map((r) => {
    let status = r.status;
    if (
      status === "assigned" &&
      r.dueAt &&
      r.dueAt.getTime() < now
    ) {
      status = "overdue";
    }
    return { ...r, status };
  });

  return c.json({ homework: items });
});

/** Teacher: list assignments for a class with completion stats */
homeworkRoutes.get("/class/:classId", authMiddleware, async (c) => {
  const user = c.get("user");
  const classId = c.req.param("classId") as string;
  if (!(await canTeachClass(user, classId)) && !(await isClassStudent(user.id, classId))) {
    return c.json({ error: "forbidden" }, 403);
  }

  const assignments = await db.query.classAssignments.findMany({
    where: eq(classAssignments.classId, classId),
    orderBy: [desc(classAssignments.createdAt)],
  });

  const result = [];
  for (const a of assignments) {
    const subs = await db
      .select({
        userId: assignmentSubmissions.userId,
        status: assignmentSubmissions.status,
        score: assignmentSubmissions.score,
        completedAt: assignmentSubmissions.completedAt,
        displayName: characters.displayName,
      })
      .from(assignmentSubmissions)
      .leftJoin(characters, eq(characters.userId, assignmentSubmissions.userId))
      .where(eq(assignmentSubmissions.assignmentId, a.id));

    const course = await db.query.courses.findFirst({
      where: eq(courses.id, a.courseId),
    });
    const lesson = await db.query.lessons.findFirst({
      where: eq(lessons.id, a.lessonId),
    });

    result.push({
      ...a,
      courseSlug: course?.slug,
      lessonTitleUk: lesson?.titleUk,
      completed: subs.filter((s) => s.status === "completed").length,
      total: subs.length,
      submissions: subs,
    });
  }

  return c.json({ assignments: result });
});

/** Mark submission complete when matching lesson is finished */
export async function completeHomeworkForLesson(
  userId: string,
  lessonId: string,
  score: number,
) {
  const open = await db
    .select({
      submissionId: assignmentSubmissions.id,
      assignmentId: assignmentSubmissions.assignmentId,
    })
    .from(assignmentSubmissions)
    .innerJoin(
      classAssignments,
      eq(classAssignments.id, assignmentSubmissions.assignmentId),
    )
    .where(
      and(
        eq(assignmentSubmissions.userId, userId),
        eq(classAssignments.lessonId, lessonId),
        eq(assignmentSubmissions.status, "assigned"),
      ),
    );

  for (const row of open) {
    await db
      .update(assignmentSubmissions)
      .set({
        status: "completed",
        score,
        completedAt: new Date(),
      })
      .where(eq(assignmentSubmissions.id, row.submissionId));
  }

  if (open.length) {
    await logActivity(db, userId, "homework_completed", {
      lessonId,
      count: open.length,
    });
  }

  return open.length;
}

homeworkRoutes.delete("/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const a = await db.query.classAssignments.findFirst({
    where: eq(classAssignments.id, id),
  });
  if (!a) return c.json({ error: "not_found" }, 404);
  if (!(await canTeachClass(user, a.classId))) {
    return c.json({ error: "forbidden" }, 403);
  }
  await db.delete(classAssignments).where(eq(classAssignments.id, id));
  return c.json({ ok: true });
});
