# Frontend Performance

Slug: `frontend_performance`
Group: deep
Hub: `/frontend-performance`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `js_fundamentals`, `react_fundamentals`
Recommended next: `nextjs_fullstack`

## What this course is

Critical rendering path, main-thread work, bundles and code splitting, images, HTTP caching, and Core Web Vitals (LCP, INP, CLS) — measured in the field, not only in the lab.

## Program

### `perf_critical_path` — The critical rendering path

- `perf-crp-steps` — The browser paints the page after HTML, the CSSOM, and, often, blocking JS
- `perf-preload-discover` — Preload and early hints help the browser find a critical resource earlier
- `perf-html-ttfb` — Fast HTML and TTFB: the server, streaming, and the document cache
- `perf_critical_path-exam` — Exam: the critical path [exam]

### `perf_rendering` — Rendering and the main thread

- `perf-reflow-paint` — Layout (reflow) and paint are expensive: do not force them on every frame without need
- `perf-main-thread` — There is one main thread: long JS delays input and paint
- `perf-css-cost` — Complex selectors and large style trees also cost the main thread
- `perf_rendering-exam` — Exam: rendering [exam]

### `perf_bundles` — Bundles and code splitting

- `perf-tree-shake` — The bundle contains what you import: tree-shaking removes the dead part
- `perf-dynamic-import` — A dynamic import() defers route code that is not needed now
- `perf-budget` — A size budget: a limit in CI, not 'we will look after the release'
- `perf_bundles-exam` — Exam: bundles [exam]

### `perf_images` — Images and media

- `perf-srcset-sizes` — srcset and sizes serve the right size, not one giant file
- `perf-lazy-cls` — Lazy loading with reserved space so CLS does not jump
- `perf-modern-formats` — Modern formats and compression: WebP/AVIF, the right quality level
- `perf_images-exam` — Exam: images [exam]

### `perf_cache` — Caching and delivery

- `perf-http-cache` — Cache-Control and a fingerprint in the file name: a long cache for the immutable, short freshness for HTML
- `perf-cdn-compress` — A CDN is closer to the user; Brotli and gzip reduce bytes on the wire
- `perf-service-worker` — A Service Worker is a careful cache: updates, offline, and not a stuck old client
- `perf_cache-exam` — Exam: caching [exam]

### `perf_vitals` — Core Web Vitals

- `perf-lcp` — LCP is the paint of the largest visible element; you speed up the resource and the path to it
- `perf-inp-cls` — INP is input responsiveness; CLS is layout stability without surprise shifts
- `perf-measure-rum` — The lab finds the cause, the field is the user's truth: RUM, CrUX, PerformanceObserver
- `perf_vitals-exam` — Exam: Web Vitals [exam]

