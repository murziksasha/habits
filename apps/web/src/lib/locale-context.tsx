"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  getUI,
  isAppLocale,
  type AppLocale,
} from "@eduforge/shared";

type LocaleState = {
  locale: AppLocale;
  setLocale: (l: AppLocale) => void;
  t: ReturnType<typeof getUI>;
};

const LocaleContext = createContext<LocaleState | null>(null);
const KEY = "eduforge_locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(DEFAULT_LOCALE);

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
    () => ({ locale, setLocale, t: getUI(locale) }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale outside provider");
  return ctx;
}
