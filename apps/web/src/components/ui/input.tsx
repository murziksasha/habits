import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";

export function Input({
  className,
  label,
  error,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label?: ReactNode;
  error?: string;
}) {
  const inputId = id ?? (typeof label === "string" ? label.replace(/\s+/g, "-").toLowerCase() : undefined);
  const describedBy = error ? `${inputId}-error` : props["aria-describedby"];
  return (
    <div className="space-y-1">
      {label ? (
        <label htmlFor={inputId} className="label">
          {label}
          {props.required ? (
            <span className="text-red-600" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        aria-required={props.required || undefined}
        className={clsx(
          "w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-bold text-ink outline-none transition focus:border-brand dark:border-slate-700 dark:bg-slate-900",
          error && "border-red-400",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-bold text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
