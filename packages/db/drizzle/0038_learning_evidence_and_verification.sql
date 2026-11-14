-- Learning evidence levels, attempt tracking extensions, and self-verification sessions (Wave 1)
ALTER TABLE "user_lesson_progress" ADD COLUMN IF NOT EXISTS "evidence_level" varchar(32) DEFAULT 'insufficient_data' NOT NULL;
--> statement-breakpoint
ALTER TABLE "user_lesson_progress" ADD COLUMN IF NOT EXISTS "last_self_verified_at" timestamp with time zone;
--> statement-breakpoint
ALTER TABLE "exercise_attempts" ADD COLUMN IF NOT EXISTS "first_check_passed" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE "exercise_attempts" ADD COLUMN IF NOT EXISTS "hints_used" integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE "exercise_attempts" ADD COLUMN IF NOT EXISTS "solution_revealed" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE "exercise_attempts" ADD COLUMN IF NOT EXISTS "practice_mode" varchar(32) DEFAULT 'guided' NOT NULL;
--> statement-breakpoint
ALTER TABLE "exercise_attempts" ADD COLUMN IF NOT EXISTS "verification_method" varchar(32) DEFAULT 'lesson' NOT NULL;
--> statement-breakpoint
ALTER TABLE "exercise_attempts" ADD COLUMN IF NOT EXISTS "data_source" varchar(32) DEFAULT 'curated' NOT NULL;
--> statement-breakpoint
ALTER TABLE "exercise_attempts" ADD COLUMN IF NOT EXISTS "feedback_category" varchar(32);
--> statement-breakpoint
ALTER TABLE "exercise_attempts" ADD COLUMN IF NOT EXISTS "exercise_version" varchar(32) DEFAULT '1' NOT NULL;
--> statement-breakpoint
ALTER TABLE "exercise_attempts" ADD COLUMN IF NOT EXISTS "variant_id" varchar(64);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "self_verification_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"course_slug" varchar(64) NOT NULL,
	"lesson_slug" varchar(128) NOT NULL,
	"exercise_index" integer DEFAULT 0 NOT NULL,
	"dataset_version" varchar(64) DEFAULT '1' NOT NULL,
	"first_answer_submitted" text DEFAULT '' NOT NULL,
	"passed" boolean DEFAULT false NOT NULL,
	"evidence_level" varchar(32) DEFAULT 'insufficient_data' NOT NULL,
	"feedback_category" varchar(32) DEFAULT 'knowledge_gap' NOT NULL,
	"meta" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"submitted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "self_verification_sessions" ADD CONSTRAINT "self_verification_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "svs_user_course_lesson_idx" ON "self_verification_sessions" USING btree ("user_id","course_slug","lesson_slug");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "svs_user_created_idx" ON "self_verification_sessions" USING btree ("user_id","created_at");
