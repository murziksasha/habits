import { describe, expect, it } from "vitest";
import { COURSE_META, getCourseParts, listCourseRegistry } from "./index.js";

describe("course parts", () => {
  it("keeps DevOps on its existing hub with five ordered parts and the capstone last", () => {
    const parts = getCourseParts("devops");
    expect(parts.map((part) => part.titleEn)).toEqual([
      "Foundations", "Ship an image", "Run it", "Stay up", "On call",
    ]);
    const slugs = parts.flatMap((part) => part.unitSlugs);
    expect(slugs).toHaveLength(19);
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
});
