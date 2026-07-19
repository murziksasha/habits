import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { getCoachHint } from "../stockfish-coach.js";
import { clientIp, rateLimit } from "../rate-limit.js";

type Vars = { user: AuthedUser };

export const coachRoutes = new Hono<{ Variables: Vars }>();

const hintSchema = z.object({
  fen: z.string().min(10),
  depth: z.number().int().min(1).max(3).optional(),
});

coachRoutes.post("/hint", authMiddleware, async (c) => {
  const ip = clientIp({ get: (n) => c.req.header(n) ?? null });
  const rl = await rateLimit({ key: `coach:${ip}`, limit: 60, windowMs: 60_000 });
  if (!rl.ok) return c.json({ error: "rate_limited", retryAfterSec: rl.retryAfterSec }, 429);

  const body = await c.req.json().catch(() => null);
  const parsed = hintSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  try {
    const hint = getCoachHint(parsed.data.fen, parsed.data.depth ?? 2);
    return c.json({ hint });
  } catch {
    return c.json({ error: "invalid_fen" }, 400);
  }
});
