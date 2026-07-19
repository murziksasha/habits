import { Hono } from "hono";
import { and, desc, eq } from "drizzle-orm";
import { courses, lessonBookmarks, lessons } from "@eduforge/db";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";

type Vars = { user: AuthedUser };

export const bookmarkRoutes = new Hono<{ Variables: Vars }>();

bookmarkRoutes.get("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db
    .select({
      id: lessonBookmarks.id,
      note: lessonBookmarks.note,
      createdAt: lessonBookmarks.createdAt,
      lessonId: lessons.id,
      lessonTitleUk: lessons.titleUk,
      courseSlug: courses.slug,
      courseTitleUk: courses.titleUk,
    })
    .from(lessonBookmarks)
    .innerJoin(lessons, eq(lessons.id, lessonBookmarks.lessonId))
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .where(eq(lessonBookmarks.userId, user.id))
    .orderBy(desc(lessonBookmarks.createdAt));
  return c.json({ bookmarks: rows });
});

bookmarkRoutes.get("/check/:lessonId", authMiddleware, async (c) => {
  const user = c.get("user");
  const lessonId = c.req.param("lessonId") as string;
  const row = await db.query.lessonBookmarks.findFirst({
    where: and(
      eq(lessonBookmarks.userId, user.id),
      eq(lessonBookmarks.lessonId, lessonId),
    ),
  });
  return c.json({ bookmarked: Boolean(row), note: row?.note ?? "" });
});

const upsertSchema = z.object({
  lessonId: z.string().uuid(),
  note: z.string().max(2000).optional(),
});

bookmarkRoutes.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = upsertSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, parsed.data.lessonId),
  });
  if (!lesson) return c.json({ error: "not_found" }, 404);

  const existing = await db.query.lessonBookmarks.findFirst({
    where: and(
      eq(lessonBookmarks.userId, user.id),
      eq(lessonBookmarks.lessonId, parsed.data.lessonId),
    ),
  });

  if (existing) {
    const [updated] = await db
      .update(lessonBookmarks)
      .set({ note: parsed.data.note ?? existing.note })
      .where(eq(lessonBookmarks.id, existing.id))
      .returning();
    return c.json({ bookmark: updated });
  }

  const [created] = await db
    .insert(lessonBookmarks)
    .values({
      userId: user.id,
      lessonId: parsed.data.lessonId,
      note: parsed.data.note ?? "",
    })
    .returning();
  return c.json({ bookmark: created }, 201);
});

bookmarkRoutes.delete("/:lessonId", authMiddleware, async (c) => {
  const user = c.get("user");
  const lessonId = c.req.param("lessonId") as string;
  await db
    .delete(lessonBookmarks)
    .where(
      and(eq(lessonBookmarks.userId, user.id), eq(lessonBookmarks.lessonId, lessonId)),
    );
  return c.json({ ok: true });
});
