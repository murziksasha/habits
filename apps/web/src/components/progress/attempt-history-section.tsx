"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type {
  HistoryWindowFilter,
  LearningCourseOption,
  LearningHistoryItem,
  LearningHistoryResponse,
} from "@eduforge/shared";
import { api } from "@/lib/api";
import { useLocale } from "@/lib/locale-context";
import { Badge, Button, Skeleton } from "@/components/ui";

function formatUtcTimestamp(iso: string): string {
  return `${iso.slice(0, 10)} ${iso.slice(11, 16)} UTC`;
}

export function AttemptHistorySection({
  token,
  courseFilter,
  syncedDays,
  availableCourses,
  onResetFilters,
}: {
  token: string;
  courseFilter: string | null;
  syncedDays: 7 | 30 | 90;
  availableCourses: LearningCourseOption[];
  onResetFilters: () => void;
}) {
  const { t, locale } = useLocale();
  const en = locale === "en";
  const [historyDays, setHistoryDays] = useState<HistoryWindowFilter>(syncedDays);
  const [items, setItems] = useState<LearningHistoryItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  // Sync with overview date window when user changes 7/30/90 at top
  useEffect(() => {
    setHistoryDays(syncedDays);
  }, [syncedDays]);

  const fetchPage = useCallback(
    async (cursor?: string | null) => {
      const qs = new URLSearchParams();
      qs.set("days", String(historyDays));
      if (courseFilter) qs.set("course", courseFilter);
      qs.set("limit", "20");
      if (cursor) qs.set("cursor", cursor);
      return api<LearningHistoryResponse>(`/learning/history?${qs.toString()}`, {
        token,
      });
    },
    [token, historyDays, courseFilter],
  );

  const loadInitial = useCallback(() => {
    setLoading(true);
    setError(false);
    void fetchPage(null)
      .then((res) => {
        setItems(res.items);
        setNextCursor(res.nextCursor);
        setHasMore(res.hasMore);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [fetchPage]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  async function loadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    setError(false);
    try {
      const res = await fetchPage(nextCursor);
      setItems((prev) => {
        const seen = new Set(prev.map((x) => x.id));
        return [...prev, ...res.items.filter((x) => !seen.has(x.id))];
      });
      setNextCursor(res.nextCursor);
      setHasMore(res.hasMore);
    } catch {
      setError(true);
    } finally {
      setLoadingMore(false);
    }
  }

  const courseName = (slug: string, uk: string, enTitle: string) => {
    const found = availableCourses.find((c) => c.slug === slug);
    if (found) return en ? found.titleEn : found.titleUk;
    return en ? enTitle : uk;
  };

  return (
    <section className="card space-y-4" aria-label={t.learning.historyTitle}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black">📜 {t.learning.historyTitle}</h2>
          <p className="text-xs font-bold text-ink-muted">
            {t.learning.historySubtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label={t.learning.historyTitle}>
          {(
            [
              { val: 7, label: t.learning.filterDays7 },
              { val: 30, label: t.learning.filterDays30 },
              { val: 90, label: t.learning.filterDays90 },
              { val: "all", label: t.learning.filterAllTime },
            ] as const
          ).map((opt) => (
            <button
              key={String(opt.val)}
              type="button"
              aria-pressed={historyDays === opt.val}
              onClick={() => setHistoryDays(opt.val)}
              className={`min-h-10 rounded-xl border-2 px-3 py-1 text-xs font-black transition motion-reduce:transition-none ${
                historyDays === opt.val
                  ? "border-brand bg-brand-soft text-brand-dark"
                  : "border-slate-200 bg-white text-ink-muted hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2" aria-busy="true">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : error && items.length === 0 ? (
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4 text-center space-y-2 dark:border-red-900/40 dark:bg-red-950/20">
          <p className="text-sm font-bold text-red-600">{t.learning.unavailableError}</p>
          <Button size="sm" onClick={loadInitial}>
            {t.learning.retry}
          </Button>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 p-5 text-center space-y-3 dark:bg-slate-900">
          <p className="font-black">{t.learning.noAttemptsTitle}</p>
          <p className="text-sm font-bold text-ink-muted">
            {courseFilter || historyDays !== "all"
              ? t.learning.noFilteredAttemptsBody
              : t.learning.noAttemptsBody}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {(courseFilter || historyDays !== "all") && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setHistoryDays("all");
                  onResetFilters();
                }}
              >
                {t.learning.resetFilters}
              </Button>
            )}
            <Link href="/learn" className="btn-primary !py-2 !px-4 text-sm">
              {t.nav.learn} →
            </Link>
          </div>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => {
            const cTitle = courseName(
              item.courseSlug,
              item.courseTitleUk,
              item.courseTitleEn,
            );
            const lessonTitle =
              en
                ? item.lessonTitleEn || item.lessonTitleUk
                : item.lessonTitleUk || item.lessonTitleEn;

            const outcomeBadge =
              item.outcome === "passed" ? (
                <Badge tone="brand">{t.learning.outcomePassed}</Badge>
              ) : item.outcome === "failed" ? (
                <Badge tone="muted" className="!bg-orange-500/15 !text-orange-600 dark:!text-orange-400">
                  {t.learning.outcomeFailed}
                </Badge>
              ) : (
                <Badge tone="muted">{t.learning.outcomeUnknown}</Badge>
              );

            const courseChanged =
              item.levelChangeTrigger === "lesson" &&
              item.courseLevelBefore != null &&
              item.courseLevelAfter != null &&
              item.courseLevelAfter > item.courseLevelBefore;
            const charChanged =
              item.levelChangeTrigger === "lesson" &&
              item.characterLevelBefore != null &&
              item.characterLevelAfter != null &&
              item.characterLevelAfter > item.characterLevelBefore;

            return (
              <li
                key={item.id}
                className="flex flex-col gap-2 rounded-2xl border border-slate-100 p-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-sm font-black">
                      {item.courseIcon ? `${item.courseIcon} ` : ""}
                      {cTitle}
                    </span>
                    <span className="text-xs font-bold text-ink-muted">·</span>
                    <span className="truncate text-sm font-bold">
                      {lessonTitle ?? t.learning.lessonUnavailable}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {outcomeBadge}
                    {item.reconstructed && (
                      <span title={t.learning.reconstructedHint}>
                        <Badge tone="sky">{t.learning.reconstructedBadge}</Badge>
                      </span>
                    )}
                    {item.isExam && (
                      <Badge tone="grape">{t.learning.examBadge}</Badge>
                    )}
                    {item.firstClear && (
                      <Badge tone="brand">{t.learning.firstClearBadge}</Badge>
                    )}
                    <span className="font-mono text-ink-muted">
                      {formatUtcTimestamp(item.createdAt)}
                    </span>
                  </div>

                  {(courseChanged || charChanged) && (
                    <p className="text-xs font-black text-grape">
                      {courseChanged
                        ? `${t.lesson.courseLevelLabel} ${item.courseLevelBefore}→${item.courseLevelAfter}`
                        : ""}
                      {courseChanged && charChanged ? " · " : ""}
                      {charChanged
                        ? `${t.lesson.characterLevelLabel} ${item.characterLevelBefore}→${item.characterLevelAfter}`
                        : ""}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end shrink-0">
                  <div className="text-right text-xs font-bold">
                    <p className="text-sm font-black">
                      {item.score !== null ? `${Math.round(item.score * 100)}%` : "—"}
                    </p>
                    <p className="text-brand-dark">
                      +{item.courseXpGained} {t.lesson.courseXpGained}
                    </p>
                    {item.characterXpGained !== null && (
                      <p className="text-sky">
                        +{item.characterXpGained} {t.lesson.characterXpGained}
                      </p>
                    )}
                  </div>

                  {item.lessonHref ? (
                    <Link
                      href={item.lessonHref}
                      className="btn-secondary !py-1.5 !px-3 text-xs min-h-10"
                    >
                      {t.learning.openLesson} →
                    </Link>
                  ) : (
                    <span className="text-xs font-bold text-ink-muted">
                      {t.learning.lessonUnavailable}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {error && items.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50/50 px-3 py-2 text-xs font-bold text-red-600 dark:border-red-900/40">
          <span>{t.learning.unavailableError}</span>
          <Button size="sm" variant="secondary" onClick={() => void loadMore()}>
            {t.learning.retry}
          </Button>
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center pt-1">
          <Button
            type="button"
            variant="secondary"
            disabled={loadingMore}
            onClick={() => void loadMore()}
          >
            {loadingMore ? t.common.loading : t.learning.loadMore}
          </Button>
        </div>
      )}
    </section>
  );
}
