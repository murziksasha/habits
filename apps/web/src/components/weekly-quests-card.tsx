"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

type WeeklyQuest = {
  key: string;
  progress: number;
  target: number;
  rewardXp: number;
  completed: boolean;
  claimed: boolean;
  titleUk: string;
  titleEn: string;
};

/** Compact weekly build/lesson quests for learn / dashboard. */
export function WeeklyQuestsCard() {
  const { token, user, setCharacter, refresh } = useAuth();
  const { locale } = useLocale();
  const en = locale === "en";
  const [weekKey, setWeekKey] = useState("");
  const [quests, setQuests] = useState<WeeklyQuest[]>([]);
  const [busy, setBusy] = useState(false);

  async function load() {
    if (!token) return;
    try {
      const d = await api<{ weekKey: string; quests: WeeklyQuest[] }>(
        "/character/weekly",
        { token },
      );
      setWeekKey(d.weekKey);
      setQuests(d.quests ?? []);
    } catch {
      setQuests([]);
    }
  }

  useEffect(() => {
    if (token && user) void load();
  }, [token, user]);

  if (!user || quests.length === 0) return null;

  const primary =
    quests.find((q) => q.completed && !q.claimed) ??
    quests.find((q) => !q.claimed) ??
    quests[0];
  if (!primary) return null;

  const ratio = Math.min(1, primary.progress / Math.max(1, primary.target));

  async function claim() {
    if (!token || !primary || busy) return;
    setBusy(true);
    try {
      const d = await api<{
        character?: NonNullable<ReturnType<typeof useAuth>["character"]>;
      }>(`/character/weekly/${primary.key}/claim`, { method: "POST", token });
      if (d.character) setCharacter(d.character);
      await refresh();
      await load();
    } catch {
      /* ignore */
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card space-y-2 border-sun/30 bg-gradient-to-br from-sun/10 to-transparent">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-black uppercase text-sun">
          {en ? "Weekly" : "Тиждень"}
        </p>
        {weekKey ? (
          <span className="text-[10px] font-bold text-ink-muted">{weekKey}</span>
        ) : null}
      </div>
      <p className="font-black text-sm">
        {en ? primary.titleEn : primary.titleUk}
      </p>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-sun transition-all"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
      <p className="text-xs font-bold text-ink-muted">
        {primary.progress}/{primary.target} · +{primary.rewardXp} XP
      </p>
      <div className="flex flex-wrap gap-2">
        {primary.completed && !primary.claimed ? (
          <button
            type="button"
            className="btn-primary !py-1.5 !px-3 text-sm"
            disabled={busy}
            onClick={() => void claim()}
          >
            {en ? "Claim" : "Забрати"}
          </button>
        ) : null}
        <Link
          href="/quests"
          className="text-xs font-bold text-sky hover:underline self-center"
        >
          {en ? "All quests" : "Усі квести"} →
        </Link>
      </div>
    </section>
  );
}
