"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/admin-api";
import { PageLoading } from "@/components/page-loading";
import { Badge } from "@/components/ui";

export function AdminBillingClient() {
  const { token } = useAuth();
  const { t, locale } = useLocale();
  const [data, setData] = useState<{
    premium: number;
    users: number;
    expiringTrial7d: number;
    stripeConfigured: boolean;
  } | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!token) return;
    setDataLoading(true);
    void api<NonNullable<typeof data>>("/admin/overview/billing", { token })
      .then(setData)
      .catch(() => {
        setData(null);
        setErr(t.common.error);
      })
      .finally(() => setDataLoading(false));
  }, [token, t.common.error]);

  if (dataLoading) return <PageLoading label={t.common.loading} />;

  const cards = [
    {
      label: locale === "en" ? "Users" : "Користувачі",
      v: data?.users ?? "—",
    },
    {
      label: "Premium",
      v: data?.premium ?? "—",
    },
    {
      label: locale === "en" ? "Expiring 7d" : "Trial ≤7д",
      v: data?.expiringTrial7d ?? "—",
    },
    {
      label: "Stripe",
      v: data ? (data.stripeConfigured ? "on" : "off") : "—",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-3xl font-black">💳 {t.admin.billing}</h1>
        {data && (
          <Badge tone={data.stripeConfigured ? "brand" : "muted"}>
            Stripe {data.stripeConfigured ? "on" : "off"}
          </Badge>
        )}
      </div>
      {err && (
        <p className="text-sm font-bold text-red-500" role="alert">
          {err}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
        {cards.map((s) => (
          <div key={s.label} className="card" role="listitem">
            <p className="text-sm font-bold text-ink-muted">{s.label}</p>
            <p className="text-3xl font-black">{s.v}</p>
          </div>
        ))}
      </div>
      <p className="text-sm font-bold text-ink-muted">
        {locale === "en"
          ? "Read-only overview. Plan changes: Users module or Stripe Portal."
          : "Лише огляд. Зміна планів: модуль Users або Stripe Portal."}
      </p>
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/users" className="btn-secondary min-h-11 !py-2 text-sm">
          → {t.admin.users}
        </Link>
        <Link href="/pricing" className="btn-secondary min-h-11 !py-2 text-sm">
          → {t.nav.pricing}
        </Link>
      </div>
    </div>
  );
}
