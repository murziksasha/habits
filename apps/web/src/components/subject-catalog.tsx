"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  COURSE_HUB_HREF,
  FEATURED_COURSE_SLUGS,
  SUBJECT_IDS,
  SUBJECT_META,
  pickLocale,
  subjectForCourse,
  type CourseSlug,
  type SubjectId,
} from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

type ApiCourse = {
  slug: string;
  titleUk: string;
  titleEn?: string | null;
  descriptionUk?: string | null;
  descriptionEn?: string | null;
  icon: string;
  color: string;
};

function hubHref(slug: string): string {
  return COURSE_HUB_HREF[slug as CourseSlug] ?? `/courses/${slug}`;
}

/** Published, visible courses from GET /courses, grouped or filtered by subject. */
export function SubjectCatalog({
  variant,
  showChessBot = false,
}: {
  variant: "grid" | "sections";
  showChessBot?: boolean;
}) {
  const { t, locale } = useLocale();
  const [courses, setCourses] = useState<ApiCourse[] | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState<SubjectId | "all">("all");

  useEffect(() => {
    let cancelled = false;
    void api<{ courses?: ApiCourse[] }>("/courses")
      .then((d) => {
        if (!cancelled) setCourses(d.courses ?? []);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (courses ?? [])
      .filter((c) => (subject === "all" ? true : subjectForCourse(c.slug) === subject))
      .filter((c) => {
        if (!q) return true;
        const hay = `${c.titleUk} ${c.titleEn ?? ""} ${c.descriptionUk ?? ""} ${c.descriptionEn ?? ""}`.toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => {
        const as = SUBJECT_META[subjectForCourse(a.slug)].order - SUBJECT_META[subjectForCourse(b.slug)].order;
        if (as !== 0) return as;
        return pickLocale(locale, a.titleUk, a.titleEn).localeCompare(pickLocale(locale, b.titleUk, b.titleEn));
      });
  }, [courses, query, subject, locale]);

  if (error) {
    return (
      <div className="card space-y-3 text-center" role="alert">
        <p className="font-bold text-red-700 dark:text-red-300">{t.catalog.error}</p>
        <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
          {t.catalog.retry}
        </button>
      </div>
    );
  }

  if (!courses) {
    return (
      <div className="card" aria-busy="true">
        <p className="font-bold text-ink-muted">{t.common.loading}</p>
      </div>
    );
  }

  const filters = (
    <div className="flex flex-col gap-3">
      <label className="block">
        <span className="sr-only">{t.catalog.search}</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.catalog.search}
          className="input"
          type="search"
        />
      </label>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t.catalog.all}>
        <button
          type="button"
          className={subject === "all" ? "btn-primary !px-3 !py-2 text-sm" : "btn-secondary !px-3 !py-2 text-sm"}
          aria-pressed={subject === "all"}
          onClick={() => setSubject("all")}
        >
          {t.catalog.all}
        </button>
        {SUBJECT_IDS.map((id) => (
          <button
            key={id}
            type="button"
            className={subject === id ? "btn-primary !px-3 !py-2 text-sm" : "btn-secondary !px-3 !py-2 text-sm"}
            aria-pressed={subject === id}
            onClick={() => setSubject(id)}
          >
            {pickLocale(locale, SUBJECT_META[id].titleUk, SUBJECT_META[id].titleEn)}
          </button>
        ))}
      </div>
      <p className="text-xs font-bold text-ink-muted">{t.catalog.published}</p>
    </div>
  );

  const card = (c: ApiCourse) => (
    <Link
      key={c.slug}
      href={hubHref(c.slug)}
      className="card flex min-h-11 flex-col gap-2 border-l-4 hover:border-brand/40"
      style={{ borderLeftColor: c.color }}
    >
      <span className="text-2xl" aria-hidden>
        {c.icon}
      </span>
      <span className="font-black">{pickLocale(locale, c.titleUk, c.titleEn)}</span>
      <span className="text-sm text-ink-muted line-clamp-2">
        {pickLocale(locale, c.descriptionUk ?? "", c.descriptionEn)}
      </span>
      <span className="text-xs font-bold text-ink-muted">
        {pickLocale(
          locale,
          SUBJECT_META[subjectForCourse(c.slug)].titleUk,
          SUBJECT_META[subjectForCourse(c.slug)].titleEn,
        )}
      </span>
    </Link>
  );

  const featuredCourses = (courses ?? []).filter((c) =>
    (FEATURED_COURSE_SLUGS as readonly string[]).includes(c.slug),
  );
  const showFeatured = !query.trim() && subject === "all" && featuredCourses.length > 0;
  const featuredRow = showFeatured ? (
    <section className="space-y-2" aria-label={t.catalog.featured}>
      <div>
        <h2 className="text-lg font-black">{t.catalog.featured}</h2>
        <p className="text-sm text-ink-muted">{t.catalog.featuredHint}</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
        {featuredCourses
          .slice()
          .sort(
            (a, b) =>
              (FEATURED_COURSE_SLUGS as readonly string[]).indexOf(a.slug) -
              (FEATURED_COURSE_SLUGS as readonly string[]).indexOf(b.slug),
          )
          .map(card)}
      </div>
    </section>
  ) : null;

  if (variant === "grid") {
    return (
      <div className="space-y-4">
        {featuredRow}
        {filters}
        {filtered.length === 0 ? (
          <p className="card font-bold text-ink-muted">{t.catalog.empty}</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(card)}</div>
        )}
      </div>
    );
  }

  const sections = SUBJECT_IDS.map((id) => ({
    id,
    courses: filtered.filter((c) => subjectForCourse(c.slug) === id),
  })).filter((s) => s.courses.length > 0);

  return (
    <div className="space-y-6">
      {featuredRow}
      {sections.length === 0 ? <p className="card font-bold text-ink-muted">{t.catalog.empty}</p> : null}
      {sections.map((s) => (
        <section key={s.id} className="space-y-3">
          <h2 className="text-lg font-black">
            {pickLocale(locale, SUBJECT_META[s.id].titleUk, SUBJECT_META[s.id].titleEn)}
          </h2>
          <p className="text-sm text-ink-muted">
            {pickLocale(locale, SUBJECT_META[s.id].blurbUk, SUBJECT_META[s.id].blurbEn)}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {s.courses.map(card)}
            {showChessBot && s.id === "thinking" ? (
              <Link
                href="/play?level=club"
                className="card flex min-h-11 items-center justify-between border-l-4 border-l-sky font-bold"
              >
                <span className="font-black text-brand-dark">{t.chess.practiceClubBot}</span>
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}
