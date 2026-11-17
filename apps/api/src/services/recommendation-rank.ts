export type FocusCourseRow = {
  slug: string;
  courseId: string;
  lastLessonId: string | null;
  completedLessons: number;
};

export type FocusLessonTouch = {
  courseId: string;
  completedAt: Date | string | null;
};

const LATER_KINDS = new Set([
  "placement",
  "placement_programming",
  "programming_hub",
  "programming_mini_race",
  "programming_minis_race",
  "programming_mini",
  "programming_minis_done",
  "programming_minis_board",
  "explore_course",
  "deep_track",
  "playground",
  "flashcards",
  "quests",
  "tutor",
  "gifts",
  "character_build",
  "start_course",
]);

function touchTime(value: Date | string | null): number {
  if (!value) return 0;
  const time = value instanceof Date ? value.getTime() : new Date(value).getTime();
  return Number.isFinite(time) ? time : 0;
}

/** The course the learner is in: latest passed lesson, otherwise the course they have opened. */
export function focusCourseSlug(rows: FocusCourseRow[], touches: FocusLessonTouch[]): string | null {
  const started = rows.filter((row) => row.completedLessons > 0 || row.lastLessonId);
  if (started.length === 0) return null;
  const latest = new Map<string, number>();
  for (const touch of touches) {
    const time = touchTime(touch.completedAt);
    latest.set(touch.courseId, Math.max(latest.get(touch.courseId) ?? 0, time));
  }
  const ranked = [...started].sort((a, b) => {
    const byTouch = (latest.get(b.courseId) ?? 0) - (latest.get(a.courseId) ?? 0);
    if (byTouch !== 0) return byTouch;
    return a.completedLessons - b.completedLessons;
  });
  return ranked[0]?.slug ?? null;
}

type Ranked = {
  kind: string;
  priority: number;
  meta?: Record<string, unknown>;
};

/**
 * While a course is open, its next lesson, its mistakes, and its review
 * stay ahead of placement, races, and other tracks.
 */
export function applyFocusPriority<T extends Ranked>(items: T[], focusSlug: string | null): T[] {
  if (!focusSlug) return items;
  return items.map((item) => {
    const slug = typeof item.meta?.courseSlug === "string" ? item.meta.courseSlug : "";
    const same = slug === focusSlug;
    let priority = item.priority;
    if (item.kind === "continue_course" && same) priority = 100;
    else if (item.kind === "exam_ready" && same) priority = 96;
    else if ((item.kind === "review_weak" || item.kind === "leech") && same) priority = 90;
    else if (item.kind === "spaced_review" && same) priority = 80;
    else if (item.kind === "review_queue") priority = 70;
    else if (item.kind === "continue_course") priority = 40;
    else if (item.kind === "exam_ready") priority = 36;
    else if (item.kind === "review_weak" || item.kind === "leech") priority = 30;
    else if (item.kind === "spaced_review") priority = 24;
    else if (LATER_KINDS.has(item.kind) || item.kind.startsWith("programming_")) priority = Math.min(priority, 8);
    return { ...item, priority };
  });
}
