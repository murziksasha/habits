import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { mdxToExercises, mdxToLesson, parseMdxLesson } from "./parse.js";

const here = dirname(fileURLToPath(import.meta.url));

describe("parseMdxLesson", () => {
  it("parses sample lesson", () => {
    const src = readFileSync(join(here, "sample-lesson.mdx"), "utf8");
    const p = parseMdxLesson(src);
    expect(p.frontmatter.slug).toBe("intro-video-js");
    expect(p.frontmatter.videoUrl).toContain("youtube");
    expect(p.mcqHints.length).toBe(1);
    expect(p.codeBlocks.length).toBe(1);
    const ex = mdxToExercises(p);
    expect(ex.some((e) => e.type === "video")).toBe(true);
    expect(ex.some((e) => e.type === "mcq")).toBe(true);
  });

  it("parses fill_blank + translate markers and mdxToLesson", () => {
    const src = `---
slug: mdx-fill-demo
titleUk: Демо
titleEn: Demo
isFree: true
baseXp: 12
---

Intro text.

<!-- fill q="Столиця України?" answer="Київ|Kyiv" qEn="Capital of Ukraine?" -->
<!-- translate q="Hello" accepted="Привіт|привіт" qEn="Hello" -->

\`\`\`js
console.log(1)
\`\`\`
`;
    const p = parseMdxLesson(src);
    const lesson = mdxToLesson(p);
    expect(lesson.slug).toBe("mdx-fill-demo");
    expect(lesson.isFree).toBe(true);
    expect(lesson.baseXp).toBe(12);
    expect(lesson.exercises.some((e) => e.type === "fill_blank")).toBe(true);
    expect(lesson.exercises.some((e) => e.type === "translate")).toBe(true);
    expect(lesson.exercises.some((e) => e.type === "code_fill")).toBe(true);
  });
});

describe("concept + explain markers (SPEC 92)", () => {
  it("parses a concept block into a concept exercise placed first", () => {
    const src = readFileSync(join(here, "concept-lesson.mdx"), "utf8");
    const p = parseMdxLesson(src);
    expect(p.concepts).toHaveLength(1);
    const c = p.concepts[0]!;
    expect(c.titleEn).toBe("What a closure is");
    expect(c.bodyUk).toContain("лексичним оточенням");
    expect(c.bodyUk.split("\n\n")).toHaveLength(2);
    expect(c.bodyEn).toContain("outer variables");
    expect(c.keyPointsUk).toHaveLength(2);
    expect(c.check).toMatchObject({ options: ["3", "1", "undefined"], correctIndex: 0 });
    expect(c.language).toBe("js");
    expect(c.code).toContain("counter");
    // code inside the concept is an example, not a code_fill drill
    expect(p.codeBlocks).toHaveLength(0);

    const lesson = mdxToLesson(p);
    expect(lesson.exercises[0]!.type).toBe("concept");
    expect(lesson.exercises.some((e) => e.type === "mcq")).toBe(true);
    const explain = lesson.exercises.find((e) => e.type === "explain")!;
    expect(explain.minWords).toBe(12);
    expect((explain.keyIdeas as unknown[]).length).toBe(3);
    expect(lesson.exercises.some((e) => e.type === "code_fill")).toBe(false);
  });
});
