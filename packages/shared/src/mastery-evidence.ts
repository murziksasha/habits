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

/**
 * Lesson submit evidence. Acknowledged theory cards do not prove a skill.
 * Hints, a revealed solution, and earlier wrong tries cap the result at assisted.
 */
export function evidenceForLessonSubmit(input: {
  exercises: { id: string; type: string; check?: unknown }[];
  results: { exerciseId: string; type: string; correct: boolean; partial?: number }[];
  answers: {
    exerciseId: string;
    hintsUsed?: number;
    solutionRevealed?: boolean;
    wrongAttempts?: number;
  }[];
  passed: boolean;
  passThreshold: number;
  isExam: boolean;
  isFirstAttempt: boolean;
  daysSinceFirstVerification?: number;
  priorEvidenceLevel?: MasteryEvidenceLevel;
  usedHint?: boolean;
}): MasteryEvidenceLevel {
  const skill = input.exercises.filter((exercise) => {
    const type = exercise.type.toLowerCase();
    if (NON_EVALUATIVE_EXERCISE_KINDS.has(type)) return false;
    if (type === "concept" && exercise.check == null) return false;
    return true;
  });
  const prior = input.priorEvidenceLevel ?? "insufficient_data";
  if (skill.length === 0) return prior;

  const byId = new Map(input.results.map((row) => [row.exerciseId, row]));
  let score = 0;
  for (const exercise of skill) {
    const row = byId.get(exercise.id);
    if (!row) continue;
    if (typeof row.partial === "number") score += Math.min(1, Math.max(0, row.partial));
    else if (row.correct) score += 1;
  }
  const accuracy = score / skill.length;
  const skillIds = new Set(skill.map((exercise) => exercise.id));
  const answers = input.answers.filter((answer) => skillIds.has(answer.exerciseId));
  const hintsUsed =
    answers.reduce((sum, answer) => sum + Math.max(0, Math.floor(answer.hintsUsed ?? 0)), 0) +
    (input.usedHint ? 1 : 0);
  const solutionRevealed = answers.some((answer) => Boolean(answer.solutionRevealed));
  const wrongAttempts = answers.reduce(
    (sum, answer) => sum + Math.max(0, Math.floor(answer.wrongAttempts ?? 0)),
    0,
  );
  const skillPassed = accuracy + 1e-9 >= input.passThreshold;

  return evaluateMasteryEvidence({
    exerciseKind: input.isExam ? "unit_exam" : "practice",
    isFirstAttempt: input.isFirstAttempt,
    firstCheckPassed: skillPassed && wrongAttempts === 0,
    hintsUsed,
    solutionRevealed,
    verificationMethod: input.isExam ? "unit_exam" : "lesson",
    daysSinceFirstVerification: input.daysSinceFirstVerification ?? 0,
    priorEvidenceLevel: prior,
    correct: input.passed && skillPassed,
  });
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
