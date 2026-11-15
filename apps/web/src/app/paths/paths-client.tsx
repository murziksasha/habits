"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COURSE_HUB_HREF,
  COURSE_META,
  LEARNING_PATHS,
  computePathProgress,
  pickLocale,
  type CourseProgressSnapshot,
  type LearningPathDef,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

type PathsResponse = {
  courses?: CourseProgressSnapshot[];
};

function PathCard({
  path,
  snapshot,
}: {
  path: LearningPathDef;
  snapshot: CourseProgressSnapshot[];
}) {
  const { t, locale } = useLocale();
  const progress = computePathProgress(path, snapshot);
  const pct = Math.round(progress.ratio * 100);
  const nextMeta = COURSE_META[progress.nextCourseSlug];
  const nextHref = COURSE_HUB_HREF[progress.nextCourseSlug] ?? `/courses/${progress.nextCourseSlug}`;

  return (
    <article
      id={path.slug}
      className="card space-y-3 border-l-4"
      style={{ borderLeftColor: path.color }}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl" aria-hidden>
          {path.icon}
        </span>
        <div className="min-w-0">
          <h2 className="text-xl font-black">{pickLocale(locale, path.titleUk, path.titleEn)}</h2>
          <p className="text-sm text-ink-muted">{pickLocale(locale, path.blurbUk, path.blurbEn)}</p>
        </div>
      </div>
      <div>
        <div className="mb-1 flex justify-between text-xs font-bold text-ink-muted">
          <span>{t.paths.progress}</span>
          <span>
            {progress.completedLessons} {t.paths.of} {progress.totalLessons} {t.paths.lessons} ·{" "}
            {progress.completedCourses}/{progress.totalCourses} · {pct}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: path.color }}
          />
        </div>
      </div>
      <ol className="space-y-1">
        {path.courseSlugs.map((slug, i) => {
          const meta = COURSE_META[slug];
          const row = snapshot.find((c) => c.slug === slug);
          const done = row?.completedLessons ?? 0;
          const total = row?.totalLessons ?? 0;
          const href = COURSE_HUB_HREF[slug] ?? `/courses/${slug}`;
          return (
            <li key={slug}>
              <Link
                href={href}
                className="flex min-h-11 items-center justify-between gap-2 rounded-xl px-2 py-1.5 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                <span>
                  <span className="text-ink-muted">{i + 1}.</span> {meta.icon}{" "}
                  {pickLocale(locale, meta.titleUk, meta.titleEn)}
                </span>
                <span className="text-xs text-ink-muted">
                  {total > 0 ? `${Math.min(done, total)}/${total}` : ""}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      <Link href={nextHref} className="btn-primary !py-2 text-sm">
        {progress.completedLessons > 0 ? t.paths.continue : t.paths.start}
        {nextMeta ? `: ${pickLocale(locale, nextMeta.titleUk, nextMeta.titleEn)}` : ""} →
      </Link>
    </article>
  );
}

export function PathsClient() {
  const { t, locale } = useLocale();
  const { user, token } = useAuth();
  const [courses, setCourses] = useState<CourseProgressSnapshot[]>([]);

  useEffect(() => {
    if (!user || !token) {
      setCourses([]);
      return;
    }
    let cancelled = false;
    void api<PathsResponse>("/learning/paths", { token })
      .then((d) => {
        if (!cancelled) setCourses(d.courses ?? []);
      })
      .catch(() => {
        if (!cancelled) setCourses([]);
      });
    return () => {
      cancelled = true;
    };
  }, [user, token]);

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-3xl font-black">{t.paths.title}</h1>
        <p className="text-sm font-bold text-ink-muted">{t.paths.subtitle}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {LEARNING_PATHS.map((path) => (
          <PathCard key={path.slug} path={path} snapshot={courses} />
        ))}
      </div>
      <p className="text-center text-sm font-bold text-ink-muted">
        <Link href="/courses" className="text-sky hover:underline">
          {locale === "en" ? "All courses" : "Усі курси"} →
        </Link>
      </p>
    </div>
  );
}
