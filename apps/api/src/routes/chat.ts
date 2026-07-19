import { Hono } from "hono";
import { and, asc, eq } from "drizzle-orm";
import {
  characters,
  classMembers,
  classMessages,
  classes,
  organizationMembers,
} from "@eduforge/db";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { clientIp, rateLimit } from "../rate-limit.js";

type Vars = { user: AuthedUser };

export const chatRoutes = new Hono<{ Variables: Vars }>();

async function canAccessClass(user: AuthedUser, classId: string) {
  if (user.role === "admin") return true;
  const cls = await db.query.classes.findFirst({ where: eq(classes.id, classId) });
  if (!cls) return false;
  if (cls.teacherUserId === user.id) return true;
  const member = await db.query.classMembers.findFirst({
    where: and(eq(classMembers.classId, classId), eq(classMembers.userId, user.id)),
  });
  if (member) return true;
  const orgMem = await db.query.organizationMembers.findFirst({
    where: and(
      eq(organizationMembers.organizationId, cls.organizationId),
      eq(organizationMembers.userId, user.id),
    ),
  });
  return orgMem?.role === "owner" || orgMem?.role === "teacher";
}

chatRoutes.get("/class/:classId", authMiddleware, async (c) => {
  const user = c.get("user");
  const classId = c.req.param("classId") as string;
  if (!(await canAccessClass(user, classId))) return c.json({ error: "forbidden" }, 403);

  const rows = await db
    .select({
      id: classMessages.id,
      body: classMessages.body,
      createdAt: classMessages.createdAt,
      userId: classMessages.userId,
      displayName: characters.displayName,
    })
    .from(classMessages)
    .leftJoin(characters, eq(characters.userId, classMessages.userId))
    .where(eq(classMessages.classId, classId))
    .orderBy(asc(classMessages.createdAt))
    .limit(200);

  return c.json({ messages: rows });
});

const postSchema = z.object({
  body: z.string().min(1).max(2000),
});

chatRoutes.post("/class/:classId", authMiddleware, async (c) => {
  const user = c.get("user");
  const classId = c.req.param("classId") as string;
  if (!(await canAccessClass(user, classId))) return c.json({ error: "forbidden" }, 403);

  const ip = clientIp({ get: (n) => c.req.header(n) ?? null });
  const rl = await rateLimit({
    key: `chat:${user.id}`,
    limit: 30,
    windowMs: 60_000,
  });
  if (!rl.ok) return c.json({ error: "rate_limited", retryAfterSec: rl.retryAfterSec }, 429);
  void ip;

  const body = await c.req.json().catch(() => null);
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const text = parsed.data.body.trim();
  if (!text) return c.json({ error: "empty" }, 400);

  const [msg] = await db
    .insert(classMessages)
    .values({ classId, userId: user.id, body: text })
    .returning();

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });

  return c.json(
    {
      message: {
        ...msg,
        displayName: ch?.displayName ?? "—",
      },
    },
    201,
  );
});
