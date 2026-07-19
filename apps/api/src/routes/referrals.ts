import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { characters, referralCodes, referralRedemptions } from "@eduforge/db";
import { randomBytes } from "node:crypto";
import { levelFromXp } from "@eduforge/shared";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";

type Vars = { user: AuthedUser };

export const referralRoutes = new Hono<{ Variables: Vars }>();

const REFERRAL_BONUS_XP = 50;

function genCode() {
  return randomBytes(3).toString("hex").toUpperCase();
}

export async function ensureReferralCode(userId: string) {
  const existing = await db.query.referralCodes.findFirst({
    where: eq(referralCodes.userId, userId),
  });
  if (existing) return existing;
  const [created] = await db
    .insert(referralCodes)
    .values({ userId, code: genCode() })
    .returning();
  return created;
}

/** Apply referral on new user registration */
export async function redeemReferralCode(newUserId: string, code: string) {
  const cleaned = code.trim().toUpperCase();
  if (!cleaned) return null;
  const row = await db.query.referralCodes.findFirst({
    where: eq(referralCodes.code, cleaned),
  });
  if (!row || row.userId === newUserId) return null;

  const already = await db.query.referralRedemptions.findFirst({
    where: eq(referralRedemptions.referredUserId, newUserId),
  });
  if (already) return null;

  await db.insert(referralRedemptions).values({
    codeId: row.id,
    referredUserId: newUserId,
  });
  await db
    .update(referralCodes)
    .set({ uses: row.uses + 1 })
    .where(eq(referralCodes.id, row.id));

  // Bonus XP to referrer
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, row.userId),
  });
  if (ch) {
    const newXp = ch.globalXp + REFERRAL_BONUS_XP;
    await db
      .update(characters)
      .set({ globalXp: newXp, globalLevel: levelFromXp(newXp) })
      .where(eq(characters.id, ch.id));
  }

  await notifyUser(db, row.userId, {
    type: "referral",
    titleUk: "Реферал!",
    titleEn: "Referral bonus!",
    bodyUk: `+${REFERRAL_BONUS_XP} XP за запрошеного друга`,
    bodyEn: `+${REFERRAL_BONUS_XP} XP for inviting a friend`,
    href: "/referrals",
  });
  await logActivity(db, row.userId, "referral_success", { referredUserId: newUserId });

  // Small bonus to new user too
  const newbie = await db.query.characters.findFirst({
    where: eq(characters.userId, newUserId),
  });
  if (newbie) {
    const newXp = newbie.globalXp + 25;
    await db
      .update(characters)
      .set({ globalXp: newXp, globalLevel: levelFromXp(newXp) })
      .where(eq(characters.id, newbie.id));
  }

  return row;
}

referralRoutes.get("/mine", authMiddleware, async (c) => {
  const user = c.get("user");
  const code = await ensureReferralCode(user.id);
  return c.json({
    code: code.code,
    uses: code.uses,
    bonusXp: REFERRAL_BONUS_XP,
    shareUrl: `${process.env.WEB_ORIGIN ?? "http://localhost:3000"}/register?ref=${code.code}`,
  });
});
