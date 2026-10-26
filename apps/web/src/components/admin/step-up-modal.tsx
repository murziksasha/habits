"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { adminApi, setStepUpToken } from "@/lib/admin-api";
import { useLocale } from "@/lib/locale-context";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function StepUpModal({ open, onClose, onSuccess }: Props) {
  const { token } = useAuth();
  const { t } = useLocale();
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setBusy(true);
    setErr("");
    try {
      const r = await adminApi<{ stepUpToken: string; expiresAt: string }>(
        "/auth/mfa/step-up",
        { method: "POST", token, body: { code }, stepUp: false },
      );
      setStepUpToken(r.stepUpToken, r.expiresAt);
      setCode("");
      onSuccess();
      onClose();
    } catch (e) {
      setErr((e as Error).message || t.common.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-3">
        <h2 className="text-xl font-black">{t.admin.stepUp}</h2>
        <p className="text-sm text-ink-muted">{t.admin.mfaCode} / backup</p>
        <input
          className="input font-mono tracking-widest"
          autoComplete="one-time-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="123456"
          required
        />
        {err && <p className="text-sm font-bold text-red-500">{err}</p>}
        <div className="flex gap-2">
          <button type="button" className="btn-secondary flex-1" onClick={onClose}>
            {t.common.back}
          </button>
          <button type="submit" className="btn-primary flex-1" disabled={busy}>
            OK
          </button>
        </div>
      </form>
    </div>
  );
}
