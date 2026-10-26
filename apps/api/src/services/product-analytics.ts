import { and, eq, gte, lt, sql } from "drizzle-orm";
import { activityEvents } from "@eduforge/db";
import type { Db } from "@eduforge/db";
import { logActivity } from "../engagement.js";

/** Product funnel event kinds (core loop + conversion). */
export const PRODUCT_EVENT_KINDS = [
  "first_lesson_complete",
  "lesson_completed",
  "exam_passed",
  "exam_failed",
  "paywall_shown",
  "paywall_cta_click",
  "onboarding_complete",
  "onboarding_skipped",
] as const;

export type ProductEventKind = (typeof PRODUCT_EVENT_KINDS)[number];

export function isProductEventKind(k: string): k is ProductEventKind {
  return (PRODUCT_EVENT_KINDS as readonly string[]).includes(k);
}

/**
 * Record a product analytics event. Dedupes first_lesson_complete per user.
 */
export async function trackProductEvent(
  db: Db,
  userId: string,
  kind: ProductEventKind | string,
  payload: Record<string, unknown> = {},
): Promise<{ tracked: boolean; deduped?: boolean }> {
  if (kind === "first_lesson_complete") {
    const existing = await db.query.activityEvents.findFirst({
      where: and(
        eq(activityEvents.userId, userId),
        eq(activityEvents.kind, "first_lesson_complete"),
      ),
    });
    if (existing) return { tracked: false, deduped: true };
  }
  await logActivity(db, userId, kind, {
    ...payload,
    source: payload.source ?? "product",
    ts: new Date().toISOString(),
  });
  return { tracked: true };
}

export type ProductFunnelCounts = {
  firstLessonComplete: number;
  lessonCompleted: number;
  paywallShown: number;
  paywallCtaClick: number;
  examPassed: number;
  examFailed: number;
  windowDays: number;
};

const FUNNEL_KINDS = [
  "first_lesson_complete",
  "lesson_completed",
  "paywall_shown",
  "paywall_cta_click",
  "exam_passed",
  "exam_failed",
] as const;

async function countsInRange(
  db: Db,
  since: Date,
  until?: Date,
): Promise<Omit<ProductFunnelCounts, "windowDays">> {
  const cond = until
    ? and(gte(activityEvents.createdAt, since), lt(activityEvents.createdAt, until))
    : gte(activityEvents.createdAt, since);

  const rows = await db
    .select({
      kind: activityEvents.kind,
      n: sql<number>`count(*)::int`,
    })
    .from(activityEvents)
    .where(cond)
    .groupBy(activityEvents.kind);

  const map = new Map(rows.map((r) => [r.kind, r.n]));
  return {
    firstLessonComplete: map.get("first_lesson_complete") ?? 0,
    lessonCompleted: map.get("lesson_completed") ?? 0,
    paywallShown: map.get("paywall_shown") ?? 0,
    paywallCtaClick: map.get("paywall_cta_click") ?? 0,
    examPassed: map.get("exam_passed") ?? 0,
    examFailed: map.get("exam_failed") ?? 0,
  };
}

/** Aggregate funnel counts for metrics / admin (last N days, open-ended). */
export async function productFunnelCounts(
  db: Db,
  windowDays = 7,
): Promise<ProductFunnelCounts> {
  const since = new Date(Date.now() - windowDays * 86400000);
  const base = await countsInRange(db, since);
  return { ...base, windowDays };
}

export type FunnelDelta = {
  key: keyof Omit<ProductFunnelCounts, "windowDays">;
  current: number;
  previous: number;
  /** percent change vs previous; null if previous was 0 */
  pctChange: number | null;
};

export type ProductFunnelCompare = {
  windowDays: number;
  current: ProductFunnelCounts;
  previous: ProductFunnelCounts;
  deltas: FunnelDelta[];
};

/** Pure delta math (unit-tested). */
export function funnelDeltas(
  current: Omit<ProductFunnelCounts, "windowDays">,
  previous: Omit<ProductFunnelCounts, "windowDays">,
): FunnelDelta[] {
  const keys = [
    "firstLessonComplete",
    "lessonCompleted",
    "paywallShown",
    "paywallCtaClick",
    "examPassed",
    "examFailed",
  ] as const;
  return keys.map((key) => {
    const c = current[key];
    const p = previous[key];
    const pctChange =
      p === 0 ? (c === 0 ? 0 : null) : Math.round(((c - p) / p) * 1000) / 10;
    return { key, current: c, previous: p, pctChange };
  });
}

/**
 * Current window vs previous equal window (e.g. last 7d vs prior 7d).
 */
export async function productFunnelCompare(
  db: Db,
  windowDays = 7,
): Promise<ProductFunnelCompare> {
  const days = Math.min(90, Math.max(1, windowDays));
  const now = Date.now();
  const curSince = new Date(now - days * 86400000);
  const prevSince = new Date(now - days * 2 * 86400000);
  const prevUntil = curSince;

  const [curBase, prevBase] = await Promise.all([
    countsInRange(db, curSince),
    countsInRange(db, prevSince, prevUntil),
  ]);

  const current: ProductFunnelCounts = { ...curBase, windowDays: days };
  const previous: ProductFunnelCounts = { ...prevBase, windowDays: days };
  return {
    windowDays: days,
    current,
    previous,
    deltas: funnelDeltas(curBase, prevBase),
  };
}

/** CSV for funnel history (current vs previous window). Pure helper for tests + admin export. */
export function funnelHistoryToCsv(history: ProductFunnelCompare): string {
  const esc = (v: string | number | null) => {
    const s = v == null ? "" : String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    "metric,current,previous,pctChange,windowDays",
    ...history.deltas.map((d) =>
      [
        d.key,
        d.current,
        d.previous,
        d.pctChange == null ? "" : d.pctChange,
        history.windowDays,
      ]
        .map(esc)
        .join(","),
    ),
  ];
  return lines.join("\n");
}

export { FUNNEL_KINDS };
