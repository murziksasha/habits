/** Default accuracy required to pass a unit exam (0..1). */
export const DEFAULT_EXAM_PASS_THRESHOLD = 0.7;

/** Resolve pass bar for an exam lesson. */
export function examPassThreshold(passThreshold?: number | null): number {
  if (passThreshold == null || Number.isNaN(passThreshold)) {
    return DEFAULT_EXAM_PASS_THRESHOLD;
  }
  return Math.min(1, Math.max(0, passThreshold));
}

/** Whether accuracy is enough to complete an exam. */
export function examPassed(
  accuracy: number,
  passThreshold?: number | null,
): boolean {
  return accuracy + 1e-9 >= examPassThreshold(passThreshold);
}

/**
 * Completion bar for a lesson:
 * - normal lessons: 0.5 (existing product rule)
 * - exams: passThreshold (default 0.7)
 */
export function lessonCompleteThreshold(opts: {
  isExam?: boolean | null;
  passThreshold?: number | null;
}): number {
  if (opts.isExam) return examPassThreshold(opts.passThreshold);
  return 0.5;
}

export const EXAM_VARIANTS = ["variant_A", "variant_B", "variant_C"] as const;
export type ExamVariantId = (typeof EXAM_VARIANTS)[number];

/**
 * Deterministically resolve a stable exam variant for a learner and lesson attempt.
 * Locks during the attempt and rotates across retries to prevent fixed memorization.
 */
export function resolveExamVariantId(
  userId: string,
  lessonId: string,
  attemptNumber = 0,
): ExamVariantId {
  let hash = 0;
  const str = `${userId}:${lessonId}:attempt_${attemptNumber}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  const idx = hash % EXAM_VARIANTS.length;
  return EXAM_VARIANTS[idx] ?? "variant_A";
}

/**
 * Transfer check retention thresholds (SPEC Wave 3):
 * 7-day initial transfer check, 30-day mastery consolidation check.
 */
export const TRANSFER_CHECK_INTERVAL_DAYS = [7, 30] as const;

export function isTransferCheckDue(
  lastVerifiedAt: Date | string | null,
  now = new Date(),
): { due: boolean; interval: 7 | 30 | null } {
  if (!lastVerifiedAt) return { due: false, interval: null };
  const verifiedTime = new Date(lastVerifiedAt).getTime();
  const elapsedDays = Math.floor((now.getTime() - verifiedTime) / 86_400_000);

  if (elapsedDays >= 30) {
    return { due: true, interval: 30 };
  }
  if (elapsedDays >= 7) {
    return { due: true, interval: 7 };
  }
  return { due: false, interval: null };
}
