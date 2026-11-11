import type { AsyncState, Result, Task, TaskStatus, ValidationError } from "./models.js";

const VALID_STATUSES = new Set<TaskStatus>(["todo", "in_progress", "done"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertNever(x: never): never {
  throw new Error(`Unexpected state: ${String(x)}`);
}

export function parseTaskPayload(raw: unknown): Result<Task, ValidationError> {
  if (!isRecord(raw) || typeof raw.id !== "number" || !Number.isInteger(raw.id) || raw.id <= 0) {
    return {
      ok: false,
      error: { code: "invalid_payload", message: "Expected non-null object" },
    };
  }
  if (typeof raw.title !== "string" || raw.title.trim().length === 0) {
    return {
      ok: false,
      error: { code: "invalid_title", message: "Title must be non-empty string" },
    };
  }
  if (typeof raw.status !== "string" || !VALID_STATUSES.has(raw.status as TaskStatus)) {
    return {
      ok: false,
      error: { code: "invalid_status", message: "Invalid task status" },
    };
  }
  return {
    ok: true,
    value: {
      id: raw.id,
      title: raw.title.trim(),
      status: raw.status as TaskStatus,
    },
  };
}

export function renderAsyncSummary(state: AsyncState<readonly Task[]>): string {
  switch (state.kind) {
    case "idle":
      return "idle";
    case "loading":
      return "loading";
    case "error":
      return `error: ${state.message}`;
    case "success":
      return `${state.data.length} task(s)`;
    default:
      return assertNever(state);
  }
}

export function safePickFirstTitle(items: readonly Task[]): string | null {
  const first = items[0];
  return first !== undefined ? first.title : null;
}
