"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type {
  LearningGoalState,
  LearningProgressResponse,
  ProgressWindowDays,
} from "@eduforge/shared";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { useRequireAuth } from "@/lib/use-require-auth";
import { PageLoading } from "@/components/page-loading";
import { Badge, EmptyState } from "@/components/ui";
import { ProgressChartsSection } from "@/components/progress/progress-charts";
import { WeeklyGoalCard } from "@/components/progress/weekly-goal-card";
import { AttemptHistorySection } from "@/components/progress/attempt-history-section";

function formatSignedDelta(delta: number, suffix = ""): string {
  if (delta > 0) return `+${delta}${suffix}`;
  if (delta < 0) return `${delta}${suffix}`;
  return `0${suffix}`;
}

export function CalendarClient() {
  const { user, token, character, setCharacter, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const en = locale === "en";

  const [days, setDays] = useState<ProgressWindowDays>(30);
  const [courseFilter, setCourseFilter] = useState<string | null>(null);
  const [data, setData] = useState<LearningProgressResponse | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadProgress = useCallback(() => {
    if (!token) return;
    setDataLoading(true);
    setError(false);
    const qs = new URLSearchParams();
    qs.set("days", String(days));
    if (courseFilter) qs.set("course", courseFilter);
    void api<LearningProgressResponse>(`/learning/progress?${qs.toString()}`, {
      token,
    })
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setDataLoading(false));
  }, [token, days, courseFilter]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  if (loading || !ready || !user || (dataLoading && !data && !error)) {
    return <PageLoading label={t.common.loading} />;
  }

  if (error && !data) {
    return (
      <div className="space-y-4 pb-20 md:pb-0">
        <h1 className="text-3xl font-black">📊 {t.learning.myProgress}</h1>
        <EmptyState
          title={t.learning.unavailableError}
          description={t.learning.myProgressSubtitle}
        >
          <button
            type="button"
            className="btn-primary"
            onClick={loadProgress}
          >
            {t.learning.retry}
          </button>
        </EmptyState>
      </div>
    );
  }

  if (!data || !token) return <PageLoading label={t.common.loading} />;

  const handleGoalChange = (
    nextGoal: LearningGoalState,
    weeklyTarget: number | null,
  ) => {
    setData((prev) => (prev ? { ...prev, goal: nextGoal } : prev));
    if (character) {
      setCharacter({ ...character, weeklyTarget });
    }
  };

  const avgPct =
    data.overview.averageScore !== null
      ? `${Math.round(data.overview.averageScore * 100)}%`
      : "—";

  const recap = data.weeklyRecap;
  const bests = data.personalBests;
  const ch = data.character;

  return (
    <div className="min-w-0 space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">📊 {t.learning.myProgress}</h1>
          <p className="text-sm font-bold text-ink-muted">
            {t.learning.myProgressSubtitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/learn" className="btn-secondary !py-2 text-sm">
            🗺️ {t.nav.learn}
          </Link>
          <Link
            href={ch.buildHref}
            className="btn-secondary !py-2 text-sm ring-1 ring-grape/40"
          >
            ⭐ {t.learning.openBuildPanel}
            {ch.skillPoints > 0 ? ` (${ch.skillPoints})` : ""}
          </Link>
        </div>
      </div>

      {/* Filters (affect overview, charts, and history) */}
      <section
        className="card flex flex-wrap items-center justify-between gap-3"
        aria-label={en ? "Progress filters" : "Фільтри прогресу"}
      >
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={en ? "Date range" : "Період"}>
          {([7, 30, 90] as const).map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={days === d}
              onClick={() => setDays(d)}
              className={`min-h-11 rounded-xl border-2 px-3.5 py-1.5 text-sm font-black transition motion-reduce:transition-none ${
                days === d
                  ? "border-brand bg-brand-soft text-brand-dark"
                  : "border-slate-200 bg-white text-ink-muted hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
              }`}
            >
              {d === 7
                ? t.learning.filterDays7
                : d === 30
                  ? t.learning.filterDays30
                  : t.learning.filterDays90}
            </button>
          ))}
        </div>

        <div className="flex min-w-0 max-w-full flex-wrap items-center gap-2">
          <label
            htmlFor="progress-course-filter"
            className="text-xs font-black uppercase text-ink-muted"
          >
            {t.nav.courses}
          </label>
          <select
            id="progress-course-filter"
            className="input min-h-11 !w-auto max-w-full min-w-0 !py-2 text-sm font-bold"
            value={courseFilter ?? "all"}
            onChange={(e) =>
              setCourseFilter(e.target.value === "all" ? null : e.target.value)
            }
          >
            <option value="all">{t.learning.filterAllCourses}</option>
            {data.availableCourses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.icon} {en ? c.titleEn : c.titleUk}
              </option>
            ))}
          </select>
        </div>
      </section>

      {error && (
        <div className="card flex flex-wrap items-center justify-between gap-2 border-red-200 bg-red-50/50 text-sm font-bold text-red-600 dark:border-red-900/40">
          <span>{t.learning.unavailableError}</span>
          <button
            type="button"
            className="btn-secondary !py-1.5 !px-3 text-xs"
            onClick={loadProgress}
          >
            {t.learning.retry}
          </button>
        </div>
      )}

      {/* Overview KPIs */}
      <section className="space-y-3" aria-label={t.learning.overviewTitle}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-black">{t.learning.overviewTitle}</h2>
          <span className="text-xs font-bold text-ink-muted">
            {data.filters.windowStart.slice(0, 10)} – {data.filters.windowEnd.slice(0, 10)} (UTC)
          </span>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <div className="card">
            <p className="text-xs font-bold text-ink-muted">
              {t.learning.successfulAttempts}
            </p>
            <p className="mt-1 text-3xl font-black text-brand-dark">
              {data.overview.successfulAttempts}
            </p>
          </div>
          <div className="card">
            <p className="text-xs font-bold text-ink-muted">
              {t.learning.newCompletions}
            </p>
            <p className="mt-1 text-3xl font-black">
              {data.overview.newCompletions}
            </p>
          </div>
          <div className="card">
            <p className="text-xs font-bold text-ink-muted">
              {t.learning.averageScore}
            </p>
            <p className="mt-1 text-3xl font-black text-sky">{avgPct}</p>
          </div>
          <div className="card">
            <p className="text-xs font-bold text-ink-muted">
              {t.learning.studyDays} (UTC)
            </p>
            <p className="mt-1 text-3xl font-black">{data.overview.studyDays}</p>
          </div>
          <div className="card col-span-2 sm:col-span-1">
            <p className="text-xs font-bold text-ink-muted">
              {t.learning.courseXp}
            </p>
            <p className="mt-1 text-3xl font-black text-grape">
              +{data.overview.courseXp}
            </p>
          </div>
        </div>

        {(data.overview.reconstructedAttempts > 0 ||
          data.overview.unknownAttempts > 0) && (
          <p className="text-xs font-bold text-ink-muted">
            ℹ️ {t.learning.reconstructedNote}
          </p>
        )}
      </section>

      {/* Weekly Target + Character Progression vs Course Levels */}
      <div className="grid gap-4 lg:grid-cols-2">
        <WeeklyGoalCard
          goal={data.goal}
          token={token}
          onGoalChange={handleGoalChange}
        />

        <section
          className="card min-w-0 space-y-4 border-grape/30"
          aria-label={t.learning.progressionTitle}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-black">⭐ {t.learning.progressionTitle}</h2>
            <Badge tone="grape">
              {t.learning.characterLevel} {ch.globalLevel}
            </Badge>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 space-y-2 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-black">
              <span>
                {t.learning.characterLevel}: {ch.globalLevel} ({ch.globalXp} XP)
              </span>
              <span className="text-xs text-ink-muted">
                {t.learning.xpRemaining}: {ch.xpRemainingToNext} XP
              </span>
            </div>
            <div
              className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
              role="progressbar"
              aria-label={`${t.learning.characterLevel} ${ch.globalLevel}`}
              aria-valuenow={ch.xpInLevel}
              aria-valuemin={0}
              aria-valuemax={ch.xpNeededForNext}
            >
              <div
                className="h-full rounded-full bg-grape transition-all motion-reduce:transition-none"
                style={{ width: `${Math.round(ch.levelProgressRatio * 100)}%` }}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-ink-muted">
              <span>
                {ch.xpInLevel}/{ch.xpNeededForNext} XP
              </span>
              <span>
                🔥 {t.dashboard.streak}: {ch.streakDays} · 🎯 {ch.dailyXp}/{ch.dailyGoalXp} XP
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-grape/30 bg-grape/10 px-4 py-3">
            <div>
              <p className="text-xs font-bold text-ink-muted">
                {t.learning.skillPointsAvailable}
              </p>
              <p className="text-2xl font-black text-grape">{ch.skillPoints}</p>
            </div>
            <Link href={ch.buildHref} className="btn-primary !py-2 !px-4 text-sm min-h-11">
              {t.learning.openBuildPanel} →
            </Link>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-black uppercase text-ink-muted">
              {t.learning.courseLevels}
            </p>
            {data.courseBreakdown.length === 0 ? (
              <p className="text-xs font-bold text-ink-muted">
                {t.learning.noAttemptsBody}
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.courseBreakdown.slice(0, 8).map((c) => (
                  <Link
                    key={c.courseSlug}
                    href={`/courses/${c.courseSlug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-black hover:border-brand/50 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <span aria-hidden>{c.icon}</span>
                    <span>{en ? c.titleEn : c.titleUk}</span>
                    <span className="text-brand-dark">L{c.level}</span>
                    <span className="text-ink-muted font-bold">
                      ({c.xpRemainingToNext} XP)
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Weekly Recap & Personal Bests (account-wide) */}
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card min-w-0 space-y-3" aria-label={t.learning.weeklyRecapTitle}>
          <div>
            <h2 className="text-xl font-black">🗓️ {t.learning.weeklyRecapTitle}</h2>
            <p className="text-xs font-bold text-ink-muted">
              {t.learning.weeklyRecapSubtitle}
            </p>
            <p className="mt-1 text-[11px] font-mono text-ink-muted">
              {recap.current.weekKey} vs {recap.previous.weekKey}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              {
                label: t.learning.successfulAttempts,
                cur: String(recap.current.successfulAttempts),
                prev: String(recap.previous.successfulAttempts),
                delta: formatSignedDelta(recap.deltas.successfulAttempts),
                deltaVal: recap.deltas.successfulAttempts,
              },
              {
                label: t.learning.newCompletions,
                cur: String(recap.current.newCompletions),
                prev: String(recap.previous.newCompletions),
                delta: formatSignedDelta(recap.deltas.newCompletions),
                deltaVal: recap.deltas.newCompletions,
              },
              {
                label: t.learning.studyDays,
                cur: String(recap.current.studyDays),
                prev: String(recap.previous.studyDays),
                delta: formatSignedDelta(recap.deltas.studyDays),
                deltaVal: recap.deltas.studyDays,
              },
              {
                label: t.learning.averageScore,
                cur:
                  recap.current.averageScore !== null
                    ? `${Math.round(recap.current.averageScore * 100)}%`
                    : "—",
                prev:
                  recap.previous.averageScore !== null
                    ? `${Math.round(recap.previous.averageScore * 100)}%`
                    : "—",
                delta:
                  recap.deltas.averageScore !== null
                    ? formatSignedDelta(Math.round(recap.deltas.averageScore * 100), "%")
                    : "—",
                deltaVal: recap.deltas.averageScore ?? 0,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900"
              >
                <p className="text-xs font-bold text-ink-muted">{row.label}</p>
                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <span className="text-2xl font-black">{row.cur}</span>
                  <span
                    className={`text-xs font-black ${
                      row.deltaVal > 0
                        ? "text-brand-dark"
                        : row.deltaVal < 0
                          ? "text-sun"
                          : "text-ink-muted"
                    }`}
                  >
                    {row.delta}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] font-bold text-ink-muted">
                  {t.learning.prevWeekElapsed}: {row.prev}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="card min-w-0 space-y-3" aria-label={t.learning.personalBestsTitle}>
          <div>
            <h2 className="text-xl font-black">🏆 {t.learning.personalBestsTitle}</h2>
            <p className="text-xs font-bold text-ink-muted">
              {t.learning.personalBestsSubtitle}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
              <div>
                <p className="text-xs font-bold text-ink-muted">{t.learning.bestDay}</p>
                <p className="text-xs font-mono text-ink-muted">
                  {bests.bestDaySuccesses.date
                    ? `${bests.bestDaySuccesses.date} (UTC)`
                    : "—"}
                </p>
              </div>
              <p className="text-2xl font-black text-brand-dark">
                {bests.bestDaySuccesses.count}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
              <div>
                <p className="text-xs font-bold text-ink-muted">{t.learning.bestWeek}</p>
                <p className="text-xs font-mono text-ink-muted">
                  {bests.bestWeekSuccesses.weekKey
                    ? `${bests.bestWeekSuccesses.weekStart} – ${bests.bestWeekSuccesses.weekEnd} (Mon–Sun UTC)`
                    : "—"}
                </p>
              </div>
              <p className="text-2xl font-black text-sky">
                {bests.bestWeekSuccesses.count}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
              <div>
                <p className="text-xs font-bold text-ink-muted">{t.learning.longestRun}</p>
                <p className="text-xs font-mono text-ink-muted">
                  {bests.longestStudyRunDays.startDate
                    ? `${bests.longestStudyRunDays.startDate} – ${bests.longestStudyRunDays.endDate} (UTC)`
                    : "—"}
                </p>
              </div>
              <p className="text-2xl font-black text-grape">
                {bests.longestStudyRunDays.days} {t.learning.daysUnit}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Charts & Heatmap */}
      <ProgressChartsSection
        dailySeries={data.dailySeries}
        heatmap={data.heatmap}
        courseBreakdown={data.courseBreakdown}
        days={days}
      />

      {/* Attempt History */}
      <AttemptHistorySection
        token={token}
        courseFilter={courseFilter}
        syncedDays={days}
        availableCourses={data.availableCourses}
        onResetFilters={() => {
          setCourseFilter(null);
          setDays(30);
        }}
      />
    </div>
  );
}
