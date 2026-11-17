import { describe, expect, it } from "vitest";
import { gradeExplanation } from "@eduforge/shared";
import { EE_MILESTONES } from "../../../shared/src/ee-milestones.ts";
import { electricalEngineeringContent } from "./index.js";

const lessons = electricalEngineeringContent.units.flatMap((unit) => unit.lessons);

describe("electrical engineering practice path", () => {
  it("keeps two independent ideas in single-keyword explanations", () => {
    const explains = lessons.flatMap((lesson) =>
      lesson.exercises.filter((exercise) => exercise.type === "explain"),
    );
    expect(explains.length).toBeGreaterThan(200);
    for (const exercise of explains) {
      expect(exercise.keyIdeas.length, exercise.id).toBeGreaterThanOrEqual(2);
      const rubric = {
        keyIdeas: exercise.keyIdeas,
        minWords: exercise.minWords,
        passRatio: exercise.passRatio,
      };
      const sampleUk = gradeExplanation(exercise.sampleAnswerUk ?? "", rubric);
      const sampleEn = gradeExplanation(exercise.sampleAnswerEn ?? "", rubric);
      expect(sampleUk.correct, exercise.id).toBe(true);
      expect(sampleEn.correct, exercise.id).toBe(true);
      if (exercise.keyIdeas.length === 2 && exercise.passRatio === 1) {
        const token = exercise.keyIdeas[0]?.anyOf[0] ?? "token";
        const stuffed = gradeExplanation(`${token} `.repeat(20), rubric);
        expect(stuffed.correct, exercise.id).toBe(false);
      }
    }
  });

  it("adds a changed-number check and an intermediate lab at the practical milestones", () => {
    const bySlug = new Map(lessons.map((lesson) => [lesson.slug, lesson]));
    for (const milestone of EE_MILESTONES) {
      expect(bySlug.has(milestone.lessonSlug), milestone.lessonSlug).toBe(true);
    }
    const transfer = bySlug.get("ee-12-l2")?.exercises.find((exercise) => exercise.id === "ee-12-l2-n3-v2");
    expect(transfer && "target" in transfer ? transfer.target : null).toBe(6);
    const labs = lessons.flatMap((lesson) => lesson.exercises.filter((exercise) => exercise.type === "circuit_lab"));
    expect(labs.map((lab) => lab.id).sort()).toEqual(
      [
        "ee-09-l1-lab-v2",
        "ee-12-l1-lab-v2",
        "ee-12-l2-lab-v2",
        "ee-12-l5-lab-v2",
        "ee-17-l1-lab-v2",
        "ee-55-l1-lab-v2",
        "ee-58-l3-lab-analog-v2",
        "ee-58-l3-lab-filter-v2",
        "ee-59-l3-lab-buck-v2",
        "ee-60-l3-lab-phase-v2",
      ].sort(),
    );
    const buck = labs.find((lab) => lab.id === "ee-59-l3-lab-buck-v2");
    const phase = labs.find((lab) => lab.id === "ee-60-l3-lab-phase-v2");
    expect(buck?.promptUk).toMatch(/усереднен/i);
    expect(buck?.promptEn).toMatch(/averaged/i);
    expect(phase?.promptUk).toMatch(/однієї фази/);
    expect(phase?.promptEn).toMatch(/one phase/i);
  });

  it("gives every match an English pair list of the same length", () => {
    const matches = lessons.flatMap((lesson) => lesson.exercises.filter((exercise) => exercise.type === "match"));
    expect(matches.length).toBeGreaterThan(0);
    for (const exercise of matches) {
      if (exercise.type !== "match") continue;
      expect(exercise.pairsEn?.length, exercise.id).toBe(exercise.pairs.length);
      expect(exercise.pairsEn?.every((pair) => pair.left.trim() && pair.right.trim()), exercise.id).toBe(true);
    }
  });
});
