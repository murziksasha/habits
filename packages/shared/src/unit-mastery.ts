/**
 * Per-unit mastery map (SPEC 92): lesson states + unit summaries using the
 * forgetting-curve model from `retention.ts`.
 */
import { retentionSummary } from "./retention.js";

export type MasteryLessonInput = {
  id: string;
  slug: string;
  titleUk: string;
  titleEn?: string | null;
  isExam?: boolean;
  progress?: {
    status?: string | null;
    bestScore?: number | null;
    attempts?: number | null;
    completedAt?: Date | string | null;
  } | null;
};

export type MasteryUnitInput = {
  slug: string;
  titleUk: string;
  titleEn?: string | null;
  lessons: MasteryLessonInput[];
};

export type LessonMasteryState = "new" | "learning" | "fading" | "mastered";

export type MasteryLesson = {
  id: string;
  slug: string;
  titleUk: string;
  titleEn: string;
  isExam: boolean;
  state: LessonMasteryState;
  bestScorePct: number;
  retentionPct: number | null;
  dueInDays: number | null;
};

export type MasteryUnit = {
  slug: string;
  titleUk: string;
  titleEn: string;
  lessons: MasteryLesson[];
  completed: number;
  total: number;
  mastered: number;
  fading: number;
  /** Avg retention over completed lessons (null if none) */
  avgRetentionPct: number | null;
  state: LessonMasteryState;
};

export const MASTERY_SCORE = 0.85;
export const FADING_RETENTION = 0.6;

export function lessonMasteryState(
  p: MasteryLessonInput["progress"],
  retentionPct: number | null,
): LessonMasteryState {
  if (!p || !p.completedAt || p.status !== "completed") {
    return (p?.attempts ?? 0) > 0 ? "learning" : "new";
  }
  if (retentionPct != null && retentionPct < FADING_RETENTION * 100) return "fading";
  if ((p.bestScore ?? 0) >= MASTERY_SCORE) return "mastered";
  return "learning";
}

export function buildUnitMasteryMap(units: MasteryUnitInput[], now: Date = new Date()): MasteryUnit[] {
  return units.map((u) => {
    const lessons: MasteryLesson[] = u.lessons.map((l) => {
      const p = l.progress ?? null;
      const mem =
        p?.completedAt && p.status === "completed"
          ? retentionSummary(
              {
                bestScore: p.bestScore ?? 0,
                attempts: p.attempts ?? 0,
                lastPracticedAt: p.completedAt,
              },
              now,
            )
          : null;
      return {
        id: l.id,
        slug: l.slug,
        titleUk: l.titleUk,
        titleEn: l.titleEn || l.titleUk,
        isExam: Boolean(l.isExam),
        state: lessonMasteryState(p, mem?.retentionPct ?? null),
        bestScorePct: Math.round((p?.bestScore ?? 0) * 100),
        retentionPct: mem?.retentionPct ?? null,
        dueInDays: mem?.dueInDays ?? null,
      };
    });
    const done = lessons.filter((l) => l.retentionPct != null);
    const mastered = lessons.filter((l) => l.state === "mastered").length;
    const fading = lessons.filter((l) => l.state === "fading").length;
    const avg = done.length
      ? Math.round(done.reduce((s, l) => s + (l.retentionPct ?? 0), 0) / done.length)
      : null;
    let state: LessonMasteryState = "new";
    if (lessons.length && mastered === lessons.length) state = "mastered";
    else if (fading > 0) state = "fading";
    else if (lessons.some((l) => l.state !== "new")) state = "learning";
    return {
      slug: u.slug,
      titleUk: u.titleUk,
      titleEn: u.titleEn || u.titleUk,
      lessons,
      completed: done.length,
      total: lessons.length,
      mastered,
      fading,
      avgRetentionPct: avg,
      state,
    };
  });
}
