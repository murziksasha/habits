/**
 * "Explain in your own words" exercise (SPEC 92) — deterministic rubric grading.
 * Each key idea passes when any of its `anyOf` stems appears in the learner's text.
 * The AI tutor can add qualitative feedback on top (POST /tutor/explain-feedback),
 * but the pass/fail grade stays deterministic so client and server agree offline.
 */

export type ExplainKeyIdea = {
  labelUk: string;
  labelEn?: string;
  /** Lowercase stems / phrases in UK and/or EN */
  anyOf: string[];
};

export type ExplainGrade = {
  correct: boolean;
  partial: number;
  words: number;
  matched: string[];
  missing: string[];
  tooShort: boolean;
};

export function normalizeExplainText(s: string): string {
  return String(s ?? "")
    .toLowerCase()
    .replace(/[’`ʼ]/g, "'")
    .replace(/[^\p{L}\p{N}'\s=>.()[\]{}_-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function countWords(s: string): number {
  const t = normalizeExplainText(s);
  return t ? t.split(" ").filter(Boolean).length : 0;
}

export function gradeExplanation(
  text: string,
  rubric: { keyIdeas: ExplainKeyIdea[]; minWords?: number; passRatio?: number },
): ExplainGrade {
  const norm = normalizeExplainText(text);
  const words = countWords(text);
  const minWords = Math.max(0, rubric.minWords ?? 12);
  const passRatio = Math.min(1, Math.max(0.1, rubric.passRatio ?? 0.6));
  const ideas = rubric.keyIdeas ?? [];
  const matched: string[] = [];
  const missing: string[] = [];
  for (const idea of ideas) {
    const hit = idea.anyOf.some((n) => {
      const needle = normalizeExplainText(n);
      return needle.length > 0 && norm.includes(needle);
    });
    (hit ? matched : missing).push(idea.labelEn || idea.labelUk);
  }
  const ratio = ideas.length ? matched.length / ideas.length : words >= minWords ? 1 : 0;
  const tooShort = words < minWords;
  const correct = !tooShort && ratio + 1e-9 >= passRatio;
  return {
    correct,
    partial: tooShort ? Math.min(ratio, words / Math.max(1, minWords)) : ratio,
    words,
    matched,
    missing,
    tooShort,
  };
}
