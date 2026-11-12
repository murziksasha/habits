# Grill: Admin God Mode on /admin/users
Date: 2026-10-30

## Intent
Allow any signed-in `admin` to hard-delete another account, set that account's password, and turn 2FA off so it stays off (exempt from `ADMIN_MFA_ENFORCE`). The signed-in admin's own row hides these controls, and the API refuses self-target mutations.

## Constraints & Decisions
- **Scope & Targets**:
  - The power belongs to every admin, for real users and test rows.
  - Other admins are valid targets. A second admin can lock you out.
  - Your own row hides delete, set-password, turn-2FA-off, and require-2FA. Profile and `/admin/security` stay the place for self-service password and authenticator management.
  - The API returns `400 { error: "self_target" }` if an admin attempts any of these mutations on their own account. Unknown target returns `404 { error: "not_found" }`.
- **Set Password**:
  - `POST /admin/users/:id/password` requires `{ password }`.
  - Validated by `passwordSchema` (8–128 characters, at least one letter and one digit), returning `400 { error: "invalid_input" }` on validation failure.
  - An OAuth-only user (null `passwordHash`) can be assigned a password; their OAuth link remains.
  - Typed directly by admin in UI, never emailed, and never written to audit logs.
  - Password change destroys all existing sessions of the target user immediately.
  - Audit log entry: `user_set_password` with no secret.
- **Turn 2FA Off**:
  - `POST /admin/users/:id/reset-mfa` clears `totpSecret`, `totpVerifiedAt`, and backup code hashes (`userMfaBackupCodes`).
  - If target user is an admin, set `users.mfaExempt = true`.
  - Destroys all existing sessions of the target user immediately.
  - Audit log entry: `user_mfa_off`.
- **Require 2FA**:
  - `POST /admin/users/:id/require-mfa` is available only for another admin who currently has `mfaExempt = true`.
  - If target is not an admin, API returns `400 { error: "mfa_require_admin_only" }`.
  - Sets `mfaExempt = false`.
  - Destroys all existing sessions of the target user immediately so the enroll wall is back.
  - Audit log entry: `user_mfa_require`.
  - Learners cannot have 2FA required (learners are never forced to enroll).
- **MFA Enrollment Exemption**:
  - `mfaEnrollRequired` becomes: user is admin, AND `adminMfaEnforce()` is true, AND TOTP is off, AND `mfaExempt` is false.
  - Login and `GET /auth/me` both evaluate this condition.
  - Enrolling a new authenticator via `POST /auth/mfa/totp/confirm` sets `mfaExempt = false`.
  - Self-service `POST /auth/mfa/totp/disable` continues to refuse for admins when enforcement is on.
- **Delete Account**:
  - `DELETE /admin/users/:id` requires `{ confirmEmail }`.
  - Admin types the target row's email to confirm (trimmed, case-insensitive). Mismatch returns `400 { error: "confirm_mismatch" }`.
  - Delete cascades school ownership (`organizations.ownerUserId`).
  - Before row deletion, foreign keys without cascade are detached: `classes.teacherUserId` is set to null, and tournament pairing seats (`tournamentPairings.whiteId` / `blackId`) are set to null.
  - Transaction deletes the user row and writes audit entry `user_delete` with actor = surviving admin and metadata `{ email: targetUser.email }`.
- **Step-Up Authentication**:
  - All four routes (`/admin/users/:id/password`, `/admin/users/:id/reset-mfa`, `/admin/users/:id/require-mfa`, `DELETE /admin/users/:id`) require admin step-up (`requireStepUp`).
  - With admin 2FA off, step-up issues token without prompt. With 2FA on, existing step-up modal confirms once.
- **UI & I18n**:
  - Users table on `/admin/users` gains an Actions column (hidden for signed-in admin's own row).
  - `GET /admin/users` returns `totpEnabled` and `mfaExempt`.
  - UI copy in Ukrainian (`uk`) and English (`en`) via `@eduforge/shared` `getUI`.

## Out of Scope
- A separate owner role or granular ACLs.
- Soft delete or restore functionality.
- Emailing users on admin interventions.
- Forcing learners onto 2FA.
- Changing the role dropdown or pagination UI.
- Skipping admin step-up verification.

