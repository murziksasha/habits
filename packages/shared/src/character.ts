/** Character talent tree + cosmetic progression (skill points from levels). */

export type TalentId =
  | "grit"
  | "focus"
  | "intellect"
  | "charm"
  | "craft"
  | "spark"
  | "vitality"
  | "mentor";

export type CharacterProgression = {
  /** Levels already converted into skill points */
  lastLevelAwarded: number;
  skillPoints: number;
  /** talentId → rank (0..maxRank) */
  talents: Partial<Record<TalentId, number>>;
  unlockedTitles: string[];
  equippedTitle?: string | null;
  unlockedFrames: string[];
  equippedFrame?: string | null;
  /** How many times player paid for respec */
  respecCount?: number;
  /** Course path badges unlocked (e.g. path_programming) */
  pathBadges?: string[];
  /** ISO week progress for weekly build/lesson quests */
  weekly?: {
    weekKey: string;
    talents: number;
    lessons: number;
    claimed: string[];
  };
};

export const DEFAULT_PROGRESSION: CharacterProgression = {
  lastLevelAwarded: 1,
  skillPoints: 0,
  talents: {},
  unlockedTitles: ["rookie"],
  equippedTitle: "rookie",
  unlockedFrames: ["none"],
  equippedFrame: "none",
  respecCount: 0,
  pathBadges: [],
  weekly: undefined,
};

/** Course path badges — unlock when completedLessons ≥ minLessons for course slug. */
export type PathBadgeDef = {
  id: string;
  courseSlug: string;
  minLessons: number;
  icon: string;
  titleUk: string;
  titleEn: string;
  descUk: string;
  descEn: string;
  rewardSkillPoints: number;
};

export const PATH_BADGE_CATALOG: PathBadgeDef[] = [
  {
    id: "path_english",
    courseSlug: "english",
    minLessons: 5,
    icon: "🇬🇧",
    titleUk: "English starter",
    titleEn: "English starter",
    descUk: "5+ уроків English",
    descEn: "5+ English lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_programming",
    courseSlug: "programming",
    minLessons: 8,
    icon: "💻",
    titleUk: "Code path",
    titleEn: "Code path",
    descUk: "8+ уроків Programming",
    descEn: "8+ Programming lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_chess",
    courseSlug: "chess",
    minLessons: 5,
    icon: "♟️",
    titleUk: "Chess path",
    titleEn: "Chess path",
    descUk: "5+ уроків шахів",
    descEn: "5+ chess lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_js",
    courseSlug: "js_fundamentals",
    minLessons: 4,
    icon: "⚡",
    titleUk: "JS path",
    titleEn: "JS path",
    descUk: "4+ уроків JS fundamentals",
    descEn: "4+ JS fundamentals lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_react",
    courseSlug: "react_fundamentals",
    minLessons: 4,
    icon: "⚛️",
    titleUk: "React path",
    titleEn: "React path",
    descUk: "4+ уроків React",
    descEn: "4+ React lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_sql",
    courseSlug: "sql_fundamentals",
    minLessons: 4,
    icon: "🗄️",
    titleUk: "SQL path",
    titleEn: "SQL path",
    descUk: "4+ уроків SQL",
    descEn: "4+ SQL lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_logic",
    courseSlug: "logic",
    minLessons: 6,
    icon: "🧩",
    titleUk: "Logic path",
    titleEn: "Logic path",
    descUk: "6+ уроків логіки",
    descEn: "6+ logic lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_qa",
    courseSlug: "qa_theory",
    minLessons: 5,
    icon: "🧪",
    titleUk: "QA path",
    titleEn: "QA path",
    descUk: "5+ уроків QA theory",
    descEn: "5+ QA theory lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_typescript",
    courseSlug: "typescript",
    minLessons: 4,
    icon: "📘",
    titleUk: "TypeScript path",
    titleEn: "TypeScript path",
    descUk: "4+ уроків TypeScript",
    descEn: "4+ TypeScript lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_node",
    courseSlug: "node_fundamentals",
    minLessons: 4,
    icon: "🟢",
    titleUk: "Node path",
    titleEn: "Node path",
    descUk: "4+ уроків Node",
    descEn: "4+ Node lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_express",
    courseSlug: "express_fundamentals",
    minLessons: 4,
    icon: "🚂",
    titleUk: "Express path",
    titleEn: "Express path",
    descUk: "4+ уроків Express",
    descEn: "4+ Express lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_embedded",
    courseSlug: "embedded_cpp",
    minLessons: 6,
    icon: "🛰️",
    titleUk: "Embedded path",
    titleEn: "Embedded path",
    descUk: "6+ уроків Embedded C++",
    descEn: "6+ Embedded C++ lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_typing",
    courseSlug: "typing",
    minLessons: 5,
    icon: "⌨️",
    titleUk: "Typing path",
    titleEn: "Typing path",
    descUk: "5+ уроків друку",
    descEn: "5+ typing lessons",
    rewardSkillPoints: 1,
  },
  {
    id: "path_speed_reading",
    courseSlug: "speed_reading",
    minLessons: 5,
    icon: "📖",
    titleUk: "Speed-read path",
    titleEn: "Speed-read path",
    descUk: "5+ уроків швидкого читання",
    descEn: "5+ speed-reading lessons",
    rewardSkillPoints: 1,
  },
];

export type WeeklyQuestDef = {
  key: string;
  metric: "talents" | "lessons";
  target: number;
  rewardXp: number;
  titleUk: string;
  titleEn: string;
};

export const WEEKLY_QUEST_DEFS: WeeklyQuestDef[] = [
  {
    key: "week_build_3",
    metric: "talents",
    target: 3,
    rewardXp: 40,
    titleUk: "Тижнева прокачка: 3 таланти",
    titleEn: "Weekly build: 3 talent ranks",
  },
  {
    key: "week_lessons_5",
    metric: "lessons",
    target: 5,
    rewardXp: 35,
    titleUk: "Тиждень навчання: 5 уроків",
    titleEn: "Learning week: 5 lessons",
  },
];

/** Extra skill points at milestone levels (on top of +1 per level). */
export const LEVEL_MILESTONES: { level: number; bonusSkillPoints: number; titleUk: string; titleEn: string }[] = [
  { level: 5, bonusSkillPoints: 1, titleUk: "Перший рубіж", titleEn: "First milestone" },
  { level: 10, bonusSkillPoints: 2, titleUk: "Десятка", titleEn: "Level 10" },
  { level: 15, bonusSkillPoints: 2, titleUk: "Півдорозі", titleEn: "Halfway hero" },
  { level: 20, bonusSkillPoints: 3, titleUk: "Легенда-рубіж", titleEn: "Legend gate" },
  { level: 25, bonusSkillPoints: 3, titleUk: "Міфічний", titleEn: "Mythic gate" },
  { level: 30, bonusSkillPoints: 4, titleUk: "Абсолют", titleEn: "Absolute" },
];

/** XP cost to refund all talent points (scales with respec count). */
export function respecCostXp(respecCount: number): number {
  return 80 + Math.max(0, respecCount) * 40;
}

export type TalentDef = {
  id: TalentId;
  maxRank: number;
  costPerRank: number;
  titleUk: string;
  titleEn: string;
  descUk: string;
  descEn: string;
  icon: string;
};

export const TALENT_CATALOG: TalentDef[] = [
  {
    id: "grit",
    maxRank: 3,
    costPerRank: 1,
    titleUk: "Стійкість",
    titleEn: "Grit",
    descUk: "+1 макс. щитів серії за ранг",
    descEn: "+1 max streak shields per rank",
    icon: "🛡️",
  },
  {
    id: "focus",
    maxRank: 3,
    costPerRank: 1,
    titleUk: "Фокус",
    titleEn: "Focus",
    descUk: "+10 до daily XP goal за ранг (базово 50)",
    descEn: "+10 daily XP goal per rank (base 50)",
    icon: "🎯",
  },
  {
    id: "intellect",
    maxRank: 5,
    costPerRank: 1,
    titleUk: "Інтелект",
    titleEn: "Intellect",
    descUk: "+3% XP з уроків за ранг (кап 15%)",
    descEn: "+3% lesson XP per rank (cap 15%)",
    icon: "🧠",
  },
  {
    id: "charm",
    maxRank: 3,
    costPerRank: 1,
    titleUk: "Харизма",
    titleEn: "Charm",
    descUk: "Більше подарунків на день (+1/ранг, база 3)",
    descEn: "More gifts per day (+1/rank, base 3)",
    icon: "✨",
  },
  {
    id: "craft",
    maxRank: 3,
    costPerRank: 1,
    titleUk: "Крафт",
    titleEn: "Craft",
    descUk: "−10% вартості аватарок у shop за ранг",
    descEn: "−10% avatar shop cost per rank",
    icon: "⚒️",
  },
  {
    id: "spark",
    maxRank: 3,
    costPerRank: 2,
    titleUk: "Іскра",
    titleEn: "Spark",
    descUk: "Шанс +1 bonus XP при уроці (5%×ранг)",
    descEn: "Chance of +1 bonus XP on lesson (5%×rank)",
    icon: "⚡",
  },
  {
    id: "vitality",
    maxRank: 3,
    costPerRank: 1,
    titleUk: "Живучість",
    titleEn: "Vitality",
    descUk: "Швидше regen сердець (−2 хв / ранг, база 30)",
    descEn: "Faster heart regen (−2 min / rank, base 30)",
    icon: "💚",
  },
  {
    id: "mentor",
    maxRank: 3,
    costPerRank: 1,
    titleUk: "Ментор",
    titleEn: "Mentor",
    descUk: "+1 progressive hint depth / ранг (м’якші підказки)",
    descEn: "+1 progressive hint depth / rank (softer hints)",
    icon: "🎓",
  },
];

export type TitleDef = {
  id: string;
  titleUk: string;
  titleEn: string;
  minLevel?: number;
  fromTalent?: TalentId;
  fromGift?: boolean;
};

export const TITLE_CATALOG: TitleDef[] = [
  { id: "rookie", titleUk: "Новачок", titleEn: "Rookie", minLevel: 1 },
  { id: "learner", titleUk: "Учень", titleEn: "Learner", minLevel: 3 },
  { id: "adept", titleUk: "Адепт", titleEn: "Adept", minLevel: 5 },
  { id: "scholar", titleUk: "Вчений", titleEn: "Scholar", minLevel: 8 },
  { id: "master", titleUk: "Майстер", titleEn: "Master", minLevel: 12 },
  { id: "champion", titleUk: "Чемпіон", titleEn: "Champion", minLevel: 15 },
  { id: "legend", titleUk: "Легенда", titleEn: "Legend", minLevel: 20 },
  { id: "mythic", titleUk: "Міф", titleEn: "Mythic", minLevel: 25 },
  { id: "hero", titleUk: "Герой друзів", titleEn: "Friend Hero", fromGift: true },
  { id: "phoenix", titleUk: "Фенікс", titleEn: "Phoenix", fromGift: true },
  { id: "grit_knight", titleUk: "Лицар стійкості", titleEn: "Grit Knight", fromTalent: "grit" },
  { id: "vital_sage", titleUk: "Мудрець живучості", titleEn: "Vital Sage", fromTalent: "vitality" },
  { id: "mentor_pro", titleUk: "Про-ментор", titleEn: "Pro Mentor", fromTalent: "mentor" },
  { id: "scholar_build", titleUk: "Вчений-білдер", titleEn: "Scholar build" },
  { id: "tank_build", titleUk: "Танк-учень", titleEn: "Tank learner" },
  { id: "social_build", titleUk: "Соціальний", titleEn: "Socialite" },
  { id: "crafter_build", titleUk: "Крафтер", titleEn: "Crafter" },
];

/** Talent UI groups for profile panel. */
export type TalentRole = "defense" | "learning" | "social" | "economy";

export const TALENT_ROLE: Record<TalentId, TalentRole> = {
  grit: "defense",
  vitality: "defense",
  intellect: "learning",
  mentor: "learning",
  focus: "learning",
  charm: "social",
  spark: "social",
  craft: "economy",
};

export const TALENT_ROLE_META: Record<
  TalentRole,
  { titleUk: string; titleEn: string; order: number }
> = {
  learning: { titleUk: "Навчання", titleEn: "Learning", order: 1 },
  defense: { titleUk: "Захист", titleEn: "Defense", order: 2 },
  social: { titleUk: "Соціальне", titleEn: "Social", order: 3 },
  economy: { titleUk: "Економія", titleEn: "Economy", order: 4 },
};

/** Build presets — spend order toward a playstyle (no new talent ids). */
export type ArchetypeDef = {
  id: string;
  titleUk: string;
  titleEn: string;
  descUk: string;
  descEn: string;
  icon: string;
  /** Target ranks per talent */
  targets: Partial<Record<TalentId, number>>;
  /** Spend priority when applying */
  spendOrder: TalentId[];
  titleId: string;
};

export const ARCHETYPE_CATALOG: ArchetypeDef[] = [
  {
    id: "scholar",
    titleUk: "Вчений",
    titleEn: "Scholar",
    descUk: "Більше XP і глибші підказки",
    descEn: "More XP and deeper hints",
    icon: "📚",
    targets: { intellect: 3, mentor: 2, focus: 1 },
    spendOrder: ["intellect", "mentor", "focus"],
    titleId: "scholar_build",
  },
  {
    id: "tank",
    titleUk: "Танк",
    titleEn: "Tank",
    descUk: "Щити серії + живучість сердець",
    descEn: "Streak shields + heart vitality",
    icon: "🛡️",
    targets: { grit: 2, vitality: 2, focus: 1 },
    spendOrder: ["grit", "vitality", "focus"],
    titleId: "tank_build",
  },
  {
    id: "social",
    titleUk: "Соціальний",
    titleEn: "Social",
    descUk: "Подарунки та іскра бонусів",
    descEn: "Gifts and spark bonuses",
    icon: "✨",
    targets: { charm: 2, spark: 1, intellect: 1 },
    spendOrder: ["charm", "spark", "intellect"],
    titleId: "social_build",
  },
  {
    id: "crafter",
    titleUk: "Крафтер",
    titleEn: "Crafter",
    descUk: "Знижки в shop + фокус цілей",
    descEn: "Shop discounts + goal focus",
    icon: "⚒️",
    targets: { craft: 2, focus: 2, intellect: 1 },
    spendOrder: ["craft", "focus", "intellect"],
    titleId: "crafter_build",
  },
];

export type SynergyId = "iron_will" | "deep_study" | "friendly_fire";

export type SynergyDef = {
  id: SynergyId;
  titleUk: string;
  titleEn: string;
  descUk: string;
  descEn: string;
  icon: string;
  /** Minimum ranks required */
  requires: Partial<Record<TalentId, number>>;
};

export const SYNERGY_CATALOG: SynergyDef[] = [
  {
    id: "iron_will",
    titleUk: "Залізна воля",
    titleEn: "Iron Will",
    descUk: "grit≥2 + vitality≥1 → +1 макс. ❤️ (free)",
    descEn: "grit≥2 + vitality≥1 → +1 max ❤️ (free)",
    icon: "💪",
    requires: { grit: 2, vitality: 1 },
  },
  {
    id: "deep_study",
    titleUk: "Глибоке вивчення",
    titleEn: "Deep Study",
    descUk: "intellect≥2 + mentor≥1 → +1 глибина підказок",
    descEn: "intellect≥2 + mentor≥1 → +1 hint depth",
    icon: "🔬",
    requires: { intellect: 2, mentor: 1 },
  },
  {
    id: "friendly_fire",
    titleUk: "Дружній вогонь",
    titleEn: "Friendly Fire",
    descUk: "charm≥2 + spark≥1 → +1 ліміт подарунків/день",
    descEn: "charm≥2 + spark≥1 → +1 gift daily cap",
    icon: "🔥",
    requires: { charm: 2, spark: 1 },
  },
];

export type FrameDef = {
  id: string;
  titleUk: string;
  titleEn: string;
  cssClass: string;
  minLevel?: number;
  fromGift?: boolean;
};

export const FRAME_CATALOG: FrameDef[] = [
  { id: "none", titleUk: "Без рамки", titleEn: "No frame", cssClass: "" },
  { id: "bronze", titleUk: "Бронза", titleEn: "Bronze", cssClass: "ring-2 ring-amber-700", minLevel: 3 },
  { id: "silver", titleUk: "Срібло", titleEn: "Silver", cssClass: "ring-2 ring-slate-300", minLevel: 6 },
  { id: "gold", titleUk: "Золото", titleEn: "Gold", cssClass: "ring-2 ring-yellow-400", minLevel: 10 },
  { id: "platinum", titleUk: "Платина", titleEn: "Platinum", cssClass: "ring-2 ring-slate-100 shadow-md", minLevel: 15 },
  { id: "diamond", titleUk: "Діамант", titleEn: "Diamond", cssClass: "ring-2 ring-sky-300 shadow-lg shadow-sky-400/40", minLevel: 25 },
  { id: "neon", titleUk: "Неон", titleEn: "Neon", cssClass: "ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/40", fromGift: true },
  { id: "flame", titleUk: "Полум'я", titleEn: "Flame", cssClass: "ring-2 ring-orange-500 shadow-lg shadow-orange-500/50", fromGift: true },
];

export function normalizeProgression(raw: unknown): CharacterProgression {
  const r = (raw && typeof raw === "object" ? raw : {}) as Partial<CharacterProgression>;
  const weekly =
    r.weekly && typeof r.weekly === "object"
      ? {
          weekKey: String((r.weekly as { weekKey?: string }).weekKey ?? ""),
          talents: Math.max(0, Number((r.weekly as { talents?: number }).talents) || 0),
          lessons: Math.max(0, Number((r.weekly as { lessons?: number }).lessons) || 0),
          claimed: Array.isArray((r.weekly as { claimed?: string[] }).claimed)
            ? [...((r.weekly as { claimed: string[] }).claimed)]
            : [],
        }
      : undefined;
  return {
    lastLevelAwarded: Math.max(1, Number(r.lastLevelAwarded) || 1),
    skillPoints: Math.max(0, Number(r.skillPoints) || 0),
    talents: r.talents && typeof r.talents === "object" ? { ...r.talents } : {},
    unlockedTitles: Array.isArray(r.unlockedTitles) ? [...r.unlockedTitles] : ["rookie"],
    equippedTitle: r.equippedTitle ?? "rookie",
    unlockedFrames: Array.isArray(r.unlockedFrames) ? [...r.unlockedFrames] : ["none"],
    equippedFrame: r.equippedFrame ?? "none",
    respecCount: Math.max(0, Number(r.respecCount) || 0),
    pathBadges: Array.isArray(r.pathBadges) ? [...r.pathBadges] : [],
    weekly,
  };
}

/** Unlock path badges from completed lesson counts per course slug. Returns new badges + SP reward. */
export function unlockPathBadges(
  progression: CharacterProgression,
  completedBySlug: Record<string, number>,
): { progression: CharacterProgression; newlyUnlocked: PathBadgeDef[] } {
  const p = normalizeProgression(progression);
  const badges = new Set(p.pathBadges ?? []);
  const newlyUnlocked: PathBadgeDef[] = [];
  for (const def of PATH_BADGE_CATALOG) {
    if (badges.has(def.id)) continue;
    const done = completedBySlug[def.courseSlug] ?? 0;
    if (done >= def.minLessons) {
      badges.add(def.id);
      newlyUnlocked.push(def);
      p.skillPoints += def.rewardSkillPoints;
    }
  }
  p.pathBadges = [...badges];
  return { progression: p, newlyUnlocked };
}

/** Ensure weekly bucket matches weekKey; bump metric. */
export function bumpWeeklyProgress(
  progression: CharacterProgression,
  weekKey: string,
  metric: "talents" | "lessons",
  amount = 1,
): CharacterProgression {
  const p = normalizeProgression(progression);
  if (!p.weekly || p.weekly.weekKey !== weekKey) {
    p.weekly = { weekKey, talents: 0, lessons: 0, claimed: [] };
  }
  p.weekly[metric] = Math.max(0, (p.weekly[metric] ?? 0) + amount);
  return p;
}

export function weeklyQuestStatus(
  progression: CharacterProgression,
  weekKey: string,
): {
  weekKey: string;
  quests: {
    key: string;
    progress: number;
    target: number;
    rewardXp: number;
    completed: boolean;
    claimed: boolean;
    titleUk: string;
    titleEn: string;
    metric: "talents" | "lessons";
  }[];
} {
  const p = normalizeProgression(progression);
  const w =
    p.weekly && p.weekly.weekKey === weekKey
      ? p.weekly
      : { weekKey, talents: 0, lessons: 0, claimed: [] as string[] };
  return {
    weekKey,
    quests: WEEKLY_QUEST_DEFS.map((def) => {
      const progress = def.metric === "talents" ? w.talents : w.lessons;
      return {
        key: def.key,
        progress,
        target: def.target,
        rewardXp: def.rewardXp,
        completed: progress >= def.target,
        claimed: w.claimed.includes(def.key),
        titleUk: def.titleUk,
        titleEn: def.titleEn,
        metric: def.metric,
      };
    }),
  };
}

export function claimWeeklyQuest(
  progression: CharacterProgression,
  weekKey: string,
  questKey: string,
):
  | { ok: true; progression: CharacterProgression; rewardXp: number }
  | { ok: false; error: string } {
  const def = WEEKLY_QUEST_DEFS.find((q) => q.key === questKey);
  if (!def) return { ok: false, error: "unknown_quest" };
  const status = weeklyQuestStatus(progression, weekKey);
  const row = status.quests.find((q) => q.key === questKey);
  if (!row) return { ok: false, error: "unknown_quest" };
  if (!row.completed) return { ok: false, error: "not_completed" };
  if (row.claimed) return { ok: false, error: "already_claimed" };
  const p = normalizeProgression(progression);
  if (!p.weekly || p.weekly.weekKey !== weekKey) {
    p.weekly = { weekKey, talents: 0, lessons: 0, claimed: [] };
  }
  p.weekly.claimed = [...p.weekly.claimed, questKey];
  return { ok: true, progression: p, rewardXp: def.rewardXp };
}

/** Grant skill points + milestone bonuses + unlock titles/frames when level rises. */
export function applyLevelUps(
  progression: CharacterProgression,
  globalLevel: number,
): CharacterProgression {
  const p = normalizeProgression(progression);
  const from = p.lastLevelAwarded;
  const to = Math.max(from, globalLevel);
  if (to > from) {
    // +1 SP per level
    p.skillPoints += to - from;
    // Milestone bonuses for each newly crossed level
    for (const m of LEVEL_MILESTONES) {
      if (m.level > from && m.level <= to) {
        p.skillPoints += m.bonusSkillPoints;
      }
    }
    p.lastLevelAwarded = to;
  }
  for (const t of TITLE_CATALOG) {
    if (t.minLevel && globalLevel >= t.minLevel && !p.unlockedTitles.includes(t.id)) {
      p.unlockedTitles.push(t.id);
    }
  }
  for (const f of FRAME_CATALOG) {
    if (f.minLevel && globalLevel >= f.minLevel && !p.unlockedFrames.includes(f.id)) {
      p.unlockedFrames.push(f.id);
    }
  }
  return p;
}

export function talentRank(p: CharacterProgression, id: TalentId): number {
  return Math.max(0, p.talents[id] ?? 0);
}

export function maxStreakFreezesBonus(p: CharacterProgression): number {
  return talentRank(p, "grit");
}

export function dailyGoalBonus(p: CharacterProgression): number {
  return talentRank(p, "focus") * 10;
}

export function lessonXpMultiplier(p: CharacterProgression): number {
  const rank = Math.min(5, talentRank(p, "intellect"));
  return 1 + Math.min(0.15, rank * 0.03);
}

export function giftDailyLimit(p: CharacterProgression): number {
  return 3 + talentRank(p, "charm") + (hasSynergy(p, "friendly_fire") ? 1 : 0);
}

export function avatarShopDiscount(p: CharacterProgression): number {
  return Math.min(0.3, talentRank(p, "craft") * 0.1);
}

export function sparkBonusChance(p: CharacterProgression): number {
  return Math.min(0.15, talentRank(p, "spark") * 0.05);
}

/** Minutes subtracted from default heart regen interval. */
export function heartRegenMinutesBonus(p: CharacterProgression): number {
  return talentRank(p, "vitality") * 2;
}

/** Extra progressive hint steps unlocked by mentor talent (+ Deep Study). */
export function mentorHintBonus(p: CharacterProgression): number {
  return talentRank(p, "mentor") + (hasSynergy(p, "deep_study") ? 1 : 0);
}

/** +1 max hearts on free plan when Iron Will is active. */
export function ironWillHeartsBonus(p: CharacterProgression): number {
  return hasSynergy(p, "iron_will") ? 1 : 0;
}

export function hasSynergy(p: CharacterProgression, id: SynergyId): boolean {
  const def = SYNERGY_CATALOG.find((s) => s.id === id);
  if (!def) return false;
  for (const [tid, min] of Object.entries(def.requires)) {
    if (talentRank(p, tid as TalentId) < (min ?? 0)) return false;
  }
  return true;
}

export function activeSynergies(p: CharacterProgression): SynergyDef[] {
  return SYNERGY_CATALOG.filter((s) => hasSynergy(p, s.id));
}

/** 0–100 power score from ranks, badges, synergies (UI bar). */
export function buildPowerScore(p: CharacterProgression): number {
  const ranks = totalTalentRanks(p);
  const badges = (p.pathBadges ?? []).length;
  const syn = activeSynergies(p).length;
  const spLeft = Math.min(10, p.skillPoints ?? 0);
  // ranks *4 (cap 48), badges *3 (cap 42), synergies *8, leftover SP soft
  const score =
    Math.min(48, ranks * 4) +
    Math.min(42, badges * 3) +
    syn * 8 +
    Math.min(5, spLeft);
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function matchesArchetype(
  p: CharacterProgression,
  arch: ArchetypeDef,
): boolean {
  for (const [tid, min] of Object.entries(arch.targets)) {
    if (talentRank(p, tid as TalentId) < (min ?? 0)) return false;
  }
  return true;
}

export function detectActiveArchetype(p: CharacterProgression): ArchetypeDef | null {
  // Prefer first fully matched in catalog order
  for (const a of ARCHETYPE_CATALOG) {
    if (matchesArchetype(p, a)) return a;
  }
  return null;
}

/** Spend SP toward archetype targets in spendOrder. Returns spends made. */
export function applyArchetypeSpend(
  progression: CharacterProgression,
  archetypeId: string,
): {
  ok: true;
  progression: CharacterProgression;
  spent: { talentId: TalentId; newRank: number }[];
  unlockedTitle?: string;
} | { ok: false; error: string } {
  const arch = ARCHETYPE_CATALOG.find((a) => a.id === archetypeId);
  if (!arch) return { ok: false, error: "unknown_archetype" };
  let p = normalizeProgression(progression);
  const spent: { talentId: TalentId; newRank: number }[] = [];
  let guard = 0;
  while (guard++ < 40) {
    let progressed = false;
    for (const tid of arch.spendOrder) {
      const target = arch.targets[tid] ?? 0;
      if (talentRank(p, tid) >= target) continue;
      const r = spendTalent(p, tid);
      if (!r.ok) continue;
      p = r.progression;
      spent.push({ talentId: tid, newRank: talentRank(p, tid) });
      progressed = true;
      break;
    }
    if (!progressed) break;
  }
  if (!spent.length) {
    if (matchesArchetype(p, arch)) return { ok: false, error: "already_complete" };
    return { ok: false, error: "no_skill_points" };
  }
  let unlockedTitle: string | undefined;
  if (matchesArchetype(p, arch) && !p.unlockedTitles.includes(arch.titleId)) {
    p.unlockedTitles.push(arch.titleId);
    unlockedTitle = arch.titleId;
  }
  // Also unlock archetype titles when partial match becomes full via other means
  for (const a of ARCHETYPE_CATALOG) {
    if (matchesArchetype(p, a) && !p.unlockedTitles.includes(a.titleId)) {
      p.unlockedTitles.push(a.titleId);
      unlockedTitle = unlockedTitle ?? a.titleId;
    }
  }
  return { ok: true, progression: p, spent, unlockedTitle };
}

/** Effective stats summary for UI (plain language). */
export function effectiveBuildStats(p: CharacterProgression): {
  xpBonusPct: number;
  heartRegenCutMin: number;
  giftLimit: number;
  mentorDepth: number;
  ironWillHearts: number;
  shopDiscountPct: number;
  powerScore: number;
  synergies: SynergyDef[];
  activeArchetype: ArchetypeDef | null;
} {
  return {
    xpBonusPct: Math.round((lessonXpMultiplier(p) - 1) * 100),
    heartRegenCutMin: heartRegenMinutesBonus(p),
    giftLimit: giftDailyLimit(p),
    mentorDepth: mentorHintBonus(p),
    ironWillHearts: ironWillHeartsBonus(p),
    shopDiscountPct: Math.round(avatarShopDiscount(p) * 100),
    powerScore: buildPowerScore(p),
    synergies: activeSynergies(p),
    activeArchetype: detectActiveArchetype(p),
  };
}

export function totalTalentRanks(p: CharacterProgression): number {
  return Object.values(p.talents ?? {}).reduce((a, b) => a + (Number(b) || 0), 0);
}

/** Suggest next talent: prefer incomplete low-rank high-value trees. */
export function recommendTalent(p: CharacterProgression): TalentId | null {
  const order: TalentId[] = [
    "intellect",
    "focus",
    "grit",
    "vitality",
    "charm",
    "craft",
    "mentor",
    "spark",
  ];
  for (const id of order) {
    const def = TALENT_CATALOG.find((t) => t.id === id);
    if (!def) continue;
    if (talentRank(p, id) < def.maxRank) return id;
  }
  return null;
}

export function spendTalent(
  progression: CharacterProgression,
  talentId: TalentId,
): { ok: true; progression: CharacterProgression } | { ok: false; error: string } {
  const def = TALENT_CATALOG.find((t) => t.id === talentId);
  if (!def) return { ok: false, error: "unknown_talent" };
  const p = normalizeProgression(progression);
  const rank = talentRank(p, talentId);
  if (rank >= def.maxRank) return { ok: false, error: "max_rank" };
  if (p.skillPoints < def.costPerRank) return { ok: false, error: "no_skill_points" };
  p.skillPoints -= def.costPerRank;
  p.talents[talentId] = rank + 1;
  if (talentId === "grit" && rank + 1 >= 3 && !p.unlockedTitles.includes("grit_knight")) {
    p.unlockedTitles.push("grit_knight");
  }
  if (talentId === "vitality" && rank + 1 >= 3 && !p.unlockedTitles.includes("vital_sage")) {
    p.unlockedTitles.push("vital_sage");
  }
  if (talentId === "mentor" && rank + 1 >= 3 && !p.unlockedTitles.includes("mentor_pro")) {
    p.unlockedTitles.push("mentor_pro");
  }
  // Archetype title unlocks when pattern completes
  for (const a of ARCHETYPE_CATALOG) {
    if (matchesArchetype(p, a) && !p.unlockedTitles.includes(a.titleId)) {
      p.unlockedTitles.push(a.titleId);
    }
  }
  return { ok: true, progression: p };
}

/** Refund all talent ranks into skill points (no SP lost). */
export function respecTalents(
  progression: CharacterProgression,
): { ok: true; progression: CharacterProgression; refunded: number } | { ok: false; error: string } {
  const p = normalizeProgression(progression);
  let refunded = 0;
  for (const def of TALENT_CATALOG) {
    const rank = talentRank(p, def.id);
    if (rank <= 0) continue;
    refunded += rank * def.costPerRank;
    delete p.talents[def.id];
  }
  if (refunded <= 0) return { ok: false, error: "nothing_to_respec" };
  p.skillPoints += refunded;
  p.respecCount = (p.respecCount ?? 0) + 1;
  return { ok: true, progression: p, refunded };
}

export function nextMilestone(globalLevel: number): (typeof LEVEL_MILESTONES)[number] | null {
  return LEVEL_MILESTONES.find((m) => m.level > globalLevel) ?? null;
}

export function equipCosmetic(
  progression: CharacterProgression,
  kind: "title" | "frame",
  id: string,
): { ok: true; progression: CharacterProgression } | { ok: false; error: string } {
  const p = normalizeProgression(progression);
  if (kind === "title") {
    if (!p.unlockedTitles.includes(id)) return { ok: false, error: "locked" };
    p.equippedTitle = id;
  } else {
    if (!p.unlockedFrames.includes(id)) return { ok: false, error: "locked" };
    p.equippedFrame = id;
  }
  return { ok: true, progression: p };
}

export function titleLabel(id: string | null | undefined, locale: "uk" | "en"): string {
  const t = TITLE_CATALOG.find((x) => x.id === id);
  if (!t) return id ?? "";
  return locale === "en" ? t.titleEn : t.titleUk;
}
