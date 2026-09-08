-- Audit pack: session cleanup, chess history, XP/skill attempts
CREATE INDEX IF NOT EXISTS "sessions_expires_at_idx" ON "sessions" ("expires_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "sessions" ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chess_games_white_idx" ON "chess_games" ("white_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chess_games_black_idx" ON "chess_games" ("black_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chess_games_status_idx" ON "chess_games" ("status");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "skill_attempts_user_course_idx" ON "skill_attempts" ("user_id", "course_slug");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "skill_attempts_user_created_idx" ON "skill_attempts" ("user_id", "created_at");
