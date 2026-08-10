import { Hono } from "hono";
import { and, desc, eq, inArray } from "drizzle-orm";
import {
  characters,
  classMembers,
  classes,
  organizationMembers,
  organizations,
  userCourseProgress,
  courses,
} from "@eduforge/db";
import { z } from "zod";
import { randomBytes } from "node:crypto";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { evaluateAchievements, logActivity } from "../engagement.js";

type Vars = { user: AuthedUser };

export const orgRoutes = new Hono<{ Variables: Vars }>();

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "org"
  );
}

/** 16 hex chars — higher entropy than legacy 8-char codes */
function inviteCode() {
  return randomBytes(8).toString("hex").toUpperCase();
}

orgRoutes.get("/mine", authMiddleware, async (c) => {
  const user = c.get("user");
  const memberships = await db
    .select({
      organizationId: organizationMembers.organizationId,
      role: organizationMembers.role,
      name: organizations.name,
      slug: organizations.slug,
    })
    .from(organizationMembers)
    .innerJoin(organizations, eq(organizations.id, organizationMembers.organizationId))
    .where(eq(organizationMembers.userId, user.id));
  return c.json({ organizations: memberships });
});

const createOrgSchema = z.object({
  name: z.string().min(2).max(128),
});

orgRoutes.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = createOrgSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const slug = `${slugify(parsed.data.name)}-${Date.now().toString(36)}`;
  const [org] = await db
    .insert(organizations)
    .values({
      name: parsed.data.name,
      slug,
      ownerUserId: user.id,
    })
    .returning();

  await db.insert(organizationMembers).values({
    organizationId: org.id,
    userId: user.id,
    role: "owner",
  });

  // Optionally elevate platform role for teachers
  if (user.role === "user") {
    // keep platform role as user; org role is separate
  }

  return c.json({ organization: org }, 201);
});

orgRoutes.get("/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const org =
    (await db.query.organizations.findFirst({ where: eq(organizations.id, id) })) ??
    (await db.query.organizations.findFirst({ where: eq(organizations.slug, id) }));
  if (!org) return c.json({ error: "not_found" }, 404);

  const membership = await db.query.organizationMembers.findFirst({
    where: and(
      eq(organizationMembers.organizationId, org.id),
      eq(organizationMembers.userId, user.id),
    ),
  });
  if (!membership && user.role !== "admin") {
    return c.json({ error: "forbidden" }, 403);
  }

  const members = await db
    .select({
      userId: organizationMembers.userId,
      role: organizationMembers.role,
      displayName: characters.displayName,
    })
    .from(organizationMembers)
    .leftJoin(characters, eq(characters.userId, organizationMembers.userId))
    .where(eq(organizationMembers.organizationId, org.id));

  const classList = await db.query.classes.findMany({
    where: eq(classes.organizationId, org.id),
    orderBy: [desc(classes.createdAt)],
  });

  return c.json({
    organization: org,
    membership,
    members,
    classes: classList,
  });
});

const createClassSchema = z.object({
  name: z.string().min(1).max(128),
});

orgRoutes.post("/:id/classes", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const org = await db.query.organizations.findFirst({ where: eq(organizations.id, id) });
  if (!org) return c.json({ error: "not_found" }, 404);

  const membership = await db.query.organizationMembers.findFirst({
    where: and(
      eq(organizationMembers.organizationId, org.id),
      eq(organizationMembers.userId, user.id),
    ),
  });
  if (
    !membership ||
    (membership.role !== "owner" && membership.role !== "teacher" && user.role !== "admin")
  ) {
    return c.json({ error: "forbidden" }, 403);
  }

  const body = await c.req.json().catch(() => null);
  const parsed = createClassSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const [cls] = await db
    .insert(classes)
    .values({
      organizationId: org.id,
      name: parsed.data.name,
      inviteCode: inviteCode(),
      teacherUserId: user.id,
    })
    .returning();

  return c.json({ class: cls }, 201);
});

orgRoutes.post("/classes/join", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => ({}));
  const code = String(body.inviteCode ?? "")
    .trim()
    .toUpperCase();
  if (!code) return c.json({ error: "invalid_input" }, 400);

  const cls = await db.query.classes.findFirst({
    where: eq(classes.inviteCode, code),
  });
  if (!cls) return c.json({ error: "not_found" }, 404);

  // Ensure org membership as student
  const orgMem = await db.query.organizationMembers.findFirst({
    where: and(
      eq(organizationMembers.organizationId, cls.organizationId),
      eq(organizationMembers.userId, user.id),
    ),
  });
  if (!orgMem) {
    await db.insert(organizationMembers).values({
      organizationId: cls.organizationId,
      userId: user.id,
      role: "student",
    });
  }

  const existing = await db.query.classMembers.findFirst({
    where: and(eq(classMembers.classId, cls.id), eq(classMembers.userId, user.id)),
  });
  if (!existing) {
    await db.insert(classMembers).values({ classId: cls.id, userId: user.id });
    await logActivity(db, user.id, "class_joined", { classId: cls.id });
    await evaluateAchievements(db, user.id, { joinedClass: true });
  }

  return c.json({ ok: true, class: cls });
});

orgRoutes.get("/classes/:classId", authMiddleware, async (c) => {
  const user = c.get("user");
  const classId = c.req.param("classId") as string;
  const cls = await db.query.classes.findFirst({ where: eq(classes.id, classId) });
  if (!cls) return c.json({ error: "not_found" }, 404);

  const membership = await db.query.organizationMembers.findFirst({
    where: and(
      eq(organizationMembers.organizationId, cls.organizationId),
      eq(organizationMembers.userId, user.id),
    ),
  });
  const inClass = await db.query.classMembers.findFirst({
    where: and(eq(classMembers.classId, cls.id), eq(classMembers.userId, user.id)),
  });
  const canView =
    user.role === "admin" ||
    membership?.role === "owner" ||
    membership?.role === "teacher" ||
    Boolean(inClass);
  if (!canView) return c.json({ error: "forbidden" }, 403);

  const students = await db
    .select({
      userId: classMembers.userId,
      displayName: characters.displayName,
      globalXp: characters.globalXp,
      globalLevel: characters.globalLevel,
    })
    .from(classMembers)
    .leftJoin(characters, eq(characters.userId, classMembers.userId))
    .where(eq(classMembers.classId, cls.id));

  const studentIds = students.map((s) => s.userId);
  let allProgress: {
    userId: string;
    courseSlug: string;
    xp: number;
    level: number;
    completedLessons: number;
  }[] = [];
  if (studentIds.length) {
    allProgress = await db
      .select({
        userId: userCourseProgress.userId,
        courseSlug: courses.slug,
        xp: userCourseProgress.xp,
        level: userCourseProgress.level,
        completedLessons: userCourseProgress.completedLessons,
      })
      .from(userCourseProgress)
      .innerJoin(courses, eq(courses.id, userCourseProgress.courseId))
      .where(inArray(userCourseProgress.userId, studentIds));
  }

  return c.json({ class: cls, students, progress: allProgress });
});

orgRoutes.post("/:id/members", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const body = await c.req.json().catch(() => ({}));
  const targetUserId = String(body.userId ?? "");
  const role = body.role === "teacher" ? "teacher" : "student";

  const org = await db.query.organizations.findFirst({ where: eq(organizations.id, id) });
  if (!org) return c.json({ error: "not_found" }, 404);
  if (org.ownerUserId !== user.id && user.role !== "admin") {
    return c.json({ error: "forbidden" }, 403);
  }
  if (!targetUserId) return c.json({ error: "invalid_input" }, 400);

  const existing = await db.query.organizationMembers.findFirst({
    where: and(
      eq(organizationMembers.organizationId, org.id),
      eq(organizationMembers.userId, targetUserId),
    ),
  });
  if (existing) {
    await db
      .update(organizationMembers)
      .set({ role })
      .where(eq(organizationMembers.id, existing.id));
  } else {
    await db.insert(organizationMembers).values({
      organizationId: org.id,
      userId: targetUserId,
      role,
    });
  }
  return c.json({ ok: true });
});
