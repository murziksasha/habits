# 31 — Parent programming/PG progress + playground share

## Parent portal — coding progress

`GET /parents/children/:studentId/progress` now includes:

| Field | Description |
|-------|-------------|
| `programming` | Per-unit lesson counts, path complete flag |
| `playground` | Solved challenges, XP, list of solved titles |
| `certificates` | Issued certs (code, titles, course) |
| `milestones` | `prog_*` / `pg_*` milestones for context |

### Programming object

```json
{
  "lessonsCompleted": 12,
  "lessonsTotal": 28,
  "unitsDone": 3,
  "unitsTotal": 10,
  "pathComplete": false,
  "units": [{ "slug": "html", "done": 3, "total": 3, "complete": true, ... }]
}
```

### UI

`/parents/child/[studentId]`:

- Programming path progress bar + unit checklist
- Playground solved list + XP bar
- Certificates links

## Playground share link

Client-only share (no DB):

1. Button **Share code** encodes `{ v, lang, code, html?, css?, challengeId? }` as base64url
2. URL: `/playground?share=<payload>` (cap ~8 KB encoded)
3. On load, decode → fill Monaco panes → strip query via `history.replaceState`

Helpers: `apps/web/src/lib/playground-share.ts`

## i18n

- `parents.programmingTitle`, `playgroundTitle`, `pathComplete`, …
- `playground.share`, `shareCopied`, `shareLoaded`, `shareTooLarge`

## Related

- SPEC 17 parents base
- SPEC 23–30 programming / playground
