# 09 — Frontend

## Stack

- Next.js 15 App Router  
- React 19 client components for interactive surfaces  
- Tailwind CSS + Duolingo-inspired design tokens  
- Monaco Editor (playground + code exercises)  
- `react-chessboard` + `chess.js`  
- Socket.IO client for live chess  

## Locale

- Root layout default `lang="uk"`  
- `LocaleProvider` + UK/EN toggle in nav  
- Copy from `@eduforge/shared` via `getUI(locale)`  

## Routes

| Path | Purpose |
|------|---------|
| `/` | Marketing landing |
| `/register`, `/login` | Auth |
| `/forgot-password`, `/reset-password` | Password recovery |
| `/dashboard` | Character, next steps, exams, programming/race teaser |
| `/learn` | Learning map: recommended, exams, groups, toolkit |
| `/courses`, `/courses/[slug]` | Catalog + path map |
| `/courses/[slug]/lessons/[lessonId]` | Lesson player (soft-grade, skip, solution, course/character level-up & rewards summary) |
| `/courses/electrical_engineering/lab` | SPICE circuit editor, local guest preview, authenticated server preview and personal cloud projects |
| `/programming`, `/programming/[stack]` | Programming hub + stack filter |
| `/typescript` | TypeScript course hub |
| `/html-semantics` | HTML Semantics deep hub |
| `/css-layout` | CSS Flex/Grid deep hub |
| `/qa-theory` | QA Theory deep hub |
| `/feedback` | User → developer feedback |
| `/admin/feedback` | Admin feedback triage |
| `/playground` | Client sandbox + challenges + races |
| `/embed/playground` | Public embed / share |
| `/placement`, `/placement/programming` | Placement tests |
| `/play` | Online + bot chess |
| `/leaderboard` | Rankings |
| `/friends` | Friends + minis + weekly race vs friends |
| `/challenges` | Weekly XP challenge |
| `/certificates`, `/certificates/[code]` | Certificates (branded art, PDF/PNG download, print) |
| `/homework`, `/schools/*` | Classroom |
| `/parents`, `/parents/child/[studentId]` | Parent portal + digest |
| `/flashcards`, `/tutor`, `/review`, `/quests`, `/shop` | Learning tools |
| `/calendar`, `/export`, `/reports`, `/focus`, `/notes` | Learning OS (`/calendar` = My progress, linked from Dashboard, Learn, Profile) |
| `/bookmarks`, `/search`, `/referrals` | Extra UX |
| `/achievements`, `/u/[userId]` | Social profile |
| `/pricing` | Legacy pricing URL; permanently redirects to `/courses` (catalog; all courses are free) |
| `/profile` | Character, push, minis, certificates |
| `/admin/*` | Modular admin shell: CMS, appearance, security, metrics, ops (SPEC 72) |
| `/tournaments/*` | Chess tournaments |

## Navigation

- Desktop: **persona primary** (student / parent / teacher) + **More** dropdown (SPEC 57 + 79)  
- Mobile: bottom 5 persona slots + hamburger drawer  
- ⌘K / Ctrl+K command palette (`CommandPalette`)  
- Admin link when `user.role === "admin"`  
- Embed routes hide chrome  
- School/family in More only for parent/teacher personas  

## Key components

| Component | Role |
|-----------|------|
| `Nav` | Global navigation + persona + ⌘K |
| `OnboardingCard` | Checklist on dashboard |
| `OnboardingWizard` | Role + track first-run |
| `PrimaryMission` | Single next-step CTA |
| `ContextualToolkit` | Max 3 contextual tools on Learn |
| `ExercisePlayer` | All exercise types + soft-grade / solution |
| `CircuitEditor` | Schematic/netlist editing, analysis configuration, simulation output and waveforms |
| `MonacoEditor` | Code editor |
| `HeartsBar` | Lives display |
| `XpBar` | Level progress bar |
| `Celebration` / `StreakCalendar` | Reduced-motion delight + recorded study-date calendar |
| `GuestTrial` | Landing no-auth MCQ |
| `StickyContinueShell` | Sticky next-step on secondary routes |
| `HeartsChrome` | Nav hearts + regen countdown |
| `OnlineStatusWatcher` | Offline / online toasts |
| `PageLoading` | Consistent loading skeleton |
| `DeepCourseHub` | Deep track hubs + PageLoading |
| `LessonShortcutsHelp` | Lesson `?` keyboard modal |
| `NodeStudio` | WebContainers Node lab (`/studio/node`) |
| Live classroom | Socket.IO collab (`/classroom/live/[classId]`) |
| `SpeakButton` | Pronunciation (Web Speech) |
| `PushToggle` | Web push subscription |
| `NotificationsBell` | In-app notifications |

## Learning-quality behavior (2026-11-15)

- Choice exercises display a deterministic permutation keyed by exercise id (and nested question id where needed). Mouse and keyboard selection submit the original content index. Reload does not change the order for the same exercise.
- `ExercisePlayer` reports hint use, solution reveal, and wrong soft attempts to the lesson/practice session. Lesson submission includes these signals per answer; they are currently held in memory and do not survive lesson reload.
- Global Continue uses the server's unfinished current-version target; a learner is not automatically sent back to the last completed lesson.
- The electrical laboratory replaces the editor instance when loading a template, restoring a draft, or loading a server version. Analysis settings follow the document. A save conflict pauses autosave and offers load-server, save-as-copy, and JSON export.

The stale saved-revision issue, account-scoped drafts, duplicate main CTAs, cosmetic duration selector, review error states, and remaining EN copy are tracked in [CURRENT](./CURRENT.md#learning-quality-follow-up). These behaviors still require browser validation on desktop and mobile.

## Auth context

`AuthProvider` loads `/auth/me`, exposes login/register/logout, stores token.  
Protected pages redirect to `/login` when unauthenticated.

## API client

`src/lib/api.ts` — `fetch` wrapper with JSON body, Bearer token, throws errors with `status` + `data`.

## Environment (public)

```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_REALTIME_URL=http://localhost:4001
```
