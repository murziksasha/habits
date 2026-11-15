import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import zlib from "node:zlib";
import { LOCAL_LAB_MANIFESTS } from "../packages/shared/dist/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const labsRoot = path.join(repoRoot, "labs", "forgeboard");
const outDir = path.join(repoRoot, "apps", "web", "public", "labs");

const EXCLUDE_NAMES = new Set(["node_modules", ".git", "dist", "workspace", ".DS_Store"]);

function walkFiles(dir, baseDir = dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    if (EXCLUDE_NAMES.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    const rel = path.relative(baseDir, full).replace(/\\/g, "/");
    if (entry.isDirectory()) {
      results.push(...walkFiles(full, baseDir));
    } else if (entry.isFile()) {
      const lower = rel.toLowerCase();
      if (lower.startsWith("solution/") || lower.startsWith("broken/") || lower.includes("/solution/") || lower.includes("/broken/")) {
        throw new Error(`Security guard triggered: restricted file found in starter: ${full}`);
      }
      results.push({ full, rel });
    }
  }
  return results;
}

function createZipBuffer(entries) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  // Fixed DOS timestamp (2026-01-01 00:00:00) for reproducible deterministic zip bytes
  const dosTime = 0;
  const dosDate = (46 << 9) | (1 << 5) | 1;

  for (const { rel, data } of entries) {
    const nameBuf = Buffer.from(rel, "utf8");
    const crc = zlib.crc32(data) >>> 0;
    const compressed = zlib.deflateRawSync(data, { level: 6 });

    const local = Buffer.alloc(30 + nameBuf.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0x0800, 6); // UTF-8 flag
    local.writeUInt16LE(8, 8); // deflate
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    nameBuf.copy(local, 30);

    const central = Buffer.alloc(46 + nameBuf.length);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4); // version made by
    central.writeUInt16LE(20, 6); // version needed
    central.writeUInt16LE(0x0800, 8); // UTF-8
    central.writeUInt16LE(8, 10); // deflate
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    nameBuf.copy(central, 46);

    localParts.push(local, compressed);
    centralParts.push(central);
    offset += local.length + compressed.length;
  }

  const centralDirBuf = Buffer.concat(centralParts);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(entries.length, 8);
  eocd.writeUInt16LE(entries.length, 10);
  eocd.writeUInt32LE(centralDirBuf.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, centralDirBuf, eocd]);
}

const genLock = process.argv.includes("--lock");
fs.mkdirSync(outDir, { recursive: true });

for (const manifest of LOCAL_LAB_MANIFESTS) {
  const starterDir = path.join(labsRoot, manifest.labId, "starter");
  if (!fs.existsSync(starterDir)) {
    throw new Error(`Missing starter directory for ${manifest.labId}: ${starterDir}`);
  }

  if (genLock || !fs.existsSync(path.join(starterDir, "pnpm-lock.yaml"))) {
    fs.writeFileSync(
      path.join(starterDir, "pnpm-workspace.yaml"),
      "packages:\n  - .\nallowBuilds:\n  esbuild: true\n",
      "utf8",
    );
    const pkg = JSON.parse(fs.readFileSync(path.join(starterDir, "package.json"), "utf8"));
    const hasDeps =
      Object.keys(pkg.dependencies ?? {}).length > 0 ||
      Object.keys(pkg.devDependencies ?? {}).length > 0;
    if (hasDeps) {
      console.log(`Generating lockfile for ${manifest.labId}...`);
      const res = spawnSync(
        "pnpm",
        ["install", "--offline", "--lockfile-only", "--no-frozen-lockfile"],
        {
          cwd: starterDir,
          shell: process.platform === "win32",
          encoding: "utf8",
        },
      );
      if (res.status !== 0) {
        console.error(res.stdout, res.stderr);
        throw new Error(`Failed generating lockfile for ${manifest.labId}`);
      }
    } else {
      fs.writeFileSync(
        path.join(starterDir, "pnpm-lock.yaml"),
        "lockfileVersion: '9.0'\n\nsettings:\n  autoInstallPeers: true\n  excludeLinksFromLockfile: false\n",
        "utf8",
      );
    }
  }

  const files = walkFiles(starterDir);
  const entries = files.map((f) => ({
    rel: f.rel,
    data: fs.readFileSync(f.full),
  }));
  const zipBuf = createZipBuffer(entries);
  const zipFile = path.basename(manifest.downloadPath);
  const dest = path.join(outDir, zipFile);
  fs.writeFileSync(dest, zipBuf);
  const sha = crypto.createHash("sha256").update(zipBuf).digest("hex").slice(0, 12);
  console.log(`Packed ${zipFile} (${entries.length} files, ${zipBuf.length} bytes, sha256:${sha})`);
}
