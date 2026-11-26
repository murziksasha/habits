/**
 * Optional error tracking for realtime. Enabled only when SENTRY_DSN is set;
 * otherwise a no-op and @sentry/node is never loaded. Same env as the API.
 */
import type * as SentryNode from "@sentry/node";

let sentry: typeof SentryNode | null = null;

export async function initSentry(service = "realtime"): Promise<boolean> {
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
    console.log("[realtime] sentry enabled");
    return true;
  } catch (e) {
    console.warn("[realtime] sentry init failed:", e instanceof Error ? e.message : e);
    return false;
  }
}

export function captureException(err: unknown, tags: Record<string, string> = {}) {
  if (!sentry) return;
  const s = sentry;
  s.withScope((scope) => {
    for (const [k, v] of Object.entries(tags)) scope.setTag(k, v);
    s.captureException(err);
  });
}
