import { defineConfig } from "vitest/config";
import { coverage } from "../../vitest.coverage.mjs";
import path from "node:path";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
  },
  test: {
    // Coverage baseline measured 26.11.2026 (pct rounded down, minus 1). Raise as tests grow.
    coverage: coverage({ lines: 2, functions: 55, branches: 58, statements: 2 }),
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
