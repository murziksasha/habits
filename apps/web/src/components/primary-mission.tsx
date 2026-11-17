"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { composeLearningSession, type SessionRole, type SessionStep } from "@eduforge/shared";
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

function getRecommendationReason(kind: string | undefined, t: ReturnType<typeof useLocale>["t"]): string {
  if (!kind) return t.learn.reasonDefault;
  if (kind === "review_weak" || kind === "leech") {
    return t.learn.reasonWeak;
  }
  if (kind === "spaced_review" || kind === "review_queue") {
    return t.learn.reasonSpaced;
  }
  if (kind.includes("exam")) {
    return t.learn.reasonExam;
  }
  if (kind.includes("placement")) {
    return t.learn.reasonPlacement;
  }
  if (kind.includes("continue")) {
    return t.learn.reasonContinue;
  }
  if (kind.includes("start")) {
    return t.learn.reasonStart;
  }
  if (kind.includes("flash")) {
    return t.learn.reasonFlashcards;
  }
  return t.learn.reasonDefault;
}

function sessionRoleLabel(role: SessionRole, t: ReturnType<typeof useLocale>["t"]): string {
  if (role === "review") return t.learn.sessionReview;
  if (role === "close") return t.learn.sessionClose;
  return t.learn.sessionNew;
}

/** Single source-of-truth primary CTA for thin home / learn. */
export function PrimaryMission({
  variant = "hero",
  showSecondary = false,
  minutes,
}: {
  variant?: "hero" | "compact";
  showSecondary?: boolean;
  /** When set, the mission is a 5, 10, or 20 minute session from the same recommendations. */
  minutes?: 5 | 10 | 20;
}) {
  const { token, user, character } = useAuth();
  const { locale, t } = useLocale();
  const [list, setList] = useState<NextItem[]>([]);
  const skillPoints = character?.progression?.skillPoints ?? 0;

  useEffect(() => {
    if (!token || !user) return;
    void api<{ recommendations?: NextItem[]; items?: NextItem[] }>("/learning/next", {
      token,
    })
      .then((d) => {
        setList(d.recommendations ?? d.items ?? []);
      })
      .catch(() => {
        setList([]);
      });
  }, [token, user]);

  const session: SessionStep[] = minutes ? composeLearningSession(minutes, list) : [];
  const next = minutes ? (session[0] ?? null) : (list[0] ?? null);
  const secondary = minutes ? session.slice(1) : showSecondary ? list.slice(1, 3) : [];

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
          <span className="rounded-full bg-grape/10 px-2 py-0.5 text-[10px] font-bold text-ink-muted">
            {skillPoints} SP
          </span>
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
          {t.learn.whyThis}:{" "}
          <span className="font-black text-brand-dark">
            {getRecommendationReason(next.kind, t)}
          </span>
        </p>
      ) : null}
      <Link href={href} className="btn-primary inline-flex min-h-11">
        {t.coursePage.continue} →
      </Link>
      {minutes && session.length > 0 ? (
        <ol className="space-y-1 pt-1">
          <li className="text-xs font-black uppercase text-ink-muted">{t.learn.sessionTitle}</li>
          {session.map((step, i) => (
            <li key={`${step.href}-${step.role}`}>
              <Link
                href={step.href}
                className="text-sm font-bold text-ink-muted hover:text-brand-dark hover:underline"
              >
                {i + 1}. {sessionRoleLabel(step.role, t)}:{" "}
                {locale === "en" ? step.titleEn : step.titleUk}
              </Link>
            </li>
          ))}
        </ol>
      ) : null}
      {!minutes && showSecondary && secondary.length > 0 && (
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
