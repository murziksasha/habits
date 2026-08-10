"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { freemiumMatrix } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { Badge, Button, Card, CardDescription, CardTitle } from "@/components/ui";
import { PageLoading } from "@/components/page-loading";

export function PricingClient() {
  const { user, token, refresh } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [devBilling, setDevBilling] = useState(true);
  const [stripeConfigured, setStripeConfigured] = useState(false);
  const [flagsLoading, setFlagsLoading] = useState(true);
  const matrix = freemiumMatrix();

  useEffect(() => {
    if (!token) return;
    void api("/auth/onboarding/complete", {
      method: "POST",
      token,
      body: { key: "exploredPricing" },
    }).catch(() => undefined);
  }, [token]);

  useEffect(() => {
    setFlagsLoading(true);
    Promise.all([
      api<{ flags?: { devBilling?: boolean } }>("/me/flags")
        .then((d) => setDevBilling(Boolean(d.flags?.devBilling)))
        .catch(() => setDevBilling(false)),
      api<{ stripeConfigured?: boolean }>("/billing/entitlements")
        .then((d) => setStripeConfigured(Boolean(d.stripeConfigured)))
        .catch(() => setStripeConfigured(false)),
    ]).finally(() => setFlagsLoading(false));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search);
    if (q.get("success") === "1") {
      setMsg(locale === "en" ? "Payment success — refreshing plan…" : "Оплату прийнято — оновлюємо план…");
      void refresh();
    } else if (q.get("canceled") === "1") {
      setMsg(locale === "en" ? "Checkout canceled." : "Оплату скасовано.");
    }
  }, [locale, refresh]);

  async function upgrade() {
    if (!token) {
      router.push("/register");
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      const checkout = await api<{ url?: string }>("/billing/checkout", {
        method: "POST",
        token,
        body: { interval: "month" },
      });
      if (checkout.url) {
        window.location.href = checkout.url;
        return;
      }
    } catch {
      /* fall through to demo upgrade only when allowed */
    }
    if (!devBilling) {
      setMsg(
        locale === "en"
          ? "Checkout unavailable. Configure Stripe or contact support."
          : "Checkout недоступний. Налаштуйте Stripe або зверніться в підтримку.",
      );
      setBusy(false);
      return;
    }
    try {
      await api("/billing/dev-upgrade", { method: "POST", token });
      await refresh();
      setMsg(
        locale === "en"
          ? "Premium activated (demo, no Stripe)."
          : "Premium активовано (demo-режим без Stripe).",
      );
    } catch {
      setMsg(t.common.error);
    } finally {
      setBusy(false);
    }
  }

  async function startTrial() {
    if (!token) {
      router.push("/register");
      return;
    }
    if (!devBilling) {
      setMsg(
        locale === "en"
          ? "Trials are handled via Stripe Checkout."
          : "Trial через Stripe Checkout.",
      );
      return;
    }
    setBusy(true);
    try {
      const r = await api<{ kind?: string; planExpiresAt?: string }>("/billing/trial", {
        method: "POST",
        token,
      });
      await refresh();
      if (r.kind === "already_premium") {
        setMsg(locale === "en" ? "You already have Premium." : "У вас уже Premium.");
      } else {
        const until = r.planExpiresAt
          ? new Date(r.planExpiresAt).toLocaleDateString(locale === "en" ? "en-US" : "uk-UA")
          : "";
        setMsg(
          locale === "en"
            ? `Trial ${matrix.trialDays} days activated${until ? ` until ${until}` : ""}.`
            : `Trial ${matrix.trialDays} днів активовано${until ? ` до ${until}` : ""}.`,
        );
      }
    } catch {
      setMsg(t.common.error);
    } finally {
      setBusy(false);
    }
  }

  async function downgrade() {
    if (!token || !devBilling) return;
    setBusy(true);
    try {
      await api("/billing/dev-downgrade", { method: "POST", token });
      await refresh();
      setMsg(locale === "en" ? "Back to free plan (demo)." : "Повернено free-план (demo).");
    } catch {
      setMsg(t.common.error);
    } finally {
      setBusy(false);
    }
  }

  async function openPortal() {
    if (!token) return;
    setBusy(true);
    setMsg("");
    try {
      const r = await api<{ url?: string }>("/billing/portal", {
        method: "POST",
        token,
      });
      if (r.url) {
        window.location.href = r.url;
        return;
      }
      setMsg(t.common.error);
    } catch {
      setMsg(
        locale === "en"
          ? "Stripe portal unavailable — use demo downgrade or complete checkout first."
          : "Stripe portal недоступний — demo-зняття або спочатку Checkout.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (flagsLoading) {
    return <PageLoading label={t.common.loading} />;
  }

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-black">{t.nav.pricing}</h1>
        <p className="font-bold text-ink-muted">{t.pricing.subtitle}</p>
        {user && (
          <p className="text-sm">
            <Badge
              tone={user.plan === "premium" ? "grape" : "muted"}
              // current plan for AT
            >
              {t.pricing.currentPlan}: {user.plan}
              {user.planExpiresAt
                ? ` · ${new Date(user.planExpiresAt).toLocaleDateString(
                    locale === "en" ? "en-US" : "uk-UA",
                  )}`
                : ""}
            </Badge>
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-4">
          <CardTitle>{t.pricing.free}</CardTitle>
          <p className="text-3xl font-black">0 ₴</p>
          <ul className="space-y-2 text-ink-muted font-bold">
            {t.pricing.freeFeatures.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          {user?.plan === "free" && (
            <p className="font-bold text-brand-dark">{t.pricing.currentPlan}</p>
          )}
        </Card>

        <Card className="space-y-4 border-brand/40 bg-gradient-to-b from-brand-soft/40 to-white dark:to-slate-950">
          <div className="flex items-center gap-2">
            <CardTitle className="text-brand-dark">{t.pricing.premium}</CardTitle>
            <Badge tone="grape">★</Badge>
          </div>
          <p className="text-3xl font-black">
            {stripeConfigured ? (
              <>
                Premium{" "}
                <span className="text-base font-bold text-ink-muted">
                  {locale === "en" ? "via Stripe" : "через Stripe"}
                </span>
              </>
            ) : devBilling ? (
              <>
                Demo{" "}
                <span className="text-base font-bold text-ink-muted">/ Stripe ready</span>
              </>
            ) : (
              <>
                Premium{" "}
                <span className="text-base font-bold text-ink-muted">
                  {locale === "en" ? "(billing soon)" : "(скоро)"}
                </span>
              </>
            )}
          </p>
          <ul className="space-y-2 text-ink-muted font-bold">
            {t.pricing.premiumFeatures.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          {user?.plan === "premium" ? (
            <div className="space-y-2">
              <Button
                variant="primary"
                fullWidth
                disabled={busy}
                onClick={() => void openPortal()}
              >
                {t.pricing.manage}
              </Button>
              {devBilling && (
                <Button
                  variant="secondary"
                  fullWidth
                  disabled={busy}
                  onClick={() => void downgrade()}
                >
                  {locale === "en" ? "Remove Premium (demo)" : "Зняти Premium (demo)"}
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Button
                variant="primary"
                fullWidth
                disabled={busy}
                onClick={() => void upgrade()}
              >
                {t.pricing.upgrade}
              </Button>
              {devBilling && (
                <>
                  <Button
                    variant="secondary"
                    fullWidth
                    disabled={busy}
                    onClick={() => void startTrial()}
                  >
                    🎁 {t.pricing.trial}
                  </Button>
                  <CardDescription>{t.pricing.trialHint}</CardDescription>
                </>
              )}
              <Link
                href="/family"
                className="block text-center text-sm font-bold text-sky hover:underline"
              >
                {locale === "en" ? "Family plan (seats)" : "Сімейний план (місця)"} →
              </Link>
            </div>
          )}
        </Card>
      </div>

      <Card className="space-y-3">
        <CardTitle>{t.pricing.compareTitle}</CardTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-bold">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="py-2 pr-4">{locale === "en" ? "Feature" : "Функція"}</th>
                <th className="py-2 pr-4">{t.pricing.free}</th>
                <th className="py-2">{t.pricing.premium}</th>
              </tr>
            </thead>
            <tbody className="text-ink-muted">
              <tr className="border-b border-slate-50 dark:border-slate-900">
                <td className="py-2 pr-4">{t.pricing.featureLessons}</td>
                <td className="py-2 pr-4">{matrix.freeLessonsPerCourse}</td>
                <td className="py-2">{t.pricing.unlimited}</td>
              </tr>
              <tr className="border-b border-slate-50 dark:border-slate-900">
                <td className="py-2 pr-4">{t.pricing.featureHearts}</td>
                <td className="py-2 pr-4">
                  {matrix.freeHearts} / {matrix.heartRegenMinutes}m
                </td>
                <td className="py-2">{t.pricing.unlimited}</td>
              </tr>
              <tr className="border-b border-slate-50 dark:border-slate-900">
                <td className="py-2 pr-4">{t.pricing.featureChess}</td>
                <td className="py-2 pr-4">{matrix.freeRatedChessPerDay}</td>
                <td className="py-2">{t.pricing.unlimited}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">{t.pricing.featureHints}</td>
                <td className="py-2 pr-4">{matrix.freeHintsPerDay}</td>
                <td className="py-2">{t.pricing.unlimited}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {msg && (
        <p className="text-center font-bold text-sky" role="status">
          {msg}
        </p>
      )}
    </div>
  );
}
