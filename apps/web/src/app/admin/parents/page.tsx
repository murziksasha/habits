"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/admin-api";
import { StepUpModal } from "@/components/admin/step-up-modal";
import { adminApi } from "@/lib/admin-api";

export default function AdminParentsPage() {
  const { token } = useAuth();
  const { t } = useLocale();
  const [data, setData] = useState<{
    activeLinks: number;
    pendingLinks: number;
    digestsLast7d: number;
  } | null>(null);
  const [msg, setMsg] = useState("");
  const [stepUpOpen, setStepUpOpen] = useState(false);
  const [pending, setPending] = useState<null | (() => Promise<void>)>(null);

  useEffect(() => {
    if (!token) return;
    void api<NonNullable<typeof data>>("/admin/overview/parents", { token }).then(setData);
  }, [token]);

  async function runDigests() {
    if (!token) return;
    try {
      const r = await adminApi<Record<string, unknown>>("/admin/ops/parent-digests", {
        method: "POST",
        token,
      });
      setMsg(JSON.stringify(r));
      const d = await api<NonNullable<typeof data>>("/admin/overview/parents", { token });
      setData(d);
    } catch (e) {
      if ((e as Error & { data?: { error?: string } }).data?.error === "step_up_required") {
        setPending(() => runDigests);
        setStepUpOpen(true);
        return;
      }
      setMsg((e as Error).message);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">👪 {t.admin.parents}</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: t.admin.parentLinks, v: data?.activeLinks ?? "…" },
          { label: "Pending links", v: data?.pendingLinks ?? "…" },
          { label: t.admin.digests7d, v: data?.digestsLast7d ?? "…" },
        ].map((s) => (
          <div key={s.label} className="card">
            <p className="text-sm font-bold text-ink-muted">{s.label}</p>
            <p className="text-3xl font-black">{s.v}</p>
          </div>
        ))}
      </div>
      <button type="button" className="btn-primary" onClick={() => void runDigests()}>
        📧 {t.admin.runParentDigests}
      </button>
      {msg && (
        <pre className="card max-h-40 overflow-auto text-xs font-mono whitespace-pre-wrap">{msg}</pre>
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
