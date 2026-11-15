import React from "react";
import { TaskBoard } from "./TaskBoard.js";
import { TaskForm } from "./TaskForm.js";
import type { BoardFilters, TaskItem } from "./types.js";

export function readFiltersFromSearch(search: string): BoardFilters {
  // TODO: Parse URL query `?q=&status=` cleanly
  void search;
  return { query: "", status: "" };
}

export function writeFiltersToSearch(filters: BoardFilters): string {
  // TODO: Serialize non-empty query/status to query string
  void filters;
  return "";
}

export function deriveVisibleTasks(
  tasks: readonly TaskItem[],
  filters: BoardFilters,
): TaskItem[] {
  // TODO: Filter tasks by query & status without mutating
  void filters;
  return [...tasks];
}

export function ForgeBoardApp({
  tasks,
  filters,
  loadState,
  editingTask,
}: {
  tasks: readonly TaskItem[];
  filters: BoardFilters;
  loadState: "loading" | "error" | "ready";
  editingTask?: TaskItem | null;
}) {
  const visible = deriveVisibleTasks(tasks, filters);
  return (
    <main>
      <TaskForm initialTitle={editingTask?.title ?? ""} />
      <TaskBoard status={loadState} tasks={visible} />
    </main>
  );
}
