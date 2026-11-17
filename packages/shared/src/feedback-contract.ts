/**
 * Evaluation and Feedback Contract (SPEC Wave 1).
 * Distinguishes conceptual knowledge gaps, partial solutions, valid alternatives,
 * and environment/platform errors (which waive mistake penalties).
 */

export const FEEDBACK_CATEGORIES = [
  "knowledge_gap",
  "incomplete",
  "accepted_alternative",
  "environment_error",
] as const;

export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export interface EvaluationCriterion {
  id: string;
  titleUk: string;
  titleEn: string;
  passed: boolean;
  category?: FeedbackCategory;
  messageUk?: string;
  messageEn?: string;
  penaltyWaived?: boolean;
}

export interface DetailedFeedback {
  category: FeedbackCategory;
  passed: boolean;
  headlineUk: string;
  headlineEn: string;
  explanationUk: string;
  explanationEn: string;
  suggestedActionUk?: string;
  suggestedActionEn?: string;
  criteria: EvaluationCriterion[];
  isEnvironmentIssue: boolean;
  penaltyWaived: boolean;
}

export interface BuildFeedbackInput {
  passed: boolean;
  category?: FeedbackCategory;
  rawError?: string;
  failedCriteria?: Array<{
    id: string;
    titleUk: string;
    titleEn: string;
    messageUk?: string;
    messageEn?: string;
  }>;
  passedCriteria?: Array<{
    id: string;
    titleUk: string;
    titleEn: string;
  }>;
}

/**
 * Build structured feedback categorizing failure modes.
 */
export function buildDetailedFeedback(input: BuildFeedbackInput): DetailedFeedback {
  const { passed, rawError = "", failedCriteria = [], passedCriteria = [] } = input;

  let category: FeedbackCategory = input.category ?? (passed ? "accepted_alternative" : "knowledge_gap");

  // Detect environment errors if not explicitly categorized
  if (!passed && !input.category) {
    const lower = rawError.toLowerCase();
    if (
      lower.includes("timeout") ||
      lower.includes("econnrefused") ||
      lower.includes("killed") ||
      lower.includes("sigkill") ||
      lower.includes("container exited") ||
      lower.includes("judge_offline") ||
      lower.includes("internal error")
    ) {
      category = "environment_error";
    } else if (failedCriteria.length > 0 && passedCriteria.length > 0) {
      category = "incomplete";
    }
  }

  const isEnvironmentIssue = category === "environment_error";
  const penaltyWaived = isEnvironmentIssue || category === "accepted_alternative";

  const allCriteria: EvaluationCriterion[] = [
    ...passedCriteria.map((c) => ({
      id: c.id,
      titleUk: c.titleUk,
      titleEn: c.titleEn,
      passed: true,
    })),
    ...failedCriteria.map((c) => ({
      id: c.id,
      titleUk: c.titleUk,
      titleEn: c.titleEn,
      passed: false,
      category,
      messageUk: c.messageUk,
      messageEn: c.messageEn,
      penaltyWaived,
    })),
  ];

  let headlineUk = "";
  let headlineEn = "";
  let explanationUk = "";
  let explanationEn = "";

  switch (category) {
    case "environment_error":
      headlineUk = "Збій середовища виконання";
      headlineEn = "Runtime Environment Issue";
      explanationUk =
        "Виконання зупинилося через збій середовища або таймаут. Це не зараховується як ваша помилка; штраф скасовано.";
      explanationEn =
        "Execution stopped due to an environment timeout or container error. This does not count as a learner mistake; penalties are waived.";
      break;
    case "incomplete":
      headlineUk = "Часткове виконання";
      headlineEn = "Incomplete Solution";
      explanationUk = "Основна логіка працює, але пропущено граничні випадки або деякі вимоги завдання.";
      explanationEn = "The core logic works, but edge cases or remaining task requirements were missed.";
      break;
    case "accepted_alternative":
      headlineUk = passed ? "Завдання виконано успішно" : "Альтернативне рішення";
      headlineEn = passed ? "Successfully Solved" : "Alternative Solution";
      explanationUk = "Рішення відповідає поставленим вимогам або допустимим варіаціям.";
      explanationEn = "The solution matches task requirements or an accepted alternative idiom.";
      break;
    case "knowledge_gap":
    default:
      headlineUk = passed ? "Завдання виконано" : "Помилка в концепції або синтаксисі";
      headlineEn = passed ? "Completed" : "Conceptual or Syntax Issue";
      explanationUk = passed
        ? "Всі перевірки пройдено."
        : "Рішення не відповідає очікуваному результату. Ознайомтеся з підказкою або перевірте формулювання.";
      explanationEn = passed
        ? "All criteria satisfied."
        : "The solution output diverges from expected. Check the hints or verify the task constraints.";
      break;
  }

  return {
    category,
    passed,
    headlineUk,
    headlineEn,
    explanationUk,
    explanationEn,
    criteria: allCriteria,
    isEnvironmentIssue,
    penaltyWaived,
  };
}
