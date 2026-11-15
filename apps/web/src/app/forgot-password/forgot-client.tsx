"use client";

import Link from "next/link";
import { useState } from "react";
import { UI } from "@eduforge/shared";
import { api } from "@/lib/api";

export function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setResetUrl("");
    try {
      const d = await api<{ message?: string; resetUrl?: string }>("/auth/forgot-password", {
        method: "POST",
        body: { email },
      });
      setMsg(d.message ?? UI.password.sent);
      if (d.resetUrl) setResetUrl(d.resetUrl);
    } catch {
      setMsg(UI.common.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md card space-y-4">
      <h1 className="text-2xl font-black">{UI.password.forgotTitle}</h1>
      <p className="text-sm text-ink-muted">{UI.password.forgotHint}</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label">{UI.auth.email}</label>
          <input
            className="input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn-primary w-full" disabled={loading}>
          {UI.password.sendLink}
        </button>
      </form>
      {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
      {resetUrl && (
        <div className="rounded-2xl bg-slate-100 p-3 text-sm break-all">
          <p className="font-bold mb-1">Dev reset link:</p>
          <Link href={resetUrl} className="text-sky font-semibold underline">
            {resetUrl}
          </Link>
        </div>
      )}
      <p className="text-center text-sm">
        <Link href="/login" className="font-bold text-sky">
          {UI.nav.login}
        </Link>
      </p>
    </div>
  );
}
