import type { ReactNode } from "react";
import { Skeleton } from "./skeleton";
import { EmptyState } from "./empty-state";

/** Consistent page chrome: loading / error / title. */
export function PageShell({
  title,
  subtitle,
  loading,
  error,
  onRetry,
  errorTitle,
  errorDescription,
  children,
}: {
  title?: string;
  subtitle?: string;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  errorTitle?: string;
  errorDescription?: string;
  children?: ReactNode;
}) {
  if (loading) {
    return (
      <div className="space-y-4" aria-busy="true" aria-live="polite">
        {title ? <Skeleton className="h-10 w-48" /> : <Skeleton className="h-8 w-40" />}
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <p className="sr-only">Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title={errorTitle ?? "Error"}
        description={errorDescription}
        actionHref={onRetry ? undefined : "/learn"}
        actionLabel={onRetry ? undefined : "Learn"}
      >
        {onRetry ? (
          <button type="button" className="btn-primary" onClick={onRetry}>
            Retry
          </button>
        ) : null}
      </EmptyState>
    );
  }

  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <header className="space-y-1">
          {title ? <h1 className="text-3xl font-black">{title}</h1> : null}
          {subtitle ? <p className="text-sm font-bold text-ink-muted">{subtitle}</p> : null}
        </header>
      )}
      {children}
    </div>
  );
}
