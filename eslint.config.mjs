// ESLint (flat config) for the whole monorepo: `pnpm lint` at the root.
// Existing violations are recorded in eslint-suppressions.json (baseline), so CI
// fails only on NEW problems. Fix old ones and run `pnpm lint:prune-baseline`.
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/test-results/**",
      "**/playwright-report/**",
      "**/*.d.ts",
      "**/next-env.d.ts",
      "apps/mobile/**",
      "packages/db/drizzle/**",
      "labs/**",
      "**/public/**",
      "backup_pre_sync.sql",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: { ...globals.node, ...globals.es2023 },
    },
    linterOptions: { reportUnusedDisableDirectives: "warn" },
    rules: {
      // `_`-prefixed names are intentionally unused.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  {
    // Next.js app: browser globals, Next and React hooks rules.
    files: ["apps/web/**/*.{ts,tsx,js,jsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { "@next/next": nextPlugin, "react-hooks": reactHooks },
    settings: { next: { rootDir: "apps/web" } },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.ts", "**/e2e/**", "**/*.integration.ts"],
    rules: { "@typescript-eslint/no-explicit-any": "off", "@typescript-eslint/no-non-null-assertion": "off" },
  },
);
