"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

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
  const { t } = useLocale();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [quests, setQuests] = useState<Quest[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    if (!token) return;
    const d = await api<{ date: string; quests: Quest[] }>("/quests/daily", { token });
    setDate(d.date);
    setQuests(d.quests);
  }

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (token) void load().catch(() => setQuests([]));
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

  if (loading || !user) return <p>{t.common.loading}</p>;

  function title(q: Quest) {
    if (q.metric === "lessons") return `📚 1 урок / 1 lesson`;
    if (q.metric === "xp") return `⭐ ${q.target} XP`;
    if (q.metric === "focus_min") return `⏱️ ${q.target} ${t.focus.minutes} focus`;
    if (q.metric === "exams") return `📝 1 exam / контрольна`;
    return q.questKey;
  }

  return (
    <div className="space-y-6">
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
              <div key={q.questKey} className="card space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-black text-lg">{title(q)}</h2>
                  <span className="text-sm font-bold text-grape">
                    {t.quests.reward}: +{q.rewardXp} XP
                  </span>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs font-bold text-ink-muted">
                    <span>{t.quests.progress}</span>
                    <span>
                      {q.progress}/{q.target}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full ${q.completed ? "bg-grape" : "bg-sky"}`}
                      style={{ width: `${ratio * 100}%` }}
                    />
                  </div>
                </div>
                {q.completed && !q.claimed && (
                  <button type="button" className="btn-primary" onClick={() => void claim(q.questKey)}>
                    {t.quests.claim}
                  </button>
                )}
                {q.claimed && (
                  <p className="text-sm font-bold text-green-600">{t.quests.claimed}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
