/**
 * Synchronize only built-in courses, lessons, flashcards, and achievements.
 *
 * Safety guarantees:
 * - Does NOT touch users, admins, or passwords.
 * - Does NOT drop or recreate tables.
 * - Does NOT modify courses with contentSource === 'cms'.
 * - Preserves existing lesson IDs, unit IDs, and user progress.
 * - Safe for live production updates without wiping database.
 */
import { createDb } from "./index.js";
import { allCourses, seedAchievements, seedChessPuzzleStats, seedCourse, seedFlashcards } from "./seed.js";

export async function syncBuiltinContent() {
  const { loadRootEnv } = await import("./load-env.js");
  loadRootEnv();

  console.log("Starting safe synchronization of built-in course content...");
  const db = createDb();

  for (const [i, c] of allCourses.entries()) {
    await seedCourse(db, c, i);
  }

  await seedAchievements(db);
  await seedFlashcards(db);
  await seedChessPuzzleStats(db);

  console.log("Built-in course content synchronization complete.");
}

const entry = process.argv[1]?.replace(/\\/g, "/") ?? "";
const isCli = entry.endsWith("/sync-content.ts") || entry.endsWith("/sync-content.js");

if (isCli) {
  syncBuiltinContent()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Failed to sync built-in content:", err);
      process.exit(1);
    });
}
