"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

export function EmailVerifyBanner() {
  const { user, token, refresh } = useAuth();
  const { locale } = useLocale();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  if (!user || user.emailVerified !== false) return null;
  // emailVerified undefined (old sessions) — treat as verified to avoid noise
  if (user.emailVerified == null) return null;

  async function resend() {
    if (!token) return;
    setBusy(true);
    setMsg(null);
    try {
      const r = await api<{ ok?: boolean; verifyUrl?: string; alreadyVerified?: boolean }>(
        "/auth/resend-verification",
        { method: "POST", token },
      );
      if (r.alreadyVerified) {
        await refresh();
        setMsg(locale === "en" ? "Already verified" : "Вже підтверджено");
      } else {
        setMsg(
          r.verifyUrl
            ? locale === "en"
              ? `Dev link: ${r.verifyUrl}`
              : `Dev: ${r.verifyUrl}`
            : locale === "en"
              ? "Check your inbox"
              : "Перевірте пошту",
        );
      }
    } catch {
      setMsg(locale === "en" ? "Could not resend" : "Не вдалося надіслати");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mb-4 rounded-2xl border-2 border-sun/40 bg-sun/10 px-4 py-3 text-sm font-bold">
      <p>
        {locale === "en"
          ? "Confirm your email to secure the account and unlock parent/school features."
          : "Підтвердіть email, щоб захистити акаунт і відкрити функції батьків/школи."}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="btn-secondary !py-1.5 !px-3 text-xs"
          disabled={busy}
          onClick={() => void resend()}
        >
          {locale === "en" ? "Resend link" : "Надіслати знову"}
        </button>
        {msg && <span className="text-xs text-ink-muted break-all">{msg}</span>}
      </div>
    </div>
  );
}
