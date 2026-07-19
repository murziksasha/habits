import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { and, eq, gt } from "drizzle-orm";
import { characters, chessRatings, sessions, users } from "@eduforge/db";
import type { Context, Next } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { db } from "./db.js";

const SESSION_DAYS = 14;
const COOKIE = "eduforge_session";

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.insert(sessions).values({ userId, tokenHash, expiresAt });
  return { token, expiresAt };
}

export async function destroySession(token: string) {
  await db.delete(sessions).where(eq(sessions.tokenHash, hashToken(token)));
}

export async function getUserFromToken(token: string | undefined) {
  if (!token) return null;
  const tokenHash = hashToken(token);
  const row = await db.query.sessions.findFirst({
    where: and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, new Date())),
  });
  if (!row) return null;
  const user = await db.query.users.findFirst({ where: eq(users.id, row.userId) });
  if (!user) return null;
  // Expire premium when planExpiresAt is in the past (trial / demo)
  if (
    user.plan === "premium" &&
    user.planExpiresAt &&
    user.planExpiresAt.getTime() < Date.now()
  ) {
    const [updated] = await db
      .update(users)
      .set({ plan: "free", planExpiresAt: null, updatedAt: new Date() })
      .where(eq(users.id, user.id))
      .returning();
    return updated ?? { ...user, plan: "free" as const, planExpiresAt: null };
  }
  return user;
}

export type AuthedUser = NonNullable<Awaited<ReturnType<typeof getUserFromToken>>>;

export async function authMiddleware(c: Context, next: Next) {
  const token = getCookie(c, COOKIE) ?? c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  const user = await getUserFromToken(token);
  if (!user) return c.json({ error: "unauthorized" }, 401);
  c.set("user", user);
  c.set("sessionToken", token);
  await next();
}

export async function adminMiddleware(c: Context, next: Next) {
  const token = getCookie(c, COOKIE) ?? c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  const user = await getUserFromToken(token);
  if (!user) return c.json({ error: "unauthorized" }, 401);
  if (user.role !== "admin") return c.json({ error: "forbidden" }, 403);
  c.set("user", user);
  c.set("sessionToken", token);
  await next();
}

export async function optionalAuth(c: Context, next: Next) {
  const token = getCookie(c, COOKIE) ?? c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  const user = await getUserFromToken(token);
  if (user) c.set("user", user);
  await next();
}

export function setSessionCookie(c: Context, token: string, expiresAt: Date) {
  setCookie(c, COOKIE, token, {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    expires: expiresAt,
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearSessionCookie(c: Context) {
  deleteCookie(c, COOKIE, { path: "/" });
}

export async function registerUser(email: string, password: string, displayName: string) {
  const existing = await db.query.users.findFirst({ where: eq(users.email, email.toLowerCase()) });
  if (existing) throw new Error("email_taken");
  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(users)
    .values({ email: email.toLowerCase(), passwordHash })
    .returning();
  await db.insert(characters).values({ userId: user.id, displayName });
  await db.insert(chessRatings).values({ userId: user.id });
  return user;
}

export function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}
