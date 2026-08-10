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

/** Single source-of-truth primary CTA for thin home / learn. */
export function PrimaryMission({
  variant = "hero",
  showSecondary = false,
}: {
  variant?: "hero" | "compact";
  showSecondary?: boolean;
}) {
  const { token, user } = useAuth();
  const { locale, t } = useLocale();
  const [next, setNext] = useState<NextItem | null>(null);
  const [secondary, setSecondary] = useState<NextItem[]>([]);

  useEffect(() => {
    if (!token || !user) return;
    void api<{ recommendations?: NextItem[]; items?: NextItem[] }>("/learning/next", {
      token,
    })
      .then((d) => {
        const list = d.recommendations ?? d.items ?? [];
        setNext(list[0] ?? null);
        setSecondary(list.slice(1, 3));
      })
      .catch(() => {
        setNext(null);
        setSecondary([]);
      });
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

  if (variant === "compact") {
    return (
      <Link href={href} className="btn-primary inline-flex w-full justify-center sm:w-auto">
        {t.onboarding.continueLearning}: {title} →
      </Link>
    );
  }

  return (
    <section
      className="card space-y-3 border-brand/50 bg-gradient-to-br from-brand-soft/50 to-sky/10"
      aria-label={t.onboarding.missionOfDay}
    >
      <p className="text-xs font-black uppercase text-brand-dark">{t.onboarding.missionOfDay}</p>
      <p className="text-xl font-black">{title}</p>
      <Link href={href} className="btn-primary inline-flex">
        {t.onboarding.startNow} →
      </Link>
      {showSecondary && secondary.length > 0 && (
        <ul className="space-y-1 pt-1">
          {secondary.map((r, i) => (
            <li key={`${r.href}-${i}`}>
              <Link
                href={r.href}
                className="text-sm font-bold text-ink-muted hover:text-brand-dark hover:underline"
              >
                {locale === "en" ? r.titleEn : r.titleUk} →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
