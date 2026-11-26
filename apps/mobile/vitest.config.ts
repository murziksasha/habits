import { defineConfig } from "vitest/config";
import { coverage } from "../../vitest.coverage.mjs";

export default defineConfig({
  test: {
    // Coverage baseline measured 26.11.2026 (pct rounded down, minus 1). Raise as tests grow.
    coverage: coverage({ lines: 79, functions: 82, branches: 43, statements: 79 }, { include: ["App.tsx", "src/**/*.{ts,tsx}"] }),
    environment: "node",
    include: ["**/*.test.ts"],
  },
});
