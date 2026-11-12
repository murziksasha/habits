# Course depth

One file per course slug. Programs reflect seeded units/lessons plus linked `ForgeBoard` local practice packs (`LOCAL_LAB_MANIFESTS`, `assessmentMode: "local_practice"`).

Update in the same change as `packages/content`. See `SPEC/CONTENT-DX.md`.

| Slug | Group | Units | Lessons | Exams | Local Lab | Scope |
| --- | --- | ---: | ---: | ---: | --- | --- |
| [`english`](./english.md) | skill | 9 | 44 | 3 | — | Learn English through short interactive lessons. |
| [`chess`](./chess.md) | chess | 7 | 32 | 3 | — | Theory, puzzles, and live games with other players. |
| [`typing`](./typing.md) | skill | 4 | 52 | 3 | — | Build speed and accuracy with touch typing drills. |
| [`speed_reading`](./speed_reading.md) | skill | 3 | 28 | 3 | — | RSVP, chunking, and reading comprehension. |
| [`logic`](./logic.md) | skill | 8 | 47 | 3 | — | Sequences, patterns, and critical thinking puzzles. |
| [`programming`](./programming.md) | code | 10 | 74 | 10 | — | Mimo-style path: HTML → CSS → JS → TypeScript → React → Git → Node → Express → SQL → QA. + unit exams. |
| [`typescript`](./typescript.md) | deep | 11 | 38 | 11 | M3 (`forgeboard-m3-ts`) | Full TypeScript course: primitives to generics, narrowing, and utility types. Unit exams after each se... |
| [`html_semantics`](./html_semantics.md) | deep | 11 | 39 | 11 | M1 (`forgeboard-m1-a11y`) | Semantic markup: landmarks, outline, accessible forms & validation, focus management, native <dialog>,... |
| [`css_layout`](./css_layout.md) | deep | 11 | 41 | 11 | — | Deep layout track: box model, Flexbox, CSS Grid, responsive, flex vs grid. Unit exams included. |
| [`qa_theory`](./qa_theory.md) | deep | 16 | 59 | 16 | — | Deep testing theory: principles, levels, types, black/white-box, STLC, defects, automation, metrics. |
| [`js_fundamentals`](./js_fundamentals.md) | deep | 18 | 59 | 18 | M2 (`forgeboard-m2-js`) | Deep JS: types, operators, functions, arrays, objects, async/await, DOM, modules, errors/prototypes + ... |
| [`react_fundamentals`](./react_fundamentals.md) | deep | 12 | 39 | 12 | M4 (`forgeboard-m4-react`) | Components, props, useState, lists/keys, useEffect, forms, composition, advanced hooks + unit exams. |
| [`sql_fundamentals`](./sql_fundamentals.md) | deep | 16 | 65 | 16 | — | Oracle SQL along the public 1Z0-071 checklist: SELECT, functions, joins, subqueries, set operators, DM... |
| [`node_fundamentals`](./node_fundamentals.md) | deep | 11 | 34 | 11 | — | Runtime, modules, fs/path, env, http server, npm, async, events/streams, process resilience, and servi... |
| [`express_fundamentals`](./express_fundamentals.md) | deep | 11 | 34 | 11 | M5 (`forgeboard-m5-express`) | App, routes, middleware, REST, validation resilience, auth vs ownership, Router, and ForgeBoard API — ... |
| [`embedded_cpp`](./embedded_cpp.md) | deep | 18 | 72 | 18 | — | C++ for constrained systems and miltech stack: memory, CMake, networking, FreeRTOS, MAVLink, safety, d... |
| [`sysadmin`](./sysadmin.md) | skill | 13 | 64 | 13 | — | From a small office to the console: network, backups, Windows desks, bash, permissions, packages, git ... |
| [`devops`](./devops.md) | skill | 19 | 108 | 19 | M13 (`forgeboard-m13-devops`) | One service, forge-status: a Git-to-Kubernetes survey, then Stay up and On call. AWS before Terraform;... |
| [`software_testing`](./software_testing.md) | deep | 6 | 18 | 6 | M7 (`forgeboard-m7-testing`) | Testable requirements, high-signal unit tests, boundary fixtures, React component tests, API+DB integr... |
| [`postgresql_apps`](./postgresql_apps.md) | deep | 6 | 18 | 6 | M6 (`forgeboard-m6-postgres`) | Relational modeling, constraints and migrations, parameterized CRUD, joins and keyset pagination, ACID... |
| [`git_workflows`](./git_workflows.md) | deep | 5 | 13 | 5 | M8 (`forgeboard-m8-git`) | Commit history and bisect, branching and rebase safety, conflict resolution without dropped fixes, cod... |
| [`web_security`](./web_security.md) | deep | 6 | 18 | 6 | M9 (`forgeboard-m9-security`) | OWASP Top 10:2025 in practice: trust boundaries, validation and XSS/SQLi defenses, hashed sessions and... |
| [`ai_development`](./ai_development.md) | deep | 6 | 16 | 6 | M10 (`forgeboard-m10-ai`) | Clear specifications, safe context curation, reviewing saved AI diffs, catching hallucinated APIs, test-backed verification, ForgeBoard review lab, and controlling AI coders. |
| [`python_for_ai`](./python_for_ai.md) | deep | 6 | 18 | 6 | — | Read and repair agent-style Python: values, collections, typed functions, JSON/HTTP shapes, async/await, and AI snippet review. |
| [`agentic_systems`](./agentic_systems.md) | deep | 6 | 18 | 6 | — | Script vs model vs agent, tool schemas, planning & reflection against checks, multi-agent tradeoffs, hybrid RAG, and vector stores. |
| [`llmops`](./llmops.md) | deep | 6 | 18 | 6 | — | Tracing and token cost, fixture evals in CI, HTTP vs GraphQL/gRPC/events, Kafka vs RabbitMQ, cloud consoles, and token budgets. |
| [`ai_security`](./ai_security.md) | deep | 6 | 18 | 6 | — | Defensive agent security: tool trust boundaries, indirect injection separation, allowlists/HITL, output guardrails, secrets, and local models. |
| [`ai_product`](./ai_product.md) | deep | 5 | 15 | 5 | — | Routing between strong, local, and plain Python, product briefs, approve/edit/undo HITL, failure modes, and support-agent design review. |
| [`nextjs_fullstack`](./nextjs_fullstack.md) | deep | 7 | 15 | 7 | M11 (`forgeboard-m11-nextjs`) | App Router, explicit Server/Client boundaries, isolated server data access, validated mutations, authz... |
| [`applied_algorithms`](./applied_algorithms.md) | deep | 6 | 13 | 6 | M12 (`forgeboard-m12-algorithms`) | Complexity profiling in web apps, Map/Set indexing vs O(N²), undo stacks and bounded queues, determini... |
| [`go_fundamentals`](./go_fundamentals.md) | deep | 6 | 24 | 6 | — | Packages, types, slices, interfaces, goroutines, and testing — a practical start in Go. |
| [`web_accessibility`](./web_accessibility.md) | deep | 6 | 24 | 6 | — | POUR principles, keyboard, ARIA, contrast, and accessibility testing against WCAG 2.2. |
| [`rest_api_design`](./rest_api_design.md) | deep | 3 | 12 | 3 | — | Resource URLs, HTTP methods and status codes, idempotency, and REST API contracts. |
