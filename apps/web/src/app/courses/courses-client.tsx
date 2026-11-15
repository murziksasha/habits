"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { ContinueCta } from "@/components/continue-cta";
import { SubjectCatalog } from "@/components/subject-catalog";

/** Searchable subject catalog. Only published, visible courses from the API. */
export function CoursesClient() {
  const { t } = useLocale();
  const { user } = useAuth();

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">{t.nav.courses}</h1>
          <p className="text-sm font-bold text-ink-muted">{t.catalog.published}</p>
        </div>
        <Link href="/learn" className="btn-secondary !py-2 text-sm min-h-11">
          {t.nav.learn} →
        </Link>
      </div>

      {user ? <ContinueCta variant="card" /> : null}
      <SubjectCatalog variant="grid" />
    </div>
  );
}
