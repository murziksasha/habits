import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import {
  aiDevelopmentContent,
  aiProductContent,
  aiSecurityContent,
  agenticSystemsContent,
  appliedAlgorithmsContent,
  goFundamentalsContent,
  webAccessibilityContent,
  restApiDesignContent,
  chessContent,
  cssLayoutContent,
  devopsContent,
  embeddedCppContent,
  englishContent,
  expressFundamentalsContent,
  gitWorkflowsContent,
  htmlSemanticsContent,
  jsFundamentalsContent,
  llmopsContent,
  logicContent,
  nextjsFullstackContent,
  nodeFundamentalsContent,
  postgresqlAppsContent,
  programmingContent,
  pythonForAiContent,
  qaTheoryContent,
  reactFundamentalsContent,
  softwareTestingContent,
  speedReadingContent,
  sqlFundamentalsContent,
  sysadminContent,
  typingContent,
  typescriptContent,
  webSecurityContent,
  type CourseContent,
} from "@eduforge/content";
import { COURSE_SLUGS, LOCAL_LAB_MANIFESTS } from "@eduforge/shared";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../..");

const ALL_CONTENT: CourseContent[] = [
  englishContent,
  chessContent,
  typingContent,
  speedReadingContent,
  logicContent,
  programmingContent,
  typescriptContent,
  htmlSemanticsContent,
  cssLayoutContent,
  qaTheoryContent,
  jsFundamentalsContent,
  reactFundamentalsContent,
  sqlFundamentalsContent,
  nodeFundamentalsContent,
  expressFundamentalsContent,
  embeddedCppContent,
  sysadminContent,
  devopsContent,
  softwareTestingContent,
  postgresqlAppsContent,
  gitWorkflowsContent,
  webSecurityContent,
  aiDevelopmentContent,
  pythonForAiContent,
  agenticSystemsContent,
  llmopsContent,
  aiSecurityContent,
  aiProductContent,
  nextjsFullstackContent,
  appliedAlgorithmsContent,
  goFundamentalsContent,
  webAccessibilityContent,
  restApiDesignContent,
];

function readZipEntryNames(buf: Buffer): string[] {
  const names: string[] = [];
  let offset = 0;
  // Walk local file headers (PK\x03\x04) or central directory headers (PK\x01\x02)
  while (offset + 46 <= buf.length) {
    const idx = buf.indexOf(Buffer.from([0x50, 0x4b, 0x01, 0x02]), offset);
    if (idx === -1 || idx + 46 > buf.length) break;
    const nameLen = buf.readUInt16LE(idx + 28);
    const extraLen = buf.readUInt16LE(idx + 30);
    const commentLen = buf.readUInt16LE(idx + 32);
    if (idx + 46 + nameLen <= buf.length) {
      names.push(buf.subarray(idx + 46, idx + 46 + nameLen).toString("utf8"));
    }
    offset = idx + 46 + nameLen + extraLen + commentLen;
  }
  return names;
}

test("all shared COURSE_SLUGS have matching course content", () => {
  const contentSlugs = new Set(ALL_CONTENT.map((c) => c.slug));
  for (const slug of COURSE_SLUGS) {
    assert.ok(contentSlugs.has(slug), `Missing course content for slug: ${slug}`);
  }
});

test("every LocalLabManifest maps to an existing non-exam lesson and has a clean starter zip", () => {
  const bySlug = new Map(ALL_CONTENT.map((c) => [c.slug, c]));
  assert.equal(LOCAL_LAB_MANIFESTS.length, 13);

  for (const manifest of LOCAL_LAB_MANIFESTS) {
    const course = bySlug.get(manifest.courseSlug);
    assert.ok(course, `Manifest ${manifest.labId} references missing course ${manifest.courseSlug}`);

    const allLessons = course.units.flatMap((u) => u.lessons);
    const lesson = allLessons.find((l) => l.slug === manifest.lessonSlug);
    assert.ok(
      lesson,
      `Manifest ${manifest.labId} missing lesson ${manifest.courseSlug}/${manifest.lessonSlug}`,
    );
    assert.notEqual(
      Boolean(lesson.isExam),
      true,
      `Manifest ${manifest.labId} should attach to a practice lesson, not an exam`,
    );

    const zipRel = manifest.downloadPath.replace(/^\//, "");
    const zipPath = path.resolve(repoRoot, "apps/web/public", zipRel);
    assert.ok(fs.existsSync(zipPath), `Missing packaged zip at ${zipPath}`);

    const stat = fs.statSync(zipPath);
    assert.ok(stat.size > 200, `Zip bundle ${zipPath} appears empty (${stat.size} bytes)`);

    const buf = fs.readFileSync(zipPath);
    assert.equal(buf[0], 0x50, `Zip magic byte 0 invalid for ${zipPath}`);
    assert.equal(buf[1], 0x4b, `Zip magic byte 1 invalid for ${zipPath}`);

    const entries = readZipEntryNames(buf);
    assert.ok(entries.length > 0, `Zip archive ${zipPath} has no entries`);
    for (const entry of entries) {
      const normalized = entry.replace(/\\/g, "/").toLowerCase();
      assert.ok(
        !normalized.startsWith("solution/") &&
          !normalized.includes("/solution/") &&
          !normalized.startsWith("broken/") &&
          !normalized.includes("/broken/") &&
          !normalized.includes(".git/"),
        `Packaged zip ${zipPath} leaked restricted entry: ${entry}`,
      );
    }
  }
});
