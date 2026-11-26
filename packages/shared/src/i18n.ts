/**
 * UI strings: public API (unchanged). The dictionaries live in ./i18n/<locale>.ts
 * so the web client can import only the active locale
 * (`@eduforge/shared/i18n/uk`, `@eduforge/shared/i18n/en`); server code and
 * tests keep using getUI().
 */
import { DEFAULT_LOCALE, type AppLocale } from "./i18n/locales.js";
import { uk, type UiDict } from "./i18n/uk.js";
import { en } from "./i18n/en.js";

export { LOCALES, DEFAULT_LOCALE, isAppLocale, type AppLocale } from "./i18n/locales.js";
export type { UiDict } from "./i18n/uk.js";

const dict: Record<AppLocale, UiDict> = { uk, en };

/** Default UI strings (Ukrainian) — backward compatible */
export const UI: UiDict = uk;

export const APP_LOCALE = DEFAULT_LOCALE;

export function getUI(locale: AppLocale = DEFAULT_LOCALE): UiDict {
  return dict[locale] ?? uk;
}
