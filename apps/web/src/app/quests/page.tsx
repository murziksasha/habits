"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";

type Quest = {
  questKey: string;
  progress: number;
  target: number;
  rewardXp: number;
  completed: boolean;
  claimed: boolean;
  metric: string;
};

export default function QuestsPage() {
  const { user, token, loading, setCharacter, refresh } = useAuth();
  const { ready } = useRequireAuth();
  const { t } = useLocale();
  const [date, setDate] = useState("");
  const [quests, setQuests] = useState<Quest[]>([]);
  const [msg, setMsg] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  async function load() {
    if (!token) return;
    setDataLoading(true);
    try {
      const d = await api<{ date: string; quests: Quest[] }>("/quests/daily", { token });
      setDate(d.date);
      setQuests(d.quests);
    } catch {
      setQuests([]);
    } finally {
      setDataLoading(false);
    }
  }

  useEffect(() => {
    if (token) void load();
  }, [token]);

  async function claim(key: string) {
    if (!token) return;
    try {
      const d = await api<{ character: NonNullable<ReturnType<typeof useAuth>["character"]> }>(
        `/quests/daily/${key}/claim`,
        { method: "POST", token },
      );
      if (d.character) setCharacter(d.character);
      await refresh();
      await load();
      setMsg(t.shop.success);
    } catch {
      setMsg(t.common.error);
    }
  }

  if (loading || !ready || (dataLoading && !quests.length && !date)) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!user) return <PageLoading label={t.common.loading} />;

  function title(q: Quest) {
    if (q.metric === "lessons") return `📚 1 урок / 1 lesson`;
    if (q.metric === "xp") return `⭐ ${q.target} XP`;
    if (q.metric === "focus_min") return `⏱️ ${q.target} ${t.focus.minutes} focus`;
    if (q.metric === "exams") return `📝 1 exam / контрольна`;
    return q.questKey;
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-black">✅ {t.quests.title}</h1>
        {date && <p className="text-sm font-bold text-ink-muted">{date}</p>}
      </div>
      {msg && <p className="text-sm font-bold text-grape">{msg}</p>}
      {quests.length === 0 ? (
        <p className="card">{t.quests.empty}</p>
      ) : (
        <div className="space-y-3">
          {quests.map((q) => {
            const ratio = Math.min(1, q.progress / Math.max(1, q.target));
            return (
              <div key={q.questKey} className="card space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-black">{title(q)}</p>
                  <p className="text-sm font-bold text-brand-dark">+{q.rewardXp} XP</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-brand transition-all"
                    style={{ width: `${ratio * 100}%` }}
                  />
                </div>
                <p className="text-xs font-bold text-ink-muted">
                  {q.progress}/{q.target}
                  {q.completed ? " · ✓" : ""}
                </p>
                {q.completed && !q.claimed && (
                  <button
                    type="button"
                    className="btn-primary !py-2 text-sm"
                    onClick={() => void claim(q.questKey)}
                  >
                    {t.quests.claim}
                  </button>
                )}
                {q.claimed && (
                  <p className="text-xs font-bold text-grape">{t.quests.claimed}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
