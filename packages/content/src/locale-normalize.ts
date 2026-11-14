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

/**
 * @deprecated EduForge is 100% free for all users. Kept for backwards compatibility.
 */
export const FREEMIUM_FREE_LESSON_COUNT = 5;

/**
 * @deprecated EduForge is 100% free for all users. All lessons are accessible.
 * Preserves the course structure without mutating lessons or marking isFree.
 */
export function ensureFreemiumFreeLessons(
  course: CourseContent,
  _freeCount = FREEMIUM_FREE_LESSON_COUNT,
): CourseContent {
  return course;
}

/** Ensure every exercise with promptUk has promptEn (skill tracks + future seeds). */
export function normalizeCourseLocales(course: CourseContent): CourseContent {
  return {
    ...course,
    units: course.units.map((u) => ({
      ...u,
      lessons: u.lessons.map((l) => ({
        ...l,
        exercises: l.exercises.map(withPromptEn),
      })),
    })),
  };
}
