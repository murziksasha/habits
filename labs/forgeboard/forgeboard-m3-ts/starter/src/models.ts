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

// TODO: Replace weak flag-bag shape with strict discriminated union `kind`
export type AsyncState<T> = {
  loading?: boolean;
  data?: T;
  error?: string;
};

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
