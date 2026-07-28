import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "sky" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  sky: "btn-sky",
  ghost:
    "btn bg-transparent text-ink-muted hover:bg-slate-100 dark:hover:bg-slate-800 border-0 shadow-none",
  danger: "btn bg-red-500 text-white shadow-btn hover:bg-red-600",
};

const sizes: Record<Size, string> = {
  sm: "!px-3 !py-2 text-sm",
  md: "",
  lg: "!px-6 !py-4 text-lg",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    />
  );
}
