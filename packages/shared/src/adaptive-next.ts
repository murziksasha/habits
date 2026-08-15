/**
 * ML-lite adaptive next-step scoring.
 * Feature-based logistic blend — no external model required.
 * Can later load weights from ADAPTIVE_WEIGHTS_JSON.
 */

export type AdaptiveFeatures = {
  /** 0–1 mastery of last lesson */
  lastMastery: number;
  /** attempts on last lesson */
  attempts: number;
  /** streak days (capped) */
  streakDays: number;
  /** days since last activity */
  daysInactive: number;
  /** whether item is weak/review */
  isWeak: boolean;
  /** whether item is exam-related */
  isExam: boolean;
  /** whether free tier and paywalled */
  paywalled: boolean;
  /** base priority from rules engine */
  basePriority: number;
};

export type AdaptiveWeights = {
  intercept: number;
  lastMastery: number;
  attempts: number;
  streakDays: number;
  daysInactive: number;
  isWeak: number;
  isExam: number;
  paywalled: number;
  basePriority: number;
};

/** Default weights: prefer weak + recent continuity, deprioritize paywall */
export const DEFAULT_ADAPTIVE_WEIGHTS: AdaptiveWeights = {
  intercept: 0.2,
  lastMastery: -0.8,
  attempts: 0.15,
  streakDays: 0.05,
  daysInactive: 0.25,
  isWeak: 1.2,
  isExam: 0.3,
  paywalled: -2.0,
  basePriority: 0.08,
};

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-Math.max(-20, Math.min(20, x))));
}

const WEIGHT_KEYS: (keyof AdaptiveWeights)[] = [
  "intercept",
  "lastMastery",
  "attempts",
  "streakDays",
  "daysInactive",
  "isWeak",
  "isExam",
  "paywalled",
  "basePriority",
];

function pickNumericWeights(parsed: unknown): Partial<AdaptiveWeights> {
  if (!parsed || typeof parsed !== "object") return {};
  const out: Partial<AdaptiveWeights> = {};
  const obj = parsed as Record<string, unknown>;
  for (const k of WEIGHT_KEYS) {
    const v = obj[k];
    if (typeof v === "number" && Number.isFinite(v)) {
      out[k] = v;
    }
  }
  return out;
}

/** Load weights from ADAPTIVE_WEIGHTS_JSON; invalid JSON / non-numeric keys fall back. */
export function loadAdaptiveWeights(
  env: Record<string, string | undefined> = {},
): AdaptiveWeights {
  const raw = env.ADAPTIVE_WEIGHTS_JSON;
  if (!raw) return { ...DEFAULT_ADAPTIVE_WEIGHTS };
  try {
    const parsed = JSON.parse(raw) as unknown;
    return { ...DEFAULT_ADAPTIVE_WEIGHTS, ...pickNumericWeights(parsed) };
  } catch {
    return { ...DEFAULT_ADAPTIVE_WEIGHTS };
  }
}

/**
 * Score in ~0–30 range compatible with existing priority sorting.
 */
export function adaptiveScore(
  f: AdaptiveFeatures,
  weights: AdaptiveWeights = DEFAULT_ADAPTIVE_WEIGHTS,
): number {
  const z =
    weights.intercept +
    weights.lastMastery * f.lastMastery +
    weights.attempts * Math.min(10, f.attempts) +
    weights.streakDays * Math.min(30, f.streakDays) +
    weights.daysInactive * Math.min(14, f.daysInactive) +
    weights.isWeak * (f.isWeak ? 1 : 0) +
    weights.isExam * (f.isExam ? 1 : 0) +
    weights.paywalled * (f.paywalled ? 1 : 0) +
    weights.basePriority * f.basePriority;
  const p = sigmoid(z);
  return f.basePriority * 0.4 + p * 25;
}

export function rankByAdaptive<T extends { priority: number }>(
  items: T[],
  featuresOf: (item: T) => AdaptiveFeatures,
  weights?: AdaptiveWeights,
): (T & { adaptiveScore: number })[] {
  const w = weights ?? DEFAULT_ADAPTIVE_WEIGHTS;
  return items
    .map((item) => ({
      ...item,
      adaptiveScore: adaptiveScore(featuresOf(item), w),
    }))
    .sort((a, b) => b.adaptiveScore - a.adaptiveScore);
}
