-- Course-agnostic placement: skip/mark-as-known early units (0 XP). Widens course_slug.
ALTER TABLE "placement_results" ALTER COLUMN "course_slug" SET DATA TYPE varchar(64);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_unit_placements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"unit_id" uuid NOT NULL,
	"decision" varchar(16) NOT NULL,
	"placement_result_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_unit_placements" ADD CONSTRAINT "user_unit_placements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_unit_placements" ADD CONSTRAINT "user_unit_placements_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_unit_placements" ADD CONSTRAINT "user_unit_placements_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_unit_placements" ADD CONSTRAINT "user_unit_placements_placement_result_id_placement_results_id_fk" FOREIGN KEY ("placement_result_id") REFERENCES "public"."placement_results"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uup_user_unit" ON "user_unit_placements" USING btree ("user_id","unit_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "uup_user_course_idx" ON "user_unit_placements" USING btree ("user_id","course_id");
