/**
 * Glicko-2 rating system (Glickman, "Example of the Glicko-2 system", 2013).
 * Used for chess puzzle ratings (learner vs. puzzle). Game Elo lives in chess-rating.ts.
 */

export type Glicko2Rating = { rating: number; rd: number; volatility: number };
export type Glicko2Game = { rating: number; rd: number; score: number };

const SCALE = 173.7178;
export const GLICKO2_TAU = 0.5;
export const GLICKO2_DEFAULT: Glicko2Rating = { rating: 1200, rd: 350, volatility: 0.06 };
const EPS = 0.000001;
const MIN_RD = 30;
const MAX_RD = 350;

function g(phi: number): number {
  return 1 / Math.sqrt(1 + (3 * phi * phi) / (Math.PI * Math.PI));
}

function expected(mu: number, muJ: number, phiJ: number): number {
  return 1 / (1 + Math.exp(-g(phiJ) * (mu - muJ)));
}

/** One rating-period update. With no games only RD grows (step 6). */
export function glicko2Update(
  player: Glicko2Rating,
  games: readonly Glicko2Game[],
  tau = GLICKO2_TAU,
  opts: { clampRd?: boolean } = {},
): Glicko2Rating {
  const clamp = opts.clampRd ?? true;
  const mu = (player.rating - 1500) / SCALE;
  const phi = player.rd / SCALE;
  const sigma = player.volatility;
  if (games.length === 0) {
    const phiStar = Math.sqrt(phi * phi + sigma * sigma);
    const rd = phiStar * SCALE;
    return { rating: player.rating, rd: clamp ? Math.min(MAX_RD, rd) : rd, volatility: sigma };
  }
  let vInv = 0;
  let deltaSum = 0;
  for (const gm of games) {
    const muJ = (gm.rating - 1500) / SCALE;
    const phiJ = gm.rd / SCALE;
    const e = expected(mu, muJ, phiJ);
    const gj = g(phiJ);
    vInv += gj * gj * e * (1 - e);
    deltaSum += gj * (gm.score - e);
  }
  const v = 1 / vInv;
  const delta = v * deltaSum;

  // Step 5: new volatility (Illinois algorithm).
  const a = Math.log(sigma * sigma);
  const f = (x: number) => {
    const ex = Math.exp(x);
    return (ex * (delta * delta - phi * phi - v - ex)) / (2 * (phi * phi + v + ex) ** 2) - (x - a) / (tau * tau);
  };
  let A = a;
  let B: number;
  if (delta * delta > phi * phi + v) {
    B = Math.log(delta * delta - phi * phi - v);
  } else {
    let k = 1;
    while (f(a - k * tau) < 0) k += 1;
    B = a - k * tau;
  }
  let fA = f(A);
  let fB = f(B);
  let guard = 0;
  while (Math.abs(B - A) > EPS && guard++ < 200) {
    const C = A + ((A - B) * fA) / (fB - fA);
    const fC = f(C);
    if (fC * fB <= 0) {
      A = B;
      fA = fB;
    } else {
      fA = fA / 2;
    }
    B = C;
    fB = fC;
  }
  const sigmaNew = Math.exp(A / 2);
  const phiStar = Math.sqrt(phi * phi + sigmaNew * sigmaNew);
  const phiNew = 1 / Math.sqrt(1 / (phiStar * phiStar) + 1 / v);
  const muNew = mu + phiNew * phiNew * deltaSum;
  let rd = phiNew * SCALE;
  if (clamp) rd = Math.max(MIN_RD, Math.min(MAX_RD, rd));
  return { rating: muNew * SCALE + 1500, rd, volatility: sigmaNew };
}

/** Starting puzzle rating from authored difficulty (d1 ≈ 800 … d5 ≈ 1800). */
export function puzzleRatingFromDifficulty(difficulty: number | undefined): number {
  const d = Math.max(1, Math.min(5, Math.round(difficulty ?? 1)));
  return [800, 1050, 1300, 1550, 1800][d - 1]!;
}

/** Learner score for one puzzle attempt: clean first try = 1, hint/2nd try = 0.5, revealed/failed = 0. */
export function puzzleAttemptScore(a: { solved: boolean; firstTry: boolean; hintsUsed: number; revealed: boolean }): number {
  if (a.revealed || !a.solved) return 0;
  if (a.firstTry && a.hintsUsed === 0) return 1;
  return 0.5;
}

/** Fixed chess SRS ladder: 1 → 3 → 7 → 21 days. */
export const CHESS_REVIEW_LADDER = [1, 3, 7, 21] as const;
export function chessReviewIntervalDays(repetitions: number): number {
  const i = Math.max(0, Math.min(CHESS_REVIEW_LADDER.length - 1, Math.floor(repetitions)));
  return CHESS_REVIEW_LADDER[i]!;
}

export const CHESS_REVIEW_TYPES = new Set(["chess_puzzle", "chess_plan", "chess_endgame_drill"]);

/** Next chess SRS state: success climbs the ladder, a miss resets to 1 day (lapses + 1). */
export function chessSrsNext(
  prev: { repetitions: number; lapses: number } | null,
  correct: boolean,
): { repetitions: number; lapses: number; intervalDays: number } {
  const base = prev ?? { repetitions: 0, lapses: 0 };
  if (!correct) return { repetitions: 0, lapses: base.lapses + (prev ? 1 : 0), intervalDays: 1 };
  const intervalDays = chessReviewIntervalDays(base.repetitions + 1);
  return { repetitions: base.repetitions + 1, lapses: base.lapses, intervalDays };
}
