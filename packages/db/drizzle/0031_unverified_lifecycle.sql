-- Unverified account lifecycle. email_verified_at and tokens already exist (0027).
-- Do not backfill email_verified_at again: that would mark later signups as verified.
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "account_status" varchar(16) DEFAULT 'active' NOT NULL;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_unverified_created_idx" ON "users" USING btree ("email_verified_at","created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_account_status_idx" ON "users" USING btree ("account_status");
