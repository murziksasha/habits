import { existsSync, readFileSync } from "node:fs";
import { access, mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync, gunzipSync } from "node:zlib";
import { eq, getTableColumns, getTableName, sql } from "drizzle-orm";
import { getTableConfig, type PgTable } from "drizzle-orm/pg-core";
import * as dbSchema from "@eduforge/db";
import { platformSettings, type Db } from "@eduforge/db";

export const BACKUP_FORMAT = "eduforge-instance-backup";
export const BACKUP_FORMAT_VERSION = 1;
export const BACKUP_SETTING_KEY = "instance_backup";
export const BACKUP_STALE_MS = 7 * 24 * 60 * 60 * 1000;
export const MAX_BACKUP_BYTES = 80 * 1024 * 1024;
export const RESTORE_CONFIRM = "RESTORE";

/** One-time secrets. They do not log anyone in on another browser. */
export const EXCLUDED_TABLES = [
  "sessions",
  "password_reset_tokens",
  "email_verification_tokens",
  "mfa_pending",
  "admin_step_up_tokens",
] as const;

const EXCLUDED = new Set<string>(EXCLUDED_TABLES);
const TIME_COLUMNS = new Set(["PgTimestamp", "PgTimestampString", "PgDate", "PgDateString"]);
const INSERT_CHUNK = 100;

export class BackupError extends Error {
  constructor(readonly code: string) {
    super(code);
    this.name = "BackupError";
  }
}

export type InstanceBackup = {
  format: string;
  formatVersion: number;
  migrationTag: string;
  exportedAt: string;
  tables: Record<string, Record<string, unknown>[]>;
};

type Journal = { entries?: { tag?: string }[] };

let migrationTagCache: string | undefined;
let tableCache: { all: PgTable[]; included: PgTable[]; ordered: PgTable[] } | undefined;
let restoreLock = false;

function schemaTables(): { all: PgTable[]; included: PgTable[]; ordered: PgTable[] } {
  if (tableCache) return tableCache;
  const all = (Object.values(dbSchema) as unknown[]).filter(isPgTable);
  const byName = new Map<string, PgTable>();
  for (const table of all) byName.set(getTableName(table), table);
  const included = [...byName.values()].filter((table) => !EXCLUDED.has(getTableName(table)));
  const ordered = orderTables(included);
  tableCache = { all: [...byName.values()], included, ordered };
  return tableCache;
}

function quoteIdent(name: string): string {
  if (!/^[a-z0-9_]+$/.test(name)) throw new BackupError("backup_invalid");
  return `"${name}"`;
}

function isPgTable(value: unknown): value is PgTable {
  if (!value || typeof value !== "object") return false;
  try {
    const name = getTableName(value as PgTable);
    if (!/^[a-z0-9_]+$/.test(name)) return false;
    getTableConfig(value as PgTable);
    return true;
  } catch {
    return false;
  }
}

/** Parents before children. Throws if two included tables reference each other in a cycle. */
export function orderTables(tables: PgTable[]): PgTable[] {
  const nameOf = (table: PgTable) => getTableName(table);
  const byName = new Map(tables.map((table) => [nameOf(table), table]));
  const deps = new Map<string, Set<string>>();
  for (const table of tables) {
    const mine = nameOf(table);
    const set = new Set<string>();
    for (const fk of getTableConfig(table).foreignKeys) {
      const foreign = getTableName(fk.reference().foreignTable);
      if (foreign !== mine && byName.has(foreign)) set.add(foreign);
    }
    deps.set(mine, set);
  }
  const indegree = new Map<string, number>();
  for (const [name, set] of deps) indegree.set(name, set.size);
  const children = new Map<string, string[]>();
  for (const [name, set] of deps) {
    for (const parent of set) {
      const list = children.get(parent) ?? [];
      list.push(name);
      children.set(parent, list);
    }
  }
  const queue = [...indegree.entries()]
    .filter(([, count]) => count === 0)
    .map(([name]) => name)
    .sort();
  const ordered: string[] = [];
  while (queue.length) {
    const name = queue.shift()!;
    ordered.push(name);
    const nextChildren = (children.get(name) ?? []).slice().sort();
    for (const child of nextChildren) {
      const next = (indegree.get(child) ?? 1) - 1;
      indegree.set(child, next);
      if (next === 0) queue.push(child);
    }
    queue.sort();
  }
  if (ordered.length !== tables.length) {
    const left = [...byName.keys()].filter((name) => !ordered.includes(name));
    throw new BackupError(`backup_cycle:${left.join(",")}`);
  }
  return ordered.map((name) => byName.get(name)!);
}

export function allTableNames(): string[] {
  return schemaTables().all.map((table) => getTableName(table)).sort();
}

export function includedTableNames(): string[] {
  return schemaTables().included.map((table) => getTableName(table)).sort();
}

export function orderedIncludedTableNames(): string[] {
  return schemaTables().ordered.map((table) => getTableName(table));
}

export function dbPackageRoot(): string {
  let dir = dirname(fileURLToPath(import.meta.url));
  for (let i = 0; i < 8; i++) {
    const root = join(dir, "packages", "db");
    if (existsSync(join(root, "drizzle", "meta", "_journal.json"))) return root;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new BackupError("backup_invalid");
}

export function latestMigrationTag(): string {
  if (migrationTagCache) return migrationTagCache;
  const journalPath = join(dbPackageRoot(), "drizzle", "meta", "_journal.json");
  const journal = JSON.parse(readFileSync(journalPath, "utf8")) as Journal;
  const tag = journal.entries?.at(-1)?.tag;
  if (!tag) throw new BackupError("backup_invalid");
  migrationTagCache = tag;
  return tag;
}

export function backupWarningNeeded(lastDownloadedAt: string | null | undefined, now = Date.now()): boolean {
  if (!lastDownloadedAt) return true;
  const at = Date.parse(lastDownloadedAt);
  if (Number.isNaN(at)) return true;
  return now - at > BACKUP_STALE_MS;
}

export function assertRestoreConfirm(value: unknown): void {
  if (value !== RESTORE_CONFIRM) throw new BackupError("confirm_required");
}

export function assertBackupSize(byteLength: number): void {
  if (byteLength > MAX_BACKUP_BYTES) throw new BackupError("backup_too_large");
}

export function backupFilename(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `eduforge-backup-${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}-${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}.json.gz`;
}

function serializeRow(row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) {
    out[key] = value instanceof Date ? value.toISOString() : value;
  }
  return out;
}

export function reviveRow(table: PgTable, row: Record<string, unknown>): Record<string, unknown> {
  const cols = getTableColumns(table);
  const out: Record<string, unknown> = {};
  for (const [key, col] of Object.entries(cols)) {
    if (!Object.prototype.hasOwnProperty.call(row, key)) continue;
    const value = row[key];
    if (value === null) {
      out[key] = null;
      continue;
    }
    if (TIME_COLUMNS.has(String(col.columnType))) {
      const date = value instanceof Date ? value : new Date(String(value));
      if (Number.isNaN(date.getTime())) throw new BackupError("backup_invalid");
      out[key] = date;
      continue;
    }
    out[key] = value;
  }
  if (Object.keys(out).length === 0) throw new BackupError("backup_invalid");
  return out;
}

export function parseAndAssert(gz: Buffer, expectedTag = latestMigrationTag()): InstanceBackup {
  assertBackupSize(gz.length);
  let json: string;
  try {
    json = gunzipSync(gz).toString("utf8");
  } catch {
    throw new BackupError("backup_invalid");
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new BackupError("backup_invalid");
  }
  if (!parsed || typeof parsed !== "object") throw new BackupError("backup_invalid");
  const payload = parsed as Partial<InstanceBackup>;
  if (payload.format !== BACKUP_FORMAT) throw new BackupError("backup_invalid");
  if (payload.formatVersion !== BACKUP_FORMAT_VERSION) throw new BackupError("backup_version_mismatch");
  if (payload.migrationTag !== expectedTag) throw new BackupError("backup_version_mismatch");
  if (!payload.tables || typeof payload.tables !== "object" || Array.isArray(payload.tables)) {
    throw new BackupError("backup_invalid");
  }
  return payload as InstanceBackup;
}

export function assertTableSet(payload: InstanceBackup): void {
  const included = includedTableNames();
  const keys = Object.keys(payload.tables).sort();
  if (keys.length !== included.length || keys.some((key, i) => key !== included[i])) {
    throw new BackupError("backup_invalid");
  }
  for (const name of included) {
    if (!Array.isArray(payload.tables[name])) throw new BackupError("backup_invalid");
  }
  for (const name of EXCLUDED) {
    if (name in payload.tables) throw new BackupError("backup_invalid");
  }
}

async function readTables(db: Db): Promise<Record<string, Record<string, unknown>[]>> {
  const { ordered } = schemaTables();
  const dumped: Record<string, Record<string, unknown>[]> = {};
  for (const table of ordered) {
    const rows = await db.select().from(table as never);
    dumped[getTableName(table)] = (rows as Record<string, unknown>[]).map(serializeRow);
  }
  return dumped;
}

export async function buildGzip(db: Db, exportedAt = new Date()): Promise<Buffer> {
  const tables = await readTables(db);
  const payload: InstanceBackup = {
    format: BACKUP_FORMAT,
    formatVersion: BACKUP_FORMAT_VERSION,
    migrationTag: latestMigrationTag(),
    exportedAt: exportedAt.toISOString(),
    tables,
  };
  return gzipSync(Buffer.from(JSON.stringify(payload)));
}

export async function markDownloaded(db: Db, at = new Date()): Promise<string> {
  const value = { lastDownloadedAt: at.toISOString() };
  await db
    .insert(platformSettings)
    .values({ key: BACKUP_SETTING_KEY, value, updatedAt: at })
    .onConflictDoUpdate({
      target: platformSettings.key,
      set: { value, updatedAt: at },
    });
  return value.lastDownloadedAt;
}

/** Writes the download time first so the file itself carries that time. */
export async function createDownload(db: Db, at = new Date()): Promise<{ filename: string; body: Buffer }> {
  await markDownloaded(db, at);
  const body = await buildGzip(db, at);
  return { filename: backupFilename(at), body };
}

async function replaceFromPayload(db: Db, payload: InstanceBackup): Promise<void> {
  assertTableSet(payload);
  const { all, ordered } = schemaTables();
  const quoted = all.map((table) => quoteIdent(getTableName(table))).join(", ");
  const byName = new Map(ordered.map((table) => [getTableName(table), table]));
  await db.transaction(async (tx) => {
    await tx.execute(sql.raw(`TRUNCATE TABLE ${quoted} RESTART IDENTITY CASCADE`));
    for (const table of ordered) {
      const name = getTableName(table);
      const source = payload.tables[name] ?? [];
      if (source.length === 0) continue;
      const revived = source.map((row) => reviveRow(byName.get(name) ?? table, row));
      for (let i = 0; i < revived.length; i += INSERT_CHUNK) {
        const chunk = revived.slice(i, i + INSERT_CHUNK);
        await tx.insert(table).values(chunk as never);
      }
    }
  });
}

function safetyFile(dir: string): string {
  return join(dir, "safety.json.gz");
}

function safetyTmp(dir: string): string {
  return `${safetyFile(dir)}.tmp`;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/** If a commit died after deleting the destination, the temp file is the safety copy. */
async function promoteTmpIfNeeded(dir: string): Promise<void> {
  const dest = safetyFile(dir);
  const tmp = safetyTmp(dir);
  if (await fileExists(dest)) return;
  if (await fileExists(tmp)) {
    try {
      await rename(tmp, dest);
    } catch {
      /* a concurrent writer owns the temp file */
    }
  }
}

export async function safetyAvailable(dir: string): Promise<boolean> {
  await promoteTmpIfNeeded(dir);
  return fileExists(safetyFile(dir));
}

async function writeCurrentToTemp(db: Db, dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });
  const body = await buildGzip(db);
  await writeFile(safetyTmp(dir), body);
}

async function commitSafety(dir: string): Promise<void> {
  const dest = safetyFile(dir);
  const tmp = safetyTmp(dir);
  // Windows rename cannot replace an existing file. Delete first; if we crash
  // here, promoteTmpIfNeeded picks up the temp file on the next read.
  await rm(dest, { force: true });
  await rename(tmp, dest);
}

async function discardTemp(dir: string): Promise<void> {
  await rm(safetyTmp(dir), { force: true });
}

async function withRestoreLock<T>(fn: () => Promise<T>): Promise<T> {
  if (restoreLock) throw new BackupError("backup_busy");
  restoreLock = true;
  try {
    return await fn();
  } finally {
    restoreLock = false;
  }
}

export async function restoreUploaded(db: Db, gz: Buffer, dir: string): Promise<void> {
  const payload = parseAndAssert(gz);
  assertTableSet(payload);
  await withRestoreLock(async () => {
    await writeCurrentToTemp(db, dir);
    try {
      await replaceFromPayload(db, payload);
      await commitSafety(dir);
    } catch (err) {
      await discardTemp(dir);
      throw err;
    }
  });
}

export async function undoLastRestore(db: Db, dir: string): Promise<void> {
  await withRestoreLock(async () => {
    await promoteTmpIfNeeded(dir);
    let gz: Buffer;
    try {
      gz = await readFile(safetyFile(dir));
    } catch {
      throw new BackupError("safety_missing");
    }
    const payload = parseAndAssert(gz);
    assertTableSet(payload);
    await writeCurrentToTemp(db, dir);
    try {
      await replaceFromPayload(db, payload);
      await commitSafety(dir);
    } catch (err) {
      await discardTemp(dir);
      throw err;
    }
  });
}

export async function readDownloadStatus(db: Db, dir: string): Promise<{
  lastDownloadedAt: string | null;
  safetyAvailable: boolean;
  warning: boolean;
  migrationTag: string;
}> {
  const [row] = await db
    .select({ value: platformSettings.value })
    .from(platformSettings)
    .where(eq(platformSettings.key, BACKUP_SETTING_KEY))
    .limit(1);
  const raw = row?.value?.lastDownloadedAt;
  const lastDownloadedAt = typeof raw === "string" ? raw : null;
  return {
    lastDownloadedAt,
    safetyAvailable: await safetyAvailable(dir),
    warning: backupWarningNeeded(lastDownloadedAt),
    migrationTag: latestMigrationTag(),
  };
}

/** Test hook. Production code never calls this. */
export function resetRestoreLockForTests(): void {
  restoreLock = false;
}
