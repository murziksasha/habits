"use client";

import { streakCalendarDays } from "@eduforge/shared";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";

export function StreakCalendar({
  activeDates,
  days = 14,
  streakDays = 0,
}: {
  activeDates: string[];
  days?: number;
  streakDays?: number;
}) {
  const { locale } = useLocale();
  const cells = streakCalendarDays(activeDates, days);

  return (
    <section className="card space-y-3" aria-label="Streak calendar">
      <div className="flex items-center justify-between">
        <h2 className="font-black">
          🔥 {locale === "en" ? "Streak" : "Серія"} · {streakDays}
        </h2>
        <span className="text-xs font-bold text-ink-muted">
          {locale === "en" ? "Last days" : "Останні дні"}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5" role="list">
        {cells.map((c) => (
          <div
            key={c.date}
            role="listitem"
            title={c.date}
            className={clsx(
              "h-7 w-7 rounded-lg border-2",
              c.active
                ? "border-brand bg-brand"
                : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900",
              c.isToday && "ring-2 ring-sky ring-offset-1",
            )}
            aria-label={`${c.date}${c.active ? " active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
