export const GUEST_PROGRESS_KEY = "ef_guest_progress_v1";

export function getGuestProgress(courseSlug: string): string[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(GUEST_PROGRESS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && Array.isArray(parsed[courseSlug])) {
      return parsed[courseSlug];
    }
  } catch {
    /* ignore */
  }
  return [];
}

export function recordGuestLessonProgress(
  courseSlug: string,
  lessonId: string,
): string[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(GUEST_PROGRESS_KEY);
    const parsed: Record<string, string[]> = raw ? JSON.parse(raw) : {};
    const set = new Set(Array.isArray(parsed[courseSlug]) ? parsed[courseSlug] : []);
    set.add(lessonId);
    const list = Array.from(set);
    parsed[courseSlug] = list;
    localStorage.setItem(GUEST_PROGRESS_KEY, JSON.stringify(parsed));
    return list;
  } catch {
    return [lessonId];
  }
}

export type LessonLike = {
  id: string;
  status: string;
  locked: boolean;
  isExam?: boolean;
  examLocked?: boolean;
  [k: string]: unknown;
};

export type UnitLike<TLesson extends LessonLike = LessonLike> = {
  id: string;
  lessons: TLesson[];
  [k: string]: unknown;
};

/**
 * Overlay local guest completions onto unit lessons:
 * - Mark completed lessons with status = "completed"
 * - Unlock non-exam lessons (locked = false)
 * - Exam is unlocked (examLocked = false, locked = false) if already completed OR
 *   all non-exam lessons in the unit are completed.
 */
export function overlayGuestProgress<
  TLesson extends LessonLike,
  TUnit extends UnitLike<TLesson>,
>(
  units: TUnit[],
  completedLessonIds: string[],
): { units: TUnit[]; completedCount: number } {
  const completedSet = new Set(completedLessonIds);
  let totalCompleted = 0;

  const updatedUnits = units.map((unit) => {
    const nonExam = unit.lessons.filter((l) => !l.isExam);
    const nonExamDone =
      nonExam.length === 0 ||
      nonExam.every((l) => l.status === "completed" || completedSet.has(l.id));

    const updatedLessons = unit.lessons.map((lesson) => {
      const isCompleted =
        lesson.status === "completed" || completedSet.has(lesson.id);
      if (isCompleted) totalCompleted++;

      if (lesson.isExam) {
        const examLocked = !nonExamDone && !isCompleted;
        return {
          ...lesson,
          status: isCompleted ? "completed" : lesson.status,
          examLocked,
          locked: examLocked,
        };
      }

      return {
        ...lesson,
        status: isCompleted ? "completed" : lesson.status,
        locked: false,
      };
    });

    return {
      ...unit,
      lessons: updatedLessons as TLesson[],
    };
  });

  return { units: updatedUnits as TUnit[], completedCount: totalCompleted };
}
