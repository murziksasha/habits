# 06 — Gamification

## Two-layer progression

1. **Course XP / level** — independent per course (`UserCourseProgress`)  
2. **Character global XP / level** — sum of contributions from course activity + chess games  

Formula (shared package):

- Cumulative XP for level `n` ≈ `100 * (n - 1)^1.5`  
- `levelFromXp(xp)` walks until next threshold  

## XP awards

| Source | Function | Notes |
|--------|----------|-------|
| English / generic lesson | `lessonXpAward` | accuracy + first clear + difficulty |
| Typing | `typingXpAward(wpm, accuracy)` | Caps growth |
| Speed reading | `readingXpAward(wpm, comprehension)` | Mix speed + recall |
| Logic | `logicXpAward(difficulty, usedHint)` | Hint reduces XP |
| Chess puzzle | `chessPuzzleXpAward` | First clear bonus |
| Chess game | `chessGameXpAward(result, rated)` | Win/draw/loss |

Repeat completion of a lesson awards **~35%** of calculated XP.

Global contribution:

```
globalGain = round(courseXpGain * COURSE_GLOBAL_WEIGHT[slug])
```

Weights: chess 1.1, typing/speed_reading 0.9, others 1.0.

## Streaks

On successful activity day:

- If last active was **yesterday** → `streakDays + 1`  
- Else if not today → reset to `1`  
- Stored on `Character.lastActiveDate` (ISO date string)  

## Hearts (lives)

| Plan | Max | On failed lesson (accuracy &lt; 0.5) | Regen |
|------|-----|--------------------------------------|-------|
| free | 5 | −1 heart | +1 every 30 minutes |
| premium | 999 (∞ in UI) | no loss | always full |

Implemented via `regenerateHearts` + course progress timestamps.

## Chess Elo

- Default 1000  
- Standard expected-score formula with K=32 (&lt;30 games) or K=20  
- Only **rated** finished human games update Elo  
- Bot games never touch Elo  

## Leaderboards

- Global: `characters.globalXp`  
- Course: `user_course_progress.xp`  
- Chess: `chess_ratings.elo`  

## Onboarding checklist

Flags on `character.onboarding`:

- `completedFirstLesson` (also inferred from globalXp &gt; 0)  
- `triedChess`  
- `triedTyping`  
- `viewedLeaderboard`  
- `exploredPricing`  
- `dismissed`  
