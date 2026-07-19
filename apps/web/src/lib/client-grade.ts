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

export function softGradeCodeProject(
  files: Record<string, string> | { id: string; content: string }[],
  checks: { fileId: string; contains: string[] }[],
  caseSensitive = true,
): { ok: boolean; missing: string[] } {
  const map = new Map<string, string>();
  if (Array.isArray(files)) {
    for (const f of files) map.set(f.id, f.content ?? "");
  } else {
    for (const [k, v] of Object.entries(files)) map.set(k, String(v ?? ""));
  }
  const missing: string[] = [];
  for (const ch of checks) {
    let content = map.get(ch.fileId) ?? "";
    if (!caseSensitive) content = content.toLowerCase();
    for (const needle of ch.contains ?? []) {
      const n = caseSensitive ? needle : needle.toLowerCase();
      if (!content.includes(n)) missing.push(`${ch.fileId}: ${needle}`);
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
