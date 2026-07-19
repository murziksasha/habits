import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { pushSubscriptions } from "@eduforge/db";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { getVapidPublicKey, sendPushToUser } from "../push.js";

type Vars = { user: AuthedUser };

export const pushRoutes = new Hono<{ Variables: Vars }>();

pushRoutes.get("/vapid-public-key", (c) => {
  return c.json({ publicKey: getVapidPublicKey() });
});

const subSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string().min(1),
    auth: z.string().min(1),
  }),
});

pushRoutes.post("/subscribe", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = subSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const ua = c.req.header("user-agent")?.slice(0, 255) ?? "";
  const existing = await db.query.pushSubscriptions.findFirst({
    where: eq(pushSubscriptions.endpoint, parsed.data.endpoint),
  });

  if (existing) {
    const [updated] = await db
      .update(pushSubscriptions)
      .set({
        userId: user.id,
        p256dh: parsed.data.keys.p256dh,
        auth: parsed.data.keys.auth,
        userAgent: ua,
      })
      .where(eq(pushSubscriptions.id, existing.id))
      .returning();
    return c.json({ subscription: updated });
  }

  const [created] = await db
    .insert(pushSubscriptions)
    .values({
      userId: user.id,
      endpoint: parsed.data.endpoint,
      p256dh: parsed.data.keys.p256dh,
      auth: parsed.data.keys.auth,
      userAgent: ua,
    })
    .returning();
  return c.json({ subscription: created }, 201);
});

pushRoutes.delete("/subscribe", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const endpoint = (body as { endpoint?: string })?.endpoint;
  if (!endpoint) return c.json({ error: "invalid_input" }, 400);
  await db
    .delete(pushSubscriptions)
    .where(
      and(
        eq(pushSubscriptions.userId, user.id),
        eq(pushSubscriptions.endpoint, endpoint),
      ),
    );
  return c.json({ ok: true });
});

pushRoutes.get("/status", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.pushSubscriptions.findMany({
    where: eq(pushSubscriptions.userId, user.id),
  });
  return c.json({ count: rows.length, enabled: rows.length > 0 });
});

/** Dev / self test notification */
pushRoutes.post("/test", authMiddleware, async (c) => {
  const user = c.get("user");
  const result = await sendPushToUser(db, user.id, {
    title: "EduForge",
    body: "Тестове push-сповіщення 🎉",
    href: "/dashboard",
    tag: "test",
  });
  return c.json(result);
});
