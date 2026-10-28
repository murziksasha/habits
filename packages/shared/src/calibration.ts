/**
 * Confidence ratings + calibration (SPEC 92).
 * Learner marks each answer: 1 guess · 2 unsure · 3 sure. Calibration compares
 * confidence with first-try accuracy ("do you know what you know?").
 */

export type ConfidenceLevel = 1 | 2 | 3;

export const CONFIDENCE_META: Record<ConfidenceLevel, { code: string; uk: string; en: string; icon: string; expected: number }> = {
  1: { code: "guess", uk: "Вгадую", en: "Guessing", icon: "🎲", expected: 0.33 },
  2: { code: "unsure", uk: "Не впевнений", en: "Unsure", icon: "🤔", expected: 0.6 },
  3: { code: "sure", uk: "Впевнений", en: "Sure", icon: "🎯", expected: 0.9 },
};

export function normalizeConfidence(v: unknown): ConfidenceLevel | null {
  const n = Number(v);
  return n === 1 || n === 2 || n === 3 ? (n as ConfidenceLevel) : null;
}

export type CalibrationRow = { confidence: number | null; firstTry: boolean };

export type CalibrationBucket = {
  level: ConfidenceLevel;
  code: string;
  count: number;
  accuracy: number | null;
  expected: number;
};

export type CalibrationReport = {
  total: number;
  rated: number;
  buckets: CalibrationBucket[];
  /** Share of "sure" answers that were wrong on first try */
  overconfidence: number | null;
  /** Share of "guess" answers that were right on first try */
  underconfidence: number | null;
  /** 0..1, 1 = perfectly calibrated (weighted by bucket size); null when < 5 rated */
  score: number | null;
  tipCode: "need_data" | "overconfident" | "underconfident" | "calibrated";
  tipUk: string;
  tipEn: string;
};

const TIPS: Record<CalibrationReport["tipCode"], [string, string]> = {
  need_data: [
    "Оцінюйте впевненість у кількох вправах — і тут зʼявиться ваша калібровка.",
    "Rate your confidence on a few exercises to see your calibration.",
  ],
  overconfident: [
    "Ви часто помиляєтесь, коли впевнені. Перед відповіддю коротко поясніть собі «чому».",
    "You are often wrong when sure. Before answering, explain to yourself *why*.",
  ],
  underconfident: [
    "Ви знаєте більше, ніж думаєте: «вгадані» відповіді часто правильні.",
    "You know more than you think: your \"guesses\" are often right.",
  ],
  calibrated: [
    "Добра калібровка — ваша впевненість відповідає результатам.",
    "Well calibrated — your confidence matches your results.",
  ],
};

export function buildCalibration(rows: CalibrationRow[]): CalibrationReport {
  const buckets: CalibrationBucket[] = ([1, 2, 3] as ConfidenceLevel[]).map((level) => {
    const r = rows.filter((x) => normalizeConfidence(x.confidence) === level);
    const ok = r.filter((x) => x.firstTry).length;
    return {
      level,
      code: CONFIDENCE_META[level].code,
      count: r.length,
      accuracy: r.length ? ok / r.length : null,
      expected: CONFIDENCE_META[level].expected,
    };
  });
  const rated = buckets.reduce((s, b) => s + b.count, 0);
  const sure = buckets[2]!;
  const guess = buckets[0]!;
  const overconfidence = sure.count ? 1 - (sure.accuracy ?? 0) : null;
  const underconfidence = guess.count ? guess.accuracy : null;

  let score: number | null = null;
  if (rated >= 5) {
    let err = 0;
    for (const b of buckets) {
      if (b.count && b.accuracy != null) err += b.count * Math.abs(b.accuracy - b.expected);
    }
    score = Math.max(0, Math.min(1, 1 - err / rated));
  }

  let tipCode: CalibrationReport["tipCode"] = "need_data";
  if (rated >= 5) {
    if (sure.count >= 3 && (overconfidence ?? 0) > 0.3) tipCode = "overconfident";
    else if (guess.count >= 3 && (underconfidence ?? 0) > 0.6) tipCode = "underconfident";
    else tipCode = "calibrated";
  }

  return {
    total: rows.length,
    rated,
    buckets,
    overconfidence,
    underconfidence,
    score,
    tipCode,
    tipUk: TIPS[tipCode][0],
    tipEn: TIPS[tipCode][1],
  };
}
