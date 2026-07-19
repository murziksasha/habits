CREATE TABLE IF NOT EXISTS "placement_results" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "course_slug" varchar(32) NOT NULL,
  "score" real DEFAULT 0 NOT NULL,
  "level_label" varchar(32) DEFAULT 'A1' NOT NULL,
  "answers" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "recommended_unit_slug" varchar(64),
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "lesson_comments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "lesson_id" uuid NOT NULL REFERENCES "lessons"("id") ON DELETE cascade,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "body" text NOT NULL,
  "parent_id" uuid,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "learning_milestones" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "code" varchar(64) NOT NULL,
  "title_uk" varchar(200) NOT NULL,
  "title_en" varchar(200) DEFAULT '' NOT NULL,
  "unlocked_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "lm_user_code" ON "learning_milestones" ("user_id","code");
