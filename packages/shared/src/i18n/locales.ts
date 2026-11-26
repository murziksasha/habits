export const LOCALES = ["uk", "en"] as const;
export type AppLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = "uk";

export function isAppLocale(v: string): v is AppLocale {
  return (LOCALES as readonly string[]).includes(v);
}
