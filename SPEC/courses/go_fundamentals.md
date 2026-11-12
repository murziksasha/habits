# Go Fundamentals

Slug: `go_fundamentals`
Group: deep
Hub: `/go-fundamentals`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `programming`
Recommended next: `devops`

## What this course is

Packages, modules, types, slices, interfaces, goroutines, and testing — a bilingual practical start in Go.

## Program

### `go_packages_modules` — Packages, modules, and name visibility

- `go-mod-init` — A module is the unit of versioning; a package is the unit of compilation
- `go-exported-names` — A capital letter is export: a lowercase name is not visible from another package
- `go-internal-dir` — The internal/ folder: import is allowed only to the ancestor tree
- `go_packages_modules-exam` — Exam: Go modules [exam]

### `go_types_slices` — Types, slices, and maps

- `go-slice-share` — A slice is a window on an array: a subslice can change shared elements
- `go-map-gotcha` — A map: reading a missing key yields zero; a write needs initialization
- `go-struct-tag` — Structs and tags: JSON names need not match the fields
- `go_types_slices-exam` — Exam: slices and maps [exam]

### `go_interfaces_errors` — Interfaces, errors, and methods

- `go-interface-small` — A small interface: what the caller needs, not 'every method of the package'
- `go-error-wrap` — Wrapping errors: %w keeps the chain, %v does not
- `go-methods-ptr` — A method on a pointer can change the receiver; on a value, a copy
- `go_interfaces_errors-exam` — Exam: interfaces and errors [exam]

### `go_concurrency` — Goroutines, channels, and context

- `go-goroutine-leak` — A goroutine that waits forever is a leak: give it an exit
- `go-channel-close` — A channel: the writer closes it; a read from a closed channel yields zero and ok=false
- `go-context-deadline` — A context carries a deadline and request values, not 'every dependency in the world'
- `go_concurrency-exam` — Exam: goroutines and context [exam]

### `go_testing_http` — Tests and the HTTP server

- `go-table-test` — A table test: one loop, many cases, the case name in t.Run
- `go-httptest` — httptest.NewRecorder and NewServer test a handler without a live port
- `go-http-handler` — A handler bounds the body, sets timeouts, and shuts the server down cleanly
- `go_testing_http-exam` — Exam: tests and HTTP [exam]

### `go_tooling_release` — Tooling, builds, and release

- `go-vet-staticcheck` — go test, vet, and staticcheck catch mistakes before review
- `go-embed-assets` — embed bakes static files into the binary: one file for deploy
- `go-cross-build` — Cross-compilation and ldflags: one CI builds linux/amd64 without extra CGO
- `go_tooling_release-exam` — Exam: Go builds [exam]

