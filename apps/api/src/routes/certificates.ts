import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import {
  certificates,
  characters,
  courses,
  lessons,
  userLessonProgress,
} from "@eduforge/db";
import { randomBytes } from "node:crypto";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity, notifyUser } from "../engagement.js";

type Vars = { user: AuthedUser };

export const certificateRoutes = new Hono<{ Variables: Vars }>();

function certCode() {
  return `EF-${randomBytes(4).toString("hex").toUpperCase()}`;
}

/** Issue certificate if user completed ≥70% of lessons in course */
export async function maybeIssueCertificate(
  userId: string,
  courseId: string,
  courseSlug: string,
  titleUk: string,
  titleEn: string,
) {
  const existing = await db.query.certificates.findFirst({
    where: and(eq(certificates.userId, userId), eq(certificates.courseId, courseId)),
  });
  if (existing) return existing;

  const allLessons = await db.query.lessons.findMany({
    where: eq(lessons.courseId, courseId),
  });
  if (allLessons.length < 3) return null;

  const completed = await db.query.userLessonProgress.findMany({
    where: and(
      eq(userLessonProgress.userId, userId),
      eq(userLessonProgress.courseId, courseId),
      eq(userLessonProgress.status, "completed"),
    ),
  });

  if (completed.length < Math.ceil(allLessons.length * 0.7)) return null;

  const [cert] = await db
    .insert(certificates)
    .values({
      userId,
      courseId,
      code: certCode(),
      titleUk: `Сертифікат: ${titleUk}`,
      titleEn: `Certificate: ${titleEn}`,
    })
    .returning();

  await notifyUser(db, userId, {
    type: "certificate",
    titleUk: "Новий сертифікат!",
    titleEn: "New certificate!",
    bodyUk: cert.titleUk,
    bodyEn: cert.titleEn,
    href: `/certificates/${cert.code}`,
  });
  await logActivity(db, userId, "certificate_earned", {
    code: cert.code,
    courseSlug,
  });

  return cert;
}

/**
 * Certificate for completing all programming mini-projects.
 * One cert per course: upgrades title if lower tier, never overwrites Path title.
 */
export async function maybeIssueMinisCertificate(userId: string, courseId: string) {
  const miniUk = "Сертифікат: Programming Minis";
  const miniEn = "Certificate: Programming Minis";
  const pathUk = "Сертифікат: Programming Path";

  const existing = await db.query.certificates.findFirst({
    where: and(eq(certificates.userId, userId), eq(certificates.courseId, courseId)),
  });

  if (existing) {
    if (existing.titleUk === pathUk || existing.titleUk === miniUk) return existing;
    // Upgrade generic programming cert to Minis pack
    const [updated] = await db
      .update(certificates)
      .set({ titleUk: miniUk, titleEn: miniEn })
      .where(eq(certificates.id, existing.id))
      .returning();
    return updated ?? existing;
  }

  const [cert] = await db
    .insert(certificates)
    .values({
      userId,
      courseId,
      code: certCode(),
      titleUk: miniUk,
      titleEn: miniEn,
    })
    .returning();

  await notifyUser(db, userId, {
    type: "certificate",
    titleUk: "Сертифікат Mini-projects!",
    titleEn: "Mini-projects certificate!",
    bodyUk: cert.titleUk,
    bodyEn: cert.titleEn,
    href: `/certificates/${cert.code}`,
  });
  await logActivity(db, userId, "certificate_earned", {
    code: cert.code,
    courseSlug: "programming",
    kind: "minis",
  });

  return cert;
}

certificateRoutes.get("/mine", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db
    .select({
      id: certificates.id,
      code: certificates.code,
      titleUk: certificates.titleUk,
      titleEn: certificates.titleEn,
      issuedAt: certificates.issuedAt,
      courseSlug: courses.slug,
      courseTitleUk: courses.titleUk,
    })
    .from(certificates)
    .innerJoin(courses, eq(courses.id, certificates.courseId))
    .where(eq(certificates.userId, user.id));
  return c.json({ certificates: rows });
});

certificateRoutes.get("/verify/:code", async (c) => {
  const code = (c.req.param("code") as string).toUpperCase();
  const cert = await db.query.certificates.findFirst({
    where: eq(certificates.code, code),
  });
  if (!cert) return c.json({ error: "not_found" }, 404);

  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, cert.userId),
  });
  const course = await db.query.courses.findFirst({
    where: eq(courses.id, cert.courseId),
  });

  return c.json({
    certificate: {
      code: cert.code,
      titleUk: cert.titleUk,
      titleEn: cert.titleEn,
      issuedAt: cert.issuedAt,
      displayName: ch?.displayName ?? "Learner",
      courseSlug: course?.slug,
      courseTitleUk: course?.titleUk,
      courseIcon: course?.icon,
    },
  });
});
