"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  personaToOnboardingKeys,
  postRegisterPath,
  type UxPersona,
  type UxTrack,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import clsx from "clsx";

/**
 * 3-step first-run wizard: role → track → start.
 * Persists flags via /auth/onboarding/complete.
 */
export function OnboardingWizard({
  force = false,
  open: openProp,
  onClose,
}: {
  /** Show even if wizardCompleted (for testing / settings) */
  force?: boolean;
  /** Controlled open (e.g. profile “change role”) */
  open?: boolean;
  onClose?: () => void;
}) {
  const { token, character, refresh } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [persona, setPersona] = useState<UxPersona>("student");
  const [tracks, setTracks] = useState<UxTrack[]>(["skills"]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof openProp === "boolean") {
      setOpen(openProp);
      if (openProp) setStep(1);
      return;
    }
    if (!token || !character) return;
    const o = character.onboarding ?? {};
    if (force || !o.wizardCompleted) setOpen(true);
  }, [token, character, force, openProp]);

  if (!open || !token) return null;

  function toggleTrack(tr: UxTrack) {
    setTracks((prev) =>
      prev.includes(tr) ? prev.filter((x) => x !== tr) : [...prev, tr],
    );
  }

  async function finish(skip = false) {
    if (!token) return;
    setBusy(true);
    try {
      // Clear tracks then apply persona+tracks (supports re-run from profile)
      for (const k of ["trackSkills", "trackCode", "trackChess"] as const) {
        await api("/auth/onboarding/complete", {
          method: "POST",
          token,
          body: { key: k, value: false },
        });
      }
      const keys = skip
        ? { wizardCompleted: true, personaStudent: true }
        : personaToOnboardingKeys(
            persona,
            tracks.length ? tracks : (["skills"] as UxTrack[]),
          );
      for (const [key, val] of Object.entries(keys)) {
        await api("/auth/onboarding/complete", {
          method: "POST",
          token,
          body: { key, value: Boolean(val) },
        });
      }
      await refresh();
      setOpen(false);
      onClose?.();
      const dest = postRegisterPath({
        persona: skip ? "student" : persona,
        track: (skip ? "skills" : tracks[0]) ?? "skills",
      });
      router.push(dest);
    } catch {
      setOpen(false);
      onClose?.();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-wizard-title"
    >
      <div className="card max-h-[90vh] w-full max-w-md overflow-y-auto space-y-4 shadow-xl">
        <h2 id="onboarding-wizard-title" className="text-xl font-black">
          {t.onboarding.wizardTitle}
        </h2>
        {step === 1 && (
          <>
            <p className="text-sm font-bold text-ink-muted">{t.onboarding.wizardRole}</p>
            <div className="grid gap-2">
              {(
                [
                  ["student", t.onboarding.roleStudent, "🧑‍🎓"],
                  ["parent", t.onboarding.roleParent, "👪"],
                  ["teacher", t.onboarding.roleTeacher, "👩‍🏫"],
                ] as const
              ).map(([id, label, icon]) => (
                <button
                  key={id}
                  type="button"
                  className={clsx(
                    "flex min-h-11 items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-bold transition",
                    persona === id
                      ? "border-brand bg-brand-soft/40"
                      : "border-slate-200 dark:border-slate-700",
                  )}
                  onClick={() => setPersona(id)}
                >
                  <span className="text-2xl" aria-hidden>
                    {icon}
                  </span>
                  {label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn-primary w-full"
              onClick={() => (persona === "student" ? setStep(2) : void finish())}
              disabled={busy}
            >
              {persona === "student" ? "→" : t.onboarding.wizardStart}
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-sm font-bold text-ink-muted">{t.onboarding.wizardTrack}</p>
            <div className="grid gap-2">
              {(
                [
                  ["skills", t.onboarding.trackSkills, "📚"],
                  ["code", t.onboarding.trackCode, "💻"],
                  ["chess", t.onboarding.trackChess, "♟️"],
                ] as const
              ).map(([id, label, icon]) => (
                <button
                  key={id}
                  type="button"
                  className={clsx(
                    "flex min-h-11 items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-bold",
                    tracks.includes(id)
                      ? "border-brand bg-brand-soft/40"
                      : "border-slate-200 dark:border-slate-700",
                  )}
                  onClick={() => toggleTrack(id)}
                >
                  <span className="text-2xl" aria-hidden>
                    {icon}
                  </span>
                  {label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn-primary w-full"
              disabled={busy || tracks.length === 0}
              onClick={() => void finish()}
            >
              {t.onboarding.wizardStart} →
            </button>
            <button
              type="button"
              className="btn-secondary w-full"
              disabled={busy}
              onClick={() => setStep(1)}
            >
              {t.common.back}
            </button>
          </>
        )}
        <button
          type="button"
          className="w-full text-center text-sm font-bold text-ink-muted"
          disabled={busy}
          onClick={() => void finish(true)}
        >
          {t.onboarding.skipWizard}
        </button>
      </div>
    </div>
  );
}
