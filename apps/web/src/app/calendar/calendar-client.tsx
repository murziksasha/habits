"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";
import clsx from "clsx";

type Day = { date: string; count: number; level: number };

const LEVEL_BG = [
  "bg-slate-100 dark:bg-slate-800",
  "bg-green-200 dark:bg-green-900",
  "bg-green-400 dark:bg-green-700",
  "bg-green-600 dark:bg-green-500",
  "bg-green-800 dark:bg-green-300",
];

export function CalendarClient() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t } = useLocale();
  const [series, setSeries] = useState<Day[]>([]);
  const [activeDays, setActiveDays] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setDataLoading(true);
    void api<{ series: Day[]; activeDays: number; maxStreakInWindow: number }>(
      "/learning/calendar?days=84",
      { token },
    )
      .then((d) => {
        setSeries(d.series);
        setActiveDays(d.activeDays);
        setMaxStreak(d.maxStreakInWindow);
      })
      .catch(() => setSeries([]))
      .finally(() => setDataLoading(false));
  }, [token]);

  if (loading || !ready || dataLoading) return <PageLoading label={t.common.loading} />;
  if (!user) return <PageLoading label={t.common.loading} />;

  // pad to weeks starting Monday-ish: show as grid of 7 columns
  const cells = series;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <h1 className="text-3xl font-black">📅 {t.learning.calendar}</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">{t.learning.activeDays}</p>
          <p className="text-3xl font-black">{activeDays}</p>
        </div>
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">{t.learning.maxStreak}</p>
          <p className="text-3xl font-black">🔥 {maxStreak}</p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <div
          className="grid gap-1"
          style={{
            gridTemplateRows: "repeat(7, 12px)",
            gridAutoFlow: "column",
            gridAutoColumns: "12px",
          }}
        >
          {cells.map((d) => (
            <div
              key={d.date}
              title={`${d.date}: ${d.count}`}
              className={clsx("h-3 w-3 rounded-sm", LEVEL_BG[d.level] ?? LEVEL_BG[0])}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-ink-muted">
          <span>Less</span>
          {LEVEL_BG.map((c, i) => (
            <span key={i} className={clsx("h-3 w-3 rounded-sm", c)} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
