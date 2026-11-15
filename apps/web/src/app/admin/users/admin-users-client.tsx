"use client";

import { useEffect, useMemo, useState } from "react";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { StepUpModal } from "@/components/admin/step-up-modal";
import { adminApi, setStepUpToken } from "@/lib/admin-api";
import { PageLoading } from "@/components/page-loading";

type Row = {
  id: string;
  email: string;
  role: string;
  displayName: string | null;
  globalXp: number | null;
  globalLevel: number | null;
  createdAt?: string;
  totpEnabled?: boolean;
  mfaExempt?: boolean;
};

export function AdminUsersClient() {
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState("");
  const [stepUpOpen, setStepUpOpen] = useState(false);
  const [pending, setPending] = useState<null | (() => Promise<void>)>(null);

  // God-mode action state
  const [passwordTarget, setPasswordTarget] = useState<Row | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [modalErr, setModalErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    if (!token) return;
    const d = await api<{ users: Row[] }>("/admin/users", { token });
    setRows(d.users);
  }

  useEffect(() => {
    if (token && user?.role === "admin") void load();
  }, [token, user]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter(
      (r) =>
        r.email.toLowerCase().includes(s) ||
        (r.displayName ?? "").toLowerCase().includes(s) ||
        r.role.includes(s),
    );
  }, [rows, q]);

  async function executeWithStepUp(action: () => Promise<void>) {
    if (!token) return;
    try {
      await action();
      await load();
      setMsg("");
    } catch (e) {
      const err = e as Error & { data?: { error?: string } };
      if (err.data?.error === "step_up_required") {
        if (!user?.totpEnabled) {
          try {
            const r = await adminApi<{ stepUpToken: string; expiresAt: string }>(
              "/auth/mfa/step-up",
              { method: "POST", token, body: { code: "" }, stepUp: false },
            );
            setStepUpToken(r.stepUpToken, r.expiresAt);
            await action();
            await load();
            setMsg("");
            return;
          } catch {
            // fall through to modal
          }
        }
        setPending(() => async () => {
          await action();
          await load();
        });
        setStepUpOpen(true);
        return;
      }
      setMsg(err.message || t.common.error);
      throw e;
    }
  }

  async function patch(id: string, body: { role?: string }) {
    try {
      await executeWithStepUp(async () => {
        await adminApi(`/admin/users/${id}`, { method: "PATCH", token, body });
      });
    } catch {
      // msg handled in executeWithStepUp
    }
  }

  async function handleResetMfa(id: string) {
    try {
      await executeWithStepUp(async () => {
        await adminApi(`/admin/users/${id}/reset-mfa`, { method: "POST", token });
      });
    } catch {
      // msg handled in executeWithStepUp
    }
  }

  async function handleRequireMfa(id: string) {
    try {
      await executeWithStepUp(async () => {
        await adminApi(`/admin/users/${id}/require-mfa`, { method: "POST", token });
      });
    } catch {
      // msg handled in executeWithStepUp
    }
  }

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!passwordTarget || !newPassword) return;
    setBusy(true);
    setModalErr("");
    try {
      const targetId = passwordTarget.id;
      const pwd = newPassword;
      await executeWithStepUp(async () => {
        await adminApi(`/admin/users/${targetId}/password`, {
          method: "POST",
          token,
          body: { password: pwd },
        });
      });
      setPasswordTarget(null);
      setNewPassword("");
    } catch (e) {
      setModalErr((e as Error).message || t.common.error);
    } finally {
      setBusy(false);
    }
  }

  async function submitDelete(e: React.FormEvent) {
    e.preventDefault();
    if (!deleteTarget) return;
    setBusy(true);
    setModalErr("");
    try {
      const targetId = deleteTarget.id;
      const cEmail = confirmEmail.trim();
      await executeWithStepUp(async () => {
        await adminApi(`/admin/users/${targetId}`, {
          method: "DELETE",
          token,
          body: { confirmEmail: cEmail },
        });
      });
      setDeleteTarget(null);
      setConfirmEmail("");
    } catch (e) {
      setModalErr((e as Error).message || t.common.error);
    } finally {
      setBusy(false);
    }
  }

  if (loading || user?.role !== "admin") {
    return <PageLoading label={UI.common.loading} />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">{UI.admin.users}</h1>
      {msg && <p className="text-sm font-bold text-red-500">{msg}</p>}
      <input
        className="input max-w-md"
        placeholder="Search email, name, role…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-ink-muted">
              <th className="pb-2">Email</th>
              <th className="pb-2">Ім&apos;я</th>
              <th className="pb-2">XP</th>
              <th className="pb-2">{UI.admin.role}</th>
              <th className="pb-2">Created</th>
              <th className="pb-2">{t.admin.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const isSelf = r.id === user?.id;
              return (
                <tr key={r.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-2 font-mono text-xs">{r.email}</td>
                  <td className="py-2 font-bold">{r.displayName ?? "—"}</td>
                  <td className="py-2">
                    {r.globalXp ?? 0} (L{r.globalLevel ?? 1})
                  </td>
                  <td className="py-2">
                    <select
                      className="rounded-lg border px-2 py-1 dark:bg-slate-900"
                      value={r.role}
                      onChange={(e) => void patch(r.id, { role: e.target.value })}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="py-2 text-xs text-ink-muted">
                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="py-2">
                    {isSelf ? (
                      <span className="text-xs text-ink-muted">—</span>
                    ) : (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          className="btn-secondary px-2 py-1 text-xs"
                          onClick={() => {
                            setPasswordTarget(r);
                            setNewPassword("");
                            setModalErr("");
                          }}
                        >
                          {t.admin.setPassword}
                        </button>
                        {r.totpEnabled && (
                          <button
                            type="button"
                            className="btn-secondary px-2 py-1 text-xs"
                            onClick={() => void handleResetMfa(r.id)}
                          >
                            {t.admin.turn2faOff}
                          </button>
                        )}
                        {r.role === "admin" && r.mfaExempt && (
                          <button
                            type="button"
                            className="btn-secondary px-2 py-1 text-xs"
                            onClick={() => void handleRequireMfa(r.id)}
                          >
                            {t.admin.require2fa}
                          </button>
                        )}
                        <button
                          type="button"
                          className="rounded-lg border border-red-200 px-2 py-1 text-xs font-bold text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/30"
                          onClick={() => {
                            setDeleteTarget(r);
                            setConfirmEmail("");
                            setModalErr("");
                          }}
                        >
                          {t.admin.deleteUser}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-ink-muted">
          Showing {filtered.length} / {rows.length}
        </p>
      </div>

      {/* Set Password Modal */}
      {passwordTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={submitPassword} className="card w-full max-w-sm space-y-3">
            <h2 className="text-xl font-black">{t.admin.setPassword}</h2>
            <p className="font-mono text-xs text-ink-muted">{passwordTarget.email}</p>
            <p className="text-xs text-ink-muted">{t.admin.passwordHint}</p>
            <input
              type="password"
              className="input text-sm"
              placeholder={t.admin.newPassword}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={8}
              maxLength={128}
              required
              autoFocus
            />
            {modalErr && <p className="text-sm font-bold text-red-500">{modalErr}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="btn-secondary"
                disabled={busy}
                onClick={() => {
                  setPasswordTarget(null);
                  setNewPassword("");
                  setModalErr("");
                }}
              >
                {t.common.cancel}
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={busy || !newPassword}
              >
                {t.common.save}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={submitDelete} className="card w-full max-w-sm space-y-3">
            <h2 className="text-xl font-black text-red-600">{t.admin.deleteUserTitle}</h2>
            <p className="text-xs text-ink-muted">{t.admin.deleteUserWarning}</p>
            <p className="text-xs font-semibold">
              {t.admin.deleteConfirmHint}{" "}
              <span className="font-mono font-bold text-ink">{deleteTarget.email}</span>
            </p>
            <input
              type="text"
              className="input font-mono text-xs"
              placeholder={deleteTarget.email}
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
              autoFocus
            />
            {modalErr && <p className="text-sm font-bold text-red-500">{modalErr}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="btn-secondary"
                disabled={busy}
                onClick={() => {
                  setDeleteTarget(null);
                  setConfirmEmail("");
                  setModalErr("");
                }}
              >
                {t.common.cancel}
              </button>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
                disabled={
                  busy ||
                  confirmEmail.trim().toLowerCase() !== deleteTarget.email.toLowerCase()
                }
              >
                {t.admin.deleteUser}
              </button>
            </div>
          </form>
        </div>
      )}

      <StepUpModal
        open={stepUpOpen}
        onClose={() => setStepUpOpen(false)}
        onSuccess={() => {
          if (pending) void pending().then(() => setPending(null));
        }}
      />
    </div>
  );
}
