# 56 — Own profile hub (minis + certificates)

## Product

`/profile` is the learner’s private hub (beyond avatar edit + push):

| Block | Source |
|-------|--------|
| Level / streak / shields / XP | `/auth/me` character |
| Programming minis progress | `GET /profiles/:selfId` → `programmingMinis` |
| Certificates + Path/Minis badges | `GET /certificates/mine` |
| Public profile link | `/u/:userId` |
| Push | existing `PushToggle` |

## Badges

Certificate title heuristics (same as public certs list):

| Badge | Title contains |
|-------|----------------|
| Path | `Path` |
| Minis | `Minis` |
| Course | `Programming` (other) |

## Related

- SPEC 49 public profile minis + cert badges
- SPEC 38 streak shields
