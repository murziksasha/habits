/** Production secret hygiene — never ship known placeholders. */

function envMap(): Record<string, string | undefined> {
  try {
    return (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
      ?.env ?? {};
  } catch {
    return {};
  }
}

export const WEAK_AUTH_SECRETS = new Set([
  "",
  "dev-secret-change-me",
  "change-me-to-a-long-random-string",
  "superSecret123",
  "session-secret-local",
  "cron-secret-local",
  "ci-test-secret",
]);

export function isWeakSecret(value: string | undefined, minLen = 32): boolean {
  const v = (value ?? "").trim();
  if (v.length < minLen) return true;
  if (WEAK_AUTH_SECRETS.has(v)) return true;
  return false;
}

export function isProductionEnv(
  env: Record<string, string | undefined> = envMap(),
): boolean {
  return (env.NODE_ENV ?? "").toLowerCase() === "production";
}

/**
 * Fail closed in production when AUTH_SECRET is missing or a known placeholder.
 * Throws so the process does not boot with a forgeable session secret.
 */
export function assertProductionSecrets(
  env: Record<string, string | undefined> = envMap(),
): void {
  if (!isProductionEnv(env)) return;
  if (isWeakSecret(env.AUTH_SECRET)) {
    throw new Error(
      "AUTH_SECRET must be a strong random string (≥32 chars) in production; refuse known placeholders",
    );
  }
}

/** Seed demo accounts only outside production unless explicitly overridden. */
export function seedAllowed(
  env: Record<string, string | undefined> = envMap(),
): boolean {
  if (!isProductionEnv(env)) return true;
  return env.ALLOW_PROD_SEED === "1";
}

/**
 * Cron / worker shared-secret check.
 * Production requires CRON_SECRET (or an explicit alternate) to be set and to match.
 * Non-prod allows missing secret for local scripts.
 */
export function cronSecretAuthorized(
  presented: string | undefined,
  env: Record<string, string | undefined> = envMap(),
  opts?: { alternate?: string },
): boolean {
  const expected = (opts?.alternate ?? env.CRON_SECRET ?? "").trim();
  const got = (presented ?? "").trim();
  if (!expected) {
    return !isProductionEnv(env);
  }
  if (!got || got.length !== expected.length) return false;
  // Constant-time-ish compare for equal-length strings
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ got.charCodeAt(i);
  }
  return diff === 0;
}
