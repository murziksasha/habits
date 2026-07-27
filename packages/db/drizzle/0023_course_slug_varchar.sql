-- App-level course registry: store slugs as varchar (no ALTER TYPE for each new course)
ALTER TABLE "courses" ALTER COLUMN "slug" TYPE varchar(64) USING "slug"::text;
--> statement-breakpoint
ALTER TABLE "skill_attempts" ALTER COLUMN "course_slug" TYPE varchar(64) USING "course_slug"::text;
--> statement-breakpoint
DROP TYPE IF EXISTS "public"."course_slug";
