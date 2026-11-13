"""English deep part F: skills, work, and exams (units 22–27)."""
from __future__ import annotations

from ._common import comprehension, exam_lesson, ex, fill, idea, match, mcq, order_words, teach, translate, unit

U22_L1 = teach(
    "en-d-rd-skim",
    "Перегляд і пошук: skim і scan",
    "Skimming and scanning",
    3,
    "Спочатку загальна ідея, потім конкретний факт",
    "First the main idea, then a concrete fact",
    """Два швидкі режими читання економлять час на іспитах і в роботі. Skim (перегляд) — швидко пройти текст за заголовком, першим реченням абзаців і висновком, щоб зрозуміти тему і тон. Scan (пошук) — очі шукають конкретне: дату, ім'я, число, ключове слово. Не треба читати кожне слово, коли питання про факт.

На іспитах (IELTS Reading, FCE) спочатку продивіться питання, потім scan на ключові слова, і лише потрібний фрагмент читайте уважно. У роботі той самий прийом: скімніть довгий RFC чи PR, потім скануйте на breaking change.

Типові помилки: читати все підряд і не встигати; плутати skim і scan; хапатися за перше збіг слова (синоніми в тексті часто інші: purchase замість buy). Перед scan виділіть 2–3 синоніми до слова з питання.""",
    """Two fast reading modes save time in exams and at work. Skimming is moving quickly through the title, the first sentence of each paragraph and the conclusion, to get the topic and the tone. Scanning is the eyes hunting for a concrete thing: a date, a name, a number, a keyword. You do not need every word when the question is about a fact.

In exams (IELTS Reading, FCE) look at the questions first, then scan for keywords, and only then read the relevant fragment carefully. At work the same trick applies: skim a long RFC or PR, then scan for a breaking change.

Typical mistakes: reading every word and running out of time; mixing up skim and scan; grabbing the first word match (the text often uses a synonym: purchase for buy). Before you scan, list two or three synonyms for the word in the question.""",
    [
        "Skim — загальна ідея (заголовок, перші речення, висновок)",
        "Scan — пошук дати, імені, числа, ключового слова",
        "Спочатку питання, потім пошук, потім уважне читання фрагмента",
        "Шукайте синоніми, не лише те саме слово",
    ],
    [
        "Skim is the main idea (title, first sentences, conclusion)",
        "Scan is hunting for a date, a name, a number, a keyword",
        "Questions first, then a search, then a careful read of the fragment",
        "Look for synonyms, not only the same word",
    ],
    [
        mcq(
            "en-d-rd-skim-r1",
            "Щоб швидко зрозуміти тему статті, ви:",
            "To get the topic of an article quickly, you:",
            ["skimming: заголовок і перші речення абзаців", "читаєте кожне слово з словником", "шукаєте лише одну дату, ігноруючи тему", "пропускаєте висновок завжди"],
            0,
            "Skim дає загальну ідею.",
            "Skimming gives you the main idea.",
            ["skimming: the title and the first sentences of paragraphs", "read every word with a dictionary", "look only for one date and ignore the topic", "always skip the conclusion"],
        ),
        fill(
            "en-d-rd-skim-r2",
            "Пошук конкретного факту — це ___ (scan).",
            "Hunting for a concrete fact is ___ (scan).",
            "Use ___ to find the year in the text.",
            ["scan", "Scan", "scanning", "Scanning"],
        ),
        mcq(
            "en-d-rd-skim-r3",
            "У тексті може не бути слова buy, якщо питання про покупку. Що робити?",
            "The text may not use the word buy if the question is about a purchase. What do you do?",
            ["Шукати синоніми на кшталт purchase чи order.", "Здатися, якщо немає buy.", "Читати лише заголовок.", "Завжди перекладати кожне слово."],
            0,
            "Перед scan підготуйте синоніми.",
            "Prepare synonyms before you scan.",
            ["Look for synonyms such as purchase or order.", "Give up if buy is missing.", "Read only the title.", "Always translate every word."],
        ),
        translate(
            "en-d-rd-skim-r4",
            "Перекладіть.",
            "Translate.",
            "Спочатку продивіться питання, потім шукайте ключові слова.",
            [
                "Look at the questions first, then scan for keywords",
                "Look at the questions first, then scan for key words",
                "First look at the questions, then scan for keywords",
                "First look at the questions, then scan for key words",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-rd-skim",
        "Чим skim відрізняється від scan? У якому порядку діяти на іспиті з читання? Чому важливі синоніми?",
        "How is skimming different from scanning? In what order should you work in a reading exam? Why do synonyms matter?",
        [
            idea("skim", "skim", "skim", "main idea", "заголов", "title"),
            idea("scan", "scan", "scan", "date", "keyword", "число"),
            idea("synonyms", "synonyms", "synonym", "purchase", "questions first", "спочатку"),
        ],
        "Skim дає загальну ідею через заголовок і перші речення, scan шукає конкретний факт. На іспиті спочатку дивляться питання, потім сканують ключові слова і лише тоді уважно читають фрагмент. Синоніми важливі, бо в тексті може не бути того самого слова.",
        "Skimming gives the main idea through the title and first sentences, and scanning hunts for a concrete fact. In an exam you look at the questions first, then scan for keywords, and only then read the fragment carefully. Synonyms matter because the text may not use the same word.",
    ),
)

U22_L2 = teach(
    "en-d-rd-infer",
    "Висновок із контексту: inference",
    "Inference from context",
    3,
    "Текст не завжди каже прямо — ви робіть обґрунтований висновок",
    "The text does not always say it directly — you draw a justified conclusion",
    """Inference — висновок, який випливає з тексту, але не написаний тими самими словами. Якщо «She put the letter in a drawer and never mentioned it again», можна зробити висновок, що тема для неї важка або вона хоче це забути — але не що «вона знищила лист». Правильний висновок тримається на підказках: тон, контраст, прикметники, що саме пропущено.

На іспитах питання True / False / Not Given і “What can be inferred?” карають за надмір. Якщо в тексті немає достатньо підказок — відповідь Not Given, не ваша здогадка зі світу. Відрізняйте inference (обґрунтовано з тексту) від assumption (мій досвід).

Стратегія: знайдіть рядок-опору, перефразуйте його своїми словами, відкиньте варіанти, що додають факти, яких немає. Типові помилки: обрати «гучний» варіант, який звучить розумно, але не з цього абзацу; сплутати author's opinion з fact.""",
    """Inference is a conclusion that follows from the text but is not written in the same words. If “She put the letter in a drawer and never mentioned it again”, you may infer that the topic is hard for her or that she wants to forget it — but not that “she destroyed the letter”. A good inference rests on clues: tone, contrast, adjectives, what is left unsaid.

In exams, True / False / Not Given and “What can be inferred?” punish going too far. If the text has too few clues, the answer is Not Given, not your guess from the world. Distinguish inference (justified by the text) from assumption (my experience).

A strategy: find the supporting line, rephrase it in your own words, and reject options that add facts the text does not have. Typical mistakes: choosing a “loud” option that sounds reasonable but is not from this paragraph; mixing up the author's opinion with a fact.""",
    [
        "Inference випливає з підказок, не з досвіду читача",
        "Не додавайте фактів, яких немає в тексті",
        "Not Given ≠ False: цього просто не сказано",
        "Знайдіть рядок-опору і перефразуйте",
    ],
    [
        "An inference follows from clues, not from the reader's experience",
        "Do not add facts that are not in the text",
        "Not Given is not False: it simply is not said",
        "Find the supporting line and rephrase it",
    ],
    [
        mcq(
            "en-d-rd-infer-r1",
            "«She put the letter in a drawer and never mentioned it again.» Що можна обґрунтовано припустити?",
            "“She put the letter in a drawer and never mentioned it again.” What can you reasonably infer?",
            [
                "Вона, ймовірно, не хоче до цього повертатися.",
                "Вона знищила лист.",
                "Лист був офіційним контрактом — як факт із речення.",
                "Вона показала листа всім колегам.",
            ],
            0,
            "Висновок має триматися на «never mentioned it again», без нових фактів.",
            "The inference must rest on “never mentioned it again”, without new facts.",
            [
                "She probably does not want to come back to it.",
                "She destroyed the letter.",
                "The letter was an official contract — as a fact from the sentence.",
                "She showed the letter to every colleague.",
            ],
        ),
        fill(
            "en-d-rd-infer-r2",
            "Якщо в тексті цього не сказано, в IELTS часто відповідь ___ Given.",
            "If the text does not say it, in IELTS the answer is often ___ Given.",
            "The answer may be Not ___.",
            ["Given", "given"],
        ),
        mcq(
            "en-d-rd-infer-r3",
            "Assumption на відміну від inference — це:",
            "An assumption, unlike an inference, is:",
            [
                "Думка з вашого досвіду, не обов'язково з тексту.",
                "Висновок, який чітко випливає з рядка тексту.",
                "Синонім True.",
                "Завжди правильна відповідь на іспиті.",
            ],
            0,
            "Assumption — ваше припущення; inference — з тексту.",
            "An assumption is your guess; an inference comes from the text.",
            [
                "An idea from your experience, not necessarily from the text.",
                "A conclusion that clearly follows from a line in the text.",
                "A synonym of True.",
                "Always the right exam answer.",
            ],
        ),
        translate(
            "en-d-rd-infer-r4",
            "Перекладіть.",
            "Translate.",
            "Не додавайте фактів, яких немає в тексті.",
            [
                "Don't add facts that are not in the text",
                "Do not add facts that are not in the text",
                "Don't add facts that aren't in the text",
                "Do not add facts which are not in the text",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-rd-infer",
        "Що таке inference? Чим вона відрізняється від assumption і від Not Given? Як перевірити варіант відповіді?",
        "What is an inference? How is it different from an assumption and from Not Given? How do you check an answer option?",
        [
            idea("inference", "inference", "inference", "clue", "підказ", "text"),
            idea("not given", "not given", "Not Given", "False", "assumption"),
            idea("support", "support", "supporting", "rephrase", "перефраз"),
        ],
        "Inference — обґрунтований висновок із підказок тексту, без нових фактів. Assumption — ваше припущення з досвіду. Not Given означає, що цього не сказано, і це не те саме, що False. Варіант перевіряють рядком-опорою і перефразом.",
        "An inference is a justified conclusion from clues in the text, without new facts. An assumption is your guess from experience. Not Given means it is not said, and that is not the same as False. You check an option against a supporting line and a paraphrase.",
    ),
)

U22_L3 = teach(
    "en-d-rd-ref",
    "До чого відноситься this, which, it",
    "What this, which and it refer to",
    3,
    "Займенник майже завжди вказує на щось щойно сказане",
    "A pronoun almost always points to something just said",
    """Питання “What does this refer to?” часті в IELTS і FCE. This, that, these, those, it, they, which, such часто замінюють цілий іменник, фразу або навіть попереднє речення. Шукайте найближчий змістовно підхожий антецедент: узгодження числа (this vs these), роду не потрібне англійською, але логіка потрібна.

Приклад: “The library released a new API. This allowed teams to test retries in isolation.” This = the release of the new API (ціла подія), не обов'язково лише the library. Which у non-defining clause: “We rolled out retries, which reduced timeouts” — which = the rollout of retries.

Типові помилки: обрати найближче слово, навіть якщо число не збігається; подумати, що this завжди = останній іменник; пропустити, що which може відноситися до цілого речення. Підкресліть займенник і стрілкою з'єднайте з опорою.""",
    """“What does this refer to?” is a frequent question in IELTS and FCE. This, that, these, those, it, they, which, such often replace a whole noun, a phrase or even the previous sentence. Look for the nearest antecedent that fits the meaning: number agreement (this vs these) matters; grammatical gender does not, in English, but logic does.

Example: “The library released a new API. This allowed teams to test retries in isolation.” This = the release of the new API (the whole event), not necessarily only the library. Which in a non-defining clause: “We rolled out retries, which reduced timeouts” — which = the rollout of retries.

Typical mistakes: choosing the nearest word even when the number does not match; thinking this is always the last noun; missing that which can refer to a whole sentence. Underline the pronoun and draw an arrow to its support.""",
    [
        "This / which / it часто замінюють фразу або ціле речення",
        "Перевіряйте число: this ≠ these",
        "Найближче слово не завжди правильний антецедент",
        "Підкресліть займенник і знайдіть опору",
    ],
    [
        "This / which / it often replace a phrase or a whole sentence",
        "Check number: this is not these",
        "The nearest word is not always the right antecedent",
        "Underline the pronoun and find its support",
    ],
    [
        mcq(
            "en-d-rd-ref-r1",
            "“The library released a new API. This allowed teams to test retries.” This найімовірніше =",
            "“The library released a new API. This allowed teams to test retries.” This is most likely =",
            [
                "те, що бібліотека випустила нове API",
                "саме слово library як єдиний можливий антецедент",
                "teams",
                "retries як підмет попереднього речення",
            ],
            0,
            "This часто вказує на цілу подію попереднього речення.",
            "This often points to the whole event in the previous sentence.",
            [
                "the fact that the library released a new API",
                "the word library as the only possible antecedent",
                "teams",
                "retries as the subject of the previous sentence",
            ],
        ),
        fill(
            "en-d-rd-ref-r2",
            "Слово, на яке вказує займенник, називається antecedent. Напишіть antecedent.",
            "Type antecedent.",
            "The pronoun refers to its ___.",
            ["antecedent", "Antecedent"],
        ),
        mcq(
            "en-d-rd-ref-r3",
            "“We rolled out retries, which reduced timeouts.” which =",
            "“We rolled out retries, which reduced timeouts.” which =",
            [
                "те, що ми впровадили retries (ця дія)",
                "timeouts",
                "we як підмет, і лише він",
                "завжди лише останній іменник retries без дії",
            ],
            0,
            "which може відноситися до цілої дії / речення.",
            "which can refer to the whole action or clause.",
            [
                "the fact that we rolled out retries (that action)",
                "timeouts",
                "we as the subject, and only that",
                "always only the last noun retries, with no action",
            ],
        ),
        translate(
            "en-d-rd-ref-r4",
            "Перекладіть.",
            "Translate.",
            "До чого в цьому реченні відноситься this?",
            [
                "What does this refer to in this sentence?",
                "What does this refer to in this sentence",
                "What is this referring to in this sentence?",
                "What does this refer to in the sentence?",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-rd-ref",
        "На що можуть вказувати this і which? Чому найближчий іменник не завжди правильний? Як перевірити відповідь?",
        "What can this and which refer to? Why is the nearest noun not always right? How do you check the answer?",
        [
            idea("this", "this", "this", "event", "sentence", "подія"),
            idea("which", "which", "which", "clause", "retries"),
            idea("antecedent", "antecedent", "antecedent", "number", "these"),
        ],
        "This і which часто вказують на цілу фразу або попереднє речення, не лише на найближчий іменник. Треба перевірити зміст і число, наприклад this проти these. Займенник підкреслюють і з'єднують з антецедентом.",
        "This and which often point to a whole phrase or the previous sentence, not only to the nearest noun. You have to check the meaning and the number, for example this versus these. You underline the pronoun and link it to its antecedent.",
    ),
)

U22_L4 = teach(
    "en-d-rd-fact-opinion",
    "Факт і думка; тон автора",
    "Fact versus opinion, and the author's tone",
    3,
    "Факт можна перевірити; думка містить оцінку",
    "A fact can be checked; an opinion contains a judgement",
    """Факт: “The team released the feature on 12 May.” Це можна перевірити. Думка: “The release was careless.” Тут оцінка. Підказки думки: I think, it seems, should, surprisingly, poor, excellent, clearly (як оцінка), allegedly (хтось стверджує). Тон автора може бути neutral, critical, enthusiastic, cautious, ironic — його тримають прикметники й модальні дієслова.

На іспитах вас можуть спитати: “Which statement is an opinion?” або “The writer's attitude is…”. Не плутайте цитату експерта (це все одно чиясь думка в тексті) з фактом дослідження, якщо немає даних. “Experts say it is unsafe” — репортаж про думку, не доведений факт у статті, якщо немає доказів.

Типові помилки: прийняти впевнений тон за факт; не помітити хеджування (might, it is claimed). Поверніться до уроку C1 про hedging — ті самі маркери допомагають читати.""",
    """A fact: “The team released the feature on 12 May.” That can be checked. An opinion: “The release was careless.” That is a judgement. Clues to opinion: I think, it seems, should, surprisingly, poor, excellent, clearly (as a judgement), allegedly (someone claims). The author's tone may be neutral, critical, enthusiastic, cautious, ironic — adjectives and modal verbs carry it.

In exams you may be asked: “Which statement is an opinion?” or “The writer's attitude is…”. Do not confuse an expert's quote (still someone's opinion in the text) with a research fact if there is no data. “Experts say it is unsafe” is a report of an opinion, not a proven fact in the article, if no evidence is given.

Typical mistakes: taking a confident tone for a fact; missing hedging (might, it is claimed). Go back to the C1 lesson on hedging — the same markers help you read.""",
    [
        "Факт перевіряється; думка містить оцінку (careless, should)",
        "Тон: neutral, critical, cautious, enthusiastic",
        "Цитата експерта без даних — усе одно думка в тексті",
        "Хеджування (might, allegedly) сигналить невпевненість",
    ],
    [
        "A fact can be checked; an opinion contains a judgement (careless, should)",
        "Tone: neutral, critical, cautious, enthusiastic",
        "An expert quote without data is still an opinion in the text",
        "Hedging (might, allegedly) signals uncertainty",
    ],
    [
        mcq(
            "en-d-rd-fact-opinion-r1",
            "Що є думкою?",
            "Which is an opinion?",
            [
                "The release was careless.",
                "The team released the feature on 12 May.",
                "The file has 200 lines.",
                "The meeting started at nine.",
            ],
            0,
            "careless — оцінка, не перевірюваний факт.",
            "careless is a judgement, not a checkable fact.",
        ),
        fill(
            "en-d-rd-fact-opinion-r2",
            "Слово allegedly сигналізує, що це чиєсь ___. Напишіть claim або assertion.",
            "Type claim.",
            "Allegedly marks a ___, not a proven fact.",
            ["claim", "Claim", "assertion", "Assertion"],
        ),
        mcq(
            "en-d-rd-fact-opinion-r3",
            "“Experts say it is unsafe,” без даних у статті, — це:",
            "“Experts say it is unsafe,” with no data in the article, is:",
            [
                "репортаж про думку, не доведений факт статті",
                "беззаперечний науковий факт",
                "завжди False",
                "те саме, що дата релізу",
            ],
            0,
            "Без доказів це думка, яку автор повідомляє.",
            "Without evidence it is an opinion the writer is reporting.",
            [
                "a report of an opinion, not a proven fact of the article",
                "an unquestionable scientific fact",
                "always False",
                "the same as a release date",
            ],
        ),
        match(
            "en-d-rd-fact-opinion-r4",
            "Зіставте маркер із тим, що він сигналізує.",
            "Match each marker with what it signals.",
            [
                ("on 12 May", "перевірюваний факт / a checkable fact"),
                ("careless", "оцінка / a judgement"),
                ("allegedly", "чиєсь твердження / someone's claim"),
                ("might", "хеджування / hedging"),
            ],
        ),
    ],
    ex(
        "en-d-rd-fact-opinion",
        "Як відрізнити факт від думки? Які маркери тону і хеджування шукати? Чому цитата експерта не завжди факт?",
        "How do you tell a fact from an opinion? Which tone and hedging markers should you look for? Why is an expert quote not always a fact?",
        [
            idea("fact", "fact", "fact", "checked", "May", "дата"),
            idea("opinion", "opinion", "opinion", "careless", "should", "оцінк"),
            idea("hedge", "hedge", "allegedly", "might", "claim", "тон", "tone"),
        ],
        "Факт можна перевірити, наприклад дату релізу. Думка містить оцінку, як careless або should. Маркери хеджування — might і allegedly. Цитата експерта без даних у статті — це все одно думка, яку автор повідомляє.",
        "A fact can be checked, for example a release date. An opinion contains a judgement, such as careless or should. Hedging markers include might and allegedly. An expert quote without data in the article is still an opinion the writer is reporting.",
    ),
)

U22_L5 = teach(
    "en-d-rd-passage",
    "Повний текст: практика розуміння",
    "A full passage: comprehension practice",
    3,
    "Спочатку skim, потім питання, потім точні рядки",
    "Skim first, then the questions, then the exact lines",
    """Нижче — короткий текст у стилі іспитового абзацу на тему навчання на роботі. Спочатку продивіться його на загальну ідею (1–2 речення своїми словами). Потім читайте питання і повертайтеся до рядків. Не відповідайте з пам'яті після одного швидкого читання — так легко сплутати similar і same.

Passage: “Many engineering teams now run weekly ‘learning hours’, short sessions where one person explains a tool or a post-mortem. Supporters argue that this is cheaper than external training and that knowledge stays in the team. Critics point out that the same five people tend to speak, and that junior staff may feel too shy to ask questions. A trial in one Lviv company found that attendance stayed high only when sessions were limited to thirty minutes and had a published agenda. The company did not measure whether the sessions improved product quality, which leaves the main claim unproven.”

Зверніть увагу: останнє речення — ключ до fact vs Not Given / unproven. which відноситься до того, що якість не вимірювали.""",
    """Below is a short text in the style of an exam paragraph, on workplace learning. First skim it for the main idea (one or two sentences in your own words). Then read the questions and go back to the lines. Do not answer from memory after one fast read — it is easy to confuse similar with same.

Passage: “Many engineering teams now run weekly ‘learning hours’, short sessions where one person explains a tool or a post-mortem. Supporters argue that this is cheaper than external training and that knowledge stays in the team. Critics point out that the same five people tend to speak, and that junior staff may feel too shy to ask questions. A trial in one Lviv company found that attendance stayed high only when sessions were limited to thirty minutes and had a published agenda. The company did not measure whether the sessions improved product quality, which leaves the main claim unproven.”

Notice: the last sentence is the key to fact vs Not Given / unproven. which refers to the fact that quality was not measured.""",
    [
        "Спочатку своя фраза про головну ідею",
        "Питання → рядок у тексті, не пам'ять",
        "Останнє речення: якість не виміряли — твердження недоведене",
        "which вказує на відсутність вимірювання",
    ],
    [
        "First, your own sentence about the main idea",
        "Question → a line in the text, not memory",
        "Last sentence: quality was not measured — the claim is unproven",
        "which points to the lack of measurement",
    ],
    [
        comprehension(
            "en-d-rd-passage-r1",
            "Прочитайте текст і дайте відповіді.",
            "Read the passage and answer.",
            "Many engineering teams now run weekly “learning hours”, short sessions where one person explains a tool or a post-mortem. Supporters argue that this is cheaper than external training and that knowledge stays in the team. Critics point out that the same five people tend to speak, and that junior staff may feel too shy to ask questions. A trial in one Lviv company found that attendance stayed high only when sessions were limited to thirty minutes and had a published agenda. The company did not measure whether the sessions improved product quality, which leaves the main claim unproven.",
            [
                {
                    "q": "Що, за прихильниками, є перевагою learning hours?",
                    "qEn": "According to supporters, what is an advantage of learning hours?",
                    "options": [
                        "They are cheaper than external training, and knowledge stays in the team.",
                        "They always improve product quality.",
                        "Only junior staff speak at them.",
                        "They must last two hours.",
                    ],
                    "correctIndex": 0,
                },
                {
                    "q": "Що показало випробування у львівській компанії?",
                    "qEn": "What did the trial in the Lviv company find?",
                    "options": [
                        "Attendance stayed high only with a 30-minute limit and a published agenda.",
                        "Product quality clearly improved.",
                        "Nobody came to the sessions.",
                        "External training was cancelled forever.",
                    ],
                    "correctIndex": 0,
                },
                {
                    "q": "Чому головне твердження залишається недоведеним?",
                    "qEn": "Why is the main claim left unproven?",
                    "options": [
                        "The company did not measure an effect on product quality.",
                        "The sessions had no agenda.",
                        "Supporters refused to speak.",
                        "The text says the sessions lasted two hours.",
                    ],
                    "correctIndex": 0,
                },
            ],
            "Відповіді тримаються на реченнях тексту, а не на вашому ставленні до навчання в команді.",
            "The answers rest on sentences in the text, not on your attitude to team learning.",
        ),
        mcq(
            "en-d-rd-passage-r2",
            "У останньому реченні which відноситься до:",
            "In the last sentence, which refers to:",
            [
                "того, що компанія не виміряла вплив на якість продукту",
                "львівської компанії як єдиного іменника",
                "thirty minutes",
                "junior staff",
            ],
            0,
            "which тут вказує на факт відсутності вимірювання.",
            "which here points to the fact that there was no measurement.",
            [
                "the fact that the company did not measure the effect on product quality",
                "the Lviv company as the only noun",
                "thirty minutes",
                "junior staff",
            ],
        ),
        fill(
            "en-d-rd-passage-r3",
            "Головне твердження залишається ___ (unproven).",
            "The main claim is left ___ (unproven).",
            "The main claim is left ___.",
            ["unproven", "Unproven"],
        ),
        translate(
            "en-d-rd-passage-r4",
            "Перекладіть висновок тексту.",
            "Translate the conclusion of the text.",
            "Компанія не виміряла, чи сесії покращили якість продукту.",
            [
                "The company did not measure whether the sessions improved product quality",
                "The company did not measure whether the sessions improved product quality.",
                "The company didn't measure whether the sessions improved product quality",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-rd-passage",
        "Яка головна ідея тексту про learning hours? Що саме доведено, а що залишилось unproven? До чого відноситься which?",
        "What is the main idea of the learning-hours text? What exactly is proven, and what is left unproven? What does which refer to?",
        [
            idea("idea", "idea", "learning hours", "cheaper", "critics", "attendance"),
            idea("unproven", "unproven", "unproven", "quality", "measure"),
            idea("which", "which", "which", "measure", "claim"),
        ],
        "Текст порівнює аргументи за і проти learning hours і наводить випробування, де відвідуваність трималася за короткої сесії з порядком денним. Вплив на якість продукту не вимірювали, тому головне твердження недоведене. Which вказує саме на цю відсутність вимірювання.",
        "The text compares arguments for and against learning hours and reports a trial where attendance stayed high with a short session and an agenda. The effect on product quality was not measured, so the main claim is unproven. Which points to that lack of measurement.",
    ),
)

U22_EXAM = exam_lesson(
    "en-deep-reading-exam",
    "Контрольна: читання",
    "Exam: reading skills",
    3,
    [
        mcq(
            "en-deep-reading-exam-q1",
            "Scan — це:",
            "Scanning is:",
            ["пошук конкретного факту", "повільне читання кожного слова як єдиний метод", "написання есе", "усний монолог"],
            0,
            "Scan шукає факт.",
            "Scanning hunts for a fact.",
            ["hunting for a concrete fact", "reading every word slowly as the only method", "writing an essay", "a spoken monologue"],
        ),
        mcq(
            "en-deep-reading-exam-q2",
            "Not Given означає:",
            "Not Given means:",
            ["цього не сказано в тексті", "твердження хибне", "твердження істинне", "автор точно згоден"],
            0,
            "Не сказано — не те саме, що False.",
            "It is not said — that is not the same as False.",
            ["it is not said in the text", "the statement is false", "the statement is true", "the author definitely agrees"],
        ),
        mcq(
            "en-deep-reading-exam-q3",
            "“The release was careless.” — це:",
            "“The release was careless.” is:",
            ["думка", "перевірюваний факт, як дата", "Not Given завжди", "заголовок"],
            0,
            "careless — оцінка.",
            "careless is a judgement.",
            ["an opinion", "a checkable fact, like a date", "always Not Given", "a headline"],
        ),
        mcq(
            "en-deep-reading-exam-q4",
            "This у “The library released a new API. This allowed teams to test retries” найімовірніше вказує на:",
            "This in “The library released a new API. This allowed teams to test retries” most likely refers to:",
            ["випуск нового API", "слово teams", "retries як підмет першого речення", "бібліотеку як єдиний можливий антецедент"],
            0,
            "This часто = ціла попередня подія.",
            "This is often the whole previous event.",
            ["the release of a new API", "the word teams", "retries as the subject of the first sentence", "the library as the only possible antecedent"],
        ),
        fill(
            "en-deep-reading-exam-q5",
            "Швидкий перегляд загальної ідеї називається ___ (skim).",
            "A fast overview of the main idea is called ___ (skim).",
            "___ the text for the main idea.",
            ["Skim", "skim"],
        ),
    ],
)

UNIT_22 = unit(
    "en-deep-reading",
    "Читання з розумінням",
    "Reading skills",
    [U22_L1, U22_L2, U22_L3, U22_L4, U22_L5, U22_EXAM],
)

U23_L1 = teach(
    "en-d-wr-register",
    "Реєстр листа: formal і informal",
    "Email register: formal and informal",
    3,
    "Dear Mr Koval / Hi Olena — і відповідні закінчення",
    "Dear Mr Koval / Hi Olena — and matching closings",
    """Реєстр — це рівень офіційності. Formal: Dear Mr Koval, Dear Ms Shevchenko, Dear Sir or Madam (якщо імені немає), I am writing to…, I would be grateful if you could…, Please find attached…, Yours sincerely (ім'я відоме) / Yours faithfully (Dear Sir or Madam). Semi-formal колезі: Dear Olena, Kind regards, Best regards. Informal: Hi Olena, Thanks for…, See you tomorrow, Cheers / Best.

Контраст: Could you please send… vs Can you send… vs Send me… Контракції (I'm, don't) природні в неформальному листі, у формальному їх часто уникають (I am, do not). Don't jump from Dear Sir or Madam до Cheers. Тема листа (Subject) має бути конкретною: Invoice 184 — payment delay, не Hello.

Типові помилки українських мовців: *Dear friend; *Good day як привітання в листі; *I want that you (I would like you to); *Waiting for your answer як єдине закінчення (I look forward to hearing from you — формальніше). Ім'я в підписі має збігатися з тоном.""",
    """Register is the level of formality. Formal: Dear Mr Koval, Dear Ms Shevchenko, Dear Sir or Madam (if you have no name), I am writing to…, I would be grateful if you could…, Please find attached…, Yours sincerely (you know the name) / Yours faithfully (Dear Sir or Madam). Semi-formal to a colleague: Dear Olena, Kind regards, Best regards. Informal: Hi Olena, Thanks for…, See you tomorrow, Cheers / Best.

A contrast: Could you please send… vs Can you send… vs Send me… Contractions (I'm, don't) are natural in an informal email; in a formal one they are often avoided (I am, do not). Do not jump from Dear Sir or Madam to Cheers. The subject line should be specific: Invoice 184 — payment delay, not Hello.

Typical mistakes for Ukrainian speakers: *Dear friend; *Good day as an email greeting; *I want that you (I would like you to); *Waiting for your answer as the only closing (I look forward to hearing from you is more formal). The name in the sign-off should match the tone.""",
    [
        "Dear Mr Koval + Yours sincerely; Dear Sir or Madam + Yours faithfully",
        "Hi Olena + Best / Cheers — неформально",
        "Конкретний Subject; без стрибків реєстру",
        "I would like you to, не *I want that you",
    ],
    [
        "Dear Mr Koval + Yours sincerely; Dear Sir or Madam + Yours faithfully",
        "Hi Olena + Best / Cheers is informal",
        "A specific Subject; no jumps in register",
        "I would like you to, not *I want that you",
    ],
    [
        mcq(
            "en-d-wr-register-r1",
            "Лист почато Dear Sir or Madam. Яке закінчення правильне?",
            "The email starts Dear Sir or Madam. Which closing is right?",
            ["Yours faithfully", "Yours sincerely, as the usual pair with Sir or Madam", "Cheers", "Dear friend"],
            0,
            "Dear Sir or Madam → Yours faithfully.",
            "Dear Sir or Madam takes Yours faithfully.",
        ),
        fill(
            "en-d-wr-register-r2",
            "Ім'я адресата відоме. Formal closing: Yours ___.",
            "The addressee's name is known. Formal closing: Yours ___.",
            "Yours ___,",
            ["sincerely", "Sincerely"],
        ),
        mcq(
            "en-d-wr-register-r3",
            "Оберіть природне формальне прохання.",
            "Choose a natural formal request.",
            [
                "I would be grateful if you could send the invoice.",
                "I want that you send the invoice.",
                "Send me the invoice now, after Dear Sir or Madam, as a good match.",
                "Good day, waiting answer.",
            ],
            0,
            "I would be grateful if you could… — ввічливо й формально.",
            "I would be grateful if you could… is polite and formal.",
        ),
        translate(
            "en-d-wr-register-r4",
            "Перекладіть формально.",
            "Translate formally.",
            "Пишу, щоб уточнити строки поставки.",
            [
                "I am writing to confirm the delivery dates",
                "I am writing to clarify the delivery dates",
                "I am writing to enquire about the delivery dates",
                "I am writing to ask about the delivery dates",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wr-register",
        "Коли Yours sincerely, а коли Yours faithfully? Яких привітань уникати? Чим формальне прохання відрізняється від *I want that you?",
        "When do you use Yours sincerely, and when Yours faithfully? Which greetings should you avoid? How is a formal request different from *I want that you?",
        [
            idea("sincerely/faithfully", "sincerely/faithfully", "sincerely", "faithfully", "Sir or Madam"),
            idea("greetings", "greetings", "Dear friend", "Good day", "Hi", "Subject"),
            idea("grateful", "grateful", "grateful", "would like you to", "want that"),
        ],
        "Yours sincerely — коли ім'я відоме, Yours faithfully — після Dear Sir or Madam. Уникайте Dear friend і Good day як привітання в листі. Формальне прохання — I would be grateful if you could або I would like you to, не I want that you.",
        "Yours sincerely is for when you know the name, and Yours faithfully follows Dear Sir or Madam. Avoid Dear friend and Good day as email greetings. A formal request is I would be grateful if you could or I would like you to, not I want that you.",
    ),
)

U23_L2 = teach(
    "en-d-wr-request",
    "Лист-прохання",
    "A request email",
    3,
    "Контекст, чітке прохання, строк, вдячність",
    "Context, a clear request, a deadline, thanks",
    """Структура прохання: (1) короткий контекст — чому пишете; (2) саме прохання одним ясним реченням; (3) потрібний строк або формат; (4) подяка і готовність уточнити. Could you please send the signed contract by Friday? If you need any extra details, I would be happy to help.

Ввічливість без розмитості: ASAP у формальному листі краще замінити на by 15:00 EET on Tuesday. Please could you… і I was wondering if you could… — м'якші. Please send — пряміше, доречне з колегою, з ким уже є робочі стосунки.

Типові помилки: прохання поховане в довгому абзаці; два різні прохання без маркерів (також / second, could you…); *I ask you to (краще Could you / I would like to ask you to); пасивна агресія (As I already mentioned three times…). Один лист — одна головна дія, друге прохання — окремим реченням.""",
    """The structure of a request: (1) a short context — why you are writing; (2) the request itself in one clear sentence; (3) the deadline or the format you need; (4) thanks and a willingness to clarify. Could you please send the signed contract by Friday? If you need any extra details, I would be happy to help.

Politeness without vagueness: in a formal email, ASAP is better replaced by by 15:00 EET on Tuesday. Please could you… and I was wondering if you could… are softer. Please send is more direct, and it is fine with a colleague you already work with.

Typical mistakes: burying the request in a long paragraph; two different requests with no markers (also / second, could you…); *I ask you to (prefer Could you / I would like to ask you to); passive aggression (As I already mentioned three times…). One email — one main action; a second request goes in a separate sentence.""",
    [
        "Контекст → чітке прохання → строк → подяка",
        "Замість ASAP — конкретна дата й час",
        "Could you please / I was wondering if you could",
        "Один лист — одна головна дія",
    ],
    [
        "Context → a clear request → a deadline → thanks",
        "Instead of ASAP, a concrete date and time",
        "Could you please / I was wondering if you could",
        "One email — one main action",
    ],
    [
        mcq(
            "en-d-wr-request-r1",
            "У формальному листі замість ASAP краще:",
            "In a formal email, instead of ASAP it is better to use:",
            ["by 15:00 EET on Tuesday", "immediately!!!!!!!!!!!!", "whenever", "As I already mentioned three times"],
            0,
            "Конкретний строк ввічливіший і зрозуміліший.",
            "A concrete deadline is both politer and clearer.",
        ),
        fill(
            "en-d-wr-request-r2",
            "Почніть ввічливе прохання: Could you ___ send… (please).",
            "Start a polite request: Could you ___ send… (please).",
            "Could you ___ send the contract by Friday?",
            ["please", "Please"],
        ),
        mcq(
            "en-d-wr-request-r3",
            "Оберіть краще формулювання.",
            "Choose the better wording.",
            [
                "Could you please send the signed contract by Friday?",
                "I ask you to send contract.",
                "Send. Thanks.",
                "I want that you send the contract.",
            ],
            0,
            "Could you please + чіткий об'єкт і строк.",
            "Could you please plus a clear object and deadline.",
        ),
        translate(
            "en-d-wr-request-r4",
            "Перекладіть ввічливо.",
            "Translate politely.",
            "Будь ласка, надішліть підписаний договір до п'ятниці.",
            [
                "Could you please send the signed contract by Friday?",
                "Could you please send the signed contract by Friday",
                "Please could you send the signed contract by Friday?",
                "I would be grateful if you could send the signed contract by Friday",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wr-request",
        "Яка структура листа-прохання? Чому ASAP гірше за конкретну дату? Як ввічливо почати прохання?",
        "What is the structure of a request email? Why is ASAP worse than a concrete date? How do you start a request politely?",
        [
            idea("structure", "structure", "context", "deadline", "thanks", "контекст", "строк"),
            idea("ASAP", "ASAP", "ASAP", "Tuesday", "15:00"),
            idea("could you", "could you", "Could you please", "wondering"),
        ],
        "Спочатку контекст, потім одне чітке прохання, строк і подяка. ASAP розмите, краще by 15:00 EET on Tuesday. Ввічливий початок — Could you please або I was wondering if you could.",
        "First the context, then one clear request, a deadline and thanks. ASAP is vague; by 15:00 EET on Tuesday is better. A polite opening is Could you please or I was wondering if you could.",
    ),
)

U23_L3 = teach(
    "en-d-wr-complaint",
    "Лист-скарга",
    "A complaint email",
    3,
    "Факт, вплив, очікувана дія — без образи",
    "The fact, the impact, the action you want — without insult",
    """Скарга в діловій англійській спокійна і конкретна. Структура: (1) що замовили і коли (I placed order 184 on 2 May); (2) що пішло не так (The package arrived on 10 May with a cracked screen); (3) вплив (I cannot start work without a laptop); (4) що ви хочете (I would like a replacement or a full refund within five working days); (5) спокійний закриваючий тон (I look forward to your reply).

Корисні фрази: I am writing to complain about…; I am sorry to say that…; There appears to be a mistake. Under the warranty…; I expect this to be resolved. Уникайте You never…, This is a disaster, You must… як ультиматум без правової підстави.

Типові помилки: тільки емоції без номера замовлення; немає чіткої вимоги; погрози в першому ж реченні. Факт можна перевірити, тональність — ваша відповідальність. Якщо потрібен повторний лист, посилайтеся на попередній і дату, не підвищуйте тон одразу.""",
    """A complaint in workplace English is calm and concrete. The structure: (1) what you ordered and when (I placed order 184 on 2 May); (2) what went wrong (The package arrived on 10 May with a cracked screen); (3) the impact (I cannot start work without a laptop); (4) what you want (I would like a replacement or a full refund within five working days); (5) a calm closing (I look forward to your reply).

Useful phrases: I am writing to complain about…; I am sorry to say that…; There appears to be a mistake. Under the warranty…; I expect this to be resolved. Avoid You never…, This is a disaster, You must… as an ultimatum with no legal basis.

Typical mistakes: only emotion and no order number; no clear request; threats in the first sentence. The fact can be checked; the tone is your responsibility. If you need a second email, refer to the previous one and the date; do not raise the tone at once.""",
    [
        "Замовлення і дата → проблема → вплив → конкретна вимога",
        "I am writing to complain about…; There appears to be a mistake",
        "Без образ, ультиматумів і «disaster» у першому реченні",
        "Завжди вказуйте номер замовлення і бажану дію",
    ],
    [
        "Order and date → the problem → the impact → a concrete request",
        "I am writing to complain about…; There appears to be a mistake",
        "No insults, ultimatums or “disaster” in the first sentence",
        "Always give the order number and the action you want",
    ],
    [
        mcq(
            "en-d-wr-complaint-r1",
            "Чого бракує скарзі «This is a disaster!!! Fix it!!!»?",
            "What is missing from the complaint “This is a disaster!!! Fix it!!!”?",
            [
                "Фактів, номера замовлення і конкретної вимоги спокійним тоном",
                "Ще більшої кількості знаків оклику",
                "Слова Cheers після Dear Sir or Madam",
                "Ідіоми over the moon",
            ],
            0,
            "Скарга тримається на фактах і ясній вимозі.",
            "A complaint rests on facts and a clear request.",
            [
                "Facts, an order number and a concrete request in a calm tone",
                "Even more exclamation marks",
                "The word Cheers after Dear Sir or Madam",
                "The idiom over the moon",
            ],
        ),
        fill(
            "en-d-wr-complaint-r2",
            "Почніть: I am writing to ___ about… (complain).",
            "Start: I am writing to ___ about… (complain).",
            "I am writing to ___ about order 184.",
            ["complain", "Complain"],
        ),
        mcq(
            "en-d-wr-complaint-r3",
            "Оберіть кращий тон.",
            "Choose the better tone.",
            [
                "I would like a replacement or a full refund within five working days.",
                "You never do anything right.",
                "This is a disaster, you must pay now as a first sentence with no facts.",
                "Fix!!!!!!!!!!!!!!!",
            ],
            0,
            "Конкретна вимога і строк, спокійний тон.",
            "A concrete request and a deadline, in a calm tone.",
        ),
        translate(
            "en-d-wr-complaint-r4",
            "Перекладіть спокійно.",
            "Translate calmly.",
            "Пишу, щоб поскаржитися на замовлення 184.",
            [
                "I am writing to complain about order 184",
                "I am writing to complain about order 184.",
                "I'm writing to complain about order 184",
                "I am writing to complain about Order 184",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wr-complaint",
        "Яка структура листа-скарги? Які фрази корисні, а яких уникати? Чому потрібні номер замовлення і конкретна вимога?",
        "What is the structure of a complaint email? Which phrases are useful, and which should you avoid? Why do you need an order number and a concrete request?",
        [
            idea("structure", "structure", "order", "impact", "refund", "replacement"),
            idea("phrases", "phrases", "complain about", "appears to be", "disaster"),
            idea("calm", "calm", "calm", "facts", "deadline"),
        ],
        "Скарга починається з фактів і дати, далі проблема, вплив і конкретна вимога, наприклад replacement або refund. Корисні фрази — I am writing to complain about і There appears to be a mistake. Образи й «disaster» без номера замовлення не допомагають вирішити справу.",
        "A complaint starts with the facts and the date, then the problem, the impact and a concrete request, for example a replacement or a refund. Useful phrases are I am writing to complain about and There appears to be a mistake. Insults and “disaster” with no order number do not help to resolve the matter.",
    ),
)

U23_L4 = teach(
    "en-d-wr-apology",
    "Лист-вибачення",
    "An apology email",
    3,
    "Вибачтеся, визнайте факт, скажіть, що робите, і як уникнете повтору",
    "Apologise, own the fact, say what you are doing, and how you will prevent a repeat",
    """Сильне вибачення має чотири частини: (1) I'm sorry / I apologise for the delay — саме вибачення, без одразу «але»; (2) коротке визнання факту (We sent the wrong file yesterday); (3) що ви вже робите (I have just uploaded the correct version); (4) як це не повториться або що далі (We have added a second reviewer; you should have it by 17:00). Thank you for your patience — доречно, якщо клієнт чекав.

Уникайте: I'm sorry you feel that way (це не визнання); Sorry, but it was your fault; We regret any inconvenience caused як єдине речення без дії — звучить як шаблон. Sorry for the late reply прийнятно, якщо далі є суть.

Типові помилки: вибачатися десять разів і не виправляти; перекладати провину; гумор у серйозному збої. У формальному стилі I apologise; у командному чаті Sorry about that — і одразу фікс.""",
    """A strong apology has four parts: (1) I'm sorry / I apologise for the delay — the apology itself, without an immediate “but”; (2) a short owning of the fact (We sent the wrong file yesterday); (3) what you are already doing (I have just uploaded the correct version); (4) how it will not happen again, or what comes next (We have added a second reviewer; you should have it by 17:00). Thank you for your patience is appropriate if the client has been waiting.

Avoid: I'm sorry you feel that way (that is not owning it); Sorry, but it was your fault; We regret any inconvenience caused as the only sentence with no action — it sounds like a template. Sorry for the late reply is fine if the substance follows.

Typical mistakes: apologising ten times and not fixing anything; shifting the blame; humour in a serious incident. In a formal style, I apologise; in a team chat, Sorry about that — and then the fix at once.""",
    [
        "Вибачення → факт → дія зараз → запобігання / наступний крок",
        "Без «sorry, but» і без I'm sorry you feel that way",
        "Шаблон regret any inconvenience недостатній без дії",
        "I apologise (formal) / Sorry about that + фікс (чат)",
    ],
    [
        "Apology → the fact → action now → prevention / the next step",
        "No “sorry, but” and no I'm sorry you feel that way",
        "The template regret any inconvenience is not enough without action",
        "I apologise (formal) / Sorry about that + a fix (chat)",
    ],
    [
        mcq(
            "en-d-wr-apology-r1",
            "Що слабке в «I'm sorry you feel that way»?",
            "What is weak about “I'm sorry you feel that way”?",
            [
                "Це не визнає помилку, лише почуття іншої людини.",
                "Занадто багато фактів.",
                "Немає контракції.",
                "Це найкраще формальне вибачення.",
            ],
            0,
            "Треба визнати факт і назвати дію.",
            "You need to own the fact and name an action.",
            [
                "It does not own the mistake, only the other person's feelings.",
                "It has too many facts.",
                "It has no contraction.",
                "It is the best formal apology.",
            ],
        ),
        fill(
            "en-d-wr-apology-r2",
            "Формальне дієслово «вибачатися». Напишіть apologise (або apologize).",
            "Type apologise.",
            "I ___ for the delay.",
            ["apologise", "Apologise", "apologize", "Apologize"],
        ),
        mcq(
            "en-d-wr-apology-r3",
            "Оберіть сильніше вибачення.",
            "Choose the stronger apology.",
            [
                "I apologise for the delay. I have uploaded the correct file, and you should have it by 17:00.",
                "We regret any inconvenience caused.",
                "Sorry, but it was your fault.",
                "I'm sorry you feel that way.",
            ],
            0,
            "Вибачення + факт + конкретна дія і строк.",
            "An apology plus the fact plus a concrete action and a time.",
        ),
        translate(
            "en-d-wr-apology-r4",
            "Перекладіть.",
            "Translate.",
            "Перепрошую за затримку. Я щойно завантажив правильну версію.",
            [
                "I apologise for the delay. I have just uploaded the correct version",
                "I apologise for the delay. I have just uploaded the correct version.",
                "I apologize for the delay. I have just uploaded the correct version",
                "I'm sorry for the delay. I have just uploaded the correct version",
                "I'm sorry for the delay. I've just uploaded the correct version",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wr-apology",
        "Які чотири частини сильного вибачення? Чому «I'm sorry you feel that way» і «regret any inconvenience» без дії слабкі?",
        "What are the four parts of a strong apology? Why are “I'm sorry you feel that way” and “regret any inconvenience” without action weak?",
        [
            idea("four parts", "four parts", "apologise", "fact", "uploaded", "prevent"),
            idea("feel that way", "feel that way", "feel that way", "fault", "but"),
            idea("inconvenience", "inconvenience", "inconvenience", "template", "action"),
        ],
        "Сильне вибачення складається з вибачення, визнання факту, дії зараз і наступного кроку. I'm sorry you feel that way не визнає помилку, а We regret any inconvenience caused без дії звучить як шаблон.",
        "A strong apology is the apology itself, owning the fact, the action you are taking now, and the next step. I'm sorry you feel that way does not own the mistake, and We regret any inconvenience caused with no action sounds like a template.",
    ),
)

U23_L5 = teach(
    "en-d-wr-followup",
    "Follow-up: ввічливий нагадувальний лист",
    "A follow-up: a polite reminder email",
    3,
    "Посилання на попередній лист, короткий повтор прохання, новий строк",
    "A reference to the previous email, a short repeat of the request, a new deadline",
    """Follow-up — не докір, а допомога зрушити справу. Структура: (1) Just following up on my email of 4 May about invoice 184; (2) короткий повтор, що потрібно (We still need the signed copy to close the month); (3) зручний шлях відповісти (If it is easier, a scanned photo is fine); (4) м'який строк (Could you let me know by Wednesday?). Gentle reminder / Just circling back — прийнятно, якщо не щогодини.

Тон: припускайте добрі наміри (you may have missed this in a busy inbox). Другий follow-up може скопіювати керівника лише за домовленістю або політикою команди, і тоді прозоро: I am copying Inna so we can close this before Friday. Не пишіть As I said FIVE times.

Типові помилки: follow-up через годину; довгий лист, довший за перший; сарказм. Якщо вже відповіли — подякуйте і закрийте цикл (Thanks, received, I will send the receipt today).""",
    """A follow-up is not a rebuke, it is help to move the matter on. The structure: (1) Just following up on my email of 4 May about invoice 184; (2) a short repeat of what you need (We still need the signed copy to close the month); (3) an easy way to reply (If it is easier, a scanned photo is fine); (4) a gentle deadline (Could you let me know by Wednesday?). Gentle reminder / Just circling back is fine, if not every hour.

Tone: assume good intent (you may have missed this in a busy inbox). A second follow-up may copy a manager only if your team agrees, and then openly: I am copying Inna so we can close this before Friday. Do not write As I said FIVE times.

Typical mistakes: a follow-up after one hour; a letter longer than the first; sarcasm. If they have already replied — say thanks and close the loop (Thanks, received, I will send the receipt today).""",
    [
        "Following up on my email of [date] about [topic]",
        "Короткий повтор + легкий спосіб відповісти + м'який строк",
        "Припускайте добрі наміри; без сарказму і «FIVE times»",
        "Після відповіді — подяка і закриття циклу",
    ],
    [
        "Following up on my email of [date] about [topic]",
        "A short repeat + an easy way to reply + a gentle deadline",
        "Assume good intent; no sarcasm and no “FIVE times”",
        "After a reply — thanks and closing the loop",
    ],
    [
        mcq(
            "en-d-wr-followup-r1",
            "Оберіть кращий початок follow-up.",
            "Choose the better follow-up opening.",
            [
                "Just following up on my email of 4 May about invoice 184.",
                "As I said FIVE times, send it NOW.",
                "Hello???",
                "I am angry you ignored me.",
            ],
            0,
            "Дата, тема і спокійний тон.",
            "A date, a topic and a calm tone.",
        ),
        fill(
            "en-d-wr-followup-r2",
            "Just ___ up on my email… Напишіть following.",
            "Type following.",
            "Just ___ up on my email of 4 May.",
            ["following", "Following"],
        ),
        mcq(
            "en-d-wr-followup-r3",
            "Коли копіювати керівника?",
            "When do you copy a manager?",
            [
                "За домовленістю чи політикою, і прозоро пояснити навіщо.",
                "Завжди в першому ж листі.",
                "Ніколи, навіть через місяць мовчання за політикою команди.",
                "Тільки великими літерами в темі.",
            ],
            0,
            "Копія — свідомий крок, не сюрприз і не зброя.",
            "Copying someone is a deliberate step, not a surprise and not a weapon.",
            [
                "By agreement or policy, and openly saying why.",
                "Always in the very first email.",
                "Never, even after a month of silence under team policy.",
                "Only in capital letters in the subject.",
            ],
        ),
        translate(
            "en-d-wr-followup-r4",
            "Перекладіть.",
            "Translate.",
            "Пишу ще раз щодо мого листа від 4 травня про рахунок 184.",
            [
                "Just following up on my email of 4 May about invoice 184",
                "Just following up on my email of 4 May about invoice 184.",
                "I am following up on my email of 4 May about invoice 184",
                "I'm following up on my email of 4 May about invoice 184",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wr-followup",
        "Яка структура follow-up? Як тримати тон? Коли копіювати керівника?",
        "What is the structure of a follow-up? How do you keep the tone? When do you copy a manager?",
        [
            idea("following up", "following up", "follow-up", "following up", "дату", "date", "тему", "topic"),
            idea("tone", "tone", "тон", "tone", "сарказму", "sarcasm", "наміри", "intent"),
            idea("copy", "copy", "копіюють", "copy", "політик", "policy", "керівника", "manager"),
        ],
        "Follow-up починається з посилання на дату і тему, далі короткий повтор прохання, легкий спосіб відповісти і м'який строк. Тон припускає добрі наміри, без сарказму. Керівника копіюють за політикою команди і прозоро пояснюють навіщо.",
        "A follow-up starts with a reference to the date and the topic, then a short repeat of the request, an easy way to reply and a gentle deadline. The tone assumes good intent, without sarcasm. You copy a manager by team policy and you say openly why.",
    ),
)

U23_EXAM = exam_lesson(
    "en-deep-writing-email-exam",
    "Контрольна: листи",
    "Exam: emails",
    3,
    [
        mcq(
            "en-deep-writing-email-exam-q1",
            "Dear Sir or Madam потребує:",
            "Dear Sir or Madam takes:",
            ["Yours faithfully", "Yours sincerely, as the usual pair", "Cheers", "Dear friend"],
            0,
            "Yours faithfully.",
            "Yours faithfully.",
        ),
        mcq(
            "en-deep-writing-email-exam-q2",
            "Замість ASAP у формальному листі краще:",
            "Instead of ASAP in a formal email, it is better to use:",
            ["by 15:00 EET on Tuesday", "NOW!!!", "whenever you like, with no date, always", "Good day"],
            0,
            "Конкретний строк.",
            "A concrete deadline.",
        ),
        mcq(
            "en-deep-writing-email-exam-q3",
            "Сильне вибачення містить:",
            "A strong apology contains:",
            ["вибачення, факт, дію і наступний крок", "лише We regret any inconvenience caused", "I'm sorry you feel that way як достатнє визнання", "Sorry, but it was your fault"],
            0,
            "Чотири частини, включно з дією.",
            "Four parts, including an action.",
            ["an apology, the fact, an action and a next step", "only We regret any inconvenience caused", "I'm sorry you feel that way as enough ownership", "Sorry, but it was your fault"],
        ),
        mcq(
            "en-deep-writing-email-exam-q4",
            "Оберіть кращий follow-up.",
            "Choose the better follow-up.",
            [
                "Just following up on my email of 4 May about invoice 184.",
                "As I said FIVE times.",
                "I am writing to complain without facts, as a reminder.",
                "Yours faithfully after Hi Olena.",
            ],
            0,
            "Дата, тема, спокійний тон.",
            "A date, a topic, a calm tone.",
        ),
        fill(
            "en-deep-writing-email-exam-q5",
            "I am writing to ___ about order 184. (скарга)",
            "I am writing to ___ about order 184. (complaint)",
            "I am writing to ___ about order 184.",
            ["complain", "Complain"],
        ),
    ],
)

UNIT_23 = unit(
    "en-deep-writing-email",
    "Письмо: листи",
    "Writing: emails and messages",
    [U23_L1, U23_L2, U23_L3, U23_L4, U23_L5, U23_EXAM],
)

U24_L1 = teach(
    "en-d-wr-paragraph",
    "Абзац PEEL",
    "The PEEL paragraph",
    3,
    "Point, Evidence, Explain, Link",
    "Point, Evidence, Explain, Link",
    """PEEL — зручна рамка абзацу в есе. Point — одне твердження в першому реченні (Remote work can improve deep-focus time). Evidence — факт, приклад, коротке дослідження (A 2023 survey in our team found fewer interruptions after noon). Explain — чому це важливо, не повторюючи point тими самими словами (Fewer interruptions mean longer stretches of concentration). Link — місток до питання або наступного абзацу (However, this benefit depends on clear meeting rules).

Один абзац — одна ідея. 4–6 речень зазвичай досить для B2–C1. Не починайте всі абзаци з I think. Цифра чи короткий приклад сильніші за «багато людей кажуть».

Типові помилки: тільки Point без Evidence; Evidence без Explain (читач сам здогадуйся); три ідеї в одному абзаці; переказ прикладу замість пояснення. У висновку не додавайте нову ідею — стисніть уже сказане.""",
    """PEEL is a handy paragraph frame for an essay. Point is one claim in the first sentence (Remote work can improve deep-focus time). Evidence is a fact, an example, a short study (A 2023 survey in our team found fewer interruptions after noon). Explain is why that matters, without repeating the point in the same words (Fewer interruptions mean longer stretches of concentration). Link is a bridge to the question or the next paragraph (However, this benefit depends on clear meeting rules).

One paragraph — one idea. Four to six sentences are usually enough at B2–C1. Do not start every paragraph with I think. A figure or a short example is stronger than “many people say”.

Typical mistakes: only a Point with no Evidence; Evidence with no Explain (the reader has to guess); three ideas in one paragraph; retelling the example instead of explaining it. In the conclusion, do not add a new idea — compress what you have already said.""",
    [
        "Point — одна ідея; Evidence — приклад або факт",
        "Explain — навіщо це важливо; Link — місток далі",
        "Один абзац — одна ідея, 4–6 речень",
        "У висновку немає нової ідеї",
    ],
    [
        "Point is one idea; Evidence is an example or a fact",
        "Explain is why it matters; Link is a bridge onward",
        "One paragraph is one idea, four to six sentences",
        "The conclusion has no new idea",
    ],
    [
        mcq(
            "en-d-wr-paragraph-r1",
            "У PEEL літера E (Explain) означає:",
            "In PEEL, the E (Explain) means:",
            [
                "пояснити, чому факт важливий для тези",
                "повторити Point тими самими словами",
                "додати три нові теми",
                "закінчити есе новою ідеєю",
            ],
            0,
            "Explain розкриває значення Evidence.",
            "Explain unpacks what the Evidence means.",
            [
                "explain why the fact matters for the claim",
                "repeat the Point in the same words",
                "add three new topics",
                "end the essay with a new idea",
            ],
        ),
        fill(
            "en-d-wr-paragraph-r2",
            "Перша літера PEEL — Point. Друга — ___. Напишіть Evidence.",
            "Type Evidence.",
            "P-E-E-L: Point, ___, Explain, Link.",
            ["Evidence", "evidence"],
        ),
        mcq(
            "en-d-wr-paragraph-r3",
            "Один абзац тіла есе має містити:",
            "One body paragraph of an essay should contain:",
            ["одну головну ідею", "усі аргументи за і проти одразу", "тільки I think без прикладу", "нову ідею у висновку цього ж абзацу як правило"],
            0,
            "Один абзац — одна ідея.",
            "One paragraph is one idea.",
            ["one main idea", "every argument for and against at once", "only I think with no example", "a new idea in that paragraph's conclusion, as a rule"],
        ),
        translate(
            "en-d-wr-paragraph-r4",
            "Перекладіть.",
            "Translate.",
            "Один абзац має одну головну ідею.",
            [
                "One paragraph has one main idea",
                "One paragraph has one main idea.",
                "A paragraph should have one main idea",
                "A paragraph should have one main idea.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wr-paragraph",
        "Що означають літери PEEL? Скільки ідей в одному абзаці? Чого не робити у висновку?",
        "What do the letters PEEL mean? How many ideas go in one paragraph? What should you not do in the conclusion?",
        [
            idea("PEEL", "PEEL", "Point", "Evidence", "Explain", "Link"),
            idea("one idea", "one idea", "one", "paragraph", "абзац"),
            idea("conclusion", "conclusion", "conclusion", "new idea", "виснов"),
        ],
        "PEEL — це Point, Evidence, Explain і Link. В одному абзаці одна головна ідея, підкріплена фактом і поясненням. У висновку не додають нової ідеї, а стискають уже сказане.",
        "PEEL is Point, Evidence, Explain and Link. One paragraph has one main idea, supported by a fact and an explanation. In the conclusion you do not add a new idea; you compress what you have already said.",
    ),
)

U24_L2 = teach(
    "en-d-wr-opinion",
    "Есе-думка (IELTS Task 2 opinion)",
    "An opinion essay (IELTS Task 2 opinion)",
    3,
    "Чітка позиція вступ — два аргументи — короткий висновок",
    "A clear position in the introduction — two arguments — a short conclusion",
    """В opinion essay питання часто: To what extent do you agree? Або Do you agree or disagree? Відповідь має бути видно вже у вступі: I largely agree that… / I disagree with the idea that… Не ховайте позицію до останнього рядка. План: вступ (перефраз питання + теза), два абзаци PEEL, висновок (теза іншими словами, без нової ідеї). 250+ слів для IELTS Task 2.

Корисні рамки: One important reason is…; A further argument is…; This does not mean that… (поступка); On balance, I would argue that…. Хеджування (it is often, in many cases) виглядає зріліше за always / never, якщо у вас немає абсолютного доказу.

Типові помилки: перефраз питання тими самими словами (штраф за memorised openings); немає прикладу; обидві сторони «згодні і не згодні» без позиції, коли питають вашу думку. Якщо питання discussion (discuss both views) — це наступний урок, інша структура.""",
    """In an opinion essay the question is often: To what extent do you agree? Or Do you agree or disagree? The answer should already be visible in the introduction: I largely agree that… / I disagree with the idea that… Do not hide your position until the last line. A plan: introduction (paraphrase the question + a thesis), two PEEL paragraphs, a conclusion (the thesis in other words, no new idea). 250+ words for IELTS Task 2.

Useful frames: One important reason is…; A further argument is…; This does not mean that… (a concession); On balance, I would argue that…. Hedging (it is often, in many cases) looks more mature than always / never, if you have no absolute proof.

Typical mistakes: paraphrasing the question in the same words (a penalty for memorised openings); no example; both sides “agree and disagree” with no position when they asked for your view. If the question is a discussion (discuss both views), that is the next lesson — a different structure.""",
    [
        "Позиція вже у вступі: I largely agree / I disagree",
        "Перефраз питання + теза; два PEEL; висновок без нової ідеї",
        "IELTS Task 2: щонайменше 250 слів",
        "Не плутати з discuss both views",
    ],
    [
        "The position is already in the introduction: I largely agree / I disagree",
        "A paraphrase + a thesis; two PEEL paragraphs; a conclusion with no new idea",
        "IELTS Task 2: at least 250 words",
        "Do not confuse this with discuss both views",
    ],
    [
        mcq(
            "en-d-wr-opinion-r1",
            "У To what extent do you agree? позицію треба:",
            "In To what extent do you agree? your position should be:",
            [
                "показати вже у вступі",
                "сховати до останнього речення завжди",
                "не мати взагалі, лише переказати питання",
                "замінити списком ідіом",
            ],
            0,
            "Екзаменатор шукає чітку позицію з першого абзацу.",
            "The examiner looks for a clear position from the first paragraph.",
            [
                "shown already in the introduction",
                "always hidden until the last sentence",
                "absent; only retell the question",
                "replaced by a list of idioms",
            ],
        ),
        fill(
            "en-d-wr-opinion-r2",
            "Мінімум слів IELTS Task 2 — число. Напишіть 250.",
            "Type 250.",
            "Write at least ___ words.",
            ["250"],
        ),
        mcq(
            "en-d-wr-opinion-r3",
            "On balance, I would argue that — це:",
            "On balance, I would argue that is:",
            [
                "зріле підсумування позиції",
                "memorised opening, яке треба копіювати дослівно в кожне есе як вступ",
                "відмова від тези",
                "нове питання Task 1",
            ],
            0,
            "Корисна рамка висновку або тези, якщо вона щира.",
            "A useful frame for a conclusion or a thesis, if it is genuine.",
            [
                "a mature summing-up of a position",
                "a memorised opening to copy word for word into every essay as an introduction",
                "giving up the thesis",
                "a new Task 1 question",
            ],
        ),
        translate(
            "en-d-wr-opinion-r4",
            "Перекладіть тезу.",
            "Translate the thesis.",
            "Я загалом погоджуюся, що віддалена робота покращує концентрацію.",
            [
                "I largely agree that remote work improves concentration",
                "I largely agree that remote work improves concentration.",
                "I largely agree that remote work can improve concentration",
                "I largely agree that remote work can improve concentration.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wr-opinion",
        "Де має бути позиція в opinion essay? Який план і ліміт слів? Чим це відрізняється від discuss both views?",
        "Where should the position be in an opinion essay? What is the plan and the word limit? How is this different from discuss both views?",
        [
            idea("position", "position", "introduction", "agree", "disagree", "вступ"),
            idea("plan", "plan", "PEEL", "250", "conclusion"),
            idea("discussion", "discussion", "both views", "discussion", "інша"),
        ],
        "Позицію треба показати вже у вступі, після перефразу питання. Далі два абзаци PEEL і висновок без нової ідеї, щонайменше 250 слів. Discuss both views — інша структура, її не можна підміняти лише своєю думкою без обох сторін.",
        "You should show your position already in the introduction, after paraphrasing the question. Then come two PEEL paragraphs and a conclusion with no new idea, at least 250 words. Discuss both views is a different structure; you cannot replace it with only your opinion and no both sides.",
    ),
)

U24_L3 = teach(
    "en-d-wr-for-against",
    "Есе «за і проти» (discussion)",
    "A for-and-against essay (discussion)",
    3,
    "Обидві сторони справедливо, потім ваша вага",
    "Both sides fairly, then your own weighting",
    """Коли завдання Discuss both views and give your own opinion, треба чесно показати два погляди і лише потім (або коротко у вступі і знову у висновку) свою вагу. Структура: вступ (обидві ідеї + ваша позиція), абзац «за» з сильним аргументом іншої сторони, абзац «проти» або ваша сторона з сильнішим аргументом, висновок. Не перетворюйте чужий погляд на карикатуру — examiner оцінює баланс.

Рамки: On the one hand…; Advocates of this view argue that…; On the other hand…; Critics point out that…; While I understand this argument, I would still argue that…. Поступка (While X is true, Y…) підвищує бал за coherence.

Типові помилки: лише своя сторона; «одні кажуть / інші кажуть» без прикладів; неясна власна думка; дзеркальні абзаци однакових порожніх фраз. Сила — у конкретному прикладі для кожної сторони.""",
    """When the task is Discuss both views and give your own opinion, you have to show two views fairly and only then (or briefly in the introduction and again in the conclusion) your own weighting. The structure: introduction (both ideas + your position), a “for” paragraph with a strong argument for the other side, a “against” or your-side paragraph with a stronger argument, a conclusion. Do not turn the other view into a cartoon — the examiner marks you for balance.

Frames: On the one hand…; Advocates of this view argue that…; On the other hand…; Critics point out that…; While I understand this argument, I would still argue that…. A concession (While X is true, Y…) raises your coherence score.

Typical mistakes: only your own side; “some say / others say” with no examples; an unclear own view; mirror paragraphs of empty phrases. The strength is in a concrete example for each side.""",
    [
        "Discuss both views — обидві сторони + своя думка",
        "On the one hand / On the other hand; While I understand…",
        "Не робіть карикатуру з протилежного погляду",
        "Поступка While X is true, Y… покращує зв'язність",
    ],
    [
        "Discuss both views means both sides plus your own opinion",
        "On the one hand / On the other hand; While I understand…",
        "Do not turn the opposite view into a cartoon",
        "A concession While X is true, Y… improves coherence",
    ],
    [
        mcq(
            "en-d-wr-for-against-r1",
            "У Discuss both views and give your own opinion треба:",
            "In Discuss both views and give your own opinion you must:",
            [
                "чесно показати обидві сторони і свою вагу",
                "написати лише свою думку, як в opinion без змін",
                "не мати висновку",
                "використати лише ідіоми",
            ],
            0,
            "Баланс і явна власна позиція.",
            "Balance and a clear own position.",
            [
                "show both sides fairly and your own weighting",
                "write only your own view, as in an opinion essay with no change",
                "have no conclusion",
                "use only idioms",
            ],
        ),
        fill(
            "en-d-wr-for-against-r2",
            "On the one hand… On the other ___.",
            "On the one hand… On the other ___.",
            "On the other ___, critics point out the cost.",
            ["hand", "Hand"],
        ),
        mcq(
            "en-d-wr-for-against-r3",
            "While I understand this argument, I would still argue that — це:",
            "While I understand this argument, I would still argue that is:",
            [
                "поступка, після якої йде ваша позиція",
                "відмова від власної думки",
                "вступ Task 1",
                "скарга в листі",
            ],
            0,
            "Concession + власна вага.",
            "A concession plus your own weighting.",
            [
                "a concession, after which your position follows",
                "giving up your own opinion",
                "a Task 1 introduction",
                "a complaint in an email",
            ],
        ),
        translate(
            "en-d-wr-for-against-r4",
            "Перекладіть.",
            "Translate.",
            "З одного боку, це дешевше. З іншого боку, якість може впасти.",
            [
                "On the one hand, it is cheaper. On the other hand, quality may fall",
                "On the one hand, it is cheaper. On the other hand, quality may fall.",
                "On the one hand it is cheaper. On the other hand, quality may fall",
                "On the one hand, it's cheaper. On the other hand, quality may fall",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wr-for-against",
        "Чим discussion essay відрізняється від opinion? Яка структура і які корисні рамки? Навіщо поступка?",
        "How is a discussion essay different from an opinion essay? What is the structure, and which frames help? Why use a concession?",
        [
            idea("both views", "both views", "both views", "opinion", "баланс", "balance"),
            idea("on the one hand", "on the one hand", "one hand", "other hand", "advocates", "critics"),
            idea("concession", "concession", "While I understand", "still argue", "поступк"),
        ],
        "У discussion треба чесно показати обидві сторони і свою думку, а не лише одну позицію. Структура — вступ, абзац за, абзац проти, висновок. Рамки On the one hand і While I understand… I would still argue that допомагають зробити поступку і зберегти свою вагу.",
        "In a discussion you have to show both sides fairly and your own view, not only one position. The structure is an introduction, a for paragraph, an against paragraph and a conclusion. Frames such as On the one hand and While I understand… I would still argue that help you make a concession and keep your weighting.",
    ),
)

U24_L4 = teach(
    "en-d-wr-cv",
    "CV: дієслова дії та структура",
    "A CV: action verbs and structure",
    3,
    "Reduced a query from 4 s to 400 ms, не Responsible for queries",
    "Reduced a query from 4 s to 400 ms, not Responsible for queries",
    """CV (брит.) / résumé (амер.) читають швидко. Структура: ім'я і контакти; короткий profile (3–4 рядки під ціль вакансії, не життєпис); досвід від новішого до старішого; освіта; skills / tools; за потреби languages, projects. Кожен пункт досвіду — дієслово дії в минулому (або теперішньому, якщо це поточна роль) + що зробили + результат, бажано вимірюваний: Reduced API latency from 4 s to 400 ms by adding a cache. Не: Responsible for the API. Не: Helped with various tasks.

Корисні дієслова: built, shipped, designed, led, mentored, automated, reduced, improved, negotiated, documented, migrated. Підганяйте CV під вакансію: ті самі ключові слова, чесно. Обсяг часто 1–2 сторінки.

Типові помилки: фото і дата народження там, де це не прийнято (у багатьох англомовних країнах цього не просять); I, my в кожному рядку (краще без займенника: Led a team of four); брехня про стек; стіна тексту без куль. Cover letter — окремий наступний урок, не копія CV.""",
    """A CV (BrE) / résumé (AmE) is read fast. The structure: name and contacts; a short profile (three or four lines aimed at the vacancy, not a life story); experience from newest to oldest; education; skills / tools; and if useful, languages and projects. Each experience bullet is an action verb in the past (or the present, if this is the current role) + what you did + a result, preferably measurable: Reduced API latency from 4 s to 400 ms by adding a cache. Not: Responsible for the API. Not: Helped with various tasks.

Useful verbs: built, shipped, designed, led, mentored, automated, reduced, improved, negotiated, documented, migrated. Tailor the CV to the vacancy: the same keywords, honestly. The length is often one or two pages.

Typical mistakes: a photo and a date of birth where that is not expected (in many English-speaking countries they are not asked for); I and my in every line (better with no pronoun: Led a team of four); lying about the stack; a wall of text with no bullets. The cover letter is the next lesson, not a copy of the CV.""",
    [
        "Дієслово дії + що зробили + вимірний результат",
        "Не Responsible for… і не Helped with various tasks",
        "Досвід від новішого; профіль під вакансію; 1–2 сторінки",
        "Без зайвого I/my; чесні ключові слова вакансії",
    ],
    [
        "An action verb + what you did + a measurable result",
        "Not Responsible for… and not Helped with various tasks",
        "Experience from newest; a profile aimed at the vacancy; one or two pages",
        "No extra I/my; honest keywords from the vacancy",
    ],
    [
        mcq(
            "en-d-wr-cv-r1",
            "Оберіть сильніший рядок CV.",
            "Choose the stronger CV bullet.",
            [
                "Reduced API latency from 4 s to 400 ms by adding a cache.",
                "Responsible for the API.",
                "Helped with various tasks.",
                "I was doing some work on things.",
            ],
            0,
            "Дія + метод + вимірний результат.",
            "An action plus a method plus a measurable result.",
        ),
        fill(
            "en-d-wr-cv-r2",
            "Дієслово «скоротив». Напишіть Reduced (з великої, як на початку рядка).",
            "Type Reduced.",
            "___ query time from 4 s to 400 ms.",
            ["Reduced", "reduced"],
        ),
        mcq(
            "en-d-wr-cv-r3",
            "Порядок досвіду в CV зазвичай:",
            "The order of experience on a CV is usually:",
            ["від новішого до старішого", "від першої роботи в 15 років завжди", "лише освіта, без досвіду як правило", "випадковий"],
            0,
            "Reverse chronological — спочатку останнє.",
            "Reverse chronological — the latest first.",
            ["from newest to oldest", "always from a first job at 15", "education only, with no experience, as a rule", "random"],
        ),
        translate(
            "en-d-wr-cv-r4",
            "Перекладіть рядок CV.",
            "Translate the CV bullet.",
            "Скоротив затримку API з 4 с до 400 мс, додавши кеш.",
            [
                "Reduced API latency from 4 s to 400 ms by adding a cache",
                "Reduced API latency from 4 s to 400 ms by adding a cache.",
                "Reduced API latency from 4s to 400ms by adding a cache",
                "Reduced API latency from 4 seconds to 400 ms by adding a cache",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wr-cv",
        "Як будувати рядок досвіду? Яких формулювань уникати? Як підганяти CV під вакансію?",
        "How do you build an experience bullet? Which wordings should you avoid? How do you tailor a CV to a vacancy?",
        [
            idea("action verb", "action verb", "Reduced", "built", "led", "result"),
            idea("avoid", "avoid", "Responsible", "Helped with various", "I my"),
            idea("tailor", "tailor", "keywords", "vacancy", "profile"),
        ],
        "Рядок CV починається з дієслова дії і містить результат, бажано вимірюваний, наприклад Reduced API latency from 4 s to 400 ms. Уникайте Responsible for і Helped with various tasks. Підганяйте профіль і ключові слова під вакансію, чесно.",
        "A CV bullet starts with an action verb and includes a result, preferably measurable, for example Reduced API latency from 4 s to 400 ms. Avoid Responsible for and Helped with various tasks. Tailor the profile and the keywords to the vacancy, honestly.",
    ),
)

U24_L5 = teach(
    "en-d-wr-cover",
    "Супровідний лист",
    "A cover letter",
    3,
    "Чому ця роль, чому ви, конкретний доказ, заклик до розмови",
    "Why this role, why you, a concrete proof, a call to a conversation",
    """Cover letter не переказує CV. Три короткі абзаци часто досить: (1) на яку роль і звідки ви про неї дізнались, одна фраза-гачок; (2) два конкретні докази, що ви підходите (проект, результат, спільна цінність компанії — не «я командний гравець» без прикладу); (3) готовність поговорити і подяка. I am writing to apply for the Junior Backend role advertised on your site. In my last role I reduced… I would welcome the chance to discuss this.

Тон semi-formal: Dear Hiring Manager, якщо імені немає; Kind regards. 3/4 сторінки максимум. Підганяйте кожен лист: згадайте продукт чи принцип компанії, не як лестощі, а як зв'язок із вашим досвідом.

Типові помилки: «Я хочу розвиватися в вашій компанії» як єдина мотивація (що ви даєте їм?); копія CV; *Dear friend; стіна з 800 слів; вклали CV і в листі нічого конкретного. Closing: I look forward to hearing from you — прийнятно, якщо не єдине змістовне речення.""",
    """A cover letter does not retell the CV. Three short paragraphs are often enough: (1) which role and how you heard about it, plus one hook sentence; (2) two concrete proofs that you fit (a project, a result, a value you share with the company — not “I am a team player” with no example); (3) a willingness to talk and a thank-you. I am writing to apply for the Junior Backend role advertised on your site. In my last role I reduced… I would welcome the chance to discuss this.

The tone is semi-formal: Dear Hiring Manager, if you have no name; Kind regards. Three-quarters of a page at most. Tailor every letter: mention a product or a principle of the company, not as flattery, but as a link to your experience.

Typical mistakes: “I want to grow in your company” as the only motivation (what do you give them?); a copy of the CV; *Dear friend; a wall of 800 words; attaching a CV and saying nothing concrete in the letter. A closing: I look forward to hearing from you is fine, if it is not the only sentence with content.""",
    [
        "Не переказ CV: роль, два докази, заклик до розмови",
        "I am writing to apply for…; I would welcome the chance to discuss",
        "Dear Hiring Manager, якщо імені немає; Kind regards",
        "Конкретний зв'язок із компанією, не загальне «хочу розвиватися»",
    ],
    [
        "Not a retelling of the CV: the role, two proofs, a call to talk",
        "I am writing to apply for…; I would welcome the chance to discuss",
        "Dear Hiring Manager if you have no name; Kind regards",
        "A concrete link to the company, not a vague “I want to grow”",
    ],
    [
        mcq(
            "en-d-wr-cover-r1",
            "Супровідний лист має:",
            "A cover letter should:",
            [
                "додати два конкретні докази під цю роль, не копіювати CV",
                "повністю повторити CV",
                "початися з Dear friend",
                "мати 800 слів без абзаців",
            ],
            0,
            "Лист доповнює CV конкретним «чому ви і чому вони».",
            "The letter complements the CV with a concrete “why you and why them”.",
            [
                "add two concrete proofs for this role, not copy the CV",
                "repeat the CV in full",
                "start with Dear friend",
                "be 800 words with no paragraphs",
            ],
        ),
        fill(
            "en-d-wr-cover-r2",
            "I am writing to ___ for the Junior Backend role. Напишіть apply.",
            "Type apply.",
            "I am writing to ___ for the Junior Backend role.",
            ["apply", "Apply"],
        ),
        mcq(
            "en-d-wr-cover-r3",
            "Слабка мотивація як єдиний аргумент:",
            "A weak motivation as the only argument:",
            [
                "«Я хочу розвиватися у вашій компанії» без того, що ви даєте їм",
                "конкретний результат, пов'язаний із їхнім продуктом",
                "два вимірювані докази",
                "згадка про принцип компанії, зв'язаний із досвідом",
            ],
            0,
            "Роботодавець шукає цінність для команди, не лише ваш розвиток.",
            "The employer is looking for value for the team, not only your growth.",
            [
                "“I want to grow in your company” with no sense of what you give them",
                "a concrete result linked to their product",
                "two measurable proofs",
                "a mention of a company principle linked to your experience",
            ],
        ),
        translate(
            "en-d-wr-cover-r4",
            "Перекладіть.",
            "Translate.",
            "Пишу, щоб подати заявку на посаду Junior Backend.",
            [
                "I am writing to apply for the Junior Backend role",
                "I am writing to apply for the Junior Backend role.",
                "I am writing to apply for the Junior Backend position",
                "I am writing to apply for the Junior Backend position.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-wr-cover",
        "Чим cover letter відрізняється від CV? Яка структура з трьох абзаців? Якої мотивації уникати як єдиного аргументу?",
        "How is a cover letter different from a CV? What is the three-paragraph structure? Which motivation should you avoid as the only argument?",
        [
            idea("not a CV", "not a CV", "not", "retell", "proofs", "доказ", "переказує", "CV"),
            idea("apply for", "apply for", "apply for", "welcome the chance", "Hiring Manager", "роль", "гачок", "розмови"),
            idea("grow", "grow", "grow", "motivation", "value", "цінність", "розвива", "слабке", "команді"),
        ],
        "Cover letter не переказує CV, а пояснює, чому саме ця роль і ви, з двома конкретними доказами. Структура: роль і гачок, докази, запрошення до розмови. Єдине «хочу розвиватися» слабке, бо не каже, що ви даєте команді.",
        "A cover letter does not retell the CV; it explains why this role and why you, with two concrete proofs. The structure is the role and a hook, the proofs, and an invitation to talk. “I want to grow” alone is weak, because it does not say what you give the team.",
    ),
)

U24_EXAM = exam_lesson(
    "en-deep-writing-essay-exam",
    "Контрольна: есе, CV і супровідний лист",
    "Exam: essays, CV and cover letter",
    3,
    [
        mcq(
            "en-deep-writing-essay-exam-q1",
            "PEEL — це:",
            "PEEL is:",
            ["Point, Evidence, Explain, Link", "Please, Email, Essay, List", "Pass, Exam, English, Level", "Proof, Error, Edit, Leave"],
            0,
            "Point, Evidence, Explain, Link.",
            "Point, Evidence, Explain, Link.",
        ),
        mcq(
            "en-deep-writing-essay-exam-q2",
            "В opinion essay позицію показують:",
            "In an opinion essay the position is shown:",
            ["вже у вступі", "лише в останньому реченні завжди", "ніяк, лише discuss both як єдиний тип", "списком ідіом"],
            0,
            "Позиція з першого абзацу.",
            "The position from the first paragraph.",
            ["already in the introduction", "only in the last sentence, always", "not at all; only discuss both as the only type", "in a list of idioms"],
        ),
        mcq(
            "en-deep-writing-essay-exam-q3",
            "Сильніший рядок CV:",
            "The stronger CV bullet:",
            [
                "Reduced API latency from 4 s to 400 ms by adding a cache.",
                "Responsible for the API.",
                "Helped with various tasks.",
                "I did things.",
            ],
            0,
            "Дія і вимірний результат.",
            "An action and a measurable result.",
        ),
        mcq(
            "en-deep-writing-essay-exam-q4",
            "Cover letter має:",
            "A cover letter should:",
            [
                "додати докази під роль, не копіювати CV",
                "повністю повторити CV",
                "початися з Dear friend",
                "мати 800 слів як норму",
            ],
            0,
            "Доповнює CV, не дублює.",
            "It complements the CV, it does not duplicate it.",
            [
                "add proofs for the role, not copy the CV",
                "repeat the CV in full",
                "start with Dear friend",
                "be 800 words as a norm",
            ],
        ),
        fill(
            "en-deep-writing-essay-exam-q5",
            "IELTS Task 2: at least ___ words.",
            "IELTS Task 2: at least ___ words.",
            "Write at least ___ words.",
            ["250"],
        ),
    ],
)

UNIT_24 = unit(
    "en-deep-writing-essay",
    "Есе, CV і супровідний лист",
    "Essays, CV and cover letter",
    [U24_L1, U24_L2, U24_L3, U24_L4, U24_L5, U24_EXAM],
)

U25_L1 = teach(
    "en-d-sp-story",
    "Розповідь історії: рамка",
    "Storytelling: a frame",
    3,
    "Situation, problem, action, result, reflection",
    "Situation, problem, action, result, reflection",
    """Коротка історія на іспиті (IELTS Speaking Part 2) і на співбесіді тримається на рамці: Situation — де і коли; Problem / Task — що треба було зробити; Action — що зробили ви (не «ми якось»); Result — чим закінчилося, бажано вимірювано; Reflection — чому ви навчилися. Це близький родич STAR (Situation, Task, Action, Result).

Корисні маркери часу: At first, Then, After that, In the end, Looking back. Тривалість 1–2 хвилини: не роман, не одне речення. Практикуйте вголос із таймером: хвилина на підготовку, дві на мовлення, як у Part 2.

Типові помилки: загубитися в деталях інтер'єру; забути результат; говорити лише we, коли питають про ваш внесок; зупинитися через 15 секунд. Якщо забули слово — поясніть іншими (paraphrase), не мовчіть. SpeakButton у вправах допоможе почути модельну вимову підказок.""",
    """A short story in an exam (IELTS Speaking Part 2) and in a job interview rests on a frame: Situation — where and when; Problem / Task — what had to be done; Action — what you did (not a vague “we somehow”); Result — how it ended, preferably measurable; Reflection — what you learned. This is a close relative of STAR (Situation, Task, Action, Result).

Useful time markers: At first, Then, After that, In the end, Looking back. The length is one to two minutes: not a novel, not one sentence. Practise out loud with a timer: one minute to prepare, two to speak, as in Part 2.

Typical mistakes: getting lost in interior details; forgetting the result; saying only we when they asked about your contribution; stopping after fifteen seconds. If you forget a word — explain it in other words (paraphrase), do not go silent. The SpeakButton in the exercises will help you hear model pronunciation of the prompts.""",
    [
        "Situation → Task → Action → Result → Reflection (STAR+)",
        "At first, Then, In the end, Looking back",
        "1–2 хвилини; ваш внесок, не лише we",
        "Забули слово — paraphrase, не пауза",
    ],
    [
        "Situation → Task → Action → Result → Reflection (STAR+)",
        "At first, Then, In the end, Looking back",
        "One to two minutes; your contribution, not only we",
        "If you forget a word — paraphrase, do not pause in silence",
    ],
    [
        mcq(
            "en-d-sp-story-r1",
            "Рамка STAR — це:",
            "The STAR frame is:",
            [
                "Situation, Task, Action, Result",
                "Start, Talk, Argue, Run",
                "Subject, Tense, Article, Register",
                "Skim, Translate, Answer, Repeat",
            ],
            0,
            "Situation, Task, Action, Result.",
            "Situation, Task, Action, Result.",
        ),
        fill(
            "en-d-sp-story-r2",
            "Останній крок після Result у розширеній рамці — ___. Напишіть Reflection.",
            "Type Reflection.",
            "Situation, Task, Action, Result, ___.",
            ["Reflection", "reflection"],
        ),
        mcq(
            "en-d-sp-story-r3",
            "Якщо забули слово під час розповіді:",
            "If you forget a word while telling the story:",
            [
                "поясніть іншими словами (paraphrase)",
                "замовкніть на хвилину",
                "скажіть лише we і закінчіть",
                "перейдіть українською без потреби",
            ],
            0,
            "Paraphrase оцінюють позитивно.",
            "Paraphrase is marked positively.",
            [
                "explain it in other words (paraphrase)",
                "go silent for a minute",
                "say only we and stop",
                "switch to Ukrainian with no need",
            ],
        ),
        translate(
            "en-d-sp-story-r4",
            "Перекладіть маркер.",
            "Translate the marker.",
            "Згодом, озираючись назад, я зрозумів, чого навчився.",
            [
                "Looking back, I understood what I had learned",
                "Looking back, I understood what I had learned.",
                "Looking back, I realised what I had learned",
                "Looking back, I realized what I had learned",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-sp-story",
        "Яка рамка короткої історії? Скільки вона триває? Що робити, якщо забули слово?",
        "What is the frame of a short story? How long does it last? What do you do if you forget a word?",
        [
            idea("STAR", "STAR", "Situation", "Task", "Action", "Result", "Reflection"),
            idea("time", "time", "minute", "two", "At first", "Looking back"),
            idea("paraphrase", "paraphrase", "paraphrase", "forget", "silent"),
        ],
        "Коротка історія тримається на Situation, Task, Action, Result і Reflection і триває одну-дві хвилини. Маркери At first і Looking back допомагають структурі. Якщо слово забули, його пояснюють іншими словами, а не мовчать.",
        "A short story rests on Situation, Task, Action, Result and Reflection and lasts one to two minutes. Markers such as At first and Looking back help the structure. If you forget a word, you explain it in other words, rather than going silent.",
    ),
)

U25_L2 = teach(
    "en-d-sp-present",
    "Коротка презентація на 60 секунд",
    "A 60-second presentation",
    3,
    "Гачок, три пункти, закриття, пауза",
    "A hook, three points, a close, a pause",
    """Шістдесят секунд — це не «прочитати слайд». План: гачок (одне речення, чому це важливо зараз); три пункти, кожен по одному реченню + приклад; закриття з закликом або питанням. Today I want to share how we cut our build time in half. First… Second… Finally… If you want the details, I can walk you through the pipeline after this.

Голос: трохи повільніше, ніж у розмові; пауза після гачка і між пунктами; наголос на ключових словах (урок про sentence stress). Не вибачайтеся за англійську на старті (Sorry for my English) — це краде час і впевненість. Якщо є слайд, не читайте його дослівно.

Типові помилки: хвилина вступу «отже, е-е»; десять пунктів; закінчити «ну ось»; говорити в підлогу. Запишіть себе на телефон: чи чути first / second / finally? Чи є одна ясна ідея?""",
    """Sixty seconds is not “reading a slide”. The plan: a hook (one sentence on why this matters now); three points, each one sentence plus an example; a close with a call or a question. Today I want to share how we cut our build time in half. First… Second… Finally… If you want the details, I can walk you through the pipeline after this.

Voice: a little slower than in conversation; a pause after the hook and between points; stress on the key words (the lesson on sentence stress). Do not apologise for your English at the start (Sorry for my English) — that steals time and confidence. If there is a slide, do not read it word for word.

Typical mistakes: a minute of “so, uh” as an introduction; ten points; ending with “well, that’s it”; talking into the floor. Record yourself on your phone: can you hear first / second / finally? Is there one clear idea?""",
    [
        "Гачок → First / Second / Finally → закриття з питанням",
        "Трохи повільніше, паузи, наголос на ключових словах",
        "Не Sorry for my English на старті",
        "Одна ідея, три пункти, не десять",
    ],
    [
        "A hook → First / Second / Finally → a close with a question",
        "A little slower, pauses, stress on the key words",
        "No Sorry for my English at the start",
        "One idea, three points, not ten",
    ],
    [
        mcq(
            "en-d-sp-present-r1",
            "Шістдесят секунд краще будувати як:",
            "Sixty seconds is better built as:",
            [
                "гачок, три пункти і закриття",
                "десять пунктів без пауз",
                "хвилина «е-е» і вибачення за англійську",
                "дослівне читання всього слайда",
            ],
            0,
            "Проста рамка чується чіткіше.",
            "A simple frame is easier to hear.",
            [
                "a hook, three points and a close",
                "ten points with no pauses",
                "a minute of “uh” and an apology for your English",
                "reading the whole slide word for word",
            ],
        ),
        fill(
            "en-d-sp-present-r2",
            "Second… ___. Напишіть Finally (третій маркер).",
            "Type Finally.",
            "First… Second… ___.",
            ["Finally", "finally"],
        ),
        mcq(
            "en-d-sp-present-r3",
            "Sorry for my English на початку презентації:",
            "Sorry for my English at the start of a presentation:",
            [
                "краде час і впевненість, краще почати з ідеї",
                "обов'язкове в усіх англомовних зустрічах",
                "підвищує бал IELTS завжди",
                "замінює гачок",
            ],
            0,
            "Почніть із змісту, не з вибачення.",
            "Start with the content, not with an apology.",
            [
                "steals time and confidence; it is better to start with the idea",
                "is required in every English-language meeting",
                "always raises an IELTS score",
                "replaces the hook",
            ],
        ),
        translate(
            "en-d-sp-present-r4",
            "Перекладіть гачок.",
            "Translate the hook.",
            "Сьогодні хочу розповісти, як ми скоротили час збірки вдвічі.",
            [
                "Today I want to share how we cut our build time in half",
                "Today I want to share how we cut our build time in half.",
                "Today I'd like to share how we cut our build time in half",
                "Today I would like to share how we cut our build time in half",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-sp-present",
        "Який план 60-секундної презентації? Як говорити голосом? Чому не варто починати з Sorry for my English?",
        "What is the plan of a 60-second presentation? How should you use your voice? Why shouldn't you start with Sorry for my English?",
        [
            idea("hook", "hook", "hook", "First", "Finally", "close", "гачок", "закриття"),
            idea("voice", "voice", "pause", "slower", "stress", "пауз", "повільніш", "наголос"),
            idea("sorry", "sorry", "Sorry for my English", "confidence", "впевнен", "Вибачення", "англійськ"),
        ],
        "План — гачок, три пункти First, Second, Finally і закриття з питанням. Говоріть трохи повільніше, з паузами і наголосом на ключових словах. Вибачення за англійську на старті краде час і впевненість, тому починають з ідеї.",
        "The plan is a hook, three points First, Second, Finally, and a close with a question. Speak a little slower, with pauses and stress on the key words. An apology for your English at the start steals time and confidence, so you start with the idea.",
    ),
)

U25_L3 = teach(
    "en-d-sp-hedge",
    "Незгода і хеджування на B2–C1",
    "Disagreement and hedging at B2–C1",
    3,
    "I see your point, but…; I'm not sure I agree; That may be true for X",
    "I see your point, but…; I'm not sure I agree; That may be true for X",
    """Пряме I disagree звучить жорстко в багатьох командах. М'якші формули: I see your point, but I look at it differently. I'm not sure I agree with that, because…. That may be true for the old API, but the new one behaves differently. Wouldn't it be better if we…? I might be wrong, but…. Хеджування (perhaps, it seems, a little, in some cases) зберігає обличчя співрозмовника.

Сильна незгода теж потрібна, коли ставка висока: I have to disagree here — this would break the SLA. Тоді підстава йде одразу. Не посміхайтеся і кажіть yes, якщо маєте на увазі no: англійське That's interesting не завжди = згода.

Типові помилки українських мовців: занадто різке No; або навпаки повна згода з ввічливості, а потім тихий саботаж. Підсумок зустрічі: So, just to check, we are agreeing to… — щоб м'яка незгода не загубилася.""",
    """A bare I disagree sounds harsh in many teams. Softer formulas: I see your point, but I look at it differently. I'm not sure I agree with that, because…. That may be true for the old API, but the new one behaves differently. Wouldn't it be better if we…? I might be wrong, but…. Hedging (perhaps, it seems, a little, in some cases) protects the other person's face.

Strong disagreement is still needed when the stakes are high: I have to disagree here — this would break the SLA. Then the reason follows at once. Do not smile and say yes if you mean no: English That's interesting does not always mean agreement.

Typical mistakes for Ukrainian speakers: a too sharp No; or, the opposite, full agreement out of politeness and then quiet sabotage. A meeting summary: So, just to check, we are agreeing to… — so that a soft disagreement is not lost.""",
    [
        "I see your point, but…; I'm not sure I agree, because…",
        "That may be true for X, but Y; Wouldn't it be better if…",
        "Коли ставка висока — I have to disagree + підстава",
        "That's interesting ≠ автоматична згода",
    ],
    [
        "I see your point, but…; I'm not sure I agree, because…",
        "That may be true for X, but Y; Wouldn't it be better if…",
        "When the stakes are high — I have to disagree + a reason",
        "That's interesting is not automatic agreement",
    ],
    [
        mcq(
            "en-d-sp-hedge-r1",
            "М'якша незгода:",
            "A softer disagreement:",
            [
                "I see your point, but I look at it differently.",
                "No. You're wrong.",
                "Yes (коли маєте на увазі no).",
                "That's interesting як повна згода завжди.",
            ],
            0,
            "Визнати точку зору і додати свою з but.",
            "Acknowledge the point and add yours with but.",
        ),
        fill(
            "en-d-sp-hedge-r2",
            "I'm not sure I ___ with that. Напишіть agree.",
            "Type agree.",
            "I'm not sure I ___ with that, because the SLA would break.",
            ["agree", "Agree"],
        ),
        mcq(
            "en-d-sp-hedge-r3",
            "That's interesting завжди означає згоду?",
            "Does That's interesting always mean agreement?",
            [
                "Ні, іноді це лише ввічлива пауза.",
                "Так, завжди.",
                "Так, і це юридичний підпис.",
                "Це завжди різка незгода.",
            ],
            0,
            "Уточніть: So, are we agreeing to…?",
            "Check: So, are we agreeing to…?",
            [
                "No, sometimes it is only a polite pause.",
                "Yes, always.",
                "Yes, and it is a legal signature.",
                "It is always sharp disagreement.",
            ],
        ),
        translate(
            "en-d-sp-hedge-r4",
            "Перекладіть м'яко.",
            "Translate softly.",
            "Я розумію вашу думку, але дивлюся на це інакше.",
            [
                "I see your point, but I look at it differently",
                "I see your point, but I look at it differently.",
                "I see your point but I look at it differently",
                "I see your point, but I see it differently",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-sp-hedge",
        "Які формули м'якої незгоди? Коли потрібна сильна? Чому That's interesting не завжди згода?",
        "What are the formulas for soft disagreement? When is a strong one needed? Why is That's interesting not always agreement?",
        [
            idea("soft", "soft", "I see your point", "not sure I agree", "may be true"),
            idea("strong", "strong", "have to disagree", "SLA", "because"),
            idea("interesting", "interesting", "That's interesting", "check", "agreeing"),
        ],
        "М'яка незгода — I see your point, but і I'm not sure I agree, because. Коли ставка висока, кажуть I have to disagree і одразу підставу. That's interesting не завжди означає згоду, тому варто уточнити So, are we agreeing to…",
        "Soft disagreement is I see your point, but and I'm not sure I agree, because. When the stakes are high, you say I have to disagree and give a reason at once. That's interesting does not always mean agreement, so it is worth checking So, are we agreeing to…",
    ),
)

U25_L4 = teach(
    "en-d-sp-interview",
    "Відповіді на співбесіді",
    "Job-interview answers",
    3,
    "Tell me about yourself — не біографія з дитсадка",
    "Tell me about yourself is not a biography from kindergarten",
    """Tell me about yourself — 60–90 секунд: теперішня роль, релевантний результат, чому ця вакансія. Tell me about a conflict — STAR, без пліток: проблема, що зробили ви, чим закінчилося, чого навчилися. What's your weakness? — справжня робоча слабкість + що ви вже робите (I used to over-explain in PRs; I now write a three-line summary first), не «я перфекціоніст» як прихована похвала.

Why should we hire you? — два докази з CV + зв'язок із їхнім продуктом, як у cover letter. Do you have questions for us? — завжди так: про команду, про успіх на випробувальному, про наступний крок. Зарплата: I am looking for a range of X–Y, depending on the total package — після того, як зрозуміли роль, якщо можете.

Типові помилки: говорити 8 хвилин без паузи; погано про попереднього роботодавця; немає питань у кінці; зубріння тексту, який звучить як робот. Практикуйте вголос, не лише письмово.""",
    """Tell me about yourself is 60–90 seconds: your current role, a relevant result, why this vacancy. Tell me about a conflict is STAR, with no gossip: the problem, what you did, how it ended, what you learned. What's your weakness? is a real work weakness plus what you are already doing (I used to over-explain in PRs; I now write a three-line summary first), not “I am a perfectionist” as hidden praise.

Why should we hire you? is two proofs from the CV plus a link to their product, as in a cover letter. Do you have questions for us? is always yes: about the team, about success in the trial period, about the next step. Salary: I am looking for a range of X–Y, depending on the total package — after you understand the role, if you can.

Typical mistakes: talking for eight minutes with no pause; speaking badly of a previous employer; no questions at the end; memorising a text that sounds like a robot. Practise out loud, not only in writing.""",
    [
        "Tell me about yourself: роль, результат, чому ця вакансія",
        "Conflict — STAR без пліток; weakness — справжня + що вже робите",
        "Завжди майте питання до них",
        "Не ганьбити попереднього роботодавця",
    ],
    [
        "Tell me about yourself: the role, a result, why this vacancy",
        "Conflict is STAR with no gossip; a weakness is real + what you already do",
        "Always have questions for them",
        "Do not speak badly of a previous employer",
    ],
    [
        mcq(
            "en-d-sp-interview-r1",
            "Tell me about yourself краще як:",
            "Tell me about yourself is better as:",
            [
                "60–90 секунд: роль, результат, чому ця вакансія",
                "біографія з дитсадка",
                "вісім хвилин без паузи",
                "критика попереднього роботодавця",
            ],
            0,
            "Коротко і під вакансію.",
            "Short and aimed at the vacancy.",
            [
                "60–90 seconds: the role, a result, why this vacancy",
                "a biography from kindergarten",
                "eight minutes with no pause",
                "criticism of a previous employer",
            ],
        ),
        fill(
            "en-d-sp-interview-r2",
            "Конфлікт розповідають за рамкою ___. Напишіть STAR.",
            "Type STAR.",
            "Tell a conflict story with the ___ frame.",
            ["STAR", "Star", "star"],
        ),
        mcq(
            "en-d-sp-interview-r3",
            "Краща відповідь на weakness:",
            "A better weakness answer:",
            [
                "реальна слабкість і конкретна дія, яку ви вже робите",
                "«Я перфекціоніст» як прихована похвала",
                "«Немає слабкостей»",
                "плітки про колегу",
            ],
            0,
            "Чесність плюс вже видимий фікс.",
            "Honesty plus a fix that is already visible.",
            [
                "a real weakness and a concrete action you are already taking",
                "“I am a perfectionist” as hidden praise",
                "“I have no weaknesses”",
                "gossip about a colleague",
            ],
        ),
        translate(
            "en-d-sp-interview-r4",
            "Перекладіть.",
            "Translate.",
            "У мене є кілька питань про команду і наступний крок.",
            [
                "I have a few questions about the team and the next step",
                "I have a few questions about the team and the next step.",
                "I have some questions about the team and the next step",
                "I'd like to ask a few questions about the team and the next step",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-sp-interview",
        "Як відповісти на Tell me about yourself і на weakness? Як говорити про конфлікт? Чому потрібні питання до них?",
        "How do you answer Tell me about yourself and a weakness question? How do you talk about a conflict? Why do you need questions for them?",
        [
            idea("about yourself", "about yourself", "60", "role", "result", "vacancy"),
            idea("STAR weakness", "STAR weakness", "STAR", "weakness", "perfectionist"),
            idea("questions", "questions", "questions", "team", "next step"),
        ],
        "Tell me about yourself — це 60–90 секунд про роль, результат і цю вакансію. Конфлікт розповідають за STAR без пліток, а weakness — справжня слабкість і вже зроблена дія, не «я перфекціоніст». Питання до них показують інтерес і допомагають оцінити команду.",
        "Tell me about yourself is 60–90 seconds about the role, a result and this vacancy. A conflict is told with STAR and no gossip, and a weakness is a real weakness plus an action already taken, not “I am a perfectionist”. Questions for them show interest and help you judge the team.",
    ),
)

U25_L5 = teach(
    "en-d-sp-speculate",
    "Припущення: might have, looks as if, probably",
    "Speculating: might have, looks as if, probably",
    3,
    "Він, можливо, забув; схоже, сервер упав",
    "He might have forgotten; it looks as if the server is down",
    """На іспиті (IELTS Speaking Part 3, FCE photos) і в роботі часто треба припустити, не стверджувати. Теперішнє: It looks as if the server is down. She might be working from home. He's probably on leave. Минуле: He might have missed the email. They must have left already (сильна впевненість — див. модальні перфект). Майбутнє: It could take a bit longer. I wouldn't be surprised if we slipped the date.

Корисні рамки: I'd say…; If I had to guess…; It depends, but…. Чесне It depends + два фактори звучить зріліше за випадкове yes. Для фото: They might be colleagues; It looks as if they're celebrating.

Типові помилки: He must forgot (потрібен have + V3: must have forgotten); It looks as the server (потрібен as if / like); абсолютне He is angry з фото, де це лише припущення. Хеджуйте: He looks angry, або He might be angry.""",
    """In an exam (IELTS Speaking Part 3, FCE photos) and at work you often have to speculate, not assert. Present: It looks as if the server is down. She might be working from home. He's probably on leave. Past: He might have missed the email. They must have left already (strong confidence — see perfect modals). Future: It could take a bit longer. I wouldn't be surprised if we slipped the date.

Useful frames: I'd say…; If I had to guess…; It depends, but…. An honest It depends plus two factors sounds more mature than a random yes. For a photo: They might be colleagues; It looks as if they're celebrating.

Typical mistakes: He must forgot (you need have + V3: must have forgotten); It looks as the server (you need as if / like); an absolute He is angry from a photo where it is only a guess. Hedge: He looks angry, or He might be angry.""",
    [
        "It looks as if…; She might be…; He's probably…",
        "Минуле: might have + V3 (might have missed)",
        "I'd say; If I had to guess; It depends, but…",
        "Не He must forgot і не абсолют з фото",
    ],
    [
        "It looks as if…; She might be…; He's probably…",
        "Past: might have + V3 (might have missed)",
        "I'd say; If I had to guess; It depends, but…",
        "Not He must forgot and not an absolute from a photo",
    ],
    [
        mcq(
            "en-d-sp-speculate-r1",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "He might have missed the email.",
                "He must forgot the email.",
                "It looks as the server is down, with no if or like.",
                "He is angry, as a certainty from a vague photo.",
            ],
            0,
            "might have + V3.",
            "might have + V3.",
        ),
        fill(
            "en-d-sp-speculate-r2",
            "It looks ___ if the server is down. Напишіть as.",
            "Type as.",
            "It looks ___ if the server is down.",
            ["as", "As"],
        ),
        mcq(
            "en-d-sp-speculate-r3",
            "Зріліша відповідь на складне питання Part 3:",
            "A more mature answer to a difficult Part 3 question:",
            [
                "It depends, but two factors are X and Y.",
                "Yes. (і тиша)",
                "I don't know. (і тиша)",
                "He must forgot.",
            ],
            0,
            "It depends + фактори — природний хід.",
            "It depends plus factors is a natural move.",
        ),
        translate(
            "en-d-sp-speculate-r4",
            "Перекладіть.",
            "Translate.",
            "Схоже, сервер упав.",
            [
                "It looks as if the server is down",
                "It looks as if the server is down.",
                "It looks like the server is down",
                "It looks like the server is down.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-sp-speculate",
        "Які рамки припущення в теперішньому і минулому? Яка типова помилка з must? Як відповідати на складне питання?",
        "What are the speculation frames in the present and the past? What is the typical mistake with must? How do you answer a difficult question?",
        [
            idea("looks as if", "looks as if", "looks as if", "might be", "probably"),
            idea("might have", "might have", "might have", "must have", "forgotten", "V3"),
            idea("depends", "depends", "depends", "guess", "I'd say"),
        ],
        "У теперішньому кажемо It looks as if і She might be, у минулому — might have plus V3, наприклад might have missed. Типова помилка — He must forgot без have. На складне питання природно відповісти It depends і назвати два фактори.",
        "In the present we say It looks as if and She might be, and in the past might have plus V3, for example might have missed. A typical mistake is He must forgot with no have. For a difficult question it is natural to say It depends and name two factors.",
    ),
)

U25_EXAM = exam_lesson(
    "en-deep-speaking-exam",
    "Контрольна: усне мовлення",
    "Exam: speaking",
    3,
    [
        mcq(
            "en-deep-speaking-exam-q1",
            "STAR — це:",
            "STAR is:",
            ["Situation, Task, Action, Result", "Speak, Translate, Argue, Repeat", "Start talking at random", "Sorry for my English, Then argue, Run"],
            0,
            "Situation, Task, Action, Result.",
            "Situation, Task, Action, Result.",
        ),
        mcq(
            "en-deep-speaking-exam-q2",
            "60-секундну презентацію краще почати з:",
            "A 60-second presentation is better started with:",
            ["гачка і ідеї, не з Sorry for my English", "вибачення за мову", "десяти пунктів одразу", "читання слайда дослівно як єдиний метод"],
            0,
            "Спочатку зміст.",
            "Content first.",
            ["a hook and the idea, not Sorry for my English", "an apology for your language", "ten points at once", "reading the slide word for word as the only method"],
        ),
        mcq(
            "en-deep-speaking-exam-q3",
            "М'якша незгода:",
            "A softer disagreement:",
            ["I see your point, but I look at it differently.", "No. You're wrong.", "That's interesting як повна згода завжди.", "Yes, коли маєте на увазі no."],
            0,
            "I see your point, but…",
            "I see your point, but…",
        ),
        mcq(
            "en-deep-speaking-exam-q4",
            "Оберіть правильне.",
            "Choose the correct option.",
            [
                "He might have missed the email.",
                "He must forgot the email.",
                "It looks as the server is down, with no if.",
                "Tell me about yourself — eight minutes on kindergarten.",
            ],
            0,
            "might have + V3.",
            "might have + V3.",
        ),
        fill(
            "en-deep-speaking-exam-q5",
            "It looks ___ if the server is down.",
            "It looks ___ if the server is down.",
            "It looks ___ if the server is down.",
            ["as", "As"],
        ),
    ],
)

UNIT_25 = unit(
    "en-deep-speaking",
    "Усне мовлення",
    "Speaking and functional language",
    [U25_L1, U25_L2, U25_L3, U25_L4, U25_L5, U25_EXAM],
)

U26_L1 = teach(
    "en-d-biz-negotiate",
    "Переговори про обсяг",
    "Negotiating scope",
    3,
    "If we add X, we need to drop Y or move the date",
    "If we add X, we need to drop Y or move the date",
    """Переговори про scope — це не «так усім». Рамка: повторіть запит (So you would like a CSV export in this sprint); назвіть обмеження (We have three days and two engineers); запропонуйте варіанти (We can ship a basic export now and filters in the next sprint; or we move the deadline). If we add X, we'll need to drop Y or move the date — класичний trade-off.

Корисні фрази: What's the must-have versus the nice-to-have? Can we descope…? That's doable if…; I can't commit to that date without looking at the backlog. Let's take this offline — коли зустріч застрягла. Підсумок письмово: As agreed, we will…

Типові помилки: мовчазне «так» і зрив через тиждень; ні без варіанта; жаргон без пояснення для нетехнічного стейкхолдера. Не обіцяйте best effort як дату. Цей урок поглиблює tech-english, не повторює базові stand-up фрази.""",
    """Negotiating scope is not “yes to everyone”. The frame: restate the request (So you would like a CSV export in this sprint); name the constraint (We have three days and two engineers); offer options (We can ship a basic export now and filters in the next sprint; or we move the deadline). If we add X, we'll need to drop Y or move the date is the classic trade-off.

Useful phrases: What's the must-have versus the nice-to-have? Can we descope…? That's doable if…; I can't commit to that date without looking at the backlog. Let's take this offline — when the meeting is stuck. A written summary: As agreed, we will…

Typical mistakes: a silent “yes” and a miss a week later; a no with no option; jargon with no explanation for a non-technical stakeholder. Do not promise best effort as a date. This lesson goes deeper than tech-english; it does not repeat basic stand-up phrases.""",
    [
        "Повтор запиту → обмеження → варіанти (X, або Y, або дата)",
        "must-have vs nice-to-have; That's doable if…",
        "I can't commit to that date without…",
        "Підсумок As agreed, we will… письмово",
    ],
    [
        "Restate the request → the constraint → options (X, or Y, or the date)",
        "must-have vs nice-to-have; That's doable if…",
        "I can't commit to that date without…",
        "A written summary As agreed, we will…",
    ],
    [
        mcq(
            "en-d-biz-negotiate-r1",
            "Класичний trade-off:",
            "The classic trade-off:",
            [
                "If we add X, we'll need to drop Y or move the date.",
                "Yes to everything, with no date change.",
                "No, with no option.",
                "Best effort as a fixed Friday deadline.",
            ],
            0,
            "Додати X — зняти Y або зрушити дату.",
            "Adding X means dropping Y or moving the date.",
        ),
        fill(
            "en-d-biz-negotiate-r2",
            "What's the must-have versus the nice-to-___?",
            "What's the must-have versus the nice-to-___?",
            "What's the must-have versus the nice-to-___?",
            ["have", "Have"],
        ),
        mcq(
            "en-d-biz-negotiate-r3",
            "I can't commit to that date without looking at the backlog означає:",
            "I can't commit to that date without looking at the backlog means:",
            [
                "ви ще не обіцяєте дату, поки не перевірите обсяг",
                "ви вже згодні на будь-яку дату",
                "ви відмовляєтесь говорити",
                "ви берете best effort як контракт",
            ],
            0,
            "Чесне обмеження, не відмова від розмови.",
            "An honest constraint, not a refusal to talk.",
            [
                "you are not promising the date yet, until you check the scope",
                "you already agree to any date",
                "you refuse to talk",
                "you take best effort as a contract",
            ],
        ),
        translate(
            "en-d-biz-negotiate-r4",
            "Перекладіть.",
            "Translate.",
            "Якщо додамо X, доведеться зняти Y або перенести дату.",
            [
                "If we add X, we'll need to drop Y or move the date",
                "If we add X, we'll need to drop Y or move the date.",
                "If we add X, we will need to drop Y or move the date",
                "If we add X, we will need to drop Y or move the date.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-biz-negotiate",
        "Яка рамка переговорів про обсяг? Що таке must-have versus nice-to-have? Чому не варто обіцяти best effort як дату?",
        "What is the frame for negotiating scope? What is must-have versus nice-to-have? Why shouldn't you promise best effort as a date?",
        [
            idea("trade-off", "trade-off", "add X", "drop Y", "move the date"),
            idea("must-have", "must-have", "must-have", "nice-to-have", "descope"),
            idea("commit", "commit", "commit", "backlog", "best effort"),
        ],
        "Спочатку повторюють запит, називають обмеження і дають варіанти: додати X, зняти Y або зрушити дату. Must-have — обов'язкове, nice-to-have можна відкласти. Best effort — не дата, і перед обіцянкою дивляться backlog.",
        "First you restate the request, name the constraint and offer options: add X, drop Y or move the date. Must-have is essential, and nice-to-have can wait. Best effort is not a date, and before a promise you look at the backlog.",
    ),
)

U26_L2 = teach(
    "en-d-biz-stakeholder",
    "Оновлення для стейкхолдерів",
    "Stakeholder updates",
    3,
    "Status, risk, ask — без стіни жаргону",
    "Status, risk, ask — without a wall of jargon",
    """Стейкхолдер часто не хоче лог комітів. Рамка статусу: Green / amber / red (або On track / At risk / Off track); що зроблено з останнього разу; що далі; ризики і що ви вже робите; одне чітке ask (We need a decision on X by Thursday). We are on track to ship on 20 May. One risk: the vendor API is slow; we are testing a cache and will confirm on Wednesday. Ask: please approve the copy.

Мова: менше We refactored the orchestrator, більше Users can now export a report in one click, unless аудиторія — інженери. RAG-статус (червоний) потребує причини і плану, не лише слова red.

Типові помилки: приховати ризик до п'ятниці; десять asks; статус без дати. Письмовий weekly може бути шість рядків. Цей формат працює і в Slack, і в листі.""",
    """A stakeholder often does not want a commit log. The status frame: Green / amber / red (or On track / At risk / Off track); what was done since last time; what is next; risks and what you are already doing; one clear ask (We need a decision on X by Thursday). We are on track to ship on 20 May. One risk: the vendor API is slow; we are testing a cache and will confirm on Wednesday. Ask: please approve the copy.

Language: less We refactored the orchestrator, more Users can now export a report in one click, unless the audience is engineers. A RAG status of red needs a reason and a plan, not only the word red.

Typical mistakes: hiding a risk until Friday; ten asks; a status with no date. A written weekly can be six lines. This format works in Slack and in email.""",
    [
        "On track / At risk / Off track + дата",
        "Зроблено → далі → ризик із планом → одне ask",
        "Мова користі для нетехнічної аудиторії",
        "Червоний статус завжди з причиною і планом",
    ],
    [
        "On track / At risk / Off track + a date",
        "Done → next → a risk with a plan → one ask",
        "Benefit language for a non-technical audience",
        "A red status always has a reason and a plan",
    ],
    [
        mcq(
            "en-d-biz-stakeholder-r1",
            "Оновлення стейкхолдеру краще містить:",
            "A stakeholder update is better when it contains:",
            [
                "статус, ризик із планом і одне чітке ask",
                "повний лог комітів без висновку",
                "слово red без причини",
                "десять asks без дати",
            ],
            0,
            "Коротко: стан, ризик, прохання.",
            "Briefly: the state, a risk, a request.",
            [
                "a status, a risk with a plan, and one clear ask",
                "a full commit log with no conclusion",
                "the word red with no reason",
                "ten asks with no date",
            ],
        ),
        fill(
            "en-d-biz-stakeholder-r2",
            "We are on ___ to ship on 20 May. Напишіть track.",
            "Type track.",
            "We are on ___ to ship on 20 May.",
            ["track", "Track"],
        ),
        mcq(
            "en-d-biz-stakeholder-r3",
            "Для нетехнічного стейкхолдера краще:",
            "For a non-technical stakeholder it is better to say:",
            [
                "Users can now export a report in one click.",
                "We refactored the orchestrator, as the only sentence.",
                "Off track. (без плану)",
                "See the git log.",
            ],
            0,
            "Користь для користувача, не внутрішній жаргон.",
            "A benefit for the user, not internal jargon.",
        ),
        translate(
            "en-d-biz-stakeholder-r4",
            "Перекладіть.",
            "Translate.",
            "Нам потрібне рішення щодо X до четверга.",
            [
                "We need a decision on X by Thursday",
                "We need a decision on X by Thursday.",
                "We need a decision about X by Thursday",
                "We need a decision about X by Thursday.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-biz-stakeholder",
        "Яка рамка статусу для стейкхолдера? Що робити з ризиком і з червоним статусом? Яку мову обирати?",
        "What is the status frame for a stakeholder? What do you do with a risk and with a red status? Which language do you choose?",
        [
            idea("on track", "on track", "on track", "at risk", "off track"),
            idea("ask", "ask", "ask", "decision", "Thursday", "risk"),
            idea("users", "users", "Users can now", "jargon", "orchestrator"),
        ],
        "Статус — on track, at risk або off track із датою, далі зроблене, наступні кроки, ризик із планом і одне ask. Червоний статус без причини і плану неповний. Для нетехнічної аудиторії говорять мовою користі, наприклад Users can now export a report.",
        "The status is on track, at risk or off track with a date, then what was done, next steps, a risk with a plan and one ask. A red status with no reason and no plan is incomplete. For a non-technical audience you speak in benefits, for example Users can now export a report.",
    ),
)

U26_L3 = teach(
    "en-d-biz-incident",
    "Мова інциденту",
    "Incident language",
    3,
    "What we know, what we're doing, when the next update is",
    "What we know, what we're doing, when the next update is",
    """Під час інциденту мова коротка і чесна. Зовнішнє повідомлення: We are aware of an issue affecting login. Users may see a 500 error. We are investigating and will post the next update by 14:30 EET. Не звинувачуйте вендора публічно в першу хвилину. Не обіцяйте resolved, поки не впевнені. Workaround, якщо є: Logging in via SSO still works.

Внутрішній канал: severity, impact (how many users), timeline, owner, next check. We are mitigating; a rollback is in progress. After the incident — a post-mortem без пошуку винного: What happened, customer impact, root cause, what went well, action items with owners and dates.

Типові помилки: тиша; «все добре» коли не добре; жаргон без impact; post-mortem як суд. Слова: outage, degraded, mitigated, resolved, RCA (root cause analysis).""",
    """During an incident the language is short and honest. An external message: We are aware of an issue affecting login. Users may see a 500 error. We are investigating and will post the next update by 14:30 EET. Do not blame a vendor in public in the first minute. Do not promise resolved until you are sure. A workaround, if there is one: Logging in via SSO still works.

An internal channel: severity, impact (how many users), timeline, owner, next check. We are mitigating; a rollback is in progress. After the incident — a post-mortem without a hunt for someone to blame: What happened, customer impact, root cause, what went well, action items with owners and dates.

Typical mistakes: silence; “everything is fine” when it is not; jargon with no impact; a post-mortem as a trial. Words: outage, degraded, mitigated, resolved, RCA (root cause analysis).""",
    [
        "What we know → what we're doing → next update at [time]",
        "Не resolved, доки не впевнені; назвіть workaround",
        "Post-mortem: root cause і action items, не винний",
        "outage, degraded, mitigated, rollback",
    ],
    [
        "What we know → what we're doing → next update at [time]",
        "Not resolved until you are sure; name a workaround",
        "A post-mortem: root cause and action items, not a guilty party",
        "outage, degraded, mitigated, rollback",
    ],
    [
        mcq(
            "en-d-biz-incident-r1",
            "Краще зовнішнє повідомлення:",
            "A better external message:",
            [
                "We are investigating a login issue and will update you by 14:30 EET.",
                "Everything is fine. (коли логін не працює)",
                "It is all the vendor's fault, as a first public sentence with no facts.",
                "Resolved. (коли ще розслідуєте)",
            ],
            0,
            "Чесно: знаємо, діємо, наступне оновлення о цій годині.",
            "Honest: we know, we are acting, the next update is at this time.",
        ),
        fill(
            "en-d-biz-incident-r2",
            "A ___ is in progress (відкат). Напишіть rollback.",
            "Type rollback.",
            "A ___ is in progress.",
            ["rollback", "Rollback"],
        ),
        mcq(
            "en-d-biz-incident-r3",
            "Post-mortem має бути:",
            "A post-mortem should be:",
            [
                "розбір причини і дії з відповідальними, без полювання на винного",
                "судом над однією людиною",
                "тишею",
                "обіцянкою resolved під час аварії без перевірки",
            ],
            0,
            "Навчання команди, не покарання.",
            "Team learning, not punishment.",
            [
                "an analysis of the cause and actions with owners, without a hunt for someone to blame",
                "a trial of one person",
                "silence",
                "a promise of resolved during the outage with no check",
            ],
        ),
        translate(
            "en-d-biz-incident-r4",
            "Перекладіть.",
            "Translate.",
            "Ми розслідуємо проблему і дамо наступне оновлення до 14:30.",
            [
                "We are investigating and will post the next update by 14:30",
                "We are investigating and will post the next update by 14:30.",
                "We are investigating and will give the next update by 14:30",
                "We're investigating and will post the next update by 14:30",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-biz-incident",
        "Що має бути в повідомленні про інцидент? Коли казати resolved? Який тон post-mortem?",
        "What should an incident message contain? When do you say resolved? What is the tone of a post-mortem?",
        [
            idea("update", "update", "investigating", "next update", "14:30"),
            idea("resolved", "resolved", "resolved", "workaround", "rollback"),
            idea("post-mortem", "post-mortem", "post-mortem", "root cause", "blame"),
        ],
        "Повідомлення каже, що відомо, що роблять і коли буде наступне оновлення. Resolved говорять лише коли впевнені, і якщо є workaround, його називають. Post-mortem шукає причину і дії, а не винного.",
        "A message says what is known, what is being done and when the next update will be. You say resolved only when you are sure, and if there is a workaround, you name it. A post-mortem looks for a cause and for actions, not for someone to blame.",
    ),
)

U26_L4 = teach(
    "en-d-biz-interview",
    "IT-співбесіда: технічна англійська",
    "An IT interview: technical English",
    3,
    "Поясніть trade-off, не лише назву технології",
    "Explain the trade-off, not only the name of the technology",
    """Технічне питання: Why did you choose Redis here? — не «бо круто». Рамка: проблема (We needed sub-millisecond reads for sessions), варіанти (in-memory cache vs DB), trade-off (Redis is fast but we must plan invalidation), результат. Якщо не знаєте — I haven't used X in production; I would start from the docs and from Y, which I do know. Чесність краща за вигаданий досвід.

System design вголос: уточніть вимоги (How many users? Read-heavy?); запропонуйте простий варіант; назвіть вузьке місце; що зміните при зростанні. Let's assume…; One bottleneck would be…; We could shard later.

Типові помилки: мовчазне кодування без пояснення (think out loud); захищати рішення, яке вже визнали слабким; акроніми без розшифровки, якщо інтерв'юер не з вашого стеку. Повторюйте питання своїми словами: So you're asking how I would handle retries?""",
    """A technical question: Why did you choose Redis here? is not “because it's cool”. The frame: the problem (We needed sub-millisecond reads for sessions), the options (an in-memory cache vs the DB), the trade-off (Redis is fast but we must plan invalidation), the result. If you do not know — I haven't used X in production; I would start from the docs and from Y, which I do know. Honesty is better than invented experience.

System design out loud: clarify the requirements (How many users? Read-heavy?); offer a simple option; name a bottleneck; what you would change as it grows. Let's assume…; One bottleneck would be…; We could shard later.

Typical mistakes: silent coding with no explanation (think out loud); defending a decision you have already admitted is weak; acronyms with no expansion if the interviewer is not from your stack. Rephrase the question: So you're asking how I would handle retries?""",
    [
        "Проблема → варіанти → trade-off → результат",
        "I haven't used X in production — чесно, плюс план",
        "System design: вимоги, простий варіант, bottleneck",
        "Think out loud; перефразуйте питання",
    ],
    [
        "Problem → options → trade-off → result",
        "I haven't used X in production — honestly, plus a plan",
        "System design: requirements, a simple option, a bottleneck",
        "Think out loud; rephrase the question",
    ],
    [
        mcq(
            "en-d-biz-interview-r1",
            "Чому обрали Redis — краща відповідь:",
            "Why did you choose Redis — a better answer:",
            [
                "проблема, варіанти, trade-off і результат",
                "«Бо круто», без деталей",
                "вигаданий досвід у production",
                "мовчазне кодування без слів",
            ],
            0,
            "Trade-off показує мислення.",
            "The trade-off shows your thinking.",
            [
                "the problem, the options, the trade-off and the result",
                "“Because it's cool”, with no detail",
                "invented production experience",
                "silent coding with no words",
            ],
        ),
        fill(
            "en-d-biz-interview-r2",
            "One ___ would be… (вузьке місце). Напишіть bottleneck.",
            "Type bottleneck.",
            "One ___ would be the database writes.",
            ["bottleneck", "Bottleneck"],
        ),
        mcq(
            "en-d-biz-interview-r3",
            "Якщо технології не знаєте:",
            "If you do not know the technology:",
            [
                "чесно сказати і показати, з чого почнете",
                "вигадать досвід",
                "замовкнути",
                "образити інтерв'юера",
            ],
            0,
            "Чесність плюс план навчання.",
            "Honesty plus a learning plan.",
            [
                "say so honestly and show what you would start from",
                "invent experience",
                "go silent",
                "insult the interviewer",
            ],
        ),
        translate(
            "en-d-biz-interview-r4",
            "Перекладіть.",
            "Translate.",
            "Отже, ви питаєте, як би я обробляв повторні спроби?",
            [
                "So you're asking how I would handle retries?",
                "So you are asking how I would handle retries?",
                "So you're asking how I would handle retries.",
                "So you are asking how I would handle retries.",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-biz-interview",
        "Як пояснити вибір технології? Що казати, якщо досвіду немає? Як говорити system design вголос?",
        "How do you explain a technology choice? What do you say if you have no experience? How do you talk through system design?",
        [
            idea("trade-off", "trade-off", "problem", "options", "trade-off", "Redis"),
            idea("haven't used", "haven't used", "haven't used", "production", "docs"),
            idea("bottleneck", "bottleneck", "bottleneck", "assume", "shard", "think out loud"),
        ],
        "Вибір пояснюють через проблему, варіанти, trade-off і результат. Якщо досвіду немає, це кажуть чесно і показують план. System design вголос починається з вимог, простого варіанта і вузького місця, і треба think out loud.",
        "You explain a choice through the problem, the options, the trade-off and the result. If you have no experience, you say so honestly and show a plan. System design out loud starts with the requirements, a simple option and a bottleneck, and you have to think out loud.",
    ),
)

U26_L5 = teach(
    "en-d-biz-agile",
    "Мова agile-церемоній",
    "The language of agile ceremonies",
    3,
    "Yesterday, today, a blocker — і ретро без звинувачень",
    "Yesterday, today, a blocker — and a retro without blame",
    """Stand-up: Yesterday I finished the invoice export. Today I'll review the PR and start filters. I have a blocker: I'm waiting on access to staging. Не звіт за тиждень і не демо коду. Якщо блокера немає — I have no blockers. Parking lot — тему відкласти після стендапу.

Планування: estimate, story points, capacity, spike (дослідження з лімітом часу), definition of ready / of done. I would size this as a five; the unknown is the vendor API — maybe a spike first. Ретроспектива: What went well? What should we change? I liked that we…; Next time I would…; Let's try a WIP limit of two. Без імен у негативі: The hand-off was late, не Inna ruined it.

Типові помилки: стендап як нарада на 40 хвилин; ретро як суд; «блокера немає» коли вже три дні чекаєте доступ. Цей урок розширює вже відомі stand-up фрази з tech-english до оцінки, spike і ретро.""",
    """A stand-up: Yesterday I finished the invoice export. Today I'll review the PR and start filters. I have a blocker: I'm waiting on access to staging. It is not a weekly report and not a demo of the code. If there is no blocker — I have no blockers. A parking lot is a topic to leave until after the stand-up.

Planning: estimate, story points, capacity, a spike (research with a time limit), a definition of ready / of done. I would size this as a five; the unknown is the vendor API — maybe a spike first. A retrospective: What went well? What should we change? I liked that we…; Next time I would…; Let's try a WIP limit of two. No names in the negative: The hand-off was late, not Inna ruined it.

Typical mistakes: a stand-up as a 40-minute meeting; a retro as a trial; “no blockers” when you have already been waiting three days for access. This lesson extends the stand-up phrases you already know from tech-english into estimates, spikes and the retro.""",
    [
        "Yesterday / Today / Blocker — коротко",
        "estimate, spike, definition of done, capacity",
        "Ретро: what went well / change; без імен у негативі",
        "Parking lot — не зараз, після стендапу",
    ],
    [
        "Yesterday / Today / Blocker — briefly",
        "estimate, spike, definition of done, capacity",
        "A retro: what went well / change; no names in the negative",
        "A parking lot is not now, it is after the stand-up",
    ],
    [
        mcq(
            "en-d-biz-agile-r1",
            "Оберіть правильний стендап-звіт.",
            "Choose a correct stand-up update.",
            [
                "Yesterday I finished the export. Today I'll start filters. Blocker: waiting on staging access.",
                "Let me demo thirty minutes of code.",
                "Inna ruined it.",
                "No blockers. (коли три дні немає доступу, і ви мовчите про це)",
            ],
            0,
            "Вчора, сьогодні, блокер — по одному реченню.",
            "Yesterday, today, a blocker — one sentence each.",
        ),
        fill(
            "en-d-biz-agile-r2",
            "Коротке дослідження з лімітом часу називається ___. Напишіть spike.",
            "Type spike.",
            "Maybe a ___ first, before we estimate.",
            ["spike", "Spike"],
        ),
        mcq(
            "en-d-biz-agile-r3",
            "У ретро краще:",
            "In a retro it is better to say:",
            [
                "The hand-off was late. Next time I would add a checklist.",
                "Inna ruined it.",
                "Нічого не казати про проблеми.",
                "Перетворити ретро на оцінку story points.",
            ],
            0,
            "Факт і дія, без персонального звинувачення.",
            "A fact and an action, with no personal blame.",
        ),
        translate(
            "en-d-biz-agile-r4",
            "Перекладіть.",
            "Translate.",
            "У мене блокер: чекаю доступ до staging.",
            [
                "I have a blocker: I'm waiting on access to staging",
                "I have a blocker: I'm waiting on access to staging.",
                "I have a blocker: I am waiting on access to staging",
                "I have a blocker: I am waiting for access to staging",
                "I have a blocker: I'm waiting for access to staging",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-biz-agile",
        "Що кажуть на стендапі? Що таке spike? Як говорити на ретро без звинувачень?",
        "What do you say at a stand-up? What is a spike? How do you speak at a retro without blame?",
        [
            idea("stand-up", "stand-up", "Yesterday", "Today", "blocker"),
            idea("spike", "spike", "spike", "estimate", "definition of done"),
            idea("retro", "retro", "went well", "hand-off", "Inna", "checklist"),
        ],
        "На стендапі кажуть, що було вчора, що сьогодні і чи є блокер. Spike — коротке дослідження з лімітом часу, перш ніж оцінювати. На ретро говорять про факти й наступні дії, наприклад The hand-off was late, без персональних звинувачень.",
        "At a stand-up you say what happened yesterday, what is happening today and whether there is a blocker. A spike is short research with a time limit, before you estimate. At a retro you talk about facts and next actions, for example The hand-off was late, without personal blame.",
    ),
)

U26_EXAM = exam_lesson(
    "en-deep-business-it-exam",
    "Контрольна: ділова та IT-англійська",
    "Exam: business and IT English",
    3,
    [
        mcq(
            "en-deep-business-it-exam-q1",
            "Trade-off обсягу:",
            "A scope trade-off:",
            [
                "If we add X, we'll need to drop Y or move the date.",
                "Yes to everything.",
                "No, with no option, always.",
                "Best effort as a Friday contract.",
            ],
            0,
            "X, або Y, або дата.",
            "X, or Y, or the date.",
        ),
        mcq(
            "en-deep-business-it-exam-q2",
            "Оновлення стейкхолдеру:",
            "A stakeholder update:",
            [
                "статус, ризик із планом, одне ask",
                "лише лог комітів",
                "red без причини",
                "десять asks без дати",
            ],
            0,
            "Короткий статус і одне прохання.",
            "A short status and one request.",
            ["a status, a risk with a plan, one ask", "only a commit log", "red with no reason", "ten asks with no date"],
        ),
        mcq(
            "en-deep-business-it-exam-q3",
            "Під час інциденту краще:",
            "During an incident it is better to:",
            [
                "сказати, що відомо, що робите і коли наступне оновлення",
                "пообіцяти resolved одразу без перевірки",
                "мовчати",
                "звинуватити вендора в першому публічному реченні без фактів",
            ],
            0,
            "Чесне коротке оновлення.",
            "An honest short update.",
            [
                "say what is known, what you are doing and when the next update is",
                "promise resolved at once with no check",
                "stay silent",
                "blame the vendor in the first public sentence with no facts",
            ],
        ),
        mcq(
            "en-deep-business-it-exam-q4",
            "На стендапі:",
            "At a stand-up:",
            [
                "Yesterday, today, a blocker",
                "Inna ruined it як стандартний формат",
                "сорокахвилинне демо коду як норма",
                "оцінка всіх епіків заново",
            ],
            0,
            "Коротко три пункти.",
            "Three short points.",
        ),
        fill(
            "en-deep-business-it-exam-q5",
            "We are on ___ to ship on 20 May.",
            "We are on ___ to ship on 20 May.",
            "We are on ___ to ship on 20 May.",
            ["track", "Track"],
        ),
    ],
)

UNIT_26 = unit(
    "en-deep-business-it",
    "Ділова та IT-англійська+",
    "Business and IT English plus",
    [U26_L1, U26_L2, U26_L3, U26_L4, U26_L5, U26_EXAM],
)

U27_L1 = teach(
    "en-d-ex-t1",
    "IELTS Writing Task 1: графіки",
    "IELTS Writing Task 1: graphs",
    3,
    "Огляд, порівняння, дані — без думки",
    "An overview, comparisons, data — no opinion",
    """Task 1 Academic — описати графік, таблицю чи процес приблизно за 20 хвилин, від 150 слів. Не пишіть свою думку (I think this is terrible). Структура: вступ — перефраз завдання (The chart illustrates…); overview — дві головні тенденції без дрібних чисел (Overall, sales rose sharply, while costs remained stable); два абзаци з даними і порівняннями.

Мова змін: rose / increased / climbed / grew; fell / declined / dropped; remained stable / fluctuated; a sharp rise, a gradual fall, peaked at, reached a low of, overtook, three times as high as. Відсотки і роки точні; не треба кожну точку. Процес: The first step is…, After that…, Finally…. Map: to the north of, was replaced by.

Типові помилки: немає overview (це знижує бал Task Achievement); копія завдання; I, we, opinion; перелік усіх чисел без порівняння. The graph shows — можна раз, далі The figure for X was….""",
    """Academic Task 1 is describing a graph, a table or a process in about twenty minutes, from 150 words. Do not write your opinion (I think this is terrible). The structure: an introduction — a paraphrase of the task (The chart illustrates…); an overview — two main trends with no small numbers (Overall, sales rose sharply, while costs remained stable); two paragraphs of data and comparisons.

The language of change: rose / increased / climbed / grew; fell / declined / dropped; remained stable / fluctuated; a sharp rise, a gradual fall, peaked at, reached a low of, overtook, three times as high as. Percentages and years are exact; you do not need every point. A process: The first step is…, After that…, Finally…. A map: to the north of, was replaced by.

Typical mistakes: no overview (that lowers the Task Achievement score); copying the task; I, we, opinion; a list of every number with no comparison. The graph shows can appear once; then The figure for X was….""",
    [
        "150+ слів; вступ, overview, два абзаци даних",
        "Без особистої думки; обов'язковий загальний огляд",
        "rose, fell, remained stable, peaked at, three times as high as",
        "Порівнюйте, не перелічуйте кожну точку",
    ],
    [
        "150+ words; introduction, overview, two data paragraphs",
        "No personal opinion; a general overview is required",
        "rose, fell, remained stable, peaked at, three times as high as",
        "Compare, do not list every point",
    ],
    [
        mcq(
            "en-d-ex-t1-r1",
            "У Task 1 Academic треба:",
            "In Academic Task 1 you should:",
            [
                "дати overview головних тенденцій і порівняти дані, без особистої думки",
                "написати I think this is terrible",
                "скопіювати завдання дослівно",
                "пропустити overview",
            ],
            0,
            "Overview обов'язковий; думка — ні.",
            "An overview is required; an opinion is not.",
            [
                "give an overview of the main trends and compare the data, with no personal opinion",
                "write I think this is terrible",
                "copy the task word for word",
                "skip the overview",
            ],
        ),
        fill(
            "en-d-ex-t1-r2",
            "Мінімум слів Task 1. Напишіть 150.",
            "Type 150.",
            "Write at least ___ words.",
            ["150"],
        ),
        mcq(
            "en-d-ex-t1-r3",
            "Sales rose sharply означає:",
            "Sales rose sharply means:",
            [
                "продажі різко зросли",
                "продажі залишилися стабільними",
                "продажі впали",
                "це особиста думка автора есе",
            ],
            0,
            "a sharp rise — різке зростання.",
            "a sharp rise is a steep increase.",
            ["sales increased steeply", "sales remained stable", "sales fell", "this is the essay writer's personal opinion"],
        ),
        translate(
            "en-d-ex-t1-r4",
            "Перекладіть overview.",
            "Translate the overview.",
            "Загалом продажі різко зросли, тоді як витрати залишилися стабільними.",
            [
                "Overall, sales rose sharply, while costs remained stable",
                "Overall, sales rose sharply, while costs remained stable.",
                "Overall sales rose sharply, while costs remained stable",
                "Overall, sales increased sharply, while costs remained stable",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-ex-t1",
        "Яка структура IELTS Task 1? Чому потрібен overview? Якої мови уникати?",
        "What is the structure of IELTS Task 1? Why do you need an overview? Which language should you avoid?",
        [
            idea("structure", "structure", "overview", "150", "paraphrase", "compare", "вступ", "огляду"),
            idea("trends", "trends", "rose", "fell", "peaked", "stable", "тенденц", "даних", "порівнян"),
            idea("no opinion", "no opinion", "opinion", "I think", "copy", "думк", "копі", "особист"),
        ],
        "Task 1 має вступ-перефраз, обов'язковий overview головних тенденцій і два абзаци з порівнянням даних, щонайменше 150 слів. Без огляду знижується бал. Особистої думки і копії завдання треба уникати.",
        "Task 1 has a paraphrased introduction, a required overview of the main trends and two paragraphs comparing data, at least 150 words. Without an overview the score falls. You should avoid personal opinion and copying the task.",
    ),
)

U27_L2 = teach(
    "en-d-ex-t2",
    "IELTS Writing Task 2: стратегія",
    "IELTS Writing Task 2: strategy",
    3,
    "40 хвилин, 250 слів, теза, абзаци PEEL, перевірка",
    "40 minutes, 250 words, a thesis, PEEL paragraphs, a check",
    """Task 2 важить більше за Task 1. Час: близько 40 хвилин, з них 5 на план і 3–5 на перевірку. Прочитайте питання двічі і визначте тип: opinion, discussion, problem–solution, two-part (дві прямі відповіді). План на папері: теза, дві ідеї з прикладами. Пишіть простою точною мовою; одна-дві доречні ідіоми максимум (урок про реєстр ідіом).

Критерії: Task Response (відповідь на всі частини), Coherence (абзаци і зв'язки), Lexical Resource, Grammatical Range and Accuracy. Підвищують бал: чітка теза, конкретний приклад, поступка, різноманітність речень. Знижують: memorised introductions, недолік слів, пропуск частини питання, off-topic.

Типові помилки: почати писати без плану і вийти за час; підмінити discussion на чисту opinion; не перевірити артиклі та узгодження. У перевірці шукайте три речі: чи відповідь на питання повна, чи є помилки в перших реченнях абзаців, чи вистачає слів.""",
    """Task 2 weighs more than Task 1. Time: about 40 minutes, including five for a plan and three to five for a check. Read the question twice and identify the type: opinion, discussion, problem–solution, two-part (two direct answers). A paper plan: a thesis, two ideas with examples. Write in simple exact language; one or two fitting idioms at most (the lesson on idiom register).

The criteria: Task Response (answering every part), Coherence (paragraphs and links), Lexical Resource, Grammatical Range and Accuracy. What raises the score: a clear thesis, a concrete example, a concession, sentence variety. What lowers it: memorised introductions, too few words, skipping part of the question, going off-topic.

Typical mistakes: starting to write with no plan and running out of time; replacing a discussion with a pure opinion; not checking articles and agreement. In the check, look for three things: is the answer complete, are there errors in the first sentences of paragraphs, is there enough word count.""",
    [
        "≈40 хвилин: план, текст, перевірка; 250+ слів",
        "Спочатку визначте тип питання",
        "Критерії: Task Response, Coherence, лексика, граматика",
        "Не memorised openings і не пропуск частини питання",
    ],
    [
        "About 40 minutes: a plan, the text, a check; 250+ words",
        "Identify the question type first",
        "Criteria: Task Response, Coherence, lexis, grammar",
        "No memorised openings and no skipping part of the question",
    ],
    [
        mcq(
            "en-d-ex-t2-r1",
            "Перший крок у Task 2:",
            "The first step in Task 2:",
            [
                "прочитати питання двічі і визначити тип, потім план",
                "одразу писати memorised introduction",
                "написати Task 1 на 40 хвилин замість цього",
                "вставити п'ять ідіом у перше речення",
            ],
            0,
            "Тип питання визначає структуру.",
            "The question type decides the structure.",
            [
                "read the question twice and identify the type, then plan",
                "write a memorised introduction at once",
                "write Task 1 for 40 minutes instead",
                "insert five idioms in the first sentence",
            ],
        ),
        fill(
            "en-d-ex-t2-r2",
            "Мінімум слів Task 2. Напишіть 250.",
            "Type 250.",
            "Task 2: at least ___ words.",
            ["250"],
        ),
        mcq(
            "en-d-ex-t2-r3",
            "Що знижує бал Task Response?",
            "What lowers the Task Response score?",
            [
                "пропуск частини питання або відхід від теми",
                "чітка теза і приклад",
                "поступка While X is true",
                "перевірка артиклів",
            ],
            0,
            "Треба відповісти на всі частини.",
            "You must answer every part.",
            [
                "skipping part of the question or going off-topic",
                "a clear thesis and an example",
                "a concession While X is true",
                "checking articles",
            ],
        ),
        translate(
            "en-d-ex-t2-r4",
            "Перекладіть.",
            "Translate.",
            "Спочатку визначте тип питання і складіть план.",
            [
                "First identify the question type and make a plan",
                "First identify the question type and make a plan.",
                "First, identify the question type and make a plan",
                "First, identify the type of question and make a plan",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-ex-t2",
        "Як розподілити 40 хвилин? Які типи питань і критерії? Що знижує бал?",
        "How do you divide 40 minutes? What are the question types and the criteria? What lowers the score?",
        [
            idea("time", "time", "40", "plan", "250", "check"),
            idea("types", "types", "opinion", "discussion", "problem", "two-part"),
            idea("criteria", "criteria", "Task Response", "Coherence", "memorised", "off-topic"),
        ],
        "Близько 40 хвилин ділять на план, написання і перевірку, щонайменше 250 слів. Спочатку визначають тип: opinion, discussion, problem–solution або two-part. Бал знижують memorised openings, пропуск частини питання і відхід від теми.",
        "About 40 minutes are divided into a plan, writing and a check, at least 250 words. First you identify the type: opinion, discussion, problem–solution or two-part. Memorised openings, skipping part of the question and going off-topic lower the score.",
    ),
)

U27_L3 = teach(
    "en-d-ex-speaking",
    "IELTS Speaking: частини 1–3",
    "IELTS Speaking: parts 1–3",
    3,
    "Короткі відповіді, довгий монолог, обговорення ідей",
    "Short answers, a long turn, a discussion of ideas",
    """Part 1 (4–5 хв) — знайомі теми: дім, робота, звички. Відповідь: 2–4 речення, не так / ні. Part 2 (3–4 хв) — картка, 1 хвилина на нотатки, 1–2 хвилини мовлення; рамка історії зі Speaking unit. Part 3 (4–5 хв) — абстрактніші питання: причини, порівняння, майбутнє. Тут працюють It depends, припущення might, порівняння In the past… nowadays.

Стратегія: розширювати відповідь причиною або коротким прикладом; якщо не зрозуміли — Sorry, could you repeat that? / Do you mean…? Це не знижує бал. Fluency важливіша за складне слово з довгою паузою. Не вчіть відповіді напам'ять цілими абзацами — examiner чує зубріння.

Типові помилки: однослівні відповіді в Part 1; 20 секунд у Part 2; у Part 3 відповіді як у Part 1, без ідеї. Посмішка і темп допомагають fluency; якщо помилилися — коротко виправте і рухайтеся далі.""",
    """Part 1 (4–5 min) is familiar topics: home, work, habits. The answer is two to four sentences, not yes / no. Part 2 (3–4 min) is a cue card, one minute for notes, one to two minutes of speech; the story frame from the Speaking unit. Part 3 (4–5 min) is more abstract: reasons, comparisons, the future. This is where It depends, might-speculation and In the past… nowadays work.

A strategy: extend the answer with a reason or a short example; if you did not understand — Sorry, could you repeat that? / Do you mean…? That does not lower the score. Fluency matters more than a difficult word after a long pause. Do not memorise answers as whole paragraphs — the examiner can hear cramming.

Typical mistakes: one-word answers in Part 1; twenty seconds in Part 2; in Part 3, answers as in Part 1, with no idea. A smile and a steady pace help fluency; if you make a mistake — correct it briefly and move on.""",
    [
        "Part 1: 2–4 речення, не так/ні",
        "Part 2: 1 хв нотатки, 1–2 хв монолог (STAR)",
        "Part 3: It depends, порівняння, припущення",
        "Можна перепитати; не зубрити абзаци",
    ],
    [
        "Part 1: two to four sentences, not yes/no",
        "Part 2: one minute of notes, one to two minutes of monologue (STAR)",
        "Part 3: It depends, comparisons, speculation",
        "You may ask again; do not cram paragraphs",
    ],
    [
        mcq(
            "en-d-ex-speaking-r1",
            "У Part 1 краще:",
            "In Part 1 it is better to:",
            [
                "дати 2–4 речення з причиною або прикладом",
                "сказати тільки yes",
                "говорити вісім хвилин",
                "відмовитись відповідати",
            ],
            0,
            "Коротка, але розгорнута відповідь.",
            "A short but extended answer.",
            [
                "give two to four sentences with a reason or an example",
                "say only yes",
                "speak for eight minutes",
                "refuse to answer",
            ],
        ),
        fill(
            "en-d-ex-speaking-r2",
            "У Part 2 на нотатки дають ___ хвилину. Напишіть one або 1.",
            "Type one.",
            "You have ___ minute to make notes.",
            ["one", "One", "1", "a"],
        ),
        mcq(
            "en-d-ex-speaking-r3",
            "Якщо не зрозуміли питання:",
            "If you did not understand the question:",
            [
                "можна сказати Could you repeat that? — бал за це не знімають",
                "треба мовчати",
                "треба відповісти навмання одним словом",
                "іспит одразу закінчується",
            ],
            0,
            "Перепитати дозволено і розумно.",
            "Asking again is allowed and wise.",
            [
                "you can say Could you repeat that? — they do not mark you down for that",
                "you must stay silent",
                "you must answer at random with one word",
                "the exam ends at once",
            ],
        ),
        translate(
            "en-d-ex-speaking-r4",
            "Перекладіть.",
            "Translate.",
            "Перепрошую, не могли б ви повторити?",
            [
                "Sorry, could you repeat that?",
                "Sorry, could you repeat that?",
                "I'm sorry, could you repeat that?",
                "Excuse me, could you repeat that?",
                "Could you repeat that, please?",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-ex-speaking",
        "Чим відрізняються частини 1, 2 і 3? Що робити в Part 2 з часом? Чи можна перепитати?",
        "How do parts 1, 2 and 3 differ? What do you do with time in Part 2? May you ask the examiner to repeat?",
        [
            idea("part 1", "part 1", "Part 1", "two", "four", "yes"),
            idea("part 2", "part 2", "Part 2", "minute", "notes", "STAR"),
            idea("part 3 / repeat", "part 3 / repeat", "Part 3", "depends", "repeat", "перепита"),
        ],
        "Part 1 потребує коротких розгорнутих відповідей, Part 2 — хвилину нотаток і монолог на 1–2 хвилини, Part 3 — ідеї, порівняння і It depends. Перепитати Could you repeat that можна, і за це бал не знижують.",
        "Part 1 needs short extended answers, Part 2 needs a minute of notes and a one-to-two-minute monologue, and Part 3 needs ideas, comparisons and It depends. You may ask Could you repeat that, and they do not lower the score for that.",
    ),
)

U27_L4 = teach(
    "en-d-ex-kwt",
    "FCE: Key Word Transformation",
    "FCE: Key Word Transformation",
    3,
    "2–5 слів, ключове слово без змін, той самий зміст",
    "2–5 words, the key word unchanged, the same meaning",
    """У B2 First (FCE) Use of English 4 ви маєте завершити друге речення так, щоб зміст був як у першому, використавши дане ключове слово і від 2 до 5 слів, саме слово не змінюючи. Приклад: I last saw her in 2019. SEEN → I have not SEEN her since 2019. Тут працюють граматичні сім'ї цього курсу: reported speech, passives, conditionals, wish, comparatives, phrasals, too/enough, so/such, have/get something done.

Стратегія: визначте, яку конструкцію хочуть (наприклад, since + Present Perfect); порахуйте слова (скорочення I'm = два слова в цій вправі часто рахують як два: I + 'm — перевірте поточну інструкцію екзамену; historically contractions count as two). Не змінюйте KEY.

Типові помилки: шість слів; змінений ключ (SEENіng); змінений зміст (never замість since); орфографія. Тренуйте пари: despite / although; not as … as; would rather; there is no point in + -ing.""",
    """In B2 First (FCE) Use of English 4 you complete the second sentence so that the meaning is like the first, using the given key word and between two and five words, without changing the word itself. Example: I last saw her in 2019. SEEN → I have not SEEN her since 2019. The grammar families from this course work here: reported speech, passives, conditionals, wish, comparatives, phrasals, too/enough, so/such, have/get something done.

A strategy: identify the structure they want (for example, since + Present Perfect); count the words (a contraction such as I'm is often two words in this task — I + 'm — check the current exam instructions; historically contractions count as two). Do not change the KEY.

Typical mistakes: six words; a changed key (SEENing); a changed meaning (never instead of since); spelling. Practise pairs: despite / although; not as … as; would rather; there is no point in + -ing.""",
    [
        "2–5 слів; ключове слово без змін",
        "Той самий зміст, інша конструкція",
        "Приклад: have not SEEN her since 2019",
        "Рахуйте слова і перевіряйте орфографію",
    ],
    [
        "2–5 words; the key word is unchanged",
        "The same meaning, a different structure",
        "Example: have not SEEN her since 2019",
        "Count the words and check the spelling",
    ],
    [
        mcq(
            "en-d-ex-kwt-r1",
            "I last saw her in 2019. KEY: SEEN. Правильно:",
            "I last saw her in 2019. KEY: SEEN. The correct option:",
            [
                "I have not SEEN her since 2019.",
                "I have not SEENing her since 2019.",
                "I never SEEN her in 2019, as a full equivalent.",
                "I have not SEEN her since 2019 and I also forgot her address, as a six-plus-word answer required by the task.",
            ],
            0,
            "Present Perfect + since; ключ SEEN не змінено.",
            "Present Perfect + since; the key SEEN is unchanged.",
        ),
        fill(
            "en-d-ex-kwt-r2",
            "Максимум слів у трансформації. Напишіть 5.",
            "Type 5.",
            "Use between 2 and ___ words.",
            ["5", "five", "Five"],
        ),
        mcq(
            "en-d-ex-kwt-r3",
            "Ключове слово треба:",
            "The key word must be:",
            [
                "використати без зміни форми, яку дали",
                "вільно змінити на іншу частину мови завжди",
                "пропустити",
                "повторити шість разів",
            ],
            0,
            "KEY без змін.",
            "The KEY is unchanged.",
            [
                "used in the form they gave, without change",
                "freely changed into another part of speech, always",
                "left out",
                "repeated six times",
            ],
        ),
        translate(
            "en-d-ex-kwt-r4",
            "Перекладіть готове друге речення.",
            "Translate the completed second sentence.",
            "Я не бачила її з 2019 року.",
            [
                "I have not seen her since 2019",
                "I have not seen her since 2019.",
                "I haven't seen her since 2019",
                "I haven't seen her since 2019.",
                "I have not SEEN her since 2019",
            ],
            "uk_en",
        ),
    ],
    ex(
        "en-d-ex-kwt",
        "Які правила Key Word Transformation? Наведіть приклад із SEEN. Які типові помилки?",
        "What are the rules of Key Word Transformation? Give the SEEN example. What are the typical mistakes?",
        [
            idea("2-5", "2-5", "2", "5", "key", "unchanged"),
            idea("SEEN", "SEEN", "SEEN", "since", "2019", "Perfect"),
            idea("mistakes", "mistakes", "six", "meaning", "spelling", "SEENing"),
        ],
        "Треба вжити від двох до п'яти слів і ключове слово без змін, зберігши зміст. Приклад: I have not SEEN her since 2019. Типові помилки — шість слів, змінений ключ і зламаний зміст.",
        "You must use between two and five words and the key word without change, keeping the meaning. An example is I have not SEEN her since 2019. Typical mistakes are six words, a changed key and a broken meaning.",
    ),
)

U27_L5 = teach(
    "en-d-ex-cloze",
    "Open cloze і словотвір на іспиті",
    "Open cloze and word formation in the exam",
    3,
    "Граматика в пропуску; сім'я слова в контексті",
    "Grammar in the gap; the word family in context",
    """Open cloze (FCE Use of English 2) — короткий текст із пропусками, в кожен треба ОДНЕ слово: артиклі, прийменники, допоміжні дієслова, займенники, сполучники, такі як although, despite (потім іменник), since, whether, whom. Читайте ціле речення: This is the book ___ I was telling you about → which / that / Ø, але в open cloze зазвичай потрібне слово: which. Підказка — що стоїть перед і після пропуску.

Word formation (Use of English 3): дають GREAT, треба, наприклад, GREATLY або GREATNESS — дивіться частину мови в реченні. Пригадайте префікси un-/in-/im- і суфікси з одиниці словотвору. Орфографія критична: definitely, successful, responsible → responsibility.

Типові помилки: два слова в open cloze; неправильна частина мови; *unpossible; не прочитати заперечення в реченні (префікс уже потрібен). Після заповнення прочитайте абзац уголос подумки — чи звучить природно.""",
    """Open cloze (FCE Use of English 2) is a short text with gaps, and each gap needs ONE word: articles, prepositions, auxiliary verbs, pronouns, conjunctions, such as although, despite (then a noun), since, whether, whom. Read the whole sentence: This is the book ___ I was telling you about → which / that / Ø, but in open cloze a word is usually required: which. The clue is what stands before and after the gap.

Word formation (Use of English 3): they give GREAT, and you may need GREATLY or GREATNESS — look at the part of speech in the sentence. Remember the prefixes un-/in-/im- and the suffixes from the word-formation unit. Spelling is critical: definitely, successful, responsible → responsibility.

Typical mistakes: two words in an open cloze; the wrong part of speech; *unpossible; not reading a negation in the sentence (a prefix is already needed). After filling the gaps, read the paragraph in your head — does it sound natural?""",
    [
        "Open cloze — одне граматичне слово на пропуск",
        "Дивіться слова ліворуч і праворуч",
        "Word formation — частина мови і орфографія сім'ї",
        "Не два слова і не *unpossible",
    ],
    [
        "Open cloze is one grammar word per gap",
        "Look at the words to the left and to the right",
        "Word formation is the part of speech and the family's spelling",
        "Not two words and not *unpossible",
    ],
    [
        mcq(
            "en-d-ex-cloze-r1",
            "В open cloze в кожен пропуск ставлять:",
            "In an open cloze each gap takes:",
            [
                "одне слово, часто службове",
                "цілу фразу з п'яти слів завжди",
                "будь-який іменник навмання",
                "ідіому kick the bucket як норму",
            ],
            0,
            "Одне слово: артикль, прийменник, auxiliary тощо.",
            "One word: an article, a preposition, an auxiliary and so on.",
            [
                "one word, often a function word",
                "a whole five-word phrase, always",
                "any noun at random",
                "the idiom kick the bucket as a norm",
            ],
        ),
        fill(
            "en-d-ex-cloze-r2",
            "responsible → іменник. Напишіть responsibility.",
            "Type responsibility.",
            "It is your ___.",
            ["responsibility", "Responsibility"],
        ),
        mcq(
            "en-d-ex-cloze-r3",
            "Антонім possible з префіксом:",
            "The antonym of possible with a prefix:",
            ["impossible", "unpossible", "inpossible", "dispossible"],
            0,
            "impossible — з уроку словотвору.",
            "impossible — from the word-formation lesson.",
        ),
        match(
            "en-d-ex-cloze-r4",
            "Зіставте завдання з тим, що воно перевіряє.",
            "Match each task with what it tests.",
            [
                ("open cloze", "одне граматичне слово / one grammar word"),
                ("word formation", "сім'я слова і частина мови / a word family"),
                ("key-word transformation", "2–5 слів і ключ / 2–5 words and a key"),
                ("Task 1 graph", "огляд тенденцій / an overview of trends"),
            ],
        ),
    ],
    ex(
        "en-d-ex-cloze",
        "Чим open cloze відрізняється від word formation? Скільки слів у пропуску? На що дивитися в реченні?",
        "How is open cloze different from word formation? How many words go in a gap? What do you look at in the sentence?",
        [
            idea("one word", "one word", "one", "preposition", "article", "cloze"),
            idea("word family", "word family", "GREATLY", "responsibility", "part of speech"),
            idea("context", "context", "left", "right", "negation", "unpossible"),
        ],
        "В open cloze в пропуск іде одне службове або граматичне слово, а у word formation треба утворити правильну частину мови від даного кореня. Дивляться на слова зліва і справа і на заперечення в реченні, і уникають двох слів та форм на кшталт unpossible.",
        "In an open cloze the gap takes one function or grammar word, and in word formation you must build the right part of speech from a given root. You look at the words on the left and the right and at negation in the sentence, and you avoid two words and forms such as unpossible.",
    ),
)

U27_EXAM = exam_lesson(
    "en-deep-exam-prep-exam",
    "Контрольна: підготовка до іспитів",
    "Exam: exam-prep tasks",
    3,
    [
        mcq(
            "en-deep-exam-prep-exam-q1",
            "У IELTS Task 1 Academic треба:",
            "In IELTS Academic Task 1 you should:",
            [
                "overview тенденцій і порівняння даних, без особистої думки",
                "написати I think this is terrible",
                "пропустити overview",
                "написати 250 слів думки замість опису графіка",
            ],
            0,
            "Огляд і дані, не думка.",
            "An overview and data, not an opinion.",
            [
                "an overview of trends and a comparison of data, with no personal opinion",
                "write I think this is terrible",
                "skip the overview",
                "write 250 words of opinion instead of describing the graph",
            ],
        ),
        mcq(
            "en-deep-exam-prep-exam-q2",
            "Task 2: мінімум слів і перший крок:",
            "Task 2: the minimum words and the first step:",
            [
                "250 слів; спочатку тип питання і план",
                "150 слів; одразу memorised opening",
                "50 слів; без плану",
                "1000 слів; лише ідіоми",
            ],
            0,
            "250 і план за типом.",
            "250 and a plan by type.",
            [
                "250 words; first the question type and a plan",
                "150 words; a memorised opening at once",
                "50 words; no plan",
                "1000 words; only idioms",
            ],
        ),
        mcq(
            "en-deep-exam-prep-exam-q3",
            "У Speaking Part 2:",
            "In Speaking Part 2:",
            [
                "хвилина нотаток і 1–2 хвилини монологу",
                "відповідь yes",
                "не можна перепитати ніколи, навіть якщо не почули",
                "вісім хвилин без структури",
            ],
            0,
            "Нотатки, потім довгий хід.",
            "Notes, then a long turn.",
            [
                "a minute of notes and one to two minutes of monologue",
                "the answer yes",
                "you may never ask for a repeat, even if you did not hear",
                "eight minutes with no structure",
            ],
        ),
        mcq(
            "en-deep-exam-prep-exam-q4",
            "Key Word Transformation:",
            "Key Word Transformation:",
            [
                "2–5 слів, ключ без змін, той самий зміст",
                "шість і більше слів як норма",
                "ключ можна вільно змінити",
                "одне службове слово, як в open cloze завжди",
            ],
            0,
            "2–5 і незмінний ключ.",
            "2–5 and an unchanged key.",
            [
                "2–5 words, the key unchanged, the same meaning",
                "six or more words as a norm",
                "the key may be freely changed",
                "one function word, as in an open cloze always",
            ],
        ),
        fill(
            "en-deep-exam-prep-exam-q5",
            "responsible → ___. (іменник)",
            "responsible → ___. (noun)",
            "It is your ___.",
            ["responsibility", "Responsibility"],
        ),
    ],
)

UNIT_27 = unit(
    "en-deep-exam-prep",
    "Підготовка до іспитів",
    "IELTS and FCE-style tasks",
    [U27_L1, U27_L2, U27_L3, U27_L4, U27_L5, U27_EXAM],
)

UNITS = [UNIT_22, UNIT_23, UNIT_24, UNIT_25, UNIT_26, UNIT_27]
