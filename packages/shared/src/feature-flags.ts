/**
 * Simple env-based feature flags for web/API (no DB table).
 * Set FEATURE_<NAME>=1|true|on to enable; =0|false|off to disable.
 */

export type FeatureFlagName =
  | "labs"
  | "tutor_ai"
  | "push_reengage"
  | "parent_digest"
  | "socket_redis"
  | "strict_csrf"
  | "email_verify"
  | "require_email_verify"
  | "dev_billing";

const ALIASES: Record<FeatureFlagName, string[]> = {
  labs: ["FEATURE_LABS", "EDUFORGE_LABS"],
  tutor_ai: ["FEATURE_TUTOR_AI", "XAI_API_KEY"], // key present counts as on for AI
  push_reengage: ["FEATURE_PUSH_REENGAGE"],
  parent_digest: ["FEATURE_PARENT_DIGEST"],
  socket_redis: ["FEATURE_SOCKET_REDIS", "REDIS_URL"],
  strict_csrf: ["FEATURE_STRICT_CSRF"],
  email_verify: ["FEATURE_EMAIL_VERIFY"],
  require_email_verify: ["FEATURE_REQUIRE_EMAIL_VERIFY"],
  dev_billing: ["ALLOW_DEV_BILLING", "FEATURE_DEV_BILLING"],
};

function truthy(v: string | undefined): boolean {
  if (!v) return false;
  const s = v.trim().toLowerCase();
  return s === "1" || s === "true" || s === "yes" || s === "on";
}

function falsy(v: string | undefined): boolean {
  if (!v) return false;
  const s = v.trim().toLowerCase();
  return s === "0" || s === "false" || s === "no" || s === "off";
}

function defaultEnv(): Record<string, string | undefined> {
  try {
    // eslint-disable-next-line no-undef
    const p = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
    return p?.env ?? {};
  } catch {
    return {};
  }
}

function isProd(env: Record<string, string | undefined>): boolean {
  return (env.NODE_ENV ?? "").toLowerCase() === "production";
}

/**
 * Resolve flags from a process.env-like map (injectable for tests).
 */
export function resolveFeatureFlags(
  env: Record<string, string | undefined> = defaultEnv(),
): Record<FeatureFlagName, boolean> {
  const out = {} as Record<FeatureFlagName, boolean>;
  const prod = isProd(env);

  for (const name of Object.keys(ALIASES) as FeatureFlagName[]) {
    const keys = ALIASES[name];
    if (name === "tutor_ai") {
      out[name] = truthy(env.FEATURE_TUTOR_AI) || Boolean(env.XAI_API_KEY?.trim());
      continue;
    }
    if (name === "socket_redis") {
      out[name] =
        truthy(env.FEATURE_SOCKET_REDIS) ||
        (Boolean(env.REDIS_URL) && env.FEATURE_SOCKET_REDIS !== "0");
      continue;
    }
    // Explicit off wins
    if (keys.some((k) => falsy(env[k]))) {
      out[name] = false;
      continue;
    }
    out[name] = keys.some((k) => truthy(env[k]));
  }

  // Defaults for retention ops: on unless explicitly disabled
  if (env.FEATURE_PARENT_DIGEST === undefined) out.parent_digest = true;
  if (env.FEATURE_PUSH_REENGAGE === undefined) out.push_reengage = true;

  // Production: strict CSRF on by default (disable with FEATURE_STRICT_CSRF=0)
  if (env.FEATURE_STRICT_CSRF === undefined) {
    out.strict_csrf = prod;
  }

  // Email verification: on by default in production (soft banner); hard gate optional
  if (env.FEATURE_EMAIL_VERIFY === undefined) {
    out.email_verify = true;
  }

  // Dev billing: NEVER on in production unless ALLOW_DEV_BILLING=1
  if (prod) {
    out.dev_billing = truthy(env.ALLOW_DEV_BILLING) || truthy(env.FEATURE_DEV_BILLING);
  } else if (env.ALLOW_DEV_BILLING === undefined && env.FEATURE_DEV_BILLING === undefined) {
    out.dev_billing = true; // local demo upgrades
  }

  return out;
}

export function isFeatureEnabled(
  name: FeatureFlagName,
  env?: Record<string, string | undefined>,
): boolean {
  return resolveFeatureFlags(env)[name];
}
