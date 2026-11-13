"""English deep part D: pronunciation (units 13–15)."""
from __future__ import annotations

from ._common import exam_lesson, ex, fill, idea, match, mcq, order_words, teach, translate, unit

U13_L1 = teach(
    "en-d-ipa-intro",
    "Навіщо IPA українськомовному",
    "Why IPA matters for Ukrainian speakers",
    2,
    "Один символ — один звук",
    "One symbol, one sound",
    """Міжнародна фонетична абетка (IPA) записує звуки, не літери. Англійська орфографія обманює: <ough> звучить по-різному в though /ðəʊ/, through /θruː/, tough /tʌf/, cough /kɒf/. Українська орфографія ближча до звучання, тому спокуса читати English «як написано» дуже велика: *island зі звучним s, *honest з h, *recipe як «ресіпе».

Голосні в IPA пишуть у слешах: /ɪ/ ship, /iː/ sheep, /æ/ cat, /ʌ/ cup, /ɑː/ car, /ə/ about, /ɜː/ her. Довжина /ː/ важлива. Приголосні: /θ/ think, /ð/ this, /ʃ/ she, /tʃ/ chip, /dʒ/ job, /ŋ/ sing, /w/ we, /j/ yes. Наголос позначають ˈ перед складом: /ˈɪntrestɪŋ/ interesting (не на -ing).

Не треба вчити всю таблицю за раз. Досить мати «карту пасток» для своїх помилок і дивитися транскрипцію в словнику (Cambridge, Longman). SpeakButton у цих уроках озвучує англійські слова — слухайте і повторюйте, дивлячись на IPA.""",
    """The International Phonetic Alphabet (IPA) writes sounds, not letters. English spelling is misleading: <ough> sounds different in though /ðəʊ/, through /θruː/, tough /tʌf/, cough /kɒf/. Ukrainian spelling is closer to the sound, so the temptation to read English “as written” is strong: *island with a sounded s, *honest with an h, *recipe as “re-si-pe”.

Vowels in IPA are written in slashes: /ɪ/ ship, /iː/ sheep, /æ/ cat, /ʌ/ cup, /ɑː/ car, /ə/ about, /ɜː/ her. Length /ː/ matters. Consonants: /θ/ think, /ð/ this, /ʃ/ she, /tʃ/ chip, /dʒ/ job, /ŋ/ sing, /w/ we, /j/ yes. Stress is marked with ˈ before the syllable: /ˈɪntrəstɪŋ/ interesting (not on -ing).

You do not need the whole chart at once. It is enough to keep a “trap map” for your own errors and to check transcription in a dictionary (Cambridge, Longman). The SpeakButton in these lessons plays the English words — listen and repeat while you look at the IPA.""",
    [
        "IPA записує звук, не літеру: though ≠ tough ≠ through",
        "Слеші /ɪ/, /iː/, /ə/; ˈ перед наголошеним складом",
        "Не читайте англійську «як написано»",
        "Слухайте SpeakButton і звіряйте словник",
    ],
    [
        "IPA writes a sound, not a letter: though ≠ tough ≠ through",
        "Slashes /ɪ/, /iː/, /ə/; ˈ before the stressed syllable",
        "Do not read English “as written”",
        "Listen to the SpeakButton and check a dictionary",
    ],
    [
        mcq(
            "en-d-ipa-intro-r1",
            "Яке слово НЕ римується за звучанням з though /ðəʊ/ лише тому, що має <ough>?",
            "Which word does NOT rhyme in sound with though /ðəʊ/ just because it has <ough>?",
            ["tough /tʌf/", "although (same vowel family as though)", "a made-up word “gthough” with /ðəʊ/", "low, which can rhyme with though"],
            0,
            "tough звучить /tʌf/, не як though /ðəʊ/.",
            "tough is /tʌf/, not like though /ðəʊ/.",
        ),
        fill(
            "en-d-ipa-intro-r2",
            "Вставте IPA-символ довготи (один знак, як у /iː/). Напишіть двокрапку як у транскрипції: i___ — потрібен символ ː або : .",
            "Insert the length mark used after i in /iː/ (write : ).",
            "sheep is transcribed /i___/ — type the length mark only in the blank of this sentence: The length mark looks like ___ .",
            [":", "ː"],
        ),
        mcq(
            "en-d-ipa-intro-r3",
            "Де стоїть знак наголосу ˈ?",
            "Where does the stress mark ˈ go?",
            [
                "перед наголошеним складом",
                "після останньої літери слова",
                "лише над першою голосною літерою, як у французькій",
                "його не використовують в IPA",
            ],
            0,
            "ˈ ставлять перед наголошеним складом.",
            "ˈ is placed before the stressed syllable.",
            [
                "before the stressed syllable",
                "after the last letter of the word",
                "only above the first vowel letter, as in French",
                "it is not used in IPA",
            ],
        ),
        match(
            "en-d-ipa-intro-r4",
            "Зіставте символ із прикладом.",
            "Match each symbol with an example.",
            [
                ("/θ/", "think"),
                ("/ð/", "this"),
                ("/ə/", "the first vowel of about"),
                ("/ŋ/", "the last sound of sing"),
            ],
        ),
    ],
    ex(
        "en-d-ipa-intro",
        "Навіщо IPA, якщо є англійський правопис? Що означають слеші і знак ˈ?",
        "Why use IPA if English already has spelling? What do the slashes and the mark ˈ mean?",
        [
            idea("звук не літера", "sound not letter", "sound", "звук", "spelling", "правопис", "ough", "though"),
            idea("слеші", "slashes", "slash", "слеш", "/ɪ/", "ipa"),
            idea("наголос", "stress", "stress", "наголос", "ˈ", "syllable", "склад"),
        ],
        "IPA потрібна, бо англійський правопис не надійно показує звук: though і tough пишуться схоже, а звучать інакше. Слеші позначають звуки, а знак наголосу стоїть перед наголошеним складом.",
        "IPA is useful because English spelling does not reliably show the sound: though and tough look similar but sound different. Slashes mark sounds, and the stress mark stands before the stressed syllable.",
    ),
)

U13_L2 = teach(
    "en-d-ship-sheep",
    "Мінімальна пара ship / sheep",
    "The minimal pair ship / sheep",
    2,
    "/ɪ/ коротке проти /iː/ довгого",
    "Short /ɪ/ versus long /iː/",
    """/ɪ/ — коротке, більш відкрите, як у ship, sit, live, fill, bit, rich. /iː/ — довше і вужче, як у sheep, seat, leave, feel, beat, reach. Для українськомовних обидва часто зливаються в «і», і тоді leave (піти) звучить як live (жити), sheet як shit (нецензурне — будьте обережні), beach як bitch. Це не дрібниця: змінюється значення.

Довжина — не єдине: /iː/ напружене, губи трохи розтягнуті; /ɪ/ коротше й розслабленіше, язик нижче. У закритому складі перед глухим приголосним /iː/ все одно довше за /ɪ/: beat /biːt/ проти bit /bɪt/.

Практикуйте пари вголос: ship–sheep, sit–seat, lick–leak, rich–reach, fill–feel, his–he's, will–wheel. Слухайте SpeakButton і записуйте себе. Письмова підказка: <ee>, <ea>, <ie> часто (не завжди) кодують /iː/; одна літера <i> в закритому складі часто /ɪ/. Винятки є (live як дієслово — /lɪv/), тому IPA надійніша.""",
    """/ɪ/ is short and a little more open, as in ship, sit, live, fill, bit, rich. /iː/ is longer and closer, as in sheep, seat, leave, feel, beat, reach. For Ukrainian speakers the two often collapse into a single “i”, and then leave (go away) sounds like live (be alive), sheet like a taboo word, beach like another taboo word. This is not a small detail: the meaning changes.

Length is not the only difference: /iː/ is tense, with the lips a little spread; /ɪ/ is shorter and laxer, with the tongue lower. In a closed syllable before a voiceless consonant, /iː/ is still longer than /ɪ/: beat /biːt/ versus bit /bɪt/.

Practise the pairs aloud: ship–sheep, sit–seat, lick–leak, rich–reach, fill–feel, his–he's, will–wheel. Listen to the SpeakButton and record yourself. A spelling hint: <ee>, <ea>, <ie> often (not always) encode /iː/; a single <i> in a closed syllable is often /ɪ/. There are exceptions (live the verb is /lɪv/), so IPA is more reliable.""",
    [
        "/ɪ/ ship, sit, live — коротке; /iː/ sheep, seat, leave — довге",
        "Злиття звуків змінює значення (leave / live)",
        "Пари вголос + SpeakButton",
        "<ee>/<ea> часто /iː/, але є винятки — дивіться IPA",
    ],
    [
        "/ɪ/ ship, sit, live is short; /iː/ sheep, seat, leave is long",
        "Collapsing the sounds changes meaning (leave / live)",
        "Pairs aloud + the SpeakButton",
        "<ee>/<ea> are often /iː/, but there are exceptions — check IPA",
    ],
    [
        mcq(
            "en-d-ship-sheep-r1",
            "Яке слово має коротке /ɪ/?",
            "Which word has short /ɪ/?",
            ["ship", "sheep", "seat", "leave"],
            0,
            "ship — /ʃɪp/, коротке /ɪ/.",
            "ship is /ʃɪp/, with short /ɪ/.",
        ),
        fill(
            "en-d-ship-sheep-r2",
            "Вставте live або leave (/iː/ — «піти»).",
            "Insert live or leave (/iː/ means “go away”).",
            "We have to ___ now, or we'll miss the train.",
            ["leave", "Leave"],
        ),
        mcq(
            "en-d-ship-sheep-r3",
            "feel проти fill. Яке має /iː/?",
            "feel versus fill. Which one has /iː/?",
            ["feel", "fill", "both equally short", "neither"],
            0,
            "feel — /fiːl/, довге /iː/.",
            "feel is /fiːl/, with long /iː/.",
        ),
        match(
            "en-d-ship-sheep-r4",
            "Зіставте слово зі звуком.",
            "Match each word with its vowel.",
            [
                ("ship / sit / bit", "/ɪ/"),
                ("sheep / seat / beat", "/iː/"),
                ("live (the verb “жити”)", "/ɪ/ as well"),
                ("leave (“піти”)", "/iː/ as well"),
            ],
        ),
    ],
    ex(
        "en-d-ship-sheep",
        "Чим /ɪ/ у ship відрізняється від /iː/ у sheep? Чому ця пара важлива для значення?",
        "How is /ɪ/ in ship different from /iː/ in sheep? Why does this pair matter for meaning?",
        [
            idea("коротке /ɪ/", "short /ɪ/", "ɪ", "ship", "sit", "short", "коротк", "live"),
            idea("довге /iː/", "long /iː/", "iː", "sheep", "leave", "feel", "long", "довг"),
            idea("значення", "meaning", "leave", "live", "meaning", "значен", "pair"),
        ],
        "У ship стоїть коротке розслаблене /ɪ/, а в sheep — довге напружене /iː/. Якщо їх злити, змінюється значення: leave «піти» може прозвучати як live «жити». Тому цю мінімальну пару треба тренувати вголос.",
        "Ship has a short, lax /ɪ/, and sheep has a long, tense /iː/. If you collapse them, the meaning changes: leave can sound like live. That is why this minimal pair must be practised aloud.",
    ),
)

U13_L3 = teach(
    "en-d-ash-strut",
    "/æ/, /ʌ/ і /ɑː/: cat, cup, car",
    "/æ/, /ʌ/ and /ɑː/: cat, cup, car",
    3,
    "Три звуки, яких немає як окремих фонем в українській",
    "Three sounds that are not separate phonemes in Ukrainian",
    """/æ/ (ash) — у cat, map, bad, app, thank. Рот відкритіший, ніж для українського «е», язик вперед і вниз. Українськомовні часто ставлять /e/ і тоді bad звучить ближче до bed (ліжко), bat до bet. /ʌ/ (strut) — у cup, but, love, come, enough: центральний короткий звук, не українське «а» і не «о». /ɑː/ (palm/start, у брит. RP) — довге відкрите, як у car, father, last (у багатьох брит. акцентах).

Мінімальні орієнтири: cap /æ/ — cup /ʌ/; bad /æ/ — bud /ʌ/; cat /æ/ — cart /ɑː/ (з /r/ або без, залежно від акценту). Американський /ɑ/ у father може відрізнятися від британського; важливо не зливати всі три в одне українське «а».

Правопис знову обманює: <u> у but — /ʌ/, але <u> у put — /ʊ/; <o> у love — /ʌ/; <ou> у enough — /ʌ/. Дивіться IPA. Практикуйте: cat–cut–cart; hat–hut; bag–bug; danced (часто /ɑː/ або /æ/ залежно від акценту — обидва прийнятні, будьте послідовні).""",
    """/æ/ (ash) is the vowel in cat, map, bad, app, thank. The mouth is more open than for Ukrainian “e”, with the tongue forward and down. Ukrainian speakers often use /e/, and then bad sounds closer to bed, bat to bet. /ʌ/ (strut) is the vowel in cup, but, love, come, enough: a short central sound, neither Ukrainian “a” nor “o”. /ɑː/ (palm/start, in British RP) is a long open vowel, as in car, father, last (in many British accents).

Minimal landmarks: cap /æ/ versus cup /ʌ/; bad /æ/ versus bud /ʌ/; cat /æ/ versus cart /ɑː/ (with or without /r/, depending on the accent). American /ɑ/ in father may differ from British; the important thing is not to collapse all three into one Ukrainian “a”.

Spelling is again misleading: <u> in but is /ʌ/, but <u> in put is /ʊ/; <o> in love is /ʌ/; <ou> in enough is /ʌ/. Check the IPA. Practise: cat–cut–cart; hat–hut; bag–bug; danced (often /ɑː/ or /æ/ depending on the accent — both are acceptable; be consistent).""",
    [
        "/æ/ cat, bad — відкрите «е-а»; не bed",
        "/ʌ/ cup, love, enough — коротке центральне",
        "/ɑː/ car, father — довге відкрите",
        "cap ≠ cup ≠ cart; правопис ненадійний",
    ],
    [
        "/æ/ cat, bad is an open “e-a”; not bed",
        "/ʌ/ cup, love, enough is short and central",
        "/ɑː/ car, father is long and open",
        "cap ≠ cup ≠ cart; spelling is unreliable",
    ],
    [
        mcq(
            "en-d-ash-strut-r1",
            "Який звук у cat?",
            "Which sound is in cat?",
            ["/æ/", "/ʌ/", "/ɑː/", "/ɪ/"],
            0,
            "cat — /kæt/, звук /æ/.",
            "cat is /kæt/, the sound /æ/.",
        ),
        fill(
            "en-d-ash-strut-r2",
            "Вставте cap або cup (потрібне /ʌ/ — «чашка»).",
            "Insert cap or cup (you need /ʌ/ — the drinking vessel).",
            "Could I have a ___ of tea?",
            ["cup", "Cup"],
        ),
        mcq(
            "en-d-ash-strut-r3",
            "love. Який голосний?",
            "love. Which vowel?",
            ["/ʌ/", "/ɒ/ as in British hot, always", "/æ/", "/uː/ as in food"],
            0,
            "love — /lʌv/, як cup.",
            "love is /lʌv/, as in cup.",
        ),
        match(
            "en-d-ash-strut-r4",
            "Зіставте слово зі звуком.",
            "Match each word with its vowel.",
            [
                ("cat / map / bad", "/æ/"),
                ("cup / but / love", "/ʌ/"),
                ("car / father (RP)", "/ɑː/"),
                ("bed (не bad)", "/e/, a different vowel"),
            ],
        ),
    ],
    ex(
        "en-d-ash-strut",
        "Опишіть /æ/, /ʌ/ і /ɑː/ і наведіть по слову. Чому cap і cup не можна вимовляти однаково?",
        "Describe /æ/, /ʌ/ and /ɑː/ and give a word for each. Why must cap and cup not be pronounced the same?",
        [
            idea("/æ/", "/æ/", "æ", "cat", "bad", "cap", "ash"),
            idea("/ʌ/", "/ʌ/", "ʌ", "cup", "love", "but", "strut"),
            idea("/ɑː/", "/ɑː/", "ɑː", "car", "father", "long", "довг"),
        ],
        " /æ/ звучить у cat і bad, /ʌ/ — у cup і love, /ɑː/ — довге в car. Cap і cup — мінімальна пара: різний голосний змінює значення, тому їх не можна зливати в одне українське «а».",
        "/æ/ is the vowel in cat and bad, /ʌ/ is in cup and love, and /ɑː/ is the long vowel in car. Cap and cup are a minimal pair: a different vowel changes the meaning, so they must not collapse into one Ukrainian “a”.",
    ),
)

U13_L4 = teach(
    "en-d-schwa",
    "Шва /ə/ і слабкі форми",
    "Schwa /ə/ and weak forms",
    3,
    "Найчастотніший голосний англійської",
    "The most frequent vowel in English",
    """Шва /ə/ — короткий нейтральний голосний ненаголошеного складу: a, the (перед приголосним), of, to, about, teacher, computer, banana (перший і третій склади). В українській немає такого системного «згасання» голосних у ненаголошених складах, тому українськомовні вимовляють teacher як «тічер» з повним /e/, а of як «ов». Тоді ритм звучить чужорідно.

Службові слова мають сильну і слабку форму. ізольовано: to /tuː/, of /ɒv/, for /fɔː/, can /kæn/. У потоці мови зазвичай слабкі: to /tə/, of /əv/, for /fə/, can /kən/: a cup of tea /ə kʌp əv tiː/. Сильну форму ставлять для емфази: I said OF, not to.

Практичне правило: у ненаголошеному складі чекайте шву, доки словник не скаже інакше. interesting — наголос на першому складі, решта коротша. a /ə/ перед приголосним, an /ən/ перед голосним звуком (як у правилі артиклів).""",
    """Schwa /ə/ is the short neutral vowel of an unstressed syllable: a, the (before a consonant), of, to, about, teacher, computer, banana (the first and third syllables). Ukrainian has no such systematic “fading” of vowels in unstressed syllables, so Ukrainian speakers pronounce teacher with a full /e/, and of as a full “ov”. Then the rhythm sounds foreign.

Function words have a strong and a weak form. In isolation: to /tuː/, of /ɒv/, for /fɔː/, can /kæn/. In connected speech they are usually weak: to /tə/, of /əv/, for /fə/, can /kən/: a cup of tea /ə kʌp əv tiː/. The strong form is for emphasis: I said OF, not to.

A practical rule: in an unstressed syllable, expect schwa unless the dictionary says otherwise. interesting is stressed on the first syllable; the rest is shorter. a is /ə/ before a consonant, an is /ən/ before a vowel sound (as in the article rule).""",
    [
        "/ə/ — ненаголошений нейтральний голосний",
        "Українська не «згасає» голосні так системно — це треба тренувати",
        "Службові слова в потоці: of /əv/, to /tə/, can /kən/",
        "Сильна форма — для емфази",
    ],
    [
        "/ə/ is an unstressed neutral vowel",
        "Ukrainian does not “fade” vowels so systematically — this must be practised",
        "Function words in a stream: of /əv/, to /tə/, can /kən/",
        "The strong form is for emphasis",
    ],
    [
        mcq(
            "en-d-schwa-r1",
            "Який голосний у першому складі about у звичайній вимові?",
            "Which vowel is in the first syllable of about in ordinary speech?",
            ["/ə/", "/æ/ as in cat", "/eɪ/ as in day", "/ɑː/ as in car"],
            0,
            "about починається зі шви /ə/.",
            "about starts with schwa /ə/.",
        ),
        fill(
            "en-d-schwa-r2",
            "Вставте of або off (слабка форма of у cup ___ tea).",
            "Insert of or off (the weak form of of in cup ___ tea).",
            "a cup ___ tea",
            ["of", "Of"],
        ),
        mcq(
            "en-d-schwa-r3",
            "Коли to вимовляють сильно /tuː/?",
            "When is to pronounced in the strong form /tuː/?",
            [
                "для емфази або в ізоляції: I said TO, not from",
                "завжди в потоці a cup of tea теж /tuː/",
                "лише в слові teacher",
                "ніколи; сильної форми немає",
            ],
            0,
            "Сильна форма — емфаза або цитата слова.",
            "The strong form is for emphasis or when the word is cited.",
            [
                "for emphasis or in isolation: I said TO, not from",
                "always in a cup of tea as /tuː/ too",
                "only in the word teacher",
                "never; there is no strong form",
            ],
        ),
        translate(
            "en-d-schwa-r4",
            "Перекладіть. У вимові of буде слабке /əv/.",
            "Translate. In speech, of will be weak /əv/.",
            "чашка чаю",
            [
                "a cup of tea",
                "a cup of tea.",
                "one cup of tea",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-schwa",
        "Що таке шва /ə/ і чому службові слова в потоці мови слабшають? Коли потрібна сильна форма?",
        "What is schwa /ə/, and why do function words weaken in connected speech? When do you need the strong form?",
        [
            idea("шва", "schwa", "schwa", "шва", "ə", "unstressed", "ненаголос", "about"),
            idea("слабкі форми", "weak forms", "weak", "слабк", "of", "to", "can", "əv"),
            idea("емфаза", "emphasis", "emphasis", "емфаз", "strong", "сильн", "i said"),
        ],
        "Шва — короткий нейтральний голосний ненаголошеного складу, як на початку about. Службові слова в потоці слабшають: of звучить як /əv/ у a cup of tea. Сильну форму ставлять для емфази, наприклад I said TO.",
        "Schwa is the short neutral vowel of an unstressed syllable, as at the start of about. Function words weaken in a stream: of sounds like /əv/ in a cup of tea. We use the strong form for emphasis, for example I said TO.",
    ),
)

U13_L5 = teach(
    "en-d-nurse-vowel",
    "Звук /ɜː/: her, word, bird, nurse",
    "The sound /ɜː/: her, word, bird, nurse",
    3,
    "Один звук — багато написань",
    "One sound, many spellings",
    """/ɜː/ (nurse, у брит. RP) — довгий центральний голосний: her, were, bird, word, work, first, early, learn, journey. Губ майже не округлюють, язик у середині, звук тримають. Українськомовні часто підставляють «е», «ьо» або «ір»: work як «уорк» з /o/, bird як «бірд» з /i/. Тоді word і ward, fern і fun розходяться не так, як треба.

Написання різні: <er>, <ir>, <ur>, <or> після w (word, work, world), <ear> (learn, early), <our> (journey). Це класичний приклад «не читай як написано». В rhotic акцентах (загальноамериканський) після цього звука чути /r/: /ɜr/. В не-rhotic RP /r/ на кінці her не звучить, якщо далі немає голосного.

Практикуйте: her, were, fur, first, Thursday, world, early, journalist. Мінімальні сусіди: bird /ɜː/ — beard /ɪə/ (брит.) або /ɪr/; work /ɜː/ — walk /ɔː/. Слухайте SpeakButton і тримайте звук досить довго, без українського «р-елемента» в не-rhotic моделі, якщо ви її обрали.""",
    """/ɜː/ (nurse, in British RP) is a long central vowel: her, were, bird, word, work, first, early, learn, journey. The lips are barely rounded, the tongue is central, and the sound is held. Ukrainian speakers often substitute “e”, “yo” or “ir”: work as “uork” with /o/, bird as “bird” with /i/. Then word and ward, fern and fun, do not split as they should.

The spellings vary: <er>, <ir>, <ur>, <or> after w (word, work, world), <ear> (learn, early), <our> (journey). This is a classic “do not read it as written” case. In rhotic accents (General American) you hear /r/ after this vowel: /ɜr/. In non-rhotic RP, the /r/ at the end of her is silent unless a vowel follows.

Practise: her, were, fur, first, Thursday, world, early, journalist. Near neighbours: bird /ɜː/ versus beard /ɪə/ (British) or /ɪr/; work /ɜː/ versus walk /ɔː/. Listen to the SpeakButton and hold the sound long enough, without a Ukrainian “r-element” in a non-rhotic model if that is the model you have chosen.""",
    [
        "/ɜː/ — her, bird, word, work, learn, early",
        "Багато написань, один звук",
        "Після w: word, work, world — теж /ɜː/",
        "Не підставляйте українське «о» чи «і»",
    ],
    [
        "/ɜː/ is her, bird, word, work, learn, early",
        "Many spellings, one sound",
        "After w: word, work, world are also /ɜː/",
        "Do not substitute a Ukrainian “o” or “i”",
    ],
    [
        mcq(
            "en-d-nurse-vowel-r1",
            "Який голосний у work (брит. RP)?",
            "Which vowel is in work (British RP)?",
            ["/ɜː/", "/ɔː/ as in walk", "/ʌ/ as in cup, short", "/ɒ/ as in hot"],
            0,
            "work — /wɜːk/, той самий тип, що her і word.",
            "work is /wɜːk/, the same type as her and word.",
        ),
        fill(
            "en-d-nurse-vowel-r2",
            "Вставте work або walk (потрібне /ɜː/ — «робота»).",
            "Insert work or walk (you need /ɜː/ — “labour”).",
            "I have a lot of ___ this week.",
            ["work", "Work"],
        ),
        mcq(
            "en-d-nurse-vowel-r3",
            "Яке написання теж може кодувати /ɜː/?",
            "Which spelling can also encode /ɜː/?",
            ["<ear> in learn and early", "<oo> in food", "<ee> in sheep", "<a> in cat"],
            0,
            "learn, early — <ear> як /ɜː/.",
            "learn and early have <ear> as /ɜː/.",
        ),
        match(
            "en-d-nurse-vowel-r4",
            "Зіставте написання з прикладом /ɜː/.",
            "Match each spelling with an /ɜː/ example.",
            [
                ("<er>", "her / were"),
                ("<ir>", "bird / first"),
                ("<or> after w", "word / work / world"),
                ("<ear>", "learn / early"),
            ],
        ),
    ],
    ex(
        "en-d-nurse-vowel",
        "Який це звук у her, word і learn, і чому правопис тут ненадійний? Яку типову заміну роблять українськомовні?",
        "What sound is this in her, word and learn, and why is spelling unreliable here? What typical substitution do Ukrainian speakers make?",
        [
            idea("/ɜː/", "/ɜː/", "ɜː", "her", "word", "work", "nurse"),
            idea("різні написання", "many spellings", "ear", "ir", "or", "learn", "spelling", "написан"),
            idea("не «о» чи «і»", "not “o” or “i”", "walk", "о", "і", "substitute", "замін"),
        ],
        "У her, word і learn стоїть довгий центральний /ɜː/, хоча написання різні: er, or, ear. Правопис ненадійний, тому потрібна IPA. Українськомовні часто підставляють «о» або «і», і тоді work може прозвучати ближче до walk.",
        "Her, word and learn have a long central /ɜː/, even though the spellings differ: er, or, ear. Spelling is unreliable, so IPA is needed. Ukrainian speakers often substitute “o” or “i”, and then work can sound closer to walk.",
    ),
)

U13_EXAM = exam_lesson(
    "en-deep-ipa-vowels-exam",
    "Контрольна: IPA і голосні",
    "Exam: IPA and vowels",
    3,
    [
        mcq(
            "en-deep-ipa-vowels-exam-q1",
            "Коротке /ɪ/ у якому слові?",
            "Short /ɪ/ is in which word?",
            ["ship", "sheep", "seat", "leave"],
            0,
            "ship — /ɪ/.",
            "ship has /ɪ/.",
        ),
        mcq(
            "en-deep-ipa-vowels-exam-q2",
            "cat має:",
            "cat has:",
            ["/æ/", "/ʌ/", "/ɑː/", "/ə/ only, stressed"],
            0,
            "cat — /æ/.",
            "cat has /æ/.",
        ),
        mcq(
            "en-deep-ipa-vowels-exam-q3",
            "Ненаголошений перший склад about:",
            "The unstressed first syllable of about:",
            ["/ə/", "/æ/", "/eɪ/", "/ɑː/"],
            0,
            "Шва /ə/.",
            "Schwa /ə/.",
        ),
        mcq(
            "en-deep-ipa-vowels-exam-q4",
            "work (RP):",
            "work (RP):",
            ["/ɜː/", "/ɔː/ as in walk", "/ʌ/", "/ɒ/"],
            0,
            "work — /ɜː/.",
            "work has /ɜː/.",
        ),
        fill(
            "en-deep-ipa-vowels-exam-q5",
            "Вставте leave або live (потрібне /iː/ «піти»).",
            "Insert leave or live (you need /iː/ “go away”).",
            "We have to ___ now.",
            ["leave", "Leave"],
        ),
    ],
)

UNIT_13 = unit(
    "en-deep-ipa-vowels",
    "IPA і голосні",
    "IPA and vowels",
    [U13_L1, U13_L2, U13_L3, U13_L4, U13_L5, U13_EXAM],
)


U14_L1 = teach(
    "en-d-th-sounds",
    "Звуки /θ/ і /ð/: think і this",
    "The sounds /θ/ and /ð/: think and this",
    2,
    "Язик між зубами, не /s/ і не /z/",
    "The tongue between the teeth, not /s/ or /z/",
    """/θ/ — глухий, як у think, thank, three, month, both, path. /ð/ — дзвінкий, як у this, that, the, they, mother, breathe. Обидва утворюють кінчик язика між зубами або на верхніх різцях, повітря йде щілиною. Це не українські звуки. Типові заміни: /s/ або /t/ для /θ/ (think → sink або tink), /z/ або /d/ для /ð/ (this → zis або dis). Тоді think і sink, path і pass, they і day плутаються.

Правопис завжди <th>, але дзвінкість залежить від слова, не від бажання: thin /θ/ — this /ð/. У кінці: bath /θ/ — bathe /ð/. Функціональні слова (the, this, that, they, them, there) зазвичай /ð/; «грецькі» й терміни (theory, method, maths) частіше /θ/.

Практикуйте перед дзеркалом: язик видно між зубами. Пари: think–sink, thick–sick, path–pass, three–tree, they–day, there–dare, breathe–breeze. SpeakButton допоможе почути різницю; не замінюйте «звично на с». Це одна з найпомітніших ознак акценту, і її реально поставити вправами.""",
    """/θ/ is voiceless, as in think, thank, three, month, both, path. /ð/ is voiced, as in this, that, the, they, mother, breathe. Both are made with the tongue tip between the teeth or on the upper incisors, with air passing through a slit. They are not Ukrainian sounds. Typical substitutions are /s/ or /t/ for /θ/ (think → sink or tink), and /z/ or /d/ for /ð/ (this → zis or dis). Then think and sink, path and pass, they and day get confused.

The spelling is always <th>, but voicing depends on the word, not on preference: thin /θ/ versus this /ð/. At the end: bath /θ/ versus bathe /ð/. Function words (the, this, that, they, them, there) are usually /ð/; “Greek” and technical words (theory, method, maths) are more often /θ/.

Practise in front of a mirror: the tongue should be visible between the teeth. Pairs: think–sink, thick–sick, path–pass, three–tree, they–day, there–dare, breathe–breeze. The SpeakButton helps you hear the difference; do not replace the sound with a familiar “s”. This is one of the most noticeable accent features, and practice really can set it.""",
    [
        "/θ/ think, three, path — глухий; /ð/ this, the, they — дзвінкий",
        "Язик між зубами, не /s t z d/",
        "Функціональні слова зазвичай /ð/; theory — /θ/",
        "Пари think–sink, they–day — тренувати вголос",
    ],
    [
        "/θ/ think, three, path is voiceless; /ð/ this, the, they is voiced",
        "Tongue between the teeth, not /s t z d/",
        "Function words are usually /ð/; theory is /θ/",
        "Pairs think–sink, they–day should be practised aloud",
    ],
    [
        mcq(
            "en-d-th-sounds-r1",
            "Який звук на початку think?",
            "Which sound is at the start of think?",
            ["/θ/", "/ð/", "/s/", "/t/"],
            0,
            "think — глухе /θ/.",
            "think has voiceless /θ/.",
        ),
        fill(
            "en-d-th-sounds-r2",
            "Вставте think або sink (потрібне «думати»).",
            "Insert think or sink (you need “use your mind”).",
            "I need to ___ about this bug.",
            ["think", "Think"],
        ),
        mcq(
            "en-d-th-sounds-r3",
            "the, this, they зазвичай починаються з:",
            "the, this, they usually start with:",
            ["/ð/", "/θ/", "/z/", "/d/"],
            0,
            "Функціональні слова — дзвінке /ð/.",
            "Function words have voiced /ð/.",
        ),
        match(
            "en-d-th-sounds-r4",
            "Зіставте слово зі звуком <th>.",
            "Match each word with its <th> sound.",
            [
                ("think / three / path", "/θ/ voiceless"),
                ("this / the / they", "/ð/ voiced"),
                ("theory / method", "/θ/ in many technical words"),
                ("mother / breathe", "/ð/ as well"),
            ],
        ),
    ],
    ex(
        "en-d-th-sounds",
        "Чим /θ/ відрізняється від /ð/ і від українських /s/ і /z/? Наведіть think і this, і типову помилку.",
        "How is /θ/ different from /ð/ and from Ukrainian /s/ and /z/? Mention think and this, and a typical mistake.",
        [
            idea("/θ/", "/θ/", "θ", "think", "three", "path", "voiceless", "глух"),
            idea("/ð/", "/ð/", "ð", "this", "the", "they", "voiced", "дзвінк"),
            idea("не /s/", "not /s/", "sink", "s", "z", "t", "d", "mistake", "помилк"),
        ],
        " /θ/ у think — глухий, /ð/ у this — дзвінкий; обидва роблять язиком між зубами. Це не /s/ і не /z/. Типова помилка — сказати sink замість think або dis замість this.",
        "/θ/ in think is voiceless and /ð/ in this is voiced; both are made with the tongue between the teeth. They are not /s/ or /z/. A typical mistake is to say sink instead of think, or dis instead of this.",
    ),
)

U14_L2 = teach(
    "en-d-w-v",
    "/w/ і /v/: west і vest",
    "/w/ and /v/: west and vest",
    2,
    "Губи в трубочку проти зубів на губі",
    "Rounded lips versus teeth on the lip",
    """/w/ — як у we, west, wine, work, always, question (/kw/). Губи округлені й майже зімкнені, це короткий ковзний звук, голосний «у» як приголосний. /v/ — як у vest, very, have, five, of (/əv/). Верхні зуби на нижній губі, є вібрація голосу. В українській є /v/ («в»), але немає окремого /w/, тому wine і vine, west і vest, worse і verse часто зливаються.

Не замінюйте /w/ українським «в» або «ув»: we — не «ві» з /v/. Не оглушуйте кінцеве /v/ у have, five до /f/, якщо говорите акуратно (в українській кінцеві дзвінкі часто оглушуються: «дуб» звучить з /п/). have to в потоці може звучати ближче до /hæftə/ — це окремий випадок.

Практикуйте: west–vest, wine–vine, worse–verse, while–vile, we–V. Перед дзеркалом: для /w/ зуби не торкаються губи. Правопис: <w>, <wh> (у більшості акцентів теж /w/: what, when), <qu> = /kw/. <v> завжди /v/.""",
    """/w/ is the sound in we, west, wine, work, always, question (/kw/). The lips are rounded and almost closed; it is a short glide, a vowel-like “oo” used as a consonant. /v/ is the sound in vest, very, have, five, of (/əv/). The upper teeth rest on the lower lip, and the voice vibrates. Ukrainian has /v/ (“v”), but no separate /w/, so wine and vine, west and vest, worse and verse often collapse.

Do not replace /w/ with a Ukrainian “v” or “uv”: we is not “vi” with /v/. Do not devoice final /v/ in have, five to /f/ if you are speaking carefully (in Ukrainian, final voiced consonants often become voiceless: “dub” sounds with /p/). have to in a stream may sound closer to /hæftə/ — that is a separate case.

Practise: west–vest, wine–vine, worse–verse, while–vile, we–V. In a mirror: for /w/, the teeth do not touch the lip. Spelling: <w>, <wh> (in most accents also /w/: what, when), <qu> = /kw/. <v> is always /v/.""",
    [
        "/w/ — округлі губи, we, west, wine; /v/ — зуби на губі, vest, have",
        "В українській немає окремого /w/ — це треба ставити",
        "Пари west–vest, wine–vine",
        "Не оглушувати five до /f/ у акуратній вимові",
    ],
    [
        "/w/ is rounded lips, we, west, wine; /v/ is teeth on the lip, vest, have",
        "Ukrainian has no separate /w/ — it must be trained",
        "Pairs west–vest, wine–vine",
        "Do not devoice five to /f/ in careful speech",
    ],
    [
        mcq(
            "en-d-w-v-r1",
            "Який звук на початку west (сторона світу)?",
            "Which sound is at the start of west (the direction)?",
            ["/w/", "/v/", "/uː/ as a full long vowel only", "/f/"],
            0,
            "west — /west/, початок /w/.",
            "west is /west/, starting with /w/.",
        ),
        fill(
            "en-d-w-v-r2",
            "Вставте west або vest (потрібна сторона світу).",
            "Insert west or vest (you need the direction).",
            "The sun sets in the ___.",
            ["west", "West"],
        ),
        mcq(
            "en-d-w-v-r3",
            "of (слабка форма) закінчується на:",
            "of (the weak form) ends in:",
            ["/v/ — /əv/", "/f/ always, even in of", "/w/", "/θ/"],
            0,
            "of — /əv/ або /ɒv/, кінцеве /v/.",
            "of is /əv/ or /ɒv/, with a final /v/.",
        ),
        match(
            "en-d-w-v-r4",
            "Зіставте слово зі звуком.",
            "Match each word with its sound.",
            [
                ("we / west / wine", "/w/"),
                ("vest / very / five", "/v/"),
                ("question / quick", "/kw/"),
                ("of", "usually /əv/ with /v/"),
            ],
        ),
    ],
    ex(
        "en-d-w-v",
        "Як утворити /w/ і /v/? Чому wine і vine — небезпечна пара для українськомовних?",
        "How do you form /w/ and /v/? Why are wine and vine a dangerous pair for Ukrainian speakers?",
        [
            idea("/w/", "/w/", "w", "west", "wine", "rounded", "округ", "lips", "губ"),
            idea("/v/", "/v/", "v", "vest", "vine", "teeth", "зуб", "have"),
            idea("немає /w/", "no /w/", "ukrainian", "україн", "collapse", "злив", "pair"),
        ],
        "Для /w/ губи округлюють, як на початку west і wine, без контакту зубів із губою. Для /v/ верхні зуби стоять на нижній губі, як у vest. В українській немає окремого /w/, тому wine і vine легко злити.",
        "For /w/ the lips are rounded, as at the start of west and wine, with no teeth-on-lip contact. For /v/ the upper teeth rest on the lower lip, as in vest. Ukrainian has no separate /w/, so wine and vine are easy to collapse.",
    ),
)

U14_L3 = teach(
    "en-d-r-h",
    "Англійське /r/ і чутне /h/",
    "English /r/ and an audible /h/",
    3,
    "Не розкотисте «р» і не німе h там, де воно є",
    "Not a rolled “r”, and not a silent h where it is sounded",
    """Англійське /r/ (red, right, very, sorry) у більшості британських і американських стандартів — не розкотисте українське [р]. Кінчик язика не барабанить по яснах; язик відтягнений, без повної змички, часто з легким округленням губ. Надто тверде «р» видає акцент і може заважати сусіднім голосним. У не-rhotic RP /r/ на кінці car не звучить, якщо далі немає голосного; в американській вимові звучить.

/h/ у hat, here, home, who, how — легке видихання перед голосним. Українськомовні іноді його опускають (особливо після приголосного: I hate → I ate, що змінює значення) або замінюють українським «х» (як у «хата»), яке більш шорстке. Silent h є в hour, honest, honour, heir — тут a/an: an hour, an honest person (звук голосний). hotel зараз частіше з /h/: a hotel.

Практикуйте: hat–at, heat–eat, hair–air, hall–all; red без розкоту. Не додавайте /h/ там, де його немає (*I /h/ate замість I ate).""",
    """English /r/ (red, right, very, sorry) in most British and American standards is not a rolled Ukrainian [r]. The tongue tip does not tap the ridge; the tongue is pulled back, without a full closure, often with slight lip rounding. A very hard “r” signals an accent and can disturb neighbouring vowels. In non-rhotic RP, the /r/ at the end of car is silent unless a vowel follows; in American speech it is sounded.

/h/ in hat, here, home, who, how is a light breath before a vowel. Ukrainian speakers sometimes drop it (especially after a consonant: I hate → I ate, which changes the meaning) or replace it with a Ukrainian “kh” (as in “khata”), which is harsher. Silent h appears in hour, honest, honour, heir — so a/an is an hour, an honest person (a vowel sound). hotel is now more often with /h/: a hotel.

Practise: hat–at, heat–eat, hair–air, hall–all; red without a roll. Do not add /h/ where it is absent (*I /h/ate instead of I ate).""",
    [
        "Англійське /r/ — не розкотисте [р]",
        "/h/ у hat треба чути; I hate ≠ I ate",
        "Німе h: hour, honest, honour — an hour",
        "hotel сучасніше з /h/: a hotel",
    ],
    [
        "English /r/ is not a rolled [r]",
        "/h/ in hat must be heard; I hate is not I ate",
        "Silent h: hour, honest, honour — an hour",
        "hotel is more modern with /h/: a hotel",
    ],
    [
        mcq(
            "en-d-r-h-r1",
            "Оберіть правильне твердження про англійське /r/ у red.",
            "Choose the correct statement about English /r/ in red.",
            [
                "Це не розкотисте українське [р]; язик без барабанного удару.",
                "Треба завжди сильно розкотити, як у слові «рама».",
                "Звук /r/ у red ніколи не вимовляють.",
                "Це той самий звук, що /h/.",
            ],
            0,
            "Стандартне /r/ не розкочують.",
            "Standard /r/ is not rolled.",
            [
                "It is not a rolled Ukrainian [r]; the tongue does not tap.",
                "You should always roll it hard, as in a strongly rolled “r”.",
                "The sound /r/ in red is never pronounced.",
                "It is the same sound as /h/.",
            ],
        ),
        fill(
            "en-d-r-h-r2",
            "Вставте a або an (honest починається з голосного звука).",
            "Insert a or an (honest starts with a vowel sound).",
            "___ honest person",
            ["an", "An"],
        ),
        mcq(
            "en-d-r-h-r3",
            "I ___ leftover food (не «ненавиджу»). Яке слово?",
            "I ___ leftover food (not “despise”). Which word?",
            ["ate", "hate", "eight as the verb", "heart"],
            0,
            "ate /eɪt/ без /h/; hate має /h/ і інше значення.",
            "ate is /eɪt/ without /h/; hate has /h/ and a different meaning.",
        ),
        translate(
            "en-d-r-h-r4",
            "Перекладіть. Артикль залежить від звука.",
            "Translate. The article depends on the sound.",
            "годину (одну годину)",
            [
                "an hour",
                "An hour",
                "an hour.",
                "one hour",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-r-h",
        "Чим англійське /r/ відрізняється від українського розкотистого? Навіщо чути /h/ у hat і чому an hour?",
        "How is English /r/ different from a rolled Ukrainian “r”? Why must /h/ be heard in hat, and why do we say an hour?",
        [
            idea("не розкотисте", "not rolled", "rolled", "розкот", "r", "red", "tongue"),
            idea("/h/", "/h/", "h", "hat", "hate", "ate", "audible", "чутн"),
            idea("hour", "hour", "hour", "honest", "silent", "німе", "an"),
        ],
        "Англійське /r/ у red не розкочують, на відміну від українського [р]. /h/ у hat треба чути, інакше hate може прозвучати як ate. У hour літера h німа і слово починається з голосного звука, тому an hour.",
        "English /r/ in red is not rolled, unlike a Ukrainian [r]. /h/ in hat must be heard, or hate can sound like ate. In hour the letter h is silent and the word starts with a vowel sound, so we say an hour.",
    ),
)

U14_L4 = teach(
    "en-d-ng-final",
    "Звук /ŋ/: sing, think, going",
    "The sound /ŋ/: sing, think, going",
    2,
    "Не /n+g/ і не голе /n/",
    "Not /n+g/ and not a bare /n/",
    """/ŋ/ — носовий задньоязиковий, як у sing, thing, long, bank, think, going. Язик як для /k/ чи /g/, але повітря йде в ніс, і вибуху /g/ немає (у більшості акцентів на кінці sing). Українською його часто замінюють на /n/ (goin') або на /n+g/ з твердим «г» (sing-g). Тоді sin і sing, thin і thing плутаються.

Правопис: <ng> (sing, long), <nk> (think, bank — /ŋk/), <n> перед /k/ /g/ у межах морфеми (anchor, English /ˈɪŋɡlɪʃ/ — тут /ŋɡ/ всередині). -ing у parting /ˈpɑːtɪŋ/ — /ŋ/, не /n/, якщо говорити акуратно (хоча goin' існує в неформальному мовленні).

Практикуйте: sin–sing, thin–thing, ran–rang, win–wing; bank, thanks, English. Не додавайте зайве /g/ на кінці singing в акцентах, де його немає (RP, GenAm зазвичай /ˈsɪŋɪŋ/). Перевірте, що голос іде в ніс, а не в вибух.""",
    """/ŋ/ is a velar nasal, as in sing, thing, long, bank, think, going. The tongue is as for /k/ or /g/, but the air goes through the nose, and there is no /g/ burst (in most accents at the end of sing). Ukrainian speakers often replace it with /n/ (goin') or with /n+g/ and a hard “g” (sing-g). Then sin and sing, thin and thing get confused.

Spelling: <ng> (sing, long), <nk> (think, bank — /ŋk/), <n> before /k/ or /g/ inside a morpheme (anchor, English /ˈɪŋɡlɪʃ/ — here /ŋɡ/ is inside). -ing in parting /ˈpɑːtɪŋ/ is /ŋ/, not /n/, in careful speech (though goin' exists in informal speech).

Practise: sin–sing, thin–thing, ran–rang, win–wing; bank, thanks, English. Do not add an extra /g/ at the end of singing in accents that do not have it (RP and GenAm are usually /ˈsɪŋɪŋ/). Check that the voice goes through the nose, not into a burst.""",
    [
        "/ŋ/ — sing, thing, going: ніс, без вибуху /g/ на кінці",
        "sin ≠ sing; thin ≠ thing",
        "think, bank — /ŋk/",
        "Акуратне -ing — /ŋ/, не goin' як єдина норма",
    ],
    [
        "/ŋ/ is sing, thing, going: the nose, with no /g/ burst at the end",
        "sin is not sing; thin is not thing",
        "think, bank are /ŋk/",
        "Careful -ing is /ŋ/, not goin' as the only norm",
    ],
    [
        mcq(
            "en-d-ng-final-r1",
            "Який кінцевий звук у sing (стандартно)?",
            "Which final sound is in sing (in the standard)?",
            ["/ŋ/", "/n/", "/nɡ/ with a clear burst of g, as the only RP form", "/g/ alone"],
            0,
            "sing — /sɪŋ/, кінцеве /ŋ/ без вибуху g.",
            "sing is /sɪŋ/, with final /ŋ/ and no g-burst.",
        ),
        fill(
            "en-d-ng-final-r2",
            "Вставте sin або sing (потрібне «співати»).",
            "Insert sin or sing (you need “make music with your voice”).",
            "She can ___ very well.",
            ["sing", "Sing"],
        ),
        mcq(
            "en-d-ng-final-r3",
            "think містить:",
            "think contains:",
            ["/ŋk/", "/n/ only", "/ŋ/ only, with no k", "/θn/"],
            0,
            "think — /θɪŋk/, кластер /ŋk/.",
            "think is /θɪŋk/, a /ŋk/ cluster.",
        ),
        match(
            "en-d-ng-final-r4",
            "Зіставте слово зі звучанням.",
            "Match each word with its sound.",
            [
                ("sing / long / going", "final /ŋ/"),
                ("sin / thin (contrast)", "final /n/, a different word"),
                ("think / bank", "/ŋk/"),
                ("English (inside)", "/ŋɡ/ inside the word"),
            ],
        ),
    ],
    ex(
        "en-d-ng-final",
        "Як утворити /ŋ/ і чим sing відрізняється від sin? Чи треба вибух /g/ на кінці?",
        "How do you form /ŋ/, and how is sing different from sin? Do you need a /g/ burst at the end?",
        [
            idea("/ŋ/", "/ŋ/", "ŋ", "sing", "thing", "going", "nasal", "ніс"),
            idea("sin", "sin", "sin", "thin", "n", "contrast", "протистав"),
            idea("без вибуху", "no burst", "burst", "вибух", "g", "ŋk", "think"),
        ],
        " /ŋ/ утворюють як для /g/, але повітря йде в ніс, і на кінці sing у стандарті немає вибуху g. Sin закінчується на /n/, і це інше слово. У think є кластер /ŋk/.",
        "/ŋ/ is formed as for /g/, but the air goes through the nose, and at the end of sing in the standard there is no g-burst. Sin ends in /n/, and it is a different word. Think has a /ŋk/ cluster.",
    ),
)

U14_L5 = teach(
    "en-d-voicing",
    "Кінцеві дзвінкі: leave і leaf",
    "Final voiced consonants: leave and leaf",
    3,
    "Не оглушуйте як в українській",
    "Do not devoice as in Ukrainian",
    """В українській дзвінкі приголосні на кінці слова часто оглушуються: «дуб» звучить ближче до /п/, «віз» — до /с/. В англійській це змінює значення: leave /liːv/ (піти) — leaf /liːf/ (листок); said /sed/ — set /set/; bag /bæɡ/ — back /bæk/; eyes /aɪz/ — ice /aɪs/; rise — rice. Треба зберігати дзвінкість і трохи подовжувати попередній голосний перед дзвінким (leave довший за leaf).

Це одна з системних українських інтерференцій. Навіть якщо /v/ «трохи» глухіше, різниця в довжині голосного допомагає слухачеві. Практикуйте пари: leave–leaf, save–safe, prove–proof, said–set, sad–sat, bag–back, pig–pick, eyes–ice, rise–rice, buzz–bus.

У множині й третьої особи -s теж має дзвінкий і глухий варіанти: dogs /z/, cats /s/, buses /ɪz/. Після дзвінкого — /z/ (leaves, bags); після глухого — /s/ (leafs як дієслово «гортати», cats). Не уніфікуйте все під /s/.""",
    """In Ukrainian, voiced consonants at the end of a word are often devoiced: “dub” sounds closer to /p/, “viz” to /s/. In English this changes the meaning: leave /liːv/ (go away) versus leaf /liːf/ (on a tree); said /sed/ versus set /set/; bag /bæɡ/ versus back /bæk/; eyes /aɪz/ versus ice /aɪs/; rise versus rice. You must keep the voicing and slightly lengthen the vowel before a voiced consonant (leave is longer than leaf).

This is one of the systematic Ukrainian interferences. Even if /v/ is “a little” quieter, the extra vowel length helps the listener. Practise the pairs: leave–leaf, save–safe, prove–proof, said–set, sad–sat, bag–back, pig–pick, eyes–ice, rise–rice, buzz–bus.

In the plural and the third person, -s also has voiced and voiceless variants: dogs /z/, cats /s/, buses /ɪz/. After a voiced sound, /z/ (leaves, bags); after a voiceless one, /s/ (leafs as the verb “to turn pages”, cats). Do not unify everything under /s/.""",
    [
        "Кінцеве /v d g z/ в англійській не оглушують як в українській",
        "leave ≠ leaf; bag ≠ back; eyes ≠ ice",
        "Голосний перед дзвінким трохи довший",
        "dogs /z/, cats /s/, buses /ɪz/",
    ],
    [
        "Final /v d g z/ in English are not devoiced as in Ukrainian",
        "leave is not leaf; bag is not back; eyes is not ice",
        "The vowel before a voiced sound is a little longer",
        "dogs /z/, cats /s/, buses /ɪz/",
    ],
    [
        mcq(
            "en-d-voicing-r1",
            "leave («піти») закінчується на:",
            "leave (“go away”) ends in:",
            ["/v/", "/f/", "/p/", "/θ/"],
            0,
            "leave — /liːv/, дзвінке /v/; leaf — /f/.",
            "leave is /liːv/, with voiced /v/; leaf has /f/.",
        ),
        fill(
            "en-d-voicing-r2",
            "Вставте leave або leaf (потрібне «піти»).",
            "Insert leave or leaf (you need “go away”).",
            "We should ___ now.",
            ["leave", "Leave"],
        ),
        mcq(
            "en-d-voicing-r3",
            "Множина dogs закінчується на:",
            "The plural dogs ends in:",
            ["/z/", "/s/ as in cats", "/ɪz/ as in buses", "/θ/"],
            0,
            "Після дзвінкого g — /z/.",
            "After voiced g, the ending is /z/.",
        ),
        match(
            "en-d-voicing-r4",
            "Зіставте пари.",
            "Match the pairs.",
            [
                ("leave / prove / save", "final /v/"),
                ("leaf / proof / safe", "final /f/"),
                ("dogs / bags / eyes", "plural /z/"),
                ("cats / books / buses is different", "cats /s/; buses /ɪz/"),
            ],
        ),
    ],
    ex(
        "en-d-voicing",
        "Чому в англійській не можна оглушувати кінцеве /v/ як в українській? Наведіть leave і leaf і правило для -s.",
        "Why must you not devoice a final /v/ in English as in Ukrainian? Mention leave and leaf, and the rule for -s.",
        [
            idea("leave/leaf", "leave/leaf", "leave", "leaf", "v", "f", "meaning", "значен"),
            idea("не оглушувати", "do not devoice", "devoice", "оглуш", "ukrainian", "україн"),
            idea("dogs /z/", "dogs /z/", "dogs", "z", "cats", "s", "buses"),
        ],
        "В українській кінцеві дзвінкі часто оглушуються, але в англійській leave з /v/ і leaf з /f/ — різні слова. Тому кінцеве /v/ не оглушують. У множині dogs має /z/, cats — /s/, buses — /ɪz/.",
        "In Ukrainian, final voiced consonants are often devoiced, but in English leave with /v/ and leaf with /f/ are different words. So a final /v/ is not devoiced. In the plural, dogs has /z/, cats has /s/, and buses has /ɪz/.",
    ),
)

U14_EXAM = exam_lesson(
    "en-deep-consonants-exam",
    "Контрольна: приголосні",
    "Exam: consonants that matter",
    3,
    [
        mcq(
            "en-deep-consonants-exam-q1",
            "think починається з:",
            "think starts with:",
            ["/θ/", "/ð/", "/s/", "/t/"],
            0,
            "/θ/ глухе.",
            "Voiceless /θ/.",
        ),
        mcq(
            "en-deep-consonants-exam-q2",
            "west (напрямок) починається з:",
            "west (the direction) starts with:",
            ["/w/", "/v/", "/f/", "/uː/ only as a full vowel"],
            0,
            "/w/.",
            "/w/.",
        ),
        mcq(
            "en-deep-consonants-exam-q3",
            "an hour, бо:",
            "an hour, because:",
            ["h німе, слово починається з голосного звука", "h завжди німе в усіх словах", "hour починається з /h/, як hat", "артиклю немає"],
            0,
            "Німе h, голосний звук — an.",
            "Silent h, vowel sound — an.",
            ["h is silent, so the word starts with a vowel sound", "h is always silent in every word", "hour starts with /h/, like hat", "there is no article"],
        ),
        mcq(
            "en-deep-consonants-exam-q4",
            "sing закінчується (стандартно) на:",
            "sing ends (in the standard) in:",
            ["/ŋ/", "/n/", "/nɡ/ as the only RP form", "/g/ alone"],
            0,
            "/ŋ/ без вибуху g.",
            "/ŋ/ with no g-burst.",
        ),
        fill(
            "en-deep-consonants-exam-q5",
            "Вставте leave або leaf («піти»).",
            "Insert leave or leaf (“go away”).",
            "We should ___ now.",
            ["leave", "Leave"],
        ),
    ],
)

UNIT_14 = unit(
    "en-deep-consonants",
    "Приголосні, які важливі",
    "Consonants that matter",
    [U14_L1, U14_L2, U14_L3, U14_L4, U14_L5, U14_EXAM],
)


U15_L1 = teach(
    "en-d-word-stress",
    "Наголос у слові",
    "Word stress",
    3,
    "REcord і reCORD — різні слова",
    "REcord and reCORD are different words",
    """В англійській наголос — частина слова, не вільний вибір. ˈrecord (іменник: запис, платівка) проти reˈcord (дієслово: записувати). Так само ˈpresent / preˈsent, ˈobject / obˈject, ˈincrease / inˈcrease. Помилковий наголос може зробити слово невпізнаванним: computer не /ˈkɒmpjutə/.

Типові моделі: багато двоскладових іменників — наголос на першому (ˈtable, ˈteacher); дієслова часто на другому (deˈcide, reˈceive). Слова на -tion, -sion — наголос на складі перед суфіксом (inforˈmation, deˈcision). -ee, -eer, -ese часто самі наголошені (trainˈee, engiˈneer, Japaˈnese). Складені іменники: ˈwhiteboard, ˈdatabase (перший елемент).

Для українськомовних пастка — переносити наголос як в українському запозиченні: інтерне́т проти ˈinternet; докуме́нт іноді тягне на doˈcument, хоча іменник ˈdocument. Завжди перевіряйте ˈ у словнику і кажіть слово вголос.""",
    """In English, stress is part of the word, not a free choice. ˈrecord (the noun: a file or a disc) versus reˈcord (the verb: to write down). The same happens with ˈpresent / preˈsent, ˈobject / obˈject, ˈincrease / inˈcrease. Wrong stress can make a word unrecognisable: computer is not /ˈkɒmpjutə/.

Typical patterns: many two-syllable nouns are stressed on the first syllable (ˈtable, ˈteacher); verbs are often stressed on the second (deˈcide, reˈceive). Words in -tion, -sion are stressed on the syllable before the suffix (inforˈmation, deˈcision). -ee, -eer, -ese are often themselves stressed (trainˈee, engiˈneer, Japaˈnese). Compound nouns: ˈwhiteboard, ˈdatabase (the first element).

For Ukrainian speakers the trap is to carry over the stress of a Ukrainian loan: український “інтерне́т” versus English ˈinternet; “докуме́нт” sometimes pulls towards doˈcument, though the noun is ˈdocument. Always check ˈ in a dictionary and say the word aloud.""",
    [
        "Наголос змінює слово: ˈrecord (n) / reˈcord (v)",
        "Іменники часто 1-й склад; -tion — склад перед суфіксом",
        "ˈinternet, ˈdocument — не як в українському запозиченні",
        "Перевіряйте ˈ у словнику",
    ],
    [
        "Stress changes the word: ˈrecord (n) / reˈcord (v)",
        "Nouns often on the first syllable; -tion on the syllable before the suffix",
        "ˈinternet, ˈdocument — not as in the Ukrainian loan",
        "Check ˈ in a dictionary",
    ],
    [
        mcq(
            "en-d-word-stress-r1",
            "Іменник «запис». Де наголос?",
            "The noun “a recording”. Where is the stress?",
            ["ˈrecord (перший склад)", "reˈcord (другий склад, як у дієслові)", "однаково на обох", "без наголосу"],
            0,
            "Іменник — ˈrecord, перший склад.",
            "The noun is ˈrecord, first syllable.",
            [
                "ˈrecord (the first syllable)",
                "reˈcord (the second syllable, as in the verb)",
                "equal stress on both",
                "no stress",
            ],
        ),
        fill(
            "en-d-word-stress-r2",
            "Вставте information з правильною «підказкою» — напишіть слово information.",
            "Type the word information (stress is on -ma-).",
            "This ___ is useful. (the noun)",
            ["information", "Information"],
        ),
        mcq(
            "en-d-word-stress-r3",
            "Яке твердження правильне?",
            "Which statement is correct?",
            [
                "information має наголос на складі перед -tion.",
                "information завжди наголошують на -tion.",
                "internet в англійській наголошують як українське «інтерне́т», на останньому складі.",
                "Наголос в англійській вільний, як мелодія.",
            ],
            0,
            "Модель -tion: наголос перед суфіксом — inforˈmation.",
            "The -tion pattern: stress before the suffix — inforˈmation.",
            [
                "information is stressed on the syllable before -tion.",
                "information is always stressed on -tion.",
                "internet in English is stressed like Ukrainian, on the last syllable.",
                "English stress is free, like a melody.",
            ],
        ),
        match(
            "en-d-word-stress-r4",
            "Зіставте слово з наголосом.",
            "Match each word with its stress.",
            [
                ("record (noun)", "ˈrecord — first syllable"),
                ("record (verb)", "reˈcord — second syllable"),
                ("information", "inforˈmation — before -tion"),
                ("internet", "ˈinternet — first syllable"),
            ],
        ),
    ],
    ex(
        "en-d-word-stress",
        "Чому наголос у ˈrecord і reˈcord важливий? Яка типова модель для -tion і яка пастка з українськими запозиченнями?",
        "Why does the stress in ˈrecord and reˈcord matter? What is a typical pattern for -tion, and what is the trap with Ukrainian loans?",
        [
            idea("іменник/дієслово", "noun/verb", "record", "noun", "іменник", "verb", "дієслов", "present"),
            idea("-tion", "-tion", "tion", "information", "before", "перед"),
            idea("internet", "internet", "internet", "document", "loan", "запозич", "ukrainian"),
        ],
        "Наголос розрізняє іменник ˈrecord і дієслово reˈcord, тобто змінює слово. У словах на -tion наголос стоїть на складі перед суфіксом, як у information. Українські запозичення на кшталт «інтерне́т» не треба переносити: англійською ˈinternet.",
        "Stress distinguishes the noun ˈrecord from the verb reˈcord, so it changes the word. In -tion words the stress is on the syllable before the suffix, as in information. Ukrainian loans such as a last-syllable “internet” should not be carried over: in English it is ˈinternet.",
    ),
)

U15_L2 = teach(
    "en-d-sentence-stress",
    "Наголос у реченні",
    "Sentence stress",
    3,
    "Змістовні слова гучніші за службові",
    "Content words are stronger than function words",
    """У реченні наголошують змістовні слова: іменники, основні дієслова, прикметники, прислівники, питальні й вказівні слова. Службові (артикли, прийменники, допоміжні, займенники, to) зазвичай слабкі й часто зі швою. I WANT a CUP of TEA — want, cup, tea сильні; a, of слабкі. Це створює англійський «пунктирний» ритм (stress-timed), відмінний від більш рівномірного українського.

Якщо наголосити все підряд, мова звучить важко й неанглійською. Якщо не наголосити жодного змістовного слова — навпаки, нерозбірливо. Наголос також показує нову інформацію: We deployed on FRIDAY (не в четвер). Contrast — наступний урок.

Практикуйте короткі фрази, «приглушуючи» службові: a cup of tea, I need to go, She's in a meeting. Слухайте SpeakButton і відтворюйте ритм, не кожну літеру з однаковою силою.""",
    """In a sentence we stress content words: nouns, main verbs, adjectives, adverbs, question words and demonstratives. Function words (articles, prepositions, auxiliaries, pronouns, to) are usually weak and often have schwa. I WANT a CUP of TEA — want, cup, tea are strong; a, of are weak. This creates English’s “dotted” stress-timed rhythm, different from a more even Ukrainian rhythm.

If you stress every word, speech sounds heavy and un-English. If you stress no content word, it becomes unclear. Stress also marks new information: We deployed on FRIDAY (not on Thursday). Contrast is the next lesson.

Practise short phrases, “quietening” the function words: a cup of tea, I need to go, She's in a meeting. Listen to the SpeakButton and copy the rhythm, not every letter at equal strength.""",
    [
        "Змістовні слова — сильний наголос; службові — слабкі",
        "a cup of tea: cup і tea сильні, a і of — шва",
        "Ритм англійської — stress-timed, не «всі склади рівні»",
        "Наголос також маркує нову інформацію",
    ],
    [
        "Content words take strong stress; function words are weak",
        "a cup of tea: cup and tea are strong, a and of are schwa",
        "English rhythm is stress-timed, not “every syllable equal”",
        "Stress also marks new information",
    ],
    [
        mcq(
            "en-d-sentence-stress-r1",
            "У фразі a cup of tea які слова зазвичай СИЛЬНІ?",
            "In a cup of tea, which words are usually STRONG?",
            ["cup і tea", "a і of", "лише a", "усі чотири однаково"],
            0,
            "Змістовні cup і tea — сильні; a, of — слабкі.",
            "Content words cup and tea are strong; a and of are weak.",
            ["cup and tea", "a and of", "only a", "all four equally"],
        ),
        fill(
            "en-d-sentence-stress-r2",
            "Вставте of або off.",
            "Insert of or off.",
            "a cup ___ tea",
            ["of", "Of"],
        ),
        mcq(
            "en-d-sentence-stress-r3",
            "Що станеться, якщо наголосити кожне слово, включно з the і of?",
            "What happens if you stress every word, including the and of?",
            [
                "Мова звучить важко й менш природно.",
                "Це обов'язкова норма RP.",
                "Службові слова завжди мають бути найсильнішими.",
                "Тоді шва зникає і це краще.",
            ],
            0,
            "Рівний сильний наголос на всьому — неанглійський ритм.",
            "Equal strong stress on everything is an un-English rhythm.",
            [
                "Speech sounds heavy and less natural.",
                "This is a required RP rule.",
                "Function words must always be the strongest.",
                "Then schwa disappears, which is better.",
            ],
        ),
        order_words(
            "en-d-sentence-stress-r4",
            "Зберіть природну фразу (ритм: сильні want і tea).",
            "Build the natural phrase (rhythm: strong want and tea).",
            ["I", "want", "a", "cup", "of", "tea"],
        ),
    ],
    ex(
        "en-d-sentence-stress",
        "Які слова в реченні наголошують і як це пов'язано зі швою? Чому не треба наголошувати the і of так само сильно, як cup?",
        "Which words in a sentence are stressed, and how does that relate to schwa? Why shouldn't you stress the and of as strongly as cup?",
        [
            idea("змістовні", "content", "content", "змістовн", "cup", "tea", "want", "noun"),
            idea("службові", "function", "function", "службов", "of", "the", "a", "weak", "слабк"),
            idea("шва", "schwa", "schwa", "шва", "rhythm", "ритм"),
        ],
        "У реченні наголошують змістовні слова, наприклад cup, tea і want. Службові the, a і of зазвичай слабкі і часто мають шву. Якщо наголосити їх так само сильно, ритм стає важким і неанглійським.",
        "In a sentence we stress content words, for example cup, tea and want. Function words such as the, a and of are usually weak and often have schwa. If you stress them equally strongly, the rhythm becomes heavy and un-English.",
    ),
)

U15_L3 = teach(
    "en-d-intonation-q",
    "Інтонація питань",
    "The intonation of questions",
    3,
    "Yes/no часто вгору, wh- часто вниз",
    "Yes/no often rises, wh- often falls",
    """Базовий орієнтир (нейтральний стиль, не єдиний можливий): загальні питання (yes/no) часто мають висхідну інтонацію в кінці: Are you READY? Is the test GREEN? Спеціальні питання (wh-: what, where, when, why, how, who) часто спадні: WHERE is the station? WHY did it FAIL? Спадний тон звучить як завершене питання з очікуванням відповіді; висхідний yes/no — як відкритий запит підтвердження.

Це тенденція, не залізний закон: дружній yes/no може падати, а здивований wh- — підніматися. Question tags: спадний tag — мовець майже впевнений (It's ready, isn't it↘); висхідний — справжнє питання (It's ready, isn't it↗).

Для українськомовних корисно не «піднімати» кожне речення, ніби невпевненість. Розповідні речення в англійській зазвичай закінчуються спадом: The deploy is DONE↘. Практикуйте пару: Are you ready↗? / What time is it↘? і слухайте SpeakButton.""",
    """A basic landmark (neutral style, not the only possibility): yes/no questions often have a rising tone at the end: Are you READY? Is the test GREEN? Wh-questions (what, where, when, why, how, who) often fall: WHERE is the station? WHY did it FAIL? A falling tone sounds like a complete question that expects an answer; a rising yes/no sounds like an open request for confirmation.

This is a tendency, not an iron law: a friendly yes/no can fall, and a surprised wh-question can rise. Question tags: a falling tag means the speaker is almost sure (It's ready, isn't it↘); a rising tag is a real question (It's ready, isn't it↗).

For Ukrainian speakers it helps not to “lift” every sentence as if it were uncertainty. English statements usually end with a fall: The deploy is DONE↘. Practise the pair: Are you ready↗? / What time is it↘? and listen to the SpeakButton.""",
    [
        "Yes/no часто ↗; wh-питання часто ↘",
        "Це тенденція, не єдиний можливий тон",
        "Tag: спад — підтвердження; підйом — справжнє питання",
        "Розповідь зазвичай закінчується спадом",
    ],
    [
        "Yes/no often rises; wh-questions often fall",
        "This is a tendency, not the only possible tone",
        "A falling tag is confirmation; a rise is a real question",
        "A statement usually ends with a fall",
    ],
    [
        mcq(
            "en-d-intonation-q-r1",
            "Нейтральне Are you ready? частіше має:",
            "A neutral Are you ready? more often has:",
            [
                "висхідну інтонацію (yes/no)",
                "обов'язково різкий спад, як єдину норму",
                "наголос лише на are, без контуру",
                "завжди рівний тон на кожному складі",
            ],
            0,
            "Yes/no в нейтральному стилі часто піднімається.",
            "A yes/no question in a neutral style often rises.",
            [
                "a rising tone (yes/no)",
                "a sharp fall as the only norm",
                "stress only on are, with no contour",
                "always a level tone on every syllable",
            ],
        ),
        fill(
            "en-d-intonation-q-r2",
            "Вставте Where або Are (потрібне wh-питання).",
            "Insert Where or Are (you need a wh-question).",
            "___ is the station?",
            ["Where", "where"],
        ),
        mcq(
            "en-d-intonation-q-r3",
            "Спадний tag It's ready, isn't it↘ зазвичай означає:",
            "A falling tag It's ready, isn't it↘ usually means:",
            [
                "мовець майже впевнений і хоче підтвердження",
                "мовець зовсім не знає і це єдине справжнє питання",
                "це заборонена інтонація",
                "це завжди грубість",
            ],
            0,
            "Спадний tag — майже впевнене підтвердження.",
            "A falling tag is almost-sure confirmation.",
            [
                "the speaker is almost sure and wants confirmation",
                "the speaker has no idea, and this is the only real question",
                "this intonation is forbidden",
                "this is always rude",
            ],
        ),
        translate(
            "en-d-intonation-q-r4",
            "Перекладіть як wh-питання (спадний контур у нейтральному стилі).",
            "Translate as a wh-question (a falling contour in a neutral style).",
            "Де вокзал?",
            [
                "Where is the station",
                "Where is the station?",
                "Where's the station",
                "Where's the station?",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-intonation-q",
        "Яка типова інтонація yes/no і wh-питань? Що означає спадний question tag?",
        "What is the typical intonation of yes/no and wh-questions? What does a falling question tag mean?",
        [
            idea("yes/no ↗", "yes/no rise", "rise", "висхід", "ready", "yes/no", "yes no"),
            idea("wh ↘", "wh fall", "fall", "спад", "where", "why", "wh"),
            idea("tag", "tag", "tag", "confirmation", "підтвердж", "sure", "впевнен"),
        ],
        "У нейтральному стилі yes/no питання часто мають висхідну інтонацію, наприклад Are you ready, а wh-питання — спадну: Where is the station. Спадний tag означає, що мовець майже впевнений і хоче підтвердження.",
        "In a neutral style, yes/no questions often have a rising tone, for example Are you ready, and wh-questions often fall: Where is the station. A falling tag means the speaker is almost sure and wants confirmation.",
    ),
)

U15_L4 = teach(
    "en-d-contrast-stress",
    "Контрастний наголос",
    "Contrastive stress",
    3,
    "I said I need TWO tests, not one",
    "I said I need TWO tests, not one",
    """Контрастний наголос виділяє слово, яке протиставляється альтернативі, навіть якщо це службове слово, яке зазвичай слабке. I said I need TWO tests, not one. I need YOU to review this, not him. She deployed on FRIDAY, not Thursday. I sent the file TO Maria, not FROM her. Тут to може отримати сильну форму /tuː/.

Без контрастного наголосу слухач може не зрозуміти, що саме ви виправляєте. У письмі це передають курсивом, Caps або контекстом (not…). У мовленні — силою, висотою й довжиною виділеного складу.

Типова помилка — наголошувати не те слово (I NEED two tests, коли суперечка саме про кількість). Перед тим як говорити, визначте, що є новою чи протиставленою інформацією, і поставте пік туди. Це той самий принцип, що в cleft (It was FRIDAY that we deployed), лише просодичний.""",
    """Contrastive stress highlights the word that is opposed to an alternative, even if it is a function word that is usually weak. I said I need TWO tests, not one. I need YOU to review this, not him. She deployed on FRIDAY, not Thursday. I sent the file TO Maria, not FROM her. Here to can take the strong form /tuː/.

Without contrastive stress, the listener may not understand what you are correcting. In writing this is shown with italics, caps, or context (not…). In speech it is shown with the strength, pitch and length of the highlighted syllable.

A typical mistake is stressing the wrong word (I NEED two tests, when the dispute is about the number). Before you speak, decide what is new or contrasted information, and put the peak there. This is the same principle as a cleft (It was FRIDAY that we deployed), only in prosody.""",
    [
        "Контрастний наголос виділяє протиставлене слово",
        "Навіть службове to / I / not може стати сильним",
        "Спочатку визначте, ЩО ви протиставляєте",
        "Паралель із cleft: саме FRIDAY, не Thursday",
    ],
    [
        "Contrastive stress highlights the opposed word",
        "Even a function word such as to / I / not can become strong",
        "First decide WHAT you are contrasting",
        "A parallel with a cleft: exactly FRIDAY, not Thursday",
    ],
    [
        mcq(
            "en-d-contrast-stress-r1",
            "Суперечка про кількість тестів (два, не один). Де пік?",
            "The dispute is about the number of tests (two, not one). Where is the peak?",
            [
                "I need TWO tests, not one.",
                "I NEED two tests, if the dispute is only the number.",
                "I need two TESTS, if tests are not the contrast.",
                "I need two tests — усі слова рівні, без піка.",
            ],
            0,
            "Протиставляється кількість — TWO.",
            "The number is contrasted — TWO.",
        ),
        fill(
            "en-d-contrast-stress-r2",
            "Вставте TO або to — напишіть TO для емфази напрямку (не FROM).",
            "Type TO for emphasis of direction (not FROM).",
            "I sent the file ___ Maria, not FROM her.",
            ["TO", "to", "To"],
        ),
        mcq(
            "en-d-contrast-stress-r3",
            "Що є просодичним відповідником It was Friday that we deployed?",
            "What is the prosodic counterpart of It was Friday that we deployed?",
            [
                "Наголосити FRIDAY: We deployed on FRIDAY.",
                "Наголосити лише on.",
                "Прибрати всі наголоси.",
                "Завжди говорити шепотом.",
            ],
            0,
            "Контрастний наголос на FRIDAY виконує ту саму емфазу.",
            "Contrastive stress on FRIDAY does the same highlighting.",
            [
                "Stress FRIDAY: We deployed on FRIDAY.",
                "Stress only on.",
                "Remove all stresses.",
                "Always whisper.",
            ],
        ),
        translate(
            "en-d-contrast-stress-r4",
            "Перекладіть, зберігши контраст «два, не один».",
            "Translate, keeping the contrast “two, not one”.",
            "Мені потрібно ДВА тести, не один.",
            [
                "I need TWO tests, not one",
                "I need two tests, not one",
                "I need TWO tests not one",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-contrast-stress",
        "Що таке контрастний наголос і чому службове слово іноді стає сильним? Як обрати слово для піка?",
        "What is contrastive stress, and why does a function word sometimes become strong? How do you choose the word for the peak?",
        [
            idea("протиставлення", "contrast", "contrast", "протистав", "two", "friday", "not one"),
            idea("службове сильне", "strong function word", "to", "from", "strong", "сильн", "function"),
            idea("що саме", "what exactly", "decide", "визнач", "peak", "пік", "number"),
        ],
        "Контрастний наголос виділяє слово, яке протиставляють альтернативі, наприклад TWO tests, not one. Навіть службове TO може стати сильним, якщо напрямок є контрастом. Спочатку треба визначити, що саме ви протиставляєте, і поставити пік туди.",
        "Contrastive stress highlights the word that is opposed to an alternative, for example TWO tests, not one. Even a function word such as TO can become strong if direction is the contrast. First you decide exactly what you are contrasting, and you put the peak there.",
    ),
)

U15_L5 = teach(
    "en-d-connected",
    "Зв'язна мова: linking, elision, weak forms",
    "Connected speech: linking, elision, weak forms",
    4,
    "Як слова зливаються в потоці",
    "How words blend in a stream",
    """У зв'язній мові слова не стоять як окремі цеглини. Linking: кінцевий приголосний «переїжджає» до наступного голосного — pick it up звучить близько до /pɪk ɪt ʌp/ з плавним стиком; an apple /ənæpl/. У не-rhotic акцентах з'являється linking /r/: far away /fɑːr əweɪ/. Intrusive /r/ — подібний звук між голосними (idea of), стилістично не всі його люблять, але він існує.

Elision — випадіння звука: next day часто без /t/; sandwich без чіткого /d/. Assimilation — звук підлаштовується: ten cups може звучати ближче до /teŋ kʌps/. Слабкі форми службових слів (попередні уроки) працюють разом із цим.

Для слухання це важливіше, ніж для вашого власного «ідеального» відтворення: ви маєте ВПІЗНАТИ злиття. Для мовлення досить природного темпу без штучних пауз після кожного слова. Не ковтайте змістовні слова; ковтайте (ослабляйте) службові. Практикуйте: pick it up, an hour and a half, What do you want? (/wɒdʒə wɒnt/ у швидкому мовленні).""",
    """In connected speech, words do not stand as separate bricks. Linking: a final consonant “moves” to the following vowel — pick it up sounds close to /pɪk ɪt ʌp/ with a smooth join; an apple /ənæpl/. In non-rhotic accents a linking /r/ appears: far away /fɑːr əweɪ/. Intrusive /r/ is a similar sound between vowels (idea of); not everyone likes it stylistically, but it exists.

Elision is the dropping of a sound: next day often has no /t/; sandwich may have no clear /d/. Assimilation is a sound adapting: ten cups can sound closer to /teŋ kʌps/. The weak forms of function words (earlier lessons) work together with this.

For listening this matters more than for your own “perfect” production: you must RECOGNISE the blending. For speaking, a natural pace without an artificial pause after every word is enough. Do not swallow content words; do swallow (weaken) function words. Practise: pick it up, an hour and a half, What do you want? (/wɒdʒə wɒnt/ in fast speech).""",
    [
        "Linking: приголосний + наступний голосний зливаються",
        "Elision: next day часто без /t/",
        "Слабкі форми + злиття = природний потік",
        "Головне для слухання — впізнавати, не боятися злиття",
    ],
    [
        "Linking: a consonant plus the next vowel join",
        "Elision: next day often has no /t/",
        "Weak forms + blending = a natural stream",
        "The main listening skill is recognising blends, not fearing them",
    ],
    [
        mcq(
            "en-d-connected-r1",
            "Що таке linking у pick it up?",
            "What is linking in pick it up?",
            [
                "Кінцевий приголосний плавно стикується з наступним голосним.",
                "Після кожного слова обов'язкова довга пауза.",
                "Усі службові слова випадають повністю.",
                "Це правило лише для письма.",
            ],
            0,
            "Linking — плавний стик приголосного з голосним.",
            "Linking is a smooth join from a consonant into a vowel.",
            [
                "The final consonant joins smoothly to the following vowel.",
                "A long pause is required after every word.",
                "All function words disappear completely.",
                "This is a rule for writing only.",
            ],
        ),
        fill(
            "en-d-connected-r2",
            "Вставте it або at (фраза pick ___ up).",
            "Insert it or at (the phrase pick ___ up).",
            "pick ___ up",
            ["it", "It"],
        ),
        mcq(
            "en-d-connected-r3",
            "Elision у next day часто означає:",
            "Elision in next day often means:",
            [
                "звук /t/ може не звучати",
                "слово next завжди зникає цілком",
                "треба вимовити подвійне /tt/",
                "це можливо лише в співі",
            ],
            0,
            "Elision — випадіння звука, часто /t/.",
            "Elision is the dropping of a sound, often /t/.",
            [
                "the sound /t/ may not be heard",
                "the word next always disappears completely",
                "you must pronounce a double /tt/",
                "this is only possible in singing",
            ],
        ),
        translate(
            "en-d-connected-r4",
            "Перекладіть фразу, яку в потоці зливають.",
            "Translate the phrase that blends in a stream.",
            "підніми це (pick it up)",
            [
                "pick it up",
                "Pick it up",
                "pick it up.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-connected",
        "Що таке linking і elision? Що важливіше для слухання і як поводитися зі службовими словами в потоці?",
        "What are linking and elision? What matters more for listening, and how should you treat function words in a stream?",
        [
            idea("linking", "linking", "linking", "стик", "pick it up", "join", "vowel"),
            idea("elision", "elision", "elision", "випад", "next day", "t"),
            idea("впізнавати", "recognise", "recognise", "впізнав", "listen", "слухан", "weak", "слабк"),
        ],
        "Linking — це плавний стик кінцевого приголосного з наступним голосним, як у pick it up. Elision — випадіння звука, наприклад /t/ у next day. Для слухання важливо впізнавати злиття, а службові слова в потоці ослаблювати, не ковтати змістовні.",
        "Linking is a smooth join from a final consonant into the next vowel, as in pick it up. Elision is the dropping of a sound, for example /t/ in next day. For listening, the important skill is recognising blends, and in a stream we weaken function words, without swallowing content words.",
    ),
)

U15_EXAM = exam_lesson(
    "en-deep-stress-intonation-exam",
    "Контрольна: наголос і інтонація",
    "Exam: stress and intonation",
    3,
    [
        mcq(
            "en-deep-stress-intonation-exam-q1",
            "Іменник record має наголос:",
            "The noun record is stressed:",
            ["на першому складі: ˈrecord", "на другому, як дієслово", "однаково на обох", "без наголосу"],
            0,
            "Іменник — ˈrecord.",
            "The noun is ˈrecord.",
            ["on the first syllable: ˈrecord", "on the second, like the verb", "equally on both", "with no stress"],
        ),
        mcq(
            "en-deep-stress-intonation-exam-q2",
            "У a cup of tea сильні:",
            "In a cup of tea the strong words are:",
            ["cup і tea", "a і of", "лише of", "усі однаково"],
            0,
            "Змістовні cup і tea.",
            "Content words cup and tea.",
            ["cup and tea", "a and of", "only of", "all equally"],
        ),
        mcq(
            "en-deep-stress-intonation-exam-q3",
            "Нейтральне Are you ready? частіше:",
            "A neutral Are you ready? more often:",
            ["піднімається (yes/no)", "має бути лише різкий спад як єдина норма", "не має контуру", "наголошує лише are"],
            0,
            "Yes/no часто ↗.",
            "Yes/no often rises.",
            ["rises (yes/no)", "must only have a sharp fall as the only norm", "has no contour", "stresses only are"],
        ),
        mcq(
            "en-deep-stress-intonation-exam-q4",
            "Контраст «два, не один» ставить пік на:",
            "The contrast “two, not one” puts the peak on:",
            ["TWO", "need, якщо суперечка лише про кількість", "I обов'язково", "кожне слово"],
            0,
            "Пік на TWO.",
            "The peak is on TWO.",
            ["TWO", "need, if the dispute is only the number", "I, always", "every word"],
        ),
        fill(
            "en-deep-stress-intonation-exam-q5",
            "Вставте it (фраза зі linking).",
            "Insert it (a phrase with linking).",
            "pick ___ up",
            ["it", "It"],
        ),
    ],
)

UNIT_15 = unit(
    "en-deep-stress-intonation",
    "Наголос і інтонація",
    "Stress and intonation",
    [U15_L1, U15_L2, U15_L3, U15_L4, U15_L5, U15_EXAM],
)

UNITS = [UNIT_13, UNIT_14, UNIT_15]
