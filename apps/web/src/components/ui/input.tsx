import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      className={clsx(
        "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-bold text-ink outline-none transition focus:border-brand dark:border-slate-700 dark:bg-slate-900",
        className,
      )}
      {...props}
    />
  );
}
