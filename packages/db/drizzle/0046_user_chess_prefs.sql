-- Board preferences (theme, coordinates, sound) synced across devices. Null = never saved.
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "chess_prefs" jsonb;
