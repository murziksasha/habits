import { TaskBoard } from "./TaskBoard.js";
import { TaskForm } from "./TaskForm.js";
import type { BoardFilters, TaskItem } from "./types.js";

export function readFiltersFromSearch(search: string): BoardFilters {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const query = (params.get("q") ?? "").trim();
  const rawStatus = params.get("status");
  const status = rawStatus === "todo" || rawStatus === "done" ? rawStatus : "";
  return { query, status };
}

export function writeFiltersToSearch(filters: BoardFilters): string {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set("q", filters.query.trim());
  if (filters.status) params.set("status", filters.status);
  const out = params.toString();
  return out ? `?${out}` : "";
}

export function deriveVisibleTasks(
  tasks: readonly TaskItem[],
  filters: BoardFilters,
): TaskItem[] {
  const q = filters.query.trim().toLowerCase();
  return tasks.filter(
    (t) =>
      (!filters.status || t.status === filters.status) &&
      (!q || t.title.toLowerCase().includes(q)),
  );
}

export function ForgeBoardApp({
  tasks,
  filters,
  loadState,
  editingTask,
  onRetry,
}: {
  tasks: readonly TaskItem[];
  filters: BoardFilters;
  loadState: "loading" | "error" | "ready";
  editingTask?: TaskItem | null;
  onRetry?: () => void;
}) {
  const visible = deriveVisibleTasks(tasks, filters);
  return (
    <main>
      <TaskForm key={editingTask?.id ?? "new"} initialTitle={editingTask?.title ?? ""} />
      <TaskBoard status={loadState} tasks={visible} onRetry={onRetry} />
    </main>
  );
}
