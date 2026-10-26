import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Load monorepo root `.env` into process.env (no-op if missing). */
export function loadRootEnv() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  // packages/db/src → repo root
  const rootEnv = path.resolve(here, "../../../.env");
  if (!fs.existsSync(rootEnv)) return;
  const text = fs.readFileSync(rootEnv, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  }
}
