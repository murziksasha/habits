import {
  FREE_HEARTS,
  FREE_LESSONS_PER_COURSE,
  FREE_RATED_CHESS_PER_DAY,
  HEART_REGEN_MINUTES,
} from "./courses.js";

export type Plan = "free" | "premium" | "family";

/** Premium-tier entitlements: personal premium or family plan. */
export function isPaidPlan(plan: Plan | string): boolean {
  return plan === "premium" || plan === "family";
}

export function canAccessLesson(opts: {
  plan: Plan;
  lessonIndexInCourse: number; // 0-based order among published lessons
}): boolean {
  if (isPaidPlan(opts.plan)) return true;
  return opts.lessonIndexInCourse < FREE_LESSONS_PER_COURSE;
}

export function maxHearts(plan: Plan): number {
  return isPaidPlan(plan) ? 999 : FREE_HEARTS;
}

/** Regen hearts based on elapsed time since last update */
export function regenerateHearts(opts: {
  plan: Plan;
  hearts: number;
  heartsUpdatedAt: Date | string | null | undefined;
  now?: Date;
  /** Override interval minutes (e.g. vitality talent). Min 10. */
  regenMinutes?: number;
}): { hearts: number; heartsUpdatedAt: Date; changed: boolean } {
  const now = opts.now ?? new Date();
  const max = maxHearts(opts.plan);
  if (isPaidPlan(opts.plan)) {
    return { hearts: max, heartsUpdatedAt: now, changed: opts.hearts !== max };
  }
  let hearts = Math.min(max, Math.max(0, opts.hearts));
  const updatedAt = opts.heartsUpdatedAt ? new Date(opts.heartsUpdatedAt) : now;
  if (hearts >= max) {
    return { hearts: max, heartsUpdatedAt: updatedAt, changed: false };
  }
  const elapsedMs = now.getTime() - updatedAt.getTime();
  const minutes = Math.max(10, opts.regenMinutes ?? HEART_REGEN_MINUTES);
  const regenMs = minutes * 60 * 1000;
  const gained = Math.floor(elapsedMs / regenMs);
  if (gained <= 0) {
    return { hearts, heartsUpdatedAt: updatedAt, changed: false };
  }
  const next = Math.min(max, hearts + gained);
  const consumed = gained * regenMs;
  const nextUpdated = new Date(updatedAt.getTime() + consumed);
  return {
    hearts: next,
    heartsUpdatedAt: next >= max ? now : nextUpdated,
    changed: next !== hearts,
  };
}

export function canStartLesson(opts: { plan: Plan; hearts: number }): boolean {
  if (isPaidPlan(opts.plan)) return true;
  return opts.hearts > 0;
}

export function canPlayRatedChess(opts: {
  plan: Plan;
  ratedGamesToday: number;
}): boolean {
  if (isPaidPlan(opts.plan)) return true;
  return opts.ratedGamesToday < FREE_RATED_CHESS_PER_DAY;
}

export function canUseUnlimitedHints(plan: Plan): boolean {
  return isPaidPlan(plan);
}

export const FREE_HINTS_PER_DAY = 3;

/** Single source of freemium limits for API, pricing UI, paywalls. */
export type FreemiumMatrix = {
  freeLessonsPerCourse: number;
  freeHearts: number;
  heartRegenMinutes: number;
  freeRatedChessPerDay: number;
  freeHintsPerDay: number;
  trialDays: number;
  demoUpgradeDays: number;
};

export function freemiumMatrix(): FreemiumMatrix {
  return {
    freeLessonsPerCourse: FREE_LESSONS_PER_COURSE,
    freeHearts: FREE_HEARTS,
    heartRegenMinutes: HEART_REGEN_MINUTES,
    freeRatedChessPerDay: FREE_RATED_CHESS_PER_DAY,
    freeHintsPerDay: FREE_HINTS_PER_DAY,
    trialDays: 7,
    demoUpgradeDays: 30,
  };
}

export type PlanFeatureRow = {
  id: string;
  free: string | boolean | number;
  premium: string | boolean | number;
};

/** Comparable feature matrix for pricing tables (locale-agnostic values). */
export function planFeatureMatrix(): PlanFeatureRow[] {
  const m = freemiumMatrix();
  return [
    { id: "lessons", free: m.freeLessonsPerCourse, premium: "unlimited" },
    { id: "hearts", free: m.freeHearts, premium: "unlimited" },
    { id: "heartRegen", free: `${m.heartRegenMinutes}m`, premium: "n/a" },
    { id: "ratedChess", free: m.freeRatedChessPerDay, premium: "unlimited" },
    { id: "hints", free: m.freeHintsPerDay, premium: "unlimited" },
    { id: "tutor", free: "limited", premium: "priority" },
  ];
}

export function isPremiumActive(opts: {
  plan: Plan;
  planExpiresAt?: Date | string | null;
  now?: Date;
}): boolean {
  if (!isPaidPlan(opts.plan)) return false;
  if (!opts.planExpiresAt) return true; // lifetime / stripe open-ended
  const exp = new Date(opts.planExpiresAt).getTime();
  return exp > (opts.now ?? new Date()).getTime();
}

/** Default child seats for family plan owner */
export const FAMILY_DEFAULT_SEATS = 4;
