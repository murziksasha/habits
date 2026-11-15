"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";

type Row = {
  id: string;
  userId: string;
  category: string;
  message: string;
  pagePath: string;
  status: string;
  adminNote: string | null;
  createdAt: string;
  email: string;
  displayName: string | null;
};

const STATUSES = ["new", "triaged", "done", "wontfix"] as const;

export function AdminFeedbackClient() {
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [filter, setFilter] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.replace("/dashboard");
  }, [loading, user, router]);

  async function load() {
    if (!token) return;
    const q = filter ? `?status=${filter}` : "";
    const d = await api<{ feedback: Row[] }>(`/feedback/admin${q}`, { token });
    setRows(d.feedback ?? []);
  }

  useEffect(() => {
    if (token && user?.role === "admin") void load().catch(() => setRows([]));
  }, [token, user, filter]);

  async function patch(id: string, status: string) {
    if (!token) return;
    await api(`/feedback/admin/${id}`, {
      method: "PATCH",
      token,
      body: { status },
    });
    setMsg("OK");
    await load();
  }

  if (loading || !user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin" className="text-sm font-bold text-ink-muted">
            ← Admin
          </Link>
          <h1 className="text-3xl font-black">💬 {t.feedback.title}</h1>
        </div>
        <select
          className="input !w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">all</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="card space-y-2">
            <div className="flex flex-wrap justify-between gap-2 text-sm font-bold">
              <span>
                {r.category} · {r.displayName ?? "—"} · {r.email}
              </span>
              <span className="text-ink-muted">
                {new Date(r.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-sm whitespace-pre-wrap">{r.message}</p>
            {r.pagePath && (
              <p className="text-xs font-mono text-ink-muted">{r.pagePath}</p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold">
                {t.feedback.status}: {r.status}
              </span>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="btn-secondary !py-1 !px-2 text-xs"
                  onClick={() => void patch(r.id, s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="text-ink-muted font-bold">{t.feedback.empty}</p>
        )}
      </div>
    </div>
  );
}
