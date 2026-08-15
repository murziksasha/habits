import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { characters } from "@eduforge/db";
import {
  ARCHETYPE_CATALOG,
  DEFAULT_PROGRESSION,
  FRAME_CATALOG,
  LEVEL_MILESTONES,
  PATH_BADGE_CATALOG,
  SYNERGY_CATALOG,
  TALENT_CATALOG,
  TALENT_ROLE,
  TALENT_ROLE_META,
  TITLE_CATALOG,
  activeSynergies,
  applyArchetypeSpend,
  applyLevelUps,
  buildPowerScore,
  bumpWeeklyProgress,
  claimWeeklyQuest,
  dailyGoalBonus,
  detectActiveArchetype,
  effectiveBuildStats,
  equipCosmetic,
  isoWeekKey,
  levelFromXp,
  nextMilestone,
  normalizeProgression,
  recommendTalent,
  respecCostXp,
  respecTalents,
  spendTalent,
  totalTalentRanks,
  weeklyQuestStatus,
  xpProgressInLevel,
  type TalentId,
} from "@eduforge/shared";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { evaluateAchievements, logActivity, notifyUser } from "../engagement.js";
import { bumpDailyQuests } from "./quests.js";
import { syncPathBadges } from "../services/path-badges.js";

type Vars = { user: AuthedUser };

export const characterRoutes = new Hono<{ Variables: Vars }>();

const TALENT_IDS = [
  "grit",
  "focus",
  "intellect",
  "charm",
  "craft",
  "spark",
  "vitality",
  "mentor",
] as const;

function progressionPayload(ch: {
  globalXp: number;
  globalLevel: number;
  progression?: unknown;
}) {
  const progression = applyLevelUps(
    normalizeProgression(ch.progression),
    ch.globalLevel,
  );
  const xp = xpProgressInLevel(ch.globalXp);
  const milestone = nextMilestone(ch.globalLevel);
  const weekKey = isoWeekKey();
  const stats = effectiveBuildStats(progression);
  return {
    progression,
    talents: TALENT_CATALOG,
    talentRoles: TALENT_ROLE,
    talentRoleMeta: TALENT_ROLE_META,
    titles: TITLE_CATALOG,
    frames: FRAME_CATALOG,
    milestones: LEVEL_MILESTONES,
    pathBadgesCatalog: PATH_BADGE_CATALOG,
    pathBadges: progression.pathBadges ?? [],
    archetypes: ARCHETYPE_CATALOG,
    activeArchetype: detectActiveArchetype(progression),
    synergies: SYNERGY_CATALOG,
    activeSynergies: activeSynergies(progression),
    powerScore: buildPowerScore(progression),
    effective: stats,
    weekly: weeklyQuestStatus(progression, weekKey),
    dailyGoalEffective: 50 + dailyGoalBonus(progression),
    recommendedTalent: recommendTalent(progression),
    respecCostXp: respecCostXp(progression.respecCount ?? 0),
    talentRanksTotal: totalTalentRanks(progression),
    mentorHintBonus: stats.mentorDepth,
    xpProgress: {
      level: xp.level,
      current: xp.current,
      needed: xp.needed,
      ratio: xp.ratio,
      globalXp: ch.globalXp,
    },
    nextMilestone: milestone,
  };
}

characterRoutes.get("/progression", authMiddleware, async (c) => {
  const user = c.get("user");
  // Keep path badges in sync when viewing build panel
  await syncPathBadges(user.id).catch(() => undefined);

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);

  let progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
  let character = ch;
  if (JSON.stringify(progression) !== JSON.stringify(normalizeProgression(ch.progression))) {
    const [updated] = await db
      .update(characters)
      .set({ progression })
      .where(eq(characters.id, ch.id))
      .returning();
    character = updated;
  }

  return c.json({
    character,
    ...progressionPayload(character),
  });
});

const spendSchema = z.object({
  talentId: z.enum(TALENT_IDS),
});

characterRoutes.post("/talents/spend", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = spendSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);

  let progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
  const result = spendTalent(progression, parsed.data.talentId as TalentId);
  if (!result.ok) return c.json({ error: result.error }, 400);

  progression = bumpWeeklyProgress(result.progression, isoWeekKey(), "talents", 1);
  const patch: Partial<typeof characters.$inferInsert> = { progression };
  if (parsed.data.talentId === "focus") {
    patch.dailyGoalXp = 50 + dailyGoalBonus(progression);
  }

  const [updated] = await db
    .update(characters)
    .set(patch)
    .where(eq(characters.id, ch.id))
    .returning();

  await logActivity(db, user.id, "talent_spend", {
    talentId: parsed.data.talentId,
    rank: progression.talents[parsed.data.talentId],
  });

  await bumpDailyQuests(user.id, "talents", 1);
  const unlocked = await evaluateAchievements(db, user.id, {
    talentSpent: true,
    talentRanksTotal: totalTalentRanks(progression),
    globalLevel: updated.globalLevel,
  });

  return c.json({
    ok: true,
    character: updated,
    progression,
    unlockedAchievements: unlocked,
    recommendedTalent: recommendTalent(progression),
    powerScore: buildPowerScore(progression),
    activeSynergies: activeSynergies(progression),
    activeArchetype: detectActiveArchetype(progression),
    effective: effectiveBuildStats(progression),
  });
});

const archetypeSchema = z.object({
  archetypeId: z.enum(["scholar", "tank", "social", "crafter"]),
});

/** Spend SP toward a build preset (partial apply until SP runs out). */
characterRoutes.post("/archetypes/apply", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = archetypeSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);

  let progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
  const result = applyArchetypeSpend(progression, parsed.data.archetypeId);
  if (!result.ok) return c.json({ error: result.error }, 400);

  const ranksSpent = result.spent.length;
  progression = bumpWeeklyProgress(result.progression, isoWeekKey(), "talents", ranksSpent);
  const patch: Partial<typeof characters.$inferInsert> = {
    progression,
    dailyGoalXp: 50 + dailyGoalBonus(progression),
  };

  const [updated] = await db
    .update(characters)
    .set(patch)
    .where(eq(characters.id, ch.id))
    .returning();

  await logActivity(db, user.id, "archetype_apply", {
    archetypeId: parsed.data.archetypeId,
    spent: result.spent,
    unlockedTitle: result.unlockedTitle,
  });
  if (ranksSpent > 0) await bumpDailyQuests(user.id, "talents", ranksSpent);
  await evaluateAchievements(db, user.id, {
    talentSpent: true,
    talentRanksTotal: totalTalentRanks(progression),
    globalLevel: updated.globalLevel,
  });

  return c.json({
    ok: true,
    character: updated,
    progression,
    spent: result.spent,
    unlockedTitle: result.unlockedTitle ?? null,
    powerScore: buildPowerScore(progression),
    activeSynergies: activeSynergies(progression),
    activeArchetype: detectActiveArchetype(progression),
    effective: effectiveBuildStats(progression),
    recommendedTalent: recommendTalent(progression),
  });
});

/** Refund talent points for XP cost (respec). */
characterRoutes.post("/talents/respec", authMiddleware, async (c) => {
  const user = c.get("user");
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);

  let progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
  const cost = respecCostXp(progression.respecCount ?? 0);
  if (ch.globalXp < cost) {
    return c.json({ error: "insufficient_xp", costXp: cost, balanceXp: ch.globalXp }, 402);
  }

  const result = respecTalents(progression);
  if (!result.ok) return c.json({ error: result.error }, 400);

  const newXp = ch.globalXp - cost;
  const globalLevel = levelFromXp(newXp);
  progression = applyLevelUps(result.progression, globalLevel);

  const [updated] = await db
    .update(characters)
    .set({
      globalXp: newXp,
      globalLevel,
      progression,
      dailyGoalXp: 50 + dailyGoalBonus(progression),
    })
    .where(eq(characters.id, ch.id))
    .returning();

  await logActivity(db, user.id, "talent_respec", {
    costXp: cost,
    refunded: result.refunded,
  });

  return c.json({
    ok: true,
    character: updated,
    progression,
    costXp: cost,
    refunded: result.refunded,
  });
});

const equipSchema = z.object({
  kind: z.enum(["title", "frame"]),
  id: z.string().min(1).max(64),
});

characterRoutes.post("/cosmetics/equip", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = equipSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);

  let progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
  const result = equipCosmetic(progression, parsed.data.kind, parsed.data.id);
  if (!result.ok) return c.json({ error: result.error }, 400);

  const [updated] = await db
    .update(characters)
    .set({ progression: result.progression })
    .where(eq(characters.id, ch.id))
    .returning();

  return c.json({ ok: true, character: updated, progression: result.progression });
});

characterRoutes.get("/weekly", authMiddleware, async (c) => {
  const user = c.get("user");
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);
  const progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
  return c.json(weeklyQuestStatus(progression, isoWeekKey()));
});

characterRoutes.post("/weekly/:questKey/claim", authMiddleware, async (c) => {
  const user = c.get("user");
  const questKey = c.req.param("questKey");
  if (!questKey) return c.json({ error: "not_found" }, 404);

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  if (!ch) return c.json({ error: "no_character" }, 404);

  const weekKey = isoWeekKey();
  let progression = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
  const result = claimWeeklyQuest(progression, weekKey, questKey);
  if (!result.ok) return c.json({ error: result.error }, 400);

  const newXp = ch.globalXp + result.rewardXp;
  const globalLevel = levelFromXp(newXp);
  progression = applyLevelUps(result.progression, globalLevel);

  const [updated] = await db
    .update(characters)
    .set({ globalXp: newXp, globalLevel, progression })
    .where(eq(characters.id, ch.id))
    .returning();

  await logActivity(db, user.id, "weekly_quest_claimed", {
    questKey,
    rewardXp: result.rewardXp,
    weekKey,
  });
  await notifyUser(db, user.id, {
    type: "quest",
    titleUk: "Тижневий квест!",
    titleEn: "Weekly quest!",
    bodyUk: `+${result.rewardXp} XP`,
    bodyEn: `+${result.rewardXp} XP`,
    href: "/quests",
  });

  return c.json({
    ok: true,
    rewardXp: result.rewardXp,
    character: updated,
    weekly: weeklyQuestStatus(progression, weekKey),
  });
});
