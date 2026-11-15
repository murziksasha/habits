"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { COURSE_SLUGS, COURSE_META, UI } from "@eduforge/shared";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { PageLoading } from "@/components/page-loading";

type Entry = {
  rank: number;
  displayName: string;
  score: number;
  globalLevel?: number;
  elo?: number;
  level?: number;
  solved?: number;
  equippedTitle?: string | null;
  titleUk?: string;
  titleEn?: string;
  pathBadgeCount?: number;
  pathBadgeIcons?: string[];
};

function LeaderboardInner() {
  const { token } = useAuth();
  const { t, locale } = useLocale();
  const search = useSearchParams();
  const initial = search.get("tab") || "global";
  const [tab, setTab] = useState<"global" | "chess" | "playground" | string>(initial);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [pgMeta, setPgMeta] = useState({ total: 0, maxXp: 0 });
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const q = search.get("tab");
    if (q) setTab(q);
  }, [search]);

  useEffect(() => {
    setDataLoading(true);
    const path =
      tab === "global"
        ? "/leaderboard/global"
        : tab === "chess"
          ? "/leaderboard/chess"
          : tab === "playground"
            ? "/playground/leaderboard"
            : `/leaderboard/course/${tab}`;
    void api<{
      entries: Entry[];
      totalChallenges?: number;
      maxXp?: number;
    }>(path)
      .then((d) => {
        setEntries(d.entries);
        if (tab === "playground") {
          setPgMeta({
            total: d.totalChallenges ?? 0,
            maxXp: d.maxXp ?? 0,
          });
        }
      })
      .catch(() => setEntries([]))
      .finally(() => setDataLoading(false));
    if (token) {
      void api("/auth/onboarding/complete", {
        method: "POST",
        token,
        body: { key: "viewedLeaderboard" },
      }).catch(() => undefined);
    }
  }, [tab, token]);

  if (dataLoading && !entries.length) {
    return <PageLoading label={t.common.loading} />;
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <h1 className="text-3xl font-black">🏆 {UI.leaderboard.title}</h1>
      <div className="flex flex-wrap gap-2">
        <button
          className={tab === "global" ? "btn-primary !py-2" : "btn-secondary !py-2"}
          onClick={() => setTab("global")}
        >
          {UI.leaderboard.global}
        </button>
        <button
          className={tab === "chess" ? "btn-primary !py-2" : "btn-secondary !py-2"}
          onClick={() => setTab("chess")}
        >
          {UI.leaderboard.chessElo}
        </button>
        <button
          className={tab === "playground" ? "btn-primary !py-2" : "btn-secondary !py-2"}
          onClick={() => setTab("playground")}
        >
          🖥️ {t.playground.leaderboard}
        </button>
        {COURSE_SLUGS.map((s) => (
          <button
            key={s}
            className={tab === s ? "btn-primary !py-2" : "btn-secondary !py-2"}
            onClick={() => setTab(s)}
          >
            {COURSE_META[s].icon} {COURSE_META[s].titleUk}
          </button>
        ))}
      </div>
      {tab === "playground" && (
        <p className="text-sm font-bold text-ink-muted">
          {t.playground.challenges}: {pgMeta.total} · max {pgMeta.maxXp} XP
        </p>
      )}
      <div className="card overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-ink-muted">
              <th className="pb-3">{UI.leaderboard.rank}</th>
              <th className="pb-3">{UI.leaderboard.player}</th>
              <th className="pb-3 text-right">{UI.leaderboard.score}</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => {
              const title =
                locale === "en"
                  ? e.titleEn || e.equippedTitle
                  : e.titleUk || e.equippedTitle;
              return (
              <tr key={`${e.rank}-${e.displayName}`} className="border-t border-slate-100">
                <td className="py-3 font-black">#{e.rank}</td>
                <td className="py-3 font-bold">
                  {e.displayName}
                  {title && title !== "rookie" ? (
                    <span className="ml-2 text-xs font-bold text-grape">{title}</span>
                  ) : null}
                  {e.globalLevel != null ? (
                    <span className="ml-2 text-xs font-semibold text-ink-muted">
                      L{e.globalLevel}
                    </span>
                  ) : null}
                  {(e.pathBadgeCount ?? 0) > 0 ? (
                    <span
                      className="ml-2 inline-flex items-center gap-0.5 rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-black text-brand"
                      title={`${e.pathBadgeCount} path badges`}
                    >
                      {(e.pathBadgeIcons ?? []).slice(0, 3).join("") || "🎖️"}
                      <span>{e.pathBadgeCount}</span>
                    </span>
                  ) : null}
                </td>
                <td className="py-3 text-right font-mono font-bold">
                  {e.score}
                  {tab === "playground" && e.solved != null ? (
                    <span className="ml-2 text-xs text-ink-muted">({e.solved})</span>
                  ) : null}
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
        {!entries.length && (
          <p className="py-6 text-center text-sm font-bold text-ink-muted">—</p>
        )}
      </div>
    </div>
  );
}

export function LeaderboardClient() {
  return (
    <Suspense fallback={<p className="text-ink-muted font-bold">…</p>}>
      <LeaderboardInner />
    </Suspense>
  );
}
