import { and, eq, ne } from "drizzle-orm";
import { familyMembers, users } from "@eduforge/db";
import type { Plan } from "@eduforge/shared";
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
 * Resolve effective plan and family relationships.
 * In free EduForge, access does not depend on plan; children are not promoted to premium.
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

  // Owner of a family group
  const ownerRecord = await db.query.familyMembers.findFirst({
    where: and(
      eq(familyMembers.ownerUserId, userId),
      eq(familyMembers.memberUserId, userId),
      eq(familyMembers.role, "owner"),
      eq(familyMembers.status, "active"),
    ),
  });

  if (ownerRecord || user.plan === "family") {
    const members = await db.query.familyMembers.findMany({
      where: and(eq(familyMembers.ownerUserId, userId), eq(familyMembers.status, "active")),
    });
    return {
      plan: (user.plan as Plan) ?? "free",
      planExpiresAt: user.planExpiresAt,
      premiumActive: false,
      family: {
        isOwner: true,
        ownerUserId: userId,
        maxSeats: user.familyMaxSeats || 4,
        memberCount: members.length,
      },
    };
  }

  // Child seat: do not promote to premium
  const membership = await db.query.familyMembers.findFirst({
    where: and(
      eq(familyMembers.memberUserId, userId),
      eq(familyMembers.status, "active"),
      ne(familyMembers.ownerUserId, userId),
    ),
  });
  if (membership) {
    const owner = await db.query.users.findFirst({
      where: eq(users.id, membership.ownerUserId),
    });
    return {
      plan: (user.plan as Plan) ?? "free",
      planExpiresAt: user.planExpiresAt,
      premiumActive: false,
      family: {
        isOwner: false,
        ownerUserId: membership.ownerUserId,
        maxSeats: owner?.familyMaxSeats || 4,
        memberCount: 0,
      },
    };
  }

  return {
    plan: (user.plan as Plan) ?? "free",
    planExpiresAt: user.planExpiresAt,
    premiumActive: false,
    family: null,
  };
}
