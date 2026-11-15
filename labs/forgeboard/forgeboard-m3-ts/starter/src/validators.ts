import type { AsyncState, Result, Task, ValidationError } from "./models.js";

// TODO: Narrow unknown safely without `any`
export function parseTaskPayload(raw: unknown): Result<Task, ValidationError> {
  void raw;
  return {
    ok: false,
    error: { code: "invalid_payload", message: "Not implemented" },
  };
}

export function renderAsyncSummary(state: AsyncState<readonly Task[]>): string {
  // TODO: Exhaustive switch over discriminated union
  void state;
  return "idle";
}

export function safePickFirstTitle(items: readonly Task[]): string | null {
  // TODO: Account for noUncheckedIndexedAccess safely
  const first = items[0];
  return first ? first.title : null;
}
