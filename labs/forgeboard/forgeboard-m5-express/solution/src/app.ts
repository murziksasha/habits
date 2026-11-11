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

const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    status: z.enum(["todo", "done"]).optional(),
  })
  .strict();

function requireUser(req: Request, res: Response, next: NextFunction) {
  const raw = req.header("x-user-id");
  const userId = raw ? Number(raw) : NaN;
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
    const rawLimit = Number(req.query.limit ?? 20);
    const rawOffset = Number(req.query.offset ?? 0);
    const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(Math.trunc(rawLimit), 1), 50) : 20;
    const offset = Number.isFinite(rawOffset) ? Math.max(Math.trunc(rawOffset), 0) : 0;
    const status = req.query.status;

    const scoped = tasks.filter(
      (t) =>
        t.ownerId === userId &&
        (status === undefined || status === "" || t.status === status),
    );
    scoped.sort((a, b) => a.id - b.id);
    const items = scoped.slice(offset, offset + limit);
    res.json({ items, total: scoped.length, limit, offset });
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

  app.patch("/tasks/:id", requireUser, (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "invalid_input" });
      return;
    }
    const existing = tasks.find((t) => t.id === id);
    if (!existing) {
      res.status(404).json({ error: "not_found" });
      return;
    }
    if (existing.ownerId !== (res.locals.userId as number)) {
      res.status(403).json({ error: "forbidden" });
      return;
    }
    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "invalid_input" });
      return;
    }
    if (parsed.data.title !== undefined) existing.title = parsed.data.title;
    if (parsed.data.status !== undefined) existing.status = parsed.data.status;
    res.json({ task: existing });
  });

  app.get("/boom", requireUser, () => {
    throw new Error("Simulated secret DB password leak");
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    void err;
    res.status(500).json({ error: "internal_error" });
  });

  return app;
}
