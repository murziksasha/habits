import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "ap_pricing_ux",
    "Ціна токенів у продукті: чесні очікування",
    "Token prices in the product: honest expectations",
    [
      {
        slug: "ap-cost-visible",
        titleUk: "Користувач має розуміти, за що платить, до того як 'згорів' ліміт",
        titleEn: "The user should understand what they pay for before a limit is 'burned'",
        difficulty: 3,
        pointsUk: ["Оцінка й залишок до старту дорогої дії", "Ліміти мовою продукту, підтвердження дорогих кроків", "Не 'необмежено' на лінійному рахунку"],
        pointsEn: ["An estimate and a remainder before an expensive action starts", "Limits in product language, confirmation of expensive steps", "Not 'unlimited' on a linear bill"],
        conceptUk: "Якщо відповідь коштує гроші або квоту, інтерфейс показує оцінку чи залишок до запуску довгої задачі, а не лише після сюрпризу. Ліміти (повідомлень, сторінок, хвилин агента) формулюють мовою продукту, не 'у вас лишилось 12 403 токени'. Дорогі дії (завантаження книги, агент на годину) — окреме підтвердження. Коли квота кінчається посеред відповіді, показують частковий результат і шлях докупити, не порожній екран. Внутрішня собівартість і ціна для користувача — різні числа; не обіцяйте 'необмежено' на моделі з рахунком, який росте лінійно.",
        conceptEn: "If an answer costs money or quota, the UI shows an estimate or a remainder before a long job starts, not only after a surprise. Limits (messages, pages, agent minutes) are phrased in product language, not 'you have 12,403 tokens left'. Expensive actions (uploading a book, an agent for an hour) get a separate confirmation. When quota runs out mid-answer, you show a partial result and a way to buy more, not a blank screen. Internal cost and the price to the user are different numbers; do not promise 'unlimited' on a model whose bill grows linearly.",
        code: "if estimate(job) > cheap_threshold:\n    ui.confirm(estimate=pretty(job), remainder=quota)\n# limits: '12 answers left', not '12403 tokens'",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чим поганий лічильник 'залишилось 12403 токени' для звичайного користувача?", promptEn: "Why is a '12,403 tokens left' counter poor for an ordinary user?", options: ["токен не є одиницею цінності для людини; кажіть сторінками чи відповідями", "користувачі завжди рахують токени краще за продукт", "токен заборонено показувати", "це замінює підтвердження"], correctIndex: 0, explanationUk: "Одиниця — зрозуміла дія.", explanationEn: "The unit is a understandable action." },
          { kind: "fill", promptUk: "Допишіть, що показати перед агентом на годину роботи", promptEn: "Fill in what to show before an agent that will run for an hour", language: "yaml", code: "ui:\n  expensive_action: ___  # estimate + yes/no", accepted: ["confirm", "confirmation", "estimate_confirm"], caseSensitive: true, explanationUk: "Підтвердження з оцінкою.", explanationEn: "A confirmation with an estimate." },
          { kind: "read", promptUk: "Що показати, коли квота скінчилась на середині чернетки?", promptEn: "What do you show when quota runs out in the middle of a draft?", language: "python", code: "# agent stopped at cap", options: ["чернетку й шлях докупити або продовжити, не порожній екран", "лише 402 без тексту", "автоматичне 'необмежено'", "внутрішню собівартість у центах"], correctIndex: 0, explanationUk: "Частковий результат і наступний крок.", explanationEn: "A partial result and a next step." }
        ],
        whyUk: "Як говорити про квоту сапорт-бота так, щоб дорогий запуск не став сюрпризом?",
        whyEn: "How do you talk about a support-bot quota so an expensive run is not a surprise?",
        ideas: [{ labelUk: "оцінка до старту", labelEn: "an estimate before start", anyOf: ["оцінк", "estimate", "залишок", "remain", "до старту", "before"] }, { labelUk: "мова продукту", labelEn: "product language", anyOf: ["сторін", "page", "відповід", "message", "токен", "token", "підтверд", "confirm"] }, { labelUk: "не необмежено", labelEn: "not unlimited", anyOf: ["необмеж", "unlimited", "частков", "partial", "квот", "quota"] }],
        sampleUk: "Перед дорогоко дією показують оцінку й просять підтвердження, ліміти говорять сторінками чи хвилинами, а не токенами, на обриві квоти віддають чернетку; 'необмежено' не обіцяють на лінійному рахунку.",
        sampleEn: "Before an expensive action you show an estimate and ask for confirmation, limits are spoken in pages or minutes rather than tokens, on a quota cut-off you return a draft; you do not promise 'unlimited' on a linear bill.",
      },
      {
        slug: "ap-fair-meter",
        titleUk: "Лічильник чесний: однакова дія коштує передбачувано",
        titleEn: "A fair meter: the same action costs something predictable",
        difficulty: 3,
        pointsUk: ["Публічні стабільні правила одиниці", "Збій не тарифікують як успіх", "Прозорість для команд і канал оскарження"],
        pointsEn: ["Public stable unit rules", "A failure is not metered as a success", "Transparency for teams and a dispute channel"],
        conceptUk: "Люди зляться, коли 'те саме питання' з'їло різну квоту без пояснення (довший контекст, інша модель, повтор агента). Правила тарифікації публічні й стабільні: що є одиницею, коли списують, що безкоштовно (редагування опечатки, повтор показу). Збій моделі не повинен знімати повну ціну або має компенсуватись. A/B зміни тарифу — з повідомленням, не тихим зменшенням пакета. Для команд — адмін бачить розбивку по членах, не 'простий мінус із загального казана' без сліду. Оскарження списання має канал підтримки з логом задачі.",
        conceptEn: "People get angry when 'the same question' ate a different amount of quota with no explanation (a longer context, another model, an agent retry). The metering rules are public and stable: what the unit is, when you charge, what is free (a typo edit, showing the answer again). A model failure should not take the full price, or it should be compensated. An A/B tariff change comes with a notice, not a silent shrinking of the plan. For teams, an admin sees a breakdown by member, not a 'simple minus from a shared pot' with no trail. A charge dispute has a support channel with the job log.",
        code: "meter: charge on success or explain partial; refund on 5xx-before-tokens\n# admin: per-member breakdown; dispute → job log",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Чи справедливо знімати повну ціну, якщо відповідь обірвалась 5xx на першому токені?", promptEn: "Is it fair to take the full price if the answer died with a 5xx on the first token?", options: ["ні: збій компенсують або не тарифікують як успішну дію", "так, старт задачі завжди повна ціна", "так, якщо токени внутрішні", "так, без логу"], correctIndex: 0, explanationUk: "Платять за цінність або чесно за спожите з поясненням.", explanationEn: "They pay for value, or honestly for what was consumed, with an explanation." },
          { kind: "fill", promptUk: "Допишіть, що має бачити адмін команди", promptEn: "Fill in what a team admin should see", language: "sql", code: "SELECT member, units_used, jobs FROM ___ WHERE period = '2026-11';", accepted: ["usage_breakdown", "usage", "team_usage"], caseSensitive: true, explanationUk: "Розбивка використання.", explanationEn: "A usage breakdown." },
          { kind: "read", promptUk: "Як змінювати тариф у експерименті, не підриваючи довіру?", promptEn: "How do you change a tariff in an experiment without undermining trust?", language: "yaml", code: "experiment: cheaper_plan_hidden: true", options: ["повідомити правила й не зменшувати пакет мовчки", "тихо зменшити квоту половині користувачів", "прибрати лог задач", "заборонити оскарження"], correctIndex: 0, explanationUk: "Прозорість тарифу — частина продукту.", explanationEn: "Tariff transparency is part of the product." }
        ],
        whyUk: "Які правила тарифікації зменшують відчуття, що 'нас обважили'?",
        whyEn: "Which metering rules reduce the feeling that 'we were short-changed'?",
        ideas: [{ labelUk: "стабільна одиниця", labelEn: "a stable unit", anyOf: ["правил", "rule", "одиниц", "unit", "публіч", "public", "передбач", "predict"] }, { labelUk: "збій не як успіх", labelEn: "a failure is not a success", anyOf: ["збій", "fail", "5xx", "компенс", "compens"] }, { labelUk: "розбивка й оскарження", labelEn: "a breakdown and a dispute", anyOf: ["розбивк", "breakdown", "оскар", "dispute", "адмін", "admin", "лог", "log"] }],
        sampleUk: "Правила одиниці публічні й стабільні, збій не знімають як успішну дію, адмін бачить розбивку, є канал оскарження з логом; тиха зміна тарифу в A/B підриває довіру.",
        sampleEn: "The unit rules are public and stable, a failure is not charged as a successful action, an admin sees a breakdown, there is a dispute channel with a log; a silent A/B tariff change undermines trust.",
      }
    ],
    "Контрольна: ціна в продукті",
    "Exam: product pricing",
    [
      { promptUk: "Лічильник у 'токенах' для звичайного користувача…", promptEn: "A counter in 'tokens' for an ordinary user is…", options: ["погано зрозумілий; кажіть діями продукту", "найкраща одиниця завжди", "заміна оцінки", "обов'язковий для UX"], correctIndex: 0, explanationUk: "Мова продукту.", explanationEn: "Product language." },
      { promptUk: "Дорогий запуск агента має…", promptEn: "An expensive agent run should have…", options: ["оцінку й підтвердження до старту", "стартувати мовчки", "обіцянку 'необмежено'", "порожній екран на обриві"], correctIndex: 0, explanationUk: "Без сюрпризу.", explanationEn: "No surprise." },
      { promptUk: "'Необмежено' на моделі з лінійним рахунком…", promptEn: "'Unlimited' on a model with a linear bill is…", options: ["нечесна обіцянка", "стандарт FinOps", "заміна квоти завжди", "внутрішня собівартість"], correctIndex: 0, explanationUk: "Не обіцяйте неможливе.", explanationEn: "Do not promise the impossible." },
      { promptUk: "Повна ціна при 5xx на першому токені…", promptEn: "The full price on a 5xx at the first token is…", options: ["несправедлива; компенсуйте", "завжди правильна", "заміна логу", "обов'язкова для команд"], correctIndex: 0, explanationUk: "Збій ≠ успіх.", explanationEn: "A failure is not a success." },
      { promptUk: "Адмін команди має бачити…", promptEn: "A team admin should see…", options: ["розбивку використання по членах", "лише загальне 'мінус' без сліду", "собівартість GPU", "чужі токени провайдера"], correctIndex: 0, explanationUk: "Прозорість.", explanationEn: "Transparency." },
      { promptUk: "Тиха A/B зміна тарифу вниз…", promptEn: "A silent A/B change that shrinks the tariff…", options: ["підриває довіру; потрібне повідомлення", "найкращий експеримент", "заміна оскарження", "обов'язкова канарейка ціни"], correctIndex: 0, explanationUk: "Правила тарифу публічні.", explanationEn: "Tariff rules are public." }
    ],
  ),
  sectionUnit(
    "ap_feedback_loop",
    "Зворотний зв'язок: оцінки, що реально змінюють продукт",
    "Feedback: ratings that actually change the product",
    [
      {
        slug: "ap-thumb-why",
        titleUk: "Палець вниз без причини — слабкий сигнал; просіть короткий чому",
        titleEn: "A thumb down with no reason is a weak signal; ask a short why",
        difficulty: 3,
        pointsUk: ["Категорія після dislike, короткий коментар", "Прив'язка до версії промпту й моделі", "Тренд оглядають; сирі коментарі не йдуть у тюнь без фільтра"],
        pointsEn: ["A category after a dislike, a short comment", "A binding to the prompt and model versions", "The trend is reviewed; raw comments do not go into a tune without a filter"],
        conceptUk: "Бінарна оцінка корисна на обсязі, але без категорії ('неправдивий факт', 'грубий тон', 'не те зробив', 'занадто довго') ви не знаєте, що лагодити. Після dislike — 2–4 варіанти й необов'язковий коментар, не есе. Зв'яжіть оцінку з prompt_id, версією моделі й ідентифікатором задачі. Не ставте оцінку так, щоб вона блокувала роботу. Не навчайте модель 'у проді' безпосередньо на сирих коментарях без модерації й згоди. Огляд тренду (тиждень, категорія) входить у ритуал продукту, не лежить у таблиці мертвим вантажем.",
        conceptEn: "A binary rating is useful at volume, but without a category ('a false fact', 'a rude tone', 'did the wrong thing', 'too slow') you do not know what to fix. After a dislike — 2–4 options and an optional comment, not an essay. Bind the rating to prompt_id, the model version, and the job id. Do not place the rating so that it blocks work. Do not train the model 'in prod' directly on raw comments without moderation and consent. A weekly trend review by category is part of the product ritual, it does not lie dead in a table.",
        code: "feedback = {thumb, reason, prompt_id, model, job_id}\n# weekly: group by reason; do not train on raw comments",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому сам по собі графік '72% thumbs up' мало що каже?", promptEn: "Why does a '72% thumbs up' chart by itself say little?", options: ["не видно, чи це факти, тон чи швидкість; потрібні категорії та версії", "відсоток завжди достатній", "категорії заборонені UX", "версія промпту не впливає"], correctIndex: 0, explanationUk: "Сигнал має вказувати на дію.", explanationEn: "The signal should point to an action." },
          { kind: "fill", promptUk: "Допишіть обов'язкові поля оцінки", promptEn: "Fill in the mandatory fields of a rating", language: "json", code: "{ \"thumb\": \"down\", \"reason\": \"wrong_fact\", \"___\": \"support@4.2\", \"model\": \"x\" }", accepted: ["prompt_id", "promptId"], caseSensitive: true, explanationUk: "Щоб знати, яку версію лагодити.", explanationEn: "So you know which version to fix." },
          { kind: "read", promptUk: "Чи можна одразу домішувати сирі коментарі користувачів у fine-tune щоночі?", promptEn: "May you mix raw user comments into a fine-tune every night immediately?", language: "python", code: "train(base, data=raw_comments)", options: ["ні: потрібні згода, модерація й перевірка отруєння", "так, це найчистіший корпус", "так, якщо thumbs up > 50%", "так, без prompt_id"], correctIndex: 0, explanationUk: "Зворотний зв'язок ≠ готовий корпус.", explanationEn: "Feedback is not a ready corpus." }
        ],
        whyUk: "Як зібрати оцінку відповіді, щоб з неї випливала конкретна правка промпту?",
        whyEn: "How do you collect an answer rating so that a concrete prompt fix follows from it?",
        ideas: [{ labelUk: "категорія чому", labelEn: "a why category", anyOf: ["категор", "category", "чому", "why", "dislike", "факт", "fact"] }, { labelUk: "версія в записі", labelEn: "the version in the record", anyOf: ["prompt_id", "модель", "model", "задач", "job"] }, { labelUk: "огляд тренду", labelEn: "a trend review", anyOf: ["тренд", "trend", "ритуал", "ritual", "модерац", "moderat"] }],
        sampleUk: "Після dislike просять коротку категорію, запис в'яжуть із prompt_id і моделлю, щотижня дивляться тренд і не ллють сирі коментарі в fine-tune без модерації.",
        sampleEn: "After a dislike you ask for a short category, you bind the record to prompt_id and the model, you look at the weekly trend, and you do not pour raw comments into a fine-tune without moderation.",
      },
      {
        slug: "ap-close-loop",
        titleUk: "Закрити цикл: інцидент і скарга стають кейсом оцінки й зміною релізу",
        titleEn: "Close the loop: an incident and a complaint become an eval case and a release change",
        difficulty: 3,
        pointsUk: ["Скарга → кейс оцінки → реліз → відповідь", "Є власник циклу", "Changelog помітних змін поведінки"],
        pointsEn: ["A complaint → an eval case → a release → a reply", "The loop has an owner", "A changelog of noticeable behaviour changes"],
        conceptUk: "Скарга в підтримку, що 'бот вигадав політику повернення', повинна закінчитись не лише вибаченням, а пунктом у регресійному наборі, можливою правкою промпту або інструменту, і повідомленням команді, коли виправлення в проді. Без власника сигнали гниють. Дошка: відкрита скарга → гіпотеза → зміна → оцінка на наборі → реліз → відповідь клієнту. Не кожна одинична скарга варта зміни продукту — дивіться повтори й серйозність. Публічний changelog для помітних змін поведінки бота знижує повторні звернення.",
        conceptEn: "A support complaint that 'the bot invented a return policy' should end not only with an apology, but with an item in the regression set, a possible prompt or tool fix, and a notice to the team when the fix is in prod. Without an owner, signals rot. The board: an open complaint → a hypothesis → a change → an eval on the set → a release → a reply to the customer. Not every single complaint deserves a product change — look at repeats and severity. A public changelog for noticeable bot-behaviour changes reduces repeat tickets.",
        code: "board: complaint → hypothesis → change → eval → release → reply + changelog",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Який кінець циклу найкорисніший після вигадки політики повернення?", promptEn: "Which end of the loop is most useful after an invented return policy?", options: ["кейсі в наборі, виправлення в проді й закриття скарги з посиланням на зміну", "лише вибачення без кейса", "вимкнути всі оцінки", "змінити модель-суддю й промпт одночасно без запису"], correctIndex: 0, explanationUk: "Сигнал стає регресією.", explanationEn: "The signal becomes a regression." },
          { kind: "fill", promptUk: "Допишіть артефакт, що зменшує повторні скарги після зміни поведінки", promptEn: "Fill in the artifact that reduces repeat complaints after a behaviour change", language: "markdown", code: "# ___ : support bot no longer invents return policy (v4.3)", accepted: ["changelog", "Changelog", "CHANGELOG"], caseSensitive: true, explanationUk: "Публічний або внутрішній changelog.", explanationEn: "A public or internal changelog." },
          { kind: "read", promptUk: "Чи кожну одиничну скаргу треба негайно вшивати в промпт?", promptEn: "Should every single complaint be immediately baked into the prompt?", language: "yaml", code: "complaints: 1 unique, low severity", options: ["ні: дивіться повтори й серйозність, інакше промпт стане клаптевим", "так, завжди в той самий день", "так, без набору оцінки", "так, без власника"], correctIndex: 0, explanationUk: "Пріоритет і патерн.", explanationEn: "Priority and pattern." }
        ],
        whyUk: "Як провести скаргу 'бот вигадав знижку' від підтримки до релізу?",
        whyEn: "How do you take a 'the bot invented a discount' complaint from support to a release?",
        ideas: [{ labelUk: "власник і дошка", labelEn: "an owner and a board", anyOf: ["власник", "owner", "скарг", "complaint", "гіпотез", "hypothesis"] }, { labelUk: "кейс оцінки", labelEn: "an eval case", anyOf: ["кейс", "case", "набір", "set", "регрес", "regress"] }, { labelUk: "реліз і changelog", labelEn: "a release and a changelog", anyOf: ["реліз", "release", "changelog", "відповід", "reply"] }],
        sampleUk: "Скаргу бере власник, додають регресійний кейс, роблять зміну, перевіряють на наборі, релізять, відповідають клієнту й пишуть changelog; одиниці низької сили не запихають у промпт без патерну.",
        sampleEn: "An owner takes the complaint, you add a regression case, you make a change, you check it on the set, you release, you reply to the customer, and you write a changelog; a single low-severity item is not stuffed into the prompt without a pattern.",
      }
    ],
    "Контрольна: зворотний зв'язок",
    "Exam: feedback",
    [
      { promptUk: "Thumb down без категорії…", promptEn: "A thumb down with no category is…", options: ["слабкий сигнал; просіть коротке чому", "достатній для fine-tune", "заміна prompt_id", "привід блокувати UI"], correctIndex: 0, explanationUk: "Категорія вказує на дію.", explanationEn: "A category points to an action." },
      { promptUk: "Оцінку прив'язують до…", promptEn: "A rating is bound to…", options: ["prompt_id, моделі й задачі", "лише відсотка thumbs", "імені інженера в Slack", "собівартості токена"], correctIndex: 0, explanationUk: "Щоб знати, що лагодити.", explanationEn: "So you know what to fix." },
      { promptUk: "Сирі коментарі щоночі в fine-tune…", promptEn: "Raw comments every night into a fine-tune are…", options: ["небезпечні без згоди й модерації", "найкращий корпус", "заміна тренду", "обов'язкові для UX"], correctIndex: 0, explanationUk: "Фільтр перед навчанням.", explanationEn: "A filter before training." },
      { promptUk: "Скарга без власника циклу…", promptEn: "A complaint with no loop owner…", options: ["гниє; потрібні кейс, реліз і відповідь", "закривається лише вибаченням завжди достатньо", "не потребує набору", "замінює changelog"], correctIndex: 0, explanationUk: "Закрити цикл.", explanationEn: "Close the loop." },
      { promptUk: "Кожну одиничну скаргу вшивати в промпт…", promptEn: "Baking every single complaint into the prompt is…", options: ["робить шаблон клаптевим; дивіться повтори", "обов'язкова практика", "заміна оцінки", "єдиний changelog"], correctIndex: 0, explanationUk: "Паттерн і серйозність.", explanationEn: "Pattern and severity." },
      { promptUk: "Changelog поведінки бота…", promptEn: "A changelog of the bot's behaviour…", options: ["зменшує повторні звернення", "замінює набір оцінки", "повинен ховати зміни", "є лише для GPU"], correctIndex: 0, explanationUk: "Помітні зміни оголошують.", explanationEn: "Noticeable changes are announced." }
    ],
  ),
  sectionUnit(
    "ap_launch_checklist",
    "Запуск AI-функції: чекліст, не лише демо",
    "Launching an AI feature: a checklist, not only a demo",
    [
      {
        slug: "ap-launch-gates",
        titleUk: "Перед продакшеном: відмови, квоти, відкат і хто чергує",
        titleEn: "Before production: refusals, quotas, a rollback, and who is on call",
        difficulty: 3,
        pointsUk: ["Гейті якості й безпеки зелені", "Відкат, прапорець, черговий", "UI й сапорт про обмеження"],
        pointsEn: ["Quality and safety gates are green", "A rollback, a flag, someone on call", "The UI and support talk about limits"],
        conceptUk: "Демо на щасливому прикладі не є запуском. Чекліст: набір оцінки й jailbreak-гейті зелені, квоти й тарифікація працюють, є відкат версії промпту/моделі, логи з редакцією, політика даних підписана, HITL на ризикованих діях, текст про обмеження моделі в UI, людина на черзі в перші дні. Feature flag дозволяє вимкнути функцію без деплою. Юридичні й сапорт-шаблони готові ('бот помиляється — ось як повідомити'). Без пункту 'хто відкотить о 3 ночі' — це все ще демо.",
        conceptEn: "A demo on a happy example is not a launch. The checklist: the eval set and the jailbreak gate are green, quotas and metering work, there is a rollback of the prompt/model version, logs are redacted, the data policy is signed, HITL is on risky actions, the UI states the model's limits, and a human is on call in the first days. A feature flag can turn the feature off without a deploy. Legal and support templates are ready ('the bot makes mistakes — here is how to report'). Without a 'who rolls back at 3 a.m.' item, this is still a demo.",
        code: "launch_ok = eval_green and jailbreak_green and flag and rollback_runbook and oncall and ui_limits",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чого не вистачає 'запуску', якщо є лише вдале демо й немає feature flag і rollback?", promptEn: "What is missing from a 'launch' if there is only a successful demo and no feature flag or rollback?", options: ["способу швидко вимкнути й відкотити при інциденті", "нічого: демо достатньо", "лише маркетингу", "нового GPU"], correctIndex: 0, explanationUk: "Керований ризик.", explanationEn: "Managed risk." },
          { kind: "fill", promptUk: "Допишіть вимикач функції без деплою", promptEn: "Fill in the switch that turns the feature off without a deploy", language: "python", code: "if feature.___('ai_returns'): serve_bot()\nelse: serve_classic()", accepted: ["flag", "enabled", "is_on"], caseSensitive: true, explanationUk: "Feature flag.", explanationEn: "A feature flag." },
          { kind: "read", promptUk: "Що має бачити користувач у UI про межі бота?", promptEn: "What should the user see in the UI about the bot's limits?", language: "markdown", code: "# short notice near the input", options: ["що відповіді можуть містити помилки й як повідомити про них", "нічого: це знижує довіру завжди", "повний системний промпт", "собівартість токена"], correctIndex: 0, explanationUk: "Чесне обмеження.", explanationEn: "An honest limitation." }
        ],
        whyUk: "Які пункти відрізняють запуск від демо на одному щасливому діалозі?",
        whyEn: "Which items distinguish a launch from a demo on one happy dialogue?",
        ideas: [{ labelUk: "гейті й відкат", labelEn: "gates and a rollback", anyOf: ["гейті", "gate", "відкат", "rollback", "jailbreak", "оцінк", "eval"] }, { labelUk: "прапорець і черговий", labelEn: "a flag and someone on call", anyOf: ["flag", "черг", "on call", "3", "ніч", "night"] }, { labelUk: "UI про помилки", labelEn: "the UI about mistakes", anyOf: ["обмежен", "limit", "сапорт", "support", "помилк", "mistake"] }],
        sampleUk: "Перед запуском зелені гейті оцінки й безпеки, є відкат і feature flag, черговий на перші дні, квоти й редакція логів, у UI — чесні обмеження; саме демо без цього ще не прод.",
        sampleEn: "Before launch the eval and safety gates are green, there is a rollback and a feature flag, someone is on call for the first days, quotas and log redaction work, and the UI states honest limits; a demo without that is not prod yet.",
      },
      {
        slug: "ap-day2-watch",
        titleUk: "Другий день: живі метрики, тихі відмови й втома сапорту",
        titleEn: "Day two: live metrics, quiet refusals, and support fatigue",
        difficulty: 3,
        pointsUk: ["Метрики продукту, не лише uptime", "Сапорт може ескалювати вимикання", "Ємність і ретроспектива першого тижня"],
        pointsEn: ["Product metrics, not only uptime", "Support can escalate a shutdown", "Capacity and a first-week retrospective"],
        conceptUk: "Після запуску дивляться не лише uptime: частка відмов, скарги, вартість на активного, латентність, обхід HITL, тікети 'бот не правий'. Тихі відмови (користувач пішов без оцінки) ловлять через незавершені сесії. Сапорт отримує дайджест типових збоїв і право ескалювати вимикання прапорця. Через тиждень — ретроспектива: що не було в чеклісті. Не вимикайте моніторинг, 'бо вже стабільно', у перший місяць. Плануйте ємність: успішний запуск множить рахунок моделі.",
        conceptEn: "After launch you watch more than uptime: the refusal rate, complaints, cost per active user, latency, HITL bypasses, 'the bot is wrong' tickets. Quiet drop-offs (the user left without a rating) are caught through unfinished sessions. Support gets a digest of typical failures and the right to escalate turning the flag off. After a week — a retrospective: what was not on the checklist. Do not turn monitoring off 'because it is already stable' in the first month. Plan capacity: a successful launch multiplies the model bill.",
        code: "week1: watch refusal, unfinished_sessions, cost/active, latency, tickets\nsupport.can_escalate(flag_off); retro: checklist gaps",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Який сигнал легко пропустити, якщо дивитись лише thumbs і 5xx?", promptEn: "Which signal is easy to miss if you only watch thumbs and 5xx?", options: ["незавершені сесії: людина пішла без оцінки після поганої відповіді", "5xx уже все покривають", "thumbs завжди повні", "вартість на активного не буває сюрпризом"], correctIndex: 0, explanationUk: "Тихі відмови.", explanationEn: "Quiet drop-offs." },
          { kind: "fill", promptUk: "Допишіть право сапорту в інциденті бота", promptEn: "Fill in support's right in a bot incident", language: "yaml", code: "support_can: escalate_to_oncall, request_flag____", accepted: ["_off", "off"], caseSensitive: true, explanationUk: "Ескалація вимкнення прапорця.", explanationEn: "An escalation to turn the flag off." },
          { kind: "read", promptUk: "Що планувати, якщо DAU бота зріс учетверо за тиждень?", promptEn: "What should you plan if the bot's DAU grew fourfold in a week?", language: "sql", code: "SELECT cost / active_users FROM daily", options: ["ємність і бюджет моделі, не лише радість метрик", "вимкнути моніторинг як 'стабільно'", "прибрати HITL", "відмінити ретроспективу"], correctIndex: 0, explanationUk: "Успіх множить рахунок.", explanationEn: "Success multiplies the bill." }
        ],
        whyUk: "За чим стежити першого тижня після запуску AI-функції?",
        whyEn: "What do you watch in the first week after launching an AI feature?",
        ideas: [{ labelUk: "скарги й відмови", labelEn: "complaints and refusals", anyOf: ["скарг", "complaint", "відмов", "refusal", "сесі", "session", "тихі"] }, { labelUk: "вартість і латентність", labelEn: "cost and latency", anyOf: ["варт", "cost", "латент", "latency", "ємніст", "capacity"] }, { labelUk: "сапорт і ретро", labelEn: "support and a retro", anyOf: ["сапорт", "support", "прапор", "flag", "ретро", "retro"] }],
        sampleUk: "Дивляться скарги, тихі незавершені сесії, вартість на активного, латентність і тікети, сапорт може ескалювати вимикання, за тиждень роблять ретро й планують ємність; моніторинг не вимикають 'бо стабільно'.",
        sampleEn: "You watch complaints, quiet unfinished sessions, cost per active user, latency, and tickets, support can escalate a shutdown, after a week you run a retro and plan capacity; you do not turn monitoring off 'because it is stable'.",
      }
    ],
    "Контрольна: запуск",
    "Exam: launch",
    [
      { promptUk: "Вдале демо без rollback і flag…", promptEn: "A successful demo without a rollback and a flag is…", options: ["ще не запуск", "повний прод", "заміна гейтів", "достатній on-call"], correctIndex: 0, explanationUk: "Керований ризик.", explanationEn: "Managed risk." },
      { promptUk: "Feature flag потрібен, щоб…", promptEn: "A feature flag is there so…", options: ["вимкнути функцію без деплою", "замінити оцінку", "сховати обмеження в UI", "прибрати сапорт"], correctIndex: 0, explanationUk: "Швидке вимикання.", explanationEn: "A fast shutdown." },
      { promptUk: "У UI про межі бота…", promptEn: "In the UI about the bot's limits…", options: ["чесно кажуть, що бувають помилки, і як повідомити", "мовчать, щоб не знизити довіру", "друкують системний промпт", "показують собівартість"], correctIndex: 0, explanationUk: "Чесне обмеження.", explanationEn: "An honest limitation." },
      { promptUk: "Черговий у перші дні…", promptEn: "Someone on call in the first days is…", options: ["пункт чекліста запуску", "зайвий, якщо демо вдалось", "заміна квот", "лише для GPU"], correctIndex: 0, explanationUk: "Хто відкотить о третій ночі.", explanationEn: "Who rolls back at 3 a.m." },
      { promptUk: "Незавершені сесії після запуску…", promptEn: "Unfinished sessions after launch are…", options: ["сигнал тихих відмов, не лише thumbs", "завжди успіх", "заміна 5xx", "привід вимкнути моніторинг"], correctIndex: 0, explanationUk: "Дивіться drop-off.", explanationEn: "Watch drop-off." },
      { promptUk: "Зростання DAU вчетверо вимагає…", promptEn: "A fourfold DAU rise requires…", options: ["плану ємності й бюджету моделі", "вимкнути моніторинг", "прибрати HITL", "скасувати ретро"], correctIndex: 0, explanationUk: "Успіх множить рахунок.", explanationEn: "Success multiplies the bill." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandAiProduct(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
