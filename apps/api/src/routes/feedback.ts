import { Hono } from "hono";
import { desc, eq } from "drizzle-orm";
import { characters, feedbackMessages, users } from "@eduforge/db";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";
import { rateLimit } from "../rate-limit.js";

type Vars = { user: AuthedUser };

export const feedbackRoutes = new Hono<{ Variables: Vars }>();

const CATEGORIES = ["bug", "idea", "content", "other"] as const;
const STATUSES = ["new", "triaged", "done", "wontfix"] as const;

const createSchema = z.object({
  category: z.enum(CATEGORIES).default("other"),
  message: z.string().min(5).max(4000),
  pagePath: z.string().max(512).optional(),
});

const patchSchema = z.object({
  status: z.enum(STATUSES).optional(),
  adminNote: z.string().max(2000).optional().nullable(),
});

feedbackRoutes.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const limited = await rateLimit({
    key: `feedback:${user.id}`,
    limit: 10,
    windowMs: 60_000,
  });
  if (!limited.ok) return c.json({ error: "rate_limited" }, 429);

  const body = await c.req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const [row] = await db
    .insert(feedbackMessages)
    .values({
      userId: user.id,
      category: parsed.data.category,
      message: parsed.data.message.trim(),
      pagePath: (parsed.data.pagePath ?? "").slice(0, 512),
      status: "new",
    })
    .returning();

  await logActivity(db, user.id, "feedback_sent", {
    feedbackId: row.id,
    category: row.category,
  });

  // Notify admins (best-effort)
  const admins = await db.query.users.findMany({
    where: eq(users.role, "admin"),
    limit: 10,
  });
  for (const a of admins) {
    if (a.id === user.id) continue;
    await notifyUser(db, a.id, {
      type: "feedback",
      titleUk: "Новий відгук",
      titleEn: "New feedback",
      bodyUk: parsed.data.message.slice(0, 120),
      bodyEn: parsed.data.message.slice(0, 120),
      href: "/admin/feedback",
    }).catch(() => undefined);
  }

  return c.json({ feedback: row }, 201);
});

feedbackRoutes.get("/mine", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.feedbackMessages.findMany({
    where: eq(feedbackMessages.userId, user.id),
    orderBy: [desc(feedbackMessages.createdAt)],
    limit: 50,
  });
  return c.json({ feedback: rows });
});

feedbackRoutes.get("/admin", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.role !== "admin") return c.json({ error: "forbidden" }, 403);

  const status = c.req.query("status");
  const base = db
    .select({
      id: feedbackMessages.id,
      userId: feedbackMessages.userId,
      category: feedbackMessages.category,
      message: feedbackMessages.message,
      pagePath: feedbackMessages.pagePath,
      status: feedbackMessages.status,
      adminNote: feedbackMessages.adminNote,
      createdAt: feedbackMessages.createdAt,
      updatedAt: feedbackMessages.updatedAt,
      email: users.email,
      displayName: characters.displayName,
    })
    .from(feedbackMessages)
    .innerJoin(users, eq(users.id, feedbackMessages.userId))
    .leftJoin(characters, eq(characters.userId, feedbackMessages.userId));

  const rows =
    status && STATUSES.includes(status as (typeof STATUSES)[number])
      ? await base
          .where(eq(feedbackMessages.status, status))
          .orderBy(desc(feedbackMessages.createdAt))
          .limit(100)
      : await base.orderBy(desc(feedbackMessages.createdAt)).limit(100);

  return c.json({ feedback: rows });
});

feedbackRoutes.patch("/admin/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.role !== "admin") return c.json({ error: "forbidden" }, 403);

  const id = c.req.param("id") as string;
  const body = await c.req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const existing = await db.query.feedbackMessages.findFirst({
    where: eq(feedbackMessages.id, id),
  });
  if (!existing) return c.json({ error: "not_found" }, 404);

  const [updated] = await db
    .update(feedbackMessages)
    .set({
      status: parsed.data.status ?? existing.status,
      adminNote:
        parsed.data.adminNote === undefined
          ? existing.adminNote
          : parsed.data.adminNote,
      updatedAt: new Date(),
    })
    .where(eq(feedbackMessages.id, id))
    .returning();

  return c.json({ feedback: updated });
});
