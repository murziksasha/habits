"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { pickLocale, UI } from "@eduforge/shared";
import { OracleSectionBar, prerequisiteLabels, unitInOracleSection } from "@/components/oracle-sections";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { XpBar } from "@/components/xp-bar";
import { HeartsBar } from "@/components/hearts";
import { Skeleton } from "@/components/ui";
import { GuestBanner } from "@/components/guest-banner";
import { getGuestProgress, overlayGuestProgress } from "@/lib/guest-progress";
import clsx from "clsx";

type Lesson = {
  id: string;
  titleUk: string;
  titleEn?: string;
  locked: boolean;
  status: string;
  bestScore: number;
  isExam?: boolean;
  examLocked?: boolean;
  passThreshold?: number | null;
  baseXp?: number;
};

type Unit = { id: string; slug?: string; titleUk: string; titleEn?: string; lessons: Lesson[] };

export function CourseDetailClient() {
  const { slug } = useParams<{ slug: string }>();
  const { token, user, loading } = useAuth();
  const { locale, t } = useLocale();
  const [section, setSection] = useState("all");
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({});
  const [data, setData] = useState<{
    course: {
      titleUk: string;
      titleEn?: string;
      descriptionUk: string;
      descriptionEn?: string;
      icon: string;
      color: string;
    };
    units: Unit[];
    progress: {
      xp: number;
      level: number;
      completedLessons: number;
      hearts: number;
      maxHearts: number;
    };
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading || !slug) return;
    void api<{
      course: {
        titleUk: string;
        titleEn?: string;
        descriptionUk: string;
        descriptionEn?: string;
        icon: string;
        color: string;
      };
      units: Unit[];
      progress: {
        xp: number;
        level: number;
        completedLessons: number;
        hearts: number;
        maxHearts: number;
      };
    }>(`/courses/${slug}`, token ? { token } : {})
      .then((res) => {
        if (!user) {
          const guestIds = getGuestProgress(slug);
          const overlaid = overlayGuestProgress(res.units, guestIds);
          setData({
            ...res,
            units: overlaid.units,
            progress: {
              ...res.progress,
              completedLessons: overlaid.completedCount,
            },
          });
        } else {
          setData(res);
        }
      })
      .catch(() => setError(t.common.error));
  }, [loading, token, user, slug, t]);

  if (loading || (!data && !error)) {
    return (
      <div className="space-y-4" aria-busy="true">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <p className="sr-only">{UI.common.loading}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="card mx-auto max-w-lg space-y-3 text-center">
        <p className="font-bold text-red-700 dark:text-red-300">{error || t.common.error}</p>
        <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
          {t.catalog.retry}
        </button>
      </div>
    );
  }

  const oracle = slug === "sql_fundamentals";
  const visibleUnits = oracle ? data.units.filter((u) => unitInOracleSection(u.slug, section)) : data.units;
  const allLessons = visibleUnits.flatMap((u) => u.lessons);
  const continueLesson =
    allLessons.find((l) => !l.locked && l.status !== "completed") ??
    allLessons.find((l) => !l.locked) ??
    null;
  const completedCount = allLessons.filter((l) => l.status === "completed").length;
  const totalCount = allLessons.length || 1;

  return (
    <div className="space-y-8 pb-24 md:pb-8">
      {!user ? <GuestBanner /> : null}

      <div className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-4xl">{data.course.icon}</div>
          <h1 className="mt-2 text-3xl font-black">
            {pickLocale(locale, data.course.titleUk, data.course.titleEn)}
          </h1>
          <p className="text-ink-muted">
            {pickLocale(locale, data.course.descriptionUk, data.course.descriptionEn)}
          </p>
          {continueLesson ? (
            <Link
              href={`/courses/${slug}/lessons/${continueLesson.id}`}
              className="btn-primary mt-4 inline-flex min-h-11"
            >
              {continueLesson.status === "completed" ? t.coursePage.reviewLesson : t.coursePage.continue}
              : {pickLocale(locale, continueLesson.titleUk, continueLesson.titleEn)} →
            </Link>
          ) : null}
          {user && completedCount > 0 ? (
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold">
              <Link href={`/courses/${slug}/mastery`} className="text-sky hover:underline">
                🗺️ {locale === "en" ? "Mastery map" : "Карта майстерності"} →
              </Link>
              <Link href={`/review/mixed?course=${slug}`} className="text-sky hover:underline">
                🔀 {locale === "en" ? "Mixed practice" : "Змішана практика"} →
              </Link>
            </div>
          ) : null}
        </div>
        <div className="w-full max-w-xs space-y-3">
          {user ? (
            <>
              <div className="flex justify-end">
                <HeartsBar
                  hearts={data.progress.hearts ?? 5}
                  max={data.progress.maxHearts ?? 5}
                />
              </div>
              <XpBar
                xp={data.progress.xp}
                color={data.course.color}
                label={`${UI.dashboard.level} ${data.progress.level}`}
              />
            </>
          ) : null}
          <p className="text-sm font-bold text-ink-muted">
            {t.coursePage.completed}: {completedCount} / {allLessons.length}
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{
                width: `${Math.min(100, (completedCount / totalCount) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-black">{t.coursePage.outline}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-secondary !px-3 !py-2 text-sm"
            onClick={() =>
              setOpenUnits(Object.fromEntries(visibleUnits.map((u) => [u.id, true])))
            }
          >
            {t.coursePage.expandAll}
          </button>
          <button
            type="button"
            className="btn-secondary !px-3 !py-2 text-sm"
            onClick={() =>
              setOpenUnits(Object.fromEntries(visibleUnits.map((u) => [u.id, false])))
            }
          >
            {t.coursePage.collapseAll}
          </button>
        </div>
      </div>
      {oracle ? <OracleSectionBar units={data.units} value={section} onChange={setSection} /> : null}

      {visibleUnits.map((unit, ui) => {
        const defaultOpenId =
          visibleUnits.find((u) => u.lessons.some((l) => l.status !== "completed"))?.id ??
          visibleUnits[0]?.id;
        const open = openUnits[unit.id] ?? unit.id === defaultOpenId;
        const prereq = prerequisiteLabels(unit.slug, data.units, locale);
        const unitDone = unit.lessons.filter((l) => l.status === "completed").length;
        const unitTotal = unit.lessons.length || 1;
        return (
          <section key={unit.id} className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h3 className="text-lg font-black text-ink">
                <button
                  type="button"
                  className="min-h-11 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenUnits((prev) => ({ ...prev, [unit.id]: !open }))}
                >
                  {open ? "▾" : "▸"} {ui + 1}. {pickLocale(locale, unit.titleUk, unit.titleEn)}
                </button>
              </h3>
              <span className="text-xs font-black text-ink-muted">
                {unitDone}/{unitTotal} · {unitDone === unit.lessons.length && unit.lessons.length > 0 ? t.coursePage.completed : t.coursePage.available}
              </span>
            </div>
            {prereq.length > 0 ? (
              <p className="text-xs text-ink-muted">
                {t.coursePage.prerequisites}: {prereq.join(", ")}
              </p>
            ) : null}
            <div className="h-1.5 max-w-md overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-sky transition-all"
                style={{ width: `${Math.min(100, (unitDone / unitTotal) * 100)}%` }}
              />
            </div>
            {open ? <div className="relative mx-auto flex max-w-md flex-col items-center gap-4">
              {unit.lessons.map((lesson, i) => (
                <div key={lesson.id} className="w-full">
                  {lesson.locked ? (
                    <div
                      className={clsx(
                        "card flex items-center justify-between opacity-80",
                        lesson.isExam && "border-grape/40",
                      )}
                    >
                      <div>
                        <p className="font-black">
                          🔒 {lesson.isExam ? "📝 " : ""}
                          {pickLocale(locale, lesson.titleUk, lesson.titleEn)}
                        </p>
                        <p className="text-sm text-ink-muted">
                          {t.coursePage.locked}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={`/courses/${slug}/lessons/${lesson.id}`}
                      className={clsx(
                        "card flex min-h-11 items-center justify-between transition hover:border-brand/50",
                        lesson.status === "completed" && "border-brand/40 bg-brand-soft/30",
                        lesson.isExam && "border-grape/40",
                      )}
                      style={{ marginLeft: i % 2 === 0 ? 0 : "12%" }}
                    >
                      <div>
                        <p className="font-black">
                          {lesson.isExam ? "📝 " : ""}
                          {pickLocale(locale, lesson.titleUk, lesson.titleEn)}
                          {lesson.isExam ? (
                            <span className="ml-2 rounded-full bg-grape/15 px-2 py-0.5 text-[10px] font-black text-grape">
                              {locale === "en" ? "Exam" : "Контрольна"}
                            </span>
                          ) : null}
                        </p>
                        <p className="text-xs text-ink-muted">
                          +{lesson.baseXp ?? 10} XP
                          {lesson.bestScore > 0
                            ? ` · ${Math.round(lesson.bestScore * 100)}%`
                            : ""}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-ink-muted">
                        {lesson.status === "completed" ? "✓" : "→"}
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div> : null}
          </section>
        );
      })}

      {continueLesson ? (
        <div className="fixed inset-x-0 bottom-16 z-30 border-t border-slate-200 bg-[var(--ef-card-bg)]/95 p-3 shadow-card backdrop-blur md:bottom-0">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <p className="truncate text-sm font-bold">
              {t.coursePage.continue}: {pickLocale(locale, continueLesson.titleUk, continueLesson.titleEn)}
            </p>
            <Link href={`/courses/${slug}/lessons/${continueLesson.id}`} className="btn-primary shrink-0 !py-2 text-sm min-h-11">
              {t.coursePage.continue} →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
