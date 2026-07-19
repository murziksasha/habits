ALTER TABLE "characters" ADD COLUMN IF NOT EXISTS "streak_freezes" integer DEFAULT 0 NOT NULL;
ALTER TABLE "characters" ADD COLUMN IF NOT EXISTS "unlocked_avatars" jsonb DEFAULT '["default","wizard","knight","scholar","fox","robot"]'::jsonb NOT NULL;

CREATE TABLE IF NOT EXISTS "shop_purchases" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "item_id" varchar(64) NOT NULL,
  "cost_xp" integer NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_daily_quests" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "quest_date" varchar(10) NOT NULL,
  "quest_key" varchar(64) NOT NULL,
  "progress" integer DEFAULT 0 NOT NULL,
  "target" integer NOT NULL,
  "reward_xp" integer DEFAULT 0 NOT NULL,
  "completed" boolean DEFAULT false NOT NULL,
  "claimed" boolean DEFAULT false NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "udq_user_date_key" ON "user_daily_quests" ("user_id","quest_date","quest_key");

CREATE TABLE IF NOT EXISTS "study_notes" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "lesson_id" uuid NOT NULL REFERENCES "lessons"("id") ON DELETE cascade,
  "body" text DEFAULT '' NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "sn_user_lesson" ON "study_notes" ("user_id","lesson_id");

CREATE TABLE IF NOT EXISTS "study_sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "course_slug" varchar(32),
  "duration_sec" integer DEFAULT 0 NOT NULL,
  "note" varchar(255) DEFAULT '' NOT NULL,
  "started_at" timestamp with time zone DEFAULT now() NOT NULL,
  "ended_at" timestamp with time zone
);
