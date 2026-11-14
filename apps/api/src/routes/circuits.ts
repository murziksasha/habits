/**
 * Circuits router: personal saved SPICE projects & on-demand simulation.
 */

import { Hono } from "hono";
import { z } from "zod";
import { eq, and, desc, sql } from "drizzle-orm";
import { db } from "../db.js";
import { circuitProjects } from "@eduforge/db";
import { authMiddleware } from "../auth.js";
import { executeSpiceNetlist, generateNetlist } from "@eduforge/circuit-engine";
import { circuitAnalysisSchema } from "@eduforge/shared";

export const circuitRoutes = new Hono();

const MAX_PROJECTS_PER_ACCOUNT = 100;
const MAX_DOCUMENT_BYTES = 1_048_576; // 1 MiB limit

const createProjectSchema = z.object({
  title: z.string().trim().min(1).max(255),
  document: z.record(z.unknown()),
});

const updateProjectSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  document: z.record(z.unknown()).optional(),
  expectedRevision: z.number().int().min(1),
});

/** List personal circuit projects */
circuitRoutes.get("/projects", authMiddleware, async (c) => {
  const user = c.get("user" as never) as { id: string };

  const projects = await db
    .select({
      id: circuitProjects.id,
      title: circuitProjects.title,
      revision: circuitProjects.revision,
      createdAt: circuitProjects.createdAt,
      updatedAt: circuitProjects.updatedAt,
    })
    .from(circuitProjects)
    .where(eq(circuitProjects.userId, user.id))
    .orderBy(desc(circuitProjects.updatedAt))
    .limit(MAX_PROJECTS_PER_ACCOUNT);

  return c.json({ projects });
});

/** Create new circuit project */
circuitRoutes.post("/projects", authMiddleware, async (c) => {
  const user = c.get("user" as never) as { id: string };

  // Check project count limit
  const countRes = await db
    .select({ count: sql<number>`count(*)` })
    .from(circuitProjects)
    .where(eq(circuitProjects.userId, user.id));

  const total = Number(countRes[0]?.count ?? 0);
  if (total >= MAX_PROJECTS_PER_ACCOUNT) {
    return c.json({ error: "project_limit_reached" }, 400);
  }

  const body = await c.req.json().catch(() => null);
  const parsed = createProjectSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "invalid_input" }, 400);
  }

  const docStr = JSON.stringify(parsed.data.document);
  if (docStr.length > MAX_DOCUMENT_BYTES) {
    return c.json({ error: "document_too_large" }, 400);
  }

  const [inserted] = await db
    .insert(circuitProjects)
    .values({
      userId: user.id,
      title: parsed.data.title,
      document: parsed.data.document,
      revision: 1,
    })
    .returning();

  if (!inserted) {
    return c.json({ error: "insert_failed" }, 500);
  }

  return c.json({ project: inserted }, 201);
});

/** Get single circuit project with full document */
circuitRoutes.get("/projects/:id", authMiddleware, async (c) => {
  const user = c.get("user" as never) as { id: string };
  const id = c.req.param("id");
  if (!id) return c.json({ error: "not_found" }, 404);

  const project = await db.query.circuitProjects.findFirst({
    where: and(eq(circuitProjects.id, id), eq(circuitProjects.userId, user.id)),
  });

  if (!project) {
    return c.json({ error: "not_found" }, 404);
  }

  return c.json({ project });
});

/** Update circuit project with optimistic revision check */
circuitRoutes.patch("/projects/:id", authMiddleware, async (c) => {
  const user = c.get("user" as never) as { id: string };
  const id = c.req.param("id");
  if (!id) return c.json({ error: "not_found" }, 404);

  const project = await db.query.circuitProjects.findFirst({
    where: and(eq(circuitProjects.id, id), eq(circuitProjects.userId, user.id)),
  });

  if (!project) {
    return c.json({ error: "not_found" }, 404);
  }

  const body = await c.req.json().catch(() => null);
  const parsed = updateProjectSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "invalid_input" }, 400);
  }

  // Optimistic concurrency control: revision mismatch -> 409 Conflict
  if (project.revision !== parsed.data.expectedRevision) {
    return c.json(
      {
        error: "project_conflict",
        currentRevision: project.revision,
        expectedRevision: parsed.data.expectedRevision,
      },
      409,
    );
  }

  if (parsed.data.document) {
    const docStr = JSON.stringify(parsed.data.document);
    if (docStr.length > MAX_DOCUMENT_BYTES) {
      return c.json({ error: "document_too_large" }, 400);
    }
  }

  const [updated] = await db
    .update(circuitProjects)
    .set({
      title: parsed.data.title ?? project.title,
      document: parsed.data.document ?? project.document,
      revision: project.revision + 1,
      updatedAt: new Date(),
    })
    .where(and(eq(circuitProjects.id, id), eq(circuitProjects.userId, user.id)))
    .returning();

  return c.json({ project: updated });
});

/** Delete circuit project */
circuitRoutes.delete("/projects/:id", authMiddleware, async (c) => {
  const user = c.get("user" as never) as { id: string };
  const id = c.req.param("id");
  if (!id) return c.json({ error: "not_found" }, 404);

  const project = await db.query.circuitProjects.findFirst({
    where: and(eq(circuitProjects.id, id), eq(circuitProjects.userId, user.id)),
  });

  if (!project) {
    return c.json({ error: "not_found" }, 404);
  }

  await db
    .delete(circuitProjects)
    .where(and(eq(circuitProjects.id, id), eq(circuitProjects.userId, user.id)));

  return c.json({ ok: true });
});

/** Execute on-demand SPICE simulation */
circuitRoutes.post("/simulate", async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: "invalid_body" }, 400);

  let netlist = "";
  if (typeof body.circuit === "string") {
    netlist = body.circuit;
  } else if (body.circuit && typeof body.circuit === "object") {
    const analysis = body.analysis ? circuitAnalysisSchema.parse(body.analysis) : undefined;
    netlist = generateNetlist(body.circuit, analysis);
  } else {
    return c.json({ error: "missing_circuit_definition" }, 400);
  }

  const simResult = await executeSpiceNetlist(netlist);
  if (!simResult.ok) {
    return c.json({ error: simResult.error || "simulation_failed", simResult }, 400);
  }

  return c.json({ ok: true, simResult });
});
