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
        conceptUk: "Агент може використовувати коротке вікно повідомлень, окремий профіль дозволених фактів і пошук документів. Зберігайте лише потрібне з джерелом, часом і правилами доступу: твердження користувача про бажану мову не є незмінним фактом. Дозволяйте виправити чи видалити його, обмежуйте строк зберігання й не записуйте секрети в логи. Профіль не замінює авторитетне джерело для перевірки прав; довгий чат збільшує витрати й може приховувати важливий контекст.",
        conceptEn: "An agent can use a short message window, a separate profile of permitted facts, and document retrieval. Retain only what is needed, with source, time, and access rules: a user's stated language preference is not an immutable fact. Allow correction or deletion, limit retention, and keep secrets out of logs. A profile does not replace an authoritative source for authorization; a long chat increases cost and can bury important context.",
        code: "Memory(window=last(20), profile=Fact(source, at, value), rag=retrieve(docs))",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому весь чат на 80 тисяч токенів у кожному кроці — погана 'пам'ять'?", promptEn: "Why is the whole 80-thousand-token chat in every step a poor 'memory'?", options: ["вікно забивається, важливі факти тонуть, вартість росте; потрібні шари", "довгий чат завжди точніший", "RAG тоді вимикається", "факти не потребують джерела"], optionsEn: ["It consumes context, buries relevant facts, and increases cost; use appropriate layers", "Longer chats are always more accurate", "RAG is then disabled", "Facts need no source"], correctIndex: 0, explanationUk: "Шари й стислий профіль.", explanationEn: "Layers and a compact profile." },
          { kind: "fill", promptUk: "Допишіть шар, куди кладуть стабільні факти про користувача", promptEn: "Fill in the layer where stable facts about the user go", language: "python", code: "memory.layers = ['window', '___', 'rag']", accepted: ["profile", "facts", "fact_profile"], caseSensitive: true, explanationUk: "Профіль фактів окремо від сирого вікна.", explanationEn: "A fact profile is separate from the raw window." },
          { kind: "read", promptUk: "Як записати мовні вподобання користувача, щоб їх можна було змінити?", promptEn: "How do you record a user's language preference so it can be corrected?", language: "json", code: "{ \"fact\": \"language=uk\", \"source\": \"user_message\", \"at\": \"2026-11-12T16:00:00Z\" }", options: ["із джерелом і часом, не як вічну істину без атрибуції", "як константу в коді агента без дати", "лише в системному промпті назавжди", "у векторі без метаданих"], optionsEn: ["With a source and timestamp rather than as an eternal unattributed truth", "As an undated constant in agent code", "Only in the system prompt forever", "In a vector without metadata"], correctIndex: 0, explanationUk: "Атрибуція дозволяє оновити факт.", explanationEn: "Attribution lets you update the fact." }
        ],
        whyUk: "Як дати агенту пам'ять про мовні вподобання, не додаючи весь чат у кожен виклик?",
        whyEn: "How can an agent remember a language preference without sending the whole chat on every call?",
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
        conceptUk: "Передбачте виправлення та видалення фактів, мінімізацію чутливих даних і TTL сесійних нотаток. Детектори можуть пропускати секрети, тому поєднуйте їх із дозволеним списком полів і перевіркою доступу. Запит на видалення має охоплювати профіль, кеш, трейси та інші визначені копії; для бекапів потрібна політика зберігання й повторне застосування видалення після відновлення. Тестуйте кожне сховище й пошук окремо: один приклад відповіді агента не доводить повного видалення. Не обіцяйте 'нічого не зберігаємо', якщо промпти пишуться в трейси.",
        conceptEn: "Support correction and deletion of facts, minimize sensitive data, and set TTLs for session notes. Detectors can miss secrets, so combine them with an allowed-field list and access checks. An erasure request must cover the profile, cache, traces, and other identified copies; backups need retention rules and deletion reapplication after restore. Test each store and retrieval separately: one agent response does not prove complete deletion. Do not promise 'we store nothing' while traces retain prompts.",
        code: "profile.correct('phone', None)\ntraces.redact('phone'); rag_cache.drop(user='u1', key='phone')",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Користувач змінив бажану мову відповіді. Що має статись із профілем?", promptEn: "A user changed their preferred response language. What should happen to the profile?", options: ["вподобання оновлюють або видаляють, агент не спирається на старе", "старе лишається як вічна правда", "трейси гарантовано важливіші за профіль", "RAG сам виправить профіль"], optionsEn: ["Update or remove the preference so the agent does not rely on the old one", "Keep the old value forever", "Traces are always more authoritative than the profile", "RAG automatically corrects the profile"], correctIndex: 0, explanationUk: "Виправлення — першокласна операція.", explanationEn: "Correction is a first-class operation." },
          { kind: "fill", promptUk: "Допишіть обмеження життя сесійної нотатки", promptEn: "Fill in the lifetime limit of a session note", language: "python", code: "session_notes.set(key, value, ___=timedelta(hours=24))", accepted: ["ttl", "TTL", "expires"], caseSensitive: true, explanationUk: "TTL обмежує зберігання.", explanationEn: "A TTL limits retention." },
          { kind: "read", promptUk: "Де ще може лишитись 'забудь номер картки' після чистки профілю?", promptEn: "Where else can 'forget the card number' remain after the profile is cleared?", language: "python", code: "profile.delete('card'); # traces? rag cache?", options: ["у трейсах, логах і кеші пошуку, їх теж треба чистити або не писати секрети туди", "ніде, профіль — єдине сховище завжди", "лише в системному Python", "у Protocol адаптера"], optionsEn: ["In traces, logs, and retrieval caches, which also need appropriate deletion or prevention", "Nowhere; the profile is always the only store", "Only in system Python", "In the protocol adapter"], correctIndex: 0, explanationUk: "Поверхня пам'яті ширша за профіль.", explanationEn: "The memory surface is wider than the profile." }
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
      { promptUk: "Весь чат у кожен виклик як пам'ять…", promptEn: "The whole chat in every call as memory is…", options: ["забиває вікно й дорожчає; потрібні шари", "найкращий дизайн", "заміна фактів", "обов'язковий TTL"], optionsEn: ["Costly and can bury context; use appropriate layers", "Always the best design", "A replacement for facts", "A mandatory TTL"], correctIndex: 0, explanationUk: "Вікно, профіль, RAG.", explanationEn: "Window, profile, RAG." },
      { promptUk: "Факт у профілі записують…", promptEn: "A fact in the profile is recorded…", options: ["з джерелом і часом", "як вічну істину без атрибуції", "лише у векторі", "у весь чат"], optionsEn: ["With a source and timestamp", "As eternal truth without attribution", "Only in a vector", "In the whole chat"], correctIndex: 0, explanationUk: "Щоб можна було спростувати.", explanationEn: "So it can be challenged." },
      { promptUk: "Після завершення задачі сесійне вікно…", promptEn: "After a task ends, the session window is…", options: ["чистять за правилами утримання", "лишають назавжди", "пишуть у системний промпт навічно", "замінюють GPU"], optionsEn: ["Cleared according to retention rules", "Kept forever", "Written to the system prompt forever", "Replaced with a GPU"], correctIndex: 0, explanationUk: "Сесія не вічна.", explanationEn: "The session is not eternal." },
      { promptUk: "Прохання 'забудь це' має чистити…", promptEn: "A 'forget this' request should clear…", options: ["профіль і також кеш/трейси, де факт міг лишитись", "лише один рядок UI", "тільки RAG без профілю завжди", "лише TTL без видалення"], optionsEn: ["The profile and other identified copies such as caches and traces", "Only one UI row", "Always only RAG without the profile", "Only the TTL without deletion"], correctIndex: 0, explanationUk: "Повна поверхня пам'яті.", explanationEn: "The full memory surface." },
      { promptUk: "Номер картки в профіль…", promptEn: "A card number in the profile is…", options: ["не пишуть: детектор секретів і заборона полів", "корисний довгий факт", "обов'язковий для RAG", "заміна TTL"], optionsEn: ["Not stored; use field restrictions and secret detection", "A useful long-term fact", "Required for RAG", "A replacement for TTL"], correctIndex: 0, explanationUk: "Чутливе не зберігають.", explanationEn: "Sensitive data is not stored." },
      { promptUk: "Обіцянка 'нічого не зберігаємо' при повному трейсі промптів…", promptEn: "A 'we store nothing' promise while traces keep full prompts is…", options: ["неправдива, доки трейси пишуть дані", "завжди чесна", "заміна видалення", "вимога Protocol"], optionsEn: ["False while traces retain data", "Always honest", "A replacement for deletion", "A protocol requirement"], correctIndex: 0, explanationUk: "Трейси — теж зберігання.", explanationEn: "Traces are also storage." }
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
          { kind: "mcq", promptUk: "Чому 'в промпті написано будь обережним' недостатньо перед refund на 2000€?", promptEn: "Why is 'the prompt says be careful' not enough before a 2000€ refund?", options: ["модель може проігнорувати; потрібен технічний гейт і підтвердження", "промпт завжди сильніший за код", "refund не є ризиком", "журнал тоді заборонений"], optionsEn: ["The model may ignore it; enforce a technical gate and human approval", "The prompt is always stronger than code", "Refunds are not risky", "Auditing is then forbidden"], correctIndex: 0, explanationUk: "Політика в коді, не лише в тексті.", explanationEn: "The policy is in code, not only in text." },
          { kind: "fill", promptUk: "Допишіть три рішення людини на ризикованій дії", promptEn: "Fill in the three human decisions on a risky action", language: "python", code: "gate.options = ['allow', 'deny', '___']", accepted: ["edit", "change", "modify"], caseSensitive: true, explanationUk: "Дозволити, відхилити або змінити.", explanationEn: "Allow, deny, or edit." },
          { kind: "read", promptUk: "Що зберегти після того, як оператор натиснув Allow на лист клієнту?", promptEn: "What should you store after an operator pressed Allow on a customer email?", language: "json", code: "{ \"actor\": \"ops-12\", \"at\": \"...\", \"action\": \"send_email\", \"digest\": \"...\" }", options: ["хто, коли й що саме дозволив (журнал аудиту)", "нічого: Allow стирає слід", "лише токени моделі", "повний пароль оператора"], optionsEn: ["Who approved what and when in an audit record", "Nothing; Allow erases the trail", "Only model tokens", "The operator's full password"], correctIndex: 0, explanationUk: "Аудит рішення.", explanationEn: "An audit of the decision." }
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
        conceptUk: "Зберігайте очікування в надійному сховищі разом із версією параметрів, дедлайном і правилами доступу, звільняючи воркер. Після закінчення строку скасуйте або ескалуйте дію; зміна чернетки потребує нового підтвердження. Атомарно приймайте лише одне рішення й прив'язуйте ключ ідемпотентності до конкретної операції. Сам ключ не гарантує одноразового надсилання: зовнішній сервіс має підтримувати дедуплікацію, або потрібні звіряння й обробка невизначеного результату після тайм-ауту. Тестуйте подвійне підтвердження, рестарт і повтори.",
        conceptEn: "Persist the waiting job with parameter version, deadline, and access rules, freeing the worker. On expiry cancel or escalate; changing the draft requires new approval. Atomically accept only one decision and bind an idempotency key to the specific operation. A key alone does not guarantee one external send: the downstream service must support deduplication, or reconciliation and handling of uncertain outcomes after timeouts are needed. Test duplicate approvals, restarts, and retries.",
        code: "Job(id, draft_version, deadline, status='awaiting_hitl')\n# atomically accept decision; use a downstream idempotency key or reconcile uncertain outcomes",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Що зробити, якщо підтвердження не прийшло за 2 години, а політика забороняє тихий refund?", promptEn: "What do you do if confirmation did not arrive in 2 hours and the policy forbids a silent refund?", options: ["перейти в cancelled/escalated, не виконувати дію", "виконати refund мовчки", "тримати воркер відкритим ще тиждень", "повторити той самий виклик моделі в циклі"], optionsEn: ["Move to cancelled or escalated without executing", "Refund silently", "Keep a worker open for another week", "Repeat the same model call forever"], correctIndex: 0, explanationUk: "Дедлайн має явний наслідок.", explanationEn: "The deadline has an explicit outcome." },
          { kind: "fill", promptUk: "Допишіть властивість, щоб подвійний Allow не надіслав два листи", promptEn: "Fill in the property so a double Allow does not send two emails", language: "python", code: "complete_gate(id, decision, ___=f'hitl:{id}')", accepted: ["idempotency_key", "idempotencyKey", "idempotent_key"], caseSensitive: true, explanationUk: "Ключ ідемпотентності.", explanationEn: "An idempotency key." },
          { kind: "read", promptUk: "Де зберігати чернетку листа, поки оператор у відпустці на годину?", promptEn: "Where do you store the email draft while the operator is away for an hour?", language: "python", code: "# not in an open HTTP request to the LLM", options: ["у сховищі задач (черга/БД) з id і дедлайном, воркер вільний", "у відкритому сокеті до моделі", "лише в RAM одного пода без диска", "у системному промпті наступного користувача"], optionsEn: ["In durable job storage with an ID and deadline, freeing the worker", "In an open socket to the model", "Only in one pod's RAM", "In the next user's system prompt"], correctIndex: 0, explanationUk: "Стійкий стан паузи.", explanationEn: "A durable paused state." }
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
      { promptUk: "Промпт 'будь обережним' перед refund…", promptEn: "A 'be careful' prompt before a refund is…", options: ["недостатній; потрібен гейт у коді", "повний захист", "заміна журналу", "ідемпотентність"], optionsEn: ["Insufficient; enforce a gate in code", "Complete protection", "A replacement for auditing", "Idempotency"], correctIndex: 0, explanationUk: "Політика в коді.", explanationEn: "The policy is in code." },
      { promptUk: "Підтвердження на кожну дрібницю…", promptEn: "Confirmation on every trifle…", options: ["втомлює й призводить до сліпого Allow", "завжди найкраще", "заміна порогу", "обов'язкове для пошуку в базі"], optionsEn: ["Can cause fatigue and blind approval", "Is always best", "Replaces a risk threshold", "Is mandatory for knowledge-base searches"], correctIndex: 0, explanationUk: "Поріг ризику.", explanationEn: "A risk threshold." },
      { promptUk: "Журнал HITL зберігає…", promptEn: "A HITL journal stores…", options: ["хто, коли й що дозволив", "лише токени моделі", "пароль оператора", "нічого після Allow"], optionsEn: ["Who approved what and when", "Only model tokens", "The operator password", "Nothing after approval"], correctIndex: 0, explanationUk: "Аудит рішення.", explanationEn: "An audit of the decision." },
      { promptUk: "Очікування людини не повинно…", promptEn: "Waiting for a human must not…", options: ["тримати виклик моделі й воркер годинами", "мати дедлайн", "зберігати чернетку", "бути ідемпотентним"], optionsEn: ["Hold a model call and worker for hours", "Have a deadline", "Persist a draft", "Be idempotent"], correctIndex: 0, explanationUk: "Пауза в сховищі.", explanationEn: "A pause in storage." },
      { promptUk: "Прострочене підтвердження при забороні тихого виконання…", promptEn: "An overdue confirmation when silent execution is forbidden should…", options: ["скасувати або ескалювати", "виконати мовчки", "повторивати модель вічно", "стерти журнал"], optionsEn: ["Cancel or escalate", "Execute silently", "Repeat the model forever", "Erase the audit log"], correctIndex: 0, explanationUk: "Явний стан.", explanationEn: "An explicit state." },
      { promptUk: "Подвійний Allow має бути…", promptEn: "A double Allow should be…", options: ["ідемпотентним: одна дія", "двома листами", "скиданням дедлайну без запису", "втраченим після рестарту"], optionsEn: ["Handled idempotently so the action is not duplicated", "Two emails", "A deadline reset without a record", "Lost after a restart"], correctIndex: 0, explanationUk: "Ключ ідемпотентності.", explanationEn: "An idempotency key." }
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
        conceptUk: "Агент може зациклитись на пошуку чи повторній помилці. Встановіть межі кроків, викликів інструментів, токенів, часу й витрат для задачі та пакета. Перевіряйте бюджет до запуску наступної операції та враховуйте паралельні запити: вже розпочатий виклик може завершитися після зупинки й перевищити оцінку. Повтор однакового запиту — сигнал дослідити причину або змінити стратегію, а не автоматичний доказ помилки. При ліміті зупиніть нові дії, повідомте користувача й окремо обробіть уже запущені операції.",
        conceptEn: "An agent can loop on search or repeated errors. Set step, tool-call, token, time, and cost limits for both a job and a batch. Check budgets before starting another operation and account for concurrent requests: an in-flight call can finish after cancellation and exceed an estimate. A repeated request is a signal to investigate or change strategy, not automatic proof of an error. At a limit, stop new actions, inform the user, and handle already-started operations separately.",
        code: "run(agent, max_steps=8, max_calls_per_tool=3, max_tokens=8000, timeout_s=30, max_usd=0.5)",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Агент викликав search з тим самим запитом 15 разів. Що зробити?", promptEn: "The agent called search with the same query 15 times. What do you do?", options: ["зупинити цикл і показати невдачу або спитати людину, не крутити далі", "збільшити стелю вдесятеро мовчки", "вимкнути логи кроків", "повторити вночі пакетом без стелі"], optionsEn: ["Stop and report failure or ask a person, rather than looping", "Silently increase the cap tenfold", "Disable step logs", "Run it overnight in an uncapped batch"], correctIndex: 0, explanationUk: "Повтор — сигнал, не норма.", explanationEn: "A repeat is a signal, not the norm." },
          { kind: "fill", promptUk: "Допишіть ліміт ітерацій циклу агента", promptEn: "Fill in the agent-loop iteration limit", language: "python", code: "run(agent, max___=8, max_tokens=8000, timeout_s=30)", accepted: ["_steps"], caseSensitive: true, explanationUk: "max_steps обмежує цикл.", explanationEn: "max_steps limits the loop." },
          { kind: "read", promptUk: "Чому пакетний прогін на 10 тисяч тікетів без грошової стелі небезпечний?", promptEn: "Why is a batch run of 10 thousand tickets without a money cap dangerous?", language: "python", code: "for t in tickets: agent.run(t)  # no dollar cap", options: ["один баг або петля помножиться на обсяг і рахунок", "пакет завжди дешевший без ліміту", "стелі заборонені в пакетах", "токенів тоді не рахують"], optionsEn: ["A bug or loop is multiplied by the batch size and cost", "A batch is always cheaper without limits", "Caps are forbidden in batches", "Tokens are not counted"], correctIndex: 0, explanationUk: "Стеля на задачу й на пачку.", explanationEn: "A cap on the job and on the batch." }
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
        conceptUk: "Після досягнення ліміту поясніть, що завершено, що залишилось і чи можливе продовження. Зберігайте лише дозволений проміжний стан; позначайте неперевірену чернетку й не показуйте чужі джерела. Продовження має явний новий бюджет і повторну перевірку прав та актуальності контексту. Кнопка зупинки припиняє нові кроки, але вже запущена зовнішня дія може завершитися: її стан треба повідомити й звірити. Перевіряйте обрив, повтор і відновлення на тестових даних.",
        conceptEn: "When a limit is reached, explain what finished, what remains, and whether continuation is possible. Persist only authorized intermediate state; label an unverified draft and do not expose other users' sources. Continuation has an explicit new budget and rechecks permissions and context freshness. A stop button prevents new steps, but an external action already in flight may still complete: report and reconcile its state. Test interruption, retry, and recovery with fixture data.",
        code: "if cap_hit:\n    return Partial(draft, sources, can_continue=True)\n# continue only on explicit user consent + new budget",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Що повернути користувачу, коли max_steps вичерпано після знайдених 3 джерел?", promptEn: "What do you return to the user when max_steps is exhausted after 3 sources were found?", options: ["чернетку з цими джерелами й пропозицію продовжити явно", "порожній timeout без пояснення", "автоматичний restart без ліміту", "ті самі 3 джерела видалити"], optionsEn: ["An available draft with sources and an explicit continuation option", "An empty timeout without explanation", "An unlimited automatic restart", "Delete the three sources"], correctIndex: 0, explanationUk: "Частковий результат — цінність.", explanationEn: "A partial result has value." },
          { kind: "fill", promptUk: "Допишіть назву поля для збереження проміжного стану", promptEn: "Fill in the field name for stored intermediate state", language: "python", code: "save(___=draft, sources=found, budget_used=usd)", accepted: ["intermediate_state", "partial_state", "checkpoint"], caseSensitive: true, explanationUk: "Проміжний стан / checkpoint.", explanationEn: "Intermediate state / a checkpoint." },
          { kind: "read", promptUk: "Чим небезпечне автоматичне 'продовжити з новим бюджетом' без запиту?", promptEn: "What is dangerous about an automatic 'continue with a new budget' without asking?", language: "python", code: "while True: agent.continue(budget=1.0)", options: ["це обходить стелю й знову відкриває нічний рахунок", "користувач тоді завжди бачить чернетку", "спінер зникає сам і це добре", "checkpoint заборонений"], optionsEn: ["It bypasses the cap and can create runaway costs", "The user always sees a draft", "The spinner disappears and that is good", "Checkpoints are forbidden"], correctIndex: 0, explanationUk: "Продовження — явна згода й новий ліміт.", explanationEn: "Continuation is explicit consent and a new limit." }
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
      { promptUk: "Без max_steps агент із інструментами може…", promptEn: "Without max_steps an agent with tools can…", options: ["зациклитись до нічного рахунку", "завжди зупинитись сам", "не викликати інструменти", "ігнорувати токени завжди дешево"], optionsEn: ["Loop and incur ongoing costs", "Always stop on its own", "Never call tools", "Always ignore tokens cheaply"], correctIndex: 0, explanationUk: "Стелі обов'язкові.", explanationEn: "Caps are mandatory." },
      { promptUk: "П'ятнадцять однакових search…", promptEn: "Fifteen identical search calls are…", options: ["сигнал зупинитись або змінити стратегію", "норма глибокого агента", "привід прибрати логи", "заміна грошової стелі"], optionsEn: ["A signal to stop or change strategy", "Normal for every deep agent", "A reason to remove logs", "A replacement for a cost cap"], correctIndex: 0, explanationUk: "Повтор не норма.", explanationEn: "A repeat is not the norm." },
      { promptUk: "Пакет без грошової стелі…", promptEn: "A batch without a money cap is…", options: ["небезпечний: баг множиться на обсяг", "завжди дешевший", "забороняє timeout", "заміна max_steps"], optionsEn: ["Risky because a bug multiplies with batch size", "Always cheaper", "A way to forbid timeouts", "A replacement for max_steps"], correctIndex: 0, explanationUk: "Стеля на пачку.", explanationEn: "A cap on the batch." },
      { promptUk: "Порожній timeout без чернетки…", promptEn: "An empty timeout with no draft is…", options: ["поганий UX і втрата роботи; віддайте частковий результат", "найкраща відповідь", "обов'язковий restart", "заміна checkpoint"], optionsEn: ["Poor UX and lost work when a safe partial result is available", "The best response", "A required restart", "A replacement for a checkpoint"], correctIndex: 0, explanationUk: "Покажіть зроблене.", explanationEn: "Show what was done." },
      { promptUk: "Автоматичний continue без згоди…", promptEn: "An automatic continue without consent…", options: ["обходить стелю", "єдиний правильний UX", "завжди дешевший", "замінює журнал HITL"], optionsEn: ["Can bypass the cap", "Is the only correct UX", "Is always cheaper", "Replaces the approval log"], correctIndex: 0, explanationUk: "Продовження явне.", explanationEn: "Continuation is explicit." },
      { promptUk: "Спінер агента має…", promptEn: "An agent spinner should have…", options: ["таймер і кнопку зупинки за тією ж політикою", "крутитись без ліміту", "ховати частковий результат", "вимикати аудит"], optionsEn: ["A timer and a stop control governed by the same policy", "No limit", "A hidden partial result", "Disabled auditing"], correctIndex: 0, explanationUk: "Користувач керує обривом.", explanationEn: "The user controls the cut-off." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandAgenticSystems(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
