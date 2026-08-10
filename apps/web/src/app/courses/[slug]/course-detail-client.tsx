"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { freemiumPathLabel, pickLocale, UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { XpBar } from "@/components/xp-bar";
import { HeartsBar } from "@/components/hearts";
import { Skeleton } from "@/components/ui";
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
};

type Unit = { id: string; titleUk: string; titleEn?: string; lessons: Lesson[] };

export function CourseDetailClient() {
  const { slug } = useParams<{ slug: string }>();
  const { token, user, loading } = useAuth();
  const { locale, t } = useLocale();
  const router = useRouter();
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
    freemium?: {
      freeLessonCount: number;
      freeCompleted: number;
      freeLeft: number;
      isPremium: boolean;
    };
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
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token || !slug) return;
    void api<typeof data extends null ? never : NonNullable<typeof data>>(
      `/courses/${slug}`,
      { token },
    )
      .then(setData)
      .catch(() => setError("Не вдалося завантажити курс"));
  }, [token, slug]);

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

  const freeLabel =
    data.freemium &&
    freemiumPathLabel({
      freeCompleted: data.freemium.freeCompleted,
      freeLessonCount: data.freemium.freeLessonCount,
      isPremium: data.freemium.isPremium,
      locale: locale === "en" ? "en" : "uk",
    });

  return (
    <div className="space-y-8">
      <div className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-4xl">{data.course.icon}</div>
          <h1 className="mt-2 text-3xl font-black">
            {pickLocale(locale, data.course.titleUk, data.course.titleEn)}
          </h1>
          <p className="text-ink-muted">
            {pickLocale(locale, data.course.descriptionUk, data.course.descriptionEn)}
          </p>
        </div>
        <div className="w-full max-w-xs space-y-3">
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
          <p className="text-sm font-bold text-ink-muted">
            Завершено уроків: {data.progress.completedLessons}
          </p>
          {data.freemium && freeLabel && (
            <div className="rounded-2xl border-2 border-grape/30 bg-grape/5 px-3 py-2">
              <p className="text-xs font-black uppercase text-grape">{t.onboarding.freePath}</p>
              <p className="text-sm font-bold text-grape">
                {freeLabel}
                {!data.freemium.isPremium && (
                  <>
                    {" · "}
                    <Link href="/pricing" className="underline">
                      Premium
                    </Link>
                  </>
                )}
              </p>
              {!data.freemium.isPremium && data.freemium.freeLessonCount > 0 && (
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white dark:bg-slate-800">
                  <div
                    className="h-full bg-grape transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        (data.freemium.freeCompleted / data.freemium.freeLessonCount) * 100,
                      )}%`,
                    }}
                  />
                </div>
              )}
            </div>
          )}
          {(data.progress.hearts ?? 5) <= 0 && user?.plan !== "premium" && (
            <div className="rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-600 dark:bg-red-950">
              {UI.hearts.empty}. {UI.hearts.emptyHint}{" "}
              <Link href="/pricing" className="underline">
                Premium
              </Link>
              {" · "}
              <Link href="/review" className="underline">
                {t.nav.review}
              </Link>
            </div>
          )}
          {(data.progress.hearts ?? 5) === 1 && user?.plan !== "premium" && (
            <p className="text-xs font-bold text-sun">⚠️ {t.onboarding.heartsLow}</p>
          )}
        </div>
      </div>

      {data.units.map((unit, ui) => (
        <section key={unit.id} className="space-y-3">
          <h2 className="text-lg font-black text-ink-muted">
            Розділ {ui + 1}: {pickLocale(locale, unit.titleUk, unit.titleEn)}
          </h2>
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
                        {lesson.examLocked
                          ? t.lesson.examLocked
                          : data.freemium && !data.freemium.isPremium
                            ? `${UI.common.locked} · ${t.onboarding.freePath} ${data.freemium.freeCompleted}/${data.freemium.freeLessonCount}`
                            : UI.common.locked}
                      </p>
                    </div>
                    {!lesson.examLocked && (
                      <Link href="/pricing" className="btn-secondary !py-2 !px-3 text-xs">
                        Premium
                      </Link>
                    )}
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
                            {t.lesson.exam}
                          </span>
                        ) : null}
                      </p>
                      <p className="text-sm text-ink-muted">
                        {lesson.status === "completed"
                          ? `✓ ${Math.round(lesson.bestScore * 100)}%`
                          : lesson.isExam
                            ? t.lesson.exam
                            : "Доступно"}
                      </p>
                    </div>
                    <span
                      className={clsx(
                        "grid h-12 w-12 place-items-center rounded-full text-xl text-white shadow-btn",
                        lesson.isExam ? "bg-grape" : "bg-brand",
                      )}
                    >
                      {lesson.status === "completed" ? "★" : lesson.isExam ? "📝" : "▶"}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
