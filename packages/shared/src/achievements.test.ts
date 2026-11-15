import { describe, expect, it } from "vitest";
import { ACHIEVEMENT_CATALOG, DEVOPS_LESSON_ACHIEVEMENTS, devopsLessonAchievement } from "./index.js";

describe("DevOps lesson achievements", () => {
  it.each([
    ["do-k8s-exam", "devops_cluster", "Кластер готовий", "Cluster ready"],
    ["do-del-exam", "devops_gitops", "Git — це кластер", "Git is the cluster"],
    ["do-drill-exam", "devops_oncall", "На зміні", "On call"],
  ])("maps %s to its exact bilingual 20-XP milestone", (slug, code, titleUk, titleEn) => {
    expect(devopsLessonAchievement(slug)).toBe(code);
    expect(ACHIEVEMENT_CATALOG.filter((achievement) => achievement.code === code)).toEqual([
      expect.objectContaining({ code, titleUk, titleEn, xpReward: 20 }),
    ]);
  });

  it("does not treat other lessons or prototype keys as milestones", () => {
    expect(Object.keys(DEVOPS_LESSON_ACHIEVEMENTS)).toHaveLength(3);
    for (const slug of ["do-cap-exam", "do-k8s-probe-contracts", "do-data-exam", "toString", "__proto__", ""]) {
      expect(devopsLessonAchievement(slug)).toBeNull();
    }
    for (const code of ["devops_stay_up", "devops_on_call", "devops_complete"]) {
      expect(ACHIEVEMENT_CATALOG.some((achievement) => achievement.code === code)).toBe(false);
    }
    expect(ACHIEVEMENT_CATALOG.find((achievement) => achievement.code === "devops_start")?.xpReward).toBe(20);
  });
});
