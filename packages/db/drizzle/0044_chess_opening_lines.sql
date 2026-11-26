CREATE TABLE IF NOT EXISTS "chess_opening_lines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"repertoire_id" varchar(48) NOT NULL,
	"line_key" varchar(96) NOT NULL,
	"repetitions" integer DEFAULT 0 NOT NULL,
	"interval_days" integer DEFAULT 0 NOT NULL,
	"lapses" integer DEFAULT 0 NOT NULL,
	"due_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chess_opening_lines" ADD CONSTRAINT "chess_opening_lines_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "chess_opening_lines_user_line_uq" ON "chess_opening_lines" USING btree ("user_id","line_key");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "chess_opening_lines_user_due_idx" ON "chess_opening_lines" USING btree ("user_id","due_at");
