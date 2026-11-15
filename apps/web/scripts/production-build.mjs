/**
 * `next build` must run with NODE_ENV=production.
 * The CI smoke job sets NODE_ENV=development for the API. Next.js keeps that
 * value, then prerender of the internal /404 and /_error pages crashes with
 * "<Html> should not be imported outside of pages/_document."
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = path.join(appRoot, "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextBin, "build"], {
  cwd: appRoot,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
