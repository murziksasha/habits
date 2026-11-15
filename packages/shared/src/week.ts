/** ISO week & UTC day helpers (independent of server local timezone). */

export function utcDateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function addUtcDays(isoDate: string, deltaDays: number): string {
  const d = new Date(`${isoDate}T12:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + deltaDays);
  return d.toISOString().slice(0, 10);
}

export function utcDayStart(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00.000Z`);
}

export function utcDayEnd(isoDate: string): Date {
  return new Date(`${isoDate}T23:59:59.999Z`);
}

export function isoWeekKey(d = new Date()): string {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  // Thursday in current week decides the year
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  const year = date.getUTCFullYear();
  return `${year}-W${String(weekNo).padStart(2, "0")}`;
}

export function isoWeekBounds(d = new Date()): { startsAt: Date; endsAt: Date; weekKey: string } {
  const weekKey = isoWeekKey(d);
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = date.getUTCDay() || 7; // Mon=1 … Sun=7
  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() - day + 1);
  monday.setUTCHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  sunday.setUTCHours(23, 59, 59, 999);
  return { startsAt: monday, endsAt: sunday, weekKey };
}

/** Elapsed portion of current Monday–Sunday UTC week vs same elapsed portion of previous week. */
export function previousWeekElapsedWindow(now = new Date()): {
  current: { startsAt: Date; endsAt: Date; fullWeekEnd: Date; weekKey: string };
  previous: { startsAt: Date; endsAt: Date; fullWeekEnd: Date; weekKey: string };
  elapsedMs: number;
} {
  const cur = isoWeekBounds(now);
  const elapsedMs = Math.max(0, now.getTime() - cur.startsAt.getTime());
  const prevRef = new Date(cur.startsAt.getTime() - 7 * 86_400_000);
  const prev = isoWeekBounds(prevRef);
  const prevElapsedEnd = new Date(prev.startsAt.getTime() + elapsedMs);
  return {
    current: {
      startsAt: cur.startsAt,
      endsAt: now,
      fullWeekEnd: cur.endsAt,
      weekKey: cur.weekKey,
    },
    previous: {
      startsAt: prev.startsAt,
      endsAt: prevElapsedEnd,
      fullWeekEnd: prev.endsAt,
      weekKey: prev.weekKey,
    },
    elapsedMs,
  };
}

export const DEFAULT_WEEKLY_TARGET_XP = 200;
