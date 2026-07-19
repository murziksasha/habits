import { Hono } from "hono";
import { and, eq, gte, inArray, or, sql } from "drizzle-orm";
import {
  characters,
  courses,
  friendships,
  lessons,
  userLessonProgress,
  users,
} from "@eduforge/db";
import {
  PROGRAMMING_MINI_LESSON_SLUGS,
  isoWeekBounds,
  isoWeekKey,
  weeklyMinisRaceSlugs,
} from "@eduforge/shared";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";

type Vars = { user: AuthedUser };

export const friendsRoutes = new Hono<{ Variables: Vars }>();

friendsRoutes.get("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.friendships.findMany({
    where: or(
      eq(friendships.requesterId, user.id),
      eq(friendships.addresseeId, user.id),
    ),
  });

  const friends = [];
  const pendingIncoming = [];
  const pendingOutgoing = [];

  for (const f of rows) {
    const otherId = f.requesterId === user.id ? f.addresseeId : f.requesterId;
    const ch = await db.query.characters.findFirst({
      where: eq(characters.userId, otherId),
    });
    const u = await db.query.users.findFirst({ where: eq(users.id, otherId) });
    const entry = {
      friendshipId: f.id,
      userId: otherId,
      displayName: ch?.displayName ?? "—",
      email: u?.email ?? "",
      globalLevel: ch?.globalLevel ?? 1,
      globalXp: ch?.globalXp ?? 0,
      status: f.status,
    };
    if (f.status === "accepted") friends.push(entry);
    else if (f.status === "pending") {
      if (f.addresseeId === user.id) pendingIncoming.push(entry);
      else pendingOutgoing.push(entry);
    }
  }

  return c.json({ friends, pendingIncoming, pendingOutgoing });
});

async function minisCompletedForUsers(userIds: string[]) {
  const total = PROGRAMMING_MINI_LESSON_SLUGS.length;
  if (!userIds.length) return new Map<string, number>();

  const prog = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (!prog) return new Map(userIds.map((id) => [id, 0]));

  const miniSlugs = [...PROGRAMMING_MINI_LESSON_SLUGS];
  const progLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, prog.id),
  });
  const miniIds = progLessons
    .filter((l) => miniSlugs.includes(l.slug as (typeof miniSlugs)[number]))
    .map((l) => l.id);
  if (!miniIds.length) return new Map(userIds.map((id) => [id, 0]));

  const rows = await db
    .select({
      userId: userLessonProgress.userId,
      n: sql<number>`count(*)::int`,
    })
    .from(userLessonProgress)
    .where(
      and(
        inArray(userLessonProgress.userId, userIds),
        eq(userLessonProgress.courseId, prog.id),
        eq(userLessonProgress.status, "completed"),
        inArray(userLessonProgress.lessonId, miniIds),
      ),
    )
    .groupBy(userLessonProgress.userId);

  const map = new Map(userIds.map((id) => [id, 0]));
  for (const r of rows) map.set(r.userId, r.n);
  return map;
}

/** Compare programming minis with accepted friends (+ self) */
friendsRoutes.get("/minis", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.friendships.findMany({
    where: and(
      or(
        eq(friendships.requesterId, user.id),
        eq(friendships.addresseeId, user.id),
      ),
      eq(friendships.status, "accepted"),
    ),
  });

  const friendIds = rows.map((f) =>
    f.requesterId === user.id ? f.addresseeId : f.requesterId,
  );
  const ids = [user.id, ...friendIds];
  const counts = await minisCompletedForUsers(ids);
  const total = PROGRAMMING_MINI_LESSON_SLUGS.length;

  const people = [];
  for (const id of ids) {
    const ch = await db.query.characters.findFirst({
      where: eq(characters.userId, id),
    });
    const n = counts.get(id) ?? 0;
    people.push({
      userId: id,
      displayName: ch?.displayName ?? "—",
      globalLevel: ch?.globalLevel ?? 1,
      minisCompleted: n,
      total,
      allDone: n >= total && total > 0,
      isSelf: id === user.id,
    });
  }
  people.sort((a, b) => b.minisCompleted - a.minisCompleted || b.globalLevel - a.globalLevel);
  const ranked = people.map((p, i) => ({ ...p, rank: i + 1 }));

  return c.json({
    totalMinis: total,
    entries: ranked,
    me: ranked.find((p) => p.isSelf) ?? null,
  });
});

async function acceptedFriendIdsIncludingSelf(userId: string) {
  const rows = await db.query.friendships.findMany({
    where: and(
      or(
        eq(friendships.requesterId, userId),
        eq(friendships.addresseeId, userId),
      ),
      eq(friendships.status, "accepted"),
    ),
  });
  const friendIds = rows.map((f) =>
    f.requesterId === userId ? f.addresseeId : f.requesterId,
  );
  return [userId, ...friendIds];
}

/**
 * Weekly minis race among self + accepted friends.
 * Score = how many of this week's 3 featured minis completed in the ISO week.
 */
friendsRoutes.get("/race", authMiddleware, async (c) => {
  const user = c.get("user");
  const weekKey = isoWeekKey();
  const { startsAt, endsAt } = isoWeekBounds();
  const raceSlugs = weeklyMinisRaceSlugs(weekKey);
  const ids = await acceptedFriendIdsIncludingSelf(user.id);
  const totalRace = raceSlugs.length;

  const prog = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (!prog || !raceSlugs.length) {
    return c.json({
      weekKey,
      raceSlugs,
      totalRace,
      startsAt,
      endsAt,
      entries: [],
      me: null,
    });
  }

  const progLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, prog.id),
  });
  const raceIds = progLessons
    .filter((l) => raceSlugs.includes(l.slug))
    .map((l) => l.id);

  const scoreByUser = new Map<string, number>(ids.map((id) => [id, 0]));
  if (raceIds.length) {
    const rows = await db
      .select({
        userId: userLessonProgress.userId,
        n: sql<number>`count(*)::int`,
      })
      .from(userLessonProgress)
      .where(
        and(
          inArray(userLessonProgress.userId, ids),
          eq(userLessonProgress.courseId, prog.id),
          eq(userLessonProgress.status, "completed"),
          inArray(userLessonProgress.lessonId, raceIds),
          gte(userLessonProgress.completedAt, startsAt),
          sql`${userLessonProgress.completedAt} <= ${endsAt}`,
        ),
      )
      .groupBy(userLessonProgress.userId);
    for (const r of rows) scoreByUser.set(r.userId, r.n);
  }

  const people = [];
  for (const id of ids) {
    const ch = await db.query.characters.findFirst({
      where: eq(characters.userId, id),
    });
    const score = scoreByUser.get(id) ?? 0;
    people.push({
      userId: id,
      displayName: ch?.displayName ?? "—",
      globalLevel: ch?.globalLevel ?? 1,
      score,
      totalRace,
      isSelf: id === user.id,
    });
  }
  people.sort(
    (a, b) => b.score - a.score || b.globalLevel - a.globalLevel || a.displayName.localeCompare(b.displayName),
  );
  const ranked = people.map((p, i) => ({ ...p, rank: i + 1 }));

  return c.json({
    weekKey,
    raceSlugs,
    totalRace,
    startsAt,
    endsAt,
    entries: ranked,
    me: ranked.find((p) => p.isSelf) ?? null,
  });
});

const requestSchema = z.object({
  email: z.string().email().optional(),
  userId: z.string().uuid().optional(),
});

friendsRoutes.post("/request", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  let targetId = parsed.data.userId;
  if (!targetId && parsed.data.email) {
    const t = await db.query.users.findFirst({
      where: eq(users.email, parsed.data.email.toLowerCase()),
    });
    targetId = t?.id;
  }
  if (!targetId) return c.json({ error: "user_not_found" }, 404);
  if (targetId === user.id) return c.json({ error: "cannot_friend_self" }, 400);

  const existing = await db.query.friendships.findFirst({
    where: or(
      and(eq(friendships.requesterId, user.id), eq(friendships.addresseeId, targetId)),
      and(eq(friendships.requesterId, targetId), eq(friendships.addresseeId, user.id)),
    ),
  });
  if (existing) {
    if (existing.status === "accepted") return c.json({ error: "already_friends" }, 409);
    if (existing.status === "pending") return c.json({ error: "already_pending" }, 409);
  }

  const [row] = await db
    .insert(friendships)
    .values({ requesterId: user.id, addresseeId: targetId, status: "pending" })
    .returning();

  const me = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  await notifyUser(db, targetId, {
    type: "friend",
    titleUk: "Запит у друзі",
    titleEn: "Friend request",
    bodyUk: `${me?.displayName ?? "Гравець"} хоче додати вас у друзі`,
    bodyEn: `${me?.displayName ?? "Player"} sent you a friend request`,
    href: "/friends",
  });
  await logActivity(db, user.id, "friend_request_sent", { to: targetId });

  return c.json({ friendship: row }, 201);
});

friendsRoutes.post("/:id/accept", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const f = await db.query.friendships.findFirst({ where: eq(friendships.id, id) });
  if (!f) return c.json({ error: "not_found" }, 404);
  if (f.addresseeId !== user.id) return c.json({ error: "forbidden" }, 403);
  if (f.status !== "pending") return c.json({ error: "not_pending" }, 400);

  await db
    .update(friendships)
    .set({ status: "accepted", updatedAt: new Date() })
    .where(eq(friendships.id, f.id));

  await notifyUser(db, f.requesterId, {
    type: "friend",
    titleUk: "Запит прийнято",
    titleEn: "Friend request accepted",
    bodyUk: "Вас додали в друзі",
    bodyEn: "Your friend request was accepted",
    href: "/friends",
  });

  return c.json({ ok: true });
});

friendsRoutes.post("/:id/reject", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id") as string;
  const f = await db.query.friendships.findFirst({ where: eq(friendships.id, id) });
  if (!f) return c.json({ error: "not_found" }, 404);
  if (f.addresseeId !== user.id && f.requesterId !== user.id) {
    return c.json({ error: "forbidden" }, 403);
  }
  await db.delete(friendships).where(eq(friendships.id, f.id));
  return c.json({ ok: true });
});
