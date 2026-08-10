import { Hono } from "hono";
import { and, eq, gt } from "drizzle-orm";
import { characters, familyInvites, familyMembers, users } from "@eduforge/db";
import { FAMILY_DEFAULT_SEATS, isFeatureEnabled } from "@eduforge/shared";
import { randomBytes } from "node:crypto";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { resolveEffectivePlan } from "../services/effective-plan.js";
import { clientIp, rateLimit } from "../rate-limit.js";

type Vars = { user: AuthedUser };

export const familyRoutes = new Hono<{ Variables: Vars }>();

function inviteCode() {
  return randomBytes(8).toString("hex").toUpperCase();
}

async function childCount(ownerUserId: string) {
  const active = await db.query.familyMembers.findMany({
    where: and(
      eq(familyMembers.ownerUserId, ownerUserId),
      eq(familyMembers.status, "active"),
    ),
  });
  return active.filter((m) => m.role === "child").length;
}

familyRoutes.get("/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const effective = await resolveEffectivePlan(user.id);

  if (user.plan === "family") {
    const members = await db
      .select({
        id: familyMembers.id,
        memberUserId: familyMembers.memberUserId,
        role: familyMembers.role,
        status: familyMembers.status,
        createdAt: familyMembers.createdAt,
        displayName: characters.displayName,
        email: users.email,
      })
      .from(familyMembers)
      .leftJoin(characters, eq(characters.userId, familyMembers.memberUserId))
      .leftJoin(users, eq(users.id, familyMembers.memberUserId))
      .where(
        and(eq(familyMembers.ownerUserId, user.id), eq(familyMembers.status, "active")),
      );

    const pending = await db.query.familyInvites.findMany({
      where: and(
        eq(familyInvites.ownerUserId, user.id),
        gt(familyInvites.expiresAt, new Date()),
      ),
    });

    return c.json({
      role: "owner",
      plan: user.plan,
      planExpiresAt: user.planExpiresAt,
      maxSeats: user.familyMaxSeats || FAMILY_DEFAULT_SEATS,
      childCount: members.filter((m) => m.role === "child").length,
      members,
      pendingInvites: pending.map((p) => ({
        id: p.id,
        inviteCode: p.inviteCode,
        expiresAt: p.expiresAt,
      })),
      premiumActive: effective.premiumActive,
    });
  }

  if (effective.family && !effective.family.isOwner) {
    const owner = await db.query.users.findFirst({
      where: eq(users.id, effective.family.ownerUserId!),
    });
    const ownerCh = owner
      ? await db.query.characters.findFirst({
          where: eq(characters.userId, owner.id),
        })
      : null;
    return c.json({
      role: "child",
      plan: user.plan,
      premiumActive: effective.premiumActive,
      owner: owner
        ? {
            id: owner.id,
            email: owner.email,
            displayName: ownerCh?.displayName ?? null,
          }
        : null,
    });
  }

  return c.json({
    role: "none",
    plan: user.plan,
    premiumActive: effective.premiumActive,
    maxSeats: FAMILY_DEFAULT_SEATS,
  });
});

/** Upgrade current user to family plan owner. */
familyRoutes.post("/activate", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => ({}));
  const seats = Math.min(
    10,
    Math.max(2, Number(body.seats ?? FAMILY_DEFAULT_SEATS) || FAMILY_DEFAULT_SEATS),
  );

  const can =
    user.plan === "premium" ||
    user.plan === "family" ||
    isFeatureEnabled("dev_billing");
  if (!can) {
    return c.json(
      { error: "need_premium", hint: "Upgrade to Premium first, then activate Family" },
      402,
    );
  }

  // Leave other family first
  await db
    .delete(familyMembers)
    .where(eq(familyMembers.memberUserId, user.id));

  const expires =
    user.planExpiresAt ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await db
    .update(users)
    .set({
      plan: "family",
      familyMaxSeats: seats,
      planExpiresAt: expires,
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));

  const existing = await db.query.familyMembers.findFirst({
    where: and(
      eq(familyMembers.ownerUserId, user.id),
      eq(familyMembers.memberUserId, user.id),
    ),
  });
  if (!existing) {
    await db.insert(familyMembers).values({
      ownerUserId: user.id,
      memberUserId: user.id,
      role: "owner",
      status: "active",
    });
  }

  return c.json({
    ok: true,
    plan: "family",
    maxSeats: seats,
    planExpiresAt: expires,
  });
});

familyRoutes.post("/invite", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.plan !== "family") {
    return c.json({ error: "not_family_owner" }, 400);
  }
  const max = user.familyMaxSeats || FAMILY_DEFAULT_SEATS;
  const kids = await childCount(user.id);
  if (kids >= max) {
    return c.json({ error: "seats_full", maxSeats: max, childCount: kids }, 409);
  }

  const code = inviteCode();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await db.insert(familyInvites).values({
    ownerUserId: user.id,
    inviteCode: code,
    expiresAt,
  });

  return c.json({
    inviteCode: code,
    expiresAt,
    claimPath: `/family?claim=${code}`,
    maxSeats: max,
    childCount: kids,
  });
});

familyRoutes.post("/claim", authMiddleware, async (c) => {
  const user = c.get("user");
  const ip = clientIp({ get: (n) => c.req.header(n) ?? null });
  const rl = await rateLimit({
    key: `family-claim:${user.id}:${ip}`,
    limit: 10,
    windowMs: 15 * 60_000,
  });
  if (!rl.ok) return c.json({ error: "rate_limited" }, 429);

  const body = await c.req.json().catch(() => ({}));
  const code = String(body.inviteCode ?? "")
    .trim()
    .toUpperCase();
  if (code.length < 12) return c.json({ error: "invalid_input" }, 400);

  const invite = await db.query.familyInvites.findFirst({
    where: and(
      eq(familyInvites.inviteCode, code),
      gt(familyInvites.expiresAt, new Date()),
    ),
  });
  if (!invite) return c.json({ error: "not_found" }, 404);
  if (invite.ownerUserId === user.id) {
    return c.json({ error: "cannot_claim_own" }, 400);
  }

  const owner = await db.query.users.findFirst({
    where: eq(users.id, invite.ownerUserId),
  });
  if (!owner || owner.plan !== "family") {
    return c.json({ error: "family_inactive" }, 400);
  }

  const max = owner.familyMaxSeats || FAMILY_DEFAULT_SEATS;
  const kids = await childCount(owner.id);
  if (kids >= max) return c.json({ error: "seats_full" }, 409);

  const already = await db.query.familyMembers.findFirst({
    where: and(
      eq(familyMembers.memberUserId, user.id),
      eq(familyMembers.status, "active"),
    ),
  });
  if (already) return c.json({ error: "already_in_family" }, 409);

  await db.delete(familyInvites).where(eq(familyInvites.id, invite.id));
  await db.insert(familyMembers).values({
    ownerUserId: owner.id,
    memberUserId: user.id,
    role: "child",
    status: "active",
  });

  return c.json({ ok: true, ownerUserId: owner.id });
});

familyRoutes.delete("/members/:memberUserId", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.plan !== "family") return c.json({ error: "not_family_owner" }, 400);
  const memberUserId = c.req.param("memberUserId") ?? "";
  if (!memberUserId) return c.json({ error: "invalid_input" }, 400);
  if (memberUserId === user.id) {
    return c.json({ error: "cannot_remove_self" }, 400);
  }
  await db
    .delete(familyMembers)
    .where(
      and(
        eq(familyMembers.ownerUserId, user.id),
        eq(familyMembers.memberUserId, memberUserId),
      ),
    );
  return c.json({ ok: true });
});

familyRoutes.post("/leave", authMiddleware, async (c) => {
  const user = c.get("user");
  await db
    .delete(familyMembers)
    .where(
      and(eq(familyMembers.memberUserId, user.id), eq(familyMembers.role, "child")),
    );
  return c.json({ ok: true });
});
