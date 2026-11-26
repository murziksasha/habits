/**
 * `next build` must run with NODE_ENV=production.
 * The CI smoke job sets NODE_ENV=development for the API. Next.js keeps that
 * value, then prerender of the internal /404 and /_error pages crashes with
 * "<Html> should not be imported outside of pages/_document."
 *
 * `--analyze` (pnpm --filter @eduforge/web analyze) sets ANALYZE=true so
 * next.config.ts wraps the config with @next/bundle-analyzer; reports land in
 * apps/web/.next/analyze/{client,nodejs,edge}.html. Works on Windows too.
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = path.join(appRoot, "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextBin, "build"], {
  cwd: appRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: "production",
    ...(process.argv.includes("--analyze") ? { ANALYZE: "true" } : {}),
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
