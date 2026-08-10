"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pickLocale } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { HeartsBar } from "@/components/hearts";
import { XpBar } from "@/components/xp-bar";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";
import { firstAvailableLessonHref } from "@eduforge/shared";

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

  const total = units.reduce((a, u) => a + u.lessons.length, 0);
  const exams = units.flatMap((u) => u.lessons.filter((l) => l.isExam));
  const examsDone = exams.filter((l) => l.status === "completed").length;
  const continueHref =
    firstAvailableLessonHref(courseSlug, units) ?? `/courses/${courseSlug}`;

  return (
    <div className="space-y-8 pb-20 md:pb-0">
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
          <p className="text-sm font-bold text-ink-muted mt-1">
            {progress.completedLessons}/{total} · 📝 {examsDone}/{exams.length}{" "}
            {t.lesson.exam}
          </p>
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
              {t.onboarding.continuePath} →
            </Link>
            <Link
              href={`/courses/${courseSlug}`}
              className="btn-secondary !py-2 text-sm min-h-11"
            >
              {t.dashboard.continueLearning}
            </Link>
            {backHref && (
              <Link href={backHref} className="btn-secondary !py-2 text-sm min-h-11">
                {backLabel ?? "←"}
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {units.map((u, i) => {
          const done = u.lessons.filter((l) => l.status === "completed").length;
          const examL = u.lessons.find((l) => l.isExam);
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
              <Link
                href={`/courses/${courseSlug}`}
                className="text-xs font-bold text-sky hover:underline"
              >
                → path
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
