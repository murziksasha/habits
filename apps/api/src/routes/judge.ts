import { Hono } from "hono";
import { z } from "zod";
import { runJudge, getJudgeMode, type JudgeLang } from "@eduforge/judge";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { rateLimit } from "../rate-limit.js";
import { withSpan } from "../otel.js";

type Vars = { user: AuthedUser };

export const judgeRoutes = new Hono<{ Variables: Vars }>();

const jobSchema = z.object({
  lang: z.enum(["javascript", "typescript", "python", "bash"]),
  source: z.string().min(1).max(64_000),
  tests: z
    .array(
      z.discriminatedUnion("type", [
        z.object({ type: z.literal("stdout_contains"), value: z.string().max(2000) }),
        z.object({ type: z.literal("stdout_equals"), value: z.string().max(2000) }),
        z.object({ type: z.literal("exit_code"), value: z.number().int() }),
        z.object({ type: z.literal("not_stdout_contains"), value: z.string().max(2000) }),
      ]),
    )
    .max(20)
    .optional(),
  timeoutMs: z.number().int().min(200).max(10_000).optional(),
  stdin: z.string().max(4000).optional(),
});

judgeRoutes.get("/status", (c) => {
  return c.json({
    mode: getJudgeMode(),
    langs: ["javascript", "typescript", "python", "bash"] satisfies JudgeLang[],
    docker: getJudgeMode() === "docker",
  });
});

judgeRoutes.post("/run", authMiddleware, async (c) => {
  const user = c.get("user");
  const rl = await rateLimit({
    key: `judge:${user.id}`,
    limit: 20,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return c.json({ error: "rate_limited", retryAfter: rl.retryAfterSec }, 429);
  }

  const body = await c.req.json().catch(() => null);
  const parsed = jobSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: "invalid_input", details: parsed.error.flatten() }, 400);
  }

  const result = await withSpan(
    "judge.run",
    { lang: parsed.data.lang, userId: user.id },
    async () => runJudge(parsed.data),
  );

  return c.json({ result });
});
