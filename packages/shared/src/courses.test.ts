import { describe, expect, it } from "vitest";
import {
  COURSE_GLOBAL_WEIGHT,
  COURSE_GROUP,
  COURSE_HUB_HREF,
  COURSE_META,
  FULL_STACK_ROADMAP_ORDER,
  getCourseNextSteps,
  getCourseParts,
  getCoursePrerequisites,
  listCourseRegistry,
} from "./index.js";

describe("course parts", () => {
  it("keeps DevOps on its existing hub with six ordered parts and the capstone last", () => {
    const parts = getCourseParts("devops");
    expect(parts.map((part) => part.titleEn)).toEqual([
      "Foundations", "Ship an image", "Run it", "Stay up", "Platform discipline", "On call",
    ]);
    const slugs = parts.flatMap((part) => part.unitSlugs);
    expect(slugs).toHaveLength(22);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs[0]).toBe("git-workstation");
    expect(slugs.at(-1)).toBe("sre-capstone");
    expect(parts.every((part) => part.titleUk.length > 0 && part.unitSlugs.length > 0)).toBe(true);
    expect(listCourseRegistry().find((course) => course.slug === "devops")).toMatchObject({
      group: "skill", hubHref: "/courses/devops",
    });
    expect(COURSE_META.devops.descriptionEn).toContain("CI ends at the image push");
  });

  it("does not create presentation groups for other courses or unknown CMS slugs", () => {
    expect(getCourseParts("sysadmin")).toEqual([]);
    expect(getCourseParts("english")).toEqual([]);
    expect(getCourseParts("custom-course")).toEqual([]);
    expect(getCourseParts("toString")).toEqual([]);
  });

  it("registers the five AI skills deep tracks and roadmap edges without blocking existing paths", () => {
    const aiSlugs = [
      "python_for_ai",
      "agentic_systems",
      "llmops",
      "ai_security",
      "ai_product",
    ] as const;

    const aiIdx = FULL_STACK_ROADMAP_ORDER.indexOf("ai_development");
    expect(aiIdx).toBeGreaterThan(-1);
    expect(FULL_STACK_ROADMAP_ORDER.slice(aiIdx + 1, aiIdx + 6)).toEqual([...aiSlugs]);

    for (const slug of aiSlugs) {
      expect(COURSE_GROUP[slug]).toBe("deep");
      expect(COURSE_META[slug].group).toBe("deep");
      expect(COURSE_HUB_HREF[slug]).toBe(`/${slug.replace(/_/g, "-")}`);
    }
    expect(COURSE_GLOBAL_WEIGHT.ai_security).toBe(1.1);
    expect(COURSE_GLOBAL_WEIGHT.python_for_ai).toBe(1.05);

    expect(getCoursePrerequisites("python_for_ai")).toEqual(["programming"]);
    expect(getCourseNextSteps("python_for_ai")).toEqual(["agentic_systems", "typescript"]);
    expect(getCoursePrerequisites("agentic_systems")).toEqual(["python_for_ai", "ai_development"]);
    expect(getCourseNextSteps("agentic_systems")).toEqual(["llmops", "ai_security"]);
    expect(getCoursePrerequisites("llmops")).toEqual(["agentic_systems", "node_fundamentals"]);
    expect(getCourseNextSteps("llmops")).toEqual(["ai_security", "devops"]);
    expect(getCoursePrerequisites("ai_security")).toEqual(["agentic_systems", "web_security"]);
    expect(getCourseNextSteps("ai_security")).toEqual(["ai_product"]);
    expect(getCoursePrerequisites("ai_product")).toEqual(["agentic_systems", "ai_security"]);
    expect(getCourseNextSteps("ai_product")).toEqual(["devops"]);

    const aiDevNext = getCourseNextSteps("ai_development");
    expect(aiDevNext).toContain("python_for_ai");
    expect(aiDevNext).toContain("nextjs_fullstack");
    expect(aiDevNext).toContain("applied_algorithms");
  });
});
