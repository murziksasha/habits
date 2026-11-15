# Grill: password reset Gmail delivery
Date: 2026-10-27

## Intent
Deliver a real EduForge password-reset email to `testovichmarket@gmail.com`, open it (inbox or spam), set a new password, and log in. The generic line on `/forgot-password` is not that message. A console log or `emailSent: true` is not proof.

## Constraints
- Sender is Gmail SMTP as `testovichmarket@gmail.com`, sending to itself. From becomes that Gmail address (`SMTP_FROM=EduForge <testovichmarket@gmail.com>`). `noreply@eduforge.local` cannot land in an inbox.
- Google app password (2-Step Verification required) is created by the user and typed `SMTP_PASS` directly and only into local `.env`. The secret does not go in chat, git, or this file.
- If the `users` table has no row for `testovichmarket@gmail.com`, stop. The user registers it themselves, then we continue. The generic success message stays.
- One local SMTP configuration covers every existing `sendMail` path (reset, signup verification, parent mail, weekly report when those routes are called). No reset-only branch. No digest or push cron. No production env. No new mail provider.
- Proof is the user finishing the reset flow from the Gmail message and logging in.

## Decisions
- Sender is Gmail SMTP as `testovichmarket@gmail.com`, sending to itself. From becomes that Gmail address.
- Local `.env` SMTP keys:
  - `SMTP_HOST=smtp.gmail.com`
  - `SMTP_PORT=587`
  - `SMTP_SECURE=false`
  - `SMTP_USER=testovichmarket@gmail.com`
  - `SMTP_FROM=EduForge <testovichmarket@gmail.com>`
  - `SMTP_PASS=` (left empty for the user to paste their Google app password)
- If the users table has no row for that email, stop before modifying SMTP.
- If the row exists, `NODE_ENV` is not production, and the page still hides the dev link, trace the API client without removing the dev link.

## Out of scope
- Changing the generic "account may not exist" response on `/forgot-password`.
- OAuth Gmail API, Resend, or any sender other than this Gmail.
- Production environment, Docker host changes, or running outbound crons.
- Declaring success before the user confirms the Gmail reset worked.

