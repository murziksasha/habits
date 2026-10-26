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

const FENCE_RE = /```([a-zA-Z0-9_-]*)\r?\n([\s\S]*?)```/g;
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

const FILL_BLANK_RE =
  /<!--\s*fill\s+q="([^"]+)"\s+answer="([^"]+)"\s*(?:qEn="([^"]*)")?\s*-->/g;
const TRANSLATE_RE =
  /<!--\s*translate\s+q="([^"]+)"\s+accepted="([^"]+)"\s*(?:qEn="([^"]*)")?\s*-->/g;

export type MdxLessonSeed = {
  slug: string;
  titleUk: string;
  titleEn: string;
  difficulty: number;
  isFree: boolean;
  isExam: boolean;
  passThreshold?: number;
  baseXp: number;
  exercises: Record<string, unknown>[];
  body: string;
};

/**
 * Convert parsed MDX into a seedable exercise list
 * (video + mcq + fill_blank + translate + code_fill).
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

  let m: RegExpExecArray | null;
  const fillRe = new RegExp(FILL_BLANK_RE.source, "g");
  let fi = 0;
  while ((m = fillRe.exec(parsed.body))) {
    fi += 1;
    const accepted = m[2]!
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    exercises.push({
      id: `${idPrefix}-fill-${fi}`,
      type: "fill_blank",
      promptUk: m[1],
      promptEn: m[3]?.trim() || m[1],
      sentence: m[1],
      accepted,
    });
  }
  const trRe = new RegExp(TRANSLATE_RE.source, "g");
  let ti = 0;
  while ((m = trRe.exec(parsed.body))) {
    ti += 1;
    const accepted = m[2]!
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    exercises.push({
      id: `${idPrefix}-tr-${ti}`,
      type: "translate",
      promptUk: m[1],
      promptEn: m[3]?.trim() || m[1],
      source: m[1],
      accepted,
      direction: "en_uk",
    });
  }

  parsed.codeBlocks.slice(0, 3).forEach((b, i) => {
    if (["js", "javascript", "ts", "typescript", "python", "bash", "cpp", "c"].includes(b.lang)) {
      exercises.push({
        id: `${idPrefix}-code-${i + 1}`,
        type: "code_fill",
        promptUk: `Доповни код (${b.lang})`,
        promptEn: `Complete the code (${b.lang})`,
        starter: b.code,
        code: b.code,
        accepted: [b.code.trim()],
        language: b.lang,
      });
    }
  });
  return exercises;
}

/** Full lesson object ready for seed / CMS import. */
export function mdxToLesson(parsed: ParsedMdxLesson, idPrefix?: string): MdxLessonSeed {
  const fm = parsed.frontmatter;
  const slug =
    (typeof fm.slug === "string" && fm.slug) ||
    `mdx-${(fm.titleEn || fm.titleUk || "lesson")
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48)}`;
  const prefix = idPrefix ?? slug;
  return {
    slug,
    titleUk: String(fm.titleUk ?? fm.titleEn ?? slug),
    titleEn: String(fm.titleEn ?? fm.titleUk ?? slug),
    difficulty: typeof fm.difficulty === "number" ? fm.difficulty : 1,
    isFree: Boolean(fm.isFree),
    isExam: Boolean(fm.isExam),
    passThreshold:
      typeof fm.passThreshold === "number" ? fm.passThreshold : undefined,
    baseXp: typeof fm.baseXp === "number" ? fm.baseXp : 15,
    exercises: mdxToExercises(parsed, prefix),
    body: parsed.body,
  };
}
