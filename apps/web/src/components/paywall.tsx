"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { freemiumMatrix, minutesUntilHeartRegen } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { Badge, Button, Card } from "@/components/ui";

type Reason = "premium_required" | "no_hearts";

export function PaywallCard({
  reason,
  backHref,
  heartsUpdatedAt,
  hearts = 0,
  maxHearts,
  surface = "generic",
}: {
  reason: Reason;
  backHref?: string;
  heartsUpdatedAt?: string | null;
  hearts?: number;
  maxHearts?: number;
  /** Where the paywall was shown (analytics). */
  surface?: string;
}) {
  const { t, locale } = useLocale();
  const { token } = useAuth();
  const tracked = useRef(false);
  const m = freemiumMatrix();
  const max = maxHearts ?? m.freeHearts;
  const regenMins =
    reason === "no_hearts"
      ? minutesUntilHeartRegen({
          hearts,
          maxHearts: max,
          heartsUpdatedAt,
          regenMinutes: m.heartRegenMinutes,
        })
      : 0;

  useEffect(() => {
    if (!token || tracked.current) return;
    tracked.current = true;
    void api("/analytics/events", {
      method: "POST",
      token,
      body: {
        kind: "paywall_shown",
        payload: { reason, surface },
      },
    }).catch(() => undefined);
  }, [token, reason, surface]);

  const title =
    reason === "no_hearts" ? t.pricing.noHeartsTitle : t.pricing.paywallTitle;
  const body =
    reason === "no_hearts" ? t.pricing.noHeartsBody : t.pricing.paywallBody;

  function trackCta(target: string) {
    if (!token) return;
    void api("/analytics/events", {
      method: "POST",
      token,
      body: {
        kind: "paywall_cta_click",
        payload: { reason, surface, target },
      },
    }).catch(() => undefined);
  }

  return (
    <Card className="mx-auto max-w-lg space-y-4 text-center border-brand/30">
      <Badge tone="grape">{t.common.premium}</Badge>
      <h1 className="text-2xl font-black">{title}</h1>
      <p className="text-ink-muted font-bold">{body}</p>
      {reason === "no_hearts" && (
        <p className="text-sm font-bold text-sky">
          ⏱ {t.onboarding.regenIn} {regenMins || m.heartRegenMinutes}{" "}
          {t.onboarding.minShort}
        </p>
      )}
      <ul className="space-y-1 text-left text-sm font-bold text-ink-muted">
        <li>
          • {t.pricing.featureLessons}: {m.freeLessonsPerCourse}
        </li>
        <li>
          • {t.pricing.featureHearts}: {m.freeHearts} /{" "}
          {locale === "en" ? "regen" : "відн."} {m.heartRegenMinutes}m
        </li>
        <li>
          • {t.pricing.featureChess}: {m.freeRatedChessPerDay}
        </li>
      </ul>
      <div className="flex flex-wrap justify-center gap-3">
        {backHref && (
          <Link href={backHref}>
            <Button variant="secondary">{t.common.back}</Button>
          </Link>
        )}
        <Link href="/pricing" onClick={() => trackCta("pricing")}>
          <Button variant="primary">{t.common.unlockPremium}</Button>
        </Link>
      </div>
      {/* Recovery paths — avoid dead-end */}
      <div className="flex flex-wrap justify-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
        <Link
          href="/review"
          className="btn-secondary !py-2 !px-3 text-xs"
          onClick={() => trackCta("review")}
        >
          🔁 {t.pricing.recoveryReview}
        </Link>
        <Link
          href="/flashcards"
          className="btn-secondary !py-2 !px-3 text-xs"
          onClick={() => trackCta("flashcards")}
        >
          🃏 {t.pricing.recoveryFlashcards}
        </Link>
        <Link
          href="/learn"
          className="btn-secondary !py-2 !px-3 text-xs"
          onClick={() => trackCta("learn")}
        >
          🗺️ {t.pricing.recoveryFree}
        </Link>
      </div>
    </Card>
  );
}
