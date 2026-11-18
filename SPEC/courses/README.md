# Course depth

One file per course slug. Programs reflect seeded units/lessons plus linked `ForgeBoard` local practice packs (`LOCAL_LAB_MANIFESTS`, `assessmentMode: "local_practice"`). There are 36 registered courses, 569 units, 2,569 lessons including 524 exams, and 13 ForgeBoard packs. These content totals include unpublished courses and do not describe the currently published catalog of an instance.

Electrical engineering also has an in-app SPICE laboratory and seven graded circuit exercise cards; these are not ForgeBoard packs and are not counted in the Local Lab column.

Update in the same change as `packages/content`. See `SPEC/CONTENT-DX.md`.

| Slug | Group | Units | Lessons | Exams | Local Lab | Scope |
| --- | --- | ---: | ---: | ---: | --- | --- |
| [`english`](./english.md) | skill | 45 | 249 | 30 | — | A1–C1 English for Ukrainian speakers: foundations, communication, deep grammar, pronunciation, vocabulary, and exam skills. |
| [`chess`](./chess.md) | chess | 34 | 189 | 24 | — | Rules, tactics, openings as ideas, middlegame, full endgames, famous games, and live play. |
| [`typing`](./typing.md) | skill | 7 | 82 | 3 | — | Build speed and accuracy with touch typing drills. |
| [`speed_reading`](./speed_reading.md) | skill | 8 | 54 | 3 | — | RSVP, chunking, and reading comprehension. |
| [`logic`](./logic.md) | skill | 14 | 78 | 3 | — | Sequences, patterns, and critical thinking puzzles. |
| [`programming`](./programming.md) | code | 10 | 85 | 10 | — | Mimo-style path: HTML → CSS → JS → TypeScript → React → Git → Node → Express → SQL → QA. + unit exams. |
| [`typescript`](./typescript.md) | deep | 19 | 71 | 19 | M3 (`forgeboard-m3-ts`) | Full TypeScript course: primitives to generics, narrowing, and utility types. Unit exams after each se... |
| [`html_semantics`](./html_semantics.md) | deep | 14 | 52 | 14 | M1 (`forgeboard-m1-a11y`) | Semantic markup: landmarks, outline, accessible forms & validation, focus management, native <dialog>,... |
| [`css_layout`](./css_layout.md) | deep | 15 | 58 | 15 | — | Deep layout track: box model, Flexbox, CSS Grid, responsive, flex vs grid. Unit exams included. |
| [`qa_theory`](./qa_theory.md) | deep | 19 | 72 | 19 | — | Deep testing theory: principles, levels, types, black/white-box, STLC, defects, automation, metrics. |
| [`js_fundamentals`](./js_fundamentals.md) | deep | 25 | 104 | 25 | M2 (`forgeboard-m2-js`) | Deep JS: types, operators, functions, arrays, objects, async/await, DOM, modules, errors/prototypes + ... |
| [`react_fundamentals`](./react_fundamentals.md) | deep | 18 | 64 | 18 | M4 (`forgeboard-m4-react`) | Components, props, useState, lists/keys, useEffect, forms, composition, advanced hooks + unit exams. |
| [`sql_fundamentals`](./sql_fundamentals.md) | deep | 44 | 178 | 44 | — | Oracle SQL along the public 1Z0-071 checklist: SELECT, functions, joins, subqueries, set operators, DM... |
| [`node_fundamentals`](./node_fundamentals.md) | deep | 15 | 51 | 15 | — | Runtime, modules, fs/path, env, http server, npm, async, events/streams, process resilience, and servi... |
| [`express_fundamentals`](./express_fundamentals.md) | deep | 15 | 51 | 15 | M5 (`forgeboard-m5-express`) | App, routes, middleware, REST, validation resilience, auth vs ownership, Router, and ForgeBoard API — ... |
| [`embedded_cpp`](./embedded_cpp.md) | deep | 21 | 85 | 21 | — | C++ for constrained systems and miltech stack: memory, CMake, networking, FreeRTOS, MAVLink, safety, d... |
| [`sysadmin`](./sysadmin.md) | skill | 16 | 77 | 16 | — | From a small office to the console: network, backups, Windows desks, bash, permissions, packages, git ... |
| [`devops`](./devops.md) | skill | 22 | 123 | 22 | M13 (`forgeboard-m13-devops`) | One service, forge-status: a Git-to-Kubernetes survey, then Stay up and On call. AWS before Terraform;... |
| [`software_testing`](./software_testing.md) | deep | 9 | 31 | 9 | M7 (`forgeboard-m7-testing`) | Testable requirements, high-signal unit tests, boundary fixtures, React component tests, API+DB integr... |
| [`postgresql_apps`](./postgresql_apps.md) | deep | 9 | 31 | 9 | M6 (`forgeboard-m6-postgres`) | Relational modeling, constraints and migrations, parameterized CRUD, joins and keyset pagination, ACID... |
| [`git_workflows`](./git_workflows.md) | deep | 8 | 26 | 8 | M8 (`forgeboard-m8-git`) | Commit history and bisect, branching and rebase safety, conflict resolution without dropped fixes, cod... |
| [`web_security`](./web_security.md) | deep | 9 | 31 | 9 | M9 (`forgeboard-m9-security`) | OWASP Top 10:2025 in practice: trust boundaries, validation and XSS/SQLi defenses, hashed sessions and... |
| [`ai_development`](./ai_development.md) | deep | 10 | 31 | 10 | M10 (`forgeboard-m10-ai`) | Clear specifications, safe context curation, reviewing saved AI diffs, catching hallucinated APIs, test-backed verification, ForgeBoard review lab, and controlling AI coders. |
| [`python_for_ai`](./python_for_ai.md) | deep | 10 | 30 | 10 | — | Read and repair agent-style Python, including validated JSON input and bounded async calls. |
| [`agentic_systems`](./agentic_systems.md) | deep | 10 | 30 | 10 | — | Script vs model vs agent, tool schemas, RAG, and a bounded support-agent flow. |
| [`llmops`](./llmops.md) | deep | 10 | 30 | 10 | — | Tracing, token cost, fixture evals, delivery choices, budgets, and an evidence-based release gate. |
| [`ai_security`](./ai_security.md) | deep | 10 | 30 | 10 | — | Agent trust boundaries, injection defenses, scoped tools, approval, secret-safe traces, and local models. |
| [`ai_product`](./ai_product.md) | deep | 9 | 27 | 9 | — | Model/code routing, product briefs, approve/edit/undo, failure modes, and a support handoff scenario. |
| [`nextjs_fullstack`](./nextjs_fullstack.md) | deep | 10 | 28 | 10 | M11 (`forgeboard-m11-nextjs`) | App Router, explicit Server/Client boundaries, isolated server data access, validated mutations, authz... |
| [`applied_algorithms`](./applied_algorithms.md) | deep | 9 | 26 | 9 | M12 (`forgeboard-m12-algorithms`) | Complexity profiling in web apps, Map/Set indexing vs O(N²), undo stacks and bounded queues, determini... |
| [`go_fundamentals`](./go_fundamentals.md) | deep | 7 | 27 | 7 | — | Packages, types, slices, interfaces, goroutines, testing, and bounded HTTP service handling. |
| [`web_accessibility`](./web_accessibility.md) | deep | 7 | 27 | 7 | — | POUR, keyboard, ARIA, contrast, WCAG 2.2, and an accessible checkout flow. |
| [`rest_api_design`](./rest_api_design.md) | deep | 7 | 27 | 7 | — | Resource URLs, HTTP methods, idempotency, pagination, errors, OpenAPI, and an applied order API contract. |
| [`frontend_performance`](./frontend_performance.md) | deep | 7 | 27 | 7 | — | Critical path, rendering, bundles, images, caching, Web Vitals, and product-page diagnosis. |
| [`browser_web_apis`](./browser_web_apis.md) | deep | 7 | 27 | 7 | — | DOM, fetch, storage, observers, workers, permissions, and a cancellable search flow. |
| [`electrical_engineering`](./electrical_engineering.md) | skill | 60 | 360 | 60 | — | Comprehensive electrical engineering: nature of electricity, DC/AC circuits, components & transients, semiconductors, op-amps, power electronics, electrical machines, and 3 capstone projects. |
