import { adminAuditLog } from "@eduforge/db";
import type { Db } from "@eduforge/db";

/** Best-effort admin action log (no throw to callers). */
export async function writeAdminAudit(
  db: Db,
  opts: {
    actorUserId: string;
    action: string;
    targetType?: string;
    targetId?: string;
    meta?: Record<string, unknown>;
  },
) {
  try {
    await db.insert(adminAuditLog).values({
      actorUserId: opts.actorUserId,
      action: opts.action,
      targetType: opts.targetType ?? "",
      targetId: opts.targetId ?? "",
      meta: opts.meta ?? {},
    });
  } catch (e) {
    console.warn("[audit] failed", e);
  }
}
