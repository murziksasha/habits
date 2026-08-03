"use client";

import { useLocale } from "@/lib/locale-context";

/** Client island for locale-aware landing strings without making the whole page CSR. */
export function LandingLocaleBits() {
  const { locale, t } = useLocale();
  return (
    <p className="text-sm font-bold text-ink-muted">
      {locale === "en"
        ? t.landing?.badge ?? "Learn by doing"
        : t.landing?.badge ?? "Навчайся в дії"}
      {" · "}
      <span className="text-brand-dark">RSC + client islands</span>
    </p>
  );
}
