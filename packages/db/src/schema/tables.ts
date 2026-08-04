import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const planEnum = pgEnum("plan", ["free", "premium", "family"]);
/**
 * Course slugs are app-registry validated (`COURSE_SLUGS` in @eduforge/shared).
 * Stored as varchar so new courses do not require ALTER TYPE migrations.
 */
export const coursePublishStatusEnum = pgEnum("course_publish_status", [
  "draft",
  "published",
  "archived",
]);
export const lessonStatusEnum = pgEnum("lesson_status", [
  "locked",
  "available",
  "completed",
]);
export const chessGameStatusEnum = pgEnum("chess_game_status", [
  "waiting",
  "active",
  "finished",
  "aborted",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  /** Null for OAuth-only accounts (no local password) */
  passwordHash: text("password_hash"),
  role: varchar("role", { length: 32 }).notNull().default("user"),
  plan: planEnum("plan").notNull().default("free"),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  planExpiresAt: timestamp("plan_expires_at", { withTimezone: true }),
  /** Preferred UI/content locale */
  preferredLocale: varchar("preferred_locale", { length: 8 }).notNull().default("uk"),
  weeklyEmailEnabled: boolean("weekly_email_enabled").notNull().default(true),
  lastWeeklyEmailAt: timestamp("last_weekly_email_at", { withTimezone: true }),
  /** When the email was verified (null = unverified) */
  emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
  /** Encrypted TOTP secret (AES-GCM); null until enroll */
  totpSecretEnc: text("totp_secret_enc"),
  totpEnabled: boolean("totp_enabled").notNull().default(false),
  totpVerifiedAt: timestamp("totp_verified_at", { withTimezone: true }),
  /** SHA-256 hashes of one-time backup codes (plaintext shown once at generation) */
  mfaBackupCodeHashes: jsonb("mfa_backup_code_hashes").$type<string[]>().notNull().default([]),
  /** Family plan: max child seats when plan=family (owner) */
  familyMaxSeats: integer("family_max_seats").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/** Linked OAuth identities (Google, …) */
export const oauthAccounts = pgTable(
  "oauth_accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: varchar("provider", { length: 32 }).notNull(),
    providerUserId: varchar("provider_user_id", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("oauth_provider_uid").on(t.provider, t.providerUserId)],
);

/** Family plan membership (owner has plan=family; children get premium entitlements) */
export const familyMembers = pgTable(
  "family_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerUserId: uuid("owner_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    memberUserId: uuid("member_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 16 }).notNull().default("child"),
    status: varchar("status", { length: 16 }).notNull().default("active"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("family_owner_member").on(t.ownerUserId, t.memberUserId),
    uniqueIndex("family_member_once").on(t.memberUserId),
  ],
);

/** Pending family seat invites (code claimed by child account) */
export const familyInvites = pgTable("family_invites", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerUserId: uuid("owner_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  inviteCode: varchar("invite_code", { length: 32 }).notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const characters = pgTable("characters", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  displayName: varchar("display_name", { length: 64 }).notNull(),
  avatarKey: varchar("avatar_key", { length: 64 }).notNull().default("default"),
  globalXp: integer("global_xp").notNull().default(0),
  globalLevel: integer("global_level").notNull().default(1),
  streakDays: integer("streak_days").notNull().default(0),
  lastActiveDate: varchar("last_active_date", { length: 10 }),
  /** XP earned on dailyXpDate toward daily goal */
  dailyXp: integer("daily_xp").notNull().default(0),
  dailyXpDate: varchar("daily_xp_date", { length: 10 }),
  dailyGoalXp: integer("daily_goal_xp").notNull().default(50),
  onboarding: jsonb("onboarding")
    .$type<{
      dismissed?: boolean;
      completedFirstLesson?: boolean;
      triedChess?: boolean;
      triedTyping?: boolean;
      viewedLeaderboard?: boolean;
      exploredPricing?: boolean;
      viewedLearnMap?: boolean;
      triedProgramming?: boolean;
    }>()
    .notNull()
    .default({}),
  /** Freezes that keep streak when a day is missed */
  streakFreezes: integer("streak_freezes").notNull().default(0),
  /** Avatar keys unlocked via shop (always includes default set) */
  unlockedAvatars: jsonb("unlocked_avatars")
    .$type<string[]>()
    .notNull()
    .default(["default", "wizard", "knight", "scholar", "fox", "robot"]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const emailVerificationTokens = pgTable("email_verification_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  /** Free-form slug (CMS can create new courses; app registry still lists built-ins) */
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  titleUk: varchar("title_uk", { length: 128 }).notNull(),
  titleEn: varchar("title_en", { length: 128 }).notNull().default(""),
  descriptionUk: text("description_uk").notNull(),
  descriptionEn: text("description_en").notNull().default(""),
  icon: varchar("icon", { length: 16 }).notNull(),
  color: varchar("color", { length: 16 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  status: coursePublishStatusEnum("status").notNull().default("published"),
  /** Catalog group: code | deep | skill | chess */
  category: varchar("category", { length: 32 }).notNull().default("skill"),
  isVisible: boolean("is_visible").notNull().default(true),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  /** seed | cms — seed may overwrite seed-owned courses */
  contentSource: varchar("content_source", { length: 16 }).notNull().default("seed"),
});

export const units = pgTable("units", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 64 }).notNull(),
  titleUk: varchar("title_uk", { length: 128 }).notNull(),
  titleEn: varchar("title_en", { length: 128 }).notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const lessons = pgTable("lessons", {
  id: uuid("id").defaultRandom().primaryKey(),
  unitId: uuid("unit_id")
    .notNull()
    .references(() => units.id, { onDelete: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  slug: varchar("slug", { length: 64 }).notNull(),
  titleUk: varchar("title_uk", { length: 128 }).notNull(),
  titleEn: varchar("title_en", { length: 128 }).notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  baseXp: integer("base_xp").notNull().default(15),
  difficulty: integer("difficulty").notNull().default(1),
  isFree: boolean("is_free").notNull().default(false),
  /** Unit control test / exam lesson */
  isExam: boolean("is_exam").notNull().default(false),
  /** Pass bar 0..1 when isExam; null → app default 0.7 */
  passThreshold: real("pass_threshold"),
  exercises: jsonb("exercises").notNull().$type<unknown[]>().default([]),
});

export const userCourseProgress = pgTable(
  "user_course_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    xp: integer("xp").notNull().default(0),
    level: integer("level").notNull().default(1),
    hearts: integer("hearts").notNull().default(5),
    heartsUpdatedAt: timestamp("hearts_updated_at", { withTimezone: true }).defaultNow(),
    completedLessons: integer("completed_lessons").notNull().default(0),
    lastLessonId: uuid("last_lesson_id"),
  },
  (t) => [uniqueIndex("ucp_user_course").on(t.userId, t.courseId)],
);

export const userLessonProgress = pgTable(
  "user_lesson_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    status: lessonStatusEnum("status").notNull().default("available"),
    bestScore: real("best_score").notNull().default(0),
    attempts: integer("attempts").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (t) => [
    uniqueIndex("ulp_user_lesson").on(t.userId, t.lessonId),
    index("ulp_user_course_status_idx").on(t.userId, t.courseId, t.status),
    index("ulp_course_completed_at_idx").on(t.courseId, t.completedAt),
  ],
);

export const skillAttempts = pgTable("skill_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseSlug: varchar("course_slug", { length: 64 }).notNull(),
  metrics: jsonb("metrics").notNull().$type<Record<string, unknown>>(),
  xpGained: integer("xp_gained").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const chessRatings = pgTable("chess_ratings", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  elo: integer("elo").notNull().default(1000),
  gamesPlayed: integer("games_played").notNull().default(0),
  wins: integer("wins").notNull().default(0),
  losses: integer("losses").notNull().default(0),
  draws: integer("draws").notNull().default(0),
  ratedGamesToday: integer("rated_games_today").notNull().default(0),
  ratedGamesDate: varchar("rated_games_date", { length: 10 }),
});

export const chessGames = pgTable("chess_games", {
  id: uuid("id").defaultRandom().primaryKey(),
  whiteId: uuid("white_id").references(() => users.id),
  blackId: uuid("black_id").references(() => users.id),
  fen: text("fen").notNull(),
  pgn: text("pgn").notNull().default(""),
  status: chessGameStatusEnum("status").notNull().default("waiting"),
  timeControl: varchar("time_control", { length: 16 }).notNull(),
  rated: boolean("rated").notNull().default(true),
  result: varchar("result", { length: 16 }),
  whiteTimeMs: integer("white_time_ms").notNull(),
  blackTimeMs: integer("black_time_ms").notNull(),
  lastMoveAt: timestamp("last_move_at", { withTimezone: true }),
  whiteEloBefore: integer("white_elo_before"),
  blackEloBefore: integer("black_elo_before"),
  whiteEloDelta: integer("white_elo_delta"),
  blackEloDelta: integer("black_elo_delta"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  /** Set after successful admin TOTP (or when MFA not required) */
  mfaVerifiedAt: timestamp("mfa_verified_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/** Short-lived challenge after password login when admin has TOTP enabled */
export const mfaPending = pgTable("mfa_pending", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/** Step-up re-auth tokens for dangerous admin actions */
export const adminStepUpTokens = pgTable("admin_step_up_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/** Platform-wide settings (theme draft/published, etc.) */
export const platformSettings = pgTable("platform_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: varchar("key", { length: 64 }).notNull().unique(),
  value: jsonb("value").$type<Record<string, unknown>>().notNull().default({}),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  updatedByUserId: uuid("updated_by_user_id").references(() => users.id, {
    onDelete: "set null",
  }),
});

/* ——— Tournaments ——— */
export const tournamentStatusEnum = pgEnum("tournament_status", [
  "draft",
  "registration",
  "active",
  "finished",
  "cancelled",
]);

export const tournaments = pgTable("tournaments", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  titleUk: varchar("title_uk", { length: 128 }).notNull(),
  titleEn: varchar("title_en", { length: 128 }).notNull().default(""),
  descriptionUk: text("description_uk").notNull().default(""),
  hostUserId: uuid("host_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: tournamentStatusEnum("status").notNull().default("registration"),
  timeControl: varchar("time_control", { length: 16 }).notNull().default("5+0"),
  maxPlayers: integer("max_players").notNull().default(16),
  currentRound: integer("current_round").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }),
});

export const tournamentPlayers = pgTable(
  "tournament_players",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tournamentId: uuid("tournament_id")
      .notNull()
      .references(() => tournaments.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    score: real("score").notNull().default(0),
    seed: integer("seed").notNull().default(0),
    joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("tp_tournament_user").on(t.tournamentId, t.userId)],
);

export const tournamentPairings = pgTable("tournament_pairings", {
  id: uuid("id").defaultRandom().primaryKey(),
  tournamentId: uuid("tournament_id")
    .notNull()
    .references(() => tournaments.id, { onDelete: "cascade" }),
  round: integer("round").notNull(),
  whiteId: uuid("white_id").references(() => users.id),
  blackId: uuid("black_id").references(() => users.id),
  gameId: uuid("game_id").references(() => chessGames.id),
  result: varchar("result", { length: 16 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ——— B2B / Schools ——— */
export const orgRoleEnum = pgEnum("org_role", ["owner", "teacher", "student"]);

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  ownerUserId: uuid("owner_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const organizationMembers = pgTable(
  "organization_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: orgRoleEnum("role").notNull().default("student"),
    joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("om_org_user").on(t.organizationId, t.userId)],
);

export const classes = pgTable("classes", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 128 }).notNull(),
  inviteCode: varchar("invite_code", { length: 16 }).notNull().unique(),
  teacherUserId: uuid("teacher_user_id").references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const classMembers = pgTable(
  "class_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    classId: uuid("class_id")
      .notNull()
      .references(() => classes.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("cm_class_user").on(t.classId, t.userId)],
);

/* ——— Engagement: achievements, notifications, activity ——— */
export const achievements = pgTable("achievements", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: varchar("code", { length: 64 }).notNull().unique(),
  titleUk: varchar("title_uk", { length: 128 }).notNull(),
  titleEn: varchar("title_en", { length: 128 }).notNull(),
  descriptionUk: text("description_uk").notNull().default(""),
  descriptionEn: text("description_en").notNull().default(""),
  icon: varchar("icon", { length: 16 }).notNull().default("🏅"),
  xpReward: integer("xp_reward").notNull().default(0),
});

export const userAchievements = pgTable(
  "user_achievements",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    achievementId: uuid("achievement_id")
      .notNull()
      .references(() => achievements.id, { onDelete: "cascade" }),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("ua_user_ach").on(t.userId, t.achievementId)],
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 32 }).notNull().default("info"),
    titleUk: varchar("title_uk", { length: 200 }).notNull(),
    titleEn: varchar("title_en", { length: 200 }).notNull().default(""),
    bodyUk: text("body_uk").notNull().default(""),
    bodyEn: text("body_en").notNull().default(""),
    href: varchar("href", { length: 255 }),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("notifications_user_created_idx").on(t.userId, t.createdAt),
    index("notifications_user_unread_idx").on(t.userId, t.readAt),
  ],
);

export const activityEvents = pgTable(
  "activity_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    kind: varchar("kind", { length: 48 }).notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("activity_events_user_created_idx").on(t.userId, t.createdAt)],
);

/* ——— Social: friends ——— */
export const friendshipStatusEnum = pgEnum("friendship_status", [
  "pending",
  "accepted",
  "blocked",
]);

export const friendships = pgTable(
  "friendships",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    requesterId: uuid("requester_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    addresseeId: uuid("addressee_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: friendshipStatusEnum("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("friendship_pair").on(t.requesterId, t.addresseeId)],
);

/* ——— Weekly challenges ——— */
export const weeklyChallenges = pgTable("weekly_challenges", {
  id: uuid("id").defaultRandom().primaryKey(),
  weekKey: varchar("week_key", { length: 16 }).notNull().unique(), // e.g. 2026-W29
  titleUk: varchar("title_uk", { length: 200 }).notNull(),
  titleEn: varchar("title_en", { length: 200 }).notNull(),
  descriptionUk: text("description_uk").notNull().default(""),
  descriptionEn: text("description_en").notNull().default(""),
  targetXp: integer("target_xp").notNull().default(200),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
});

export const weeklyChallengeProgress = pgTable(
  "weekly_challenge_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    challengeId: uuid("challenge_id")
      .notNull()
      .references(() => weeklyChallenges.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    xp: integer("xp").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (t) => [uniqueIndex("wcp_challenge_user").on(t.challengeId, t.userId)],
);

/* ——— Course certificates ——— */
export const certificates = pgTable(
  "certificates",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: uuid("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    code: varchar("code", { length: 32 }).notNull().unique(),
    titleUk: varchar("title_uk", { length: 200 }).notNull(),
    titleEn: varchar("title_en", { length: 200 }).notNull(),
    issuedAt: timestamp("issued_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("cert_user_course").on(t.userId, t.courseId)],
);

/* ——— Classroom homework / assignments ——— */
export const assignmentStatusEnum = pgEnum("assignment_status", [
  "assigned",
  "completed",
  "overdue",
]);

export const classAssignments = pgTable("class_assignments", {
  id: uuid("id").defaultRandom().primaryKey(),
  classId: uuid("class_id")
    .notNull()
    .references(() => classes.id, { onDelete: "cascade" }),
  createdByUserId: uuid("created_by_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  titleUk: varchar("title_uk", { length: 200 }).notNull(),
  titleEn: varchar("title_en", { length: 200 }).notNull().default(""),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  lessonId: uuid("lesson_id")
    .notNull()
    .references(() => lessons.id, { onDelete: "cascade" }),
  dueAt: timestamp("due_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const assignmentSubmissions = pgTable(
  "assignment_submissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    assignmentId: uuid("assignment_id")
      .notNull()
      .references(() => classAssignments.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: assignmentStatusEnum("status").notNull().default("assigned"),
    score: real("score"),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("asub_assignment_user").on(t.assignmentId, t.userId)],
);

/* ——— Parent portal ——— */
export const parentLinkStatusEnum = pgEnum("parent_link_status", [
  "pending",
  "active",
  "revoked",
]);

export const parentStudentLinks = pgTable(
  "parent_student_links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    parentUserId: uuid("parent_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    studentUserId: uuid("student_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: parentLinkStatusEnum("status").notNull().default("pending"),
    inviteCode: varchar("invite_code", { length: 16 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }),
  },
  (t) => [uniqueIndex("psl_parent_student").on(t.parentUserId, t.studentUserId)],
);

/* ——— Bookmarks, class chat, referrals ——— */
export const lessonBookmarks = pgTable(
  "lesson_bookmarks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    note: text("note").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("lb_user_lesson").on(t.userId, t.lessonId)],
);

export const classMessages = pgTable("class_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  classId: uuid("class_id")
    .notNull()
    .references(() => classes.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const referralCodes = pgTable("referral_codes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  code: varchar("code", { length: 16 }).notNull().unique(),
  uses: integer("uses").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const referralRedemptions = pgTable(
  "referral_redemptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    codeId: uuid("code_id")
      .notNull()
      .references(() => referralCodes.id, { onDelete: "cascade" }),
    referredUserId: uuid("referred_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
);

/* ——— Shop, review helpers, daily quests, notes, focus ——— */
export const shopPurchases = pgTable("shop_purchases", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  itemId: varchar("item_id", { length: 64 }).notNull(),
  costXp: integer("cost_xp").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const userDailyQuests = pgTable(
  "user_daily_quests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    questDate: varchar("quest_date", { length: 10 }).notNull(),
    questKey: varchar("quest_key", { length: 64 }).notNull(),
    progress: integer("progress").notNull().default(0),
    target: integer("target").notNull(),
    rewardXp: integer("reward_xp").notNull().default(0),
    completed: boolean("completed").notNull().default(false),
    claimed: boolean("claimed").notNull().default(false),
  },
  (t) => [uniqueIndex("udq_user_date_key").on(t.userId, t.questDate, t.questKey)],
);

export const studyNotes = pgTable(
  "study_notes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    body: text("body").notNull().default(""),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("sn_user_lesson").on(t.userId, t.lessonId)],
);

export const studySessions = pgTable("study_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseSlug: varchar("course_slug", { length: 32 }),
  durationSec: integer("duration_sec").notNull().default(0),
  note: varchar("note", { length: 255 }).notNull().default(""),
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
});

/* ——— Flashcards / SRS ——— */
export const flashcardDecks = pgTable("flashcard_decks", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  titleUk: varchar("title_uk", { length: 128 }).notNull(),
  titleEn: varchar("title_en", { length: 128 }).notNull().default(""),
  descriptionUk: text("description_uk").notNull().default(""),
  descriptionEn: text("description_en").notNull().default(""),
  courseSlug: varchar("course_slug", { length: 32 }),
  /** null = system deck */
  ownerUserId: uuid("owner_user_id").references(() => users.id, { onDelete: "cascade" }),
  isSystem: boolean("is_system").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const flashcards = pgTable("flashcards", {
  id: uuid("id").defaultRandom().primaryKey(),
  deckId: uuid("deck_id")
    .notNull()
    .references(() => flashcardDecks.id, { onDelete: "cascade" }),
  front: text("front").notNull(),
  back: text("back").notNull(),
  hint: text("hint").notNull().default(""),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const flashcardStates = pgTable(
  "flashcard_states",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    cardId: uuid("card_id")
      .notNull()
      .references(() => flashcards.id, { onDelete: "cascade" }),
    /** SM-2 ease factor * 100 (default 250 = 2.5) */
    ease: integer("ease").notNull().default(250),
    intervalDays: integer("interval_days").notNull().default(0),
    repetitions: integer("repetitions").notNull().default(0),
    lapses: integer("lapses").notNull().default(0),
    nextReviewAt: timestamp("next_review_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
    lastRating: integer("last_rating"),
  },
  (t) => [uniqueIndex("fcs_user_card").on(t.userId, t.cardId)],
);

export const flashcardReviews = pgTable("flashcard_reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  cardId: uuid("card_id")
    .notNull()
    .references(() => flashcards.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ——— AI tutor chat log ——— */
export const tutorMessages = pgTable("tutor_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 16 }).notNull(),
  content: text("content").notNull(),
  courseSlug: varchar("course_slug", { length: 32 }),
  model: varchar("model", { length: 64 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ——— Learning OS: placement, comments, milestones ——— */
export const placementResults = pgTable("placement_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseSlug: varchar("course_slug", { length: 32 }).notNull(),
  score: real("score").notNull().default(0),
  levelLabel: varchar("level_label", { length: 32 }).notNull().default("A1"),
  answers: jsonb("answers").$type<Record<string, unknown>>().notNull().default({}),
  recommendedUnitSlug: varchar("recommended_unit_slug", { length: 64 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lessonComments = pgTable("lesson_comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  lessonId: uuid("lesson_id")
    .notNull()
    .references(() => lessons.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  parentId: uuid("parent_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const learningMilestones = pgTable(
  "learning_milestones",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    code: varchar("code", { length: 64 }).notNull(),
    titleUk: varchar("title_uk", { length: 200 }).notNull(),
    titleEn: varchar("title_en", { length: 200 }).notNull().default(""),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("lm_user_code").on(t.userId, t.code)],
);

/* ——— Class playground team challenges ——— */
export const classPlaygroundChallenges = pgTable(
  "class_playground_challenges",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    classId: uuid("class_id")
      .notNull()
      .references(() => classes.id, { onDelete: "cascade" }),
    challengeId: varchar("challenge_id", { length: 64 }).notNull(),
    titleUk: varchar("title_uk", { length: 200 }).notNull().default(""),
    titleEn: varchar("title_en", { length: 200 }).notNull().default(""),
    createdByUserId: uuid("created_by_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    dueAt: timestamp("due_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("cpc_class_challenge").on(t.classId, t.challengeId)],
);

/* ——— Web Push subscriptions ——— */
export const pushSubscriptions = pgTable(
  "push_subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    endpoint: text("endpoint").notNull(),
    p256dh: text("p256dh").notNull(),
    auth: text("auth").notNull(),
    userAgent: varchar("user_agent", { length: 255 }).notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("push_endpoint").on(t.endpoint)],
);

/* ——— Admin audit log ——— */
export const adminAuditLog = pgTable("admin_audit_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorUserId: uuid("actor_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  action: varchar("action", { length: 64 }).notNull(),
  targetType: varchar("target_type", { length: 64 }).notNull().default(""),
  targetId: varchar("target_id", { length: 128 }).notNull().default(""),
  meta: jsonb("meta").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ——— User → developer feedback ——— */
export const feedbackMessages = pgTable("feedback_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  category: varchar("category", { length: 32 }).notNull().default("other"),
  message: text("message").notNull(),
  pagePath: varchar("page_path", { length: 512 }).notNull().default(""),
  status: varchar("status", { length: 32 }).notNull().default("new"),
  adminNote: text("admin_note"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
