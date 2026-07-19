"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { pickLocale, UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { XpBar } from "@/components/xp-bar";
import { HeartsBar } from "@/components/hearts";
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

export default function CourseHubPage() {
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

  if (loading || !data) {
    return <p className="text-ink-muted">{error || UI.common.loading}</p>;
  }

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
          {data.freemium && !data.freemium.isPremium && (
            <p className="text-xs font-bold text-grape">
              {t.learn.freeLeft}: ~{data.freemium.freeLeft}
              {" · "}
              <Link href="/pricing" className="underline">
                Premium
              </Link>
            </p>
          )}
          {(data.progress.hearts ?? 5) <= 0 && user?.plan !== "premium" && (
            <div className="rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-600">
              {UI.hearts.empty}. {UI.hearts.emptyHint}{" "}
              <Link href="/pricing" className="underline">
                Premium
              </Link>
            </div>
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
                      "card flex items-center justify-between opacity-70",
                      lesson.isExam && "border-grape/40",
                    )}
                  >
                    <div>
                      <p className="font-black">
                        {lesson.isExam ? "📝 " : ""}
                        {pickLocale(locale, lesson.titleUk, lesson.titleEn)}
                      </p>
                      <p className="text-sm text-ink-muted">
                        {lesson.examLocked ? t.lesson.examLocked : UI.common.locked}
                      </p>
                    </div>
                    <Link href="/pricing" className="btn-secondary !py-2 !px-3 text-xs">
                      Premium
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={`/courses/${slug}/lessons/${lesson.id}`}
                    className={clsx(
                      "card flex items-center justify-between transition hover:border-brand/50",
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
