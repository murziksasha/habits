import { describe, expect, it } from "vitest";
import {
  COURSE_SLUGS,
  FULL_STACK_ROADMAP_ORDER,
  getCourseNextSteps,
  getCoursePrerequisites,
  getLocalLabById,
  getLocalLabForLesson,
  listLabsForCourse,
  LOCAL_LAB_MANIFESTS,
  localLabManifestSchema,
} from "./index.js";

describe("local lab manifests", () => {
  it("validates every manifest against localLabManifestSchema", () => {
    expect(LOCAL_LAB_MANIFESTS.length).toBeGreaterThanOrEqual(6);
    for (const lab of LOCAL_LAB_MANIFESTS) {
      expect(() => localLabManifestSchema.parse(lab)).not.toThrow();
      expect(lab.assessmentMode).toBe("local_practice");
      expect(lab.projectName).toBe("ForgeBoard");
      expect(COURSE_SLUGS).toContain(lab.courseSlug);
    }
  });

  it("keeps labId and (courseSlug, lessonSlug) pairs unique", () => {
    const ids = LOCAL_LAB_MANIFESTS.map((l) => l.labId);
    expect(new Set(ids).size).toBe(ids.length);
    const pairs = LOCAL_LAB_MANIFESTS.map((l) => `${l.courseSlug}:${l.lessonSlug}`);
    expect(new Set(pairs).size).toBe(pairs.length);
    const downloads = LOCAL_LAB_MANIFESTS.map((l) => l.downloadPath);
    expect(new Set(downloads).size).toBe(downloads.length);
  });

  it("includes all six core Release-1 ForgeBoard milestones", () => {
    for (let m = 1; m <= 6; m += 1) {
      expect(LOCAL_LAB_MANIFESTS.some((l) => l.milestone === m)).toBe(true);
    }
    expect(getLocalLabForLesson("html_semantics", "hs-forgeboard-a11y-lab")?.labId).toBe(
      "forgeboard-m1-a11y",
    );
    expect(getLocalLabById("forgeboard-m6-postgres")?.courseSlug).toBe("postgresql_apps");
    expect(listLabsForCourse("postgresql_apps")).toHaveLength(1);
  });

  it("wires prerequisite and roadmap metadata across the full-stack path", () => {
    expect(FULL_STACK_ROADMAP_ORDER).toContain("software_testing");
    expect(FULL_STACK_ROADMAP_ORDER).toContain("postgresql_apps");
    expect(FULL_STACK_ROADMAP_ORDER).toContain("nextjs_fullstack");
    expect(getCoursePrerequisites("postgresql_apps")).toContain("express_fundamentals");
    expect(getCourseNextSteps("express_fundamentals")).toContain("postgresql_apps");
  });
});
