"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

type NextItem = {
  kind: string;
  titleUk: string;
  titleEn: string;
  href: string;
};

/**
 * Sticky / card Continue CTA — primary retention affordance (SPEC audit Tier B).
 */
export function ContinueCta({
  variant = "card",
  className = "",
}: {
  variant?: "card" | "sticky" | "inline";
  className?: string;
}) {
  const { token, user } = useAuth();
  const { locale, t } = useLocale();
  const [next, setNext] = useState<NextItem | null>(null);

  useEffect(() => {
    if (!token || !user) return;
    void api<{ recommendations?: NextItem[]; items?: NextItem[] }>("/learning/next", {
      token,
    })
      .then((d) => {
        const list = d.recommendations ?? d.items ?? [];
        // API returns { items } from next-steps — support both shapes
        const first = (list as NextItem[])[0] ?? null;
        setNext(first);
      })
      .catch(() => setNext(null));
  }, [token, user]);

  if (!user) return null;

  const href = next?.href ?? "/learn";
  const title = next
    ? locale === "en"
      ? next.titleEn || next.titleUk
      : next.titleUk || next.titleEn
    : locale === "en"
      ? "Open learning map"
      : "Відкрити карту навчання";
  const label = locale === "en" ? "Continue" : "Продовжити";
  const kind = next?.kind ?? "";
  const icon =
    kind.includes("exam")
      ? "📝"
      : kind.includes("review") || kind === "leech"
        ? "🔁"
        : kind.includes("race") || kind.includes("mini")
          ? "🏁"
          : kind.includes("character")
            ? "⭐"
            : "▶️";

  if (variant === "sticky") {
    return (
      <div
        className={`fixed bottom-[4.5rem] left-0 right-0 z-30 px-4 md:bottom-4 md:left-auto md:right-6 md:max-w-sm ${className}`}
        role="complementary"
        aria-label={label}
      >
        <Link
          href={href}
          className="btn-primary flex min-h-11 w-full items-center justify-between gap-3 shadow-lg !py-3"
        >
          <span className="truncate text-left">
            <span className="block text-[10px] font-black uppercase opacity-90">
              {icon} {label}
            </span>
            <span className="block truncate text-sm">{title}</span>
          </span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <Link href={href} className={`btn-primary ${className}`}>
        {icon} {label}: {title} →
      </Link>
    );
  }

  return (
    <section
      className={`card border-brand/50 bg-gradient-to-br from-brand-soft/40 to-sky/10 ${className}`}
    >
      <p className="text-xs font-black uppercase text-brand-dark">
        {icon} {locale === "en" ? "Next step" : "Наступний крок"}
      </p>
      <p className="mt-1 text-lg font-black">{title}</p>
      {kind ? (
        <p className="text-xs font-bold text-ink-muted">
          {locale === "en" ? "Type" : "Тип"}: {kind.replace(/_/g, " ")}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href={href} className="btn-primary !py-2 text-sm">
          {label} →
        </Link>
        <Link href="/review" className="btn-secondary !py-2 text-sm">
          🔁 {t.nav.review}
        </Link>
        <Link href="/learn" className="btn-secondary !py-2 text-sm">
          🗺️ {t.nav.learn}
        </Link>
      </div>
    </section>
  );
}
