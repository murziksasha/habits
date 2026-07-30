"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

const REGISTER_NOTICE_KEY = "eduforge_verify_notice";

export function EmailVerifyBanner() {
  const { user, refresh } = useAuth();
  const { t } = useLocale();
  const pathname = usePathname();
  const [justRegistered, setJustRegistered] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(REGISTER_NOTICE_KEY) === "1") {
        setJustRegistered(true);
        sessionStorage.removeItem(REGISTER_NOTICE_KEY);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Only when API explicitly reports unverified (missing field = treat as verified / legacy)
  if (!user || user.emailVerified !== false) return null;
  // Hide on verify page itself
  if (pathname?.startsWith("/verify-email")) return null;

  async function resend() {
    if (!user?.email) return;
    setBusy(true);
    setMsg("");
    try {
      await api("/auth/resend-verification", {
        method: "POST",
        body: { email: user.email },
      });
      setMsg(t.auth.resendOk);
      await refresh();
    } catch {
      setMsg(t.common.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="mb-6 rounded-2xl border border-amber-400/50 bg-amber-50 px-4 py-3 text-sm dark:border-amber-500/40 dark:bg-amber-950/40"
      role="status"
    >
      {justRegistered && (
        <p className="mb-1 text-base font-black text-ink">{t.auth.registerNoticeTitle}</p>
      )}
      <p className="font-bold text-ink">
        {justRegistered ? t.auth.registerNoticeBody : t.auth.unverifiedBanner}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="btn-secondary !py-1.5 !px-3 text-xs"
          disabled={busy}
          onClick={() => void resend()}
        >
          {busy ? "…" : t.auth.resendVerification}
        </button>
        {msg && <span className="text-xs font-bold text-ink-muted">{msg}</span>}
      </div>
    </div>
  );
}

export { REGISTER_NOTICE_KEY };
