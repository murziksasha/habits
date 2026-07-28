/**
 * EduForge native shell (Expo-ready).
 *
 * Install:
 *   cd apps/mobile && npx create-expo-app@latest . --template blank-typescript
 *   npx expo install react-native-webview
 *
 * Env: EXPO_PUBLIC_WEB_ORIGIN=https://app.eduforge.example
 */

const DEFAULT_ORIGIN = "http://localhost:3000";

export function getMobileEntryUrl(origin = DEFAULT_ORIGIN): string {
  const base = origin.replace(/\/$/, "");
  return `${base}/learn?native=1`;
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
