import { isProductionEnv, isWeakSecret } from "@eduforge/shared";

function resolveAuthSecret(): string {
  const raw = (process.env.AUTH_SECRET ?? "").trim();
  if (isProductionEnv(process.env) && isWeakSecret(raw)) {
    throw new Error(
      "AUTH_SECRET must be a strong random string (≥32 chars) in production",
    );
  }
  return raw || "dev-secret-change-me";
}

export const env = {
  port: Number(process.env.API_PORT ?? 4000),
  databaseUrl:
    process.env.DATABASE_URL ??
    "postgresql://eduforge:eduforge@localhost:5432/eduforge",
  redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379",
  authSecret: resolveAuthSecret(),
  /** AES key material for TOTP secrets (falls back to authSecret) */
  mfaEncryptionKey: process.env.MFA_ENCRYPTION_KEY ?? "",
  webOrigin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  stripePriceMonthly: process.env.STRIPE_PRICE_MONTHLY ?? "",
  stripePriceYearly: process.env.STRIPE_PRICE_YEARLY ?? "",
  xaiApiKey: process.env.XAI_API_KEY ?? "",
  xaiModel: process.env.XAI_MODEL ?? "grok-4.5",
};
