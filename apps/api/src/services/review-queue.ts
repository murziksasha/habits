/**
 * Pure helpers for review inbox reasons (why a lesson is in the queue).
 */

export type ReviewReasonCode =
  | "low_mastery"
  | "many_attempts"
  | "leech"
  | "exam_related"
  | "incomplete_progress";

export type ReviewReason = {
  code: ReviewReasonCode;
  labelUk: string;
  labelEn: string;
};

export function buildReviewReasons(input: {
  bestScore: number;
  attempts: number;
  status: string;
  threshold?: number;
  leech?: boolean;
  examCourseMatch?: boolean;
}): ReviewReason[] {
  const threshold = input.threshold ?? 0.85;
  const reasons: ReviewReason[] = [];
  const score = input.bestScore ?? 0;
  const attempts = input.attempts ?? 0;

  if (score < threshold) {
    reasons.push({
      code: "low_mastery",
      labelUk: `Майстерність ${Math.round(score * 100)}% (поріг ${Math.round(threshold * 100)}%)`,
      labelEn: `Mastery ${Math.round(score * 100)}% (threshold ${Math.round(threshold * 100)}%)`,
    });
  }
  if (attempts >= 2 && score < threshold) {
    reasons.push({
      code: "many_attempts",
      labelUk: `${attempts} спроб без високої майстерності`,
      labelEn: `${attempts} attempts without high mastery`,
    });
  }
  if (input.leech || (attempts >= 4 && score < 0.7)) {
    reasons.push({
      code: "leech",
      labelUk: "Leech: часто помиляєтесь — варто повторити з підказками",
      labelEn: "Leech: frequent misses — review with hints",
    });
  }
  if (input.examCourseMatch) {
    reasons.push({
      code: "exam_related",
      labelUk: "Повʼязано з останньою контрольною",
      labelEn: "Related to last exam attempt",
    });
  }
  if (input.status !== "completed" && attempts >= 2) {
    reasons.push({
      code: "incomplete_progress",
      labelUk: "Урок ще не пройдено успішно",
      labelEn: "Lesson not completed successfully yet",
    });
  }
  if (!reasons.length) {
    reasons.push({
      code: "low_mastery",
      labelUk: "Рекомендовано до повторення",
      labelEn: "Recommended for review",
    });
  }
  return reasons;
}
