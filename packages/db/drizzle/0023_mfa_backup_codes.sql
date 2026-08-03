-- One-time MFA backup codes (hashed)
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "mfa_backup_code_hashes" jsonb DEFAULT '[]'::jsonb NOT NULL;
