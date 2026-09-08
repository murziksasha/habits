import { Hono } from "hono";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { users } from "@eduforge/db";
import { FAMILY_DEFAULT_SEATS } from "@eduforge/shared";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { env } from "../env.js";
import { resolveEffectivePlan } from "../services/effective-plan.js";
import {
  applyDemoDowngrade,
  applyDemoUpgrade,
  applyTrialPremium,
  devBillingAllowed,
  publicEntitlementsPayload,
} from "../services/billing-ops.js";
import { rateLimit } from "../rate-limit.js";

type Vars = { user: AuthedUser };

export const billingRoutes = new Hono<{ Variables: Vars }>();

function getStripe() {
  if (!env.stripeSecretKey || env.stripeSecretKey.includes("xxx")) return null;
  return new Stripe(env.stripeSecretKey);
}

billingRoutes.get("/status", authMiddleware, async (c) => {
  const user = c.get("user");
  const effective = await resolveEffectivePlan(user.id);
  const premium = effective.premiumActive;
  return c.json({
    plan: user.plan,
    effectivePlan: effective.plan,
    planExpiresAt: effective.planExpiresAt ?? user.planExpiresAt,
    stripeConfigured: Boolean(getStripe()),
    premiumActive: premium,
    family: effective.family,
    familyDefaultSeats: FAMILY_DEFAULT_SEATS,
  });
});

/** Public freemium matrix (also returned authenticated for client paywalls). */
billingRoutes.get("/entitlements", async (c) => {
  return c.json(publicEntitlementsPayload(Boolean(getStripe())));
});

/** Dev/demo upgrade without Stripe — gated by ALLOW_DEV_BILLING / non-prod default */
billingRoutes.post("/dev-upgrade", authMiddleware, async (c) => {
  if (!devBillingAllowed()) {
    return c.json(
      { error: "dev_billing_disabled", hint: "use Stripe checkout or set ALLOW_DEV_BILLING=1 on staging" },
      403,
    );
  }
  const user = c.get("user");
  const rl = await rateLimit({
    key: `billing:dev-upgrade:${user.id}`,
    limit: 10,
    windowMs: 60 * 60_000,
  });
  if (!rl.ok) {
    return c.json({ error: "rate_limited", retryAfter: rl.retryAfterSec }, 429);
  }
  const body = await c.req.json().catch(() => ({}));
  const kind = body.kind === "family" ? "family" : "premium";
  const { plan, planExpiresAt } = await applyDemoUpgrade(db, user.id, kind, 30);
  return c.json({
    plan,
    planExpiresAt,
    kind: kind === "family" ? "demo_family_30d" : "demo_30d",
  });
});

/** 7-day Premium trial (dev / staging only when dev billing allowed) */
billingRoutes.post("/trial", authMiddleware, async (c) => {
  if (!devBillingAllowed()) {
    return c.json(
      { error: "dev_billing_disabled", hint: "use Stripe checkout" },
      403,
    );
  }
  const user = c.get("user");
  const out = await applyTrialPremium(db, user.id, user.plan, user.planExpiresAt, 7);
  return c.json(out);
});

billingRoutes.post("/dev-downgrade", authMiddleware, async (c) => {
  if (!devBillingAllowed()) {
    return c.json({ error: "dev_billing_disabled", hint: "use Stripe portal" }, 403);
  }
  const user = c.get("user");
  const out = await applyDemoDowngrade(db, user.id);
  return c.json(out);
});

billingRoutes.post("/checkout", authMiddleware, async (c) => {
  const stripe = getStripe();
  if (!stripe) return c.json({ error: "stripe_not_configured", hint: "use /billing/dev-upgrade" }, 503);
  const user = c.get("user");
  const body = await c.req.json().catch(() => ({}));
  const interval = body.interval === "year" ? "year" : "month";
  const kind = body.kind === "family" ? "family" : "premium";
  const familyPrice = process.env.STRIPE_PRICE_FAMILY ?? "";
  const price =
    kind === "family" && familyPrice
      ? familyPrice
      : interval === "year"
        ? env.stripePriceYearly
        : env.stripePriceMonthly;
  if (!price) return c.json({ error: "price_not_configured" }, 503);

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
    await db
      .update(users)
      .set({ stripeCustomerId: customerId })
      .where(eq(users.id, user.id));
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price, quantity: 1 }],
    success_url: `${env.webOrigin}/pricing?success=1`,
    cancel_url: `${env.webOrigin}/pricing?canceled=1`,
    metadata: { userId: user.id, kind },
  });
  return c.json({ url: session.url });
});

/** Stripe Customer Portal for subscription management */
billingRoutes.post("/portal", authMiddleware, async (c) => {
  const stripe = getStripe();
  if (!stripe) {
    return c.json({ error: "stripe_not_configured", hint: "use /billing/dev-downgrade in demo" }, 503);
  }
  const user = c.get("user");
  if (!user.stripeCustomerId) {
    return c.json({ error: "no_customer", hint: "complete checkout first" }, 400);
  }
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${env.webOrigin}/pricing`,
    });
    return c.json({ url: session.url });
  } catch (e) {
    return c.json(
      {
        error: "portal_failed",
        message: e instanceof Error ? e.message : "portal_error",
      },
      502,
    );
  }
});

billingRoutes.post("/webhook", async (c) => {
  const stripe = getStripe();
  if (!stripe) return c.json({ error: "stripe_not_configured" }, 503);
  const sig = c.req.header("stripe-signature");
  const raw = await c.req.text();
  if (!sig || !env.stripeWebhookSecret) return c.json({ error: "missing_sig" }, 400);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, env.stripeWebhookSecret);
  } catch {
    return c.json({ error: "invalid_signature" }, 400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const kind = session.metadata?.kind === "family" ? "family" : "premium";
    if (userId) {
      await db
        .update(users)
        .set({
          plan: kind,
          familyMaxSeats: kind === "family" ? FAMILY_DEFAULT_SEATS : 0,
          stripeSubscriptionId: String(session.subscription ?? ""),
          planExpiresAt: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));
    }
  }
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    await db
      .update(users)
      .set({ plan: "free", planExpiresAt: null, updatedAt: new Date() })
      .where(eq(users.stripeSubscriptionId, sub.id));
  }
  return c.json({ received: true });
});
