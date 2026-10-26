# 84 — PageLoading sweep + empty states + play seek sticky

**Status:** Implemented (2026-08)  
**Builds on:** SPEC 79–83

## Deliverables

1. **PageLoading** on: notes, focus, feedback, portfolio, homework, placement (EN + programming), export, schools, family.
2. **Empty states**: notes, homework (no assignments).
3. **Play**: sticky Continue also hidden while **seeking** (matchmaking), not only during match.

## Surface list (quality floor)

| Route | Shell |
|-------|--------|
| `/notes` | PageLoading + EmptyState |
| `/focus` | PageLoading |
| `/feedback` | PageLoading |
| `/portfolio` | PageLoading |
| `/homework` | PageLoading + EmptyState |
| `/placement`, `/placement/programming` | PageLoading |
| `/export` | PageLoading |
| `/schools` | PageLoading |
| `/family` | PageLoading |
