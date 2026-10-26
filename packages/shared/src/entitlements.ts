import {
  FREE_HEARTS,
  FREE_LESSONS_PER_COURSE,
  FREE_RATED_CHESS_PER_DAY,
  HEART_REGEN_MINUTES,
} from './courses.js';
import {
  ironWillHeartsBonus,
  type CharacterProgression,
} from './character.js';

export type Plan = 'free' | 'premium' | 'family';

/** Premium-tier entitlements: personal premium or family plan. */
export function isPaidPlan(plan: Plan | string): boolean {
  return plan === 'premium' || plan === 'family';
}

/** Every lesson is accessible to every user regardless of plan. */
export function canAccessLesson(_opts?: {
  plan?: Plan;
  lessonIndexInCourse?: number;
}): boolean {
  return true;
}

/** Free: 5 base (+ Iron Will synergy). Premium/family: unlimited. */
export function maxHearts(
  plan: Plan,
  progression?: CharacterProgression | null,
): number {
  if (isPaidPlan(plan)) return 999;
  const bonus = progression ? ironWillHeartsBonus(progression) : 0;
  return FREE_HEARTS + bonus;
}

/** Regen hearts based on elapsed time since last update */
export function regenerateHearts(opts: {
  plan: Plan;
  hearts: number;
  heartsUpdatedAt: Date | string | null | undefined;
  now?: Date;
  /** Override interval minutes (e.g. vitality talent). Min 10. */
  regenMinutes?: number;
  progression?: CharacterProgression | null;
}): { hearts: number; heartsUpdatedAt: Date; changed: boolean } {
  const now = opts.now ?? new Date();
  const max = maxHearts(opts.plan, opts.progression);
  if (isPaidPlan(opts.plan)) {
    return {
      hearts: max,
      heartsUpdatedAt: now,
      changed: opts.hearts !== max,
    };
  }
  let hearts = Math.min(max, Math.max(0, opts.hearts));
  const updatedAt = opts.heartsUpdatedAt
    ? new Date(opts.heartsUpdatedAt)
    : now;
  if (hearts >= max) {
    return {
      hearts: max,
      heartsUpdatedAt: updatedAt,
      changed: false,
    };
  }
  const elapsedMs = now.getTime() - updatedAt.getTime();
  const minutes = Math.max(
    10,
    opts.regenMinutes ?? HEART_REGEN_MINUTES,
  );
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

/** Starting a lesson is always allowed for all users. */
export function canStartLesson(_opts?: {
  plan?: Plan;
  hearts?: number;
}): boolean {
  return true;
}

/** Playing rated chess is always allowed for all users. */
export function canPlayRatedChess(_opts?: {
  plan?: Plan;
  ratedGamesToday?: number;
}): boolean {
  return true;
}

export function canUseUnlimitedHints(_plan?: Plan): boolean {
  return true;
}

export const FREE_HINTS_PER_DAY = Infinity;

/** Single source of entitlements for API, UI (all unlimited in free EduForge). */
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
    freeLessonsPerCourse: Infinity,
    freeHearts: 999,
    heartRegenMinutes: 0,
    freeRatedChessPerDay: Infinity,
    freeHintsPerDay: Infinity,
    trialDays: 0,
    demoUpgradeDays: 0,
  };
}

export type PlanFeatureRow = {
  id: string;
  free: string | boolean | number;
  premium: string | boolean | number;
};

/** All features unlimited for every user. */
export function planFeatureMatrix(): PlanFeatureRow[] {
  return [
    { id: 'lessons', free: 'unlimited', premium: 'unlimited' },
    { id: 'hearts', free: 'unlimited', premium: 'unlimited' },
    { id: 'heartRegen', free: 'n/a', premium: 'n/a' },
    { id: 'ratedChess', free: 'unlimited', premium: 'unlimited' },
    { id: 'hints', free: 'unlimited', premium: 'unlimited' },
    { id: 'tutor', free: 'unlimited', premium: 'unlimited' },
  ];
}

export function isPremiumActive(opts: {
  plan: Plan;
  planExpiresAt?: Date | string | null;
  now?: Date;
}): boolean {
  if (!isPaidPlan(opts.plan)) return false;
  if (!opts.planExpiresAt) return true;
  const exp = new Date(opts.planExpiresAt).getTime();
  return exp > (opts.now ?? new Date()).getTime();
}

/** Default child seats for family plan owner */
export const FAMILY_DEFAULT_SEATS = 4;
