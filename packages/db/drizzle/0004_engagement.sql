CREATE TABLE IF NOT EXISTS "achievements" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "code" varchar(64) NOT NULL UNIQUE,
  "title_uk" varchar(128) NOT NULL,
  "title_en" varchar(128) NOT NULL,
  "description_uk" text DEFAULT '' NOT NULL,
  "description_en" text DEFAULT '' NOT NULL,
  "icon" varchar(16) DEFAULT '🏅' NOT NULL,
  "xp_reward" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_achievements" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "achievement_id" uuid NOT NULL REFERENCES "achievements"("id") ON DELETE cascade,
  "unlocked_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "ua_user_ach" ON "user_achievements" ("user_id","achievement_id");

CREATE TABLE IF NOT EXISTS "notifications" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "type" varchar(32) DEFAULT 'info' NOT NULL,
  "title_uk" varchar(200) NOT NULL,
  "title_en" varchar(200) DEFAULT '' NOT NULL,
  "body_uk" text DEFAULT '' NOT NULL,
  "body_en" text DEFAULT '' NOT NULL,
  "href" varchar(255),
  "read_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "activity_events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "kind" varchar(48) NOT NULL,
  "payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
