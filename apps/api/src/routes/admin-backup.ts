import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { users } from "@eduforge/db";
import { adminMiddleware, clearSessionCookie, requireStepUp, type AuthedUser } from "../auth.js";
import { writeAdminAudit } from "../audit.js";
import { db } from "../db.js";
import { env } from "../env.js";
import {
  BackupError,
  assertBackupSize,
  assertRestoreConfirm,
  createDownload,
  readDownloadStatus,
  restoreUploaded,
  undoLastRestore,
} from "../services/instance-backup.js";

type Vars = { user: AuthedUser; sessionToken?: string };

export const adminBackupRoutes = new Hono<{ Variables: Vars }>();

adminBackupRoutes.use("*", adminMiddleware);

function fail(err: unknown): { status: 400 | 404 | 409 | 413; body: { error: string } } | null {
  if (!(err instanceof BackupError)) return null;
  const status =
    err.code === "backup_too_large"
      ? 413
      : err.code === "safety_missing"
        ? 404
        : err.code === "backup_busy" || err.code === "backup_version_mismatch"
          ? 409
          : 400;
  return { status, body: { error: err.code } };
}

async function actorId(preferred: string): Promise<string | null> {
  const [same] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, preferred))
    .limit(1);
  if (same) return same.id;
  const [admin] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, "admin"))
    .limit(1);
  return admin?.id ?? null;
}

adminBackupRoutes.get("/status", async (c) => {
  const status = await readDownloadStatus(db, env.backupDir);
  return c.json(status);
});

adminBackupRoutes.get("/download", async (c) => {
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const actor = c.get("user");
  await writeAdminAudit(db, {
    actorUserId: actor.id,
    action: "instance_backup.download",
    targetType: "instance",
  });
  const { filename, body } = await createDownload(db);
  return c.body(new Uint8Array(body), 200, {
    "Content-Type": "application/gzip",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Cache-Control": "no-store",
  });
});

adminBackupRoutes.post("/restore", async (c) => {
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const actor = c.get("user");
  let confirm: unknown;
  let bytes: Buffer;
  try {
    const form = await c.req.parseBody();
    confirm = form.confirm;
    const file = form.file;
    if (!file || typeof file === "string" || Array.isArray(file)) {
      return c.json({ error: "backup_invalid" }, 400);
    }
    assertBackupSize(file.size);
    bytes = Buffer.from(await file.arrayBuffer());
    assertBackupSize(bytes.length);
  } catch (err) {
    const mapped = fail(err);
    if (mapped) return c.json(mapped.body, mapped.status);
    return c.json({ error: "backup_invalid" }, 400);
  }
  try {
    assertRestoreConfirm(confirm);
    await restoreUploaded(db, bytes, env.backupDir);
  } catch (err) {
    const mapped = fail(err);
    if (mapped) return c.json(mapped.body, mapped.status);
    throw err;
  }
  const id = await actorId(actor.id);
  if (id) {
    await writeAdminAudit(db, {
      actorUserId: id,
      action: "instance_backup.restore",
      targetType: "instance",
      meta: { previousActorId: actor.id },
    });
  }
  clearSessionCookie(c);
  return c.json({ ok: true, signedOut: true });
});

adminBackupRoutes.post("/undo", async (c) => {
  const denied = await requireStepUp(c);
  if (denied) return denied;
  const actor = c.get("user");
  let confirm: unknown;
  try {
    const body = await c.req.json();
    confirm = (body as { confirm?: unknown }).confirm;
  } catch {
    return c.json({ error: "confirm_required" }, 400);
  }
  try {
    assertRestoreConfirm(confirm);
    await undoLastRestore(db, env.backupDir);
  } catch (err) {
    const mapped = fail(err);
    if (mapped) return c.json(mapped.body, mapped.status);
    throw err;
  }
  const id = await actorId(actor.id);
  if (id) {
    await writeAdminAudit(db, {
      actorUserId: id,
      action: "instance_backup.undo",
      targetType: "instance",
      meta: { previousActorId: actor.id },
    });
  }
  clearSessionCookie(c);
  return c.json({ ok: true, signedOut: true });
});
