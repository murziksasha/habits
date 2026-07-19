import {
  FREE_HEARTS,
  FREE_LESSONS_PER_COURSE,
  FREE_RATED_CHESS_PER_DAY,
  HEART_REGEN_MINUTES,
} from "./courses.js";

export type Plan = "free" | "premium";

export function canAccessLesson(opts: {
  plan: Plan;
  lessonIndexInCourse: number; // 0-based order among published lessons
}): boolean {
  if (opts.plan === "premium") return true;
  return opts.lessonIndexInCourse < FREE_LESSONS_PER_COURSE;
}

export function maxHearts(plan: Plan): number {
  return plan === "premium" ? 999 : FREE_HEARTS;
}

/** Regen hearts based on elapsed time since last update */
export function regenerateHearts(opts: {
  plan: Plan;
  hearts: number;
  heartsUpdatedAt: Date | string | null | undefined;
  now?: Date;
}): { hearts: number; heartsUpdatedAt: Date; changed: boolean } {
  const now = opts.now ?? new Date();
  const max = maxHearts(opts.plan);
  if (opts.plan === "premium") {
    return { hearts: max, heartsUpdatedAt: now, changed: opts.hearts !== max };
  }
  let hearts = Math.min(max, Math.max(0, opts.hearts));
  const updatedAt = opts.heartsUpdatedAt ? new Date(opts.heartsUpdatedAt) : now;
  if (hearts >= max) {
    return { hearts: max, heartsUpdatedAt: updatedAt, changed: false };
  }
  const elapsedMs = now.getTime() - updatedAt.getTime();
  const regenMs = HEART_REGEN_MINUTES * 60 * 1000;
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
  if (opts.plan === "premium") return true;
  return opts.hearts > 0;
}

export function canPlayRatedChess(opts: {
  plan: Plan;
  ratedGamesToday: number;
}): boolean {
  if (opts.plan === "premium") return true;
  return opts.ratedGamesToday < FREE_RATED_CHESS_PER_DAY;
}

export function canUseUnlimitedHints(plan: Plan): boolean {
  return plan === "premium";
}

export const FREE_HINTS_PER_DAY = 3;
