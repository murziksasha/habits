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
  /** Concept card blocks (SPEC 92): <!-- concept titleUk=".." titleEn=".." --> … <!-- /concept --> */
  concepts: MdxConcept[];
};

export type MdxConcept = {
  titleUk: string;
  titleEn: string;
  bodyUk: string;
  bodyEn: string;
  keyPointsUk: string[];
  keyPointsEn: string[];
  code?: string;
  language?: string;
  check?: { qUk: string; qEn: string; options: string[]; correctIndex: number };
};

const CONCEPT_RE =
  /<!--\s*concept\s+titleUk="([^"]+)"(?:\s+titleEn="([^"]*)")?\s*-->([\s\S]*?)<!--\s*\/concept\s*-->/g;
const CHECK_RE = /q="([^"]+)"(?:\s+qEn="([^"]*)")?\s+options="([^"]+)"\s+answer=(\d+)/;

function splitPoints(v: string): string[] {
  return v
    .split("|")
    .map((x) => x.trim())
    .filter(Boolean);
}

/**
 * Concept block body: sections start with `::uk`, `::en`, `::points-uk a | b`,
 * `::points-en a | b`, `::check q=".." qEn=".." options="a|b" answer=0`.
 * The first fenced code block inside becomes the concept's code example.
 */
export function parseConceptBlock(titleUk: string, titleEn: string, inner: string): MdxConcept {
  const out: MdxConcept = {
    titleUk,
    titleEn: titleEn || titleUk,
    bodyUk: "",
    bodyEn: "",
    keyPointsUk: [],
    keyPointsEn: [],
  };
  const fence = new RegExp(FENCE_RE.source).exec(inner);
  if (fence) {
    out.language = fence[1] || "text";
    out.code = fence[2]!.trimEnd();
  }
  const withoutCode = inner.replace(new RegExp(FENCE_RE.source, "g"), "");
  let section: "uk" | "en" | null = null;
  const uk: string[] = [];
  const en: string[] = [];
  for (const line of withoutCode.split(/\r?\n/)) {
    const t = line.trim();
    if (t === "::uk") {
      section = "uk";
      continue;
    }
    if (t === "::en") {
      section = "en";
      continue;
    }
    if (t.startsWith("::points-uk")) {
      out.keyPointsUk = splitPoints(t.slice("::points-uk".length));
      section = null;
      continue;
    }
    if (t.startsWith("::points-en")) {
      out.keyPointsEn = splitPoints(t.slice("::points-en".length));
      section = null;
      continue;
    }
    if (t.startsWith("::check")) {
      const m = CHECK_RE.exec(t);
      if (m) {
        out.check = {
          qUk: m[1]!,
          qEn: m[2]?.trim() || m[1]!,
          options: splitPoints(m[3]!),
          correctIndex: Number(m[4]),
        };
      }
      section = null;
      continue;
    }
    if (section === "uk") uk.push(line);
    if (section === "en") en.push(line);
  }
  out.bodyUk = uk.join("\n").trim();
  out.bodyEn = en.join("\n").trim() || out.bodyUk;
  if (!out.keyPointsEn.length) out.keyPointsEn = out.keyPointsUk;
  return out;
}

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

  let m: RegExpExecArray | null;
  const concepts: MdxConcept[] = [];
  const conceptRe = new RegExp(CONCEPT_RE.source, "g");
  while ((m = conceptRe.exec(body))) {
    concepts.push(parseConceptBlock(m[1]!, m[2] ?? "", m[3] ?? ""));
  }
  // Code inside concept blocks is an example, not a code_fill drill
  const drillBody = body.replace(new RegExp(CONCEPT_RE.source, "g"), "");

  const codeBlocks: { lang: string; code: string }[] = [];
  const fence = new RegExp(FENCE_RE.source, "g");
  while ((m = fence.exec(drillBody))) {
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

  return { frontmatter, body, codeBlocks, mcqHints, concepts };
}

const FILL_BLANK_RE =
  /<!--\s*fill\s+q="([^"]+)"\s+answer="([^"]+)"\s*(?:qEn="([^"]*)")?\s*-->/g;
/** <!-- explain q=".." qEn=".." ideas="labelUk|labelEn|stem1,stem2;..." minWords=12 --> */
const EXPLAIN_RE =
  /<!--\s*explain\s+q="([^"]+)"(?:\s+qEn="([^"]*)")?\s+ideas="([^"]+)"(?:\s+minWords=(\d+))?\s*-->/g;

export function parseExplainIdeas(v: string): { labelUk: string; labelEn?: string; anyOf: string[] }[] {
  return v
    .split(";")
    .map((chunk) => {
      const [uk = "", en = "", stems = ""] = chunk.split("|").map((x) => x.trim());
      const anyOf = stems
        .split(",")
        .map((x) => x.trim().toLowerCase())
        .filter(Boolean);
      if (!uk || !anyOf.length) return null;
      return { labelUk: uk, ...(en ? { labelEn: en } : {}), anyOf };
    })
    .filter((x): x is { labelUk: string; labelEn?: string; anyOf: string[] } => x !== null);
}

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
  (parsed.concepts ?? []).forEach((c, i) => {
    exercises.push({
      id: `${idPrefix}-concept-${i + 1}`,
      type: "concept",
      promptUk: c.titleUk,
      promptEn: c.titleEn,
      bodyUk: c.bodyUk,
      bodyEn: c.bodyEn,
      keyPointsUk: c.keyPointsUk,
      keyPointsEn: c.keyPointsEn,
      ...(c.code ? { code: c.code, language: c.language } : {}),
      ...(c.check ? { check: c.check } : {}),
    });
  });
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

  const exRe = new RegExp(EXPLAIN_RE.source, "g");
  let xi = 0;
  while ((m = exRe.exec(parsed.body))) {
    xi += 1;
    exercises.push({
      id: `${idPrefix}-explain-${xi}`,
      type: "explain",
      promptUk: m[1],
      promptEn: m[2]?.trim() || m[1],
      keyIdeas: parseExplainIdeas(m[3]!),
      minWords: m[4] ? Number(m[4]) : 12,
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
