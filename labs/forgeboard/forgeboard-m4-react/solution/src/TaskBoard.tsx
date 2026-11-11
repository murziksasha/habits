import type { TaskItem } from "./types.js";

export interface TaskBoardProps {
  status: "loading" | "error" | "ready";
  tasks: readonly TaskItem[];
  errorText?: string;
  onRetry?: () => void;
}

export function TaskBoard({ status, tasks, errorText, onRetry }: TaskBoardProps) {
  if (status === "loading") {
    return <p role="status">Loading tasks...</p>;
  }
  if (status === "error") {
    return (
      <div role="alert">
        <p>{errorText ?? "Could not load tasks."}</p>
        <button type="button" onClick={onRetry}>
          Retry
        </button>
      </div>
    );
  }
  if (tasks.length === 0) {
    return <p>No tasks match current filters.</p>;
  }
  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id}>
          {t.title} ({t.status})
        </li>
      ))}
    </ul>
  );
}
