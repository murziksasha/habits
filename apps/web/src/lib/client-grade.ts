/**
 * Client-side soft grading for interactive drills (retry before lesson advances).
 * Mirrors server gradeExercise rules for code_* types.
 */

export function normCode(s: string, caseSensitive: boolean) {
  const t = s.trim().replace(/\s+/g, " ");
  return caseSensitive ? t : t.toLowerCase();
}

export function softGradeCodeFill(
  answer: string,
  accepted: string[],
  caseSensitive = true,
): boolean {
  return accepted.some(
    (a) => normCode(String(a), caseSensitive) === normCode(answer, caseSensitive),
  );
}

export type ProjectCheck = {
  fileId?: string;
  contains?: string[];
  containsHtml?: string[];
  kind?: "source" | "dom";
  selector?: string;
  minCount?: number;
};

export function softGradeCodeProject(
  files: Record<string, string> | { id: string; content: string }[],
  checks: ProjectCheck[],
  caseSensitive = true,
): { ok: boolean; missing: string[] } {
  const map = new Map<string, string>();
  if (Array.isArray(files)) {
    for (const f of files) map.set(f.id, f.content ?? "");
  } else {
    for (const [k, v] of Object.entries(files)) map.set(k, String(v ?? ""));
  }
  const allJoined = [...map.values()].join("\n");
  const missing: string[] = [];

  for (const ch of checks) {
    if (ch.kind === "dom" && ch.selector) {
      // Lightweight DOM presence: tag/class patterns in HTML source (no live iframe)
      const html = allJoined;
      const sel = ch.selector;
      let ok = false;
      if (sel.startsWith(".")) {
        const cls = sel.slice(1);
        ok =
          html.includes(`class="${cls}"`) ||
          html.includes(`class='${cls}'`) ||
          html.includes(`class="${cls} `) ||
          html.includes(` ${cls}"`) ||
          new RegExp(`class=["'][^"']*\\b${cls}\\b`).test(html);
      } else if (sel.startsWith("#")) {
        const id = sel.slice(1);
        ok = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
      } else {
        const tag = sel.replace(/[^a-z0-9-]/gi, "") || sel;
        ok = new RegExp(`<${tag}[\\s>]`, "i").test(html);
      }
      if (!ok) missing.push(`dom:${sel}`);
      continue;
    }

    if (ch.containsHtml?.length) {
      let content = allJoined;
      if (!caseSensitive) content = content.toLowerCase();
      for (const needle of ch.containsHtml) {
        const n = caseSensitive ? needle : needle.toLowerCase();
        if (!content.includes(n)) missing.push(`html: ${needle}`);
      }
    }

    if (ch.fileId && ch.contains?.length) {
      let content = map.get(ch.fileId) ?? "";
      if (!caseSensitive) content = content.toLowerCase();
      for (const needle of ch.contains) {
        const n = caseSensitive ? needle : needle.toLowerCase();
        if (!content.includes(n)) missing.push(`${ch.fileId}: ${needle}`);
      }
    }
  }
  return { ok: missing.length === 0, missing };
}

export function softGradeCodeOrder(answer: string[], correct: string[]): boolean {
  return (
    answer.length === correct.length && answer.every((w, i) => w === correct[i])
  );
}

export function softGradeMcq(selected: number, correctIndex: number): boolean {
  return selected === correctIndex;
}
