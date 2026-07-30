import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { and, desc, eq, gt, isNull, ne } from "drizzle-orm";
import {
  characters,
  chessRatings,
  emailVerificationTokens,
  sessions,
  users,
} from "@eduforge/db";
import type { Context, Next } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { db } from "./db.js";

const SESSION_DAYS = 14;
/** Verification link must remain valid until the 30-day delete deadline. */
const EMAIL_VERIFY_DAYS = 30;
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

/** Active sessions for a user (no token hashes exposed). */
export async function listUserSessions(userId: string, currentToken?: string) {
  const rows = await db.query.sessions.findMany({
    where: and(eq(sessions.userId, userId), gt(sessions.expiresAt, new Date())),
    orderBy: [desc(sessions.createdAt)],
  });
  const currentHash = currentToken ? hashToken(currentToken) : null;
  return rows.map((r) => ({
    id: r.id,
    createdAt: r.createdAt,
    expiresAt: r.expiresAt,
    current: currentHash !== null && r.tokenHash === currentHash,
  }));
}

/** Revoke all sessions except the one identified by keepToken (this device). */
export async function destroyOtherSessions(userId: string, keepToken: string) {
  const keepHash = hashToken(keepToken);
  const deleted = await db
    .delete(sessions)
    .where(and(eq(sessions.userId, userId), ne(sessions.tokenHash, keepHash)))
    .returning({ id: sessions.id });
  return { revoked: deleted.length };
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

export function isAccountActive(user: { accountStatus?: string | null }) {
  return (user.accountStatus ?? "active") !== "inactive";
}

export function publicUser(user: AuthedUser | (typeof users.$inferSelect)) {
  return {
    id: user.id,
    email: user.email,
    plan: user.plan,
    role: user.role,
    planExpiresAt: user.planExpiresAt ?? null,
    emailVerified: Boolean(user.emailVerifiedAt),
    emailVerifiedAt: user.emailVerifiedAt ?? null,
    accountStatus: user.accountStatus ?? "active",
  };
}

/** Issue a fresh email verification token (raw returned once for email link). */
export async function createEmailVerificationToken(userId: string) {
  const raw = randomBytes(32).toString("hex");
  const tokenHash = hashToken(raw);
  const expiresAt = new Date(Date.now() + EMAIL_VERIFY_DAYS * 24 * 60 * 60 * 1000);
  await db.insert(emailVerificationTokens).values({
    userId,
    tokenHash,
    expiresAt,
  });
  return { raw, expiresAt };
}

/** Confirm email from raw token; reactivates inactive accounts. */
export async function consumeEmailVerificationToken(raw: string) {
  const tokenHash = hashToken(raw);
  const row = await db.query.emailVerificationTokens.findFirst({
    where: and(
      eq(emailVerificationTokens.tokenHash, tokenHash),
      gt(emailVerificationTokens.expiresAt, new Date()),
      isNull(emailVerificationTokens.usedAt),
    ),
  });
  if (!row) return null;

  const user = await db.query.users.findFirst({ where: eq(users.id, row.userId) });
  if (!user) return null;

  if (user.emailVerifiedAt) {
    await db
      .update(emailVerificationTokens)
      .set({ usedAt: new Date() })
      .where(eq(emailVerificationTokens.id, row.id));
    return { user, alreadyVerified: true as const };
  }

  const [updated] = await db
    .update(users)
    .set({
      emailVerifiedAt: new Date(),
      accountStatus: "active",
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id))
    .returning();

  await db
    .update(emailVerificationTokens)
    .set({ usedAt: new Date() })
    .where(eq(emailVerificationTokens.id, row.id));

  return { user: updated ?? user, alreadyVerified: false as const };
}

/** Resolve session from httpOnly cookie first, then Bearer (dual-support). */
function readSessionToken(c: Context): { token?: string; fromCookie: boolean } {
  const cookieToken = getCookie(c, COOKIE);
  if (cookieToken) return { token: cookieToken, fromCookie: true };
  const headerToken = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  if (headerToken) return { token: headerToken, fromCookie: false };
  return { token: undefined, fromCookie: false };
}

/** When client still sends Bearer only, re-issue httpOnly cookie for future requests. */
async function promoteBearerToCookie(c: Context, token: string, fromCookie: boolean) {
  if (fromCookie || !token) return;
  const sess = await db.query.sessions.findFirst({
    where: and(eq(sessions.tokenHash, hashToken(token)), gt(sessions.expiresAt, new Date())),
  });
  if (sess) setSessionCookie(c, token, sess.expiresAt);
}

export async function authMiddleware(c: Context, next: Next) {
  const { token, fromCookie } = readSessionToken(c);
  const user = await getUserFromToken(token);
  if (!user) return c.json({ error: "unauthorized" }, 401);
  if (!isAccountActive(user)) {
    return c.json({ error: "account_inactive" }, 403);
  }
  c.set("user", user);
  c.set("sessionToken", token);
  await promoteBearerToCookie(c, token!, fromCookie);
  await next();
}

export async function adminMiddleware(c: Context, next: Next) {
  const { token, fromCookie } = readSessionToken(c);
  const user = await getUserFromToken(token);
  if (!user) return c.json({ error: "unauthorized" }, 401);
  if (!isAccountActive(user)) {
    return c.json({ error: "account_inactive" }, 403);
  }
  if (user.role !== "admin") return c.json({ error: "forbidden" }, 403);
  c.set("user", user);
  c.set("sessionToken", token);
  await promoteBearerToCookie(c, token!, fromCookie);
  await next();
}

export async function optionalAuth(c: Context, next: Next) {
  const { token, fromCookie } = readSessionToken(c);
  const user = await getUserFromToken(token);
  if (user && isAccountActive(user)) {
    c.set("user", user);
    c.set("sessionToken", token);
    if (token) await promoteBearerToCookie(c, token, fromCookie);
  }
  await next();
}

export function setSessionCookie(c: Context, token: string, expiresAt: Date) {
  // Secure cookies only on real HTTPS. CI/local use http://127.0.0.1 — must stay non-secure
  // or Playwright never stores the session cookie.
  const origin = process.env.WEB_ORIGIN ?? "";
  const forceInsecure =
    process.env.COOKIE_SECURE === "0" ||
    origin.startsWith("http://localhost") ||
    origin.startsWith("http://127.0.0.1");
  const secure =
    process.env.COOKIE_SECURE === "1" ||
    (process.env.NODE_ENV === "production" && !forceInsecure);
  setCookie(c, COOKIE, token, {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    expires: expiresAt,
    secure,
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
