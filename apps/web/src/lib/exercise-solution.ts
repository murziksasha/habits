/**
 * Format a human-readable solution for reveal-after-skip UX.
 */

export type SolutionExercise = {
  type: string;
  promptUk?: string;
  promptEn?: string;
  options?: string[];
  correctIndex?: number;
  accepted?: string[];
  correct?: string[];
  lines?: string[];
  explanationUk?: string;
  explanationEn?: string;
  hintUk?: string;
  hintEn?: string;
  solutionUk?: string;
  solutionEn?: string;
  checks?: { fileId: string; contains: string[] }[];
  [key: string]: unknown;
};

export function formatExerciseSolution(
  exercise: SolutionExercise,
  locale: "uk" | "en" = "uk",
): string | null {
  const explicit =
    locale === "en"
      ? exercise.solutionEn || exercise.solutionUk
      : exercise.solutionUk || exercise.solutionEn;
  if (explicit && String(explicit).trim()) return String(explicit).trim();

  const explanation =
    locale === "en"
      ? exercise.explanationEn || exercise.explanationUk
      : exercise.explanationUk || exercise.explanationEn;

  if (
    exercise.type === "mcq" ||
    exercise.type === "logic_puzzle" ||
    exercise.type === "code_read" ||
    (exercise.type === "code_output" && Array.isArray(exercise.options))
  ) {
    const idx = exercise.correctIndex;
    const options = exercise.options ?? [];
    if (typeof idx === "number" && options[idx] != null) {
      const base = options[idx]!;
      return explanation ? `${base}\n\n${explanation}` : base;
    }
  }

  if (exercise.type === "code_fill" || exercise.type === "code_output") {
    const accepted = exercise.accepted ?? [];
    if (accepted.length) {
      const body = accepted.join("  |  ");
      return explanation ? `${body}\n\n${explanation}` : body;
    }
  }

  if (exercise.type === "code_order" || exercise.type === "order_words") {
    const correct = exercise.correct ?? exercise.lines ?? [];
    if (correct.length) {
      const body = correct.join("\n");
      return explanation ? `${body}\n\n${explanation}` : body;
    }
  }

  if (exercise.type === "code_project") {
    const checks = exercise.checks ?? [];
    if (checks.length) {
      const lines = checks.map(
        (c) => `${c.fileId}: ${c.contains.join(", ")}`,
      );
      const body = lines.join("\n");
      return explanation ? `${body}\n\n${explanation}` : body;
    }
  }

  if (exercise.type === "code_run") {
    const tests = (exercise.tests as { stdout?: string }[]) ?? [];
    const outs = tests.map((t) => t.stdout).filter(Boolean);
    if (outs.length) {
      const body = outs.map((o, i) => `test${i + 1}: ${o}`).join("\n");
      return explanation ? `${body}\n\n${explanation}` : body;
    }
  }

  if (explanation && String(explanation).trim()) return String(explanation).trim();
  return null;
}

/** Best-effort answer to auto-fill editors (code_fill / order / mcq). */
export function getApplyableAnswer(exercise: SolutionExercise): unknown | null {
  if (
    exercise.type === "mcq" ||
    exercise.type === "logic_puzzle" ||
    exercise.type === "code_read" ||
    (exercise.type === "code_output" &&
      Array.isArray(exercise.options) &&
      exercise.correctIndex != null)
  ) {
    return typeof exercise.correctIndex === "number" ? exercise.correctIndex : null;
  }
  if (exercise.type === "code_fill" || exercise.type === "code_output") {
    const a = exercise.accepted?.[0];
    return a != null ? String(a) : null;
  }
  if (exercise.type === "code_order" || exercise.type === "order_words") {
    const c = exercise.correct ?? exercise.lines;
    return c?.length ? [...c] : null;
  }
  if (exercise.type === "code_run") {
    const sol =
      exercise.solutionEn ||
      exercise.solutionUk ||
      (exercise as { starter?: string }).starter;
    return sol ? { source: String(sol) } : null;
  }
  return null;
}
