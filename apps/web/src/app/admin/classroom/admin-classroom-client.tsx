"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/admin-api";

export function AdminClassroomClient() {
  const { token } = useAuth();
  const { t } = useLocale();
  const [data, setData] = useState<{
    organizations: number;
    classes: number;
    assignmentSubmissions: number;
  } | null>(null);

  useEffect(() => {
    if (!token) return;
    void api<NonNullable<typeof data>>("/admin/overview/classroom", { token }).then(setData);
  }, [token]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">🏫 {t.admin.classroom}</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Organizations", v: data?.organizations ?? "…" },
          { label: "Classes", v: data?.classes ?? "…" },
          { label: "Submissions", v: data?.assignmentSubmissions ?? "…" },
        ].map((s) => (
          <div key={s.label} className="card">
            <p className="text-sm font-bold text-ink-muted">{s.label}</p>
            <p className="text-3xl font-black">{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
