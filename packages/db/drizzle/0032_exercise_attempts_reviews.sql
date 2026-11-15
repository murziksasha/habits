-- SPEC 92: per-exercise attempts (confidence / calibration) + exercise-level SRS (mistake notebook)
CREATE TABLE IF NOT EXISTS "exercise_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"lesson_id" uuid NOT NULL,
	"exercise_id" varchar(128) NOT NULL,
	"exercise_type" varchar(32) DEFAULT '' NOT NULL,
	"correct" boolean NOT NULL,
	"first_try" boolean NOT NULL,
	"wrong_attempts" integer DEFAULT 0 NOT NULL,
	"confidence" integer,
	"source" varchar(16) DEFAULT 'lesson' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise_attempts" ADD CONSTRAINT "exercise_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise_attempts" ADD CONSTRAINT "exercise_attempts_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "exercise_attempts_user_created_idx" ON "exercise_attempts" USING btree ("user_id","created_at");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercise_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"lesson_id" uuid NOT NULL,
	"exercise_id" varchar(128) NOT NULL,
	"ease" integer DEFAULT 250 NOT NULL,
	"interval_days" integer DEFAULT 0 NOT NULL,
	"repetitions" integer DEFAULT 0 NOT NULL,
	"lapses" integer DEFAULT 0 NOT NULL,
	"due_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise_reviews" ADD CONSTRAINT "exercise_reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise_reviews" ADD CONSTRAINT "exercise_reviews_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "exercise_reviews_user_ex_uq" ON "exercise_reviews" USING btree ("user_id","lesson_id","exercise_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "exercise_reviews_user_due_idx" ON "exercise_reviews" USING btree ("user_id","due_at");
