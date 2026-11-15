"use client";

import Link from "next/link";
import type { LearningWeeklyRecap } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";

function signed(n: number, suffix = "") {
  if (n === 0) return `0${suffix}`;
  return `${n > 0 ? "+" : ""}${n}${suffix}`;
}

/** Compact weekly summary for the home dashboard; full report lives on /calendar. */
export function WeeklyRecapCard({ recap }: { recap: LearningWeeklyRecap }) {
  const { t, locale } = useLocale();
  const rows = [
    {
      label: t.learning.successfulAttempts,
      cur: String(recap.current.successfulAttempts),
      delta: recap.deltas.successfulAttempts,
      display: signed(recap.deltas.successfulAttempts),
    },
    {
      label: t.learning.newCompletions,
      cur: String(recap.current.newCompletions),
      delta: recap.deltas.newCompletions,
      display: signed(recap.deltas.newCompletions),
    },
    {
      label: t.learning.studyDays,
      cur: String(recap.current.studyDays),
      delta: recap.deltas.studyDays,
      display: signed(recap.deltas.studyDays),
    },
    {
      label: t.learning.averageScore,
      cur:
        recap.current.averageScore !== null
          ? `${Math.round(recap.current.averageScore * 100)}%`
          : "—",
      delta: recap.deltas.averageScore ?? 0,
      display:
        recap.deltas.averageScore !== null
          ? signed(Math.round(recap.deltas.averageScore * 100), "%")
          : "—",
    },
  ];

  return (
    <section className="card space-y-3" aria-label={t.dashboard.weeklyOnHome}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-black">🗓️ {t.dashboard.weeklyOnHome}</h2>
          <p className="text-xs font-bold text-ink-muted">{t.dashboard.weeklyHomeHint}</p>
        </div>
        <Link href="/calendar" className="btn-secondary !py-1.5 text-xs shrink-0">
          {locale === "en" ? "Calendar" : "Календар"} →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {rows.map((row) => (
          <div key={row.label} className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
            <p className="text-[11px] font-bold text-ink-muted">{row.label}</p>
            <p className="text-xl font-black">{row.cur}</p>
            <p
              className={`text-[11px] font-black ${
                row.delta > 0 ? "text-brand-dark" : row.delta < 0 ? "text-sun" : "text-ink-muted"
              }`}
            >
              {row.display}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
