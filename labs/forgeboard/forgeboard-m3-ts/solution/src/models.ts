export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  readonly id: number;
  readonly title: string;
  readonly status: TaskStatus;
}

export interface ValidationError {
  readonly code: "invalid_payload" | "invalid_title" | "invalid_status";
  readonly message: string;
}

export type AsyncState<T> =
  | { readonly kind: "idle" }
  | { readonly kind: "loading" }
  | { readonly kind: "error"; readonly message: string }
  | { readonly kind: "success"; readonly data: T };

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
