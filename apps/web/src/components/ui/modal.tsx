"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

export function Modal({
  open,
  title,
  children,
  onClose,
  className,
}: {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className={clsx(
          "max-h-[90vh] w-full max-w-lg overflow-auto rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title ? <h2 className="mb-3 text-xl font-black">{title}</h2> : null}
        {children}
      </div>
    </div>
  );
}
