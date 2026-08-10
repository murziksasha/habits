"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  CharacterProgression,
  FrameDef,
  TalentDef,
  TitleDef,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { Badge, Button, Skeleton } from "@/components/ui";

type PathBadge = {
  id: string;
  icon: string;
  titleUk: string;
  titleEn: string;
  descUk: string;
  descEn: string;
  minLessons: number;
  courseSlug: string;
};

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

type ProgressionResponse = {
  progression: CharacterProgression;
  talents: TalentDef[];
  titles: TitleDef[];
  frames: FrameDef[];
  dailyGoalEffective: number;
  recommendedTalent?: string | null;
  respecCostXp?: number;
  talentRanksTotal?: number;
  pathBadgesCatalog?: PathBadge[];
  pathBadges?: string[];
  weekly?: { weekKey: string; quests: WeeklyQuest[] };
  xpProgress?: {
    level: number;
    current: number;
    needed: number;
    ratio: number;
    globalXp: number;
  };
  nextMilestone?: {
    level: number;
    bonusSkillPoints: number;
    titleUk: string;
    titleEn: string;
  } | null;
  character?: { globalLevel: number; globalXp: number };
};

export function CharacterProgressionPanel() {
  const { token, setCharacter, refresh } = useAuth();
  const { locale } = useLocale();
  const en = locale === "en";
  const [data, setData] = useState<ProgressionResponse | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    try {
      const d = await api<ProgressionResponse>("/character/progression", { token });
      setData(d);
    } catch {
      /* ignore */
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  async function spend(talentId: string) {
    if (!token || busy) return;
    setBusy(true);
    setMsg("");
    try {
      const d = await api<{
        character: Parameters<typeof setCharacter>[0];
        progression: CharacterProgression;
      }>("/character/talents/spend", {
        method: "POST",
        token,
        body: { talentId },
      });
      if (d.character) setCharacter(d.character);
      await refresh();
      await load();
      setMsg(en ? "Talent upgraded!" : "Талант прокачано!");
    } catch (e) {
      const err = (e as Error).message;
      setMsg(
        err === "no_skill_points"
          ? en
            ? "No skill points"
            : "Немає очок навичок"
          : err === "max_rank"
            ? en
              ? "Max rank"
              : "Макс. ранг"
            : en
              ? "Failed"
              : "Помилка",
      );
    } finally {
      setBusy(false);
    }
  }

  async function respec() {
    if (!token || busy) return;
    const cost = data?.respecCostXp ?? 80;
    if (
      !confirm(
        en
          ? `Respec all talents for ${cost} XP? Points are refunded.`
          : `Скинути всі таланти за ${cost} XP? Очки повертаються.`,
      )
    ) {
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      const d = await api<{
        character: Parameters<typeof setCharacter>[0];
        refunded?: number;
      }>("/character/talents/respec", { method: "POST", token });
      if (d.character) setCharacter(d.character);
      await refresh();
      await load();
      setMsg(
        en
          ? `Respec OK — refunded ${d.refunded ?? 0} SP`
          : `Скинуто — повернено ${d.refunded ?? 0} очок`,
      );
    } catch (e) {
      const err = (e as Error).message;
      setMsg(
        err === "insufficient_xp"
          ? en
            ? "Not enough XP"
            : "Недостатньо XP"
          : err === "nothing_to_respec"
            ? en
              ? "Nothing to respec"
              : "Нічого скидати"
            : en
              ? "Failed"
              : "Помилка",
      );
    } finally {
      setBusy(false);
    }
  }

  async function equip(kind: "title" | "frame", id: string) {
    if (!token || busy) return;
    setBusy(true);
    try {
      const d = await api<{ character: Parameters<typeof setCharacter>[0] }>(
        "/character/cosmetics/equip",
        { method: "POST", token, body: { kind, id } },
      );
      if (d.character) setCharacter(d.character);
      await load();
    } catch {
      setMsg(en ? "Locked" : "Заблоковано");
    } finally {
      setBusy(false);
    }
  }

  async function claimWeekly(key: string) {
    if (!token || busy) return;
    setBusy(true);
    try {
      const d = await api<{
        character?: Parameters<typeof setCharacter>[0];
        rewardXp?: number;
      }>(`/character/weekly/${key}/claim`, { method: "POST", token });
      if (d.character) setCharacter(d.character);
      await refresh();
      await load();
      setMsg(
        en
          ? `Weekly quest +${d.rewardXp ?? 0} XP`
          : `Тижневий квест +${d.rewardXp ?? 0} XP`,
      );
    } catch {
      setMsg(en ? "Cannot claim yet" : "Ще не можна забрати");
    } finally {
      setBusy(false);
    }
  }

  if (!data) {
    return <Skeleton className="h-40 w-full" />;
  }

  const p = data.progression;
  const sp = p.skillPoints ?? 0;
  const xp = data.xpProgress;
  const rec = data.recommendedTalent;

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-black">
          {en ? "Character build" : "Прокачка персонажа"}
        </h2>
        <Badge tone="sky">
          {en ? "Skill points" : "Очки"}: {sp}
        </Badge>
      </div>

      {xp && (
        <div>
          <div className="mb-1 flex justify-between text-xs font-bold text-ink-muted">
            <span>
              {en ? "Level" : "Рівень"} {xp.level}
            </span>
            <span>
              {xp.current}/{xp.needed} XP
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${Math.round(xp.ratio * 100)}%` }}
            />
          </div>
        </div>
      )}

      {data.nextMilestone && (
        <p className="rounded-xl bg-sun/10 px-3 py-2 text-xs font-bold text-ink-muted">
          🏁 {en ? data.nextMilestone.titleEn : data.nextMilestone.titleUk} · L
          {data.nextMilestone.level} · +{data.nextMilestone.bonusSkillPoints}{" "}
          {en ? "bonus SP" : "бонус очок"}
        </p>
      )}

      <p className="text-sm text-ink-muted">
        {en
          ? "Earn +1 skill point per level (+bonus at milestones). Spend on talents."
          : "За кожен рівень +1 очко (+бонуси на рубежах). Вкладайте в таланти."}
      </p>
      <p className="text-xs font-bold text-ink-muted">
        {en ? "Daily goal" : "Денна ціль"}: {data.dailyGoalEffective} XP
        {data.talentRanksTotal != null
          ? ` · ${en ? "Ranks" : "Ранги"}: ${data.talentRanksTotal}`
          : ""}
      </p>

      <ul className="space-y-2">
        {data.talents.map((t) => {
          const rank = p.talents?.[t.id] ?? 0;
          const isRec = rec === t.id;
          return (
            <li
              key={t.id}
              className={`flex flex-wrap items-center justify-between gap-2 rounded-2xl p-3 ${
                isRec
                  ? "bg-brand/10 ring-1 ring-brand/40"
                  : "bg-slate-50 dark:bg-slate-900"
              }`}
            >
              <div>
                <p className="font-black">
                  {t.icon} {en ? t.titleEn : t.titleUk}{" "}
                  <span className="text-ink-muted text-sm">
                    {rank}/{t.maxRank}
                  </span>
                  {isRec ? (
                    <span className="ml-2 text-[10px] font-black uppercase text-brand">
                      {en ? "Recommended" : "Рекомендовано"}
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-ink-muted">{en ? t.descEn : t.descUk}</p>
              </div>
              <Button
                size="sm"
                disabled={busy || sp < t.costPerRank || rank >= t.maxRank}
                onClick={() => void spend(t.id)}
              >
                +{t.costPerRank}
              </Button>
            </li>
          );
        })}
      </ul>

      {(data.talentRanksTotal ?? 0) > 0 && (
        <Button
          size="sm"
          variant="secondary"
          disabled={busy}
          onClick={() => void respec()}
        >
          {en ? "Respec talents" : "Скинути таланти"} (−{data.respecCostXp ?? 80}{" "}
          XP)
        </Button>
      )}

      {data.weekly && data.weekly.quests.length > 0 && (
        <div className="space-y-2 rounded-2xl border border-sun/30 bg-sun/5 p-3">
          <h3 className="text-sm font-black">
            📅 {en ? "Weekly quests" : "Тижневі квести"} · {data.weekly.weekKey}
          </h3>
          {data.weekly.quests.map((q) => {
            const ratio = Math.min(1, q.progress / Math.max(1, q.target));
            return (
              <div key={q.key} className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold">
                    {en ? q.titleEn : q.titleUk}
                  </p>
                  <span className="text-xs font-black text-brand">
                    +{q.rewardXp} XP
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-sun"
                    style={{ width: `${ratio * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-ink-muted">
                  <span>
                    {q.progress}/{q.target}
                  </span>
                  {q.completed && !q.claimed ? (
                    <button
                      type="button"
                      className="text-sky hover:underline"
                      disabled={busy}
                      onClick={() => void claimWeekly(q.key)}
                    >
                      {en ? "Claim" : "Забрати"}
                    </button>
                  ) : q.claimed ? (
                    <span>{en ? "Claimed" : "Отримано"}</span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {data.pathBadgesCatalog && data.pathBadgesCatalog.length > 0 && (
        <div>
          <h3 className="text-sm font-black mb-2">
            {en ? "Path badges" : "Path-бейджі"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.pathBadgesCatalog.map((b) => {
              const unlocked = (data.pathBadges ?? []).includes(b.id);
              return (
                <div
                  key={b.id}
                  title={en ? b.descEn : b.descUk}
                  className={`rounded-xl border px-2 py-1 text-xs font-bold ${
                    unlocked
                      ? "border-brand/40 bg-brand/10"
                      : "border-dashed border-slate-300 opacity-45 dark:border-slate-600"
                  }`}
                >
                  {b.icon} {en ? b.titleEn : b.titleUk}
                  {!unlocked ? (
                    <span className="ml-1 text-[10px] text-ink-muted">
                      {b.minLessons}+
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-black mb-2">{en ? "Titles" : "Титули"}</h3>
        <div className="flex flex-wrap gap-2">
          {data.titles.map((t) => {
            const unlocked = p.unlockedTitles?.includes(t.id);
            const equipped = p.equippedTitle === t.id;
            return (
              <button
                key={t.id}
                type="button"
                disabled={!unlocked || busy}
                onClick={() => void equip("title", t.id)}
                className={`rounded-full px-3 py-1 text-xs font-bold border ${
                  equipped
                    ? "border-sky bg-sky/20"
                    : unlocked
                      ? "border-slate-300 dark:border-slate-600"
                      : "opacity-40 border-dashed"
                }`}
              >
                {en ? t.titleEn : t.titleUk}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-black mb-2">{en ? "Frames" : "Рамки"}</h3>
        <div className="flex flex-wrap gap-2">
          {data.frames.map((f) => {
            const unlocked = p.unlockedFrames?.includes(f.id);
            const equipped = p.equippedFrame === f.id;
            return (
              <button
                key={f.id}
                type="button"
                disabled={!unlocked || busy}
                onClick={() => void equip("frame", f.id)}
                className={`rounded-full px-3 py-1 text-xs font-bold border ${
                  equipped
                    ? "border-grape bg-grape/20"
                    : unlocked
                      ? "border-slate-300 dark:border-slate-600"
                      : "opacity-40 border-dashed"
                }`}
              >
                {en ? f.titleEn : f.titleUk}
              </button>
            );
          })}
        </div>
      </div>

      {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
    </div>
  );
}
