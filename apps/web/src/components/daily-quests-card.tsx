"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  titleUk?: string;
  titleEn?: string;
};

/** Compact daily quests for learn — starts closed, opens on tap. */
export function DailyQuestsCard({ defaultOpen = false }: { defaultOpen?: boolean } = {}) {
  const { token, user, setCharacter, refresh } = useAuth();
  const { locale, t } = useLocale();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (!token || !user) return;
    void api<{ date: string; quests: Quest[] }>("/quests/daily", { token })
      .then((d) => {
        setDate(d.date);
        setQuests(d.quests ?? []);
      })
      .catch(() => setQuests([]));
  }, [token, user]);

  if (!user || quests.length === 0) return null;

  const completedCount = quests.filter((q) => q.completed || q.claimed).length;
  const totalCount = quests.length;

  const primary =
    quests.find((q) => !q.claimed && !q.completed) ??
    quests.find((q) => q.completed && !q.claimed) ??
    quests[0];
  if (!primary) return null;

  const en = locale === "en";
  const title =
    (en ? primary.titleEn : primary.titleUk) ||
    (primary.metric === "lessons"
      ? en
        ? "Complete 1 lesson"
        : "Пройти 1 урок"
      : primary.metric === "xp"
        ? en
          ? `Earn ${primary.target} XP`
          : `Набрати ${primary.target} XP`
        : primary.metric === "focus_min"
          ? en
            ? `${primary.target} min focus`
            : `${primary.target} хв фокусу`
          : primary.metric === "gifts"
            ? en
              ? "Send a gift"
              : "Подарунок другу"
            : primary.metric === "talents"
              ? en
                ? "Upgrade a talent"
                : "Прокачай талант"
              : primary.metric === "login"
                ? en
                  ? "Daily check-in"
                  : "Щоденний вхід"
                : en
                  ? "Pass 1 exam"
                  : "1 контрольна");

  const ratio = Math.min(1, primary.progress / Math.max(1, primary.target));

  async function claim() {
    if (!token || !primary) return;
    try {
      const d = await api<{ character?: NonNullable<ReturnType<typeof useAuth>["character"]> }>(
        `/quests/daily/${primary.questKey}/claim`,
        { method: "POST", token },
      );
      if (d.character) setCharacter(d.character);
      await refresh();
      const next = await api<{ date: string; quests: Quest[] }>("/quests/daily", { token });
      setQuests(next.quests ?? []);
    } catch {
      /* ignore */
    }
  }

  if (!open) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="card cursor-pointer border-sun/30 bg-gradient-to-br from-sun/10 to-brand-soft/20 py-2.5 px-4 flex items-center justify-between hover:border-sun/50 transition-colors"
        aria-expanded={false}
      >
        <div className="flex items-center gap-2">
          <span>🗡️</span>
          <span className="font-bold text-sm">
            {en ? "Daily quests" : "Щоденні квести"}:{" "}
            <strong className="text-sun">
              {completedCount} {en ? "of" : "з"} {totalCount} {t.learn.questsTodaySummary}
            </strong>
          </span>
        </div>
        <span className="text-xs font-bold text-ink-muted">
          ▼ {t.learn.tapToOpen}
        </span>
      </div>
    );
  }

  return (
    <section className="card border-sun/30 bg-gradient-to-br from-sun/10 to-brand-soft/20 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="flex items-center gap-1.5 text-xs font-black uppercase text-sun hover:underline"
          aria-expanded={true}
        >
          <span>🗡️ {en ? "Daily quests" : "Щоденні квести"}</span>
          <span className="text-ink-muted font-normal lowercase">
            ({completedCount} {en ? "of" : "з"} {totalCount} {t.learn.questsTodaySummary})
          </span>
          <span className="text-[10px] text-ink-muted">▲</span>
        </button>
        {date && <span className="text-[10px] font-bold text-ink-muted">{date}</span>}
      </div>
      <p className="font-black">{title}</p>
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
          <button type="button" className="btn-primary !py-1.5 !px-3 text-sm" onClick={() => void claim()}>
            {en ? "Claim reward" : "Забрати нагороду"}
          </button>
        ) : !primary.completed ? (
          <Link href="/learn" className="btn-primary !py-1.5 !px-3 text-sm">
            {en ? "Go" : "Вперед"} →
          </Link>
        ) : (
          <span className="text-xs font-bold text-brand-dark">
            {en ? "Done for today" : "На сьогодні виконано"}
          </span>
        )}
        <Link href="/quests" className="btn-secondary !py-1.5 !px-3 text-sm">
          {t.nav.quests}
        </Link>
      </div>
    </section>
  );
}
