import { lessonCountsAsCurrentMastery } from "./certificate-rules.js";

export type ContinueLesson = {
  id: string;
  unitId: string;
  sortOrder: number;
  isExam: boolean | null;
  contentVersion?: number | null;
};

export type ContinueUnit = {
  id: string;
  sortOrder: number;
};

export type ContinueProgress = {
  lessonId: string;
  status: string;
  completedContentVersion?: number | null;
};

function isCurrent(lesson: ContinueLesson, progress: ContinueProgress | undefined): boolean {
  return lessonCountsAsCurrentMastery({
    status: progress?.status ?? "",
    lessonContentVersion: lesson.contentVersion ?? 1,
    completedContentVersion: progress?.completedContentVersion ?? null,
  });
}

/**
 * Resume the lesson in progress. After a current completion, move to the next
 * unfinished lesson. A locked exam is not the continue target.
 * Returns null when every current lesson is already mastered.
 */
export function pickContinueLessonId(
  lessons: ContinueLesson[],
  units: ContinueUnit[],
  progress: ContinueProgress[],
  lastLessonId: string | null,
): string | null {
  const unitSort = new Map(units.map((unit) => [unit.id, unit.sortOrder]));
  const byLesson = new Map(progress.map((row) => [row.lessonId, row]));
  const ordered = [...lessons].sort((a, b) => {
    const unitA = unitSort.get(a.unitId) ?? 0;
    const unitB = unitSort.get(b.unitId) ?? 0;
    return unitA - unitB || a.sortOrder - b.sortOrder;
  });

  const unitReady = (unitId: string) =>
    ordered.filter((lesson) => lesson.unitId === unitId && !lesson.isExam).every((lesson) => isCurrent(lesson, byLesson.get(lesson.id)));

  const open = (lesson: ContinueLesson) => {
    if (isCurrent(lesson, byLesson.get(lesson.id))) return false;
    if (lesson.isExam && !unitReady(lesson.unitId)) return false;
    return true;
  };

  if (lastLessonId) {
    const last = ordered.find((lesson) => lesson.id === lastLessonId);
    if (last && open(last)) return last.id;
  }
  return ordered.find(open)?.id ?? null;
}
