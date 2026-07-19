# 49 — Public profile minis + certificate badges

## Public profile

`GET /profiles/:userId` adds:

```json
"programmingMinis": {
  "total": 10,
  "completed": 4,
  "allDone": false,
  "slugsDone": ["html-mini-card", "..."]
}
```

UI `/u/[userId]`:

- Progress bar for minis
- “All minis!” badge when complete
- Self link to `/programming`

## Certificates list

`/certificates` cards show badges by title:

| Badge | Match |
|-------|--------|
| Path | `Programming Path` |
| Minis | `Programming Minis` |
| Course | other programming cert |

## Related

- SPEC 48 minis certificate
- SPEC 15 certificates / profiles
