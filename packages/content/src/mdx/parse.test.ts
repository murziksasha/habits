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
