ALTER TABLE "user_lesson_progress" ADD COLUMN IF NOT EXISTS "last_practiced_at" timestamp with time zone;
