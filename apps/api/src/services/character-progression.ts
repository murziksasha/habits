import { eq } from "drizzle-orm";
import { characters } from "@eduforge/db";
import {
  applyLevelUps,
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

/** Apply XP gain + level-up skill points / cosmetic unlocks. */
export function buildXpPatch(
  ch: {
    globalXp: number;
    progression?: unknown;
    dailyGoalXp?: number;
  },
  gain: number,
  opts?: { applyIntellect?: boolean; applySpark?: boolean },
): {
  globalXp: number;
  globalLevel: number;
  progression: CharacterProgression;
  effectiveGain: number;
  sparkBonus: number;
} {
  const p0 = readProgression(ch);
  let effectiveGain = Math.max(0, Math.round(gain));
  if (opts?.applyIntellect !== false) {
    effectiveGain = Math.max(0, Math.round(effectiveGain * lessonXpMultiplier(p0)));
  }
  let sparkBonus = 0;
  if (opts?.applySpark !== false && Math.random() < sparkBonusChance(p0)) {
    sparkBonus = 1;
    effectiveGain += sparkBonus;
  }
  const globalXp = ch.globalXp + effectiveGain;
  const globalLevel = levelFromXp(globalXp);
  const progression = applyLevelUps(p0, globalLevel);
  // Keep daily goal aligned with focus talent (base stored value or 50)
  const baseGoal = ch.dailyGoalXp && ch.dailyGoalXp > 0 ? Math.max(50, ch.dailyGoalXp - dailyGoalBonus(p0)) : 50;
  // note: dailyGoalXp is updated separately when spending focus talent
  void baseGoal;
  return { globalXp, globalLevel, progression, effectiveGain, sparkBonus };
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
