import type { TaskItem } from "./types.js";

export interface TaskBoardProps {
  status: "loading" | "error" | "ready";
  tasks: readonly TaskItem[];
  errorText?: string;
  onRetry?: () => void;
}

// BUG: Empty check precedes error check & drops Retry button
export function TaskBoard({ status, tasks, errorText }: TaskBoardProps) {
  if (status === "loading") {
    return <p role="status">Loading tasks...</p>;
  }
  if (tasks.length === 0) {
    return <p>No tasks match current filters.</p>;
  }
  if (status === "error") {
    return <div role="alert">{errorText ?? "Error"}</div>;
  }
  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
}
