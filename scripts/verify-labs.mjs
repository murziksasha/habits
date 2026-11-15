import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";
import { LOCAL_LAB_MANIFESTS } from "../packages/shared/dist/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const labsRoot = path.join(repoRoot, "labs", "forgeboard");
const zipsRoot = path.join(repoRoot, "apps", "web", "public");

function extractZip(zipBuf, destDir) {
  let offset = 0;
  let count = 0;
  while (offset + 30 <= zipBuf.length) {
    const sig = zipBuf.readUInt32LE(offset);
    if (sig !== 0x04034b50) break;
    const method = zipBuf.readUInt16LE(offset + 8);
    const compSize = zipBuf.readUInt32LE(offset + 18);
    const nameLen = zipBuf.readUInt16LE(offset + 26);
    const extraLen = zipBuf.readUInt16LE(offset + 28);
    const name = zipBuf.subarray(offset + 30, offset + 30 + nameLen).toString("utf8");
    const dataStart = offset + 30 + nameLen + extraLen;
    const raw = zipBuf.subarray(dataStart, dataStart + compSize);
    const out = method === 8 ? zlib.inflateRawSync(raw) : raw;

    const normalized = name.replace(/\\/g, "/");
    if (
      normalized.startsWith("solution/") ||
      normalized.startsWith("broken/") ||
      normalized.includes("/solution/") ||
      normalized.includes("/broken/")
    ) {
      throw new Error(`Extracted zip leaked restricted path: ${name}`);
    }

    const outPath = path.resolve(destDir, normalized);
    if (!outPath.startsWith(path.resolve(destDir))) {
      throw new Error(`Zip slip path detected: ${name}`);
    }
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, out);
    count += 1;
    offset = dataStart + compSize;
  }
  return count;
}

function copyOverlay(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      copyOverlay(src, dest);
    } else if (entry.isFile()) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    }
  }
}

function runCmd(cmdLine, cwd, envExtra = {}) {
  const res = spawnSync(cmdLine, {
    cwd,
    shell: true,
    env: { ...process.env, ...envExtra },
    encoding: "utf8",
  });
  return res;
}

async function preparePostgresLabUrl() {
  const candidates = [
    process.env.LABS_DATABASE_URL,
    process.env.DATABASE_URL,
    "postgres://eduforge:eduforge@127.0.0.1:5433/eduforge",
    "postgres://postgres:postgres@127.0.0.1:5432/postgres",
  ].filter(Boolean);

  const { default: postgres } = await import("../packages/db/node_modules/postgres/src/index.js").catch(
    async () => {
      // Fallback via pnpm-resolved postgres inside apps/web or root node_modules
      const pgMod = path.join(repoRoot, "node_modules/.pnpm/postgres@3.4.9/node_modules/postgres/src/index.js");
      return await import(`file://${pgMod.replace(/\\/g, "/")}`);
    },
  );

  for (const dsn of candidates) {
    let sql;
    try {
      const parsed = new URL(dsn);
      const dbName = "forgeboard_m6_verify";
      sql = postgres(dsn, { max: 1, connect_timeout: 3 });
      const existing = await sql`SELECT 1 FROM pg_database WHERE datname = ${dbName}`;
      if (existing.length === 0) {
        await sql.unsafe(`CREATE DATABASE ${dbName}`);
      }
      await sql.end();
      parsed.pathname = `/${dbName}`;
      return parsed.toString();
    } catch {
      if (sql) {
        await sql.end().catch(() => {});
      }
    }
  }
  return null;
}

const filterArg = process.argv.find((a) => a.startsWith("--lab="))?.slice(6);
const selected = filterArg
  ? LOCAL_LAB_MANIFESTS.filter((m) => m.labId === filterArg)
  : LOCAL_LAB_MANIFESTS;

if (selected.length === 0) {
  throw new Error(`No lab manifest matched --lab=${filterArg}`);
}

let pgUrl = null;
if (selected.some((m) => m.labId === "forgeboard-m6-postgres")) {
  pgUrl = await preparePostgresLabUrl();
  if (!pgUrl) {
    throw new Error(
      "PostgreSQL is unreachable for forgeboard-m6-postgres verification. Start local Postgres (port 5433/5432) or set LABS_DATABASE_URL.",
    );
  }
  console.log(`Prepared M6 PostgreSQL database cleanly`);
}

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "eduforge-labs-verify-"));
let failures = 0;

try {
  for (const manifest of selected) {
    const labDir = path.join(labsRoot, manifest.labId);
    const zipPath = path.join(zipsRoot, manifest.downloadPath.replace(/^\//, ""));
    if (!fs.existsSync(zipPath)) {
      throw new Error(`Packaged zip missing for ${manifest.labId}: ${zipPath}`);
    }

    const workDir = path.join(tempRoot, manifest.labId);
    fs.mkdirSync(workDir, { recursive: true });
    const count = extractZip(fs.readFileSync(zipPath), workDir);
    console.log(`\n=== Verifying ${manifest.labId} (${count} archived files) ===`);

    const envExtra = manifest.labId === "forgeboard-m6-postgres" && pgUrl ? { DATABASE_URL: pgUrl } : {};

    // Run pnpm install with frozen-lockfile from the packaged archive
    const installArgs = process.env.LABS_OFFLINE === "1" ? " --offline" : "";
    const installRes = runCmd(
      `pnpm install --frozen-lockfile${installArgs}`,
      workDir,
      envExtra,
    );
    if (installRes.status !== 0) {
      console.error(installRes.stdout, installRes.stderr);
      throw new Error(`${manifest.labId}: starter frozen-lockfile install failed`);
    }

    // Starter verification: initialize lab setup (excluding docker compose when verified directly against local DB), then confirm starter FAILS
    for (const cmd of manifest.setupCommands) {
      if (cmd.startsWith("pnpm install") || cmd.startsWith("docker compose")) continue;
      if (cmd === "pnpm migrate") continue; // starter incomplete schema may not match full migration
      runCmd(cmd, workDir, envExtra);
    }

    let starterPassed = true;
    for (const cmd of manifest.testCommands) {
      const r = runCmd(cmd, workDir, envExtra);
      if (r.status !== 0) {
        starterPassed = false;
        break;
      }
    }
    if (starterPassed) {
      console.error(`FAIL [${manifest.labId}]: starter unexpectedly passed all tests!`);
      failures += 1;
      continue;
    }
    console.log(`PASS [${manifest.labId}]: starter failed as expected before learner edits`);

    // Solution verification
    copyOverlay(path.join(labDir, "solution"), workDir);
    for (const cmd of manifest.setupCommands) {
      if (cmd.startsWith("pnpm install") || cmd.startsWith("docker compose")) continue;
      const setupR = runCmd(cmd, workDir, envExtra);
      if (setupR.status !== 0) {
        console.error(setupR.stdout, setupR.stderr);
        throw new Error(`${manifest.labId}: solution setup '${cmd}' failed`);
      }
    }
    let solOk = true;
    for (const cmd of manifest.testCommands) {
      const r = runCmd(cmd, workDir, envExtra);
      if (r.status !== 0) {
        console.error(`FAIL [${manifest.labId}] solution '${cmd}':\n`, r.stdout, r.stderr);
        solOk = false;
        failures += 1;
        break;
      }
    }
    if (!solOk) continue;
    console.log(`PASS [${manifest.labId}]: solution passed all commands`);

    // Broken variant verification
    const brokenRoot = path.join(labDir, "broken");
    const variants = fs.existsSync(brokenRoot)
      ? fs
          .readdirSync(brokenRoot, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name)
      : [];
    if (variants.length === 0) {
      throw new Error(`${manifest.labId}: missing broken variant directory`);
    }

    for (const variant of variants) {
      const brokenDir = path.join(tempRoot, `${manifest.labId}-broken-${variant}`);
      fs.cpSync(workDir, brokenDir, {
        recursive: true,
        force: true,
        filter: (src) => !src.split(path.sep).includes("node_modules"),
      });
      const nmSrc = path.join(workDir, "node_modules");
      if (fs.existsSync(nmSrc)) {
        fs.symlinkSync(nmSrc, path.join(brokenDir, "node_modules"), process.platform === "win32" ? "junction" : "dir");
      }
      copyOverlay(path.join(brokenRoot, variant), brokenDir);
      for (const cmd of manifest.setupCommands) {
        if (cmd.startsWith("pnpm install") || cmd.startsWith("docker compose")) continue;
        runCmd(cmd, brokenDir, envExtra);
      }

      let brokenFailed = false;
      for (const cmd of manifest.testCommands) {
        const r = runCmd(cmd, brokenDir, envExtra);
        if (r.status !== 0) {
          brokenFailed = true;
          break;
        }
      }
      if (!brokenFailed) {
        console.error(`FAIL [${manifest.labId}]: broken variant '${variant}' unexpectedly passed!`);
        failures += 1;
      } else {
        console.log(`PASS [${manifest.labId}]: broken variant '${variant}' failed as expected`);
      }
    }
  }
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}

if (failures > 0) {
  console.error(`\nLab verification finished with ${failures} failure(s).`);
  process.exit(1);
}
console.log(`\nALL ${selected.length} ForgeBoard labs verified (starter fail / solution pass / broken fail).`);
