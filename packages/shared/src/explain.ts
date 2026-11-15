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

/** A token counts at most twice, so repeating one keyword cannot fill minWords. */
function cappedWordCount(tokens: string[]): number {
  const seen = new Map<string, number>();
  let count = 0;
  for (const token of tokens) {
    const used = seen.get(token) ?? 0;
    if (used >= 2) continue;
    seen.set(token, used + 1);
    count += 1;
  }
  return count;
}

function stemTokenSet(ideas: ExplainKeyIdea[]): Set<string> {
  const stems = new Set<string>();
  for (const idea of ideas) {
    for (const raw of idea.anyOf) {
      for (const part of normalizeExplainText(raw).split(" ")) {
        if (part) stems.add(part);
      }
    }
  }
  return stems;
}

export function gradeExplanation(
  text: string,
  rubric: { keyIdeas: ExplainKeyIdea[]; minWords?: number; passRatio?: number },
): ExplainGrade {
  const norm = normalizeExplainText(text);
  const rawTokens = norm ? norm.split(" ").filter(Boolean) : [];
  const words = cappedWordCount(rawTokens);
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
  const stems = stemTokenSet(ideas);
  const otherWords = cappedWordCount(rawTokens.filter((token) => !stems.has(token)));
  const minOther = ideas.length ? Math.max(4, Math.ceil(minWords * 0.45)) : minWords;
  const ratio = ideas.length ? matched.length / ideas.length : words >= minWords ? 1 : 0;
  const keywordPadding = otherWords < minOther;
  const tooShort = words < minWords || keywordPadding;
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
