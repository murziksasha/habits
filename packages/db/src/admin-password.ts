/**
 * The seed never invents an admin password: ADMIN_PASSWORD must be set
 * explicitly. In production weak or published passwords are refused.
 */

export const MIN_PROD_ADMIN_PASSWORD_LENGTH = 12;

/** Passwords that were published in docs, examples or tests — never valid in production. */
const KNOWN_WEAK = new Set([
  "admin12345",
  "admin",
  "admin123",
  "password",
  "password123",
  "changeme",
  "change-me",
  "eduforge",
  "12345678",
  "123456789012",
  "qwerty123456",
]);

export type AdminPasswordCheck = { ok: true; password: string } | { ok: false; error: string };

export function resolveAdminPassword(env: Record<string, string | undefined>): AdminPasswordCheck {
  const password = env.ADMIN_PASSWORD ?? "";
  if (!password) {
    return {
      ok: false,
      error: "ADMIN_PASSWORD is not set. Set it in .env (or the environment) before seeding; there is no default.",
    };
  }
  if (env.NODE_ENV !== "production") return { ok: true, password };
  const email = (env.ADMIN_EMAIL ?? "").toLowerCase();
  const lower = password.toLowerCase();
  if (KNOWN_WEAK.has(lower) || (email && (lower === email || lower === email.split("@")[0]))) {
    return { ok: false, error: "ADMIN_PASSWORD is a known/published or guessable password; refused in production." };
  }
  if (password.length < MIN_PROD_ADMIN_PASSWORD_LENGTH) {
    return {
      ok: false,
      error: `ADMIN_PASSWORD must be at least ${MIN_PROD_ADMIN_PASSWORD_LENGTH} characters in production.`,
    };
  }
  if (new Set(password).size < 6) {
    return { ok: false, error: "ADMIN_PASSWORD has too few distinct characters for production." };
  }
  return { ok: true, password };
}
