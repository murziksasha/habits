ALTER TABLE "characters" ADD COLUMN IF NOT EXISTS "progression" jsonb DEFAULT '{"lastLevelAwarded":1,"skillPoints":0,"talents":{},"unlockedTitles":["rookie"],"equippedTitle":"rookie","unlockedFrames":["none"],"equippedFrame":"none"}'::jsonb NOT NULL;
--> statement-breakpoint
DO $$ BEGIN
  CREATE TYPE "public"."gift_status" AS ENUM('pending', 'claimed', 'expired');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_gifts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "from_user_id" uuid NOT NULL,
  "to_user_id" uuid NOT NULL,
  "gift_key" varchar(64) NOT NULL,
  "message" varchar(280),
  "status" "gift_status" DEFAULT 'pending' NOT NULL,
  "payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "claimed_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "character_gifts" ADD CONSTRAINT "character_gifts_from_user_id_users_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "character_gifts" ADD CONSTRAINT "character_gifts_to_user_id_users_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "character_gifts_to_status_idx" ON "character_gifts" USING btree ("to_user_id","status");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "character_gifts_from_created_idx" ON "character_gifts" USING btree ("from_user_id","created_at");
