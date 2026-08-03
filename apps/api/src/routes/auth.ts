import { Hono } from "hono";
import { and, desc, eq, gt, isNull, ne } from "drizzle-orm";
import { characters, passwordResetTokens, sessions, users } from "@eduforge/db";
import { loginSchema, registerSchema } from "@eduforge/shared";
import { z } from "zod";
import { randomBytes } from "node:crypto";
import {
  authMiddleware,
  clearSessionCookie,
  createSession,
  destroySession,
  hashPassword,
  hashToken,
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

  const { adminMfaEnforce, createMfaPending } = await import("../mfa.js");
  // Always challenge when admin has TOTP enrolled (TOTP or backup code).
  if (user.role === "admin" && user.totpEnabled) {
    const mfaToken = await createMfaPending(user.id);
    return c.json({
      mfaRequired: true,
      mfaToken,
      user: { id: user.id, email: user.email, plan: user.plan, role: user.role },
    });
  }

  const mfaVerified = true;
  const { token, expiresAt } = await createSession(user.id, { mfaVerified });
  setSessionCookie(c, token, expiresAt);
  const character = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  return c.json({
    user: {
      id: user.id,
      email: user.email,
      plan: user.plan,
      role: user.role,
      totpEnabled: user.totpEnabled,
      backupCodesRemaining: (user.mfaBackupCodeHashes ?? []).length,
    },
    character,
    token,
    mfaEnrollRequired:
      user.role === "admin" && adminMfaEnforce() && !user.totpEnabled,
  });
});

authRoutes.post("/logout", authMiddleware, async (c) => {
  const token = c.get("sessionToken");
  if (token) await destroySession(token);
  clearSessionCookie(c);
  return c.json({ ok: true });
});

/** List own sessions (admin security / account hygiene) */
authRoutes.get("/sessions", authMiddleware, async (c) => {
  const user = c.get("user");
  const current = c.get("sessionToken");
  const rows = await db
    .select({
      id: sessions.id,
      expiresAt: sessions.expiresAt,
      createdAt: sessions.createdAt,
      mfaVerifiedAt: sessions.mfaVerifiedAt,
      tokenHash: sessions.tokenHash,
    })
    .from(sessions)
    .where(eq(sessions.userId, user.id))
    .orderBy(desc(sessions.createdAt))
    .limit(50);
  const currentHash = current ? hashToken(current) : "";
  return c.json({
    sessions: rows.map((r) => ({
      id: r.id,
      expiresAt: r.expiresAt,
      createdAt: r.createdAt,
      mfaVerifiedAt: r.mfaVerifiedAt,
      current: r.tokenHash === currentHash,
    })),
  });
});

authRoutes.delete("/sessions/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const current = c.get("sessionToken");
  const row = await db.query.sessions.findFirst({
    where: and(eq(sessions.id, id), eq(sessions.userId, user.id)),
  });
  if (!row) return c.json({ error: "not_found" }, 404);
  if (current && row.tokenHash === hashToken(current)) {
    return c.json({ error: "cannot_revoke_current" }, 400);
  }
  await db.delete(sessions).where(eq(sessions.id, id));
  return c.json({ ok: true });
});

authRoutes.post("/sessions/revoke-others", authMiddleware, async (c) => {
  const user = c.get("user");
  const current = c.get("sessionToken");
  if (!current) return c.json({ error: "unauthorized" }, 401);
  const currentHash = hashToken(current);
  const deleted = await db
    .delete(sessions)
    .where(and(eq(sessions.userId, user.id), ne(sessions.tokenHash, currentHash)))
    .returning({ id: sessions.id });
  return c.json({ ok: true, revoked: deleted.length });
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
  const { adminMfaEnforce, getSessionMfaVerified } = await import("../mfa.js");
  const sessionToken = c.get("sessionToken");
  const mfaVerified =
    user.role !== "admin" || !user.totpEnabled
      ? true
      : await getSessionMfaVerified(sessionToken);
  return c.json({
    user: {
      id: user.id,
      email: user.email,
      plan: user.plan,
      role: user.role,
      planExpiresAt: user.planExpiresAt,
      totpEnabled: user.totpEnabled,
      mfaVerified,
      backupCodesRemaining: (user.mfaBackupCodeHashes ?? []).length,
      mfaEnrollRequired:
        user.role === "admin" && adminMfaEnforce() && !user.totpEnabled,
      mfaRequired: user.role === "admin" && user.totpEnabled && !mfaVerified,
    },
    character,
  });
});

/* ——— Admin TOTP MFA ——— */

authRoutes.get("/mfa/status", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.role !== "admin") return c.json({ error: "forbidden" }, 403);
  const { adminMfaEnforce, getSessionMfaVerified } = await import("../mfa.js");
  const sessionToken = c.get("sessionToken");
  const mfaVerified = await getSessionMfaVerified(sessionToken);
  return c.json({
    totpEnabled: user.totpEnabled,
    mfaVerified,
    mfaEnforced: adminMfaEnforce(),
    backupCodesRemaining: (user.mfaBackupCodeHashes ?? []).length,
  });
});

authRoutes.post("/mfa/totp/setup", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.role !== "admin") return c.json({ error: "forbidden" }, 403);
  if (user.totpEnabled) return c.json({ error: "already_enabled" }, 400);
  const limited = await guardAuth(c, "mfa_setup");
  if (limited) return limited;

  const {
    generateTotpSecret,
    encryptTotpSecret,
    totpUri,
  } = await import("../mfa.js");
  const secret = generateTotpSecret();
  await db
    .update(users)
    .set({
      totpSecretEnc: encryptTotpSecret(secret),
      totpEnabled: false,
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));
  return c.json({
    secret,
    otpauthUrl: totpUri(secret, user.email),
  });
});

authRoutes.post("/mfa/totp/confirm", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.role !== "admin") return c.json({ error: "forbidden" }, 403);
  const limited = await guardAuth(c, "mfa_confirm");
  if (limited) return limited;
  const body = await c.req.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code : "";
  const {
    loadUserTotpSecret,
    verifyTotpCode,
    markSessionMfaVerified,
    generateBackupCodes,
    hashBackupCodes,
  } = await import("../mfa.js");
  const secret = await loadUserTotpSecret(user.id);
  if (!secret) return c.json({ error: "setup_required" }, 400);
  if (!verifyTotpCode(secret, code)) return c.json({ error: "invalid_code" }, 401);
  const backupCodes = generateBackupCodes(10);
  await db
    .update(users)
    .set({
      totpEnabled: true,
      totpVerifiedAt: new Date(),
      mfaBackupCodeHashes: hashBackupCodes(backupCodes),
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));
  const sessionToken = c.get("sessionToken");
  if (sessionToken) await markSessionMfaVerified(sessionToken);
  return c.json({
    ok: true,
    totpEnabled: true,
    /** Shown once — store offline */
    backupCodes,
  });
});

authRoutes.post("/mfa/totp/verify", async (c) => {
  const limited = await guardAuth(c, "mfa_verify");
  if (limited) return limited;
  const body = await c.req.json().catch(() => null);
  const mfaToken = typeof body?.mfaToken === "string" ? body.mfaToken : "";
  const code = typeof body?.code === "string" ? body.code : "";
  const { consumeMfaPending, verifyUserMfaCode } = await import("../mfa.js");
  // Peek pending without consume until code valid — use consume after verify
  const { mfaPending } = await import("@eduforge/db");
  const { and, eq, gt } = await import("drizzle-orm");
  const { hashToken } = await import("../auth.js");
  const pending = await db.query.mfaPending.findFirst({
    where: and(
      eq(mfaPending.tokenHash, hashToken(mfaToken)),
      gt(mfaPending.expiresAt, new Date()),
    ),
  });
  if (!pending) return c.json({ error: "invalid_mfa_token" }, 401);
  const method = await verifyUserMfaCode(pending.userId, code);
  if (!method) return c.json({ error: "invalid_code" }, 401);
  await consumeMfaPending(mfaToken);
  const user = await db.query.users.findFirst({ where: eq(users.id, pending.userId) });
  if (!user) return c.json({ error: "not_found" }, 404);
  const { token, expiresAt } = await createSession(user.id, { mfaVerified: true });
  setSessionCookie(c, token, expiresAt);
  const character = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  return c.json({
    user: {
      id: user.id,
      email: user.email,
      plan: user.plan,
      role: user.role,
      totpEnabled: true,
      mfaVerified: true,
      backupCodesRemaining: (user.mfaBackupCodeHashes ?? []).length,
    },
    character,
    token,
    mfaMethod: method,
  });
});

authRoutes.post("/mfa/step-up", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.role !== "admin") return c.json({ error: "forbidden" }, 403);
  const limited = await guardAuth(c, "mfa_stepup");
  if (limited) return limited;
  const body = await c.req.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code : "";
  const { verifyUserMfaCode, createStepUpToken } = await import("../mfa.js");
  if (!user.totpEnabled) {
    // No TOTP: allow step-up without code (dev / not enrolled)
    const { token, expiresAt } = await createStepUpToken(user.id);
    return c.json({ stepUpToken: token, expiresAt });
  }
  const method = await verifyUserMfaCode(user.id, code);
  if (!method) return c.json({ error: "invalid_code" }, 401);
  const { token, expiresAt } = await createStepUpToken(user.id);
  return c.json({ stepUpToken: token, expiresAt, mfaMethod: method });
});

/** Regenerate backup codes (requires valid TOTP/step code, invalidates old) */
authRoutes.post("/mfa/backup-codes/regenerate", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.role !== "admin") return c.json({ error: "forbidden" }, 403);
  if (!user.totpEnabled) return c.json({ error: "mfa_enroll_required" }, 403);
  const limited = await guardAuth(c, "mfa_backup_regen");
  if (limited) return limited;
  const body = await c.req.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code : "";
  // TOTP only for regen (don't burn a backup code to replace backups)
  const {
    loadUserTotpSecret,
    verifyTotpCode,
    generateBackupCodes,
    hashBackupCodes,
  } = await import("../mfa.js");
  const secret = await loadUserTotpSecret(user.id);
  if (!secret || !verifyTotpCode(secret, code)) {
    return c.json({ error: "invalid_code", hint: "use_totp" }, 401);
  }
  const backupCodes = generateBackupCodes(10);
  await db
    .update(users)
    .set({
      mfaBackupCodeHashes: hashBackupCodes(backupCodes),
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));
  const { writeAdminAudit } = await import("../audit.js");
  await writeAdminAudit(db, {
    actorUserId: user.id,
    action: "backup_codes_regenerate",
    targetType: "user",
    targetId: user.id,
    meta: {},
  });
  return c.json({ backupCodes, backupCodesRemaining: backupCodes.length });
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
  const items = [
    {
      id: "profile",
      titleUk: "Створіть персонажа",
      titleEn: "Create your character",
      done: true,
      href: "/profile",
    },
    {
      id: "learn_map",
      titleUk: "Відкрийте карту навчання",
      titleEn: "Open the learning map",
      done: Boolean(o.viewedLearnMap),
      href: "/learn",
    },
    {
      id: "first_lesson",
      titleUk: "Пройдіть перший урок",
      titleEn: "Complete your first lesson",
      done: Boolean(o.completedFirstLesson) || character.globalXp > 0,
      href: "/learn",
    },
    {
      id: "programming",
      titleUk: "Спробуйте Programming path",
      titleEn: "Try the Programming path",
      done: Boolean(o.triedProgramming),
      href: "/programming",
    },
    {
      id: "chess",
      titleUk: "Зіграйте в шахи (бот або online)",
      titleEn: "Play chess (bot or online)",
      done: Boolean(o.triedChess),
      href: "/play",
    },
    {
      id: "typing",
      titleUk: "Спробуйте урок друку",
      titleEn: "Try a typing lesson",
      done: Boolean(o.triedTyping),
      href: "/courses/typing",
    },
    {
      id: "leaderboard",
      titleUk: "Подивіться рейтинг",
      titleEn: "View the leaderboard",
      done: Boolean(o.viewedLeaderboard),
      href: "/leaderboard",
    },
    {
      id: "pricing",
      titleUk: "Перегляньте тарифи",
      titleEn: "Check pricing",
      done: Boolean(o.exploredPricing),
      href: "/pricing",
    },
  ];
  const doneCount = items.filter((i) => i.done).length;
  return c.json({
    dismissed: Boolean(o.dismissed),
    items,
    doneCount,
    total: items.length,
    complete: doneCount === items.length,
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
