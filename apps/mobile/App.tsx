/**
 * EduForge native shell (Expo-ready WebView strategy).
 *
 * Install:
 *   cd apps/mobile && npx create-expo-app@latest . --template blank-typescript
 *   npx expo install react-native-webview
 *
 * Env: EXPO_PUBLIC_WEB_ORIGIN=https://app.eduforge.example
 */

const DEFAULT_ORIGIN = "http://localhost:3000";

function envOrigin(): string {
  try {
    const g = globalThis as { process?: { env?: Record<string, string | undefined> } };
    return g.process?.env?.EXPO_PUBLIC_WEB_ORIGIN ?? DEFAULT_ORIGIN;
  } catch {
    return DEFAULT_ORIGIN;
  }
}

export function getMobileEntryUrl(origin = envOrigin(), path = "/learn"): string {
  const base = origin.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  const sep = p.includes("?") ? "&" : "?";
  return `${base}${p}${sep}native=1`;
}

export function mapDeepLinkToPath(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.protocol === "eduforge:") {
      const host = u.hostname || u.pathname.replace(/^\//, "").split("/")[0];
      if (host === "learn") return "/learn";
      if (host === "friends") {
        const add = u.searchParams.get("add");
        return add ? `/friends?add=${encodeURIComponent(add)}` : "/friends";
      }
      if (host === "play") return "/play";
      return u.pathname && u.pathname !== "/" ? u.pathname + u.search : "/learn";
    }
  } catch {
    return null;
  }
  return null;
}

export function describeNativeShell(): {
  strategy: "webview";
  entry: string;
  features: string[];
} {
  return {
    strategy: "webview",
    entry: getMobileEntryUrl(),
    features: [
      "shared cookie / OAuth deep links",
      "PWA-parity lessons",
      "optional native push later",
    ],
  };
}

/** Placeholder for Expo AppRegistry — real WebView when RN deps installed. */
export default function App(): null {
  return null;
}
