import clsx from "clsx";
import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "sky" | "grape" | "muted";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-black",
        tone === "brand" && "bg-brand/15 text-brand-dark",
        tone === "sky" && "bg-sky/15 text-sky",
        tone === "grape" && "bg-grape/15 text-grape",
        tone === "muted" && "bg-slate-100 text-ink-muted dark:bg-slate-800",
        className,
      )}
    >
      {children}
    </span>
  );
}
