"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";

/** Short celebration banner with reduced-motion respect. */
export function Celebration({
  kind,
  show,
  detail,
}: {
  kind: "level" | "streak" | "cert" | "complete";
  show: boolean;
  detail?: string;
}) {
  const { t, locale } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const id = window.setTimeout(() => setVisible(false), 2800);
    return () => window.clearTimeout(id);
  }, [show, kind, detail]);

  if (!visible) return null;

  const label =
    kind === "level"
      ? t.onboarding.celebrateLevel
      : kind === "streak"
        ? t.onboarding.celebrateStreak
        : kind === "cert"
          ? locale === "en"
            ? "Certificate ready!"
            : "Сертифікат готовий!"
          : locale === "en"
            ? "Lesson complete!"
            : "Урок завершено!";

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-16 z-[70] flex justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <div className="ef-celebrate motion-reduce:animate-none motion-reduce:transition-none rounded-2xl border-2 border-brand bg-brand-soft px-6 py-3 text-center text-lg font-black text-brand-dark shadow-lg">
        <span>🎉 {label}</span>
        {detail ? (
          <p className="mt-0.5 text-xs font-extrabold text-brand-dark/90">
            {detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}
