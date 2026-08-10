"use client";

import { useEffect, useMemo, useState } from "react";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { StepUpModal } from "@/components/admin/step-up-modal";
import { adminApi } from "@/lib/admin-api";
import { PageLoading } from "@/components/page-loading";

type Row = {
  id: string;
  email: string;
  role: string;
  plan: string;
  displayName: string | null;
  globalXp: number | null;
  globalLevel: number | null;
  createdAt?: string;
};

export function AdminUsersClient() {
  const { user, token, loading } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [msg, setMsg] = useState("");
  const [stepUpOpen, setStepUpOpen] = useState(false);
  const [pending, setPending] = useState<null | (() => Promise<void>)>(null);

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
        r.role.includes(s) ||
        r.plan.includes(s),
    );
  }, [rows, q]);

  async function patch(id: string, body: { role?: string; plan?: string }) {
    if (!token) return;
    try {
      await adminApi(`/admin/users/${id}`, { method: "PATCH", token, body });
      await load();
      setMsg("");
    } catch (e) {
      if ((e as Error & { data?: { error?: string } }).data?.error === "step_up_required") {
        setPending(() => async () => {
          await adminApi(`/admin/users/${id}`, { method: "PATCH", token, body });
          await load();
        });
        setStepUpOpen(true);
        return;
      }
      setMsg((e as Error).message);
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
        placeholder="Search email, name, role, plan…"
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
              <th className="pb-2">{UI.admin.plan}</th>
              <th className="pb-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
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
                <td className="py-2">
                  <select
                    className="rounded-lg border px-2 py-1 dark:bg-slate-900"
                    value={r.plan}
                    onChange={(e) => void patch(r.id, { plan: e.target.value })}
                  >
                    <option value="free">free</option>
                    <option value="premium">premium</option>
                  </select>
                </td>
                <td className="py-2 text-xs text-ink-muted">
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-ink-muted">
          Showing {filtered.length} / {rows.length}
        </p>
      </div>
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
