import express from "express";

export interface TaskRecord {
  id: number;
  ownerId: number;
  title: string;
  status: "todo" | "done";
}

export function createForgeBoardApp(initialTasks: TaskRecord[] = []) {
  const app = express();
  app.use(express.json());
  const tasks = [...initialTasks];

  // TODO: Implement auth check, Zod validation, pagination, ownership checks (401/403/404), and centralized error middleware
  app.get("/tasks", (_req, res) => {
    res.json({ items: tasks, total: tasks.length, limit: 20, offset: 0 });
  });

  app.get("/boom", () => {
    throw new Error("Simulated secret DB password leak");
  });

  return app;
}
