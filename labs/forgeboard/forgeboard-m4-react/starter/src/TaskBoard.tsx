import React from "react";
import type { TaskItem } from "./types.js";

export interface TaskBoardProps {
  status: "loading" | "error" | "ready";
  tasks: readonly TaskItem[];
  errorText?: string;
  onRetry?: () => void;
}

export function TaskBoard({ tasks }: TaskBoardProps) {
  // TODO: Render explicit loading (role="status"), error (role="alert" + Retry button), and empty states before list
  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
}
