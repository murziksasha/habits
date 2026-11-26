// Shared vitest coverage settings. Each package passes its own baseline
// thresholds (measured, rounded down) so CI fails only when coverage drops.
// Run: pnpm test:coverage (all) or pnpm --filter <pkg> test:coverage.

/**
 * @param {{ lines: number; functions: number; branches: number; statements: number }} thresholds
 * @param {{ include?: string[]; exclude?: string[] }} [opts]
 */
export function coverage(thresholds, opts = {}) {
  return {
    provider: "v8",
    reporter: ["text-summary", "json-summary", "lcov", "html"],
    reportsDirectory: "coverage",
    include: opts.include ?? ["src/**/*.{ts,tsx}"],
    exclude: [
      "**/*.test.{ts,tsx}",
      "**/*.integration.ts",
      "**/*.integration.test.ts",
      "**/*.d.ts",
      "**/dist/**",
      ...(opts.exclude ?? []),
    ],
    thresholds,
  };
}
