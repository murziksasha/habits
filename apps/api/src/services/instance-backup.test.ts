import { gzipSync } from "node:zlib";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { getTableColumns } from "drizzle-orm";
import { users } from "@eduforge/db";
import { afterEach, describe, expect, it } from "vitest";
import {
  BACKUP_FORMAT,
  BACKUP_FORMAT_VERSION,
  BACKUP_STALE_MS,
  BackupError,
  EXCLUDED_TABLES,
  MAX_BACKUP_BYTES,
  allTableNames,
  assertBackupSize,
  assertRestoreConfirm,
  backupWarningNeeded,
  includedTableNames,
  latestMigrationTag,
  orderedIncludedTableNames,
  parseAndAssert,
  resetRestoreLockForTests,
  restoreUploaded,
  safetyAvailable,
} from "./instance-backup.js";

function thrown(fn: () => void): string {
  try {
    fn();
  } catch (err) {
    return err instanceof BackupError ? err.code : "not-backup-error";
  }
  return "did-not-throw";
}

function gzipJson(value: unknown): Buffer {
  return gzipSync(Buffer.from(JSON.stringify(value)));
}

function emptyPayload(tag = latestMigrationTag()) {
  return {
    format: BACKUP_FORMAT,
    formatVersion: BACKUP_FORMAT_VERSION,
    migrationTag: tag,
    exportedAt: "2026-10-25T00:00:00.000Z",
    tables: Object.fromEntries(includedTableNames().map((name) => [name, []])),
  };
}

describe("instance backup", () => {
  afterEach(() => {
    resetRestoreLockForTests();
  });

  it("leaves one-time secret tables out of the payload shape", () => {
    const included = includedTableNames();
    const all = allTableNames();
    for (const name of EXCLUDED_TABLES) {
      expect(included).not.toContain(name);
      expect(all).toContain(name);
    }
    expect(new Set([...included, ...EXCLUDED_TABLES]).size).toBe(all.length);
    expect(included).toContain("users");
    expect(included).toContain("characters");
    expect(included).toContain("user_lesson_progress");
    expect(included).toContain("lessons");
    const payload = emptyPayload();
    const gz = gzipJson(payload);
    const parsed = parseAndAssert(gz);
    for (const name of EXCLUDED_TABLES) {
      expect(parsed.tables[name]).toBeUndefined();
    }
  });

  it("orders parents before lesson progress", () => {
    const names = orderedIncludedTableNames();
    expect(names.indexOf("users")).toBeLessThan(names.indexOf("characters"));
    expect(names.indexOf("courses")).toBeLessThan(names.indexOf("lessons"));
    expect(names.indexOf("lessons")).toBeLessThan(names.indexOf("user_lesson_progress"));
    for (const name of EXCLUDED_TABLES) expect(names).not.toContain(name);
  });

  it("refuses a bad gzip, a wrong migration, and a wrong confirm before any safety file", async () => {
    const dir = await mkdtemp(join(tmpdir(), "eduforge-backup-"));
    try {
      expect(thrown(() => parseAndAssert(Buffer.from("not-gzip")))).toBe("backup_invalid");
      const wrong = gzipJson({ ...emptyPayload(), migrationTag: "0000_not_this_app" });
      expect(thrown(() => parseAndAssert(wrong))).toBe("backup_version_mismatch");
      const wrongVersion = gzipJson({ ...emptyPayload(), formatVersion: 99 });
      expect(thrown(() => parseAndAssert(wrongVersion))).toBe("backup_version_mismatch");
      expect(() => assertRestoreConfirm("restore")).toThrow(BackupError);
      expect(() => assertRestoreConfirm("RESTORE")).not.toThrow();
      await expect(restoreUploaded(null as never, wrong, dir)).rejects.toMatchObject({
        code: "backup_version_mismatch",
      });
      expect(await safetyAvailable(dir)).toBe(false);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("warns until a download exists and again after 7 days", () => {
    const now = Date.parse("2026-10-25T00:00:00.000Z");
    expect(backupWarningNeeded(null, now)).toBe(true);
    expect(backupWarningNeeded("not-a-date", now)).toBe(true);
    expect(backupWarningNeeded(new Date(now - 8 * 86_400_000).toISOString(), now)).toBe(true);
    expect(backupWarningNeeded(new Date(now - BACKUP_STALE_MS).toISOString(), now)).toBe(false);
    expect(backupWarningNeeded(new Date(now - BACKUP_STALE_MS - 1).toISOString(), now)).toBe(true);
    expect(backupWarningNeeded(new Date(now - 86_400_000).toISOString(), now)).toBe(false);
  });

  it("refuses an oversized body without allocating the cap", () => {
    expect(() => assertBackupSize(MAX_BACKUP_BYTES)).not.toThrow();
    expect(() => assertBackupSize(MAX_BACKUP_BYTES + 1)).toThrow(BackupError);
  });

  it("treats user timestamps as date columns", () => {
    const cols = getTableColumns(users);
    expect(cols.createdAt.columnType).toBe("PgTimestamp");
  });

  it("requires an admin session before backup status", async () => {
    const { createApp } = await import("../app.js");
    const app = createApp();
    const paths = app.routes
      .filter((route) => route.path.includes("backup"))
      .map((route) => `${route.method} ${route.path}`);
    expect(paths).toEqual(
      expect.arrayContaining([
        "GET /admin/backup/status",
        "GET /admin/backup/download",
        "POST /admin/backup/restore",
        "POST /admin/backup/undo",
      ]),
    );
    const status = await app.request("/admin/backup/status");
    expect(status.status).toBe(401);
  });
});
