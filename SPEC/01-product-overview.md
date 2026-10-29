# 01 — Product Overview

## Vision

EduForge is an **education-first SaaS** that combines skill tracks in one character-driven product:

1. **English** — Duolingo-style interactive lessons  
2. **Chess** — theory, puzzles, online PvP + bot practice  
3. **Typing** — speed & accuracy trainer (EN + UK layouts)  
4. **Speed reading** — RSVP, chunking, comprehension  
5. **Logic** — sequences, patterns, verbal puzzles (LogicLike-style)  
6. **Programming** — Mimo-style path (HTML → QA) + playground + mini-projects  

Users register a **character**, gain **per-course XP/levels**, and contribute to a **global character score**. Chess additionally maintains a separate **Elo** rating.

## Locale

| Surface | Language |
|---------|----------|
| Product UI | **Ukrainian + English** toggle (`LocaleProvider`) |
| Default document lang | `uk` |
| English course content | English prompts + Ukrainian explanations/hints |
| Other courses | Dual `titleUk`/`titleEn`, `promptUk`/`promptEn` where seeded |

Russian is **not** used in product copy.

## Target users

- Individual learners (the product is free)  
- Adults and teens practicing languages, mental skills, chess, and coding  
- Teachers / school orgs (B2B classes, homework, gradebook)  
- Parents linked to student accounts  

## Core user journeys

1. **Register** → character created → onboarding checklist  
2. **Complete a lesson** → course XP + global XP + streak  
3. **Play chess online** or vs bot → Elo only for rated human games  
4. **Programming hub** → path units, mini-projects, weekly minis race  
5. **Playground** → client sandbox challenges + race  
6. **Climb leaderboards** (global / course / chess / minis)  
7. **Schools / homework / parents** for classroom and family loops  
8. **Admin** edits content, runs ops digests, views product metrics  

## Feature matrix

| Feature | Access |
|---------|--------|
| Lessons | All lessons, every account |
| Hearts (lives) | 5, regen about 30 min |
| Rated chess | Unlimited |
| Bot chess | Yes |
| Programming minis / playground | Yes |
| Leaderboards | Yes |
| Streak shields (shop XP) | Yes (capped) |
| Admin CMS / ops | Role-gated |

## Non-goals (product freeze)

- Full remote **server-side** multi-language Docker code judge  
- Native mobile apps  
- AI-generated full course pipeline  
- Video hosting LMS  

**Allowed:** client-side C++ subset runner (JSCPP / future WASM) for playground + `code_run` labs — see SPEC 74.

## Success metrics (product)

- D1 / D7 retention via streaks  
- Lessons completed per user per week  
- Programming minis completions + weekly race participation  
- Chess games finished rate  
- Parent digest open / homework completion (B2B)  
