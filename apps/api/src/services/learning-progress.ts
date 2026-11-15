import { and, asc, desc, eq, gte, inArray, isNotNull, lt, or, sql } from "drizzle-orm";
import {
  characters,
  courses,
  lessons,
  skillAttempts,
  userCourseProgress,
  userLessonProgress,
} from "@eduforge/db";
import {
  COURSE_META,
  DAILY_XP_CAP,
  WEEKLY_TARGET_PRESETS,
  addUtcDays,
  classifyAttemptOutcome,
  computePersonalBests,
  computeWeeklyRecap,
  heatmapIntensity,
  isoWeekBounds,
  levelFromXp,
  normalizeProgression,
  parseFiniteNumber,
  parseOptionalBoolean,
  previousWeekElapsedWindow,
  utcDateKey,
  utcDayStart,
  xpProgressInLevel,
  type ClassifiedAttemptSummary,
  type GrantedRewardItem,
  type LearningAutomaticGoal,
  type LearningCalendarDay,
  type LearningCalendarResponse,
  type LearningCourseOption,
  type LearningCourseProgressItem,
  type LearningDailyPoint,
  type LearningGoalState,
  type LearningHistoryItem,
  type LearningHistoryQuery,
  type LearningHistoryResponse,
  type LearningProgressQuery,
  type LearningProgressResponse,
  type LevelChangeTrigger,
  type UpdateLearningGoalResponse,
} from "@eduforge/shared";
import { z } from "zod";
import { db } from "../db.js";
import { buildNextRecommendations } from "./next-steps.js";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUuid(raw: string | null | undefined): raw is string {
  return typeof raw === "string" && UUID_RE.test(raw);
}

const cursorPayloadSchema = z.object({
  createdAt: z.string().datetime(),
  id: z.string().uuid(),
});

export function encodeHistoryCursor(createdAt: Date, id: string): string {
  return Buffer.from(
    JSON.stringify({ createdAt: createdAt.toISOString(), id }),
    "utf8",
  ).toString("base64url");
}

export function decodeHistoryCursor(
  raw: string,
): { createdAt: Date; id: string } | null {
  try {
    const json = JSON.parse(Buffer.from(raw, "base64url").toString("utf8"));
    const parsed = cursorPayloadSchema.safeParse(json);
    if (!parsed.success) return null;
    const d = new Date(parsed.data.createdAt);
    if (Number.isNaN(d.getTime())) return null;
    return { createdAt: d, id: parsed.data.id };
  } catch {
    return null;
  }
}

const LESSON_OR_REVIEW_KINDS = new Set([
  "exam_ready",
  "leech",
  "review_weak",
  "review_queue",
  "spaced_review",
  "continue_course",
  "start_course",
  "explore_course",
  "deep_track",
  "programming_mini_race",
  "programming_mini",
]);

function isLessonOrReviewRec(r: { kind: string; href: string }): boolean {
  if (LESSON_OR_REVIEW_KINDS.has(r.kind)) return true;
  return (
    r.href.includes("/lessons/") ||
    r.href === "/review" ||
    r.href.startsWith("/courses/")
  );
}

export async function pickAutomaticGoalRecommendation(
  userId: string,
): Promise<LearningAutomaticGoal | null> {
  const { recommendations } = await buildNextRecommendations(userId, 12);
  if (!recommendations.length) return null;
  const match =
    recommendations.find((r) => isLessonOrReviewRec(r)) ?? recommendations[0];
  if (!match) return null;
  const courseSlug =
    typeof match.meta?.courseSlug === "string" ? match.meta.courseSlug : undefined;
  return {
    kind: match.kind,
    titleUk: match.titleUk,
    titleEn: match.titleEn,
    href: match.href,
    ...(courseSlug ? { courseSlug } : {}),
  };
}

/**
 * Shared study calendar / heatmap aggregator backed by `skill_attempts` on UTC day boundaries.
 * Any submitted lesson or exam marks a study day; character streaks remain separate.
 */
export async function getStudyCalendar(
  userId: string,
  opts?: { days?: number; now?: Date },
): Promise<LearningCalendarResponse> {
  const days = Math.min(120, Math.max(14, Math.floor(opts?.days ?? 84)));
  const now = opts?.now ?? new Date();
  const todayIso = utcDateKey(now);
  const startIso = addUtcDays(todayIso, -(days - 1));
  const since = utcDayStart(startIso);

  const rows = await db
    .select({
      day: sql<string>`to_char(${skillAttempts.createdAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`,
      count: sql<number>`count(*)::int`,
    })
    .from(skillAttempts)
    .where(and(eq(skillAttempts.userId, userId), gte(skillAttempts.createdAt, since)))
    .groupBy(sql`to_char(${skillAttempts.createdAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`);

  const map = new Map(rows.map((r) => [r.day, r.count]));
  const series: LearningCalendarDay[] = [];
  for (let i = 0; i < days; i++) {
    const date = addUtcDays(startIso, i);
    const count = map.get(date) ?? 0;
    series.push({
      date,
      count,
      level: heatmapIntensity(count),
    });
  }

  const activeDays = series.filter((s) => s.count > 0).length;
  let maxStreakInWindow = 0;
  let cur = 0;
  for (const s of series) {
    if (s.count > 0) {
      cur += 1;
      if (cur > maxStreakInWindow) maxStreakInWindow = cur;
    } else {
      cur = 0;
    }
  }

  return {
    days,
    timezone: "UTC",
    series,
    activeDays,
    maxStreakInWindow,
  };
}

/** Recorded UTC study dates (from submitted lessons) for compact Dashboard/Profile calendars. */
export async function getRecordedStudyDates(
  userId: string,
  days = 14,
  now = new Date(),
): Promise<string[]> {
  const cal = await getStudyCalendar(userId, { days, now });
  return cal.series.filter((d) => d.count > 0).map((d) => d.date);
}

type AttemptProjectionRow = {
  id: string;
  courseSlug: string;
  xpGained: number;
  createdAt: Date;
  lessonId: string | null;
  outcome: string | null;
  accuracyRaw: string | null;
  isExamRaw: string | null;
  passThresholdRaw: string | null;
};

async function loadLessonLookup(
  lessonIds: string[],
): Promise<
  Map<
    string,
    {
      id: string;
      titleUk: string;
      titleEn: string;
      isExam: boolean;
      passThreshold: number | null;
    }
  >
> {
  const validIds = [...new Set(lessonIds.filter(isUuid))];
  if (!validIds.length) return new Map();
  const rows = await db
    .select({
      id: lessons.id,
      titleUk: lessons.titleUk,
      titleEn: lessons.titleEn,
      isExam: lessons.isExam,
      passThreshold: lessons.passThreshold,
    })
    .from(lessons)
    .where(inArray(lessons.id, validIds));
  return new Map(rows.map((r) => [r.id, r]));
}

function parseGrantedRewards(raw: unknown): GrantedRewardItem[] {
  if (!Array.isArray(raw)) return [];
  const out: GrantedRewardItem[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const r = item as Record<string, unknown>;
    if (typeof r.kind !== "string" || typeof r.icon !== "string") continue;
    out.push({
      kind: r.kind as GrantedRewardItem["kind"],
      ...(typeof r.key === "string" ? { key: r.key } : {}),
      ...(typeof r.amount === "number" ? { amount: r.amount } : {}),
      labelUk: typeof r.labelUk === "string" ? r.labelUk : "",
      labelEn: typeof r.labelEn === "string" ? r.labelEn : "",
      icon: r.icon,
      source:
        r.source === "level_up" || r.source === "loot" || r.source === "lesson"
          ? r.source
          : "lesson",
    });
  }
  return out;
}

function buildGoalPayload(opts: {
  weeklyTarget: number | null;
  currentWeekSuccesses: number;
  weekKey: string;
  weekStart: Date;
  weekEnd: Date;
  automaticGoal: LearningAutomaticGoal | null;
}): LearningGoalState {
  const target = opts.weeklyTarget;
  if (target != null) {
    return {
      mode: "custom",
      weeklyTarget: target,
      currentWeekSuccesses: opts.currentWeekSuccesses,
      remaining: Math.max(0, target - opts.currentWeekSuccesses),
      completed: opts.currentWeekSuccesses >= target,
      progressRatio: Math.min(1, opts.currentWeekSuccesses / Math.max(1, target)),
      weekKey: opts.weekKey,
      weekStart: opts.weekStart.toISOString(),
      weekEnd: opts.weekEnd.toISOString(),
      presets: WEEKLY_TARGET_PRESETS,
      automaticGoal: null,
    };
  }
  return {
    mode: "automatic",
    weeklyTarget: null,
    currentWeekSuccesses: opts.currentWeekSuccesses,
    remaining: null,
    completed: false,
    progressRatio: null,
    weekKey: opts.weekKey,
    weekStart: opts.weekStart.toISOString(),
    weekEnd: opts.weekEnd.toISOString(),
    presets: WEEKLY_TARGET_PRESETS,
    automaticGoal: opts.automaticGoal,
  };
}

/**
 * Full learner progress aggregation for `/learning/progress`.
 * Course/date filters scope overview & dailySeries; weekly goal, recap, and personal bests are account-wide.
 */
export async function getLearningProgress(
  userId: string,
  query: LearningProgressQuery,
  now = new Date(),
): Promise<LearningProgressResponse> {
  const todayIso = utcDateKey(now);
  const startIso = addUtcDays(todayIso, -(query.days - 1));
  const windowStart = utcDayStart(startIso);
  const weekWin = previousWeekElapsedWindow(now);
  const currentWeekBounds = isoWeekBounds(now);

  const [
    characterRow,
    allCourses,
    courseProgressRows,
    lessonTotalRows,
    ulpCompletedCountRows,
    windowCompletionsByDayRows,
    weeklyCompletionsRow,
    attemptRows,
    heatmap,
  ] = await Promise.all([
    db.query.characters.findFirst({ where: eq(characters.userId, userId) }),
    db
      .select({
        id: courses.id,
        slug: courses.slug,
        titleUk: courses.titleUk,
        titleEn: courses.titleEn,
        icon: courses.icon,
        color: courses.color,
        status: courses.status,
        isVisible: courses.isVisible,
        sortOrder: courses.sortOrder,
      })
      .from(courses)
      .orderBy(asc(courses.sortOrder)),
    db
      .select({
        courseId: userCourseProgress.courseId,
        xp: userCourseProgress.xp,
        level: userCourseProgress.level,
        completedLessons: userCourseProgress.completedLessons,
      })
      .from(userCourseProgress)
      .where(eq(userCourseProgress.userId, userId)),
    db
      .select({
        courseId: lessons.courseId,
        total: sql<number>`count(*)::int`,
      })
      .from(lessons)
      .groupBy(lessons.courseId),
    db
      .select({
        courseId: userLessonProgress.courseId,
        completed: sql<number>`count(*)::int`,
      })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, userId),
          eq(userLessonProgress.status, "completed"),
        ),
      )
      .groupBy(userLessonProgress.courseId),
    db
      .select({
        day: sql<string>`to_char(${userLessonProgress.completedAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`,
        count: sql<number>`count(*)::int`,
      })
      .from(userLessonProgress)
      .innerJoin(courses, eq(courses.id, userLessonProgress.courseId))
      .where(
        and(
          eq(userLessonProgress.userId, userId),
          eq(userLessonProgress.status, "completed"),
          isNotNull(userLessonProgress.completedAt),
          gte(userLessonProgress.completedAt, windowStart),
          ...(query.course ? [eq(courses.slug, query.course)] : []),
        ),
      )
      .groupBy(sql`to_char(${userLessonProgress.completedAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`),
    db
      .select({
        current: sql<number>`count(*) filter (where ${userLessonProgress.completedAt} >= ${weekWin.current.startsAt.toISOString()}::timestamptz and ${userLessonProgress.completedAt} <= ${weekWin.current.endsAt.toISOString()}::timestamptz)::int`,
        previous: sql<number>`count(*) filter (where ${userLessonProgress.completedAt} >= ${weekWin.previous.startsAt.toISOString()}::timestamptz and ${userLessonProgress.completedAt} <= ${weekWin.previous.endsAt.toISOString()}::timestamptz)::int`,
      })
      .from(userLessonProgress)
      .where(
        and(
          eq(userLessonProgress.userId, userId),
          eq(userLessonProgress.status, "completed"),
          isNotNull(userLessonProgress.completedAt),
          gte(userLessonProgress.completedAt, weekWin.previous.startsAt),
        ),
      ),
    db
      .select({
        id: skillAttempts.id,
        courseSlug: skillAttempts.courseSlug,
        xpGained: skillAttempts.xpGained,
        createdAt: skillAttempts.createdAt,
        lessonId: sql<string | null>`${skillAttempts.metrics}->>'lessonId'`,
        outcome: sql<string | null>`${skillAttempts.metrics}->>'outcome'`,
        accuracyRaw: sql<string | null>`${skillAttempts.metrics}->>'accuracy'`,
        isExamRaw: sql<string | null>`${skillAttempts.metrics}->>'isExam'`,
        passThresholdRaw: sql<string | null>`${skillAttempts.metrics}->>'passThreshold'`,
      })
      .from(skillAttempts)
      .where(eq(skillAttempts.userId, userId))
      .orderBy(desc(skillAttempts.createdAt), desc(skillAttempts.id)) as Promise<
      AttemptProjectionRow[]
    >,
    getStudyCalendar(userId, { days: 84, now }),
  ]);

  const lessonMap = await loadLessonLookup(
    attemptRows.map((a) => a.lessonId).filter((x): x is string => Boolean(x)),
  );

  const classified: ClassifiedAttemptSummary[] = [];
  let attemptsTotal = 0;
  let successfulAttempts = 0;
  let failedAttempts = 0;
  let unknownAttempts = 0;
  let reconstructedAttempts = 0;
  let scoreSum = 0;
  let scoredAttempts = 0;
  let courseXp = 0;
  const windowStudyDays = new Set<string>();

  type DayBucket = {
    attempts: number;
    successfulAttempts: number;
    failedAttempts: number;
    unknownAttempts: number;
    courseXp: number;
    scoreSum: number;
    scoredAttempts: number;
  };
  const dayBuckets = new Map<string, DayBucket>();
  const windowBySlug = new Map<
    string,
    { attempts: number; successful: number; xp: number }
  >();

  let currentWeekSuccesses = 0;
  const weekStartMs = currentWeekBounds.startsAt.getTime();
  const weekEndMs = currentWeekBounds.endsAt.getTime();
  const windowStartMs = windowStart.getTime();

  for (const row of attemptRows) {
    const lesson = isUuid(row.lessonId) ? lessonMap.get(row.lessonId) ?? null : null;
    const c = classifyAttemptOutcome({
      metrics: {
        outcome: row.outcome,
        accuracy: row.accuracyRaw,
        isExam: row.isExamRaw,
        passThreshold: row.passThresholdRaw,
        lessonId: row.lessonId,
      },
      lesson,
    });

    classified.push({
      createdAt: row.createdAt,
      outcome: c.outcome,
      score: c.score,
      xpGained: row.xpGained,
      courseSlug: row.courseSlug,
    });

    const tMs = row.createdAt.getTime();
    if (c.outcome === "passed" && tMs >= weekStartMs && tMs <= weekEndMs) {
      currentWeekSuccesses += 1;
    }

    if (tMs >= windowStartMs) {
      const slugStat = windowBySlug.get(row.courseSlug) ?? {
        attempts: 0,
        successful: 0,
        xp: 0,
      };
      slugStat.attempts += 1;
      if (c.outcome === "passed") slugStat.successful += 1;
      slugStat.xp += row.xpGained;
      windowBySlug.set(row.courseSlug, slugStat);
    }

    if (tMs >= windowStartMs && (!query.course || row.courseSlug === query.course)) {
      attemptsTotal += 1;
      if (c.outcome === "passed") successfulAttempts += 1;
      else if (c.outcome === "failed") failedAttempts += 1;
      else unknownAttempts += 1;
      if (c.reconstructed) reconstructedAttempts += 1;
      if (c.score !== null) {
        scoreSum += c.score;
        scoredAttempts += 1;
      }
      courseXp += row.xpGained;

      const dayKey = utcDateKey(row.createdAt);
      windowStudyDays.add(dayKey);
      const bucket = dayBuckets.get(dayKey) ?? {
        attempts: 0,
        successfulAttempts: 0,
        failedAttempts: 0,
        unknownAttempts: 0,
        courseXp: 0,
        scoreSum: 0,
        scoredAttempts: 0,
      };
      bucket.attempts += 1;
      if (c.outcome === "passed") bucket.successfulAttempts += 1;
      else if (c.outcome === "failed") bucket.failedAttempts += 1;
      else bucket.unknownAttempts += 1;
      bucket.courseXp += row.xpGained;
      if (c.score !== null) {
        bucket.scoreSum += c.score;
        bucket.scoredAttempts += 1;
      }
      dayBuckets.set(dayKey, bucket);
    }
  }

  const completionsMap = new Map(
    windowCompletionsByDayRows.map((r) => [r.day, r.count]),
  );
  let newCompletions = 0;
  for (const r of windowCompletionsByDayRows) {
    newCompletions += r.count;
  }

  const dailySeries: LearningDailyPoint[] = [];
  for (let i = 0; i < query.days; i++) {
    const date = addUtcDays(startIso, i);
    const b = dayBuckets.get(date);
    const attempts = b?.attempts ?? 0;
    dailySeries.push({
      date,
      attempts,
      successfulAttempts: b?.successfulAttempts ?? 0,
      failedAttempts: b?.failedAttempts ?? 0,
      unknownAttempts: b?.unknownAttempts ?? 0,
      courseXp: b?.courseXp ?? 0,
      averageScore:
        b && b.scoredAttempts > 0 ? b.scoreSum / b.scoredAttempts : null,
      scoredAttempts: b?.scoredAttempts ?? 0,
      newCompletions: completionsMap.get(date) ?? 0,
      heatmapLevel: heatmapIntensity(attempts),
    });
  }

  const courseById = new Map(allCourses.map((c) => [c.id, c]));
  const courseBySlug = new Map(allCourses.map((c) => [c.slug, c]));
  const totalsByCourseId = new Map(
    lessonTotalRows.map((r) => [r.courseId, r.total]),
  );
  const ulpCompletedByCourseId = new Map(
    ulpCompletedCountRows.map((r) => [r.courseId, r.completed]),
  );
  const cpByCourseId = new Map(
    courseProgressRows.map((r) => [r.courseId, r]),
  );

  const touchedSlugs = new Set<string>();
  for (const cp of courseProgressRows) {
    const c = courseById.get(cp.courseId);
    if (c) touchedSlugs.add(c.slug);
  }
  for (const row of attemptRows) {
    touchedSlugs.add(row.courseSlug);
  }

  const courseBreakdown: LearningCourseProgressItem[] = [];
  for (const slug of touchedSlugs) {
    const c = courseBySlug.get(slug);
    const meta = (COURSE_META as Record<string, { titleUk?: string; titleEn?: string; icon?: string; color?: string }>)[slug];
    const cp = c ? cpByCourseId.get(c.id) : undefined;
    const xp = cp?.xp ?? 0;
    const level = cp?.level ?? levelFromXp(xp);
    const xpProg = xpProgressInLevel(xp);
    const totalLessons = c ? totalsByCourseId.get(c.id) ?? 0 : 0;
    const completedLessons = c
      ? Math.max(cp?.completedLessons ?? 0, ulpCompletedByCourseId.get(c.id) ?? 0)
      : 0;
    const winStats = windowBySlug.get(slug) ?? { attempts: 0, successful: 0, xp: 0 };

    courseBreakdown.push({
      courseId: c?.id ?? null,
      courseSlug: slug,
      titleUk: c?.titleUk ?? meta?.titleUk ?? slug,
      titleEn: c?.titleEn || meta?.titleEn || c?.titleUk || slug,
      icon: c?.icon ?? meta?.icon ?? "📚",
      color: c?.color ?? meta?.color ?? "#58CC02",
      xp,
      level,
      xpInLevel: xpProg.current,
      xpNeededForNext: xpProg.needed,
      xpRemainingToNext: Math.max(0, xpProg.needed - xpProg.current),
      levelProgressRatio: xpProg.ratio,
      completedLessons,
      totalLessons,
      completionRatio:
        totalLessons > 0 ? Math.min(1, completedLessons / totalLessons) : 0,
      attemptsInWindow: winStats.attempts,
      successfulInWindow: winStats.successful,
      courseXpInWindow: winStats.xp,
    });
  }
  courseBreakdown.sort(
    (a, b) =>
      b.xp - a.xp ||
      b.completedLessons - a.completedLessons ||
      b.attemptsInWindow - a.attemptsInWindow ||
      a.courseSlug.localeCompare(b.courseSlug),
  );

  const availableCourseMap = new Map<string, LearningCourseOption>();
  for (const c of allCourses) {
    if (c.status === "published" && c.isVisible) {
      availableCourseMap.set(c.slug, {
        slug: c.slug,
        titleUk: c.titleUk,
        titleEn: c.titleEn || c.titleUk,
        icon: c.icon,
        color: c.color,
      });
    }
  }
  for (const item of courseBreakdown) {
    if (!availableCourseMap.has(item.courseSlug)) {
      availableCourseMap.set(item.courseSlug, {
        slug: item.courseSlug,
        titleUk: item.titleUk,
        titleEn: item.titleEn,
        icon: item.icon,
        color: item.color,
      });
    }
  }

  const chXp = characterRow?.globalXp ?? 0;
  const chXpProg = xpProgressInLevel(chXp);
  const chProg = normalizeProgression(characterRow?.progression);
  const chDailyXp =
    characterRow && characterRow.dailyXpDate === todayIso
      ? characterRow.dailyXp ?? 0
      : 0;

  const weeklyRecap = computeWeeklyRecap({
    attempts: classified,
    newCompletionsCurrent: weeklyCompletionsRow[0]?.current ?? 0,
    newCompletionsPrevious: weeklyCompletionsRow[0]?.previous ?? 0,
    now,
  });

  const personalBests = computePersonalBests(classified);

  const weeklyTarget = characterRow?.weeklyTarget ?? null;
  const automaticGoal =
    weeklyTarget == null
      ? await pickAutomaticGoalRecommendation(userId).catch(() => null)
      : null;

  return {
    timezone: "UTC",
    weekBasis: "monday_sunday_utc",
    filters: {
      days: query.days,
      course: query.course,
      windowStart: windowStart.toISOString(),
      windowEnd: now.toISOString(),
    },
    availableCourses: [...availableCourseMap.values()],
    overview: {
      attemptsTotal,
      successfulAttempts,
      failedAttempts,
      unknownAttempts,
      reconstructedAttempts,
      newCompletions,
      averageScore: scoredAttempts > 0 ? scoreSum / scoredAttempts : null,
      scoredAttempts,
      studyDays: windowStudyDays.size,
      courseXp,
    },
    dailySeries,
    heatmap,
    courseBreakdown,
    character: {
      globalXp: chXp,
      globalLevel: characterRow?.globalLevel ?? levelFromXp(chXp),
      xpInLevel: chXpProg.current,
      xpNeededForNext: chXpProg.needed,
      xpRemainingToNext: Math.max(0, chXpProg.needed - chXpProg.current),
      levelProgressRatio: chXpProg.ratio,
      skillPoints: chProg.skillPoints ?? 0,
      streakDays: characterRow?.streakDays ?? 0,
      dailyXp: chDailyXp,
      dailyGoalXp: characterRow?.dailyGoalXp ?? 50,
      dailyXpCap: DAILY_XP_CAP,
      buildHref: "/profile#build",
    },
    weeklyRecap,
    personalBests,
    goal: buildGoalPayload({
      weeklyTarget,
      currentWeekSuccesses,
      weekKey: currentWeekBounds.weekKey,
      weekStart: currentWeekBounds.startsAt,
      weekEnd: currentWeekBounds.endsAt,
      automaticGoal,
    }),
  };
}

/**
 * Paginated attempt history for `/learning/history` (newest first, batched joins).
 */
export async function getLearningHistory(
  userId: string,
  query: LearningHistoryQuery,
  now = new Date(),
): Promise<
  | { ok: true; data: LearningHistoryResponse }
  | { ok: false; error: "invalid_cursor" }
> {
  let cursorDecoded: { createdAt: Date; id: string } | null = null;
  if (query.cursor) {
    cursorDecoded = decodeHistoryCursor(query.cursor);
    if (!cursorDecoded) {
      return { ok: false, error: "invalid_cursor" };
    }
  }

  const conditions = [eq(skillAttempts.userId, userId)];
  if (query.course) {
    conditions.push(eq(skillAttempts.courseSlug, query.course));
  }
  if (query.days !== "all") {
    const startIso = addUtcDays(utcDateKey(now), -(query.days - 1));
    conditions.push(gte(skillAttempts.createdAt, utcDayStart(startIso)));
  }
  if (cursorDecoded) {
    conditions.push(
      or(
        lt(skillAttempts.createdAt, cursorDecoded.createdAt),
        and(
          eq(skillAttempts.createdAt, cursorDecoded.createdAt),
          lt(skillAttempts.id, cursorDecoded.id),
        ),
      )!,
    );
  }

  const rows = await db
    .select({
      id: skillAttempts.id,
      courseSlug: skillAttempts.courseSlug,
      xpGained: skillAttempts.xpGained,
      createdAt: skillAttempts.createdAt,
      lessonId: sql<string | null>`${skillAttempts.metrics}->>'lessonId'`,
      outcome: sql<string | null>`${skillAttempts.metrics}->>'outcome'`,
      accuracyRaw: sql<string | null>`${skillAttempts.metrics}->>'accuracy'`,
      isExamRaw: sql<string | null>`${skillAttempts.metrics}->>'isExam'`,
      passThresholdRaw: sql<string | null>`${skillAttempts.metrics}->>'passThreshold'`,
      firstClearRaw: sql<string | null>`${skillAttempts.metrics}->>'firstClear'`,
      characterXpRaw: sql<string | null>`${skillAttempts.metrics}->>'characterXpGained'`,
      courseLevelBeforeRaw: sql<string | null>`${skillAttempts.metrics}->>'courseLevelBefore'`,
      courseLevelAfterRaw: sql<string | null>`${skillAttempts.metrics}->>'courseLevelAfter'`,
      characterLevelBeforeRaw: sql<string | null>`${skillAttempts.metrics}->>'characterLevelBefore'`,
      characterLevelAfterRaw: sql<string | null>`${skillAttempts.metrics}->>'characterLevelAfter'`,
      levelChangeTriggerRaw: sql<string | null>`${skillAttempts.metrics}->>'levelChangeTrigger'`,
      grantedRewardsRaw: sql<unknown>`${skillAttempts.metrics}->'grantedRewards'`,
    })
    .from(skillAttempts)
    .where(and(...conditions))
    .orderBy(desc(skillAttempts.createdAt), desc(skillAttempts.id))
    .limit(query.limit + 1);

  const hasMore = rows.length > query.limit;
  const pageRows = rows.slice(0, query.limit);

  const slugs = [...new Set(pageRows.map((r) => r.courseSlug))];
  const lessonIds = pageRows
    .map((r) => r.lessonId)
    .filter((x): x is string => isUuid(x));

  const [courseRows, lessonMap] = await Promise.all([
    slugs.length
      ? db
          .select({
            slug: courses.slug,
            titleUk: courses.titleUk,
            titleEn: courses.titleEn,
            icon: courses.icon,
            color: courses.color,
          })
          .from(courses)
          .where(inArray(courses.slug, slugs))
      : Promise.resolve([]),
    loadLessonLookup(lessonIds),
  ]);
  const courseMap = new Map(courseRows.map((c) => [c.slug, c]));

  const items: LearningHistoryItem[] = pageRows.map((r) => {
    const course = courseMap.get(r.courseSlug);
    const meta = (
      COURSE_META as Record<
        string,
        { titleUk?: string; titleEn?: string; icon?: string; color?: string }
      >
    )[r.courseSlug];
    const lesson = isUuid(r.lessonId) ? lessonMap.get(r.lessonId) ?? null : null;
    const c = classifyAttemptOutcome({
      metrics: {
        outcome: r.outcome,
        accuracy: r.accuracyRaw,
        isExam: r.isExamRaw,
        passThreshold: r.passThresholdRaw,
        lessonId: r.lessonId,
      },
      lesson,
    });

    const trigger: LevelChangeTrigger =
      r.levelChangeTriggerRaw === "lesson" ? "lesson" : null;

    return {
      id: r.id,
      createdAt: r.createdAt.toISOString(),
      courseSlug: r.courseSlug,
      courseTitleUk: course?.titleUk ?? meta?.titleUk ?? r.courseSlug,
      courseTitleEn:
        course?.titleEn || meta?.titleEn || course?.titleUk || r.courseSlug,
      courseIcon: course?.icon ?? meta?.icon ?? null,
      courseColor: course?.color ?? meta?.color ?? null,
      lessonId: r.lessonId ?? null,
      lessonTitleUk: lesson?.titleUk ?? null,
      lessonTitleEn: lesson ? lesson.titleEn || lesson.titleUk : null,
      lessonHref: lesson ? `/courses/${r.courseSlug}/lessons/${lesson.id}` : null,
      score: c.score,
      outcome: c.outcome,
      reconstructed: c.reconstructed,
      isExam: c.isExam,
      passThreshold: c.passThreshold,
      firstClear: parseOptionalBoolean(r.firstClearRaw),
      courseXpGained: r.xpGained,
      characterXpGained: parseFiniteNumber(r.characterXpRaw),
      courseLevelBefore: parseFiniteNumber(r.courseLevelBeforeRaw),
      courseLevelAfter: parseFiniteNumber(r.courseLevelAfterRaw),
      characterLevelBefore: parseFiniteNumber(r.characterLevelBeforeRaw),
      characterLevelAfter: parseFiniteNumber(r.characterLevelAfterRaw),
      levelChangeTrigger: trigger,
      grantedRewards: parseGrantedRewards(r.grantedRewardsRaw),
    };
  });

  const last = pageRows[pageRows.length - 1];
  const nextCursor =
    hasMore && last ? encodeHistoryCursor(last.createdAt, last.id) : null;

  return {
    ok: true,
    data: {
      timezone: "UTC",
      filters: {
        days: query.days,
        course: query.course,
        limit: query.limit,
      },
      items,
      nextCursor,
      hasMore,
    },
  };
}

/**
 * Compute current week's goal state (Monday–Sunday UTC, account-wide).
 */
export async function getWeeklyGoalState(
  userId: string,
  weeklyTarget: number | null,
  now = new Date(),
): Promise<LearningGoalState> {
  const bounds = isoWeekBounds(now);
  const weekRows = await db
    .select({
      lessonId: sql<string | null>`${skillAttempts.metrics}->>'lessonId'`,
      outcome: sql<string | null>`${skillAttempts.metrics}->>'outcome'`,
      accuracyRaw: sql<string | null>`${skillAttempts.metrics}->>'accuracy'`,
      isExamRaw: sql<string | null>`${skillAttempts.metrics}->>'isExam'`,
      passThresholdRaw: sql<string | null>`${skillAttempts.metrics}->>'passThreshold'`,
    })
    .from(skillAttempts)
    .where(
      and(
        eq(skillAttempts.userId, userId),
        gte(skillAttempts.createdAt, bounds.startsAt),
      ),
    );

  const lessonMap = await loadLessonLookup(
    weekRows.map((r) => r.lessonId).filter((x): x is string => Boolean(x)),
  );

  let currentWeekSuccesses = 0;
  for (const r of weekRows) {
    const lesson = isUuid(r.lessonId) ? lessonMap.get(r.lessonId) ?? null : null;
    const c = classifyAttemptOutcome({
      metrics: {
        outcome: r.outcome,
        accuracy: r.accuracyRaw,
        isExam: r.isExamRaw,
        passThreshold: r.passThresholdRaw,
        lessonId: r.lessonId,
      },
      lesson,
    });
    if (c.outcome === "passed") currentWeekSuccesses += 1;
  }

  const automaticGoal =
    weeklyTarget == null
      ? await pickAutomaticGoalRecommendation(userId).catch(() => null)
      : null;

  return buildGoalPayload({
    weeklyTarget,
    currentWeekSuccesses,
    weekKey: bounds.weekKey,
    weekStart: bounds.startsAt,
    weekEnd: bounds.endsAt,
    automaticGoal,
  });
}

/**
 * Update or clear a learner's recurring weekly target (`1..1000` or `null`).
 */
export async function updateLearningGoal(
  userId: string,
  weeklyTarget: number | null,
  now = new Date(),
): Promise<UpdateLearningGoalResponse | null> {
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, userId),
  });
  if (!ch) return null;

  const [updated] = await db
    .update(characters)
    .set({ weeklyTarget })
    .where(eq(characters.id, ch.id))
    .returning();

  const goal = await getWeeklyGoalState(userId, updated.weeklyTarget ?? null, now);
  return {
    ok: true,
    weeklyTarget: updated.weeklyTarget ?? null,
    goal,
  };
}
