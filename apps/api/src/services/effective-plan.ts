import { and, eq } from "drizzle-orm";
import { familyMembers, users } from "@eduforge/db";
import { isPremiumActive, type Plan } from "@eduforge/shared";
import { db } from "../db.js";

export type EffectivePlan = {
  plan: Plan;
  planExpiresAt: Date | null;
  premiumActive: boolean;
  family: {
    isOwner: boolean;
    ownerUserId: string | null;
    maxSeats: number;
    memberCount: number;
  } | null;
};

/**
 * Resolve plan for freemium gates: personal premium/family owner, or child of active family.
 */
export async function resolveEffectivePlan(userId: string): Promise<EffectivePlan> {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) {
    return {
      plan: "free",
      planExpiresAt: null,
      premiumActive: false,
      family: null,
    };
  }

  const personalActive = isPremiumActive({
    plan: user.plan as Plan,
    planExpiresAt: user.planExpiresAt,
  });

  if (user.plan === "family" && personalActive) {
    const members = await db.query.familyMembers.findMany({
      where: and(eq(familyMembers.ownerUserId, userId), eq(familyMembers.status, "active")),
    });
    return {
      plan: "family",
      planExpiresAt: user.planExpiresAt,
      premiumActive: true,
      family: {
        isOwner: true,
        ownerUserId: userId,
        maxSeats: user.familyMaxSeats || 4,
        memberCount: members.length,
      },
    };
  }

  if (personalActive) {
    return {
      plan: user.plan as Plan,
      planExpiresAt: user.planExpiresAt,
      premiumActive: true,
      family: null,
    };
  }

  // Child seat: inherit owner's family/premium window
  const membership = await db.query.familyMembers.findFirst({
    where: and(
      eq(familyMembers.memberUserId, userId),
      eq(familyMembers.status, "active"),
    ),
  });
  if (membership) {
    const owner = await db.query.users.findFirst({
      where: eq(users.id, membership.ownerUserId),
    });
    if (
      owner &&
      isPremiumActive({
        plan: owner.plan as Plan,
        planExpiresAt: owner.planExpiresAt,
      })
    ) {
      return {
        plan: "premium",
        planExpiresAt: owner.planExpiresAt,
        premiumActive: true,
        family: {
          isOwner: false,
          ownerUserId: owner.id,
          maxSeats: owner.familyMaxSeats || 4,
          memberCount: 0,
        },
      };
    }
  }

  return {
    plan: "free",
    planExpiresAt: user.planExpiresAt,
    premiumActive: false,
    family: null,
  };
}
