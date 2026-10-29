import { and, eq, ne } from "drizzle-orm";
import { familyMembers, users } from "@eduforge/db";
import { db } from "../db.js";

export type EffectivePlan = {
  family: {
    isOwner: boolean;
    ownerUserId: string | null;
    maxSeats: number;
    memberCount: number;
  } | null;
};

/**
 * Resolve family-group membership.
 * Membership does not change lesson, heart, or chess access.
 */
export async function resolveEffectivePlan(userId: string): Promise<EffectivePlan> {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  if (!user) {
    return {
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

  if (ownerRecord) {
    const members = await db.query.familyMembers.findMany({
      where: and(eq(familyMembers.ownerUserId, userId), eq(familyMembers.status, "active")),
    });
    return {
      family: {
        isOwner: true,
        ownerUserId: userId,
        maxSeats: user.familyMaxSeats || 4,
        memberCount: members.length,
      },
    };
  }

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
      family: {
        isOwner: false,
        ownerUserId: membership.ownerUserId,
        maxSeats: owner?.familyMaxSeats || 4,
        memberCount: 0,
      },
    };
  }

  return {
    family: null,
  };
}
