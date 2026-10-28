/**
 * Admin exercise-builder helpers for concept / explain forms (SPEC 92).
 * Kept pure so they are unit-testable.
 */
import type { ExplainKeyIdea } from "@eduforge/shared";

export function linesToList(v: string): string[] {
  return v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function listToLines(v: unknown): string {
  return Array.isArray(v) ? (v as string[]).join("\n") : "";
}

/** One idea per line: `labelUk | labelEn | stem1, stem2` */
export function parseKeyIdeasLines(v: string): ExplainKeyIdea[] {
  return linesToList(v)
    .map((line) => {
      const [uk = "", en = "", stems = ""] = line.split("|").map((p) => p.trim());
      const anyOf = stems
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      if (!uk || !anyOf.length) return null;
      return { labelUk: uk, ...(en ? { labelEn: en } : {}), anyOf };
    })
    .filter((x): x is ExplainKeyIdea => x !== null);
}

export function formatKeyIdeasLines(v: unknown): string {
  if (!Array.isArray(v)) return "";
  return (v as ExplainKeyIdea[])
    .map((i) => `${i.labelUk} | ${i.labelEn ?? ""} | ${(i.anyOf ?? []).join(", ")}`)
    .join("\n");
}
