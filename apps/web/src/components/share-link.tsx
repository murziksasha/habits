"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui";

/** Generic share / copy for any absolute path or URL. */
export function ShareLinkButtons({
  path,
  title,
  text,
  size = "sm",
}: {
  path: string;
  title: string;
  text?: string;
  size?: "sm" | "md";
}) {
  const { t, locale } = useLocale();
  const [msg, setMsg] = useState("");
  const url =
    typeof window !== "undefined"
      ? path.startsWith("http")
        ? path
        : `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`
      : path;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setMsg(locale === "en" ? "Link copied" : "Посилання скопійовано");
    } catch {
      setMsg(t.common.error);
    }
  }

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: text ?? title, url });
        return;
      } catch {
        /* fall through */
      }
    }
    await copy();
  }

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-2">
        <Button size={size} variant="primary" onClick={() => void share()}>
          {locale === "en" ? "Share" : "Поділитися"}
        </Button>
        <Button size={size} variant="secondary" onClick={() => void copy()}>
          {locale === "en" ? "Copy link" : "Копіювати"}
        </Button>
      </div>
      {msg && (
        <p className="text-xs font-bold text-sky" role="status">
          {msg}
        </p>
      )}
    </div>
  );
}
