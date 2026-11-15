"use client";

import { ORACLE_SECTIONS, oracleUnitMeta, pickLocale } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";

type UnitLike = {
  slug?: string;
  titleUk: string;
  titleEn?: string | null;
  lessons: { status: string }[];
};

export function OracleSectionBar({
  units,
  value,
  onChange,
}: {
  units: UnitLike[];
  value: string;
  onChange: (id: string) => void;
}) {
  const { t, locale } = useLocale();
  const options = [
    { id: "all", titleUk: t.coursePage.allSections, titleEn: t.coursePage.allSections },
    ...ORACLE_SECTIONS,
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-muted">{t.coursePage.freeBrowse}</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t.coursePage.sectionProgress}>
        {options.map((s) => {
          const inSection =
            s.id === "all" ? units : units.filter((u) => u.slug && oracleUnitMeta(u.slug)?.section === s.id);
          const lessons = inSection.flatMap((u) => u.lessons);
          const done = lessons.filter((l) => l.status === "completed").length;
          const pressed = value === s.id;
          return (
            <button
              key={s.id}
              type="button"
              className={pressed ? "btn-primary !px-3 !py-2 text-sm" : "btn-secondary !px-3 !py-2 text-sm"}
              aria-pressed={pressed}
              onClick={() => onChange(s.id)}
            >
              {s.id === "all" ? t.coursePage.allSections : pickLocale(locale, s.titleUk, s.titleEn)}
              <span className="ml-2 font-bold">
                {done}/{lessons.length}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function prerequisiteLabels(unitSlug: string | undefined, units: UnitLike[], locale: string): string[] {
  if (!unitSlug) return [];
  const ids = oracleUnitMeta(unitSlug)?.prerequisites ?? [];
  return ids.map((id) => {
    const found = units.find((u) => u.slug === id);
    return found ? pickLocale(locale, found.titleUk, found.titleEn) : id;
  });
}

export function unitInOracleSection(unitSlug: string | undefined, section: string): boolean {
  if (section === "all") return true;
  if (!unitSlug) return false;
  return oracleUnitMeta(unitSlug)?.section === section;
}
