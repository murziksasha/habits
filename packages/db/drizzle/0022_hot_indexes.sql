-- Hot-path indexes for activity feed, notifications, and lesson progress queries
CREATE INDEX IF NOT EXISTS "activity_events_user_created_idx" ON "activity_events" ("user_id", "created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notifications_user_created_idx" ON "notifications" ("user_id", "created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notifications_user_unread_idx" ON "notifications" ("user_id", "read_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ulp_user_course_status_idx" ON "user_lesson_progress" ("user_id", "course_id", "status");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ulp_course_completed_at_idx" ON "user_lesson_progress" ("course_id", "completed_at");
