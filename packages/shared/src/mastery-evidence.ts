/**
 * Mastery Evidence Model (SPEC Wave 1).
 * Separates mere completion from proven, verified autonomous capability.
 * Invariant: Theory, video, and RSVP formats do not grant mastery evidence.
 */

export const MASTERY_EVIDENCE_LEVELS = [
  "insufficient_data",
  "assisted",
  "self_verified",
  "retained_verified",
] as const;

export type MasteryEvidenceLevel = (typeof MASTERY_EVIDENCE_LEVELS)[number];

export interface EvaluateEvidenceInput {
  exerciseKind?: string;
  isFirstAttempt: boolean;
  firstCheckPassed: boolean;
  hintsUsed: number;
  solutionRevealed: boolean;
  verificationMethod?: "lesson" | "self_verify" | "srs_review" | "transfer_check" | "unit_exam";
  daysSinceFirstVerification?: number;
  priorEvidenceLevel?: MasteryEvidenceLevel;
  correct: boolean;
}

/** Exercise kinds that cannot grant mastery evidence under any circumstance. */
export const NON_EVALUATIVE_EXERCISE_KINDS = new Set([
  "theory",
  "reading",
  "video",
  "rsvp",
  "intro",
  "overview",
]);

/**
 * Determine the evidence level awarded from an exercise attempt or verification session.
 */
export function evaluateMasteryEvidence(input: EvaluateEvidenceInput): MasteryEvidenceLevel {
  const {
    exerciseKind = "",
    firstCheckPassed,
    hintsUsed,
    solutionRevealed,
    verificationMethod = "lesson",
    daysSinceFirstVerification = 0,
    priorEvidenceLevel = "insufficient_data",
    correct,
  } = input;

  // Theory, reading, video, and RSVP never produce mastery evidence.
  if (NON_EVALUATIVE_EXERCISE_KINDS.has(exerciseKind.toLowerCase())) {
    return priorEvidenceLevel;
  }

  // If the answer was incorrect, no mastery evidence is gained.
  if (!correct) {
    return priorEvidenceLevel === "insufficient_data" ? "insufficient_data" : priorEvidenceLevel;
  }

  // If the user looked at the official solution or used hints, it is assisted at best.
  if (solutionRevealed || hintsUsed > 0 || !firstCheckPassed) {
    if (priorEvidenceLevel === "self_verified" || priorEvidenceLevel === "retained_verified") {
      return priorEvidenceLevel; // Retain past verified achievement
    }
    return "assisted";
  }

  // Passed cleanly on the first check without hints or solution reveal.
  // Check for retained verification (>= 7 days transfer or explicit transfer/srs check).
  if (
    priorEvidenceLevel === "self_verified" &&
    (daysSinceFirstVerification >= 7 || verificationMethod === "transfer_check" || verificationMethod === "srs_review")
  ) {
    return "retained_verified";
  }

  // If already retained, retain it
  if (priorEvidenceLevel === "retained_verified") {
    return "retained_verified";
  }

  return "self_verified";
}

/** Rank mastery evidence levels numerically for comparison. */
export function masteryEvidenceRank(level: MasteryEvidenceLevel): number {
  switch (level) {
    case "retained_verified":
      return 3;
    case "self_verified":
      return 2;
    case "assisted":
      return 1;
    case "insufficient_data":
    default:
      return 0;
  }
}

/** Return Ukrainian and English human-readable labels for each evidence level. */
export function getEvidenceLevelLabels(level: MasteryEvidenceLevel): { labelUk: string; labelEn: string } {
  switch (level) {
    case "retained_verified":
      return {
        labelUk: "Підтверджено часом (Retained)",
        labelEn: "Retained & Verified",
      };
    case "self_verified":
      return {
        labelUk: "Самостійно підтверджено",
        labelEn: "Self-Verified",
      };
    case "assisted":
      return {
        labelUk: "Виконано з підказками",
        labelEn: "Assisted",
      };
    case "insufficient_data":
    default:
      return {
        labelUk: "Недостатньо даних",
        labelEn: "Insufficient Data",
      };
  }
}
