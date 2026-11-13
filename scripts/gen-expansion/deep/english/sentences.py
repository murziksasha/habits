"""English deep part C: sentence craft (units 9–12)."""
from __future__ import annotations

from ._common import exam_lesson, ex, fill, idea, match, mcq, order_words, teach, translate, unit

U9_L1 = teach(
    "en-d-wish-pres",
    "I wish + Past Simple: зараз інакше",
    "I wish + Past Simple: a different present",
    4,
    "I wish I knew, I wish I were",
    "I wish I knew, I wish I were",
    """I wish + Past Simple описує ситуацію в ТЕПЕРІШНЬОМУ, яку ви хотіли б змінити: I wish I knew the answer (але не знаю). I wish I had more time. I wish we didn't have this bug. Час минулий за формою, значення — теперішнє нереальне. Це той самий «відступ у минуле», що в другому умовному.

З be традиційно I wish I were (I wish I were taller; I wish I were on holiday). I wish I was широко вживане в мовленні і теж приймається в багатьох контекстах; у тестах і акуратному письмі were безпечніший.

Не плутайте з I hope (реальне бажання про майбутнє, яке може здійснитися): I hope you pass the exam — не *I wish you pass. I wish you passed звучало б, ніби ви вважаєте успіх нереальним. Типова помилка: *I wish I know / *I wish I have — потрібна минула форма. Українське «шкода, що я не знаю» = I wish I knew.""",
    """I wish + Past Simple describes a PRESENT situation you would like to be different: I wish I knew the answer (but I don't). I wish I had more time. I wish we didn't have this bug. The form is past; the meaning is an unreal present. It is the same “step back into the past” as in the second conditional.

With be, the traditional form is I wish I were (I wish I were taller; I wish I were on holiday). I wish I was is widely used in speech and is accepted in many contexts; in tests and careful writing, were is safer.

Do not confuse this with I hope (a real wish about a future that may happen): I hope you pass the exam — not *I wish you pass. I wish you passed would sound as if you treat success as unreal. A typical mistake is *I wish I know / *I wish I have — you need a past form. Ukrainian “it's a pity I don't know” is I wish I knew.""",
    [
        "I wish + Past Simple = нереальне ТЕПЕРІШНЄ",
        "I wish I were — традиційна форма з be",
        "hope — реальне майбутнє; wish — шкода, що не так",
        "Не *I wish I know",
    ],
    [
        "I wish + Past Simple is an unreal PRESENT",
        "I wish I were is the traditional form with be",
        "hope is a real future; wish is “pity it is not so”",
        "Not *I wish I know",
    ],
    [
        mcq(
            "en-d-wish-pres-r1",
            "Ви не знаєте відповіді і шкодуєте про це зараз.",
            "You do not know the answer and you regret that now.",
            [
                "I wish I knew the answer.",
                "I wish I know the answer.",
                "I wish I have known the answer (for a present state).",
                "I hope I knew the answer, as a real future.",
            ],
            0,
            "Нереальне теперішнє — I wish I knew.",
            "An unreal present is I wish I knew.",
        ),
        fill(
            "en-d-wish-pres-r2",
            "Вставте were або be (акуратне письмо).",
            "Insert were or be (careful writing).",
            "I wish I ___ taller.",
            ["were", "Were", "was", "Was"],
        ),
        mcq(
            "en-d-wish-pres-r3",
            "Реальний іспит ще буде, і ви бажаєте успіху. Що сказати?",
            "A real exam is still ahead, and you want them to succeed. What do you say?",
            [
                "I hope you pass the exam.",
                "I wish you pass the exam.",
                "I wish you will pass the exam.",
                "I hope you passed, about a future exam.",
            ],
            0,
            "Реальне бажання про майбутнє — I hope you pass.",
            "A real wish about the future is I hope you pass.",
        ),
        translate(
            "en-d-wish-pres-r4",
            "Перекладіть через I wish.",
            "Translate with I wish.",
            "Шкода, що в мене немає більше часу.",
            [
                "I wish I had more time",
                "I wish I had more time.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wish-pres",
        "Що означає I wish I knew і чим wish відрізняється від hope? Яка форма дієслова після wish про теперішнє?",
        "What does I wish I knew mean, and how is wish different from hope? Which verb form follows wish about the present?",
        [
            idea("past form", "past form", "knew", "had", "were", "past", "минул"),
            idea("теперішнє", "present", "present", "теперішн", "now", "зараз", "unreal"),
            idea("hope", "hope", "hope", "pass", "real", "реальн"),
        ],
        "I wish I knew означає, що зараз я не знаю і шкодую про це: форма минула, значення теперішнє нереальне. Hope використовують для реального майбутнього, наприклад I hope you pass. Після wish про теперішнє стоїть Past Simple, не I wish I know.",
        "I wish I knew means that I do not know now and I regret it: the form is past, the meaning is an unreal present. Hope is for a real future, for example I hope you pass. After wish about the present we use Past Simple, not I wish I know.",
    ),
)

U9_L2 = teach(
    "en-d-wish-past",
    "I wish + Past Perfect: шкода про минуле",
    "I wish + Past Perfect: regret about the past",
    4,
    "I wish I had known",
    "I wish I had known",
    """I wish + Past Perfect (had + V3) — жаль про минуле, яке вже не змінити: I wish I had asked earlier. I wish we had written a test. I wish I hadn't sent that email. Це пара до третього умовного (If I had known, I would have…).

Не ставте Past Simple, якщо жаль саме про минулу подію: *I wish I asked yesterday у значенні «шкода, що вчора не запитав» — природніше I wish I had asked yesterday. I wish I asked більше схоже на регулярне теперішнє («шкода, що я (взагалі) не питаю»).

Короткі форми: I wish I'd known. I wish I hadn't said that. If only I had known — той самий час, сильніший емоційний тон (наступний урок). Типова помилка: *I wish I would have known — would have після wish у стандартній граматиці не ставлять для жалю про минуле (це часта розмовна калька).""",
    """I wish + Past Perfect (had + V3) is regret about a past that cannot be changed: I wish I had asked earlier. I wish we had written a test. I wish I hadn't sent that email. It is the partner of the third conditional (If I had known, I would have…).

Do not use Past Simple if the regret is about a past event: *I wish I asked yesterday meaning “pity I didn't ask yesterday” is more naturally I wish I had asked yesterday. I wish I asked is closer to a regular present (“pity I don't ask, as a habit”).

Short forms: I wish I'd known. I wish I hadn't said that. If only I had known uses the same tense with a stronger emotional tone (next lesson). A typical mistake is *I wish I would have known — standard grammar does not use would have after wish for past regret (it is a common spoken calque).""",
    [
        "I wish + had + V3 — жаль про минуле",
        "Пара до третього умовного",
        "Для вчорашньої події — had asked, не asked",
        "Не *I wish I would have known",
    ],
    [
        "I wish + had + V3 is regret about the past",
        "It partners the third conditional",
        "For yesterday's event use had asked, not asked",
        "Not *I wish I would have known",
    ],
    [
        mcq(
            "en-d-wish-past-r1",
            "Шкода, що раніше не запитали.",
            "Pity you didn't ask earlier.",
            [
                "I wish I had asked earlier.",
                "I wish I asked earlier, about a finished past event.",
                "I wish I would have asked earlier.",
                "I wish I have asked earlier.",
            ],
            0,
            "Жаль про минуле — I wish I had asked.",
            "Regret about the past is I wish I had asked.",
        ),
        fill(
            "en-d-wish-past-r2",
            "Вставте had або have.",
            "Insert had or have.",
            "I wish we ___ written a test.",
            ["had", "Had"],
        ),
        mcq(
            "en-d-wish-past-r3",
            "Оберіть правильне заперечення.",
            "Choose the correct negative.",
            [
                "I wish I hadn't sent that email.",
                "I wish I wouldn't have sent that email, in standard written grammar.",
                "I wish I haven't sent that email.",
                "I wish I didn't had sent that email.",
            ],
            0,
            "I wish I hadn't + V3.",
            "I wish I hadn't + V3.",
        ),
        translate(
            "en-d-wish-past-r4",
            "Перекладіть через I wish + Past Perfect.",
            "Translate with I wish + Past Perfect.",
            "Шкода, що я не знав про це вчора.",
            [
                "I wish I had known about this yesterday",
                "I wish I had known about it yesterday",
                "I wish I'd known about this yesterday",
                "I wish I'd known about it yesterday",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wish-past",
        "Як виразити жаль про минуле з wish? Чому *I wish I would have known вважають помилкою в стандартній граматиці?",
        "How do you express regret about the past with wish? Why is *I wish I would have known treated as wrong in standard grammar?",
        [
            idea("had + V3", "had + V3", "had", "asked", "written", "known", "past perfect"),
            idea("минуле", "past", "past", "yesterday", "минул", "regret", "жаль"),
            idea("не would have", "not would have", "would have", "standard", "стандартн"),
        ],
        "Жаль про минуле виражають як I wish і Past Perfect: I wish I had asked earlier. Це пара до третього умовного. У стандартній граматиці після wish не ставлять would have, тож I wish I would have known — помилка.",
        "Regret about the past is I wish plus Past Perfect: I wish I had asked earlier. It partners the third conditional. In standard grammar we do not put would have after wish, so I wish I would have known is wrong.",
    ),
)

U9_L3 = teach(
    "en-d-wish-would",
    "I wish you would: поведінка й роздратування",
    "I wish you would: behaviour and annoyance",
    4,
    "Попросіть, щоб щось змінилось",
    "Asking for a change",
    """I wish + would описує бажану зміну в чиїйсь поведінці або в ситуації, на яку ви скаржитесь: I wish you would listen. I wish it would stop raining. I wish they would review the PR. Часто є відтінок роздратування: «ну чому вони цього не зроблять?».

Не ставте I wish I would про власну звичку, яку ви самі контролюєте: *I wish I would study more — краще I wish I studied more або I wish I could study more (якщо бракує можливості). would тут спрямоване назовні, не на власну контрольовану дію.

Порівняйте три wish: I wish you listened (загалом, як риса / теперішній стан) проти I wish you would listen (зробіть це, будь ласка / припиніть ігнорувати). I wish you had listened — уже про минулий випадок. Типова помилка — усе зводити до would.""",
    """I wish + would describes a change you want in someone's behaviour, or in a situation you are complaining about: I wish you would listen. I wish it would stop raining. I wish they would review the PR. There is often a flavour of annoyance: “why won't they do this?”

Do not use I wish I would about a habit you yourself control: *I wish I would study more — prefer I wish I studied more, or I wish I could study more (if the possibility is missing). This would points outward, not at your own controlled action.

Compare the three wishes: I wish you listened (in general, as a trait / present state) versus I wish you would listen (please do this / stop ignoring me). I wish you had listened is already about a past occasion. A typical mistake is reducing everything to would.""",
    [
        "I wish + would — зміна поведінки або нарікання на ситуацію",
        "Часто є роздратування",
        "Не *I wish I would study (власна контрольована дія)",
        "had listened — минуле; listened — стан; would listen — «зробіть»",
    ],
    [
        "I wish + would is a change of behaviour or a complaint about a situation",
        "There is often annoyance",
        "Not *I wish I would study (your own controlled action)",
        "had listened is the past; listened is a state; would listen is “please do it”",
    ],
    [
        mcq(
            "en-d-wish-would-r1",
            "Ви роздратовані: колега не слухає.",
            "You are annoyed: a colleague is not listening.",
            [
                "I wish you would listen.",
                "I wish I would listen, about your colleague.",
                "I wish you listen.",
                "I wish you will listen.",
            ],
            0,
            "Зміна чужої поведінки — I wish you would listen.",
            "A change in someone else's behaviour is I wish you would listen.",
        ),
        fill(
            "en-d-wish-would-r2",
            "Вставте would або had (потрібна скарга на дощ зараз).",
            "Insert would or had (a complaint about the rain now is needed).",
            "I wish it ___ stop raining.",
            ["would", "Would"],
        ),
        mcq(
            "en-d-wish-would-r3",
            "Ви хочете самі більше вчитися (власна звичка). Що краще?",
            "You want to study more yourself (your own habit). Which is better?",
            [
                "I wish I studied more.",
                "I wish I would study more, as the most standard choice for your own habit.",
                "I wish I will study more.",
                "I wish I study more.",
            ],
            0,
            "Власна звичка — I wish I studied, не I wish I would.",
            "Your own habit is I wish I studied, not I wish I would.",
        ),
        translate(
            "en-d-wish-would-r4",
            "Перекладіть зі wish + would.",
            "Translate with wish + would.",
            "Хоч би вони вже переглянули цей PR.",
            [
                "I wish they would review the PR",
                "I wish they would review this PR",
                "I wish they would review the pull request",
                "I wish they'd review the PR",
                "I wish they'd review this PR",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wish-would",
        "Коли після wish ставлять would? Чому *I wish I would study вважають невдалим для власної звички?",
        "When do we put would after wish? Why is *I wish I would study a poor choice for your own habit?",
        [
            idea("поведінка", "behaviour", "would", "listen", "behaviour", "поведінк", "annoy", "роздрат"),
            idea("ситуація", "situation", "raining", "stop", "ситуац"),
            idea("не про себе", "not about yourself", "studied", "i would", "habit", "звичка"),
        ],
        "Would після wish ставлять, коли хочуть зміни в чужій поведінці або скаржаться на ситуацію, наприклад I wish you would listen і I wish it would stop raining. Для власної звички краще I wish I studied more, а не I wish I would study.",
        "We put would after wish when we want a change in someone else's behaviour or we complain about a situation, for example I wish you would listen and I wish it would stop raining. For your own habit, I wish I studied more is better than I wish I would study.",
    ),
)

U9_L4 = teach(
    "en-d-if-only",
    "if only і порівняння з wish",
    "if only and a comparison with wish",
    4,
    "Сильніший жаль",
    "A stronger regret",
    """if only вживає ті самі часи, що wish, але тон сильніший, більш емоційний: If only I knew! If only I had asked earlier! If only it would stop raining! Після if only немає підрядного «що», це самостійне вигукове речення або початок нереального умовного.

If only I knew how to fix this, I would sleep better — другий умовний. If only we had deployed earlier, we would have avoided the incident — третій. Коми й тон: часто знак оклику, особливо в мовленні.

Не пишіть *If only I would have known (знову would have не після if only в стандартній формі; потрібне If only I had known). If only і I wish майже взаємозамінні за граматикою; різниця — сила емоції. If only не заміна if у звичайному реальному умовному: If it rains, we'll stay home — не If only it rains у цьому значенні.""",
    """if only uses the same tenses as wish, but the tone is stronger and more emotional: If only I knew! If only I had asked earlier! If only it would stop raining! After if only there is no “that”-clause; it is a stand-alone exclamation or the start of an unreal conditional.

If only I knew how to fix this, I would sleep better is a second conditional. If only we had deployed earlier, we would have avoided the incident is a third. Punctuation and tone: an exclamation mark is common, especially in speech.

Do not write *If only I would have known (again, would have is not the standard form after if only; you need If only I had known). If only and I wish are almost interchangeable in grammar; the difference is emotional force. If only is not a replacement for if in an ordinary real conditional: If it rains, we'll stay home — not If only it rains in that meaning.""",
    [
        "if only = ті самі часи, що wish, сильніша емоція",
        "If only I knew / had asked / it would stop",
        "Може відкривати 2-й або 3-й умовний",
        "Не *If only I would have known",
    ],
    [
        "if only uses the same tenses as wish, with stronger emotion",
        "If only I knew / had asked / it would stop",
        "It can open a second or third conditional",
        "Not *If only I would have known",
    ],
    [
        mcq(
            "en-d-if-only-r1",
            "Сильний жаль про минуле.",
            "Strong regret about the past.",
            [
                "If only I had asked earlier!",
                "If only I would have asked earlier!",
                "If only I have asked earlier!",
                "If only I asked earlier yesterday, as the best past-regret form.",
            ],
            0,
            "Минулий жаль — If only I had asked.",
            "Past regret is If only I had asked.",
        ),
        fill(
            "en-d-if-only-r2",
            "Вставте knew або know.",
            "Insert knew or know.",
            "If only I ___ how to fix this!",
            ["knew", "Knew"],
        ),
        mcq(
            "en-d-if-only-r3",
            "Реальний прогноз: якщо дощ, лишаємось вдома. Що правильно?",
            "A real prediction: if it rains, we stay home. Which is right?",
            [
                "If it rains, we'll stay home.",
                "If only it rains, we'll stay home, as a neutral real condition.",
                "If only it would rains, we'll stay home.",
                "If only it rain, we'll stay home.",
            ],
            0,
            "Реальна умова — звичайне if, не if only.",
            "A real condition is ordinary if, not if only.",
        ),
        translate(
            "en-d-if-only-r4",
            "Перекладіть емоційно через If only (минуле).",
            "Translate emotionally with If only (the past).",
            "Якби ж ми задеплоїли раніше!",
            [
                "If only we had deployed earlier",
                "If only we had deployed earlier!",
                "If only we'd deployed earlier",
                "If only we'd deployed earlier!",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-if-only",
        "Чим if only відрізняється від wish і які часи після нього? Коли if only не можна ставити замість звичайного if?",
        "How is if only different from wish, and which tenses follow it? When must you not replace ordinary if with if only?",
        [
            idea("сильніше", "stronger", "stronger", "емоц", "emotion", "only"),
            idea("ті самі часи", "same tenses", "knew", "had", "would", "wish"),
            idea("реальна умова", "real condition", "if it rains", "real", "реальн", "ordinary if"),
        ],
        "If only має ті самі часи, що wish, наприклад If only I knew і If only I had asked, але емоція сильніша. Для реальної умови на кшталт if it rains, we'll stay home if only не підходить.",
        "If only takes the same tenses as wish, for example If only I knew and If only I had asked, but the emotion is stronger. For a real condition such as if it rains, we'll stay home, if only is not appropriate.",
    ),
)

U9_L5 = teach(
    "en-d-its-time",
    "it's time, would rather, would sooner",
    "it's time, would rather, would sooner",
    4,
    "Пора вже і перевага",
    "It is about time, and preference",
    """It's time / it's about time / it's high time + Past Simple означає «уже пора це зробити» (і часто трохи запізно): It's time we left. It's high time they fixed this bug. Форма минула, значення — теперішня рекомендація. Можливе також It's time to leave (інфінітив без підмета). Не *It's time we leave в акуратному письмі, коли вже обрали шаблон із підметом.

would rather + інфінітив без to — власна перевага: I'd rather wait. I'd rather not deploy on Friday. Коли перевага стосується ІНШОЇ людини, знову минула форма: I'd rather you waited. I'd rather they didn't rewrite this today. would sooner — синонім, рідше.

Типові помилки: *I'd rather to wait; *I'd rather you to wait; *It's time we will leave. Порівняйте з wish: It's time we left — практична «пора вже»; I wish we left earlier кожен день — жаль про звичку. Тон it's high time може звучати нетерпляче, майже докірливо.""",
    """It's time / it's about time / it's high time + Past Simple means “we should do this now” (and often we are a little late): It's time we left. It's high time they fixed this bug. The form is past; the meaning is a present recommendation. It's time to leave (an infinitive with no subject) is also possible. In careful writing, do not use *It's time we leave once you have chosen the subject pattern.

would rather + bare infinitive is your own preference: I'd rather wait. I'd rather not deploy on Friday. When the preference is about ANOTHER person, use a past form again: I'd rather you waited. I'd rather they didn't rewrite this today. would sooner is a synonym, less common.

Typical mistakes: *I'd rather to wait; *I'd rather you to wait; *It's time we will leave. Compare with wish: It's time we left is a practical “we should go now”; I wish we left earlier every day is regret about a habit. The tone of it's high time can sound impatient, almost critical.""",
    [
        "It's time + Past Simple: уже пора (форма минула)",
        "It's time to leave — інфінітив без нового підмета",
        "I'd rather wait; I'd rather you waited",
        "Не *rather to і не *It's time we will",
    ],
    [
        "It's time + Past Simple: it is already time (the form is past)",
        "It's time to leave is an infinitive with no new subject",
        "I'd rather wait; I'd rather you waited",
        "Not *rather to and not *It's time we will",
    ],
    [
        mcq(
            "en-d-its-time-r1",
            "Уже пора йти.",
            "It is already time to go.",
            [
                "It's time we left.",
                "It's time we leave, in careful subject-pattern writing.",
                "It's time we will leave.",
                "It's time we leaving.",
            ],
            0,
            "It's time + Past Simple: we left.",
            "It's time + Past Simple: we left.",
        ),
        fill(
            "en-d-its-time-r2",
            "Вставте wait або to (власна перевага).",
            "Insert wait or to (your own preference).",
            "I'd rather ___ until we have a test.",
            ["wait", "Wait"],
        ),
        mcq(
            "en-d-its-time-r3",
            "Перевага щодо іншої людини.",
            "A preference about another person.",
            [
                "I'd rather you waited.",
                "I'd rather you to wait.",
                "I'd rather you wait to waited.",
                "I'd rather you will wait.",
            ],
            0,
            "Про іншу людину — I'd rather you waited (минула форма).",
            "About another person — I'd rather you waited (a past form).",
        ),
        translate(
            "en-d-its-time-r4",
            "Перекладіть через it's high time.",
            "Translate with it's high time.",
            "Давно пора їм виправити цей баг.",
            [
                "It's high time they fixed this bug",
                "It is high time they fixed this bug",
                "It's high time they fixed this bug.",
                "It's about time they fixed this bug",
                "It is about time they fixed this bug",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-its-time",
        "Як працює it's time we left і чим I'd rather wait відрізняється від I'd rather you waited?",
        "How does it's time we left work, and how is I'd rather wait different from I'd rather you waited?",
        [
            idea("it's time + past", "it's time + past", "it's time", "left", "fixed", "past", "пора"),
            idea("rather + інфінітив", "rather + infinitive", "rather wait", "rather", "bare", "голий"),
            idea("rather you", "rather you", "you waited", "another", "інш", "waited"),
        ],
        "It's time we left має минулу форму, але означає «уже пора». I'd rather wait — власна перевага з голим інфінітивом. Коли мова про іншу людину, потрібна минула форма: I'd rather you waited.",
        "It's time we left uses a past form but means “it is already time”. I'd rather wait is your own preference with a bare infinitive. When it is about another person, we need a past form: I'd rather you waited.",
    ),
)

U9_EXAM = exam_lesson(
    "en-deep-wish-exam",
    "Контрольна: wish, if only, it's time",
    "Exam: wish, if only, it's time",
    4,
    [
        mcq(
            "en-deep-wish-exam-q1",
            "Шкода, що я не знаю відповіді (зараз).",
            "Pity I don't know the answer (now).",
            ["I wish I knew the answer.", "I wish I know the answer.", "I wish I have known the answer.", "I hope I knew the answer."],
            0,
            "Нереальне теперішнє — I wish I knew.",
            "An unreal present is I wish I knew.",
        ),
        mcq(
            "en-deep-wish-exam-q2",
            "Жаль про минуле:",
            "Regret about the past:",
            ["I wish I had asked earlier.", "I wish I would have asked earlier.", "I wish I have asked earlier.", "I wish I asked earlier yesterday as the best form."],
            0,
            "I wish I had asked.",
            "I wish I had asked.",
        ),
        mcq(
            "en-deep-wish-exam-q3",
            "Роздратування: колега не слухає.",
            "Annoyance: a colleague is not listening.",
            ["I wish you would listen.", "I wish I would listen about your colleague.", "I wish you listen.", "I wish you will listen."],
            0,
            "I wish you would listen.",
            "I wish you would listen.",
        ),
        mcq(
            "en-deep-wish-exam-q4",
            "Уже пора йти:",
            "It is already time to go:",
            ["It's time we left.", "It's time we leave, in careful subject-pattern writing.", "It's time we will leave.", "It's time we leaving."],
            0,
            "It's time we left.",
            "It's time we left.",
        ),
        fill(
            "en-deep-wish-exam-q5",
            "Вставте waited або wait (про іншу людину).",
            "Insert waited or wait (about another person).",
            "I'd rather you ___ until Friday.",
            ["waited", "Waited"],
        ),
    ],
)

UNIT_9 = unit(
    "en-deep-wish",
    "Wish, if only, it's time",
    "Wish, if only, it's time",
    [U9_L1, U9_L2, U9_L3, U9_L4, U9_L5, U9_EXAM],
)


U10_L1 = teach(
    "en-d-subj-obj-q",
    "Підметові і об'єктні питання",
    "Subject and object questions",
    2,
    "Who called? проти Who did you call?",
    "Who called? versus Who did you call?",
    """В об'єктному питанні ми питаємо про додаток і ставимо допоміжне дієслово: Who did you call? What did Maria write? Where does she work? Порядок: питання слово + допоміжне + підмет + основне дієслово.

У підметовому питанні питання слово І Є підметом, тому did / do / does не потрібні: Who called? Who wrote the report? What happened? Не *Who did call? і не *Who did write the report? (окрім емфази). Дієслово узгоджується з who як з одниною, якщо не видно множини: Who is coming? (не *Who are coming? у нейтральному стилі, хоча Who are they? — інша структура).

Для українськомовних пастка — завжди ставити did, бо «кого ти зателефонував» і «хто зателефонував» українською розрізняються відмінком, а в англійській who виглядає однаково. Перевірка: відповідь на Who called? — Maria called (Maria = підмет). Відповідь на Who did you call? — I called Maria (Maria = додаток).""",
    """In an object question we ask about the object and we use an auxiliary: Who did you call? What did Maria write? Where does she work? The order is question word + auxiliary + subject + main verb.

In a subject question the question word IS the subject, so did / do / does are not needed: Who called? Who wrote the report? What happened? Not *Who did call? and not *Who did write the report? (except for emphasis). The verb agrees with who as singular if no plural is visible: Who is coming? (not *Who are coming? in a neutral style, though Who are they? is a different structure).

For Ukrainian speakers the trap is always inserting did, because “whom did you call” and “who called” are distinguished by case in Ukrainian, while English who looks the same. A check: the answer to Who called? is Maria called (Maria is the subject). The answer to Who did you call? is I called Maria (Maria is the object).""",
    [
        "Об'єктне: Who did you call? (є допоміжне)",
        "Підметове: Who called? (без did)",
        "Перевірка — відповідь: підмет чи додаток?",
        "Не *Who did write the report? без емфази",
    ],
    [
        "Object: Who did you call? (there is an auxiliary)",
        "Subject: Who called? (no did)",
        "A check is the answer: subject or object?",
        "Not *Who did write the report? without emphasis",
    ],
    [
        mcq(
            "en-d-subj-obj-q-r1",
            "Питаємо, хто написав звіт (підмет).",
            "We ask who wrote the report (the subject).",
            [
                "Who wrote the report?",
                "Who did write the report? as the neutral form.",
                "Who did wrote the report?",
                "Who does wrote the report?",
            ],
            0,
            "Підметове питання — Who wrote, без did.",
            "A subject question is Who wrote, without did.",
        ),
        fill(
            "en-d-subj-obj-q-r2",
            "Вставте did або нічого не треба — потрібне слово did, якщо питання об'єктне.",
            "Insert did if this is an object question (one word).",
            "Who ___ you call after the meeting?",
            ["did", "Did"],
        ),
        mcq(
            "en-d-subj-obj-q-r3",
            "Відповідь: I called Maria. Яке питання?",
            "The answer is I called Maria. Which question?",
            [
                "Who did you call?",
                "Who called you, if Maria is the object of your call.",
                "Who did call?",
                "Who you called?",
            ],
            0,
            "Maria — додаток, тому Who did you call?",
            "Maria is the object, so Who did you call?",
        ),
        translate(
            "en-d-subj-obj-q-r4",
            "Перекладіть підметовим питанням.",
            "Translate as a subject question.",
            "Хто зателефонував?",
            [
                "Who called",
                "Who called?",
                "Who rang",
                "Who rang?",
                "Who phoned",
                "Who phoned?",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-subj-obj-q",
        "Чим Who called? відрізняється від Who did you call? Як перевірити, чи потрібне did?",
        "How is Who called? different from Who did you call? How can you check whether you need did?",
        [
            idea("підмет", "subject", "who called", "subject", "підмет", "wrote", "happened"),
            idea("додаток", "object", "did you call", "object", "додаток", "auxiliary", "допоміжн"),
            idea("відповідь", "answer", "maria called", "i called", "answer", "відповід"),
        ],
        "Who called — підметове питання без did, бо who і є підметом. Who did you call питає про додаток і потребує допоміжного did. Перевірка — відповідь: Maria called (підмет) чи I called Maria (додаток).",
        "Who called is a subject question without did, because who is the subject. Who did you call asks about the object and needs the auxiliary did. A check is the answer: Maria called (subject) or I called Maria (object).",
    ),
)

U10_L2 = teach(
    "en-d-tags",
    "Розділові питання (question tags)",
    "Question tags",
    2,
    "It's ready, isn't it?",
    "It's ready, isn't it?",
    """Розділове питання — короткий «хвостик» після твердження: It's ready, isn't it? You work in Lviv, don't you? У українській точного відповідника немає (інколи «правда?» / «чи не так?»), тому форму треба вчитися як схему. Правило: після ствердження — заперечний tag, після заперечення — ствердний: She isn't late, is she?

Допоміжне в tag повторює допоміжне речення (або do/does/did, якщо його не було): You've finished, haven't you? He left, didn't he? З I am традиційно aren't I?: I'm late, aren't I? З let's — shall we?: Let's ship it, shall we? З nobody / nothing речення вважається заперечним: Nobody called, did they? (they як нейтральна множина).

Інтонація змінює функцію: спадний тон — мовець майже впевнений і лише підтверджує; висхідний — справжнє питання. Типові помилки: *It's ready, isn't he?; *You don't know, don't you? (має бути do you); зайве not у двох місцях.""",
    """A question tag is a short tail after a statement: It's ready, isn't it? You work in Lviv, don't you? Ukrainian has no exact equivalent (sometimes “right?” / “isn't that so?”), so the form has to be learned as a pattern. The rule is: after a positive statement, a negative tag; after a negative, a positive tag: She isn't late, is she?

The auxiliary in the tag repeats the auxiliary in the sentence (or uses do/does/did if there was none): You've finished, haven't you? He left, didn't he? With I am the traditional tag is aren't I?: I'm late, aren't I? With let's it is shall we?: Let's ship it, shall we? With nobody / nothing the sentence counts as negative: Nobody called, did they? (they as a neutral plural).

Intonation changes the function: a falling tone means the speaker is almost sure and only wants confirmation; a rising tone is a real question. Typical mistakes: *It's ready, isn't he?; *You don't know, don't you? (it should be do you); a second not in both halves.""",
    [
        "Ствердження + заперечний tag; заперечення + ствердний tag",
        "Повторюйте допоміжне: have → haven't, left → didn't",
        "I am → aren't I?; let's → shall we?; nobody → did they?",
        "В українській немає точного «хвостика» — це окрема схема",
    ],
    [
        "Positive statement + negative tag; negative + positive tag",
        "Repeat the auxiliary: have → haven't, left → didn't",
        "I am → aren't I?; let's → shall we?; nobody → did they?",
        "Ukrainian has no exact tail — this is a separate pattern",
    ],
    [
        mcq(
            "en-d-tags-r1",
            "Оберіть правильний tag.",
            "Choose the correct tag.",
            [
                "It's ready, isn't it?",
                "It's ready, isn't he?",
                "It's ready, is it not it?",
                "It's ready, doesn't it?",
            ],
            0,
            "It is — isn't it.",
            "It is takes isn't it.",
        ),
        fill(
            "en-d-tags-r2",
            "Вставте don't або do (після заперечення).",
            "Insert don't or do (after a negative).",
            "You don't know the API, ___ you?",
            ["do", "Do"],
        ),
        mcq(
            "en-d-tags-r3",
            "Оберіть правильне з I am.",
            "Choose the correct option with I am.",
            [
                "I'm late, aren't I?",
                "I'm late, amn't I?",
                "I'm late, isn't I?",
                "I'm late, don't I?",
            ],
            0,
            "Традиційний tag до I am — aren't I.",
            "The traditional tag for I am is aren't I.",
        ),
        translate(
            "en-d-tags-r4",
            "Перекладіть із question tag.",
            "Translate with a question tag.",
            "Ти працюєш у Львові, чи не так?",
            [
                "You work in Lviv, don't you",
                "You work in Lviv, don't you?",
                "You work in Lviv, right",
                "You work in Lviv, right?",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-tags",
        "Як будують question tag після ствердження і після заперечення? Який tag після I am і після nobody?",
        "How do you build a question tag after a positive statement and after a negative? Which tag follows I am and nobody?",
        [
            idea("протилежний polarity", "opposite polarity", "isn't", "don't", "negative", "запереч", "positive", "ствердж"),
            idea("aren't I", "aren't I", "aren't i", "i am", "late"),
            idea("nobody / they", "nobody / they", "nobody", "did they", "they"),
        ],
        "Після ствердження ставлять заперечний tag, наприклад it's ready, isn't it, а після заперечення — ствердний: you don't know, do you. Після I am традиційно aren't I, а після nobody — did they.",
        "After a positive statement we use a negative tag, for example it's ready, isn't it, and after a negative we use a positive tag: you don't know, do you. After I am the traditional tag is aren't I, and after nobody it is did they.",
    ),
)

U10_L3 = teach(
    "en-d-indirect-q",
    "Непрямі питання",
    "Indirect questions",
    3,
    "Could you tell me where…?",
    "Could you tell me where…?",
    """Непряме питання ввічливіше за пряме. Після фраз Could you tell me, Do you know, I wonder, I'd like to know порядок слів як у розповіді, без do/does/did у середині: Could you tell me where the station is? — не *where is the station після tell me. Do you know what time it starts? — не *what time does it start всередині (це вже було б пряме питання).

Для yes/no використовують if або whether: Could you tell me if the train has left? I wonder whether this is a bug. Не ставте комі перед if у цьому випадку і не додавайте другої питальної інверсії.

Типові помилки: *Do you know where is she?; *Could you tell me where does he work?; зайвий if разом із what (*tell me if what time). Це той самий порядок, що в непрямій мові (яка вже є в курсі), але тут мета — ввічливість у розмові й на мітингу, не переказ чужих слів.""",
    """An indirect question is more polite than a direct one. After phrases such as Could you tell me, Do you know, I wonder, I'd like to know, the word order is like a statement, with no do/does/did in the middle: Could you tell me where the station is? — not *where is the station after tell me. Do you know what time it starts? — not *what time does it start inside the clause (that would already be a direct question).

For yes/no questions we use if or whether: Could you tell me if the train has left? I wonder whether this is a bug. Do not put a comma before if here, and do not add a second question inversion.

Typical mistakes: *Do you know where is she?; *Could you tell me where does he work?; an extra if together with what (*tell me if what time). This is the same order as in reported speech (already in the course), but here the goal is politeness in conversation and in meetings, not retelling someone else's words.""",
    [
        "Після tell me / do you know — порядок як у розповіді",
        "where the station is, не *where is the station",
        "yes/no: if / whether",
        "Не *Do you know where is she?",
    ],
    [
        "After tell me / do you know, use statement word order",
        "where the station is, not *where is the station",
        "yes/no: if / whether",
        "Not *Do you know where is she?",
    ],
    [
        mcq(
            "en-d-indirect-q-r1",
            "Оберіть ввічливе непряме питання.",
            "Choose the polite indirect question.",
            [
                "Could you tell me where the station is?",
                "Could you tell me where is the station?",
                "Could you tell me where does the station is?",
                "Could you tell me where the station is at, is it?",
            ],
            0,
            "Порядок розповіді: where the station is.",
            "Statement order: where the station is.",
        ),
        fill(
            "en-d-indirect-q-r2",
            "Вставте if або where (yes/no).",
            "Insert if or where (yes/no).",
            "Could you tell me ___ the train has left?",
            ["if", "If", "whether", "Whether"],
        ),
        mcq(
            "en-d-indirect-q-r3",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "Do you know what time it starts?",
                "Do you know what time does it start?",
                "Do you know what time starts it?",
                "Do you know what time is it start?",
            ],
            0,
            "it starts — без does всередині непрямого питання.",
            "it starts — no does inside the indirect question.",
        ),
        translate(
            "en-d-indirect-q-r4",
            "Перекладіть непрямим питанням, почавши з Could you tell me.",
            "Translate as an indirect question starting with Could you tell me.",
            "Не підкажете, де вокзал?",
            [
                "Could you tell me where the station is",
                "Could you tell me where the station is?",
                "Could you tell me where the railway station is",
                "Could you tell me where the railway station is?",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-indirect-q",
        "Який порядок слів у непрямому питанні після Could you tell me? Як почати yes/no варіант?",
        "What is the word order in an indirect question after Could you tell me? How do you start a yes/no version?",
        [
            idea("порядок розповіді", "statement order", "station is", "statement", "розповід", "order", "where the"),
            idea("без does", "no does", "does", "did", "auxiliary"),
            idea("if/whether", "if/whether", "if", "whether"),
        ],
        "Після Could you tell me порядок як у розповіді: where the station is, а не where is the station. Допоміжне does всередині не ставлять. Yes/no варіант починають з if або whether.",
        "After Could you tell me the order is like a statement: where the station is, not where is the station. We do not put the auxiliary does inside. A yes/no version starts with if or whether.",
    ),
)

U10_L4 = teach(
    "en-d-word-order",
    "Порядок слів і прислівники",
    "Word order and adverbs",
    3,
    "Підмет — дієслово — додаток, і куди подіти often",
    "Subject–verb–object, and where often goes",
    """Базовий порядок англійського розповідного речення — SVO: I opened the ticket. Не *I the ticket opened і не *Opened I the ticket (це не німецька і не інверсія питання). Обставини місця зазвичай перед часом: She worked in Lviv in 2020, не *in 2020 in Lviv як єдина «правильна», але *She worked in 2020 in the office звучить менш природно, ніж in the office in 2020.

Прислівники частоти (always, usually, often, sometimes, rarely, never) стоять перед основним дієсловом і після be / допоміжного: I often review PRs. She is always late. I have never seen this. Не *I review often PRs (розірваний додаток) і обережно з *Always I review у нейтральному стилі (це емфаза).

enough ми вже ставимо після прикметника; well, carefully — після дієслова або в кінці: She explained it carefully. Не ставте прислівник між дієсловом і коротким додатком: *She explained carefully it. Українська вільніша в порядку слів — в англійській це часта причина «неанглійського» звучання.""",
    """The basic order of an English statement is SVO: I opened the ticket. Not *I the ticket opened and not *Opened I the ticket (this is not German, and not question inversion). Place usually comes before time: She worked in Lviv in 2020; *She worked in 2020 in the office sounds less natural than in the office in 2020.

Adverbs of frequency (always, usually, often, sometimes, rarely, never) go before the main verb and after be / an auxiliary: I often review PRs. She is always late. I have never seen this. Not *I review often PRs (a split object), and be careful with *Always I review in a neutral style (that is emphasis).

enough, as we already saw, follows an adjective; well, carefully follow the verb or come at the end: She explained it carefully. Do not put the adverb between the verb and a short object: *She explained carefully it. Ukrainian word order is freer — in English this is a common reason a sentence “doesn't sound English”.""",
    [
        "Базовий порядок: підмет — дієслово — додаток",
        "Місце зазвичай перед часом",
        "often / never — перед основним дієсловом, після be/have",
        "Не *explained carefully it",
    ],
    [
        "Basic order: subject–verb–object",
        "Place usually comes before time",
        "often / never go before the main verb, after be/have",
        "Not *explained carefully it",
    ],
    [
        mcq(
            "en-d-word-order-r1",
            "Оберіть природний порядок.",
            "Choose the natural order.",
            [
                "I often review PRs.",
                "I review often PRs.",
                "Often I review PRs every day, as the only neutral form.",
                "I review PRs often them.",
            ],
            0,
            "often перед основним дієсловом: I often review.",
            "often comes before the main verb: I often review.",
        ),
        fill(
            "en-d-word-order-r2",
            "Вставте never у правильному місці — напишіть два слова: have never або never have (після I).",
            "Place never correctly — write two words after I would be have never or never have. Fill the blank only.",
            "I ___ seen this error before.",
            ["have never", "Have never"],
        ),
        mcq(
            "en-d-word-order-r3",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "She explained it carefully.",
                "She explained carefully it.",
                "She carefully it explained.",
                "She it carefully explained.",
            ],
            0,
            "Прислівник не розриває explained it.",
            "The adverb does not split explained it.",
        ),
        translate(
            "en-d-word-order-r4",
            "Перекладіть з often у правильному місці.",
            "Translate with often in the right place.",
            "Я часто переглядаю пул-реквести.",
            [
                "I often review pull requests",
                "I often review PRs",
                "I often review pull-requests",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-word-order",
        "Який базовий порядок слів у розповіді? Де стоять often і never, і чому не можна сказати explained carefully it?",
        "What is the basic word order in a statement? Where do often and never go, and why can't we say explained carefully it?",
        [
            idea("SVO", "SVO", "subject", "підмет", "object", "додаток", "svo", "opened"),
            idea("often", "often", "often", "never", "before", "перед", "have never"),
            idea("не розривати", "do not split", "carefully", "explained it", "split", "розрив"),
        ],
        "Базовий порядок — підмет, дієслово, додаток. Often і never стоять перед основним дієсловом і після have: I have never seen. Не можна вставляти carefully між explained і коротким it.",
        "The basic order is subject, verb, object. Often and never go before the main verb and after have: I have never seen. You cannot insert carefully between explained and a short it.",
    ),
)

U10_L5 = teach(
    "en-d-ed-ing",
    "Прикметники на -ed і -ing",
    "Adjectives in -ed and -ing",
    2,
    "bored чи boring?",
    "bored or boring?",
    """Прикметники на -ing описують якість РЕЧІ або ситуації, яка викликає почуття: The meeting was boring. This task is interesting. The news is surprising. Прикметники на -ed описують почуття ЛЮДИНИ (або істоти): I was bored. We're interested. She looked surprised.

Це одна з найчастіших помилок українськомовних, бо обидва можна перекласти «нудний / нудьгую». *I am boring у значенні «мені нудно» насправді означає «я нудна людина». *The film is bored — ніби фільм має почуття. Пам'ятка: -ing — «спричиняє»; -ed — «відчуваю».

Не всі пари однаково вживані, але ядро треба знати: bored/boring, interested/interesting, excited/exciting, surprised/surprising, tired/tiring, annoyed/annoying, confused/confusing, frightened/frightening, embarrassed/embarrassing, disappointed/disappointing. I'm tired (стан) проти This work is tiring (робота виснажує).""",
    """Adjectives in -ing describe the quality of a THING or a situation that causes a feeling: The meeting was boring. This task is interesting. The news is surprising. Adjectives in -ed describe a PERSON's (or a creature's) feeling: I was bored. We're interested. She looked surprised.

This is one of the most frequent mistakes for Ukrainian speakers, because both can translate as “boring / I am bored”. *I am boring, meaning “I feel bored”, actually means “I am a boring person”. *The film is bored treats the film as if it had a feeling. A memory aid: -ing is “it causes”; -ed is “I feel”.

Not every pair is equally common, but the core is worth knowing: bored/boring, interested/interesting, excited/exciting, surprised/surprising, tired/tiring, annoyed/annoying, confused/confusing, frightened/frightening, embarrassed/embarrassing, disappointed/disappointing. I'm tired (a state) versus This work is tiring (the work causes tiredness).""",
    [
        "-ing — якість речі / ситуації, яка викликає почуття",
        "-ed — почуття людини",
        "*I am boring ≠ «мені нудно»; це «я нудний»",
        "interested in, bored with, excited about — різні прийменники",
    ],
    [
        "-ing is the quality of a thing or situation that causes a feeling",
        "-ed is a person's feeling",
        "*I am boring is not “I feel bored”; it means “I am dull”",
        "interested in, bored with, excited about — different prepositions",
    ],
    [
        mcq(
            "en-d-ed-ing-r1",
            "Вам було нудно на мітингу. Що сказати?",
            "You felt bored in the meeting. What do you say?",
            [
                "I was bored.",
                "I was boring.",
                "The meeting was bored.",
                "I was bore.",
            ],
            0,
            "Почуття людини — bored.",
            "A person's feeling is bored.",
        ),
        fill(
            "en-d-ed-ing-r2",
            "Вставте interesting або interested.",
            "Insert interesting or interested.",
            "This task is ___.",
            ["interesting", "Interesting"],
        ),
        mcq(
            "en-d-ed-ing-r3",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "We're interested in the proposal.",
                "We're interesting in the proposal.",
                "We're interested on the proposal.",
                "We're interesting on the proposal.",
            ],
            0,
            "Почуття — interested in.",
            "The feeling is interested in.",
        ),
        translate(
            "en-d-ed-ing-r4",
            "Перекладіть (мітинг як причина).",
            "Translate (the meeting as the cause).",
            "Зустріч була нудна.",
            [
                "The meeting was boring",
                "The meeting was boring.",
                "It was a boring meeting",
                "It was a boring meeting.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-ed-ing",
        "Чим bored відрізняється від boring? Що насправді означає I am boring, якщо ви хотіли сказати «мені нудно»?",
        "How is bored different from boring? What does I am boring actually mean if you wanted to say “I feel bored”?",
        [
            idea("-ed почуття", "-ed feeling", "bored", "interested", "feeling", "почутт", "person", "людин"),
            idea("-ing причина", "-ing cause", "boring", "interesting", "cause", "причин", "meeting", "task"),
            idea("I am boring", "I am boring", "boring person", "нудн", "dull"),
        ],
        "Bored описує почуття людини, а boring — якість речі, яка це почуття викликає, наприклад the meeting was boring. I am boring насправді означає «я нудна людина», а не «мені нудно».",
        "Bored describes a person's feeling, and boring describes the quality of a thing that causes that feeling, for example the meeting was boring. I am boring actually means “I am a dull person”, not “I feel bored”.",
    ),
)

U10_EXAM = exam_lesson(
    "en-deep-questions-plus-exam",
    "Контрольна: питання, tags і порядок слів",
    "Exam: questions, tags and word order",
    3,
    [
        mcq(
            "en-deep-questions-plus-exam-q1",
            "Підметове питання про автора звіту:",
            "A subject question about the author of the report:",
            ["Who wrote the report?", "Who did write the report as the neutral form?", "Who did wrote the report?", "Who does wrote the report?"],
            0,
            "Who wrote — без did.",
            "Who wrote — no did.",
        ),
        mcq(
            "en-deep-questions-plus-exam-q2",
            "Оберіть tag.",
            "Choose the tag.",
            ["It's ready, isn't it?", "It's ready, isn't he?", "It's ready, doesn't it?", "It's ready, is it not he?"],
            0,
            "isn't it.",
            "isn't it.",
        ),
        mcq(
            "en-deep-questions-plus-exam-q3",
            "Непряме питання:",
            "An indirect question:",
            ["Could you tell me where the station is?", "Could you tell me where is the station?", "Could you tell me where does the station is?", "Do you know where is she?"],
            0,
            "where the station is — порядок розповіді.",
            "where the station is is statement order.",
        ),
        mcq(
            "en-deep-questions-plus-exam-q4",
            "Почуття на мітингу:",
            "A feeling in the meeting:",
            ["I was bored.", "I was boring.", "The meeting was bored.", "I was bore."],
            0,
            "Почуття — bored.",
            "The feeling is bored.",
        ),
        fill(
            "en-deep-questions-plus-exam-q5",
            "Вставте прислівник частоти.",
            "Insert the frequency adverb.",
            "I ___ review PRs.",
            ["often", "Often"],
        ),
    ],
)

UNIT_10 = unit(
    "en-deep-questions-plus",
    "Питання глибше",
    "Questions in more depth",
    [U10_L1, U10_L2, U10_L3, U10_L4, U10_L5, U10_EXAM],
)


U11_L1 = teach(
    "en-d-link-contrast",
    "Протиставлення: although, despite, however",
    "Contrast: although, despite, however",
    3,
    "Одна ідея проти іншої",
    "One idea against another",
    """although / though / even though вводять ПІДРЯДНЕ речення: Although the test failed, we shipped a hotfix. even though сильніше. despite / in spite of беруть ІМЕННИК або герундій, не повне речення з підметом+час: Despite the failure, we shipped. Despite failing the test, we… Не *Despite the test failed — після despite немає голого речення (потрібно despite the fact that, якщо дуже треба речення).

however, nevertheless, even so — прислівники речення, зазвичай з крапкою або крапкою з комою, не з комою як and: The test failed. However, we shipped a hotfix. Не *The test failed, however we shipped у старанному письмі (кома недостатня). whereas / while протиставляють дві риси: The API is fast, whereas the dashboard is slow.

Українське «незважаючи на» спокушає завжди ставити despite перед реченням. Пам'ятка: although + речення; despite + іменник/-ing. but — найпростіший розмовний протиставний сполучник, цілком доречний, не треба завжди however.""",
    """although / though / even though introduce a CLAUSE: Although the test failed, we shipped a hotfix. even though is stronger. despite / in spite of take a NOUN or a gerund, not a full finite clause: Despite the failure, we shipped. Despite failing the test, we… Not *Despite the test failed — despite is not followed by a bare clause (you need despite the fact that if you really want a clause).

however, nevertheless, even so are sentence adverbs, usually with a full stop or a semicolon, not with a comma like and: The test failed. However, we shipped a hotfix. In careful writing, not *The test failed, however we shipped (a comma is not enough). whereas / while contrast two features: The API is fast, whereas the dashboard is slow.

Ukrainian “nezvazhayuchy na” tempts learners to put despite before a clause every time. A memory aid: although + clause; despite + noun/-ing. but is the simplest conversational contrast word and is perfectly fine — you do not always need however.""",
    [
        "although + речення; despite + іменник або -ing",
        "Не *Despite the test failed",
        "However починає нове речення (або після ;)",
        "whereas — протиставлення двох рис",
    ],
    [
        "although + a clause; despite + a noun or -ing",
        "Not *Despite the test failed",
        "However starts a new sentence (or follows a semicolon)",
        "whereas contrasts two features",
    ],
    [
        mcq(
            "en-d-link-contrast-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "Although the test failed, we shipped a hotfix.",
                "Despite the test failed, we shipped a hotfix.",
                "Despite of the test failed, we shipped a hotfix.",
                "Although the failure, we shipped a hotfix.",
            ],
            0,
            "although + речення; despite так не ставлять.",
            "although takes a clause; despite does not.",
        ),
        fill(
            "en-d-link-contrast-r2",
            "Вставте despite або although.",
            "Insert despite or although.",
            "___ the failure, we shipped.",
            ["Despite", "despite", "In spite of", "in spite of"],
        ),
        mcq(
            "en-d-link-contrast-r3",
            "Оберіть акуратну пунктуацію з however.",
            "Choose careful punctuation with however.",
            [
                "The test failed. However, we shipped a hotfix.",
                "The test failed, however we shipped a hotfix, with only a comma.",
                "The test failed however, we shipped a hotfix without a stop.",
                "However the test failed we shipped, as one clause.",
            ],
            0,
            "However після крапки (або після крапки з комою).",
            "However follows a full stop (or a semicolon).",
        ),
        translate(
            "en-d-link-contrast-r4",
            "Перекладіть, почавши з Although.",
            "Translate, starting with Although.",
            "Хоча тест упав, ми випустили хотфікс.",
            [
                "Although the test failed, we shipped a hotfix",
                "Although the test failed we shipped a hotfix",
                "Although the test failed, we released a hotfix",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-link-contrast",
        "Чим although відрізняється від despite? Як правильно поставити however в письмі?",
        "How is although different from despite? How should you punctuate however in writing?",
        [
            idea("although + речення", "although + clause", "although", "clause", "речен", "failed"),
            idea("despite + іменник", "despite + noun", "despite", "failure", "іменник", "noun", "failing"),
            idea("however", "however", "however", "full stop", "крапк", "semicolon"),
        ],
        "Although вводить речення, наприклад Although the test failed. Despite бере іменник або -ing: despite the failure. However зазвичай починає нове речення після крапки, а не стоїть після самої коми.",
        "Although introduces a clause, for example Although the test failed. Despite takes a noun or -ing: despite the failure. However usually starts a new sentence after a full stop, and does not sit after a comma alone.",
    ),
)

U11_L2 = teach(
    "en-d-link-cause",
    "Причина і наслідок: because, so, therefore",
    "Cause and result: because, so, therefore",
    3,
    "Чому сталося і що з цього випливає",
    "Why it happened and what follows",
    """because / as / since вводять причину як речення: We delayed the release because the tests failed. as і since звучать трохи формальніше і часто стоять на початку: Since the tests failed, we delayed the release. because of + іменник: because of the failures (не *because of the tests failed).

so — розмовний наслідок, сполучник: The tests failed, so we delayed the release. therefore, thus, consequently, as a result — більш письмові; therefore часто після крапки або з комою як вставне: The tests failed. Therefore, we delayed the release. that's why — розмовніше: That's why we delayed it.

Не пишіть *because the reason is… (подвійна причина) і не ставте so і therefore разом (*so therefore). Українське «тому що» іноді калькують як *that's why that. Для IT-звіту природно: Due to a timeout, the job failed. owing to — формальне due to.""",
    """because / as / since introduce a cause as a clause: We delayed the release because the tests failed. as and since sound a little more formal and often come first: Since the tests failed, we delayed the release. because of + a noun: because of the failures (not *because of the tests failed).

so is a conversational result conjunction: The tests failed, so we delayed the release. therefore, thus, consequently, as a result are more written; therefore often follows a full stop or is set off with commas: The tests failed. Therefore, we delayed the release. that's why is more conversational: That's why we delayed it.

Do not write *because the reason is… (a double cause) and do not use so and therefore together (*so therefore). Ukrainian “tomu shcho” is sometimes calqued as *that's why that. In an IT report, Due to a timeout, the job failed is natural. owing to is a formal due to.""",
    [
        "because + речення; because of + іменник",
        "so — розмовний наслідок; therefore — письмовіший",
        "since/as — причина, часто на початку",
        "Не *because of the tests failed і не *so therefore",
    ],
    [
        "because + a clause; because of + a noun",
        "so is a conversational result; therefore is more written",
        "since/as introduce a cause, often at the start",
        "Not *because of the tests failed and not *so therefore",
    ],
    [
        mcq(
            "en-d-link-cause-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "We delayed the release because the tests failed.",
                "We delayed the release because of the tests failed.",
                "We delayed the release so therefore the tests failed.",
                "We delayed the release because the reason is the tests failed.",
            ],
            0,
            "because + речення; because of потребує іменника.",
            "because takes a clause; because of needs a noun.",
        ),
        fill(
            "en-d-link-cause-r2",
            "Вставте of, якщо потрібно, або because — напишіть because of або because.",
            "Insert because or because of.",
            "The job failed ___ a timeout.",
            ["because of", "Because of", "due to", "Due to"],
        ),
        mcq(
            "en-d-link-cause-r3",
            "Письмовий наслідок:",
            "A written result:",
            [
                "The tests failed. Therefore, we delayed the release.",
                "The tests failed, so therefore we delayed the release.",
                "The tests failed because therefore we delayed.",
                "Therefore the tests failed, we delayed, as a cause.",
            ],
            0,
            "Therefore після крапки як наслідок.",
            "Therefore follows a full stop as a result.",
        ),
        translate(
            "en-d-link-cause-r4",
            "Перекладіть із because.",
            "Translate with because.",
            "Ми затримали реліз, тому що тести впали.",
            [
                "We delayed the release because the tests failed",
                "We delayed the release because the tests failed.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-link-cause",
        "Чим because відрізняється від because of? Коли обрати so, а коли therefore?",
        "How is because different from because of? When do you choose so, and when therefore?",
        [
            idea("because + речення", "because + clause", "because", "failed", "clause", "речен"),
            idea("because of", "because of", "because of", "timeout", "noun", "іменник"),
            idea("therefore", "therefore", "therefore", "so", "written", "письмо"),
        ],
        "Because вводить речення: because the tests failed. Because of бере іменник: because of a timeout. So — розмовний наслідок, therefore — письмовіший і часто стоїть після крапки.",
        "Because introduces a clause: because the tests failed. Because of takes a noun: because of a timeout. So is a conversational result, and therefore is more written and often follows a full stop.",
    ),
)

U11_L3 = teach(
    "en-d-link-purpose",
    "Зв'язки мети й умови в тексті",
    "Purpose and condition links in a text",
    3,
    "so that, provided that, unless, in case",
    "so that, provided that, unless, in case",
    """У письмі мету часто оформлюють не лише коротким to (це вже є в курсі герундіїв), а й so that / in order that з модальним: We log requests so that we can debug later. Умова: if, as long as, provided (that), providing (that) — «за умови, що»: We'll deploy on Friday provided that the tests pass. unless = if not: We won't deploy unless the tests pass. Не *unless the tests don't pass (подвійне заперечення).

in case — «на випадок, якщо» (підстрахування), не те саме, що if: Take a charger in case the battery dies (візьми зараз, про всяк випадок). If the battery dies, plug it in — умова самої дії. Українське «якщо раптом» часто змішує ці два.

even if — «навіть якщо»: We'll ship even if the optional checks fail. only if — жорстка умова. Ці сполучники тримають текст логічним, коли ви пояснюєте політику команди або план релізу.""",
    """In writing, purpose is often expressed not only with a short to (already in the gerunds unit) but also with so that / in order that plus a modal: We log requests so that we can debug later. Condition: if, as long as, provided (that), providing (that) mean “on the condition that”: We'll deploy on Friday provided that the tests pass. unless is if not: We won't deploy unless the tests pass. Not *unless the tests don't pass (a double negative).

in case means “as a precaution if” (insurance), which is not the same as if: Take a charger in case the battery dies (take it now, just in case). If the battery dies, plug it in is the condition for the action itself. Ukrainian “yakshcho raptom” often mixes the two.

even if means “even in the situation that”: We'll ship even if the optional checks fail. only if is a strict condition. These conjunctions keep a text logical when you explain a team policy or a release plan.""",
    [
        "so that + підмет + can/could — мета в тексті",
        "provided that / as long as — умова",
        "unless = if not; не подвійне заперечення",
        "in case — підстрахування, не просте if",
    ],
    [
        "so that + subject + can/could is purpose in a text",
        "provided that / as long as is a condition",
        "unless is if not; no double negative",
        "in case is a precaution, not a plain if",
    ],
    [
        mcq(
            "en-d-link-purpose-r1",
            "Оберіть правильне з unless.",
            "Choose the correct option with unless.",
            [
                "We won't deploy unless the tests pass.",
                "We won't deploy unless the tests don't pass.",
                "We won't deploy unless if the tests pass.",
                "We won't deploy unless the tests passing.",
            ],
            0,
            "unless = if not, без другого заперечення.",
            "unless is if not, without a second negative.",
        ),
        fill(
            "en-d-link-purpose-r2",
            "Вставте case або if (підстрахування: візьми зараз).",
            "Insert case or if (a precaution: take it now).",
            "Take a charger in ___ the battery dies.",
            ["case", "Case"],
        ),
        mcq(
            "en-d-link-purpose-r3",
            "Оберіть природну умову релізу.",
            "Choose the natural release condition.",
            [
                "We'll deploy on Friday provided that the tests pass.",
                "We'll deploy on Friday provided the tests will pass, after provided.",
                "We'll deploy on Friday provided that will the tests pass.",
                "We'll deploy on Friday unless the tests pass, meaning “only if they pass”.",
            ],
            0,
            "provided that + present: the tests pass.",
            "provided that + a present: the tests pass.",
        ),
        translate(
            "en-d-link-purpose-r4",
            "Перекладіть із so that.",
            "Translate with so that.",
            "Ми логуємо запити, щоб потім можна було дебажити.",
            [
                "We log requests so that we can debug later",
                "We log requests so that we can debug them later",
                "We log the requests so that we can debug later",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-link-purpose",
        "Що означає unless і чим in case відрізняється від if? Як provided that оформлює умову?",
        "What does unless mean, and how is in case different from if? How does provided that frame a condition?",
        [
            idea("unless", "unless", "unless", "if not", "pass", "подвій", "double"),
            idea("in case", "in case", "in case", "precaution", "підстрах", "charger", "battery"),
            idea("provided that", "provided that", "provided", "condition", "умов", "as long as"),
        ],
        "Unless означає if not: we won't deploy unless the tests pass, без другого заперечення. In case — підстрахування наперед, не просте if. Provided that оформлює умову: we'll deploy provided that the tests pass.",
        "Unless means if not: we won't deploy unless the tests pass, without a second negative. In case is a precaution in advance, not a plain if. Provided that frames a condition: we'll deploy provided that the tests pass.",
    ),
)

U11_L4 = teach(
    "en-d-link-add",
    "Додавання і приклад: moreover, for example",
    "Adding and giving examples: moreover, for example",
    3,
    "Розбудувати думку, не розмазати її",
    "Building a point without smearing it",
    """Щоб додати аргумент у письмі: also (гнучке), in addition, moreover, furthermore (формальніші, часто на початку речення). What's more — трохи розмовніше. besides часто означає «крім того / і взагалі»: Besides, we don't have time. Не ставте moreover в кожне друге речення — це звучить важко.

Приклади: for example, for instance, such as + іменники (such as timeouts and retries), e.g. у дужках або технічних нотатках. namely — «а саме», коли список вичерпний. including — включно з. Не *for example як such as всередині без пунктуації: We saw issues, for example timeouts, is fine; *issues such as, for example, timeouts — надлишок.

Когезія: повторіть ключове слово або замініть його this / these / such problems, а не лише also. Українські «також, крім того, наприклад» не завжди один в один відповідають moreover — обирайте за регістром тексту.""",
    """To add an argument in writing: also (flexible), in addition, moreover, furthermore (more formal, often at the start of a sentence). What's more is a little more conversational. besides often means “in any case / on top of that”: Besides, we don't have time. Do not put moreover in every other sentence — it sounds heavy.

Examples: for example, for instance, such as + nouns (such as timeouts and retries), e.g. in brackets or technical notes. namely means “that is to say”, when the list is complete. including means “this is part of the set”. Do not treat for example as a perfect twin of such as without punctuation: We saw issues, for example timeouts, is fine; *issues such as, for example, timeouts is overloaded.

Cohesion: repeat a key word or replace it with this / these / such problems, not only with also. Ukrainian “takozh, krim toho, napryklad” do not map one-to-one onto moreover — choose according to the register of the text.""",
    [
        "also — універсально; moreover / furthermore — формальніше",
        "Не зловживати moreover",
        "for example / for instance / such as + іменники",
        "this / these тримають тему краще, ніж самі сполучники",
    ],
    [
        "also is flexible; moreover / furthermore are more formal",
        "Do not overuse moreover",
        "for example / for instance / such as + nouns",
        "this / these hold the topic better than conjunctions alone",
    ],
    [
        mcq(
            "en-d-link-add-r1",
            "Оберіть природний приклад.",
            "Choose the natural example.",
            [
                "We saw issues such as timeouts and retries.",
                "We saw issues such as, for example, timeouts and, namely, retries, all at once.",
                "We saw issues moreover timeouts.",
                "We saw issues besides of timeouts.",
            ],
            0,
            "such as + іменники — найчистіший приклад.",
            "such as + nouns is the cleanest example pattern.",
        ),
        fill(
            "en-d-link-add-r2",
            "Вставте addition або example (додавання аргументу на початку речення: In ___ ,).",
            "Insert addition or example (adding a point at the start: In ___ ,).",
            "In ___, the logs were incomplete.",
            ["addition", "Addition"],
        ),
        mcq(
            "en-d-link-add-r3",
            "Яке слово найформальніше для додавання аргументу?",
            "Which word is the most formal for adding a point?",
            ["Moreover,", "And also too,", "What's more, in a chatty blog only,", "Plus plus,"],
            0,
            "Moreover — формальний письмовий маркер.",
            "Moreover is a formal written marker.",
        ),
        match(
            "en-d-link-add-r4",
            "Зіставте маркер із функцією.",
            "Match each marker with its job.",
            [
                ("moreover / furthermore", "додати формальний аргумент / add a formal point"),
                ("for example / such as", "навести приклад / give an example"),
                ("namely", "назвати вичерпний список / name a complete list"),
                ("besides", "додати «і взагалі» / add an “in any case” point"),
            ],
        ),
    ],
    ex(
        "en-d-link-add",
        "Як додати аргумент у формальному письмі і як навести приклад? Чому не варто ставити moreover в кожне речення?",
        "How do you add a point in formal writing, and how do you give an example? Why should you not put moreover in every sentence?",
        [
            idea("moreover", "moreover", "moreover", "furthermore", "in addition", "formal", "формальн"),
            idea("example", "example", "for example", "such as", "приклад", "instance"),
            idea("не зловживати", "do not overuse", "every", "кожн", "heavy", "важк", "overuse"),
        ],
        "У формальному письмі аргумент додають через moreover, furthermore або in addition. Приклад дають через for example або such as і іменники. Moreover в кожне речення робить текст важким, тому його не варто зловживати.",
        "In formal writing we add a point with moreover, furthermore or in addition. We give an example with for example or such as plus nouns. Moreover in every sentence makes the text heavy, so it should not be overused.",
    ),
)

U11_L5 = teach(
    "en-d-discourse",
    "Дискурсивні маркери: actually, anyway, in fact",
    "Discourse markers: actually, anyway, in fact",
    3,
    "Як звучати природно в розмові й на мітингу",
    "Sounding natural in conversation and in meetings",
    """Дискурсивні маркери керують розмовою, а не граматичним зв'язком речень. actually / in fact уточнюють або м'яко заперечують: We thought it was a cache issue. Actually, it was a race. Українське «насправді» не завжди actually: sometimes actually = «а якщо точніше / навпаки». as a matter of fact — сильніше in fact.

anyway / anyhow повертають до теми або закривають відступ: Anyway, let's go back to the deploy. by the way — нова, не обов'язково центральна тема. as for + іменник — перехід до пункту: As for the deadline, we can move it. speaking of — місток від щойно сказаного.

well, I mean, you know, kind of — розмовні пом'якшувачі; у формальному письмі їх майже немає. at the end of the day — «у підсумку» (трохи кліше). Не ставте actually в кожну репліку — це шум. Обирайте маркер за функцією: уточнення, повернення, зміна теми, підсумок.""",
    """Discourse markers steer the conversation; they are not the same as grammatical clause-linkers. actually / in fact correct or mildly contradict: We thought it was a cache issue. Actually, it was a race. Ukrainian “naspravdi” is not always actually: sometimes actually means “more precisely / on the contrary”. as a matter of fact is a stronger in fact.

anyway / anyhow come back to the topic or close a detour: Anyway, let's go back to the deploy. by the way introduces a new, not necessarily central, topic. as for + a noun moves to a point: As for the deadline, we can move it. speaking of is a bridge from what was just said.

well, I mean, you know, kind of are spoken softeners; they almost never appear in formal writing. at the end of the day means “when all is said and done” (a bit of a cliché). Do not put actually in every turn — that is noise. Choose a marker by function: correction, return, topic change, summary.""",
    [
        "actually / in fact — уточнення або м'яке заперечення",
        "anyway — повернення до теми; by the way — побічна тема",
        "as for + іменник — перехід до пункту",
        "Розмовні you know / I mean не для формального письма",
    ],
    [
        "actually / in fact correct or mildly contradict",
        "anyway returns to the topic; by the way is a side topic",
        "as for + a noun moves to a point",
        "Spoken you know / I mean do not belong in formal writing",
    ],
    [
        mcq(
            "en-d-discourse-r1",
            "Ви думали, що це кеш, а це гонка. Який маркер?",
            "You thought it was the cache, but it was a race. Which marker?",
            [
                "We thought it was a cache issue. Actually, it was a race.",
                "We thought it was a cache issue. Anyway, it was a race, as a precise correction.",
                "We thought it was a cache issue. By the way it was a race, as the main correction.",
                "We thought it was a cache issue. You know I mean it was a race, in a formal report.",
            ],
            0,
            "Уточнення / виправлення — actually.",
            "A correction is actually.",
        ),
        fill(
            "en-d-discourse-r2",
            "Вставте for або to (перехід до пункту: As ___ the deadline).",
            "Insert for or to (a move to a point: As ___ the deadline).",
            "As ___ the deadline, we can move it.",
            ["for", "For"],
        ),
        mcq(
            "en-d-discourse-r3",
            "Треба повернутися до деплою після відступу.",
            "You need to return to the deploy after a detour.",
            [
                "Anyway, let's go back to the deploy.",
                "Actually, let's go back to the deploy, as the best “return to topic” marker only.",
                "Namely, let's go back to the deploy.",
                "Despite, let's go back to the deploy.",
            ],
            0,
            "Повернення до теми — anyway.",
            "A return to the topic is anyway.",
        ),
        match(
            "en-d-discourse-r4",
            "Зіставте маркер із функцією.",
            "Match each marker with its function.",
            [
                ("actually / in fact", "уточнити або м'яко заперечити / correct or mildly contradict"),
                ("anyway", "повернутися до теми / return to the topic"),
                ("by the way", "побічна тема / a side topic"),
                ("as for", "перехід до конкретного пункту / move to a specific point"),
            ],
        ),
    ],
    ex(
        "en-d-discourse",
        "Для чого потрібні actually і anyway? Коли сказати as for, і чого не варто ставити в формальний звіт?",
        "What are actually and anyway for? When do you say as for, and what should you keep out of a formal report?",
        [
            idea("actually", "actually", "actually", "in fact", "correct", "уточн", "race"),
            idea("anyway", "anyway", "anyway", "return", "поверну", "topic", "теми"),
            idea("as for", "as for", "as for", "deadline", "you know", "formal", "формальн"),
        ],
        "Actually уточнює або м'яко заперечує, наприклад actually, it was a race. Anyway повертає до теми після відступу. As for вводить конкретний пункт, як as for the deadline. Розмовні you know і I mean не варто ставити в формальний звіт.",
        "Actually corrects or mildly contradicts, for example actually, it was a race. Anyway returns to the topic after a detour. As for introduces a specific point, such as as for the deadline. Spoken you know and I mean should stay out of a formal report.",
    ),
)

U11_EXAM = exam_lesson(
    "en-deep-linking-exam",
    "Контрольна: зв'язність тексту",
    "Exam: linking and discourse",
    3,
    [
        mcq(
            "en-deep-linking-exam-q1",
            "Оберіть правильне.",
            "Choose the correct option.",
            ["Although the test failed, we shipped a hotfix.", "Despite the test failed, we shipped a hotfix.", "Despite of the test failed, we shipped.", "Although the failure, we shipped."],
            0,
            "although + речення.",
            "although takes a clause.",
        ),
        mcq(
            "en-deep-linking-exam-q2",
            "Причина з іменником:",
            "A cause with a noun:",
            ["The job failed because of a timeout.", "The job failed because of the timeout happened.", "The job failed so therefore a timeout.", "The job failed because the reason is a timeout."],
            0,
            "because of + іменник.",
            "because of + a noun.",
        ),
        mcq(
            "en-deep-linking-exam-q3",
            "unless:",
            "unless:",
            ["We won't deploy unless the tests pass.", "We won't deploy unless the tests don't pass.", "We won't deploy unless if the tests pass.", "We won't deploy unless the tests passing."],
            0,
            "unless = if not, без подвійного заперечення.",
            "unless is if not, with no double negative.",
        ),
        mcq(
            "en-deep-linking-exam-q4",
            "Повернення до теми:",
            "A return to the topic:",
            ["Anyway, let's go back to the deploy.", "Namely, let's go back to the deploy.", "Despite, let's go back to the deploy.", "Such as, let's go back to the deploy."],
            0,
            "anyway повертає до теми.",
            "anyway returns to the topic.",
        ),
        fill(
            "en-deep-linking-exam-q5",
            "Вставте although або despite.",
            "Insert although or despite.",
            "___ failing the first test, we continued.",
            ["Despite", "despite"],
        ),
    ],
)

UNIT_11 = unit(
    "en-deep-linking",
    "Зв'язність тексту",
    "Linking and discourse",
    [U11_L1, U11_L2, U11_L3, U11_L4, U11_L5, U11_EXAM],
)


U12_L1 = teach(
    "en-d-inversion",
    "Інверсія: Never have I…, Not only…, Should you…",
    "Inversion: Never have I…, Not only…, Should you…",
    5,
    "Емфаза і формальний умовний",
    "Emphasis and a formal conditional",
    """Негативна інверсія: після Never, Rarely, Seldom, Hardly, No sooner, Not only, Under no circumstances допоміжне йде перед підметом. Never have I seen such a clear log. Not only did the test fail, but it also wiped the data. Rarely do we deploy on a Friday. Це письмовий, дещо урочистий стиль; у чаті він може звучати надто важко.

Hardly had we started when the pager fired. No sooner had we deployed than users complained. Після no sooner — than, не *when. Not only … but also: Not only is the API slow, but it is also undocumented.

Умовна інверсія без if: Should you need help, call us (= If you need). Were I you, I would wait (= If I were you). Had we known, we would have delayed (= If we had known). Це C1-формальність, не повсякденна розмова. Типові помилки: *Never I have seen; *Not only the test failed, but… без did; *Had we knew.""",
    """Negative inversion: after Never, Rarely, Seldom, Hardly, No sooner, Not only, Under no circumstances, the auxiliary comes before the subject. Never have I seen such a clear log. Not only did the test fail, but it also wiped the data. Rarely do we deploy on a Friday. This is a written, slightly formal style; in a chat it can sound too heavy.

Hardly had we started when the pager fired. No sooner had we deployed than users complained. After no sooner we use than, not *when. Not only … but also: Not only is the API slow, but it is also undocumented.

Conditional inversion without if: Should you need help, call us (= If you need). Were I you, I would wait (= If I were you). Had we known, we would have delayed (= If we had known). This is C1 formality, not everyday conversation. Typical mistakes: *Never I have seen; *Not only the test failed, but… without did; *Had we knew.""",
    [
        "Після never / not only / rarely — допоміжне перед підметом",
        "No sooner … than; hardly … when",
        "Should you / Were I / Had we — умовні без if",
        "Не *Never I have seen; стиль — письмовий",
    ],
    [
        "After never / not only / rarely, the auxiliary precedes the subject",
        "No sooner … than; hardly … when",
        "Should you / Were I / Had we are conditionals without if",
        "Not *Never I have seen; the style is written",
    ],
    [
        mcq(
            "en-d-inversion-r1",
            "Оберіть правильну інверсію.",
            "Choose the correct inversion.",
            [
                "Never have I seen such a clear log.",
                "Never I have seen such a clear log.",
                "Never I seen such a clear log.",
                "Never have seen I such a clear log.",
            ],
            0,
            "Never + have + підмет: Never have I seen.",
            "Never + have + subject: Never have I seen.",
        ),
        fill(
            "en-d-inversion-r2",
            "Вставте than або when (після no sooner).",
            "Insert than or when (after no sooner).",
            "No sooner had we deployed ___ users complained.",
            ["than", "Than"],
        ),
        mcq(
            "en-d-inversion-r3",
            "Формальний умовний без if (минуле).",
            "A formal conditional without if (the past).",
            [
                "Had we known, we would have delayed.",
                "Had we knew, we would have delayed.",
                "Had we known, we would delayed.",
                "If had we known, we would have delayed.",
            ],
            0,
            "Had we known = If we had known.",
            "Had we known equals If we had known.",
        ),
        translate(
            "en-d-inversion-r4",
            "Перекладіть із Not only.",
            "Translate with Not only.",
            "Тест не лише впав, а й затер дані.",
            [
                "Not only did the test fail, but it also wiped the data",
                "Not only did the test fail, but it also wiped the data.",
                "Not only did the test fail but it also wiped the data",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-inversion",
        "Коли роблять негативну інверсію і як виглядає умовна інверсія Had we known? Який стиль цього прийому?",
        "When do we use negative inversion, and what does the conditional inversion Had we known look like? What is the style of this device?",
        [
            idea("never have", "never have", "never", "not only", "rarely", "have i", "did the"),
            idea("had we", "had we", "had we known", "should you", "were i"),
            idea("формальний", "formal", "formal", "written", "письмо", "chat"),
        ],
        "Негативну інверсію роблять після never, not only, rarely: допоміжне стоїть перед підметом, наприклад Never have I seen. Had we known — це формальний умовний без if, рівний If we had known. Це письмовий, формальний стиль, не для кожного чату.",
        "We use negative inversion after never, not only and rarely: the auxiliary comes before the subject, for example Never have I seen. Had we known is a formal conditional without if, equal to If we had known. This is a written, formal style, not for every chat.",
    ),
)

U12_L2 = teach(
    "en-d-clefts",
    "Розщеплені речення: It is… that, What I need is",
    "Cleft sentences: It is… that, What I need is",
    5,
    "Виділити одну частину думки",
    "Highlighting one part of an idea",
    """Cleft (розщеплене речення) виділяє елемент, ставлячи його в окрему структуру. It is/was + виділене + that/who + решта: It was the cache that caused the outage (не мережа). It is Maria who found the bug. Це корисно в поясненнях і в письмі, коли треба сказати «саме ось це, а не інше».

Wh-cleft: What + речення + be + виділене: What we need is a clear reproduction. What happened was a race condition. The reason why / The thing that — споріднені шаблони: The reason why it failed was a missing index. All I want is a stable build.

Не перевантажуйте текст cleft у кожному реченні — тоді емфаза зникає. Типові помилки: *It was the cache caused the outage (пропущене that); *What we need is we need a test (подвоєння). Для усного акценту можна просто наголосити слово; cleft — більш контрольований письмовий інструмент.""",
    """A cleft sentence highlights an element by putting it in its own structure. It is/was + the highlighted part + that/who + the rest: It was the cache that caused the outage (not the network). It is Maria who found the bug. This is useful in explanations and in writing when you need to say “exactly this, not something else”.

A wh-cleft is What + clause + be + the highlighted part: What we need is a clear reproduction. What happened was a race condition. The reason why / The thing that are related patterns: The reason why it failed was a missing index. All I want is a stable build.

Do not overload a text with a cleft in every sentence — then the emphasis disappears. Typical mistakes: *It was the cache caused the outage (missing that); *What we need is we need a test (doubling). In speech you can simply stress a word; a cleft is a more controlled written tool.""",
    [
        "It was X that/who… — «саме X»",
        "What we need is… — виділити бажане / факт",
        "Потрібне that/who; не подвоювати дієслово",
        "Не ставити cleft у кожне речення",
    ],
    [
        "It was X that/who… means “exactly X”",
        "What we need is… highlights a want or a fact",
        "You need that/who; do not double the verb",
        "Do not put a cleft in every sentence",
    ],
    [
        mcq(
            "en-d-clefts-r1",
            "Виділіть кеш як причину.",
            "Highlight the cache as the cause.",
            [
                "It was the cache that caused the outage.",
                "It was the cache caused the outage.",
                "It was the cache what caused the outage.",
                "It was the cache who caused the outage, for a thing.",
            ],
            0,
            "It was X that… для речі.",
            "It was X that… for a thing.",
        ),
        fill(
            "en-d-clefts-r2",
            "Вставте What або That.",
            "Insert What or That.",
            "___ we need is a clear reproduction.",
            ["What", "what"],
        ),
        mcq(
            "en-d-clefts-r3",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "It is Maria who found the bug.",
                "It is Maria which found the bug, for a person in careful style.",
                "It is Maria found the bug.",
                "It is Maria what found the bug.",
            ],
            0,
            "Для людини — who (або that).",
            "For a person, who (or that).",
        ),
        translate(
            "en-d-clefts-r4",
            "Перекладіть розщепленим реченням It was… that.",
            "Translate with the cleft It was… that.",
            "Саме кеш спричинив аварію.",
            [
                "It was the cache that caused the outage",
                "It was the cache that caused the outage.",
                "It was the cache that caused the incident",
                "It was the cache that caused the incident.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-clefts",
        "Як працює It was the cache that… і What we need is…? Навіщо потрібне that і чому не варто ставити cleft усюди?",
        "How do It was the cache that… and What we need is… work? Why do you need that, and why should you not use a cleft everywhere?",
        [
            idea("it was that", "it was that", "it was", "that", "cache", "who"),
            idea("what we need is", "what we need is", "what we need", "what happened", "reproduction"),
            idea("емфаза", "emphasis", "emphasis", "емфаз", "every", "кожн", "highlight"),
        ],
        "It was the cache that caused the outage виділяє саме кеш, і слово that тут потрібне. What we need is виділяє бажане після is. Якщо ставити cleft у кожне речення, емфаза зникає.",
        "It was the cache that caused the outage highlights exactly the cache, and that is required here. What we need is highlights the wanted thing after is. If you put a cleft in every sentence, the emphasis disappears.",
    ),
)

U12_L3 = teach(
    "en-d-participles",
    "Дієприкметникові звороти",
    "Participle clauses",
    5,
    "Walking in, Having finished, The file stored in…",
    "Walking in, Having finished, The file stored in…",
    """Дієприкметниковий зворот стискає підрядне, коли підмет той самий. -ing: Walking into the room, I noticed the logs (When I walked…). Having + V3 — раніша дія: Having finished the tests, we deployed. Past participle (V3) — пасив: Written in 2019, the module is now outdated. The data stored in Redis expired.

Обов'язкова умова: підмет звороту = підмет головного речення. *Walking into the room, the logs looked strange — ніби логи зайшли в кімнату (dangling participle). Це класична C1-помилка. Виправлення: Walking into the room, I noticed the logs looked strange.

Звороти додають щільності академічному й технічному письму, але не повинні затемнювати сенс. If-звороти: If asked, I would wait. When deploying, check the flags. Не змішуйте підмети і не ставте зворот, якщо час або виконавець стають неоднозначними.""",
    """A participle clause shortens a subordinate clause when the subject is the same. -ing: Walking into the room, I noticed the logs (When I walked…). Having + V3 is an earlier action: Having finished the tests, we deployed. A past participle (V3) is passive: Written in 2019, the module is now outdated. The data stored in Redis expired.

A hard rule: the subject of the clause is the subject of the main sentence. *Walking into the room, the logs looked strange makes it sound as if the logs walked in (a dangling participle). This is a classic C1 mistake. A fix: Walking into the room, I noticed the logs looked strange.

These clauses add density to academic and technical writing, but they must not hide the meaning. If-clauses: If asked, I would wait. When deploying, check the flags. Do not mix subjects, and do not use a clause if the time or the agent becomes unclear.""",
    [
        "-ing: одночасна / тло; Having + V3: раніше",
        "V3: пасивний зворот",
        "Підмет звороту = підмет головного речення",
        "Уникайте dangling participle: *Walking in, the logs…",
    ],
    [
        "-ing is simultaneous / background; Having + V3 is earlier",
        "V3 is a passive clause",
        "The clause subject is the main-clause subject",
        "Avoid a dangling participle: *Walking in, the logs…",
    ],
    [
        mcq(
            "en-d-participles-r1",
            "Оберіть правильний зворот.",
            "Choose the correct clause.",
            [
                "Having finished the tests, we deployed.",
                "Having finished the tests, the server deployed us.",
                "Having finish the tests, we deployed.",
                "Having finished the tests, the deploy happened by itself with we missing.",
            ],
            0,
            "Той самий підмет we: having finished, we deployed.",
            "The same subject we: having finished, we deployed.",
        ),
        mcq(
            "en-d-participles-r2",
            "Яке речення має dangling participle?",
            "Which sentence has a dangling participle?",
            [
                "Walking into the room, the logs looked strange.",
                "Walking into the room, I noticed the logs looked strange.",
                "Having finished the tests, we deployed.",
                "Written in 2019, the module is now outdated.",
            ],
            0,
            "Тут ніби логи зайшли в кімнату — підмети різні.",
            "Here it sounds as if the logs walked in — the subjects differ.",
        ),
        fill(
            "en-d-participles-r3",
            "Вставте stored або storing (пасивна якість даних).",
            "Insert stored or storing (a passive quality of the data).",
            "The data ___ in Redis expired.",
            ["stored", "Stored"],
        ),
        translate(
            "en-d-participles-r4",
            "Перекладіть з Having + V3.",
            "Translate with Having + V3.",
            "Закінчивши тести, ми задеплоїли.",
            [
                "Having finished the tests, we deployed",
                "Having finished the tests, we deployed.",
                "Having completed the tests, we deployed",
                "Having completed the tests, we deployed.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-participles",
        "Яка різниця між Walking in, Having finished і Written in 2019? Що таке dangling participle?",
        "What is the difference between Walking in, Having finished and Written in 2019? What is a dangling participle?",
        [
            idea("-ing", "-ing", "walking", "ing", "simultan", "одночас"),
            idea("having", "having", "having finished", "earlier", "раніш"),
            idea("dangling", "dangling", "dangling", "logs", "subject", "підмет"),
        ],
        "Walking in описує одночасну дію того самого підмета. Having finished показує ранішу дію. Written in 2019 — пасивний зворот. Dangling participle — це коли підмети різні, як у Walking into the room, the logs looked strange.",
        "Walking in describes a simultaneous action of the same subject. Having finished shows an earlier action. Written in 2019 is a passive clause. A dangling participle is when the subjects differ, as in Walking into the room, the logs looked strange.",
    ),
)

U12_L4 = teach(
    "en-d-hedging",
    "Hedging: пом'якшення тверджень",
    "Hedging: softening claims",
    5,
    "seem, tend, it could be argued",
    "seem, tend, it could be argued",
    """Hedging — спосіб не звучати абсолютніше, ніж дозволяє доказ. Це ядро академічної та професійної англійської. Дієслова: seem, appear, tend, suggest: The logs seem to show a race. This tends to happen under load. Модальні: might, may, could: This could be a timeout. Прислівники: possibly, probably, arguably, slightly, relatively: The change is relatively small.

Безособові шаблони: It is possible that… It could be argued that… There is some evidence that… The results suggest that… Не *The results prove that, якщо ви не маєте строгого доказу. Українською «можливо / схоже / певною мірою» виконують ту саму роботу; англійською це треба ставити системно, не лише словом maybe.

Надмірний hedging теж слабкий: It might possibly perhaps be argued that there seems to be… — приберіть дублі. Поєднуйте точність і обережність: Under this load, the API appears to slow down by about 20%.""",
    """Hedging is a way of not sounding more certain than the evidence allows. It is core academic and professional English. Verbs: seem, appear, tend, suggest: The logs seem to show a race. This tends to happen under load. Modals: might, may, could: This could be a timeout. Adverbs: possibly, probably, arguably, slightly, relatively: The change is relatively small.

Impersonal patterns: It is possible that… It could be argued that… There is some evidence that… The results suggest that… Not *The results prove that if you do not have strict proof. In Ukrainian “mozhlyvo / skhozhe / pevnoiu miroiu” do the same job; in English you need to place these systematically, not only with maybe.

Too much hedging is also weak: It might possibly perhaps be argued that there seems to be… — cut the duplicates. Combine precision and caution: Under this load, the API appears to slow down by about 20%.""",
    [
        "seem / appear / tend / suggest — не абсолют",
        "might / could / possibly / relatively",
        "It could be argued that…; The results suggest…",
        "Не доводьте prove без доказу і не складайте maybe+perhaps+seem",
    ],
    [
        "seem / appear / tend / suggest avoid an absolute",
        "might / could / possibly / relatively",
        "It could be argued that…; The results suggest…",
        "Do not use prove without proof, and do not stack maybe+perhaps+seem",
    ],
    [
        mcq(
            "en-d-hedging-r1",
            "Оберіть обережне професійне формулювання, якщо доказ неповний.",
            "Choose a cautious professional wording when the evidence is incomplete.",
            [
                "The logs seem to show a race.",
                "The logs prove a race, with no further evidence.",
                "The logs might possibly perhaps seem to maybe show a race.",
                "The logs showing a race definitely always.",
            ],
            0,
            "seem to show — точний hedging без надміру.",
            "seem to show is precise hedging without excess.",
        ),
        fill(
            "en-d-hedging-r2",
            "Вставте argued або proved (шаблон обережної думки).",
            "Insert argued or proved (a pattern for a cautious view).",
            "It could be ___ that the timeout is the main cause.",
            ["argued", "Argued"],
        ),
        mcq(
            "en-d-hedging-r3",
            "Оберіть природний шаблон.",
            "Choose the natural pattern.",
            [
                "The results suggest that the index is missing.",
                "The results prove that the index is missing, if you only have a hint.",
                "The results suggest to that the index is missing.",
                "The results suggesting that is prove.",
            ],
            0,
            "suggest that — обережний висновок.",
            "suggest that is a cautious conclusion.",
        ),
        translate(
            "en-d-hedging-r4",
            "Перекладіть з hedging (seem).",
            "Translate with hedging (seem).",
            "Схоже, логи показують гонку.",
            [
                "The logs seem to show a race",
                "The logs seem to show a race condition",
                "The logs appear to show a race",
                "The logs appear to show a race condition",
                "It seems that the logs show a race",
                "It seems that the logs show a race condition",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-hedging",
        "Що таке hedging і навіщо слова seem, could і it could be argued? Чому небезпечно і prove без доказу, і стос maybe+perhaps?",
        "What is hedging, and why do we use seem, could and it could be argued? Why is it risky both to prove without evidence and to stack maybe+perhaps?",
        [
            idea("seem/tend", "seem/tend", "seem", "appear", "tend", "suggest"),
            idea("could be argued", "could be argued", "argued", "could", "possible", "evidence"),
            idea("не prove / не стос", "not prove / no stack", "prove", "perhaps", "maybe", "stack", "стос"),
        ],
        "Hedging — це пом'якшення твердження, коли доказ неповний: the logs seem to show, this could be a timeout, it could be argued that. Prove без строгого доказу занадто абсолютне, а стос maybe і perhaps робить текст слабким.",
        "Hedging is softening a claim when the evidence is incomplete: the logs seem to show, this could be a timeout, it could be argued that. Prove without strict proof is too absolute, and a stack of maybe and perhaps makes the text weak.",
    ),
)

U12_L5 = teach(
    "en-d-nominal",
    "Номіналізація: від дієслова до іменника",
    "Nominalisation: from verb to noun",
    5,
    "we decided → our decision",
    "we decided → our decision",
    """Номіналізація перетворює процес на іменник: we decided → our decision; we analysed → our analysis; they failed to start → their failure to start; we improved performance → an improvement in performance. Це характерно для академічного, юридичного й технічного письма: воно стискає інформацію і робить тему іменниковою (decision, deployment, failure).

Перевага: можна обговорити сам факт як річ (The deployment caused a spike). Небезпека: текст стає важким і безособовим, зникає, хто діяв. The decision was made to delay — слабше, ніж We decided to delay, якщо виконавець важливий. Чергуйте: живе дієслово для ясності, іменник — коли факт уже відомий і стає темою наступного речення.

Типові пари: assume — assumption, choose — choice, conclude — conclusion, deploy — deployment, intend — intention, require — requirement, respond — response. Не створюйте ланцюги з п'яти іменників підряд (the team deployment process improvement initiative) — розбийте їх дієсловами.""",
    """Nominalisation turns a process into a noun: we decided → our decision; we analysed → our analysis; they failed to start → their failure to start; we improved performance → an improvement in performance. This is typical of academic, legal and technical writing: it compresses information and makes the topic a noun (decision, deployment, failure).

The gain is that you can discuss the fact as a thing (The deployment caused a spike). The risk is that the text becomes heavy and impersonal, and the agent disappears. The decision was made to delay is weaker than We decided to delay if the agent matters. Alternate: a live verb for clarity, a noun when the fact is already known and becomes the topic of the next sentence.

Typical pairs: assume — assumption, choose — choice, conclude — conclusion, deploy — deployment, intend — intention, require — requirement, respond — response. Do not build a chain of five nouns in a row (the team deployment process improvement initiative) — break it with verbs.""",
    [
        "we decided → our decision; дієслово → іменник процесу",
        "Корисно, коли факт стає темою наступного речення",
        "Не ховайте виконавця, якщо він важливий",
        "Уникайте довгих іменникових ланцюгів",
    ],
    [
        "we decided → our decision: a verb becomes a process noun",
        "Useful when a fact becomes the topic of the next sentence",
        "Do not hide the agent when the agent matters",
        "Avoid long noun chains",
    ],
    [
        mcq(
            "en-d-nominal-r1",
            "Оберіть номіналізацію we decided.",
            "Choose the nominalisation of we decided.",
            [
                "our decision",
                "our decide",
                "we decisioned",
                "the decided",
            ],
            0,
            "decide → decision.",
            "decide becomes decision.",
        ),
        fill(
            "en-d-nominal-r2",
            "Вставте іменник від deploy.",
            "Insert the noun from deploy.",
            "The ___ caused a spike in errors.",
            ["deployment", "Deployment", "deploy", "deploying"],
        ),
        mcq(
            "en-d-nominal-r3",
            "Якщо важливо, хто вирішив, що ясніше?",
            "If it matters who decided, which is clearer?",
            [
                "We decided to delay the release.",
                "The decision was made to delay the release, with no agent.",
                "The delay decision making process initiative started.",
                "A decisioning was occurred.",
            ],
            0,
            "Живе дієслово з підметом we — найясніше.",
            "A live verb with the subject we is the clearest.",
        ),
        match(
            "en-d-nominal-r4",
            "Зіставте дієслово з іменником.",
            "Match each verb with its noun.",
            [
                ("decide", "decision"),
                ("analyse / analyze", "analysis"),
                ("require", "requirement"),
                ("respond", "response"),
            ],
        ),
    ],
    ex(
        "en-d-nominal",
        "Що таке номіналізація і коли вона корисна? Коли краще залишити живе дієслово We decided?",
        "What is nominalisation, and when is it useful? When is it better to keep the live verb We decided?",
        [
            idea("decision", "decision", "decision", "deployment", "noun", "іменник"),
            idea("тема", "topic", "topic", "тема", "next", "наступн", "spike"),
            idea("агент", "agent", "we decided", "agent", "виконав", "clear", "ясн"),
        ],
        "Номіналізація — це перетворення дієслова на іменник, наприклад we decided стає our decision, а deploy — deployment. Вона корисна, коли факт стає темою наступного речення. Якщо важливо, хто діяв, ясніше сказати We decided, а не ховати виконавця.",
        "Nominalisation is turning a verb into a noun, for example we decided becomes our decision, and deploy becomes deployment. It is useful when a fact becomes the topic of the next sentence. If it matters who acted, it is clearer to say We decided than to hide the agent.",
    ),
)

U12_EXAM = exam_lesson(
    "en-deep-c1-style-exam",
    "Контрольна: стиль C1",
    "Exam: C1 grammar and style",
    5,
    [
        mcq(
            "en-deep-c1-style-exam-q1",
            "Оберіть інверсію.",
            "Choose the inversion.",
            ["Never have I seen such a clear log.", "Never I have seen such a clear log.", "Never I seen such a clear log.", "Never have seen I such a clear log."],
            0,
            "Never have I seen.",
            "Never have I seen.",
        ),
        mcq(
            "en-deep-c1-style-exam-q2",
            "Cleft:",
            "A cleft:",
            ["It was the cache that caused the outage.", "It was the cache caused the outage.", "It was the cache what caused the outage.", "It was the cache who caused the outage, for a thing."],
            0,
            "It was X that…",
            "It was X that…",
        ),
        mcq(
            "en-deep-c1-style-exam-q3",
            "Яке речення правильне?",
            "Which sentence is correct?",
            ["Having finished the tests, we deployed.", "Walking into the room, the logs looked strange.", "Having finish the tests, we deployed.", "Having finished the tests, the server deployed us."],
            0,
            "Той самий підмет: having finished, we deployed.",
            "The same subject: having finished, we deployed.",
        ),
        mcq(
            "en-deep-c1-style-exam-q4",
            "Обережний висновок:",
            "A cautious conclusion:",
            ["The results suggest that the index is missing.", "The results prove that, with only a hint.", "The results suggest to that the index is missing.", "The results might possibly perhaps seem maybe prove."],
            0,
            "suggest that — hedging.",
            "suggest that is hedging.",
        ),
        fill(
            "en-deep-c1-style-exam-q5",
            "Вставте іменник від decide.",
            "Insert the noun from decide.",
            "Our ___ was to delay the release.",
            ["decision", "Decision"],
        ),
    ],
)

UNIT_12 = unit(
    "en-deep-c1-style",
    "Стиль C1",
    "C1 grammar and style",
    [U12_L1, U12_L2, U12_L3, U12_L4, U12_L5, U12_EXAM],
)

UNITS = [UNIT_9, UNIT_10, UNIT_11, UNIT_12]
