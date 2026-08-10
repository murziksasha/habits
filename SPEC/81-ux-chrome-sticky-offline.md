# 81 — Chrome hearts, sticky Continue, PageLoading, offline submit

**Status:** Implemented (2026-08)  
**Builds on:** SPEC 79–80

## Deliverables

1. **PageLoading** on `/quests`, `/flashcards`, `/flashcards/[deckId]`, `/certificates`, `/play`.
2. **Sticky Continue** shell on secondary routes (`StickyContinueShell` + `shouldHideStickyContinue`).
3. **Hearts chrome** — `GET /me/hearts` (lowest course after regen) + `HeartsChrome` in nav with regen minutes.
4. **Offline / network** — `api()` throws `offline` / `network_error`; `OnlineStatusWatcher` toasts; lesson submit keeps answers + **Retry submit**.

## API

`GET /me/hearts` → `{ hearts, maxHearts, heartsUpdatedAt, isPremium, regenMinutes, courseSlug }`.

## Web

| Piece | Role |
|-------|------|
| `PageLoading` | Skeleton shell |
| `StickyContinueShell` | Fixed Continue CTA |
| `HeartsChrome` | Nav hearts + countdown |
| `OnlineStatusWatcher` | offline/online toasts |
| `isNetworkOrOfflineError` | Submit retry gate |

## Tests

- shared: `shouldHideStickyContinue`
- api: `me-hearts.test.ts` contract helpers
