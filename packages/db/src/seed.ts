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
  typingContent,
  typescriptContent,
  type CourseContent,
} from "@eduforge/content";
import bcrypt from "bcryptjs";
import { createDb } from "./client.js";
import { ACHIEVEMENT_CATALOG } from "@eduforge/shared";
import { seedAllowed } from "@eduforge/shared";
import {
  achievements,
  characters,
  chessRatings,
  courses,
  flashcardDecks,
  flashcards,
  lessons,
  units,
  users,
} from "./schema.js";

const allCourses: CourseContent[] = [
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
];

async function seedCourse(
  db: ReturnType<typeof createDb>,
  content: CourseContent,
  sortOrder: number,
) {
  let course = await db.query.courses.findFirst({
    where: eq(courses.slug, content.slug),
  });

  const category =
    content.slug === "chess"
      ? "chess"
      : content.slug === "programming"
        ? "code"
        : [
              "typescript",
              "html_semantics",
              "css_layout",
              "qa_theory",
              "js_fundamentals",
              "react_fundamentals",
              "sql_fundamentals",
              "node_fundamentals",
              "express_fundamentals",
              "embedded_cpp",
            ].includes(content.slug)
          ? "deep"
          : "skill";

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
        status: "published",
        category,
        contentSource: "seed",
        publishedAt: course.publishedAt ?? new Date(),
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
            exercises: lesson.exercises,
          })
          .where(eq(lessons.id, existing.id));
      }
    }
  }
  console.log(`Seeded course ${content.slug}`);
}

async function seedFlashcards(db: ReturnType<typeof createDb>) {
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
    if (existingCards.length === 0) {
      for (const [i, card] of deck.cards.entries()) {
        await db.insert(flashcards).values({
          deckId: d.id,
          front: card.front,
          back: card.back,
          hint: card.hint ?? "",
          tags: card.tags ?? [],
          sortOrder: i,
        });
      }
      console.log(`  + ${deck.cards.length} cards in ${deck.slug}`);
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
        plan: "premium",
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
    await db.update(users).set({ role: "admin", plan: "premium" }).where(eq(users.id, user.id));
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
    } else if (!(user.mfaBackupCodeHashes?.length)) {
      await db
        .update(users)
        .set({ mfaBackupCodeHashes: [backupHash], updatedAt: new Date() })
        .where(eq(users.id, user.id));
      console.log(`Admin backup code seeded: ${backupPlain}`);
    }
  }
}

/** Demo premium user for local / Docker testing (not admin). */
async function seedPremiumTestUser(db: ReturnType<typeof createDb>) {
  const email = process.env.TEST_USER_EMAIL ?? "premium@eduforge.ua";
  const password = process.env.TEST_USER_PASSWORD ?? "premium12345";
  let user = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (!user) {
    const passwordHash = await bcrypt.hash(password, 10);
    const [created] = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        role: "user",
        plan: "premium",
        emailVerifiedAt: new Date(),
      })
      .returning();
    user = created;
    await db.insert(characters).values({
      userId: user.id,
      displayName: "Premium Test",
      avatarKey: "default",
    });
    await db.insert(chessRatings).values({ userId: user.id });
    console.log(`Premium test user created: ${email} / ${password}`);
  } else if (user.plan !== "premium") {
    await db.update(users).set({ plan: "premium" }).where(eq(users.id, user.id));
    console.log(`Upgraded ${email} to premium`);
  } else {
    console.log(`Premium test user exists: ${email}`);
  }
}

async function seedAchievements(db: ReturnType<typeof createDb>) {
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
      "Refusing to seed production (demo admin/premium passwords). Set ALLOW_PROD_SEED=1 to override.",
    );
    process.exit(1);
  }
  const db = createDb();
  // Users first so accounts exist even if a course seed fails (e.g. missing enum value).
  await seedAdmin(db);
  await seedPremiumTestUser(db);
  for (const [i, c] of allCourses.entries()) {
    await seedCourse(db, c, i);
  }
  await seedAchievements(db);
  await seedFlashcards(db);
  console.log("Seed complete");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
