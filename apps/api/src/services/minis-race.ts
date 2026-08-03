import { and, eq, gte, inArray, sql } from "drizzle-orm";
import {
  characters,
  courses,
  learningMilestones,
  lessons,
  userLessonProgress,
} from "@eduforge/db";
import {
  isoWeekBounds,
  isoWeekKey,
  weeklyMinisRaceSlugs,
  weeklyMinisRaceXpBonus,
} from "@eduforge/shared";
import { db } from "../db.js";

export type MinisRaceEntry = {
  rank: number;
  userId: string;
  displayName: string;
  score: number;
  bonusXp: number;
};

export type MinisRacePayload = {
  weekKey: string;
  raceSlugs: string[];
  raceMeta: {
    slug: string;
    lessonId: string | null;
    titleUk: string;
    titleEn: string;
    completedThisWeek: boolean;
  }[];
  startsAt: Date;
  endsAt: Date;
  totalRace: number;
  entries: MinisRaceEntry[];
  me: {
    rank: number;
    score: number;
    bonusXp: number;
    canClaim: boolean;
    claimed: boolean;
  } | null;
};

/** Weekly programming minis race board + current user score. */
export async function buildMinisRace(userId: string): Promise<MinisRacePayload> {
  const weekKey = isoWeekKey();
  const { startsAt, endsAt } = isoWeekBounds();
  const raceSlugs = weeklyMinisRaceSlugs(weekKey);

  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, "programming"),
  });
  if (!course) {
    return {
      weekKey,
      raceSlugs,
      raceMeta: raceSlugs.map((slug) => ({
        slug,
        lessonId: null,
        titleUk: slug,
        titleEn: slug,
        completedThisWeek: false,
      })),
      startsAt,
      endsAt,
      totalRace: raceSlugs.length,
      entries: [],
      me: null,
    };
  }

  const courseLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, course.id),
  });
  const raceLessons = courseLessons.filter((l) => raceSlugs.includes(l.slug));
  const raceIds = raceLessons.map((l) => l.id);
  const raceMetaBase = raceSlugs.map((slug) => {
    const les = raceLessons.find((l) => l.slug === slug);
    return {
      slug,
      lessonId: les?.id ?? null,
      titleUk: les?.titleUk ?? slug,
      titleEn: les?.titleEn || les?.titleUk || slug,
    };
  });

  if (!raceIds.length) {
    return {
      weekKey,
      raceSlugs,
      raceMeta: raceMetaBase.map((m) => ({ ...m, completedThisWeek: false })),
      startsAt,
      endsAt,
      totalRace: raceSlugs.length,
      entries: [],
      me: null,
    };
  }

  const rows = await db
    .select({
      userId: userLessonProgress.userId,
      score: sql<number>`count(*)::int`,
      displayName: characters.displayName,
    })
    .from(userLessonProgress)
    .innerJoin(characters, eq(characters.userId, userLessonProgress.userId))
    .where(
      and(
        eq(userLessonProgress.courseId, course.id),
        eq(userLessonProgress.status, "completed"),
        inArray(userLessonProgress.lessonId, raceIds),
        gte(userLessonProgress.completedAt, startsAt),
        sql`${userLessonProgress.completedAt} <= ${endsAt}`,
      ),
    )
    .groupBy(userLessonProgress.userId, characters.displayName)
    .orderBy(sql`count(*) desc`)
    .limit(20);

  const entries: MinisRaceEntry[] = rows.map((r, i) => ({
    rank: i + 1,
    userId: r.userId,
    displayName: r.displayName ?? "—",
    score: r.score,
    bonusXp: weeklyMinisRaceXpBonus(i + 1),
  }));

  const meEntry = entries.find((e) => e.userId === userId);
  let meScore = meEntry?.score ?? 0;
  if (!meEntry) {
    const [own] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, userId),
          eq(userLessonProgress.courseId, course.id),
          eq(userLessonProgress.status, "completed"),
          inArray(userLessonProgress.lessonId, raceIds),
          gte(userLessonProgress.completedAt, startsAt),
          sql`${userLessonProgress.completedAt} <= ${endsAt}`,
        ),
      );
    meScore = own?.n ?? 0;
  }

  const bonusCode = `prog_minis_race_${weekKey}`;
  const claimed = await db.query.learningMilestones.findFirst({
    where: and(
      eq(learningMilestones.userId, userId),
      eq(learningMilestones.code, bonusCode),
    ),
  });

  const myDone = await db.query.userLessonProgress.findMany({
    where: and(
      eq(userLessonProgress.userId, userId),
      eq(userLessonProgress.courseId, course.id),
      eq(userLessonProgress.status, "completed"),
      inArray(userLessonProgress.lessonId, raceIds),
      gte(userLessonProgress.completedAt, startsAt),
    ),
  });
  const myDoneIds = new Set(myDone.map((d) => d.lessonId));

  return {
    weekKey,
    raceSlugs,
    raceMeta: raceMetaBase.map((m) => ({
      ...m,
      completedThisWeek: m.lessonId ? myDoneIds.has(m.lessonId) : false,
    })),
    startsAt,
    endsAt,
    totalRace: raceSlugs.length,
    entries,
    me: {
      rank: meEntry?.rank ?? 0,
      score: meScore,
      bonusXp: meEntry ? weeklyMinisRaceXpBonus(meEntry.rank) : 0,
      canClaim:
        Boolean(meEntry && meEntry.rank <= 3 && weeklyMinisRaceXpBonus(meEntry.rank) > 0) &&
        !claimed,
      claimed: Boolean(claimed),
    },
  };
}
