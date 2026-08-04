"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { useLocale } from "@/lib/locale-context";
import { useAuth } from "@/lib/auth-context";

function VerifyBody() {
  const params = useSearchParams();
  const router = useRouter();
  const { locale } = useLocale();
  const { refresh } = useAuth();
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      return;
    }
    void api("/auth/verify-email", { method: "POST", body: { token } })
      .then(async () => {
        setStatus("ok");
        await refresh().catch(() => undefined);
        window.setTimeout(() => router.replace("/dashboard"), 1500);
      })
      .catch(() => setStatus("error"));
  }, [params, refresh, router]);

  const uk = locale !== "en";

  return (
    <div className="mx-auto max-w-md space-y-4 card text-center">
      <h1 className="text-2xl font-black">
        {uk ? "Підтвердження email" : "Email confirmation"}
      </h1>
      {status === "loading" && (
        <p className="font-bold text-ink-muted">{uk ? "Перевіряємо…" : "Verifying…"}</p>
      )}
      {status === "ok" && (
        <p className="font-bold text-brand-dark">
          {uk ? "Email підтверджено! Переходимо на дашборд…" : "Email verified! Redirecting…"}
        </p>
      )}
      {status === "error" && (
        <>
          <p className="font-bold text-red-600">
            {uk ? "Посилання недійсне або застаріле." : "Invalid or expired link."}
          </p>
          <Link href="/dashboard" className="btn-primary inline-flex">
            {uk ? "На дашборд" : "Dashboard"}
          </Link>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p className="card">…</p>}>
      <VerifyBody />
    </Suspense>
  );
}
