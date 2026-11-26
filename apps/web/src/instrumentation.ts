/**
 * Next.js server instrumentation. Sentry is optional: nothing is loaded unless
 * SENTRY_DSN is set at runtime (server) — see instructions/error-tracking.md.
 */
import type { Instrumentation } from "next";

let capture: Instrumentation.onRequestError | null = null;

export async function register() {
  const dsn = process.env.SENTRY_DSN?.trim();
  if (!dsn) return;
  if (process.env.NEXT_RUNTIME !== "nodejs" && process.env.NEXT_RUNTIME !== "edge") return;
  const Sentry = await import("@sentry/nextjs");
  Sentry.init({
    dsn,
    environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
    release: process.env.SENTRY_RELEASE || undefined,
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0) || 0,
    initialScope: { tags: { service: "web" } },
  });
  capture = Sentry.captureRequestError;
}

export const onRequestError: Instrumentation.onRequestError = async (...args) => {
  if (capture) await capture(...args);
};
