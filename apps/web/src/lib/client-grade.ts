/**
 * Client-side soft grading for interactive drills (retry before lesson advances).
 * Delegates to shared grade helpers so rules stay aligned with the API.
 */

import {
  gradeCodeProjectChecks,
  normCode,
  type ProjectCheck,
} from "@eduforge/shared";

export { normCode };
export type { ProjectCheck };

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
  checks: ProjectCheck[],
  caseSensitive = true,
): { ok: boolean; missing: string[] } {
  return gradeCodeProjectChecks(files, checks, caseSensitive);
}

export function softGradeCodeOrder(answer: string[], correct: string[]): boolean {
  return (
    answer.length === correct.length && answer.every((w, i) => w === correct[i])
  );
}

export function softGradeMcq(selected: number, correctIndex: number): boolean {
  return selected === correctIndex;
}
