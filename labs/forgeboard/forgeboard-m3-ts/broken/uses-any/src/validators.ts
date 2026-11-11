import type { AsyncState, Result, Task, TaskStatus, ValidationError } from "./models.js";

// BUG: uses unsafe `any` cast bypassing unknown narrowing & status check
export function parseTaskPayload(raw: unknown): Result<Task, ValidationError> {
  const unsafe = raw as any;
  if (!unsafe) {
    return { ok: false, error: { code: "invalid_payload", message: "Expected non-null object" } };
  }
  return {
    ok: true,
    value: {
      id: Number(unsafe.id),
      title: String(unsafe.title ?? "").trim(),
      status: (unsafe.status ?? "todo") as TaskStatus,
    },
  };
}

export function renderAsyncSummary(state: AsyncState<readonly Task[]>): string {
  if (state.kind === "loading") return "loading";
  if (state.kind === "error") return `error: ${state.message}`;
  if (state.kind === "success") return `${state.data.length} task(s)`;
  return "idle";
}

export function safePickFirstTitle(items: readonly Task[]): string | null {
  return items[0]?.title ?? null;
}
