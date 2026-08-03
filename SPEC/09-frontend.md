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
| `/courses/[slug]/lessons/[lessonId]` | Lesson player (soft-grade, skip, solution) |
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
| `/certificates`, `/certificates/[code]` | Certificates |
| `/homework`, `/schools/*` | Classroom |
| `/parents`, `/parents/child/[studentId]` | Parent portal + digest |
| `/flashcards`, `/tutor`, `/review`, `/quests`, `/shop` | Learning tools |
| `/calendar`, `/export`, `/reports`, `/focus`, `/notes` | Learning OS |
| `/bookmarks`, `/search`, `/referrals` | Extra UX |
| `/achievements`, `/u/[userId]` | Social profile |
| `/pricing` | Freemium / Premium |
| `/profile` | Character, push, minis, certificates |
| `/admin/*` | Modular admin shell: CMS, appearance, security, metrics, ops (SPEC 72) |
| `/tournaments/*` | Chess tournaments |

## Navigation

- Desktop: **primary** links + **More** dropdown (SPEC 57)  
- Mobile: hamburger + full list  
- Admin link when `user.role === "admin"`  
- Embed routes hide chrome  

## Key components

| Component | Role |
|-----------|------|
| `Nav` | Global navigation |
| `OnboardingCard` | Checklist on dashboard |
| `ExercisePlayer` | All exercise types + soft-grade / solution |
| `MonacoEditor` | Code editor |
| `HeartsBar` | Lives display |
| `XpBar` | Level progress bar |
| `SpeakButton` | Pronunciation (Web Speech) |
| `PushToggle` | Web push subscription |
| `NotificationsBell` | In-app notifications |

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
