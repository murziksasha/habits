/**
 * Lightweight structured JSON logger (no extra deps).
 * Fields: ts, level, msg, requestId, service, ...meta
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

const SERVICE = "api";
const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function minLevel(): LogLevel {
  const raw = (process.env.LOG_LEVEL ?? "info").toLowerCase();
  if (raw === "debug" || raw === "info" || raw === "warn" || raw === "error") return raw;
  return "info";
}

function emit(level: LogLevel, msg: string, meta?: Record<string, unknown>) {
  if (LEVEL_ORDER[level] < LEVEL_ORDER[minLevel()]) return;
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    service: SERVICE,
    msg,
    ...meta,
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const log = {
  debug: (msg: string, meta?: Record<string, unknown>) => emit("debug", msg, meta),
  info: (msg: string, meta?: Record<string, unknown>) => emit("info", msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => emit("warn", msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => emit("error", msg, meta),
};

/** Simple in-process request latency histogram for /metrics */
const latenciesMs: number[] = [];
const MAX_SAMPLES = 500;

export function recordLatency(ms: number) {
  latenciesMs.push(ms);
  if (latenciesMs.length > MAX_SAMPLES) latenciesMs.shift();
}

export function latencyStats() {
  if (!latenciesMs.length) {
    return { samples: 0, p50Ms: 0, p95Ms: 0, maxMs: 0 };
  }
  const sorted = [...latenciesMs].sort((a, b) => a - b);
  const p = (q: number) =>
    sorted[Math.min(sorted.length - 1, Math.floor(q * (sorted.length - 1)))] ?? 0;
  return {
    samples: sorted.length,
    p50Ms: Math.round(p(0.5)),
    p95Ms: Math.round(p(0.95)),
    maxMs: sorted[sorted.length - 1] ?? 0,
  };
}

export function newRequestId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
