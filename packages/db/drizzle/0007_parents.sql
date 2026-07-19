CREATE TYPE "public"."parent_link_status" AS ENUM('pending', 'active', 'revoked');

CREATE TABLE IF NOT EXISTS "parent_student_links" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "parent_user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "student_user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "status" "parent_link_status" DEFAULT 'pending' NOT NULL,
  "invite_code" varchar(16),
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "accepted_at" timestamp with time zone
);
CREATE UNIQUE INDEX IF NOT EXISTS "psl_parent_student" ON "parent_student_links" ("parent_user_id","student_user_id");
