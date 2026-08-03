/**
 * WebContainer singleton bootstrap.
 * Requires cross-origin isolation (COOP/COEP) on the hosting page.
 */

import type { WebContainer } from "@webcontainer/api";

let bootPromise: Promise<WebContainer> | null = null;
let instance: WebContainer | null = null;

export function isWebcontainersFlagEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_WEBCONTAINERS === "1" ||
    process.env.NEXT_PUBLIC_WEBCONTAINERS === "true"
  );
}

export function isCrossOriginIsolated(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.crossOriginIsolated);
}

export function webcontainersSupported(): {
  ok: boolean;
  reason?: string;
} {
  if (typeof window === "undefined") {
    return { ok: false, reason: "ssr" };
  }
  if (!isWebcontainersFlagEnabled()) {
    return { ok: false, reason: "flag_off" };
  }
  if (!isCrossOriginIsolated()) {
    return {
      ok: false,
      reason: "not_isolated",
    };
  }
  if (typeof SharedArrayBuffer === "undefined") {
    return { ok: false, reason: "no_sab" };
  }
  return { ok: true };
}

export async function getWebContainer(): Promise<WebContainer> {
  if (instance) return instance;
  if (!bootPromise) {
    bootPromise = (async () => {
      const { WebContainer } = await import("@webcontainer/api");
      const wc = await WebContainer.boot();
      instance = wc;
      return wc;
    })().catch((err) => {
      bootPromise = null;
      throw err;
    });
  }
  return bootPromise;
}

export function getWebContainerIfReady(): WebContainer | null {
  return instance;
}

/** Test helper / hot reload recovery */
export function resetWebContainerSingleton(): void {
  instance = null;
  bootPromise = null;
}
