import type { Context } from "hono";
import { cronSecretAuthorized } from "@eduforge/shared";

/** Presented cron/worker secret from headers. */
export function presentedCronSecret(c: {
  req: { header: (n: string) => string | undefined };
}): string | undefined {
  const bearer = c.req.header("authorization")?.replace(/^Bearer\s+/i, "");
  return (
    c.req.header("x-cron-secret") ??
    c.req.header("x-worker-secret") ??
    bearer
  );
}

export function cronAuthorized(
  c: { req: { header: (n: string) => string | undefined } },
  opts?: { alternate?: string },
): boolean {
  return cronSecretAuthorized(presentedCronSecret(c), process.env, opts);
}

export function cronUnauthorized(c: Context) {
  return c.json({ error: "unauthorized" }, 401);
}
