CREATE TABLE IF NOT EXISTS "class_playground_challenges" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "class_id" uuid NOT NULL REFERENCES "classes"("id") ON DELETE cascade,
  "challenge_id" varchar(64) NOT NULL,
  "title_uk" varchar(200) DEFAULT '' NOT NULL,
  "title_en" varchar(200) DEFAULT '' NOT NULL,
  "created_by_user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "due_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "cpc_class_challenge" ON "class_playground_challenges" ("class_id","challenge_id");
