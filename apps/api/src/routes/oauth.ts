import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { characters, chessRatings, oauthAccounts, users } from "@eduforge/db";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { randomBytes } from "node:crypto";
import {
  createSession,
  setSessionCookie,
  shouldIssueBearerToken,
  type AuthedUser,
} from "../auth.js";
import { db } from "../db.js";
import { env } from "../env.js";
import { clientIp, rateLimit } from "../rate-limit.js";

type Vars = { user: AuthedUser };

export const oauthRoutes = new Hono<{ Variables: Vars }>();

function googleConfigured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID?.trim() && process.env.GOOGLE_CLIENT_SECRET?.trim(),
  );
}

function googleRedirectUri() {
  return (
    process.env.GOOGLE_REDIRECT_URI?.trim() ||
    `${process.env.API_PUBLIC_URL ?? `http://localhost:${env.port}`}/auth/oauth/google/callback`
  );
}

function oauthStateCookieName() {
  return "eduforge_oauth_state";
}

oauthRoutes.get("/providers", (c) => {
  return c.json({
    google: googleConfigured(),
    redirectUri: googleConfigured() ? googleRedirectUri() : null,
  });
});

/** Start Google OAuth — redirects browser to Google consent. */
oauthRoutes.get("/google/start", async (c) => {
  if (!googleConfigured()) {
    return c.json(
      {
        error: "oauth_not_configured",
        hint: "Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET",
      },
      503,
    );
  }
  const ip = clientIp({ get: (n) => c.req.header(n) ?? null });
  const rl = await rateLimit({ key: `oauth:start:${ip}`, limit: 30, windowMs: 15 * 60_000 });
  if (!rl.ok) return c.json({ error: "rate_limited" }, 429);

  const state = randomBytes(24).toString("hex");
  const next = c.req.query("next") ?? "/dashboard";
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

  setCookie(c, oauthStateCookieName(), JSON.stringify({ state, next: safeNext }), {
    httpOnly: true,
    path: "/",
    maxAge: 600,
    sameSite: "Lax",
  });

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: googleRedirectUri(),
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "online",
    prompt: "select_account",
  });
  return c.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

type GoogleTokenRes = {
  access_token?: string;
  id_token?: string;
  error?: string;
};

type GoogleUserInfo = {
  id?: string;
  sub?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
};

async function exchangeGoogleCode(code: string): Promise<GoogleTokenRes> {
  const body = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: googleRedirectUri(),
    grant_type: "authorization_code",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  return (await res.json()) as GoogleTokenRes;
}

async function fetchGoogleUser(accessToken: string): Promise<GoogleUserInfo> {
  const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return (await res.json()) as GoogleUserInfo;
}

function parseStateCookie(c: { req: { header: (n: string) => string | undefined } }): {
  state: string;
  next: string;
} | null {
  // Prefer hono cookie helper via raw header parse (callback runs before typed getCookie on all envs)
  const raw = getCookie(c as never, oauthStateCookieName());
  if (!raw) return null;
  try {
    const j = JSON.parse(raw) as { state?: string; next?: string };
    if (!j.state) return null;
    return { state: j.state, next: j.next ?? "/dashboard" };
  } catch {
    return null;
  }
}

/** Google OAuth callback — create/link user, set session cookie, redirect to web. */
oauthRoutes.get("/google/callback", async (c) => {
  if (!googleConfigured()) {
    return c.redirect(`${env.webOrigin}/login?error=oauth_not_configured`);
  }
  const code = c.req.query("code");
  const state = c.req.query("state");
  const err = c.req.query("error");
  if (err || !code || !state) {
    return c.redirect(`${env.webOrigin}/login?error=oauth_denied`);
  }

  const stored = parseStateCookie(c);
  if (!stored || stored.state !== state) {
    return c.redirect(`${env.webOrigin}/login?error=oauth_state`);
  }

  deleteCookie(c, oauthStateCookieName(), { path: "/" });

  const tokens = await exchangeGoogleCode(code);
  if (!tokens.access_token) {
    return c.redirect(`${env.webOrigin}/login?error=oauth_token`);
  }
  const info = await fetchGoogleUser(tokens.access_token);
  const providerUserId = info.id || info.sub;
  const email = info.email?.toLowerCase();
  if (!providerUserId || !email) {
    return c.redirect(`${env.webOrigin}/login?error=oauth_profile`);
  }

  // Existing OAuth link
  let account = await db.query.oauthAccounts.findFirst({
    where: and(
      eq(oauthAccounts.provider, "google"),
      eq(oauthAccounts.providerUserId, providerUserId),
    ),
  });

  let userId: string;
  if (account) {
    userId = account.userId;
  } else {
    // Link by verified email or create
    let user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!user) {
      const displayName = (info.name ?? email.split("@")[0] ?? "Player").slice(0, 32);
      const [created] = await db
        .insert(users)
        .values({
          email,
          passwordHash: null,
          emailVerifiedAt: info.email_verified !== false ? new Date() : null,
          plan: "free",
        })
        .returning();
      user = created;
      await db.insert(characters).values({
        userId: user.id,
        displayName,
      });
      await db.insert(chessRatings).values({ userId: user.id });
    } else if (!user.emailVerifiedAt && info.email_verified !== false) {
      await db
        .update(users)
        .set({ emailVerifiedAt: new Date(), updatedAt: new Date() })
        .where(eq(users.id, user.id));
    }

    await db.insert(oauthAccounts).values({
      userId: user.id,
      provider: "google",
      providerUserId,
      email,
    });
    userId = user.id;
  }

  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) return c.redirect(`${env.webOrigin}/login?error=oauth_user`);

  // MFA challenge for enrolled users — redirect to web MFA step with pending token
  if (user.totpEnabled) {
    const { createMfaPending } = await import("../mfa.js");
    const mfaToken = await createMfaPending(user.id);
    return c.redirect(
      `${env.webOrigin}/login?mfa=1&mfaToken=${encodeURIComponent(mfaToken)}&next=${encodeURIComponent(stored.next)}`,
    );
  }

  const { token, expiresAt } = await createSession(user.id, { mfaVerified: true });
  setSessionCookie(c, token, expiresAt);

  const dest = `${env.webOrigin}${stored.next.startsWith("/") ? stored.next : "/dashboard"}`;
  // Optional bearer for non-prod clients via hash is avoided; cookie only
  return c.redirect(dest);
});

/** Dev-only: simulate Google login when OAuth keys missing (local e2e). */
oauthRoutes.post("/google/dev-login", async (c) => {
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_DEV_OAUTH !== "1") {
    return c.json({ error: "forbidden" }, 403);
  }
  if (googleConfigured() && process.env.ALLOW_DEV_OAUTH !== "1") {
    return c.json({ error: "use_real_oauth" }, 400);
  }
  const body = await c.req.json().catch(() => ({}));
  const email = String(body.email ?? "oauth.dev@eduforge.local").toLowerCase();
  const displayName = String(body.displayName ?? "OAuth Dev").slice(0, 32);
  const providerUserId = String(body.providerUserId ?? `dev-${email}`);

  let account = await db.query.oauthAccounts.findFirst({
    where: and(
      eq(oauthAccounts.provider, "google"),
      eq(oauthAccounts.providerUserId, providerUserId),
    ),
  });
  let userId: string;
  if (account) {
    userId = account.userId;
  } else {
    let user = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (!user) {
      const [created] = await db
        .insert(users)
        .values({
          email,
          passwordHash: null,
          emailVerifiedAt: new Date(),
        })
        .returning();
      user = created;
      await db.insert(characters).values({ userId: user.id, displayName });
      await db.insert(chessRatings).values({ userId: user.id });
    }
    await db.insert(oauthAccounts).values({
      userId: user.id,
      provider: "google",
      providerUserId,
      email,
    });
    userId = user.id;
  }
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) return c.json({ error: "not_found" }, 404);
  if (user.totpEnabled) {
    const { createMfaPending } = await import("../mfa.js");
    const mfaToken = await createMfaPending(user.id);
    return c.json({ mfaRequired: true, mfaToken, user: { id: user.id, email: user.email } });
  }
  const { token, expiresAt } = await createSession(user.id, { mfaVerified: true });
  setSessionCookie(c, token, expiresAt);
  const character = await db.query.characters.findFirst({
    where: eq(characters.userId, user.id),
  });
  return c.json({
    user: {
      id: user.id,
      email: user.email,
      plan: user.plan,
      role: user.role,
      emailVerified: Boolean(user.emailVerifiedAt),
    },
    character,
    ...(shouldIssueBearerToken(c) ? { token } : {}),
  });
});
