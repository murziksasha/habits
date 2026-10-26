/**
 * Roundtrip against a throwaway database on the same Postgres as DATABASE_URL.
 * Does not write to the app database. Skip with SKIP_INTEGRATION=1.
 */
import { createRequire } from "node:module";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import {
  characters,
  courses,
  lessons,
  sessions,
  units,
  userLessonProgress,
  users,
  type Db,
} from "@eduforge/db";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createDownload,
  dbPackageRoot,
  parseAndAssert,
  restoreUploaded,
  undoLastRestore,
} from "./services/instance-backup.js";

const skip = process.env.SKIP_INTEGRATION === "1";
const describeIntegration = skip ? describe.skip : describe;
const DB_NAME = "eduforge_backup_roundtrip";

async function loadPostgres() {
  const dbRoot = dbPackageRoot();
  const requireFromDb = createRequire(join(dbRoot, "package.json"));
  const entry = requireFromDb.resolve("postgres");
  const mod = (await import(pathToFileURL(entry).href)) as {
    default: (url: string, opts?: { max?: number }) => SqlClient;
  };
  return { postgres: mod.default, migrationsFolder: join(dbRoot, "drizzle") };
}

type SqlClient = {
  unsafe: (query: string) => Promise<unknown>;
  end: () => Promise<void>;
};

function withDatabase(url: string, name: string): string {
  const parsed = new URL(url);
  parsed.pathname = `/${name}`;
  return parsed.toString();
}

describeIntegration("instance backup roundtrip", () => {
  let admin: SqlClient | null = null;
  let client: SqlClient | null = null;
  let testDb: Db | null = null;
  let dir = "";
  let userId = "";
  let lessonId = "";
  const email = "backup-roundtrip@eduforge.test";

  beforeAll(async () => {
    const url =
      process.env.DATABASE_URL ?? "postgresql://eduforge:eduforge@localhost:5433/eduforge";
    const { postgres, migrationsFolder } = await loadPostgres();
    admin = postgres(url, { max: 1 });
    await admin.unsafe(`DROP DATABASE IF EXISTS ${DB_NAME} WITH (FORCE)`);
    await admin.unsafe(`CREATE DATABASE ${DB_NAME}`);
    client = postgres(withDatabase(url, DB_NAME), { max: 1 });
    const orm = drizzle(client as never);
    await migrate(orm, { migrationsFolder });
    testDb = orm as unknown as Db;

    const [user] = await testDb
      .insert(users)
      .values({
        email,
        passwordHash: "hash-from-source",
        role: "admin",
        emailVerifiedAt: new Date("2026-01-01T00:00:00.000Z"),
      })
      .returning();
    userId = user!.id;
    await testDb.insert(characters).values({
      userId,
      displayName: "Backup",
      globalXp: 100,
    });
    const [course] = await testDb
      .insert(courses)
      .values({
        slug: "backup-course",
        titleUk: "Backup",
        descriptionUk: "Backup",
        icon: "💾",
        color: "#000",
      })
      .returning();
    const [unit] = await testDb
      .insert(units)
      .values({ courseId: course!.id, slug: "u", titleUk: "U" })
      .returning();
    const [lesson] = await testDb
      .insert(lessons)
      .values({
        unitId: unit!.id,
        courseId: course!.id,
        slug: "l",
        titleUk: "L",
        exercises: [],
      })
      .returning();
    lessonId = lesson!.id;
    await testDb.insert(userLessonProgress).values({
      userId,
      lessonId,
      courseId: course!.id,
      status: "completed",
      bestScore: 1,
      attempts: 1,
      completedAt: new Date("2026-02-01T00:00:00.000Z"),
    });
    await testDb.insert(sessions).values({
      userId,
      tokenHash: "session-should-die",
      expiresAt: new Date("2027-01-01T00:00:00.000Z"),
    });
    dir = await mkdtemp(join(tmpdir(), "eduforge-backup-it-"));
  }, 120_000);

  afterAll(async () => {
    if (dir) await rm(dir, { recursive: true, force: true });
    await client?.end();
    if (admin) {
      await admin.unsafe(`DROP DATABASE IF EXISTS ${DB_NAME} WITH (FORCE)`);
      await admin.end();
    }
  });

  it("restores xp and passed lessons, drops sessions, and undoes", async () => {
    if (!testDb) throw new Error("database was not created");
    const { body } = await createDownload(testDb);
    const parsed = parseAndAssert(body);
    expect(parsed.tables.sessions).toBeUndefined();
    expect(parsed.tables.users.some((row) => row.email === email)).toBe(true);

    await testDb.update(characters).set({ globalXp: 5 }).where(eq(characters.userId, userId));
    await restoreUploaded(testDb, body, dir);

    const [restored] = await testDb
      .select()
      .from(characters)
      .where(eq(characters.userId, userId));
    expect(restored?.globalXp).toBe(100);
    const [progress] = await testDb
      .select()
      .from(userLessonProgress)
      .where(eq(userLessonProgress.userId, userId));
    expect(progress?.lessonId).toBe(lessonId);
    expect(progress?.status).toBe("completed");
    const [account] = await testDb.select().from(users).where(eq(users.id, userId));
    expect(account?.passwordHash).toBe("hash-from-source");
    const liveSessions = await testDb.select().from(sessions);
    expect(liveSessions).toHaveLength(0);

    await undoLastRestore(testDb, dir);
    const [undone] = await testDb
      .select()
      .from(characters)
      .where(eq(characters.userId, userId));
    expect(undone?.globalXp).toBe(5);
    expect(await testDb.select().from(sessions)).toHaveLength(0);
  });
});
