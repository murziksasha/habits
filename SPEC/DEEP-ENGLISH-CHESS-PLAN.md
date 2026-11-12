# Deep learning plan: English and Chess

**Branch:** `newCourses` (PR #15 into `dev`)
**Date:** 2026-11-12
**Goal:** a CEFR-aligned deep English track for Ukrainian speakers, and a beginner→advanced Chess track, with maximum information depth, many new bilingual (uk+en) lessons, and small feature hooks that already exist in the app (paths, flashcards, placement, course parts).

This document is the source of truth for the work. A successor should read **Progress log** at the bottom and continue from the first unfinished batch.

---

## 1. Audit of what exists today

Counts measured from `@eduforge/content` on `newCourses` (after PR #13 expansion and the learning-improvements follow-up):

| Course   | Units | Lessons | Exams | Free non-exam (spec) | Locales |
|----------|------:|--------:|------:|---------------------:|---------|
| `english` |    18 |      86 |     3 |                   11 | uk+en   |
| `chess`   |    13 |      62 |     3 |                    7 | uk+en   |

Source layout (do **not** rewrite these files; new work is additive):

- Core: `packages/content/src/english.ts`, `packages/content/src/chess.ts`
- First expansion: `packages/content/src/expansion/english-exp.ts`, `chess-exp.ts` (Nov 2026, +40 / +30)
- English also appends `learning-skills` from `deep-units.ts` (talking about learning, study phrasals)
- Exercise schemas: `packages/content/src/types.ts`, grading in `@eduforge/shared`
- Chess engine helpers: `packages/chess-core` (chess.js), FEN + SAN puzzles
- Speak/TTS: `SpeakButton` already appears on MCQ prompts (and flashcards); `translate` exercises carry a `source` string the UI can speak. There is **no** separate listening exercise type — listening-style work should use speakable English `source` / prompt sentences and comprehension passages.
- Concept cards: `bodyUk`/`bodyEn` max **6000** chars; up to **8** key points.
- Quality gate: bilingual titles and prompts, unique slugs/ids, explain samples that pass their own rubric, no empty unpaired explanations.

### 1.1 English — current map

| Unit slug | Level (approx.) | Lessons | What's covered | Exam? |
|-----------|-----------------|--------:|----------------|-------|
| `basics-1` | A1 | 8 | Greetings, introductions, numbers 1–10, food, daily phrases, Present Simple, colours/family, questions | no |
| `basics-2` | A1–A2 | 3 | Time, places, Past Simple (intro only) | no |
| `travel` | A2 functional | 4 | Airport, hotel, restaurant, shopping | no |
| `work-life` | A2 | 8 | Office, Present Continuous, future plans (thin), opinions, review, travel phrases, email soft skills (thin), one idioms lesson | no |
| `conversation` | A2 | 4 | Weather / weekend small talk, polite requests, agree & disagree | no |
| `meetings-phone` | B1 functional | 4 | Phone, opening a meeting, clarifying, wrapping up | no |
| `dialogues-daily` | A2–B1 | 4 | Coffee shop, directions, appointments | **yes** |
| `work-collaboration` | B1 | 5 | Chat updates, meeting comments, customer tone, deadlines | **yes** |
| `engineering-collaboration-en` | B1–B2 IT | 4 | Bug reports, PR comments, tradeoffs & docs | **yes** |
| `learning-skills` | A2–B1 | 2 | Talking about learning, study phrasals | no |
| `articles-determiners` | A2–B1 | 5 | a/an, the, zero, some/any, quantifiers | no |
| `conditionals` | B1–B2 | 5 | Zero–third and mixed | no |
| `phrasal-work` | B1 | 5 | Work/study phrasals, separable vs not | no |
| `reported-speech` | B1–B2 | 5 | Statements, questions, commands, deixis | no |
| `prepositions-place-time` | A2–B1 | 5 | in/on/at, movement, dependent prepositions | no |
| `relative-clauses` | B1–B2 | 5 | who/which/that, where/when/whose, omission, non-defining | no |
| `modal-verbs` | A2–B1 | 5 | can/could, must/have to/should, may/might, will/would | no |
| `tech-english` | B1–B2 | 5 | Work emails, stand-ups, bugs, docs/ADRs, technical meetings | no |

**Exercise types already used:** `fill_blank`, `match`, `mcq`, `order_words`, `translate`. Expansion lessons are thinner than the deep-learning standard: typically a short concept + 2–3 retrievals, **no `explain`**, **no unit exam**. Original early lessons often have 2–3 exercises and short or missing contrast with Ukrainian.

### 1.2 English — gaps (what a deep track must add)

These topics are missing or only touched in passing. They are the curriculum below.

**Grammar (large holes, especially for Ukrainian speakers):**

- Present Perfect and Present Perfect Continuous — **critical**. Ukrainian has no direct equivalent; *я вже зробив* is often wrongly rendered as Past Simple.
- Past Continuous in depth; Past Perfect / Past Perfect Continuous; narrative tense combinations.
- Future system: *will* vs *going to* vs Present Continuous vs Present Simple (timetables), Future Continuous, Future Perfect.
- *used to* / *would* / *be used to* / *get used to*.
- **Passive** in all common tenses; impersonal *it is said*; causative *have/get something done*.
- Gerunds vs infinitives, including meaning changes (*stop doing* / *stop to do*).
- Comparatives, superlatives, *as…as*, *too/enough*, *so/such*.
- Adjective vs adverb, word order, *-ed/-ing* adjectives.
- Question tags; subject vs object questions (beyond the A1 `questions` lesson); indirect questions.
- *I wish* / *if only* / *would rather* / *it's time*.
- Advanced modals: *must have*, *should have*, *needn't have* vs *didn't need to*, *be supposed to*.
- Discourse markers and linking (*although* / *despite* / *however*; cause, result, purpose).
- C1 style: inversion, clefts, participle clauses, hedging, nominalisation.
- Articles at a higher level (geographical names, institutions) — basics already exist; we go further, we do not repeat `en-a-an`.

**Vocabulary and usage:**

- Systematic collocations (*make/do*, *get*, *strong* adjective+noun).
- Confusing words and **false friends** with Ukrainian (*accurate/акuratний*, *magazine/магазин*, *prospect*, *list*, *actual*, *conductor*, *fabric*, *intelligent* vs *інтелігентний*, etc.).
- Word formation (prefixes, suffixes).
- Phrasal verbs beyond work/study (daily life, feelings, travel, problems).
- Idioms beyond the single `idioms-boost` lesson, with register.
- Thematic vocabulary with collocations: health, housing, education, environment, media, money, career, personality, crime, culture.

**Pronunciation — almost entirely missing:**

- IPA overview for Ukrainian speakers.
- Vowel length and quality: ship/sheep, *æ/ʌ/ɑː*, schwa, *ɜː*.
- Consonants that typically fail: *θ/ð* (often /s z t d/), *w* vs *v*, English *r*, *h* dropping, *ŋ*, final voiced consonants.
- Word stress, sentence stress, intonation (yes/no vs *wh-*), contrastive stress, weak forms and connected speech.

**Skills:**

- Reading: no dedicated `comprehension` lessons (the type already exists).
- Listening-style: no bank of speakable sentences / dictation-like fills; we will use existing SpeakButton + `source` / sentence prompts.
- Writing: only a thin email lesson; missing formal/informal emails, complaints, essays, CV, cover letter.
- Speaking/functional: dialogues exist at A2–B1; missing storytelling, short presentations, hedging, job interviews.
- Business & IT: `tech-english` and engineering units exist; missing negotiations, IT interviews, stakeholder updates, incident language in more depth.
- Exam prep: **no** IELTS / FCE-style task training.

**Features:** two flashcard decks (`english-basics`, `english-meetings`); `ENGLISH_PLACEMENT` is a 10-item CEFR-ish bank in `packages/shared/src/placement.ts` that does not yet reflect Perfect / Passive / C1 items well enough; no English or Chess **learning path**; no `COURSE_PARTS` for either course (only DevOps has parts today).

### 1.3 Chess — current map

| Unit slug | Lessons | What's covered | Exam? |
|-----------|--------:|----------------|-------|
| `rules` | 3 | Board and pieces, check and mate, special moves | no |
| `tactics` | 7 | Mate in 1 (A, B), forks, pins/skewers, more puzzles, back-rank mates, opening ideas (thin) | no |
| `endgames-intro` | 3 | Opposition basics, king and pawn, ladder mate | no |
| `tactics-boost` | 3 | Fork, pin, discovered attack | no |
| `tactics-practice-2` | 5 | Mate-pattern recap, fork/pin drills, skewer intro, mix | no |
| `mixed-tactics-endgames` | 9 | Double attack, deflection & clearance, back-rank traps, K+P races, Lucena & Philidor (one lesson), minor-piece conversion, stalemate; two exams | **yes** (2) |
| `endgame-accuracy-review` | 2 | Opposition & passed pawns, mixed calculation exam | **yes** (1) |
| `opening-principles-plus` | 5 | Centre and tension, development, delayed castling, premature queen, review | no |
| `pawn-structures` | 5 | IQP, doubled, passed, backward, islands | no |
| `middlegame-plans` | 5 | Knight outpost, weak squares, bishop pair, open file, luft | no |
| `rook-endgames-plus` | 5 | Rook behind passed pawn, cutting the king, activity, Philidor-style, building a bridge | no |
| `calculation-hygiene` | 5 | CCT, counting, zwischenzug, blunder check, when to stop | no |
| `practical-study` | 5 | Time, annotating, studying a model game, repertoire idea, review | no |

**Exercise types:** `chess_lesson` (FEN + notes + optional quiz), `chess_puzzle` (FEN + `solutionSans` + difficulty 1–5), `mcq`. Expansion lessons usually have one `chess_lesson` and two MCQs — good notes, but few verified puzzles, and **no unit exams**.

Existing FENs in expansion (Queen's Gambit tension, etc.) are real positions; there is **no automated test** that every FEN is legal and every puzzle SAN sequence is a legal solution.

### 1.4 Chess — gaps

- Algebraic **notation**, piece values, full **draw rules** (stalemate already touched; threefold, 50-move, insufficient material, dead position), when castling is illegal, en passant and promotion in more depth.
- Tactics motifs only partly covered: **decoy, overloading, interference, x-ray, attraction, removing the defender**, clearance as a named theme, quiet moves, exchange sacrifice. Deflection and zwischenzug exist but are thin.
- **Mating patterns** as a library: smothered, Arabian, Anastasia, Boden, Legal, Opera/corridor, Morphy, Damiano, Lolli, Pillsbury, Greek gift. Only a recap + mate-in-1 + back rank + ladder exist. **Mate in two** method is missing.
- **Openings with ideas, not move-lists:** Italian (Giuoco Piano, Evans, Two Knights), Ruy Lopez (Exchange, Closed, Berlin idea), Queen's Gambit (accepted / declined / Slav idea — QG tension is one lesson today), London, Sicilian (Open structures, Dragon, Najdorf/Scheveningen ideas, Rossolimo), French (Advance, Winawer, Tarrasch), Caro-Kann (Classical, Advance, Panov), King's Indian (typical plans). Repertoire lesson exists only as a meta-idea.
- Middlegame: **prophylaxis**, planning method, evaluation, **bishop vs knight**, bad/good bishops, opposite-coloured bishops in the middlegame, **attacking the king** (same-side and opposite-side, pawn storms, Bxh7+), defending, **pawn breaks**, minority attack, hanging pawns, pawn chains, space and initiative.
- Endgames: opposition types (distant, diagonal, virtual), **key squares**, triangulation, corresponding squares, rook-pawn exceptions; Lucena and Philidor **in full**; short-side defence, Vancura idea, rook vs pawn; **K+B+N mate method**, two bishops, B vs N, same-colour and opposite-bishop endings in more depth; queen vs pawn on the 7th, fortresses.
- **Calculation and visualisation** as drills (not only hygiene tips).
- **Famous-game** analysis with legal FENs from critical positions.
- **Tournament practice and psychology:** time trouble, offering/accepting draws, preparing, Swiss and ratings, fair play, handling losses.

Flashcards: one small `chess-terms` deck (pieces, check, fork/pin/skewer). No opening-idea cards.

---

## 2. Design principles

1. **Additive.** Original and first-expansion files stay unchanged. New modules: `packages/content/src/expansion/english-deep.ts` and `chess-deep.ts`, generated from `scripts/gen-expansion/deep/`. Wired in `packages/content/src/index.ts` as a second expand step after the existing one. Unique slugs with prefixes `en-d-` (lessons), `en-deep-` (units), `ch-d-`, `ch-deep-`. Exercise ids derive from the lesson slug (`…-c`, `…-r1`, `…-e`, exam `…-q1`).
2. **Deep, not padded.** Every teach lesson opens with a rich bilingual `concept` (examples, contrast with Ukrainian where it matters, typical mistakes, 4–8 key points), then **at least three** retrieval exercises of mixed types, then an `explain` with sample answers that pass the rubric (`anyOf` stems present in both samples). Exams have **at least four** questions and **no** concept card.
3. **No duplication.** New lessons must not repeat an existing slug or the same narrow teaching point (e.g. do not re-teach `a` vs `an`). Review lessons may *refer* to earlier material and contrast it.
4. **Ukrainian is the primary explanation language.** `bodyUk` / `notesUk` explain contrasts (*в українській немає артиклів*, *Present Perfect ≠ минулий час*), false friends, and typical interference. `bodyEn` is a full equivalent, not a stub.
5. **Genuine chess.** Every `chess_lesson` and `chess_puzzle` FEN must parse as a legal position in `chess.js`. Every `solutionSans` sequence must be legal from that FEN; mate puzzles must end in checkmate. A new unit test in `@eduforge/content` (or `@eduforge/chess-core`) fails CI otherwise. Openings teach **plans and pawn structures**, not memorised 15-move lines.
6. **Copyright.** Original explanations. Famous games are public-domain historical events; we describe critical positions and ideas, we do not paste a copyrighted book annotation.
7. **Small batches.** Generate, typecheck a slice, commit locally, update this log, push `newCourses` periodically with a normal (never force) push. Never push to `dev` or `main`.

### 2.1 Lesson shape (English)

```
concept  — theory, UK contrast, mistakes, examples (body 800–2500 chars per locale)
3–5 retrievals — mix of mcq, fill_blank, translate, match, order_words, comprehension
explain  — "поясніть своїми словами", key ideas with anyOf stems, sampleUk + sampleEn
```

Listening-style: put clear English sentences in `source` (translate), `sentence` (fill), or MCQ options so `SpeakButton` can play and the learner can practise. Pronunciation units include IPA in the concept body and minimal-pair MCQs.

### 2.2 Lesson shape (Chess)

```
chess_lesson — legal FEN, rich notesUk/notesEn (ideas, plans, typical mistakes), quiz
1–2 chess_puzzle — legal FEN, solutionSans validated, difficulty 1–5
and/or 1–2 mcq — conceptual (when to play a break, which plan, which motif)
optional explain — for strategy / psychology / method lessons (not for pure mate-in-1 drills)
```

Theory-heavy lessons (prophylaxis, psychology, visualisation method) still show a relevant FEN. Famous-game lessons use a critical position, not the whole PGN in the concept body.

### 2.3 Unit shape

Default: **5 teach lessons + 1 exam** (exam difficulty matches the unit). A few skill units may have 4 teach + exam if the topic is naturally tighter; we still meet the global lesson targets.

---

## 3. English curriculum (new units)

Target: **24 units, 120 teach lessons + 24 exams = 144 new lessons** (exceeds +120). Organised as `COURSE_PARTS` so the course page can show parts.

Approximate CEFR: A2+ review through C1. Learners can skip early units via placement.

### Part A — Tense and aspect system (`en-part-tenses`)

| # | Unit slug | Title Uk / En | Level | Teach slugs (5) | Why it is deep |
|---|-----------|---------------|-------|-----------------|----------------|
| 1 | `en-deep-perfect` | Present Perfect: досвід і результат / Present Perfect: experience and result | B1 | `en-d-pp-form`, `en-d-pp-markers`, `en-d-pp-vs-past`, `en-d-pp-been-gone`, `en-d-pp-just-news` | Form; *since/for*, *already/yet/just/ever/never*; contrast with Past Simple (the #1 Ukrainian error); *been* vs *gone*; hot news vs finished story |
| 2 | `en-deep-perfect-plus` | Perfect Continuous і минуле до минулого / Perfect Continuous and the past-in-the-past | B1–B2 | `en-d-ppc-form`, `en-d-ppc-vs-pp`, `en-d-past-perf`, `en-d-ppc-past`, `en-d-narrative-mix` | PPC vs PP (*I've been writing* vs *I've written*); Past Perfect for earlier past; PPC in the past; choosing tenses in a short story |
| 3 | `en-deep-past-story` | Розповідь про минуле / Telling a story in the past | A2–B1 | `en-d-past-cont`, `en-d-ps-vs-pc`, `en-d-when-while`, `en-d-used-to`, `en-d-would-used` | Past Continuous; interruption vs background; *used to* vs Past Simple; *would* for past habits vs *used to* for states |
| 4 | `en-deep-future` | Майбутні форми / Talking about the future | A2–B2 | `en-d-will-going`, `en-d-pres-fut`, `en-d-timetable`, `en-d-fut-cont`, `en-d-fut-perf` | Decisions vs plans vs arrangements vs schedules; Future Continuous (polite / in-progress); Future Perfect |

### Part B — Voice, patterns, and comparison (`en-part-core-grammar`)

| # | Unit slug | Title | Level | Teach slugs | Why |
|---|-----------|-------|-------|-------------|-----|
| 5 | `en-deep-passive` | Пасивний стан / The passive | B1–B2 | `en-d-pass-why`, `en-d-pass-tenses`, `en-d-pass-agent`, `en-d-pass-impersonal`, `en-d-causative` | Why English prefers the passive; tense parade; *by*-agent; *it is said that*; *have/get something done* |
| 6 | `en-deep-gerunds` | Герундій і інфінітив / Gerunds and infinitives | B1–B2 | `en-d-verb-ing`, `en-d-verb-to`, `en-d-meaning-change`, `en-d-adj-prep`, `en-d-purpose` | Verb patterns; *stop/remember/try/forget/regret*; adjective + *to*, preposition + *-ing*; *to* / *for* / *so that* |
| 7 | `en-deep-comparison` | Ступені порівняння / Comparison and degree | A2–B1 | `en-d-comp-reg`, `en-d-comp-irr`, `en-d-as-as`, `en-d-too-enough`, `en-d-so-such` | Regular/irregular; *as…as*; *too/enough*; *so/such* (Ukrainian *такий* traps) |
| 8 | `en-deep-modals-plus` | Модальні: минуле і відтінки / Modals: past and nuance | B2 | `en-d-mod-deduce`, `en-d-mod-should-have`, `en-d-mod-need`, `en-d-mod-supposed`, `en-d-mod-mix` | *must/might/can't have*; *should have*; *needn't have* vs *didn't need to*; *be supposed to*; review (does not repeat basic can/must) |

### Part C — Sentence craft (`en-part-sentences`)

| # | Unit slug | Title | Level | Teach slugs | Why |
|---|-----------|-------|-------|-------------|-----|
| 9 | `en-deep-wish` | Wish, if only, it's time | B2 | `en-d-wish-pres`, `en-d-wish-past`, `en-d-wish-would`, `en-d-if-only`, `en-d-its-time` | *wish* + Past / Past Perfect / *would*; *if only*; *it's time we went*; contrast with *hope* and with existing conditionals |
| 10 | `en-deep-questions-plus` | Питання глибше / Questions in more depth | A2–B1 | `en-d-subj-obj-q`, `en-d-tags`, `en-d-indirect-q`, `en-d-word-order`, `en-d-ed-ing` | Subject vs object questions; tags (Ukrainian has no exact equivalent); indirect questions in polite speech; adverb position; *-ed/-ing* adjectives |
| 11 | `en-deep-linking` | Зв'язність тексту / Linking and discourse | B2 | `en-d-link-contrast`, `en-d-link-cause`, `en-d-link-purpose`, `en-d-link-add`, `en-d-discourse` | *although/despite/however/whereas*; *because/since/so/therefore*; purpose; *moreover/besides*; *actually, anyway, in fact, as for* |
| 12 | `en-deep-c1-style` | Стиль C1 / C1 grammar and style | C1 | `en-d-inversion`, `en-d-clefts`, `en-d-participles`, `en-d-hedging`, `en-d-nominal` | Negative inversion; *it is… that* / *what I need is*; participle clauses; hedging (*seem, tend, it could be argued*); nominalisation for academic/IT writing |

### Part D — Pronunciation (`en-part-pronunciation`)

| # | Unit slug | Title | Teach slugs | Focus for Ukrainian speakers |
|---|-----------|-------|-------------|------------------------------|
| 13 | `en-deep-ipa-vowels` | IPA і голосні / IPA and vowels | `en-d-ipa-intro`, `en-d-ship-sheep`, `en-d-ash-strut`, `en-d-schwa`, `en-d-nurse-vowel` | IPA map; /ɪ/–/iː/; /æ/ /ʌ/ /ɑː/; schwa and weak forms; /ɜː/ (*her*, *word*) vs Ukrainian approximations |
| 14 | `en-deep-consonants` | Приголосні / Consonants that matter | `en-d-th-sounds`, `en-d-w-v`, `en-d-r-h`, `en-d-ng-final`, `en-d-voicing` | /θ ð/; /w/ vs /v/; English /r/ and audible /h/; /ŋ/; final voiced consonants (*leave* vs *leaf*) |
| 15 | `en-deep-stress-intonation` | Наголос і інтонація / Stress and intonation | `en-d-word-stress`, `en-d-sentence-stress`, `en-d-intonation-q`, `en-d-contrast-stress`, `en-d-connected` | Word-stress shifts (*REcord* / *reCORD*); content vs function words; yes/no rise vs *wh-* fall; contrastive stress; linking, weak forms, elision |

### Part E — Vocabulary (`en-part-vocabulary`)

| # | Unit slug | Title | Teach slugs | Why |
|---|-----------|-------|-------------|-----|
| 16 | `en-deep-collocations` | Колокації та «фальшиві друзі» / Collocations and false friends | `en-d-make-do`, `en-d-say-tell`, `en-d-borrow-lend`, `en-d-get-col`, `en-d-false-friends` | *make/do*; *say/tell/speak/talk*; *borrow/lend*, *rise/raise*, *affect/effect*; *get* collocations; Ukrainian false friends |
| 17 | `en-deep-word-formation` | Словотвір / Word formation | `en-d-wf-neg`, `en-d-wf-noun`, `en-d-wf-adj`, `en-d-wf-verb`, `en-d-wf-review` | *un-/in-/im-/il-/ir-/dis-*; *-tion/-ment/-ness/-ity*; *-ful/-less/-ous/-ive/-al*; *-ise/-en/-ify*; exam-style transformations |
| 18 | `en-deep-phrasal-life` | Фразові: життя і почуття / Phrasals: life and feelings | `en-d-pv-daily`, `en-d-pv-feel`, `en-d-pv-travel`, `en-d-pv-problems`, `en-d-pv-life-rev` | Complements work/study phrasals already in the course |
| 19 | `en-deep-idioms` | Ідіоми та регістр / Idioms and register | `en-d-id-body`, `en-d-id-time`, `en-d-id-work`, `en-d-id-agree`, `en-d-id-register` | Body, time, work idioms; agreement/disagreement; formal vs informal equivalents (do not repeat `idioms-boost` items) |
| 20 | `en-deep-themes-a` | Теми A: здоров'я, дім, освіта, довкілля, медіа / Themes A | `en-d-th-health`, `en-d-th-housing`, `en-d-th-education`, `en-d-th-environment`, `en-d-th-media` | Vocabulary + collocations + a short reading in each |
| 21 | `en-deep-themes-b` | Теми B: гроші, кар'єра, характер, право, культура / Themes B | `en-d-th-money`, `en-d-th-career`, `en-d-th-personality`, `en-d-th-crime`, `en-d-th-culture` | Same pattern |

### Part F — Skills, work, and exams (`en-part-skills`)

| # | Unit slug | Title | Teach slugs | Why |
|---|-----------|-------|-------------|-----|
| 22 | `en-deep-reading` | Читання з розумінням / Reading skills | `en-d-rd-skim`, `en-d-rd-infer`, `en-d-rd-ref`, `en-d-rd-fact-opinion`, `en-d-rd-passage` | Skim/scan; inference; what *this/which* refers to; fact vs opinion; a full `comprehension` passage (IT/study topic) |
| 23 | `en-deep-writing-email` | Письмо: листи / Writing: emails and messages | `en-d-wr-register`, `en-d-wr-request`, `en-d-wr-complaint`, `en-d-wr-apology`, `en-d-wr-followup` | Formal vs informal; requests, complaints, apologies, follow-ups — deeper than `email-soft-skills` |
| 24 | `en-deep-writing-essay` | Есе, CV і супровідний лист / Essays, CV and cover letter | `en-d-wr-paragraph`, `en-d-wr-opinion`, `en-d-wr-for-against`, `en-d-wr-cv`, `en-d-wr-cover` | PEEL paragraphs; opinion and discussion essays; CV action verbs; cover-letter structure |
| — | *(skills continued in the same part)* | | | |
| 25 | `en-deep-speaking` | Усне мовлення / Speaking and functional language | `en-d-sp-story`, `en-d-sp-present`, `en-d-sp-hedge`, `en-d-sp-interview`, `en-d-sp-speculate` | Storytelling frames; 60-second presentations; hedging and disagreement at B2–C1; job-interview answers; *might have / looks as if* |
| 26 | `en-deep-business-it` | Ділова та IT-англійська+ / Business and IT English plus | `en-d-biz-negotiate`, `en-d-biz-stakeholder`, `en-d-biz-incident`, `en-d-biz-interview`, `en-d-biz-agile` | Negotiating scope; stakeholder updates; incident language; IT job interviews; agile ceremony language (extends, does not repeat, `tech-english`) |
| 27 | `en-deep-exam-prep` | Підготовка до іспитів / IELTS and FCE-style tasks | `en-d-ex-t1`, `en-d-ex-t2`, `en-d-ex-speaking`, `en-d-ex-kwt`, `en-d-ex-cloze` | IELTS Writing T1 (graphs) and T2 strategy; Speaking parts 1–3; FCE key-word transformation; open cloze / word formation |

**Adjustment:** the table lists **27 units** (135 teach + 27 exams = **162 lessons**), which is above the +120 floor and preferred if quality holds. If a batch must be cut, drop nothing from parts A–D (the core gaps); Theme B or exam-prep is the last to shrink, not the first.

Every unit ends with `{unit-slug}-exam`.

---

## 4. Chess curriculum (new units)

Target: **20 units, 100 teach lessons + 20 exams = 120 new lessons** (exceeds +100). Organised as `COURSE_PARTS`.

### Part A — Rules and calculation tools (`ch-part-foundations`)

| # | Unit slug | Title Uk / En | Teach slugs | Depth |
|---|-----------|---------------|-------------|-------|
| 1 | `ch-deep-notation` | Нотація і повні правила / Notation and complete rules | `ch-d-algebraic`, `ch-d-values-draws`, `ch-d-castle-legal`, `ch-d-ep-promote`, `ch-d-record` | Algebraic and annotation symbols; values and all draw rules; when you cannot castle; en passant and underpromotion; recording a game, clocks, touch-move idea |
| 2 | `ch-deep-calc-viz` | Розрахунок і візуалізація / Calculation and visualisation | `ch-d-viz-1`, `ch-d-candidates`, `ch-d-quiet`, `ch-d-force-first`, `ch-d-compare-lines` | Seeing one move further (drills on a FEN without moving); candidate moves; quiet moves; forcing vs non-forcing (extends CCT); comparing two lines and stopping |

### Part B — Tactics and mate patterns (`ch-part-tactics`)

| # | Unit slug | Title | Teach slugs | Depth |
|---|-----------|-------|-------------|-------|
| 3 | `ch-deep-tactics-hidden` | Приховані мотиви / Hidden tactical motifs | `ch-d-decoy`, `ch-d-overload`, `ch-d-interference`, `ch-d-xray`, `ch-d-attraction` | Decoy, overloading, interference, x-ray, attraction — each with a verified puzzle |
| 4 | `ch-deep-tactics-remove` | Зняття захисту і жертви / Removing defenders and sacrifices | `ch-d-remove-guard`, `ch-d-clearance`, `ch-d-exchange-sac`, `ch-d-greek-gift`, `ch-d-quiet-sac` | Remove the defender; clearance (deeper than the existing short lesson); exchange sac; Greek gift idea; quiet sacrificial ideas |
| 5 | `ch-deep-mates-classic` | Класичні мати / Classic mating patterns | `ch-d-smothered`, `ch-d-arabian`, `ch-d-anastasia`, `ch-d-boden`, `ch-d-legal` | Smothered, Arabian, Anastasia, Boden, Legal's mate — legal FENs, mate solutions |
| 6 | `ch-deep-mates-attack` | Мати в атаці на короля / Mates in the king attack | `ch-d-opera-corr`, `ch-d-morphy-mate`, `ch-d-damiano-lolli`, `ch-d-pillsbury`, `ch-d-mate-two` | Opera/corridor, Morphy mate, Damiano and Lolli, Pillsbury; **how to solve mate in two** |
| 7 | `ch-deep-tactics-mix` | Мікс мотивів / Mixed motifs and practical tactics | `ch-d-mix-fork-pin`, `ch-d-mix-disc`, `ch-d-mix-back`, `ch-d-mix-zwischen`, `ch-d-mix-exam-prep` | Fresh positions combining known motifs (fork/pin/skewer/discovered/zwischenzug) so drills are not copies of old puzzles |

### Part C — Openings as ideas (`ch-part-openings`)

Each opening lesson: typical pawn structure FEN, plans for both sides, typical piece placements, one thematic tactic, what *not* to memorise.

| # | Unit slug | Title | Teach slugs |
|---|-----------|-------|-------------|
| 8 | `ch-deep-italian-ruy` | Італійська і Іспанська / Italian and Ruy Lopez | `ch-d-giuoco`, `ch-d-evans-two`, `ch-d-ruy-exch`, `ch-d-ruy-closed`, `ch-d-ruy-berlin` |
| 9 | `ch-deep-qg-london` | Ферзевий гамбіт і Лондон / Queen's Gambit and London | `ch-d-qgd`, `ch-d-qga`, `ch-d-slav-idea`, `ch-d-london-idea`, `ch-d-qg-plans` |
| 10 | `ch-deep-sicilian-french` | Сицилійський і Французький / Sicilian and French | `ch-d-sic-open`, `ch-d-sic-dragon`, `ch-d-sic-najdorf`, `ch-d-fr-advance`, `ch-d-fr-winawer` |
| 11 | `ch-deep-caro-kid` | Каро–Канн і староіндійський / Caro-Kann and King's Indian | `ch-d-caro-class`, `ch-d-caro-adv`, `ch-d-kid-ideas`, `ch-d-kid-attack`, `ch-d-repertoire-build` |

`ch-d-repertoire-build` turns the existing "idea of a repertoire" into a concrete beginner–intermediate package (e.g. Italian + QGD / London as White; 1…e5 and a solid vs 1.d4 as Black) without dumping encyclopaedia lines.

### Part D — Middlegame strategy (`ch-part-middlegame`)

| # | Unit slug | Title | Teach slugs |
|---|-----------|-------|-------------|
| 12 | `ch-deep-planning` | Оцінка і план / Evaluation and planning | `ch-d-eval`, `ch-d-prophylaxis`, `ch-d-plan-steps`, `ch-d-activity-material`, `ch-d-two-weaknesses` |
| 13 | `ch-deep-minor-pieces` | Слон проти коня / Bishop versus knight | `ch-d-good-bad-b`, `ch-d-bn-open`, `ch-d-bn-closed`, `ch-d-opp-bishops-mid`, `ch-d-piece-trade` |
| 14 | `ch-deep-attack-king` | Атака на короля / Attacking the king | `ch-d-same-side`, `ch-d-opp-castle`, `ch-d-pawn-storm`, `ch-d-bxh7`, `ch-d-defence` |
| 15 | `ch-deep-pawn-play` | Пішакова гра / Pawn play | `ch-d-breaks`, `ch-d-minority`, `ch-d-hanging`, `ch-d-chains`, `ch-d-space` |

Hanging pawns and pawn chains extend (do not repeat) IQP / islands / backward-pawn lessons.

### Part E — Endgames (`ch-part-endgames`)

| # | Unit slug | Title | Teach slugs |
|---|-----------|-------|-------------|
| 16 | `ch-deep-kp-theory` | Король і пішак: теорія / King and pawn theory | `ch-d-key-squares`, `ch-d-opp-types`, `ch-d-triangulate`, `ch-d-rook-pawn`, `ch-d-kp-practice` |
| 17 | `ch-deep-rook-theory` | Тури: Лусена, Філідор, Ванкура / Rook endings in full | `ch-d-lucena`, `ch-d-philidor-full`, `ch-d-short-side`, `ch-d-vancura`, `ch-d-rook-vs-pawn` |
| 18 | `ch-deep-minor-end` | Легкофігурні та ферзеві закінчення / Minor-piece and queen endings | `ch-d-two-bishops`, `ch-d-kbn-mate`, `ch-d-bn-ending`, `ch-d-same-opp-b`, `ch-d-queen-pawn7` |

Lucena/Philidor lessons here are the **full method** (bridge building step by step, the 6th-rank defence, the exception when the pawn is a knight pawn, etc.), not a second intro.

### Part F — Games, practice, mind (`ch-part-practice`)

| # | Unit slug | Title | Teach slugs (critical positions, validated FENs) |
|---|-----------|-------|--------------------------------------------------|
| 19 | `ch-deep-famous-1` | Класичні партії / Classic games | `ch-d-greco`, `ch-d-opera`, `ch-d-immortal`, `ch-d-evergreen`, `ch-d-gotc` — Greco; Morphy Opera; Immortal; Evergreen; Byrne–Fischer 1956 |
| 20 | `ch-deep-famous-2` | Партії XX століття / Modern model games | `ch-d-fischer-spassky`, `ch-d-kasparov-topalov`, `ch-d-karpov-model`, `ch-d-tal-attack`, `ch-d-study-method` |
| 21 | `ch-deep-tournament` | Турнірна практика і психологія / Tournament practice and psychology | `ch-d-time-trouble`, `ch-d-draw-offers`, `ch-d-prepare`, `ch-d-swiss-rating`, `ch-d-fair-play` |

**Adjustment:** the table lists **21 units** (105 teach + 21 exams = **126 lessons**). Preferred if quality and FEN validation hold.

---

## 5. Feature improvements (existing systems only)

1. **`COURSE_PARTS`** for `english` and `chess` in `packages/shared/src/courses.ts`, matching the parts above plus the *existing* units grouped reasonably (English: "Foundations" for current A1–A2 units, "Communication" for dialogues/meetings/IT English already in the course, then the new deep parts; Chess: "Rules and early tactics" for current early units, "First endgames and structures" for current expansion, then the new deep parts). Capstones / last existing units stay last within their group; new units **append** after existing ones so in-progress learners are not reordered mid-course.
2. **Learning paths** in `packages/shared/src/learning-paths.ts`:
   - `english-fluency` — the `english` course (single-course path is still useful as a goal card on `/paths`, with a blurb about A1→C1 and Ukrainian-speaker focus). Optionally mention it as a complement on frontend/backend paths? **No** — do not inject English into job paths unless it stays optional. Keep a dedicated path.
   - `chess-mastery` — the `chess` course, blurb beginner→advanced (tactics, openings as ideas, endgames, famous games).
3. **Flashcards** in `packages/content/src/flashcards.ts`:
   - `english-perfect-passives` — Present Perfect markers, passive forms, *used to* vs *would*.
   - `english-collocations` — make/do, say/tell, false friends, high-value collocations.
   - `english-idioms-phrasals` — new idioms and life phrasals (not copies of `english-basics`).
   - `english-pronunciation` — IPA pairs (ship/sheep, thin/sin, west/vest) with Ukrainian hints.
   - `chess-tactics-patterns` — decoy, overload, Anastasia, Lucena, Philidor, Greek gift, etc.
   - `chess-opening-ideas` — one card per opening: the **idea**, not a move dump (Italian: develop and hit f7; French: …c5 vs the centre; KID: …e5/…c5 and kingside attack, etc.).
4. **Placement:**
   - Extend `ENGLISH_PLACEMENT` with a few B2–C1 items (passive, Present Perfect vs Past, *wish*, a false friend, a discourse linker) without breaking existing ids `p1`–`p10`. Add `p11`–`p14` and extend `PLACEMENT_LEVELS` if thresholds need a C1 rung. Update `packages/shared` placement tests.
   - Course-agnostic `buildCoursePlacementBank` already samples MCQs from early units; appending units does not break it. No chess-specific bank exists; adding MCQs in new units is enough for `/placement/chess` once the bank can fill 4+ questions (early chess units are puzzle-heavy — ensure the **notation** unit and exams provide MCQs so a chess bank can be built). If `/placement/chess` still cannot build a bank, add 4–8 standalone MCQs in early new units and, if needed, a small explicit bank.
5. **Docs:** this plan's status; `SPEC/CONTENT-EXPANSION.md` counts; `SPEC/courses/english.md`, `chess.md`, `SPEC/courses/README.md`; root `README.md` lesson totals.
6. **Tests:** content quality gate; a **chess FEN + solution** test covering *all* `chess_puzzle` and `chess_lesson` FENs in the course (not only the new ones); `pnpm typecheck`; `pnpm test:unit`; `@eduforge/content` and `@eduforge/web` builds.

Out of scope: new exercise types, new TTS infrastructure, rewriting old thin lessons, new primary-nav items, paid walls.

---

## 6. Implementation plan (batches)

Generator: `scripts/gen-expansion/deep/` (Python) emitting TypeScript. A shared `emit.py` writes `english-deep.ts` / `chess-deep.ts` with `expandEnglishDeep` / `expandChessDeep` using `expandCourse` from `factory.ts`. Do not run the old `assemble.py` in a way that overwrites `english-exp.ts` / `chess-exp.ts`.

Chess FENs are authored in the generator and checked by `scripts/gen-expansion/deep/validate_fens.mjs` (chess.js / `@eduforge/chess-core`) before assemble, and again by a Vitest test.

| Batch | Work | Commit message (suggested) |
|------:|------|----------------------------|
| 0 | This plan | `docs: add deep English and Chess learning plan` |
| 1 | Generator scaffolding, wiring stubs, FEN validator, empty expand functions that pass tests | `chore(content): scaffold deep English and Chess expansion` |
| 2 | English parts A–B (units 1–8) | `feat(content): deep English tenses, passive, gerunds, comparison, modals` |
| 3 | English part C–D (units 9–15) | `feat(content): deep English sentence craft and pronunciation` |
| 4 | English part E (units 16–21) | `feat(content): deep English vocabulary, collocations, themes` |
| 5 | English part F (units 22–27) | `feat(content): deep English reading, writing, speaking, exam prep` |
| 6 | Chess parts A–B (units 1–7) | `feat(content): deep Chess notation, tactics, and mating patterns` |
| 7 | Chess part C (units 8–11) | `feat(content): deep Chess opening ideas` |
| 8 | Chess parts D–E (units 12–18) | `feat(content): deep Chess middlegame and endgame theory` |
| 9 | Chess part F (units 19–21) | `feat(content): deep Chess famous games and tournament practice` |
| 10 | Flashcards, paths, COURSE_PARTS, placement, FEN test | `feat(learning): paths, flashcards, parts, and placement for deep tracks` |
| 11 | Validate (quality gate, typecheck, unit tests, builds); fix breakages | `test(content): validate deep English and Chess (including FENs)` |
| 12 | Docs + PR #15 body append + push | `docs: record deep English and Chess counts and plan status` |

After every batch: local commit, update **Progress log**, periodic `git push origin newCourses` (fast-forward only).

---

## 7. Validation checklist

- [ ] Unique lesson slugs and exercise ids (quality gate)
- [ ] Every new lesson has `titleUk`/`titleEn`; every exercise has `promptUk`/`promptEn`
- [ ] Concept bodies bilingual, non-empty, under 6000 chars; exams have no concept
- [ ] Explain samples pass their rubric (`content.test.ts`)
- [ ] English: ≥120 new lessons; every new unit has an exam of ≥4 questions
- [ ] Chess: ≥100 new lessons; every new unit has an exam of ≥4 questions
- [ ] Every chess FEN legal; every `solutionSans` legal from that FEN; mate puzzles mate
- [ ] No duplicate teaching of an existing narrow topic; no copied old puzzles
- [ ] `pnpm --filter @eduforge/content test`
- [ ] `pnpm typecheck`
- [ ] `pnpm test:unit`
- [ ] `pnpm --filter @eduforge/content build` and `pnpm --filter @eduforge/web build`
- [ ] Docs and PR #15 description updated

---

## 8. Expected before → after (if the full curriculum lands)

| Course   | Units before | Units after | Lessons before | Lessons after | Exams before | Exams after |
|----------|-------------:|------------:|---------------:|--------------:|-------------:|------------:|
| `english` |           18 |   18+27=45  |             86 |     86+162=248 |            3 |        3+27=30 |
| `chess`   |           13 |   13+21=34  |             62 |     62+126=188 |            3 |        3+21=24 |
| App total |              |             |           1865 |    1865+288=2153 |              |              |

If a batch is trimmed, never go below **+120 English** and **+100 Chess** lessons. Record actuals here when done.

---

## 9. Progress log

Update this section after every commit so a successor can resume without a full re-audit.

| When (Europe/Kiev) | Batch | Status | Notes |
|--------------------|------:|--------|-------|
| 2026-11-12 evening | 0 | **done** | Plan written as `SPEC/DEEP-ENGLISH-CHESS-PLAN.md`. Implementation not started. |
| 2026-11-12 ~20:30 | 1 | **done** | Generator scaffolding in `scripts/gen-expansion/deep/` (`lib.py`, `assemble.py`). `expandEnglishDeep` wired in `index.ts`. Optional `optionsEn` added to the MCQ (and chess quiz) types. |
| 2026-11-12 ~20:30 | 2 | **done** | English parts A–B: 8 units, 48 bilingual lessons (40 teach + 8 exams). Units `en-deep-perfect` through `en-deep-modals-plus`. Content tests and `@eduforge/content` typecheck pass. |
| 2026-11-12 ~20:40 | 3 | **done** | English parts C–D: units 9–15 (wish, questions, linking, C1 style, IPA/vowels, consonants, stress/intonation). 7 more units, +42 lessons. Running total: **15 units, 90 lessons (15 exams)**. Content tests and typecheck pass. |
| | 3 | pending | |
| | 4 | pending | |
| | 5 | pending | |
| | 6 | pending | |
| | 7 | pending | |
| | 8 | pending | |
| | 9 | pending | |
| | 10 | pending | |
| | 11 | pending | |
| | 12 | pending | |

**Resume instructions:** `git fetch && git checkout newCourses`. If local has no unpushed commits, align with `origin/newCourses`. Leave untracked `scripts/gen-expansion/compact-src/` and `scripts/gen-expansion/courses/_build.py` alone. Read this log, then implement the first `pending` batch. Commit locally after the batch; push with a normal push only.
