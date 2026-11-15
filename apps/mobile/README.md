# EduForge Mobile (native shell)

**Strategy:** WebView shell over production web (`/learn`) so Learning OS ships once.

## Bootstrap Expo

```bash
cd apps/mobile
npx create-expo-app@latest . --template blank-typescript
npx expo install react-native-webview
```

Set `EXPO_PUBLIC_WEB_ORIGIN` to your deployed web origin.

Wire `App.tsx` with:

```tsx
import { WebView } from "react-native-webview";
import { getMobileEntryUrl } from "./App";

export default function App() {
  return <WebView source={{ uri: getMobileEntryUrl() }} sharedCookiesEnabled />;
}
```

## Why not full RN rewrite

- Lesson player (Monaco, chessboard) is web-first
- API already cookie/Bearer dual
- Plan P2: native after PWA metrics show need

## Deep links

- `eduforge://friends?add=`
- `eduforge://learn`
- Map via Expo Linking → WebView navigation
