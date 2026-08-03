"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_PLATFORM_THEME,
  type PlatformTheme,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { useBranding } from "@/lib/branding-context";
import { adminApi, api } from "@/lib/admin-api";
import { StepUpModal } from "@/components/admin/step-up-modal";

export default function AdminAppearancePage() {
  const { token } = useAuth();
  const { t } = useLocale();
  const { refresh } = useBranding();
  const [theme, setTheme] = useState<PlatformTheme>(DEFAULT_PLATFORM_THEME);
  const [msg, setMsg] = useState("");
  const [stepUpOpen, setStepUpOpen] = useState(false);
  const [pending, setPending] = useState<null | (() => Promise<void>)>(null);

  useEffect(() => {
    if (!token) return;
    void api<{ published: PlatformTheme; draft: PlatformTheme | null }>(
      "/admin/appearance",
      { token },
    ).then((d) => setTheme(d.draft ?? d.published ?? DEFAULT_PLATFORM_THEME));
  }, [token]);

  async function saveDraft() {
    if (!token) return;
    await adminApi("/admin/appearance/draft", {
      method: "PUT",
      token,
      body: theme,
      stepUp: false,
    });
    setMsg(t.admin.saveDraft);
  }

  async function publish() {
    if (!token) return;
    try {
      await adminApi("/admin/appearance/publish", { method: "POST", token });
      await refresh();
      setMsg("Published");
    } catch (e) {
      if ((e as Error & { data?: { error?: string } }).data?.error === "step_up_required") {
        setPending(() => async () => {
          await adminApi("/admin/appearance/publish", { method: "POST", token });
          await refresh();
          setMsg("Published");
        });
        setStepUpOpen(true);
        return;
      }
      setMsg((e as Error).message);
    }
  }

  const light = theme.tokens.light;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">🎨 {t.admin.appearance}</h1>
      {msg && <p className="text-sm font-bold text-sky">{msg}</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card space-y-3">
          <div>
            <label className="label">{t.admin.productName}</label>
            <input
              className="input"
              value={theme.branding.productName}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  branding: { ...theme.branding, productName: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="label">Tagline UK</label>
            <input
              className="input"
              value={theme.branding.taglineUk ?? ""}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  branding: { ...theme.branding, taglineUk: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="label">Logo URL</label>
            <input
              className="input"
              value={theme.branding.logoUrl ?? ""}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  branding: { ...theme.branding, logoUrl: e.target.value },
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["brand", t.admin.brandColor],
                ["sky", "Sky"],
                ["grape", "Grape"],
                ["sun", "Sun"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className="label">{label}</label>
                <input
                  className="input h-12"
                  type="color"
                  value={light[key]}
                  onChange={(e) =>
                    setTheme({
                      ...theme,
                      tokens: {
                        ...theme.tokens,
                        light: { ...light, [key]: e.target.value },
                        dark: { ...theme.tokens.dark, [key]: e.target.value },
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-secondary" onClick={() => void saveDraft()}>
              {t.admin.saveDraft}
            </button>
            <button type="button" className="btn-primary" onClick={() => void publish()}>
              {t.admin.publish}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setTheme(DEFAULT_PLATFORM_THEME)}
            >
              Reset defaults
            </button>
          </div>
        </section>

        <section className="card space-y-3">
          <h2 className="font-black">Preview</h2>
          <div
            className="rounded-3xl p-6"
            style={{ background: light.bg, color: light.ink }}
          >
            <p className="text-2xl font-black" style={{ color: light.brand }}>
              {theme.branding.productName}
            </p>
            <p className="text-sm opacity-70">{theme.branding.taglineUk}</p>
            <button
              type="button"
              className="mt-4 rounded-2xl px-5 py-3 font-bold text-white"
              style={{ background: light.brand }}
            >
              Primary button
            </button>
            <div
              className="mt-4 rounded-2xl border-2 p-4 font-bold"
              style={{ background: light.cardBg, borderColor: "#e2e8f0" }}
            >
              Card sample · XP +15
            </div>
          </div>
        </section>
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
