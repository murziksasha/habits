import { describe, expect, it } from "vitest";
import {
  CORE_SKILL_OBJECTIVES,
  getObjective,
  getSkillObjectives,
  mapExerciseToSkill,
  verifyAllCoursesHaveObjectives,
} from "./skills.js";

describe("skills", () => {
  it("covers all courses in COURSE_SLUGS with canonical skill objectives", () => {
    const check = verifyAllCoursesHaveObjectives();
    expect(check.missing).toEqual([]);
    expect(check.complete).toBe(true);
    expect(CORE_SKILL_OBJECTIVES.length).toBeGreaterThanOrEqual(35);
  });
  it("has valid core skill objectives with both uk and en descriptions", () => {
    expect(CORE_SKILL_OBJECTIVES.length).toBeGreaterThan(0);
    for (const obj of CORE_SKILL_OBJECTIVES) {
      expect(obj.id).toBeTruthy();
      expect(obj.titleUk).toBeTruthy();
      expect(obj.titleEn).toBeTruthy();
      expect(obj.actionUk).toBeTruthy();
      expect(obj.actionEn).toBeTruthy();
      expect(obj.commonErrors.length).toBeGreaterThan(0);
      for (const err of obj.commonErrors) {
        expect(err.code).toBeTruthy();
        expect(err.labelUk).toBeTruthy();
        expect(err.labelEn).toBeTruthy();
        expect(err.fixUk).toBeTruthy();
        expect(err.fixEn).toBeTruthy();
      }
    }
  });

  it("finds objective by id and queries by course slug", () => {
    const htmlObj = getObjective("prog.html.structure");
    expect(htmlObj).not.toBeNull();
    expect(htmlObj?.courseSlug).toBe("programming");

    const sqlObjs = getSkillObjectives("sql_fundamentals");
    expect(sqlObjs.length).toBeGreaterThan(0);
    expect(sqlObjs[0].courseSlug).toBe("sql_fundamentals");
  });

  it("maps exercises to relevant skill objectives", () => {
    const mapped = mapExerciseToSkill("programming", "html-intro");
    expect(mapped).not.toBeNull();
    expect(mapped?.id).toBe("prog.html.structure");
  });
});
