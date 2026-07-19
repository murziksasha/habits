"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

type Row = {
  id: string;
  email: string;
  role: string;
  plan: string;
  displayName: string | null;
  globalXp: number | null;
  globalLevel: number | null;
};

export default function AdminUsersPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.replace("/dashboard");
  }, [loading, user, router]);

  async function load() {
    if (!token) return;
    const d = await api<{ users: Row[] }>("/admin/users", { token });
    setRows(d.users);
  }

  useEffect(() => {
    if (token && user?.role === "admin") void load();
  }, [token, user]);

  async function patch(id: string, body: { role?: string; plan?: string }) {
    if (!token) return;
    await api(`/admin/users/${id}`, { method: "PATCH", token, body });
    await load();
  }

  if (loading || user?.role !== "admin") return <p>{UI.common.loading}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black">{UI.admin.users}</h1>
        <Link href="/admin" className="btn-secondary !py-2">
          {UI.common.back}
        </Link>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-ink-muted">
              <th className="pb-2">Email</th>
              <th className="pb-2">Ім&apos;я</th>
              <th className="pb-2">XP</th>
              <th className="pb-2">{UI.admin.role}</th>
              <th className="pb-2">{UI.admin.plan}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="py-2 font-mono text-xs">{r.email}</td>
                <td className="py-2 font-bold">{r.displayName ?? "—"}</td>
                <td className="py-2">
                  {r.globalXp ?? 0} (L{r.globalLevel ?? 1})
                </td>
                <td className="py-2">
                  <select
                    className="rounded-lg border px-2 py-1"
                    value={r.role}
                    onChange={(e) => void patch(r.id, { role: e.target.value })}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="py-2">
                  <select
                    className="rounded-lg border px-2 py-1"
                    value={r.plan}
                    onChange={(e) => void patch(r.id, { plan: e.target.value })}
                  >
                    <option value="free">free</option>
                    <option value="premium">premium</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
