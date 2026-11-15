import { Hono } from "hono";
import { and, desc, eq } from "drizzle-orm";
import { courses, lessons, studyNotes } from "@eduforge/db";
import { sanitizeUserText } from "@eduforge/shared";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";

type Vars = { user: AuthedUser };

export const notesRoutes = new Hono<{ Variables: Vars }>();

notesRoutes.get("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db
    .select({
      id: studyNotes.id,
      body: studyNotes.body,
      updatedAt: studyNotes.updatedAt,
      lessonId: lessons.id,
      lessonTitleUk: lessons.titleUk,
      courseSlug: courses.slug,
      courseTitleUk: courses.titleUk,
    })
    .from(studyNotes)
    .innerJoin(lessons, eq(lessons.id, studyNotes.lessonId))
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .where(eq(studyNotes.userId, user.id))
    .orderBy(desc(studyNotes.updatedAt));
  return c.json({ notes: rows });
});

notesRoutes.get("/lesson/:lessonId", authMiddleware, async (c) => {
  const user = c.get("user");
  const lessonId = c.req.param("lessonId") as string;
  const row = await db.query.studyNotes.findFirst({
    where: and(
      eq(studyNotes.userId, user.id),
      eq(studyNotes.lessonId, lessonId),
    ),
  });
  return c.json({ note: row ?? null });
});

const upsertSchema = z.object({
  lessonId: z.string().uuid(),
  body: z.string().max(8000),
});

notesRoutes.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = upsertSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, parsed.data.lessonId),
  });
  if (!lesson) return c.json({ error: "not_found" }, 404);

  const cleanBody = sanitizeUserText(parsed.data.body, 8000);

  const existing = await db.query.studyNotes.findFirst({
    where: and(
      eq(studyNotes.userId, user.id),
      eq(studyNotes.lessonId, parsed.data.lessonId),
    ),
  });

  if (existing) {
    if (!cleanBody) {
      await db.delete(studyNotes).where(eq(studyNotes.id, existing.id));
      return c.json({ note: null, deleted: true });
    }
    const [updated] = await db
      .update(studyNotes)
      .set({ body: cleanBody, updatedAt: new Date() })
      .where(eq(studyNotes.id, existing.id))
      .returning();
    return c.json({ note: updated });
  }

  if (!cleanBody) {
    return c.json({ note: null });
  }

  const [created] = await db
    .insert(studyNotes)
    .values({
      userId: user.id,
      lessonId: parsed.data.lessonId,
      body: cleanBody,
    })
    .returning();
  return c.json({ note: created }, 201);
});

notesRoutes.delete("/:lessonId", authMiddleware, async (c) => {
  const user = c.get("user");
  const lessonId = c.req.param("lessonId") as string;
  await db
    .delete(studyNotes)
    .where(
      and(eq(studyNotes.userId, user.id), eq(studyNotes.lessonId, lessonId)),
    );
  return c.json({ ok: true });
});
