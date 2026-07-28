import { Hono } from "hono";
import { and, eq, gt, isNull } from "drizzle-orm";
import { characters, passwordResetTokens, users } from "@eduforge/db";
import { loginSchema, registerSchema } from "@eduforge/shared";
import { z } from "zod";
import { randomBytes } from "node:crypto";
import {
  authMiddleware,
  clearSessionCookie,
  createSession,
  destroyOtherSessions,
  destroySession,
  hashPassword,
  hashToken,
  listUserSessions,
  registerUser,
  setSessionCookie,
  verifyPassword,
  type AuthedUser,
} from "../auth.js";
import { db } from "../db.js";
import { passwordResetEmail, sendMail } from "../email.js";
import { env } from "../env.js";
import { clientIp, rateLimit } from "../rate-limit.js";
import { ensureReferralCode, redeemReferralCode } from "./referrals.js";

type Vars = { user: AuthedUser; sessionToken?: string };

export const authRoutes = new Hono<{ Variables: Vars }>();

async function guardAuth(
  c: {
    req: { header: (n: string) => string | undefined };
    json: (b: unknown, s: number) => Response;
  },
  action: string,
) {
  const ip = clientIp({ get: (n) => c.req.header(n) ?? null });
  const r = await rateLimit({
    key: `auth:${action}:${ip}`,
    limit: 20,
    windowMs: 15 * 60 * 1000,
  });
  if (!r.ok) {
    return c.json({ error: "rate_limited", retryAfterSec: r.retryAfterSec }, 429);
  }
  return null;
}

authRoutes.post("/register", async (c) => {
  const limited = await guardAuth(c, "register");
  if (limited) return limited;
  const body = await c.req.json().catch(() => null);
  const parsed = registerSchema
    .extend({ referralCode: z.string().max(16).optional() })
    .safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input", details: parsed.error.flatten() }, 400);
  try {
    const user = await registerUser(
      parsed.data.email,
      parsed.data.password,
      parsed.data.displayName,
    );
    await ensureReferralCode(user.id);
    if (parsed.data.referralCode) {
      await redeemReferralCode(user.id, parsed.data.referralCode);
    }
    const { token, expiresAt } = await createSession(user.id);
    setSessionCookie(c, token, expiresAt);
    const character = await db.query.characters.findFirst({
      where: eq(characters.userId, user.id),
    });
    return c.json({
      user: { id: user.id, email: user.email, plan: user.plan, role: user.role },
      character,
      token,
    });
  } catch (e) {
    if (e instanceof Error && e.message === "email_taken") {
      return c.json({ error: "email_taken" }, 409);
    }
    throw e;
  }
});

authRoutes.post("/login", async (c) => {
  const limited = await guardAuth(c, "login");
  if (limited) return limited;
  const body = await c.req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
  const user = await db.query.users.findFirst({
    where: eq(users.email, parsed.data.email.toLowerCase()),
  });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return c.json({ error: "invalid_credentials" }, 401);
  }
  const { token, expiresAt } = await createSession(user.id);
  setSessionCookie(c, token, expiresAt);
  const character = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  return c.json({
    user: { id: user.id, email: user.email, plan: user.plan, role: user.role },
    character,
    token,
  });
});

authRoutes.post("/logout", authMiddleware, async (c) => {
  const token = c.get("sessionToken");
  if (token) await destroySession(token);
  clearSessionCookie(c);
  return c.json({ ok: true });
});

/** List active sessions for the current user (current device flagged). */
authRoutes.get("/sessions", authMiddleware, async (c) => {
  const user = c.get("user");
  const token = c.get("sessionToken");
  const list = await listUserSessions(user.id, token);
  return c.json({ sessions: list, count: list.length });
});

/**
 * Sign out every other device (keeps the calling session).
 * Body optional: `{ all: true }` also ends the current session (full logout-all).
 */
authRoutes.post("/logout-others", authMiddleware, async (c) => {
  const user = c.get("user");
  const token = c.get("sessionToken");
  if (!token) return c.json({ error: "unauthorized" }, 401);
  const body = await c.req.json().catch(() => ({}));
  const revokeCurrent = Boolean((body as { all?: boolean }).all);
  const { revoked } = await destroyOtherSessions(user.id, token);
  if (revokeCurrent) {
    await destroySession(token);
    clearSessionCookie(c);
    return c.json({ ok: true, revoked: revoked + 1, currentRevoked: true });
  }
  return c.json({ ok: true, revoked, currentRevoked: false });
});

authRoutes.get("/me", authMiddleware, async (c) => {
  const user = c.get("user");
  let character = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  // Reset daily XP display if date rolled over
  if (character) {
    const today = new Date().toISOString().slice(0, 10);
    if (character.dailyXpDate !== today && (character.dailyXp ?? 0) > 0) {
      const [updated] = await db
        .update(characters)
        .set({ dailyXp: 0, dailyXpDate: today })
        .where(eq(characters.id, character.id))
        .returning();
      character = updated;
    }
  }
  return c.json({
    user: {
      id: user.id,
      email: user.email,
      plan: user.plan,
      role: user.role,
      planExpiresAt: user.planExpiresAt,
    },
    character,
  });
});

authRoutes.patch("/me/character", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => ({}));
  const displayName =
    typeof body.displayName === "string" ? body.displayName.trim().slice(0, 32) : null;
  const avatarKey =
    typeof body.avatarKey === "string" ? body.avatarKey.slice(0, 64) : null;
  if (!displayName && !avatarKey) return c.json({ error: "invalid_input" }, 400);
  const character = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!character) return c.json({ error: "not_found" }, 404);
  const [updated] = await db
    .update(characters)
    .set({
      ...(displayName && displayName.length >= 2 ? { displayName } : {}),
      ...(avatarKey ? { avatarKey } : {}),
    })
    .where(eq(characters.id, character.id))
    .returning();
  return c.json({ character: updated });
});

/** Onboarding checklist progress */
authRoutes.get("/onboarding", authMiddleware, async (c) => {
  const user = c.get("user");
  const character = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!character) return c.json({ error: "not_found" }, 404);
  const o = character.onboarding ?? {};
  // Onboarding v2: core loop only (learn map → first lesson → code path → play)
  // Secondary items remain trackable via complete keys but are not shown by default.
  const items = [
    {
      id: "learn_map",
      titleUk: "Відкрийте карту навчання",
      titleEn: "Open the learning map",
      done: Boolean(o.viewedLearnMap),
      href: "/learn",
      key: "viewedLearnMap",
    },
    {
      id: "first_lesson",
      titleUk: "Пройдіть перший урок сьогодні",
      titleEn: "Complete your first lesson today",
      done: Boolean(o.completedFirstLesson) || character.globalXp > 0,
      href: "/learn",
      key: "completedFirstLesson",
    },
    {
      id: "programming",
      titleUk: "Спробуйте Programming path",
      titleEn: "Try the Programming path",
      done: Boolean(o.triedProgramming),
      href: "/programming",
      key: "triedProgramming",
    },
    {
      id: "chess",
      titleUk: "Зіграйте партію (бот або online)",
      titleEn: "Play a game (bot or online)",
      done: Boolean(o.triedChess),
      href: "/play",
      key: "triedChess",
    },
  ];
  const doneCount = items.filter((i) => i.done).length;
  return c.json({
    dismissed: Boolean(o.dismissed),
    items,
    doneCount,
    total: items.length,
    complete: doneCount === items.length,
    version: 2,
  });
});

authRoutes.post("/onboarding/complete", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => ({}));
  const key = String(body.key ?? "");
  const allowed = [
    "viewedLearnMap",
    "triedProgramming",
    "completedFirstLesson",
    "triedChess",
    "triedTyping",
    "viewedLeaderboard",
    "exploredPricing",
    "dismissed",
  ] as const;
  if (!allowed.includes(key as (typeof allowed)[number])) {
    return c.json({ error: "invalid_key" }, 400);
  }
  const character = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!character) return c.json({ error: "not_found" }, 404);
  const next = { ...(character.onboarding ?? {}), [key]: true };
  const [updated] = await db
    .update(characters)
    .set({ onboarding: next })
    .where(eq(characters.id, character.id))
    .returning();
  return c.json({ onboarding: updated.onboarding });
});

const forgotSchema = z.object({ email: z.string().email() });
const resetSchema = z.object({
  token: z.string().min(20),
  password: z.string().min(8).max(128),
});

authRoutes.post("/forgot-password", async (c) => {
  const limited = await guardAuth(c, "forgot");
  if (limited) return limited;
  const body = await c.req.json().catch(() => null);
  const parsed = forgotSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  // Always same response (no email enumeration)
  const generic = {
    ok: true,
    message:
      "Якщо акаунт існує, ми надіслали посилання для скидання пароля (у dev — див. resetUrl).",
  };

  const user = await db.query.users.findFirst({
    where: eq(users.email, parsed.data.email.toLowerCase()),
  });
  if (!user) return c.json(generic);

  const raw = randomBytes(32).toString("hex");
  const tokenHash = hashToken(raw);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h
  await db.insert(passwordResetTokens).values({
    userId: user.id,
    tokenHash,
    expiresAt,
  });

  const resetUrl = `${env.webOrigin}/reset-password?token=${raw}`;
  console.log(`[password-reset] ${user.email} → ${resetUrl}`);
  const mail = await sendMail(passwordResetEmail({ to: user.email, resetUrl }));

  const isDev = process.env.NODE_ENV !== "production";
  return c.json({
    ...generic,
    emailSent: mail.sent,
    ...(isDev ? { resetUrl, devToken: raw } : {}),
  });
});

authRoutes.post("/reset-password", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = resetSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const tokenHash = hashToken(parsed.data.token);
  const row = await db.query.passwordResetTokens.findFirst({
    where: and(
      eq(passwordResetTokens.tokenHash, tokenHash),
      gt(passwordResetTokens.expiresAt, new Date()),
      isNull(passwordResetTokens.usedAt),
    ),
  });
  if (!row) return c.json({ error: "invalid_or_expired_token" }, 400);

  const passwordHash = await hashPassword(parsed.data.password);
  await db
    .update(users)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(users.id, row.userId));
  await db
    .update(passwordResetTokens)
    .set({ usedAt: new Date() })
    .where(eq(passwordResetTokens.id, row.id));

  return c.json({ ok: true });
});
