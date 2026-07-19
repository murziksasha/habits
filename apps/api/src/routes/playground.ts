import { Hono } from "hono";
import { and, desc, eq, gte, inArray, like } from "drizzle-orm";
import {
  characters,
  classMembers,
  classPlaygroundChallenges,
  classes,
  learningMilestones,
  organizationMembers,
} from "@eduforge/db";
import {
  PLAYGROUND_CHALLENGES,
  PLAYGROUND_EXAMPLES,
  PLAYGROUND_LANGS,
  evaluatePlaygroundChallenge,
  isoWeekBounds,
  isoWeekKey,
  levelFromXp,
  playgroundChallengeById,
  playgroundXpForCodes,
  weeklyRaceChallengeIds,
  weeklyRaceXpBonus,
} from "@eduforge/shared";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { rateLimit } from "../rate-limit.js";
import { logActivity, notifyUser } from "../engagement.js";
import { db } from "../db.js";

type Vars = { user: AuthedUser };

export const playgroundRoutes = new Hono<{ Variables: Vars }>();

function publicChallenge(ch: (typeof PLAYGROUND_CHALLENGES)[0], solved = false) {
  return {
    id: ch.id,
    lang: ch.lang,
    titleUk: ch.titleUk,
    titleEn: ch.titleEn,
    promptUk: ch.promptUk,
    promptEn: ch.promptEn,
    starterCode: ch.starterCode,
    starterHtml: ch.starterHtml,
    xpReward: ch.xpReward,
    hintUk: ch.hintUk,
    hintEn: ch.hintEn,
    mode: ch.expectedSourceContains?.length ? "source" : "stdout",
    hasDomAsserts: Boolean(ch.domAsserts?.length),
    domAsserts: ch.domAsserts ?? [],
    solved,
  };
}

async function canTeachClass(user: AuthedUser, classId: string) {
  if (user.role === "admin") return true;
  const cls = await db.query.classes.findFirst({ where: eq(classes.id, classId) });
  if (!cls) return false;
  if (cls.teacherUserId === user.id) return true;
  const mem = await db.query.organizationMembers.findFirst({
    where: and(
      eq(organizationMembers.organizationId, cls.organizationId),
      eq(organizationMembers.userId, user.id),
    ),
  });
  return mem?.role === "owner" || mem?.role === "teacher";
}

playgroundRoutes.get("/meta", (c) => {
  return c.json({
    languages: PLAYGROUND_LANGS,
    examples: PLAYGROUND_EXAMPLES,
    challenges: PLAYGROUND_CHALLENGES.map((ch) => publicChallenge(ch)),
    note: "JS/TS iframe sandbox. HTML/CSS source checks. SQL/Bash sim. Challenges award XP once.",
  });
});

playgroundRoutes.get("/challenges", authMiddleware, async (c) => {
  const user = c.get("user");
  const solved = await db.query.learningMilestones.findMany({
    where: eq(learningMilestones.userId, user.id),
  });
  const solvedIds = new Set(
    solved
      .filter((m) => m.code.startsWith("pg_ch_"))
      .map((m) => m.code.replace(/^pg_ch_/, "")),
  );
  return c.json({
    challenges: PLAYGROUND_CHALLENGES.map((ch) =>
      publicChallenge(ch, solvedIds.has(ch.id)),
    ),
  });
});

/** Leaderboard: playground challenge XP (sum of solved challenge rewards) */
playgroundRoutes.get("/leaderboard", async (c) => {
  const rows = await db
    .select({
      userId: learningMilestones.userId,
      code: learningMilestones.code,
      displayName: characters.displayName,
      globalLevel: characters.globalLevel,
      avatarKey: characters.avatarKey,
    })
    .from(learningMilestones)
    .innerJoin(characters, eq(characters.userId, learningMilestones.userId))
    .where(like(learningMilestones.code, "pg_ch_%"));

  const byUser = new Map<
    string,
    { displayName: string; globalLevel: number; avatarKey: string; codes: string[] }
  >();
  for (const r of rows) {
    let entry = byUser.get(r.userId);
    if (!entry) {
      entry = {
        displayName: r.displayName,
        globalLevel: r.globalLevel,
        avatarKey: r.avatarKey,
        codes: [],
      };
      byUser.set(r.userId, entry);
    }
    entry.codes.push(r.code);
  }

  const ranked = [...byUser.entries()]
    .map(([userId, v]) => {
      const { solved, xp } = playgroundXpForCodes(v.codes);
      return {
        userId,
        displayName: v.displayName,
        globalLevel: v.globalLevel,
        avatarKey: v.avatarKey,
        solved,
        score: xp,
      };
    })
    .sort((a, b) => b.score - a.score || b.solved - a.solved)
    .slice(0, 50)
    .map((r, i) => ({ rank: i + 1, ...r }));

  return c.json({
    entries: ranked,
    totalChallenges: PLAYGROUND_CHALLENGES.length,
    maxXp: PLAYGROUND_CHALLENGES.reduce((s, c) => s + c.xpReward, 0),
  });
});

/** Weekly race: XP from race-set challenges solved during this ISO week */
playgroundRoutes.get("/race/weekly", async (c) => {
  const weekKey = isoWeekKey();
  const { startsAt, endsAt } = isoWeekBounds();
  const raceIds = weeklyRaceChallengeIds(weekKey);
  const raceSet = new Set(raceIds);
  const raceXpMap = new Map(
    PLAYGROUND_CHALLENGES.filter((ch) => raceSet.has(ch.id)).map((ch) => [
      ch.id,
      ch.xpReward,
    ]),
  );

  const rows = await db
    .select({
      userId: learningMilestones.userId,
      code: learningMilestones.code,
      unlockedAt: learningMilestones.unlockedAt,
      displayName: characters.displayName,
      avatarKey: characters.avatarKey,
    })
    .from(learningMilestones)
    .innerJoin(characters, eq(characters.userId, learningMilestones.userId))
    .where(
      and(
        like(learningMilestones.code, "pg_ch_%"),
        gte(learningMilestones.unlockedAt, startsAt),
      ),
    );

  const byUser = new Map<
    string,
    { displayName: string; avatarKey: string; xp: number; solved: number }
  >();
  for (const r of rows) {
    const chId = r.code.replace(/^pg_ch_/, "");
    if (!raceSet.has(chId)) continue;
    if (r.unlockedAt > endsAt) continue;
    let e = byUser.get(r.userId);
    if (!e) {
      e = { displayName: r.displayName, avatarKey: r.avatarKey, xp: 0, solved: 0 };
      byUser.set(r.userId, e);
    }
    e.solved += 1;
    e.xp += raceXpMap.get(chId) ?? 0;
  }

  const entries = [...byUser.entries()]
    .map(([userId, v]) => ({ userId, ...v, score: v.xp }))
    .sort((a, b) => b.score - a.score || b.solved - a.solved)
    .slice(0, 50)
    .map((r, i) => ({
      rank: i + 1,
      ...r,
      bonusXp: weeklyRaceXpBonus(i + 1),
    }));

  return c.json({
    weekKey,
    startsAt,
    endsAt,
    challengeIds: raceIds,
    challenges: raceIds
      .map((id) => playgroundChallengeById(id))
      .filter(Boolean)
      .map((ch) => publicChallenge(ch!)),
    entries,
  });
});

const runLogSchema = z.object({
  lang: z.string().min(1).max(32),
  success: z.boolean(),
  exampleId: z.string().max(64).optional(),
  isolated: z.boolean().optional(),
});

playgroundRoutes.post("/log", authMiddleware, async (c) => {
  const user = c.get("user");
  const rl = await rateLimit({
    key: `playground:${user.id}`,
    limit: 60,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return c.json({ error: "rate_limited", retryAfter: rl.retryAfterSec }, 429);
  }
  const body = await c.req.json().catch(() => null);
  const parsed = runLogSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  await logActivity(db, user.id, "playground_run", {
    lang: parsed.data.lang,
    success: parsed.data.success,
    exampleId: parsed.data.exampleId,
    isolated: parsed.data.isolated,
  });
  return c.json({ ok: true });
});

const submitSchema = z.object({
  challengeId: z.string().min(1).max(64),
  stdout: z.string().max(50_000).optional().default(""),
  /** HTML or CSS source for visual/source challenges */
  source: z.string().max(100_000).optional().default(""),
});

playgroundRoutes.post("/challenge/submit", authMiddleware, async (c) => {
  const user = c.get("user");
  const rl = await rateLimit({
    key: `playground-ch:${user.id}`,
    limit: 40,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return c.json({ error: "rate_limited", retryAfter: rl.retryAfterSec }, 429);
  }

  const body = await c.req.json().catch(() => null);
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const ch = playgroundChallengeById(parsed.data.challengeId);
  if (!ch) return c.json({ error: "not_found" }, 404);

  const { pass, reason } = evaluatePlaygroundChallenge(ch, {
    stdout: parsed.data.stdout,
    source: parsed.data.source,
  });
  if (!pass) {
    return c.json({
      pass: false,
      reason,
      expected: ch.expectedStdout,
      expectedSourceContains: ch.expectedSourceContains,
      xpGain: 0,
      alreadySolved: false,
    });
  }

  const code = `pg_ch_${ch.id}`;
  const existing = await db.query.learningMilestones.findFirst({
    where: and(
      eq(learningMilestones.userId, user.id),
      eq(learningMilestones.code, code),
    ),
  });

  let xpGain = 0;
  let character = null;
  if (!existing) {
    xpGain = ch.xpReward;
    await db.insert(learningMilestones).values({
      userId: user.id,
      code,
      titleUk: `Playground: ${ch.titleUk}`,
      titleEn: `Playground: ${ch.titleEn}`,
    });
    const row = await db.query.characters.findFirst({
      where: eq(characters.userId, user.id),
    });
    if (row) {
      const globalXp = row.globalXp + xpGain;
      const [updated] = await db
        .update(characters)
        .set({ globalXp, globalLevel: levelFromXp(globalXp) })
        .where(eq(characters.id, row.id))
        .returning();
      character = updated;
    }
    await logActivity(db, user.id, "playground_challenge", {
      challengeId: ch.id,
      xpGain,
      lang: ch.lang,
    });
    await notifyUser(db, user.id, {
      type: "playground",
      titleUk: `Challenge: ${ch.titleUk}`,
      titleEn: `Challenge: ${ch.titleEn}`,
      bodyUk: `+${xpGain} XP`,
      bodyEn: `+${xpGain} XP`,
      href: "/playground",
    });
    const { evaluateAchievements } = await import("../engagement.js");
    await evaluateAchievements(db, user.id, { playgroundChallenge: true });
  }

  return c.json({
    pass: true,
    xpGain,
    alreadySolved: Boolean(existing),
    character,
  });
});

/** Claim weekly race top-3 bonus once per week (must be ranked 1–3) */
playgroundRoutes.post("/race/claim-bonus", authMiddleware, async (c) => {
  const user = c.get("user");
  const weekKey = isoWeekKey();
  const code = `pg_race_bonus_${weekKey}`;
  const already = await db.query.learningMilestones.findFirst({
    where: and(
      eq(learningMilestones.userId, user.id),
      eq(learningMilestones.code, code),
    ),
  });
  if (already) {
    return c.json({ ok: false, error: "already_claimed", xpGain: 0 });
  }

  // Recompute race rank for this user
  const raceRes = await (async () => {
    const { startsAt, endsAt } = isoWeekBounds();
    const raceIds = weeklyRaceChallengeIds(weekKey);
    const raceSet = new Set(raceIds);
    const raceXpMap = new Map(
      PLAYGROUND_CHALLENGES.filter((ch) => raceSet.has(ch.id)).map((ch) => [
        ch.id,
        ch.xpReward,
      ]),
    );
    const rows = await db
      .select({
        userId: learningMilestones.userId,
        code: learningMilestones.code,
        unlockedAt: learningMilestones.unlockedAt,
      })
      .from(learningMilestones)
      .where(
        and(
          like(learningMilestones.code, "pg_ch_%"),
          gte(learningMilestones.unlockedAt, startsAt),
        ),
      );
    const byUser = new Map<string, number>();
    for (const r of rows) {
      const chId = r.code.replace(/^pg_ch_/, "");
      if (!raceSet.has(chId) || r.unlockedAt > endsAt) continue;
      byUser.set(r.userId, (byUser.get(r.userId) ?? 0) + (raceXpMap.get(chId) ?? 0));
    }
    const ranked = [...byUser.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([uid], i) => ({ userId: uid, rank: i + 1 }));
    return ranked.find((r) => r.userId === user.id);
  })();

  if (!raceRes || raceRes.rank > 3) {
    return c.json({ ok: false, error: "not_eligible", rank: raceRes?.rank ?? null, xpGain: 0 });
  }

  const bonus = weeklyRaceXpBonus(raceRes.rank);
  if (bonus <= 0) {
    return c.json({ ok: false, error: "no_bonus", xpGain: 0 });
  }

  await db.insert(learningMilestones).values({
    userId: user.id,
    code,
    titleUk: `Race bonus ${weekKey} #${raceRes.rank}`,
    titleEn: `Race bonus ${weekKey} #${raceRes.rank}`,
  });

  const row = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  let character = row;
  if (row) {
    const globalXp = row.globalXp + bonus;
    const [updated] = await db
      .update(characters)
      .set({ globalXp, globalLevel: levelFromXp(globalXp) })
      .where(eq(characters.id, row.id))
      .returning();
    character = updated;
  }
  await logActivity(db, user.id, "pg_race_bonus", { weekKey, rank: raceRes.rank, bonus });
  await notifyUser(db, user.id, {
    type: "race",
    titleUk: `Тижнева гонка #${raceRes.rank}`,
    titleEn: `Weekly race #${raceRes.rank}`,
    bodyUk: `+${bonus} XP`,
    bodyEn: `+${bonus} XP`,
    href: "/playground",
  });

  return c.json({ ok: true, rank: raceRes.rank, xpGain: bonus, character });
});

playgroundRoutes.get("/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const solved = await db.query.learningMilestones.findMany({
    where: and(
      eq(learningMilestones.userId, user.id),
      like(learningMilestones.code, "pg_ch_%"),
    ),
    orderBy: [desc(learningMilestones.unlockedAt)],
  });
  const { solved: n, xp } = playgroundXpForCodes(solved.map((s) => s.code));
  const weekKey = isoWeekKey();
  const raceIds = weeklyRaceChallengeIds(weekKey);
  const raceSet = new Set(raceIds);
  const { startsAt } = isoWeekBounds();
  const weekSolved = solved.filter(
    (s) =>
      raceSet.has(s.code.replace(/^pg_ch_/, "")) && s.unlockedAt >= startsAt,
  );
  return c.json({
    solved: n,
    xp,
    totalChallenges: PLAYGROUND_CHALLENGES.length,
    maxXp: PLAYGROUND_CHALLENGES.reduce((s, ch) => s + ch.xpReward, 0),
    codes: solved.map((s) => s.code),
    race: {
      weekKey,
      solved: weekSolved.length,
      total: raceIds.length,
      challengeIds: raceIds,
    },
  });
});

/* ——— Class team challenges ——— */
const assignSchema = z.object({
  challengeIds: z.array(z.string().min(1)).min(1).max(20),
  dueAt: z.string().datetime().optional().nullable(),
});

playgroundRoutes.post("/class/:classId/assign", authMiddleware, async (c) => {
  const user = c.get("user");
  const classId = c.req.param("classId") as string;
  if (!(await canTeachClass(user, classId))) {
    return c.json({ error: "forbidden" }, 403);
  }
  const body = await c.req.json().catch(() => null);
  const parsed = assignSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const created = [];
  for (const challengeId of parsed.data.challengeIds) {
    const ch = playgroundChallengeById(challengeId);
    if (!ch) continue;
    const existing = await db.query.classPlaygroundChallenges.findFirst({
      where: and(
        eq(classPlaygroundChallenges.classId, classId),
        eq(classPlaygroundChallenges.challengeId, challengeId),
      ),
    });
    if (existing) continue;
    const [row] = await db
      .insert(classPlaygroundChallenges)
      .values({
        classId,
        challengeId,
        titleUk: ch.titleUk,
        titleEn: ch.titleEn,
        createdByUserId: user.id,
        dueAt: parsed.data.dueAt ? new Date(parsed.data.dueAt) : null,
      })
      .returning();
    if (row) created.push(row);
  }

  const members = await db.query.classMembers.findMany({
    where: eq(classMembers.classId, classId),
  });
  for (const m of members) {
    await notifyUser(db, m.userId, {
      type: "class_pg",
      titleUk: "Class playground challenge",
      titleEn: "Class playground challenge",
      bodyUk: `Призначено ${created.length} challenge(s)`,
      bodyEn: `Assigned ${created.length} challenge(s)`,
      href: "/playground",
    });
  }
  await logActivity(db, user.id, "class_pg_assign", {
    classId,
    count: created.length,
  });
  return c.json({ assignments: created, count: created.length }, 201);
});

playgroundRoutes.get("/class/:classId", authMiddleware, async (c) => {
  const user = c.get("user");
  const classId = c.req.param("classId") as string;
  const isTeacher = await canTeachClass(user, classId);
  const isStudent = await db.query.classMembers.findFirst({
    where: and(eq(classMembers.classId, classId), eq(classMembers.userId, user.id)),
  });
  if (!isTeacher && !isStudent && user.role !== "admin") {
    return c.json({ error: "forbidden" }, 403);
  }

  const assigns = await db.query.classPlaygroundChallenges.findMany({
    where: eq(classPlaygroundChallenges.classId, classId),
    orderBy: [desc(classPlaygroundChallenges.createdAt)],
  });
  const members = await db.query.classMembers.findMany({
    where: eq(classMembers.classId, classId),
  });
  const memberIds = members.map((m) => m.userId);

  const out = [];
  for (const a of assigns) {
    const ch = playgroundChallengeById(a.challengeId);
    let solvedCount = 0;
    let iSolved = false;
    if (memberIds.length) {
      const codes = [`pg_ch_${a.challengeId}`];
      const ms = await db.query.learningMilestones.findMany({
        where: and(
          inArray(learningMilestones.userId, memberIds),
          eq(learningMilestones.code, codes[0]!),
        ),
      });
      solvedCount = new Set(ms.map((m) => m.userId)).size;
      iSolved = ms.some((m) => m.userId === user.id);
    }
    out.push({
      id: a.id,
      challengeId: a.challengeId,
      titleUk: a.titleUk || ch?.titleUk,
      titleEn: a.titleEn || ch?.titleEn,
      dueAt: a.dueAt,
      createdAt: a.createdAt,
      totalStudents: memberIds.length,
      solvedCount,
      solvedByMe: iSolved,
      xpReward: ch?.xpReward ?? 0,
      lang: ch?.lang,
    });
  }
  return c.json({ assignments: out });
});

playgroundRoutes.get("/class-mine", authMiddleware, async (c) => {
  const user = c.get("user");
  const memberships = await db.query.classMembers.findMany({
    where: eq(classMembers.userId, user.id),
  });
  if (!memberships.length) return c.json({ assignments: [] });

  const classIds = memberships.map((m) => m.classId);
  const assigns = await db.query.classPlaygroundChallenges.findMany({
    where: inArray(classPlaygroundChallenges.classId, classIds),
    orderBy: [desc(classPlaygroundChallenges.createdAt)],
    limit: 40,
  });

  const solved = await db.query.learningMilestones.findMany({
    where: and(
      eq(learningMilestones.userId, user.id),
      like(learningMilestones.code, "pg_ch_%"),
    ),
  });
  const solvedIds = new Set(
    solved.map((s) => s.code.replace(/^pg_ch_/, "")),
  );

  const classNames = new Map<string, string>();
  for (const id of classIds) {
    const cls = await db.query.classes.findFirst({ where: eq(classes.id, id) });
    if (cls) classNames.set(id, cls.name);
  }

  return c.json({
    assignments: assigns.map((a) => {
      const ch = playgroundChallengeById(a.challengeId);
      return {
        id: a.id,
        classId: a.classId,
        className: classNames.get(a.classId) ?? "Class",
        challengeId: a.challengeId,
        titleUk: a.titleUk || ch?.titleUk,
        titleEn: a.titleEn || ch?.titleEn,
        dueAt: a.dueAt,
        solved: solvedIds.has(a.challengeId),
        lang: ch?.lang,
        xpReward: ch?.xpReward ?? 0,
      };
    }),
  });
});

playgroundRoutes.delete("/class/:classId/:assignmentId", authMiddleware, async (c) => {
  const user = c.get("user");
  const classId = c.req.param("classId") as string;
  const assignmentId = c.req.param("assignmentId") as string;
  if (!(await canTeachClass(user, classId))) {
    return c.json({ error: "forbidden" }, 403);
  }
  await db
    .delete(classPlaygroundChallenges)
    .where(
      and(
        eq(classPlaygroundChallenges.id, assignmentId),
        eq(classPlaygroundChallenges.classId, classId),
      ),
    );
  return c.json({ ok: true });
});
