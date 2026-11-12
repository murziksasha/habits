import { eq } from "drizzle-orm";
import { characters } from "@eduforge/db";
import {
  applyLevelUps,
  clampDailyXpGain,
  dailyGoalBonus,
  levelFromXp,
  lessonXpMultiplier,
  maxStreakFreezesBonus,
  normalizeProgression,
  sparkBonusChance,
  type CharacterProgression,
} from "@eduforge/shared";
import { db } from "../db.js";

export function readProgression(ch: { progression?: unknown }): CharacterProgression {
  return normalizeProgression(ch.progression);
}

/** Apply XP gain + level-up skill points / cosmetic unlocks (respecting optional daily cap BEFORE level rewards). */
export function buildXpPatch(
  ch: {
    globalXp: number;
    progression?: unknown;
    dailyGoalXp?: number;
  },
  gain: number,
  opts?: {
    applyIntellect?: boolean;
    applySpark?: boolean;
    /** Remaining character XP allowed under DAILY_XP_CAP today */
    dailyXpRemaining?: number;
  },
): {
  globalXp: number;
  globalLevel: number;
  progression: CharacterProgression;
  effectiveGain: number;
  uncappedGain: number;
  dailyCapApplied: boolean;
  sparkBonus: number;
} {
  const p0 = readProgression(ch);
  let uncappedGain = Math.max(0, Math.round(gain));
  if (uncappedGain > 0 && opts?.applyIntellect !== false) {
    uncappedGain = Math.max(0, Math.round(uncappedGain * lessonXpMultiplier(p0)));
  }
  let sparkBonus = 0;
  if (uncappedGain > 0 && opts?.applySpark !== false && Math.random() < sparkBonusChance(p0)) {
    sparkBonus = 1;
    uncappedGain += sparkBonus;
  }

  const effectiveGain =
    typeof opts?.dailyXpRemaining === "number"
      ? clampDailyXpGain(0, uncappedGain, Math.max(0, opts.dailyXpRemaining))
      : uncappedGain;

  const dailyCapApplied = uncappedGain > 0 && effectiveGain < uncappedGain;
  const globalXp = ch.globalXp + effectiveGain;
  const globalLevel = levelFromXp(globalXp);
  const progression = applyLevelUps(p0, globalLevel);
  const baseGoal =
    ch.dailyGoalXp && ch.dailyGoalXp > 0
      ? Math.max(50, ch.dailyGoalXp - dailyGoalBonus(p0))
      : 50;
  void baseGoal;
  return {
    globalXp,
    globalLevel,
    progression,
    effectiveGain,
    uncappedGain,
    dailyCapApplied,
    sparkBonus,
  };
}

export function effectiveMaxStreakFreezes(baseMax: number, ch: { progression?: unknown }): number {
  return baseMax + maxStreakFreezesBonus(readProgression(ch));
}

export async function grantXpToUser(
  userId: string,
  gain: number,
  opts?: { applyIntellect?: boolean; applySpark?: boolean },
) {
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, userId),
  });
  if (!ch || gain <= 0) return null;
  const patch = buildXpPatch(ch, gain, opts);
  const [updated] = await db
    .update(characters)
    .set({
      globalXp: patch.globalXp,
      globalLevel: patch.globalLevel,
      progression: patch.progression,
    })
    .where(eq(characters.id, ch.id))
    .returning();
  return updated;
}
