"use client";

import { useEffect, useState } from "react";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const { user, token, refresh } = useAuth();
  const router = useRouter();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!token) return;
    void api("/auth/onboarding/complete", {
      method: "POST",
      token,
      body: { key: "exploredPricing" },
    }).catch(() => undefined);
  }, [token]);

  async function upgrade() {
    if (!token) {
      router.push("/register");
      return;
    }
    try {
      const checkout = await api<{ url?: string; error?: string }>("/billing/checkout", {
        method: "POST",
        token,
        body: { interval: "month" },
      });
      if (checkout.url) {
        window.location.href = checkout.url;
        return;
      }
    } catch {
      // fall through to dev upgrade
    }
    try {
      await api("/billing/dev-upgrade", { method: "POST", token });
      await refresh();
      setMsg("Premium активовано (demo-режим без Stripe).");
    } catch {
      setMsg("Не вдалося оновити план");
    }
  }

  async function startTrial() {
    if (!token) {
      router.push("/register");
      return;
    }
    try {
      const r = await api<{ kind?: string; planExpiresAt?: string }>("/billing/trial", {
        method: "POST",
        token,
      });
      await refresh();
      if (r.kind === "already_premium") {
        setMsg("У вас уже Premium.");
      } else {
        setMsg(
          `Trial 7 днів активовано${r.planExpiresAt ? ` до ${new Date(r.planExpiresAt).toLocaleDateString()}` : ""}.`,
        );
      }
    } catch {
      setMsg("Не вдалося стартувати trial");
    }
  }

  async function downgrade() {
    if (!token) return;
    await api("/billing/dev-downgrade", { method: "POST", token });
    await refresh();
    setMsg("Повернено free-план (demo).");
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-black">{UI.nav.pricing}</h1>
        <p className="mt-2 text-ink-muted">Freemium + Premium підписка</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card space-y-4">
          <h2 className="text-2xl font-black">{UI.pricing.free}</h2>
          <p className="text-3xl font-black">0 ₴</p>
          <ul className="space-y-2 text-ink-muted">
            {UI.pricing.freeFeatures.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          {user?.plan === "free" && (
            <p className="font-bold text-brand-dark">{UI.pricing.currentPlan}</p>
          )}
        </div>
        <div className="card space-y-4 border-brand/40 bg-gradient-to-b from-brand-soft/40 to-white">
          <h2 className="text-2xl font-black text-brand-dark">{UI.pricing.premium}</h2>
          <p className="text-3xl font-black">
            Demo <span className="text-base font-bold text-ink-muted">/ Stripe ready</span>
          </p>
          <ul className="space-y-2 text-ink-muted">
            {UI.pricing.premiumFeatures.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          {user?.plan === "premium" ? (
            <button className="btn-secondary w-full" onClick={() => void downgrade()}>
              Зняти Premium (demo)
            </button>
          ) : (
            <div className="space-y-2">
              <button className="btn-primary w-full" onClick={() => void upgrade()}>
                {UI.pricing.upgrade}
              </button>
              <button className="btn-secondary w-full" onClick={() => void startTrial()}>
                🎁 Trial 7 днів (demo)
              </button>
            </div>
          )}
        </div>
      </div>
      {msg && <p className="text-center font-bold text-sky">{msg}</p>}
    </div>
  );
}
