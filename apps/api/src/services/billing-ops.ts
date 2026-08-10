import { eq } from "drizzle-orm";
import { users } from "@eduforge/db";
import type { Db } from "@eduforge/db";
import {
  FAMILY_DEFAULT_SEATS,
  freemiumMatrix,
  isFeatureEnabled,
  planFeatureMatrix,
} from "@eduforge/shared";

/** Demo upgrade/trial only when ALLOW_DEV_BILLING (or non-prod default). */
export function devBillingAllowed(): boolean {
  return isFeatureEnabled("dev_billing");
}

export function publicEntitlementsPayload(stripeConfigured: boolean) {
  return {
    matrix: freemiumMatrix(),
    features: planFeatureMatrix(),
    stripeConfigured,
  };
}

export type DemoUpgradeKind = "premium" | "family";

export async function applyDemoUpgrade(
  db: Db,
  userId: string,
  kind: DemoUpgradeKind,
  days = 30,
): Promise<{ plan: DemoUpgradeKind; planExpiresAt: Date }> {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  await db
    .update(users)
    .set({
      plan: kind,
      familyMaxSeats: kind === "family" ? FAMILY_DEFAULT_SEATS : 0,
      planExpiresAt: expires,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
  return { plan: kind, planExpiresAt: expires };
}

export async function applyTrialPremium(
  db: Db,
  userId: string,
  currentPlan: string,
  currentExpires: Date | null | undefined,
  trialDays = 7,
): Promise<{ plan: string; planExpiresAt: Date | null | undefined; kind: string }> {
  if (currentPlan === "premium") {
    return {
      plan: "premium",
      planExpiresAt: currentExpires,
      kind: "already_premium",
    };
  }
  const expires = new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000);
  await db
    .update(users)
    .set({ plan: "premium", planExpiresAt: expires, updatedAt: new Date() })
    .where(eq(users.id, userId));
  return { plan: "premium", planExpiresAt: expires, kind: "trial_7d" };
}

export async function applyDemoDowngrade(db: Db, userId: string): Promise<{ plan: "free" }> {
  await db
    .update(users)
    .set({
      plan: "free",
      planExpiresAt: null,
      familyMaxSeats: 0,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
  return { plan: "free" };
}
