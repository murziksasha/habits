/** Pure rule: certificate only when every course lesson id is completed (incl. exams). */
export function isFullCourseComplete(
  lessonIds: string[],
  completedLessonIds: string[],
): boolean {
  if (lessonIds.length === 0) return false;
  const done = new Set(completedLessonIds);
  return lessonIds.every((id) => done.has(id));
}
