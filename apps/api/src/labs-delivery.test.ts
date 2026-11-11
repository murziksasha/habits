import { describe, expect, it } from "vitest";
import {
  coursesByGroup,
  FULL_STACK_ROADMAP_ORDER,
  getCourseNextSteps,
  getCoursePrerequisites,
  getLocalLabForLesson,
  LOCAL_LAB_MANIFESTS,
} from "@eduforge/shared";

function resolveLessonLocalLab(
  courseSlug: string,
  lessonSlug: string,
  contentSource?: string | null,
) {
  if (contentSource === "cms") return null;
  return getLocalLabForLesson(courseSlug, lessonSlug);
}

describe("local lab delivery and roadmap helpers", () => {
  it("returns local_practice manifests for milestone lessons and excludes CMS courses", () => {
    const m1 = resolveLessonLocalLab("html_semantics", "hs-forgeboard-a11y-lab", "seed");
    expect(m1?.labId).toBe("forgeboard-m1-a11y");
    expect(m1?.assessmentMode).toBe("local_practice");
    expect(m1?.downloadPath).toBe("/labs/forgeboard-m1-a11y-v1.0.0.zip");

    expect(resolveLessonLocalLab("html_semantics", "hs-forgeboard-a11y-lab", "cms")).toBeNull();
    expect(resolveLessonLocalLab("html_semantics", "non-lab-lesson", "seed")).toBeNull();
  });

  it("exposes all 13 ForgeBoard labs across deep tracks + devops without self-reported XP", () => {
    expect(LOCAL_LAB_MANIFESTS).toHaveLength(13);
    for (const lab of LOCAL_LAB_MANIFESTS) {
      expect(lab.assessmentMode).toBe("local_practice");
      expect(lab.downloadPath).toMatch(/^\/labs\/forgeboard-m\d+-[a-z0-9-]+-v\d+\.\d+\.\d+\.zip$/);
    }
  });

  it("wires all 7 new courses into shared deep group and roadmap graph", () => {
    const deep = coursesByGroup("deep");
    for (const slug of [
      "software_testing",
      "postgresql_apps",
      "git_workflows",
      "web_security",
      "ai_development",
      "nextjs_fullstack",
      "applied_algorithms",
    ] as const) {
      expect(deep).toContain(slug);
    }
    expect(FULL_STACK_ROADMAP_ORDER.length).toBeGreaterThanOrEqual(15);
    expect(getCoursePrerequisites("postgresql_apps")).toContain("express_fundamentals");
    expect(getCourseNextSteps("react_fundamentals")).toContain("software_testing");
    expect(getCourseNextSteps("react_fundamentals")).toContain("nextjs_fullstack");
  });
});
