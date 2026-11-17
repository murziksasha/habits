/** Pure rule: certificate only when every course lesson id is completed (incl. exams). */
export function isFullCourseComplete(
  lessonIds: string[],
  completedLessonIds: string[],
): boolean {
  if (lessonIds.length === 0) return false;
  const done = new Set(completedLessonIds);
  return lessonIds.every((id) => done.has(id));
}

/**
 * A completed row counts toward the current course only when it records the
 * lesson's content version. Version 1 lessons keep status==="completed".
 * A null completed version is historical version 1.
 */
export function lessonCountsAsCurrentMastery(row: {
  status: string;
  lessonContentVersion: number;
  completedContentVersion: number | null;
}): boolean {
  if (row.status !== "completed") return false;
  const required = row.lessonContentVersion > 0 ? row.lessonContentVersion : 1;
  if (required <= 1) return true;
  const done = row.completedContentVersion ?? 1;
  return done >= required;
}
