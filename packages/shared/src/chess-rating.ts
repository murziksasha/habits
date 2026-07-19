/** Simple Elo rating */

export function expectedScore(ratingA: number, ratingB: number): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

export function eloDelta(
  rating: number,
  opponentRating: number,
  score: 0 | 0.5 | 1,
  k = 32,
): number {
  const exp = expectedScore(rating, opponentRating);
  return Math.round(k * (score - exp));
}

export function applyElo(
  whiteElo: number,
  blackElo: number,
  result: "1-0" | "0-1" | "1/2-1/2",
  gamesWhite = 0,
  gamesBlack = 0,
): { whiteDelta: number; blackDelta: number } {
  const kW = gamesWhite < 30 ? 32 : 20;
  const kB = gamesBlack < 30 ? 32 : 20;
  const scoreW: 0 | 0.5 | 1 =
    result === "1-0" ? 1 : result === "0-1" ? 0 : 0.5;
  const scoreB = (1 - scoreW) as 0 | 0.5 | 1;
  return {
    whiteDelta: eloDelta(whiteElo, blackElo, scoreW, kW),
    blackDelta: eloDelta(blackElo, whiteElo, scoreB, kB),
  };
}

export const DEFAULT_ELO = 1000;
