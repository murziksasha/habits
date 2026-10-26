# 82 — Surface quality: PageLoading roll-out, mobile hearts, auto-retry

**Status:** Implemented (2026-08)  
**Builds on:** SPEC 79–81

## Deliverables

1. **PageLoading** expanded: achievements, bookmarks, shop, tutor, leaderboard, challenges, calendar.
2. **Empty states**: bookmarks (and certificates from 81).
3. **Courses catalog**: progress chips (L·completed) from `/me/home` when authed + Continue card.
4. **Hearts chrome on mobile**: always visible in header (not `sm:`-only); `dispatchHeartsRefresh` after lesson submit.
5. **Auto-retry lesson submit** on `window.online` when answers are pending offline.

## Events

- `eduforge:hearts-refresh` — custom event to reload nav hearts after submit / shop.

## Non-goals

- Admin PageLoading (ops surfaces)
- Changing freemium limits
