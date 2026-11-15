// TODO: Fail closed if targetDb points to prod or lacks _restore_check suffix
export function validateRestoreTarget(targetDsn) {
  return { ok: true, targetDsn };
}
