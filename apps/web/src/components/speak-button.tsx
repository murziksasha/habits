"use client";

import { useState } from "react";
import { speakText, listenOnce } from "@/lib/speech";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";

export function SpeakButton({
  text,
  lang = "en-US",
  showPractice = false,
}: {
  text: string;
  lang?: string;
  showPractice?: boolean;
}) {
  const { token } = useAuth();
  const { t, locale } = useLocale();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function play() {
    setMsg("");
    try {
      if (token) {
        await api("/speech/pronounce-tip", {
          method: "POST",
          token,
          body: { text, lang },
        }).catch(() => undefined);
      }
      await speakText(text, { lang, rate: 0.9 });
    } catch {
      setMsg(t.speech.unsupported);
    }
  }

  async function practice() {
    if (!token) return;
    setBusy(true);
    setMsg("");
    try {
      await speakText(text, { lang, rate: 0.85 });
      const heard = await listenOnce(lang);
      const score = await api<{ score: number; match: boolean }>("/speech/score", {
        method: "POST",
        token,
        body: { expected: text, heard: heard.transcript },
      });
      setMsg(
        `${Math.round(score.score * 100)}% · «${heard.transcript}» ${score.match ? "✓" : ""}`,
      );
    } catch {
      setMsg(t.speech.unsupported);
    } finally {
      setBusy(false);
    }
  }

  if (!text?.trim()) return null;

  return (
    <div className="inline-flex flex-wrap items-center gap-2">
      <button
        type="button"
        className="btn-secondary !py-1.5 !px-3 text-sm"
        onClick={() => void play()}
        title={t.speech.speak}
      >
        🔊 {t.speech.speak}
      </button>
      {showPractice && (
        <button
          type="button"
          className="btn-secondary !py-1.5 !px-3 text-sm"
          disabled={busy}
          onClick={() => void practice()}
        >
          🎤 {t.speech.practice}
        </button>
      )}
      {msg && (
        <span className="text-xs font-bold text-ink-muted">
          {locale === "en" ? msg : msg}
        </span>
      )}
    </div>
  );
}
