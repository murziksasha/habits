# 57 — Primary navigation + More menu

## Product

Desktop top nav no longer lists every route (overflow). Split:

**Primary (always visible on `lg+`):**

- Dashboard, Courses, Programming, Playground, Chess play, Friends, Leaderboard

**More dropdown:** remaining routes (search, shop, schools, admin, …)

Mobile hamburger still lists **all** links.

## Implementation

`apps/web/src/components/nav.tsx` — `PRIMARY_HREFS` set + More panel.

## Related

- SPEC 09 frontend
