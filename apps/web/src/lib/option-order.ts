/** FNV-1a. Stable across reloads so a restored answer index still matches the same choice. */
function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Display order for choice options. Values are the original indexes, so the
 * submitted answer stays the index stored on the exercise.
 */
export function stableOptionOrder(seed: string, count: number): number[] {
  const order = Array.from({ length: count }, (_, index) => index);
  if (count < 2) return order;
  let state = hashSeed(seed) || 1;
  const next = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let i = count - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    const swap = order[i]!;
    order[i] = order[j]!;
    order[j] = swap;
  }
  return order;
}
