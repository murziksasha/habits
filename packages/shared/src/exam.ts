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
