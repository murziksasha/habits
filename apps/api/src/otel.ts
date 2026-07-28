/**
 * Lightweight OpenTelemetry-compatible tracing for EduForge API.
 * - Always records spans in-process for /metrics
 * - Optionally exports OTLP/HTTP JSON when OTEL_EXPORTER_OTLP_ENDPOINT is set
 *
 * Full OTel SDK can replace this later without changing call sites.
 */

import { log } from "./logger.js";

export type SpanRecord = {
  name: string;
  traceId: string;
  spanId: string;
  startMs: number;
  endMs?: number;
  durationMs?: number;
  attrs: Record<string, string | number | boolean>;
  status: "ok" | "error";
  error?: string;
};

const recent: SpanRecord[] = [];
const MAX = 200;

function hexId(bytes: number) {
  const arr = new Uint8Array(bytes);
  try {
    globalThis.crypto.getRandomValues(arr);
  } catch {
    for (let i = 0; i < bytes; i++) arr[i] = Math.floor(Math.random() * 256);
  }
  return [...arr].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function otelEnabled() {
  return Boolean(process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim());
}

export function recentSpans() {
  return recent.slice(-50);
}

export function spanStats() {
  const done = recent.filter((s) => s.durationMs != null);
  const byName: Record<string, { count: number; p50?: number; p95?: number }> = {};
  for (const s of done) {
    (byName[s.name] ??= { count: 0 }).count += 1;
  }
  return {
    sampleSize: done.length,
    exportEnabled: otelEnabled(),
    byName,
  };
}

async function exportSpan(span: SpanRecord) {
  const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim();
  if (!endpoint) return;
  const url = endpoint.replace(/\/$/, "") + "/v1/traces";
  const body = {
    resourceSpans: [
      {
        resource: {
          attributes: [
            { key: "service.name", value: { stringValue: process.env.OTEL_SERVICE_NAME ?? "eduforge-api" } },
          ],
        },
        scopeSpans: [
          {
            spans: [
              {
                traceId: span.traceId,
                spanId: span.spanId,
                name: span.name,
                kind: 1,
                startTimeUnixNano: String(span.startMs * 1e6),
                endTimeUnixNano: String((span.endMs ?? span.startMs) * 1e6),
                attributes: Object.entries(span.attrs).map(([key, v]) => ({
                  key,
                  value:
                    typeof v === "string"
                      ? { stringValue: v }
                      : typeof v === "boolean"
                        ? { boolValue: v }
                        : { doubleValue: v },
                })),
                status: {
                  code: span.status === "ok" ? 1 : 2,
                  message: span.error,
                },
              },
            ],
          },
        ],
      },
    ],
  };
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    log.debug("otel_export_failed", {
      err: e instanceof Error ? e.message : String(e),
    });
  }
}

export async function withSpan<T>(
  name: string,
  attrs: Record<string, string | number | boolean>,
  fn: () => Promise<T> | T,
): Promise<T> {
  const span: SpanRecord = {
    name,
    traceId: hexId(16),
    spanId: hexId(8),
    startMs: Date.now(),
    attrs,
    status: "ok",
  };
  try {
    const out = await fn();
    span.endMs = Date.now();
    span.durationMs = span.endMs - span.startMs;
    recent.push(span);
    if (recent.length > MAX) recent.shift();
    void exportSpan(span);
    return out;
  } catch (e) {
    span.status = "error";
    span.error = e instanceof Error ? e.message : String(e);
    span.endMs = Date.now();
    span.durationMs = span.endMs - span.startMs;
    recent.push(span);
    if (recent.length > MAX) recent.shift();
    void exportSpan(span);
    throw e;
  }
}
