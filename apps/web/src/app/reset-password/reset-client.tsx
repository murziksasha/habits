"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

function ResetForm() {
  const { t } = useLocale();
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api("/auth/reset-password", {
        method: "POST",
        body: { token, password },
      });
      setOk(true);
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Посилання недійсне або застаріле");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="card mx-auto max-w-md text-center space-y-3">
        <p className="font-bold">Немає токена скидання</p>
        <Link href="/forgot-password" className="btn-primary">
          {t.password.forgotTitle}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md card space-y-4">
      <h1 className="text-2xl font-black">{t.password.resetTitle}</h1>
      {ok ? (
        <p className="font-bold text-brand-dark">{t.password.success}</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">{t.password.newPassword}</label>
            <input
              className="input"
              type="password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm font-bold text-red-500">{error}</p>}
          <button className="btn-primary w-full" disabled={loading}>
            {t.password.submitReset}
          </button>
        </form>
      )}
    </div>
  );
}

export function ResetPasswordClient() {
  const { t } = useLocale();
  return (
    <Suspense fallback={<p>{t.common.loading}</p>}>
      <ResetForm />
    </Suspense>
  );
}
