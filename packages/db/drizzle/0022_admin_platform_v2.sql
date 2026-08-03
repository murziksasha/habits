-- Admin Platform v2: MFA, free course slugs, publish status, platform settings

CREATE TYPE "public"."course_publish_status" AS ENUM('draft', 'published', 'archived');

-- users: TOTP fields
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "totp_secret_enc" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "totp_enabled" boolean DEFAULT false NOT NULL;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "totp_verified_at" timestamptz;

-- sessions: MFA verified flag
ALTER TABLE "sessions" ADD COLUMN IF NOT EXISTS "mfa_verified_at" timestamptz;

-- courses: free slug + lifecycle
ALTER TABLE "courses" ALTER COLUMN "slug" TYPE varchar(64) USING "slug"::text;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "status" "course_publish_status" DEFAULT 'published' NOT NULL;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "category" varchar(32) DEFAULT 'skill' NOT NULL;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "is_visible" boolean DEFAULT true NOT NULL;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "published_at" timestamptz;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "content_source" varchar(16) DEFAULT 'seed' NOT NULL;
UPDATE "courses" SET "published_at" = COALESCE("published_at", NOW()) WHERE "status" = 'published';

-- skill_attempts: free course slug
ALTER TABLE "skill_attempts" ALTER COLUMN "course_slug" TYPE varchar(64) USING "course_slug"::text;

-- MFA pending challenges
CREATE TABLE IF NOT EXISTS "mfa_pending" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "token_hash" text NOT NULL UNIQUE,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

-- Admin step-up tokens
CREATE TABLE IF NOT EXISTS "admin_step_up_tokens" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "token_hash" text NOT NULL UNIQUE,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

-- Platform settings (theme, etc.)
CREATE TABLE IF NOT EXISTS "platform_settings" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "key" varchar(64) NOT NULL UNIQUE,
  "value" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL,
  "updated_by_user_id" uuid REFERENCES "users"("id") ON DELETE SET NULL
);

-- Best-effort: drop unused enum if nothing references it (ignore errors in manual runs)
-- DROP TYPE IF EXISTS "public"."course_slug";
