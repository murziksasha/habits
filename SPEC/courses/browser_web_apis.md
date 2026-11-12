# Browser Web APIs

Slug: `browser_web_apis`
Group: deep
Hub: `/browser-web-apis`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `js_fundamentals`
Recommended next: `frontend_performance`, `web_security`

## What this course is

Practical browser APIs: the DOM and events, fetch and streams, storage, observers, workers and messaging, history, the clipboard, and permissions.

## Program

### `browser_dom_events` — The DOM and events

- `br-event-delegation` — Delegation: one listener on a parent catches the children's events
- `br-abort-listener` — Removing a listener: an AbortSignal, or the same saved function
- `br-dom-safe` — Update the DOM surgically: textContent, a fragment, avoid extra innerHTML
- `browser_dom_events-exam` — Exam: the DOM and events [exam]

### `browser_fetch` — Fetch, streams, and cancellation

- `br-fetch-basics` — fetch does not throw on 404: check response.ok and read the body once
- `br-fetch-abort` — Cancel a stale request with AbortController; do not only ignore the response in the UI
- `br-streams` — You can read the response body as a stream without waiting for the whole file in memory
- `browser_fetch-exam` — Exam: fetch [exam]

### `browser_storage` — Browser storage

- `br-web-storage` — localStorage is synchronous and shared per origin; do not put secrets there
- `br-indexeddb` — IndexedDB is an asynchronous database in the browser for large structures
- `br-cookies-cache-api` — A cookie is for the server, with flags; the Cache API is for HTTP responses
- `browser_storage-exam` — Exam: storage [exam]

### `browser_observers` — Observers

- `br-intersection` — IntersectionObserver tells you when an element enters the visible area
- `br-mutation-resize` — MutationObserver watches tree changes; ResizeObserver watches an element's size
- `br-performance-observer` — PerformanceObserver collects measurements: paint, long tasks, navigation, resources
- `browser_observers-exam` — Exam: observers [exam]

### `browser_workers` — Workers and messaging

- `br-web-worker` — A Web Worker runs JS on another thread: no DOM, through messages
- `br-shared-broadcast` — SharedWorker and BroadcastChannel connect tabs of the same origin
- `br-worker-security` — A worker has the same origin but a separate global state: do not blindly trust messages
- `browser_workers-exam` — Exam: workers [exam]

### `browser_platform` — History, clipboard, and permissions

- `br-history-url` — history.pushState changes the URL without a reload; parse it with URL
- `br-clipboard` — The clipboard is asynchronous, only after a user gesture and the right permissions
- `br-notify-permission` — Notification and Permissions: ask at the moment of need, explain why
- `browser_platform-exam` — Exam: the platform [exam]

