"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { API_URL, isBearerToken } from "@/lib/api";
import { adminApi, getStepUpToken } from "@/lib/admin-api";
import { PageLoading } from "@/components/page-loading";
import { StepUpModal } from "@/components/admin/step-up-modal";

type BackupStatus = {
  lastDownloadedAt: string | null;
  safetyAvailable: boolean;
  warning: boolean;
  migrationTag: string;
};

function authHeaders(token: string | null): Record<string, string> {
  const headers: Record<string, string> = {};
  if (isBearerToken(token)) headers.Authorization = `Bearer ${token}`;
  const stepUp = getStepUpToken();
  if (stepUp) headers["X-Admin-StepUp"] = stepUp;
  return headers;
}

async function errorCode(res: Response): Promise<string> {
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  return data.error ?? "request_failed";
}

export function AdminBackupClient() {
  const { user, token, loading, logout } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [status, setStatus] = useState<BackupStatus | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [confirm, setConfirm] = useState("");
  const [undoConfirm, setUndoConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [stepUpOpen, setStepUpOpen] = useState(false);
  const [pending, setPending] = useState<(() => Promise<void>) | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.replace("/dashboard");
  }, [loading, user, router]);

  async function loadStatus() {
    if (!token) return;
    const next = await adminApi<BackupStatus>("/admin/backup/status", { token, stepUp: false });
    setStatus(next);
  }

  useEffect(() => {
    if (!token || user?.role !== "admin") return;
    void loadStatus().catch(() => setStatus(null));
  }, [token, user]);

  function explain(code: string): string {
    switch (code) {
      case "backup_version_mismatch":
        return t.admin.backupMismatch;
      case "backup_invalid":
        return t.admin.backupInvalid;
      case "backup_too_large":
        return t.admin.backupTooLarge;
      case "backup_busy":
        return t.admin.backupBusy;
      case "safety_missing":
        return t.admin.backupNoSafety;
      case "confirm_required":
        return t.admin.backupConfirmHint;
      case "step_up_required":
        return t.admin.stepUp;
      default:
        return code;
    }
  }

  async function withStepUp(fn: () => Promise<void>) {
    try {
      await fn();
    } catch (err) {
      const code = (err as Error & { data?: { error?: string } }).data?.error ?? (err as Error).message;
      if (code === "step_up_required") {
        setPending(() => fn);
        setStepUpOpen(true);
        return;
      }
      setMsg(explain(code));
    }
  }

  async function download() {
    if (!token) return;
    setMsg("");
    setBusy(true);
    try {
      const res = await fetch(`${API_URL}/admin/backup/download`, {
        headers: authHeaders(token),
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) {
        const code = await errorCode(res);
        const error = new Error(code) as Error & { data?: { error?: string } };
        error.data = { error: code };
        throw error;
      }
      const blob = await res.blob();
      const match = /filename="([^"]+)"/.exec(res.headers.get("Content-Disposition") ?? "");
      const name = match?.[1] ?? "eduforge-backup.json.gz";
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      link.click();
      URL.revokeObjectURL(url);
      await loadStatus();
    } finally {
      setBusy(false);
    }
  }

  function leave(kind: "restored" | "undone") {
    void logout();
    window.location.assign(`/login?${kind}=1`);
  }

  async function restore() {
    if (!token || !file) return;
    setMsg("");
    setBusy(true);
    try {
      const body = new FormData();
      body.set("confirm", confirm);
      body.set("file", file);
      const res = await fetch(`${API_URL}/admin/backup/restore`, {
        method: "POST",
        headers: authHeaders(token),
        credentials: "include",
        body,
      });
      if (!res.ok) {
        const code = await errorCode(res);
        const error = new Error(code) as Error & { data?: { error?: string } };
        error.data = { error: code };
        throw error;
      }
      leave("restored");
    } finally {
      setBusy(false);
    }
  }

  async function undo() {
    if (!token) return;
    setMsg("");
    setBusy(true);
    try {
      await adminApi("/admin/backup/undo", {
        method: "POST",
        token,
        body: { confirm: undoConfirm },
      });
      leave("undone");
    } finally {
      setBusy(false);
    }
  }

  if (loading || user?.role !== "admin") {
    return <PageLoading label={t.common.loading} />;
  }

  const downloaded = status?.lastDownloadedAt
    ? new Date(status.lastDownloadedAt).toLocaleString()
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">💾 {t.admin.backupTitle}</h1>
        <p className="mt-2 max-w-2xl text-sm font-bold text-ink-muted">{t.admin.backupLead}</p>
      </div>

      {status?.warning && (
        <p
          className="rounded-2xl border-2 border-amber-400 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-950"
          role="status"
        >
          {t.admin.backupWarning}
        </p>
      )}

      <section className="card space-y-3">
        <h2 className="text-xl font-black">{t.admin.backupDownload}</h2>
        <p className="text-sm font-bold text-ink-muted">
          {[downloaded, status?.migrationTag].filter(Boolean).join(" · ")}
        </p>
        <button
          type="button"
          className="btn-primary"
          disabled={busy}
          onClick={() => void withStepUp(download)}
        >
          {t.admin.backupDownload}
        </button>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-black">{t.admin.backupRestore}</h2>
        <p className="text-sm font-bold text-ink-muted">{t.admin.backupSeedNote}</p>
        <div>
          <label className="label" htmlFor="backup-file">
            {t.admin.backupFile}
          </label>
          <input
            id="backup-file"
            className="input"
            type="file"
            accept=".gz,application/gzip"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <div>
          <label className="label" htmlFor="backup-confirm">
            {t.admin.backupConfirm}
          </label>
          <input
            id="backup-confirm"
            className="input font-mono"
            value={confirm}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <p className="mt-1 text-xs font-bold text-ink-muted">{t.admin.backupConfirmHint}</p>
        </div>
        <button
          type="button"
          className="btn-primary"
          disabled={busy || confirm !== "RESTORE" || !file}
          onClick={() => void withStepUp(restore)}
        >
          {t.admin.backupRestore}
        </button>
      </section>

      {status?.safetyAvailable && (
        <section className="card space-y-3">
          <h2 className="text-xl font-black">{t.admin.backupUndo}</h2>
          <div>
            <label className="label" htmlFor="undo-confirm">
              {t.admin.backupConfirm}
            </label>
            <input
              id="undo-confirm"
              className="input font-mono"
              value={undoConfirm}
              autoComplete="off"
              spellCheck={false}
              onChange={(e) => setUndoConfirm(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn-secondary"
            disabled={busy || undoConfirm !== "RESTORE"}
            onClick={() => void withStepUp(undo)}
          >
            {t.admin.backupUndo}
          </button>
        </section>
      )}

      {msg && (
        <p className="text-sm font-bold text-red-700" role="alert">
          {msg}
        </p>
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
