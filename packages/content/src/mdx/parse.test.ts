import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { mdxToExercises, parseMdxLesson } from "./parse.js";

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
});
