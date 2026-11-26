import { defineConfig } from "vitest/config";
import { coverage } from "../../vitest.coverage.mjs";

export default defineConfig({
  test: {
    // ngspice runs are CPU-bound; under coverage on CI runners 5 s is too tight.
    testTimeout: 30_000,
    // Coverage baseline measured 26.11.2026 (pct rounded down, minus 1). Raise as tests grow.
    coverage: coverage({ lines: 57, functions: 77, branches: 58, statements: 57 }),
  },
});
