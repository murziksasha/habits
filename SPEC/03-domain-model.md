# 03 — Domain Model

## Entities

### User
- `id`, `email`, `passwordHash`, `role` (`user` | `admin`), `plan` (`free` | `premium`)  
- Admin MFA: `totpSecretEnc`, `totpEnabled`, `totpVerifiedAt` (SPEC 72)  
- Sessions: `mfaVerifiedAt` for admin TOTP gate  
- `platform_settings` key/value JSON (theme draft/published)  
- Courses: free-form `slug` varchar, `status` draft|published|archived, `category`, `contentSource`  
- Stripe fields optional: `stripeCustomerId`, `stripeSubscriptionId`, `planExpiresAt`  

### Character (1:1 with User)
- `displayName`, `avatarKey`  
- `globalXp`, `globalLevel`, `streakDays`, `lastActiveDate`  
- `onboarding` JSON: flags for checklist steps / dismiss  

### Course hierarchy
```
Course (slug)
  └── Unit
        └── Lesson
              └── exercises (jsonb array)
```

Course slugs: `english` | `chess` | `typing` | `speed_reading` | `logic`.

### Progress
- **UserCourseProgress** — per course: `xp`, `level`, `hearts`, `completedLessons`, `lastLessonId`  
- **UserLessonProgress** — per lesson: `status`, `bestScore`, `attempts`, `completedAt`  
- **SkillAttempt** — audit of submissions with metrics  

### Chess
- **ChessRating** — Elo, W/L/D, rated games today  
- **ChessGame** — FEN, PGN, clocks, rated flag, result, Elo deltas  

### Auth support
- **Session** — token hash + expiry  
- **PasswordResetToken** — token hash + expiry + `usedAt`  

## Relationships (simplified)

```
User 1──1 Character
User 1──* UserCourseProgress *──1 Course
User 1──* UserLessonProgress *──1 Lesson
User 1──1 ChessRating
User 1──* ChessGame (as white or black)
Course 1──* Unit 1──* Lesson
```

## Lesson exercise payload

Polymorphic objects in `lessons.exercises` (see [05-courses-and-content](./05-courses-and-content.md)).  
Server grades via `apps/api/src/grade.ts`.

## Identifiers

- UUIDs for all primary keys (Postgres `gen_random_uuid()`).  
- Content `slug` unique within unit for stable seeding.  

## Migrations

Located under `packages/db/drizzle/`:

| Migration | Purpose |
|-----------|---------|
| `0000_init` | Core tables |
| `0001_onboarding_reset` | Character onboarding JSON + password reset tokens |
