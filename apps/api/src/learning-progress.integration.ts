import { eq } from "drizzle-orm";
import { expect, it } from "vitest";
import { activityEvents, skillAttempts, userLessonProgress, users } from "@eduforge/db";
import { isoWeekBounds, utcDateKey } from "@eduforge/shared";
import { db } from "./db.js";

type JsonFn = (
  path: string,
  opts?: { method?: string; body?: unknown; token?: string; headers?: Record<string, string> },
) => Promise<{ status: number; data: Record<string, unknown> }>;

function solveExercises(
  exercises: {
    id: string;
    type: string;
    correctIndex?: number;
    accepted?: string[];
    pairs?: { left: string; right: string }[];
    correct?: string[];
  }[],
) {
  return exercises.map((ex) => {
    if (ex.type === "mcq" || ex.type === "logic_puzzle") {
      return { exerciseId: ex.id, answer: ex.correctIndex ?? 0 };
    }
    if (ex.type === "translate" || ex.type === "fill_blank") {
      return { exerciseId: ex.id, answer: ex.accepted?.[0] ?? "" };
    }
    if (ex.type === "match") {
      return { exerciseId: ex.id, answer: ex.pairs ?? [] };
    }
    if (ex.type === "order_words") {
      return { exerciseId: ex.id, answer: ex.correct ?? [] };
    }
    return { exerciseId: ex.id, answer: true };
  });
}

export function registerLearningProgressIntegrationTests(
  describeIntegration: typeof import("vitest").describe,
  json: JsonFn,
) {
  describeIntegration("Learning progress, history, goal & level-up integration", () => {
    const ts = Date.now();
    const emailA = `lp-a-${ts}@eduforge.test`;
    const emailB = `lp-b-${ts}@eduforge.test`;
    const password = "password123";
    let tokenA = "";
    let tokenB = "";
    let userAId = "";
    let engLesson1Id = "";
    let engExamId = "";
    let engExercises: {
      id: string;
      type: string;
      correctIndex?: number;
      accepted?: string[];
      pairs?: { left: string; right: string }[];
      correct?: string[];
    }[] = [];

    it("requires authentication on /learning/progress, /learning/history, /learning/goal, /learning/calendar", async () => {
      expect((await json("/learning/progress")).status).toBe(401);
      expect((await json("/learning/history")).status).toBe(401);
      expect((await json("/learning/calendar")).status).toBe(401);
      expect(
        (await json("/learning/goal", { method: "PUT", body: { weeklyTarget: 10 } })).status,
      ).toBe(401);
    });

    it("sets up two isolated users and verifies empty states + unrelated activity does not create study days", async () => {
      const regA = await json("/auth/register", {
        method: "POST",
        body: { email: emailA, password, displayName: `LPA${ts}` },
      });
      expect(regA.status).toBe(200);
      tokenA = regA.data.token as string;
      userAId = (regA.data.user as { id: string }).id;

      const regB = await json("/auth/register", {
        method: "POST",
        body: { email: emailB, password, displayName: `LPB${ts}` },
      });
      expect(regB.status).toBe(200);
      tokenB = regB.data.token as string;

      // Insert an unrelated activity event for userA (no lesson submitted)
      await db.insert(activityEvents).values({
        userId: userAId,
        kind: "login_bonus",
        payload: { rewardXp: 12 },
      });

      const calA = await json("/learning/calendar?days=14", { token: tokenA });
      expect(calA.status).toBe(200);
      expect(calA.data.activeDays).toBe(0);

      const homeA = await json("/me/home", { token: tokenA });
      expect(homeA.status).toBe(200);
      expect(homeA.data.studyDates).toEqual([]);

      const progA = await json("/learning/progress?days=30", { token: tokenA });
      expect(progA.status).toBe(200);
      expect((progA.data.overview as { attemptsTotal: number }).attemptsTotal).toBe(0);
      expect((progA.data.overview as { averageScore: number | null }).averageScore).toBeNull();
      expect((progA.data.goal as { mode: string }).mode).toBe("automatic");
      expect((progA.data.goal as { automaticGoal: unknown }).automaticGoal).toBeTruthy();

      // Fetch English lesson + exam for subsequent tests
      const eng = await json("/courses/english", { token: tokenA });
      expect(eng.status).toBe(200);
      const units = eng.data.units as {
        lessons: { id: string; isExam?: boolean }[];
      }[];
      engLesson1Id = units[0]!.lessons.find((l) => !l.isExam)!.id;
      engExamId = units.flatMap((u) => u.lessons).find((l) => l.isExam)!.id;

      const detail = await json(`/courses/english/lessons/${engLesson1Id}`, { token: tokenA });
      expect(detail.status).toBe(200);
      engExercises = (detail.data.lesson as { exercises: typeof engExercises }).exercises;
    });

    it("records attempt metadata, repeats, failures, exam thresholds, and idempotent replay without double counting", async () => {
      const idemKey = `idem-${ts}-1`;
      const answers = solveExercises(engExercises);

      // 1. First completion (pass) with idempotency key
      const first = await json(`/courses/english/lessons/${engLesson1Id}/submit`, {
        method: "POST",
        token: tokenA,
        body: { answers, idempotencyKey: idemKey },
      });
      expect(first.status).toBe(200);
      expect(first.data.passed).toBe(true);
      expect(first.data.outcome).toBe("passed");
      expect(first.data.firstClear).toBe(true);
      expect(first.data.courseLevelBefore).toBe(1);
      expect(first.data.courseLevelAfter).toBeGreaterThanOrEqual(1);
      expect(typeof first.data.characterXpGain).toBe("number");
      expect(first.data.characterLevelBefore).toBe(1);

      // 2. Replay same idempotencyKey -> idempotentReplay=true, no extra attempt counted
      const replay = await json(`/courses/english/lessons/${engLesson1Id}/submit`, {
        method: "POST",
        token: tokenA,
        body: { answers, idempotencyKey: idemKey },
      });
      expect(replay.status).toBe(200);
      expect(replay.data.idempotentReplay).toBe(true);

      // 3. Repeat pass with a new key -> counts as a second successful attempt, firstClear=false
      const repeat = await json(`/courses/english/lessons/${engLesson1Id}/submit`, {
        method: "POST",
        token: tokenA,
        body: { answers, idempotencyKey: `idem-${ts}-2` },
      });
      expect(repeat.status).toBe(200);
      expect(repeat.data.passed).toBe(true);
      expect(repeat.data.firstClear).toBe(false);

      // 4. Failed attempt on lesson -> does NOT count as successful attempt, marks study day
      const failLesson = await json(`/courses/english/lessons/${engLesson1Id}/submit`, {
        method: "POST",
        token: tokenA,
        body: { answers: [], idempotencyKey: `idem-${ts}-3` },
      });
      expect(failLesson.status).toBe(200);
      expect(failLesson.data.passed).toBe(false);
      expect(failLesson.data.outcome).toBe("failed");

      // 5. Failed exam -> xpGain=0, characterXpGain=0, examFailed=true
      const failExam = await json(`/courses/english/lessons/${engExamId}/submit`, {
        method: "POST",
        token: tokenA,
        body: { answers: [], idempotencyKey: `idem-${ts}-4` },
      });
      expect(failExam.status).toBe(200);
      expect(failExam.data.passed).toBe(false);
      expect(failExam.data.examFailed).toBe(true);
      expect(failExam.data.xpGain).toBe(0);
      expect(failExam.data.characterXpGain).toBe(0);

      const prog = await json("/learning/progress?days=30", { token: tokenA });
      expect(prog.status).toBe(200);
      const ov = prog.data.overview as {
        attemptsTotal: number;
        successfulAttempts: number;
        failedAttempts: number;
        newCompletions: number;
        studyDays: number;
      };
      // 4 unique submissions (replay excluded): 2 passed (1 first + 1 repeat), 2 failed
      expect(ov.attemptsTotal).toBe(4);
      expect(ov.successfulAttempts).toBe(2);
      expect(ov.failedAttempts).toBe(2);
      expect(ov.newCompletions).toBe(1);
      expect(ov.studyDays).toBe(1);

      // Home studyDates + calendar reflect recorded study day
      const home = await json("/me/home", { token: tokenA });
      expect(home.data.studyDates).toContain(utcDateKey());
    });

    it("supports historical reconstruction, unknown missing-lesson outcomes, UTC boundaries, and weekly recap", async () => {
      const now = new Date();
      const thisWeek = isoWeekBounds(now);
      // Insert historical attempts from 14 days ago & 25 days ago & 45 days ago (outside 30d, inside 90d/all)
      const day14 = new Date(now.getTime() - 14 * 86_400_000);
      const day13 = new Date(now.getTime() - 13 * 86_400_000);
      const day45 = new Date(now.getTime() - 45 * 86_400_000);
      // Also a previous-week Monday 00:05 UTC attempt (guaranteed inside previous week's elapsed window unless Monday 00:00..00:04)
      const prevWeekMon = new Date(thisWeek.startsAt.getTime() - 7 * 86_400_000 + 60_000);

      await db.insert(skillAttempts).values([
        // Legacy normal lesson pass (0.5 >= 0.5) on day14 — no outcome field
        {
          userId: userAId,
          courseSlug: "english",
          metrics: { accuracy: 0.5, lessonId: engLesson1Id },
          xpGained: 12,
          createdAt: day14,
        },
        // Legacy exam fail (0.65 < 0.7) on day13 — no outcome field
        {
          userId: userAId,
          courseSlug: "english",
          metrics: { accuracy: 0.65, lessonId: engExamId },
          xpGained: 0,
          createdAt: day13,
        },
        // Legacy attempt with missing lesson metadata (unknown outcome, excluded from successes!)
        {
          userId: userAId,
          courseSlug: "chess",
          metrics: { accuracy: 0.9, lessonId: "00000000-0000-4000-8000-000000000999" },
          xpGained: 18,
          createdAt: prevWeekMon,
        },
        // Old attempt 45 days ago (visible in days=90 and history days=all, excluded from days=30)
        {
          userId: userAId,
          courseSlug: "english",
          metrics: { accuracy: 1.0, lessonId: engLesson1Id },
          xpGained: 20,
          createdAt: day45,
        },
      ]);

      // Empty course filter check
      const emptyCourse = await json("/learning/progress?days=30&course=typing", { token: tokenA });
      expect(emptyCourse.status).toBe(200);
      expect((emptyCourse.data.overview as { attemptsTotal: number }).attemptsTotal).toBe(0);
      expect((emptyCourse.data.overview as { averageScore: number | null }).averageScore).toBeNull();
      // Weekly recap and personal bests remain account-wide even when filtered by typing
      expect((emptyCourse.data.goal as { currentWeekSuccesses: number }).currentWeekSuccesses).toBe(2);

      // 30-day vs 90-day filter check
      const prog30 = await json("/learning/progress?days=30", { token: tokenA });
      const prog90 = await json("/learning/progress?days=90", { token: tokenA });
      const ov30 = prog30.data.overview as { successfulAttempts: number; unknownAttempts: number; reconstructedAttempts: number };
      const ov90 = prog90.data.overview as { successfulAttempts: number };
      expect(ov30.successfulAttempts).toBe(3); // 2 current + 1 reconstructed on day14 (unknown excluded!)
      expect(ov30.unknownAttempts).toBe(1);
      expect(ov30.reconstructedAttempts).toBe(2); // day14 pass + day13 exam fail
      expect(ov90.successfulAttempts).toBe(4); // adds day45 reconstructed pass

      // Personal bests: unknown attempt on prevWeekMon still counts as study day, not success
      const bests = prog90.data.personalBests as {
        bestDaySuccesses: { count: number };
        longestStudyRunDays: { days: number };
      };
      expect(bests.bestDaySuccesses.count).toBe(2);
      expect(bests.longestStudyRunDays.days).toBeGreaterThanOrEqual(2); // day14 + day13 consecutive!

      // History checks: reconstructed flags, unknown outcome, null characterXpGained for legacy rows
      const histAll = await json("/learning/history?days=all&limit=50", { token: tokenA });
      expect(histAll.status).toBe(200);
      const items = histAll.data.items as {
        outcome: string;
        reconstructed: boolean;
        characterXpGained: number | null;
        lessonHref: string | null;
        courseSlug: string;
        score: number | null;
      }[];
      expect(items.length).toBe(8);
      const unknownRow = items.find((i) => i.courseSlug === "chess");
      expect(unknownRow).toBeTruthy();
      expect(unknownRow!.outcome).toBe("unknown");
      expect(unknownRow!.reconstructed).toBe(false);
      expect(unknownRow!.lessonHref).toBeNull();
      expect(unknownRow!.characterXpGained).toBeNull();
      expect(unknownRow!.score).toBe(0.9);

      const reconstructedExamFail = items.find(
        (i) => i.reconstructed && i.outcome === "failed",
      );
      expect(reconstructedExamFail).toBeTruthy();
      expect(reconstructedExamFail!.characterXpGained).toBeNull();
    });

    it("supports cursor pagination, query validation, and strict user isolation", async () => {
      // Page 1 (limit=3)
      const p1 = await json("/learning/history?days=all&limit=3", { token: tokenA });
      expect(p1.status).toBe(200);
      const items1 = p1.data.items as { id: string }[];
      expect(items1.length).toBe(3);
      expect(p1.data.hasMore).toBe(true);
      expect(p1.data.nextCursor).toBeTruthy();

      // Page 2
      const p2 = await json(
        `/learning/history?days=all&limit=3&cursor=${encodeURIComponent(p1.data.nextCursor as string)}`,
        { token: tokenA },
      );
      expect(p2.status).toBe(200);
      const items2 = p2.data.items as { id: string }[];
      expect(items2.length).toBe(3);
      const ids1 = new Set(items1.map((x) => x.id));
      for (const x of items2) expect(ids1.has(x.id)).toBe(false);

      // Validation errors
      expect((await json("/learning/history?limit=51", { token: tokenA })).status).toBe(400);
      expect((await json("/learning/history?cursor=bad-cursor", { token: tokenA })).status).toBe(400);
      expect((await json("/learning/progress?days=14", { token: tokenA })).status).toBe(400);

      // User B isolation: sees 0 attempts, 0 study days, no user A data
      const progB = await json("/learning/progress", { token: tokenB });
      expect(progB.status).toBe(200);
      expect((progB.data.overview as { attemptsTotal: number }).attemptsTotal).toBe(0);
      const histB = await json("/learning/history?days=all", { token: tokenB });
      expect(histB.status).toBe(200);
      expect((histB.data.items as unknown[]).length).toBe(0);
    });

    it("saves, edits, persists, and removes weekly goal without changing XP or rewards", async () => {
      const meBefore = await json("/auth/me", { token: tokenA });
      const xpBefore = (meBefore.data.character as { globalXp: number }).globalXp;

      // Invalid target rejected
      expect(
        (await json("/learning/goal", { method: "PUT", token: tokenA, body: { weeklyTarget: 0 } }))
          .status,
      ).toBe(400);
      expect(
        (
          await json("/learning/goal", {
            method: "PUT",
            token: tokenA,
            body: { weeklyTarget: 1001 },
          })
        ).status,
      ).toBe(400);

      // Save target=5 (userA already has 2 currentWeekSuccesses!)
      const set5 = await json("/learning/goal", {
        method: "PUT",
        token: tokenA,
        body: { weeklyTarget: 5 },
      });
      expect(set5.status).toBe(200);
      expect(set5.data.weeklyTarget).toBe(5);
      const goal5 = set5.data.goal as {
        mode: string;
        currentWeekSuccesses: number;
        remaining: number;
        completed: boolean;
      };
      expect(goal5.mode).toBe("custom");
      expect(goal5.currentWeekSuccesses).toBe(2);
      expect(goal5.remaining).toBe(3);
      expect(goal5.completed).toBe(false);

      // Edit target=2 -> denominator changes immediately and marks completed without extra XP!
      const set2 = await json("/learning/goal", {
        method: "PUT",
        token: tokenA,
        body: { weeklyTarget: 2 },
      });
      expect(set2.status).toBe(200);
      const goal2 = set2.data.goal as {
        weeklyTarget: number;
        completed: boolean;
        remaining: number;
      };
      expect(goal2.weeklyTarget).toBe(2);
      expect(goal2.completed).toBe(true);
      expect(goal2.remaining).toBe(0);

      // Persists in DB across /auth/me and /learning/progress
      const meAfter = await json("/auth/me", { token: tokenA });
      expect((meAfter.data.character as { weeklyTarget: number | null }).weeklyTarget).toBe(2);
      expect((meAfter.data.character as { globalXp: number }).globalXp).toBe(xpBefore);

      // Remove target -> restores automatic recommendation mode
      const cleared = await json("/learning/goal", {
        method: "PUT",
        token: tokenA,
        body: { weeklyTarget: null },
      });
      expect(cleared.status).toBe(200);
      expect(cleared.data.weeklyTarget).toBeNull();
      expect((cleared.data.goal as { mode: string }).mode).toBe("automatic");
      expect((cleared.data.goal as { automaticGoal: unknown }).automaticGoal).toBeTruthy();

      // OpenAPI includes new endpoints
      const openapi = await json("/openapi.json");
      expect(openapi.status).toBe(200);
      const paths = openapi.data.paths as Record<string, unknown>;
      expect(paths["/learning/progress"]).toBeTruthy();
      expect(paths["/learning/history"]).toBeTruthy();
      expect(paths["/learning/goal"]).toBeTruthy();

      // Clean up temporary integration test rows
      await db.delete(userLessonProgress).where(eq(userLessonProgress.userId, userAId));
      await db.delete(users).where(eq(users.id, userAId));
      await db.delete(users).where(eq(users.email, emailB));
    });
  });
}
