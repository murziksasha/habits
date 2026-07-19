CREATE TYPE "public"."friendship_status" AS ENUM('pending', 'accepted', 'blocked');

CREATE TABLE IF NOT EXISTS "friendships" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "requester_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "addressee_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "status" "friendship_status" DEFAULT 'pending' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "friendship_pair" ON "friendships" ("requester_id","addressee_id");

CREATE TABLE IF NOT EXISTS "weekly_challenges" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "week_key" varchar(16) NOT NULL UNIQUE,
  "title_uk" varchar(200) NOT NULL,
  "title_en" varchar(200) NOT NULL,
  "description_uk" text DEFAULT '' NOT NULL,
  "description_en" text DEFAULT '' NOT NULL,
  "target_xp" integer DEFAULT 200 NOT NULL,
  "starts_at" timestamp with time zone NOT NULL,
  "ends_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "weekly_challenge_progress" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "challenge_id" uuid NOT NULL REFERENCES "weekly_challenges"("id") ON DELETE cascade,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "xp" integer DEFAULT 0 NOT NULL,
  "completed_at" timestamp with time zone
);
CREATE UNIQUE INDEX IF NOT EXISTS "wcp_challenge_user" ON "weekly_challenge_progress" ("challenge_id","user_id");

CREATE TABLE IF NOT EXISTS "certificates" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "course_id" uuid NOT NULL REFERENCES "courses"("id") ON DELETE cascade,
  "code" varchar(32) NOT NULL UNIQUE,
  "title_uk" varchar(200) NOT NULL,
  "title_en" varchar(200) NOT NULL,
  "issued_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "cert_user_course" ON "certificates" ("user_id","course_id");
