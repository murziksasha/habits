import { describe, expect, it, vi } from "vitest";
import type { SQL } from "drizzle-orm";
import { PgDialect } from "drizzle-orm/pg-core";
import { userAchievements, type Db } from "@eduforge/db";
import { ACHIEVEMENT_CATALOG, DEVOPS_LESSON_ACHIEVEMENTS } from "@eduforge/shared";
import { evaluateAchievements } from "./engagement.js";

vi.mock("./push.js", () => ({ sendPushToUser: vi.fn() }));

type Progress = {
  slug: string;
  lessonId: string;
  userId: string;
  courseSlug: string;
  status: string;
  isExam: boolean;
};
const completed = (slug: string): Progress => ({
  slug, lessonId: slug, userId: "learner", courseSlug: "devops", status: "completed", isExam: true,
});

function achievementDb(progress: Progress[]) {
  const dialect = new PgDialect();
  const milestones = new Set<string>(Object.values(DEVOPS_LESSON_ACHIEVEMENTS));
  const owned = new Set(ACHIEVEMENT_CATALOG.map((achievement) => achievement.code)
    .filter((code) => !milestones.has(code)));
  const examQueries: unknown[][] = [];
  const db = {
    query: {
      achievements: {
        findFirst: vi.fn(async ({ where }: { where: SQL }) => {
          const code = dialect.sqlToQuery(where).params[0];
          const definition = ACHIEVEMENT_CATALOG.find((achievement) => achievement.code === code);
          return definition ? { ...definition, id: definition.code } : undefined;
        }),
      },
      userAchievements: {
        findFirst: vi.fn(async ({ where }: { where: SQL }) =>
          owned.has(String(dialect.sqlToQuery(where).params[1])) ? { id: "owned" } : undefined),
      },
      characters: { findFirst: vi.fn(async () => undefined) },
    },
    select: vi.fn((fields: Record<string, unknown>) => {
      const query = {
        from: vi.fn(() => query),
        innerJoin: vi.fn(() => query),
        where: vi.fn(async (where: SQL) => {
          if ("slug" in fields) {
            const params = dialect.sqlToQuery(where).params;
            examQueries.push(params);
            const [userId, status, courseSlug, isExam, lessonId] = params;
            return progress.filter((row) => row.userId === userId && row.status === status &&
              row.courseSlug === courseSlug && row.isExam === isExam && row.lessonId === lessonId);
          }
          return [{ n: 1 }];
        }),
      };
      return query;
    }),
    insert: vi.fn((table: unknown) => ({
      values: vi.fn(async (value: { achievementId: string }) => {
        if (table === userAchievements) owned.add(value.achievementId);
      }),
    })),
  };
  return { db: db as unknown as Db, examQueries };
}

const context = (lessonId: string) => ({ courseSlug: "devops", lessonCompleted: true, lessonId });

describe("DevOps achievement evaluation", () => {
  it.each(Object.entries(DEVOPS_LESSON_ACHIEVEMENTS))(
    "unlocks only the milestone for the submitted completed %s", async (slug, code) => {
      const allMilestones = Object.keys(DEVOPS_LESSON_ACHIEVEMENTS).map(completed);
      const { db, examQueries } = achievementDb(allMilestones);
      const unlocked = await evaluateAchievements(db, "learner", context(slug));
      expect(unlocked.map((achievement) => achievement.code)).toEqual([code]);
      expect(examQueries).toEqual([["learner", "completed", "devops", true, slug]]);
      expect(await evaluateAchievements(db, "learner", context(slug))).toEqual([]);
    },
  );

  it.each([
    { status: "available" }, { status: "in_progress" }, { courseSlug: "sysadmin" },
    { userId: "someone-else" }, { isExam: false }, { lessonId: "other-lesson" },
  ])("requires the submitted lesson's persisted DevOps exam completion: %j", async (override) => {
    const { db } = achievementDb([{ ...completed("do-k8s-exam"), ...override }]);
    expect(await evaluateAchievements(db, "learner", context("do-k8s-exam"))).toEqual([]);
  });

  it("does not award milestones for capstones or ordinary lessons despite earlier exam passes", async () => {
    const { db } = achievementDb([
      ...Object.keys(DEVOPS_LESSON_ACHIEVEMENTS).map(completed),
      completed("do-cap-exam"), completed("do-probes"),
    ]);
    expect(await evaluateAchievements(db, "learner", context("do-cap-exam"))).toEqual([]);
    expect(await evaluateAchievements(db, "learner", context("do-probes"))).toEqual([]);
  });

  it("does not evaluate DevOps milestones without a passed lesson, DevOps course, and lesson id", async () => {
    const { db, examQueries } = achievementDb(Object.keys(DEVOPS_LESSON_ACHIEVEMENTS).map(completed));
    await evaluateAchievements(db, "learner", { ...context("do-k8s-exam"), lessonCompleted: false });
    await evaluateAchievements(db, "learner", { ...context("do-k8s-exam"), courseSlug: "sysadmin" });
    await evaluateAchievements(db, "learner", { courseSlug: "devops", lessonCompleted: true });
    expect(examQueries).toEqual([]);
  });
});
