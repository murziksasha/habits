"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  CharacterProgression,
  FrameDef,
  TalentDef,
  TalentId,
  TalentRole,
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

type Archetype = {
  id: string;
  titleUk: string;
  titleEn: string;
  descUk: string;
  descEn: string;
  icon: string;
};

type Synergy = {
  id: string;
  titleUk: string;
  titleEn: string;
  descUk: string;
  descEn: string;
  icon: string;
};

type Effective = {
  xpBonusPct: number;
  heartRegenCutMin: number;
  giftLimit: number;
  mentorDepth: number;
  ironWillHearts: number;
  shopDiscountPct: number;
  powerScore: number;
};

type ProgressionResponse = {
  progression: CharacterProgression;
  talents: TalentDef[];
  talentRoles?: Record<string, TalentRole>;
  talentRoleMeta?: Record<TalentRole, { titleUk: string; titleEn: string; order: number }>;
  titles: TitleDef[];
  frames: FrameDef[];
  dailyGoalEffective: number;
  recommendedTalent?: string | null;
  respecCostXp?: number;
  talentRanksTotal?: number;
  pathBadgesCatalog?: PathBadge[];
  pathBadges?: string[];
  archetypes?: Archetype[];
  activeArchetype?: Archetype | null;
  synergies?: Synergy[];
  activeSynergies?: Synergy[];
  powerScore?: number;
  effective?: Effective;
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

const ROLE_ORDER: TalentRole[] = ["learning", "defense", "social", "economy"];

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#build" || window.location.search.includes("build=1")) {
      document.getElementById("build")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [data]);

  async function spend(talentId: string) {
    if (!token || busy) return;
    setBusy(true);
    setMsg("");
    try {
      const d = await api<{
        character: Parameters<typeof setCharacter>[0];
        progression: CharacterProgression;
        activeSynergies?: Synergy[];
      }>("/character/talents/spend", {
        method: "POST",
        token,
        body: { talentId },
      });
      if (d.character) setCharacter(d.character);
      await refresh();
      await load();
      const syn = d.activeSynergies?.length
        ? ` · ${d.activeSynergies.map((s) => s.icon).join("")}`
        : "";
      setMsg((en ? "Talent upgraded!" : "Талант прокачано!") + syn);
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

  async function applyArchetype(archetypeId: string) {
    if (!token || busy) return;
    setBusy(true);
    setMsg("");
    try {
      const d = await api<{
        character: Parameters<typeof setCharacter>[0];
        spent?: { talentId: string }[];
        unlockedTitle?: string | null;
      }>("/character/archetypes/apply", {
        method: "POST",
        token,
        body: { archetypeId },
      });
      if (d.character) setCharacter(d.character);
      await refresh();
      await load();
      setMsg(
        en
          ? `Build applied · ${d.spent?.length ?? 0} ranks`
          : `Білд застосовано · ${d.spent?.length ?? 0} рангів`,
      );
    } catch (e) {
      const err = (e as Error).message;
      setMsg(
        err === "no_skill_points"
          ? en
            ? "Need skill points"
            : "Потрібні очки навичок"
          : err === "already_complete"
            ? en
              ? "Build already complete"
              : "Білд уже зібрано"
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
          ? `Weekly quest +${d.rewardXp ?? 0} XP 🎉`
          : `Тижневий квест +${d.rewardXp ?? 0} XP 🎉`,
      );
    } catch {
      setMsg(en ? "Cannot claim yet" : "Ще не можна забрати");
    } finally {
      setBusy(false);
    }
  }

  const talentsByRole = useMemo(() => {
    if (!data?.talents) return [];
    const roles = data.talentRoles ?? {};
    const meta = data.talentRoleMeta;
    return ROLE_ORDER.map((role) => {
      const list = data.talents.filter((t) => (roles[t.id] ?? "learning") === role);
      if (!list.length) return null;
      return {
        role,
        title: meta?.[role]
          ? en
            ? meta[role].titleEn
            : meta[role].titleUk
          : role,
        talents: list,
      };
    }).filter(Boolean) as { role: TalentRole; title: string; talents: TalentDef[] }[];
  }, [data, en]);

  if (!data) {
    return <Skeleton className="h-40 w-full" />;
  }

  const p = data.progression;
  const sp = p.skillPoints ?? 0;
  const xp = data.xpProgress;
  const rec = data.recommendedTalent;
  const power = data.powerScore ?? data.effective?.powerScore ?? 0;
  const eff = data.effective;
  const activeSyn = data.activeSynergies ?? [];
  const ownedBadges = new Set(data.pathBadges ?? []);

  return (
    <div id="build" className="card scroll-mt-24 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-black">
          {en ? "Character build" : "Прокачка персонажа"}
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge tone="sky">
            {en ? "Skill points" : "Очки"}: {sp}
          </Badge>
          <Badge tone="grape">
            ⚡ {en ? "Power" : "Сила"}: {power}
          </Badge>
        </div>
      </div>

      <div>
        <div className="mb-1 flex justify-between text-xs font-bold text-ink-muted">
          <span>{en ? "Build power" : "Сила білду"}</span>
          <span>{power}/100</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-grape transition-all"
            style={{ width: `${power}%` }}
          />
        </div>
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

      {eff && (
        <div className="grid gap-2 rounded-2xl bg-slate-50 p-3 text-xs font-bold dark:bg-slate-900 sm:grid-cols-2">
          <span>🧠 XP +{eff.xpBonusPct}%</span>
          <span>💚 Regen −{eff.heartRegenCutMin}m</span>
          <span>🎁 Gifts/day: {eff.giftLimit}</span>
          <span>🎓 Hints depth: {eff.mentorDepth}</span>
          {eff.ironWillHearts > 0 ? <span>💪 Max ❤️ +{eff.ironWillHearts}</span> : null}
          {eff.shopDiscountPct > 0 ? <span>⚒️ Shop −{eff.shopDiscountPct}%</span> : null}
        </div>
      )}

      {activeSyn.length > 0 && (
        <div className="space-y-1 rounded-2xl border border-brand/30 bg-brand/5 p-3">
          <p className="text-xs font-black uppercase text-brand">
            {en ? "Active synergies" : "Активні синергії"}
          </p>
          {activeSyn.map((s) => (
            <p key={s.id} className="text-sm font-bold">
              {s.icon} {en ? s.titleEn : s.titleUk} —{" "}
              <span className="font-medium text-ink-muted">
                {en ? s.descEn : s.descUk}
              </span>
            </p>
          ))}
        </div>
      )}

      {(data.synergies ?? []).length > 0 && activeSyn.length < (data.synergies?.length ?? 0) && (
        <details className="text-xs font-bold text-ink-muted">
          <summary className="cursor-pointer">
            {en ? "All synergies" : "Усі синергії"}
          </summary>
          <ul className="mt-2 space-y-1">
            {(data.synergies ?? []).map((s) => (
              <li key={s.id}>
                {s.icon} {en ? s.titleEn : s.titleUk}: {en ? s.descEn : s.descUk}
              </li>
            ))}
          </ul>
        </details>
      )}

      {(data.archetypes ?? []).length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-black">
            {en ? "Build presets" : "Готові білди"}
            {data.activeArchetype
              ? ` · ${en ? data.activeArchetype.titleEn : data.activeArchetype.titleUk}`
              : ""}
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {(data.archetypes ?? []).map((a) => {
              const active = data.activeArchetype?.id === a.id;
              return (
                <div
                  key={a.id}
                  className={`rounded-2xl p-3 ${
                    active
                      ? "bg-brand/15 ring-1 ring-brand/40"
                      : "bg-slate-50 dark:bg-slate-900"
                  }`}
                >
                  <p className="font-black">
                    {a.icon} {en ? a.titleEn : a.titleUk}
                  </p>
                  <p className="mb-2 text-xs text-ink-muted">
                    {en ? a.descEn : a.descUk}
                  </p>
                  <Button
                    size="sm"
                    variant={active ? "secondary" : "primary"}
                    disabled={busy || sp < 1}
                    onClick={() => void applyArchetype(a.id)}
                  >
                    {active
                      ? en
                        ? "Boost more"
                        : "Ще прокачати"
                      : en
                        ? "Apply"
                        : "Застосувати"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
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

      {(talentsByRole.length ? talentsByRole : [{ role: "learning" as TalentRole, title: "", talents: data.talents }]).map(
        (group) => (
          <div key={group.role} className="space-y-2">
            {group.title ? (
              <h3 className="text-xs font-black uppercase text-ink-muted">{group.title}</h3>
            ) : null}
            <ul className="space-y-2">
              {group.talents.map((t) => {
                const rank = p.talents?.[t.id as TalentId] ?? 0;
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
                        <span className="text-sm text-ink-muted">
                          {rank}/{t.maxRank}
                        </span>
                        {isRec ? (
                          <span className="ml-2 text-[10px] font-black uppercase text-brand">
                            {en ? "Recommended" : "Рекомендовано"}
                          </span>
                        ) : null}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {en ? t.descEn : t.descUk}
                      </p>
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
          </div>
        ),
      )}

      {(data.talentRanksTotal ?? 0) > 0 && (
        <Button size="sm" variant="secondary" disabled={busy} onClick={() => void respec()}>
          {en ? "Respec talents" : "Скинути таланти"} (−{data.respecCostXp ?? 80} XP)
        </Button>
      )}

      {data.pathBadgesCatalog && data.pathBadgesCatalog.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-black">
            {en ? "Path badges" : "Path-бейджі"} · {ownedBadges.size}/
            {data.pathBadgesCatalog.length}
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.pathBadgesCatalog.map((b) => {
              const owned = ownedBadges.has(b.id);
              return (
                <span
                  key={b.id}
                  title={en ? b.descEn : b.descUk}
                  className={`rounded-full px-2 py-1 text-xs font-black ${
                    owned
                      ? "bg-brand/20 text-brand-dark"
                      : "bg-slate-100 text-ink-muted opacity-50 dark:bg-slate-800"
                  }`}
                >
                  {b.icon} {en ? b.titleEn : b.titleUk}
                </span>
              );
            })}
          </div>
        </div>
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
                  <span className="text-xs font-black text-brand">+{q.rewardXp} XP</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-sun transition-all"
                    style={{ width: `${ratio * 100}%` }}
                  />
                </div>
                <p className="text-[10px] font-bold text-ink-muted">
                  {q.progress}/{q.target}
                </p>
                {q.completed && !q.claimed ? (
                  <Button size="sm" disabled={busy} onClick={() => void claimWeekly(q.key)}>
                    {en ? "Claim" : "Забрати"}
                  </Button>
                ) : null}
                {q.claimed ? (
                  <span className="text-[10px] font-black text-green-600">
                    {en ? "Claimed" : "Забрано"}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-black uppercase text-ink-muted">
            {en ? "Title" : "Титул"}
          </p>
          <div className="flex flex-wrap gap-1">
            {data.titles
              .filter((t) => (p.unlockedTitles ?? []).includes(t.id))
              .map((t) => (
                <button
                  key={t.id}
                  type="button"
                  disabled={busy}
                  onClick={() => void equip("title", t.id)}
                  className={`rounded-full px-2 py-1 text-xs font-black ${
                    p.equippedTitle === t.id
                      ? "bg-brand text-white"
                      : "bg-slate-100 dark:bg-slate-800"
                  }`}
                >
                  {en ? t.titleEn : t.titleUk}
                </button>
              ))}
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs font-black uppercase text-ink-muted">
            {en ? "Frame" : "Рамка"}
          </p>
          <div className="flex flex-wrap gap-1">
            {data.frames
              .filter((f) => (p.unlockedFrames ?? []).includes(f.id))
              .map((f) => (
                <button
                  key={f.id}
                  type="button"
                  disabled={busy}
                  onClick={() => void equip("frame", f.id)}
                  className={`rounded-full px-2 py-1 text-xs font-black ${
                    p.equippedFrame === f.id
                      ? "bg-brand text-white"
                      : "bg-slate-100 dark:bg-slate-800"
                  }`}
                >
                  {en ? f.titleEn : f.titleUk}
                </button>
              ))}
          </div>
        </div>
      </div>

      {msg ? (
        <p className="text-sm font-bold text-brand" role="status">
          {msg}
        </p>
      ) : null}
    </div>
  );
}
