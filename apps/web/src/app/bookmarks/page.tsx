"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

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
  const { t } = useLocale();
  const router = useRouter();
  const [items, setItems] = useState<Bm[]>([]);

  async function load() {
    if (!token) return;
    const d = await api<{ bookmarks: Bm[] }>("/bookmarks", { token });
    setItems(d.bookmarks);
  }

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (token) void load().catch(() => setItems([]));
  }, [token]);

  if (loading || !user) return <p>{t.common.loading}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">⭐ {t.nav.bookmarks}</h1>
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
