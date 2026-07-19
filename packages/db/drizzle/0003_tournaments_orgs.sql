CREATE TYPE "public"."tournament_status" AS ENUM('draft', 'registration', 'active', 'finished', 'cancelled');
CREATE TYPE "public"."org_role" AS ENUM('owner', 'teacher', 'student');

CREATE TABLE IF NOT EXISTS "tournaments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" varchar(64) NOT NULL UNIQUE,
  "title_uk" varchar(128) NOT NULL,
  "title_en" varchar(128) DEFAULT '' NOT NULL,
  "description_uk" text DEFAULT '' NOT NULL,
  "host_user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "status" "tournament_status" DEFAULT 'registration' NOT NULL,
  "time_control" varchar(16) DEFAULT '5+0' NOT NULL,
  "max_players" integer DEFAULT 16 NOT NULL,
  "current_round" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "starts_at" timestamp with time zone
);

CREATE TABLE IF NOT EXISTS "tournament_players" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "tournament_id" uuid NOT NULL REFERENCES "tournaments"("id") ON DELETE cascade,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "score" real DEFAULT 0 NOT NULL,
  "seed" integer DEFAULT 0 NOT NULL,
  "joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "tp_tournament_user" ON "tournament_players" ("tournament_id","user_id");

CREATE TABLE IF NOT EXISTS "tournament_pairings" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "tournament_id" uuid NOT NULL REFERENCES "tournaments"("id") ON DELETE cascade,
  "round" integer NOT NULL,
  "white_id" uuid REFERENCES "users"("id"),
  "black_id" uuid REFERENCES "users"("id"),
  "game_id" uuid REFERENCES "chess_games"("id"),
  "result" varchar(16),
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "organizations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" varchar(128) NOT NULL,
  "slug" varchar(64) NOT NULL UNIQUE,
  "owner_user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "organization_members" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE cascade,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "role" "org_role" DEFAULT 'student' NOT NULL,
  "joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "om_org_user" ON "organization_members" ("organization_id","user_id");

CREATE TABLE IF NOT EXISTS "classes" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "organization_id" uuid NOT NULL REFERENCES "organizations"("id") ON DELETE cascade,
  "name" varchar(128) NOT NULL,
  "invite_code" varchar(16) NOT NULL UNIQUE,
  "teacher_user_id" uuid REFERENCES "users"("id"),
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "class_members" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "class_id" uuid NOT NULL REFERENCES "classes"("id") ON DELETE cascade,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "cm_class_user" ON "class_members" ("class_id","user_id");
