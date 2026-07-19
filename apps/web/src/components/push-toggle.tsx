"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { subscribePush, unsubscribePush, ensureServiceWorker } from "@/lib/push";

export function PushToggle() {
  const { token } = useAuth();
  const { t } = useLocale();
  const [enabled, setEnabled] = useState(false);
  const [msg, setMsg] = useState("");
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!token) return;
    setSupported(
      typeof window !== "undefined" &&
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window,
    );
    void ensureServiceWorker();
    void api<{ enabled: boolean }>("/push/status", { token })
      .then((d) => setEnabled(d.enabled))
      .catch(() => undefined);
  }, [token]);

  if (!token || !supported) return null;

  async function toggle() {
    if (!token) return;
    setMsg("");
    if (enabled) {
      await unsubscribePush(token);
      setEnabled(false);
      setMsg(t.push.off);
    } else {
      const r = await subscribePush(token);
      if (r.ok) {
        setEnabled(true);
        setMsg(t.push.on);
        await api("/push/test", { method: "POST", token }).catch(() => undefined);
      } else {
        setMsg(r.error === "denied" ? t.push.denied : t.push.unsupported);
      }
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" className="btn-secondary !py-2 text-sm" onClick={() => void toggle()}>
        {enabled ? `🔔 ${t.push.disable}` : `🔕 ${t.push.enable}`}
      </button>
      {msg && <span className="text-xs font-bold text-ink-muted">{msg}</span>}
    </div>
  );
}
