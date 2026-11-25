ALTER TABLE "chess_games" ADD COLUMN IF NOT EXISTS "start_fen" text DEFAULT 'startpos' NOT NULL;
--> statement-breakpoint
ALTER TABLE "chess_games" ADD COLUMN IF NOT EXISTS "moves" jsonb DEFAULT '[]'::jsonb NOT NULL;
--> statement-breakpoint
ALTER TABLE "chess_games" ADD COLUMN IF NOT EXISTS "kind" varchar(16) DEFAULT 'online' NOT NULL;
--> statement-breakpoint
ALTER TABLE "chess_games" ADD COLUMN IF NOT EXISTS "bot_level" varchar(16);
--> statement-breakpoint
ALTER TABLE "chess_games" ADD COLUMN IF NOT EXISTS "termination" varchar(24);
--> statement-breakpoint
ALTER TABLE "chess_games" ADD COLUMN IF NOT EXISTS "draw_offer_by" uuid;
--> statement-breakpoint
ALTER TABLE "chess_games" ADD COLUMN IF NOT EXISTS "draw_offer_ply" integer;
--> statement-breakpoint
ALTER TABLE "chess_games" ADD COLUMN IF NOT EXISTS "last_draw_offer_ply_white" integer;
--> statement-breakpoint
ALTER TABLE "chess_games" ADD COLUMN IF NOT EXISTS "last_draw_offer_ply_black" integer;
--> statement-breakpoint
ALTER TABLE "chess_games" ADD COLUMN IF NOT EXISTS "analysis_status" varchar(16);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chess_game_annotations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"game_id" uuid NOT NULL,
	"ply" integer NOT NULL,
	"eval_before_cp" integer,
	"eval_after_cp" integer,
	"best_uci" varchar(8),
	"best_san" varchar(16),
	"label" varchar(16) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_game_annotations" ADD CONSTRAINT "chess_game_annotations_game_id_chess_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."chess_games"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "chess_game_annotations_game_ply_uq" ON "chess_game_annotations" USING btree ("game_id","ply");
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chess_personal_puzzles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"game_id" uuid,
	"ply" integer NOT NULL,
	"fen" text NOT NULL,
	"solution_sans" text[] NOT NULL,
	"goal" varchar(16) NOT NULL,
	"themes" text[] DEFAULT '{}' NOT NULL,
	"repetitions" integer DEFAULT 0 NOT NULL,
	"lapses" integer DEFAULT 0 NOT NULL,
	"due_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_personal_puzzles" ADD CONSTRAINT "chess_personal_puzzles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_personal_puzzles" ADD CONSTRAINT "chess_personal_puzzles_game_id_chess_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."chess_games"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "chess_personal_puzzles_game_ply_uq" ON "chess_personal_puzzles" USING btree ("user_id","game_id","ply");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chess_personal_puzzles_user_due_idx" ON "chess_personal_puzzles" USING btree ("user_id","due_at");
