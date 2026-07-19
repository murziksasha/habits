"use client";

import Link from "next/link";
import {
  COURSE_GROUP_META,
  COURSE_HUB_HREF,
  COURSE_META,
  pickLocale,
  type CourseGroup,
  type CourseSlug,
} from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";

const GROUP_ORDER: CourseGroup[] = ["code", "deep", "skill", "chess"];

export default function CoursesPage() {
  const { t, locale } = useLocale();
  const groups = GROUP_ORDER.map((g) => ({
    group: g,
    meta: COURSE_GROUP_META[g],
    courses: (Object.keys(COURSE_META) as CourseSlug[]).filter(
      (s) => COURSE_META[s].group === g,
    ),
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">{t.nav.courses}</h1>
          <p className="text-sm font-bold text-ink-muted">{t.learn.mapTitle}</p>
        </div>
        <Link href="/learn" className="btn-secondary !py-2 text-sm">
          {t.nav.learn} →
        </Link>
      </div>

      {groups.map(({ group, meta, courses }) => (
        <section key={group} className="space-y-3">
          <h2 className="text-lg font-black text-ink-muted">
            {locale === "en" ? meta.titleEn : meta.titleUk}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((slug) => {
              const c = COURSE_META[slug];
              const href = COURSE_HUB_HREF[slug] ?? `/courses/${slug}`;
              return (
                <Link
                  key={slug}
                  href={href}
                  className="card hover:scale-[1.01] transition border-l-4"
                  style={{ borderLeftColor: c.color }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-4xl">{c.icon}</div>
                    {group === "deep" && (
                      <span className="rounded-full bg-grape/15 px-2 py-0.5 text-[10px] font-black text-grape">
                        Deep
                      </span>
                    )}
                    {group === "code" && (
                      <span className="rounded-full bg-sky/15 px-2 py-0.5 text-[10px] font-black text-sky">
                        Path
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-xl font-black">
                    {pickLocale(locale, c.titleUk, c.titleEn)}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted line-clamp-3">
                    {pickLocale(locale, c.descriptionUk, c.descriptionEn)}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
