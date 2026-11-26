-- 0045_fk_indexes
-- Indexes for foreign-key columns that had none (checked against pg_index on a
-- migrated DB: no index with the FK column as its leading column). Each is used
-- either to filter/join by that column or by ON DELETE CASCADE / SET NULL when
-- the parent row is deleted (account deletion touches every *user_id* below).
-- Additive only: CREATE INDEX IF NOT EXISTS.
CREATE INDEX IF NOT EXISTS "units_course_id_idx" ON "units" USING btree ("course_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lessons_course_id_idx" ON "lessons" USING btree ("course_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lessons_unit_id_idx" ON "lessons" USING btree ("unit_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_course_progress_course_id_idx" ON "user_course_progress" USING btree ("course_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_lesson_progress_lesson_id_idx" ON "user_lesson_progress" USING btree ("lesson_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "password_reset_tokens_user_id_idx" ON "password_reset_tokens" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tournaments_host_user_id_idx" ON "tournaments" USING btree ("host_user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tournament_players_user_id_idx" ON "tournament_players" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tournament_pairings_black_id_idx" ON "tournament_pairings" USING btree ("black_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tournament_pairings_game_id_idx" ON "tournament_pairings" USING btree ("game_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tournament_pairings_tournament_id_idx" ON "tournament_pairings" USING btree ("tournament_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tournament_pairings_white_id_idx" ON "tournament_pairings" USING btree ("white_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organizations_owner_user_id_idx" ON "organizations" USING btree ("owner_user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organization_members_user_id_idx" ON "organization_members" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "classes_organization_id_idx" ON "classes" USING btree ("organization_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "classes_teacher_user_id_idx" ON "classes" USING btree ("teacher_user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "class_members_user_id_idx" ON "class_members" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_achievements_achievement_id_idx" ON "user_achievements" USING btree ("achievement_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "friendships_addressee_id_idx" ON "friendships" USING btree ("addressee_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "weekly_challenge_progress_user_id_idx" ON "weekly_challenge_progress" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "certificates_course_id_idx" ON "certificates" USING btree ("course_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "class_assignments_class_id_idx" ON "class_assignments" USING btree ("class_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "class_assignments_course_id_idx" ON "class_assignments" USING btree ("course_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "class_assignments_created_by_user_id_idx" ON "class_assignments" USING btree ("created_by_user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "class_assignments_lesson_id_idx" ON "class_assignments" USING btree ("lesson_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "assignment_submissions_user_id_idx" ON "assignment_submissions" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "parent_student_links_student_user_id_idx" ON "parent_student_links" USING btree ("student_user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lesson_bookmarks_lesson_id_idx" ON "lesson_bookmarks" USING btree ("lesson_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "class_messages_class_id_idx" ON "class_messages" USING btree ("class_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "class_messages_user_id_idx" ON "class_messages" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "referral_redemptions_code_id_idx" ON "referral_redemptions" USING btree ("code_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "shop_purchases_user_id_idx" ON "shop_purchases" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "study_notes_lesson_id_idx" ON "study_notes" USING btree ("lesson_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "study_sessions_user_id_idx" ON "study_sessions" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "flashcard_decks_owner_user_id_idx" ON "flashcard_decks" USING btree ("owner_user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "flashcards_deck_id_idx" ON "flashcards" USING btree ("deck_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "flashcard_states_card_id_idx" ON "flashcard_states" USING btree ("card_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "flashcard_reviews_card_id_idx" ON "flashcard_reviews" USING btree ("card_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "flashcard_reviews_user_id_idx" ON "flashcard_reviews" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tutor_messages_user_id_idx" ON "tutor_messages" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "placement_results_user_id_idx" ON "placement_results" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lesson_comments_lesson_id_idx" ON "lesson_comments" USING btree ("lesson_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lesson_comments_user_id_idx" ON "lesson_comments" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "push_subscriptions_user_id_idx" ON "push_subscriptions" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "class_playground_challenges_created_by_user_id_idx" ON "class_playground_challenges" USING btree ("created_by_user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "mfa_pending_user_id_idx" ON "mfa_pending" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "admin_step_up_tokens_user_id_idx" ON "admin_step_up_tokens" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "platform_settings_updated_by_user_id_idx" ON "platform_settings" USING btree ("updated_by_user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_verification_tokens_user_id_idx" ON "email_verification_tokens" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "oauth_accounts_user_id_idx" ON "oauth_accounts" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "family_invites_owner_user_id_idx" ON "family_invites" USING btree ("owner_user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "exercise_attempts_lesson_id_idx" ON "exercise_attempts" USING btree ("lesson_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "exercise_reviews_lesson_id_idx" ON "exercise_reviews" USING btree ("lesson_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_unit_placements_course_id_idx" ON "user_unit_placements" USING btree ("course_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_unit_placements_placement_result_id_idx" ON "user_unit_placements" USING btree ("placement_result_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_unit_placements_unit_id_idx" ON "user_unit_placements" USING btree ("unit_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chess_puzzle_stats_lesson_id_idx" ON "chess_puzzle_stats" USING btree ("lesson_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chess_puzzle_attempts_lesson_id_idx" ON "chess_puzzle_attempts" USING btree ("lesson_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chess_personal_puzzles_game_id_idx" ON "chess_personal_puzzles" USING btree ("game_id");
