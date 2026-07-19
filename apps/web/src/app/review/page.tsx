"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

type Item = {
  lessonId: string;
  lessonTitleUk: string;
  courseSlug: string;
  courseTitleUk: string;
  courseIcon: string;
  masteryPct: number;
  attempts: number;
};

export default function ReviewPage() {
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [stats, setStats] = useState({ total: 0, mastered: 0, weak: 0 });

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<{ items: Item[] }>("/review", { token })
      .then((d) => setItems(d.items))
      .catch(() => setItems([]));
    void api<{ total: number; mastered: number; weak: number }>("/review/stats", { token })
      .then(setStats)
      .catch(() => undefined);
  }, [token]);

  if (loading || !user) return <p>{t.common.loading}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">🔁 {t.review.title}</h1>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">{t.review.stats}</p>
          <p className="text-2xl font-black">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">{t.review.mastered}</p>
          <p className="text-2xl font-black text-green-600">{stats.mastered}</p>
        </div>
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">{t.review.weak}</p>
          <p className="text-2xl font-black text-orange-500">{stats.weak}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="card text-ink-muted font-bold">{t.review.empty}</p>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <div
              key={it.lessonId}
              className="card flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm text-ink-muted">
                  {it.courseIcon} {it.courseTitleUk}
                </p>
                <p className="font-black text-lg">{it.lessonTitleUk}</p>
                <p className="text-sm font-bold">
                  {t.review.mastery}: {it.masteryPct}% · attempts: {it.attempts}
                </p>
                <div className="mt-2 h-2 max-w-xs overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-orange-400"
                    style={{ width: `${it.masteryPct}%` }}
                  />
                </div>
              </div>
              <Link
                href={`/courses/${it.courseSlug}/lessons/${it.lessonId}`}
                className="btn-primary shrink-0"
              >
                {t.review.open}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
