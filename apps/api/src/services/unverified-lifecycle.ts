import { and, eq, isNull, lte, sql } from "drizzle-orm";
import { users } from "@eduforge/db";
import { db } from "../db.js";

const DAY_MS = 24 * 60 * 60 * 1000;
export const UNVERIFIED_INACTIVE_DAYS = 7;
export const UNVERIFIED_DELETE_DAYS = 30;

/**
 * Mark unverified accounts inactive after 7 days; hard-delete after 30 days.
 */
export async function runUnverifiedLifecycle(now = new Date()) {
  const inactiveBefore = new Date(now.getTime() - UNVERIFIED_INACTIVE_DAYS * DAY_MS);
  const deleteBefore = new Date(now.getTime() - UNVERIFIED_DELETE_DAYS * DAY_MS);

  const inactivated = await db
    .update(users)
    .set({ accountStatus: "inactive", updatedAt: now })
    .where(
      and(
        isNull(users.emailVerifiedAt),
        eq(users.accountStatus, "active"),
        lte(users.createdAt, inactiveBefore),
      ),
    )
    .returning({ id: users.id });

  const deleted = await db
    .delete(users)
    .where(and(isNull(users.emailVerifiedAt), lte(users.createdAt, deleteBefore)))
    .returning({ id: users.id });

  return {
    inactivated: inactivated.length,
    deleted: deleted.length,
    inactiveBefore: inactiveBefore.toISOString(),
    deleteBefore: deleteBefore.toISOString(),
  };
}

/** Count pending verification (for ops summary). */
export async function countUnverifiedUsers() {
  const [row] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(users)
    .where(isNull(users.emailVerifiedAt));
  return row?.n ?? 0;
}
