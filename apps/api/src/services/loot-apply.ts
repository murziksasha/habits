import { eq } from "drizzle-orm";
import { characters } from "@eduforge/db";
import {
  DEFAULT_AVATARS,
  MAX_STREAK_FREEZES,
  applyLevelUps,
  levelFromXp,
  normalizeProgression,
  type LootDrop,
} from "@eduforge/shared";
import { db } from "../db.js";
import { effectiveMaxStreakFreezes } from "./character-progression.js";
import { notifyUser } from "../engagement.js";

/** Apply a loot drop to a character row; returns updated character. */
export async function applyLootDrop(
  userId: string,
  drop: LootDrop,
  opts?: { notify?: boolean },
) {
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, userId),
  });
  if (!ch) return null;

  let progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
  const unlocked = new Set([...DEFAULT_AVATARS, ...(ch.unlockedAvatars ?? [])]);
  const patch: Partial<typeof characters.$inferInsert> = {};

  if (drop.kind === "xp" && (drop.amount ?? 0) > 0) {
    const globalXp = ch.globalXp + (drop.amount ?? 0);
    const globalLevel = levelFromXp(globalXp);
    progression = applyLevelUps(progression, globalLevel);
    patch.globalXp = globalXp;
    patch.globalLevel = globalLevel;
  }

  if (drop.kind === "freeze" && (drop.amount ?? 0) > 0) {
    const max = effectiveMaxStreakFreezes(MAX_STREAK_FREEZES, ch);
    const current = ch.streakFreezes ?? 0;
    patch.streakFreezes = Math.min(max, current + (drop.amount ?? 0));
  }

  if (drop.kind === "avatar" && drop.key) {
    unlocked.add(drop.key);
    patch.unlockedAvatars = [...unlocked];
  }

  if (drop.kind === "title" && drop.key && !progression.unlockedTitles.includes(drop.key)) {
    progression.unlockedTitles.push(drop.key);
  }
  if (drop.kind === "frame" && drop.key && !progression.unlockedFrames.includes(drop.key)) {
    progression.unlockedFrames.push(drop.key);
  }
  if (drop.kind === "skill_point") {
    progression.skillPoints += Math.max(1, drop.amount ?? 1);
  }

  patch.progression = progression;

  const [updated] = await db
    .update(characters)
    .set(patch)
    .where(eq(characters.id, ch.id))
    .returning();

  if (opts?.notify !== false) {
    await notifyUser(db, userId, {
      type: "loot",
      titleUk: `${drop.icon} Здобич!`,
      titleEn: `${drop.icon} Loot!`,
      bodyUk: drop.labelUk,
      bodyEn: drop.labelEn,
      href: "/profile",
    });
  }

  return { character: updated, drop };
}
