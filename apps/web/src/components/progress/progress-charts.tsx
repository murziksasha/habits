"use client";

import type {
  LearningCalendarResponse,
  LearningCourseProgressItem,
  LearningDailyPoint,
} from "@eduforge/shared";
import clsx from "clsx";
import { useLocale } from "@/lib/locale-context";

const LEVEL_BG = [
  "bg-slate-100 dark:bg-slate-800",
  "bg-green-200 dark:bg-green-900",
  "bg-green-400 dark:bg-green-700",
  "bg-green-600 dark:bg-green-500",
  "bg-green-800 dark:bg-green-300",
];

/** Pure helper: Monday-first offset (Mon=0 .. Sun=6) for a YYYY-MM-DD UTC date. */
export function utcMondayOffset(isoDate: string): number {
  const d = new Date(`${isoDate}T12:00:00.000Z`);
  return (d.getUTCDay() + 6) % 7;
}

/** Pure helper: scale attempt counts to 0..100 percentages. */
export function dailyActivityHeights(points: LearningDailyPoint[]): number[] {
  const max = Math.max(1, ...points.map((p) => p.attempts));
  return points.map((p) => (p.attempts > 0 ? Math.max(8, Math.round((p.attempts / max) * 100)) : 0));
}

export function ProgressChartsSection({
  dailySeries,
  heatmap,
  courseBreakdown,
  days,
}: {
  dailySeries: LearningDailyPoint[];
  heatmap: LearningCalendarResponse;
  courseBreakdown: LearningCourseProgressItem[];
  days: number;
}) {
  const { t, locale } = useLocale();
  const en = locale === "en";

  const heights = dailyActivityHeights(dailySeries);
  const totalAttempts = dailySeries.reduce((s, d) => s + d.attempts, 0);
  const scoredPoints = dailySeries
    .map((d, idx) => ({ ...d, idx }))
    .filter((d) => d.averageScore !== null);

  // Score SVG coordinates (320 x 96 plot box)
  const svgW = 320;
  const svgH = 96;
  const padX = 8;
  const padY = 10;
  const plotW = svgW - padX * 2;
  const plotH = svgH - padY * 2;
  const xForIdx = (i: number) =>
    dailySeries.length <= 1
      ? padX + plotW / 2
      : padX + (i / (dailySeries.length - 1)) * plotW;
  const yForScore = (score: number) =>
    padY + (1 - Math.min(1, Math.max(0, score))) * plotH;

  const polylinePts = scoredPoints
    .map((p) => `${xForIdx(p.idx).toFixed(1)},${yForScore(p.averageScore ?? 0).toFixed(1)}`)
    .join(" ");

  const leadingBlanks = heatmap.series.length
    ? utcMondayOffset(heatmap.series[0]!.date)
    : 0;
  const weekdayLabels = en
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

  return (
    <section className="space-y-4 min-w-0" aria-label={t.learning.chartsTitle}>
      <h2 className="text-xl font-black">📈 {t.learning.chartsTitle}</h2>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* 1. Daily activity bar chart */}
        <div className="card min-w-0 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-black">
              {t.learning.dailyActivityChart} ({days}{en ? "d" : "д"})
            </h3>
            <span className="text-xs font-bold text-ink-muted">
              {totalAttempts} {en ? "attempts" : "спроб"}
            </span>
          </div>

          {totalAttempts === 0 ? (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-ink-muted dark:bg-slate-900">
              {t.learning.noFilteredAttemptsBody}
            </p>
          ) : (
            <div
              className={clsx(
                "flex h-28 items-end overflow-x-auto rounded-2xl bg-slate-50 px-2 pb-2 pt-4 dark:bg-slate-900",
                days > 30 ? "gap-px" : "gap-1",
              )}
              role="img"
              aria-label={`${t.learning.dailyActivityChart}: ${totalAttempts} ${en ? "total attempts across" : "спроб за"} ${days} ${en ? "UTC days" : "днів UTC"}`}
            >
              {dailySeries.map((d, i) => {
                const h = heights[i] ?? 0;
                const passRatio = d.attempts > 0 ? d.successfulAttempts / d.attempts : 0;
                return (
                  <div
                    key={d.date}
                    className="flex h-full min-w-[2px] flex-1 flex-col justify-end"
                    title={`${d.date} (UTC): ${d.successfulAttempts}/${d.attempts} ${en ? "passed" : "успішно"}, +${d.courseXp} XP`}
                  >
                    {h > 0 ? (
                      <div
                        className="w-full overflow-hidden rounded-t bg-orange-300 dark:bg-orange-700"
                        style={{ height: `${h}%` }}
                      >
                        <div
                          className="w-full bg-brand"
                          style={{ height: `${Math.round(passRatio * 100)}%` }}
                        />
                      </div>
                    ) : (
                      <div className="h-1 w-full rounded bg-slate-200 dark:bg-slate-800" />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {dailySeries.length > 0 && (
            <div className="flex justify-between text-[10px] font-bold text-ink-muted">
              <span>{dailySeries[0]!.date}</span>
              <span>{dailySeries[dailySeries.length - 1]!.date} (UTC)</span>
            </div>
          )}

          <details className="text-xs font-bold text-ink-muted">
            <summary className="cursor-pointer hover:text-ink">
              {t.learning.textEquivalent}
            </summary>
            <div className="mt-2 max-h-48 overflow-auto rounded-xl border border-slate-100 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="px-2 py-1">{en ? "UTC Date" : "Дата UTC"}</th>
                    <th className="px-2 py-1">{en ? "Passed" : "Успішно"}</th>
                    <th className="px-2 py-1">{en ? "Total" : "Усього"}</th>
                    <th className="px-2 py-1">XP</th>
                  </tr>
                </thead>
                <tbody>
                  {dailySeries
                    .filter((d) => d.attempts > 0 || d.newCompletions > 0)
                    .map((d) => (
                      <tr
                        key={d.date}
                        className="border-b border-slate-50 last:border-0 dark:border-slate-900"
                      >
                        <td className="px-2 py-1 font-mono">{d.date}</td>
                        <td className="px-2 py-1">{d.successfulAttempts}</td>
                        <td className="px-2 py-1">{d.attempts}</td>
                        <td className="px-2 py-1">+{d.courseXp}</td>
                      </tr>
                    ))}
                  {totalAttempts === 0 && (
                    <tr>
                      <td className="px-2 py-2 text-ink-muted" colSpan={4}>
                        {t.learning.noFilteredAttemptsBody}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </details>
        </div>

        {/* 2. Score trend SVG chart */}
        <div className="card min-w-0 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-black">
              {t.learning.scoreTrendsChart} ({days}{en ? "d" : "д"})
            </h3>
            <span className="text-xs font-bold text-ink-muted">
              {scoredPoints.length} {en ? "scored days" : "днів з оцінкою"}
            </span>
          </div>

          {scoredPoints.length === 0 ? (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-ink-muted dark:bg-slate-900">
              {t.learning.dataUnavailable}
            </p>
          ) : (
            <div className="rounded-2xl bg-slate-50 p-2 dark:bg-slate-900">
              <svg
                viewBox={`0 0 ${svgW} ${svgH}`}
                className="h-28 w-full overflow-visible"
                role="img"
                aria-label={`${t.learning.scoreTrendsChart}: ${scoredPoints
                  .map((p) => `${p.date} ${Math.round((p.averageScore ?? 0) * 100)}%`)
                  .join(", ")}`}
              >
                <line
                  x1={padX}
                  x2={svgW - padX}
                  y1={yForScore(0.7)}
                  y2={yForScore(0.7)}
                  stroke="currentColor"
                  strokeOpacity={0.18}
                  strokeDasharray="3 3"
                />
                <line
                  x1={padX}
                  x2={svgW - padX}
                  y1={yForScore(0.5)}
                  y2={yForScore(0.5)}
                  stroke="currentColor"
                  strokeOpacity={0.12}
                  strokeDasharray="2 4"
                />
                {scoredPoints.length >= 2 && (
                  <polyline
                    fill="none"
                    stroke="#1cb0f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={polylinePts}
                  />
                )}
                {scoredPoints.map((p) => (
                  <circle
                    key={p.date}
                    cx={xForIdx(p.idx)}
                    cy={yForScore(p.averageScore ?? 0)}
                    r={scoredPoints.length > 45 ? 2.5 : 4}
                    fill="#58cc02"
                  >
                    <title>
                      {`${p.date} (UTC): ${Math.round((p.averageScore ?? 0) * 100)}%`}
                    </title>
                  </circle>
                ))}
              </svg>
            </div>
          )}

          {dailySeries.length > 0 && (
            <div className="flex justify-between text-[10px] font-bold text-ink-muted">
              <span>50% / 70% {en ? "dashed guides" : "позначки"}</span>
              <span>
                {scoredPoints.length > 0
                  ? `${en ? "Latest" : "Останній"}: ${Math.round((scoredPoints[scoredPoints.length - 1]!.averageScore ?? 0) * 100)}%`
                  : "—"}
              </span>
            </div>
          )}

          <details className="text-xs font-bold text-ink-muted">
            <summary className="cursor-pointer hover:text-ink">
              {t.learning.textEquivalent}
            </summary>
            <div className="mt-2 max-h-48 overflow-auto rounded-xl border border-slate-100 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="px-2 py-1">{en ? "UTC Date" : "Дата UTC"}</th>
                    <th className="px-2 py-1">{t.learning.averageScore}</th>
                    <th className="px-2 py-1">{en ? "Scored" : "Оцінено"}</th>
                  </tr>
                </thead>
                <tbody>
                  {scoredPoints.map((p) => (
                    <tr
                      key={p.date}
                      className="border-b border-slate-50 last:border-0 dark:border-slate-900"
                    >
                      <td className="px-2 py-1 font-mono">{p.date}</td>
                      <td className="px-2 py-1">
                        {Math.round((p.averageScore ?? 0) * 100)}%
                      </td>
                      <td className="px-2 py-1">{p.scoredAttempts}</td>
                    </tr>
                  ))}
                  {scoredPoints.length === 0 && (
                    <tr>
                      <td className="px-2 py-2 text-ink-muted" colSpan={3}>
                        {t.learning.dataUnavailable}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </div>

      {/* 3. Study heatmap (submitted lessons, Mon-Sun UTC grid) */}
      <div className="card min-w-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-black">📅 {t.learning.studyHeatmap}</h3>
            <p className="text-xs font-bold text-ink-muted">{t.learning.heatmapNote}</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-black">
            <span>
              {t.learning.activeDays}: {heatmap.activeDays}
            </span>
            <span>
              {t.learning.maxStreak}: 🔥 {heatmap.maxStreakInWindow}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="inline-flex gap-2">
            <div className="grid grid-rows-7 gap-1 text-[10px] font-bold text-ink-muted">
              {weekdayLabels.map((lbl) => (
                <span key={lbl} className="flex h-3.5 items-center pr-1">
                  {lbl}
                </span>
              ))}
            </div>
            <div
              className="grid gap-1"
              style={{
                gridTemplateRows: "repeat(7, 14px)",
                gridAutoFlow: "column",
                gridAutoColumns: "14px",
              }}
              role="img"
              aria-label={`${t.learning.studyHeatmap}: ${heatmap.activeDays} ${t.learning.activeDays.toLowerCase()}, ${t.learning.maxStreak.toLowerCase()} ${heatmap.maxStreakInWindow}`}
            >
              {Array.from({ length: leadingBlanks }).map((_, i) => (
                <div key={`blank-${i}`} className="h-3.5 w-3.5" aria-hidden />
              ))}
              {heatmap.series.map((d) => (
                <div
                  key={d.date}
                  title={`${d.date} (UTC): ${d.count}`}
                  aria-label={`${d.date}: ${d.count}`}
                  className={clsx(
                    "h-3.5 w-3.5 rounded-sm",
                    LEVEL_BG[d.level] ?? LEVEL_BG[0],
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-ink-muted">
          <div className="flex items-center gap-1.5">
            <span>{t.learning.less}</span>
            {LEVEL_BG.map((c, i) => (
              <span key={i} className={clsx("h-3 w-3 rounded-sm", c)} />
            ))}
            <span>{t.learning.more}</span>
          </div>
          <span>{t.learning.utcLabel}</span>
        </div>

        <details className="text-xs font-bold text-ink-muted">
          <summary className="cursor-pointer hover:text-ink">
            {t.learning.textEquivalent}
          </summary>
          <div className="mt-2 max-h-40 overflow-auto rounded-xl border border-slate-100 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="px-2 py-1">{en ? "UTC Date" : "Дата UTC"}</th>
                  <th className="px-2 py-1">{en ? "Submitted" : "Надіслано"}</th>
                </tr>
              </thead>
              <tbody>
                {heatmap.series
                  .filter((d) => d.count > 0)
                  .map((d) => (
                    <tr
                      key={d.date}
                      className="border-b border-slate-50 last:border-0 dark:border-slate-900"
                    >
                      <td className="px-2 py-1 font-mono">{d.date}</td>
                      <td className="px-2 py-1">{d.count}</td>
                    </tr>
                  ))}
                {heatmap.activeDays === 0 && (
                  <tr>
                    <td className="px-2 py-2 text-ink-muted" colSpan={2}>
                      {t.learning.noAttemptsBody}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </details>
      </div>

      {/* 4. Course progress chart */}
      <div className="card min-w-0 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-black">📚 {t.learning.courseProgressChart}</h3>
          <span className="text-xs font-bold text-ink-muted">
            {courseBreakdown.length} {en ? "courses" : "курсів"}
          </span>
        </div>
        {courseBreakdown.length === 0 ? (
          <p className="text-sm font-bold text-ink-muted">{t.learning.noAttemptsBody}</p>
        ) : (
          <div className="space-y-3">
            {courseBreakdown.map((c) => {
              const title = en ? c.titleEn : c.titleUk;
              const pct = Math.round(c.completionRatio * 100);
              return (
                <div key={c.courseSlug} className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="font-black">
                      <span className="mr-1.5" aria-hidden>
                        {c.icon}
                      </span>
                      {title}
                    </span>
                    <span className="text-xs font-bold text-ink-muted">
                      {t.learning.courseLevels}: L{c.level} ({c.xp} XP) ·{" "}
                      {c.completedLessons}/{c.totalLessons || "?"}{" "}
                      {t.learning.lessonsCount} ({pct}%)
                    </span>
                  </div>
                  <div
                    className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
                    role="progressbar"
                    aria-label={`${title}: ${pct}%`}
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full transition-all motion-reduce:transition-none"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: c.color || "#58CC02",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
