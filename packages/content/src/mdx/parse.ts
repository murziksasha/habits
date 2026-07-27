/**
 * Minimal MDX/Markdown frontmatter → lesson builder pipeline.
 * Supports YAML-like frontmatter between --- fences (no external gray-matter dep).
 */

export type MdxFrontmatter = {
  slug?: string;
  titleUk?: string;
  titleEn?: string;
  difficulty?: number;
  isFree?: boolean;
  isExam?: boolean;
  passThreshold?: number;
  baseXp?: number;
  videoUrl?: string;
  videoDurationSec?: number;
  [key: string]: unknown;
};

export type ParsedMdxLesson = {
  frontmatter: MdxFrontmatter;
  body: string;
  /** Extracted fenced code blocks */
  codeBlocks: { lang: string; code: string }[];
  /** Simple MCQ blocks: <!-- mcq q="..." options="a|b|c" answer=0 --> */
  mcqHints: { prompt: string; options: string[]; correctIndex: number }[];
};

function parseYamlish(block: string): MdxFrontmatter {
  const out: MdxFrontmatter = {};
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1]!;
    let raw = m[2]!.trim();
    if (
      (raw.startsWith('"') && raw.endsWith('"')) ||
      (raw.startsWith("'") && raw.endsWith("'"))
    ) {
      raw = raw.slice(1, -1);
    }
    if (raw === "true") out[key] = true;
    else if (raw === "false") out[key] = false;
    else if (/^-?\d+(\.\d+)?$/.test(raw)) out[key] = Number(raw);
    else out[key] = raw;
  }
  return out;
}

const FENCE_RE = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
const MCQ_RE =
  /<!--\s*mcq\s+q="([^"]+)"\s+options="([^"]+)"\s+answer=(\d+)\s*-->/g;

export function parseMdxLesson(source: string): ParsedMdxLesson {
  let body = source;
  let frontmatter: MdxFrontmatter = {};
  const fm = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (fm) {
    frontmatter = parseYamlish(fm[1]!);
    body = fm[2]!;
  }

  const codeBlocks: { lang: string; code: string }[] = [];
  let m: RegExpExecArray | null;
  const fence = new RegExp(FENCE_RE.source, "g");
  while ((m = fence.exec(body))) {
    codeBlocks.push({ lang: m[1] || "text", code: m[2]!.trimEnd() });
  }

  const mcqHints: ParsedMdxLesson["mcqHints"] = [];
  const mcq = new RegExp(MCQ_RE.source, "g");
  while ((m = mcq.exec(body))) {
    mcqHints.push({
      prompt: m[1]!,
      options: m[2]!.split("|").map((s) => s.trim()),
      correctIndex: Number(m[3]),
    });
  }

  return { frontmatter, body, codeBlocks, mcqHints };
}

/**
 * Convert parsed MDX into a seedable exercise list (mcq + optional video + code_fill).
 */
export function mdxToExercises(
  parsed: ParsedMdxLesson,
  idPrefix = "mdx",
): Record<string, unknown>[] {
  const exercises: Record<string, unknown>[] = [];
  const fm = parsed.frontmatter;
  if (fm.videoUrl) {
    exercises.push({
      id: `${idPrefix}-video`,
      type: "video",
      promptUk: fm.titleUk ?? "Відео",
      promptEn: fm.titleEn ?? "Video",
      videoUrl: fm.videoUrl,
      durationSec: fm.videoDurationSec ?? 60,
      minWatchRatio: 0.8,
    });
  }
  parsed.mcqHints.forEach((q, i) => {
    exercises.push({
      id: `${idPrefix}-mcq-${i + 1}`,
      type: "mcq",
      promptUk: q.prompt,
      promptEn: q.prompt,
      options: q.options,
      correctIndex: q.correctIndex,
    });
  });
  parsed.codeBlocks.slice(0, 3).forEach((b, i) => {
    if (["js", "javascript", "ts", "typescript", "python", "bash"].includes(b.lang)) {
      exercises.push({
        id: `${idPrefix}-code-${i + 1}`,
        type: "code_fill",
        promptUk: `Доповни код (${b.lang})`,
        promptEn: `Complete the code (${b.lang})`,
        starter: b.code,
        accepted: [b.code.trim()],
        language: b.lang,
      });
    }
  });
  return exercises;
}
