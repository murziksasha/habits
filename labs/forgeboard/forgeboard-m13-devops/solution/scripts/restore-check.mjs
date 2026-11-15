export function validateRestoreTarget(targetDsn) {
  let parsed;
  try {
    parsed = new URL(targetDsn);
  } catch {
    throw new Error("Invalid target DSN");
  }
  const dbName = parsed.pathname.replace(/^\//, "");
  if (/prod/i.test(parsed.hostname) || /prod/i.test(dbName)) {
    throw new Error("Refusing to restore into production host or database");
  }
  if (!dbName.endsWith("_restore_check")) {
    throw new Error("Target DB name must end with _restore_check for isolated restore verification");
  }
  return { ok: true, targetDb: dbName };
}
