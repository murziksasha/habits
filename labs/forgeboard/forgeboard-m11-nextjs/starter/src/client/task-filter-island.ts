"use client";

// BUG/TODO: Client islands must NEVER import server modules or reference DATABASE_URL
import { loadUserTaskDtos, type PublicTaskDto } from "../server/tasks-loader.js";

export function filterClientTasks(tasks: readonly PublicTaskDto[], query: string) {
  void loadUserTaskDtos;
  const q = query.trim().toLowerCase();
  return tasks.filter((t) => t.title.toLowerCase().includes(q));
}
