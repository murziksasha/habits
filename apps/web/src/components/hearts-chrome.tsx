"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  freemiumMatrix,
  heartsWarningLevel,
  minutesUntilHeartRegen,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { HeartsBar } from "@/components/hearts";
import clsx from "clsx";

type HeartsPayload = {
  hearts: number;
  maxHearts: number;
  heartsUpdatedAt: string | null;
  isPremium: boolean;
  regenMinutes: number;
  courseSlug: string | null;
};

export const HEARTS_REFRESH_EVENT = "eduforge:hearts-refresh";

/** Compact hearts + regen countdown for global nav (desktop + mobile header). */
export function HeartsChrome({
  className = "",
  alwaysShow = false,
}: {
  className?: string;
  /** When true, never hide with sm: (used in mobile header strip) */
  alwaysShow?: boolean;
}) {
  const { token, user } = useAuth();
  const { locale, t } = useLocale();
  const [data, setData] = useState<HeartsPayload | null>(null);
  const [tick, setTick] = useState(0);

  const load = useCallback(() => {
    if (!token || !user) return;
    void api<HeartsPayload>("/me/hearts", { token })
      .then(setData)
      .catch(() => setData(null));
  }, [token, user]);

  useEffect(() => {
    load();
    const id = window.setInterval(load, 60_000);
    function onRefresh() {
      load();
    }
    window.addEventListener(HEARTS_REFRESH_EVENT, onRefresh);
    return () => {
      window.clearInterval(id);
      window.removeEventListener(HEARTS_REFRESH_EVENT, onRefresh);
    };
  }, [load]);

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!user || !data) return null;
  if (data.isPremium) {
    return (
      <Link
        href="/learn"
        className={clsx(alwaysShow ? "inline-flex" : "inline-flex", className)}
        title={locale === "en" ? "Unlimited hearts" : "Безліміт сердець"}
      >
        <HeartsBar hearts={999} max={5} compact />
      </Link>
    );
  }

  const level = heartsWarningLevel(data.hearts, data.maxHearts);
  const regen =
    level !== "ok"
      ? minutesUntilHeartRegen({
          hearts: data.hearts,
          maxHearts: data.maxHearts,
          heartsUpdatedAt: data.heartsUpdatedAt,
          regenMinutes: data.regenMinutes || freemiumMatrix().heartRegenMinutes,
        })
      : 0;
  void tick;

  return (
    <Link
      href={
        level === "empty"
          ? "/pricing"
          : data.courseSlug
            ? `/courses/${data.courseSlug}`
            : "/learn"
      }
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border-2 px-1.5 py-0.5",
        level === "empty" && "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950",
        level === "low" && "border-sun/40 bg-sun/10",
        level === "ok" && "border-transparent",
        className,
      )}
      title={
        level === "empty" || level === "low"
          ? `${t.onboarding.regenIn} ${regen || data.regenMinutes} ${t.onboarding.minShort}`
          : undefined
      }
    >
      <HeartsBar hearts={data.hearts} max={Math.min(5, data.maxHearts)} compact />
      {(level === "low" || level === "empty") && regen > 0 && (
        <span className="text-[10px] font-black text-ink-muted tabular-nums">
          {regen}
          {t.onboarding.minShort}
        </span>
      )}
    </Link>
  );
}

export function dispatchHeartsRefresh() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(HEARTS_REFRESH_EVENT));
  }
}
