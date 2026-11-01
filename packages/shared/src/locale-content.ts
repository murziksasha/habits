import type { AppLocale } from "./i18n.js";

/** Pick localized string with UK fallback */
export function pickLocale(
  locale: AppLocale | string | undefined,
  uk: string,
  en?: string | null,
): string {
  if (locale === "en" && en && en.trim()) return en;
  return uk || en || "";
}

export function localizeCourseTitle(
  locale: AppLocale | string | undefined,
  row: { titleUk: string; titleEn?: string | null },
): string {
  return pickLocale(locale, row.titleUk, row.titleEn);
}

export function localizeCourseDescription(
  locale: AppLocale | string | undefined,
  row: { descriptionUk: string; descriptionEn?: string | null },
): string {
  return pickLocale(locale, row.descriptionUk, row.descriptionEn);
}

/** Exercise prompt by locale */
export function exercisePrompt(
  locale: AppLocale | string | undefined,
  ex: { promptUk?: string; promptEn?: string; [k: string]: unknown },
): string {
  return pickLocale(locale, String(ex.promptUk ?? ""), ex.promptEn as string | undefined);
}

type ChoiceExercise = {
  options?: string[];
  optionsEn?: string[];
};

/**
 * Labels for a choice exercise. The returned array keeps canonical indexes:
 * the graded answer is still `correctIndex`, never the translated string.
 */
export function localizeExerciseOptions(
  locale: AppLocale | string | undefined,
  ex: ChoiceExercise,
): string[] {
  const options = ex.options ?? [];
  if (
    locale === "en" &&
    ex.optionsEn &&
    ex.optionsEn.length === options.length &&
    ex.optionsEn.every((s) => s.trim().length > 0)
  ) {
    return ex.optionsEn;
  }
  return options;
}

export type CanonicalPair = { left: string; right: string };

/**
 * Match pairs for display. `left` / `right` stay the canonical graded values.
 * `labelLeft` / `labelRight` are what the learner reads.
 */
export function localizeMatchPairs(
  locale: AppLocale | string | undefined,
  ex: { pairs?: CanonicalPair[]; pairsEn?: CanonicalPair[] },
): (CanonicalPair & { labelLeft: string; labelRight: string })[] {
  const pairs = ex.pairs ?? [];
  const useEn =
    locale === "en" &&
    ex.pairsEn &&
    ex.pairsEn.length === pairs.length &&
    ex.pairsEn.every((p) => p.left.trim() && p.right.trim());
  return pairs.map((p, i) => {
    const label = useEn ? ex.pairsEn![i]! : p;
    return { left: p.left, right: p.right, labelLeft: label.left, labelRight: label.right };
  });
}
