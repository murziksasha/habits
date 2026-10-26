"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { shouldHideStickyContinue } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { ContinueCta } from "@/components/continue-cta";
import { isPlayMatchActive, PLAY_MATCH_EVENT } from "@/lib/play-match";

/**
 * Sticky Continue on secondary surfaces.
 * Hidden on home/learn/lesson/auth/admin and during live chess match.
 */
export function StickyContinueShell() {
  const pathname = usePathname() || "";
  const { user } = useAuth();
  const [playMatch, setPlayMatch] = useState(false);

  useEffect(() => {
    setPlayMatch(isPlayMatchActive());
    function onMatch(e: Event) {
      const detail = (e as CustomEvent<{ active?: boolean }>).detail;
      setPlayMatch(Boolean(detail?.active));
    }
    window.addEventListener(PLAY_MATCH_EVENT, onMatch);
    return () => window.removeEventListener(PLAY_MATCH_EVENT, onMatch);
  }, [pathname]);

  if (
    !user ||
    shouldHideStickyContinue(pathname, { playMatchActive: playMatch })
  ) {
    return null;
  }

  return <ContinueCta variant="sticky" className="print:hidden" />;
}
