import { createHash } from "node:crypto";
import { and, eq } from "drizzle-orm";
import {
  chessContent,
  cssLayoutContent,
  englishContent,
  FLASHCARD_DECKS,
  htmlSemanticsContent,
  jsFundamentalsContent,
  logicContent,
  programmingContent,
  qaTheoryContent,
  reactFundamentalsContent,
  speedReadingContent,
  sqlFundamentalsContent,
  nodeFundamentalsContent,
  expressFundamentalsContent,
  embeddedCppContent,
  sysadminContent,
  devopsContent,
  typingContent,
  typescriptContent,
  softwareTestingContent,
  postgresqlAppsContent,
  gitWorkflowsContent,
  webSecurityContent,
  aiDevelopmentContent,
  pythonForAiContent,
  agenticSystemsContent,
  llmopsContent,
  aiSecurityContent,
  aiProductContent,
  nextjsFullstackContent,
  appliedAlgorithmsContent,
  goFundamentalsContent,
  webAccessibilityContent,
  restApiDesignContent,
  frontendPerformanceContent,
  browserWebApisContent,
  electricalEngineeringContent,
  type CourseContent,
} from "@eduforge/content";
import bcrypt from "bcryptjs";
import { createDb } from "./client.js";
import { selectFlashcardInserts } from "./seed-flashcards.js";
import { ACHIEVEMENT_CATALOG, puzzleRatingFromDifficulty, resolveCourseGroup, seedAllowed } from "@eduforge/shared";
import {
  achievements,
  characters,
  chessRatings,
  chessPuzzleStats,
  courses,
  flashcardDecks,
  flashcards,
  lessons,
  units,
  users,
} from "./schema.js";

export const allCourses: CourseContent[] = [
  englishContent,
  chessContent,
  typingContent,
  speedReadingContent,
  logicContent,
  programmingContent,
  typescriptContent,
  htmlSemanticsContent,
  cssLayoutContent,
  qaTheoryContent,
  jsFundamentalsContent,
  reactFundamentalsContent,
  sqlFundamentalsContent,
  nodeFundamentalsContent,
  expressFundamentalsContent,
  embeddedCppContent,
  sysadminContent,
  devopsContent,
  softwareTestingContent,
  postgresqlAppsContent,
  gitWorkflowsContent,
  webSecurityContent,
  aiDevelopmentContent,
  pythonForAiContent,
  agenticSystemsContent,
  llmopsContent,
  aiSecurityContent,
  aiProductContent,
  nextjsFullstackContent,
  appliedAlgorithmsContent,
  goFundamentalsContent,
  webAccessibilityContent,
  restApiDesignContent,
  frontendPerformanceContent,
  browserWebApisContent,
  electricalEngineeringContent,
];

export async function seedCourse(
  db: ReturnType<typeof createDb>,
  content: CourseContent,
  sortOrder: number,
) {
  let course = await db.query.courses.findFirst({
    where: eq(courses.slug, content.slug),
  });

  const category = resolveCourseGroup(content.slug);

  if (!course) {
    const [created] = await db
      .insert(courses)
      .values({
        slug: content.slug,
        titleUk: content.titleUk,
        titleEn: content.titleEn,
        descriptionUk: content.descriptionUk,
        descriptionEn: content.descriptionEn,
        icon: content.icon,
        color: content.color,
        sortOrder,
        status: "published",
        category,
        contentSource: "seed",
        publishedAt: new Date(),
      })
      .returning();
    course = created;
    console.log(`Created course ${content.slug}`);
  } else if (course.contentSource === "cms") {
    console.log(`Skip seed overwrite for CMS course ${content.slug}`);
    return;
  } else {
    await db
      .update(courses)
      .set({
        titleUk: content.titleUk,
        titleEn: content.titleEn,
        descriptionUk: content.descriptionUk,
        descriptionEn: content.descriptionEn,
        icon: content.icon,
        color: content.color,
        sortOrder,
        category,
        contentSource: "seed",
      })
      .where(eq(courses.id, course.id));
  }

  for (const [ui, unit] of content.units.entries()) {
    let u = (
      await db
        .select()
        .from(units)
        .where(and(eq(units.courseId, course.id), eq(units.slug, unit.slug)))
        .limit(1)
    )[0];

    if (!u) {
      const [created] = await db
        .insert(units)
        .values({
          courseId: course.id,
          slug: unit.slug,
          titleUk: unit.titleUk,
          titleEn: unit.titleEn ?? unit.titleUk,
          sortOrder: ui,
        })
        .returning();
      u = created;
    } else {
      await db
        .update(units)
        .set({
          titleUk: unit.titleUk,
          titleEn: unit.titleEn ?? unit.titleUk,
          sortOrder: ui,
        })
        .where(eq(units.id, u.id));
    }

    for (const [li, lesson] of unit.lessons.entries()) {
      const existing = (
        await db
          .select()
          .from(lessons)
          .where(and(eq(lessons.unitId, u.id), eq(lessons.slug, lesson.slug)))
          .limit(1)
      )[0];

      if (!existing) {
        await db.insert(lessons).values({
          unitId: u.id,
          courseId: course.id,
          slug: lesson.slug,
          titleUk: lesson.titleUk,
          titleEn: lesson.titleEn ?? lesson.titleUk,
          sortOrder: li,
          baseXp: lesson.baseXp,
          difficulty: lesson.difficulty,
          isFree: lesson.isFree ?? false,
          isExam: lesson.isExam ?? false,
          passThreshold: lesson.passThreshold ?? null,
          contentVersion: lesson.contentVersion ?? 1,
          exercises: lesson.exercises,
        });
        console.log(`  + lesson ${content.slug}/${unit.slug}/${lesson.slug}`);
      } else {
        await db
          .update(lessons)
          .set({
            titleUk: lesson.titleUk,
            titleEn: lesson.titleEn ?? lesson.titleUk,
            sortOrder: li,
            baseXp: lesson.baseXp,
            difficulty: lesson.difficulty,
            isFree: lesson.isFree ?? false,
            isExam: lesson.isExam ?? false,
            passThreshold: lesson.passThreshold ?? null,
            contentVersion: lesson.contentVersion ?? 1,
            exercises: lesson.exercises,
          })
          .where(eq(lessons.id, existing.id));
      }
    }
  }
  console.log(`Seeded course ${content.slug}`);
}

type PuzzleStatSeed = { exerciseId: string; lessonSlug: string; unitSlug: string; rating: number; themes: string[] };

/** Rating seeds for every chess_puzzle in a course (content rating, else difficulty band). */
export function chessPuzzleStatSeeds(content: (typeof allCourses)[number]): PuzzleStatSeed[] {
  const out: PuzzleStatSeed[] = [];
  for (const unit of content.units) {
    for (const lesson of unit.lessons) {
      for (const ex of lesson.exercises as Array<Record<string, unknown>>) {
        if (ex.type !== "chess_puzzle" || typeof ex.id !== "string") continue;
        const rating = typeof ex.rating === "number" ? ex.rating : puzzleRatingFromDifficulty(Number(ex.difficulty ?? 1));
        out.push({
          exerciseId: ex.id,
          lessonSlug: lesson.slug,
          unitSlug: unit.slug,
          rating,
          themes: Array.isArray(ex.themes) ? (ex.themes as string[]) : [],
        });
      }
    }
  }
  return out;
}

/** Insert-only: existing puzzle ratings are never overwritten (themes/lesson refreshed). */
export async function seedChessPuzzleStats(db: ReturnType<typeof createDb>) {
  const course = (await db.select().from(courses).where(eq(courses.slug, chessContent.slug)).limit(1))[0];
  if (!course) return;
  const unitRows = await db.select().from(units).where(eq(units.courseId, course.id));
  const lessonRows = await db.select({ id: lessons.id, slug: lessons.slug, unitId: lessons.unitId }).from(lessons).where(eq(lessons.courseId, course.id));
  const unitBySlug = new Map(unitRows.map((u) => [u.slug, u.id]));
  const lessonKey = new Map(lessonRows.map((l) => [`${l.unitId}/${l.slug}`, l.id]));
  const seeds = chessPuzzleStatSeeds(chessContent);
  for (const s of seeds) {
    const lessonId = lessonKey.get(`${unitBySlug.get(s.unitSlug)}/${s.lessonSlug}`) ?? null;
    await db
      .insert(chessPuzzleStats)
      .values({ exerciseId: s.exerciseId, lessonId, rating: s.rating, themes: s.themes })
      .onConflictDoUpdate({ target: chessPuzzleStats.exerciseId, set: { lessonId, themes: s.themes } });
  }
  console.log(`Chess puzzle stats synced (${seeds.length} puzzles)`);
}

export async function seedFlashcards(db: ReturnType<typeof createDb>) {
  for (const deck of FLASHCARD_DECKS) {
    let d = await db.query.flashcardDecks.findFirst({
      where: eq(flashcardDecks.slug, deck.slug),
    });
    if (!d) {
      const [created] = await db
        .insert(flashcardDecks)
        .values({
          slug: deck.slug,
          titleUk: deck.titleUk,
          titleEn: deck.titleEn,
          descriptionUk: deck.descriptionUk,
          descriptionEn: deck.descriptionEn,
          courseSlug: deck.courseSlug,
          isSystem: true,
        })
        .returning();
      d = created;
      console.log(`Created deck ${deck.slug}`);
    } else {
      await db
        .update(flashcardDecks)
        .set({
          titleUk: deck.titleUk,
          titleEn: deck.titleEn,
          descriptionUk: deck.descriptionUk,
          descriptionEn: deck.descriptionEn,
          courseSlug: deck.courseSlug,
        })
        .where(eq(flashcardDecks.id, d.id));
    }

    const existingCards = await db.query.flashcards.findMany({
      where: eq(flashcards.deckId, d.id),
    });
    const missingCards = selectFlashcardInserts(deck, existingCards);
    if (missingCards.length > 0) {
      for (const card of missingCards) {
        await db.insert(flashcards).values({
          deckId: d.id,
          front: card.front,
          back: card.back,
          hint: card.hint ?? "",
          tags: card.tags ?? [],
          sortOrder: card.sortOrder,
        });
      }
      console.log(`  + ${missingCards.length} cards in ${deck.slug}`);
    }
  }
}

async function seedAdmin(db: ReturnType<typeof createDb>) {
  const email = process.env.ADMIN_EMAIL ?? "admin@eduforge.ua";
  const password = process.env.ADMIN_PASSWORD ?? "admin12345";
  let user = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (!user) {
    const passwordHash = await bcrypt.hash(password, 10);
    const [created] = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        role: "admin",
        emailVerifiedAt: new Date(),
      })
      .returning();
    user = created;
    await db.insert(characters).values({
      userId: user.id,
      displayName: "Адмін",
      avatarKey: "admin",
    });
    await db.insert(chessRatings).values({ userId: user.id });
    console.log(`Admin created: ${email} / ${password}`);
  } else if (user.role !== "admin") {
    await db.update(users).set({ role: "admin" }).where(eq(users.id, user.id));
    console.log(`Promoted ${email} to admin`);
  } else {
    console.log(`Admin exists: ${email}`);
  }

  // Optional: pre-enroll admin TOTP for local/e2e (base32 secret)
  // Default test secret is well-known; set SEED_ADMIN_TOTP_SECRET empty to skip.
  const totpSecret =
    process.env.SEED_ADMIN_TOTP_SECRET ??
    (process.env.NODE_ENV === "production" ? "" : "JBSWY3DPEHPK3PXP");
  if (totpSecret && user) {
    // Known backup code for e2e: SEED_ADMIN_BACKUP_CODE or AAAA-BBBB
    const backupPlain = process.env.SEED_ADMIN_BACKUP_CODE ?? "AAAA-BBBB";
    const backupHash = createHash("sha256")
      .update(`backup:${backupPlain.replace(/[\s-]/g, "").toUpperCase()}`)
      .digest("hex");
    if (!user.totpEnabled) {
      await db
        .update(users)
        .set({
          totpSecretEnc: `plain:${totpSecret}`,
          totpEnabled: true,
          totpVerifiedAt: new Date(),
          mfaBackupCodeHashes: [backupHash],
        })
        .where(eq(users.id, user.id));
      console.log(
        `Admin TOTP seeded (secret default/test); backup code: ${backupPlain}`,
      );
    } else {
      // Dev/docker: always restore the known backup code (consumed codes leave empty/missing hash)
      const hashes = Array.isArray(user.mfaBackupCodeHashes)
        ? (user.mfaBackupCodeHashes as string[])
        : [];
      if (!hashes.includes(backupHash)) {
        await db
          .update(users)
          .set({
            mfaBackupCodeHashes: [...hashes, backupHash],
            updatedAt: new Date(),
          })
          .where(eq(users.id, user.id));
        console.log(`Admin backup code seeded: ${backupPlain}`);
      } else {
        console.log(`Admin TOTP already enrolled; backup code: ${backupPlain}`);
      }
    }
  }
}

export async function seedAchievements(db: ReturnType<typeof createDb>) {
  for (const a of ACHIEVEMENT_CATALOG) {
    const existing = await db.query.achievements.findFirst({
      where: eq(achievements.code, a.code),
    });
    if (!existing) {
      await db.insert(achievements).values(a);
      console.log(`  + achievement ${a.code}`);
    }
  }
}

async function main() {
  const { loadRootEnv } = await import("./load-env.js");
  loadRootEnv();
  if (!seedAllowed(process.env)) {
    console.error(
      "Refusing to seed production (demo admin passwords). Set ALLOW_PROD_SEED=1 to override.",
    );
    process.exit(1);
  }
  const db = createDb();
  // Users first so accounts exist even if a course seed fails (e.g. missing enum value).
  await seedAdmin(db);
  for (const [i, c] of allCourses.entries()) {
    await seedCourse(db, c, i);
  }
  await seedAchievements(db);
  await seedFlashcards(db);
  await seedChessPuzzleStats(db);
  console.log("Seed complete");
  process.exit(0);
}

const seedEntrypoint = process.argv[1]?.replace(/\\/g, "/") ?? "";
const launchedAsCli = seedEntrypoint.endsWith("/seed.ts") || seedEntrypoint.endsWith("/seed.js");

if (launchedAsCli) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
