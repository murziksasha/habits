import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { COURSE_SLUGS, LOCAL_LAB_MANIFESTS } from "@eduforge/shared";
import { ALL_COURSE_CONTENTS } from "./index.js";

const repoRoot = path.resolve(__dirname, "../../..");
const specDir = path.join(repoRoot, "SPEC");
const specCoursesDir = path.join(specDir, "courses");

describe("documentation quality and consistency gate", () => {
  it("every registered course slug has an active specification file in SPEC/courses", () => {
    for (const slug of COURSE_SLUGS) {
      const file = path.join(specCoursesDir, `${slug}.md`);
      expect(fs.existsSync(file), `SPEC/courses/${slug}.md must exist`).toBe(true);
      const content = fs.readFileSync(file, "utf8");
      expect(content).toContain(`Slug: \`${slug}\``);
      expect(content).toContain("Access: Free for every account");
      expect(content).not.toContain("Freemium: first");
      expect(content).not.toContain("[free]");
    }
  });

  it("actual compiled content counts exactly match SPEC/courses/README.md", () => {
    const readmePath = path.join(specCoursesDir, "README.md");
    expect(fs.existsSync(readmePath)).toBe(true);
    const readmeContent = fs.readFileSync(readmePath, "utf8");

    // Match rows: | [`slug`](./slug.md) | group | units | lessons | exams | lab | ... |
    const rowRegex = /\|\s*\[`([^`]+)`\]\(\.\/([^)]+)\.md\)\s*\|\s*(\w+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|/g;
    const matches = [...readmeContent.matchAll(rowRegex)];

    expect(matches.length).toBe(COURSE_SLUGS.length);

    let docUnitsTotal = 0;
    let docLessonsTotal = 0;
    let docExamsTotal = 0;

    for (const match of matches) {
      const slug = match[1];
      const docUnits = Number(match[4]);
      const docLessons = Number(match[5]);
      const docExams = Number(match[6]);

      docUnitsTotal += docUnits;
      docLessonsTotal += docLessons;
      docExamsTotal += docExams;

      const courseContent = ALL_COURSE_CONTENTS.find((c) => c.slug === slug);
      expect(courseContent, `Course content found for ${slug}`).toBeTruthy();

      const actualUnits = courseContent!.units.length;
      const actualLessons = courseContent!.units.flatMap((u) => u.lessons).length;
      const actualExams = courseContent!.units.flatMap((u) => u.lessons).filter((l) => l.isExam).length;

      expect(actualUnits, `${slug} units count matches README`).toBe(docUnits);
      expect(actualLessons, `${slug} lessons count matches README`).toBe(docLessons);
      expect(actualExams, `${slug} exams count matches README`).toBe(docExams);
    }

    expect(docUnitsTotal).toBe(498);
    expect(docLessonsTotal).toBe(2153);
    expect(docExamsTotal).toBe(453);
  });

  it("all 13 LocalLabManifests are accounted for in SPEC/courses/README.md", () => {
    const readmeContent = fs.readFileSync(path.join(specCoursesDir, "README.md"), "utf8");
    for (const lab of LOCAL_LAB_MANIFESTS) {
      expect(readmeContent).toContain(lab.labId);
    }
    expect(LOCAL_LAB_MANIFESTS.length).toBe(13);
  });

  it("active core specs contain no cancelled paywall or bearer-in-localstorage rules", () => {
    const activeSpecs = [
      "CURRENT.md",
      "COURSE-REGISTRY.md",
      "02-architecture.md",
      "05-courses-and-content.md",
      "08-auth-billing-admin.md",
      "09-frontend.md",
      "CONTENT-DX.md",
    ];

    for (const filename of activeSpecs) {
      const filePath = path.join(specDir, filename);
      expect(fs.existsSync(filePath), `${filename} exists`).toBe(true);
      const text = fs.readFileSync(filePath, "utf8");

      expect(text, `${filename} must not contain SPA uses Bearer from localStorage`).not.toContain(
        "SPA uses Bearer from `localStorage`",
      );
      expect(text, `${filename} must not contain Client stores token in localStorage`).not.toContain(
        "Client stores token in `localStorage`",
      );
      expect(text, `${filename} must not contain Freemium / Premium pricing table row`).not.toContain(
        "| `/pricing` | Freemium / Premium |",
      );
    }
  });

  it("wave numbers in SPEC/CURRENT.md are strictly unique without collisions", () => {
    const currentPath = path.join(specDir, "CURRENT.md");
    const currentText = fs.readFileSync(currentPath, "utf8");

    const waveMatches = [...currentText.matchAll(/^\s*(\d{2,3})\.\s+(.+?)$/gm)];
    expect(waveMatches.length).toBeGreaterThan(100);

    const seenNumbers = new Map<string, string>();
    const duplicates: string[] = [];

    for (const match of waveMatches) {
      const num = match[1]!;
      const title = match[2]!;
      if (seenNumbers.has(num)) {
        duplicates.push(`Wave ${num}: "${title}" duplicates earlier "${seenNumbers.get(num)}"`);
      } else {
        seenNumbers.set(num, title);
      }
    }

    expect(duplicates, "No duplicate wave numbers in CURRENT.md").toEqual([]);
  });

  it("package.json scripts referenced in documentation exist", () => {
    const packageJson = JSON.parse(fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"));
    const documentedCommands = [
      "test",
      "test:unit",
      "test:integration",
      "test:e2e",
      "labs:pack",
      "labs:verify",
      "ci",
      "ci:full",
      "content:sync",
      "db:seed",
      "build",
      "typecheck",
    ];

    for (const cmd of documentedCommands) {
      expect(packageJson.scripts[cmd], `package.json script '${cmd}' exists`).toBeDefined();
    }
  });
});
