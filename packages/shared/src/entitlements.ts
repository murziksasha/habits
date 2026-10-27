import { FREE_HEARTS, HEART_REGEN_MINUTES } from './courses.js';
import {
  ironWillHeartsBonus,
  type CharacterProgression,
} from './character.js';

/** Stored on users.plan. Access does not depend on this value. */
export type Plan = 'free' | 'premium' | 'family';

/** Every lesson is accessible to every user. */
export function canAccessLesson(_opts?: {
  plan?: Plan;
  lessonIndexInCourse?: number;
}): boolean {
  return true;
}

/** Shared heart cap for every account (+ Iron Will synergy). */
export function maxHearts(
  _plan?: Plan | string,
  progression?: CharacterProgression | null,
): number {
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

/** Shared access rules. There is no paid tier. */
export type AccessMatrix = {
  lessons: 'all';
  hearts: number;
  heartRegenMinutes: number;
  ratedChessPerDay: 'unlimited';
  hintsPerDay: 'unlimited';
};

export function accessMatrix(): AccessMatrix {
  return {
    lessons: 'all',
    hearts: FREE_HEARTS,
    heartRegenMinutes: HEART_REGEN_MINUTES,
    ratedChessPerDay: 'unlimited',
    hintsPerDay: 'unlimited',
  };
}

/** Default child seats for a family group owner. */
export const FAMILY_DEFAULT_SEATS = 4;
