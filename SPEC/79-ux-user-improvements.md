# 79 — UX user improvements (UI/UX pack)

**Status:** Implemented (2026-08)  
**Goal:** Substantive user-facing UX without new product surface area.

## Deliverables

### P0 — Core loop
1. **Thin home** (`/dashboard`): single `PrimaryMission`, streak calendar, 3 chips — no DailyQuests/Continue duplicate.
2. **Learn map** owns quests + contextual toolkit (max 3) + course groups.
3. **Register →** `postRegisterPath` (intent / friend / learn) instead of always dashboard.
4. **Lesson player**: skeleton load, retry on fail, human miss labels (`exerciseTypeLabel`), celebration, share on summary, hearts low warning, progress a11y, mobile focus default, code mobile layout class.
5. **Course path freemium**: `freemiumPathLabel` progress bar + lock copy with free count.
6. **Paywall recovery**: review / flashcards / learn CTAs + regen hint.

### P1 — Roles & discovery
7. **Onboarding wizard** (role → track → start); keys on `character.onboarding`.
8. **Persona nav**: `primaryNavForPersona` / `mobileNavForPersona` (student / parent / teacher).
9. **⌘K command palette** + search tools hub (`discoveryTools` / `filterDiscoveryTools`).
10. **Landing**: persona cards, parent/teacher links, `GuestTrial` MCQ.

### P2 — Delight & shells
11. **Celebration** + reduced-motion CSS.
12. **Streak calendar** on dashboard + profile.
13. **Parent / teacher home shells** with quick links.
14. **Touch targets** (`min-h-11`, `.touch-target`), live regions on feedback.

## Shared module

`packages/shared/src/ux.ts` (+ `ux.test.ts`):

- persona / tracks / nav presets  
- post-register path  
- contextual toolkit picker  
- freemium labels, exercise type labels  
- discovery tools, guest trial, streak calendar days  
- hearts warning level  

## API

`POST /auth/onboarding/complete` accepts wizard keys:

`wizardCompleted`, `personaStudent|Parent|Teacher`, `trackSkills|Code|Chess`, …

## Web components

| Component | Role |
|-----------|------|
| `PrimaryMission` | One next-step CTA |
| `OnboardingWizard` | First-run role/track |
| `ContextualToolkit` | Max 3 tools on Learn |
| `CommandPalette` | ⌘K discovery |
| `GuestTrial` | Landing trial |
| `Celebration` | Level/streak/cert |
| `StreakCalendar` | Visual streak |
| `PageShell` | Loading/error shell |

## Metrics

- Time to first exercise  
- Mid-lesson abandon  
- D1 retention  
- Mobile lesson completion  

## Non-goals

- New primary nav deep tracks  
- Full icon system rewrite  
- Native apps  
