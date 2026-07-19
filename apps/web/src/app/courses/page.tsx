"use client";

import Link from "next/link";
import { COURSE_META, pickLocale } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";

export default function CoursesPage() {
  const { t, locale } = useLocale();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">{t.nav.courses}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(COURSE_META).map((c) => (
          <Link key={c.slug} href={`/courses/${c.slug}`} className="card hover:scale-[1.01] transition">
            <div className="text-4xl">{c.icon}</div>
            <h2 className="mt-3 text-xl font-black">
              {pickLocale(locale, c.titleUk, c.titleEn)}
            </h2>
            <p className="mt-2 text-ink-muted">
              {pickLocale(locale, c.descriptionUk, c.descriptionEn)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
