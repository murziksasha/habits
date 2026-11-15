/** Shared types and pure aggregation/reconstruction helpers for learning progress & history. */

import { lessonCompleteThreshold } from "./exam.js";
import { addUtcDays, isoWeekBounds, previousWeekElapsedWindow, utcDateKey } from "./week.js";

export const PROGRESS_WINDOW_DAYS = [7, 30, 90] as const;
export type ProgressWindowDays = (typeof PROGRESS_WINDOW_DAYS)[number];
export type HistoryWindowFilter = ProgressWindowDays | "all";

export const WEEKLY_TARGET_MIN = 1;
export const WEEKLY_TARGET_MAX = 1000;
export const WEEKLY_TARGET_PRESETS = [5, 10, 20] as const;

export const HISTORY_LIMIT_DEFAULT = 20;
export const HISTORY_LIMIT_MAX = 50;

export type AttemptOutcome = "passed" | "failed" | "unknown";
export type LevelChangeTrigger = "lesson" | null;

export type GrantedRewardKind =
  | "skill_points"
  | "title"
  | "frame"
  | "avatar"
  | "freeze"
  | "bonus_xp"
  | "achievement"
  | "certificate"
  | "path_badge";

export type GrantedRewardItem = {
  kind: GrantedRewardKind;
  key?: string;
  amount?: number;
  labelUk: string;
  labelEn: string;
  icon: string;
  source: "level_up" | "loot" | "lesson";
};

export type LessonSubmitProgressionFields = {
  outcome: "passed" | "failed";
  courseLevelBefore: number;
  courseLevelAfter: number;
  courseLevelUp: boolean;
  characterXpGain: number;
  characterLevelBefore: number | null;
  characterLevelAfter: number | null;
  characterLevelUp: boolean;
  levelChangeTrigger: LevelChangeTrigger;
  grantedRewards: GrantedRewardItem[];
  dailyCapReached: boolean;
};

export type LearningCalendarDay = {
  date: string;
  count: number;
  level: number;
};

export type LearningCalendarResponse = {
  days: number;
  timezone: "UTC";
  series: LearningCalendarDay[];
  activeDays: number;
  maxStreakInWindow: number;
};

export type LearningCourseOption = {
  slug: string;
  titleUk: string;
  titleEn: string;
  icon: string;
  color: string;
};

export type LearningOverview = {
  attemptsTotal: number;
  successfulAttempts: number;
  failedAttempts: number;
  unknownAttempts: number;
  reconstructedAttempts: number;
  newCompletions: number;
  averageScore: number | null;
  scoredAttempts: number;
  studyDays: number;
  courseXp: number;
};

export type LearningDailyPoint = {
  date: string;
  attempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  unknownAttempts: number;
  courseXp: number;
  averageScore: number | null;
  scoredAttempts: number;
  newCompletions: number;
  heatmapLevel: 0 | 1 | 2 | 3 | 4;
};

export type LearningCourseProgressItem = {
  courseId: string | null;
  courseSlug: string;
  titleUk: string;
  titleEn: string;
  icon: string;
  color: string;
  xp: number;
  level: number;
  xpInLevel: number;
  xpNeededForNext: number;
  xpRemainingToNext: number;
  levelProgressRatio: number;
  completedLessons: number;
  totalLessons: number;
  completionRatio: number;
  attemptsInWindow: number;
  successfulInWindow: number;
  courseXpInWindow: number;
};

export type LearningCharacterSummary = {
  globalXp: number;
  globalLevel: number;
  xpInLevel: number;
  xpNeededForNext: number;
  xpRemainingToNext: number;
  levelProgressRatio: number;
  skillPoints: number;
  streakDays: number;
  dailyXp: number;
  dailyGoalXp: number;
  dailyXpCap: number;
  buildHref: string;
};

export type LearningWeeklyRecapPeriod = {
  weekKey: string;
  startsAt: string;
  endsAt: string;
  fullWeekEnd: string;
  successfulAttempts: number;
  newCompletions: number;
  studyDays: number;
  averageScore: number | null;
  scoredAttempts: number;
  attemptsTotal: number;
};

export type LearningWeeklyRecap = {
  weekBasis: "monday_sunday_utc";
  elapsedMs: number;
  current: LearningWeeklyRecapPeriod;
  previous: LearningWeeklyRecapPeriod;
  deltas: {
    successfulAttempts: number;
    newCompletions: number;
    studyDays: number;
    averageScore: number | null;
  };
};

export type LearningPersonalBests = {
  bestDaySuccesses: {
    count: number;
    date: string | null;
  };
  bestWeekSuccesses: {
    count: number;
    weekKey: string | null;
    weekStart: string | null;
    weekEnd: string | null;
  };
  longestStudyRunDays: {
    days: number;
    startDate: string | null;
    endDate: string | null;
  };
};

export type LearningAutomaticGoal = {
  kind: string;
  titleUk: string;
  titleEn: string;
  href: string;
  courseSlug?: string;
};

export type LearningGoalState = {
  mode: "custom" | "automatic";
  weeklyTarget: number | null;
  currentWeekSuccesses: number;
  remaining: number | null;
  completed: boolean;
  progressRatio: number | null;
  weekKey: string;
  weekStart: string;
  weekEnd: string;
  presets: readonly number[];
  automaticGoal: LearningAutomaticGoal | null;
};

export type LearningProgressResponse = {
  timezone: "UTC";
  weekBasis: "monday_sunday_utc";
  filters: {
    days: ProgressWindowDays;
    course: string | null;
    windowStart: string;
    windowEnd: string;
  };
  availableCourses: LearningCourseOption[];
  overview: LearningOverview;
  dailySeries: LearningDailyPoint[];
  heatmap: LearningCalendarResponse;
  courseBreakdown: LearningCourseProgressItem[];
  character: LearningCharacterSummary;
  weeklyRecap: LearningWeeklyRecap;
  personalBests: LearningPersonalBests;
  goal: LearningGoalState;
};

export type LearningHistoryItem = {
  id: string;
  createdAt: string;
  courseSlug: string;
  courseTitleUk: string;
  courseTitleEn: string;
  courseIcon: string | null;
  courseColor: string | null;
  lessonId: string | null;
  lessonTitleUk: string | null;
  lessonTitleEn: string | null;
  lessonHref: string | null;
  score: number | null;
  outcome: AttemptOutcome;
  reconstructed: boolean;
  isExam: boolean | null;
  passThreshold: number | null;
  firstClear: boolean | null;
  courseXpGained: number;
  characterXpGained: number | null;
  courseLevelBefore: number | null;
  courseLevelAfter: number | null;
  characterLevelBefore: number | null;
  characterLevelAfter: number | null;
  levelChangeTrigger: LevelChangeTrigger;
  grantedRewards: GrantedRewardItem[];
};

export type LearningHistoryResponse = {
  timezone: "UTC";
  filters: {
    days: HistoryWindowFilter;
    course: string | null;
    limit: number;
  };
  items: LearningHistoryItem[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type UpdateLearningGoalResponse = {
  ok: true;
  weeklyTarget: number | null;
  goal: LearningGoalState;
};

export function parseFiniteNumber(raw: unknown): number | null {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
  if (typeof raw === "string" && raw.trim() !== "") {
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export function parseOptionalBoolean(raw: unknown): boolean | null {
  if (typeof raw === "boolean") return raw;
  if (raw === "true") return true;
  if (raw === "false") return false;
  return null;
}

export type LessonThresholdLookup = {
  isExam?: boolean | null;
  passThreshold?: number | null;
};

export type AttemptMetricsInput = {
  outcome?: unknown;
  accuracy?: unknown;
  isExam?: unknown;
  passThreshold?: unknown;
  lessonId?: unknown;
};

export type ClassifiedAttemptOutcome = {
  outcome: AttemptOutcome;
  reconstructed: boolean;
  score: number | null;
  isExam: boolean | null;
  passThreshold: number | null;
};

/**
 * Determine attempt outcome from recorded metadata or reconstruct older attempts
 * from recorded score + current lesson threshold.
 * Missing lesson metadata on older attempts yields "unknown" and is excluded from success counts.
 */
export function classifyAttemptOutcome(opts: {
  metrics: AttemptMetricsInput | null | undefined;
  lesson?: LessonThresholdLookup | null;
}): ClassifiedAttemptOutcome {
  const m = opts.metrics ?? {};
  const score = parseFiniteNumber(m.accuracy);
  const recordedIsExam = parseOptionalBoolean(m.isExam);
  const recordedThreshold = parseFiniteNumber(m.passThreshold);

  if (m.outcome === "passed" || m.outcome === "failed") {
    const isExam =
      recordedIsExam ?? (opts.lesson ? Boolean(opts.lesson.isExam) : null);
    const passThreshold =
      recordedThreshold ??
      (opts.lesson
        ? lessonCompleteThreshold({
            isExam: opts.lesson.isExam,
            passThreshold: opts.lesson.passThreshold,
          })
        : null);
    return {
      outcome: m.outcome,
      reconstructed: false,
      score,
      isExam,
      passThreshold,
    };
  }

  // Legacy attempt without recorded outcome: requires both lesson metadata and numeric score.
  if (!opts.lesson || score === null) {
    return {
      outcome: "unknown",
      reconstructed: false,
      score,
      isExam: recordedIsExam ?? (opts.lesson ? Boolean(opts.lesson.isExam) : null),
      passThreshold: recordedThreshold,
    };
  }

  const isExam = Boolean(opts.lesson.isExam);
  const passThreshold = lessonCompleteThreshold({
    isExam,
    passThreshold: opts.lesson.passThreshold,
  });
  const passed = score + 1e-9 >= passThreshold;
  return {
    outcome: passed ? "passed" : "failed",
    reconstructed: true,
    score,
    isExam,
    passThreshold,
  };
}

export function heatmapIntensity(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count < 2) return 1;
  if (count < 5) return 2;
  if (count < 10) return 3;
  return 4;
}

/** Longest consecutive run of UTC calendar dates (YYYY-MM-DD). */
export function computeLongestStudyRun(studyDateKeys: Iterable<string>): {
  days: number;
  startDate: string | null;
  endDate: string | null;
} {
  const sorted = [...new Set([...studyDateKeys].map((d) => d.slice(0, 10)).filter(Boolean))].sort();
  if (!sorted.length) {
    return { days: 0, startDate: null, endDate: null };
  }
  let bestLen = 1;
  let bestStart = sorted[0]!;
  let bestEnd = sorted[0]!;

  let curLen = 1;
  let curStart = sorted[0]!;

  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1]!;
    const cur = sorted[i]!;
    if (addUtcDays(prev, 1) === cur) {
      curLen += 1;
    } else {
      curLen = 1;
      curStart = cur;
    }
    if (curLen > bestLen || (curLen === bestLen && cur > bestEnd)) {
      bestLen = curLen;
      bestStart = curStart;
      bestEnd = cur;
    }
  }
  return { days: bestLen, startDate: bestStart, endDate: bestEnd };
}

export type ClassifiedAttemptSummary = {
  createdAt: Date;
  outcome: AttemptOutcome;
  score: number | null;
  xpGained: number;
  courseSlug: string;
};

export function computePersonalBests(
  attempts: ClassifiedAttemptSummary[],
): LearningPersonalBests {
  const dayCounts = new Map<string, number>();
  const weekCounts = new Map<string, { count: number; startsAt: Date; endsAt: Date }>();
  const studyDays = new Set<string>();

  for (const a of attempts) {
    const dayKey = utcDateKey(a.createdAt);
    studyDays.add(dayKey);

    if (a.outcome === "passed") {
      dayCounts.set(dayKey, (dayCounts.get(dayKey) ?? 0) + 1);
      const wb = isoWeekBounds(a.createdAt);
      const existing = weekCounts.get(wb.weekKey);
      if (existing) {
        existing.count += 1;
      } else {
        weekCounts.set(wb.weekKey, {
          count: 1,
          startsAt: wb.startsAt,
          endsAt: wb.endsAt,
        });
      }
    }
  }

  let bestDayCount = 0;
  let bestDayDate: string | null = null;
  for (const [date, count] of dayCounts) {
    if (count > bestDayCount || (count === bestDayCount && (!bestDayDate || date > bestDayDate))) {
      bestDayCount = count;
      bestDayDate = date;
    }
  }

  let bestWeekCount = 0;
  let bestWeekKey: string | null = null;
  let bestWeekStart: string | null = null;
  let bestWeekEnd: string | null = null;
  for (const [weekKey, info] of weekCounts) {
    if (
      info.count > bestWeekCount ||
      (info.count === bestWeekCount && (!bestWeekKey || weekKey > bestWeekKey))
    ) {
      bestWeekCount = info.count;
      bestWeekKey = weekKey;
      bestWeekStart = info.startsAt.toISOString().slice(0, 10);
      bestWeekEnd = info.endsAt.toISOString().slice(0, 10);
    }
  }

  return {
    bestDaySuccesses: {
      count: bestDayCount,
      date: bestDayDate,
    },
    bestWeekSuccesses: {
      count: bestWeekCount,
      weekKey: bestWeekKey,
      weekStart: bestWeekStart,
      weekEnd: bestWeekEnd,
    },
    longestStudyRunDays: computeLongestStudyRun(studyDays),
  };
}

export function computeWeeklyRecap(opts: {
  attempts: ClassifiedAttemptSummary[];
  newCompletionsCurrent: number;
  newCompletionsPrevious: number;
  now?: Date;
}): LearningWeeklyRecap {
  const now = opts.now ?? new Date();
  const win = previousWeekElapsedWindow(now);

  const summarize = (
    startsAt: Date,
    endsAt: Date,
    fullWeekEnd: Date,
    weekKey: string,
    newCompletions: number,
  ): LearningWeeklyRecapPeriod => {
    const startMs = startsAt.getTime();
    const endMs = endsAt.getTime();
    let successfulAttempts = 0;
    let attemptsTotal = 0;
    let scoreSum = 0;
    let scoredAttempts = 0;
    const days = new Set<string>();

    for (const a of opts.attempts) {
      const t = a.createdAt.getTime();
      if (t < startMs || t > endMs) continue;
      attemptsTotal += 1;
      days.add(utcDateKey(a.createdAt));
      if (a.outcome === "passed") successfulAttempts += 1;
      if (a.score !== null) {
        scoreSum += a.score;
        scoredAttempts += 1;
      }
    }

    return {
      weekKey,
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
      fullWeekEnd: fullWeekEnd.toISOString(),
      successfulAttempts,
      newCompletions,
      studyDays: days.size,
      averageScore: scoredAttempts > 0 ? scoreSum / scoredAttempts : null,
      scoredAttempts,
      attemptsTotal,
    };
  };

  const current = summarize(
    win.current.startsAt,
    win.current.endsAt,
    win.current.fullWeekEnd,
    win.current.weekKey,
    opts.newCompletionsCurrent,
  );
  const previous = summarize(
    win.previous.startsAt,
    win.previous.endsAt,
    win.previous.fullWeekEnd,
    win.previous.weekKey,
    opts.newCompletionsPrevious,
  );

  return {
    weekBasis: "monday_sunday_utc",
    elapsedMs: win.elapsedMs,
    current,
    previous,
    deltas: {
      successfulAttempts: current.successfulAttempts - previous.successfulAttempts,
      newCompletions: current.newCompletions - previous.newCompletions,
      studyDays: current.studyDays - previous.studyDays,
      averageScore:
        current.averageScore !== null && previous.averageScore !== null
          ? current.averageScore - previous.averageScore
          : null,
    },
  };
}
