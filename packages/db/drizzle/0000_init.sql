CREATE TYPE "public"."plan" AS ENUM('free', 'premium');
CREATE TYPE "public"."course_slug" AS ENUM('english', 'chess', 'typing', 'speed_reading', 'logic');
CREATE TYPE "public"."lesson_status" AS ENUM('locked', 'available', 'completed');
CREATE TYPE "public"."chess_game_status" AS ENUM('waiting', 'active', 'finished', 'aborted');

CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email" varchar(255) NOT NULL UNIQUE,
  "password_hash" text NOT NULL,
  "role" varchar(32) DEFAULT 'user' NOT NULL,
  "plan" "plan" DEFAULT 'free' NOT NULL,
  "stripe_customer_id" varchar(255),
  "stripe_subscription_id" varchar(255),
  "plan_expires_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "characters" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE cascade,
  "display_name" varchar(64) NOT NULL,
  "avatar_key" varchar(64) DEFAULT 'default' NOT NULL,
  "global_xp" integer DEFAULT 0 NOT NULL,
  "global_level" integer DEFAULT 1 NOT NULL,
  "streak_days" integer DEFAULT 0 NOT NULL,
  "last_active_date" varchar(10),
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "courses" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" "course_slug" NOT NULL UNIQUE,
  "title_uk" varchar(128) NOT NULL,
  "description_uk" text NOT NULL,
  "icon" varchar(16) NOT NULL,
  "color" varchar(16) NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "units" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "course_id" uuid NOT NULL REFERENCES "courses"("id") ON DELETE cascade,
  "slug" varchar(64) NOT NULL,
  "title_uk" varchar(128) NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "lessons" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "unit_id" uuid NOT NULL REFERENCES "units"("id") ON DELETE cascade,
  "course_id" uuid NOT NULL REFERENCES "courses"("id") ON DELETE cascade,
  "slug" varchar(64) NOT NULL,
  "title_uk" varchar(128) NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "base_xp" integer DEFAULT 15 NOT NULL,
  "difficulty" integer DEFAULT 1 NOT NULL,
  "is_free" boolean DEFAULT false NOT NULL,
  "exercises" jsonb DEFAULT '[]'::jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_course_progress" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "course_id" uuid NOT NULL REFERENCES "courses"("id") ON DELETE cascade,
  "xp" integer DEFAULT 0 NOT NULL,
  "level" integer DEFAULT 1 NOT NULL,
  "hearts" integer DEFAULT 5 NOT NULL,
  "hearts_updated_at" timestamp with time zone DEFAULT now(),
  "completed_lessons" integer DEFAULT 0 NOT NULL,
  "last_lesson_id" uuid
);
CREATE UNIQUE INDEX IF NOT EXISTS "ucp_user_course" ON "user_course_progress" ("user_id","course_id");

CREATE TABLE IF NOT EXISTS "user_lesson_progress" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "lesson_id" uuid NOT NULL REFERENCES "lessons"("id") ON DELETE cascade,
  "course_id" uuid NOT NULL REFERENCES "courses"("id") ON DELETE cascade,
  "status" "lesson_status" DEFAULT 'available' NOT NULL,
  "best_score" real DEFAULT 0 NOT NULL,
  "attempts" integer DEFAULT 0 NOT NULL,
  "completed_at" timestamp with time zone
);
CREATE UNIQUE INDEX IF NOT EXISTS "ulp_user_lesson" ON "user_lesson_progress" ("user_id","lesson_id");

CREATE TABLE IF NOT EXISTS "skill_attempts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "course_slug" "course_slug" NOT NULL,
  "metrics" jsonb NOT NULL,
  "xp_gained" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "chess_ratings" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE cascade,
  "elo" integer DEFAULT 1000 NOT NULL,
  "games_played" integer DEFAULT 0 NOT NULL,
  "wins" integer DEFAULT 0 NOT NULL,
  "losses" integer DEFAULT 0 NOT NULL,
  "draws" integer DEFAULT 0 NOT NULL,
  "rated_games_today" integer DEFAULT 0 NOT NULL,
  "rated_games_date" varchar(10)
);

CREATE TABLE IF NOT EXISTS "chess_games" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "white_id" uuid REFERENCES "users"("id"),
  "black_id" uuid REFERENCES "users"("id"),
  "fen" text NOT NULL,
  "pgn" text DEFAULT '' NOT NULL,
  "status" "chess_game_status" DEFAULT 'waiting' NOT NULL,
  "time_control" varchar(16) NOT NULL,
  "rated" boolean DEFAULT true NOT NULL,
  "result" varchar(16),
  "white_time_ms" integer NOT NULL,
  "black_time_ms" integer NOT NULL,
  "last_move_at" timestamp with time zone,
  "white_elo_before" integer,
  "black_elo_before" integer,
  "white_elo_delta" integer,
  "black_elo_delta" integer,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "finished_at" timestamp with time zone
);

CREATE TABLE IF NOT EXISTS "sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "token_hash" text NOT NULL UNIQUE,
  "expires_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
