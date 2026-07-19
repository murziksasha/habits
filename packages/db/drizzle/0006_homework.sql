CREATE TYPE "public"."assignment_status" AS ENUM('assigned', 'completed', 'overdue');

CREATE TABLE IF NOT EXISTS "class_assignments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "class_id" uuid NOT NULL REFERENCES "classes"("id") ON DELETE cascade,
  "created_by_user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "title_uk" varchar(200) NOT NULL,
  "title_en" varchar(200) DEFAULT '' NOT NULL,
  "course_id" uuid NOT NULL REFERENCES "courses"("id") ON DELETE cascade,
  "lesson_id" uuid NOT NULL REFERENCES "lessons"("id") ON DELETE cascade,
  "due_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "assignment_submissions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "assignment_id" uuid NOT NULL REFERENCES "class_assignments"("id") ON DELETE cascade,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "status" "assignment_status" DEFAULT 'assigned' NOT NULL,
  "score" real,
  "completed_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "asub_assignment_user" ON "assignment_submissions" ("assignment_id","user_id");
