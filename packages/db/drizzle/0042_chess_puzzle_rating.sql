CREATE TABLE IF NOT EXISTS "chess_puzzle_ratings_user" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"rating" real DEFAULT 1200 NOT NULL,
	"rd" real DEFAULT 350 NOT NULL,
	"volatility" real DEFAULT 0.06 NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"placed" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_puzzle_ratings_user" ADD CONSTRAINT "chess_puzzle_ratings_user_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chess_puzzle_stats" (
	"exercise_id" varchar(128) PRIMARY KEY NOT NULL,
	"lesson_id" uuid,
	"rating" real NOT NULL,
	"rd" real DEFAULT 150 NOT NULL,
	"volatility" real DEFAULT 0.06 NOT NULL,
	"themes" text[] DEFAULT '{}' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"first_try_solves" integer DEFAULT 0 NOT NULL,
	"rated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_puzzle_stats" ADD CONSTRAINT "chess_puzzle_stats_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chess_puzzle_stats_rating_idx" ON "chess_puzzle_stats" USING btree ("rating");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chess_puzzle_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"exercise_id" varchar(128) NOT NULL,
	"lesson_id" uuid,
	"result" real NOT NULL,
	"first_attempt" boolean DEFAULT true NOT NULL,
	"hints_used" smallint DEFAULT 0 NOT NULL,
	"themes" text[] DEFAULT '{}' NOT NULL,
	"rating_before" real,
	"rating_after" real,
	"puzzle_rating" real,
	"puzzle_rd" real,
	"ms_spent" integer,
	"batched_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_puzzle_attempts" ADD CONSTRAINT "chess_puzzle_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_puzzle_attempts" ADD CONSTRAINT "chess_puzzle_attempts_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chess_puzzle_attempts_user_idx" ON "chess_puzzle_attempts" USING btree ("user_id","created_at" DESC);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chess_puzzle_attempts_batch_idx" ON "chess_puzzle_attempts" USING btree ("batched_at","first_attempt");
--> statement-breakpoint
ALTER TABLE "exercise_reviews" ADD COLUMN IF NOT EXISTS "reason" varchar(32);
