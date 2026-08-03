import { Hono } from "hono";

/** OpenAPI 3 document — expanded for production discoverability */
export const openapiRoutes = new Hono();

function path(
  summary: string,
  opts?: { auth?: boolean; method?: string; body?: boolean },
) {
  const op: Record<string, unknown> = {
    summary,
    responses: { "200": { description: "OK" } },
  };
  if (opts?.auth) op.security = [{ bearerAuth: [] }];
  if (opts?.body) {
    op.requestBody = {
      content: {
        "application/json": { schema: { type: "object" } },
      },
    };
  }
  return { [opts?.method ?? "get"]: op };
}

const doc = {
  openapi: "3.0.3",
  info: {
    title: "EduForge API",
    version: "2.4.0",
    description:
      "Educational SaaS: learn map, exams, deep tracks, admin platform v2 (TOTP MFA, theming, CMS draft/publish, backup codes), feedback, minis, playground, schools, parents, metrics, chess, SRS, tutor.",
  },
  servers: [{ url: "/", description: "Current host" }],
  tags: [
    { name: "auth" },
    { name: "courses" },
    { name: "engagement" },
    { name: "social" },
    { name: "schools" },
    { name: "learning" },
    { name: "flashcards" },
    { name: "tutor" },
    { name: "push" },
    { name: "analytics" },
    { name: "speech" },
    { name: "ops" },
    { name: "parents" },
    { name: "admin" },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["ops"],
        summary: "Health check",
        responses: { "200": { description: "OK" } },
      },
    },
    "/metrics": {
      get: {
        tags: ["ops"],
        summary: "Ops metrics",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Counts and uptime" } },
      },
    },
    "/auth/register": {
      post: {
        tags: ["auth"],
        summary: "Register",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password", "displayName"],
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                  displayName: { type: "string" },
                  referralCode: { type: "string" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "User + token" } },
      },
    },
    "/auth/login": {
      post: {
        tags: ["auth"],
        summary: "Login",
        responses: { "200": { description: "User + token" } },
      },
    },
    "/auth/me": {
      get: {
        tags: ["auth"],
        summary: "Current user",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "User + character" } },
      },
    },
    "/auth/mfa/status": {
      get: {
        tags: ["auth"],
        summary: "Admin MFA status",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "totpEnabled, backupCodesRemaining" } },
      },
    },
    "/auth/mfa/totp/setup": {
      post: {
        tags: ["auth"],
        summary: "Start TOTP enroll",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "secret + otpauthUrl" } },
      },
    },
    "/auth/mfa/totp/confirm": {
      post: {
        tags: ["auth"],
        summary: "Confirm TOTP enroll (returns backup codes once)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "application/json": {
              schema: { type: "object", properties: { code: { type: "string" } } },
            },
          },
        },
        responses: { "200": { description: "ok + backupCodes" } },
      },
    },
    "/auth/mfa/totp/verify": {
      post: {
        tags: ["auth"],
        summary: "Complete login with TOTP or backup code",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  mfaToken: { type: "string" },
                  code: { type: "string" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "session token" } },
      },
    },
    "/auth/mfa/step-up": {
      post: {
        tags: ["auth"],
        summary: "Issue short-lived admin step-up token",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "stepUpToken" } },
      },
    },
    "/auth/mfa/backup-codes/regenerate": {
      post: {
        tags: ["auth"],
        summary: "Regenerate backup codes (TOTP required)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "new backupCodes" } },
      },
    },
    "/auth/sessions": {
      get: {
        tags: ["auth"],
        summary: "List own sessions",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "sessions" } },
      },
    },
    "/auth/sessions/{id}": {
      delete: {
        tags: ["auth"],
        summary: "Revoke a session",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "ok" } },
      },
    },
    "/auth/sessions/revoke-others": {
      post: {
        tags: ["auth"],
        summary: "Revoke all other sessions",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "revoked count" } },
      },
    },
    "/public/branding": {
      get: {
        tags: ["ops"],
        summary: "Published theme + product branding",
        responses: { "200": { description: "theme" } },
      },
    },
    "/courses": path("List courses"),
    "/courses/{slug}": {
      get: {
        tags: ["courses"],
        summary: "Course detail + units",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Course tree" } },
      },
    },
    "/courses/{slug}/lessons/{lessonId}/submit": {
      post: {
        tags: ["courses"],
        summary: "Submit lesson answers",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Graded result + XP" } },
      },
    },
    "/coach/hint": {
      post: {
        tags: ["courses"],
        summary: "Chess coach hint",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Best move + eval" } },
      },
    },
    "/friends": {
      get: {
        tags: ["social"],
        summary: "List friends",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Friends + pending" } },
      },
    },
    "/friends/request": {
      post: {
        tags: ["social"],
        summary: "Send friend request",
        security: [{ bearerAuth: [] }],
        responses: { "201": { description: "Created" } },
      },
    },
    "/challenges/current": {
      get: {
        tags: ["engagement"],
        summary: "Current weekly challenge",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Challenge + progress" } },
      },
    },
    "/certificates/mine": {
      get: {
        tags: ["engagement"],
        summary: "My certificates",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Certificates" } },
      },
    },
    "/certificates/verify/{code}": {
      get: {
        tags: ["engagement"],
        summary: "Public certificate verify",
        responses: { "200": { description: "Certificate payload" } },
      },
    },
    "/tournaments": path("List tournaments"),
    "/orgs/mine": {
      get: {
        tags: ["schools"],
        summary: "My organizations",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Orgs" } },
      },
    },
    "/engagement/achievements": {
      get: {
        tags: ["engagement"],
        summary: "Achievements",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Catalog + unlocks" } },
      },
    },
    "/homework/mine": {
      get: {
        tags: ["schools"],
        summary: "My homework",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Student homework" } },
      },
    },
    "/homework": {
      post: {
        tags: ["schools"],
        summary: "Create assignment",
        security: [{ bearerAuth: [] }],
        responses: { "201": { description: "Created" } },
      },
    },
    "/homework/class/{classId}": {
      get: {
        tags: ["schools"],
        summary: "Class homework board",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Assignments" } },
      },
    },
    "/flashcards/decks": {
      get: {
        tags: ["flashcards"],
        summary: "List SRS decks",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Decks + due counts" } },
      },
    },
    "/flashcards/due": {
      get: {
        tags: ["flashcards"],
        summary: "Due cards",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Card queue" } },
      },
    },
    "/flashcards/review": {
      post: {
        tags: ["flashcards"],
        summary: "Review card (SRS rating 1–4)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Updated state" } },
      },
    },
    "/tutor/chat": {
      post: {
        tags: ["tutor"],
        summary: "AI tutor message (SpaceXAI / fallback)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Reply" } },
      },
    },
    "/learning/calendar": {
      get: {
        tags: ["learning"],
        summary: "Activity heatmap",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Day series" } },
      },
    },
    "/learning/next": {
      get: {
        tags: ["learning"],
        summary: "Smart next steps (exams ready, minis, courses, deep tracks)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Recommendations" } },
      },
    },
    "/learning/exams/me": {
      get: {
        tags: ["learning"],
        summary: "Unit exam board (locked/ready/passed) across courses",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "summary + courses[].exams" } },
      },
    },
    "/learning/programming/minis": {
      get: {
        tags: ["learning"],
        summary: "Programming mini-project completion board",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "minis[] + completed count" } },
      },
    },
    "/learning/programming/units": {
      get: {
        tags: ["learning"],
        summary: "Programming unit completion stats",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "units[]" } },
      },
    },
    "/learning/programming/minis/leaderboard": {
      get: {
        tags: ["learning"],
        summary: "Leaderboard by programming mini-projects completed",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "entries + me" } },
      },
    },
    "/learning/programming/minis/race": {
      get: {
        tags: ["learning"],
        summary: "Weekly minis race (3 featured minis this week)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "raceMeta + entries + me" } },
      },
    },
    "/learning/programming/minis/race/claim-bonus": {
      post: {
        tags: ["learning"],
        summary: "Claim top-3 weekly minis race XP bonus",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "xpGain" } },
      },
    },
    "/learning/export": {
      get: {
        tags: ["learning"],
        summary: "Export learner progress JSON",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Export payload" } },
      },
    },
    "/learning/placement/english": {
      get: {
        tags: ["learning"],
        summary: "Placement questions",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Questions" } },
      },
      post: {
        tags: ["learning"],
        summary: "Submit placement",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Level result" } },
      },
    },
    "/push/vapid-public-key": {
      get: {
        tags: ["push"],
        summary: "VAPID public key for Web Push",
        responses: { "200": { description: "{ publicKey }" } },
      },
    },
    "/push/subscribe": {
      post: {
        tags: ["push"],
        summary: "Store push subscription",
        security: [{ bearerAuth: [] }],
        responses: { "201": { description: "Saved" } },
      },
      delete: {
        tags: ["push"],
        summary: "Remove push subscription",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "OK" } },
      },
    },
    "/push/test": {
      post: {
        tags: ["push"],
        summary: "Send test push to self",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "sent/failed counts" } },
      },
    },
    "/analytics/class/{classId}": {
      get: {
        tags: ["analytics"],
        summary: "Teacher class analytics",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Summary + students + homework" } },
      },
    },
    "/analytics/org/{orgId}": {
      get: {
        tags: ["analytics"],
        summary: "Org-level class rollup",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Classes" } },
      },
    },
    "/speech/pronounce-tip": {
      post: {
        tags: ["speech"],
        summary: "Pronunciation tips (use with client TTS)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Tips + speak settings" } },
      },
    },
    "/speech/score": {
      post: {
        tags: ["speech"],
        summary: "Score heard vs expected transcript",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "score 0–1" } },
      },
    },
    "/playground/meta": {
      get: {
        tags: ["learning"],
        summary: "Playground languages + examples",
        responses: { "200": { description: "Catalog" } },
      },
    },
    "/playground/log": {
      post: {
        tags: ["learning"],
        summary: "Log playground run (client-executed)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "OK" } },
      },
    },
    "/playground/challenges": {
      get: {
        tags: ["learning"],
        summary: "Playground challenges + solved flags",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Challenges" } },
      },
    },
    "/playground/challenge/submit": {
      post: {
        tags: ["learning"],
        summary: "Submit challenge stdout for XP",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "pass + xpGain" } },
      },
    },
    "/playground/leaderboard": {
      get: {
        tags: ["learning"],
        summary: "Playground XP leaderboard",
        responses: { "200": { description: "Entries" } },
      },
    },
    "/playground/race/weekly": {
      get: {
        tags: ["learning"],
        summary: "Weekly playground race",
        responses: { "200": { description: "Race entries" } },
      },
    },
    "/parents/children": {
      get: {
        tags: ["parents"],
        summary: "List linked children",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Children" } },
      },
    },
    "/parents/children/{studentId}/progress": {
      get: {
        tags: ["parents"],
        summary: "Child progress (courses, programming, playground)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Progress" } },
      },
    },
    "/parents/children/{studentId}/digest": {
      get: {
        tags: ["parents"],
        summary: "7-day parent digest for child",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Digest metrics" } },
      },
    },
    "/parents/children/{studentId}/digest/send": {
      post: {
        tags: ["parents"],
        summary: "Email parent digest",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Sent + preview" } },
      },
    },
    "/parents/digest/run": {
      post: {
        tags: ["parents", "ops"],
        summary: "Cron batch parent digests (CRON_SECRET or admin)",
        responses: { "200": { description: "sent/skipped counts" } },
      },
    },
    "/admin/courses": {
      get: {
        tags: ["admin"],
        summary: "List all courses (any status)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "courses" } },
      },
      post: {
        tags: ["admin"],
        summary: "Create draft course",
        security: [{ bearerAuth: [] }],
        responses: { "201": { description: "course" } },
      },
    },
    "/admin/courses/{id}/publish": {
      post: {
        tags: ["admin"],
        summary: "Publish course (step-up)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "course" } },
      },
    },
    "/admin/units": {
      post: {
        tags: ["admin"],
        summary: "Create unit",
        security: [{ bearerAuth: [] }],
        responses: { "201": { description: "unit" } },
      },
    },
    "/admin/units/{id}": {
      patch: {
        tags: ["admin"],
        summary: "Patch unit",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "unit" } },
      },
      delete: {
        tags: ["admin"],
        summary: "Delete unit (step-up)",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "ok" } },
      },
    },
    "/admin/units/reorder": {
      post: {
        tags: ["admin"],
        summary: "Reorder units",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "ok" } },
      },
    },
    "/admin/lessons/reorder": {
      post: {
        tags: ["admin"],
        summary: "Reorder lessons",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "ok" } },
      },
    },
    "/admin/appearance": {
      get: {
        tags: ["admin"],
        summary: "Theme draft + published",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "appearance" } },
      },
    },
    "/admin/appearance/draft": {
      put: {
        tags: ["admin"],
        summary: "Save theme draft",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "ok" } },
      },
    },
    "/admin/appearance/publish": {
      post: {
        tags: ["admin"],
        summary: "Publish theme (step-up)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "published" } },
      },
    },
    "/admin/overview/parents": {
      get: {
        tags: ["admin"],
        summary: "Parents links + digests overview",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "counts" } },
      },
    },
    "/admin/metrics": {
      get: {
        tags: ["admin"],
        summary: "Product metrics (programming, playground, engagement)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Metrics JSON" } },
      },
    },
    "/admin/metrics.csv": {
      get: {
        tags: ["admin"],
        summary: "Product metrics as CSV",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "text/csv" } },
      },
    },
    "/admin/ops/summary": {
      get: {
        tags: ["admin"],
        summary: "Ops summary (parent links, digests)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Summary" } },
      },
    },
    "/admin/ops/parent-digests": {
      post: {
        tags: ["admin"],
        summary: "Run parent digest batch",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Batch result" } },
      },
    },
    "/admin/ops/homework-reminders": {
      post: {
        tags: ["admin"],
        summary: "Run homework due/overdue reminders",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Reminder counts" } },
      },
    },
    "/gradebook/class/{classId}.csv": {
      get: {
        tags: ["schools"],
        summary: "Class gradebook CSV (incl. programming/playground)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "text/csv" } },
      },
    },
    "/friends/minis": {
      get: {
        tags: ["social"],
        summary: "Compare programming minis with friends",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "entries ranked by minis completed" } },
      },
    },
    "/friends/race": {
      get: {
        tags: ["social"],
        summary: "Weekly programming minis race among friends",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "weekKey, raceSlugs, entries ranked by this-week race score",
          },
        },
      },
    },
    "/billing/trial": {
      post: {
        tags: ["auth"],
        summary: "Start 7-day Premium trial (dev/demo)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "plan + expires" } },
      },
    },
    "/admin/audit": {
      get: {
        tags: ["admin"],
        summary: "Recent admin audit log",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "entries[]" } },
      },
    },
    "/feedback": {
      post: {
        tags: ["engagement"],
        summary: "Submit user feedback to developers",
        security: [{ bearerAuth: [] }],
        responses: { "201": { description: "Created feedback" } },
      },
    },
    "/feedback/mine": {
      get: {
        tags: ["engagement"],
        summary: "List my feedback",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "feedback[]" } },
      },
    },
    "/feedback/admin": {
      get: {
        tags: ["admin"],
        summary: "List all feedback (admin)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "feedback[]" } },
      },
    },
    "/feedback/admin/{id}": {
      patch: {
        tags: ["admin"],
        summary: "Update feedback status (admin)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Updated" } },
      },
    },
    "/learning/placement/programming": {
      get: {
        tags: ["learning"],
        summary: "Programming placement questions",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Questions" } },
      },
      post: {
        tags: ["learning"],
        summary: "Submit programming placement",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Recommended unit / level" } },
      },
    },

    "/homework/catalog": {
      get: {
        tags: ["schools"],
        summary: "Homework lesson catalog by course",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Units + lessons" } },
      },
    },
    "/homework/bulk": {
      post: {
        tags: ["schools"],
        summary: "Bulk-assign lessons to class",
        security: [{ bearerAuth: [] }],
        responses: { "201": { description: "Created assignments" } },
      },
    },
    "/shop": {
      get: {
        tags: ["engagement"],
        summary: "XP shop catalog",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Items + balance" } },
      },
    },
    "/reports/weekly": {
      get: {
        tags: ["engagement"],
        summary: "Weekly report stats",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Stats" } },
      },
    },
    "/search": {
      get: {
        tags: ["social"],
        summary: "Search courses and users",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Results" } },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer" },
    },
  },
};

openapiRoutes.get("/openapi.json", (c) => c.json(doc));
openapiRoutes.get("/docs", (c) =>
  c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>EduForge API Docs</title>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <style>
    :root { --bg:#0f172a; --card:#1e293b; --text:#f8fafc; --muted:#94a3b8; --accent:#58cc02; }
    body{font-family:system-ui,sans-serif;background:var(--bg);color:var(--text);max-width:880px;margin:0 auto;padding:2rem 1rem}
    a{color:var(--accent)} code{background:#334155;padding:.15rem .4rem;border-radius:6px;font-size:.9em}
    .card{background:var(--card);border-radius:16px;padding:1.25rem;margin:1rem 0}
    h1{font-weight:900} .muted{color:var(--muted)}
    ul{line-height:1.7}
  </style>
</head>
<body>
  <h1>EduForge API</h1>
  <p class="muted">v${doc.info.version} · OpenAPI 3</p>
  <div class="card">
    <p>Machine-readable: <a href="/openapi.json"><code>/openapi.json</code></a></p>
    <p>Auth: <code>Authorization: Bearer &lt;token&gt;</code> from <code>/auth/login</code>.</p>
  </div>
  <div class="card">
    <h2>Highlights</h2>
    <ul>
      <li><code>/health</code> · <code>/metrics</code></li>
      <li><code>/courses</code> · lesson submit · chess coach</li>
      <li><code>/flashcards/*</code> · <code>/tutor/chat</code></li>
      <li><code>/learning/*</code> calendar, placement, export</li>
      <li><code>/push/*</code> Web Push (VAPID)</li>
      <li><code>/analytics/class/{id}</code> teacher dashboard</li>
      <li><code>/speech/*</code> pronunciation helpers</li>
      <li>Schools, homework, parents, shop, reports</li>
    </ul>
  </div>
</body>
</html>`),
);
