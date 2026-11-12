"""English deep part E: vocabulary (units 16–21)."""
from __future__ import annotations

from ._common import exam_lesson, ex, fill, idea, match, mcq, order_words, teach, translate, unit

U16_L1 = teach(
    "en-d-make-do",
    "make і do: колокації",
    "make and do: collocations",
    3,
    "make a decision, do homework — не навпаки",
    "make a decision, do homework — not the other way around",
    """make і do українською часто обидва «робити», але колокації фіксовані. do — робота, обов'язки, діяльність загалом: do homework, do the dishes, do a job, do business, do research, do someone a favour, do your best, do harm. make — створення, результат, щось нове: make a decision, make a mistake, make a plan, make an appointment, make money, make progress, make a phone call, make an effort, make sense, make a difference.

Типові помилки: *do a decision, *do a mistake, *make homework, *make research. Запам'ятовуйте цілі фрази, не окремі дієслова. make the bed (застелити) — виняток із «створення», просто колокація. do sport у брит. англійській поруч із play football (конкретний вид) і go swimming (go + -ing).

Короткий тест: якщо є «виріб / результат / рішення» — швидше make; якщо «виконати роботу / зайнятися діяльністю» — швидше do. Але винятки треба вчити списком.""",
    """make and do are both often “robyty” in Ukrainian, but the collocations are fixed. do is work, duties, activity in general: do homework, do the dishes, do a job, do business, do research, do someone a favour, do your best, do harm. make is creating, a result, something new: make a decision, make a mistake, make a plan, make an appointment, make money, make progress, make a phone call, make an effort, make sense, make a difference.

Typical mistakes: *do a decision, *do a mistake, *make homework, *make research. Memorise whole phrases, not isolated verbs. make the bed is an exception to “creation” — it is simply a collocation. do sport in British English sits next to play football (a specific game) and go swimming (go + -ing).

A short test: if there is a “product / result / decision”, make is more likely; if there is “carry out work / be busy with an activity”, do is more likely. But the exceptions have to be learned as a list.""",
    [
        "do homework / research / business / your best",
        "make a decision / mistake / plan / appointment / progress",
        "Не *do a mistake і не *make homework",
        "Вчіть фразу цілком",
    ],
    [
        "do homework / research / business / your best",
        "make a decision / mistake / plan / appointment / progress",
        "Not *do a mistake and not *make homework",
        "Learn the whole phrase",
    ],
    [
        mcq(
            "en-d-make-do-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["We need to make a decision.", "We need to do a decision.", "We need to make homework first, as a collocation.", "We need to do a mistake."],
            0,
            "make a decision — фіксована колокація.",
            "make a decision is a fixed collocation.",
        ),
        fill(
            "en-d-make-do-r2",
            "Вставте make або do (домашнє завдання).",
            "Insert make or do (school work at home).",
            "I have to ___ my homework.",
            ["do", "Do"],
        ),
        mcq(
            "en-d-make-do-r3",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["She made a mistake in the query.", "She did a mistake in the query.", "She made research last year as the usual collocation.", "She did an appointment."],
            0,
            "make a mistake; do research — різні дієслова.",
            "make a mistake; do research — different verbs.",
        ),
        translate(
            "en-d-make-do-r4",
            "Перекладіть колокацією make.",
            "Translate with a make collocation.",
            "Нам треба записатися на зустріч.",
            [
                "We need to make an appointment",
                "We have to make an appointment",
                "We need to make an appointment.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-make-do",
        "Коли обирають make, а коли do? Наведіть по дві колокації і типові помилки.",
        "When do you choose make, and when do? Give two collocations for each and typical mistakes.",
        [
            idea("make", "make", "make a decision", "mistake", "appointment", "progress"),
            idea("do", "do", "do homework", "research", "business", "your best"),
            idea("помилки", "mistakes", "do a decision", "make homework", "помилк"),
        ],
        "Make беруть для результату і створення, наприклад make a decision і make a mistake. Do — для роботи і діяльності: do homework і do research. Типові помилки — do a decision і make homework; фрази треба вчити цілком.",
        "We use make for a result and for creating, for example make a decision and make a mistake. Do is for work and activity: do homework and do research. Typical mistakes are do a decision and make homework; the phrases must be learned as wholes.",
    ),
)

U16_L2 = teach(
    "en-d-say-tell",
    "say, tell, speak, talk",
    "say, tell, speak, talk",
    3,
    "tell someone, say something",
    "tell someone, say something",
    """say — вимовляти слова; після нього часто йде сама цитата або that, а слухач з to: She said hello. He said that the test had failed. He said to me that… (можна, трохи важче). Не *He said me. tell — потребує адресата без to: She told me the news. Tell a story / the truth / a lie / the time / the difference. Не *She told that… без об'єкта (окрім рідкісних формальних випадків).

speak — уміння або офіційніший акт: She speaks English. He spoke at the conference. speak to / with someone. talk — розмова, менш формальна: We talked about the bug. talk to someone. say і tell більше про зміст слів; speak і talk — про сам акт розмови або мову.

Типові помилки: *tell to me; *say me; *tell that the test failed без me; *speak English language краще speak English. Please tell me (не say me) when you're ready.""",
    """say is producing the words; after it you often get the wording itself or that, and the listener with to: She said hello. He said that the test had failed. He said to me that… (possible, a little heavier). Not *He said me. tell needs an addressee without to: She told me the news. Tell a story / the truth / a lie / the time / the difference. Not *She told that… without an object (except in rare formal cases).

speak is an ability or a more formal act: She speaks English. He spoke at the conference. speak to / with someone. talk is conversation, less formal: We talked about the bug. talk to someone. say and tell are more about the content of the words; speak and talk are about the act of talking or the language itself.

Typical mistakes: *tell to me; *say me; *tell that the test failed with no me; *speak English language — prefer speak English. Please tell me (not say me) when you're ready.""",
    [
        "say something (to someone); не *say me",
        "tell someone something: told me the news",
        "speak English; speak at a conference",
        "talk about / talk to — розмовніше",
    ],
    [
        "say something (to someone); not *say me",
        "tell someone something: told me the news",
        "speak English; speak at a conference",
        "talk about / talk to is more conversational",
    ],
    [
        mcq(
            "en-d-say-tell-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["She told me the news.", "She said me the news.", "She told to me the news.", "She told that the news, with no object."],
            0,
            "tell + адресат: told me.",
            "tell + an addressee: told me.",
        ),
        fill(
            "en-d-say-tell-r2",
            "Вставте said або told.",
            "Insert said or told.",
            "He ___ that the test had failed.",
            ["said", "Said"],
        ),
        mcq(
            "en-d-say-tell-r3",
            "Оберіть природне.",
            "Choose the natural option.",
            ["She speaks English.", "She speaks English language.", "She tells English.", "She says English."],
            0,
            "speak English — уміння мови.",
            "speak English is the language skill.",
        ),
        translate(
            "en-d-say-tell-r4",
            "Перекладіть із tell.",
            "Translate with tell.",
            "Скажи мені, коли будеш готовий.",
            [
                "Tell me when you're ready",
                "Tell me when you are ready",
                "Please tell me when you're ready",
                "Please tell me when you are ready",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-say-tell",
        "Чим tell відрізняється від say? Коли брати speak, а коли talk? Які типові помилки?",
        "How is tell different from say? When do you use speak, and when talk? What are the typical mistakes?",
        [
            idea("tell me", "tell me", "tell", "told me", "addressee", "адресат"),
            idea("say that", "say that", "said", "say", "that", "to me"),
            idea("speak/talk", "speak/talk", "speak", "talk", "english", "about"),
        ],
        "Tell потребує адресата: she told me the news, не said me. Say часто йде з that: he said that the test had failed. Speak — уміння або більш офіційний виступ, talk — розмова. Типові помилки — say me і tell to me.",
        "Tell needs an addressee: she told me the news, not said me. Say often takes that: he said that the test had failed. Speak is an ability or a more formal talk; talk is conversation. Typical mistakes are say me and tell to me.",
    ),
)

U16_L3 = teach(
    "en-d-borrow-lend",
    "borrow, lend, raise, rise, affect, effect",
    "borrow, lend, raise, rise, affect, effect",
    3,
    "Напрямок і частина мови",
    "Direction and part of speech",
    """borrow — брати в борг / позичати СОБІ: Can I borrow your charger? lend — давати в борг: I'll lend you my charger. Українське «позичити» покриває обидва напрямки — звідси *Can I lend your charger? Перевірка: lend = give temporarily; borrow = take temporarily.

rise (rise–rose–risen) — підніматися самому, без додатка: Prices rose. The sun rises. raise (raise–raised–raised) — піднімати щось: They raised the prices. Raise your hand. Не *prices raised без підмета-агенса в активному значенні «самі виросли» — тоді rose.

affect — дієслово «впливати»: This bug affects login. effect — зазвичай іменник «наслідок»: the effect of the change. (effect як дієслово «здійснити» рідкісне: effect a change.) Інші пари: lie / lay, lose / loose, advise / advice. Вчіть їх як міні-набори, не по одному.""",
    """borrow is taking temporarily for yourself: Can I borrow your charger? lend is giving temporarily: I'll lend you my charger. Ukrainian “pozychyty” covers both directions — hence *Can I lend your charger? A check: lend = give temporarily; borrow = take temporarily.

rise (rise–rose–risen) is going up by itself, with no object: Prices rose. The sun rises. raise (raise–raised–raised) is lifting something: They raised the prices. Raise your hand. Not *prices raised in the active meaning “went up by themselves” — that is rose.

affect is the verb “to influence”: This bug affects login. effect is usually the noun “result”: the effect of the change. (effect as a verb meaning “to bring about” is rare: effect a change.) Other pairs: lie / lay, lose / loose, advise / advice. Learn them as mini-sets, not one by one.""",
    [
        "borrow = брати; lend = давати (тимчасово)",
        "rise — без додатка (prices rose); raise — з додатком",
        "affect — дієслово; effect — здебільшого іменник",
        "Українське «позичити» не розрізняє напрямку — будьте уважні",
    ],
    [
        "borrow is taking; lend is giving (temporarily)",
        "rise has no object (prices rose); raise takes an object",
        "affect is a verb; effect is usually a noun",
        "Ukrainian “pozychyty” does not mark direction — be careful",
    ],
    [
        mcq(
            "en-d-borrow-lend-r1",
            "Ви хочете тимчасово взяти зарядку колеги. Що сказати?",
            "You want to take a colleague's charger for a while. What do you say?",
            ["Can I borrow your charger?", "Can I lend your charger?", "Can I borrow you my charger?", "Can I raise your charger in this meaning?"],
            0,
            "Брати собі — borrow.",
            "Taking for yourself is borrow.",
        ),
        fill(
            "en-d-borrow-lend-r2",
            "Вставте rose або raised (ціни виросли самі).",
            "Insert rose or raised (the prices went up by themselves).",
            "Prices ___ last month.",
            ["rose", "Rose"],
        ),
        mcq(
            "en-d-borrow-lend-r3",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["This bug affects login.", "This bug effects login, as the usual verb.", "This bug has a strong affect on login, as the usual noun.", "This bug rise login."],
            0,
            "affect — дієслово «впливати»; effect — іменник.",
            "affect is the verb “influence”; effect is the noun.",
        ),
        translate(
            "en-d-borrow-lend-r4",
            "Перекладіть із lend.",
            "Translate with lend.",
            "Я позичу тобі зарядку.",
            [
                "I'll lend you my charger",
                "I will lend you my charger",
                "I'll lend you the charger",
                "I will lend you the charger",
                "I can lend you my charger",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-borrow-lend",
        "Чим borrow відрізняється від lend? Чим rise відрізняється від raise, а affect — від effect?",
        "How is borrow different from lend? How is rise different from raise, and affect from effect?",
        [
            idea("borrow/lend", "borrow/lend", "borrow", "lend", "charger", "take", "give"),
            idea("rise/raise", "rise/raise", "rose", "raise", "prices", "object", "додаток"),
            idea("affect/effect", "affect/effect", "affect", "effect", "verb", "дієслов", "noun", "іменник"),
        ],
        "Borrow означає брати тимчасово, lend — давати, наприклад Can I borrow your charger і I'll lend you my charger. Rise — підніматися самому: prices rose; raise — піднімати щось. Affect — дієслово «впливати», effect — зазвичай іменник «наслідок».",
        "Borrow means taking temporarily, and lend means giving, for example Can I borrow your charger and I'll lend you my charger. Rise is going up by itself: prices rose; raise is lifting something. Affect is the verb “influence”, and effect is usually the noun “result”.",
    ),
)

U16_L4 = teach(
    "en-d-get-col",
    "Колокації з get",
    "get collocations",
    3,
    "get + прикметник, get + іменник, get to",
    "get + adjective, get + noun, get to",
    """get надзвичайно частотне. get + прикметник = ставати: get ready, get angry, get better, get worse, get tired, get lost, get used to (вже знайоме). get + іменник: get a job, get a ticket, get a message, get permission, get the impression. get to + місце: get to work, get home (без to: get home, get there). get + V3 — пасив/каузатив, уже в уроці causative (get something done; get stolen).

Інші стійкі: get on (with) — ладнати / просуватися; get over — оговтатися; get along with — ладнати; get by — справлятися; get across — донести думку. Не всі треба вчити зараз як фразові наступного блоку — тут саме колокаційний каркас.

Типові помилки: *get to home; *I become ready в повсякденні (become більш формальне; get ready природніше); *get a work замість get a job / get work (незлічуване). get it — «зрозумів»: Yeah, I get it.""",
    """get is extremely frequent. get + adjective means “become”: get ready, get angry, get better, get worse, get tired, get lost, get used to (already familiar). get + noun: get a job, get a ticket, get a message, get permission, get the impression. get to + a place: get to work, get home (no to: get home, get there). get + V3 is a passive/causative, already in the causative lesson (get something done; get stolen).

Other fixed uses: get on (with) — have a good relationship / make progress; get over — recover; get along with — get on; get by — manage; get across — communicate an idea. You do not need to treat all of these as the next phrasal-verb block yet — here the point is the collocation frame.

Typical mistakes: *get to home; *I become ready in everyday speech (become is more formal; get ready is more natural); *get a work instead of get a job / get work (uncountable). get it means “I understand”: Yeah, I get it.""",
    [
        "get ready / better / tired — ставати",
        "get a job / a ticket; get to work; get home без to",
        "get it = зрозумів",
        "Не *get to home і не *get a work",
    ],
    [
        "get ready / better / tired means “become”",
        "get a job / a ticket; get to work; get home with no to",
        "get it means “I understand”",
        "Not *get to home and not *get a work",
    ],
    [
        mcq(
            "en-d-get-col-r1",
            "Оберіть природне.",
            "Choose the natural option.",
            ["Get ready — the meeting starts in five minutes.", "Become ready, as the most everyday choice.", "Get to home now.", "Get a work in this office, with a."],
            0,
            "get ready — повсякденне «приготуйся».",
            "get ready is the everyday “prepare yourself”.",
        ),
        fill(
            "en-d-get-col-r2",
            "Вставте to, якщо потрібно, або home як? Напишіть home (без to).",
            "Type home (no to).",
            "I usually get ___ at seven.",
            ["home", "Home"],
        ),
        mcq(
            "en-d-get-col-r3",
            "Yeah, I get it означає:",
            "Yeah, I get it means:",
            ["Я зрозумів.", "Я отримав посилку.", "Я стаю цим.", "Я добираюсь туди."],
            0,
            "get it — «зрозумів».",
            "get it means “I understand”.",
            ["I understand.", "I received a parcel.", "I am becoming this.", "I am arriving there."],
        ),
        translate(
            "en-d-get-col-r4",
            "Перекладіть із get a job.",
            "Translate with get a job.",
            "Вона хоче знайти роботу в Львові.",
            [
                "She wants to get a job in Lviv",
                "She wants to get a job in Lviv.",
                "She wants to get a job in Lviv, Ukraine",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-get-col",
        "Що означає get + прикметник? Чим get home відрізняється від get to work? Що таке I get it?",
        "What does get + an adjective mean? How is get home different from get to work? What is I get it?",
        [
            idea("get ready", "get ready", "get ready", "better", "tired", "become", "ставати"),
            idea("get home", "get home", "get home", "get to", "work", "to"),
            idea("get it", "get it", "get it", "understand", "зрозумів"),
        ],
        "Get з прикметником означає «ставати», наприклад get ready і get better. Кажемо get home без to, але get to work з to. I get it означає «я зрозумів».",
        "Get plus an adjective means “become”, for example get ready and get better. We say get home without to, but get to work with to. I get it means “I understand”.",
    ),
)

U16_L5 = teach(
    "en-d-false-friends",
    "Фальшиві друзі українською та англійською",
    "False friends in Ukrainian and English",
    3,
    "magazine — не магазин, actual — не актуальний",
    "magazine is not a shop, actual is not “current”",
    """Фальшиві друзі — слова, що виглядають знайомо, а значать інше. magazine — журнал, не магазин (shop, store). actual / actually — справжній / насправді, не «актуальний» (current, topical, relevant). accurate — точний, не «акуратний» (neat, tidy, careful). prospect — перспектива / потенційний клієнт, не проспект (avenue). list — список, не лист (letter). fabric — тканина, не фабрика (factory).

intelligent — розумний, не обов'язково «інтелігентний» (cultured, well-educated у соціальному сенсі). sympathetic — співчутливий, не «симпатичний» (nice, likeable, attractive). eventually — зрештою, не «евентуально / можливо» (possibly). artist — художник / артист у ширшому сенсі, українське «артист» частіше performer. cabinet — шафа / уряд, не кабінет (office). receipt — чек, не рецепт (recipe, або prescription для ліків).

Стратегія: не довіряйте схожості кореня. Перевіряйте приклад у словнику. Ці пари варто тримати як флешкарти.""",
    """False friends look familiar but mean something else. magazine is a periodical, not a shop (shop, store). actual / actually means real / in fact, not “current” (current, topical, relevant). accurate means exact, not “neat” (neat, tidy, careful). prospect is a possibility or a potential client, not an avenue (avenue). list is a series of items, not a letter (letter). fabric is cloth, not a factory (factory).

intelligent means clever, not necessarily “intelligentsia-cultured” (cultured, well-educated in a social sense). sympathetic means compassionate, not “nice-looking” (nice, likeable, attractive). eventually means in the end, not “possibly” (possibly). artist is a painter or artist in a wide sense; Ukrainian “artyst” is often a performer. cabinet is a cupboard or a government, not an office (office). receipt is a till slip, not a recipe (recipe, or a prescription for medicine).

A strategy: do not trust a similar root. Check an example in a dictionary. These pairs are worth keeping as flashcards.""",
    [
        "magazine = журнал; shop = магазин",
        "actual = справжній; current / relevant = актуальний",
        "accurate = точний; eventually = зрештою, не «можливо»",
        "receipt = чек; recipe = рецепт страви",
    ],
    [
        "magazine is a periodical; shop is a store",
        "actual is real; current / relevant is “topical”",
        "accurate is exact; eventually is in the end, not “possibly”",
        "receipt is a till slip; recipe is cooking instructions",
    ],
    [
        mcq(
            "en-d-false-friends-r1",
            "Я хочу купити хліб. Куди йду?",
            "I want to buy bread. Where do I go?",
            ["to the shop / store", "to the magazine", "to the fabric", "to the receipt"],
            0,
            "магазин — shop/store; magazine — журнал.",
            "A shop is shop/store; a magazine is a periodical.",
        ),
        fill(
            "en-d-false-friends-r2",
            "Вставте current або actual («актуальна тема»).",
            "Insert current or actual (“a topical subject”).",
            "This is a ___ topic in our team.",
            ["current", "Current", "relevant", "Relevant", "topical", "Topical"],
        ),
        mcq(
            "en-d-false-friends-r3",
            "eventually означає:",
            "eventually means:",
            ["зрештою / in the end", "можливо / possibly, as the first meaning", "охайно / neatly", "точно / accurately"],
            0,
            "eventually — «зрештою», не «можливо».",
            "eventually is “in the end”, not “possibly”.",
            ["in the end", "possibly, as the first meaning", "neatly", "accurately"],
        ),
        match(
            "en-d-false-friends-r4",
            "Зіставте англійське слово з правильним значенням.",
            "Match each English word with the right meaning.",
            [
                ("magazine", "журнал / a periodical"),
                ("accurate", "точний / exact"),
                ("sympathetic", "співчутливий / compassionate"),
                ("receipt", "чек / a till slip"),
            ],
        ),
    ],
    ex(
        "en-d-false-friends",
        "Наведіть чотири фальшиві друзі (magazine, actual, accurate, eventually або receipt) і правильні українські відповідники «магазин», «актуальний», «акуратний».",
        "Give four false friends (magazine, actual, accurate, eventually or receipt) and the right English for “mahazyn”, “aktualnyi”, “akuratnyi”.",
        [
            idea("magazine/shop", "magazine/shop", "magazine", "shop", "store", "журнал", "магазин"),
            idea("actual/current", "actual/current", "actual", "current", "relevant", "актуальн"),
            idea("eventually/accurate", "eventually/accurate", "eventually", "accurate", "receipt", "recipe", "зрештою", "точн"),
        ],
        "Magazine — це журнал, а магазин — shop. Actual означає справжній, а «актуальний» — current або relevant. Accurate — точний, не акуратний. Eventually — зрештою, не «можливо». Receipt — чек, а рецепт страви — recipe.",
        "A magazine is a periodical, and a shop is a shop. Actual means real, and “topical” is current or relevant. Accurate means exact, not neat. Eventually means in the end, not “possibly”. A receipt is a till slip, and a cooking recipe is a recipe.",
    ),
)

U16_EXAM = exam_lesson(
    "en-deep-collocations-exam",
    "Контрольна: колокації та фальшиві друзі",
    "Exam: collocations and false friends",
    3,
    [
        mcq(
            "en-deep-collocations-exam-q1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["make a decision", "do a decision", "make homework", "do a mistake"],
            0,
            "make a decision.",
            "make a decision.",
        ),
        mcq(
            "en-deep-collocations-exam-q2",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["She told me the news.", "She said me the news.", "She told to me the news.", "She speaks English language."],
            0,
            "told me.",
            "told me.",
        ),
        mcq(
            "en-deep-collocations-exam-q3",
            "Тимчасово взяти зарядку:",
            "Take a charger for a while:",
            ["Can I borrow your charger?", "Can I lend your charger?", "Prices raised by themselves, with raise.", "This bug effects login as the usual verb."],
            0,
            "borrow — брати.",
            "borrow is taking.",
        ),
        mcq(
            "en-deep-collocations-exam-q4",
            "магазин =",
            "a shop =",
            ["shop / store", "magazine", "fabric", "receipt"],
            0,
            "shop/store, не magazine.",
            "shop/store, not magazine.",
        ),
        fill(
            "en-deep-collocations-exam-q5",
            "Вставте do або make (homework).",
            "Insert do or make (homework).",
            "I have to ___ my homework.",
            ["do", "Do"],
        ),
    ],
)

UNIT_16 = unit(
    "en-deep-collocations",
    "Колокації та «фальшиві друзі»",
    "Collocations and false friends",
    [U16_L1, U16_L2, U16_L3, U16_L4, U16_L5, U16_EXAM],
)


U17_L1 = teach(
    "en-d-prefixes",
    "Префікси: заперечення і зміна значення",
    "Prefixes: negation and meaning change",
    3,
    "un-, in-/im-/il-/ir-, dis-, mis-, re-, over-, under-",
    "un-, in-/im-/il-/ir-, dis-, mis-, re-, over-, under-",
    """Заперечні префікси: un- (unhappy, unfair, unexpected, unlock); in- (incorrect, informal, invisible) з варіантами im- перед p, b, m (impossible, impatient), il- перед l (illegal, illogical), ir- перед r (irregular, irresponsible). dis- (disagree, disappear, dishonest). Не всі антоніми утворюються префіксом: *unpossible немає, є impossible; *insecure і unsecure — insecure правильне для «невпевнений / незахищений».

Інші корисні: mis- — неправильно (misunderstand, misspell, mislead); re- — знову (rewrite, rebuild, retry); over- — надмір (overwork, overestimate, overflow); under- — недостатньо (underestimate, underpaid, understaffed); pre- / post- (preheat, preview, postgraduate); co- (co-founder, cooperate). Префікс рідко змінює наголос у цих випадках, але змінює значення різко.

Типові помилки: плутати un- і in- (немає універсального правила, треба словник); *unpossible; написання cooperate / co-operate — обидва трапляються, co-founder часто з дефісом. Для іспитів корисно знати найчастотніші сім'ї.""",
    """Negative prefixes: un- (unhappy, unfair, unexpected, unlock); in- (incorrect, informal, invisible) with variants im- before p, b, m (impossible, impatient), il- before l (illegal, illogical), ir- before r (irregular, irresponsible). dis- (disagree, disappear, dishonest). Not every antonym is formed with a prefix: *unpossible does not exist — it is impossible; insecure is the right form for “not confident / not protected”, not *unsecure.

Other useful ones: mis- means wrongly (misunderstand, misspell, mislead); re- means again (rewrite, rebuild, retry); over- means too much (overwork, overestimate, overflow); under- means too little (underestimate, underpaid, understaffed); pre- / post- (preheat, preview, postgraduate); co- (co-founder, cooperate). A prefix rarely moves the stress in these cases, but it changes the meaning sharply.

Typical mistakes: mixing up un- and in- (there is no universal rule — use a dictionary); *unpossible; spelling cooperate / co-operate — both occur, and co-founder often has a hyphen. For exams it is useful to know the most frequent families.""",
    [
        "un- / dis-; in- з im-/il-/ir- за наступною літерою",
        "mis- неправильно; re- знову; over-/under- надмір / брак",
        "Не *unpossible — impossible",
        "Коли сумніваєтесь — перевірте словник",
    ],
    [
        "un- / dis-; in- with im-/il-/ir- according to the next letter",
        "mis- wrongly; re- again; over-/under- too much / too little",
        "Not *unpossible — impossible",
        "When in doubt, check a dictionary",
    ],
    [
        mcq(
            "en-d-prefixes-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["This is impossible.", "This is unpossible.", "This is inpossible.", "This is dispossible."],
            0,
            "impossible — im- перед p.",
            "impossible — im- before p.",
        ),
        fill(
            "en-d-prefixes-r2",
            "Додайте префікс «неправильно зрозуміти».",
            "Add the prefix for “understand wrongly”.",
            "I think I ___understood the task.",
            ["mis", "Mis"],
        ),
        mcq(
            "en-d-prefixes-r3",
            "underpaid означає:",
            "underpaid means:",
            ["занадто мало платять", "занадто багато платять", "платять знову", "взагалі не платять як єдине значення"],
            0,
            "under- — недостатньо.",
            "under- means too little.",
            ["paid too little", "paid too much", "paid again", "not paid at all, as the only meaning"],
        ),
        match(
            "en-d-prefixes-r4",
            "Зіставте префікс із значенням.",
            "Match each prefix with its meaning.",
            [
                ("re-", "знову / again"),
                ("mis-", "неправильно / wrongly"),
                ("over-", "надмір / too much"),
                ("pre-", "перед / before"),
            ],
        ),
    ],
    ex(
        "en-d-prefixes",
        "Назвіть заперечні префікси і правило im-/il-/ir-. Що означають mis-, re-, over- і under-? Чому немає *unpossible?",
        "Name the negative prefixes and the im-/il-/ir- rule. What do mis-, re-, over- and under- mean? Why is there no *unpossible?",
        [
            idea("in/im/il/ir", "in/im/il/ir", "impossible", "illegal", "irregular", "in-"),
            idea("mis/re/over", "mis/re/over", "mis", "re", "over", "under", "wrongly", "again"),
            idea("unpossible", "unpossible", "unpossible", "impossible", "словник", "dictionary"),
        ],
        "Заперечні префікси — un-, in- з варіантами im-, il-, ir- за наступною літерою, і dis-. Mis- означає неправильно, re- — знову, over- — надмір, under- — брак. *Unpossible немає, правильне слово — impossible; префікс треба перевіряти в словнику.",
        "The negative prefixes are un-, in- with the variants im-, il- and ir- according to the next letter, and dis-. Mis- means wrongly, re- means again, over- means too much, and under- means too little. *Unpossible does not exist; the right word is impossible, and you should check the prefix in a dictionary.",
    ),
)

U17_L2 = teach(
    "en-d-suffix-noun",
    "Суфікси іменників",
    "Noun suffixes",
    3,
    "-tion, -ment, -ness, -ity, -er/-or, -ist",
    "-tion, -ment, -ness, -ity, -er/-or, -ist",
    """Часті іменникові суфікси: -tion / -sion (information, decision, discussion — часто від дієслів); -ment (development, agreement, improvement); -ness від прикметників (happiness, kindness, awareness); -ity / -ty (possibility, responsibility, safety); -ance / -ence (performance, difference, independence). Люди: -er / -or (developer, actor, visitor), -ist (scientist, specialist, journalist), -ian (musician, technician), -ee (employee, interviewee — той, на кого спрямована дія).

Правопис змінюється: decide → decision (не *decidation); responsible → responsibility (з -ility); happy → happiness (y→i). Наголос часто падає на склад перед -tion / -ity: informá-tion, possi-bí-lity (тобто на наголошений склад родини).

Типові помилки: *informations у значенні «відомості» (information незлічуване); *advices; плутати employee і employer; *developement (одне e: development). Для іспитів (FCE word formation) треба бачити частину мови в пропуску.""",
    """Frequent noun suffixes: -tion / -sion (information, decision, discussion — often from verbs); -ment (development, agreement, improvement); -ness from adjectives (happiness, kindness, awareness); -ity / -ty (possibility, responsibility, safety); -ance / -ence (performance, difference, independence). People: -er / -or (developer, actor, visitor), -ist (scientist, specialist, journalist), -ian (musician, technician), -ee (employee, interviewee — the person who receives the action).

Spelling changes: decide → decision (not *decidation); responsible → responsibility (with -ility); happy → happiness (y→i). Stress often falls on the syllable before -tion / -ity: inforMAtion, possiBIlity.

Typical mistakes: *informations in the sense of “facts” (information is uncountable); *advices; mixing up employee and employer; *developement (one e: development). For exams (FCE word formation) you have to see the part of speech in the gap.""",
    [
        "-tion/-sion, -ment, -ness, -ity, -ance/-ence",
        "Люди: -er/-or, -ist, -ian, -ee (employee ≠ employer)",
        "information — незлічуване; development без зайвого e",
        "Дивіться частину мови в пропуску",
    ],
    [
        "-tion/-sion, -ment, -ness, -ity, -ance/-ence",
        "People: -er/-or, -ist, -ian, -ee (employee is not employer)",
        "information is uncountable; development has no extra e",
        "Look at the part of speech in the gap",
    ],
    [
        mcq(
            "en-d-suffix-noun-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["The team reached an agreement.", "The team reached an agree.", "We have many informations.", "The developement took a year, with extra e."],
            0,
            "agreement — іменник на -ment.",
            "agreement is the -ment noun.",
        ),
        fill(
            "en-d-suffix-noun-r2",
            "Утворіть іменник від possible.",
            "Form the noun from possible.",
            "Is there a ___ of a delay? (possibility)",
            ["possibility", "Possibility"],
        ),
        mcq(
            "en-d-suffix-noun-r3",
            "Той, кого найняли:",
            "The person who was hired:",
            ["employee", "employer", "employist", "employment as a person"],
            0,
            "-ee — той, на кого спрямована дія.",
            "-ee is the person who receives the action.",
        ),
        translate(
            "en-d-suffix-noun-r4",
            "Перекладіть, утворивши іменник від decide.",
            "Translate, forming the noun from decide.",
            "Ми прийняли рішення.",
            [
                "We made a decision",
                "We made a decision.",
                "We took a decision",
                "We have made a decision",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-suffix-noun",
        "Назвіть чотири іменникові суфікси і приклад. Чим employee відрізняється від employer? Чому *informations помилка?",
        "Name four noun suffixes and an example. How is employee different from employer? Why is *informations wrong?",
        [
            idea("tion/ment/ness", "tion/ment/ness", "tion", "ment", "ness", "ity", "decision", "agreement"),
            idea("employee", "employee", "employee", "employer", "-ee"),
            idea("information", "information", "information", "informations", "uncountable", "незлічув"),
        ],
        "Часті суфікси — -tion, -ment, -ness і -ity, наприклад decision і agreement. Employee — той, кого найняли, employer — той, хто наймає. Information незлічуване, тому *informations у значенні «відомості» — помилка.",
        "Frequent suffixes are -tion, -ment, -ness and -ity, for example decision and agreement. An employee is the person who was hired, and an employer is the one who hires. Information is uncountable, so *informations in the sense of “facts” is wrong.",
    ),
)

U17_L3 = teach(
    "en-d-suffix-adj",
    "Суфікси прикметників і прислівників",
    "Adjective and adverb suffixes",
    3,
    "-ful, -less, -ous, -ive, -able, -al, -ly",
    "-ful, -less, -ous, -ive, -able, -al, -ly",
    """Прикметники: -ful (корисний / повний якості: useful, careful, successful — одна l); -less (без: useless, careless, hopeless); -ous (dangerous, famous, ambitious); -ive (effective, creative, expensive); -able / -ible (reliable, flexible, responsible, possible); -al (practical, professional, personal); -ic (economic, scientific — див. наступний урок про economic / economical); -y (healthy, sunny).

Прислівники часто -ly: carefully, successfully, practically. Але daily, early, friendly — можуть бути прикметниками; hardly ≠ hard (hardly — «майже не», hard — «важко / старанно»). late / lately: lately — «останнім часом». high / highly: highly — «високою мірою» (highly recommended).

Типові помилки: *usefull (дві l); *beautifull; *interesting-ly від already -ing без потреби; дружній — friendly (прикметник), «по-дружньому» часто in a friendly way, бо *friendlily рідкісне. successful → successfully.""",
    """Adjectives: -ful (full of a quality: useful, careful, successful — one l); -less (without: useless, careless, hopeless); -ous (dangerous, famous, ambitious); -ive (effective, creative, expensive); -able / -ible (reliable, flexible, responsible, possible); -al (practical, professional, personal); -ic (economic, scientific — see the next lesson on economic / economical); -y (healthy, sunny).

Adverbs often take -ly: carefully, successfully, practically. But daily, early, friendly can be adjectives; hardly is not hard (hardly means “almost not”, hard means “with effort / difficult”). late / lately: lately means “recently”. high / highly: highly means “to a high degree” (highly recommended).

Typical mistakes: *usefull (two l's); *beautifull; adding -ly when it is not needed; friendly is an adjective, and “in a friendly way” is often better than the rare *friendlily. successful → successfully.""",
    [
        "-ful (одна l) і -less — протилежності",
        "-ous, -ive, -able/-ible, -al, -ic, -y",
        "hardly ≠ hard; lately = останнім часом",
        "Не *usefull",
    ],
    [
        "-ful (one l) and -less are opposites",
        "-ous, -ive, -able/-ible, -al, -ic, -y",
        "hardly is not hard; lately means recently",
        "Not *usefull",
    ],
    [
        mcq(
            "en-d-suffix-adj-r1",
            "Оберіть правильне написання.",
            "Choose the correct spelling.",
            ["useful", "usefull", "usful", "use-full"],
            0,
            "-ful з однією l.",
            "-ful has one l.",
        ),
        fill(
            "en-d-suffix-adj-r2",
            "Утворіть прислівник від careful.",
            "Form the adverb from careful.",
            "Read the contract ___.",
            ["carefully", "Carefully"],
        ),
        mcq(
            "en-d-suffix-adj-r3",
            "I hardly slept означає:",
            "I hardly slept means:",
            ["Я майже не спав.", "Я спав важко / старанно.", "Я спав пізно.", "Я спав високо."],
            0,
            "hardly — «майже не», не hard.",
            "hardly means “almost not”, not hard.",
            ["I almost didn't sleep.", "I slept with great effort.", "I slept late.", "I slept high."],
        ),
        match(
            "en-d-suffix-adj-r4",
            "Зіставте форму зі значенням.",
            "Match each form with its meaning.",
            [
                ("careful", "обережний / cautious"),
                ("careless", "необережний / not careful"),
                ("hardly", "майже не / almost not"),
                ("lately", "останнім часом / recently"),
            ],
        ),
    ],
    ex(
        "en-d-suffix-adj",
        "Назвіть кілька прикметникових суфіксів. Чим hardly відрізняється від hard, а lately — від late? Як пишеться useful?",
        "Name several adjective suffixes. How is hardly different from hard, and lately from late? How is useful spelled?",
        [
            idea("-ful/-less", "-ful/-less", "useful", "careful", "careless", "-ful", "-less"),
            idea("hardly", "hardly", "hardly", "hard", "майже", "almost"),
            idea("lately", "lately", "lately", "late", "recently", "останнім"),
        ],
        "Часті суфікси — -ful, -less, -ous, -ive і -able, наприклад useful і careless. Hardly означає «майже не», а hard — «важко» або «старанно». Lately — «останнім часом». Useful пишеться з однією l.",
        "Frequent suffixes are -ful, -less, -ous, -ive and -able, for example useful and careless. Hardly means “almost not”, and hard means “with effort” or “difficult”. Lately means “recently”. Useful is spelled with one l.",
    ),
)

U17_L4 = teach(
    "en-d-word-families",
    "Словотвірні сім'ї та economic / economical",
    "Word families and economic / economical",
    3,
    "succeed — success — successful — successfully",
    "succeed — success — successful — successfully",
    """Словотвірна сім'я — один корінь у різних частинах мови. succeed (дієслово) — success (іменник) — successful (прикметник) — successfully (прислівник). decide — decision — decisive. differ — difference — different — differently. employ — employer / employee — employment — unemployed. Для FCE Use of English 3 треба з одного слова утворити потрібну форму.

Тонкі пари: economic — пов'язаний з економікою (economic growth, economic policy); economical — ощадливий (an economical car). historic — історично важливий (a historic day); historical — історичний як галузь (historical novel). classic / classical; politic (рідко як прикм.) / political / politics. sensitive (чутливий) / sensible (розсудливий) — уже близькі до фальшивих друзів за значенням, хоч і не з українською.

Типові помилки: *a very economic car замість economical; *successfull; *they success (потрібен дієслово succeed). Тренуйте повний ланцюжок, не лише іменник.""",
    """A word family is one root in different parts of speech. succeed (verb) — success (noun) — successful (adjective) — successfully (adverb). decide — decision — decisive. differ — difference — different — differently. employ — employer / employee — employment — unemployed. For FCE Use of English 3 you have to form the right part of speech from one given word.

Subtle pairs: economic means related to the economy (economic growth, economic policy); economical means thrifty (an economical car). historic means historically important (a historic day); historical means about history as a field (a historical novel). classic / classical; politic (rare as an adjective) / political / politics. sensitive (easily affected) / sensible (reasonable) are close to false friends in meaning, though not with Ukrainian.

Typical mistakes: *a very economic car instead of economical; *successfull; *they success (you need the verb succeed). Practise the whole chain, not just the noun.""",
    [
        "succeed — success — successful — successfully",
        "economic = економіки; economical = ощадливий",
        "historic = важливий в історії; historical = про історію",
        "sensitive ≠ sensible",
    ],
    [
        "succeed — success — successful — successfully",
        "economic is about the economy; economical is thrifty",
        "historic is important in history; historical is about history",
        "sensitive is not sensible",
    ],
    [
        mcq(
            "en-d-word-families-r1",
            "Оберіть правильне про машину, що мало витрачає пальне.",
            "Choose the correct option for a car that uses little fuel.",
            ["an economical car", "an economic car", "a historic car in this meaning", "a success car"],
            0,
            "economical — ощадливий.",
            "economical means thrifty.",
        ),
        fill(
            "en-d-word-families-r2",
            "Утворіть дієслово від success.",
            "Form the verb from success.",
            "I hope we will ___.",
            ["succeed", "Succeed"],
        ),
        mcq(
            "en-d-word-families-r3",
            "sensible означає:",
            "sensible means:",
            ["розсудливий / reasonable", "чутливий / easily affected, as the first meaning", "економічний як політика", "успішний"],
            0,
            "sensible — розсудливий; sensitive — чутливий.",
            "sensible is reasonable; sensitive is easily affected.",
            ["reasonable", "easily affected, as the first meaning", "about economic policy", "successful"],
        ),
        translate(
            "en-d-word-families-r4",
            "Перекладіть, використавши successful.",
            "Translate, using successful.",
            "Це був успішний запуск.",
            [
                "It was a successful launch",
                "It was a successful launch.",
                "That was a successful launch",
                "This was a successful launch",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-word-families",
        "Наведіть сім'ю succeed. Чим economic відрізняється від economical, а sensitive — від sensible?",
        "Give the succeed family. How is economic different from economical, and sensitive from sensible?",
        [
            idea("succeed family", "succeed family", "succeed", "success", "successful", "successfully"),
            idea("economic", "economic", "economic", "economical", "thrifty", "ощадлив", "economy"),
            idea("sensible", "sensible", "sensible", "sensitive", "reasonable", "розсудлив"),
        ],
        "Сім'я: succeed, success, successful і successfully. Economic стосується економіки, economical — ощадливий, наприклад an economical car. Sensible означає розсудливий, а sensitive — чутливий.",
        "The family is succeed, success, successful and successfully. Economic is about the economy, and economical means thrifty, for example an economical car. Sensible means reasonable, and sensitive means easily affected.",
    ),
)

U17_L5 = teach(
    "en-d-compounds",
    "Складні слова: іменники та прикметники",
    "Compounds: nouns and adjectives",
    3,
    "database, well-known, a ten-minute break",
    "database, well-known, a ten-minute break",
    """Складні іменники можуть писатися разом (database, website, software, keyboard), через дефіс (check-in, sister-in-law) або окремо (credit card, user interface, coffee shop). Правило не завжди логічне — перевіряйте словник; тренд сучасний — частіше разом або окремо, ніж дефіс. Наголос у складному іменнику зазвичай на першому елементі: a CREdit card, a WEBsite.

Складні прикметники перед іменником часто з дефісом: a well-known library, a well-written email, a full-time job, a user-friendly API, a ten-minute break, a two-year-old project. Після дієслова дефіс інколи зникає: The library is well known. У вимірах: a ten-minute break (не *a ten minutes break; однина + дефіс).

Типові помилки: *a ten minutes break; *wellknown разом як прикметник перед іменником без дефіса; плутати наголос (не credit CARD як складний іменник). У технічній англійській багато складних іменників: pull request, merge conflict, fallback, workaround.""",
    """Compound nouns may be written as one word (database, website, software, keyboard), hyphenated (check-in, sister-in-law) or as two words (credit card, user interface, coffee shop). The rule is not always logical — check a dictionary; the modern trend is more often one word or two words than a hyphen. Stress in a compound noun is usually on the first element: a CREdit card, a WEBsite.

Compound adjectives before a noun often take a hyphen: a well-known library, a well-written email, a full-time job, a user-friendly API, a ten-minute break, a two-year-old project. After a verb the hyphen sometimes disappears: The library is well known. With measurements: a ten-minute break (not *a ten minutes break; singular + hyphen).

Typical mistakes: *a ten minutes break; *wellknown as one word when it is an adjective before a noun; putting the stress on the wrong part (not credit CARD as a compound noun). Technical English has many compound nouns: pull request, merge conflict, fallback, workaround.""",
    [
        "Разом, через дефіс або окремо — перевіряйте словник",
        "Наголос складного іменника — на першому елементі",
        "a ten-minute break, не *a ten minutes break",
        "well-known перед іменником — з дефісом",
    ],
    [
        "One word, hyphen, or two words — check a dictionary",
        "Stress in a compound noun falls on the first element",
        "a ten-minute break, not *a ten minutes break",
        "well-known before a noun takes a hyphen",
    ],
    [
        mcq(
            "en-d-compounds-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["Let's take a ten-minute break.", "Let's take a ten minutes break.", "Let's take a ten-minutes break.", "Let's take ten-minute a break."],
            0,
            "вимір як прикметник: ten-minute + іменник.",
            "a measurement as an adjective: ten-minute + noun.",
        ),
        fill(
            "en-d-compounds-r2",
            "Вставте дефіс у звичному місці: well known перед library. Напишіть well-known.",
            "Type well-known.",
            "This is a ___ library.",
            ["well-known", "Well-known"],
        ),
        mcq(
            "en-d-compounds-r3",
            "У складному іменнику credit card наголос зазвичай на:",
            "In the compound noun credit card the stress is usually on:",
            ["credit", "card", "однаково на обох як єдине правило", "артикулі"],
            0,
            "На першому елементі: CREdit card.",
            "On the first element: CREdit card.",
            ["credit", "card", "equally on both, as a strict rule", "the article"],
        ),
        translate(
            "en-d-compounds-r4",
            "Перекладіть із full-time.",
            "Translate with full-time.",
            "Вона шукає роботу на повний день.",
            [
                "She is looking for a full-time job",
                "She's looking for a full-time job",
                "She is looking for a full-time job.",
                "She's looking for a full-time job.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-compounds",
        "Як пишуться складні іменники? Де наголос? Як правильно сказати про перерву на десять хвилин? Коли well-known має дефіс?",
        "How are compound nouns written? Where is the stress? How do you say a break of ten minutes? When does well-known take a hyphen?",
        [
            idea("spelling", "spelling", "database", "credit card", "check-in", "словник", "dictionary"),
            idea("stress", "stress", "credit", "first", "перш", "CREdit"),
            idea("ten-minute", "ten-minute", "ten-minute", "hyphen", "дефіс", "well-known"),
        ],
        "Складні іменники пишуться разом, через дефіс або окремо, і це треба перевіряти в словнику. Наголос зазвичай на першому елементі, наприклад CREdit card. Кажемо a ten-minute break, не ten minutes break. Well-known має дефіс перед іменником.",
        "Compound nouns are written as one word, with a hyphen, or as two words, and you should check a dictionary. Stress is usually on the first element, for example CREdit card. We say a ten-minute break, not a ten minutes break. Well-known takes a hyphen before a noun.",
    ),
)

U17_EXAM = exam_lesson(
    "en-deep-word-formation-exam",
    "Контрольна: словотвір",
    "Exam: word formation",
    3,
    [
        mcq(
            "en-deep-word-formation-exam-q1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["This is impossible.", "This is unpossible.", "This is usefull.", "We have many informations."],
            0,
            "impossible.",
            "impossible.",
        ),
        mcq(
            "en-deep-word-formation-exam-q2",
            "Той, кого найняли:",
            "The person who was hired:",
            ["employee", "employer", "an economical person in this meaning only", "success as a verb"],
            0,
            "employee.",
            "employee.",
        ),
        mcq(
            "en-deep-word-formation-exam-q3",
            "Машина, що мало витрачає пальне:",
            "A car that uses little fuel:",
            ["an economical car", "an economic car", "a ten minutes break as a parallel", "hardly as “with effort”"],
            0,
            "economical — ощадливий.",
            "economical is thrifty.",
        ),
        mcq(
            "en-deep-word-formation-exam-q4",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["a ten-minute break", "a ten minutes break", "a ten-minutes break", "usefull advice"],
            0,
            "ten-minute як прикметник.",
            "ten-minute as an adjective.",
        ),
        fill(
            "en-deep-word-formation-exam-q5",
            "Утворіть іменник від possible.",
            "Form the noun from possible.",
            "Is there a ___?",
            ["possibility", "Possibility"],
        ),
    ],
)

UNIT_17 = unit(
    "en-deep-word-formation",
    "Словотвір",
    "Word formation",
    [U17_L1, U17_L2, U17_L3, U17_L4, U17_L5, U17_EXAM],
)

U18_L1 = teach(
    "en-d-phrasal-form",
    "Фразові дієслова: форма і відокремлюваність",
    "Phrasal verbs: form and separability",
    3,
    "turn off the light / turn the light off; look after the cat",
    "turn off the light / turn the light off; look after the cat",
    """Фразове дієслово — дієслово + частка (прислівник або прийменник), значення якого часто не сума частин: give up — здатися, не «дати вгору». Типи: неперехідні без додатка (the plane took off; she grew up); перехідні відокремлювані (turn off the light / turn the light off; якщо додаток — займенник, частка після нього: turn it off, не *turn off it); перехідні невідокремлювані, зазвичай з прийменником (look after the cat, не *look the cat after; look after it).

Тричастинні: look forward to, get on with, run out of — невідокремлювані, після to / with / of іде іменник або -ing: I look forward to meeting you (не *to meet у цій конструкції — to тут прийменник). Реєстр: у розмові фразові дуже природні; у формальному письмі інколи краще однослівний відповідник (postpone замість put off, cancel — call off, investigate — look into).

Типові помилки: *turn off it; *look the children after; *look forward to meet; дослівний переклад кожної частки. Вчіть фразове з прикладом і типом (відокремлюване чи ні).""",
    """A phrasal verb is a verb plus a particle (an adverb or a preposition) whose meaning is often not the sum of the parts: give up means quit, not “give upwards”. Types: intransitive, with no object (the plane took off; she grew up); transitive separable (turn off the light / turn the light off; if the object is a pronoun, the particle follows it: turn it off, not *turn off it); transitive inseparable, usually with a preposition (look after the cat, not *look the cat after; look after it).

Three-part verbs: look forward to, get on with, run out of — inseparable, and after to / with / of you use a noun or -ing: I look forward to meeting you (not *to meet in this structure — to is a preposition here). Register: in speech phrasal verbs are very natural; in formal writing a one-word equivalent is sometimes better (postpone for put off, cancel for call off, investigate for look into).

Typical mistakes: *turn off it; *look the children after; *look forward to meet; translating each particle literally. Learn each phrasal verb with an example and its type (separable or not).""",
    [
        "Значення часто не сума частин: give up",
        "Відокремлювані: turn it off, не *turn off it",
        "Невідокремлювані: look after the cat",
        "look forward to + -ing (to — прийменник)",
    ],
    [
        "The meaning is often not the sum of the parts: give up",
        "Separable: turn it off, not *turn off it",
        "Inseparable: look after the cat",
        "look forward to + -ing (to is a preposition)",
    ],
    [
        mcq(
            "en-d-phrasal-form-r1",
            "Оберіть правильне з займенником.",
            "Choose the correct option with a pronoun.",
            ["Turn it off.", "Turn off it.", "Look the cat after.", "Look forward to meet you, with the verb meet."],
            0,
            "У відокремлюваних займенник стоїть перед часткою.",
            "In separable verbs the pronoun comes before the particle.",
        ),
        fill(
            "en-d-phrasal-form-r2",
            "Закінчіть: I look forward to ___ you (meet як -ing).",
            "Finish: I look forward to ___ you (meet as -ing).",
            "I look forward to ___ you.",
            ["meeting", "Meeting"],
        ),
        mcq(
            "en-d-phrasal-form-r3",
            "look after the cat — можна сказати *look the cat after?",
            "look after the cat — can you say *look the cat after?",
            ["Ні, це невідокремлюване.", "Так, завжди.", "Лише з займенником у такому порядку.", "Лише в формальному стилі."],
            0,
            "look after невідокремлюване.",
            "look after is inseparable.",
            ["No, it is inseparable.", "Yes, always.", "Only with a pronoun in that order.", "Only in formal style."],
        ),
        translate(
            "en-d-phrasal-form-r4",
            "Перекладіть із give up.",
            "Translate with give up.",
            "Не здавайся.",
            [
                "Don't give up",
                "Don't give up.",
                "Do not give up",
                "Do not give up.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-phrasal-form",
        "Чим відокремлюване фразове відрізняється від невідокремлюваного? Де стоїть займенник? Чому look forward to meeting, а не to meet?",
        "How is a separable phrasal verb different from an inseparable one? Where does a pronoun go? Why look forward to meeting, not to meet?",
        [
            idea("separable", "separable", "turn it off", "turn off", "pronoun", "займенник"),
            idea("look after", "look after", "look after", "inseparable", "невідокрем"),
            idea("look forward", "look forward", "look forward to", "meeting", "preposition", "прийменник"),
        ],
        "У відокремлюваних можна сказати turn off the light або turn the light off, а з займенником лише turn it off. Look after невідокремлюване: look after the cat. У look forward to прийменник to, тому далі -ing: look forward to meeting you.",
        "With separable verbs you can say turn off the light or turn the light off, and with a pronoun only turn it off. Look after is inseparable: look after the cat. In look forward to, to is a preposition, so you continue with -ing: look forward to meeting you.",
    ),
)

U18_L2 = teach(
    "en-d-phrasal-life",
    "Фразові дієслова повсякдення",
    "Everyday phrasal verbs",
    3,
    "wake up, grow up, look after, pick up, come back",
    "wake up, grow up, look after, pick up, come back",
    """Побут: wake up — прокинутися; get up — встати з ліжка (можна прокинутися і ще полежати). go out — вийти / піти розважатися; come back / get back — повернутися; come in — увійти; sit down / stand up. grow up — вирости (про людину); bring up a child — виховувати. look after / take care of — доглядати. pick up — підняти / заїхати за кимось / набрати (мову, звичку); drop off — висадити / залишити.

Інші часті: find out — дізнатися; figure out / work out — зрозуміти, розв'язати; put on / take off — одягнути / зняти одяг (take off також «злетіти»); hang out — проводити час; show up — з'явитися; look for — шукати (невідокремлюване); look up — шукати в довіднику (відокремлюване: look it up).

Типові помилки: *I grown up in Kyiv (потрібен Past Simple grew up); *look the word (потрібен look up the word / look the word up); плутати get up і wake up; pick up «заїхати» потребує контексту. Складіть свій день із 8–10 цих фразових.""",
    """Everyday life: wake up is becoming awake; get up is leaving the bed (you can wake up and stay in bed). go out is leaving the house / going out socially; come back / get back is returning; come in is entering; sit down / stand up. grow up is becoming an adult; bring up a child is raising one. look after / take care of is caring for someone. pick up is lifting / collecting someone / acquiring (a language, a habit); drop off is letting someone out / leaving something.

Other frequent ones: find out is discovering a fact; figure out / work out is solving or understanding; put on / take off is dressing / undressing (take off is also “leave the ground” for a plane); hang out is spending time; show up is appearing; look for is seeking (inseparable); look up is checking in a reference (separable: look it up).

Typical mistakes: *I grown up in Kyiv (you need Past Simple grew up); *look the word (you need look up the word / look the word up); mixing up get up and wake up; pick up in the “collect someone” sense needs context. Build your own day with eight to ten of these phrasal verbs.""",
    [
        "wake up ≠ get up",
        "grow up / bring up; look after; pick up / drop off",
        "find out, look for, look it up",
        "grew up, не *grown up як Past Simple",
    ],
    [
        "wake up is not get up",
        "grow up / bring up; look after; pick up / drop off",
        "find out, look for, look it up",
        "grew up, not *grown up as Past Simple",
    ],
    [
        mcq(
            "en-d-phrasal-life-r1",
            "Оберіть правильне про дитинство.",
            "Choose the correct option about childhood.",
            ["I grew up in Kyiv.", "I grown up in Kyiv.", "I growed up in Kyiv.", "I looked the word in the dictionary, with no up."],
            0,
            "Past Simple grow — grew up.",
            "The Past Simple of grow is grew up.",
        ),
        fill(
            "en-d-phrasal-life-r2",
            "Вставте частку (шукати слово в словнику, займенник it).",
            "Insert the particle (looking a word up, pronoun it).",
            "I don't know this word — I'll look it ___.",
            ["up", "Up"],
        ),
        mcq(
            "en-d-phrasal-life-r3",
            "Заїхати за дитиною зі школи — природно:",
            "Collecting a child from school is naturally:",
            ["pick her up", "drop her up", "wake her off", "grow her up in this meaning"],
            0,
            "pick up — заїхати за кимось.",
            "pick up is collecting someone.",
        ),
        translate(
            "en-d-phrasal-life-r4",
            "Перекладіть із look after.",
            "Translate with look after.",
            "Хто догляне кота?",
            [
                "Who will look after the cat?",
                "Who'll look after the cat?",
                "Who is going to look after the cat?",
                "Who will look after the cat",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-phrasal-life",
        "Чим wake up відрізняється від get up? Що означають grow up, look after, pick up і look it up?",
        "How is wake up different from get up? What do grow up, look after, pick up and look it up mean?",
        [
            idea("wake/get up", "wake/get up", "wake up", "get up"),
            idea("grow/look after", "grow/look after", "grew up", "look after", "bring up"),
            idea("pick up / look up", "pick up / look up", "pick up", "look it up", "find out"),
        ],
        "Wake up означає прокинутися, get up — встати з ліжка. Grow up — вирости, look after — доглядати. Pick up може означати заїхати за кимось, а look it up — пошукати в довіднику.",
        "Wake up means becoming awake, and get up means leaving the bed. Grow up means becoming an adult, and look after means caring for someone. Pick up can mean collecting someone, and look it up means checking a reference.",
    ),
)

U18_L3 = teach(
    "en-d-phrasal-work",
    "Фразові дієслова роботи",
    "Work phrasal verbs",
    3,
    "put off, call off, set up, carry out, hand in",
    "put off, call off, set up, carry out, hand in",
    """На роботі й у навчанні: put off — відкласти (postpone); call off — скасувати (cancel); set up — заснувати / налаштувати; carry out — виконати (дослідження, план); hand in — здати роботу; fill in / fill out (AmE) — заповнити форму; take on — взяти на себе (обов'язок) / найняти; take over — перейняти (посаду, компанію); go on / keep on — продовжувати; shut down — вимкнути / закрити; roll out — випустити (фічу).

follow up — перевірити продовження; sign off — затвердити / завершити; step down — піти з посади; lay off — скоротити штат. У формальному листі можна замінити: We postponed the meeting (замість put off); The event was cancelled (call off). У мовленні стендапу put off і call off звучать природно.

Типові помилки: плутати put off і call off (відкласти ≠ скасувати); *hand in it краще hand it in; *fill the form без in/out. I'll get back to you — «я повернуся з відповіддю», це вже комунікація наступного уроку, але часто живе в роботі.""",
    """At work and in study: put off is postponing; call off is cancelling; set up is founding / configuring; carry out is performing (research, a plan); hand in is submitting work; fill in / fill out (AmE) is completing a form; take on is accepting (a duty) / hiring; take over is assuming (a role, a company); go on / keep on is continuing; shut down is switching off / closing; roll out is releasing (a feature).

follow up is checking what happens next; sign off is approving / finishing; step down is leaving a post; lay off is making staff redundant. In a formal email you can replace them: We postponed the meeting (for put off); The event was cancelled (for call off). In stand-up speech put off and call off sound natural.

Typical mistakes: mixing up put off and call off (postpone is not cancel); *hand in it is better as hand it in; *fill the form with no in/out. I'll get back to you means “I will reply later” — that belongs more to the next lesson, but it lives at work too.""",
    [
        "put off = відкласти; call off = скасувати",
        "set up, carry out, hand it in, fill in a form",
        "take on / take over; roll out a feature",
        "У формальному стилі — postpone, cancel, submit",
    ],
    [
        "put off is postpone; call off is cancel",
        "set up, carry out, hand it in, fill in a form",
        "take on / take over; roll out a feature",
        "In formal style use postpone, cancel, submit",
    ],
    [
        mcq(
            "en-d-phrasal-work-r1",
            "Зустріч перенесли на п'ятницю. Це:",
            "The meeting was moved to Friday. That is:",
            ["They put it off until Friday.", "They called it off until Friday.", "They handed it off until Friday, in this meaning.", "They filled it off until Friday."],
            0,
            "put off — відкласти; call off — скасувати.",
            "put off is postponing; call off is cancelling.",
        ),
        fill(
            "en-d-phrasal-work-r2",
            "Вставте частку (здати домашнє, займенник it).",
            "Insert the particle (submit homework, pronoun it).",
            "Please hand it ___ by Friday.",
            ["in", "In"],
        ),
        mcq(
            "en-d-phrasal-work-r3",
            "Випустити нову фічу — природно:",
            "Releasing a new feature is naturally:",
            ["roll out a feature", "call off a feature in this meaning", "put off a feature as “release”", "lay off a feature"],
            0,
            "roll out — випустити.",
            "roll out is releasing.",
        ),
        translate(
            "en-d-phrasal-work-r4",
            "Перекладіть із call off.",
            "Translate with call off.",
            "Довелося скасувати зустріч.",
            [
                "We had to call off the meeting",
                "We had to call the meeting off",
                "We had to call off the meeting.",
                "They had to call off the meeting",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-phrasal-work",
        "Чим put off відрізняється від call off? Що означають set up, carry out, hand in і roll out? Які формальні відповідники?",
        "How is put off different from call off? What do set up, carry out, hand in and roll out mean? What are the formal equivalents?",
        [
            idea("put/call off", "put/call off", "put off", "call off", "postpone", "cancel"),
            idea("hand in", "hand in", "hand it in", "fill in", "set up", "carry out"),
            idea("roll out", "roll out", "roll out", "take over", "formal", "submit"),
        ],
        "Put off означає відкласти, call off — скасувати. Set up — заснувати або налаштувати, carry out — виконати, hand in — здати, roll out — випустити фічу. У формальному стилі можна сказати postpone, cancel і submit.",
        "Put off means postponing, and call off means cancelling. Set up is founding or configuring, carry out is performing, hand in is submitting, and roll out is releasing a feature. In formal style you can say postpone, cancel and submit.",
    ),
)

U18_L4 = teach(
    "en-d-phrasal-talk",
    "Фразові дієслова спілкування",
    "Communication phrasal verbs",
    3,
    "point out, bring up, come up with, get back to, hang up",
    "point out, bring up, come up with, get back to, hang up",
    """Спілкування: point out — вказати на факт; bring up — підняти тему (також «виховати дитину»); come up with — вигадати (ідею); get across — донести думку; talk over / talk through — обговорити; speak up — говорити гучніше / висловитися; sum up — підсумувати. По телефону: hang up — покласти трубку; call back — передзвонити; get back to someone — відповісти пізніше; fill someone in — ввести в курс; catch up — надолужити новини (Let's catch up).

come up — виникнути (A problem came up); bring it up at the meeting — підніміть це. cut off — роз'єднало (We got cut off). hold on — зачекайте на лінії.

Типові помилки: *come up with it up; *point it (потрібен point it out); *I'll get back you (потрібен to); плутати bring up «тему» і bring up «дитину» — контекст рятує. У листі: Just to follow up / Just to point out, що already трохи формальніше.""",
    """Communication: point out is indicating a fact; bring up is raising a topic (and also “raising a child”); come up with is inventing (an idea); get across is making a point understood; talk over / talk through is discussing; speak up is talking louder / saying your view; sum up is summarising. On the phone: hang up is ending the call; call back is returning a call; get back to someone is replying later; fill someone in is briefing them; catch up is exchanging news (Let's catch up).

come up is arising (A problem came up); bring it up at the meeting is raising it. cut off is being disconnected (We got cut off). hold on is waiting on the line.

Typical mistakes: *come up with it up; *point it (you need point it out); *I'll get back you (you need to); mixing up bring up “a topic” and bring up “a child” — context helps. In email: Just to follow up / Just to point out, which is already a little more formal.""",
    [
        "point out, bring up a topic, come up with an idea",
        "get back to you; fill someone in; catch up",
        "hang up, call back, hold on, get cut off",
        "Не *get back you — потрібен to",
    ],
    [
        "point out, bring up a topic, come up with an idea",
        "get back to you; fill someone in; catch up",
        "hang up, call back, hold on, get cut off",
        "Not *get back you — you need to",
    ],
    [
        mcq(
            "en-d-phrasal-talk-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["I'll get back to you tomorrow.", "I'll get back you tomorrow.", "A problem came up with, with no idea object, as “invented”.", "Please point it, with no particle."],
            0,
            "get back to someone.",
            "get back to someone.",
        ),
        fill(
            "en-d-phrasal-talk-r2",
            "Вставте частки come ___ ___ (вигадати ідею) — напишіть up with.",
            "Type up with.",
            "She came ___ a better name.",
            ["up with", "Up with"],
        ),
        mcq(
            "en-d-phrasal-talk-r3",
            "Підняти тему на зустрічі:",
            "Raising a topic at a meeting:",
            ["bring it up", "hang it up in this meaning", "call it back as “raise a topic”", "cut it off as “raise”"],
            0,
            "bring up — підняти тему.",
            "bring up is raising a topic.",
        ),
        translate(
            "en-d-phrasal-talk-r4",
            "Перекладіть із point out.",
            "Translate with point out.",
            "Хочу вказати на одну помилку.",
            [
                "I'd like to point out one mistake",
                "I would like to point out one mistake",
                "I want to point out one mistake",
                "I'd like to point out a mistake",
                "I want to point out a mistake",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-phrasal-talk",
        "Що означають point out, bring up, come up with і get back to? Які фразові потрібні по телефону?",
        "What do point out, bring up, come up with and get back to mean? Which phrasal verbs do you need on the phone?",
        [
            idea("point/bring", "point/bring", "point out", "bring up"),
            idea("come up with", "come up with", "come up with", "get back to"),
            idea("phone", "phone", "hang up", "call back", "hold on", "cut off"),
        ],
        "Point out означає вказати на факт, bring up — підняти тему, come up with — вигадати ідею, get back to — відповісти пізніше. По телефону кажемо hang up, call back, hold on і we got cut off.",
        "Point out means indicating a fact, bring up means raising a topic, come up with means inventing an idea, and get back to means replying later. On the phone we say hang up, call back, hold on and we got cut off.",
    ),
)

U18_L5 = teach(
    "en-d-phrasal-problems",
    "Фразові дієслова проблем і рішень",
    "Phrasal verbs for problems and solutions",
    3,
    "deal with, sort out, run out of, break down, get over",
    "deal with, sort out, run out of, break down, get over",
    """Проблеми: run into — натрапити (на проблему / знайомого); run out of — вичерпати (We ran out of time); deal with — мати справу, вирішувати; sort out / work out — розібрати, знайти рішення; go through — пройти (важкий період) / переглянути документ; get over — оговтатися (після хвороби, невдачі); give up — здатися; break down — зламатися (машина, розмова) / розплакатися; fall through — зірватися (план); mess up — зіпсувати; back up — зробити резервну копію / підтримати.

break something down — розкласти на частини (також корисне в аналітиці). look into — розслідувати. make up for — компенсувати. bounce back — відновитися.

Типові помилки: *run out time без of; *deal it (потрібен deal with it); *get over with it плутають із get it over with («покінчити нарешті»). У ретроспективі: What went wrong і How can we sort this out? звучать природніше за канцелярит.""",
    """Problems: run into is meeting (a problem / an acquaintance); run out of is having none left (We ran out of time); deal with is handling; sort out / work out is finding a solution; go through is living through (a hard period) / going over a document; get over is recovering (from illness, a setback); give up is quitting; break down is failing (a car, a conversation) / bursting into tears; fall through is collapsing (a plan); mess up is spoiling; back up is making a copy / supporting someone.

break something down is splitting it into parts (also useful in analysis). look into is investigating. make up for is compensating. bounce back is recovering.

Typical mistakes: *run out time with no of; *deal it (you need deal with it); *get over with it mixed up with get it over with (“finish it at last”). In a retrospective, What went wrong and How can we sort this out? sound more natural than officialese.""",
    [
        "run into a problem; run out of time (з of)",
        "deal with, sort out, work out, look into",
        "get over, give up, break down, fall through",
        "back up — копія або підтримка",
    ],
    [
        "run into a problem; run out of time (with of)",
        "deal with, sort out, work out, look into",
        "get over, give up, break down, fall through",
        "back up is a copy or support",
    ],
    [
        mcq(
            "en-d-phrasal-problems-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["We ran out of time.", "We ran out time.", "We dealt the bug, with no with.", "The plan fell up."],
            0,
            "run out of + ресурс.",
            "run out of + a resource.",
        ),
        fill(
            "en-d-phrasal-problems-r2",
            "Вставте частку (оговтатися після невдачі).",
            "Insert the particle (recover from a setback).",
            "It took her a month to get ___ the failure.",
            ["over", "Over"],
        ),
        mcq(
            "en-d-phrasal-problems-r3",
            "План зірвався:",
            "The plan collapsed:",
            ["The plan fell through.", "The plan fell over, as the usual idiom here.", "The plan gave up.", "The plan ran into of time."],
            0,
            "fall through — зірватися (про план).",
            "fall through is a plan collapsing.",
        ),
        translate(
            "en-d-phrasal-problems-r4",
            "Перекладіть із deal with.",
            "Translate with deal with.",
            "Нам треба вирішити цю проблему.",
            [
                "We need to deal with this problem",
                "We need to deal with this problem.",
                "We have to deal with this problem",
                "We have to deal with this problem.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-phrasal-problems",
        "Що означають run out of, deal with, sort out, get over і fall through? Яка типова помилка з of?",
        "What do run out of, deal with, sort out, get over and fall through mean? What is the typical mistake with of?",
        [
            idea("run out of", "run out of", "run out of", "of", "time"),
            idea("deal/sort", "deal/sort", "deal with", "sort out", "work out"),
            idea("get over / fall", "get over / fall", "get over", "fall through", "break down", "give up"),
        ],
        "Run out of означає вичерпати, і of пропускати не можна. Deal with і sort out — вирішувати проблему. Get over — оговтатися, fall through — зірватися (про план). Типова помилка — *run out time без of.",
        "Run out of means having none left, and you cannot drop of. Deal with and sort out mean handling a problem. Get over means recovering, and fall through means a plan collapsing. A typical mistake is *run out time with no of.",
    ),
)

U18_EXAM = exam_lesson(
    "en-deep-phrasals-exam",
    "Контрольна: фразові дієслова",
    "Exam: phrasal verbs",
    3,
    [
        mcq(
            "en-deep-phrasals-exam-q1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["Turn it off.", "Turn off it.", "Look the cat after.", "Look forward to meet you."],
            0,
            "Займенник перед часткою у відокремлюваних.",
            "The pronoun comes before the particle in separable verbs.",
        ),
        mcq(
            "en-deep-phrasals-exam-q2",
            "Відкласти зустріч:",
            "Postpone a meeting:",
            ["put it off", "call it off, as “postpone”", "hand it off as “postpone”", "roll it off"],
            0,
            "put off — відкласти.",
            "put off is postponing.",
        ),
        mcq(
            "en-deep-phrasals-exam-q3",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["I'll get back to you.", "I'll get back you.", "We ran out time.", "We dealt the bug."],
            0,
            "get back to.",
            "get back to.",
        ),
        mcq(
            "en-deep-phrasals-exam-q4",
            "План зірвався:",
            "The plan collapsed:",
            ["The plan fell through.", "The plan fell over, as the usual idiom here.", "I grown up in Kyiv.", "Fill the form, with no particle."],
            0,
            "fall through.",
            "fall through.",
        ),
        fill(
            "en-deep-phrasals-exam-q5",
            "I look forward to ___ you.",
            "I look forward to ___ you.",
            "I look forward to ___ you.",
            ["meeting", "Meeting"],
        ),
    ],
)

UNIT_18 = unit(
    "en-deep-phrasals",
    "Фразові дієслова: побут, робота, спілкування",
    "Phrasal verbs: life, work, communication",
    [U18_L1, U18_L2, U18_L3, U18_L4, U18_L5, U18_EXAM],
)

U19_L1 = teach(
    "en-d-idioms-body",
    "Ідіоми з частинами тіла",
    "Idioms with parts of the body",
    3,
    "give a hand, keep an eye, cold feet, cost an arm and a leg",
    "give a hand, keep an eye, cold feet, cost an arm and a leg",
    """Багато англійських ідіом будуються на тілі, і їх не можна перекладати дослівно. give someone a hand — допомогти (не «дати руку» як жест). keep an eye on — стежити. learn by heart — вивчити напам'ять (українською «назубок», не «серцем»). get cold feet — злякатися перед рішенням, «дати задню». cost an arm and a leg — коштувати дуже дорого. a pain in the neck — хтось / щось дратівливе. keep your head — зберігати спокій. lose your head — розгубитися.

face the facts — визнати факти. see eye to eye — бути однієї думки. get something off your chest — виговоритися. by heart уже згадували. can't make head or tail of it — нічого не зрозуміти.

Типові помилки: дослівний переклад (*give a hand як лише фізичний жест, коли йдеться про допомогу); overuse в формальному есе (в IELTS Academic ідіоми обережно, по 1–2 доречних); змішані метафори. Ідіома — це фіксована фраза: *cost a hand and a foot немає.""",
    """Many English idioms are built on the body, and you cannot translate them word for word. give someone a hand is helping (not “offer a hand” as a gesture only). keep an eye on is watching. learn by heart is memorising (in Ukrainian “nazubok”, not “with the heart”). get cold feet is backing out before a decision. cost an arm and a leg is being very expensive. a pain in the neck is someone or something annoying. keep your head is staying calm. lose your head is panicking.

face the facts is accepting the facts. see eye to eye is agreeing. get something off your chest is saying what has been bothering you. can't make head or tail of it is understanding nothing.

Typical mistakes: a literal translation (*give a hand only as a physical gesture when the meaning is help); overuse in a formal essay (in IELTS Academic, idioms need care — one or two fitting ones); mixed metaphors. An idiom is a fixed phrase: *cost a hand and a foot does not exist.""",
    [
        "give a hand = допомогти; keep an eye on = стежити",
        "learn by heart; get cold feet; cost an arm and a leg",
        "see eye to eye; a pain in the neck",
        "Не перекладайте дослівно і не перевантажуйте есе",
    ],
    [
        "give a hand is helping; keep an eye on is watching",
        "learn by heart; get cold feet; cost an arm and a leg",
        "see eye to eye; a pain in the neck",
        "Do not translate literally, and do not overload an essay",
    ],
    [
        mcq(
            "en-d-idioms-body-r1",
            "Could you give me a hand? означає:",
            "Could you give me a hand? means:",
            ["Можеш допомогти?", "Можеш подати руку для рукостискання, як єдине значення?", "Можеш навчити напам'ять?", "Це коштує дуже дорого?"],
            0,
            "give a hand — допомогти.",
            "give a hand is helping.",
            ["Can you help me?", "Can you offer a handshake, as the only meaning?", "Can you teach it by heart?", "Is it very expensive?"],
        ),
        fill(
            "en-d-idioms-body-r2",
            "Вставте слово (вивчити напам'ять): learn by ___.",
            "Insert the word (memorise): learn by ___.",
            "I learned the irregular verbs by ___.",
            ["heart", "Heart"],
        ),
        mcq(
            "en-d-idioms-body-r3",
            "The ticket cost an arm and a leg означає:",
            "The ticket cost an arm and a leg means:",
            ["Квиток був дуже дорогий.", "Квиток був шкідливий для здоров'я.", "Квиток довелося вчити напам'ять.", "Ми злякалися перед поїздкою, як єдине значення."],
            0,
            "cost an arm and a leg — дуже дорого.",
            "cost an arm and a leg is being very expensive.",
            ["The ticket was very expensive.", "The ticket was bad for your health.", "The ticket had to be learned by heart.", "We got cold feet about the trip, as the only meaning."],
        ),
        match(
            "en-d-idioms-body-r4",
            "Зіставте ідіому зі значенням.",
            "Match each idiom with its meaning.",
            [
                ("get cold feet", "злякатися перед рішенням / back out"),
                ("keep an eye on", "стежити / watch"),
                ("see eye to eye", "бути однієї думки / agree"),
                ("a pain in the neck", "щось дратівливе / a nuisance"),
            ],
        ),
    ],
    ex(
        "en-d-idioms-body",
        "Що означають give a hand, learn by heart, get cold feet і cost an arm and a leg? Чому їх не перекладають дослівно?",
        "What do give a hand, learn by heart, get cold feet and cost an arm and a leg mean? Why aren't they translated word for word?",
        [
            idea("give a hand", "give a hand", "give a hand", "help", "допомог"),
            idea("heart / feet", "heart / feet", "by heart", "cold feet"),
            idea("arm and a leg", "arm and a leg", "arm and a leg", "expensive", "дорог"),
        ],
        "Give a hand означає допомогти, learn by heart — вивчити напам'ять, get cold feet — злякатися перед рішенням, cost an arm and a leg — коштувати дуже дорого. Дослівний переклад ламає значення, бо ідіома — фіксована фраза.",
        "Give a hand means helping, learn by heart means memorising, get cold feet means backing out before a decision, and cost an arm and a leg means being very expensive. A word-for-word translation breaks the meaning, because an idiom is a fixed phrase.",
    ),
)

U19_L2 = teach(
    "en-d-idioms-time",
    "Ідіоми часу, роботи та планування",
    "Idioms of time, work and planning",
    3,
    "in the long run, call it a day, on the same page, against the clock",
    "in the long run, call it a day, on the same page, against the clock",
    """Час і робота: in the long run — у довгій перспективі. in the short run — у короткій. against the clock — у гонитві за часом. at the last minute / at the eleventh hour — в останній момент. call it a day — закінчити роботу на сьогодні. hit the ground running — одразу активно почати. on the same page — однаково розуміти задачу. behind schedule / ahead of schedule — відстаємо / випереджаємо графік. better late than never — краще пізно, ніж ніколи (обережно з тоном).

from scratch — з нуля. a long shot — малоймовірний варіант. once in a blue moon — дуже рідко. take your time — не поспішай (не «візьми свій час» дослівно в календарі). it's a matter of time — це питання часу.

Типові помилки: *in the long term run (змішали in the long term і in the long run — обидві правильні окремо); *on the same page як лише фізична сторінка; call it a day не означає «назвати день». У діловому листі on the same page і behind schedule цілком доречні.""",
    """Time and work: in the long run is over a long period. in the short run is over a short one. against the clock is racing against time. at the last minute / at the eleventh hour is at the latest possible moment. call it a day is stopping work for today. hit the ground running is starting at full speed. on the same page is sharing the same understanding. behind schedule / ahead of schedule is late / early relative to the plan. better late than never is obvious — be careful with the tone.

from scratch is from nothing. a long shot is an unlikely option. once in a blue moon is very rarely. take your time is “don't rush” (not “take your time” as a diary slot). it's a matter of time means it will happen sooner or later.

Typical mistakes: *in the long term run (a mix of in the long term and in the long run — both are fine separately); *on the same page only as a physical page; call it a day does not mean “give the day a name”. In a work email on the same page and behind schedule are perfectly appropriate.""",
    [
        "in the long run; against the clock; at the last minute",
        "call it a day; hit the ground running; from scratch",
        "on the same page; behind / ahead of schedule",
        "take your time = не поспішай",
    ],
    [
        "in the long run; against the clock; at the last minute",
        "call it a day; hit the ground running; from scratch",
        "on the same page; behind / ahead of schedule",
        "take your time means don't rush",
    ],
    [
        mcq(
            "en-d-idioms-time-r1",
            "Let's call it a day означає:",
            "Let's call it a day means:",
            ["Закінчимо на сьогодні.", "Назвімо цей день.", "Ми на одній сторінці документа.", "Почнемо з нуля."],
            0,
            "call it a day — закінчити роботу сьогодні.",
            "call it a day is stopping work for today.",
            ["Let's stop for today.", "Let's give this day a name.", "We are on the same document page.", "Let's start from scratch."],
        ),
        fill(
            "en-d-idioms-time-r2",
            "Вставте слово: in the long ___.",
            "Insert the word: in the long ___.",
            "In the long ___ this will save us time.",
            ["run", "Run", "term", "Term"],
        ),
        mcq(
            "en-d-idioms-time-r3",
            "Ми однаково розуміємо задачу:",
            "We share the same understanding:",
            ["We're on the same page.", "We're against the clock, as the only meaning of agreement.", "We're a long shot.", "We're from scratch."],
            0,
            "on the same page — спільне розуміння.",
            "on the same page is a shared understanding.",
        ),
        translate(
            "en-d-idioms-time-r4",
            "Перекладіть із from scratch.",
            "Translate with from scratch.",
            "Ми написали модуль з нуля.",
            [
                "We wrote the module from scratch",
                "We wrote the module from scratch.",
                "We built the module from scratch",
                "We built the module from scratch.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-idioms-time",
        "Що означають call it a day, in the long run, on the same page і from scratch?",
        "What do call it a day, in the long run, on the same page and from scratch mean?",
        [
            idea("call it a day", "call it a day", "call it a day", "stop", "закінч"),
            idea("long run", "long run", "long run", "long term"),
            idea("same page / scratch", "same page / scratch", "same page", "from scratch", "schedule"),
        ],
        "Call it a day означає закінчити роботу на сьогодні. In the long run — у довгій перспективі. On the same page — однаково розуміти задачу. From scratch — з нуля.",
        "Call it a day means stopping work for today. In the long run means over a long period. On the same page means sharing the same understanding. From scratch means from nothing.",
    ),
)

U19_L3 = teach(
    "en-d-idioms-feel",
    "Ідіоми емоцій і ставлення",
    "Idioms of feelings and attitude",
    3,
    "over the moon, a blessing in disguise, lose your temper, on edge",
    "over the moon, a blessing in disguise, lose your temper, on edge",
    """Емоції: over the moon — дуже щасливий. down in the dumps — пригнічений. on edge — напружений, нервовий. lose your temper — зірватися, розізлится. keep your temper — стриматися. a blessing in disguise — щастя в нещасті, приховане благо. get on someone's nerves — діяти на нерви. under the weather — злегка нездоровий. in high spirits — у піднесеному настрої. feel like a fish out of water — почуватися не в своїй тарілці.

my cup of tea / not my cup of tea — (не) в моєму смаку. over the top — занадто, з перебором. take something to heart — брати близько до серця. break the ice — розрядити атмосферу. a shoulder to cry on — плече, на яке можна спертися.

Типові помилки: *on the moon замість over the moon; *blessing in dress; у формальному академічному есе over the moon може бути занадто розмовним — краще delighted / extremely pleased. Реєстр важливий так само, як значення.""",
    """Feelings: over the moon is extremely happy. down in the dumps is depressed. on edge is tense and nervous. lose your temper is exploding in anger. keep your temper is staying calm. a blessing in disguise is something good that first looked bad. get on someone's nerves is irritating someone. under the weather is slightly unwell. in high spirits is cheerful. feel like a fish out of water is feeling out of place.

my cup of tea / not my cup of tea is (not) to my taste. over the top is excessive. take something to heart is being hurt by it. break the ice is easing the atmosphere. a shoulder to cry on is someone who will listen.

Typical mistakes: *on the moon instead of over the moon; *blessing in dress; in a formal academic essay over the moon can be too informal — delighted / extremely pleased is safer. Register matters as much as meaning.""",
    [
        "over the moon / down in the dumps / on edge",
        "lose / keep your temper; a blessing in disguise",
        "under the weather; not my cup of tea; break the ice",
        "У формальному есе обирайте нейтральні синоніми",
    ],
    [
        "over the moon / down in the dumps / on edge",
        "lose / keep your temper; a blessing in disguise",
        "under the weather; not my cup of tea; break the ice",
        "In a formal essay choose neutral synonyms",
    ],
    [
        mcq(
            "en-d-idioms-feel-r1",
            "She was over the moon означає:",
            "She was over the moon means:",
            ["Вона була дуже щаслива.", "Вона була на Місяці.", "Вона була трохи нездорова.", "Вона зірвалася злістю."],
            0,
            "over the moon — дуже щасливий.",
            "over the moon is extremely happy.",
            ["She was extremely happy.", "She was on the Moon.", "She was slightly unwell.", "She lost her temper."],
        ),
        fill(
            "en-d-idioms-feel-r2",
            "Вставте слово: a blessing in ___.",
            "Insert the word: a blessing in ___.",
            "Losing that job was a blessing in ___.",
            ["disguise", "Disguise"],
        ),
        mcq(
            "en-d-idioms-feel-r3",
            "I'm a bit under the weather означає:",
            "I'm a bit under the weather means:",
            ["Я трохи погано себе почуваю.", "Я під дощем.", "Я дуже щасливий.", "Це не в моєму смаку."],
            0,
            "under the weather — злегка нездоровий.",
            "under the weather is slightly unwell.",
            ["I feel a bit unwell.", "I am standing in the rain.", "I am extremely happy.", "It is not my cup of tea."],
        ),
        match(
            "en-d-idioms-feel-r4",
            "Зіставте ідіому зі значенням.",
            "Match each idiom with its meaning.",
            [
                ("lose your temper", "зірватися / explode in anger"),
                ("on edge", "напружений / tense"),
                ("break the ice", "розрядити атмосферу / ease the atmosphere"),
                ("not my cup of tea", "не в моєму смаку / not to my taste"),
            ],
        ),
    ],
    ex(
        "en-d-idioms-feel",
        "Що означають over the moon, a blessing in disguise, under the weather і lose your temper? Коли ідіоми занадто розмовні?",
        "What do over the moon, a blessing in disguise, under the weather and lose your temper mean? When are idioms too informal?",
        [
            idea("over the moon", "over the moon", "over the moon", "happy", "щаслив"),
            idea("blessing", "blessing", "blessing in disguise", "under the weather"),
            idea("temper / register", "temper / register", "lose your temper", "formal", "delighted", "реєстр"),
        ],
        "Over the moon означає дуже щасливий, a blessing in disguise — приховане благо, under the weather — злегка нездоровий, lose your temper — зірватися. У формальному есе краще нейтральні слова, наприклад delighted замість over the moon.",
        "Over the moon means extremely happy, a blessing in disguise is something good that first looked bad, under the weather means slightly unwell, and lose your temper means exploding in anger. In a formal essay, neutral words are safer, for example delighted instead of over the moon.",
    ),
)

U19_L4 = teach(
    "en-d-idioms-work",
    "Ідіоми роботи, ІТ та рішень",
    "Work, IT and decision idioms",
    3,
    "think outside the box, the ball is in your court, back to square one, cut corners",
    "think outside the box, the ball is in your court, back to square one, cut corners",
    """Робота й рішення: think outside the box — мислити нестандартно. back to square one — повернутися на початок. the ball is in your court — тепер ваша черга відповідати / вирішувати. cut corners — робити абияк, економлячи час або якість (негативне). on the same wavelength — на одній хвилі. start from scratch уже мали як from scratch. a win-win situation — виграш для обох. move the goalposts — змінювати правила посеред гри. get the ball rolling — зрушити справу.

ІТ-тон: a quick win; low-hanging fruit — легкі перші результати (уже кліше, обережно); in the pipeline — у планах; out of the box — «з коробки», без налаштувань (не плутати з outside the box). at the end of the day — у кінцевому підсумку (часто слово-паразит).

Типові помилки: *think out of the box і think outside the box — обидві чути, outside частотніша; *the ball is on your court (потрібен in); cut corners не означає «скоротити шлях» у позитиві. Не ставте три кліше в один абзац.""",
    """Work and decisions: think outside the box is thinking in an original way. back to square one is returning to the start. the ball is in your court means it is your turn to respond or decide. cut corners is doing a job cheaply or sloppily (negative). on the same wavelength is thinking alike. start from scratch we already had as from scratch. a win-win situation is a gain for both sides. move the goalposts is changing the rules mid-game. get the ball rolling is getting something started.

IT tone: a quick win; low-hanging fruit is easy first results (already a cliché — be careful); in the pipeline is planned; out of the box is “as shipped”, with no setup (do not confuse it with outside the box). at the end of the day is “when all is considered” (often a filler).

Typical mistakes: *think out of the box and think outside the box are both heard, and outside is more frequent; *the ball is on your court (you need in); cut corners does not mean “shorten the path” in a positive sense. Do not put three clichés in one paragraph.""",
    [
        "think outside the box; back to square one",
        "the ball is in your court (in, не on)",
        "cut corners — негативне «абияк»",
        "out of the box ≠ outside the box",
    ],
    [
        "think outside the box; back to square one",
        "the ball is in your court (in, not on)",
        "cut corners is a negative “do it sloppily”",
        "out of the box is not outside the box",
    ],
    [
        mcq(
            "en-d-idioms-work-r1",
            "The ball is in your court означає:",
            "The ball is in your court means:",
            ["Тепер ваша черга вирішувати.", "М'яч на вашому полі для гри, як єдине значення.", "Ми повернулися на початок.", "Ви зробили роботу абияк."],
            0,
            "Черга відповідати / вирішувати за вами.",
            "It is your turn to respond or decide.",
            ["It is your turn to decide.", "The ball is on your sports field, as the only meaning.", "We are back to square one.", "You cut corners."],
        ),
        fill(
            "en-d-idioms-work-r2",
            "Вставте прийменник: the ball is ___ your court.",
            "Insert the preposition: the ball is ___ your court.",
            "The ball is ___ your court.",
            ["in", "In"],
        ),
        mcq(
            "en-d-idioms-work-r3",
            "cut corners означає:",
            "cut corners means:",
            ["робити абияк, жертвуючи якістю", "мислити нестандартно", "зрушити справу", "функція «з коробки»"],
            0,
            "cut corners — негативне спрощення.",
            "cut corners is a negative shortcut.",
            ["doing it sloppily and sacrificing quality", "thinking in an original way", "getting something started", "a feature out of the box"],
        ),
        translate(
            "en-d-idioms-work-r4",
            "Перекладіть із back to square one.",
            "Translate with back to square one.",
            "Після відмови ми повернулися на початок.",
            [
                "After the rejection we were back to square one",
                "After the rejection we were back to square one.",
                "After they said no we were back to square one",
                "We were back to square one after the rejection",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-idioms-work",
        "Що означають think outside the box, the ball is in your court, back to square one і cut corners? Чим out of the box відрізняється від outside the box?",
        "What do think outside the box, the ball is in your court, back to square one and cut corners mean? How is out of the box different from outside the box?",
        [
            idea("outside the box", "outside the box", "outside the box", "original", "нестандарт"),
            idea("ball / square", "ball / square", "in your court", "square one"),
            idea("cut corners / out of", "cut corners / out of", "cut corners", "out of the box", "pipeline"),
        ],
        "Think outside the box означає мислити нестандартно. The ball is in your court — тепер ваша черга вирішувати. Back to square one — повернутися на початок. Cut corners — робити абияк. Out of the box — «з коробки», без налаштувань, і це не те саме, що outside the box.",
        "Think outside the box means thinking in an original way. The ball is in your court means it is your turn to decide. Back to square one means returning to the start. Cut corners means doing a job sloppily. Out of the box means “as shipped”, with no setup, and that is not the same as outside the box.",
    ),
)

U19_L5 = teach(
    "en-d-idioms-use",
    "Як користуватися ідіомами: реєстр і міра",
    "How to use idioms: register and measure",
    3,
    "Одна-дві доречні ідіоми краще за п'ять кліше",
    "One or two fitting idioms are better than five clichés",
    """Ідіома працює, коли вона точна, природна для ситуації і зрозуміла співрозмовнику. У розмові та неформальному листі вони оживляють мову. У IELTS Academic Writing і формальному звіті краще менше: examiner цінує точність, а не колекцію фраз із списку «100 ідіом». Одна доречна (on the same page, in the long run) краща за over the moon плюс low-hanging fruit плюс at the end of the day в одному абзаці.

Прозорі ідіоми (at the last minute) легші для розуміння, ніж непрозорі (kick the bucket — померти, зазвичай недоречно в діловому контексті). Слідкуйте за граматикою навколо: the ball is in your court зберігає is і in. Не змішуйте дві метафори (*the ball is over the moon). Якщо сумніваєтеся — скажіть прямими словами: I'm very pleased замість over the moon.

Стратегія навчання: вчіть ідіому з короткою історією-прикладом, синонімом і позначкою реєстру (informal / neutral / careful). Повторюйте у флешкартах разом із колокаціями, не окремим «зоопарком фраз».""",
    """An idiom works when it is exact, natural for the situation and clear to the listener. In speech and informal email they bring language to life. In IELTS Academic Writing and a formal report, less is better: an examiner values precision, not a collection from a list of “100 idioms”. One fitting phrase (on the same page, in the long run) is better than over the moon plus low-hanging fruit plus at the end of the day in one paragraph.

Transparent idioms (at the last minute) are easier to understand than opaque ones (kick the bucket — “die”, usually inappropriate at work). Watch the grammar around the phrase: the ball is in your court keeps is and in. Do not mix two metaphors (*the ball is over the moon). If you are unsure, say it in plain words: I'm very pleased instead of over the moon.

A learning strategy: learn each idiom with a short example story, a synonym and a register label (informal / neutral / careful). Review them on flashcards together with collocations, not as a separate “zoo of phrases”.""",
    [
        "Доречність і реєстр важливіші за кількість",
        "В академічному письмі — одна-дві точні ідіоми",
        "Не змішуйте метафори і не ламайте фіксовану форму",
        "Якщо сумніваєтесь — кажіть прямими словами",
    ],
    [
        "Fit and register matter more than quantity",
        "In academic writing, one or two exact idioms",
        "Do not mix metaphors or break the fixed form",
        "If you are unsure, say it in plain words",
    ],
    [
        mcq(
            "en-d-idioms-use-r1",
            "Для IELTS Academic Writing краще:",
            "For IELTS Academic Writing it is better to:",
            [
                "Використати одну точну ідіому або нейтральну лексику.",
                "Вставити якомога більше ідіом зі списку.",
                "Написати kick the bucket у звіті про проект як нейтральне «завершити».",
                "Змішати the ball is over the moon.",
            ],
            0,
            "Точність важливіша за колекцію кліше.",
            "Precision matters more than a collection of clichés.",
            [
                "Use one exact idiom or neutral vocabulary.",
                "Insert as many idioms from a list as you can.",
                "Write kick the bucket in a project report as a neutral “finish”.",
                "Mix the ball is over the moon.",
            ],
        ),
        fill(
            "en-d-idioms-use-r2",
            "Якщо сумніваєтесь в ідіомі, краще сказати прямими ___ (словами). Напишіть words.",
            "Type words.",
            "If you are unsure, say it in plain ___.",
            ["words", "Words"],
        ),
        mcq(
            "en-d-idioms-use-r3",
            "at the last minute порівняно з kick the bucket:",
            "at the last minute compared with kick the bucket:",
            [
                "Перша прозоріша і ширше доречна.",
                "Друга нейтральніша в діловому звіті.",
                "Обидві завжди підходять для Academic Writing.",
                "Ідіоми взагалі не мають реєстру.",
            ],
            0,
            "Прозорі ідіоми безпечніші; kick the bucket — «померти».",
            "Transparent idioms are safer; kick the bucket means “die”.",
            [
                "The first is more transparent and more widely appropriate.",
                "The second is more neutral in a work report.",
                "Both always fit Academic Writing.",
                "Idioms have no register at all.",
            ],
        ),
        translate(
            "en-d-idioms-use-r4",
            "Перекладіть нейтрально (без over the moon).",
            "Translate in a neutral way (without over the moon).",
            "Я дуже задоволений результатом.",
            [
                "I'm very pleased with the result",
                "I am very pleased with the result",
                "I'm extremely pleased with the result",
                "I am extremely pleased with the result",
                "I'm very pleased with the result.",
                "I was very pleased with the result",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-idioms-use",
        "Коли ідіоми доречні, а коли краще нейтральна лексика? Чому не варто звалювати кілька кліше в один абзац?",
        "When are idioms appropriate, and when is neutral vocabulary better? Why shouldn't you pile several clichés into one paragraph?",
        [
            idea("register", "register", "register", "formal", "academic", "реєстр"),
            idea("one or two", "one or two", "one", "two", "cliché", "кліше"),
            idea("plain words", "plain words", "plain", "unsure", "сумнів", "words"),
        ],
        "Ідіоми доречні в розмові та неформальному листі, а в академічному письмі краще одна точна фраза або нейтральні слова. Кілька кліше в одному абзаці виглядають неприродно і можуть знизити оцінку за стиль. Якщо сумніваєтесь, кажіть прямими словами.",
        "Idioms are appropriate in speech and informal email, and in academic writing one exact phrase or neutral words is safer. Several clichés in one paragraph sound unnatural and can lower a style score. If you are unsure, say it in plain words.",
    ),
)

U19_EXAM = exam_lesson(
    "en-deep-idioms-exam",
    "Контрольна: ідіоми",
    "Exam: idioms",
    3,
    [
        mcq(
            "en-deep-idioms-exam-q1",
            "give me a hand означає:",
            "give me a hand means:",
            ["допоможи мені", "подай руку як єдине значення", "вивчи напам'ять", "це дуже дорого"],
            0,
            "Допомогти.",
            "Help me.",
            ["help me", "offer a handshake as the only meaning", "learn by heart", "it is very expensive"],
        ),
        mcq(
            "en-deep-idioms-exam-q2",
            "Let's call it a day означає:",
            "Let's call it a day means:",
            ["Закінчимо на сьогодні.", "Назвімо день.", "Ми на одній хвилі як єдине значення.", "Це коштує руку і ногу."],
            0,
            "Закінчити роботу сьогодні.",
            "Stop work for today.",
            ["Let's stop for today.", "Let's name the day.", "We are on the same wavelength as the only meaning.", "It costs an arm and a leg."],
        ),
        mcq(
            "en-deep-idioms-exam-q3",
            "over the moon означає:",
            "over the moon means:",
            ["дуже щасливий", "трохи нездоровий", "напружений", "не в моєму смаку"],
            0,
            "Дуже щасливий.",
            "Extremely happy.",
            ["extremely happy", "slightly unwell", "tense", "not to my taste"],
        ),
        mcq(
            "en-deep-idioms-exam-q4",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["The ball is in your court.", "The ball is on your court.", "Think out the box, with no side.", "Cut corners as a compliment for quality."],
            0,
            "in your court.",
            "in your court.",
        ),
        fill(
            "en-deep-idioms-exam-q5",
            "learn by ___ (напам'ять).",
            "learn by ___ (memorise).",
            "Learn the list by ___.",
            ["heart", "Heart"],
        ),
    ],
)

UNIT_19 = unit(
    "en-deep-idioms",
    "Ідіоми: тіло, час, емоції, робота",
    "Idioms: body, time, feelings, work",
    [U19_L1, U19_L2, U19_L3, U19_L4, U19_L5, U19_EXAM],
)

U20_L1 = teach(
    "en-d-theme-work",
    "Тема: робота та кар'єра",
    "Theme: work and career",
    3,
    "apply for, deadline, shift, resign, promote",
    "apply for, deadline, shift, resign, promote",
    """Робота: apply for a job — подати заявку (не *apply a job: потрібен for). CV (брит.) / résumé (амер.); cover letter — супровідний лист. hire / employ; recruit; interview; offer; accept / turn down an offer. deadline — кінцевий термін; meet a deadline / miss a deadline. a shift — зміна (night shift); full-time / part-time / freelance / remote / hybrid. resign — звільнитися самому; be fired / be sacked (брит., розмовно) / be laid off — скорочення. get promoted; a pay rise (брит.) / a raise (амер.); a bonus; overtime.

Колокації: heavy workload; work-life balance; a steep learning curve; report to someone (бути підлеглим); in charge of; a team lead; stakeholders; deliverable. I'm between jobs — м'якше, ніж unemployed, у розмові.

Типові помилки: *apply a job; *I have a work (a job / work без a); *salary як будь-яка плата (salary — місячний/річний оклад; wage — погодинна/тижнева, часто фізична робота; fee — гонорар). career ≠ job: career — шлях, job — конкретна посада.""",
    """Work: apply for a job is sending an application (not *apply a job: you need for). CV (BrE) / résumé (AmE); a cover letter. hire / employ; recruit; interview; offer; accept / turn down an offer. a deadline is a final date; meet a deadline / miss a deadline. a shift is a block of working time (night shift); full-time / part-time / freelance / remote / hybrid. resign is leaving yourself; be fired / be sacked (BrE, informal) / be laid off is redundancy. get promoted; a pay rise (BrE) / a raise (AmE); a bonus; overtime.

Collocations: a heavy workload; work-life balance; a steep learning curve; report to someone (be their report); in charge of; a team lead; stakeholders; a deliverable. I'm between jobs is softer than unemployed in conversation.

Typical mistakes: *apply a job; *I have a work (a job / work with no a); *salary for every kind of pay (salary is a monthly or yearly wage; a wage is often hourly or weekly, often manual work; a fee is a professional charge). career is not job: a career is a path, a job is a concrete post.""",
    [
        "apply for a job — з for; CV / cover letter",
        "meet / miss a deadline; full-time, remote, a shift",
        "resign ≠ be laid off; a pay rise / a raise",
        "job — посада; career — шлях; work зазвичай без a",
    ],
    [
        "apply for a job — with for; CV / cover letter",
        "meet / miss a deadline; full-time, remote, a shift",
        "resign is not be laid off; a pay rise / a raise",
        "a job is a post; a career is a path; work usually has no a",
    ],
    [
        mcq(
            "en-d-theme-work-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["She applied for the job.", "She applied the job.", "I have a work in Lviv.", "He resigned from the staff as “was laid off”, as the only meaning."],
            0,
            "apply for + job.",
            "apply for + a job.",
        ),
        fill(
            "en-d-theme-work-r2",
            "Вставте слово (кінцевий термін): meet the ___.",
            "Insert the word (final date): meet the ___.",
            "We have to meet the ___.",
            ["deadline", "Deadline"],
        ),
        mcq(
            "en-d-theme-work-r3",
            "resign означає:",
            "resign means:",
            ["звільнитися самому", "бути скороченим, як єдине значення", "отримати підвищення", "працювати в нічну зміну"],
            0,
            "resign — піти за власним рішенням.",
            "resign is leaving of your own accord.",
            ["leave the job yourself", "be laid off, as the only meaning", "get promoted", "work a night shift"],
        ),
        translate(
            "en-d-theme-work-r4",
            "Перекладіть із full-time і remote.",
            "Translate with full-time and remote.",
            "Вона шукає повну віддалену роботу.",
            [
                "She is looking for a full-time remote job",
                "She's looking for a full-time remote job",
                "She is looking for a full-time remote job.",
                "She's looking for a full-time remote job.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-theme-work",
        "Як сказати «подати заявку на роботу»? Чим resign відрізняється від be laid off, а job — від career? Що таке deadline?",
        "How do you say you are sending a job application? How is resign different from be laid off, and job from career? What is a deadline?",
        [
            idea("apply for", "apply for", "apply for", "CV", "cover letter"),
            idea("resign / laid off", "resign / laid off", "resign", "laid off", "fired"),
            idea("deadline / career", "deadline / career", "deadline", "career", "job", "work"),
        ],
        "Кажемо apply for a job, з прийменником for. Resign означає піти самому, be laid off — бути скороченим. Job — конкретна посада, career — професійний шлях. Deadline — кінцевий термін, який можна meet або miss.",
        "We say apply for a job, with the preposition for. Resign means leaving yourself, and be laid off means being made redundant. A job is a concrete post, and a career is a professional path. A deadline is a final date that you can meet or miss.",
    ),
)

U20_L2 = teach(
    "en-d-theme-edu",
    "Тема: освіта та навчання",
    "Theme: education and learning",
    3,
    "degree, assignment, tuition, undergraduate, pass a exam? pass an exam",
    "degree, assignment, tuition, undergraduate, pass an exam",
    """Освіта: a school subject; a degree (bachelor's, master's, a PhD); undergraduate / graduate (амер. graduate student ≈ брит. postgraduate). a course, a module, a lecture, a seminar, a tutorial. an assignment — завдання; an essay; a dissertation / a thesis; coursework. take / sit an exam (брит. sit); pass / fail; revise (брит.) / review (амер.) — повторювати до іспиту; cram — зубрити в останню ніч. tuition (fees) — плата за навчання; a scholarship; a student loan; a campus; a hall of residence (брит.) / a dorm (амер.).

Колокації: enrol on a course (брит.) / enroll in (амер.); drop out; skip a class; hand in an essay; fall behind; catch up; a tight deadline already from work. literate / numerate; vocational training.

Типові помилки: *pass an exam як «скласти» плутають із take an exam (взяти участь); *I finished school як єдиний спосіб сказати про університет (graduate from university); faculty в амер. часто «викладачі», не завжди «факультет» (department / school / faculty брит.). homework незлічуване в загальному сенсі.""",
    """Education: a school subject; a degree (bachelor's, master's, a PhD); undergraduate / graduate (AmE graduate student ≈ BrE postgraduate). a course, a module, a lecture, a seminar, a tutorial. an assignment is a task; an essay; a dissertation / a thesis; coursework. take / sit an exam (BrE sit); pass / fail; revise (BrE) / review (AmE) is preparing for an exam; cram is last-night memorising. tuition (fees) is what you pay to study; a scholarship; a student loan; a campus; a hall of residence (BrE) / a dorm (AmE).

Collocations: enrol on a course (BrE) / enroll in (AmE); drop out; skip a class; hand in an essay; fall behind; catch up; a tight deadline already from work. literate / numerate; vocational training.

Typical mistakes: mixing up pass an exam (“succeed”) with take an exam (“sit it”); *I finished school as the only way to talk about university (graduate from university); faculty in AmE is often “the teaching staff”, not always “a faculty” (department / school / faculty in BrE). homework is uncountable in the general sense.""",
    [
        "degree, undergraduate, postgraduate / graduate student",
        "take / sit an exam ≠ pass an exam",
        "revise (BrE) / review (AmE); tuition fees; a scholarship",
        "enrol on (BrE) / enroll in (AmE); hand in an essay",
    ],
    [
        "degree, undergraduate, postgraduate / graduate student",
        "take / sit an exam is not pass an exam",
        "revise (BrE) / review (AmE); tuition fees; a scholarship",
        "enrol on (BrE) / enroll in (AmE); hand in an essay",
    ],
    [
        mcq(
            "en-d-theme-edu-r1",
            "pass an exam означає:",
            "pass an exam means:",
            ["скласти іспит успішно", "просто прийти на іспит, як єдине значення", "провалити іспит", "зубрити всю ніч"],
            0,
            "pass — успішно скласти; take/sit — взяти участь.",
            "pass is succeeding; take/sit is sitting the exam.",
            ["succeed in the exam", "just attend the exam, as the only meaning", "fail the exam", "cram all night"],
        ),
        fill(
            "en-d-theme-edu-r2",
            "Британською «повторяти до іспиту» — дієслово на r. Напишіть revise.",
            "Type revise.",
            "I need to ___ for tomorrow's exam.",
            ["revise", "Revise", "review", "Review"],
        ),
        mcq(
            "en-d-theme-edu-r3",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["She enrolled on the course. (BrE)", "She passed the exam as “attended only”, as the usual meaning.", "He handed the essay, with no in.", "I have many homeworks, in the general sense."],
            0,
            "enrol on a course — брит. колокація.",
            "enrol on a course is the BrE collocation.",
        ),
        translate(
            "en-d-theme-edu-r4",
            "Перекладіть із scholarship.",
            "Translate with scholarship.",
            "Вона отримала стипендію.",
            [
                "She got a scholarship",
                "She got a scholarship.",
                "She received a scholarship",
                "She received a scholarship.",
                "She was awarded a scholarship",
                "She was awarded a scholarship.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-theme-edu",
        "Чим take an exam відрізняється від pass an exam? Що таке revise, tuition і scholarship? Яка різниця між enrol on і enroll in?",
        "How is take an exam different from pass an exam? What are revise, tuition and a scholarship? What is the difference between enrol on and enroll in?",
        [
            idea("take/pass", "take/pass", "take", "sit", "pass", "fail"),
            idea("revise/tuition", "revise/tuition", "revise", "review", "tuition", "scholarship"),
            idea("enrol", "enrol", "enrol on", "enroll in"),
        ],
        "Take або sit an exam означає прийти на іспит, pass — успішно скласти. Revise (брит.) — повторювати матеріал, tuition — плата за навчання, scholarship — стипендія. Enrol on — британська колокація, enroll in — американська.",
        "Take or sit an exam means attending it, and pass means succeeding. Revise (BrE) is preparing the material, tuition is the fee, and a scholarship is funding for study. Enrol on is the British collocation, and enroll in is the American one.",
    ),
)

U20_L3 = teach(
    "en-d-theme-travel",
    "Тема: подорожі та місто",
    "Theme: travel and the city",
    3,
    "book a ticket, commute, a return, delayed, landmark",
    "book a ticket, commute, a return, delayed, landmark",
    """Подорожі: book a ticket / a seat / a room; a one-way (амер.) / a single (брит.) і a return / a round trip. a commute, a commuter — щоденна дорога на роботу; a delay / delayed / cancelled; a connection; a platform; a gate; luggage (брит., незліч.) / baggage; a suitcase; hand luggage / carry-on. go through security; a boarding pass; passport control; customs. a landmark — визначна пам'ятка; downtown (амер.) / the city centre (брит.); a suburb; public transport (брит.) / public transportation (амер.).

Колокації: miss a train / catch a train; get stuck in traffic; a rush hour; a fare; a season ticket; a short-cut; ask for directions; a roundabout (брит.) / a traffic circle. stay in a hotel / an Airbnb; check in / check out.

Типові помилки: *a travel як злічуваний іменник про одну поїздку (a trip / a journey / a flight); travel часто незлічуване як заняття. *luggages; *in the bus краще on the bus; *arrive to the station — arrive at (місце малого розміру) / in (місто).""",
    """Travel: book a ticket / a seat / a room; a one-way (AmE) / a single (BrE) and a return / a round trip. a commute, a commuter is the daily journey to work; a delay / delayed / cancelled; a connection; a platform; a gate; luggage (BrE, uncountable) / baggage; a suitcase; hand luggage / carry-on. go through security; a boarding pass; passport control; customs. a landmark is a famous sight; downtown (AmE) / the city centre (BrE); a suburb; public transport (BrE) / public transportation (AmE).

Collocations: miss a train / catch a train; get stuck in traffic; rush hour; a fare; a season ticket; a short cut; ask for directions; a roundabout (BrE) / a traffic circle. stay in a hotel / an Airbnb; check in / check out.

Typical mistakes: *a travel as a countable noun for one journey (a trip / a journey / a flight); travel is often uncountable as an activity. *luggages; *in the bus — prefer on the bus; *arrive to the station — arrive at (a small place) / in (a city).""",
    [
        "book a ticket; a single / a return; a commute",
        "delayed, cancelled; luggage незлічуване",
        "on the bus; arrive at the station / in Lviv",
        "trip / journey, не *a travel про одну поїздку",
    ],
    [
        "book a ticket; a single / a return; a commute",
        "delayed, cancelled; luggage is uncountable",
        "on the bus; arrive at the station / in Lviv",
        "a trip / a journey, not *a travel for one journey",
    ],
    [
        mcq(
            "en-d-theme-travel-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["We arrived at the station.", "We arrived to the station.", "I packed two luggages.", "It was a nice travel, as a countable trip."],
            0,
            "arrive at + станція.",
            "arrive at + a station.",
        ),
        fill(
            "en-d-theme-travel-r2",
            "Вставте прийменник: on або in (автобус).",
            "Insert the preposition: on or in (a bus).",
            "I usually read ___ the bus.",
            ["on", "On"],
        ),
        mcq(
            "en-d-theme-travel-r3",
            "Щоденна дорога на роботу — це:",
            "The daily journey to work is:",
            ["a commute", "a landmark", "a return as the only word for this", "customs"],
            0,
            "commute — щоденна дорога.",
            "a commute is the daily journey.",
        ),
        translate(
            "en-d-theme-travel-r4",
            "Перекладіть із delayed.",
            "Translate with delayed.",
            "Наш рейс затримали.",
            [
                "Our flight was delayed",
                "Our flight was delayed.",
                "Our flight has been delayed",
                "Our flight has been delayed.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-theme-travel",
        "Чим trip відрізняється від *a travel? Який прийменник з arrive і з bus? Що таке commute і luggage?",
        "How is a trip different from *a travel? Which preposition goes with arrive and with bus? What are a commute and luggage?",
        [
            idea("trip/travel", "trip/travel", "trip", "journey", "travel", "countable"),
            idea("arrive at / on", "arrive at / on", "arrive at", "on the bus", "in Lviv"),
            idea("commute/luggage", "commute/luggage", "commute", "luggage", "delayed"),
        ],
        "Про одну поїздку кажемо a trip або a journey, а travel часто незлічуване. Arrive at the station, arrive in a city, on the bus. A commute — щоденна дорога на роботу, luggage — незлічуване «багаж».",
        "For one journey we say a trip or a journey, and travel is often uncountable. Arrive at the station, arrive in a city, on the bus. A commute is the daily journey to work, and luggage is uncountable baggage.",
    ),
)

U20_L4 = teach(
    "en-d-theme-health",
    "Тема: здоров'я та спосіб життя",
    "Theme: health and lifestyle",
    3,
    "have a cold, make an appointment, a prescription, work out",
    "have a cold, make an appointment, a prescription, work out",
    """Здоров'я: have a cold / have the flu (часто the flu); catch a cold; a sore throat; a headache (a, бо злічуваний біль з -ache); feel sick (брит. часто «нудить»; амер. також «погано себе почуваю»); be ill (брит.) / be sick (амер.). see a doctor / a GP; make an appointment; a prescription (рецепт на ліки, не receipt); a pharmacy / a chemist's (брит.). a check-up; a vaccine / get vaccinated; symptoms; recover from.

Спосіб життя: work out — тренуватися; a balanced diet; junk food; cut down on sugar; give up smoking; stay in shape; get enough sleep; mental health; burnt out / burnout. take medicine / take a pill (take, не *drink a pill).

Типові помилки: *I have flu без артикля частіше the flu; *I have headache без a; *recipe для ліків (recipe — страва; prescription — ліки); *make sport — do sport / do exercise / work out / play football. injured / wounded / hurt — injured частіше нещасний випадок, wounded — поранення.""",
    """Health: have a cold / have the flu (often the flu); catch a cold; a sore throat; a headache (a, because -ache pains are countable); feel sick (in BrE often “nauseous”; in AmE also “unwell”); be ill (BrE) / be sick (AmE). see a doctor / a GP; make an appointment; a prescription (for medicine, not a receipt); a pharmacy / a chemist's (BrE). a check-up; a vaccine / get vaccinated; symptoms; recover from.

Lifestyle: work out is training; a balanced diet; junk food; cut down on sugar; give up smoking; stay in shape; get enough sleep; mental health; burnt out / burnout. take medicine / take a pill (take, not *drink a pill).

Typical mistakes: *I have flu with no article — more often the flu; *I have headache with no a; *recipe for medicine (a recipe is food; a prescription is medicine); *make sport — do sport / do exercise / work out / play football. injured / wounded / hurt — injured is more often an accident, wounded is a wound.""",
    [
        "a cold / the flu; a headache з a",
        "make an appointment; a prescription ≠ a receipt / a recipe",
        "take a pill; work out; do exercise, не *make sport",
        "be ill (BrE) / be sick (AmE)",
    ],
    [
        "a cold / the flu; a headache with a",
        "make an appointment; a prescription is not a receipt or a recipe",
        "take a pill; work out; do exercise, not *make sport",
        "be ill (BrE) / be sick (AmE)",
    ],
    [
        mcq(
            "en-d-theme-health-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["I've got a headache.", "I've got headache.", "The doctor wrote me a recipe for antibiotics, as the usual word.", "I make sport every day."],
            0,
            "a headache — з артиклем a.",
            "a headache takes the article a.",
        ),
        fill(
            "en-d-theme-health-r2",
            "Рецепт на ліки англійською (не recipe). Напишіть prescription.",
            "Type prescription.",
            "The doctor gave me a ___.",
            ["prescription", "Prescription"],
        ),
        mcq(
            "en-d-theme-health-r3",
            "Тренуватися в залі — природно:",
            "Training in a gym is naturally:",
            ["work out", "make sport", "take a pill as the usual meaning", "catch a cold as “get fit”"],
            0,
            "work out — тренуватися.",
            "work out is training.",
        ),
        translate(
            "en-d-theme-health-r4",
            "Перекладіть із appointment.",
            "Translate with appointment.",
            "Мені треба записатися до лікаря.",
            [
                "I need to make an appointment with the doctor",
                "I need to make a doctor's appointment",
                "I have to make an appointment with the doctor",
                "I need to make an appointment to see the doctor",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-theme-health",
        "Чому кажуть a headache і the flu? Чим prescription відрізняється від recipe? Як сказати «тренуватися» і «записатися до лікаря»?",
        "Why do we say a headache and the flu? How is a prescription different from a recipe? How do you say “train” and “book a time with a doctor”?",
        [
            idea("headache/flu", "headache/flu", "a headache", "the flu", "a cold"),
            idea("prescription", "prescription", "prescription", "recipe", "receipt"),
            idea("work out", "work out", "work out", "appointment", "make sport"),
        ],
        "Кажемо a headache з артиклем і часто the flu. Prescription — рецепт на ліки, recipe — рецепт страви. Тренуватися — work out або do exercise, не make sport. Записатися до лікаря — make an appointment.",
        "We say a headache with an article and often the flu. A prescription is for medicine, and a recipe is for food. Training is work out or do exercise, not make sport. Booking a time with a doctor is make an appointment.",
    ),
)

U20_L5 = teach(
    "en-d-theme-food",
    "Тема: їжа, кількість і ресторан",
    "Theme: food, quantity and restaurants",
    3,
    "a piece of cake? food countability, a bill, a tip, dietary",
    "food countability, a bill, a tip, dietary words",
    """Їжа добре тренує злічуваність. Незлічувані: bread, cheese, meat, fish (як їжа), rice, pasta, water, coffee, milk, fruit (часто), advice уже знали. Порції: a slice of bread / pizza; a piece of cake (і ідіома “легко”); a loaf of bread; a bar of chocolate; a glass of water; a cup of coffee; a bowl of soup. Деякі мають обидва сенси: a coffee (чашка); a chicken (птах) / chicken (м'ясо); a hair / hair.

У ресторані: a menu; a starter (брит.) / an appetizer (амер.); a main course; a dessert; a bill (брит.) / a check (амер.) — не the bill як закон у цьому сенсі; a tip; a reservation / book a table; it's on me — я пригощаю; split the bill. dietary: vegetarian, vegan, gluten-free, dairy-free, spicy, mild; I'm allergic to…; I don't eat…

Типові помилки: *two breads як «дві скибки» (two slices); *a money; *I would like a soup без уточнення a bowl of, хоча a soup інколи чути як страву з меню; *account замість bill у ресторані (калька з українського «рахунок»). rare / medium / well-done — про стейк.""",
    """Food is good practice for countability. Uncountable: bread, cheese, meat, fish (as food), rice, pasta, water, coffee, milk, fruit (often), and advice, which you already know. Portions: a slice of bread / pizza; a piece of cake (and the idiom “easy”); a loaf of bread; a bar of chocolate; a glass of water; a cup of coffee; a bowl of soup. Some words have both senses: a coffee (a cup); a chicken (the animal) / chicken (the meat); a hair / hair.

In a restaurant: a menu; a starter (BrE) / an appetizer (AmE); a main course; a dessert; a bill (BrE) / a check (AmE) — not the bill as a law in this sense; a tip; a reservation / book a table; it's on me means I am paying; split the bill. dietary: vegetarian, vegan, gluten-free, dairy-free, spicy, mild; I'm allergic to…; I don't eat…

Typical mistakes: *two breads for “two slices” (two slices); *a money; *I would like a soup with no portion word, though a soup is sometimes heard as a menu item; *account instead of bill in a restaurant (a calque from Ukrainian “rakhunok”). rare / medium / well-done is about steak.""",
    [
        "bread, rice, water — незлічувані; a slice / a loaf / a glass",
        "a bill (BrE) / a check (AmE); a tip; it's on me",
        "book a table; starter / main / dessert",
        "Не *two breads і не *account у ресторані",
    ],
    [
        "bread, rice, water are uncountable; a slice / a loaf / a glass",
        "a bill (BrE) / a check (AmE); a tip; it's on me",
        "book a table; starter / main / dessert",
        "Not *two breads and not *account in a restaurant",
    ],
    [
        mcq(
            "en-d-theme-food-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["I'd like two slices of bread.", "I'd like two breads, as the usual portion.", "Can we have the account, as the usual restaurant word in English?", "A money is on the table."],
            0,
            "two slices of bread — bread незлічуване.",
            "two slices of bread — bread is uncountable.",
        ),
        fill(
            "en-d-theme-food-r2",
            "Британською «рахунок у ресторані». Напишіть bill.",
            "Type bill.",
            "Could we have the ___, please?",
            ["bill", "Bill", "check", "Check"],
        ),
        mcq(
            "en-d-theme-food-r3",
            "It's on me означає:",
            "It's on me means:",
            ["Я пригощаю / я плачу.", "Це на мені фізично.", "Рахунок спільний як єдине значення.", "Страва гостра."],
            0,
            "it's on me — я плачу.",
            "it's on me means I am paying.",
            ["I am paying.", "It is physically on me.", "We are splitting the bill, as the only meaning.", "The dish is spicy."],
        ),
        translate(
            "en-d-theme-food-r4",
            "Перекладіть із book a table.",
            "Translate with book a table.",
            "Нам треба замовити столик на двох.",
            [
                "We need to book a table for two",
                "We need to book a table for two.",
                "We'd like to book a table for two",
                "We would like to book a table for two",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-theme-food",
        "Як говорити про порції незлічуваної їжі? Як попросити рахунок у Британії? Що означає it's on me? Чому *account у ресторані — калька?",
        "How do you talk about portions of uncountable food? How do you ask for the bill in Britain? What does it's on me mean? Why is *account in a restaurant a calque?",
        [
            idea("slices", "slices", "slice", "loaf", "glass", "uncountable", "незлічув"),
            idea("bill", "bill", "bill", "check", "tip"),
            idea("on me", "on me", "on me", "account", "калька", "calque"),
        ],
        "Для незлічуваного кажемо a slice of bread, a loaf, a glass of water. У Британії рахунок — the bill, у США часто the check. It's on me означає «я плачу». Account у ресторані — калька з українського «рахунок».",
        "For uncountable food we say a slice of bread, a loaf, a glass of water. In Britain the bill is the bill, and in the US it is often the check. It's on me means I am paying. Account in a restaurant is a calque from Ukrainian “rakhunok”.",
    ),
)

U20_EXAM = exam_lesson(
    "en-deep-themes-a-exam",
    "Контрольна: теми A (робота, освіта, подорожі, здоров'я, їжа)",
    "Exam: themes A (work, education, travel, health, food)",
    3,
    [
        mcq(
            "en-deep-themes-a-exam-q1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["She applied for the job.", "She applied the job.", "I have a work.", "We arrived to the station."],
            0,
            "apply for.",
            "apply for.",
        ),
        mcq(
            "en-deep-themes-a-exam-q2",
            "pass an exam означає:",
            "pass an exam means:",
            ["скласти успішно", "просто прийти, як єдине значення", "провалити", "записатися до лікаря"],
            0,
            "Успішно скласти.",
            "Succeed in it.",
            ["succeed", "just attend, as the only meaning", "fail", "make a doctor's appointment"],
        ),
        mcq(
            "en-deep-themes-a-exam-q3",
            "Рецепт на ліки:",
            "A doctor's order for medicine:",
            ["a prescription", "a recipe", "a receipt", "a bill as the only medical word"],
            0,
            "prescription.",
            "prescription.",
        ),
        mcq(
            "en-deep-themes-a-exam-q4",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["I've got a headache.", "I've got headache.", "two breads as two slices", "I make sport every day."],
            0,
            "a headache.",
            "a headache.",
        ),
        fill(
            "en-deep-themes-a-exam-q5",
            "Could we have the ___? (рахунок, BrE)",
            "Could we have the ___? (BrE restaurant)",
            "Could we have the ___, please?",
            ["bill", "Bill"],
        ),
    ],
)

UNIT_20 = unit(
    "en-deep-themes-a",
    "Тематична лексика A: робота, освіта, подорожі, здоров'я, їжа",
    "Thematic vocabulary A: work, education, travel, health, food",
    [U20_L1, U20_L2, U20_L3, U20_L4, U20_L5, U20_EXAM],
)

U21_L1 = teach(
    "en-d-theme-tech",
    "Тема: технології та інтернет",
    "Theme: technology and the internet",
    3,
    "device, charge, a bug, sign in, browse, cloud",
    "device, charge, a bug, sign in, browse, cloud",
    """Техніка: a device; a gadget; hardware / software; an app; a browser; a charger; charge a phone (не *load a phone — калька з «завантажити» інколи плутають із download). turn on / off; plug in; run out of battery; wireless / Wi-Fi; a password; a username; sign in / log in; sign out / log out; sign up — зареєструватися (не *sign in для реєстрації). download / upload; a file, a folder, a backup; the cloud; a link; a feed; a pop-up; a cookie (у браузері).

Проблеми: a bug; a crash; freeze; it won't start; restore; update / upgrade (update — оновлення, upgrade — перехід на вищий рівень). browse the web; scroll; click / tap; swipe. privacy; personal data; two-factor authentication.

Типові помилки: *enter in the site — go to / visit / open; *in the internet — on the internet; *download як «заряджати»; *save in desktop без the (save it to the desktop). install / uninstall. У наступному блоці skills буде ділова IT-англійська глибше.""",
    """Technology: a device; a gadget; hardware / software; an app; a browser; a charger; charge a phone (not *load a phone — a calque from “zavantazhyty” sometimes mixed up with download). turn on / off; plug in; run out of battery; wireless / Wi-Fi; a password; a username; sign in / log in; sign out / log out; sign up is registering (not *sign in for registration). download / upload; a file, a folder, a backup; the cloud; a link; a feed; a pop-up; a cookie (in a browser).

Problems: a bug; a crash; freeze; it won't start; restore; update / upgrade (update is a patch, upgrade is moving to a higher tier). browse the web; scroll; click / tap; swipe. privacy; personal data; two-factor authentication.

Typical mistakes: *enter in the site — go to / visit / open; *in the internet — on the internet; *download for “charge”; *save in desktop with no the (save it to the desktop). install / uninstall. In the later skills block, workplace IT English goes deeper.""",
    [
        "charge a phone, не *load / *download у цьому сенсі",
        "sign up = реєстрація; sign in = вхід",
        "on the internet; a bug, a crash, a backup, the cloud",
        "update ≠ upgrade",
    ],
    [
        "charge a phone, not *load / *download in this sense",
        "sign up is registration; sign in is logging in",
        "on the internet; a bug, a crash, a backup, the cloud",
        "update is not upgrade",
    ],
    [
        mcq(
            "en-d-theme-tech-r1",
            "Оберіть правильне про реєстрацію.",
            "Choose the correct option about registration.",
            ["I signed up for an account.", "I signed in for an account, as the usual “register”.", "I charged the file from the site, as “download”.", "I found it in the internet."],
            0,
            "sign up — зареєструватися; sign in — увійти.",
            "sign up is registering; sign in is logging in.",
        ),
        fill(
            "en-d-theme-tech-r2",
            "Прийменник: on або in (інтернет).",
            "The preposition: on or in (the internet).",
            "I read about it ___ the internet.",
            ["on", "On"],
        ),
        mcq(
            "en-d-theme-tech-r3",
            "Зарядити телефон:",
            "Give a phone battery power:",
            ["charge the phone", "download the phone", "upload the phone", "sign the phone up in this meaning"],
            0,
            "charge — заряджати.",
            "charge is giving battery power.",
        ),
        translate(
            "en-d-theme-tech-r4",
            "Перекладіть із bug.",
            "Translate with bug.",
            "Ми знайшли помилку в коді.",
            [
                "We found a bug in the code",
                "We found a bug in the code.",
                "We have found a bug in the code",
                "We've found a bug in the code",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-theme-tech",
        "Чим sign up відрізняється від sign in? Як сказати «зарядити» і «в інтернеті»? Чим update відрізняється від upgrade?",
        "How is sign up different from sign in? How do you say “give a phone power” and “on the web”? How is update different from upgrade?",
        [
            idea("sign up/in", "sign up/in", "sign up", "sign in", "log in"),
            idea("charge / on", "charge / on", "charge", "on the internet", "download"),
            idea("update/upgrade", "update/upgrade", "update", "upgrade", "bug", "cloud"),
        ],
        "Sign up — зареєструватися, sign in — увійти. Зарядити телефон — charge, не download. Кажемо on the internet. Update — оновлення, upgrade — перехід на вищий рівень.",
        "Sign up is registering, and sign in is logging in. Giving a phone power is charge, not download. We say on the internet. An update is a patch, and an upgrade is moving to a higher tier.",
    ),
)

U21_L2 = teach(
    "en-d-theme-env",
    "Тема: довкілля та клімат",
    "Theme: the environment and climate",
    3,
    "climate change, renewable, recycle, carbon footprint, waste",
    "climate change, renewable, recycle, carbon footprint, waste",
    """Довкілля: the environment (з the); climate change (звичайно без the); global warming; greenhouse gases; carbon dioxide; a carbon footprint; emissions; fossil fuels (oil, coal, gas); renewable energy (solar, wind, hydro); a heatwave; a flood, a drought; biodiversity; an endangered species; deforestation; pollution (air / water / noise pollution); waste; recycle, reuse, reduce; a landfill; sustainable; eco-friendly.

Колокації: cut emissions; raise awareness; take action; ban single-use plastic; sort rubbish (брит.) / trash (амер.); go green. climate crisis уже політично забарвлене — знайте, що слово вибирають свідомо.

Типові помилки: *the climate change з the; *environment без the, коли про довкілля загалом (protect the environment); *nature як «довкілля» в політичному сенсі (nature — природа; environment — середовище, включно з людським); ecology — наука, не завжди синонім environment у публіцистиці. waste незлічуване в «відходи» загалом; a waste of time — інше значення.""",
    """The environment (with the); climate change (usually no the); global warming; greenhouse gases; carbon dioxide; a carbon footprint; emissions; fossil fuels (oil, coal, gas); renewable energy (solar, wind, hydro); a heatwave; a flood, a drought; biodiversity; an endangered species; deforestation; pollution (air / water / noise pollution); waste; recycle, reuse, reduce; a landfill; sustainable; eco-friendly.

Collocations: cut emissions; raise awareness; take action; ban single-use plastic; sort rubbish (BrE) / trash (AmE); go green. climate crisis is already politically coloured — know that the word is a conscious choice.

Typical mistakes: *the climate change with the; *environment with no the when it means the natural world in general (protect the environment); *nature as “the environment” in a policy sense (nature is the natural world; the environment includes the human setting); ecology is the science, not always a synonym of environment in journalism. waste is uncountable in the “rubbish” sense; a waste of time is a different meaning.""",
    [
        "the environment; climate change без the",
        "renewable energy; a carbon footprint; cut emissions",
        "recycle, reuse, reduce; pollution; waste",
        "ecology ≠ environment як синоніми завжди",
    ],
    [
        "the environment; climate change with no the",
        "renewable energy; a carbon footprint; cut emissions",
        "recycle, reuse, reduce; pollution; waste",
        "ecology is not always a synonym of environment",
    ],
    [
        mcq(
            "en-d-theme-env-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["Climate change is a serious issue.", "The climate change is a serious issue, as the usual article pattern.", "We must protect environment, with no the.", "Ecology always means “rubbish collection”."],
            0,
            "climate change зазвичай без the; the environment — з the.",
            "climate change usually has no the; the environment has the.",
        ),
        fill(
            "en-d-theme-env-r2",
            "Вставте слово: carbon ___ (слід).",
            "Insert the word: carbon ___ (print).",
            "We want to reduce our carbon ___.",
            ["footprint", "Footprint"],
        ),
        mcq(
            "en-d-theme-env-r3",
            "solar і wind — це:",
            "solar and wind are:",
            ["renewable energy", "fossil fuels", "a landfill", "a heatwave as the energy type"],
            0,
            "renewable — відновлювана енергія.",
            "renewable is energy that can be replenished.",
        ),
        translate(
            "en-d-theme-env-r4",
            "Перекладіть із recycle.",
            "Translate with recycle.",
            "Ми сортуємо й переробляємо пластик.",
            [
                "We sort and recycle plastic",
                "We sort and recycle plastic.",
                "We recycle plastic",
                "We recycle plastic.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-theme-env",
        "Чому climate change зазвичай без the, а environment — з the? Що таке carbon footprint і renewable energy? Чим ecology відрізняється від environment?",
        "Why does climate change usually have no the, while environment has the? What are a carbon footprint and renewable energy? How is ecology different from environment?",
        [
            idea("articles", "articles", "climate change", "the environment", "the"),
            idea("footprint", "footprint", "carbon footprint", "renewable", "emissions"),
            idea("ecology", "ecology", "ecology", "science", "environment"),
        ],
        "Climate change зазвичай без артикля, а про довкілля кажемо the environment. Carbon footprint — вуглецевий слід, renewable energy — відновлювана енергія. Ecology — наука, і це не завжди синонім environment.",
        "Climate change usually has no article, and we say the environment for the natural world. A carbon footprint is the carbon we are responsible for, and renewable energy can be replenished. Ecology is the science, and it is not always a synonym of environment.",
    ),
)

U21_L3 = teach(
    "en-d-theme-media",
    "Тема: медіа та новини",
    "Theme: media and the news",
    3,
    "headline, source, biased, fake news, streaming",
    "headline, source, biased, fake news, streaming",
    """Медіа: the news (незлічуване, з the: I watched the news; *a news немає — a news story / a piece of news). a headline; an article; a journalist; a source; a witness; an eyewitness report; breaking news; a press conference; a broadcast; a podcast; streaming; social media (часто як множина за змістом: social media are…, хоча is теж чути). a follower; a post; share; go viral; clickbait; a paywall.

Критичне читання: reliable / unreliable; biased / unbiased; a rumour; fake news; a fact-check; freedom of the press; privacy; an interview already from work. according to…; it is claimed that… — хеджування з уроку C1.

Типові помилки: *a news; *informations; *I saw in internet; *media is завжди в однині (the media are часто в брит. формальному стилі). tabloid / broadsheet — типи преси у Британії. cover a story — висвітлювати.""",
    """Media: the news (uncountable, with the: I watched the news; there is no *a news — a news story / a piece of news). a headline; an article; a journalist; a source; a witness; an eyewitness report; breaking news; a press conference; a broadcast; a podcast; streaming; social media (often plural in agreement: social media are…, though is is also heard). a follower; a post; share; go viral; clickbait; a paywall.

Critical reading: reliable / unreliable; biased / unbiased; a rumour; fake news; a fact-check; freedom of the press; privacy; an interview already from work. according to…; it is claimed that… — hedging from the C1 lesson.

Typical mistakes: *a news; *informations; *I saw in internet; *media is always singular (the media are is common in formal BrE). tabloid / broadsheet are types of press in Britain. cover a story is reporting it.""",
    [
        "the news — незлічуване, з the; a piece of news",
        "headline, source, breaking news, go viral, clickbait",
        "reliable / biased; a fact-check; according to",
        "Не *a news",
    ],
    [
        "the news is uncountable, with the; a piece of news",
        "headline, source, breaking news, go viral, clickbait",
        "reliable / biased; a fact-check; according to",
        "Not *a news",
    ],
    [
        mcq(
            "en-d-theme-media-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["I watched the news.", "I watched a news.", "I saw it in internet.", "This is an important information, with a, as usual."],
            0,
            "the news — незлічуване, з the.",
            "the news is uncountable, with the.",
        ),
        fill(
            "en-d-theme-media-r2",
            "Заголовок статті — headline. Напишіть headline.",
            "Type headline.",
            "The ___ was misleading.",
            ["headline", "Headline"],
        ),
        mcq(
            "en-d-theme-media-r3",
            "biased означає:",
            "biased means:",
            ["упереджений", "надійний, як синонім reliable", "вірусний", "платний доступ"],
            0,
            "biased — упереджений.",
            "biased means leaning to one side.",
            ["leaning to one side", "reliable, as a synonym of reliable", "viral", "behind a paywall"],
        ),
        translate(
            "en-d-theme-media-r4",
            "Перекладіть із according to і source.",
            "Translate with according to and source.",
            "За даними цього джерела, сайт упав.",
            [
                "According to this source, the site went down",
                "According to this source, the site went down.",
                "According to this source the site went down",
                "According to the source, the site went down",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-theme-media",
        "Чому не кажуть *a news? Що таке headline, biased і fact-check? Як хеджувати джерело?",
        "Why don't we say *a news? What are a headline, biased and a fact-check? How do you hedge a source?",
        [
            idea("the news", "the news", "the news", "piece of news", "uncountable"),
            idea("biased", "biased", "biased", "reliable", "headline", "fact-check"),
            idea("according to", "according to", "according to", "source", "claimed"),
        ],
        "News незлічуване, тому кажемо the news або a piece of news, не *a news. Headline — заголовок, biased — упереджений, a fact-check — перевірка фактів. Джерело хеджуємо через according to або it is claimed that.",
        "News is uncountable, so we say the news or a piece of news, not *a news. A headline is the title, biased means leaning to one side, and a fact-check is verifying facts. We hedge a source with according to or it is claimed that.",
    ),
)

U21_L4 = teach(
    "en-d-theme-society",
    "Тема: суспільство, право і громадянин",
    "Theme: society, law and citizenship",
    3,
    "rights, a law, vote, a fine, volunteer, equality",
    "rights, a law, vote, a fine, volunteer, equality",
    """Суспільство: society (часто без the, коли про суспільство загалом); a community; a citizen; citizenship; rights and duties; equality; diversity; inclusion; discrimination; poverty; a welfare state; a protest; a campaign; raise awareness уже з довкілля; volunteer (іменник і дієслово); a charity; donate.

Право: a law; break the law; pass a law; a rule ≠ a law (rule — правило організації); a crime; a criminal; steal, robbery, fraud, burglary — різні склади, не синоніми. the police (з the, множина: the police are). a fine — штраф; a court; a trial; a lawyer (брит. solicitor / barrister — різні ролі); innocent / guilty; evidence (незлічуване). vote; an election; a government (часто a / the); a mayor.

Типові помилки: *the society про суспільство загалом; *police is (The police are investigating); *evidences; *a crime як будь-яке «порушення» (порушити правило — break a rule). human rights — множина.""",
    """Society (often no the when it means society in general); a community; a citizen; citizenship; rights and duties; equality; diversity; inclusion; discrimination; poverty; a welfare state; a protest; a campaign; raise awareness already from the environment lesson; volunteer (noun and verb); a charity; donate.

Law: a law; break the law; pass a law; a rule is not a law (a rule is an organisation's rule); a crime; a criminal; steal, robbery, fraud, burglary are different offences, not synonyms. the police (with the, plural: the police are). a fine is a money penalty; a court; a trial; a lawyer (in BrE solicitor / barrister are different roles); innocent / guilty; evidence (uncountable). vote; an election; a government (often a / the); a mayor.

Typical mistakes: *the society for society in general; *police is (The police are investigating); *evidences; *a crime for any “breach” (breaking a rule is break a rule). human rights is plural.""",
    [
        "society часто без the; the police are",
        "a law / a rule; a fine; evidence незлічуване",
        "rights, equality, volunteer, a charity",
        "vote, an election; innocent / guilty",
    ],
    [
        "society often has no the; the police are",
        "a law / a rule; a fine; evidence is uncountable",
        "rights, equality, volunteer, a charity",
        "vote, an election; innocent / guilty",
    ],
    [
        mcq(
            "en-d-theme-society-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["The police are investigating.", "The police is investigating, as the usual formal BrE agreement.", "The society is unfair, as the usual article for society in general.", "We have many evidences."],
            0,
            "the police — множина; evidence незлічуване.",
            "the police is plural; evidence is uncountable.",
        ),
        fill(
            "en-d-theme-society-r2",
            "Штраф англійською. Напишіть fine.",
            "Type fine.",
            "He had to pay a ___.",
            ["fine", "Fine"],
        ),
        mcq(
            "en-d-theme-society-r3",
            "volunteer як дієслово означає:",
            "volunteer as a verb means:",
            ["працювати добровольцем", "сплатити штраф", "порушити закон", "проголосувати як єдине значення"],
            0,
            "volunteer — бути добровольцем.",
            "volunteer is offering your time.",
            ["offer your time unpaid", "pay a fine", "break the law", "vote, as the only meaning"],
        ),
        translate(
            "en-d-theme-society-r4",
            "Перекладіть із human rights.",
            "Translate with human rights.",
            "Вони захищають права людини.",
            [
                "They defend human rights",
                "They defend human rights.",
                "They protect human rights",
                "They protect human rights.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-theme-society",
        "Як узгоджується the police? Чим a law відрізняється від a rule? Чому *evidences помилка? Що таке a fine і volunteer?",
        "How does the police agree? How is a law different from a rule? Why is *evidences wrong? What are a fine and volunteer?",
        [
            idea("police", "police", "the police are", "police"),
            idea("law/rule", "law/rule", "law", "rule", "fine", "evidence"),
            idea("volunteer", "volunteer", "volunteer", "rights", "society"),
        ],
        "The police узгоджується як множина: the police are. A law — закон держави, a rule — правило організації. Evidence незлічуване, тому *evidences помилка. A fine — штраф, volunteer — працювати добровольцем.",
        "The police takes plural agreement: the police are. A law is a state law, and a rule is an organisation's rule. Evidence is uncountable, so *evidences is wrong. A fine is a money penalty, and volunteer is offering your time.",
    ),
)

U21_L5 = teach(
    "en-d-theme-money",
    "Тема: гроші, покупки та банк",
    "Theme: money, shopping and the bank",
    3,
    "afford, a discount, in debt, a refund, a current account",
    "afford, a discount, in debt, a refund, a current account",
    """Гроші: earn, spend, save, waste, invest; afford — мати змогу купити (I can't afford it). cost, charge, a fee, a price, a bargain, a discount (10% off); be worth. pay in cash / by card / by contactless; a receipt уже як фальшивий друг (чек). a refund — повернення грошей; exchange; a receipt ≠ a bill у магазині (bill частіше ресторан або рахунок до сплати).

Банк: a current account (брит.) / a checking account (амер.); a savings account; a debit / credit card; a PIN; withdraw money; a cash machine / an ATM; a transfer; interest (відсотки, незлічуване в цьому сенсі); in debt / get into debt / pay off a debt; a mortgage; a loan; a budget; overdraft. cheap / inexpensive / reasonable / pricey / expensive — градація, не лише cheap/expensive.

Типові помилки: *a money; *the price is expensive (the thing is expensive / the price is high); *pay the shop (pay the shop assistant / pay at the till / pay for the goods); *credit як будь-яка картка (debit знімає свої, credit — кредит). change — решта.""",
    """Money: earn, spend, save, waste, invest; afford is having enough to buy (I can't afford it). cost, charge, a fee, a price, a bargain, a discount (10% off); be worth. pay in cash / by card / by contactless; a receipt already as a false friend (the till slip). a refund is getting your money back; exchange; a receipt is not a bill in a shop (a bill is more often a restaurant or an amount to pay).

The bank: a current account (BrE) / a checking account (AmE); a savings account; a debit / credit card; a PIN; withdraw money; a cash machine / an ATM; a transfer; interest (the percentage, uncountable in this sense); in debt / get into debt / pay off a debt; a mortgage; a loan; a budget; an overdraft. cheap / inexpensive / reasonable / pricey / expensive is a scale, not only cheap/expensive.

Typical mistakes: *a money; *the price is expensive (the thing is expensive / the price is high); *pay the shop (pay the shop assistant / pay at the till / pay for the goods); *credit for every card (debit spends your money, credit is borrowed). change is the money you get back.""",
    [
        "afford; a discount; a refund; a receipt",
        "the price is high, не *the price is expensive",
        "current / savings account; in debt; interest",
        "debit ≠ credit; change = решта",
    ],
    [
        "afford; a discount; a refund; a receipt",
        "the price is high, not *the price is expensive",
        "current / savings account; in debt; interest",
        "debit is not credit; change is money back",
    ],
    [
        mcq(
            "en-d-theme-money-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["The price is too high.", "The price is too expensive.", "I have a money.", "I paid the shop, as the usual pattern."],
            0,
            "price — high/low; товар — expensive.",
            "A price is high or low; a thing is expensive.",
        ),
        fill(
            "en-d-theme-money-r2",
            "«Не можу собі дозволити» — дієслово. Напишіть afford.",
            "Type afford.",
            "I can't ___ a new laptop right now.",
            ["afford", "Afford"],
        ),
        mcq(
            "en-d-theme-money-r3",
            "refund означає:",
            "a refund means:",
            ["повернення грошей", "знижка як синонім discount", "решта", "іпотека"],
            0,
            "refund — повернути гроші.",
            "a refund is getting your money back.",
            ["getting your money back", "a discount, as a synonym of discount", "change", "a mortgage"],
        ),
        translate(
            "en-d-theme-money-r4",
            "Перекладіть із discount.",
            "Translate with discount.",
            "На цей товар є знижка десять відсотків.",
            [
                "There is a ten percent discount on this item",
                "There's a ten percent discount on this item",
                "There is a 10% discount on this item",
                "This item has a ten percent discount",
                "This item is ten percent off",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-theme-money",
        "Чому *the price is expensive помилка? Що означають afford, refund і in debt? Чим debit відрізняється від credit?",
        "Why is *the price is expensive wrong? What do afford, a refund and in debt mean? How is debit different from credit?",
        [
            idea("price high", "price high", "price is high", "expensive", "afford"),
            idea("refund/debt", "refund/debt", "refund", "in debt", "discount"),
            idea("debit/credit", "debit/credit", "debit", "credit", "change"),
        ],
        "Кажемо the price is high або the laptop is expensive, не *the price is expensive. Afford — мати змогу купити, a refund — повернення грошей, in debt — у боргах. Debit знімає ваші гроші, credit — позичені.",
        "We say the price is high or the laptop is expensive, not *the price is expensive. Afford is having enough to buy, a refund is getting your money back, and in debt means owing money. Debit spends your own money, and credit is borrowed.",
    ),
)

U21_EXAM = exam_lesson(
    "en-deep-themes-b-exam",
    "Контрольна: теми B (технології, довкілля, медіа, суспільство, гроші)",
    "Exam: themes B (technology, environment, media, society, money)",
    3,
    [
        mcq(
            "en-deep-themes-b-exam-q1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["I signed up for an account.", "I signed in for an account, as “register”.", "I found it in the internet.", "I watched a news."],
            0,
            "sign up — реєстрація.",
            "sign up is registration.",
        ),
        mcq(
            "en-deep-themes-b-exam-q2",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["Climate change is a serious issue.", "The climate change is a serious issue, as the usual pattern.", "We must protect environment, with no the.", "The police is investigating, as usual formal BrE."],
            0,
            "climate change без the.",
            "climate change with no the.",
        ),
        mcq(
            "en-deep-themes-b-exam-q3",
            "biased означає:",
            "biased means:",
            ["упереджений", "надійний", "відновлюваний", "дешевий"],
            0,
            "Упереджений.",
            "Leaning to one side.",
            ["leaning to one side", "reliable", "renewable", "cheap"],
        ),
        mcq(
            "en-deep-themes-b-exam-q4",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["The price is too high.", "The price is too expensive.", "I have a money.", "We have many evidences."],
            0,
            "the price is high.",
            "the price is high.",
        ),
        fill(
            "en-deep-themes-b-exam-q5",
            "I can't ___ it. (дозволити собі)",
            "I can't ___ it. (have enough money)",
            "I can't ___ it.",
            ["afford", "Afford"],
        ),
    ],
)

UNIT_21 = unit(
    "en-deep-themes-b",
    "Тематична лексика B: технології, довкілля, медіа, суспільство, гроші",
    "Thematic vocabulary B: technology, environment, media, society, money",
    [U21_L1, U21_L2, U21_L3, U21_L4, U21_L5, U21_EXAM],
)


UNITS = [UNIT_16, UNIT_17, UNIT_18, UNIT_19, UNIT_20, UNIT_21]
