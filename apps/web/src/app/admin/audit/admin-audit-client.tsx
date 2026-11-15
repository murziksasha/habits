"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";

type Entry = {
  id: string;
  actorUserId: string;
  action: string;
  targetType: string;
  targetId: string;
  meta: Record<string, unknown>;
  createdAt: string;
};

export function AdminAuditClient() {
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.replace("/dashboard");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token || user?.role !== "admin") return;
    void api<{ entries: Entry[] }>("/admin/audit", { token })
      .then((d) => setEntries(d.entries ?? []))
      .catch(() => setEntries([]));
  }, [token, user]);

  if (loading || !user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm font-bold text-ink-muted">
          ← Admin
        </Link>
        <h1 className="text-3xl font-black">📋 Audit log</h1>
        <p className="text-sm font-bold text-ink-muted">Recent admin actions</p>
      </div>
      <div className="space-y-2">
        {entries.length === 0 && (
          <p className="text-ink-muted font-bold">No audit entries yet</p>
        )}
        {entries.map((e) => (
          <div key={e.id} className="card text-sm space-y-1">
            <div className="flex flex-wrap justify-between gap-2 font-bold">
              <span>
                {e.action}
                {e.targetType ? ` · ${e.targetType}` : ""}
                {e.targetId ? ` · ${e.targetId.slice(0, 8)}…` : ""}
              </span>
              <span className="text-xs text-ink-muted">
                {new Date(e.createdAt).toLocaleString()}
              </span>
            </div>
            {e.meta && Object.keys(e.meta).length > 0 && (
              <pre className="text-xs text-ink-muted overflow-x-auto">
                {JSON.stringify(e.meta)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
