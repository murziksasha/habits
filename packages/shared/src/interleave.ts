/**
 * Interleaved retrieval practice (SPEC 91).
 *
 * Builds a mixed set of auto-gradable exercises from several completed lessons so the
 * learner retrieves knowledge out of its original context. Weak lessons are drawn more
 * often; consecutive items come from different lessons whenever possible.
 */

export type MixedExercise = { id: string; type: string; [key: string]: unknown };

export type MixedPool = {
  lessonId: string;
  courseSlug: string;
  lessonTitleUk: string;
  lessonTitleEn?: string;
  /** 0..1 best score; lower → drawn more often */
  bestScore: number;
  exercises: MixedExercise[];
};

export type MixedItem = {
  lessonId: string;
  courseSlug: string;
  lessonTitleUk: string;
  lessonTitleEn: string;
  exercise: MixedExercise;
};

/** Exercise types that are graded instantly without media / runners / boards. */
export const MIXED_PRACTICE_TYPES = [
  "mcq",
  "logic_puzzle",
  "code_read",
  "code_output",
  "code_fill",
  "code_order",
  "fill_blank",
  "translate",
  "match",
  "order_words",
] as const;

const MIXED_SET = new Set<string>(MIXED_PRACTICE_TYPES);

export function isMixedPracticeExercise(ex: MixedExercise | null | undefined): boolean {
  if (!ex || typeof ex.id !== "string" || !MIXED_SET.has(ex.type)) return false;
  if (ex.type === "code_output") {
    return Array.isArray(ex.options) || Array.isArray(ex.accepted);
  }
  return true;
}

/** Small deterministic PRNG (mulberry32). */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0 || 0x9e3779b9;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rnd: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

/** Lesson weight: weak lessons count up to 3x. */
export function mixedLessonWeight(bestScore: number): number {
  const s = Math.min(1, Math.max(0, Number.isFinite(bestScore) ? bestScore : 0));
  return 1 + 2 * (1 - s);
}

export function buildInterleavedSet(
  pools: MixedPool[],
  opts?: { count?: number; seed?: number; maxPerLesson?: number },
): MixedItem[] {
  const count = Math.max(1, Math.min(30, Math.floor(opts?.count ?? 10)));
  const maxPerLesson = Math.max(1, Math.floor(opts?.maxPerLesson ?? 3));
  const rnd = seededRandom(opts?.seed ?? 1);

  // Weighted random lesson order (Efraimidis–Spirakis keys)
  const prepared = pools
    .map((p) => ({
      pool: p,
      queue: shuffle(p.exercises.filter(isMixedPracticeExercise), rnd),
      key: Math.pow(rnd() || 1e-9, 1 / mixedLessonWeight(p.bestScore)),
      taken: 0,
    }))
    .filter((p) => p.queue.length > 0)
    .sort((a, b) => b.key - a.key);

  const out: MixedItem[] = [];
  const seen = new Set<string>();
  let progressed = true;
  while (out.length < count && progressed) {
    progressed = false;
    for (const p of prepared) {
      if (out.length >= count) break;
      if (p.taken >= maxPerLesson) continue;
      const ex = p.queue.shift();
      if (!ex) continue;
      const key = `${p.pool.lessonId}:${ex.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      p.taken += 1;
      progressed = true;
      out.push({
        lessonId: p.pool.lessonId,
        courseSlug: p.pool.courseSlug,
        lessonTitleUk: p.pool.lessonTitleUk,
        lessonTitleEn: p.pool.lessonTitleEn || p.pool.lessonTitleUk,
        exercise: ex,
      });
    }
  }
  return out;
}
