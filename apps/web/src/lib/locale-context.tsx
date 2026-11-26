"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_LOCALE, isAppLocale, type AppLocale } from "@eduforge/shared/i18n/locales";
// Only the default locale ships in the initial bundle; English is fetched on demand.
import { uk, type UiDict } from "@eduforge/shared/i18n/uk";

type LocaleState = {
  locale: AppLocale;
  setLocale: (l: AppLocale) => void;
  t: UiDict;
};

const loaded: Partial<Record<AppLocale, UiDict>> = { uk };

async function loadDict(l: AppLocale): Promise<UiDict> {
  const hit = loaded[l];
  if (hit) return hit;
  const mod = await import("@eduforge/shared/i18n/en");
  loaded.en = mod.en;
  return mod.en;
}

const LocaleContext = createContext<LocaleState | null>(null);
const KEY = "eduforge_locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(DEFAULT_LOCALE);
  const [dict, setDict] = useState<UiDict>(uk);

  // Switch strings once the dictionary for the chosen locale is available.
  useEffect(() => {
    let alive = true;
    void loadDict(locale).then((d) => {
      if (alive) setDict(d);
    });
    return () => {
      alive = false;
    };
  }, [locale]);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored && isAppLocale(stored)) setLocaleState(stored);
    document.documentElement.lang = stored && isAppLocale(stored) ? stored : DEFAULT_LOCALE;
  }, []);

  const setLocale = useCallback((l: AppLocale) => {
    setLocaleState(l);
    localStorage.setItem(KEY, l);
    document.documentElement.lang = l;
  }, []);

  const value = useMemo(
    // Until the requested dictionary arrives, keep showing the one we have.
    () => ({ locale, setLocale, t: dict }),
    [locale, setLocale, dict],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale outside provider");
  return ctx;
}
