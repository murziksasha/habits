"use client";

import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";

type State = "new" | "learning" | "fading" | "mastered";

type MapData = {
  course: { slug: string; titleUk: string; titleEn: string; icon: string };
  units: {
    slug: string;
    titleUk: string;
    titleEn: string;
    completed: number;
    total: number;
    mastered: number;
    fading: number;
    avgRetentionPct: number | null;
    state: State;
    lessons: {
      id: string;
      titleUk: string;
      titleEn: string;
      isExam: boolean;
      state: State;
      bestScorePct: number;
      retentionPct: number | null;
      dueInDays: number | null;
    }[];
  }[];
  totals: Record<State | "lessons", number>;
};

const STATE_STYLE: Record<State, string> = {
  new: "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
  learning: "border-sky/50 bg-sky/10",
  fading: "border-orange-400 bg-orange-100 dark:bg-orange-950/40",
  mastered: "border-green-500 bg-green-100 dark:bg-green-950/40",
};

const STATE_LABEL: Record<State, [string, string]> = {
  new: ["Нове", "New"],
  learning: ["Вивчаю", "Learning"],
  fading: ["Забувається", "Fading"],
  mastered: ["Засвоєно", "Mastered"],
};

export function MasteryMapClient() {
  const { token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { locale, t } = useLocale();
  const en = locale === "en";
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<MapData | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (!token || !slug) return;
    api<MapData>(`/deep/mastery-map/${slug}`, { token })
      .then(setData)
      .catch(() => setErr(true));
  }, [token, slug]);

  if (loading || !ready || (!data && !err)) return <PageLoading label={t.common.loading} />;
  if (err || !data) {
    return <p className="card font-bold">{en ? "Could not load the map." : "Не вдалося завантажити карту."}</p>;
  }

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      <div className="space-y-1">
        <Link href={`/courses/${slug}`} className="text-sm font-bold text-sky hover:underline">
          ← {en ? data.course.titleEn : data.course.titleUk}
        </Link>
        <h1 className="text-3xl font-black">
          🗺️ {en ? "Mastery map" : "Карта майстерності"}
        </h1>
        <p className="text-sm font-bold text-ink-muted">
          {en
            ? "Colors combine your best score with estimated memory (forgetting curve). Orange lessons are fading — review them first."
            : "Колір поєднує найкращий результат з оцінкою памʼяті (крива забування). Помаранчеві уроки забуваються — повторіть їх першими."}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-bold">
        {(["mastered", "learning", "fading", "new"] as State[]).map((s) => (
          <span key={s} className={clsx("rounded-full border-2 px-3 py-1", STATE_STYLE[s])}>
            {STATE_LABEL[s][en ? 1 : 0]}: {data.totals[s]}
          </span>
        ))}
        {data.totals.fading > 0 && (
          <Link href={`/review/mixed?course=${slug}`} className="btn-secondary !py-1 text-xs">
            🔀 {en ? "Mixed practice" : "Змішана практика"} →
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {data.units.map((u) => (
          <section key={u.slug} className={clsx("card space-y-3 border-2", STATE_STYLE[u.state])}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-black">{en ? u.titleEn : u.titleUk}</h2>
              <p className="text-xs font-bold text-ink-muted">
                {u.completed}/{u.total} · {en ? "mastered" : "засвоєно"} {u.mastered}
                {u.avgRetentionPct != null ? ` · 🧠 ${u.avgRetentionPct}%` : ""}
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {u.lessons.map((l) => (
                <Link
                  key={l.id}
                  href={`/courses/${slug}/lessons/${l.id}`}
                  className={clsx("rounded-2xl border-2 p-3 transition hover:shadow", STATE_STYLE[l.state])}
                  title={STATE_LABEL[l.state][en ? 1 : 0]}
                >
                  <p className="text-sm font-black">
                    {l.isExam ? "📝 " : ""}
                    {en ? l.titleEn : l.titleUk}
                  </p>
                  <p className="text-xs font-bold text-ink-muted">
                    {STATE_LABEL[l.state][en ? 1 : 0]}
                    {l.state !== "new" ? ` · ${l.bestScorePct}%` : ""}
                    {l.retentionPct != null ? ` · 🧠 ${l.retentionPct}%` : ""}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
