import { Skeleton } from "@/components/ui";

/** Consistent loading shell for authenticated pages. */
export function PageLoading({ label = "Loading" }: { label?: string }) {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
      <p className="sr-only">{label}</p>
    </div>
  );
}
