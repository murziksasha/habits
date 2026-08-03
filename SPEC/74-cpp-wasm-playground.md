# 74 — Client C++ runner (playground + code_run)

## Goal

Let learners **compile/interpret and run** small C++ snippets in the browser for playground challenges and `embedded_cpp` labs — **without** a server-side Docker judge.

## Architecture

| Piece | Role |
|--------|------|
| `NEXT_PUBLIC_CPP_RUNNER` | `auto` \| `jscpp` \| `wasm` \| `mock` |
| `apps/web/src/lib/cpp-runner.ts` | `runCpp` / `runCppTests` |
| Backend **jscpp** | [JSCPP](https://github.com/felixhao28/JSCPP) — pure-JS C++ **subset** interpreter (not full clang) |
| Backend **mock** | CI/SSR: preflight + simple `cout` inference / `// mock-stdout:` |
| Backend **wasm** | Alias of jscpp for now; reserved for future clang-wasm assets |

Playground lang `cpp` uses the same client → stdout match path as JS challenges.  
Server **never** executes student C++.

## Exercise type `code_run`

```ts
{
  type: "code_run",
  language: "cpp",
  starter: string,
  tests: { stdin?: string; stdout: string }[],
  requiredSource?: string[],
  forbiddenSource?: string[],
}
```

- **Client:** Run tests via JSCPP; soft-block submit until pass.  
- **Server (`grade.ts`):** `requiredSource` / `forbiddenSource` + require `main(` for cpp.

## Limits (honest)

- Subset C++ (iostream, basic control flow, simple STL depending on JSCPP).  
- No FreeRTOS / ROS / Qt / multi-file CMake in the runner.  
- Not a replacement for desktop g++/ASan.

## Related

- SPEC 01 non-goals: still no multi-lang **server** Docker judge  
- SPEC 24/25 playground  
- SPEC 73 embedded_cpp miltech  
