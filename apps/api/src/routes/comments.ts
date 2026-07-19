import { Hono } from "hono";
import { and, asc, eq } from "drizzle-orm";
import { characters, lessonComments, lessons } from "@eduforge/db";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { rateLimit } from "../rate-limit.js";

type Vars = { user: AuthedUser };

export const commentRoutes = new Hono<{ Variables: Vars }>();

commentRoutes.get("/lesson/:lessonId", authMiddleware, async (c) => {
  const lessonId = c.req.param("lessonId") as string;
  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
  });
  if (!lesson) return c.json({ error: "not_found" }, 404);

  const rows = await db
    .select({
      id: lessonComments.id,
      body: lessonComments.body,
      parentId: lessonComments.parentId,
      createdAt: lessonComments.createdAt,
      userId: lessonComments.userId,
      displayName: characters.displayName,
      avatarKey: characters.avatarKey,
    })
    .from(lessonComments)
    .leftJoin(characters, eq(characters.userId, lessonComments.userId))
    .where(eq(lessonComments.lessonId, lessonId))
    .orderBy(asc(lessonComments.createdAt));

  return c.json({ comments: rows });
});

const postSchema = z.object({
  body: z.string().min(1).max(2000),
  parentId: z.string().uuid().optional().nullable(),
});

commentRoutes.post("/lesson/:lessonId", authMiddleware, async (c) => {
  const user = c.get("user");
  const lessonId = c.req.param("lessonId") as string;
  const rl = await rateLimit({
    key: `comment:${user.id}`,
    limit: 20,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return c.json({ error: "rate_limited", retryAfter: rl.retryAfterSec }, 429);
  }

  const lesson = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
  });
  if (!lesson) return c.json({ error: "not_found" }, 404);

  const body = await c.req.json().catch(() => null);
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  if (parsed.data.parentId) {
    const parent = await db.query.lessonComments.findFirst({
      where: and(
        eq(lessonComments.id, parsed.data.parentId),
        eq(lessonComments.lessonId, lessonId),
      ),
    });
    if (!parent) return c.json({ error: "parent_not_found" }, 404);
  }

  const [created] = await db
    .insert(lessonComments)
    .values({
      lessonId,
      userId: user.id,
      body: parsed.data.body.trim(),
      parentId: parsed.data.parentId ?? null,
    })
    .returning();

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });

  return c.json(
    {
      comment: {
        ...created,
        displayName: ch?.displayName ?? "—",
        avatarKey: ch?.avatarKey ?? "default",
      },
    },
    201,
  );
});

commentRoutes.delete("/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const row = await db.query.lessonComments.findFirst({
    where: eq(lessonComments.id, id),
  });
  if (!row) return c.json({ error: "not_found" }, 404);
  if (row.userId !== user.id && user.role !== "admin") {
    return c.json({ error: "forbidden" }, 403);
  }
  await db.delete(lessonComments).where(eq(lessonComments.id, id));
  return c.json({ ok: true });
});
