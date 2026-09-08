/** Map driver errors to stable API error codes. */

export function isUniqueViolation(err: unknown): boolean {
  const walk = (e: unknown, depth = 0): boolean => {
    if (!e || depth > 4) return false;
    if (typeof e !== "object") return false;
    const rec = e as { code?: unknown; cause?: unknown; message?: unknown };
    if (rec.code === "23505") return true;
    if (typeof rec.message === "string" && /duplicate key|unique constraint/i.test(rec.message)) {
      return true;
    }
    return walk(rec.cause, depth + 1);
  };
  return walk(err);
}
