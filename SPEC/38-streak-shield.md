# 38 — Streak shield (freeze) polish

## Product

**Streak shield** (DB: `characters.streak_freezes`) keeps the daily streak when the learner returns after a gap.

| Event | Streak | Freezes |
|-------|--------|---------|
| Same calendar day | unchanged | unchanged |
| Active yesterday → today | +1 | unchanged |
| Gap + freezes ≥ 1 | keep (≥1) | −1, notify |
| Gap + freezes 0 | reset to 1 | 0 |

## Shared logic

`packages/shared/src/streak.ts`:

- `applyStreakOnActivity` — pure, unit-tested
- `addStreakFreezes` — cap at `MAX_STREAK_FREEZES` (**5**)
- Constants for pack cost / count

## Shop

| Item id | Cost | Grants |
|---------|------|--------|
| `streak_freeze` | 80 XP | 1 shield |
| `streak_shield_pack` | 200 XP | 3 shields |

- Buy blocked when at max (`freezes_full` / UI disabled)
- Branding 🛡️ (was ❄️)

## API

Lesson submit returns:

```json
{ "streakProtected": true, "streakDays": 12, "streakFreezes": 1 }
```

On protect: notification + activity `streak_shield_used`.

## UI

- Dashboard: shield count + “Buy shield” link if 0
- Shop: balance `shields n/max`, pack item, hint
- Lesson complete: message if shield used

## Related

- SPEC 19 shop
- SPEC 06 gamification
