"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import clsx from "clsx";

type ToastItem = {
  id: number;
  message: string;
  tone?: "default" | "success" | "error";
};

type ToastApi = {
  toast: (message: string, tone?: ToastItem["tone"]) => void;
};

const ToastCtx = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, tone: ToastItem["tone"] = "default") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev.slice(-4), { id, message, tone }]);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-20 right-4 z-[90] flex max-w-sm flex-col gap-2 md:bottom-6"
        aria-live="polite"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className={clsx(
              "pointer-events-auto rounded-2xl border-2 px-4 py-3 text-sm font-bold shadow-lg",
              t.tone === "success" && "border-brand bg-brand-soft text-brand-dark",
              t.tone === "error" && "border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200",
              (!t.tone || t.tone === "default") &&
                "border-slate-200 bg-white text-ink dark:border-slate-700 dark:bg-slate-900",
            )}
            role="status"
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) {
    return {
      toast: (message: string) => {
        if (typeof window !== "undefined") console.info("[toast]", message);
      },
    };
  }
  return ctx;
}
