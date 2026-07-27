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
