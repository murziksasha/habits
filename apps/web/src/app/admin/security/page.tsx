"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/admin-api";
import { PageLoading } from "@/components/page-loading";

export default function AdminSecurityPage() {
  const { token, refresh } = useAuth();
  const { t } = useLocale();
  const [status, setStatus] = useState<{
    totpEnabled: boolean;
    mfaVerified: boolean;
    mfaEnforced: boolean;
    backupCodesRemaining?: number;
  } | null>(null);
  const [secret, setSecret] = useState("");
  const [otpauthUrl, setOtpauthUrl] = useState("");
  const [code, setCode] = useState("");
  const [regenCode, setRegenCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);
  const [msg, setMsg] = useState("");

  async function load() {
    if (!token) return;
    const s = await api<NonNullable<typeof status>>("/auth/mfa/status", { token });
    setStatus(s);
  }

  useEffect(() => {
    if (token) void load();
  }, [token]);

  async function setup() {
    if (!token) return;
    const d = await api<{ secret: string; otpauthUrl: string }>("/auth/mfa/totp/setup", {
      method: "POST",
      token,
    });
    setSecret(d.secret);
    setOtpauthUrl(d.otpauthUrl);
    setMsg("Scan QR / enter secret in Authenticator, then confirm code");
  }

  async function confirm() {
    if (!token) return;
    const d = await api<{ ok: boolean; backupCodes?: string[] }>("/auth/mfa/totp/confirm", {
      method: "POST",
      token,
      body: { code },
    });
    setMsg("2FA enabled — save backup codes now (shown once)");
    setBackupCodes(d.backupCodes ?? null);
    setSecret("");
    setCode("");
    await refresh();
    await load();
  }

  async function regenerateBackups() {
    if (!token) return;
    try {
      const d = await api<{ backupCodes: string[] }>("/auth/mfa/backup-codes/regenerate", {
        method: "POST",
        token,
        body: { code: regenCode },
      });
      setBackupCodes(d.backupCodes);
      setRegenCode("");
      setMsg("New backup codes generated — store offline");
      await load();
    } catch (e) {
      setMsg((e as Error).message);
    }
  }

  if (!status) {
    return <PageLoading label={t.common.loading} />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">🔐 {t.admin.security}</h1>
      <div className="card space-y-2">
        <p className="font-bold">
          TOTP: {status?.totpEnabled ? "enabled" : "disabled"} · Session MFA:{" "}
          {status?.mfaVerified ? "ok" : "—"} · Enforce:{" "}
          {status?.mfaEnforced ? "yes" : "no (dev)"} · Backups left:{" "}
          {status?.backupCodesRemaining ?? "—"}
        </p>
        <p className="text-sm text-ink-muted">{t.admin.mfaEnrollHint}</p>
      </div>

      {!status?.totpEnabled && (
        <section className="card space-y-3">
          <h2 className="text-xl font-black">{t.admin.mfaSetup}</h2>
          <button type="button" className="btn-primary" onClick={() => void setup()}>
            Generate secret
          </button>
          {secret && (
            <>
              <p className="break-all font-mono text-xs">{secret}</p>
              {otpauthUrl && (
                <p className="break-all text-xs text-ink-muted">{otpauthUrl}</p>
              )}
              <input
                className="input font-mono"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t.admin.mfaCode}
              />
              <button type="button" className="btn-primary" onClick={() => void confirm()}>
                Confirm & enable
              </button>
            </>
          )}
        </section>
      )}

      {status?.totpEnabled && (
        <section className="card space-y-3">
          <h2 className="text-xl font-black">Backup codes</h2>
          <p className="text-sm text-ink-muted">
            One-time codes if you lose the authenticator. Regenerating invalidates old codes.
            Enter a current TOTP code to regenerate.
          </p>
          <input
            className="input font-mono"
            value={regenCode}
            onChange={(e) => setRegenCode(e.target.value)}
            placeholder="TOTP code"
          />
          <button
            type="button"
            className="btn-secondary"
            onClick={() => void regenerateBackups()}
          >
            Regenerate backup codes
          </button>
        </section>
      )}

      {backupCodes && backupCodes.length > 0 && (
        <section className="card space-y-2 border-2 border-amber-300">
          <h2 className="text-lg font-black text-amber-800 dark:text-amber-200">
            Save these codes now
          </h2>
          <ul className="grid gap-1 font-mono text-sm sm:grid-cols-2">
            {backupCodes.map((c) => (
              <li key={c} className="rounded-lg bg-slate-50 px-2 py-1 dark:bg-slate-900">
                {c}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn-secondary !py-1 text-xs"
            onClick={() => {
              void navigator.clipboard.writeText(backupCodes.join("\n"));
              setMsg("Copied to clipboard");
            }}
          >
            Copy all
          </button>
        </section>
      )}

      <SessionsPanel token={token} />

      {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
    </div>
  );
}

function SessionsPanel({ token }: { token: string | null }) {
  const [sessions, setSessions] = useState<
    {
      id: string;
      createdAt: string;
      expiresAt: string;
      mfaVerifiedAt: string | null;
      current: boolean;
    }[]
  >([]);
  const [msg, setMsg] = useState("");

  async function load() {
    if (!token) return;
    const d = await api<{ sessions: typeof sessions }>("/auth/sessions", { token });
    setSessions(d.sessions);
  }

  useEffect(() => {
    if (token) void load();
  }, [token]);

  async function revoke(id: string) {
    if (!token) return;
    await api(`/auth/sessions/${id}`, { method: "DELETE", token });
    setMsg("Session revoked");
    await load();
  }

  async function revokeOthers() {
    if (!token) return;
    const r = await api<{ revoked: number }>("/auth/sessions/revoke-others", {
      method: "POST",
      token,
    });
    setMsg(`Revoked ${r.revoked} other session(s)`);
    await load();
  }

  return (
    <section className="card space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-black">Active sessions</h2>
        <button type="button" className="btn-secondary !py-1 text-xs" onClick={() => void revokeOthers()}>
          Revoke others
        </button>
      </div>
      {msg && <p className="text-xs font-bold text-sky">{msg}</p>}
      <ul className="space-y-2 text-sm">
        {sessions.map((s) => (
          <li
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 px-3 py-2 dark:border-slate-800"
          >
            <div>
              <p className="font-bold">
                {s.current ? "● Current" : "○ Other"} · MFA:{" "}
                {s.mfaVerifiedAt ? "yes" : "—"}
              </p>
              <p className="text-xs text-ink-muted">
                created {new Date(s.createdAt).toLocaleString()} · expires{" "}
                {new Date(s.expiresAt).toLocaleString()}
              </p>
            </div>
            {!s.current && (
              <button
                type="button"
                className="text-xs font-bold text-red-500"
                onClick={() => void revoke(s.id)}
              >
                Revoke
              </button>
            )}
          </li>
        ))}
        {sessions.length === 0 && (
          <li className="text-ink-muted text-sm">No sessions</li>
        )}
      </ul>
    </section>
  );
}
