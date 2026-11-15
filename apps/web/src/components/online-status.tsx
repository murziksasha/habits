"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "@/lib/locale-context";
import { useToast } from "@/components/ui";

/** Global online/offline toasts for PWA / flaky networks. */
export function OnlineStatusWatcher() {
  const { locale } = useLocale();
  const { toast } = useToast();
  const wasOffline = useRef(false);

  useEffect(() => {
    function onOffline() {
      wasOffline.current = true;
      toast(
        locale === "en"
          ? "You are offline — answers will retry when back online"
          : "Офлайн — відповіді надішлемо після відновлення мережі",
        "error",
      );
    }
    function onOnline() {
      if (wasOffline.current) {
        toast(
          locale === "en" ? "Back online" : "Зʼєднання відновлено",
          "success",
        );
      }
      wasOffline.current = false;
    }
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      wasOffline.current = true;
    }
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, [locale, toast]);

  return null;
}

export function isBrowserOffline(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine === false;
}
