-- Weekly learning target on characters (nullable: null = automatic goal)
ALTER TABLE "characters" ADD COLUMN IF NOT EXISTS "weekly_target" integer;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "skill_attempts_user_created_id_idx" ON "skill_attempts" ("user_id", "created_at", "id");
