/**
 * Cookie CSRF defense: for mutating methods, require Origin/Referer to match WEB_ORIGIN
 * when a session cookie is present (Bearer-only clients are not blocked).
 *
 * Enable with FEATURE_STRICT_CSRF=1 (or always in production if set).
 */

import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { env } from "./env.js";
import { isFeatureEnabled } from "@eduforge/shared";

const MUTATING = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function originAllowed(header: string | undefined, webOrigin: string): boolean {
  if (!header) return false;
  try {
    const u = new URL(header);
    const allowed = new URL(webOrigin);
    return u.origin === allowed.origin;
  } catch {
    return false;
  }
}

export async function csrfOriginMiddleware(c: Context, next: Next) {
  if (!isFeatureEnabled("strict_csrf")) {
    await next();
    return;
  }
  if (!MUTATING.has(c.req.method)) {
    await next();
    return;
  }
  // Only enforce when browser cookie session is used
  const cookie = getCookie(c, "eduforge_session");
  if (!cookie) {
    await next();
    return;
  }
  const origin = c.req.header("origin");
  const referer = c.req.header("referer");
  const ok =
    originAllowed(origin, env.webOrigin) ||
    originAllowed(referer, env.webOrigin);
  if (!ok) {
    return c.json({ error: "csrf_origin", message: "Origin check failed" }, 403);
  }
  await next();
}
