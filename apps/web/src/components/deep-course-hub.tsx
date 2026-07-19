"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { pickLocale } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { HeartsBar } from "@/components/hearts";
import { XpBar } from "@/components/xp-bar";

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
  const { t, locale } = useLocale();
  const router = useRouter();
  const [units, setUnits] = useState<Unit[]>([]);
  const [progress, setProgress] = useState({
    xp: 0,
    level: 1,
    completedLessons: 0,
    hearts: 5,
    maxHearts: 5,
  });

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<{
      units: Unit[];
      progress: typeof progress;
    }>(`/courses/${courseSlug}`, { token })
      .then((d) => {
        setUnits(d.units);
        setProgress(d.progress);
      })
      .catch(() => undefined);
  }, [token, courseSlug]);

  if (loading || !user) return <p>{t.common.loading}</p>;

  const total = units.reduce((a, u) => a + u.lessons.length, 0);
  const exams = units.flatMap((u) => u.lessons.filter((l) => l.isExam));
  const examsDone = exams.filter((l) => l.status === "completed").length;

  return (
    <div className="space-y-8">
      <section
        className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        style={{ borderColor: `${color}55` }}
      >
        <div>
          <p className="text-4xl">{icon}</p>
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
            <Link
              href={`/courses/${courseSlug}`}
              className="btn-primary !py-2 text-sm"
            >
              {t.dashboard.continueLearning}
            </Link>
            {backHref && (
              <Link href={backHref} className="btn-secondary !py-2 text-sm">
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
