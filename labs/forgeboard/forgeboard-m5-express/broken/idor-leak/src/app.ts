import express, { type NextFunction, type Request, type Response } from "express";
import { z } from "zod";

export interface TaskRecord {
  id: number;
  ownerId: number;
  title: string;
  status: "todo" | "done";
}

const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(120),
  status: z.enum(["todo", "done"]).optional(),
});

function requireUser(req: Request, res: Response, next: NextFunction) {
  const userId = Number(req.header("x-user-id"));
  if (!Number.isInteger(userId) || userId <= 0) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  res.locals.userId = userId;
  next();
}

export function createForgeBoardApp(initialTasks: TaskRecord[] = []) {
  const app = express();
  app.use(express.json());
  const tasks = initialTasks.map((t) => ({ ...t }));
  let nextId = tasks.reduce((m, t) => Math.max(m, t.id), 0) + 1;

  app.get("/tasks", requireUser, (req, res) => {
    const userId = res.locals.userId as number;
    const limit = Math.min(Number(req.query.limit ?? 20), 50);
    const offset = Number(req.query.offset ?? 0);
    const scoped = tasks.filter((t) => t.ownerId === userId);
    res.json({ items: scoped.slice(offset, offset + limit), total: scoped.length, limit, offset });
  });

  app.post("/tasks", requireUser, (req, res) => {
    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "invalid_input" });
      return;
    }
    const task: TaskRecord = {
      id: nextId++,
      ownerId: res.locals.userId as number,
      title: parsed.data.title,
      status: parsed.data.status ?? "todo",
    };
    tasks.push(task);
    res.status(201).json({ task });
  });

  // BUG: Missing ownership check allows any user to mutate Alice's tasks (IDOR)
  app.patch("/tasks/:id", requireUser, (req, res) => {
    const existing = tasks.find((t) => t.id === Number(req.params.id));
    if (!existing) {
      res.status(404).json({ error: "not_found" });
      return;
    }
    if (typeof req.body?.title === "string") existing.title = req.body.title;
    res.json({ task: existing });
  });

  app.get("/boom", requireUser, () => {
    throw new Error("Simulated secret DB password leak");
  });

  app.use((_err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ error: "internal_error" });
  });

  return app;
}
