/**
 * Lightweight JS static checks (no full AST parser dependency).
 * Used for code asserts, soft grade meta, and playground preflight.
 */

export type JsStaticIssue = {
  code: string;
  message: string;
  severity: "error" | "warn";
};

export type JsStaticAssert = {
  /** Substring that must appear */
  contains?: string;
  notContains?: string;
  /** Named pattern: function, const, let, arrow, async, fetch, class, export, … */
  has?: string;
  /** Min non-empty lines */
  minLines?: number;
};

const HAS_PATTERNS: Record<string, RegExp> = {
  function: /\bfunction\b/,
  const: /\bconst\b/,
  let: /\blet\b/,
  var: /\bvar\b/,
  arrow: /=>/,
  async: /\basync\b/,
  await: /\bawait\b/,
  fetch: /\bfetch\s*\(/,
  class: /\bclass\b/,
  export: /\bexport\b/,
  import: /\bimport\b/,
  return: /\breturn\b/,
  if: /\bif\s*\(/,
  for: /\bfor\s*\(/,
  while: /\bwhile\s*\(/,
  try: /\btry\s*\{/,
  promise: /\bPromise\b|\.then\s*\(/,
  console: /\bconsole\.(log|error|warn)\s*\(/,
};

/** Dangerous / discouraged patterns for learner sandbox. */
export function detectJsHazards(code: string): JsStaticIssue[] {
  const issues: JsStaticIssue[] = [];
  const src = code ?? "";
  if (/eval\s*\(/.test(src)) {
    issues.push({ code: "no_eval", message: "eval() is not allowed", severity: "error" });
  }
  if (/new\s+Function\s*\(/.test(src)) {
    issues.push({
      code: "no_function_ctor",
      message: "Function constructor is not allowed",
      severity: "error",
    });
  }
  if (/document\.cookie/.test(src)) {
    issues.push({
      code: "no_cookie",
      message: "document.cookie access is blocked in sandbox",
      severity: "warn",
    });
  }
  if (/localStorage|sessionStorage/.test(src)) {
    issues.push({
      code: "no_storage",
      message: "Web storage is unavailable in isolated iframe",
      severity: "warn",
    });
  }
  if (/while\s*\(\s*true\s*\)/.test(src) || /for\s*\(\s*;\s*;\s*\)/.test(src)) {
    issues.push({
      code: "infinite_loop",
      message: "Possible infinite loop — sandbox will time out",
      severity: "warn",
    });
  }
  return issues;
}

function assertFails(code: string, a: JsStaticAssert): string | null {
  if (a.contains && !code.includes(a.contains)) return `contains:${a.contains}`;
  if (a.notContains && code.includes(a.notContains)) return `notContains:${a.notContains}`;
  if (a.has) {
    const re = HAS_PATTERNS[a.has] ?? new RegExp(a.has);
    if (!re.test(code)) return `has:${a.has}`;
  }
  if (typeof a.minLines === "number") {
    const lines = code.split(/\r?\n/).filter((l) => l.trim().length > 0).length;
    if (lines < a.minLines) return `minLines:${a.minLines}`;
  }
  return null;
}

export function runJsStaticAsserts(
  code: string,
  asserts: JsStaticAssert[],
): { ok: boolean; missing: string[]; issues: JsStaticIssue[] } {
  const issues = detectJsHazards(code);
  const hardErrors = issues.filter((i) => i.severity === "error");
  const missing: string[] = hardErrors.map((i) => i.code);
  for (const a of asserts) {
    const fail = assertFails(code, a);
    if (fail) missing.push(fail);
  }
  return { ok: missing.length === 0, missing, issues };
}

/**
 * Partial credit: fraction of content asserts passed (0–1).
 * Hard hazards (eval etc.) zero the score.
 */
export function jsStaticPartialScore(
  code: string,
  asserts: JsStaticAssert[],
): { ratio: number; passed: number; total: number; missing: string[] } {
  if (!asserts.length) return { ratio: 0, passed: 0, total: 0, missing: ["no_asserts"] };
  const hazards = detectJsHazards(code).filter((i) => i.severity === "error");
  if (hazards.length) {
    return {
      ratio: 0,
      passed: 0,
      total: asserts.length,
      missing: hazards.map((h) => h.code),
    };
  }
  let passed = 0;
  const missing: string[] = [];
  for (const a of asserts) {
    const fail = assertFails(code, a);
    if (fail) missing.push(fail);
    else passed += 1;
  }
  const total = asserts.length;
  return { ratio: total ? passed / total : 0, passed, total, missing };
}
