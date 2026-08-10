"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

/**
 * Redirect unauthenticated users to login with ?next= current path.
 * Prefer this over bare router.replace("/login") so deep links survive.
 */
export function useRequireAuth() {
  const { user, token, loading, character } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || user) return;
    let path = pathname || "/learn";
    try {
      if (typeof window !== "undefined" && window.location.search) {
        path = `${path}${window.location.search}`;
      }
    } catch {
      /* ignore */
    }
    const next = encodeURIComponent(path.startsWith("/") ? path : `/${path}`);
    router.replace(`/login?next=${next}`);
  }, [loading, user, router, pathname]);

  return {
    user,
    token,
    character,
    loading,
    ready: Boolean(!loading && user && token),
  };
}
