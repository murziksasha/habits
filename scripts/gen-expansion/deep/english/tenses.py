"""English deep parts A: tense and aspect (units 1–4)."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from lib import (  # noqa: E402
    exam_lesson,
    explain,
    fill,
    idea,
    match,
    mcq,
    order_words,
    teach,
    translate,
    unit,
)


def _ex(slug, why_uk, why_en, ideas, sample_uk, sample_en):
    return explain(
        f"{slug}-e",
        why_uk,
        why_en,
        ideas,
        sample_uk,
        sample_en,
        min_words=12,
        pass_ratio=0.6,
    )


# ---------------------------------------------------------------------------
# Unit 1 — Present Perfect
# ---------------------------------------------------------------------------

U1_L1 = teach(
    "en-d-pp-form",
    "Форма Present Perfect",
    "Present Perfect form",
    3,
    "have/has + V3",
    "have/has + past participle",
    """Present Perfect утворюється так: have або has + третя форма дієслова (Past Participle): I have visited, she has finished, they have gone. Have вживаємо з I, you, we, they; has — з he, she, it. Заперечення: have not / has not (haven't, hasn't). Питання: Have you finished? Has she arrived?

В українській немає окремого часу з такою самою логікою. Речення «Я вже бачив цей фільм» і «Я бачив цей фільм учора» українською відрізняються лише прислівником, а англійською — часом: I have already seen this film (зв'язок із теперішнім) проти I saw this film yesterday (закінчений момент).

Найчастіша помилка українськомовних — ставити Past Simple (I saw, I did) там, де потрібен Present Perfect, або навпаки додавати have до минулого з yesterday. Запам'ятайте: Present Perfect завжди має have/has + V3, і ніколи не стоїть поруч із конкретним закінченим часом на кшталт yesterday, in 2019, last week. Не плутайте також have як «мати» (I have a car) із допоміжним have часу (I have bought a car).""",
    """The Present Perfect is formed with have or has plus the past participle (the third form): I have visited, she has finished, they have gone. Use have with I, you, we, they; has with he, she, it. The negative is have not / has not (haven't, hasn't). Questions: Have you finished? Has she arrived?

Ukrainian has no separate tense with the same logic. “I have already seen this film” and “I saw this film yesterday” may look similar in Ukrainian, but English chooses the tense: Present Perfect when the past event is tied to now, Past Simple when the time is a finished moment.

The most common error for Ukrainian speakers is using Past Simple (I saw, I did) where English wants Present Perfect, or adding have next to a finished-time phrase such as yesterday. Remember: Present Perfect is always have/has + past participle, and it does not combine with finished-time markers like yesterday, in 2019, or last week. Also do not confuse lexical have (“I have a car”) with auxiliary have (“I have bought a car”).""",
    [
        "Форма: have/has + Past Participle (V3)",
        "has — лише для he/she/it",
        "Не ставити Present Perfect з yesterday / in 2019",
        "have як «мати» — це не Present Perfect",
    ],
    [
        "Form: have/has + past participle (V3)",
        "has is only for he/she/it",
        "Do not use Present Perfect with yesterday / in 2019",
        "have meaning “possess” is not the Present Perfect",
    ],
    [
        mcq(
            "en-d-pp-form-r1",
            "Оберіть правильну форму: She ___ the report.",
            "Choose the correct form: She ___ the report.",
            ["has finished", "have finished", "finished has", "is finish"],
            0,
            "З she вживаємо has + третю форму finished.",
            "With she we use has plus the past participle finished.",
        ),
        fill(
            "en-d-pp-form-r2",
            "Вставте допоміжне дієслово (одне слово).",
            "Fill in the auxiliary (one word).",
            "They ___ already left the office.",
            ["have", "Have"],
        ),
        translate(
            "en-d-pp-form-r3",
            "Перекладіть англійською, використовуючи Present Perfect.",
            "Translate into English using the Present Perfect.",
            "Вона вже закінчила роботу.",
            [
                "She has already finished the work",
                "She has already finished work",
                "She's already finished the work",
                "She's already finished work",
                "She has already finished her work",
                "She's already finished her work",
            ],
            "uk_en",
        ),
        order_words(
            "en-d-pp-form-r4",
            "Зберіть питання в Present Perfect.",
            "Build the Present Perfect question.",
            ["Have", "you", "seen", "this", "film"],
        ),
    ],
    _ex(
        "en-d-pp-form",
        "Поясніть своїми словами, як утворюється Present Perfect і чим він відрізняється від have у значенні «мати».",
        "In your own words, explain how the Present Perfect is formed and how it differs from have meaning “possess”.",
        [
            idea("форма", "form", "have", "has", "participle", "третя", "v3", "форм"),
            idea("особа", "person", "has", "she", "he", "it"),
            idea("не «мати»", "not possession", "мати", "possess", "auxiliary", "допоміжн", "car", "машин"),
        ],
        "Present Perfect утворюється з have або has і третьої форми дієслова. Has стоїть з he, she, it. Це допоміжне дієслово, а не have у значенні «мати машину».",
        "The Present Perfect is formed with have or has plus the past participle. We use has with he, she and it. This have is an auxiliary, not possess as in I have a car.",
    ),
)

U1_L2 = teach(
    "en-d-pp-markers",
    "since, for, already, yet, just",
    "since, for, already, yet, just",
    3,
    "Маркери Present Perfect",
    "Present Perfect markers",
    """Кілька прислівників майже «кличуть» Present Perfect. since називає початкову точку (since Monday, since 2020, since I arrived). for називає тривалість (for two hours, for a long time). Українською обидва часто перекладають «вже …», тож їх легко переплутати: since Friday — від п'ятниці, for three days — протягом трьох днів.

already (вже, раніше ніж очікували) зазвичай стоїть між have і V3: I have already eaten. yet (уже / ще) вживають у питаннях і запереченнях, здебільшого в кінці: Have you finished yet? I haven't finished yet. just (щойно) теж між have і V3: She has just called.

ever (коли-небудь) і never (ніколи) описують досвід за життя: Have you ever been to Lviv? I have never tried sushi. Типова помилка: ставити already у запереченні замість yet (*I haven't already finished) або казати *since two weeks замість for two weeks. Ще одна: *I live here since 2019 — потрібно I have lived / have been living here since 2019.""",
    """A few adverbials almost “call for” the Present Perfect. since names a starting point (since Monday, since 2020, since I arrived). for names a duration (for two hours, for a long time). In Ukrainian both often sound like “already …”, so they are easy to mix up: since Friday is a starting point; for three days is a period.

already (sooner than expected) usually sits between have and the past participle: I have already eaten. yet is used in questions and negatives, usually at the end: Have you finished yet? I haven't finished yet. just (a moment ago) also goes between have and V3: She has just called.

ever and never describe life experience: Have you ever been to Lviv? I have never tried sushi. Typical mistakes: already in a negative instead of yet (*I haven't already finished), and *since two weeks instead of for two weeks. Another frequent error is *I live here since 2019 — English wants I have lived / have been living here since 2019.""",
    [
        "since — точка старту; for — тривалість",
        "already / just — між have і V3",
        "yet — у питаннях і запереченнях, часто в кінці",
        "не *since two weeks, а for two weeks",
    ],
    [
        "since is a starting point; for is a duration",
        "already and just go between have and V3",
        "yet is for questions and negatives, often at the end",
        "not *since two weeks — say for two weeks",
    ],
    [
        mcq(
            "en-d-pp-markers-r1",
            "Оберіть правильний варіант: We have lived here ___ 2018.",
            "Choose the correct option: We have lived here ___ 2018.",
            ["since", "for", "from", "during"],
            0,
            "2018 — точка старту, тому since.",
            "2018 is a starting point, so since.",
        ),
        fill(
            "en-d-pp-markers-r2",
            "Вставте for або since.",
            "Insert for or since.",
            "She has been ill ___ three days.",
            ["for", "For"],
        ),
        mcq(
            "en-d-pp-markers-r3",
            "Де зазвичай стоїть yet?",
            "Where does yet usually go?",
            [
                "у кінці питального або заперечного речення",
                "лише на початку розповідного речення",
                "між підметом і have",
                "тільки після yesterday",
            ],
            0,
            "Yet типове для питань і заперечень і часто стоїть у кінці.",
            "Yet is typical of questions and negatives and often comes at the end.",
            [
                "at the end of a question or a negative sentence",
                "only at the beginning of a statement",
                "between the subject and have",
                "only after yesterday",
            ],
        ),
        translate(
            "en-d-pp-markers-r4",
            "Перекладіть, використавши just і Present Perfect.",
            "Translate using just and the Present Perfect.",
            "Він щойно прийшов.",
            [
                "He has just arrived",
                "He's just arrived",
                "He has just come",
                "He's just come",
                "He has just come in",
                "He's just come in",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-pp-markers",
        "Поясніть різницю між since і for та де стоять already і yet.",
        "Explain the difference between since and for, and where already and yet go.",
        [
            idea("since", "since", "since", "точка", "start", "почат"),
            idea("for", "for", "for", "тривал", "duration", "period", "протяж"),
            idea("yet/already", "yet/already", "yet", "already", "кінці", "end", "запереч", "negative"),
        ],
        "Since називає точку початку, а for — тривалість періоду. Already стоїть між have і дієсловом, yet — часто в кінці заперечення або питання.",
        "Since names a starting point, and for names a duration. Already goes between have and the verb, while yet often comes at the end of a negative or a question.",
    ),
)

U1_L3 = teach(
    "en-d-pp-vs-past",
    "Present Perfect чи Past Simple",
    "Present Perfect versus Past Simple",
    3,
    "Зв'язок із «зараз» проти закінченого часу",
    "A link to now versus a finished time",
    """Це головний контраст для українськомовних. Past Simple називає дію в закінченому часовому відрізку: I visited Kyiv in 2019. Yesterday I saw Maria. The meeting started at nine. Є маркер минулого або зрозумілий закінчений контекст — беріть Past Simple.

Present Perfect називає минулу дію, важливу зараз: результат (She has broken her arm — рука зламана і це актуально), досвід за життя без дати (I have visited Kyiv), або незавершений період (I have written three emails today — день ще триває).

Порівняйте: I have lost my keys (не можу увійти зараз) і I lost my keys yesterday, but I found them. Запитання When…? майже завжди вимагає Past Simple: When did you see her? — не *When have you seen her? Типова помилка: I have seen him yesterday. Якщо є yesterday, last year, in 2010, when I was a child — час закінчений, потрібен Past Simple. Якщо питають «чи є досвід / чи є результат тепер» без дати — Present Perfect.""",
    """This is the central contrast for Ukrainian speakers. Past Simple places an action in a finished time period: I visited Kyiv in 2019. Yesterday I saw Maria. The meeting started at nine. If there is a past-time marker or a clearly finished context, use Past Simple.

Present Perfect names a past action that matters now: a present result (She has broken her arm — the arm is broken, and that is current), life experience without a date (I have visited Kyiv), or an unfinished time period (I have written three emails today — the day is still in progress).

Compare: I have lost my keys (I can't get in now) and I lost my keys yesterday, but I found them. When…? almost always takes Past Simple: When did you see her? — not *When have you seen her? A typical mistake is I have seen him yesterday. If you have yesterday, last year, in 2010, or when I was a child, the time is finished and you need Past Simple. If the question is “is there experience / is there a result now?” with no date, use Present Perfect.""",
    [
        "Past Simple — закінчений час (yesterday, in 2019, when…)",
        "Present Perfect — результат, досвід або незавершений період",
        "When…? зазвичай вимагає Past Simple",
        "Ніколи: *I have seen him yesterday",
    ],
    [
        "Past Simple is for finished time (yesterday, in 2019, when…)",
        "Present Perfect is for a result, experience, or an unfinished period",
        "When…? usually requires Past Simple",
        "Never: *I have seen him yesterday",
    ],
    [
        mcq(
            "en-d-pp-vs-past-r1",
            "Оберіть правильне речення.",
            "Choose the correct sentence.",
            [
                "I saw this film yesterday.",
                "I have seen this film yesterday.",
                "I have saw this film yesterday.",
                "I did seen this film yesterday.",
            ],
            0,
            "Yesterday — закінчений час, тому Past Simple: saw.",
            "Yesterday is finished time, so Past Simple: saw.",
        ),
        mcq(
            "en-d-pp-vs-past-r2",
            "Ситуація: ключі зникли, і ви досі не можете увійти. Що скажете?",
            "Situation: the keys are missing and you still cannot get in. What do you say?",
            [
                "I have lost my keys.",
                "I lost my keys in 2015 and bought new ones then.",
                "I lose my keys yesterday.",
                "I had lose my keys.",
            ],
            0,
            "Результат актуальний зараз — Present Perfect.",
            "The result is current, so Present Perfect.",
        ),
        fill(
            "en-d-pp-vs-past-r3",
            "Вставте did або have.",
            "Insert did or have.",
            "When ___ you arrive in Lviv?",
            ["did", "Did"],
        ),
        translate(
            "en-d-pp-vs-past-r4",
            "Перекладіть. День ще не закінчився.",
            "Translate. The day is not over yet.",
            "Сьогодні я написав три листи.",
            [
                "I have written three emails today",
                "I've written three emails today",
                "I have written three letters today",
                "I've written three letters today",
                "Today I have written three emails",
                "Today I've written three emails",
                "Today I have written three letters",
                "Today I've written three letters",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-pp-vs-past",
        "Коли ви обираєте Present Perfect, а коли Past Simple? Наведіть орієнтир про yesterday і про результат зараз.",
        "When do you choose Present Perfect and when Past Simple? Mention yesterday and a result that matters now.",
        [
            idea("past simple", "past simple", "past simple", "yesterday", "закінчен", "finished", "2019"),
            idea("present perfect", "present perfect", "perfect", "результат", "result", "досвід", "experience", "зараз", "now"),
            idea("when", "when", "when", "did"),
        ],
        "Past Simple ставимо з закінченим часом, наприклад yesterday. Present Perfect потрібен, коли є результат зараз або досвід без дати. Питання when зазвичай іде з did, не з have.",
        "We use Past Simple with finished time, for example yesterday. Present Perfect is for a result now or experience without a date. A when-question usually takes did, not have.",
    ),
)

U1_L4 = teach(
    "en-d-pp-been-gone",
    "been і gone, ever і never",
    "been and gone, ever and never",
    3,
    "Досвід подорожей і життя",
    "Travel and life experience",
    """Have you ever been to Prague? — питання про досвід. been тут означає «був і повернувся» (або «маю досвід перебування»). She has gone to Prague означає «поїхала і ще там / у дорозі»: її немає тут. Це тонка, але важлива пара для українськомовних: обидва можна перекласти «вона їздила / поїхала в Прагу».

ever ставимо в питаннях про досвід за життя: Have you ever tried borshch made by her? never — заперечний досвід: I have never ridden a horse. Відповіді короткі: Yes, I have. No, I haven't. / Never. Після never не потрібне not (*I haven't never…).

Якщо називаєте конкретну поїздку з датою, знову Past Simple: I went to Prague in 2022. Present Perfect залишає дату відкритою: I have been to Prague (колись, і це частина мого досвіду). Множина разів: I have been there three times — times добре йде з Present Perfect, бо це підсумок дотепер.""",
    """Have you ever been to Prague? is a question about experience. been here means “went and came back” (or “I have the experience of being there”). She has gone to Prague means “she went and is still there / on the way”: she is not here. This pair is subtle for Ukrainian speakers, because both can translate as “she went to Prague”.

ever is used in life-experience questions: Have you ever tried borshch made by her? never is negative experience: I have never ridden a horse. Short answers: Yes, I have. No, I haven't. / Never. After never you do not need not (*I haven't never…).

If you name a specific trip with a date, switch back to Past Simple: I went to Prague in 2022. Present Perfect leaves the date open: I have been to Prague (at some point, and it is part of my experience). A count of times works well with Present Perfect: I have been there three times — a total up to now.""",
    [
        "been = був і повернувся / є досвід",
        "gone = пішов і ще не повернувся",
        "ever — у питаннях про досвід; never — без другого not",
        "Конкретна дата поїздки — Past Simple",
    ],
    [
        "been = went and came back / have the experience",
        "gone = left and has not come back yet",
        "ever in experience questions; never without a second not",
        "A specific trip date takes Past Simple",
    ],
    [
        mcq(
            "en-d-pp-been-gone-r1",
            "Колеги немає на місці: вона зараз у відрядженні в Празі. Що правильно?",
            "A colleague is not at her desk: she is currently on a trip to Prague. Which is right?",
            [
                "She has gone to Prague.",
                "She has been to Prague, so she is back at her desk.",
                "She have gone to Prague.",
                "She has go to Prague.",
            ],
            0,
            "has gone — вона пішла і ще там.",
            "has gone means she left and is still there.",
        ),
        fill(
            "en-d-pp-been-gone-r2",
            "Вставте been або gone.",
            "Insert been or gone.",
            "I have ___ to Odesa twice, and I loved both trips.",
            ["been", "Been"],
        ),
        match(
            "en-d-pp-been-gone-r3",
            "Зіставте форму з значенням.",
            "Match each form with its meaning.",
            [
                ("She has gone to the shop.", "Вона пішла і ще не вернулась / She left and is still out"),
                ("She has been to the shop.", "Вона вже сходила і повернулась / She went and is back"),
                ("Have you ever been there?", "Питання про досвід за життя / A life-experience question"),
            ],
        ),
        translate(
            "en-d-pp-been-gone-r4",
            "Перекладіть, використовуючи never і Present Perfect.",
            "Translate using never and the Present Perfect.",
            "Я ніколи не їздив до Японії.",
            [
                "I have never been to Japan",
                "I've never been to Japan",
                "I have never gone to Japan",
                "I've never gone to Japan",
                "I have never visited Japan",
                "I've never visited Japan",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-pp-been-gone",
        "У чому різниця між has been to і has gone to? Як працюють ever і never?",
        "What is the difference between has been to and has gone to? How do ever and never work?",
        [
            idea("been", "been", "been", "повернув", "back", "досвід", "experience"),
            idea("gone", "gone", "gone", "ще", "still", "there", "там", "не поверну"),
            idea("ever/never", "ever/never", "ever", "never"),
        ],
        "Has been to означає, що людина була там і вже повернулась, це досвід. Has gone to означає, що вона ще там. Ever стоїть у питаннях, never — у заперечному досвіді.",
        "Has been to means the person went and is already back: it is experience. Has gone to means they are still there. Ever is used in questions, and never marks negative experience.",
    ),
)

U1_L5 = teach(
    "en-d-pp-just-news",
    "Щойно і незавершений період",
    "Hot news and unfinished periods",
    3,
    "Новина, today і this week",
    "News, today and this week",
    """Present Perfect часто подає «гарячу новину»: The train has just arrived. The company has announced a new office in Lviv. Слухач має сприйняти подію як актуальну. У новинах заголовки часто саме в Present Perfect, а деталі з датою вже в Past Simple: The president has resigned. He announced it at noon.

Незавершений період — другий важливий випадок: today, this morning (якщо ранок ще триває), this week, this year, recently, so far, until now, over the last few days. I have drunk three coffees today — день не закінчився, тому можна додати ще. Якщо ранок уже минув і ви говорите ввечері, this morning поводиться як закінчений час: I drank three coffees this morning.

Recently і lately майже завжди йдуть з Present Perfect: I have recently changed jobs. Типова помилка — *I have done it last week (last week уже закритий) і *I did three reports this week, коли тиждень ще триває й ви підбиваєте підсумок дотепер (краще I have done three reports this week).""",
    """Present Perfect often delivers “hot news”: The train has just arrived. The company has announced a new office in Lviv. The listener should take the event as current. News headlines often use Present Perfect, then switch to Past Simple for dated details: The president has resigned. He announced it at noon.

An unfinished time period is the second key case: today, this morning (if the morning is still in progress), this week, this year, recently, so far, until now, over the last few days. I have drunk three coffees today — the day is not over, so another coffee is still possible. If the morning has already passed and you are speaking in the evening, this morning behaves like finished time: I drank three coffees this morning.

recently and lately almost always take Present Perfect: I have recently changed jobs. Typical mistakes are *I have done it last week (last week is closed) and *I did three reports this week when the week is still running and you are giving a total so far (prefer I have done three reports this week).""",
    [
        "Гаряча новина — Present Perfect; деталі з часом — Past Simple",
        "today, this week, so far — незавершений період",
        "this morning залежить від того, чи ранок ще триває",
        "last week не сполучається з Present Perfect",
    ],
    [
        "Hot news takes Present Perfect; dated details take Past Simple",
        "today, this week, so far are unfinished periods",
        "this morning depends on whether the morning is still in progress",
        "last week does not combine with Present Perfect",
    ],
    [
        mcq(
            "en-d-pp-just-news-r1",
            "Оберіть природний заголовок новини.",
            "Choose the natural news headline.",
            [
                "The company has opened a new office in Lviv.",
                "The company has opened a new office last year.",
                "The company opening a new office yesterday.",
                "The company have open a new office.",
            ],
            0,
            "Актуальна новина без закінченої дати — Present Perfect.",
            "Current news with no finished date takes Present Perfect.",
        ),
        fill(
            "en-d-pp-just-news-r2",
            "Вставте правильну форму дієслова write (одне або два слова).",
            "Fill in the correct form of write (one or two words).",
            "I ___ three reports so far this week.",
            ["have written", "Have written", "'ve written", "have wrote"],
        ),
        mcq(
            "en-d-pp-just-news-r3",
            "Зараз вечір. Ранок давно закінчився. Що природніше?",
            "It is evening now. The morning ended long ago. Which is more natural?",
            [
                "I drank two coffees this morning.",
                "I have drunk two coffees this morning.",
                "I have drink two coffees this morning.",
                "I drinking two coffees this morning.",
            ],
            0,
            "Для мовця ранок уже закінчений відрізок — Past Simple.",
            "For the speaker the morning is a finished period, so Past Simple.",
        ),
        order_words(
            "en-d-pp-just-news-r4",
            "Зберіть речення-новину.",
            "Build the news sentence.",
            ["The", "train", "has", "just", "arrived"],
        ),
    ],
    _ex(
        "en-d-pp-just-news",
        "Чому today часто йде з Present Perfect, а last week — ні? Що таке «гаряча новина»?",
        "Why does today often take Present Perfect, while last week does not? What is “hot news”?",
        [
            idea("незавершений період", "unfinished period", "today", "week", "so far", "незавершен", "unfinished", "period"),
            idea("last week", "last week", "last week", "закінчен", "finished", "past simple"),
            idea("новина", "news", "news", "новин", "just", "щойно", "current", "актуаль"),
        ],
        "Today і this week часто ще не закінчились, тому підсумок іде в Present Perfect. Last week уже закінчений, тож потрібен Past Simple. Гаряча новина — щойно подія, актуальна зараз, наприклад the train has just arrived.",
        "Today and this week are often still unfinished, so a total so far takes Present Perfect. Last week is already finished, so we need Past Simple. Hot news is a just-happened event that is current now, for example the train has just arrived.",
    ),
)

U1_EXAM = exam_lesson(
    "en-deep-perfect-exam",
    "Контрольна: Present Perfect",
    "Exam: Present Perfect",
    3,
    [
        mcq(
            "en-deep-perfect-exam-q1",
            "She ___ already ___ the email.",
            "She ___ already ___ the email.",
            ["has / sent", "have / sent", "has / send", "did / sent"],
            0,
            "has + already + past participle sent.",
            "has + already + past participle sent.",
        ),
        mcq(
            "en-deep-perfect-exam-q2",
            "Оберіть правильне речення.",
            "Choose the correct sentence.",
            [
                "I have known her for ten years.",
                "I have known her since ten years.",
                "I know her since ten years.",
                "I have knew her for ten years.",
            ],
            0,
            "Тривалість — for ten years; since потребує точки старту.",
            "Duration is for ten years; since needs a starting point.",
        ),
        mcq(
            "en-deep-perfect-exam-q3",
            "Яке речення граматично правильне?",
            "Which sentence is grammatically correct?",
            [
                "I saw him yesterday.",
                "I have seen him yesterday.",
                "I have saw him yesterday.",
                "I did seen him yesterday.",
            ],
            0,
            "Yesterday вимагає Past Simple.",
            "Yesterday requires Past Simple.",
        ),
        mcq(
            "en-deep-perfect-exam-q4",
            "На місці нікого немає: колега поїхав у Варшаву і ще там. Як сказати?",
            "The desk is empty: a colleague went to Warsaw and is still there. What do you say?",
            [
                "He has gone to Warsaw.",
                "He has been to Warsaw, so he is back.",
                "He have gone to Warsaw.",
                "He has gone to Warsaw yesterday.",
            ],
            0,
            "has gone — пішов і ще не повернувся.",
            "has gone means he left and has not come back.",
        ),
        fill(
            "en-deep-perfect-exam-q5",
            "Вставте yet або already.",
            "Insert yet or already.",
            "Have you finished the report ___?",
            ["yet", "Yet"],
        ),
    ],
)

UNIT_1 = unit(
    "en-deep-perfect",
    "Present Perfect: досвід і результат",
    "Present Perfect: experience and result",
    [U1_L1, U1_L2, U1_L3, U1_L4, U1_L5, U1_EXAM],
)

# ---------------------------------------------------------------------------
# Unit 2 — Perfect Continuous and Past Perfect
# ---------------------------------------------------------------------------

U2_L1 = teach(
    "en-d-ppc-form",
    "Форма Present Perfect Continuous",
    "Present Perfect Continuous form",
    3,
    "have/has been + V-ing",
    "have/has been + V-ing",
    """Present Perfect Continuous: have/has been + дієслово з -ing. I have been waiting for an hour. She has been working here since May. Наголос на самій діяльності, яка почалася раніше й триває дотепер (або щойно зупинилась, але видно слід: You look tired. I have been running).

Для українськомовних це знову «невидимий» час: ми скажемо «я чекаю вже годину» теперішнім, а англійська вимагає have been waiting, бо є і тривалість, і зв'язок із зараз. Не кажіть *I am waiting for an hour і не *I wait here since morning.

Заперечення: I haven't been sleeping well. Питання: How long have you been studying English? How long — дуже типовий супутник цього часу. Станні дієслова (know, have у значенні «мати», like, believe) зазвичай не ставлять у Continuous: не *I have been knowing her, а I have known her for years.""",
    """Present Perfect Continuous is have/has been + verb-ing. I have been waiting for an hour. She has been working here since May. The focus is on the activity itself, which started earlier and continues until now (or has just stopped, with a visible result: You look tired. I have been running).

For Ukrainian speakers this is another “invisible” tense: we may say “I have been waiting for an hour” with a present form in Ukrainian, but English wants have been waiting because there is both duration and a link to now. Do not say *I am waiting for an hour or *I wait here since morning.

The negative is I haven't been sleeping well. Questions: How long have you been studying English? How long is a very typical partner of this tense. Stative verbs (know, have meaning “possess”, like, believe) do not usually take Continuous: not *I have been knowing her, but I have known her for years.""",
    [
        "Форма: have/has been + V-ing",
        "Наголос на тривалій діяльності дотепер",
        "How long…? — типовий супутник",
        "Станні дієслова (know, like) — не в Continuous",
    ],
    [
        "Form: have/has been + V-ing",
        "The focus is on an activity continuing up to now",
        "How long…? is a typical partner",
        "Stative verbs (know, like) do not take Continuous",
    ],
    [
        mcq(
            "en-d-ppc-form-r1",
            "Оберіть правильну форму: I ___ for the bus for twenty minutes.",
            "Choose the correct form: I ___ for the bus for twenty minutes.",
            ["have been waiting", "am waiting", "have waiting", "has been waiting"],
            0,
            "have been + waiting: тривала дія дотепер, підмет I.",
            "have been + waiting: an activity up to now, subject I.",
        ),
        fill(
            "en-d-ppc-form-r2",
            "Вставте been або being.",
            "Insert been or being.",
            "She has ___ studying all morning.",
            ["been", "Been"],
        ),
        translate(
            "en-d-ppc-form-r3",
            "Перекладіть, використавши Present Perfect Continuous.",
            "Translate using the Present Perfect Continuous.",
            "Я чекаю вже годину.",
            [
                "I have been waiting for an hour",
                "I've been waiting for an hour",
                "I have been waiting for one hour",
                "I've been waiting for one hour",
            ],
            "uk_en",
        ),
        mcq(
            "en-d-ppc-form-r4",
            "Яке речення правильне?",
            "Which sentence is correct?",
            [
                "I have known her for years.",
                "I have been knowing her for years.",
                "I am knowing her for years.",
                "I know her since years.",
            ],
            0,
            "know — станне дієслово, тому Present Perfect Simple: have known.",
            "know is stative, so Present Perfect Simple: have known.",
        ),
    ],
    _ex(
        "en-d-ppc-form",
        "Як утворюється Present Perfect Continuous і з яким питанням він часто стоїть? Чому не кажемо I have been knowing?",
        "How is Present Perfect Continuous formed, and which question often goes with it? Why don't we say I have been knowing?",
        [
            idea("форма", "form", "been", "ing", "-ing", "have"),
            idea("how long", "how long", "how long", "тривал", "duration", "довго"),
            idea("станні", "stative", "know", "stative", "станн", "like"),
        ],
        "Форма — have або has been і дієслово з -ing. Часто стоїть із питанням how long. Станні дієслова на кшталт know не ставлять у Continuous, тож I have been knowing — помилка.",
        "The form is have or has been plus a verb with -ing. It often goes with the question how long. Stative verbs such as know do not take Continuous, so I have been knowing is wrong.",
    ),
)

U2_L2 = teach(
    "en-d-ppc-vs-pp",
    "Continuous чи Simple: I've been writing / I've written",
    "Continuous or Simple: I've been writing / I've written",
    3,
    "Процес проти результату",
    "Process versus result",
    """Порівняйте: I have been writing the report (процес, можливо, ще не готовий; видно втому чи зайнятість) і I have written the report (результат: звіт готовий). I have been reading this book all week (заглиблений у процес) проти I have read this book (прочитав цілком, є досвід / результат).

Якщо важлива кількість завершеного — зазвичай Simple: I have written five emails, I have read forty pages. Якщо важлива тривалість діяльності — Continuous: I have been writing emails all morning. How much / how many тягнуть Simple; how long — часто Continuous.

Дієслова live, work, study, teach допускають обидва варіанти з майже однаковим значенням: I have lived / have been living here for ten years. Різниця невелика. Не ставте Continuous, коли дія не може «тривати на очах» як процес завершеного підсумку: *I have been breaking my arm — ні, I have broken my arm (результат).""",
    """Compare: I have been writing the report (the process; it may not be finished; we notice tiredness or busyness) and I have written the report (the result: the report is done). I have been reading this book all week (absorbed in the process) versus I have read this book (finished it; experience or a completed result).

When the amount completed matters, Simple is usual: I have written five emails, I have read forty pages. When the duration of the activity matters, Continuous is usual: I have been writing emails all morning. How much / how many pull towards Simple; how long often pulls towards Continuous.

With live, work, study, teach both forms are often possible with almost the same meaning: I have lived / have been living here for ten years. The difference is small. Do not use Continuous when the verb is not a visible ongoing process but a finished result: *I have been breaking my arm is wrong; I have broken my arm (result).""",
    [
        "Continuous — процес і тривалість; Simple — результат і кількість",
        "How many / how much → часто Simple; how long → часто Continuous",
        "live, work, study — обидві форми часто можливі",
        "Результат на кшталт broken arm — лише Simple",
    ],
    [
        "Continuous is process and duration; Simple is result and quantity",
        "How many / how much often take Simple; how long often takes Continuous",
        "live, work, study often allow both forms",
        "A result such as a broken arm takes Simple only",
    ],
    [
        mcq(
            "en-d-ppc-vs-pp-r1",
            "Звіт уже готовий і відправлений. Що сказати?",
            "The report is finished and sent. What do you say?",
            [
                "I have written the report.",
                "I have been writing the report (and it is still unfinished).",
                "I have been wrote the report.",
                "I writing the report since morning.",
            ],
            0,
            "Готовий результат — Present Perfect Simple: have written.",
            "A finished result takes Present Perfect Simple: have written.",
        ),
        mcq(
            "en-d-ppc-vs-pp-r2",
            "Оберіть природніше речення про тривалу роботу без підсумку «скільки».",
            "Choose the more natural sentence about ongoing work with no “how many” total.",
            [
                "I have been answering emails all morning.",
                "I have answered emails all morning, and the number does not matter here.",
                "I have been answering five emails.",
                "I am answering emails since morning.",
            ],
            0,
            "Наголос на тривалості процесу — Continuous.",
            "The focus is duration of the process, so Continuous.",
        ),
        fill(
            "en-d-ppc-vs-pp-r3",
            "Вставте written або been writing.",
            "Insert written or been writing.",
            "She has ___ twenty pages today — the count is what matters.",
            ["written", "Written"],
        ),
        translate(
            "en-d-ppc-vs-pp-r4",
            "Перекладіть. Наголос на процесі (вигляд: людина втомлена).",
            "Translate. The focus is the process (the person looks tired).",
            "Я біг. (щойно, тому я спітнілий)",
            [
                "I have been running",
                "I've been running",
                "I have been running, that's why I'm tired",
                "I've been running, that's why I'm tired",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-ppc-vs-pp",
        "Коли ви оберете I've been writing, а коли I've written? Згадайте результат і кількість.",
        "When would you choose I've been writing, and when I've written? Mention result and quantity.",
        [
            idea("процес", "process", "been writing", "process", "процес", "тривал", "duration", "morning"),
            idea("результат", "result", "written", "result", "результат", "готовий", "finished", "done"),
            idea("кількість", "quantity", "five", "many", "кільк", "pages", "count", "скільки"),
        ],
        "I've been writing підкреслює процес і тривалість. I've written називає результат: текст готовий. Якщо важлива кількість, наприклад five pages, зазвичай беремо Simple.",
        "I've been writing highlights the process and the duration. I've written names the result: the text is done. When quantity matters, for example five pages, we usually choose Simple.",
    ),
)

U2_L3 = teach(
    "en-d-past-perf",
    "Past Perfect: раніше від минулого",
    "Past Perfect: earlier than the past",
    3,
    "had + V3",
    "had + past participle",
    """Past Perfect: had + третя форма для всіх осіб: I had left, she had left. Він потрібен, коли в минулому є дві дії, і ви хочете ясно показати, яка була першою. When I arrived, the meeting had already started — зустріч почалася раніше від мого приходу.

Українською часто обидві дії стоять у минулому часі («коли я прийшов, зустріч уже почалася»), тому Past Perfect легко пропустити. Англійська використовує його як «минуле в минулому». Якщо порядок і так очевидний завдяки after / before, іноді досить Past Simple: After I finished, I went home. Але already, just, never, by the time дуже часто тягнуть Past Perfect: By the time we got to the station, the train had left.

Не ставте Past Perfect усюди в оповіді — лише для дії, ранішої за інший минулий орієнтир. *I had gone to school yesterday, then I had eaten, then I had slept — це помилка: звичайна історія йде в Past Simple.""",
    """Past Perfect is had + past participle for every person: I had left, she had left. You need it when there are two past actions and you want to show clearly which happened first. When I arrived, the meeting had already started — the meeting started before my arrival.

In Ukrainian both actions often sit in a simple past (“when I arrived, the meeting had already started”), so Past Perfect is easy to omit. English uses it as “the past in the past”. If the order is already obvious with after / before, Past Simple is sometimes enough: After I finished, I went home. But already, just, never, and by the time very often pull in Past Perfect: By the time we got to the station, the train had left.

Do not sprinkle Past Perfect through a whole story — only on the action that is earlier than another past anchor. *I had gone to school yesterday, then I had eaten, then I had slept is wrong: a normal narrative uses Past Simple.""",
    [
        "Форма: had + V3 для всіх осіб",
        "Показує дію, ранішу за іншу минулу",
        "by the time, already, just — типові супутники",
        "Не ставити Past Perfect на кожен крок оповіді",
    ],
    [
        "Form: had + V3 for every person",
        "It marks an action earlier than another past event",
        "by the time, already, just are typical partners",
        "Do not use Past Perfect for every step of a story",
    ],
    [
        mcq(
            "en-d-past-perf-r1",
            "Оберіть правильне: When I arrived, the film ___.",
            "Choose the correct option: When I arrived, the film ___.",
            ["had already started", "has already started", "have already started", "already starts"],
            0,
            "Фільм почався раніше від приходу в минулому — had + V3.",
            "The film started earlier than a past arrival — had + V3.",
        ),
        fill(
            "en-d-past-perf-r2",
            "Вставте допоміжне слово.",
            "Insert the auxiliary.",
            "By the time we arrived, the train ___ left.",
            ["had", "Had"],
        ),
        translate(
            "en-d-past-perf-r3",
            "Перекладіть, показавши, що ключі зникли РАНІШЕ.",
            "Translate, showing that the keys disappeared EARLIER.",
            "Я зрозумів, що загубив ключі.",
            [
                "I realised that I had lost my keys",
                "I realized that I had lost my keys",
                "I realised I'd lost my keys",
                "I realized I'd lost my keys",
                "I understood that I had lost my keys",
            ],
            "uk_en",
        ),
        mcq(
            "en-d-past-perf-r4",
            "Який варіант — зайве використання Past Perfect?",
            "Which option overuses Past Perfect?",
            [
                "Yesterday I had gone to work, I had written emails, I had come home.",
                "When I came home, I realised I had left my laptop at work.",
                "The train had left by the time we arrived.",
                "She had already eaten when I offered her lunch.",
            ],
            0,
            "Звичайна послідовність учорашнього дня не потребує had на кожному кроці.",
            "A normal sequence from yesterday does not need had on every step.",
        ),
    ],
    _ex(
        "en-d-past-perf",
        "Навіщо потрібен Past Perfect і коли його не варто ставити в кожне речення історії?",
        "Why do we need Past Perfect, and when should we not put it in every sentence of a story?",
        [
            idea("раніше", "earlier", "had", "earlier", "раніш", "before", "first"),
            idea("дві дії", "two actions", "two", "дві", "arrived", "started", "past"),
            idea("не вся оповідь", "not the whole story", "simple", "оповід", "story", "every", "кожн", "yesterday"),
        ],
        "Past Perfect з had показує дію, яка сталася раніше за іншу минулу дію, наприклад when I arrived the film had already started. У звичайній оповіді про yesterday не треба ставити had у кожне речення — там Past Simple.",
        "Past Perfect with had shows an action that happened earlier than another past action, for example when I arrived the film had already started. In a normal story about yesterday we should not put had in every sentence — that is Past Simple.",
    ),
)

U2_L4 = teach(
    "en-d-ppc-past",
    "Past Perfect Continuous",
    "Past Perfect Continuous",
    4,
    "had been + V-ing",
    "had been + V-ing",
    """Past Perfect Continuous: had been + V-ing. Він описує тривалу дію, яка відбувалася до певного моменту в минулому. She had been waiting for an hour when the bus finally came. I was tired because I had been driving all day.

Це «Present Perfect Continuous, зсунутий у минуле». Питання How long had you been working there before you moved? Підкреслюється процес, не підсумок. Для кількості знову Simple: She had written ten pages before lunch — не *had been writing ten pages як головна ідея кількості.

Не ускладнюйте: якщо немає «ранішого процесу до минулої точки», звичайного Past Continuous або Past Simple досить. He was reading when I entered — одночасність у минулому, не Past Perfect Continuous.""",
    """Past Perfect Continuous is had been + V-ing. It describes an activity that was in progress up to a moment in the past. She had been waiting for an hour when the bus finally came. I was tired because I had been driving all day.

Think of it as Present Perfect Continuous shifted into the past. A typical question is How long had you been working there before you moved? The focus is the process, not a total. For a quantity, Simple is better: She had written ten pages before lunch — not *had been writing ten pages as the main idea of amount.

Do not overcomplicate: if there is no “earlier process up to a past point”, ordinary Past Continuous or Past Simple is enough. He was reading when I entered is two past actions at the same time, not Past Perfect Continuous.""",
    [
        "Форма: had been + V-ing",
        "Тривалий процес до моменту в минулому",
        "Пояснює стан у минулому (втома, очікування)",
        "Не плутати з одночасним Past Continuous",
    ],
    [
        "Form: had been + V-ing",
        "A process continuing up to a past moment",
        "It often explains a past state (tiredness, waiting)",
        "Do not confuse it with simultaneous Past Continuous",
    ],
    [
        mcq(
            "en-d-ppc-past-r1",
            "Оберіть правильне: She was exhausted because she ___ all night.",
            "Choose the correct option: She was exhausted because she ___ all night.",
            ["had been studying", "has been studying", "was been studying", "had studying"],
            0,
            "Процес до минулого стану втоми — had been studying.",
            "A process leading to a past state of exhaustion — had been studying.",
        ),
        fill(
            "en-d-ppc-past-r2",
            "Вставте had або has.",
            "Insert had or has.",
            "They ___ been waiting for an hour when the doors opened.",
            ["had", "Had"],
        ),
        mcq(
            "en-d-ppc-past-r3",
            "Яке речення описує одночасність, а не «процес до минулої точки»?",
            "Which sentence describes simultaneity, not “a process up to a past point”?",
            [
                "He was reading when I entered.",
                "He had been reading for two hours when I entered.",
                "He had been waiting for two hours when I entered.",
                "I was tired because I had been reading all day.",
            ],
            0,
            "was reading when I entered — дві дії в той самий минулий момент.",
            "was reading when I entered is two actions at the same past moment.",
        ),
        translate(
            "en-d-ppc-past-r4",
            "Перекладіть Past Perfect Continuous.",
            "Translate with the Past Perfect Continuous.",
            "Він чекав годину, коли автобус нарешті приїхав.",
            [
                "He had been waiting for an hour when the bus finally arrived",
                "He'd been waiting for an hour when the bus finally arrived",
                "He had been waiting for an hour when the bus finally came",
                "He'd been waiting for an hour when the bus finally came",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-ppc-past",
        "Що описує Past Perfect Continuous і як його утворити? Чим він відрізняється від Past Continuous (was reading when I entered)?",
        "What does Past Perfect Continuous describe and how is it formed? How is it different from Past Continuous (was reading when I entered)?",
        [
            idea("форма", "form", "had been", "ing", "-ing"),
            idea("до моменту", "up to a moment", "before", "when", "hour", "годин", "until", "до"),
            idea("не одночасність", "not simultaneity", "was reading", "simultan", "одночас", "entered", "continuous"),
        ],
        "Past Perfect Continuous має форму had been і дієслово з -ing. Він описує процес, який тривав до певного минулого моменту, наприклад he had been waiting for an hour. Past Continuous на кшталт was reading when I entered показує одночасність, а не раніший процес.",
        "Past Perfect Continuous is formed with had been and a verb with -ing. It describes a process that continued up to a past moment, for example he had been waiting for an hour. Past Continuous such as was reading when I entered shows simultaneity, not an earlier process.",
    ),
)

U2_L5 = teach(
    "en-d-narrative-mix",
    "Часи в оповіді: як обрати",
    "Narrative tenses: how to choose",
    4,
    "Мікс минулих часів у короткій історії",
    "A mix of past tenses in a short story",
    """Коротка англійська оповідь зазвичай тримається на чотирьох часах. Past Simple — кістяк подій: I walked in, I sat down, I ordered coffee. Past Continuous — фон і незавершені дії в той момент: People were talking. It was raining. Past Perfect — те, що сталося ще раніше: I realised I had left my wallet at home. Present Perfect у середині вчорашньої історії майже ніколи не потрібен.

Алгоритм: 1) намалюйте головну лінію в Past Simple; 2) додайте фон у Past Continuous; 3) якщо треба «заглянути ще раніше» — Past Perfect (іноді Continuous). Не стрибайте в present, якщо історія вже в минулому, окрім прямої мови: She said, “I'm tired.”

Типові помилки: увесь текст у Past Perfect; Present Perfect із yesterday; фон у Past Simple там, де дія ще тривала (When I arrived, they watched TV замість they were watching TV). Перечитайте історію і позначте три шари: лінія, фон, раніше.""",
    """A short English narrative usually rests on four tense choices. Past Simple is the backbone of events: I walked in, I sat down, I ordered coffee. Past Continuous is the background and actions in progress at that moment: People were talking. It was raining. Past Perfect is what happened even earlier: I realised I had left my wallet at home. Present Perfect is almost never needed in the middle of a yesterday-story.

A method: 1) draw the main line in Past Simple; 2) add background in Past Continuous; 3) if you must “look further back”, use Past Perfect (sometimes Continuous). Do not jump to a present tense if the story is already in the past, except in direct speech: She said, “I'm tired.”

Typical mistakes: writing the whole text in Past Perfect; Present Perfect with yesterday; Past Simple for background that was still in progress (When I arrived, they watched TV instead of they were watching TV). Reread the story and mark three layers: main line, background, earlier.""",
    [
        "Past Simple — лінія подій",
        "Past Continuous — фон і процес у той момент",
        "Past Perfect — ще раніше від лінії",
        "Present Perfect не для вчорашньої оповіді",
    ],
    [
        "Past Simple is the event line",
        "Past Continuous is background and process at that moment",
        "Past Perfect is earlier than the event line",
        "Present Perfect is not for a yesterday narrative",
    ],
    [
        mcq(
            "en-d-narrative-mix-r1",
            "Оберіть найприродніший варіант.",
            "Choose the most natural option.",
            [
                "When I arrived, they were watching TV. I sat down. Then I realised I had left my phone on the bus.",
                "When I have arrived, they have been watching TV. I have sat down.",
                "When I had arrived, they had been watching TV, I had sat down, I had realised.",
                "When I arrive, they watched TV and I have left my phone.",
            ],
            0,
            "Лінія — arrived, sat; фон — were watching; раніше — had left.",
            "Event line: arrived, sat; background: were watching; earlier: had left.",
        ),
        match(
            "en-d-narrative-mix-r2",
            "Зіставте шар оповіді з часом.",
            "Match each narrative layer with a tense.",
            [
                ("I ordered coffee and sat down.", "Past Simple — лінія подій / event line"),
                ("It was raining and people were talking.", "Past Continuous — фон / background"),
                ("I realised I had left my wallet at home.", "Past Perfect — ще раніше / earlier past"),
            ],
        ),
        fill(
            "en-d-narrative-mix-r3",
            "Вставте were або had.",
            "Insert were or had.",
            "When I opened the door, they ___ still discussing the bug.",
            ["were", "Were"],
        ),
        mcq(
            "en-d-narrative-mix-r4",
            "Чому в оповіді про вчора майже немає Present Perfect?",
            "Why is there almost no Present Perfect in a story about yesterday?",
            [
                "Бо історія замкнена в закінченому минулому, а Present Perfect зв'язує подію з теперішнім.",
                "Бо Present Perfect заборонений у художніх текстах взагалі.",
                "Бо в англійській немає Present Perfect.",
                "Бо yesterday завжди вимагає Future Perfect.",
            ],
            0,
            "Present Perfect тримає зв'язок із зараз; вчорашня оповідь цього не робить.",
            "Present Perfect keeps a link to now; a yesterday story does not.",
            [
                "Because the story is locked in a finished past, while Present Perfect links an event to the present.",
                "Because Present Perfect is banned in all fiction.",
                "Because English has no Present Perfect.",
                "Because yesterday always requires Future Perfect.",
            ],
        ),
    ],
    _ex(
        "en-d-narrative-mix",
        "Опишіть три шари оповіді: лінія подій, фон і «ще раніше». Які часи для них?",
        "Describe the three layers of a narrative: the event line, the background, and “even earlier”. Which tenses do they take?",
        [
            idea("лінія", "event line", "past simple", "simple", "лінія", "event", "ordered", "sat"),
            idea("фон", "background", "continuous", "фон", "background", "raining", "watching"),
            idea("раніше", "earlier", "past perfect", "had", "earlier", "раніш", "left"),
        ],
        "Лінія подій іде в Past Simple, наприклад I ordered coffee. Фон — Past Continuous, it was raining. Те, що сталося ще раніше, бере Past Perfect: I realised I had left my wallet.",
        "The event line is Past Simple, for example I ordered coffee. The background is Past Continuous, it was raining. What happened even earlier takes Past Perfect: I realised I had left my wallet.",
    ),
)

U2_EXAM = exam_lesson(
    "en-deep-perfect-plus-exam",
    "Контрольна: Perfect Continuous і Past Perfect",
    "Exam: Perfect Continuous and Past Perfect",
    4,
    [
        mcq(
            "en-deep-perfect-plus-exam-q1",
            "How long ___ you ___ English?",
            "How long ___ you ___ English?",
            ["have / been studying", "has / been studying", "have / study", "are / studying"],
            0,
            "How long + Present Perfect Continuous: have you been studying.",
            "How long + Present Perfect Continuous: have you been studying.",
        ),
        mcq(
            "en-deep-perfect-plus-exam-q2",
            "Звіт готовий. Яка форма?",
            "The report is finished. Which form?",
            ["I have written the report.", "I have been writing the report (unfinished).", "I have been written the report.", "I had been write the report."],
            0,
            "Готовий результат — have written.",
            "A finished result is have written.",
        ),
        mcq(
            "en-deep-perfect-plus-exam-q3",
            "When I arrived, the meeting ___ already ___.",
            "When I arrived, the meeting ___ already ___.",
            ["had / started", "has / started", "have / started", "was / start"],
            0,
            "Раніше від минулого приходу — had started.",
            "Earlier than the past arrival — had started.",
        ),
        mcq(
            "en-deep-perfect-plus-exam-q4",
            "She was tired because she ___ all day.",
            "She was tired because she ___ all day.",
            ["had been driving", "has been driving", "was been driving", "had driving"],
            0,
            "Процес до минулого стану — had been driving.",
            "A process leading to a past state — had been driving.",
        ),
        fill(
            "en-deep-perfect-plus-exam-q5",
            "Вставте known або been knowing.",
            "Insert known or been knowing.",
            "I have ___ her for ten years.",
            ["known", "Known"],
        ),
    ],
)

UNIT_2 = unit(
    "en-deep-perfect-plus",
    "Perfect Continuous і минуле до минулого",
    "Perfect Continuous and the past-in-the-past",
    [U2_L1, U2_L2, U2_L3, U2_L4, U2_L5, U2_EXAM],
)


# ---------------------------------------------------------------------------
# Unit 3 — Past storytelling
# ---------------------------------------------------------------------------

U3_L1 = teach(
    "en-d-past-cont",
    "Past Continuous: дія в процесі",
    "Past Continuous: an action in progress",
    2,
    "was/were + V-ing",
    "was/were + V-ing",
    """Past Continuous: was (I, he, she, it) або were (you, we, they) + дієслово з -ing. I was cooking at seven. They were discussing the bug. Час малює «кадр»: дія вже почалася, ще не закінчилась у той минулий момент.

В українській часто досить минулого («я готував о сьомій»), тож форму легко забути. Питання: What were you doing at seven? Заперечення: I wasn't sleeping. Станні дієслова знову рідко йдуть у Continuous: не *I was knowing the answer, а I knew the answer.

Past Continuous також описує тимчасові ситуації в минулому (I was living in Kyiv that summer) і ввічливі запитання: I was wondering if you could help. Не використовуйте його як основну лінію завершених подій: *Yesterday I was getting up, I was having breakfast, I was going to work — для послідовності потрібен Past Simple.""",
    """Past Continuous is was (I, he, she, it) or were (you, we, they) plus verb-ing. I was cooking at seven. They were discussing the bug. The tense paints a “still”: the action had started and had not finished at that past moment.

Ukrainian often uses a simple past (“I was cooking at seven”), so the form is easy to forget. Questions: What were you doing at seven? Negatives: I wasn't sleeping. Stative verbs again rarely take Continuous: not *I was knowing the answer, but I knew the answer.

Past Continuous also describes temporary past situations (I was living in Kyiv that summer) and polite enquiries: I was wondering if you could help. Do not use it as the main line of completed events: *Yesterday I was getting up, I was having breakfast, I was going to work — a sequence needs Past Simple.""",
    [
        "was/were + V-ing: дія в процесі в минулий момент",
        "was — I/he/she/it; were — you/we/they",
        "Станні дієслова — зазвичай Past Simple",
        "Не розповідати всю вчорашню послідовність у Continuous",
    ],
    [
        "was/were + V-ing: an action in progress at a past moment",
        "was for I/he/she/it; were for you/we/they",
        "Stative verbs usually take Past Simple",
        "Do not tell a whole yesterday-sequence in Continuous",
    ],
    [
        mcq(
            "en-d-past-cont-r1",
            "Оберіть правильне: At seven I ___ dinner.",
            "Choose the correct option: At seven I ___ dinner.",
            ["was cooking", "were cooking", "am cooking", "have cooking"],
            0,
            "Підмет I бере was + cooking.",
            "The subject I takes was + cooking.",
        ),
        fill(
            "en-d-past-cont-r2",
            "Вставте was або were.",
            "Insert was or were.",
            "What ___ you doing when she called?",
            ["were", "Were"],
        ),
        translate(
            "en-d-past-cont-r3",
            "Перекладіть Past Continuous.",
            "Translate with the Past Continuous.",
            "О восьмій вони обговорювали баг.",
            [
                "At eight they were discussing the bug",
                "They were discussing the bug at eight",
                "At 8 they were discussing the bug",
                "They were discussing the bug at 8",
                "At eight o'clock they were discussing the bug",
                "They were discussing the bug at eight o'clock",
            ],
            "uk_en",
        ),
        mcq(
            "en-d-past-cont-r4",
            "Яке речення неправильне?",
            "Which sentence is wrong?",
            [
                "I was knowing the answer at that moment.",
                "I knew the answer at that moment.",
                "I was cooking at seven.",
                "They were discussing the bug.",
            ],
            0,
            "know — станне, тому не was knowing.",
            "know is stative, so not was knowing.",
        ),
    ],
    _ex(
        "en-d-past-cont",
        "Як утворюється Past Continuous і що він описує? Чому ним не можна розповісти всю послідовність вчорашнього дня?",
        "How is Past Continuous formed and what does it describe? Why can't you tell a whole yesterday-sequence with it?",
        [
            idea("форма", "form", "was", "were", "ing", "-ing"),
            idea("процес", "in progress", "progress", "процес", "момент", "moment", "seven"),
            idea("не послідовність", "not a sequence", "simple", "sequence", "послідов", "yesterday", "getting up"),
        ],
        "Past Continuous утворюється з was або were і дієсловом з -ing. Він описує дію в процесі в певний минулий момент. Усю послідовність вчорашнього дня розповідають Past Simple, а не Continuous.",
        "Past Continuous is formed with was or were and a verb with -ing. It describes an action in progress at a past moment. A whole yesterday sequence is told in Past Simple, not in Continuous.",
    ),
)

U3_L2 = teach(
    "en-d-ps-vs-pc",
    "Past Simple і Past Continuous разом",
    "Past Simple and Past Continuous together",
    2,
    "Переривання і фон",
    "Interruption and background",
    """Класична пара: I was taking a shower when the phone rang. Тривала дія (Continuous) і коротке переривання (Simple). When I entered, they were still arguing — фон триває, вхід — точка на лінії.

Схеми: 1) довший процес + коротка подія: She was crossing the street when she saw her friend. 2) два паралельні процеси: I was cooking while he was setting the table. 3) проста послідовність без фону: I entered, I sat down, I opened the laptop — лише Simple.

Типова помилка: поміняти часи місцями (*The phone was ringing when I was picking it up задумом «телефон задзвонив» — якщо це коротка подія, досить The phone rang while I was cooking). Інша: When I arrived, they had dinner замість they were having dinner, якщо вечеря ще тривала. Дивіться, що є «точкою», а що — «стрічкою».""",
    """The classic pair is I was taking a shower when the phone rang. A longer action (Continuous) and a short interruption (Simple). When I entered, they were still arguing — the background continues; the entrance is a point on the event line.

Patterns: 1) a longer process plus a short event: She was crossing the street when she saw her friend. 2) two parallel processes: I was cooking while he was setting the table. 3) a plain sequence with no background: I entered, I sat down, I opened the laptop — Simple only.

A typical mistake is swapping the tenses (*The phone was ringing when I was picking it up meant as “the phone rang” — if it is a short event, The phone rang while I was cooking is enough). Another: When I arrived, they had dinner instead of they were having dinner if dinner was still in progress. Decide what is a “point” and what is a “ribbon”.""",
    [
        "Continuous — стрічка; Simple — точка-переривання",
        "while часто з'єднує два процеси",
        "Чиста послідовність подій — Past Simple",
        "Не міняти часи місцями без причини",
    ],
    [
        "Continuous is the ribbon; Simple is the interrupting point",
        "while often joins two processes",
        "A plain sequence of events is Past Simple",
        "Do not swap the tenses without a reason",
    ],
    [
        mcq(
            "en-d-ps-vs-pc-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "I was taking a shower when the phone rang.",
                "I took a shower when the phone was ringing and that is the only possible story.",
                "I was taking a shower when the phone was ring.",
                "I have been taking a shower when the phone rings.",
            ],
            0,
            "Процес — was taking; коротка подія — rang.",
            "The process is was taking; the short event is rang.",
        ),
        fill(
            "en-d-ps-vs-pc-r2",
            "Вставте rang або was ringing (одне з двох як головну коротку подію).",
            "Insert rang or was ringing (one of them as the short main event).",
            "The phone ___ while I was cooking.",
            ["rang", "Rang"],
        ),
        translate(
            "en-d-ps-vs-pc-r3",
            "Перекладіть, показавши фон і переривання.",
            "Translate, showing background and interruption.",
            "Я писав лист, коли вона зайшла.",
            [
                "I was writing an email when she came in",
                "I was writing a letter when she came in",
                "I was writing an email when she entered",
                "I was writing a letter when she entered",
                "I was writing an email when she walked in",
            ],
            "uk_en",
        ),
        mcq(
            "en-d-ps-vs-pc-r4",
            "Яке речення — паралельні процеси?",
            "Which sentence is two parallel processes?",
            [
                "I was cooking while he was setting the table.",
                "I cooked, he set the table, then we ate — only points in a sequence.",
                "The phone rang. I picked it up.",
                "I have cooked while he sets the table.",
            ],
            0,
            "was cooking while was setting — два фони одночасно.",
            "was cooking while was setting is two backgrounds at once.",
        ),
    ],
    _ex(
        "en-d-ps-vs-pc",
        "Як Past Continuous і Past Simple працюють у парі «процес + переривання»? Наведіть роль while.",
        "How do Past Continuous and Past Simple work as a “process + interruption” pair? Mention the role of while.",
        [
            idea("процес", "process", "continuous", "was", "процес", "shower", "ribbon", "стріч"),
            idea("переривання", "interruption", "rang", "simple", "перерив", "interruption", "phone"),
            idea("while", "while", "while", "parallel", "паралел", "two"),
        ],
        "Past Continuous малює процес, наприклад I was taking a shower, а Past Simple — коротке переривання: the phone rang. While часто з'єднує два паралельні процеси в Continuous.",
        "Past Continuous paints the process, for example I was taking a shower, and Past Simple is the short interruption: the phone rang. While often joins two parallel processes in Continuous.",
    ),
)

U3_L3 = teach(
    "en-d-when-while",
    "when і while у минулому",
    "when and while in the past",
    2,
    "Сполучники часу",
    "Time conjunctions",
    """when може стояти і з короткою подією, і з процесом: When I arrived (точка), When I was living in Kyiv (період). while майже завжди вводить процес: While I was waiting, I read a book. as теж може вводити одночасний процес: As I was leaving, it started to rain.

Після when, while, as, before, after, until, as soon as у значенні часу англійська НЕ ставить will і зазвичай не ставить would: When he arrived, we started — не *When he would arrive. Це окрема пастка, якщо ви думаєте про майбутнє (When he arrives, we will start — present у підрядному).

Кома: якщо підрядне на початку, після нього часто кома: While I was waiting, I read. Якщо підрядне в кінці, кома не обов'язкова: I read while I was waiting. Не пишіть *during I was waiting — during потребує іменника (during the meeting), для процесу — while.""",
    """when can take either a short event or a process: When I arrived (a point), When I was living in Kyiv (a period). while almost always introduces a process: While I was waiting, I read a book. as can also introduce a simultaneous process: As I was leaving, it started to rain.

After when, while, as, before, after, until, as soon as in a time meaning, English does NOT use will and usually does not use would: When he arrived, we started — not *When he would arrive. This is a separate trap when you talk about the future (When he arrives, we will start — a present tense in the time clause).

Comma: if the clause comes first, a comma is common: While I was waiting, I read. If it comes last, a comma is optional: I read while I was waiting. Do not write *during I was waiting — during takes a noun (during the meeting); for a process use while.""",
    [
        "while + процес; when — і точка, і процес",
        "after when/while у часовому значенні немає will",
        "during + іменник, while + речення",
        "Підрядне на початку часто з комою",
    ],
    [
        "while plus a process; when can be a point or a process",
        "No will after when/while in a time meaning",
        "during plus a noun; while plus a clause",
        "A clause at the start often takes a comma",
    ],
    [
        mcq(
            "en-d-when-while-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "While I was waiting, I read a book.",
                "During I was waiting, I read a book.",
                "While I waiting, I read a book.",
                "During I waited a book I read.",
            ],
            0,
            "while + речення в процесі; during іменник не замінює.",
            "while takes a clause in progress; during cannot replace it.",
        ),
        fill(
            "en-d-when-while-r2",
            "Вставте when або during.",
            "Insert when or during.",
            "The lights went out ___ the meeting.",
            ["during", "During"],
        ),
        mcq(
            "en-d-when-while-r3",
            "Яке речення про майбутнє правильне?",
            "Which sentence about the future is correct?",
            [
                "When he arrives, we will start.",
                "When he will arrive, we will start.",
                "When he would arrive, we will start.",
                "When he arriving, we will start.",
            ],
            0,
            "У часовому підрядному — present (arrives), не will.",
            "A time clause takes a present (arrives), not will.",
        ),
        translate(
            "en-d-when-while-r4",
            "Перекладіть, почавши з While.",
            "Translate, starting with While.",
            "Поки я чекав, я читав книгу.",
            [
                "While I was waiting, I read a book",
                "While I was waiting I read a book",
                "While I was waiting, I was reading a book",
                "While I was waiting I was reading a book",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-when-while",
        "Чим while відрізняється від during і чому після when у часовому значенні немає will?",
        "How is while different from during, and why is there no will after when in a time meaning?",
        [
            idea("while", "while", "while", "процес", "process", "clause", "речен"),
            idea("during", "during", "during", "іменник", "noun", "meeting"),
            idea("без will", "no will", "will", "arrives", "present", "теперішн"),
        ],
        "While вводить речення-процес, а during — іменник, наприклад during the meeting. Після when у часовому значенні will не ставлять: When he arrives, we will start.",
        "While introduces a process clause, while during takes a noun, for example during the meeting. After when in a time meaning we do not use will: When he arrives, we will start.",
    ),
)

U3_L4 = teach(
    "en-d-used-to",
    "used to: минулі звички і стани",
    "used to: past habits and states",
    2,
    "Раніше було так, зараз інакше",
    "It used to be true, and now it is not",
    """used to + інфінітив описує те, що регулярно було правдою в минулому, а тепер ні: I used to play football every weekend (більше не граю). She used to live in Odesa. I used to be shy. Це і звички, і стани (be, have, live).

Форма: used to в твердженні; у запереченні didn't use to (без -d): I didn't use to like coffee. У питанні: Did you use to wear glasses? Типова помилка: *I didn't used to і *Did you used to — після did форма гола: use. Інша помилка: плутати з be used to (бути звиклі до) і get used to (звикати) — це вже інша конструкція з -ing: I am used to getting up early.

used to не ставлять для одноразової минулої дії (*I used to go to the dentist yesterday). Для цього — Past Simple. Якщо звичка ще жива — Present Simple: I play football every weekend, не used to.""",
    """used to + infinitive describes something that was regularly true in the past and is not true now: I used to play football every weekend (I no longer do). She used to live in Odesa. I used to be shy. It covers both habits and states (be, have, live).

The form is used to in statements; the negative is didn't use to (no -d): I didn't use to like coffee. Questions: Did you use to wear glasses? A typical mistake is *I didn't used to and *Did you used to — after did the form is bare: use. Another mistake is confusing this with be used to (be accustomed to) and get used to (become accustomed), which take -ing: I am used to getting up early.

Do not use used to for a one-off past action (*I used to go to the dentist yesterday). That is Past Simple. If the habit is still alive, use Present Simple: I play football every weekend, not used to.""",
    [
        "used to + інфінітив: минула звичка або стан, якого вже немає",
        "Заперечення і питання: didn't use to / Did you use to (без -d)",
        "Не плутати з be used to / get used to + -ing",
        "Не для одноразової дії вчора",
    ],
    [
        "used to + infinitive: a past habit or state that is no longer true",
        "Negatives and questions: didn't use to / Did you use to (no -d)",
        "Do not confuse it with be used to / get used to + -ing",
        "Not for a one-off action yesterday",
    ],
    [
        mcq(
            "en-d-used-to-r1",
            "Оберіть правильне заперечення.",
            "Choose the correct negative.",
            [
                "I didn't use to like coffee.",
                "I didn't used to like coffee.",
                "I wasn't use to like coffee.",
                "I don't used to like coffee.",
            ],
            0,
            "Після didn't — use to без -d.",
            "After didn't we use use to without -d.",
        ),
        fill(
            "en-d-used-to-r2",
            "Вставте use або used.",
            "Insert use or used.",
            "Did you ___ to live in Lviv?",
            ["use", "Use"],
        ),
        mcq(
            "en-d-used-to-r3",
            "Яке речення про звичку, яка ЩЕ жива?",
            "Which sentence is about a habit that is STILL alive?",
            [
                "I play football every weekend.",
                "I used to play football every weekend (but I stopped).",
                "I didn't use to play football, and that describes a current hobby.",
                "I am used to play football every weekend.",
            ],
            0,
            "Жива звичка — Present Simple: I play.",
            "A living habit is Present Simple: I play.",
        ),
        translate(
            "en-d-used-to-r4",
            "Перекладіть через used to.",
            "Translate with used to.",
            "Раніше вона жила в Одесі.",
            [
                "She used to live in Odesa",
                "She used to live in Odessa",
                "She used to live in Odesa.",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-used-to",
        "Що означає used to і як зробити заперечення? Чим це не те саме, що be used to?",
        "What does used to mean, and how do you make a negative? How is it not the same as be used to?",
        [
            idea("минала звичка", "past habit", "used to", "habit", "звичка", "past", "already", "більше"),
            idea("didn't use", "didn't use", "didn't", "use to", "did you use"),
            idea("be used to", "be used to", "be used", "ing", "-ing", "accustom", "звик"),
        ],
        "Used to описує минулу звичку або стан, якого вже немає. Заперечення — didn't use to без літери d. Be used to — це «бути звиклі» і після нього йде -ing, це інша конструкція.",
        "Used to describes a past habit or state that is no longer true. The negative is didn't use to without a d. Be used to means “be accustomed” and is followed by -ing: it is a different structure.",
    ),
)

U3_L5 = teach(
    "en-d-would-used",
    "would і used to: звички проти станів",
    "would and used to: habits versus states",
    3,
    "would не для I used to be shy",
    "would is not for I used to be shy",
    """would + інфінітив теж може описувати повторювані минулі дії, часто в оповіді: Every summer we would go to the sea. Grandmother would tell us stories. Відтінок — «ось так було тоді, знову і знову», трохи ностальгійний або оповідний.

Важливе обмеження: would НЕ вживають для минулих станів. Не можна *I would be shy, *She would live in Odesa, *I would have a dog у значенні звички-стану. Для станів — лише used to: I used to be shy. She used to live in Odesa. Для повторюваних дій можливі обидва: I used to / would play in the yard.

would тут не є ввічливим would like і не є умовним would. Контекст — минула оповідь. У запереченні used to природніше, ніж wouldn't, коли ви просто повідомляєте факт «раніше не робив». Не ставте would з конкретною одноразовою датою: *In 2019 I would go to Prague once.""",
    """would + infinitive can also describe repeated past actions, often in a story: Every summer we would go to the sea. Grandmother would tell us stories. The flavour is “that is how it was then, again and again”, slightly nostalgic or narrative.

An important limit: would is NOT used for past states. You cannot say *I would be shy, *She would live in Odesa, or *I would have a dog in the habit-state sense. For states, only used to works: I used to be shy. She used to live in Odesa. For repeated actions both are possible: I used to / would play in the yard.

This would is not polite would like and not conditional would. The context is a past narrative. In negatives, used to is more natural than wouldn't when you are simply stating “I didn't do that in the past”. Do not use would with a one-off date: *In 2019 I would go to Prague once.""",
    [
        "would — повторювані минулі ДІЇ в оповіді",
        "would не описує стани (be, live, have)",
        "Для станів — лише used to",
        "Не для одноразової дії з датою",
    ],
    [
        "would is for repeated past ACTIONS in a narrative",
        "would does not describe states (be, live, have)",
        "For states, only used to works",
        "Not for a one-off action with a date",
    ],
    [
        mcq(
            "en-d-would-used-r1",
            "Яке речення правильне?",
            "Which sentence is correct?",
            [
                "She used to live in Odesa.",
                "She would live in Odesa (as a past state).",
                "She would be a student in Odesa for four years, as a state.",
                "She would having a flat in Odesa.",
            ],
            0,
            "live як стан — лише used to, не would.",
            "live as a state takes only used to, not would.",
        ),
        mcq(
            "en-d-would-used-r2",
            "Оберіть природний оповідний варіант про повторювану дію.",
            "Choose the natural narrative option for a repeated action.",
            [
                "Every summer we would go to the sea.",
                "Every summer we would be at the sea as a state with would be only.",
                "In 2019 once we would go to the sea.",
                "We would went to the sea every summer.",
            ],
            0,
            "Повторювана дія в оповіді — would go.",
            "A repeated narrative action is would go.",
        ),
        fill(
            "en-d-would-used-r3",
            "Вставте used або would (одне слово; потрібен СТАН).",
            "Insert used or would (one word; a STATE is needed).",
            "I ___ to be very shy.",
            ["used", "Used"],
        ),
        translate(
            "en-d-would-used-r4",
            "Перекладіть. Це повторювана дія (можна would).",
            "Translate. This is a repeated action (would is possible).",
            "Щоліта ми ходили до моря.",
            [
                "Every summer we would go to the sea",
                "Every summer we used to go to the sea",
                "We would go to the sea every summer",
                "We used to go to the sea every summer",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-would-used",
        "Коли would і used to взаємозамінні, і чому не можна сказати I would be shy?",
        "When are would and used to interchangeable, and why can't you say I would be shy?",
        [
            idea("дії", "actions", "would", "action", "дію", "go", "play", "summer"),
            idea("стани", "states", "used to", "state", "стан", "be", "live", "shy"),
            idea("не would be", "not would be", "would be", "shy", "cannot", "не можн"),
        ],
        "Для повторюваних минулих дій можна сказати і would, і used to, наприклад we would go to the sea. Для станів на кшталт be shy підходить лише used to. Речення I would be shy у цьому значенні неправильне.",
        "For repeated past actions you can use either would or used to, for example we would go to the sea. For states such as be shy, only used to works. I would be shy is wrong in this meaning.",
    ),
)

U3_EXAM = exam_lesson(
    "en-deep-past-story-exam",
    "Контрольна: розповідь про минуле",
    "Exam: telling a story in the past",
    3,
    [
        mcq(
            "en-deep-past-story-exam-q1",
            "At seven I ___ dinner.",
            "At seven I ___ dinner.",
            ["was cooking", "were cooking", "have cooking", "am cooking"],
            0,
            "I + was cooking.",
            "I + was cooking.",
        ),
        mcq(
            "en-deep-past-story-exam-q2",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "I was taking a shower when the phone rang.",
                "I was taking a shower when the phone was ring.",
                "I have taken a shower when the phone rings.",
                "I taking a shower when the phone rang.",
            ],
            0,
            "Процес + коротка подія: was taking / rang.",
            "Process + short event: was taking / rang.",
        ),
        mcq(
            "en-deep-past-story-exam-q3",
            "Оберіть правильне заперечення.",
            "Choose the correct negative.",
            [
                "I didn't use to like coffee.",
                "I didn't used to like coffee.",
                "I don't used to like coffee.",
                "I wasn't used to like coffee (same meaning as didn't use to).",
            ],
            0,
            "didn't use to — без -d.",
            "didn't use to — no -d.",
        ),
        mcq(
            "en-deep-past-story-exam-q4",
            "Яке речення правильне для стану?",
            "Which sentence is correct for a state?",
            [
                "She used to live in Odesa.",
                "She would live in Odesa as a past state.",
                "She would be living in Odesa as the only way to say a state.",
                "She used live in Odesa.",
            ],
            0,
            "Стан live — used to, не would.",
            "The state live takes used to, not would.",
        ),
        fill(
            "en-deep-past-story-exam-q5",
            "Вставте while або during.",
            "Insert while or during.",
            "I made notes ___ I was waiting.",
            ["while", "While"],
        ),
    ],
)

UNIT_3 = unit(
    "en-deep-past-story",
    "Розповідь про минуле",
    "Telling a story in the past",
    [U3_L1, U3_L2, U3_L3, U3_L4, U3_L5, U3_EXAM],
)

# ---------------------------------------------------------------------------
# Unit 4 — Future forms
# ---------------------------------------------------------------------------

U4_L1 = teach(
    "en-d-will-going",
    "will і going to",
    "will and going to",
    2,
    "Рішення зараз проти наміру і прогнозу за ознаками",
    "A decision now versus intention and evidence",
    """will + інфінітив часто виражає рішення, прийняте в момент мовлення: The phone is ringing. I'll get it. Також обіцянки, пропозиції й чисті прогнози: I'll help you. I think it will rain. shall з I/we — більш формальне (Shall I open the window?).

going to + інфінітив — попередній намір (We're going to move house next year) або прогноз на основі того, що вже видно: Look at those clouds. It's going to rain. Українською обидва часто звучать як «я зроблю / буде дощ», тому вибір треба робити за ситуацією, не за дослівним перекладом.

Типові помилки: I will to go (*зайвий to); I going to (*без am/is/are); will для вже узгодженого плану з конкретним часом, де природніше going to або Present Continuous. У першому умовному після if немає will: If it rains, we will stay home — не *If it will rain.""",
    """will + infinitive often expresses a decision made at the moment of speaking: The phone is ringing. I'll get it. It also covers promises, offers, and plain predictions: I'll help you. I think it will rain. shall with I/we is more formal (Shall I open the window?).

going to + infinitive is a prior intention (We're going to move house next year) or a prediction based on evidence you can already see: Look at those clouds. It's going to rain. In Ukrainian both often sound like “I will do it / it will rain”, so you choose by situation, not by word-for-word translation.

Typical mistakes: I will to go (extra to); I going to (missing am/is/are); will for an already settled plan with a clear time, where going to or Present Continuous is more natural. In a first conditional there is no will after if: If it rains, we will stay home — not *If it will rain.""",
    [
        "will — рішення «зараз», обіцянка, чистий прогноз",
        "going to — намір заздалегідь або прогноз за видимими ознаками",
        "Після will немає to: I'll help, не *will to help",
        "Після if у 1-му умовному — present, не will",
    ],
    [
        "will is a “now” decision, a promise, or a plain prediction",
        "going to is a prior intention or a prediction from visible evidence",
        "No to after will: I'll help, not *will to help",
        "After if in the first conditional, use a present, not will",
    ],
    [
        mcq(
            "en-d-will-going-r1",
            "Телефон дзвонить. Рішення в моменті. Що сказати?",
            "The phone is ringing. A decision in the moment. What do you say?",
            ["I'll get it.", "I'm going to get it — I decided this last week.", "I will to get it.", "I getting it."],
            0,
            "Рішення зараз — will: I'll get it.",
            "A decision now takes will: I'll get it.",
        ),
        mcq(
            "en-d-will-going-r2",
            "Хмари чорні, дощ майже очевидний. Що природніше?",
            "The clouds are black; rain is almost obvious. Which is more natural?",
            [
                "It's going to rain.",
                "I will raining.",
                "It will to rain because I just decided the weather.",
                "It going rain.",
            ],
            0,
            "Прогноз за видимими ознаками — going to.",
            "A prediction from visible evidence is going to.",
        ),
        fill(
            "en-d-will-going-r3",
            "Вставте 'll або to.",
            "Insert 'll or to.",
            "It's cold in here. I ___ close the window.",
            ["'ll", "will", "Will"],
        ),
        translate(
            "en-d-will-going-r4",
            "Перекладіть. Це намір, вирішений раніше.",
            "Translate. This is an intention decided earlier.",
            "Ми збираємося переїхати наступного року.",
            [
                "We are going to move next year",
                "We're going to move next year",
                "We are going to move house next year",
                "We're going to move house next year",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-will-going",
        "Коли ви обираєте will, а коли going to? Згадайте рішення в моменті й хмари на небі.",
        "When do you choose will, and when going to? Mention a decision in the moment and clouds in the sky.",
        [
            idea("will", "will", "will", "i'll", "decision", "рішення", "promise", "обіцян"),
            idea("going to", "going to", "going to", "intention", "намір", "evidence", "ознак", "clouds", "хмари"),
            idea("без to після will", "no to after will", "will to", "infinitive", "інфінітив", "help"),
        ],
        "Will обираємо для рішення в моменті мовлення і для обіцянки, наприклад I'll get it. Going to — для наміру заздалегідь і для прогнозу за ознаками, коли видно хмари. Після will не ставлять to.",
        "We choose will for a decision at the moment of speaking and for a promise, for example I'll get it. Going to is for a prior intention and for a prediction from evidence, when we can see clouds. There is no to after will.",
    ),
)

U4_L2 = teach(
    "en-d-pres-fut",
    "Present Continuous для домовленостей",
    "Present Continuous for arrangements",
    2,
    "Що вже стоїть у календарі",
    "What is already in the calendar",
    """Present Continuous може говорити про майбутнє, коли є конкретна домовленість: I'm meeting the dentist at three. We're flying to Warsaw on Monday. Зазвичай є час, місце або інша «точка в календарі». Це не просто бажання — це вже узгоджено (квиток, запис, зустріч у календарі).

Порівняйте: I'm going to book a dentist (намір, ще не записався) і I'm seeing the dentist at three (запис уже є). I'm going to Warsaw someday — надто розмито для Continuous; потрібен going to або will. I'm living in Warsaw next year можливе, якщо переїзд уже організований.

Не кажіть *I meeting her tomorrow (немає am). Не плутайте з чистим теперішнім процесом: I'm meeting her зараз, у цю хвилину, якщо вона вже в кімнаті — тоді це не майбутнє, і контекст має це показувати. Для розкладу транспорту й афіш — наступний урок (Present Simple).""",
    """Present Continuous can talk about the future when there is a concrete arrangement: I'm meeting the dentist at three. We're flying to Warsaw on Monday. There is usually a time, a place, or another “calendar point”. This is not just a wish — it is already agreed (a ticket, an appointment, a calendar event).

Compare: I'm going to book a dentist (an intention; you have not booked yet) and I'm seeing the dentist at three (the appointment exists). I'm going to Warsaw someday is too vague for Continuous; use going to or will. I'm living in Warsaw next year is possible if the move is already organised.

Do not say *I meeting her tomorrow (missing am). Do not confuse this with a true present process: I'm meeting her right now, this minute, if she is already in the room — then it is not future, and context should make that clear. For transport timetables and programmes, the next lesson (Present Simple) is the right tool.""",
    [
        "Present Continuous — конкретна домовленість із часом/місцем",
        "going to — намір без підтвердженого запису",
        "Потрібна форма am/is/are",
        "Розмиті someday-плани — не Continuous",
    ],
    [
        "Present Continuous is a concrete arrangement with a time or place",
        "going to is an intention without a confirmed booking",
        "You still need am/is/are",
        "Vague someday-plans are not Continuous",
    ],
    [
        mcq(
            "en-d-pres-fut-r1",
            "Запис до стоматолога вже є на 15:00. Що природніше?",
            "The dentist appointment is already booked for 15:00. Which is more natural?",
            [
                "I'm seeing the dentist at three.",
                "I will seeing the dentist at three.",
                "I seeing the dentist at three.",
                "I see the dentist at three every day — that is the only reading.",
            ],
            0,
            "Конкретна домовленість — Present Continuous: I'm seeing.",
            "A concrete arrangement is Present Continuous: I'm seeing.",
        ),
        fill(
            "en-d-pres-fut-r2",
            "Вставте are або will.",
            "Insert are or will.",
            "We ___ flying to Warsaw on Monday — the tickets are booked.",
            ["are", "Are"],
        ),
        mcq(
            "en-d-pres-fut-r3",
            "Намір ще без квитка й дати. Що краще?",
            "An intention still without a ticket or a date. What is better?",
            [
                "I'm going to visit Warsaw someday.",
                "I'm visiting Warsaw someday.",
                "I visiting Warsaw someday.",
                "I will visiting Warsaw someday.",
            ],
            0,
            "Розмитий намір — going to, не Continuous.",
            "A vague intention is going to, not Continuous.",
        ),
        translate(
            "en-d-pres-fut-r4",
            "Перекладіть як домовленість у календарі.",
            "Translate as a calendar arrangement.",
            "Завтра о третій я зустрічаюся з Марією.",
            [
                "I'm meeting Maria at three tomorrow",
                "I am meeting Maria at three tomorrow",
                "Tomorrow at three I'm meeting Maria",
                "Tomorrow at three I am meeting Maria",
                "I'm meeting Maria tomorrow at three",
                "I am meeting Maria tomorrow at three",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-pres-fut",
        "Коли Present Continuous означає майбутнє? Чим це відрізняється від going to без запису в календарі?",
        "When does Present Continuous mean the future? How is that different from going to without a calendar booking?",
        [
            idea("домовленість", "arrangement", "arrangement", "домовлен", "calendar", "календар", "meeting", "booked"),
            idea("час", "time", "three", "monday", "tomorrow", "час", "time"),
            idea("going to", "going to", "going to", "intention", "намір", "someday"),
        ],
        "Present Continuous означає майбутнє, коли є конкретна домовленість у календарі, наприклад I'm meeting Maria at three. Going to описує намір, якщо запису чи квитка ще немає, наприклад I'm going to visit someday.",
        "Present Continuous means the future when there is a concrete arrangement in the calendar, for example I'm meeting Maria at three. Going to describes an intention when there is not yet a booking or a ticket, for example I'm going to visit someday.",
    ),
)

U4_L3 = teach(
    "en-d-timetable",
    "Present Simple для розкладу",
    "Present Simple for timetables",
    2,
    "Поїзди, літаки, афіші",
    "Trains, planes and programmes",
    """Present Simple описує майбутнє, коли подія входить у розклад або програму, незалежна від вашого особистого рішення: The train leaves at 6.30. The film starts at eight. The conference opens on 12 May. Це «так написано в розкладі».

Порівняйте: The train leaves at 6.30 (розклад) і I'm leaving at 6.30 (мій план / домовленість). We're going to leave around six (намір, ще не жорсткий). Для закладів: The supermarket closes at ten tonight — теж розклад.

Не ставте Present Simple для особистих разових планів без ідеї розкладу: *I start the meeting tomorrow at two звучить як пункт програми; для зустрічі, яку ви самі організували, природніше I'm starting / We're starting the meeting at two. У підрядних часу знову present: I'll call you when the train arrives.""",
    """Present Simple describes the future when the event belongs to a timetable or programme, independent of your personal decision: The train leaves at 6.30. The film starts at eight. The conference opens on 12 May. This is “what the schedule says”.

Compare: The train leaves at 6.30 (the timetable) and I'm leaving at 6.30 (my plan / arrangement). We're going to leave around six (an intention, not yet rigid). For places: The supermarket closes at ten tonight — also a schedule.

Do not use Present Simple for a personal one-off plan with no timetable idea: *I start the meeting tomorrow at two sounds like an item on a programme; for a meeting you yourself organised, I'm starting / We're starting the meeting at two is more natural. In time clauses, use a present again: I'll call you when the train arrives.""",
    [
        "Present Simple — розклад, афіша, програма",
        "Особиста домовленість — частіше Continuous",
        "The train leaves vs I'm leaving — різні погляди",
        "Після when у майбутньому — present, не will",
    ],
    [
        "Present Simple is a timetable, poster, or programme",
        "A personal arrangement is more often Continuous",
        "The train leaves vs I'm leaving are different views",
        "After when in the future, use a present, not will",
    ],
    [
        mcq(
            "en-d-timetable-r1",
            "Оберіть природне речення про розклад.",
            "Choose the natural timetable sentence.",
            [
                "The train leaves at 6.30.",
                "The train is leave at 6.30.",
                "The train will leaving at 6.30 as the only timetable form.",
                "The train leaving at 6.30.",
            ],
            0,
            "Розклад — Present Simple: leaves.",
            "A timetable takes Present Simple: leaves.",
        ),
        fill(
            "en-d-timetable-r2",
            "Вставте starts або is starting (розклад сеансу).",
            "Insert starts or is starting (a screening timetable).",
            "The film ___ at eight, according to the poster.",
            ["starts", "Starts"],
        ),
        mcq(
            "en-d-timetable-r3",
            "Ви самі організували зустріч команди на 14:00. Що природніше?",
            "You yourself organised a team meeting for 14:00. Which is more natural?",
            [
                "We're starting the meeting at two.",
                "The meeting start at two as if it were a public train.",
                "The meeting starting at two.",
                "We starting the meeting at two.",
            ],
            0,
            "Особиста домовленість — Continuous: we're starting.",
            "A personal arrangement is Continuous: we're starting.",
        ),
        translate(
            "en-d-timetable-r4",
            "Перекладіть як пункт розкладу.",
            "Translate as a timetable fact.",
            "Поїзд відправляється о пів на сьому.",
            [
                "The train leaves at 6.30",
                "The train leaves at half past six",
                "The train leaves at 6:30",
                "The train departs at 6.30",
                "The train departs at half past six",
                "The train departs at 6:30",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-timetable",
        "Коли майбутнє описують Present Simple? Чим The train leaves відрізняється від I'm leaving?",
        "When do we describe the future with Present Simple? How is The train leaves different from I'm leaving?",
        [
            idea("розклад", "timetable", "timetable", "розклад", "train", "поїзд", "poster", "афіш", "programme"),
            idea("leaves", "leaves", "leaves", "starts", "closes", "simple"),
            idea("особистий план", "personal plan", "i'm leaving", "leaving", "arrangement", "домовлен", "continuous"),
        ],
        "Present Simple для майбутнього — це розклад і афіша, наприклад the train leaves at 6.30. I'm leaving — це вже особиста домовленість або план, не пункт публічного розкладу.",
        "Present Simple for the future is a timetable or a poster, for example the train leaves at 6.30. I'm leaving is a personal arrangement or plan, not an item on a public timetable.",
    ),
)

U4_L4 = teach(
    "en-d-fut-cont",
    "Future Continuous",
    "Future Continuous",
    3,
    "will be + V-ing",
    "will be + V-ing",
    """Future Continuous: will be + V-ing. This time tomorrow I'll be sitting on a train. Don't call at nine — I'll be having a meeting. Час показує, що в певний майбутній момент дія буде в процесі, або що дія — звичайна частина майбутнього відрізка.

Ввічливий відтінок: Will you be using the meeting room at three? звучить м'якше, ніж Will you use…?, бо питає про вже запланований процес, не про рішення зараз. I'll be seeing Tom tomorrow може означати «це вже в розкладі, я з ним перетнуся».

Не ставте його замість простого will для одноразового рішення: *The phone is ringing. I'll be getting it — тут I'll get it. Станні дієслова рідко йдуть у Continuous: не *I'll be knowing the result. Для українськомовних форма нова, але логіка та сама, що в Past Continuous, лише про майбутнє.""",
    """Future Continuous is will be + V-ing. This time tomorrow I'll be sitting on a train. Don't call at nine — I'll be having a meeting. The tense shows that at a future moment the action will be in progress, or that the action is a normal part of a future period.

There is a polite flavour: Will you be using the meeting room at three? is softer than Will you use…?, because it asks about a process already expected, not about a decision now. I'll be seeing Tom tomorrow can mean “it's already in the plan; I will run into him”.

Do not use it in place of plain will for a one-off decision: *The phone is ringing. I'll be getting it — here I'll get it is right. Stative verbs rarely take Continuous: not *I'll be knowing the result. For Ukrainian speakers the form is new, but the logic is the same as Past Continuous, only about the future.""",
    [
        "will be + V-ing: дія в процесі в майбутній момент",
        "Ввічливі питання про запланований процес",
        "Не замінює I'll get it у рішенні зараз",
        "Станні дієслова — майже ніколи",
    ],
    [
        "will be + V-ing: an action in progress at a future moment",
        "Polite questions about an expected process",
        "It does not replace I'll get it for a decision now",
        "Stative verbs almost never take it",
    ],
    [
        mcq(
            "en-d-fut-cont-r1",
            "This time tomorrow I ___ on a train.",
            "This time tomorrow I ___ on a train.",
            ["will be sitting", "will sitting", "am be sitting", "will to sit"],
            0,
            "will be sitting — процес у майбутній момент.",
            "will be sitting is a process at a future moment.",
        ),
        fill(
            "en-d-fut-cont-r2",
            "Вставте be або been.",
            "Insert be or been.",
            "Don't call at nine — I will ___ having a meeting.",
            ["be", "Be"],
        ),
        mcq(
            "en-d-fut-cont-r3",
            "Телефон дзвонить. Рішення зараз. Що правильно?",
            "The phone is ringing. A decision now. Which is right?",
            [
                "I'll get it.",
                "I'll be getting it as the only natural choice.",
                "I will be get it.",
                "I be getting it.",
            ],
            0,
            "Рішення в моменті — I'll get it, не Future Continuous.",
            "A decision in the moment is I'll get it, not Future Continuous.",
        ),
        translate(
            "en-d-fut-cont-r4",
            "Перекладіть Future Continuous.",
            "Translate with the Future Continuous.",
            "Завтра о цій порі я буду сидіти в поїзді.",
            [
                "This time tomorrow I'll be sitting on a train",
                "This time tomorrow I will be sitting on a train",
                "This time tomorrow I'll be sitting in a train",
                "This time tomorrow I will be sitting in a train",
                "Tomorrow at this time I'll be sitting on a train",
                "Tomorrow at this time I will be sitting on a train",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-fut-cont",
        "Що описує Future Continuous і чому Will you be using the room? звучить ввічливіше? Коли його не ставити?",
        "What does Future Continuous describe, and why does Will you be using the room? sound more polite? When should you not use it?",
        [
            idea("процес у майбутньому", "future process", "will be", "ing", "sitting", "процес", "tomorrow"),
            idea("ввічливість", "politeness", "polite", "ввічлив", "using", "room", "will you be"),
            idea("не рішення зараз", "not a now-decision", "i'll get", "get it", "рішення", "decision"),
        ],
        "Future Continuous має форму will be і дієслово з -ing і описує процес у майбутній момент, наприклад I'll be sitting on a train. Питання Will you be using the room звучить ввічливо, бо питає про очікуваний процес. Для рішення зараз кажемо I'll get it, не I'll be getting it.",
        "Future Continuous is will be plus a verb with -ing and describes a process at a future moment, for example I'll be sitting on a train. Will you be using the room sounds polite because it asks about an expected process. For a decision now we say I'll get it, not I'll be getting it.",
    ),
)

U4_L5 = teach(
    "en-d-fut-perf",
    "Future Perfect і Future Perfect Continuous",
    "Future Perfect and Future Perfect Continuous",
    4,
    "will have + V3 / will have been + V-ing",
    "will have + V3 / will have been + V-ing",
    """Future Perfect: will have + третя форма. By six I will have finished the report. Він називає дію, яка вже буде завершена до певної майбутньої точки. Маркер by (до, не пізніше) — найвірніший друг цього часу: by Friday, by the time you arrive, by 2030.

Future Perfect Continuous: will have been + V-ing — тривалість до майбутньої точки: By June I will have been working here for five years. Наголос на стажі / процесі, не на «готовому файлі».

Для українськомовних обидві форми звучать важко, бо ми часто скажемо просто «я закінчу до шостої». В англійській will finish at six — це момент закінчення близько шостої, а will have finished by six — «не пізніше шостої вже буде готово». Не плутайте by і until: until six може означати, що дія триває по шосту (I'll work until six). Після by the time в підрядному — present: By the time you arrive, I'll have left.""",
    """Future Perfect is will have + past participle. By six I will have finished the report. It names an action that will already be complete before a future point. The marker by (“not later than”) is this tense's best friend: by Friday, by the time you arrive, by 2030.

Future Perfect Continuous is will have been + V-ing — duration up to a future point: By June I will have been working here for five years. The focus is the length of service / the process, not a “finished file”.

Both forms feel heavy for Ukrainian speakers, because we often just say “I will finish by six”. In English, will finish at six is the finishing moment around six, while will have finished by six means “not later than six, it will already be done”. Do not confuse by and until: until six can mean the action continues up to six (I'll work until six). After by the time, the clause takes a present: By the time you arrive, I'll have left.""",
    [
        "will have + V3: вже буде готово до майбутньої точки",
        "Ключовий маркер — by (не пізніше)",
        "will have been + V-ing — стаж / тривалість до тієї точки",
        "by ≠ until; після by the time — present",
    ],
    [
        "will have + V3: it will already be done by a future point",
        "The key marker is by (not later than)",
        "will have been + V-ing is duration up to that point",
        "by is not until; after by the time use a present",
    ],
    [
        mcq(
            "en-d-fut-perf-r1",
            "Оберіть правильне: By six I ___ the report.",
            "Choose the correct option: By six I ___ the report.",
            ["will have finished", "will finished", "will have finish", "am having finished"],
            0,
            "До шостої вже буде готово — will have finished.",
            "It will already be done by six — will have finished.",
        ),
        fill(
            "en-d-fut-perf-r2",
            "Вставте by або until (потрібно «не пізніше»).",
            "Insert by or until (“not later than” is needed).",
            "Please send the file ___ Friday.",
            ["by", "By"],
        ),
        mcq(
            "en-d-fut-perf-r3",
            "Наголос на стажі до червня. Яка форма?",
            "The focus is length of service up to June. Which form?",
            [
                "By June I will have been working here for five years.",
                "By June I will have working here for five years.",
                "By June I will been working here for five years.",
                "By June I work here since five years.",
            ],
            0,
            "Тривалість до майбутньої точки — will have been working.",
            "Duration up to a future point is will have been working.",
        ),
        translate(
            "en-d-fut-perf-r4",
            "Перекладіть Future Perfect.",
            "Translate with the Future Perfect.",
            "До шостої я вже закінчу звіт.",
            [
                "By six I will have finished the report",
                "By six I'll have finished the report",
                "I will have finished the report by six",
                "I'll have finished the report by six",
                "By 6 I will have finished the report",
                "By 6 I'll have finished the report",
            ],
            "uk_en",
        ),
    ],
    _ex(
        "en-d-fut-perf",
        "Що означає Future Perfect і чому маркер by такий важливий? Чим will have finished відрізняється від I'll work until six?",
        "What does Future Perfect mean, and why is the marker by so important? How is will have finished different from I'll work until six?",
        [
            idea("will have", "will have", "will have", "finished", "perfect"),
            idea("by", "by", "by", "friday", "six", "не пізніш", "later"),
            idea("until", "until", "until", "триває", "continue", "work until"),
        ],
        "Future Perfect має форму will have і третю форму дієслова і означає, що дія вже буде закінчена до майбутньої точки. Маркер by означає «не пізніше». I'll work until six описує тривання по шосту, а не готовий результат до шостої.",
        "Future Perfect is will have plus a past participle and means the action will already be finished by a future point. The marker by means “not later than”. I'll work until six describes continuing up to six, not a finished result by six.",
    ),
)

U4_EXAM = exam_lesson(
    "en-deep-future-exam",
    "Контрольна: майбутні форми",
    "Exam: talking about the future",
    3,
    [
        mcq(
            "en-deep-future-exam-q1",
            "Телефон дзвонить. Що сказати?",
            "The phone is ringing. What do you say?",
            ["I'll get it.", "I will to get it.", "I going get it.", "I'll be get it."],
            0,
            "Рішення зараз — I'll get it.",
            "A decision now is I'll get it.",
        ),
        mcq(
            "en-deep-future-exam-q2",
            "Квитки вже куплені: виліт у понеділок. Що природніше?",
            "Tickets are already bought: you fly on Monday. Which is more natural?",
            [
                "We're flying to Warsaw on Monday.",
                "We flying to Warsaw on Monday.",
                "We will flying to Warsaw on Monday.",
                "We going flying to Warsaw on Monday.",
            ],
            0,
            "Домовленість у календарі — Present Continuous.",
            "A calendar arrangement is Present Continuous.",
        ),
        mcq(
            "en-deep-future-exam-q3",
            "Розклад: The film ___ at eight.",
            "Timetable: The film ___ at eight.",
            ["starts", "is start", "starting", "will starting"],
            0,
            "Афіша / розклад — Present Simple: starts.",
            "A poster / timetable is Present Simple: starts.",
        ),
        mcq(
            "en-deep-future-exam-q4",
            "This time tomorrow I ___ on a train.",
            "This time tomorrow I ___ on a train.",
            ["will be sitting", "will sitting", "will be sit", "am be sitting"],
            0,
            "Процес у майбутній момент — will be sitting.",
            "A process at a future moment is will be sitting.",
        ),
        fill(
            "en-deep-future-exam-q5",
            "Вставте have або be.",
            "Insert have or be.",
            "By six I will ___ finished the report.",
            ["have", "Have"],
        ),
    ],
)

UNIT_4 = unit(
    "en-deep-future",
    "Майбутні форми",
    "Talking about the future",
    [U4_L1, U4_L2, U4_L3, U4_L4, U4_L5, U4_EXAM],
)

UNITS = [UNIT_1, UNIT_2, UNIT_3, UNIT_4]
