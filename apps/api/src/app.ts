import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "./env.js";
import { log, latencyStats, newRequestId, recordLatency } from "./logger.js";
import { checkReady } from "./ready.js";
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
import { characterRoutes } from "./routes/character.js";
import { giftRoutes } from "./routes/gifts.js";
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
import { feedbackRoutes } from "./routes/feedback.js";
import { publicBrandingRoutes } from "./routes/public-branding.js";
import { meRoutes } from "./routes/me.js";
import { judgeRoutes } from "./routes/judge.js";
import { oauthRoutes } from "./routes/oauth.js";
import { familyRoutes } from "./routes/family.js";
import { csrfOriginMiddleware } from "./csrf.js";
import { withSpan } from "./otel.js";
import { clientIp, rateLimit } from "./rate-limit.js";
import { isUniqueViolation } from "./http-errors.js";

export function createApp() {
  const app = new Hono();

  // Request id + structured access log + latency samples + OTel span
  app.use("*", async (c, next) => {
    const requestId =
      c.req.header("x-request-id")?.trim() ||
      c.req.header("x-correlation-id")?.trim() ||
      newRequestId();
    c.set("requestId" as never, requestId as never);
    c.header("x-request-id", requestId);
    const start = Date.now();
    await withSpan(
      "http.request",
      { method: c.req.method, path: c.req.path, requestId },
      async () => {
        await next();
      },
    );
    const ms = Date.now() - start;
    recordLatency(ms, c.req.path);
    log.info("request", {
      requestId,
      method: c.req.method,
      path: c.req.path,
      status: c.res.status,
      ms,
    });
  });

  app.use(
    "*",
    cors({
      origin: env.webOrigin,
      credentials: true,
      allowHeaders: [
        "Content-Type",
        "Authorization",
        "X-Request-Id",
        "Idempotency-Key",
        "X-Admin-StepUp",
      ],
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      exposeHeaders: ["X-Request-Id"],
    }),
  );

  // Strict Origin check for cookie-authenticated mutations
  // (FEATURE_STRICT_CSRF or production default — see resolveFeatureFlags)
  app.use("*", csrfOriginMiddleware);

  // Global mutation rate limit (Redis when available; per-IP)
  app.use("*", async (c, next) => {
    if (!["POST", "PUT", "PATCH", "DELETE"].includes(c.req.method)) {
      await next();
      return;
    }
    const ip = clientIp(c.req.raw.headers);
    const rl = await rateLimit({ key: `mut:${ip}`, limit: 120, windowMs: 60_000 });
    if (!rl.ok) {
      c.header("Retry-After", String(rl.retryAfterSec));
      return c.json({ error: "rate_limited", retryAfter: rl.retryAfterSec }, 429);
    }
    await next();
  });

  // Baseline security headers on all API responses
  app.use("*", async (c, next) => {
    c.header("X-Content-Type-Options", "nosniff");
    c.header("X-Frame-Options", "DENY");
    c.header("Referrer-Policy", "strict-origin-when-cross-origin");
    c.header("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    if (process.env.NODE_ENV === "production") {
      c.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }
    await next();
  });

  app.get("/health", (c) =>
    c.json({
      ok: true,
      service: "api",
      locale: "uk",
      ts: new Date().toISOString(),
      uptimeSec: Math.floor(process.uptime()),
    }),
  );

  app.get("/ready", async (c) => {
    const status = await checkReady();
    return c.json(status, status.ok ? 200 : 503);
  });

  // Test-only path to exercise onError sanitization (vitest or non-production)
  if (process.env.NODE_ENV !== "production" || process.env.VITEST) {
    app.get("/__test/throw", () => {
      throw new Error("secret_internal_detail");
    });
  }

  app.route("/", openapiRoutes);
  app.route("/public", publicBrandingRoutes);
  app.route("/auth", authRoutes);
  app.route("/auth/oauth", oauthRoutes);
  app.route("/family", familyRoutes);
  app.route("/courses", courseRoutes);
  app.route("/leaderboard", leaderboardRoutes);
  app.route("/billing", billingRoutes);
  app.route("/chess", chessRoutes);
  app.route("/coach", coachRoutes);
  app.route("/tournaments", tournamentRoutes);
  app.route("/orgs", orgRoutes);
  app.route("/engagement", engagementRoutes);
  app.route("/friends", friendsRoutes);
  app.route("/feedback", feedbackRoutes);
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
  app.route("/character", characterRoutes);
  app.route("/gifts", giftRoutes);
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
  app.route("/me", meRoutes);
  app.route("/judge", judgeRoutes);

  app.notFound((c) => c.json({ error: "not_found" }, 404));
  app.onError((err, c) => {
    const requestId = (c.get("requestId" as never) as string | undefined) ?? undefined;
    log.error("unhandled", {
      requestId,
      err: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    });
    if (isUniqueViolation(err)) {
      return c.json({ error: "conflict", requestId }, 409);
    }
    const isProd = process.env.NODE_ENV === "production";
    return c.json(
      {
        error: "internal",
        requestId,
        ...(isProd ? {} : { message: err instanceof Error ? err.message : "error" }),
      },
      500,
    );
  });

  return app;
}

export { latencyStats };
