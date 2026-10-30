-- Per-user exemption from ADMIN_MFA_ENFORCE
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "mfa_exempt" boolean DEFAULT false NOT NULL;

