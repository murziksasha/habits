/** Level-up and mystery self-loot for character goodies. */

export type LootDrop = {
  kind: "xp" | "freeze" | "avatar" | "title" | "frame" | "skill_point";
  amount?: number;
  key?: string;
  labelUk: string;
  labelEn: string;
  icon: string;
};

const AVATAR_POOL = ["dragon", "ninja", "owl", "panda", "samurai", "mage"] as const;
const TITLE_POOL = ["learner", "adept", "hero"] as const;
const FRAME_POOL = ["bronze", "silver", "neon"] as const;

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

/** Roll a level-up celebration drop (small, frequent). */
export function rollLevelUpLoot(newLevel: number): LootDrop {
  const roll = Math.random();
  if (newLevel >= 5 && roll < 0.12) {
    return {
      kind: "avatar",
      key: pick(AVATAR_POOL),
      labelUk: "новий аватар",
      labelEn: "new avatar",
      icon: "🎭",
    };
  }
  if (newLevel >= 3 && roll < 0.22) {
    return {
      kind: "title",
      key: pick(TITLE_POOL),
      labelUk: "новий титул",
      labelEn: "new title",
      icon: "🏷️",
    };
  }
  if (newLevel >= 4 && roll < 0.3) {
    return {
      kind: "frame",
      key: pick(FRAME_POOL),
      labelUk: "нова рамка",
      labelEn: "new frame",
      icon: "🖼️",
    };
  }
  if (roll < 0.45) {
    return {
      kind: "freeze",
      amount: 1,
      labelUk: "+1 щит серії",
      labelEn: "+1 streak shield",
      icon: "🛡️",
    };
  }
  if (roll < 0.65) {
    return {
      kind: "skill_point",
      amount: 1,
      labelUk: "+1 очко навичок",
      labelEn: "+1 skill point",
      icon: "⭐",
    };
  }
  const xp = 5 + Math.floor(Math.random() * 16);
  return {
    kind: "xp",
    amount: xp,
    labelUk: `+${xp} бонус XP`,
    labelEn: `+${xp} bonus XP`,
    icon: "✨",
  };
}

/** Self-bought mystery crate (stronger than friend mystery cheer). */
export function rollShopMystery(): LootDrop {
  const roll = Math.random();
  if (roll < 0.25) {
    return {
      kind: "xp",
      amount: 50,
      labelUk: "50 XP",
      labelEn: "50 XP",
      icon: "⭐",
    };
  }
  if (roll < 0.4) {
    return {
      kind: "freeze",
      amount: 2,
      labelUk: "2 щити",
      labelEn: "2 shields",
      icon: "🛡️",
    };
  }
  if (roll < 0.55) {
    return {
      kind: "avatar",
      key: pick([...AVATAR_POOL, "phoenix", "cosmic", "unicorn", "cyborg"] as const),
      labelUk: "рідкісний аватар",
      labelEn: "rare avatar",
      icon: "🎭",
    };
  }
  if (roll < 0.7) {
    return {
      kind: "frame",
      key: pick([...FRAME_POOL, "gold", "flame"] as const),
      labelUk: "рамка",
      labelEn: "frame",
      icon: "🖼️",
    };
  }
  if (roll < 0.85) {
    return {
      kind: "title",
      key: pick([...TITLE_POOL, "master", "phoenix"] as const),
      labelUk: "титул",
      labelEn: "title",
      icon: "🏆",
    };
  }
  return {
    kind: "skill_point",
    amount: 2,
    labelUk: "+2 очки навичок",
    labelEn: "+2 skill points",
    icon: "⭐",
  };
}

/** Daily login check-in reward (base; streak multiplies on server). */
export const DAILY_LOGIN_BASE_XP = 12;
export const DAILY_LOGIN_STREAK_BONUS = 2; // per streak day, capped
export const DAILY_LOGIN_STREAK_CAP = 14;
