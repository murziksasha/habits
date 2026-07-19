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
