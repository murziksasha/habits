/**
 * Optional error tracking. Enabled only when SENTRY_DSN is set; otherwise every
 * function here is a no-op and @sentry/node is never loaded.
 *
 * Env: SENTRY_DSN, SENTRY_ENVIRONMENT (default NODE_ENV), SENTRY_RELEASE,
 * SENTRY_TRACES_SAMPLE_RATE (default 0 = errors only).
 */
import type * as SentryNode from "@sentry/node";
import { log } from "./logger.js";

let sentry: typeof SentryNode | null = null;

export function sentryEnabled() {
  return sentry !== null;
}

export async function initSentry(service: string): Promise<boolean> {
  const dsn = process.env.SENTRY_DSN?.trim();
  if (!dsn || sentry) return Boolean(sentry);
  try {
    const mod = await import("@sentry/node");
    mod.init({
      dsn,
      environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || "development",
      release: process.env.SENTRY_RELEASE || undefined,
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0) || 0,
      initialScope: { tags: { service } },
    });
    sentry = mod;
    log.info("sentry_enabled", { service });
    return true;
  } catch (e) {
    log.warn("sentry_init_failed", { err: e instanceof Error ? e.message : String(e) });
    return false;
  }
}

export function captureException(
  err: unknown,
  ctx: { requestId?: string; method?: string; path?: string } = {},
) {
  if (!sentry) return;
  const s = sentry;
  s.withScope((scope) => {
    if (ctx.requestId) scope.setTag("request_id", ctx.requestId);
    if (ctx.method) scope.setTag("http.method", ctx.method);
    if (ctx.path) scope.setTag("http.path", ctx.path);
    s.captureException(err);
  });
}

/** For tests. */
export function _setSentryForTests(mod: typeof SentryNode | null) {
  sentry = mod;
}
