ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "preferred_locale" varchar(8) DEFAULT 'uk' NOT NULL;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "weekly_email_enabled" boolean DEFAULT true NOT NULL;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "last_weekly_email_at" timestamp with time zone;

ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "title_en" varchar(128) DEFAULT '' NOT NULL;
ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "description_en" text DEFAULT '' NOT NULL;
ALTER TABLE "units" ADD COLUMN IF NOT EXISTS "title_en" varchar(128) DEFAULT '' NOT NULL;
ALTER TABLE "lessons" ADD COLUMN IF NOT EXISTS "title_en" varchar(128) DEFAULT '' NOT NULL;

CREATE TABLE IF NOT EXISTS "flashcard_decks" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" varchar(64) NOT NULL UNIQUE,
  "title_uk" varchar(128) NOT NULL,
  "title_en" varchar(128) DEFAULT '' NOT NULL,
  "description_uk" text DEFAULT '' NOT NULL,
  "description_en" text DEFAULT '' NOT NULL,
  "course_slug" varchar(32),
  "owner_user_id" uuid REFERENCES "users"("id") ON DELETE cascade,
  "is_system" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "flashcards" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "deck_id" uuid NOT NULL REFERENCES "flashcard_decks"("id") ON DELETE cascade,
  "front" text NOT NULL,
  "back" text NOT NULL,
  "hint" text DEFAULT '' NOT NULL,
  "tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "flashcard_states" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "card_id" uuid NOT NULL REFERENCES "flashcards"("id") ON DELETE cascade,
  "ease" integer DEFAULT 250 NOT NULL,
  "interval_days" integer DEFAULT 0 NOT NULL,
  "repetitions" integer DEFAULT 0 NOT NULL,
  "lapses" integer DEFAULT 0 NOT NULL,
  "next_review_at" timestamp with time zone DEFAULT now() NOT NULL,
  "last_reviewed_at" timestamp with time zone,
  "last_rating" integer
);
CREATE UNIQUE INDEX IF NOT EXISTS "fcs_user_card" ON "flashcard_states" ("user_id","card_id");

CREATE TABLE IF NOT EXISTS "flashcard_reviews" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "card_id" uuid NOT NULL REFERENCES "flashcards"("id") ON DELETE cascade,
  "rating" integer NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "tutor_messages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "role" varchar(16) NOT NULL,
  "content" text NOT NULL,
  "course_slug" varchar(32),
  "model" varchar(64),
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
