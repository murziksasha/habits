"use client";

export interface ClientTaskDto {
  id: number;
  title: string;
  status: "todo" | "done";
}

export function filterClientTasks(tasks: readonly ClientTaskDto[], query: string) {
  const q = query.trim().toLowerCase();
  return tasks.filter((t) => t.title.toLowerCase().includes(q));
}
