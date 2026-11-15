export type TaskStatus = "todo" | "done";

export interface TaskItem {
  id: number;
  title: string;
  status: TaskStatus;
}

export interface BoardFilters {
  query: string;
  status: "" | TaskStatus;
}
