import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "ag_memory_session",
    "Пам'ять агента: сесія, факти й забування",
    "Agent memory: session, facts, and forgetting",
    [
      {
        slug: "ag-mem-layers",
        titleUk: "Три шари пам'яті: повідомлення сесії, витягнені факти, довгі документи",
        titleEn: "Three memory layers: session messages, extracted facts, and long documents",
        difficulty: 3,
        pointsUk: ["Вікно, профіль фактів і RAG — різні шари", "Факт із джерелом і часом, не вічна правда", "Сесію чистять; секрети не живуть вічно в логах"],
        pointsEn: ["A window, a fact profile, and RAG are different layers", "A fact has a source and a time, not eternal truth", "The session is cleared; secrets do not live forever in logs"],
        conceptUk: "Агент, якому просто 'додали весь чат у промпт', швидко вичерпує вікно й починає ігнорувати старе. Розділяють: (1) коротке вікно останніх повідомлень, (2) стислий профіль фактів (ім'я, тариф, уже зроблені кроки), який оновлюють явно, (3) пошук по документах (RAG), не змішуйте все в один рядок. Факти мають джерело й час: 'користувач сказав, що тариф Pro, 12 листопада' — не вічна правда без перевірки. Після завершення задачі сесійне вікно чистять, профіль — лише за правилами збереження. Логи пам'яті не повинні тримати секрети довше за політику.",
        conceptEn: "An agent that simply 'appended the whole chat to the prompt' quickly exhausts the window and starts ignoring the old. You separate: (1) a short window of recent messages, (2) a compact fact profile (name, plan, steps already done) that you update explicitly, (3) document search (RAG) — do not mix everything into one string. Facts have a source and a time: 'the user said they are on Pro, 12 November' is not eternal truth without a check. After a task ends, the session window is cleared; the profile is kept only under retention rules. Memory logs must not keep secrets longer than the policy.",
        code: "Memory(window=last(20), profile=Fact(source, at, value), rag=retrieve(docs))",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому весь чат на 80 тисяч токенів у кожному кроці — погана 'пам'ять'?", promptEn: "Why is the whole 80-thousand-token chat in every step a poor 'memory'?", options: ["вікно забивається, важливі факти тонуть, вартість росте; потрібні шари", "довгий чат завжди точніший", "RAG тоді вимикається", "факти не потребують джерела"], correctIndex: 0, explanationUk: "Шари й стислий профіль.", explanationEn: "Layers and a compact profile." },
          { kind: "fill", promptUk: "Допишіть шар, куди кладуть стабільні факти про користувача", promptEn: "Fill in the layer where stable facts about the user go", language: "python", code: "memory.layers = ['window', '___', 'rag']", accepted: ["profile", "facts", "fact_profile"], caseSensitive: true, explanationUk: "Профіль фактів окремо від сирого вікна.", explanationEn: "A fact profile is separate from the raw window." },
          { kind: "read", promptUk: "Як записати 'користувач на тарифі Pro', щоб це можна було спростувати?", promptEn: "How do you record 'the user is on the Pro plan' so it can later be challenged?", language: "json", code: "{ \"fact\": \"plan=Pro\", \"source\": \"user_message\", \"at\": \"2026-11-12T16:00:00Z\" }", options: ["із джерелом і часом, не як вічну істину без атрибуції", "як константу в коді агента без дати", "лише в системному промпті назавжди", "у векторі без метаданих"], correctIndex: 0, explanationUk: "Атрибуція дозволяє оновити факт.", explanationEn: "Attribution lets you update the fact." }
        ],
        whyUk: "Як дати агенту пам'ять про тариф користувача, не запихаючи весь чат у кожен виклик?",
        whyEn: "How do you give an agent memory of the user's plan without stuffing the whole chat into every call?",
        ideas: [{ labelUk: "шари пам'яті", labelEn: "memory layers", anyOf: ["шар", "layer", "вікно", "window", "профіль", "profile", "rag"] }, { labelUk: "факт із часом", labelEn: "a fact with a time", anyOf: ["джерел", "source", "час", "time", "факт", "fact"] }, { labelUk: "очищення сесії", labelEn: "clearing the session", anyOf: ["чист", "clear", "секрет", "secret", "утриман", "retention"] }],
        sampleUk: "Тримають коротке вікно повідомлень, окремий профіль фактів із джерелом і часом і RAG для документів; весь чат у кожен виклик не кладуть, сесію чистять, секрети не живуть у логах довше за політику.",
        sampleEn: "You keep a short message window, a separate fact profile with source and time, and RAG for documents; you do not put the whole chat into every call, you clear the session, and secrets do not live in logs longer than the policy.",
      },
      {
        slug: "ag-mem-forget",
        titleUk: "Забування — теж дизайн: відкликання, виправлення, 'не пам'ятай це'",
        titleEn: "Forgetting is also design: revocation, correction, and 'do not remember this'",
        difficulty: 3,
        pointsUk: ["Виправлення й видалення — обов'язкові операції", "Детектор секретів і TTL", "Після 'забудь' перевіряють кеш і трейси"],
        pointsEn: ["Correction and deletion are mandatory operations", "A secret detector and a TTL", "After 'forget', you check the cache and the traces"],
        conceptUk: "Користувач має право виправити факт і попросити не зберігати чутливе ('ось номер картки — не запам'ятовуй'). Пам'ять без видалення й без TTL стає сховищем персональних даних без згоди. Реалізують: явне виправлення профілю, видалення за ідентифікатором, заборона писати в профіль поля з детекторів секретів, TTL на сесійні нотатки. Після 'забудь це' перевіряють, що факт не спливе з кешу RAG чи логів трасування. Тест: записали — виправили — агент більше не стверджує старе. Не обіцяйте 'нічого не зберігаємо', якщо трейси все одно пишуть промпт.",
        conceptEn: "The user has a right to correct a fact and to ask you not to store something sensitive ('here is a card number — do not remember it'). Memory without deletion and without a TTL becomes a store of personal data without consent. You implement: an explicit profile correction, deletion by id, a ban on writing fields from secret detectors into the profile, a TTL on session notes. After 'forget this', you check that the fact does not resurface from a RAG cache or from traces. A test: write — correct — the agent no longer asserts the old value. Do not promise 'we store nothing' if traces still write the prompt.",
        code: "profile.correct('phone', None)\ntraces.redact('phone'); rag_cache.drop(user='u1', key='phone')",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Користувач сказав 'я не в Pro, це був експеримент'. Що має статись із профілем?", promptEn: "The user said 'I am not on Pro, that was an experiment'. What should happen to the profile?", options: ["факт оновлюють або видаляють, агент не цитує старе", "старе лишається як вічна правда", "трейси гарантовано важливіші за профіль", "RAG сам виправить тариф"], correctIndex: 0, explanationUk: "Виправлення — першокласна операція.", explanationEn: "Correction is a first-class operation." },
          { kind: "fill", promptUk: "Допишіть обмеження життя сесійної нотатки", promptEn: "Fill in the lifetime limit of a session note", language: "python", code: "session_notes.set(key, value, ___=timedelta(hours=24))", accepted: ["ttl", "TTL", "expires"], caseSensitive: true, explanationUk: "TTL обмежує зберігання.", explanationEn: "A TTL limits retention." },
          { kind: "read", promptUk: "Де ще може лишитись 'забудь номер картки' після чистки профілю?", promptEn: "Where else can 'forget the card number' remain after the profile is cleared?", language: "python", code: "profile.delete('card'); # traces? rag cache?", options: ["у трейсах, логах і кеші пошуку, їх теж треба чистити або не писати секрети туди", "ніде, профіль — єдине сховище завжди", "лише в системному Python", "у Protocol адаптера"], correctIndex: 0, explanationUk: "Поверхня пам'яті ширша за профіль.", explanationEn: "The memory surface is wider than the profile." }
        ],
        whyUk: "Як виконати прохання 'забудь мій номер телефону' по-справжньому?",
        whyEn: "How do you truly honour a request to 'forget my phone number'?",
        ideas: [{ labelUk: "видалення й виправлення", labelEn: "deletion and correction", anyOf: ["видален", "delet", "виправ", "correct", "профіль", "profile"] }, { labelUk: "TTL і детектор", labelEn: "a TTL and a detector", anyOf: ["ttl", "секрет", "secret", "детектор", "detector"] }, { labelUk: "кеш і трейси", labelEn: "cache and traces", anyOf: ["кеш", "cache", "трейс", "trace", "лог", "log"] }],
        sampleUk: "Факт видаляють або виправляють у профілі, секрети туди не пишуть, у сесійних нотаток є TTL, і після 'забудь' чистять також кеш і трейси — інакше обіцянка не виконана.",
        sampleEn: "You delete or correct the fact in the profile, you do not write secrets there, session notes have a TTL, and after 'forget' you also clear the cache and traces — otherwise the promise is not kept.",
      }
    ],
    "Контрольна: пам'ять агента",
    "Exam: agent memory",
    [
      { promptUk: "Весь чат у кожен виклик як пам'ять…", promptEn: "The whole chat in every call as memory is…", options: ["забиває вікно й дорожчає; потрібні шари", "найкращий дизайн", "заміна фактів", "обов'язковий TTL"], correctIndex: 0, explanationUk: "Вікно, профіль, RAG.", explanationEn: "Window, profile, RAG." },
      { promptUk: "Факт у профілі записують…", promptEn: "A fact in the profile is recorded…", options: ["з джерелом і часом", "як вічну істину без атрибуції", "лише у векторі", "у весь чат"], correctIndex: 0, explanationUk: "Щоб можна було спростувати.", explanationEn: "So it can be challenged." },
      { promptUk: "Після завершення задачі сесійне вікно…", promptEn: "After a task ends, the session window is…", options: ["чистять за правилами утримання", "лишають назавжди", "пишуть у системний промпт навічно", "замінюють GPU"], correctIndex: 0, explanationUk: "Сесія не вічна.", explanationEn: "The session is not eternal." },
      { promptUk: "Прохання 'забудь це' має чистити…", promptEn: "A 'forget this' request should clear…", options: ["профіль і також кеш/трейси, де факт міг лишитись", "лише один рядок UI", "тільки RAG без профілю завжди", "лише TTL без видалення"], correctIndex: 0, explanationUk: "Повна поверхня пам'яті.", explanationEn: "The full memory surface." },
      { promptUk: "Номер картки в профіль…", promptEn: "A card number in the profile is…", options: ["не пишуть: детектор секретів і заборона полів", "корисний довгий факт", "обов'язковий для RAG", "заміна TTL"], correctIndex: 0, explanationUk: "Чутливе не зберігають.", explanationEn: "Sensitive data is not stored." },
      { promptUk: "Обіцянка 'нічого не зберігаємо' при повному трейсі промптів…", promptEn: "A 'we store nothing' promise while traces keep full prompts is…", options: ["неправдива, доки трейси пишуть дані", "завжди чесна", "заміна видалення", "вимога Protocol"], correctIndex: 0, explanationUk: "Трейси — теж зберігання.", explanationEn: "Traces are also storage." }
    ],
  ),
  sectionUnit(
    "ag_hitl_gates",
    "Людина в контурі: підтвердження ризикованих дій",
    "A human in the loop: confirming risky actions",
    [
      {
        slug: "ag-hitl-risk",
        titleUk: "Дії з наслідками потребують порогу, не 'агент завжди натискає сам'",
        titleEn: "Actions with consequences need a threshold, not 'the agent always clicks by itself'",
        difficulty: 3,
        pointsUk: ["Політика порогу, не лише промпт", "Короткий підсумок і журнал рішення", "Не втомлюйте людину дрібницями"],
        pointsEn: ["A threshold policy, not only a prompt", "A short summary and a decision journal", "Do not fatigue the human with trivia"],
        conceptUk: "Надсилання листа клієнту, списання коштів, видалення даних, виклик адмін-API — різні рівні ризику. Низький (пошук у базі знань) може йти сам; високий вимагає підтвердження людини з коротким підсумком і явними кнопками 'дозволити / відхилити / змінити'. Поріг описують у політиці (сума, аудиторія, незворотність), не в розмитому промпті 'будь обережним'. Після відхилення агент не повторює ту саму дію мовчки. Журнал рішення (хто, коли, що саме дозволив) потрібен для аудиту. Не питайте підтвердження на кожну дрібницю — інакше людину 'втомлюють' і вона тисне Allow завжди.",
        conceptEn: "Sending a customer email, charging money, deleting data, calling an admin API — these are different risk levels. A low one (search in a knowledge base) can go ahead; a high one needs a human confirmation with a short summary and explicit 'allow / deny / edit' buttons. The threshold lives in a policy (amount, audience, irreversibility), not in a vague prompt that says 'be careful'. After a denial the agent does not silently retry the same action. A decision journal (who, when, what exactly was allowed) is needed for audit. Do not ask for confirmation on every trifle — otherwise the human is 'fatigued' and always presses Allow.",
        code: "if policy.requires_hitl(action):\n    decision = await hitl.ask(summary=digest(action), options=['allow','deny','edit'])\n    audit.log(decision)",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому 'в промпті написано будь обережним' недостатньо перед refund на 2000€?", promptEn: "Why is 'the prompt says be careful' not enough before a 2000€ refund?", options: ["модель може проігнорувати; потрібен технічний гейт і підтвердження", "промпт завжди сильніший за код", "refund не є ризиком", "журнал тоді заборонений"], correctIndex: 0, explanationUk: "Політика в коді, не лише в тексті.", explanationEn: "The policy is in code, not only in text." },
          { kind: "fill", promptUk: "Допишіть три рішення людини на ризикованій дії", promptEn: "Fill in the three human decisions on a risky action", language: "python", code: "gate.options = ['allow', 'deny', '___']", accepted: ["edit", "change", "modify"], caseSensitive: true, explanationUk: "Дозволити, відхилити або змінити.", explanationEn: "Allow, deny, or edit." },
          { kind: "read", promptUk: "Що зберегти після того, як оператор натиснув Allow на лист клієнту?", promptEn: "What should you store after an operator pressed Allow on a customer email?", language: "json", code: "{ \"actor\": \"ops-12\", \"at\": \"...\", \"action\": \"send_email\", \"digest\": \"...\" }", options: ["хто, коли й що саме дозволив (журнал аудиту)", "нічого: Allow стирає слід", "лише токени моделі", "повний пароль оператора"], correctIndex: 0, explanationUk: "Аудит рішення.", explanationEn: "An audit of the decision." }
        ],
        whyUk: "Як організувати підтвердження перед відправленням листа клієнту від імені агента?",
        whyEn: "How do you organize confirmation before an agent sends a customer email?",
        ideas: [{ labelUk: "поріг у політиці", labelEn: "a threshold in a policy", anyOf: ["поріг", "threshold", "політик", "policy", "ризик", "risk"] }, { labelUk: "підсумок і кнопки", labelEn: "a summary and buttons", anyOf: ["підсумок", "summary", "allow", "deny", "edit"] }, { labelUk: "журнал, без втоми", labelEn: "a journal, without fatigue", anyOf: ["журнал", "journal", "audit", "втом", "fatigue", "дрібн", "triv"] }],
        sampleUk: "Лист клієнту вважають високим ризиком: політика в коді вимагає підтвердження з коротким підсумком, рішення записують у журнал, після відхилення дію не повторюють мовчки, дрібниці не питають, щоб не втомлювати оператора.",
        sampleEn: "A customer email is treated as high risk: a policy in code requires confirmation with a short summary, the decision is written to a journal, after a denial the action is not silently retried, and trivia is not asked so the operator is not fatigued.",
      },
      {
        slug: "ag-hitl-state",
        titleUk: "Стан очікування: агент не 'зависає в промпті', а ставить задачу на паузу",
        titleEn: "Waiting state: the agent does not 'hang in a prompt', it pauses the job",
        difficulty: 3,
        pointsUk: ["Пауза в сховищі, не відкритий виклик годинами", "Прострочення — скасування або ескалація, не тихий go", "Ідемпотентний Allow і відновлення після рестарту"],
        pointsEn: ["A pause in storage, not a call left open for hours", "Overdue means cancel or escalate, not a silent go", "An idempotent Allow and recovery after a restart"],
        conceptUk: "Поки людина не відповіла, процес не тримає відкритий виклик моделі годинами й не блокує воркер. Задачу зберігають (ідентифікатор, чернетка дії, дедлайн підтвердження) і прокидають, коли прийшло рішення або минув час. Прострочене очікування — явний стан 'скасовано / ескалація', не тихе виконання. Інтерфейс показує чернетку, яку можна змінити. Ідемпотентність: подвійний клік Allow не шле два листи. Після рестарту сервісу незавершені гейти піднімають із сховища, не втрачають. Це той самий патерн, що й черга задач, не 'нескінченний chat completion'.",
        conceptEn: "While the human has not answered, the process does not keep a model call open for hours and does not block a worker. You persist the job (an id, a draft of the action, a confirmation deadline) and you wake it when a decision arrives or time runs out. An overdue wait is an explicit 'cancelled / escalated' state, not silent execution. The UI shows a draft that can be edited. Idempotency: a double Allow click does not send two emails. After a service restart, unfinished gates are loaded from storage, they are not lost. This is the same pattern as a job queue, not an 'endless chat completion'.",
        code: "Job(id, draft, deadline, status='awaiting_hitl')\n# on Allow(id, key=hitl:id): send once; on timeout: escalate",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Що зробити, якщо підтвердження не прийшло за 2 години, а політика забороняє тихий refund?", promptEn: "What do you do if confirmation did not arrive in 2 hours and the policy forbids a silent refund?", options: ["перейти в cancelled/escalated, не виконувати дію", "виконати refund мовчки", "тримати воркер відкритим ще тиждень", "повторити той самий виклик моделі в циклі"], correctIndex: 0, explanationUk: "Дедлайн має явний наслідок.", explanationEn: "The deadline has an explicit outcome." },
          { kind: "fill", promptUk: "Допишіть властивість, щоб подвійний Allow не надіслав два листи", promptEn: "Fill in the property so a double Allow does not send two emails", language: "python", code: "complete_gate(id, decision, ___=f'hitl:{id}')", accepted: ["idempotency_key", "idempotencyKey", "idempotent_key"], caseSensitive: true, explanationUk: "Ключ ідемпотентності.", explanationEn: "An idempotency key." },
          { kind: "read", promptUk: "Де зберігати чернетку листа, поки оператор у відпустці на годину?", promptEn: "Where do you store the email draft while the operator is away for an hour?", language: "python", code: "# not in an open HTTP request to the LLM", options: ["у сховищі задач (черга/БД) з id і дедлайном, воркер вільний", "у відкритому сокеті до моделі", "лише в RAM одного пода без диска", "у системному промпті наступного користувача"], correctIndex: 0, explanationUk: "Стійкий стан паузи.", explanationEn: "A durable paused state." }
        ],
        whyUk: "Як не заблокувати воркер і не виконати дію мовчки, поки людина думає?",
        whyEn: "How do you avoid blocking a worker and avoid silently executing while a human is thinking?",
        ideas: [{ labelUk: "стан у сховищі", labelEn: "state in storage", anyOf: ["сховищ", "storage", "черг", "queue", "пауз", "pause", "id"] }, { labelUk: "дедлайн і ескалація", labelEn: "a deadline and escalation", anyOf: ["дедлайн", "deadline", "скасов", "cancel", "ескал", "escalat"] }, { labelUk: "ідемпотентність", labelEn: "idempotency", anyOf: ["ідемпотент", "idempoten", "рестарт", "restart", "подвій", "double"] }],
        sampleUk: "Задачу ставлять на паузу в сховищі з дедлайном, воркер не тримає виклик моделі; прострочення скасовує або ескалює, не виконує мовчки; Allow ідемпотентний, після рестарту гейти відновлюють.",
        sampleEn: "You pause the job in storage with a deadline, the worker does not hold a model call; overdue cancels or escalates, it does not execute silently; Allow is idempotent, and after a restart the gates are restored.",
      }
    ],
    "Контрольна: людина в контурі",
    "Exam: human in the loop",
    [
      { promptUk: "Промпт 'будь обережним' перед refund…", promptEn: "A 'be careful' prompt before a refund is…", options: ["недостатній; потрібен гейт у коді", "повний захист", "заміна журналу", "ідемпотентність"], correctIndex: 0, explanationUk: "Політика в коді.", explanationEn: "The policy is in code." },
      { promptUk: "Підтвердження на кожну дрібницю…", promptEn: "Confirmation on every trifle…", options: ["втомлює й призводить до сліпого Allow", "завжди найкраще", "заміна порогу", "обов'язкове для пошуку в базі"], correctIndex: 0, explanationUk: "Поріг ризику.", explanationEn: "A risk threshold." },
      { promptUk: "Журнал HITL зберігає…", promptEn: "A HITL journal stores…", options: ["хто, коли й що дозволив", "лише токени моделі", "пароль оператора", "нічого після Allow"], correctIndex: 0, explanationUk: "Аудит рішення.", explanationEn: "An audit of the decision." },
      { promptUk: "Очікування людини не повинно…", promptEn: "Waiting for a human must not…", options: ["тримати виклик моделі й воркер годинами", "мати дедлайн", "зберігати чернетку", "бути ідемпотентним"], correctIndex: 0, explanationUk: "Пауза в сховищі.", explanationEn: "A pause in storage." },
      { promptUk: "Прострочене підтвердження при забороні тихого виконання…", promptEn: "An overdue confirmation when silent execution is forbidden should…", options: ["скасувати або ескалювати", "виконати мовчки", "повторивати модель вічно", "стерти журнал"], correctIndex: 0, explanationUk: "Явний стан.", explanationEn: "An explicit state." },
      { promptUk: "Подвійний Allow має бути…", promptEn: "A double Allow should be…", options: ["ідемпотентним: одна дія", "двома листами", "скиданням дедлайну без запису", "втраченим після рестарту"], correctIndex: 0, explanationUk: "Ключ ідемпотентності.", explanationEn: "An idempotency key." }
    ],
  ),
  sectionUnit(
    "ag_timeouts_budget",
    "Ліміти кроків, часу й вартості агента",
    "Limits on an agent's steps, time, and cost",
    [
      {
        slug: "ag-step-cap",
        titleUk: "Стелі на кроки й інструменти: цикл не повинен крутитись до рахунку",
        titleEn: "Caps on steps and tools: a loop must not spin until the bill arrives",
        difficulty: 3,
        pointsUk: ["Максимум кроків, викликів інструменту, токенів і часу", "Однакові повтори — стоп або зміна стратегії", "Грошова стеля на задачу"],
        pointsEn: ["A maximum of steps, tool calls, tokens, and time", "Identical repeats are a stop or a strategy change", "A money cap on the job"],
        conceptUk: "Агент із інструментами може зациклитись: шукати, помилятись, шукати знову. Ставлять максимум кроків, максимум викликів одного інструменту, загальний бюджет токенів і wall-clock. При досягненні — зупинка з поясненням користувачу, не ще один 'останній' виклик у циклі. Повтор однакового запиту до інструменту — сигнал зупинитись або змінити стратегію (інший запит, людина). Логуйте кількість кроків у трасу. Бюджет вартості на задачу (долари) теж має стелю, особливо в пакетних прогонах. Без стелі один баг — це нічний рахунок.",
        conceptEn: "An agent with tools can loop: search, fail, search again. You set a maximum steps, a maximum of calls to one tool, a total token budget, and a wall-clock. When a cap is hit — a stop with an explanation to the user, not another 'last' call in the loop. Repeating the same tool request is a signal to stop or change strategy (a different query, a human). Log the step count in the trace. A cost budget per job (dollars) has a cap too, especially in batch runs. Without a cap, one bug is an overnight bill.",
        code: "run(agent, max_steps=8, max_calls_per_tool=3, max_tokens=8000, timeout_s=30, max_usd=0.5)",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Агент викликав search з тим самим запитом 15 разів. Що зробити?", promptEn: "The agent called search with the same query 15 times. What do you do?", options: ["зупинити цикл і показати невдачу або спитати людину, не крутити далі", "збільшити стелю вдесятеро мовчки", "вимкнути логи кроків", "повторити вночі пакетом без стелі"], correctIndex: 0, explanationUk: "Повтор — сигнал, не норма.", explanationEn: "A repeat is a signal, not the norm." },
          { kind: "fill", promptUk: "Допишіть ліміт ітерацій циклу агента", promptEn: "Fill in the agent-loop iteration limit", language: "python", code: "run(agent, max____=8, max_tokens=8000, timeout_s=30)", accepted: ["_steps", "steps"], caseSensitive: true, explanationUk: "max_steps обрізає цикл.", explanationEn: "max_steps cuts the loop." },
          { kind: "read", promptUk: "Чому пакетний прогін на 10 тисяч тікетів без грошової стелі небезпечний?", promptEn: "Why is a batch run of 10 thousand tickets without a money cap dangerous?", language: "python", code: "for t in tickets: agent.run(t)  # no dollar cap", options: ["один баг або петля помножиться на обсяг і рахунок", "пакет завжди дешевший без ліміту", "стелі заборонені в пакетах", "токенів тоді не рахують"], correctIndex: 0, explanationUk: "Стеля на задачу й на пачку.", explanationEn: "A cap on the job and on the batch." }
        ],
        whyUk: "Які чотири стелі поставити агенту з пошуком, щоб він не крутився до ранку?",
        whyEn: "Which four caps do you put on an agent with search so it does not spin until morning?",
        ideas: [{ labelUk: "кроки й інструменти", labelEn: "steps and tools", anyOf: ["крок", "step", "інструмент", "tool", "max"] }, { labelUk: "токени й час", labelEn: "tokens and time", anyOf: ["токен", "token", "timeout", "час", "wall"] }, { labelUk: "гроші й стоп", labelEn: "money and a stop", anyOf: ["бюджет", "budget", "долар", "dollar", "стоп", "stop", "повтор", "repeat"] }],
        sampleUk: "Ставлять max_steps, ліміт викликів інструменту, бюджет токенів і часу, плюс грошову стелю; при повторі того самого запиту або досягненні ліміту зупиняються з поясненням, а не крутять ніч.",
        sampleEn: "You set max_steps, a tool-call limit, a token and time budget, plus a money cap; on a repeat of the same query or when a limit is hit you stop with an explanation, you do not spin all night.",
      },
      {
        slug: "ag-partial-result",
        titleUk: "Частковий результат кращий за мовчазний обрив або вічний спінер",
        titleEn: "A partial result is better than a silent cut-off or an endless spinner",
        difficulty: 3,
        pointsUk: ["Показати зроблене й запропонувати явне продовження", "Проміжний стан зберігають", "Спінер із зупинкою, не вічний крутильник"],
        pointsEn: ["Show what was done and offer an explicit continuation", "Intermediate state is persisted", "A spinner with a stop, not an endless wheel"],
        conceptUk: "Коли спрацювала стеля, користувач має побачити: що вже зроблено, чого не встигли, чи можна продовжити явно. Повертати порожню помилку 'timeout' без чернетки — поганий UX і втрата корисної роботи. Зберігайте проміжний стан (знайдені джерела, чернетку відповіді). Продовження — нова задача з тим самим контекстом і новим бюджетом, не автоматичний нескінченний restart. У інтерфейсі спінер має таймер і кнопку зупинки, що виконує ту саму політику стелі. Тестуйте обрив на 1 кроці — чи відповідь чесна.",
        conceptEn: "When a cap fires, the user should see: what is already done, what did not finish, and whether they can explicitly continue. Returning an empty 'timeout' error with no draft is poor UX and a waste of useful work. Persist the intermediate state (sources found, a draft answer). A continuation is a new job with the same context and a new budget, not an automatic endless restart. In the UI the spinner has a timer and a stop button that applies the same cap policy. Test a cut-off at 1 step — is the answer honest.",
        code: "if cap_hit:\n    return Partial(draft, sources, can_continue=True)\n# continue only on explicit user consent + new budget",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Що повернути користувачу, коли max_steps вичерпано після знайдених 3 джерел?", promptEn: "What do you return to the user when max_steps is exhausted after 3 sources were found?", options: ["чернетку з цими джерелами й пропозицію продовжити явно", "порожній timeout без пояснення", "автоматичний restart без ліміту", "ті самі 3 джерела видалити"], correctIndex: 0, explanationUk: "Частковий результат — цінність.", explanationEn: "A partial result has value." },
          { kind: "fill", promptUk: "Допишіть, що зберігають для можливого продовження", promptEn: "Fill in what you store for a possible continuation", language: "python", code: "save(___state=draft, sources=found, budget_used=usd)", accepted: ["intermediate", "partial", "checkpoint"], caseSensitive: true, explanationUk: "Проміжний стан / checkpoint.", explanationEn: "Intermediate state / a checkpoint." },
          { kind: "read", promptUk: "Чим небезпечне автоматичне 'продовжити з новим бюджетом' без запиту?", promptEn: "What is dangerous about an automatic 'continue with a new budget' without asking?", language: "python", code: "while True: agent.continue(budget=1.0)", options: ["це обходить стелю й знову відкриває нічний рахунок", "користувач тоді завжди бачить чернетку", "спінер зникає сам і це добре", "checkpoint заборонений"], correctIndex: 0, explanationUk: "Продовження — явна згода й новий ліміт.", explanationEn: "Continuation is explicit consent and a new limit." }
        ],
        whyUk: "Що показати, коли агент уперся в стелю посеред дослідження?",
        whyEn: "What do you show when an agent hits a cap in the middle of research?",
        ideas: [{ labelUk: "частковий результат", labelEn: "a partial result", anyOf: ["чернетк", "draft", "джерел", "source", "частков", "partial"] }, { labelUk: "явне продовження", labelEn: "an explicit continuation", anyOf: ["продовж", "continu", "згод", "consent", "бюджет", "budget"] }, { labelUk: "не порожній timeout", labelEn: "not an empty timeout", anyOf: ["timeout", "спінер", "spinner", "стоп", "stop", "checkpoint"] }],
        sampleUk: "Показують чернетку й знайдене, зберігають проміжний стан, пропонують явне продовження з новим бюджетом і дають кнопку зупинки; порожній timeout і автоматичний restart без ліміту — погані відповіді.",
        sampleEn: "You show the draft and what was found, you persist intermediate state, you offer an explicit continuation with a new budget, and you give a stop button; an empty timeout and an automatic restart with no limit are poor answers.",
      }
    ],
    "Контрольна: стелі агента",
    "Exam: agent caps",
    [
      { promptUk: "Без max_steps агент із інструментами може…", promptEn: "Without max_steps an agent with tools can…", options: ["зациклитись до нічного рахунку", "завжди зупинитись сам", "не викликати інструменти", "ігнорувати токени завжди дешево"], correctIndex: 0, explanationUk: "Стелі обов'язкові.", explanationEn: "Caps are mandatory." },
      { promptUk: "П'ятнадцять однакових search…", promptEn: "Fifteen identical search calls are…", options: ["сигнал зупинитись або змінити стратегію", "норма глибокого агента", "привід прибрати логи", "заміна грошової стелі"], correctIndex: 0, explanationUk: "Повтор не норма.", explanationEn: "A repeat is not the norm." },
      { promptUk: "Пакет без грошової стелі…", promptEn: "A batch without a money cap is…", options: ["небезпечний: баг множиться на обсяг", "завжди дешевший", "забороняє timeout", "заміна max_steps"], correctIndex: 0, explanationUk: "Стеля на пачку.", explanationEn: "A cap on the batch." },
      { promptUk: "Порожній timeout без чернетки…", promptEn: "An empty timeout with no draft is…", options: ["поганий UX і втрата роботи; віддайте частковий результат", "найкраща відповідь", "обов'язковий restart", "заміна checkpoint"], correctIndex: 0, explanationUk: "Покажіть зроблене.", explanationEn: "Show what was done." },
      { promptUk: "Автоматичний continue без згоди…", promptEn: "An automatic continue without consent…", options: ["обходить стелю", "єдиний правильний UX", "завжди дешевший", "замінює журнал HITL"], correctIndex: 0, explanationUk: "Продовження явне.", explanationEn: "Continuation is explicit." },
      { promptUk: "Спінер агента має…", promptEn: "An agent spinner should have…", options: ["таймер і кнопку зупинки за тією ж політикою", "крутитись без ліміту", "ховати частковий результат", "вимикати аудит"], correctIndex: 0, explanationUk: "Користувач керує обривом.", explanationEn: "The user controls the cut-off." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandAgenticSystems(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
