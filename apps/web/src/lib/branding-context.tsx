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
  DEFAULT_PLATFORM_THEME,
  themeToCssVars,
  type PlatformTheme,
} from "@eduforge/shared";
import { api } from "./api";

type BrandingState = {
  theme: PlatformTheme;
  loading: boolean;
  refresh: () => Promise<void>;
};

const BrandingContext = createContext<BrandingState | null>(null);

function applyThemeVars(theme: PlatformTheme, dark: boolean) {
  const vars = themeToCssVars(theme, dark ? "dark" : "light");
  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) {
    root.style.setProperty(k, v);
  }
  // Also set light tokens on :root for components that don't flip with dark class fully
  if (!dark) {
    const light = themeToCssVars(theme, "light");
    for (const [k, v] of Object.entries(light)) {
      root.style.setProperty(k, v);
    }
  }
}

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<PlatformTheme>(DEFAULT_PLATFORM_THEME);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await api<{ theme: PlatformTheme }>("/public/branding");
      setTheme(data.theme ?? DEFAULT_PLATFORM_THEME);
    } catch {
      setTheme(DEFAULT_PLATFORM_THEME);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    applyThemeVars(theme, dark);
    const obs = new MutationObserver(() => {
      applyThemeVars(theme, document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [theme]);

  useEffect(() => {
    const name = theme.branding.productName?.trim();
    if (name) {
      document.title = `${name} — навчання, що прокачує`;
    }
    if (theme.branding.faviconUrl) {
      let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = theme.branding.faviconUrl;
    }
  }, [theme]);

  const value = useMemo(
    () => ({ theme, loading, refresh }),
    [theme, loading, refresh],
  );

  return (
    <BrandingContext.Provider value={value}>{children}</BrandingContext.Provider>
  );
}

export function useBranding() {
  const ctx = useContext(BrandingContext);
  if (!ctx) throw new Error("useBranding outside provider");
  return ctx;
}
