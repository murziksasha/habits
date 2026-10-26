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

function kindIcon(kind: string): string {
  if (kind.includes("exam")) return "📝";
  if (kind.includes("review") || kind === "leech") return "🔁";
  if (kind.includes("race") || kind.includes("mini")) return "🏁";
  if (kind.includes("character") || kind.includes("build")) return "⭐";
  if (kind.includes("placement")) return "🎯";
  if (kind.includes("gift")) return "🎁";
  if (kind.includes("play")) return "♟️";
  if (kind.includes("quest")) return "🗡️";
  if (kind.includes("flash")) return "🃏";
  if (kind.includes("continue") || kind.includes("start") || kind.includes("deep")) return "📚";
  return "✨";
}

/** Single source-of-truth primary CTA for thin home / learn. */
export function PrimaryMission({
  variant = "hero",
  showSecondary = false,
}: {
  variant?: "hero" | "compact";
  showSecondary?: boolean;
}) {
  const { token, user, character } = useAuth();
  const { locale, t } = useLocale();
  const [next, setNext] = useState<NextItem | null>(null);
  const [secondary, setSecondary] = useState<NextItem[]>([]);
  const skillPoints = character?.progression?.skillPoints ?? 0;

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
  const icon = next ? kindIcon(next.kind) : "🗺️";

  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Link href={href} className="btn-primary inline-flex w-full justify-center sm:w-auto">
          {icon} {t.onboarding.continueLearning}: {title} →
        </Link>
        {skillPoints > 0 ? (
          <Link
            href="/profile#build"
            className="btn-secondary inline-flex w-full justify-center sm:w-auto !py-2 text-sm"
          >
            ⭐ {locale === "en" ? "Build" : "Прокачка"} ({skillPoints})
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <section
      className="card space-y-3 border-brand/50 bg-gradient-to-br from-brand-soft/50 to-sky/10"
      aria-label={t.onboarding.missionOfDay}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-black uppercase text-brand-dark">
          {t.onboarding.missionOfDay}
        </p>
        {skillPoints > 0 ? (
          <Link
            href="/profile#build"
            className="rounded-full bg-grape/15 px-2 py-0.5 text-[10px] font-black text-grape hover:underline"
          >
            ⭐ {skillPoints} SP
          </Link>
        ) : null}
      </div>
      <p className="text-xl font-black">
        <span className="mr-2" aria-hidden>
          {icon}
        </span>
        {title}
      </p>
      {next?.kind ? (
        <p className="text-xs font-bold text-ink-muted">
          {locale === "en" ? "Why this" : "Чому це"}:{" "}
          <span className="font-black text-brand-dark">{next.kind.replace(/_/g, " ")}</span>
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Link href={href} className="btn-primary inline-flex">
          {t.onboarding.startNow} →
        </Link>
        {skillPoints > 0 ? (
          <Link href="/profile#build" className="btn-secondary inline-flex">
            ⭐ {locale === "en" ? "Spend skill points" : "Вкласти очки"}
          </Link>
        ) : null}
      </div>
      {showSecondary && secondary.length > 0 && (
        <ul className="space-y-1 pt-1">
          {secondary.map((r, i) => (
            <li key={`${r.href}-${i}`}>
              <Link
                href={r.href}
                className="text-sm font-bold text-ink-muted hover:text-brand-dark hover:underline"
              >
                {kindIcon(r.kind)} {locale === "en" ? r.titleEn : r.titleUk} →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
