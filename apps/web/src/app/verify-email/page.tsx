"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

function VerifyEmailInner() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const { refresh } = useAuth();
  const [status, setStatus] = useState<"loading" | "ok" | "already" | "error" | "missing">(
    token ? "loading" : "missing",
  );

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    void (async () => {
      try {
        const data = await api<{ alreadyVerified?: boolean }>("/auth/verify-email", {
          method: "POST",
          body: { token },
        });
        if (cancelled) return;
        await refresh();
        setStatus(data.alreadyVerified ? "already" : "ok");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, refresh]);

  const title = UI.auth.verifyTitle;
  let body = UI.common.loading;
  if (status === "missing") body = UI.auth.verifyMissing;
  if (status === "ok") body = UI.auth.verifySuccess;
  if (status === "already") body = UI.auth.verifyAlready;
  if (status === "error") body = UI.auth.verifyError;

  return (
    <div className="mx-auto max-w-md card space-y-4">
      <h1 className="text-2xl font-black">{title}</h1>
      <p className="font-bold text-ink">{body}</p>
      {(status === "ok" || status === "already") && (
        <Link href="/dashboard" className="btn-primary inline-flex w-full justify-center">
          {UI.auth.verifyCtaDashboard}
        </Link>
      )}
      {(status === "error" || status === "missing") && (
        <div className="flex flex-col gap-2">
          <Link href="/login" className="btn-primary inline-flex w-full justify-center">
            {UI.auth.verifyCtaLogin}
          </Link>
          <Link href="/register" className="text-center text-sm font-bold text-sky">
            {UI.auth.registerTitle}
          </Link>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p>{UI.common.loading}</p>}>
      <VerifyEmailInner />
    </Suspense>
  );
}
