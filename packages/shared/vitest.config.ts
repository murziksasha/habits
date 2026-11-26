import { defineConfig } from "vitest/config";
import { coverage } from "../../vitest.coverage.mjs";

export default defineConfig({
  test: {
    // Coverage baseline measured 26.11.2026 (pct rounded down, minus 1). Raise as tests grow.
    coverage: coverage({ lines: 92, functions: 82, branches: 71, statements: 92 }),
  },
});
