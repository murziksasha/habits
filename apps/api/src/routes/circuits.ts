/**
 * Circuits router: personal saved SPICE projects & on-demand simulation.
 */

import { Hono } from "hono";
import { z } from "zod";
import { eq, and, desc, sql } from "drizzle-orm";
import { db } from "../db.js";
import { circuitProjects } from "@eduforge/db";
import { authMiddleware } from "../auth.js";
import { downsampleSeries, executeSpiceNetlist, compileNetlist } from "@eduforge/circuit-engine";
import { adaptCircuitDocument, circuitAnalysisSchema, circuitDocumentSchema } from "@eduforge/shared";
import { CircuitQueueFull, withCircuitSlot } from "../services/circuit-queue.js";

export const circuitRoutes = new Hono();

const MAX_PROJECTS_PER_ACCOUNT = 100;
const MAX_DOCUMENT_BYTES = 1_048_576; // 1 MiB UTF-8

function documentBytes(document: unknown): number {
  return Buffer.byteLength(JSON.stringify(document), "utf8");
}

function parseStoredDocument(document: unknown): { ok: true; document: Record<string, unknown> } | { ok: false } {
  const adapted = adaptCircuitDocument(document);
  if (!adapted.ok || !adapted.document) return { ok: false };
  const parsed = circuitDocumentSchema.safeParse(adapted.document);
  if (!parsed.success) return { ok: false };
  return { ok: true, document: parsed.data as Record<string, unknown> };
}

const createProjectSchema = z.object({
  title: z.string().trim().min(1).max(255),
  document: z.record(z.string(), z.unknown()),
});

const updateProjectSchema = z.object({
  title: z.string().trim().min(1).max(255).optional(),
  document: z.record(z.string(), z.unknown()).optional(),
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

  const body = await c.req.json().catch(() => null);
  const parsed = createProjectSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "invalid_input" }, 400);
  }
  const stored = parseStoredDocument(parsed.data.document);
  if (!stored.ok) return c.json({ error: "invalid_input" }, 400);
  if (documentBytes(stored.document) > MAX_DOCUMENT_BYTES) {
    return c.json({ error: "document_too_large" }, 400);
  }

  const inserted = await db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${user.id}))`);
    const countRes = await tx
      .select({ count: sql<number>`count(*)` })
      .from(circuitProjects)
      .where(eq(circuitProjects.userId, user.id));
    const total = Number(countRes[0]?.count ?? 0);
    if (total >= MAX_PROJECTS_PER_ACCOUNT) return null;
    const [row] = await tx
      .insert(circuitProjects)
      .values({
        userId: user.id,
        title: parsed.data.title,
        document: stored.document,
        revision: 1,
      })
      .returning();
    return row ?? null;
  });

  if (!inserted) {
    return c.json({ error: "project_limit_reached" }, 400);
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

  let nextDocument = project.document;
  if (parsed.data.document) {
    const stored = parseStoredDocument(parsed.data.document);
    if (!stored.ok) return c.json({ error: "invalid_input" }, 400);
    if (documentBytes(stored.document) > MAX_DOCUMENT_BYTES) {
      return c.json({ error: "document_too_large" }, 400);
    }
    nextDocument = stored.document;
  }

  const [updated] = await db
    .update(circuitProjects)
    .set({
      title: parsed.data.title ?? project.title,
      document: nextDocument,
      revision: sql`${circuitProjects.revision} + 1`,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(circuitProjects.id, id),
        eq(circuitProjects.userId, user.id),
        eq(circuitProjects.revision, parsed.data.expectedRevision),
      ),
    )
    .returning();

  if (!updated) {
    return c.json(
      {
        error: "project_conflict",
        currentRevision: project.revision,
        serverProject: project,
      },
      409,
    );
  }

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

/** Authenticated server preview. Guests simulate locally in a worker. */
circuitRoutes.post("/simulate", authMiddleware, async (c) => {
  const user = c.get("user" as never) as { id: string };
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body !== "object") return c.json({ error: "invalid_body" }, 400);
  const circuit = (body as { circuit?: unknown; document?: unknown }).circuit
    ?? (body as { document?: unknown }).document;
  if (!circuit) return c.json({ error: "missing_circuit_definition" }, 400);

  let analysis = undefined;
  if ((body as { analysis?: unknown }).analysis) {
    const parsed = circuitAnalysisSchema.safeParse((body as { analysis: unknown }).analysis);
    if (!parsed.success) return c.json({ error: "invalid_input" }, 400);
    analysis = parsed.data;
  }

  try {
    const simResult = await withCircuitSlot(user.id, async () => {
      let netlist = "";
      if (typeof circuit === "string") {
        netlist = circuit;
      } else {
        const adapted = adaptCircuitDocument(circuit);
        if (!adapted.ok || !adapted.document) {
          return { ok: false as const, dataType: "real" as const, variableNames: [], numPoints: 0, data: [], error: "invalid_circuit_document" };
        }
        const compiled = compileNetlist(adapted.document, analysis ?? adapted.document.analysis);
        if (!compiled.ok) {
          return { ok: false as const, dataType: "real" as const, variableNames: [], numPoints: 0, data: [], error: compiled.errors.join("; ") };
        }
        netlist = compiled.netlist;
      }
      return executeSpiceNetlist(netlist);
    });
    if (!simResult.ok) {
      if ((simResult.error ?? "").includes("circuit_engine_unavailable") || (simResult.error ?? "").includes("simulation_timeout")) {
        return c.json({ error: "circuit_engine_unavailable" }, 503);
      }
      return c.json({ error: simResult.error || "simulation_failed" }, 400);
    }
    const result = { ...simResult, data: downsampleSeries(simResult.data) };
    return c.json({ ok: true, result });
  } catch (err) {
    if (err instanceof CircuitQueueFull) return c.json({ error: "circuit_engine_unavailable" }, 503);
    return c.json({ error: "circuit_engine_unavailable" }, 503);
  }
});
