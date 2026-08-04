"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { EmptyState } from "@/components/ui";
import { useRequireAuth } from "@/lib/use-require-auth";

type Bm = {
  id: string;
  lessonId: string;
  lessonTitleUk: string;
  courseSlug: string;
  courseTitleUk: string;
  note: string;
};

export default function BookmarksPage() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const [items, setItems] = useState<Bm[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  async function load() {
    if (!token) return;
    setDataLoading(true);
    try {
      const d = await api<{ bookmarks: Bm[] }>("/bookmarks", { token });
      setItems(d.bookmarks);
    } catch {
      setItems([]);
    } finally {
      setDataLoading(false);
    }
  }

  useEffect(() => {
    if (token) void load();
  }, [token]);

  if (loading || !ready || dataLoading) return <PageLoading label={t.common.loading} />;
  if (!user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <h1 className="text-3xl font-black">⭐ {t.nav.bookmarks}</h1>
      {!items.length && (
        <EmptyState
          title={locale === "en" ? "No bookmarks" : "Немає закладок"}
          description={
            locale === "en"
              ? "Star a lesson during study to save it here."
              : "Поставте зірку на уроці, щоб зберегти його тут."
          }
          actionHref="/learn"
          actionLabel={t.nav.learn}
        />
      )}
      <div className="space-y-3">
        {items.map((b) => (
          <div key={b.id} className="card flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div>
              <Link
                href={`/courses/${b.courseSlug}/lessons/${b.lessonId}`}
                className="font-black text-lg hover:text-sky"
              >
                {b.lessonTitleUk}
              </Link>
              <p className="text-sm text-ink-muted">{b.courseTitleUk}</p>
              {b.note && (
                <p className="mt-1 text-sm">
                  <span className="font-bold">{t.extra.note}:</span> {b.note}
                </p>
              )}
            </div>
            <button
              type="button"
              className="btn-secondary !py-2 text-sm"
              onClick={() =>
                void api(`/bookmarks/${b.lessonId}`, { method: "DELETE", token }).then(load)
              }
            >
              {t.extra.removeBookmark}
            </button>
          </div>
        ))}
        {!items.length && <p className="text-ink-muted">—</p>}
      </div>
    </div>
  );
}
