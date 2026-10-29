-- EduForge is free. Drop Stripe identifiers and subscription expiry.
UPDATE "users" SET "plan" = 'free' WHERE "plan" = 'premium';
ALTER TABLE "users" DROP COLUMN IF EXISTS "stripe_customer_id";
ALTER TABLE "users" DROP COLUMN IF EXISTS "stripe_subscription_id";
ALTER TABLE "users" DROP COLUMN IF EXISTS "plan_expires_at";
