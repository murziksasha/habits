import { Hono } from "hono";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { users } from "@eduforge/db";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { env } from "../env.js";

type Vars = { user: AuthedUser };

export const billingRoutes = new Hono<{ Variables: Vars }>();

function getStripe() {
  if (!env.stripeSecretKey || env.stripeSecretKey.includes("xxx")) return null;
  return new Stripe(env.stripeSecretKey);
}

billingRoutes.get("/status", authMiddleware, async (c) => {
  const user = c.get("user");
  return c.json({
    plan: user.plan,
    planExpiresAt: user.planExpiresAt,
    stripeConfigured: Boolean(getStripe()),
  });
});

/** Dev/demo upgrade without Stripe when keys missing */
billingRoutes.post("/dev-upgrade", authMiddleware, async (c) => {
  if (getStripe() && process.env.NODE_ENV === "production") {
    return c.json({ error: "use_checkout" }, 400);
  }
  const user = c.get("user");
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await db
    .update(users)
    .set({ plan: "premium", planExpiresAt: expires, updatedAt: new Date() })
    .where(eq(users.id, user.id));
  return c.json({ plan: "premium", planExpiresAt: expires, kind: "demo_30d" });
});

/** 7-day Premium trial (dev / no Stripe) */
billingRoutes.post("/trial", authMiddleware, async (c) => {
  if (getStripe() && process.env.NODE_ENV === "production") {
    return c.json({ error: "use_checkout" }, 400);
  }
  const user = c.get("user");
  if (user.plan === "premium") {
    return c.json({
      plan: "premium",
      planExpiresAt: user.planExpiresAt,
      kind: "already_premium",
    });
  }
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await db
    .update(users)
    .set({ plan: "premium", planExpiresAt: expires, updatedAt: new Date() })
    .where(eq(users.id, user.id));
  return c.json({ plan: "premium", planExpiresAt: expires, kind: "trial_7d" });
});

billingRoutes.post("/dev-downgrade", authMiddleware, async (c) => {
  if (process.env.NODE_ENV === "production" && getStripe()) {
    return c.json({ error: "use_portal" }, 400);
  }
  const user = c.get("user");
  await db
    .update(users)
    .set({ plan: "free", planExpiresAt: null, updatedAt: new Date() })
    .where(eq(users.id, user.id));
  return c.json({ plan: "free" });
});

billingRoutes.post("/checkout", authMiddleware, async (c) => {
  const stripe = getStripe();
  if (!stripe) return c.json({ error: "stripe_not_configured", hint: "use /billing/dev-upgrade" }, 503);
  const user = c.get("user");
  const body = await c.req.json().catch(() => ({}));
  const interval = body.interval === "year" ? "year" : "month";
  const price =
    interval === "year" ? env.stripePriceYearly : env.stripePriceMonthly;
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
    metadata: { userId: user.id },
  });
  return c.json({ url: session.url });
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
    if (userId) {
      await db
        .update(users)
        .set({
          plan: "premium",
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
