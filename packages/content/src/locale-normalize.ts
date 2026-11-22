import { SKILL_PROMPT_EN_BY_ID } from "./skill-prompt-en.js";
import { GLOBAL_LOCALE_ENRICHMENT_BY_ID } from "./locale/index.js";
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

function withEnrichment(ex: Exercise): Exercise {
  const withPrompt = withPromptEn(ex);
  const enrich = GLOBAL_LOCALE_ENRICHMENT_BY_ID[ex.id];
  if (!enrich) return withPrompt;

  const any = withPrompt as Record<string, unknown>;
  const res: Record<string, unknown> = { ...any };

  if (enrich.optionsEn && (!res.optionsEn || !Array.isArray(res.optionsEn) || (res.optionsEn as string[]).length === 0)) {
    res.optionsEn = enrich.optionsEn;
  }
  if (enrich.pairsEn && (!res.pairsEn || !Array.isArray(res.pairsEn) || (res.pairsEn as unknown[]).length === 0)) {
    res.pairsEn = enrich.pairsEn;
  }
  if (enrich.passageEn && !res.passageEn) {
    res.passageEn = enrich.passageEn;
  }
  if (enrich.notesEn && !res.notesEn) {
    res.notesEn = enrich.notesEn;
  }
  if (enrich.quizEn && res.quiz && typeof res.quiz === "object") {
    res.quiz = {
      ...(res.quiz as Record<string, unknown>),
      qEn: enrich.quizEn.qEn ?? (res.quiz as Record<string, unknown>).qEn,
      optionsEn: enrich.quizEn.optionsEn ?? (res.quiz as Record<string, unknown>).optionsEn,
    };
  }
  if (enrich.questionsEn && Array.isArray(res.questions)) {
    res.questions = (res.questions as Record<string, unknown>[]).map((q, idx) => {
      const qEnrich = enrich.questionsEn?.[idx];
      if (!qEnrich) return q;
      return {
        ...q,
        qEn: qEnrich.qEn ?? q.qEn,
        optionsEn: qEnrich.optionsEn ?? q.optionsEn,
      };
    });
  }

  return res as Exercise;
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

/** Ensure every exercise with promptUk has promptEn and full bilingual options/pairs parity. */
export function normalizeCourseLocales(course: CourseContent): CourseContent {
  return {
    ...course,
    units: course.units.map((u) => ({
      ...u,
      lessons: u.lessons.map((l) => ({
        ...l,
        exercises: l.exercises.map(withEnrichment),
      })),
    })),
  };
}
