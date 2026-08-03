"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/admin-api";

export default function AdminBillingPage() {
  const { token } = useAuth();
  const { t } = useLocale();
  const [data, setData] = useState<{
    premium: number;
    users: number;
    expiringTrial7d: number;
    stripeConfigured: boolean;
  } | null>(null);

  useEffect(() => {
    if (!token) return;
    void api<NonNullable<typeof data>>("/admin/overview/billing", { token }).then(setData);
  }, [token]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">💳 {t.admin.billing}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Users", v: data?.users ?? "…" },
          { label: "Premium", v: data?.premium ?? "…" },
          { label: "Expiring 7d", v: data?.expiringTrial7d ?? "…" },
          { label: "Stripe", v: data ? (data.stripeConfigured ? "on" : "off") : "…" },
        ].map((s) => (
          <div key={s.label} className="card">
            <p className="text-sm font-bold text-ink-muted">{s.label}</p>
            <p className="text-3xl font-black">{s.v}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-ink-muted">Read-only overview. Plan changes: Users module.</p>
    </div>
  );
}
