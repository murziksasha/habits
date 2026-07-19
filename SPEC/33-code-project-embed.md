# 33 — Multi-file code projects + embed playground

## Exercise type: `code_project`

Mini multi-file projects in programming lessons.

### Content shape

```ts
{
  type: "code_project",
  promptUk / promptEn,
  files: [
    { id: "html", name: "index.html", language: "html", starter: "..." },
    { id: "css", name: "styles.css", language: "css", starter: "..." },
    { id: "js", name: "main.js", language: "javascript", starter: "..." },
  ],
  checks: [
    { fileId: "html", contains: ["<h1", "EduForge"] },
    { fileId: "css", contains: [".card", "padding"] },
  ],
  caseSensitive?: boolean // default true
}
```

### Grading (`gradeExercise`)

- Answer: `{ files: Record<fileId, string> }` or `{ files: { id, content }[] }`
- All `checks[].contains` substrings must appear in the matching file
- Meta on fail: `{ missing: ["html:<h1", ...] }`

### UI

`CodeProjectExercise` in `exercises.tsx`: file tabs + Monaco per file.  
Live sandboxed preview (HTML/CSS/JS) — see SPEC 34.

### Seed lessons

| Lesson slug | Unit | Focus |
|-------------|------|--------|
| `html-mini-card` | html | HTML + CSS card |
| `js-mini-counter` | js | HTML + CSS + JS counter |

## Embed playground

| Route | Auth | Nav |
|-------|------|-----|
| `/embed/playground` | **Public** (no login) | Hidden (`Nav` skips `/embed*`) |
| `/playground` | Logged-in | Full chrome |

Same `?share=` payload as stage 31.

Helpers:

- `buildPlaygroundEmbedUrl(origin, payload)`
- `playgroundEmbedIframeHtml(url)` → `<iframe …>`

Playground buttons:

1. **Share code** → full `/playground?share=`
2. **Copy embed** → iframe HTML for blogs / LMS

## Related

- SPEC 23 programming track
- SPEC 29 Monaco
- SPEC 31 share URL
