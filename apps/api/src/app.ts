import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "./env.js";
import { adminRoutes } from "./routes/admin.js";
import { authRoutes } from "./routes/auth.js";
import { billingRoutes } from "./routes/billing.js";
import { bookmarkRoutes } from "./routes/bookmarks.js";
import { certificateRoutes } from "./routes/certificates.js";
import { challengeRoutes } from "./routes/challenges.js";
import { chatRoutes } from "./routes/chat.js";
import { chessRoutes } from "./routes/chess.js";
import { coachRoutes } from "./routes/coach.js";
import { courseRoutes } from "./routes/courses.js";
import { engagementRoutes } from "./routes/engagement.js";
import { friendsRoutes } from "./routes/friends.js";
import { gradebookRoutes } from "./routes/gradebook.js";
import { homeworkRoutes } from "./routes/homework.js";
import { leaderboardRoutes } from "./routes/leaderboard.js";
import { metricsRoutes } from "./routes/metrics.js";
import { openapiRoutes } from "./routes/openapi.js";
import { orgRoutes } from "./routes/orgs.js";
import { parentRoutes } from "./routes/parents.js";
import { referralRoutes } from "./routes/referrals.js";
import { reminderRoutes } from "./routes/reminders.js";
import { reviewRoutes } from "./routes/review.js";
import { searchRoutes } from "./routes/search.js";
import { shopRoutes } from "./routes/shop.js";
import { notesRoutes } from "./routes/notes.js";
import { focusRoutes } from "./routes/focus.js";
import { profileRoutes } from "./routes/profiles.js";
import { questRoutes } from "./routes/quests.js";
import { flashcardRoutes } from "./routes/flashcards.js";
import { tutorRoutes } from "./routes/tutor.js";
import { reportRoutes } from "./routes/reports.js";
import { learningRoutes } from "./routes/learning.js";
import { commentRoutes } from "./routes/comments.js";
import { pushRoutes } from "./routes/push.js";
import { analyticsRoutes } from "./routes/analytics.js";
import { speechRoutes } from "./routes/speech.js";
import { playgroundRoutes } from "./routes/playground.js";
import { tournamentRoutes } from "./routes/tournaments.js";

export function createApp() {
  const app = new Hono();

  app.use("*", logger());
  app.use(
    "*",
    cors({
      origin: env.webOrigin,
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    }),
  );

  app.get("/health", (c) =>
    c.json({
      ok: true,
      service: "api",
      locale: "uk",
      ts: new Date().toISOString(),
      uptimeSec: Math.floor(process.uptime()),
    }),
  );

  app.route("/", openapiRoutes);
  app.route("/auth", authRoutes);
  app.route("/courses", courseRoutes);
  app.route("/leaderboard", leaderboardRoutes);
  app.route("/billing", billingRoutes);
  app.route("/chess", chessRoutes);
  app.route("/coach", coachRoutes);
  app.route("/tournaments", tournamentRoutes);
  app.route("/orgs", orgRoutes);
  app.route("/engagement", engagementRoutes);
  app.route("/friends", friendsRoutes);
  app.route("/challenges", challengeRoutes);
  app.route("/certificates", certificateRoutes);
  app.route("/homework", homeworkRoutes);
  app.route("/gradebook", gradebookRoutes);
  app.route("/parents", parentRoutes);
  app.route("/reminders", reminderRoutes);
  app.route("/bookmarks", bookmarkRoutes);
  app.route("/search", searchRoutes);
  app.route("/chat", chatRoutes);
  app.route("/referrals", referralRoutes);
  app.route("/shop", shopRoutes);
  app.route("/review", reviewRoutes);
  app.route("/quests", questRoutes);
  app.route("/notes", notesRoutes);
  app.route("/focus", focusRoutes);
  app.route("/profiles", profileRoutes);
  app.route("/flashcards", flashcardRoutes);
  app.route("/tutor", tutorRoutes);
  app.route("/reports", reportRoutes);
  app.route("/learning", learningRoutes);
  app.route("/comments", commentRoutes);
  app.route("/push", pushRoutes);
  app.route("/analytics", analyticsRoutes);
  app.route("/speech", speechRoutes);
  app.route("/playground", playgroundRoutes);
  app.route("/metrics", metricsRoutes);
  app.route("/admin", adminRoutes);

  app.notFound((c) => c.json({ error: "not_found" }, 404));
  app.onError((err, c) => {
    console.error(err);
    return c.json({ error: "internal", message: err.message }, 500);
  });

  return app;
}
