/**
 * Bot personalities open with course progress (chess plan §8.4). The server computes the
 * learner's progress and enforces the rules; the web page only shows them.
 */
export type BotUnlockId = "learner" | "club" | "strong" | "italian_challenge";

export type BotUnlockRule = { minLessons: number } | { unitSlug: string };

export const BOT_UNLOCK_RULES: Record<BotUnlockId, BotUnlockRule> = {
  learner: { minLessons: 0 },
  club: { minLessons: 8 },
  strong: { minLessons: 30 },
  // "Beat the club player with the Italian" after the Italian / Ruy Lopez unit.
  italian_challenge: { unitSlug: "ch-deep-italian-ruy" },
};

export type BotUnlockState = { unlocked: boolean; progress: number; required: number; unitSlug?: string };

export type ChessProgressForUnlocks = {
  /** Completed lessons in the chess course. */
  completedLessons: number;
  /** Chess units whose every lesson is completed. */
  completedUnitSlugs: readonly string[];
  /** Admins see every personality (e2e and support). */
  isAdmin?: boolean;
};

export function botUnlocks(p: ChessProgressForUnlocks): Record<BotUnlockId, BotUnlockState> {
  const out = {} as Record<BotUnlockId, BotUnlockState>;
  for (const id of Object.keys(BOT_UNLOCK_RULES) as BotUnlockId[]) {
    const rule = BOT_UNLOCK_RULES[id];
    if ("minLessons" in rule) {
      const progress = Math.min(p.completedLessons, rule.minLessons);
      out[id] = { unlocked: Boolean(p.isAdmin) || p.completedLessons >= rule.minLessons, progress, required: rule.minLessons };
    } else {
      const done = p.completedUnitSlugs.includes(rule.unitSlug);
      out[id] = { unlocked: Boolean(p.isAdmin) || done, progress: done ? 1 : 0, required: 1, unitSlug: rule.unitSlug };
    }
  }
  return out;
}

/** Bot level name used by games → unlock id (other levels, e.g. tablebase, are not gated). */
export function botLevelUnlockId(level: string): BotUnlockId | null {
  return level === "learner" || level === "club" || level === "strong" ? level : null;
}
