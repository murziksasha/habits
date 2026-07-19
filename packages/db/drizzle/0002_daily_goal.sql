ALTER TABLE "characters" ADD COLUMN IF NOT EXISTS "daily_xp" integer DEFAULT 0 NOT NULL;
ALTER TABLE "characters" ADD COLUMN IF NOT EXISTS "daily_xp_date" varchar(10);
ALTER TABLE "characters" ADD COLUMN IF NOT EXISTS "daily_goal_xp" integer DEFAULT 50 NOT NULL;
