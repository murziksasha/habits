/** Max streak freezes (shields) a character can hold. */
export const MAX_STREAK_FREEZES = 5;

/** XP cost for a 3-pack of shields (cheaper than 3×80). */
export const STREAK_SHIELD_PACK_COST = 200;
export const STREAK_SHIELD_PACK_COUNT = 3;

export type StreakApplyInput = {
  lastActiveDate: string | null | undefined;
  /** ISO date YYYY-MM-DD */
  today: string;
  streakDays: number;
  streakFreezes: number;
};

export type StreakApplyResult = {
  streakDays: number;
  streakFreezes: number;
  /** Shield consumed to protect streak after a gap */
  protected: boolean;
  /** Streak was reset to 1 (missed without shield) */
  reset: boolean;
  /** Same calendar day — no streak change */
  sameDay: boolean;
};

/**
 * Duolingo-style streak update when user becomes active on `today`.
 * - Same day: unchanged
 * - Yesterday: streak + 1
 * - Older + freezes > 0: keep streak (min 1), consume 1 freeze
 * - Older + no freezes: reset to 1
 */
export function applyStreakOnActivity(input: StreakApplyInput): StreakApplyResult {
  const streakDays = Math.max(0, input.streakDays ?? 0);
  const freezes = Math.max(0, input.streakFreezes ?? 0);
  const last = input.lastActiveDate ?? null;
  const today = input.today;

  if (last === today) {
    return {
      streakDays,
      streakFreezes: freezes,
      protected: false,
      reset: false,
      sameDay: true,
    };
  }

  const yesterday = dateMinusDays(today, 1);

  if (last === yesterday) {
    return {
      streakDays: streakDays + 1,
      streakFreezes: freezes,
      protected: false,
      reset: false,
      sameDay: false,
    };
  }

  // First activity ever
  if (!last) {
    return {
      streakDays: Math.max(1, streakDays || 1),
      streakFreezes: freezes,
      protected: false,
      reset: false,
      sameDay: false,
    };
  }

  // Missed one or more days
  if (freezes > 0) {
    return {
      streakDays: Math.max(1, streakDays),
      streakFreezes: freezes - 1,
      protected: true,
      reset: false,
      sameDay: false,
    };
  }

  return {
    streakDays: 1,
    streakFreezes: 0,
    protected: false,
    reset: true,
    sameDay: false,
  };
}

/** Add freezes with hard cap. */
export function addStreakFreezes(current: number, add: number): number {
  return Math.min(MAX_STREAK_FREEZES, Math.max(0, current) + Math.max(0, add));
}

function dateMinusDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}
