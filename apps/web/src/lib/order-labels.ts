/** Localize display only; the canonical value remains the submitted answer. */
export function orderLabel(value: string, locale: string, lines?: string[], linesUk?: string[]): string {
  if (locale !== "uk" || !lines || !linesUk || lines.length !== linesUk.length) return value;
  const index = lines.indexOf(value);
  if (index < 0 || lines.lastIndexOf(value) !== index) return value;
  return linesUk[index] ?? value;
}
