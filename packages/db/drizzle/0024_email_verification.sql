-- Email verification + unverified account lifecycle
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_verified_at" timestamp with time zone;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "account_status" varchar(16) DEFAULT 'active' NOT NULL;
--> statement-breakpoint
-- Pre-existing users are treated as already verified so cron does not mass-inactivate them
UPDATE "users" SET "email_verified_at" = COALESCE("email_verified_at", "created_at"), "account_status" = 'active' WHERE "email_verified_at" IS NULL;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_verification_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "email_verification_tokens" ADD CONSTRAINT "email_verification_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_verification_tokens_token_hash_unique" ON "email_verification_tokens" USING btree ("token_hash");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_unverified_created_idx" ON "users" USING btree ("email_verified_at","created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_account_status_idx" ON "users" USING btree ("account_status");
