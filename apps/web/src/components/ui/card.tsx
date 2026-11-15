import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("card", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={clsx("text-xl font-black", className)}>{children}</h2>;
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={clsx("text-sm text-ink-muted font-bold", className)}>{children}</p>;
}
