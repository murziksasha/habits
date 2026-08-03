import { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { and, eq, gt } from "drizzle-orm";
import { adminStepUpTokens, mfaPending, sessions, users } from "@eduforge/db";
import { Secret, TOTP } from "otpauth";
import { db } from "./db.js";
import { env } from "./env.js";
import { hashToken } from "./auth.js";

const ALGO = "aes-256-gcm";

function mfaKey(): Buffer {
  const raw = env.mfaEncryptionKey || env.authSecret;
  return createHash("sha256").update(raw).digest();
}

/** Encrypt TOTP secret for storage */
export function encryptTotpSecret(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGO, mfaKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString("base64url")}:${tag.toString("base64url")}:${enc.toString("base64url")}`;
}

/** Decrypt stored secret; supports seed `plain:` prefix for local/e2e */
export function decryptTotpSecret(stored: string): string {
  if (stored.startsWith("plain:")) return stored.slice(6);
  const [ver, ivB64, tagB64, dataB64] = stored.split(":");
  if (ver !== "v1" || !ivB64 || !tagB64 || !dataB64) throw new Error("invalid_secret_blob");
  const decipher = createDecipheriv(ALGO, mfaKey(), Buffer.from(ivB64, "base64url"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

export function generateTotpSecret(): string {
  return new Secret({ size: 20 }).base32;
}

export function totpUri(secret: string, email: string, issuer = "EduForge"): string {
  const totp = new TOTP({
    issuer,
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(secret),
  });
  return totp.toString();
}

export function verifyTotpCode(secret: string, code: string): boolean {
  const totp = new TOTP({
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(secret),
  });
  const delta = totp.validate({ token: code.replace(/\s/g, ""), window: 1 });
  return delta !== null;
}

export function adminMfaEnforce(): boolean {
  if (process.env.ADMIN_MFA_ENFORCE === "false") return false;
  if (process.env.ADMIN_MFA_ENFORCE === "true") return true;
  // Default: enforce in production only (local/e2e stay productive unless forced)
  return process.env.NODE_ENV === "production";
}

export async function createMfaPending(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await db.insert(mfaPending).values({
    userId,
    tokenHash: hashToken(token),
    expiresAt,
  });
  return token;
}

export async function consumeMfaPending(mfaToken: string) {
  const tokenHash = hashToken(mfaToken);
  const row = await db.query.mfaPending.findFirst({
    where: and(eq(mfaPending.tokenHash, tokenHash), gt(mfaPending.expiresAt, new Date())),
  });
  if (!row) return null;
  await db.delete(mfaPending).where(eq(mfaPending.id, row.id));
  return row.userId;
}

export async function createStepUpToken(userId: string): Promise<{ token: string; expiresAt: Date }> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await db.insert(adminStepUpTokens).values({
    userId,
    tokenHash: hashToken(token),
    expiresAt,
  });
  return { token, expiresAt };
}

export async function verifyStepUpToken(userId: string, token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const tokenHash = hashToken(token);
  const row = await db.query.adminStepUpTokens.findFirst({
    where: and(
      eq(adminStepUpTokens.tokenHash, tokenHash),
      eq(adminStepUpTokens.userId, userId),
      gt(adminStepUpTokens.expiresAt, new Date()),
    ),
  });
  return Boolean(row);
}

export async function markSessionMfaVerified(sessionToken: string) {
  await db
    .update(sessions)
    .set({ mfaVerifiedAt: new Date() })
    .where(eq(sessions.tokenHash, hashToken(sessionToken)));
}

export async function getSessionMfaVerified(sessionToken: string | undefined): Promise<boolean> {
  if (!sessionToken) return false;
  const row = await db.query.sessions.findFirst({
    where: and(eq(sessions.tokenHash, hashToken(sessionToken)), gt(sessions.expiresAt, new Date())),
  });
  return Boolean(row?.mfaVerifiedAt);
}

export function safeEqualStr(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export async function loadUserTotpSecret(userId: string): Promise<string | null> {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user?.totpSecretEnc) return null;
  try {
    return decryptTotpSecret(user.totpSecretEnc);
  } catch {
    return null;
  }
}

/** 10 codes like XXXX-XXXX (A-Z0-9), returned once in plaintext */
export function generateBackupCodes(count = 10): string[] {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const bytes = randomBytes(8);
    let s = "";
    for (let j = 0; j < 8; j++) {
      s += alphabet[bytes[j]! % alphabet.length];
    }
    codes.push(`${s.slice(0, 4)}-${s.slice(4)}`);
  }
  return codes;
}

export function hashBackupCode(code: string): string {
  const normalized = code.replace(/[\s-]/g, "").toUpperCase();
  return createHash("sha256").update(`backup:${normalized}`).digest("hex");
}

export function hashBackupCodes(codes: string[]): string[] {
  return codes.map(hashBackupCode);
}

/** Verify TOTP or consume a backup code. Returns how it matched. */
export async function verifyUserMfaCode(
  userId: string,
  code: string,
): Promise<"totp" | "backup" | null> {
  const normalized = code.replace(/\s/g, "");
  // Prefer TOTP when looks like 6 digits
  if (/^\d{6}$/.test(normalized)) {
    const secret = await loadUserTotpSecret(userId);
    if (secret && verifyTotpCode(secret, normalized)) return "totp";
  }
  // Backup codes (with or without dashes)
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) return null;
  const hashes = user.mfaBackupCodeHashes ?? [];
  if (!hashes.length) return null;
  const h = hashBackupCode(normalized);
  const idx = hashes.findIndex((x) => {
    try {
      return safeEqualStr(x, h);
    } catch {
      return x === h;
    }
  });
  if (idx < 0) return null;
  const next = hashes.filter((_, i) => i !== idx);
  await db
    .update(users)
    .set({ mfaBackupCodeHashes: next, updatedAt: new Date() })
    .where(eq(users.id, userId));
  return "backup";
}

export function currentTotpCode(secret: string): string {
  const totp = new TOTP({
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(secret),
  });
  return totp.generate();
}
