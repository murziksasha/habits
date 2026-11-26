import { defineConfig } from "vitest/config";
import { coverage } from "../../vitest.coverage.mjs";

export default defineConfig({
  test: {
    // Coverage baseline measured 26.11.2026 (pct rounded down, minus 1). Raise as tests grow.
    coverage: coverage({ lines: 11, functions: 91, branches: 85, statements: 11 }),
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
