"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { firstAvailableLessonHref, pickLocale } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { HeartsBar } from "@/components/hearts";
import { XpBar } from "@/components/xp-bar";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";

type Lesson = {
  id: string;
  titleUk: string;
  titleEn?: string;
  locked: boolean;
  status: string;
  isExam?: boolean;
  examLocked?: boolean;
  bestScore: number;
};

type Unit = {
  id: string;
  titleUk: string;
  titleEn?: string;
  lessons: Lesson[];
};

export function DeepCourseHub({
  courseSlug,
  icon,
  color,
  title,
  subtitle,
  backHref,
  backLabel,
}: {
  courseSlug: string;
  icon: string;
  color: string;
  title: string;
  subtitle: string;
  backHref?: string;
  backLabel?: string;
}) {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const [units, setUnits] = useState<Unit[]>([]);
  const [progress, setProgress] = useState({
    xp: 0,
    level: 1,
    completedLessons: 0,
    hearts: 5,
    maxHearts: 5,
  });
  const [dataLoading, setDataLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!token) return;
    setDataLoading(true);
    setLoadError(false);
    void api<{
      units: Unit[];
      progress: typeof progress;
    }>(`/courses/${courseSlug}`, { token })
      .then((d) => {
        setUnits(d.units);
        setProgress(d.progress);
      })
      .catch(() => {
        setUnits([]);
        setLoadError(true);
      })
      .finally(() => setDataLoading(false));
  }, [token, courseSlug]);

  if (loading || !ready || (dataLoading && !units.length && !loadError)) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!user) return <PageLoading label={t.common.loading} />;

  if (loadError && !units.length) {
    return (
      <div className="card mx-auto max-w-lg space-y-3 text-center">
        <p className="font-bold text-red-500">{t.common.error}</p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => window.location.reload()}
        >
          {locale === "en" ? "Retry" : "Спробувати знову"}
        </button>
        {backHref && (
          <Link href={backHref} className="btn-secondary inline-flex">
            {backLabel ?? "←"}
          </Link>
        )}
      </div>
    );
  }

  const allLessons = units.flatMap((u) => u.lessons);
  const total = allLessons.length;
  const exams = allLessons.filter((l) => l.isExam);
  const examsDone = exams.filter((l) => l.status === "completed").length;
  const continueHref =
    firstAvailableLessonHref(courseSlug, units) ?? `/courses/${courseSlug}`;
  const nextLesson =
    allLessons.find((l) => !l.locked && l.status !== "completed") ??
    allLessons.find((l) => !l.locked) ??
    null;
  const pathPct = total ? Math.round((progress.completedLessons / total) * 100) : 0;
  const readyExams = exams.filter(
    (l) => !l.locked && l.status !== "completed" && !l.examLocked,
  );

  return (
    <div className="space-y-8 pb-24 md:pb-8">
      <section
        className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        style={{ borderColor: `${color}55` }}
      >
        <div>
          <p className="text-4xl" aria-hidden>
            {icon}
          </p>
          <h1 className="mt-2 text-3xl font-black">{title}</h1>
          <p className="text-ink-muted font-bold">{subtitle}</p>
          <p className="mt-1 text-sm font-bold text-ink-muted">
            {progress.completedLessons}/{total} · 📝 {examsDone}/{exams.length}{" "}
            {t.lesson.exam} · {pathPct}%
          </p>
          <div className="mt-2 h-2 max-w-md overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, pathPct)}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>
        <div className="w-full max-w-xs space-y-3">
          <HeartsBar hearts={progress.hearts} max={progress.maxHearts} />
          <XpBar
            xp={progress.xp}
            color={color}
            label={`${t.dashboard.level} ${progress.level}`}
          />
          <div className="flex flex-wrap gap-2">
            <Link href={continueHref} className="btn-primary !py-2 text-sm min-h-11">
              {t.onboarding.continuePath}
              {nextLesson
                ? `: ${pickLocale(locale, nextLesson.titleUk, nextLesson.titleEn).slice(0, 28)}`
                : ""}{" "}
              →
            </Link>
            <Link
              href={`/courses/${courseSlug}`}
              className="btn-secondary !py-2 text-sm min-h-11"
            >
              {locale === "en" ? "Full path" : "Повний path"}
            </Link>
            {backHref && (
              <Link href={backHref} className="btn-secondary !py-2 text-sm min-h-11">
                {backLabel ?? "←"}
              </Link>
            )}
          </div>
        </div>
      </section>

      {readyExams.length > 0 && (
        <section className="card space-y-2 border-grape/30">
          <h2 className="text-sm font-black uppercase text-grape">
            📝 {locale === "en" ? "Exams ready" : "Контрольні готові"}
          </h2>
          {readyExams.slice(0, 3).map((e) => (
            <Link
              key={e.id}
              href={`/courses/${courseSlug}/lessons/${e.id}`}
              className="flex min-h-11 justify-between rounded-xl border border-grape/20 px-3 py-2 text-sm font-bold hover:bg-grape/5"
            >
              <span>{pickLocale(locale, e.titleUk, e.titleEn)}</span>
              <span className="text-grape">→</span>
            </Link>
          ))}
        </section>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {units.map((u, i) => {
          const done = u.lessons.filter((l) => l.status === "completed").length;
          const examL = u.lessons.find((l) => l.isExam);
          const unitNext = u.lessons.find((l) => !l.locked && l.status !== "completed");
          const unitPct = u.lessons.length
            ? Math.round((done / u.lessons.length) * 100)
            : 0;
          return (
            <div key={u.id} className="card space-y-2">
              <p className="text-xs font-bold text-ink-muted">
                {i + 1}. {pickLocale(locale, u.titleUk, u.titleEn)}
              </p>
              <p className="text-sm font-bold">
                {done}/{u.lessons.length}
                {examL
                  ? ` · ${
                      examL.status === "completed"
                        ? `✓ ${t.lesson.exam}`
                        : examL.examLocked
                          ? t.lesson.examLocked
                          : t.lesson.exam
                    }`
                  : ""}
              </p>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-sky transition-all"
                  style={{ width: `${unitPct}%` }}
                />
              </div>
              {unitNext ? (
                <Link
                  href={`/courses/${courseSlug}/lessons/${unitNext.id}`}
                  className="text-xs font-bold text-sky hover:underline"
                >
                  → {pickLocale(locale, unitNext.titleUk, unitNext.titleEn).slice(0, 32)}
                </Link>
              ) : (
                <Link
                  href={`/courses/${courseSlug}`}
                  className="text-xs font-bold text-sky hover:underline"
                >
                  → path
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {nextLesson ? (
        <div className="fixed inset-x-0 bottom-16 z-30 border-t border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur md:bottom-0 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <p className="truncate text-sm font-bold">
              {locale === "en" ? "Continue" : "Продовжити"}:{" "}
              {pickLocale(locale, nextLesson.titleUk, nextLesson.titleEn)}
            </p>
            <Link
              href={`/courses/${courseSlug}/lessons/${nextLesson.id}`}
              className="btn-primary shrink-0 !py-2 text-sm"
            >
              {locale === "en" ? "Go" : "Далі"} →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
