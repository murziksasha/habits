/**
 * Copy of `chessPuzzleHash` from @eduforge/chess-core (content has no runtime deps).
 * chess-qa.test.ts pins both to the same value.
 */
export function chessPuzzleHash(fen: string, solutionSans: readonly string[]): string {
  const text = `${fen}|${solutionSans.join(" ")}`;
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193 ^ 0x5bd1e995;
  for (let i = 0; i < text.length; i += 1) {
    const c = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ c, 0x5bd1e995) >>> 0;
    h2 = (h2 ^ (h2 >>> 13)) >>> 0;
  }
  return h1.toString(16).padStart(8, "0") + h2.toString(16).padStart(8, "0");
}
