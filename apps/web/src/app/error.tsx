"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { useToast } from "@/components/ui";

/**
 * App Router error boundary — card UI + error toast for consistent recovery.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useLocale();
  const { toast } = useToast();
  const uk = locale !== "en";

  useEffect(() => {
    console.error("[error-boundary]", error);
    toast(
      uk ? "Сталася помилка — спробуйте ще раз" : "Something went wrong — try again",
      "error",
    );
  }, [error, toast, uk]);

  return (
    <div className="card mx-auto max-w-lg space-y-4 py-12 text-center">
      <p className="text-5xl" aria-hidden>
        ⚠️
      </p>
      <h1 className="text-2xl font-black">
        {uk ? "Щось пішло не так" : "Something went wrong"}
      </h1>
      <p className="break-all text-sm font-bold text-ink-muted">
        {error.message || (uk ? "Невідома помилка" : "Unknown error")}
      </p>
      {error.digest && (
        <p className="font-mono text-[10px] text-ink-muted">digest: {error.digest}</p>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className="btn-primary min-h-11" onClick={() => reset()}>
          {uk ? "Спробувати знову" : "Try again"}
        </button>
        <Link href="/learn" className="btn-secondary min-h-11">
          {uk ? "До навчання" : "Go to Learn"}
        </Link>
      </div>
    </div>
  );
}
