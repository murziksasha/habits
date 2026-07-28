import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "./button";
import { Card } from "./card";

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
  children,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  children?: ReactNode;
}) {
  return (
    <Card className="mx-auto max-w-lg space-y-4 text-center">
      <h1 className="text-2xl font-black">{title}</h1>
      {description && <p className="text-ink-muted font-bold">{description}</p>}
      {children}
      {actionHref && actionLabel && (
        <Link href={actionHref} className="inline-flex">
          <Button variant="primary">{actionLabel}</Button>
        </Link>
      )}
    </Card>
  );
}
