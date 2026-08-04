"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";

export default function ChallengesPage() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const [data, setData] = useState<{
    challenge: {
      weekKey: string;
      titleUk: string;
      titleEn: string;
      descriptionUk: string;
      descriptionEn: string;
      targetXp: number;
      endsAt: string;
    };
    progress: { xp: number; completedAt: string | null };
    leaderboard: {
      rank: number;
      displayName: string | null;
      xp: number;
      userId: string;
    }[];
  } | null>(null);

  useEffect(() => {
    if (!token) return;
    void api<NonNullable<typeof data>>("/challenges/current", { token })
      .then(setData)
      .catch(() => setData(null));
  }, [token]);

  if (loading || !ready || !data) return <PageLoading label={t.common.loading} />;
  if (!user) return <PageLoading label={t.common.loading} />;

  const { challenge: ch, progress, leaderboard } = data;
  const ratio = Math.min(1, progress.xp / Math.max(1, ch.targetXp));
  const done = Boolean(progress.completedAt) || progress.xp >= ch.targetXp;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <h1 className="text-3xl font-black">🎯 {t.challenges.title}</h1>

      <div className="card space-y-3">
        <p className="text-sm font-bold text-ink-muted">{ch.weekKey}</p>
        <h2 className="text-xl font-black">
          {locale === "en" ? ch.titleEn : ch.titleUk}
        </h2>
        <p className="text-ink-muted">
          {locale === "en" ? ch.descriptionEn : ch.descriptionUk}
        </p>
        <div className="flex justify-between text-sm font-bold">
          <span>
            {t.challenges.yourXp}: {progress.xp}
          </span>
          <span>
            {t.challenges.target}: {ch.targetXp}
          </span>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full ${done ? "bg-grape" : "bg-brand"}`}
            style={{ width: `${ratio * 100}%` }}
          />
        </div>
        {done && (
          <p className="font-black text-grape">{t.challenges.complete}</p>
        )}
      </div>

      <section className="card">
        <h2 className="font-black mb-3">{t.challenges.leaderboard}</h2>
        <ul className="space-y-2">
          {leaderboard.map((r) => (
            <li key={r.userId} className="flex justify-between text-sm font-bold">
              <span>
                #{r.rank} {r.displayName ?? r.userId.slice(0, 8)}
              </span>
              <span>{r.xp} XP</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
