"""English deep part B: voice, patterns, comparison, advanced modals (units 5–8)."""
from __future__ import annotations

from ._common import exam_lesson, ex, fill, idea, match, mcq, order_words, teach, translate, unit

# ---------------------------------------------------------------------------
# Unit 5 — Passive
# ---------------------------------------------------------------------------

U5_L1 = teach(
    "en-d-pass-why",
    "Навіщо потрібен пасив",
    "Why English uses the passive",
    3,
    "be + Past Participle і фокус на дії",
    "be + past participle and a focus on the action",
    """Пасив: форма be у потрібному часі + третя форма: The report is written, was written, has been written. Дієслово be несе час, V3 — саму дію. Українською пасив теж є («звіт написано», «звіт був написаний»), але англійська вживає його набагато частіше, особливо в новинах, науці, документації та IT: The bug was fixed. A new endpoint has been deployed.

Навіщо: 1) виконавець невідомий або неважливий (My bike was stolen); 2) важливий об'єкт / результат, не той, хто зробив (The results were published yesterday); 3) ввічливість і пом'якшення (Mistakes were made — без прямого тикання пальцем); 4) зберігати ту саму тему в тексті (The server failed. It was restarted at noon).

Активний стан кращий, коли виконавець важливий і текст звучить природніше: Maria wrote the report — ясно і коротко. Не робіть пасив «для солідності» в кожному реченні: *The decision was made by me to be going — гірше, ніж I decided to go. Пасив існує не від усіх дієслів: happen, arrive, seem, have («мати») майже не пасивуються.""",
    """The passive is be in the right tense plus a past participle: The report is written, was written, has been written. Be carries the tense; the participle carries the action. Ukrainian also has a passive (“the report is written”), but English uses it much more often, especially in news, science, documentation, and IT: The bug was fixed. A new endpoint has been deployed.

Why: 1) the agent is unknown or unimportant (My bike was stolen); 2) the object or result matters more than who did it (The results were published yesterday); 3) politeness and softening (Mistakes were made — without pointing a finger); 4) keeping the same topic in a text (The server failed. It was restarted at noon).

The active is better when the agent matters and the sentence is more natural: Maria wrote the report is clear and short. Do not use the passive “to sound serious” in every sentence: *The decision was made by me to be going is worse than I decided to go. Not every verb has a natural passive: happen, arrive, seem, and have (“possess”) are almost never passivised.""",
    [
        "Форма: be (у потрібному часі) + V3",
        "Пасив — коли важливий об'єкт або виконавець невідомий",
        "Часто в новинах, документації, IT-статусах",
        "Не пасивувати все підряд і не всі дієслова",
    ],
    [
        "Form: be (in the right tense) + past participle",
        "Use the passive when the object matters or the agent is unknown",
        "Common in news, documentation, and IT status updates",
        "Do not passivise every sentence or every verb",
    ],
    [
        mcq(
            "en-d-pass-why-r1",
            "Оберіть природний пасив.",
            "Choose the natural passive.",
            [
                "The bug was fixed yesterday.",
                "The bug was fix yesterday.",
                "The bug were fixed yesterday.",
                "The bug was fixing yesterday as a finished result.",
            ],
            0,
            "was + fixed — Past Simple passive.",
            "was + fixed is a Past Simple passive.",
        ),
        fill(
            "en-d-pass-why-r2",
            "Вставте is або was (результат зараз: баг уже виправлений у тексті статусу).",
            "Insert is or was (a current result: the bug is already fixed in a status text).",
            "The issue ___ documented in the ticket.",
            ["is", "Is"],
        ),
        mcq(
            "en-d-pass-why-r3",
            "Коли активний стан кращий?",
            "When is the active better?",
            [
                "Коли виконавець важливий і речення звучить природніше: Maria wrote the report.",
                "Завжди: пасив в англійській заборонений.",
                "Лише в заголовках новин.",
                "Коли ви не знаєте третьої форми.",
            ],
            0,
            "Якщо важлива Марія як автор — активний стан ясніший.",
            "If Maria as the author matters, the active is clearer.",
            [
                "When the agent matters and the sentence sounds more natural: Maria wrote the report.",
                "Always: the passive is banned in English.",
                "Only in news headlines.",
                "When you do not know the past participle.",
            ],
        ),
        translate(
            "en-d-pass-why-r4",
            "Перекладіть пасивом (виконавець неважливий).",
            "Translate in the passive (the agent is unimportant).",
            "Мій велосипед украли.",
            [
                "My bike was stolen",
                "My bicycle was stolen",
                "My bike has been stolen",
                "My bicycle has been stolen",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-pass-why",
        "Як утворюється пасив і в яких ситуаціях він доречніший за активний стан?",
        "How is the passive formed, and in which situations is it more appropriate than the active?",
        [
            idea("форма", "form", "be", "participle", "v3", "третя", "was"),
            idea("виконавець", "agent", "unknown", "невідом", "unimportant", "неважлив", "agent", "виконав"),
            idea("об'єкт", "object", "result", "результат", "bug", "published", "fixed"),
        ],
        "Пасив утворюється з be у потрібному часі і третьої форми дієслова, наприклад the bug was fixed. Він доречний, коли виконавець невідомий або неважливий, а важливий об'єкт чи результат.",
        "The passive is formed with be in the right tense and a past participle, for example the bug was fixed. It is appropriate when the agent is unknown or unimportant, and the object or result matters.",
    ),
)

U5_L2 = teach(
    "en-d-pass-tenses",
    "Пасив у різних часах",
    "The passive across tenses",
    3,
    "Як міняється лише be",
    "Only be changes",
    """У пасиві міняється форма be, а V3 залишається. Present Simple: The mail is delivered at ten. Present Continuous: The mail is being delivered now (is/are being + V3). Past Simple: was/were delivered. Past Continuous: was/were being delivered. Present Perfect: has/have been delivered. Past Perfect: had been delivered. Future: will be delivered. Модальні: can be delivered, must be checked, should have been fixed.

Зверніть увагу на being і been: being — процес (is being updated), been — перфект (has been updated). Типова помилка: *The file is been updated і *The file has being updated. Ще одна: пропуск be (*The file updated yesterday у значенні пасиву — це виглядає як актив без підмета-виконавця).

Не всі часи однаково часті: Future Continuous passive (will be being) звучить важко і його майже не вживають. Present Perfect Continuous passive теж рідкісний. Обирайте найпростіший час, який передає зміст: The server is being rebooted зараз; The server has been rebooted — уже перезавантажений.""",
    """In the passive, the form of be changes and the participle stays the same. Present Simple: The mail is delivered at ten. Present Continuous: The mail is being delivered now (is/are being + V3). Past Simple: was/were delivered. Past Continuous: was/were being delivered. Present Perfect: has/have been delivered. Past Perfect: had been delivered. Future: will be delivered. With modals: can be delivered, must be checked, should have been fixed.

Watch being versus been: being is a process (is being updated), been is perfect (has been updated). A typical mistake is *The file is been updated and *The file has being updated. Another is dropping be (*The file updated yesterday meant as a passive — it looks like an active with no agent).

Not every tense is equally common: a Future Continuous passive (will be being) is heavy and almost unused. A Present Perfect Continuous passive is also rare. Choose the simplest tense that carries the meaning: The server is being rebooted for right now; The server has been rebooted — it is already back up.""",
    [
        "Міняється be: is / is being / was / has been / will be / can be",
        "being — процес; been — перфект",
        "Не *is been і не *has being",
        "Важкі пасиви (will be being) краще обходити",
    ],
    [
        "Be changes: is / is being / was / has been / will be / can be",
        "being is a process; been is perfect",
        "Not *is been and not *has being",
        "Heavy passives (will be being) are better avoided",
    ],
    [
        mcq(
            "en-d-pass-tenses-r1",
            "Сервер саме зараз перезавантажують. Яка форма?",
            "The server is being rebooted right now. Which form?",
            [
                "The server is being rebooted.",
                "The server is been rebooted.",
                "The server has being rebooted.",
                "The server being rebooted.",
            ],
            0,
            "Процес зараз — is being + V3.",
            "A process now is is being + V3.",
        ),
        fill(
            "en-d-pass-tenses-r2",
            "Вставте been або being.",
            "Insert been or being.",
            "The endpoint has ___ deployed.",
            ["been", "Been"],
        ),
        mcq(
            "en-d-pass-tenses-r3",
            "Оберіть правильний модальний пасив.",
            "Choose the correct modal passive.",
            [
                "The password must be changed.",
                "The password must been changed.",
                "The password must being changed.",
                "The password must be change.",
            ],
            0,
            "must be + V3: must be changed.",
            "must be + V3: must be changed.",
        ),
        translate(
            "en-d-pass-tenses-r4",
            "Перекладіть Present Perfect passive.",
            "Translate with a Present Perfect passive.",
            "Новий ендпоінт уже задеплоїли.",
            [
                "A new endpoint has been deployed",
                "The new endpoint has been deployed",
                "A new endpoint has already been deployed",
                "The new endpoint has already been deployed",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-pass-tenses",
        "Що змінюється в пасиві в різних часах? Чим being відрізняється від been?",
        "What changes in the passive across tenses? How is being different from been?",
        [
            idea("be", "be", "be", "is", "was", "been", "will be"),
            idea("being", "being", "being", "process", "процес", "now", "зараз"),
            idea("been", "been", "been", "perfect", "перфект", "has been", "deployed"),
        ],
        "У пасиві змінюється форма be, а третя форма залишається. Being показує процес, наприклад is being rebooted. Been входить до перфекта: has been deployed.",
        "In the passive the form of be changes, and the past participle stays. Being shows a process, for example is being rebooted. Been belongs to the perfect: has been deployed.",
    ),
)

U5_L3 = teach(
    "en-d-pass-agent",
    "Виконавець і прийменник by",
    "The agent and by",
    3,
    "Коли згадувати, хто зробив",
    "When to mention who did it",
    """Якщо виконавець потрібен, його ставлять після by: The report was written by Maria. The village was destroyed by a flood (тут «виконавець» — причина, не людина). Інструмент часто йде з with: The door was opened with a key; by — ближче до агенса (by the guard).

Виконавця часто пропускають, якщо він очевидний, невідомий або неважливий: The streets are cleaned every morning (і так зрозуміло, що службою). Не додавайте by people, by someone без потреби — це шум. Натомість, коли ім'я чи організація важливі (автор, компанія, закон), by обов'язкове: This rule was introduced by the new regulation.

Порядок слів: не ставте by-фразу між be і V3 (*was by Maria written). Типова калька з української — *The report written by Maria was у зайвому пасиві всередині. Якщо виконавців двоє і текст плутається, поверніться до активного стану.""",
    """If the agent is needed, it comes after by: The report was written by Maria. The village was destroyed by a flood (here the “agent” is a cause, not a person). An instrument often takes with: The door was opened with a key; by is closer to an agent (by the guard).

The agent is often omitted when it is obvious, unknown, or unimportant: The streets are cleaned every morning (we already understand it is the city service). Do not add by people or by someone without a reason — that is noise. When a name or organisation matters (an author, a company, a law), by is required: This rule was introduced by the new regulation.

Word order: do not put the by-phrase between be and the participle (*was by Maria written). A typical Ukrainian calque is a clumsy extra passive. If two agents make the sentence confusing, switch back to the active.""",
    [
        "Виконавець — після by; інструмент часто with",
        "Пропускайте by people, якщо це порожній шум",
        "Коли ім'я важливе — by обов'язкове",
        "Не вставляти by між be і V3",
    ],
    [
        "The agent comes after by; an instrument often takes with",
        "Drop by people when it is empty noise",
        "When a name matters, by is required",
        "Do not insert by between be and the participle",
    ],
    [
        mcq(
            "en-d-pass-agent-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "The report was written by Maria.",
                "The report was by Maria written.",
                "The report written was by Maria been.",
                "The report was written with Maria as the author agent.",
            ],
            0,
            "by Maria після дієслова: was written by Maria.",
            "by Maria comes after the verb: was written by Maria.",
        ),
        fill(
            "en-d-pass-agent-r2",
            "Вставте by або with (інструмент).",
            "Insert by or with (an instrument).",
            "The door was opened ___ a key.",
            ["with", "With"],
        ),
        mcq(
            "en-d-pass-agent-r3",
            "Яке by зайве?",
            "Which by is unnecessary?",
            [
                "The streets are cleaned every morning by people someone (empty).",
                "This rule was introduced by the new regulation.",
                "The novel was written by George Orwell.",
                "The village was destroyed by a flood.",
            ],
            0,
            "by people someone не додає інформації — це шум.",
            "by people someone adds no information — it is noise.",
        ),
        translate(
            "en-d-pass-agent-r4",
            "Перекладіть пасивом і збережіть автора.",
            "Translate in the passive and keep the author.",
            "Звіт написала Марія.",
            [
                "The report was written by Maria",
                "The report was written by Maria.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-pass-agent",
        "Коли в пасиві згадують виконавця з by, а коли його пропускають? Чим by відрізняється від with?",
        "When does a passive mention the agent with by, and when is the agent left out? How is by different from with?",
        [
            idea("by", "by", "by", "maria", "agent", "виконав", "author"),
            idea("пропуск", "omission", "omit", "пропуск", "obvious", "очевид", "unknown", "невідом"),
            idea("with", "with", "with", "key", "instrument", "інструмент"),
        ],
        "Виконавця ставлять після by, коли ім'я важливе, наприклад written by Maria. Його пропускають, коли він очевидний або неважливий. Інструмент часто йде з with, як with a key.",
        "We put the agent after by when the name matters, for example written by Maria. We omit it when it is obvious or unimportant. An instrument often takes with, as in with a key.",
    ),
)

U5_L4 = teach(
    "en-d-pass-impersonal",
    "Impersonal: it is said, they say",
    "Impersonal: it is said, they say",
    4,
    "Відстань від джерела",
    "Distance from the source",
    """Щоб повідомити думку чи чутки без конкретного автора, англійська любить безособовий пасив: It is said that the API will change. It is believed that the cause is a race condition. It has been reported that… Це стилістично близько до «кажуть, що», «вважають, що».

Два шаблони: 1) It + be + V3 + that-clause: It is expected that the release will slip. 2) Підмет-людина + be + V3 + to-infinitive: She is said to be the best candidate. The server is known to fail under load. Другий шаблон часто коротший і природніший у новинах.

They say / people say — розмовніший активний варіант. Не мішайте: *It is said the API will change without that можливе в мовленні, але в письмі that допомагає. Типова помилка: *It says that the API will change у значенні «кажуть» — it says потребує конкретного тексту (The docs say that…). Для формального звіту пасив it is recommended that… звучить стандартно.""",
    """To report an opinion or a rumour without a named author, English likes an impersonal passive: It is said that the API will change. It is believed that the cause is a race condition. It has been reported that… Stylistically this is close to “they say that”, “it is thought that”.

Two patterns: 1) It + be + V3 + that-clause: It is expected that the release will slip. 2) A person or thing as subject + be + V3 + to-infinitive: She is said to be the best candidate. The server is known to fail under load. The second pattern is often shorter and more natural in news.

They say / people say is a more conversational active option. Do not mix forms: *It is said the API will change without that is possible in speech, but in writing that helps. A typical mistake is *It says that the API will change meaning “people say” — it says needs a concrete text (The docs say that…). In a formal report, the passive it is recommended that… is standard.""",
    [
        "It is said/believed/expected that… — безособова думка",
        "She is said to be… — коротший шаблон з to",
        "they say — розмовніший актив",
        "it says потребує конкретного тексту, не «кажуть»",
    ],
    [
        "It is said/believed/expected that… is an impersonal opinion",
        "She is said to be… is a shorter pattern with to",
        "they say is a more conversational active",
        "it says needs a concrete text, not “people say”",
    ],
    [
        mcq(
            "en-d-pass-impersonal-r1",
            "Оберіть природний безособовий пасив.",
            "Choose the natural impersonal passive.",
            [
                "It is said that the API will change.",
                "It says that the API will change (meaning “people say”, with no document).",
                "It is say that the API will change.",
                "It said to the API will change.",
            ],
            0,
            "It is said that — стандартний безособовий шаблон.",
            "It is said that is the standard impersonal pattern.",
        ),
        fill(
            "en-d-pass-impersonal-r2",
            "Вставте to або that (шаблон з підметом-людиною).",
            "Insert to or that (the pattern with a person as subject).",
            "She is said ___ be the best candidate.",
            ["to", "To"],
        ),
        mcq(
            "en-d-pass-impersonal-r3",
            "The docs ___ that we must rotate keys. Що правильно, якщо є конкретний текст?",
            "The docs ___ that we must rotate keys. What is right when there is a concrete text?",
            ["say", "is said", "are said to saying", "is say"],
            0,
            "Конкретний документ — The docs say that…",
            "A concrete document takes The docs say that…",
        ),
        translate(
            "en-d-pass-impersonal-r4",
            "Перекладіть безособовим пасивом It is… that.",
            "Translate with the impersonal passive It is… that.",
            "Кажуть, що реліз затримається.",
            [
                "It is said that the release will be delayed",
                "It is said that the release will slip",
                "It is expected that the release will be delayed",
                "It is expected that the release will slip",
                "It is believed that the release will be delayed",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-pass-impersonal",
        "Опишіть два шаблони безособового пасиву (it is said that і she is said to). Чим вони відрізняються від The docs say?",
        "Describe the two impersonal-passive patterns (it is said that and she is said to). How do they differ from The docs say?",
        [
            idea("it is said that", "it is said that", "it is said", "that", "believed", "expected"),
            idea("said to", "said to", "said to", "to be", "known to"),
            idea("docs say", "docs say", "docs", "document", "текст", "say that"),
        ],
        "Один шаблон — it is said that і підрядне речення. Другий — she is said to be, коротший інфінітив. The docs say вживають, коли є конкретний текст документа, а не безособове «кажуть».",
        "One pattern is it is said that plus a clause. The second is she is said to be, a shorter infinitive. The docs say is used when there is a concrete document, not an impersonal “people say”.",
    ),
)

U5_L5 = teach(
    "en-d-causative",
    "Causative: have/get something done",
    "Causative: have/get something done",
    4,
    "Зробити так, щоб це зробили за вас",
    "Arranging for something to be done for you",
    """Конструкція have + object + V3 означає, що ви організували послугу, а виконав її хтось інший: I had my laptop repaired (відніс у сервіс). She is having her hair cut tomorrow. I need to have this contract checked. Це не Past Perfect (had repaired як «сам уже відремонтував до того моменту»).

get + object + V3 — схоже, часто розмовніше або з відтінком «вдалося / доклав зусиль»: I must get this fixed today. We got the server upgraded. У пасивному значенні I got my bag stolen — «у мене вкрали сумку» (неприємність, не замовлення послуги). Контекст розрізняє.

Типові помилки: *I repaired my laptop у значенні «відніс у сервіс» (це звучить, ніби ви самі паяли); *I had repaired my laptop when you mean a service (це Past Perfect). Порядок: have/get + річ + V3, не *have repaired my laptop у цьому значенні без об'єкта на своєму місці. Для українськомовних орієнтир: «мені зробили / я зробив через сервіс» = have/get something done.""",
    """The pattern have + object + past participle means you arranged a service and someone else did the work: I had my laptop repaired (you took it to a shop). She is having her hair cut tomorrow. I need to have this contract checked. This is not Past Perfect (had repaired as “I myself had already repaired it before then”).

get + object + V3 is similar, often more colloquial or with a flavour of “I managed / I made an effort”: I must get this fixed today. We got the server upgraded. In a passive sense, I got my bag stolen means “my bag was stolen” (a misfortune, not a booked service). Context tells them apart.

Typical mistakes: *I repaired my laptop meaning “I took it to a shop” (that sounds as if you soldered it yourself); *I had repaired my laptop when you mean a service (that is Past Perfect). The order is have/get + thing + V3, not *have repaired my laptop in this meaning with the object in the wrong place. For Ukrainian speakers a useful test is: “it was done for me / I had it done via a service” = have/get something done.""",
    [
        "have + object + V3 — послуга, виконана іншим",
        "Це не Past Perfect had repaired",
        "get — розмовніше або «вдалося / довелося»",
        "got my bag stolen може бути неприємністю, не замовленням",
    ],
    [
        "have + object + V3 is a service done by someone else",
        "This is not Past Perfect had repaired",
        "get is more colloquial, or “managed / had to”",
        "got my bag stolen can be a misfortune, not a booking",
    ],
    [
        mcq(
            "en-d-causative-r1",
            "Ви віднесли ноутбук у сервіс. Що сказати?",
            "You took the laptop to a repair shop. What do you say?",
            [
                "I had my laptop repaired.",
                "I had repaired my laptop before noon (Past Perfect, I did it myself).",
                "I repaired my laptop, meaning a shop did it, with no causative.",
                "I had my laptop repairing.",
            ],
            0,
            "have + object + V3: had my laptop repaired.",
            "have + object + V3: had my laptop repaired.",
        ),
        fill(
            "en-d-causative-r2",
            "Вставте cut або cutting.",
            "Insert cut or cutting.",
            "She is having her hair ___ tomorrow.",
            ["cut", "Cut"],
        ),
        mcq(
            "en-d-causative-r3",
            "Яке речення — неприємність, не замовлена послуга?",
            "Which sentence is a misfortune, not a booked service?",
            [
                "I got my bag stolen on the train.",
                "I had my hair cut at the salon I booked.",
                "I had the contract checked by a lawyer.",
                "We got the server upgraded on purpose.",
            ],
            0,
            "got my bag stolen — зі мною це сталося, я не замовляв крадіжку.",
            "got my bag stolen is something that happened to me, not a service I booked.",
        ),
        translate(
            "en-d-causative-r4",
            "Перекладіть каузативом have something done.",
            "Translate with causative have something done.",
            "Мені треба перевірити цей контракт (через юриста).",
            [
                "I need to have this contract checked",
                "I need to have the contract checked",
                "I have to have this contract checked",
                "I have to have the contract checked",
                "I need to get this contract checked",
                "I need to get the contract checked",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-causative",
        "Що означає have something done і чому це не Past Perfect? Коли get something done може означати неприємність?",
        "What does have something done mean, and why is it not Past Perfect? When can get something done mean a misfortune?",
        [
            idea("послуга", "service", "have", "repaired", "service", "послуг", "shop", "сервіс"),
            idea("об'єкт + V3", "object + V3", "object", "laptop", "hair", "contract", "v3"),
            idea("stolen", "stolen", "stolen", "misfortune", "неприєм", "bag", "got my"),
        ],
        "Have something done означає, що послугу виконав хтось інший, наприклад I had my laptop repaired у сервісі. Це не Past Perfect, бо тут є об'єкт між had і третьою формою. Get my bag stolen описує неприємність, а не замовлену послугу.",
        "Have something done means someone else performed a service, for example I had my laptop repaired at a shop. This is not Past Perfect, because an object sits between had and the participle. Get my bag stolen describes a misfortune, not a booked service.",
    ),
)

U5_EXAM = exam_lesson(
    "en-deep-passive-exam",
    "Контрольна: пасив і causative",
    "Exam: the passive and causative",
    4,
    [
        mcq(
            "en-deep-passive-exam-q1",
            "The bug ___ yesterday.",
            "The bug ___ yesterday.",
            ["was fixed", "was fix", "were fixed", "is been fixed"],
            0,
            "Past Simple passive: was fixed.",
            "Past Simple passive: was fixed.",
        ),
        mcq(
            "en-deep-passive-exam-q2",
            "Сервер саме зараз перезавантажують.",
            "The server is being rebooted right now.",
            [
                "The server is being rebooted.",
                "The server is been rebooted.",
                "The server has being rebooted.",
                "The server being rebooted.",
            ],
            0,
            "Процес — is being rebooted.",
            "A process is is being rebooted.",
        ),
        mcq(
            "en-deep-passive-exam-q3",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "The report was written by Maria.",
                "The report was by Maria written.",
                "The report written was by Maria.",
                "The report was written with Maria as a key instrument.",
            ],
            0,
            "by Maria після V3.",
            "by Maria comes after the participle.",
        ),
        mcq(
            "en-deep-passive-exam-q4",
            "Безособовий шаблон:",
            "An impersonal pattern:",
            [
                "It is said that the API will change.",
                "It says that the API will change, with no document, as “people say”.",
                "It is say that the API will change.",
                "It said the API to change.",
            ],
            0,
            "It is said that…",
            "It is said that…",
        ),
        fill(
            "en-deep-passive-exam-q5",
            "Вставте repaired або repairing (каузатив: сервіс).",
            "Insert repaired or repairing (causative: a shop).",
            "I had my laptop ___ last week.",
            ["repaired", "Repaired"],
        ),
    ],
)

UNIT_5 = unit(
    "en-deep-passive",
    "Пасивний стан",
    "The passive",
    [U5_L1, U5_L2, U5_L3, U5_L4, U5_L5, U5_EXAM],
)


# ---------------------------------------------------------------------------
# Unit 6 — Gerunds and infinitives
# ---------------------------------------------------------------------------

U6_L1 = teach(
    "en-d-verb-ing",
    "Дієслово + -ing",
    "Verb + -ing",
    3,
    "Герундій після певних дієслів",
    "A gerund after certain verbs",
    """Після низки дієслів англійська вимагає -ing, не to: enjoy, finish, avoid, consider, mind, suggest, keep, miss, practise, imagine, risk, admit, deny, involve, delay, give up, can't help. I enjoy learning English. She suggested taking a break. Would you mind closing the door? Не *I enjoy to learn і не *She suggested to take (хоча suggest that we take можливе).

Герундій може бути підметом: Learning English takes time. Після прийменника завжди -ing: I'm good at explaining bugs. Thank you for coming. She's interested in joining the team. Це важливе правило: прийменник + V-ing, ніколи *interested to joining.

Для українськомовних пастка — перекладати інфінітивом («люблю вчити»), бо в українській після «люблю» йде інфінітив. Складіть свій короткий список «-ing дієслів» і повторюйте його в реченнях, не окремими словами.""",
    """After a group of verbs English requires -ing, not to: enjoy, finish, avoid, consider, mind, suggest, keep, miss, practise, imagine, risk, admit, deny, involve, delay, give up, can't help. I enjoy learning English. She suggested taking a break. Would you mind closing the door? Not *I enjoy to learn, and not *She suggested to take (though suggest that we take is possible).

A gerund can be a subject: Learning English takes time. After a preposition you always use -ing: I'm good at explaining bugs. Thank you for coming. She's interested in joining the team. This is a hard rule: preposition + V-ing, never *interested to joining.

For Ukrainian speakers the trap is translating with an infinitive (“I like to learn”), because Ukrainian often uses an infinitive after “like”. Make a short personal list of “-ing verbs” and recycle them in sentences, not as isolated words.""",
    [
        "enjoy, finish, avoid, mind, suggest, keep… + -ing",
        "Після прийменника завжди V-ing",
        "Герундій може бути підметом: Learning takes time",
        "Не *enjoy to learn, не *interested to joining",
    ],
    [
        "enjoy, finish, avoid, mind, suggest, keep… take -ing",
        "After a preposition always use V-ing",
        "A gerund can be a subject: Learning takes time",
        "Not *enjoy to learn, not *interested to joining",
    ],
    [
        mcq(
            "en-d-verb-ing-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "I enjoy learning English.",
                "I enjoy to learn English.",
                "I enjoy learn English.",
                "I enjoy to learning English.",
            ],
            0,
            "enjoy + -ing: enjoy learning.",
            "enjoy + -ing: enjoy learning.",
        ),
        fill(
            "en-d-verb-ing-r2",
            "Вставте форму close (одне слово).",
            "Insert a form of close (one word).",
            "Would you mind ___ the door?",
            ["closing", "Closing"],
        ),
        mcq(
            "en-d-verb-ing-r3",
            "Оберіть правильне після прийменника.",
            "Choose the correct form after a preposition.",
            [
                "She's interested in joining the team.",
                "She's interested to joining the team.",
                "She's interested in join the team.",
                "She's interested for join the team.",
            ],
            0,
            "in — прийменник, тому joining.",
            "in is a preposition, so joining.",
        ),
        translate(
            "en-d-verb-ing-r4",
            "Перекладіть, використавши suggest + -ing.",
            "Translate using suggest + -ing.",
            "Вона запропонувала зробити перерву.",
            [
                "She suggested taking a break",
                "She suggested having a break",
                "She suggested taking a rest",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-verb-ing",
        "Після яких дієслів потрібне -ing і яке правило діє після прийменника?",
        "After which verbs do we need -ing, and what is the rule after a preposition?",
        [
            idea("enjoy/suggest", "enjoy/suggest", "enjoy", "suggest", "mind", "avoid", "finish"),
            idea("-ing", "-ing", "ing", "learning", "taking", "closing", "герундій", "gerund"),
            idea("прийменник", "preposition", "preposition", "прийменник", "in joining", "at", "for"),
        ],
        "Після enjoy, suggest, mind, avoid і подібних дієслів потрібне -ing, наприклад I enjoy learning. Після прийменника завжди герундій: interested in joining, не to joining.",
        "After enjoy, suggest, mind, avoid and similar verbs we need -ing, for example I enjoy learning. After a preposition we always use a gerund: interested in joining, not to joining.",
    ),
)

U6_L2 = teach(
    "en-d-verb-to",
    "Дієслово + to-infinitive",
    "Verb + to-infinitive",
    3,
    "want, decide, hope, plan…",
    "want, decide, hope, plan…",
    """Інша велика група бере to + інфінітив: want, need, decide, hope, plan, expect, promise, refuse, offer, agree, learn, afford, manage, fail, pretend, seem, tend, would like. I decided to leave. She hopes to join the team. We can't afford to wait. Не *decided leaving і не *want go (пропущений to).

Після would like / would love / would prefer — теж to: I'd like to ask a question. Після make і let — голий інфінітив без to: They made me wait. Let me explain. Після help можливі обидва: She helped me (to) install the tool.

Helpful contrast: I want to finish (інфінітив) проти I finished writing (герундій). Список треба вчити з реченнями. Типова помилка українськомовних — *I want go, *I decided go, бо в українській «хочу піти» без окремого to.""",
    """Another large group takes to + infinitive: want, need, decide, hope, plan, expect, promise, refuse, offer, agree, learn, afford, manage, fail, pretend, seem, tend, would like. I decided to leave. She hopes to join the team. We can't afford to wait. Not *decided leaving and not *want go (missing to).

After would like / would love / would prefer, also use to: I'd like to ask a question. After make and let, use a bare infinitive without to: They made me wait. Let me explain. After help both are possible: She helped me (to) install the tool.

A useful contrast is I want to finish (infinitive) versus I finished writing (gerund). Learn the lists in sentences. A typical Ukrainian-speaker mistake is *I want go, *I decided go, because Ukrainian “I want to go” has no separate to.""",
    [
        "want, decide, hope, plan, promise, refuse, afford… + to",
        "would like + to; make/let + голий інфінітив",
        "help допускає (to) або без to",
        "Не *I want go, не *I decided leaving",
    ],
    [
        "want, decide, hope, plan, promise, refuse, afford… take to",
        "would like takes to; make/let take a bare infinitive",
        "help allows (to) or no to",
        "Not *I want go, not *I decided leaving",
    ],
    [
        mcq(
            "en-d-verb-to-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "I decided to leave.",
                "I decided leaving.",
                "I decided leave.",
                "I decided to leaving.",
            ],
            0,
            "decide + to-infinitive: decided to leave.",
            "decide + to-infinitive: decided to leave.",
        ),
        fill(
            "en-d-verb-to-r2",
            "Вставте to або нічого не підходить — потрібне одне слово to, якщо воно є.",
            "Insert to if it is required (one word).",
            "I'd like ___ ask a question.",
            ["to", "To"],
        ),
        mcq(
            "en-d-verb-to-r3",
            "Оберіть правильне після make.",
            "Choose the correct form after make.",
            [
                "They made me wait.",
                "They made me to wait.",
                "They made me waiting.",
                "They made me to waiting.",
            ],
            0,
            "make + object + голий інфінітив: made me wait.",
            "make + object + bare infinitive: made me wait.",
        ),
        translate(
            "en-d-verb-to-r4",
            "Перекладіть з hope + to.",
            "Translate with hope + to.",
            "Вона сподівається приєднатися до команди.",
            [
                "She hopes to join the team",
                "She hopes to join the team.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-verb-to",
        "Наведіть кілька дієслів з to-infinitive і поясніть виняток make/let. Яка типова помилка I want go?",
        "Give a few verbs that take a to-infinitive and explain the make/let exception. What is the typical mistake in I want go?",
        [
            idea("to", "to", "to", "decide", "hope", "want", "promise"),
            idea("make/let", "make/let", "make", "let", "wait", "bare", "голий", "without to"),
            idea("want go", "want go", "want go", "missing", "пропущен", "to go"),
        ],
        "Дієслова на кшталт decide, hope, want і promise беруть to, наприклад I decided to leave. Після make і let інфінітив голий: they made me wait. Помилка I want go — це пропущений to.",
        "Verbs such as decide, hope, want and promise take to, for example I decided to leave. After make and let the infinitive is bare: they made me wait. The mistake I want go is a missing to.",
    ),
)

U6_L3 = teach(
    "en-d-meaning-change",
    "stop, remember, try, forget, regret",
    "stop, remember, try, forget, regret",
    4,
    "Одне дієслово — два значення",
    "One verb, two meanings",
    """Деякі дієслова змінюють значення залежно від -ing чи to. stop doing — припинити саму дію: I stopped smoking. stop to do — зупинитися з іншою метою: I stopped to smoke (зупинився, щоб закурити). Це класична пара, яку плутають найчастіше.

remember doing / forget doing — пам'ятати чи забути вже пережитий факт: I remember locking the door. I forgot meeting her last year. remember to do / forget to do — не забути виконати майбутнє або очікуване: Remember to lock the door. I forgot to send the email.

try doing — спробувати метод (можливо, інший): Try restarting the server. try to do — докласти зусилля, часто важко: I tried to restart it, but I had no access. regret doing — жалкувати про зроблене: I regret saying that. regret to do — формальне «з жалем повідомляю»: We regret to inform you… До цього ж ряду: go on doing (продовжувати те саме) проти go on to do (перейти до наступного).""",
    """Some verbs change meaning depending on -ing or to. stop doing means you end the activity itself: I stopped smoking. stop to do means you pause in order to do something else: I stopped to smoke (you stopped walking in order to have a cigarette). This is the pair people confuse most often.

remember doing / forget doing is about a past experience already lived: I remember locking the door. I forgot meeting her last year. remember to do / forget to do is about not forgetting a future or expected action: Remember to lock the door. I forgot to send the email.

try doing is trying a method (perhaps another one): Try restarting the server. try to do is making an effort, often a hard one: I tried to restart it, but I had no access. regret doing is being sorry about something already done: I regret saying that. regret to do is a formal “I am sorry to say”: We regret to inform you… In the same family: go on doing (continue the same thing) versus go on to do (move on to the next thing).""",
    [
        "stop doing = припинити дію; stop to do = зупинитися, щоб…",
        "remember/forget + -ing — минулий факт; + to — не забути зробити",
        "try + -ing — метод; try to — зусилля",
        "regret doing — жаль про минуле; regret to inform — формальність",
    ],
    [
        "stop doing = end the activity; stop to do = pause in order to…",
        "remember/forget + -ing is a past fact; + to is “don't forget to”",
        "try + -ing is a method; try to is an effort",
        "regret doing is sorrow about the past; regret to inform is formal",
    ],
    [
        mcq(
            "en-d-meaning-change-r1",
            "Людина кинула палити. Що правильно?",
            "Someone gave up smoking. Which is right?",
            [
                "I stopped smoking.",
                "I stopped to smoke (I paused in order to have a cigarette).",
                "I stopped smoke.",
                "I stopped to smoking.",
            ],
            0,
            "Припинити саму звичку — stopped smoking.",
            "Ending the habit itself is stopped smoking.",
        ),
        mcq(
            "en-d-meaning-change-r2",
            "Не забудьте зачинити двері (майбутня дія). Що сказати?",
            "Don't forget to lock the door (a future action). What do you say?",
            [
                "Remember to lock the door.",
                "Remember locking the door (a memory of a past act).",
                "Remember lock the door.",
                "Remember to locking the door.",
            ],
            0,
            "Нагадування зробити — remember to lock.",
            "A reminder to act is remember to lock.",
        ),
        fill(
            "en-d-meaning-change-r3",
            "Вставте restarting або to restart (метод як порада).",
            "Insert restarting or to restart (a method as advice).",
            "The app is frozen. Try ___ the server.",
            ["restarting", "Restarting"],
        ),
        translate(
            "en-d-meaning-change-r4",
            "Перекладіть: забув надіслати (не виконав дію).",
            "Translate: forgot to send (did not do the action).",
            "Я забув надіслати лист.",
            [
                "I forgot to send the email",
                "I forgot to send the letter",
                "I forgot to send an email",
                "I forgot to send a letter",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-meaning-change",
        "Поясніть різницю між stop doing і stop to do, а також між remember doing і remember to do.",
        "Explain the difference between stop doing and stop to do, and between remember doing and remember to do.",
        [
            idea("stop doing", "stop doing", "stop smoking", "stopped smoking", "припинити", "end"),
            idea("stop to", "stop to", "stop to", "in order", "щоб", "cigarette", "закурит"),
            idea("remember to", "remember to", "remember to", "forget to", "lock", "send", "reminder", "нагад"),
        ],
        "Stop smoking означає припинити саму дію. Stop to smoke — зупинитися, щоб закурити. Remember locking — пам'ять про минуле, а remember to lock — нагадування не забути зробити це.",
        "Stop smoking means you end the activity itself. Stop to smoke means you pause in order to have a cigarette. Remember locking is a memory of the past, and remember to lock is a reminder not to forget to do it.",
    ),
)

U6_L4 = teach(
    "en-d-adj-prep",
    "Прикметник + to і прийменник + -ing",
    "Adjective + to and preposition + -ing",
    3,
    "happy to help, good at explaining",
    "happy to help, good at explaining",
    """Багато прикметників беруть to-infinitive: happy, glad, pleased, ready, prepared, willing, easy, hard, difficult, important, possible, likely, surprised, disappointed. I'm happy to help. The ticket is easy to use. It's important to test this. It's likely to fail under load.

Якщо після прикметника стоїть прийменник, знову -ing: good at, interested in, afraid of, proud of, famous for, responsible for, keen on, tired of, used to. I'm good at explaining. She's afraid of flying. We're responsible for deploying this.

It's + adjective + to — дуже продуктивна схема: It's useful to write tests. Не *It's useful writing tests у цьому безособовому шаблоні (хоча Writing tests is useful — герундій-підмет — теж добре). Типова помилка: *I'm interested to join замість interested in joining; *I'm good to explain замість good at explaining.""",
    """Many adjectives take a to-infinitive: happy, glad, pleased, ready, prepared, willing, easy, hard, difficult, important, possible, likely, surprised, disappointed. I'm happy to help. The ticket is easy to use. It's important to test this. It's likely to fail under load.

If a preposition follows the adjective, use -ing again: good at, interested in, afraid of, proud of, famous for, responsible for, keen on, tired of, used to. I'm good at explaining. She's afraid of flying. We're responsible for deploying this.

It's + adjective + to is a very productive pattern: It's useful to write tests. *It's useful writing tests is unnatural in this impersonal pattern (though Writing tests is useful — a gerund subject — is also fine). Typical mistakes: *I'm interested to join instead of interested in joining; *I'm good to explain instead of good at explaining.""",
    [
        "happy/ready/easy/important/likely + to",
        "It's important to… — безособовий шаблон",
        "good at / interested in / afraid of / responsible for + -ing",
        "Не *interested to join, не *good to explain",
    ],
    [
        "happy/ready/easy/important/likely take to",
        "It's important to… is an impersonal pattern",
        "good at / interested in / afraid of / responsible for take -ing",
        "Not *interested to join, not *good to explain",
    ],
    [
        mcq(
            "en-d-adj-prep-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "I'm happy to help.",
                "I'm happy helping in this impersonal “I'd like to help” sense only, with no to.",
                "I'm happy to helping.",
                "I'm happy help.",
            ],
            0,
            "happy + to: happy to help.",
            "happy + to: happy to help.",
        ),
        fill(
            "en-d-adj-prep-r2",
            "Вставте at або to.",
            "Insert at or to.",
            "I'm good ___ explaining bugs.",
            ["at", "At"],
        ),
        mcq(
            "en-d-adj-prep-r3",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "She's interested in joining the team.",
                "She's interested to joining the team.",
                "She's interested to join in joining.",
                "She's interested for join the team.",
            ],
            0,
            "interested in + -ing.",
            "interested in + -ing.",
        ),
        translate(
            "en-d-adj-prep-r4",
            "Перекладіть шаблоном It's important to…",
            "Translate with the pattern It's important to…",
            "Важливо це протестувати.",
            [
                "It's important to test this",
                "It is important to test this",
                "It's important to test it",
                "It is important to test it",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-adj-prep",
        "Коли після прикметника стоїть to, а коли -ing? Наведіть happy to і good at.",
        "When does an adjective take to, and when -ing? Mention happy to and good at.",
        [
            idea("happy to", "happy to", "happy to", "to help", "important to", "ready to"),
            idea("good at", "good at", "good at", "at explaining", "interested in", "afraid of"),
            idea("прийменник + ing", "preposition + ing", "preposition", "прийменник", "ing", "joining"),
        ],
        "Багато прикметників беруть to, наприклад I'm happy to help і it's important to test. Якщо є прийменник, потрібне -ing: good at explaining, interested in joining.",
        "Many adjectives take to, for example I'm happy to help and it's important to test. If there is a preposition, we need -ing: good at explaining, interested in joining.",
    ),
)

U6_L5 = teach(
    "en-d-purpose",
    "Мета: to, for, so that, in order to",
    "Purpose: to, for, so that, in order to",
    3,
    "Навіщо ми це робимо",
    "Why we do something",
    """Найкоротший спосіб назвати мету — to + інфінітив: I wrote a test to catch this bug. She went to the office to meet the client. Це не for + інфінітив: не *I wrote a test for catch / for to catch. for + іменник або герундій називає призначення речі: This tool is for testing APIs. A cup is for drinking, not *This tool is for to test.

in order to і so as to — більш формальні синоніми to, часто в письмі: We reduced the payload in order to speed up the page. Заперечення мети: so as not to / in order not to wake the baby; не *to not завжди звучить рівно так само гладко.

so that + підмет + can/could/will/would — коли в другої частини є свій підмет або модальне: I'll send the logs so that you can reproduce the bug. Українською всі ці варіанти часто «щоб». Обирайте to, якщо підмет той самий і структура коротка; so that — якщо з'являється новий підмет.""",
    """The shortest way to name a purpose is to + infinitive: I wrote a test to catch this bug. She went to the office to meet the client. This is not for + infinitive: not *I wrote a test for catch / for to catch. for + a noun or gerund names what a thing is for: This tool is for testing APIs. A cup is for drinking, not *This tool is for to test.

in order to and so as to are more formal synonyms of to, often in writing: We reduced the payload in order to speed up the page. A negative purpose is so as not to / in order not to wake the baby; *to not is not always equally smooth.

so that + subject + can/could/will/would is for when the second part has its own subject or a modal: I'll send the logs so that you can reproduce the bug. In Ukrainian all of these often sound like “shchob”. Choose to when the subject is the same and the structure is short; so that when a new subject appears.""",
    [
        "Мета дії: to + інфінітив (не *for to)",
        "for + іменник/-ing — призначення речі",
        "in order to — формальніше to",
        "so that + новий підмет + can/could",
    ],
    [
        "Purpose of an action: to + infinitive (not *for to)",
        "for + noun/-ing is what a thing is for",
        "in order to is a more formal to",
        "so that + a new subject + can/could",
    ],
    [
        mcq(
            "en-d-purpose-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "I wrote a test to catch this bug.",
                "I wrote a test for catch this bug.",
                "I wrote a test for to catch this bug.",
                "I wrote a test for catching this bug to catch.",
            ],
            0,
            "Мета дії — to catch, не for catch.",
            "The purpose of the action is to catch, not for catch.",
        ),
        fill(
            "en-d-purpose-r2",
            "Вставте for або to.",
            "Insert for or to.",
            "This tool is ___ testing APIs.",
            ["for", "For"],
        ),
        mcq(
            "en-d-purpose-r3",
            "Новий підмет у другій частині. Що природніше?",
            "A new subject appears in the second part. Which is more natural?",
            [
                "I'll send the logs so that you can reproduce the bug.",
                "I'll send the logs to you can reproduce the bug.",
                "I'll send the logs for you reproduce the bug.",
                "I'll send the logs so that to you reproduce.",
            ],
            0,
            "Новий підмет you — so that you can…",
            "A new subject you takes so that you can…",
        ),
        translate(
            "en-d-purpose-r4",
            "Перекладіть коротким to + інфінітив.",
            "Translate with a short to + infinitive.",
            "Вона пішла в офіс, щоб зустріти клієнта.",
            [
                "She went to the office to meet the client",
                "She went to the office in order to meet the client",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-purpose",
        "Як виразити мету через to і коли потрібні for або so that? Чому *for to catch — помилка?",
        "How do you express purpose with to, and when do you need for or so that? Why is *for to catch wrong?",
        [
            idea("to + інфінітив", "to + infinitive", "to catch", "to meet", "purpose", "мета"),
            idea("for", "for", "for testing", "for", "noun", "іменник", "tool"),
            idea("so that", "so that", "so that", "can", "you can", "підмет", "subject"),
        ],
        "Мету дії найкоротше назвати через to і інфінітив, наприклад I wrote a test to catch this bug. For стоїть з іменником або -ing, коли це призначення речі: a tool for testing. So that потрібне, коли з'являється новий підмет: so that you can reproduce. For to catch — помилка.",
        "The shortest way to name the purpose of an action is to plus an infinitive, for example I wrote a test to catch this bug. For takes a noun or -ing when it is what a thing is for: a tool for testing. So that is needed when a new subject appears: so that you can reproduce. For to catch is wrong.",
    ),
)

U6_EXAM = exam_lesson(
    "en-deep-gerunds-exam",
    "Контрольна: герундій і інфінітив",
    "Exam: gerunds and infinitives",
    4,
    [
        mcq(
            "en-deep-gerunds-exam-q1",
            "I ___ learning English.",
            "I ___ learning English.",
            ["enjoy", "enjoy to", "enjoy to be", "want"],
            0,
            "Після enjoy потрібне -ing, тож дієслово enjoy підходить до learning.",
            "enjoy + -ing, so enjoy is the right verb here.",
        ),
        mcq(
            "en-deep-gerunds-exam-q2",
            "I decided ___ leave.",
            "I decided ___ leave.",
            ["to", "ing", "for", "at"],
            0,
            "decide + to leave.",
            "decide + to leave.",
        ),
        mcq(
            "en-deep-gerunds-exam-q3",
            "Людина кинула палити:",
            "Someone gave up the habit:",
            ["I stopped smoking.", "I stopped to smoke (paused to have a cigarette).", "I stopped smoke.", "I stopped to smoking."],
            0,
            "Припинити звичку — stopped smoking.",
            "Ending the habit is stopped smoking.",
        ),
        mcq(
            "en-deep-gerunds-exam-q4",
            "She's interested ___ joining the team.",
            "She's interested ___ joining the team.",
            ["in", "to", "for", "at"],
            0,
            "interested in + -ing.",
            "interested in + -ing.",
        ),
        fill(
            "en-deep-gerunds-exam-q5",
            "Вставте to або for (мета дії).",
            "Insert to or for (purpose of an action).",
            "I wrote a test ___ catch this bug.",
            ["to", "To"],
        ),
    ],
)

UNIT_6 = unit(
    "en-deep-gerunds",
    "Герундій і інфінітив",
    "Gerunds and infinitives",
    [U6_L1, U6_L2, U6_L3, U6_L4, U6_L5, U6_EXAM],
)


# ---------------------------------------------------------------------------
# Unit 7 — Comparison
# ---------------------------------------------------------------------------

U7_L1 = teach(
    "en-d-comp-reg",
    "Регулярні ступені порівняння",
    "Regular comparatives and superlatives",
    2,
    "older, more careful, the oldest",
    "older, more careful, the oldest",
    """Короткі прикметники (один склад, часто два на -y, -er, -ow, -le) утворюють вищий ступінь з -er, найвищий з -est: old — older — the oldest; nice — nicer — the nicest; happy — happier — the happiest (y → i). Довгі прикметники (два і більше складів, особливо на -ful, -ous, -ing, -ed) беруть more / the most: more careful, the most interesting.

Після вищого ступеня — than: She is older than me / than I am. Перед найвищим — the: the oldest person in the team. Типові помилки: *more older (подвійний ступінь), *the most tall, *older that me (потрібно than, не that). Українською «більш старший» калькується як *more older — цього треба уникати.

Правопис: велика літера / короткий голосний + одна приголосна в кінці часто подвоюється: big — bigger; hot — hotter. Прикметники на -e лише додають -r/-st: large — larger. Не ставте the most з коротким прикметником, якщо нормальний варіант -est уже є (*the most old).""",
    """Short adjectives (one syllable, and often two syllables ending in -y, -er, -ow, -le) take -er in the comparative and -est in the superlative: old — older — the oldest; nice — nicer — the nicest; happy — happier — the happiest (y → i). Long adjectives (two or more syllables, especially those in -ful, -ous, -ing, -ed) take more / the most: more careful, the most interesting.

After a comparative we use than: She is older than me / than I am. Before a superlative we use the: the oldest person in the team. Typical mistakes: *more older (a double comparative), *the most tall, *older that me (we need than, not that). Ukrainian “bilsh starshyi” calques as *more older — avoid it.

Spelling: a stressed short vowel plus a final single consonant often doubles: big — bigger; hot — hotter. Adjectives ending in -e just add -r/-st: large — larger. Do not use the most with a short adjective that already has a normal -est form (*the most old).""",
    [
        "Короткі: -er / the -est; довгі: more / the most",
        "Після вищого ступеня — than, не that",
        "Не *more older: один показник ступеня",
        "happy → happier; big → bigger",
    ],
    [
        "Short adjectives: -er / the -est; long ones: more / the most",
        "After a comparative use than, not that",
        "Not *more older: only one comparative marker",
        "happy → happier; big → bigger",
    ],
    [
        mcq(
            "en-d-comp-reg-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "She is older than me.",
                "She is more older than me.",
                "She is older that me.",
                "She is the more old than me.",
            ],
            0,
            "Короткий old — older than, без more і не that.",
            "Short old takes older than, without more and not that.",
        ),
        fill(
            "en-d-comp-reg-r2",
            "Вставте careful у вищому ступені (два слова, якщо потрібно).",
            "Insert the comparative of careful (two words if needed).",
            "Please be ___ with this deploy than last time.",
            ["more careful", "More careful"],
        ),
        mcq(
            "en-d-comp-reg-r3",
            "Оберіть правильний найвищий ступінь.",
            "Choose the correct superlative.",
            [
                "This is the most interesting talk today.",
                "This is the interestingest talk today.",
                "This is most interestingest talk today.",
                "This is the more interesting talk of all, with no the most.",
            ],
            0,
            "Довгий interesting — the most interesting.",
            "Long interesting takes the most interesting.",
        ),
        translate(
            "en-d-comp-reg-r4",
            "Перекладіть.",
            "Translate.",
            "Це найстаріший сервер у команді.",
            [
                "This is the oldest server on the team",
                "This is the oldest server in the team",
                "It's the oldest server on the team",
                "It is the oldest server on the team",
                "This is the oldest server in our team",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-comp-reg",
        "Як утворюють вищий і найвищий ступінь короткі та довгі прикметники? Чому *more older — помилка?",
        "How do short and long adjectives form the comparative and the superlative? Why is *more older wrong?",
        [
            idea("-er/-est", "-er/-est", "older", "oldest", "-er", "-est", "short", "коротк"),
            idea("more/most", "more/most", "more", "most", "careful", "interesting", "long", "довг"),
            idea("than", "than", "than", "that", "more older"),
        ],
        "Короткі прикметники беруть -er і the -est, наприклад older і the oldest. Довгі беруть more і the most, як more careful. More older — помилка, бо ступінь уже виражений через -er, а після порівняння стоїть than.",
        "Short adjectives take -er and the -est, for example older and the oldest. Long adjectives take more and the most, as in more careful. More older is wrong because the comparative is already marked with -er, and after a comparative we use than.",
    ),
)

U7_L2 = teach(
    "en-d-comp-irr",
    "Нерегулярні ступені: good, bad, far, little, much",
    "Irregular forms: good, bad, far, little, much",
    2,
    "better, worse, further, less, more",
    "better, worse, further, less, more",
    """Кілька прикметників і прислівників мають особливі форми. good / well — better — the best. bad / badly — worse — the worst. far — farther/further — the farthest/furthest. little (кількість) — less — the least. much / many — more — the most.

farther часто про фізичну відстань (farther down the road), further — також «подальший, додатковий»: further questions, further information. У багатьох контекстах further універсальніше. old має older (загальне) і elder / eldest переважно для родини: my elder sister (але elder не ставлять з than у сучасному вжитку так само вільно, як older than).

Типові помилки: *gooder, *badder, *more better, *the most worst. well як прислівник («добре») теж має better, не *more well: She speaks English better now. Менше + незлічуване: less time, less traffic; fewer — для злічуваних у старанному письмі: fewer bugs. У мовленні less bugs часто чути, але в тестах і акуратному письмі fewer bugs.""",
    """A few adjectives and adverbs have special forms. good / well — better — the best. bad / badly — worse — the worst. far — farther/further — the farthest/furthest. little (quantity) — less — the least. much / many — more — the most.

farther is often physical distance (farther down the road); further is also “additional”: further questions, further information. In many contexts further is the more general choice. old has older (general) and elder / eldest mainly for family: my elder sister (but elder is not used as freely with than as older than is).

Typical mistakes: *gooder, *badder, *more better, *the most worst. well as an adverb (“in a good way”) also takes better, not *more well: She speaks English better now. For a smaller amount of an uncountable: less time, less traffic; fewer is for countables in careful writing: fewer bugs. In speech, less bugs is common, but tests and careful writing prefer fewer bugs.""",
    [
        "good → better → the best; bad → worse → the worst",
        "much/many → more; little → less → the least",
        "further — також «додатковий»; farther — часто відстань",
        "Не *more better; fewer bugs у старанному письмі",
    ],
    [
        "good → better → the best; bad → worse → the worst",
        "much/many → more; little → less → the least",
        "further is also “additional”; farther is often distance",
        "Not *more better; fewer bugs in careful writing",
    ],
    [
        mcq(
            "en-d-comp-irr-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "This solution is better than the last one.",
                "This solution is more better than the last one.",
                "This solution is gooder than the last one.",
                "This solution is the more best than the last one.",
            ],
            0,
            "good — better, без more.",
            "good becomes better, without more.",
        ),
        fill(
            "en-d-comp-irr-r2",
            "Вставте worse або worst (потрібен вищий ступінь).",
            "Insert worse or worst (a comparative is needed).",
            "The second option is ___ than the first.",
            ["worse", "Worse"],
        ),
        mcq(
            "en-d-comp-irr-r3",
            "Оберіть кращий варіант для акуратного письма: ___ bugs after the fix.",
            "Choose the better option for careful writing: ___ bugs after the fix.",
            ["fewer", "less", "fewest than", "lesser"],
            0,
            "bugs — злічуване, у старанному письмі fewer.",
            "bugs is countable; careful writing prefers fewer.",
        ),
        translate(
            "en-d-comp-irr-r4",
            "Перекладіть.",
            "Translate.",
            "Це найкращий результат у команді.",
            [
                "This is the best result on the team",
                "This is the best result in the team",
                "It's the best result on the team",
                "It is the best result on the team",
                "This is the best result in our team",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-comp-irr",
        "Назвіть форми від good, bad і much. Чому *more better неправильно і коли fewer краще за less?",
        "Name the forms of good, bad and much. Why is *more better wrong, and when is fewer better than less?",
        [
            idea("better/best", "better/best", "better", "best", "good"),
            idea("worse/worst", "worse/worst", "worse", "worst", "bad"),
            idea("fewer", "fewer", "fewer", "less", "bugs", "countable", "злічуван"),
        ],
        "Good дає better і the best, bad — worse і the worst, much — more. More better неправильно, бо better уже є вищим ступенем. Fewer краще за less перед злічуваними, наприклад fewer bugs.",
        "Good becomes better and the best, bad becomes worse and the worst, and much becomes more. More better is wrong because better is already a comparative. Fewer is better than less before countables, for example fewer bugs.",
    ),
)

U7_L3 = teach(
    "en-d-as-as",
    "as…as, not as…as, the same as",
    "as…as, not as…as, the same as",
    2,
    "Рівність і нерівність без -er",
    "Equality and inequality without -er",
    """Щоб сказати «такий самий … як», використовують as + adjective/adverb + as: This API is as fast as the old one. She works as hard as her teammate. У запереченні: not as…as або not so…as: This test is not as slow as I expected (не такий повільний, як я думав). Українською це часто «не такий … як», і калька *not so like — помилка.

the same as (не *the same like, не *the same that): Your idea is the same as mine. similar to — «схожий на»: This bug is similar to the last one. as much as / as many as — кількість: We don't have as many tests as we need.

Типові помилки: *as faster as (ступінь уже в as…as, не треба -er); *as fast than; *the same like me. Для «вдвічі швидший» — twice as fast as, не *two times faster as. Половина: half as expensive as.""",
    """To say “equally …”, use as + adjective/adverb + as: This API is as fast as the old one. She works as hard as her teammate. In the negative: not as…as or not so…as: This test is not as slow as I expected. In Ukrainian this is often “not as … as”, and the calque *not so like is wrong.

the same as (not *the same like, not *the same that): Your idea is the same as mine. similar to means “alike”: This bug is similar to the last one. as much as / as many as is for quantity: We don't have as many tests as we need.

Typical mistakes: *as faster as (the comparison is already in as…as, so no -er); *as fast than; *the same like me. For “twice as fast”, say twice as fast as, not *two times faster as. For a half: half as expensive as.""",
    [
        "Рівність: as + adj + as",
        "Заперечення: not as…as (не *as faster as)",
        "the same as, не *the same like",
        "twice as fast as — «вдвічі швидший»",
    ],
    [
        "Equality: as + adj + as",
        "Negative: not as…as (not *as faster as)",
        "the same as, not *the same like",
        "twice as fast as means “two times the speed”",
    ],
    [
        mcq(
            "en-d-as-as-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "This API is as fast as the old one.",
                "This API is as faster as the old one.",
                "This API is as fast than the old one.",
                "This API is so fast like the old one.",
            ],
            0,
            "Рівність — as fast as, без -er і не than.",
            "Equality is as fast as, without -er and not than.",
        ),
        fill(
            "en-d-as-as-r2",
            "Вставте as або like (потрібна рівність).",
            "Insert as or like (equality is needed).",
            "Your idea is the same ___ mine.",
            ["as", "As"],
        ),
        mcq(
            "en-d-as-as-r3",
            "«Вдвічі швидший»:",
            "“Twice as fast”:",
            [
                "This version is twice as fast as the last one.",
                "This version is two times faster as the last one.",
                "This version is twice faster as the last one.",
                "This version is twice as faster than the last one.",
            ],
            0,
            "twice as fast as — стійка форма.",
            "twice as fast as is the fixed pattern.",
        ),
        translate(
            "en-d-as-as-r4",
            "Перекладіть.",
            "Translate.",
            "Цей тест не такий повільний, як я очікував.",
            [
                "This test is not as slow as I expected",
                "This test is not so slow as I expected",
                "The test is not as slow as I expected",
                "The test is not so slow as I expected",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-as-as",
        "Як працює as…as і чому не кажуть as faster as або the same like?",
        "How does as…as work, and why don't we say as faster as or the same like?",
        [
            idea("as…as", "as…as", "as fast as", "as…as", "equality", "рівн"),
            idea("not as", "not as", "not as", "not so", "slow"),
            idea("the same as", "the same as", "the same as", "like", "twice as"),
        ],
        "Рівність виражають через as і прикметник і знову as, наприклад as fast as. As faster as неправильно, бо -er тут зайвий. Кажемо the same as, не the same like, і twice as fast as для «вдвічі швидший».",
        "Equality is expressed with as plus an adjective plus as, for example as fast as. As faster as is wrong because the -er is extra. We say the same as, not the same like, and twice as fast as for “two times the speed”.",
    ),
)

U7_L4 = teach(
    "en-d-too-enough",
    "too і enough",
    "too and enough",
    2,
    "Надто важко, досить добре",
    "Too hard, good enough",
    """too + adjective/adverb означає «надміру, більше ніж треба», часто з негативним наслідком: This task is too hard (ми не можемо її зробити). too стоїть ПЕРЕД прикметником. enough означає «достатньо» і стоїть ПІСЛЯ прикметника / прислівника: This task is hard enough already. She doesn't write clearly enough. Але enough ПЕРЕД іменником: We don't have enough time. enough people.

Шаблони з інфінітивом: too + adj + to do: The file is too large to upload. adj + enough + to do: The file is small enough to upload. Для українськомовних пастка — ставити enough перед прикметником, як «достатньо швидкий» → *enough fast замість fast enough.

too much / too many — кількість: too much traffic, too many requests. Не плутайте too («надміру») з very («дуже», без ідеї «занадто для мети»): The film is very good — не проблема; The film is too long to watch tonight — є наслідок.""",
    """too + adjective/adverb means “more than is wanted”, often with a negative result: This task is too hard (we cannot do it). too stands BEFORE the adjective. enough means “sufficiently” and stands AFTER an adjective or adverb: This task is hard enough already. She doesn't write clearly enough. But enough stands BEFORE a noun: We don't have enough time. enough people.

Patterns with an infinitive: too + adj + to do: The file is too large to upload. adj + enough + to do: The file is small enough to upload. For Ukrainian speakers the trap is putting enough before an adjective, like “dostatnio shvydkyi” → *enough fast instead of fast enough.

too much / too many is for quantity: too much traffic, too many requests. Do not confuse too (“excess”) with very (“a high degree”, with no “too much for a purpose”): The film is very good is not a problem; The film is too long to watch tonight has a consequence.""",
    [
        "too + adj (перед): надміру, часто з наслідком",
        "adj + enough; enough + іменник",
        "too large to upload / small enough to upload",
        "too ≠ very; не *enough fast",
    ],
    [
        "too + adj (before): excess, often with a result",
        "adj + enough; enough + noun",
        "too large to upload / small enough to upload",
        "too is not very; not *enough fast",
    ],
    [
        mcq(
            "en-d-too-enough-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "The file is too large to upload.",
                "The file is enough large to upload.",
                "The file is too much large to upload.",
                "The file is large too to upload.",
            ],
            0,
            "too + adj + to: too large to upload.",
            "too + adj + to: too large to upload.",
        ),
        fill(
            "en-d-too-enough-r2",
            "Вставте enough у правильне місце — напишіть два слова: fast enough або enough fast.",
            "Insert enough in the right place — write two words: fast enough or enough fast.",
            "This query is not ___ for the dashboard.",
            ["fast enough", "Fast enough"],
        ),
        mcq(
            "en-d-too-enough-r3",
            "Оберіть правильне з іменником.",
            "Choose the correct option with a noun.",
            [
                "We don't have enough time.",
                "We don't have time enough in careful standard use for this noun pattern.",
                "We don't have too time.",
                "We don't have enough of times people.",
            ],
            0,
            "enough перед іменником: enough time.",
            "enough comes before a noun: enough time.",
        ),
        translate(
            "en-d-too-enough-r4",
            "Перекладіть.",
            "Translate.",
            "Завдання надто складне, щоб закінчити його сьогодні.",
            [
                "The task is too hard to finish today",
                "The task is too difficult to finish today",
                "This task is too hard to finish today",
                "This task is too difficult to finish today",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-too-enough",
        "Де стоять too і enough? Чим too відрізняється від very? Наведіть too large to і fast enough.",
        "Where do too and enough stand? How is too different from very? Mention too large to and fast enough.",
        [
            idea("too перед", "too before", "too", "too large", "before", "перед"),
            idea("enough після adj", "enough after adj", "enough", "fast enough", "after", "після"),
            idea("very", "very", "very", "consequence", "наслідок", "excess", "надмір"),
        ],
        "Too стоїть перед прикметником, наприклад too large to upload, і означає надмір із наслідком. Enough після прикметника: fast enough, але перед іменником: enough time. Very лише підсилює, без ідеї «занадто для мети».",
        "Too stands before an adjective, for example too large to upload, and means excess with a consequence. Enough comes after an adjective: fast enough, but before a noun: enough time. Very only strengthens, without the idea “too much for a purpose”.",
    ),
)

U7_L5 = teach(
    "en-d-so-such",
    "so і such",
    "so and such",
    3,
    "так важко / такий важкий день",
    "so hard / such a hard day",
    """so + adjective/adverb: The task is so hard. She works so quickly. such + (прикметник) + іменник: It was such a hard day. They are such good colleagues. Артикль a/an стоїть після such: such a good idea, не *a such good idea. Без іменника such не ставлять замість so: не *The task is such hard.

Шаблони наслідку: so + adj + that: The file was so large that the upload failed. such a + adj + noun + that: It was such a large file that the upload failed. Розмовне so у значенні very: I'm so tired — нормально в мовленні.

Українське «такий» спокушає завжди ставити such, навіть перед голим прикметником (*such tired). Пам'ятайте: якщо далі немає іменника — so. Якщо є іменник — such (a). so much / so many — кількість: so much work, so many tickets. so + adjective, не *so much hard.""",
    """so + adjective/adverb: The task is so hard. She works so quickly. such + (adjective) + noun: It was such a hard day. They are such good colleagues. The article a/an comes after such: such a good idea, not *a such good idea. Without a noun, do not use such in place of so: not *The task is such hard.

Result patterns: so + adj + that: The file was so large that the upload failed. such a + adj + noun + that: It was such a large file that the upload failed. Conversational so meaning very: I'm so tired is fine in speech.

Ukrainian “takyi” tempts learners to use such everywhere, even before a bare adjective (*such tired). Remember: if there is no noun after it, use so. If there is a noun, use such (a). so much / so many is for quantity: so much work, so many tickets. so + adjective, not *so much hard.""",
    [
        "so + прикметник/прислівник; such + (adj) + іменник",
        "such a good idea, не *a such good idea",
        "so/such … that — наслідок",
        "Не *such tired: без іменника — so",
    ],
    [
        "so + adjective/adverb; such + (adj) + noun",
        "such a good idea, not *a such good idea",
        "so/such … that introduces a result",
        "Not *such tired: with no noun, use so",
    ],
    [
        mcq(
            "en-d-so-such-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "It was such a hard day.",
                "It was a such hard day.",
                "It was so a hard day.",
                "It was such hard day without an article, for a singular countable.",
            ],
            0,
            "such a + adj + іменник: such a hard day.",
            "such a + adj + noun: such a hard day.",
        ),
        fill(
            "en-d-so-such-r2",
            "Вставте so або such.",
            "Insert so or such.",
            "The task is ___ hard.",
            ["so", "So"],
        ),
        mcq(
            "en-d-so-such-r3",
            "Оберіть правильний наслідок.",
            "Choose the correct result sentence.",
            [
                "The file was so large that the upload failed.",
                "The file was such large that the upload failed.",
                "The file was so a large that the upload failed.",
                "The file was such large file that the upload failed.",
            ],
            0,
            "so + adj + that: so large that…",
            "so + adj + that: so large that…",
        ),
        translate(
            "en-d-so-such-r4",
            "Перекладіть із such.",
            "Translate with such.",
            "Це така гарна ідея.",
            [
                "It's such a good idea",
                "It is such a good idea",
                "This is such a good idea",
                "That's such a good idea",
                "That is such a good idea",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-so-such",
        "Коли ставити so, а коли such? Де стоїть артикль a і як будувати so…that?",
        "When do you use so, and when such? Where does the article a go, and how do you build so…that?",
        [
            idea("so + adj", "so + adj", "so", "so hard", "so large", "adjective"),
            idea("such a", "such a", "such a", "such", "noun", "іменник", "hard day"),
            idea("that", "that", "that", "result", "наслідок", "failed"),
        ],
        "So стоїть перед прикметником без іменника: the task is so hard. Such стоїть перед іменником, а артикль a йде після such: such a good idea. Наслідок будують як so large that the upload failed.",
        "So stands before an adjective with no noun: the task is so hard. Such stands before a noun, and the article a comes after such: such a good idea. A result is built as so large that the upload failed.",
    ),
)

U7_EXAM = exam_lesson(
    "en-deep-comparison-exam",
    "Контрольна: порівняння і ступінь",
    "Exam: comparison and degree",
    3,
    [
        mcq(
            "en-deep-comparison-exam-q1",
            "She is ___ than me.",
            "She is ___ than me.",
            ["older", "more older", "older that", "the more old"],
            0,
            "old — older than.",
            "old becomes older than.",
        ),
        mcq(
            "en-deep-comparison-exam-q2",
            "This is ___ than the last idea.",
            "This is ___ than the last idea.",
            ["better", "more better", "gooder", "the more best"],
            0,
            "good — better, без more.",
            "good becomes better, without more.",
        ),
        mcq(
            "en-deep-comparison-exam-q3",
            "This API is ___ the old one.",
            "This API is ___ the old one.",
            ["as fast as", "as faster as", "as fast than", "so fast like"],
            0,
            "Рівність — as fast as.",
            "Equality is as fast as.",
        ),
        mcq(
            "en-deep-comparison-exam-q4",
            "The file is ___ to upload.",
            "The file is ___ to upload.",
            ["too large", "enough large", "too much large", "large too"],
            0,
            "too + adj + to: too large to upload.",
            "too + adj + to: too large to upload.",
        ),
        fill(
            "en-deep-comparison-exam-q5",
            "Вставте so або such.",
            "Insert so or such.",
            "It was ___ a hard day.",
            ["such", "Such"],
        ),
    ],
)

UNIT_7 = unit(
    "en-deep-comparison",
    "Ступені порівняння",
    "Comparison and degree",
    [U7_L1, U7_L2, U7_L3, U7_L4, U7_L5, U7_EXAM],
)

# ---------------------------------------------------------------------------
# Unit 8 — Advanced modals
# ---------------------------------------------------------------------------

U8_L1 = teach(
    "en-d-mod-deduce",
    "must have, might have, can't have",
    "must have, might have, can't have",
    4,
    "Ймовірність про минуле",
    "Probability about the past",
    """Модальні з have + V3 оцінюють минуле, не обов'язок. must have + V3 — майже впевнена здогадка: The lights are off. They must have left. might/may have — можливо: She might have missed the train. could have в здогадці теж «можливо було», але could have done також означає невикористану можливість (You could have told me).

can't have / couldn't have — майже впевнене заперечення: He can't have forgotten — he's too reliable. Не *mustn't have у значенні «не може бути, що»: mustn't — це заборона, не здогадка. Українською «мабуть, уже пішли» легко перекласти як *must left без have — потрібне must have left.

Шкала: must have (≈90%+ упевненості), should have (очікувано, що так і було), might/may/could have (можливо), can't have (майже неможливо). Для теперішнього без have: She must be at home (зараз). Не плутайте з Past Perfect; тут have — частина модальної конструкції.""",
    """Modals with have + V3 evaluate the past; they are not about obligation. must have + V3 is a near-certain deduction: The lights are off. They must have left. might/may have is possibility: She might have missed the train. could have in a deduction also means “it is possible that it happened”, but could have done can also be a missed opportunity (You could have told me).

can't have / couldn't have is a near-certain negative deduction: He can't have forgotten — he's too reliable. Do not use *mustn't have to mean “it is impossible that”: mustn't is prohibition, not deduction. Ukrainian “maybe they already left” is easy to translate as *must left without have — you need must have left.

A scale: must have (about 90%+ certainty), should have (it was expected to be so), might/may/could have (possible), can't have (almost impossible). For a present deduction without have: She must be at home (now). Do not confuse this with Past Perfect; here have is part of the modal structure.""",
    [
        "must have + V3 — майже впевнена здогадка про минуле",
        "might/may have — можливо; can't have — майже неможливо",
        "mustn't не означає «не може бути, що»",
        "Потрібне have: must have left, не *must left",
    ],
    [
        "must have + V3 is a near-certain deduction about the past",
        "might/may have is possible; can't have is almost impossible",
        "mustn't does not mean “it can't be that”",
        "You need have: must have left, not *must left",
    ],
    [
        mcq(
            "en-d-mod-deduce-r1",
            "Світло погашене, людей немає. Здогадка:",
            "The lights are off; nobody is there. A deduction:",
            [
                "They must have left.",
                "They must left.",
                "They mustn't have left, meaning “it is impossible that they left”, as a deduction.",
                "They must have leave.",
            ],
            0,
            "Майже впевнена здогадка — must have left.",
            "A near-certain deduction is must have left.",
        ),
        fill(
            "en-d-mod-deduce-r2",
            "Вставте have або be.",
            "Insert have or be.",
            "She might ___ missed the train.",
            ["have", "Have"],
        ),
        mcq(
            "en-d-mod-deduce-r3",
            "Майже впевнене заперечення: він надто надійний, щоб забути.",
            "A near-certain negative: he is too reliable to have forgotten.",
            [
                "He can't have forgotten.",
                "He mustn't have forgotten, as a deduction equal to “impossible”.",
                "He can't forgotten.",
                "He can't has forgotten.",
            ],
            0,
            "can't have forgotten — здогадка-заперечення.",
            "can't have forgotten is a negative deduction.",
        ),
        translate(
            "en-d-mod-deduce-r4",
            "Перекладіть здогадкою must have.",
            "Translate as a must-have deduction.",
            "Вони, мабуть, уже пішли.",
            [
                "They must have left",
                "They must have already left",
                "They must have gone",
                "They must have already gone",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-mod-deduce",
        "Що означає must have left і can't have forgotten? Чому недостатньо сказати must left і чомуmustn't тут не підходить?",
        "What do must have left and can't have forgotten mean? Why is must left not enough, and why is mustn't the wrong choice here?",
        [
            idea("must have", "must have", "must have", "left", "deduction", "здогад", "certainty"),
            idea("can't have", "can't have", "can't have", "forgotten", "impossible", "неможлив"),
            idea("have", "have", "have", "must left", "mustn't"),
        ],
        "Must have left — це майже впевнена здогадка про минуле, і слово have тут обов'язкове, не must left. Can't have forgotten — майже впевнене заперечення. Mustn't означає заборону, а не «не може бути, що».",
        "Must have left is a near-certain deduction about the past, and have is required here, not must left. Can't have forgotten is a near-certain negative deduction. Mustn't means prohibition, not “it cannot be that”.",
    ),
)

U8_L2 = teach(
    "en-d-mod-should-have",
    "should have, ought to have, could have",
    "should have, ought to have, could have",
    4,
    "Докір і невикористана можливість",
    "Criticism and a missed opportunity",
    """should have + V3 — щось було правильним або очікуваним, але (часто) не сталося: You should have written a test. I should have asked earlier. Це докір або жаль, не здогадка (здогадка — must have). ought to have — те саме, трохи формальніше.

could have + V3 — могла статися можливість, яку не використали: You could have told me. We could have caught the earlier train. Не плутайте з couldn't have (здогадка «не могло статись»). would have — нереальний наслідок у минулому (третій умовний): I would have helped if I had known.

Типові помилки: *should had written; *You should have wrote (потрібна третя форма written). Українською «треба було» — should have, не *should + Past Simple. Тон: should have може звучати різко в команді; пом'якшення: It might have been better to… / Next time we could….""",
    """should have + V3 is something that was right or expected but (often) did not happen: You should have written a test. I should have asked earlier. This is criticism or regret, not a deduction (a deduction is must have). ought to have is the same, a little more formal.

could have + V3 is a possibility that was not used: You could have told me. We could have caught the earlier train. Do not confuse it with couldn't have (the deduction “that cannot have happened”). would have is an unreal past result (the third conditional): I would have helped if I had known.

Typical mistakes: *should had written; *You should have wrote (you need the past participle written). Ukrainian “treba bulo” is should have, not *should + Past Simple. Tone: should have can sound sharp in a team; a softer version is It might have been better to… / Next time we could….""",
    [
        "should have + V3 — треба було, але (часто) не зробили",
        "could have — невикористана можливість",
        "would have — нереальний наслідок (3-й умовний)",
        "Третя форма: should have written, не *wrote",
    ],
    [
        "should have + V3 is “it was the right thing, but often it didn't happen”",
        "could have is a missed opportunity",
        "would have is an unreal result (third conditional)",
        "Use a past participle: should have written, not *wrote",
    ],
    [
        mcq(
            "en-d-mod-should-have-r1",
            "Докір: тест не написали.",
            "Criticism: nobody wrote a test.",
            [
                "You should have written a test.",
                "You should have wrote a test.",
                "You should had written a test.",
                "You should written a test.",
            ],
            0,
            "should have + written (V3).",
            "should have + written (past participle).",
        ),
        fill(
            "en-d-mod-should-have-r2",
            "Вставте have або had.",
            "Insert have or had.",
            "We could ___ caught the earlier train.",
            ["have", "Have"],
        ),
        mcq(
            "en-d-mod-should-have-r3",
            "Нереальний наслідок: якби я знав, я б допоміг.",
            "An unreal result: if I had known, I would have helped.",
            [
                "I would have helped if I had known.",
                "I should have helped if I would knew.",
                "I would helped if I had known.",
                "I would have help if I knew.",
            ],
            0,
            "would have helped — нереальний минулий наслідок.",
            "would have helped is an unreal past result.",
        ),
        translate(
            "en-d-mod-should-have-r4",
            "Перекладіть через should have.",
            "Translate with should have.",
            "Мені треба було запитати раніше.",
            [
                "I should have asked earlier",
                "I should have asked sooner",
                "I ought to have asked earlier",
                "I ought to have asked sooner",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-mod-should-have",
        "Чим should have відрізняється від must have? Що означає could have told me і яка форма дієслова після have?",
        "How is should have different from must have? What does could have told me mean, and which verb form follows have?",
        [
            idea("should have", "should have", "should have", "written", "criticism", "докір", "regret", "жаль"),
            idea("could have", "could have", "could have", "told", "opportunity", "можлив"),
            idea("participle", "participle", "written", "participle", "третя", "v3", "wrote"),
        ],
        "Should have — це докір або жаль: треба було написати тест, але не написали. Must have — здогадка, не докір. Could have told me — невикористана можливість. Після have потрібна третя форма, written, не wrote.",
        "Should have is criticism or regret: you were supposed to write a test, but you didn't. Must have is a deduction, not criticism. Could have told me is a missed opportunity. After have we need the past participle, written, not wrote.",
    ),
)

U8_L3 = teach(
    "en-d-mod-need",
    "needn't have і didn't need to",
    "needn't have and didn't need to",
    4,
    "Зробив дарма чи просто не було потреби",
    "You did it in vain, or there was simply no need",
    """Це тонка й важлива пара. didn't need to + інфінітив — потреби не було; часто дію й не виконували: The meeting was cancelled, so I didn't need to come (я й не прийшов). Іноді дію все ж зробили, але акцент — «обов'язку не було».

needn't have + V3 — ви ВЖЕ зробили дію, а вона виявилась непотрібною: I needn't have come so early — the room was still locked (прийшов дарма). Українською обидва звучать як «не треба було», тому різниця губиться. Запитайте себе: чи людина вже це зробила дарма?

need як звичайне дієслово: Do you need to…? I don't need to. need як модальне (переважно брит., формальне): Need I say more? You needn't wait. У сучасному IT-англійському частіше don't need to, ніжneedn't, окрім needn't have, яке живе саме в цій парі. Не *I needn't to come і не *I didn't need come.""",
    """This is a subtle and important pair. didn't need to + infinitive means there was no need; often the action was not done: The meeting was cancelled, so I didn't need to come (and I didn't come). Sometimes the action was still done, but the focus is “there was no obligation”.

needn't have + V3 means you ALREADY did the action, and it turned out to be unnecessary: I needn't have come so early — the room was still locked (I came in vain). In Ukrainian both sound like “I didn't have to”, so the difference disappears. Ask yourself: did the person already do it for nothing?

need as a normal verb: Do you need to…? I don't need to. need as a modal (mainly British, formal): Need I say more? You needn't wait. In modern IT English, don't need to is more common than needn't, except for needn't have, which lives in this pair. Not *I needn't to come and not *I didn't need come.""",
    [
        "didn't need to — потреби не було (часто дію не робили)",
        "needn't have + V3 — уже зробили дарма",
        "Питання: чи дія вже виконана?",
        "Не *needn't to і не *didn't need come",
    ],
    [
        "didn't need to — there was no need (often the action was not done)",
        "needn't have + V3 — you already did it in vain",
        "Ask: was the action already performed?",
        "Not *needn't to and not *didn't need come",
    ],
    [
        mcq(
            "en-d-mod-need-r1",
            "Зустріч скасували, і ви навіть не виходили з дому.",
            "The meeting was cancelled, and you didn't even leave home.",
            [
                "I didn't need to come.",
                "I needn't have come (I already arrived in vain).",
                "I didn't need come.",
                "I needn't to come.",
            ],
            0,
            "Дію не виконували — didn't need to come.",
            "The action was not done — didn't need to come.",
        ),
        mcq(
            "en-d-mod-need-r2",
            "Ви приїхали рано, а кімната ще була зачинена. Дарма.",
            "You arrived early, and the room was still locked. It was in vain.",
            [
                "I needn't have come so early.",
                "I didn't need to come so early, and I stayed at home — that's this story.",
                "I needn't to come so early.",
                "I didn't needed come so early.",
            ],
            0,
            "Уже прийшли дарма — needn't have come.",
            "You already came in vain — needn't have come.",
        ),
        fill(
            "en-d-mod-need-r3",
            "Вставте have або to.",
            "Insert have or to.",
            "You needn't ___ brought so many cables — we already had them.",
            ["have", "Have"],
        ),
        translate(
            "en-d-mod-need-r4",
            "Перекладіть: зробив дарма (needn't have).",
            "Translate: did it in vain (needn't have).",
            "Мені не треба було друкувати всі сторінки — вони вже були в системі.",
            [
                "I needn't have printed all the pages — they were already in the system",
                "I needn't have printed all the pages; they were already in the system",
                "I needn't have printed all the pages, they were already in the system",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-mod-need",
        "У чому різниця між I didn't need to come і I needn't have come? Яке питання собі поставити?",
        "What is the difference between I didn't need to come and I needn't have come? What question should you ask yourself?",
        [
            idea("didn't need to", "didn't need to", "didn't need to", "cancelled", "не прийшов", "didn't come", "no need"),
            idea("needn't have", "needn't have", "needn't have", "in vain", "дарма", "already", "early"),
            idea("дія виконана?", "was it done?", "already", "уже", "performed", "виконан"),
        ],
        "I didn't need to come означає, що потреби не було, і часто людина навіть не прийшла. I needn't have come — людина вже прийшла дарма. Треба запитати себе, чи дія вже виконана.",
        "I didn't need to come means there was no need, and often the person did not even come. I needn't have come means the person already came in vain. You should ask yourself whether the action was already performed.",
    ),
)

U8_L4 = teach(
    "en-d-mod-supposed",
    "be supposed to, be meant to, had better",
    "be supposed to, be meant to, had better",
    3,
    "Очікування, призначення, порада-попередження",
    "Expectation, purpose, and a warning-advice",
    """be supposed to + інфінітив — очікування, домовленість або правило: You're supposed to review the PR today (так домовились / так прийнято). I'm supposed to be in a meeting now. Заперечення: You're not supposed to commit straight to main. Це не те саме, що must (сильний обов'язок від мовця) і не те саме, що maybe.

be meant to — призначення або задум: This function is meant to validate the token. It was meant to be a quick fix. had better + голий інфінітив — сильна порада з попередженням: You'd better back up the database (інакше буде погано). Заперечення: You'd better not skip the tests. Не *You had better to back up.

Типові помилки: *I supposed to go (пропущене am/is/are); плутання з I suppose («я гадаю»). supposed to в минулому: I was supposed to call, but I forgot — очікування не виконано, близько до should have.""",
    """be supposed to + infinitive is an expectation, an agreement, or a rule: You're supposed to review the PR today (that is the plan / the convention). I'm supposed to be in a meeting now. The negative is You're not supposed to commit straight to main. This is not the same as must (a strong obligation from the speaker) and not the same as maybe.

be meant to is purpose or design: This function is meant to validate the token. It was meant to be a quick fix. had better + bare infinitive is strong advice with a warning: You'd better back up the database (or there will be trouble). The negative is You'd better not skip the tests. Not *You had better to back up.

Typical mistakes: *I supposed to go (missing am/is/are); mixing this up with I suppose (“I think”). In the past: I was supposed to call, but I forgot — an expectation that was not met, close to should have.""",
    [
        "be supposed to — очікування, правило, домовленість",
        "не плутати з I suppose («гадаю»)",
        "be meant to — призначення / задум",
        "had better + голий інфінітив, не *better to",
    ],
    [
        "be supposed to is an expectation, a rule, or an agreement",
        "Do not confuse it with I suppose (“I think”)",
        "be meant to is purpose or design",
        "had better + bare infinitive, not *better to",
    ],
    [
        mcq(
            "en-d-mod-supposed-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "You're supposed to review the PR today.",
                "You supposed to review the PR today.",
                "You suppose to review the PR today.",
                "You're suppose review the PR today.",
            ],
            0,
            "Потрібне are: you're supposed to + інфінітив.",
            "You need are: you're supposed to + infinitive.",
        ),
        fill(
            "en-d-mod-supposed-r2",
            "Вставте to або not (потрібен інфінітив після meant).",
            "Insert to or not (an infinitive is needed after meant).",
            "This function is meant ___ validate the token.",
            ["to", "To"],
        ),
        mcq(
            "en-d-mod-supposed-r3",
            "Сильна порада з попередженням:",
            "Strong advice with a warning:",
            [
                "You'd better back up the database.",
                "You'd better to back up the database.",
                "You had better backing up the database.",
                "You'd better to backing the database.",
            ],
            0,
            "had better + голий інфінітив: better back up.",
            "had better + bare infinitive: better back up.",
        ),
        translate(
            "en-d-mod-supposed-r4",
            "Перекладіть через be supposed to.",
            "Translate with be supposed to.",
            "Ти не повинен пушити напряму в main.",
            [
                "You're not supposed to push straight to main",
                "You are not supposed to push straight to main",
                "You're not supposed to commit straight to main",
                "You are not supposed to commit straight to main",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-mod-supposed",
        "Що означає be supposed to і чим воно відрізняється від I suppose? Як працюють be meant to і had better?",
        "What does be supposed to mean, and how is it different from I suppose? How do be meant to and had better work?",
        [
            idea("supposed to", "supposed to", "supposed to", "expectation", "очікуван", "rule", "правило"),
            idea("I suppose", "I suppose", "i suppose", "think", "гадаю"),
            idea("had better", "had better", "had better", "better", "warning", "попередж", "back up"),
        ],
        "Be supposed to — це очікування або правило, наприклад you're supposed to review the PR. I suppose означає «я гадаю», це інше. Be meant to говорить про призначення. Had better — сильна порада з попередженням і голим інфінітивом: you'd better back up.",
        "Be supposed to is an expectation or a rule, for example you're supposed to review the PR. I suppose means “I think”, which is different. Be meant to talks about purpose. Had better is strong advice with a warning and a bare infinitive: you'd better back up.",
    ),
)

U8_L5 = teach(
    "en-d-mod-mix",
    "Огляд відтінків модальних",
    "A review of modal nuances",
    4,
    "Обрати точний відтінок",
    "Choosing the exact shade",
    """Зберіть шкалу в одну картину. Обов'язок і правило зараз: must / have to / should / be supposed to / had better — від сильного внутрішнього must до правила have to, поради should, очікування supposed to і попередження had better. Заборона: mustn't (не можна) проти don't have to (не обов'язково). Ця пара вже була в базових модальних; тут не повторюємо форму, а тримаємо її поруч із минулим.

Минуле: must have (здогадка), should have (треба було), could have (могли, але не), needn't have (зробили дарма), didn't need to (не було потреби), was supposed to (очікували, часто не сталося), would have (нереальний наслідок).

Алгоритм: спочатку час (зараз чи минуле?), потім сила (впевненість, обов'язок, порада, можливість), потім чи дія відбулася. Не ставте will у здогадці про минуле (*They will have left у значенні «мабуть, пішли» можливе як Future Perfect, але для чистої здогадки про вже видимий факт природніше must have left).""",
    """Put the scale into one picture. Obligation and rules now: must / have to / should / be supposed to / had better — from a strong inner must, to a rule with have to, advice with should, an expectation with supposed to, and a warning with had better. Prohibition: mustn't (not allowed) versus don't have to (not necessary). That pair was already in the basic modals unit; here we do not reteach the form, we keep it next to the past.

The past: must have (deduction), should have (it was the right thing), could have (we could, but didn't), needn't have (we did it in vain), didn't need to (there was no need), was supposed to (it was expected, often it didn't happen), would have (an unreal result).

A method: first the time (now or past?), then the force (certainty, obligation, advice, possibility), then whether the action happened. Do not use will for a deduction about a past fact you can already see (*They will have left can be Future Perfect, but for a pure deduction about an already visible fact, must have left is more natural).""",
    [
        "Спочатку час, потім сила, потім «чи вже зробили»",
        "mustn't ≠ don't have to; must have ≠ should have",
        "needn't have ≠ didn't need to",
        "was supposed to — очікування в минулому",
    ],
    [
        "First the time, then the force, then “did they already do it?”",
        "mustn't is not don't have to; must have is not should have",
        "needn't have is not didn't need to",
        "was supposed to is a past expectation",
    ],
    [
        mcq(
            "en-d-mod-mix-r1",
            "Світло погашене: майже впевнена здогадка.",
            "The lights are off: a near-certain deduction.",
            [
                "They must have left.",
                "They should have left (criticism: it was their duty, and maybe they didn't).",
                "They mustn't have left as a deduction.",
                "They will left.",
            ],
            0,
            "Здогадка — must have, не докір should have.",
            "A deduction is must have, not criticism with should have.",
        ),
        match(
            "en-d-mod-mix-r2",
            "Зіставте відтінок із формою.",
            "Match each shade with a form.",
            [
                ("They must have left.", "Здогадка про минуле / A past deduction"),
                ("You should have written a test.", "Докір / жаль / Criticism or regret"),
                ("I needn't have come so early.", "Зробив дарма / Did it in vain"),
                ("You're supposed to review it today.", "Очікування / правило / An expectation or rule"),
            ],
        ),
        fill(
            "en-d-mod-mix-r3",
            "Вставте supposed або suppose.",
            "Insert supposed or suppose.",
            "I was ___ to call, but I forgot.",
            ["supposed", "Supposed"],
        ),
        mcq(
            "en-d-mod-mix-r4",
            "Потреби не було, і ви навіть не прийшли.",
            "There was no need, and you didn't even come.",
            [
                "I didn't need to come.",
                "I needn't have come (I already arrived).",
                "I must have come in vain.",
                "I shouldn't have been supposed come.",
            ],
            0,
            "Не прийшли, бо потреби не було — didn't need to.",
            "You didn't come, because there was no need — didn't need to.",
        ),
    ],
    ex(
        "en-d-mod-mix",
        "Опишіть короткий алгоритм вибору модального в минулому: здогадка, докір, дарма, не було потреби. Наведіть по одній формі.",
        "Describe a short method for choosing a past modal: deduction, criticism, in vain, no need. Give one form for each.",
        [
            idea("must have", "must have", "must have", "deduction", "здогад"),
            idea("should have", "should have", "should have", "criticism", "докір", "regret"),
            idea("needn't / didn't need", "needn't / didn't need", "needn't have", "didn't need", "vain", "дарма", "need"),
        ],
        "Спочатку дивіться час і те, чи дія вже сталася. Для здогадки про минуле — must have left. Для докору — should have written. Якщо зробили дарма — needn't have come, а якщо потреби не було і часто навіть не зробили — didn't need to.",
        "First look at the time and at whether the action already happened. For a past deduction, use must have left. For criticism, use should have written. If you did it in vain, use needn't have come, and if there was no need and often you didn't even do it, use didn't need to.",
    ),
)

U8_EXAM = exam_lesson(
    "en-deep-modals-plus-exam",
    "Контрольна: модальні в минулому і відтінки",
    "Exam: past modals and nuance",
    4,
    [
        mcq(
            "en-deep-modals-plus-exam-q1",
            "Світло погашене. Здогадка:",
            "The lights are off. A deduction:",
            ["They must have left.", "They must left.", "They should have left as a pure deduction only.", "They mustn't have left meaning “impossible”."],
            0,
            "must have left — здогадка.",
            "must have left is a deduction.",
        ),
        mcq(
            "en-deep-modals-plus-exam-q2",
            "Докір: тест не написали.",
            "Criticism: no test was written.",
            ["You should have written a test.", "You should have wrote a test.", "You should had written a test.", "You must have written a test as criticism only."],
            0,
            "should have written.",
            "should have written.",
        ),
        mcq(
            "en-deep-modals-plus-exam-q3",
            "Прийшли рано дарма:",
            "You arrived early in vain:",
            ["I needn't have come so early.", "I didn't need to come, and I stayed at home — this story.", "I needn't to come so early.", "I didn't need come so early."],
            0,
            "Уже зробили дарма — needn't have.",
            "Already done in vain — needn't have.",
        ),
        mcq(
            "en-deep-modals-plus-exam-q4",
            "Очікування-правило:",
            "An expectation or rule:",
            ["You're supposed to review the PR today.", "You supposed to review the PR today.", "You'd better to review the PR today.", "You suppose to review the PR today."],
            0,
            "you're supposed to + інфінітив.",
            "you're supposed to + infinitive.",
        ),
        fill(
            "en-deep-modals-plus-exam-q5",
            "Вставте have або to (здогадка).",
            "Insert have or to (a deduction).",
            "He can't ___ forgotten — he's too reliable.",
            ["have", "Have"],
        ),
    ],
)

UNIT_8 = unit(
    "en-deep-modals-plus",
    "Модальні: минуле і відтінки",
    "Modals: past and nuance",
    [U8_L1, U8_L2, U8_L3, U8_L4, U8_L5, U8_EXAM],
)

UNITS = [UNIT_5, UNIT_6, UNIT_7, UNIT_8]
