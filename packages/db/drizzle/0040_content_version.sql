ALTER TABLE "lessons" ADD COLUMN IF NOT EXISTS "content_version" integer DEFAULT 1 NOT NULL;
--> statement-breakpoint
ALTER TABLE "user_lesson_progress" ADD COLUMN IF NOT EXISTS "completed_content_version" integer;
