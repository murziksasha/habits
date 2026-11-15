import { SKILL_PROMPT_EN_BY_ID } from "./skill-prompt-en.js";
import type { CourseContent, Exercise } from "./types.js";

function withPromptEn(ex: Exercise): Exercise {
  const any = ex as Exercise & { promptUk?: string; promptEn?: string };
  if (!any.promptUk?.trim()) return ex;
  if (any.promptEn?.trim()) return ex;
  const mapped = SKILL_PROMPT_EN_BY_ID[any.id];
  if (mapped?.trim()) {
    return { ...any, promptEn: mapped } as Exercise;
  }
  // Safe fallback for future exercises until map is regenerated
  return { ...any, promptEn: any.promptUk } as Exercise;
}

/** Align with @eduforge/shared FREE_LESSONS_PER_COURSE (path order, skip exams). */
export const FREEMIUM_FREE_LESSON_COUNT = 5;

/**
 * Mark the first N non-exam lessons in course path order as free.
 * Does not unmark existing free exams or extra free lessons.
 */
export function ensureFreemiumFreeLessons(
  course: CourseContent,
  freeCount = FREEMIUM_FREE_LESSON_COUNT,
): CourseContent {
  let remaining = freeCount;
  return {
    ...course,
    units: course.units.map((u) => ({
      ...u,
      lessons: u.lessons.map((l) => {
        if (l.isExam) return l;
        if (l.isFree) {
          remaining = Math.max(0, remaining - 1);
          return l;
        }
        if (remaining > 0) {
          remaining -= 1;
          return { ...l, isFree: true };
        }
        return l;
      }),
    })),
  };
}

/** Ensure every exercise with promptUk has promptEn (skill tracks + future seeds). */
export function normalizeCourseLocales(course: CourseContent): CourseContent {
  const withEn = {
    ...course,
    units: course.units.map((u) => ({
      ...u,
      lessons: u.lessons.map((l) => ({
        ...l,
        exercises: l.exercises.map(withPromptEn),
      })),
    })),
  };
  return ensureFreemiumFreeLessons(withEn);
}
