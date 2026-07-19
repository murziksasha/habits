ALTER TYPE "public"."course_slug" ADD VALUE IF NOT EXISTS 'typescript';
--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN IF NOT EXISTS "is_exam" boolean DEFAULT false NOT NULL;
--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN IF NOT EXISTS "pass_threshold" real;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"category" varchar(32) DEFAULT 'other' NOT NULL,
	"message" text NOT NULL,
	"page_path" varchar(512) DEFAULT '' NOT NULL,
	"status" varchar(32) DEFAULT 'new' NOT NULL,
	"admin_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feedback_messages" ADD CONSTRAINT "feedback_messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "feedback_user_idx" ON "feedback_messages" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "feedback_status_idx" ON "feedback_messages" USING btree ("status");
