/**
 * Disposable check: seed sql_fundamentals twice, keep lesson ids and progress,
 * and skip a CMS-owned course. Does not touch the shared `eduforge` database.
 *
 *   pnpm --filter @eduforge/db exec tsx src/seed-stability.ts
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { sqlFundamentalsContent } from "@eduforge/content";
import { createDb } from "./client.js";
import { seedCourse } from "./seed.js";
import { courses, lessons, userLessonProgress, users } from "./schema.js";

const dbName = "eduforge_seedcheck";
const adminUrl = process.env.SEEDCHECK_ADMIN_URL ?? "postgresql://eduforge:eduforge@localhost:5433/postgres";
const url = process.env.SEEDCHECK_URL ?? `postgresql://eduforge:eduforge@localhost:5433/${dbName}`;

async function recreate() {
  const admin = postgres(adminUrl, { max: 1 });
  await admin.unsafe(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`);
  await admin.unsafe(`CREATE DATABASE ${dbName}`);
  await admin.end();
}

async function applyMigrations() {
  const client = postgres(url, { max: 1 });
  const db = drizzle(client);
  const folder = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "drizzle");
  await migrate(db, { migrationsFolder: folder });
  await client.end();
}

async function main() {
  await recreate();
  await applyMigrations();
  const db = createDb(url);
  await seedCourse(db, sqlFundamentalsContent, 0);
  const first = await db.select({ id: lessons.id, slug: lessons.slug }).from(lessons);
  const bySlug = new Map(first.map((row) => [row.slug, row.id]));
  if (bySlug.size !== 155) {
    throw new Error(`expected 155 lessons, got ${bySlug.size}`);
  }
  const course = await db.query.courses.findFirst({ where: eq(courses.slug, "sql_fundamentals") });
  if (!course) throw new Error("course missing");
  const [user] = await db
    .insert(users)
    .values({ email: "seedcheck@eduforge.test", role: "user" })
    .returning();
  const lessonId = first[0]!.id;
  await db.insert(userLessonProgress).values({
    userId: user!.id,
    lessonId,
    courseId: course.id,
    status: "completed",
    bestScore: 1,
    attempts: 1,
    completedAt: new Date(),
  });
  await seedCourse(db, sqlFundamentalsContent, 0);
  const second = await db.select({ id: lessons.id, slug: lessons.slug }).from(lessons);
  for (const row of second) {
    if (bySlug.get(row.slug) !== row.id) {
      throw new Error(`lesson id changed for ${row.slug}`);
    }
  }
  const progress = await db.query.userLessonProgress.findFirst({
    where: eq(userLessonProgress.lessonId, lessonId),
  });
  if (!progress || progress.status !== "completed" || progress.bestScore !== 1) {
    throw new Error("learner progress was not preserved");
  }
  await db
    .update(courses)
    .set({ contentSource: "cms", titleUk: "CMS keeps this title" })
    .where(eq(courses.id, course.id));
  await seedCourse(db, sqlFundamentalsContent, 0);
  const after = await db.query.courses.findFirst({ where: eq(courses.id, course.id) });
  if (after?.titleUk !== "CMS keeps this title") {
    throw new Error("CMS course was overwritten");
  }
  console.log("seed stability ok", { lessons: second.length, progress: progress.id });
}

main()
  .then(async () => {
    const admin = postgres(adminUrl, { max: 1 });
    await admin.unsafe(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`);
    await admin.end();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error(err);
    try {
      const admin = postgres(adminUrl, { max: 1 });
      await admin.unsafe(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`);
      await admin.end();
    } catch {
      /* leave the disposable database if the server is down */
    }
    process.exit(1);
  });
