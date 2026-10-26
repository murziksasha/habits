"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { pickLocale, UI } from "@eduforge/shared";
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

type Unit = { id: string; titleUk: string; titleEn?: string; lessons: Lesson[] };

export function CourseDetailClient() {
  const { slug } = useParams<{ slug: string }>();
  const { token, user, loading } = useAuth();
  const { locale } = useLocale();
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
      .catch(() => setError("Не вдалося завантажити курс"));
  }, [loading, token, user, slug]);

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
        <p className="font-bold text-red-500">{error || UI.common.error}</p>
        <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
          {locale === "en" ? "Retry" : "Спробувати знову"}
        </button>
      </div>
    );
  }

  const allLessons = data.units.flatMap((u) => u.lessons);
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
              {continueLesson.status === "completed"
                ? locale === "en"
                  ? "Review lesson"
                  : "Повторити урок"
                : locale === "en"
                  ? "Continue"
                  : "Продовжити"}
              : {pickLocale(locale, continueLesson.titleUk, continueLesson.titleEn)} →
            </Link>
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
            {locale === "en" ? "Completed lessons" : "Завершено уроків"}:{" "}
            {data.progress.completedLessons}
            {totalCount > 0 ? ` / ${totalCount}` : ""}
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

      {data.units.map((unit, ui) => {
        const unitDone = unit.lessons.filter((l) => l.status === "completed").length;
        const unitTotal = unit.lessons.length || 1;
        return (
          <section key={unit.id} className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-lg font-black text-ink-muted">
                {locale === "en" ? "Unit" : "Розділ"} {ui + 1}:{" "}
                {pickLocale(locale, unit.titleUk, unit.titleEn)}
              </h2>
              <span className="text-xs font-black text-ink-muted">
                {unitDone}/{unitTotal}
              </span>
            </div>
            <div className="h-1.5 max-w-md overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-sky transition-all"
                style={{ width: `${Math.min(100, (unitDone / unitTotal) * 100)}%` }}
              />
            </div>
            <div className="relative mx-auto flex max-w-md flex-col items-center gap-4">
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
                          {locale === "en" ? "Finish unit lessons first" : "Пройдіть уроки розділу"}
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
            </div>
          </section>
        );
      })}
    </div>
  );
}
