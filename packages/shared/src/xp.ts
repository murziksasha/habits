/** Soft exponential level curve for course and global XP */

export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  // Level n requires cumulative XP ≈ 100 * (n-1)^1.5
  return Math.floor(100 * Math.pow(level - 1, 1.5));
}

export function levelFromXp(xp: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= xp) {
    level += 1;
    if (level >= 100) break;
  }
  return level;
}

export function xpProgressInLevel(xp: number): {
  level: number;
  current: number;
  needed: number;
  ratio: number;
} {
  const level = levelFromXp(xp);
  const floor = xpForLevel(level);
  const ceil = xpForLevel(level + 1);
  const current = xp - floor;
  const needed = Math.max(1, ceil - floor);
  return { level, current, needed, ratio: Math.min(1, current / needed) };
}

/** Award XP for a lesson based on accuracy and first completion */
export function lessonXpAward(opts: {
  baseXp?: number;
  accuracy: number; // 0..1
  firstClear: boolean;
  difficulty?: number; // 1..5
}): number {
  const base = opts.baseXp ?? 15;
  const diff = opts.difficulty ?? 1;
  const accBonus = Math.round(base * 0.5 * Math.min(1, Math.max(0, opts.accuracy)));
  const firstBonus = opts.firstClear ? 10 : 0;
  return Math.max(1, Math.round(base * (0.7 + diff * 0.1)) + accBonus + firstBonus);
}

/** Global character XP contribution from course XP gain */
export function globalXpFromCourseGain(courseXpGain: number, weight = 1): number {
  return Math.max(1, Math.round(courseXpGain * weight));
}

export const COURSE_GLOBAL_WEIGHT: Record<string, number> = {
  english: 1,
  chess: 1.1,
  typing: 0.9,
  speed_reading: 0.9,
  logic: 1,
  programming: 1,
  typescript: 1.05,
  html_semantics: 1,
  css_layout: 1,
  qa_theory: 1.05,
  js_fundamentals: 1.05,
  react_fundamentals: 1.05,
  sql_fundamentals: 1,
  node_fundamentals: 1.05,
  express_fundamentals: 1.05,
  embedded_cpp: 1.1,
};

export function typingXpAward(wpm: number, accuracy: number): number {
  const acc = Math.min(1, Math.max(0, accuracy));
  const base = Math.min(40, Math.floor(wpm / 5));
  return Math.max(1, Math.round(base * acc) + (acc >= 0.95 ? 5 : 0));
}

export function readingXpAward(wpm: number, comprehension: number): number {
  const comp = Math.min(1, Math.max(0, comprehension));
  const base = Math.min(35, Math.floor(wpm / 30));
  return Math.max(1, Math.round(base * (0.4 + 0.6 * comp)));
}

export function logicXpAward(difficulty: number, usedHint: boolean): number {
  const base = 8 + difficulty * 4;
  return usedHint ? Math.max(2, Math.floor(base * 0.6)) : base;
}

export function chessPuzzleXpAward(difficulty: number, firstClear: boolean): number {
  return (5 + difficulty * 5) + (firstClear ? 5 : 0);
}

export function chessGameXpAward(result: "win" | "loss" | "draw", rated: boolean): number {
  const table = { win: 25, draw: 12, loss: 5 } as const;
  const base = table[result];
  return rated ? base + 5 : base;
}

/** Soft daily cap to stop XP farming via lesson repeats. */
export const DAILY_XP_CAP = 400;

export function clampDailyXpGain(
  alreadyToday: number,
  gain: number,
  cap = DAILY_XP_CAP,
): number {
  const remaining = cap - Math.max(0, alreadyToday);
  return Math.max(0, Math.min(Math.round(gain), remaining));
}
