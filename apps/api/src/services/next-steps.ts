import { and, asc, desc, eq, inArray } from "drizzle-orm";
import {
  characters,
  courses,
  lessons,
  placementResults,
  userCourseProgress,
  userLessonProgress,
} from "@eduforge/db";
import {
  adaptiveScore,
  applyLevelUps,
  DEFAULT_ADAPTIVE_WEIGHTS,
  isoWeekBounds,
  loadAdaptiveWeights,
  normalizeProgression,
  PROGRAMMING_MINI_LESSON_SLUGS,
  weeklyMinisRaceSlugs,
} from "@eduforge/shared";
import { db } from "../db.js";
import { getSpacedReviewLessons, getWeakLessons, masteryPriority } from "./mastery.js";

export type NextRecommendation = {
  kind: string;
  titleUk: string;
  titleEn: string;
  href: string;
  priority: number;
  meta?: Record<string, unknown>;
};

export type NextStepsResult = {
  recommendations: NextRecommendation[];
  placement: typeof placementResults.$inferSelect | null | undefined;
  progPlacement: typeof placementResults.$inferSelect | null | undefined;
};

export type NextStepsPrefetch = {
  courses?: (typeof courses.$inferSelect)[];
  lessonProgress?: (typeof userLessonProgress.$inferSelect)[];
  courseProgress?: {
    courseId: string;
    lastLessonId: string | null;
    slug: string;
    titleUk: string;
    titleEn: string | null;
    icon: string;
    completedLessons: number;
  }[];
};

const DEEP_TRACK_SLUGS = [
  "html_semantics",
  "css_layout",
  "qa_theory",
  "typescript",
  "js_fundamentals",
  "react_fundamentals",
  "sql_fundamentals",
  "node_fundamentals",
  "express_fundamentals",
  "embedded_cpp",
] as const;

const MAX_EXPLORE = 4;

/** Smart next steps: unfinished lessons, weak review, placement, minis, exams. */
export async function buildNextRecommendations(
  userId: string,
  limit = 12,
  prefetch?: NextStepsPrefetch,
): Promise<NextStepsResult> {
  const recommendations: NextRecommendation[] = [];

  const progress =
    prefetch?.courseProgress ??
    (await db
      .select({
        courseId: userCourseProgress.courseId,
        lastLessonId: userCourseProgress.lastLessonId,
        slug: courses.slug,
        titleUk: courses.titleUk,
        titleEn: courses.titleEn,
        icon: courses.icon,
        completedLessons: userCourseProgress.completedLessons,
      })
      .from(userCourseProgress)
      .innerJoin(courses, eq(courses.id, userCourseProgress.courseId))
      .where(eq(userCourseProgress.userId, userId)));

  for (const p of progress) {
    if (p.lastLessonId) {
      recommendations.push({
        kind: "continue_course",
        titleUk: `Продовжити: ${p.titleUk}`,
        titleEn: `Continue: ${p.titleEn || p.titleUk}`,
        href: `/courses/${p.slug}/lessons/${p.lastLessonId}`,
        priority: 10 + p.completedLessons,
        meta: { courseSlug: p.slug, icon: p.icon },
      });
    } else {
      recommendations.push({
        kind: "start_course",
        titleUk: `Почати: ${p.titleUk}`,
        titleEn: `Start: ${p.titleEn || p.titleUk}`,
        href: `/courses/${p.slug}`,
        priority: 5,
        meta: { courseSlug: p.slug },
      });
    }
  }

  const allCourses =
    prefetch?.courses ??
    (await db.query.courses.findMany({
      orderBy: [asc(courses.sortOrder)],
    }));
  const started = new Set(progress.map((p) => p.courseId));
  let exploreCount = 0;
  for (const course of allCourses) {
    if (started.has(course.id)) continue;
    if (exploreCount >= MAX_EXPLORE) break;
    recommendations.push({
      kind: "explore_course",
      titleUk: `Спробуй: ${course.titleUk}`,
      titleEn: `Try: ${course.titleEn || course.titleUk}`,
      href: `/courses/${course.slug}`,
      priority: 3,
      meta: { courseSlug: course.slug, icon: course.icon },
    });
    exploreCount += 1;
  }

  // Mastery: weak lessons → personal review queue
  const weak = await getWeakLessons(userId, { limit: 5, scoreBelow: 0.85 });
  for (const w of weak) {
    recommendations.push({
      kind: "review_weak",
      titleUk: `Повтори: ${w.titleUk}`,
      titleEn: `Review: ${w.titleEn}`,
      href: `/courses/${w.courseSlug}/lessons/${w.lessonId}`,
      priority: masteryPriority(w.bestScore, w.attempts),
      meta: {
        bestScore: w.bestScore,
        attempts: w.attempts,
        courseSlug: w.courseSlug,
        mastery: true,
        leech: Boolean(w.leech),
      },
    });
  }
  if (weak.length >= 2) {
    recommendations.push({
      kind: "review_queue",
      titleUk: `🔁 Черга повторення (${weak.length})`,
      titleEn: `🔁 Review queue (${weak.length})`,
      href: "/review",
      priority: 16,
      meta: { weakCount: weak.length },
    });
  }

  const leeches = weak.filter((w) => w.leech);
  for (const w of leeches.slice(0, 2)) {
    recommendations.push({
      kind: "leech",
      titleUk: `🩸 Leech: ${w.titleUk}`,
      titleEn: `🩸 Leech: ${w.titleEn}`,
      href: `/courses/${w.courseSlug}/lessons/${w.lessonId}`,
      priority: masteryPriority(w.bestScore, w.attempts) + 2,
      meta: { leech: true, attempts: w.attempts, bestScore: w.bestScore },
    });
  }

  // Spaced re-practice of completed-but-not-perfect lessons
  const spaced = await getSpacedReviewLessons(userId, { limit: 3 });
  for (const s of spaced) {
    recommendations.push({
      kind: "spaced_review",
      titleUk: `📅 Повтори згодом: ${s.titleUk}`,
      titleEn: `📅 Spaced review: ${s.titleEn}`,
      href: `/courses/${s.courseSlug}/lessons/${s.lessonId}`,
      priority: 12 + (1 - s.bestScore) * 4,
      meta: { spaced: true, bestScore: s.bestScore },
    });
  }

  recommendations.push({
    kind: "flashcards",
    titleUk: "Картки SRS",
    titleEn: "SRS flashcards",
    href: "/flashcards",
    priority: 8,
  });
  recommendations.push({
    kind: "quests",
    titleUk: "Щоденні квести",
    titleEn: "Daily quests",
    href: "/quests",
    priority: 7,
  });
  recommendations.push({
    kind: "tutor",
    titleUk: "Запитай репетитора",
    titleEn: "Ask the tutor",
    href: "/tutor",
    priority: 4,
  });

  // Character build CTA when unspent skill points
  const ch = await db.query.characters.findFirst({
    where: eq(characters.userId, userId),
  });
  if (ch) {
    const prog = applyLevelUps(normalizeProgression(ch.progression), ch.globalLevel);
    if ((prog.skillPoints ?? 0) > 0) {
      recommendations.push({
        kind: "character_build",
        titleUk: `⭐ Прокачка: ${prog.skillPoints} очок навичок`,
        titleEn: `⭐ Build: ${prog.skillPoints} skill points`,
        href: "/profile",
        priority: 14,
        meta: { skillPoints: prog.skillPoints },
      });
    }
    recommendations.push({
      kind: "gifts",
      titleUk: "🎁 Подарунок другу",
      titleEn: "🎁 Gift a friend",
      href: "/friends?gifts=1",
      priority: 5,
    });
  }

  const [placement, progPlacement] = await Promise.all([
    db.query.placementResults.findFirst({
      where: and(
        eq(placementResults.userId, userId),
        eq(placementResults.courseSlug, "english"),
      ),
      orderBy: [desc(placementResults.createdAt)],
    }),
    db.query.placementResults.findFirst({
      where: and(
        eq(placementResults.userId, userId),
        eq(placementResults.courseSlug, "programming"),
      ),
      orderBy: [desc(placementResults.createdAt)],
    }),
  ]);

  if (!placement) {
    recommendations.push({
      kind: "placement",
      titleUk: "Placement test (English)",
      titleEn: "English placement test",
      href: "/placement",
      priority: 15,
    });
  }

  if (!progPlacement) {
    recommendations.push({
      kind: "placement_programming",
      titleUk: "Placement: Програмування",
      titleEn: "Programming placement",
      href: "/placement/programming",
      priority: 14,
    });
  } else {
    recommendations.push({
      kind: "programming_hub",
      titleUk: "Path програмування",
      titleEn: "Programming path",
      href: "/programming",
      priority: 11,
      meta: { level: progPlacement.levelLabel },
    });
  }

  const progCourse = allCourses.find((c) => c.slug === "programming");
  if (progCourse) {
    const miniSlugs = [...PROGRAMMING_MINI_LESSON_SLUGS];
    const raceSlugs = weeklyMinisRaceSlugs();
    const raceSet = new Set(raceSlugs);
    const progLessons = await db.query.lessons.findMany({
      where: eq(lessons.courseId, progCourse.id),
    });
    const miniBySlug = new Map(
      progLessons
        .filter((l) => (miniSlugs as string[]).includes(l.slug))
        .map((l) => [l.slug, l]),
    );

    const lpAll =
      prefetch?.lessonProgress ??
      (await db.query.userLessonProgress.findMany({
        where: eq(userLessonProgress.userId, userId),
      }));
    const doneSet = new Set(
      lpAll
        .filter((p) => p.courseId === progCourse.id && p.status === "completed")
        .map((p) => p.lessonId),
    );

    const { startsAt: weekStart } = isoWeekBounds();
    const raceDoneWeekIds = new Set(
      lpAll
        .filter(
          (p) =>
            p.courseId === progCourse.id &&
            p.status === "completed" &&
            p.completedAt &&
            p.completedAt >= weekStart,
        )
        .map((p) => p.lessonId),
    );

    let racePri = 18;
    for (const slug of raceSlugs) {
      const les = miniBySlug.get(slug);
      if (!les) continue;
      if (raceDoneWeekIds.has(les.id)) continue;
      recommendations.push({
        kind: "programming_mini_race",
        titleUk: `🏁 Race mini: ${les.titleUk}`,
        titleEn: `🏁 Race mini: ${les.titleEn || les.titleUk}`,
        href: `/courses/programming/lessons/${les.id}`,
        priority: racePri,
        meta: { lessonSlug: slug, race: true },
      });
      racePri -= 0.3;
    }
    if (
      raceSlugs.some((s) => {
        const les = miniBySlug.get(s);
        return les && !raceDoneWeekIds.has(les.id);
      })
    ) {
      recommendations.push({
        kind: "programming_minis_race",
        titleUk: "🏁 Тижнева minis-гонка",
        titleEn: "🏁 Weekly minis race",
        href: "/programming",
        priority: 17,
        meta: { raceSlugs },
      });
    }

    let miniPriority = 15.5;
    for (const slug of miniSlugs) {
      if (raceSet.has(slug)) continue;
      const les = miniBySlug.get(slug);
      if (!les || doneSet.has(les.id)) continue;
      recommendations.push({
        kind: "programming_mini",
        titleUk: `🧩 Mini: ${les.titleUk}`,
        titleEn: `🧩 Mini: ${les.titleEn || les.titleUk}`,
        href: `/courses/programming/lessons/${les.id}`,
        priority: miniPriority,
        meta: { lessonSlug: slug },
      });
      miniPriority -= 0.5;
      if (miniPriority < 13) break;
    }
    const allMinisDone =
      miniSlugs.length > 0 &&
      miniSlugs.every((s) => {
        const les = miniBySlug.get(s);
        return les && doneSet.has(les.id);
      });
    if (allMinisDone) {
      recommendations.push({
        kind: "programming_minis_done",
        titleUk: "🏆 Усі mini-projects! Playground?",
        titleEn: "🏆 All minis done! Try playground?",
        href: "/playground",
        priority: 13,
      });
    } else if (miniBySlug.size > 0) {
      recommendations.push({
        kind: "programming_minis_board",
        titleUk: "🧩 Mini-projects board",
        titleEn: "🧩 Mini-projects board",
        href: "/programming",
        priority: 12.5,
      });
    }
  }

  recommendations.push({
    kind: "playground",
    titleUk: "Code playground",
    titleEn: "Code playground",
    href: "/playground",
    priority: 6,
  });

  // Exam-ready: use prefetched lessons + progress when available
  const lpForExams =
    prefetch?.lessonProgress ??
    (await db.query.userLessonProgress.findMany({
      where: eq(userLessonProgress.userId, userId),
    }));
  const examLessons = (
    prefetch?.courses
      ? await db.query.lessons.findMany({ where: eq(lessons.isExam, true) })
      : await db.query.lessons.findMany({ where: eq(lessons.isExam, true) })
  );
  if (examLessons.length) {
    const doneSet = new Set(
      lpForExams.filter((p) => p.status === "completed").map((p) => p.lessonId),
    );
    const unitIds = [...new Set(examLessons.map((l) => l.unitId))];
    const unitLessons =
      unitIds.length > 0
        ? await db.query.lessons.findMany({
            where: inArray(lessons.unitId, unitIds),
          })
        : [];
    const byUnit = new Map<string, typeof unitLessons>();
    for (const l of unitLessons) {
      const list = byUnit.get(l.unitId) ?? [];
      list.push(l);
      byUnit.set(l.unitId, list);
    }
    const courseMap = new Map(allCourses.map((c) => [c.id, c]));
    let examRecs = 0;
    for (const ex of examLessons) {
      if (examRecs >= 3) break;
      if (doneSet.has(ex.id)) continue;
      const peers = byUnit.get(ex.unitId) ?? [];
      const nonExam = peers.filter((l) => !l.isExam);
      if (!nonExam.length || !nonExam.every((l) => doneSet.has(l.id))) continue;
      const course = courseMap.get(ex.courseId);
      if (!course) continue;
      recommendations.push({
        kind: "exam_ready",
        titleUk: `📝 Контрольна: ${ex.titleUk}`,
        titleEn: `📝 Exam: ${ex.titleEn || ex.titleUk}`,
        href: `/courses/${course.slug}/lessons/${ex.id}`,
        priority: 19,
        meta: { courseSlug: course.slug, lessonId: ex.id, isExam: true },
      });
      examRecs += 1;
    }
  }

  for (const slug of DEEP_TRACK_SLUGS) {
    const c = allCourses.find((x) => x.slug === slug);
    if (!c || started.has(c.id)) continue;
    recommendations.push({
      kind: "deep_track",
      titleUk: `Deep track: ${c.titleUk}`,
      titleEn: `Deep track: ${c.titleEn || c.titleUk}`,
      href: `/courses/${slug}`,
      priority: 8,
      meta: { courseSlug: slug },
    });
  }

  // ML-lite adaptive re-rank (feature blend; weights via ADAPTIVE_WEIGHTS_JSON)
  const weights = loadAdaptiveWeights(process.env as Record<string, string | undefined>);
  const scored = recommendations.map((r) => {
    const meta = r.meta ?? {};
    const score = adaptiveScore(
      {
        lastMastery: typeof meta.bestScore === "number" ? Number(meta.bestScore) : 0.5,
        attempts: typeof meta.attempts === "number" ? Number(meta.attempts) : 1,
        streakDays: 0,
        daysInactive: 0,
        isWeak: r.kind.includes("review") || r.kind === "leech" || Boolean(meta.mastery),
        isExam: r.kind.includes("exam") || Boolean(meta.isExam),
        paywalled: Boolean(meta.paywalled),
        basePriority: r.priority,
      },
      weights ?? DEFAULT_ADAPTIVE_WEIGHTS,
    );
    return { ...r, priority: score, meta: { ...meta, adaptive: true, rawPriority: r.priority } };
  });
  scored.sort((a, b) => b.priority - a.priority);
  return {
    recommendations: scored.slice(0, limit),
    placement,
    progPlacement,
  };
}
