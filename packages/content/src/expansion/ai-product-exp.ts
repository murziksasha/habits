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
        conceptUk: "Якщо дія витрачає квоту або ресурси, покажіть до запуску зрозумілу оцінку, її невизначеність і залишок. Поясніть ліміти мовою продукту, наприклад у відповідях чи сторінках, якщо перерахунок достовірний. Для дорогої дії передбачте підтвердження й можливість зупинити її. Якщо ліміт вичерпано посеред відповіді, збережіть доступний частковий результат і поясніть, коли або як можна продовжити. Внутрішні витрати не обов'язково є ціною для користувача: не обіцяйте необмежене використання, якщо фактичні правила мають приховані обмеження.",
        conceptEn: "If an action consumes quota or resources, show an understandable estimate, its uncertainty, and the remaining allowance before starting. Explain limits in product terms such as answers or pages when the conversion is reliable. Let users confirm and stop expensive actions. If a limit is reached mid-answer, preserve available partial work and explain when or how to continue. Internal cost is not necessarily the user's price: do not promise unlimited use when actual rules have hidden limits.",
        code: "if estimate(job) > cheap_threshold:\n    ui.confirm(estimate=pretty(job), remainder=quota)\n# limits: '12 answers left', not '12403 tokens'",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чим поганий лічильник 'залишилось 12403 токени' для звичайного користувача?", promptEn: "Why is a '12,403 tokens left' counter poor for an ordinary user?", options: ["токен не є одиницею цінності для людини; кажіть сторінками чи відповідями", "користувачі завжди рахують токени краще за продукт", "токен заборонено показувати", "це замінює підтвердження"], optionsEn: ["Tokens may be hard to relate to user value; explain limits in understandable actions where possible", "Users always count tokens better", "Showing tokens is forbidden", "It replaces confirmation"], correctIndex: 0, explanationUk: "Одиниця — зрозуміла дія.", explanationEn: "The unit is a understandable action." },
          { kind: "fill", promptUk: "Допишіть, що показати перед агентом на годину роботи", promptEn: "Fill in what to show before an agent that will run for an hour", language: "yaml", code: "ui:\n  expensive_action: ___  # estimate + yes/no", accepted: ["confirm", "confirmation", "estimate_confirm"], caseSensitive: true, explanationUk: "Підтвердження з оцінкою.", explanationEn: "A confirmation with an estimate." },
          { kind: "read", promptUk: "Що показати, коли квота скінчилась на середині чернетки?", promptEn: "What do you show when quota runs out in the middle of a draft?", language: "python", code: "# agent stopped at cap", options: ["доступну чернетку й пояснення, коли або як продовжити", "лише 402 без тексту", "автоматичне 'необмежено'", "внутрішню собівартість у центах"], optionsEn: ["The available draft and an explanation of when or how to continue", "Only a 402 with no text", "An automatic unlimited promise", "Internal cost in cents"], correctIndex: 0, explanationUk: "Частковий результат і наступний крок.", explanationEn: "A partial result and a next step." }
        ],
        whyUk: "Як говорити про квоту сапорт-бота так, щоб дорогий запуск не став сюрпризом?",
        whyEn: "How do you talk about a support-bot quota so an expensive run is not a surprise?",
        ideas: [{ labelUk: "оцінка до старту", labelEn: "an estimate before start", anyOf: ["оцінк", "estimate", "залишок", "remain", "до старту", "before"] }, { labelUk: "мова продукту", labelEn: "product language", anyOf: ["сторін", "page", "відповід", "message", "токен", "token", "підтверд", "confirm"] }, { labelUk: "не необмежено", labelEn: "not unlimited", anyOf: ["необмеж", "unlimited", "частков", "partial", "квот", "quota"] }],
        sampleUk: "Перед дорогою дією показують оцінку й просять підтвердження, квоту пояснюють зрозумілими одиницями, при вичерпанні зберігають чернетку й описують наступний крок; не приховують фактичні ліміти за словом 'необмежено'.",
        sampleEn: "Before an expensive action show an estimate and request confirmation, explain the quota in understandable units, preserve the draft on cutoff and describe the next step; do not hide actual limits behind 'unlimited'.",
      },
      {
        slug: "ap-fair-meter",
        titleUk: "Лічильник чесний: однакова дія коштує передбачувано",
        titleEn: "A fair meter: the same action costs something predictable",
        difficulty: 3,
        pointsUk: ["Публічні стабільні правила одиниці", "Збій не тарифікують як успіх", "Прозорість для команд і канал оскарження"],
        pointsEn: ["Public stable unit rules", "A failure is not metered as a success", "Transparency for teams and a dispute channel"],
        conceptUk: "Те саме питання може витратити різні ресурси через довжину контексту, вибір моделі чи повторні спроби. Пояснюйте одиниці, момент витрати квоти та обробку збоїв; повідомляйте про суттєві зміни правил. Уповноваженому адміністратору команди показуйте лише деталізацію, потрібну для його ролі, з обмеженням доступу й строку зберігання, не розкриваючи вміст промптів. Канал підтримки може розібрати спірне використання за мінімальним журналом аудиту.",
        conceptEn: "The same question can consume different resources because of context length, model choice, or retries. Explain the units, when quota is consumed, and how failures are handled; provide notice of material changes. Give authorized team administrators only the usage detail needed for their role, with access controls and retention limits, rather than exposing prompt contents. A support channel can resolve disputed usage using a minimal audit record.",
        code: "meter: charge on success or explain partial; refund on 5xx-before-tokens\n# admin: per-member breakdown; dispute → job log",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Чи справедливо знімати повну ціну, якщо відповідь обірвалась 5xx на першому токені?", promptEn: "Is it fair to take the full price if the answer died with a 5xx on the first token?", options: ["ні: збій компенсують або не тарифікують як успішну дію", "так, старт задачі завжди повна ціна", "так, якщо токени внутрішні", "так, без логу"], optionsEn: ["No: compensate the failure or do not count it as success", "Yes, starting always costs the full price", "Yes, if tokens are internal", "Yes, without a log"], correctIndex: 0, explanationUk: "Платять за цінність або чесно за спожите з поясненням.", explanationEn: "They pay for value, or honestly for what was consumed, with an explanation." },
          { kind: "fill", promptUk: "Допишіть, що має бачити адмін команди", promptEn: "Fill in what a team admin should see", language: "sql", code: "SELECT member, units_used, jobs FROM ___ WHERE period = '2026-11';", accepted: ["usage_breakdown", "usage", "team_usage"], caseSensitive: true, explanationUk: "Розбивка використання.", explanationEn: "A usage breakdown." },
          { kind: "read", promptUk: "Як змінювати тариф у експерименті, не підриваючи довіру?", promptEn: "How do you change a tariff in an experiment without undermining trust?", language: "yaml", code: "experiment: cheaper_plan_hidden: true", options: ["повідомити правила й не зменшувати пакет мовчки", "тихо зменшити квоту половині користувачів", "прибрати лог задач", "заборонити оскарження"], optionsEn: ["Communicate rules and avoid silently shrinking an allowance", "Silently halve some users' quota", "Remove job logs", "Forbid disputes"], correctIndex: 0, explanationUk: "Прозорість тарифу — частина продукту.", explanationEn: "Tariff transparency is part of the product." }
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
      { promptUk: "Лічильник у 'токенах' для звичайного користувача…", promptEn: "A counter in 'tokens' for an ordinary user is…", options: ["погано зрозумілий; кажіть діями продукту", "найкраща одиниця завжди", "заміна оцінки", "обов'язковий для UX"], optionsEn: ["Often hard to understand; explain in product actions where reliable", "Always the best unit", "A replacement for estimates", "Mandatory for UX"], correctIndex: 0, explanationUk: "Мова продукту.", explanationEn: "Product language." },
      { promptUk: "Дорогий запуск агента має…", promptEn: "An expensive agent run should have…", options: ["оцінку й підтвердження до старту", "стартувати мовчки", "обіцянку 'необмежено'", "порожній екран на обриві"], optionsEn: ["An estimate and confirmation before starting", "A silent start", "An unlimited promise", "A blank screen on interruption"], correctIndex: 0, explanationUk: "Без сюрпризу.", explanationEn: "No surprise." },
      { promptUk: "Обіцянка 'необмежено' за наявності прихованого ліміту…", promptEn: "An 'unlimited' promise with a hidden limit is…", options: ["оманливою: фактичні межі треба пояснити", "стандартом FinOps", "заміною квоти завжди", "внутрішньою собівартістю"], optionsEn: ["Misleading: disclose actual limits", "A FinOps standard", "Always a replacement for a quota", "The internal cost"], correctIndex: 0, explanationUk: "Опис має відповідати фактичним правилам.", explanationEn: "The description must match the actual rules." },
      { promptUk: "Повна ціна при 5xx на першому токені…", promptEn: "The full price on a 5xx at the first token is…", options: ["несправедлива; компенсуйте", "завжди правильна", "заміна логу", "обов'язкова для команд"], optionsEn: ["Unfair; compensate it", "Always correct", "A replacement for logs", "Mandatory for teams"], correctIndex: 0, explanationUk: "Збій ≠ успіх.", explanationEn: "A failure is not a success." },
      { promptUk: "Адмін команди має бачити…", promptEn: "A team admin should see…", options: ["розбивку використання по членах", "лише загальне 'мінус' без сліду", "собівартість GPU", "чужі токени провайдера"], optionsEn: ["An authorized breakdown of member usage", "Only an unexplained shared deduction", "GPU cost", "Other users' provider tokens"], correctIndex: 0, explanationUk: "Прозорість.", explanationEn: "Transparency." },
      { promptUk: "Тиха A/B зміна тарифу вниз…", promptEn: "A silent A/B change that shrinks the tariff…", options: ["підриває довіру; потрібне повідомлення", "найкращий експеримент", "заміна оскарження", "обов'язкова канарейка ціни"], optionsEn: ["Undermines trust; communicate the change", "Is the best experiment", "Replaces dispute handling", "Is mandatory for a price canary"], correctIndex: 0, explanationUk: "Правила тарифу публічні.", explanationEn: "Tariff rules are public." }
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
        conceptUk: "Оцінка й необов'язкова категорія допомагають знайти проблему, але реагують не всі користувачі: 72% позитивних оцінок не означає, що задоволені 72% усіх користувачів. Показуйте кількість оцінок, частку відповідей і зміни вибірки; перевіряйте категорії та версії промпту й моделі. Оцінка не повинна блокувати роботу. Мінімізуйте коментарі, обмежуйте доступ і строк зберігання; перед навчанням перевіряйте дозвіл на використання, приватність, якість та ризик отруєння даних. Для рідкісних або серйозних збоїв потрібен окремий розгляд, а не лише середній відсоток.",
        conceptEn: "A rating and optional reason help locate a problem, but not every user responds: 72% positive ratings does not mean 72% of all users are satisfied. Show the number of ratings, response rate, and changes in the sample; inspect categories and prompt/model versions. Feedback must not block work. Minimize comments, restrict access and retention, and check permission to use data, privacy, quality, and poisoning risks before training. Rare or severe failures need individual review rather than only an aggregate percentage.",
        code: "feedback = {thumb, reason, prompt_id, model, job_id}\n# weekly: group by reason; do not train on raw comments",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому сам по собі графік '72% thumbs up' мало що каже?", promptEn: "Why does a '72% thumbs up' chart by itself say little?", options: ["не видно, чи це факти, тон чи швидкість; потрібні категорії та версії", "відсоток завжди достатній", "категорії заборонені UX", "версія промпту не впливає"], optionsEn: ["It does not reveal whether problems involve facts, tone, or speed; inspect categories and versions", "A percentage is always sufficient", "UX forbids categories", "Prompt version has no effect"], correctIndex: 0, explanationUk: "Сигнал має вказувати на дію.", explanationEn: "The signal should point to an action." },
          { kind: "fill", promptUk: "Допишіть обов'язкові поля оцінки", promptEn: "Fill in the mandatory fields of a rating", language: "json", code: "{ \"thumb\": \"down\", \"reason\": \"wrong_fact\", \"___\": \"support@4.2\", \"model\": \"x\" }", accepted: ["prompt_id", "promptId"], caseSensitive: true, explanationUk: "Щоб знати, яку версію лагодити.", explanationEn: "So you know which version to fix." },
          { kind: "read", promptUk: "Чи можна одразу домішувати сирі коментарі користувачів у fine-tune щоночі?", promptEn: "May you mix raw user comments into a fine-tune every night immediately?", language: "python", code: "train(base, data=raw_comments)", options: ["ні: потрібні згода, модерація й перевірка отруєння", "так, це найчистіший корпус", "так, якщо thumbs up > 50%", "так, без prompt_id"], optionsEn: ["No: check permission, privacy, moderation, and poisoning risks first", "Yes, it is the cleanest corpus", "Yes, if thumbs up exceeds 50%", "Yes, without a prompt ID"], correctIndex: 0, explanationUk: "Зворотний зв'язок ≠ готовий корпус.", explanationEn: "Feedback is not a ready corpus." }
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
        conceptUk: "Призначте власника скарги, перевірте її серйозність і відтворюваність, підготуйте очищений регресійний кейс і перевірте можливе виправлення. Критична одинична скарга може потребувати негайної реакції навіть без повторів. Не кожна підтверджена скарга завершується релізом: зафіксуйте рішення або обмеження та повідомте користувача, коли це доречно. Changelog пояснює помітні зміни, але його вплив на кількість повторних звернень потрібно вимірювати, а не вважати гарантованим.",
        conceptEn: "Assign an owner, assess severity and reproducibility, prepare a redacted regression case, and evaluate a possible fix. A single critical complaint may need immediate action even without repeats. Not every confirmed complaint ends in a release: record the decision or limitation and update the user when appropriate. A changelog explains visible changes, but its effect on repeat contacts must be measured rather than assumed.",
        code: "board: complaint → hypothesis → change → eval → release → reply + changelog",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Який кінець циклу найкорисніший після вигадки політики повернення?", promptEn: "Which end of the loop is most useful after an invented return policy?", options: ["кейсі в наборі, виправлення в проді й закриття скарги з посиланням на зміну", "лише вибачення без кейса", "вимкнути всі оцінки", "змінити модель-суддю й промпт одночасно без запису"], optionsEn: ["Add an evaluation case, validate a fix, and close the complaint with an update", "Only apologize without a test case", "Disable all ratings", "Change the judge and prompt together without a record"], correctIndex: 0, explanationUk: "Сигнал стає регресією.", explanationEn: "The signal becomes a regression." },
          { kind: "fill", promptUk: "Допишіть артефакт, що зменшує повторні скарги після зміни поведінки", promptEn: "Fill in the artifact that reduces repeat complaints after a behaviour change", language: "markdown", code: "# ___ : support bot no longer invents return policy (v4.3)", accepted: ["changelog", "Changelog", "CHANGELOG"], caseSensitive: true, explanationUk: "Публічний або внутрішній changelog.", explanationEn: "A public or internal changelog." },
          { kind: "read", promptUk: "Чи кожну одиничну скаргу треба негайно вшивати в промпт?", promptEn: "Should every single complaint be immediately baked into the prompt?", language: "yaml", code: "complaints: 1 unique, low severity", options: ["ні: дивіться повтори й серйозність, інакше промпт стане клаптевим", "так, завжди в той самий день", "так, без набору оцінки", "так, без власника"], optionsEn: ["No: assess severity and patterns; otherwise the prompt can become patchwork", "Yes, always on the same day", "Yes, without an evaluation set", "Yes, without an owner"], correctIndex: 0, explanationUk: "Пріоритет і патерн.", explanationEn: "Priority and pattern." }
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
      { promptUk: "Thumb down без категорії…", promptEn: "A thumb down with no category is…", options: ["слабкий сигнал; просіть коротке чому", "достатній для fine-tune", "заміна prompt_id", "привід блокувати UI"], optionsEn: ["A weak signal; ask an optional short reason", "Enough for fine-tuning", "A replacement for a prompt ID", "A reason to block the UI"], correctIndex: 0, explanationUk: "Категорія вказує на дію.", explanationEn: "A category points to an action." },
      { promptUk: "Оцінку прив'язують до…", promptEn: "A rating is bound to…", options: ["prompt_id, моделі й задачі", "лише відсотка thumbs", "імені інженера в Slack", "собівартості токена"], optionsEn: ["Prompt ID, model version, and job", "Only the thumbs-up percentage", "An engineer's Slack name", "Token cost"], correctIndex: 0, explanationUk: "Щоб знати, що лагодити.", explanationEn: "So you know what to fix." },
      { promptUk: "Сирі коментарі щоночі в fine-tune…", promptEn: "Raw comments every night into a fine-tune are…", options: ["небезпечні без згоди й модерації", "найкращий корпус", "заміна тренду", "обов'язкові для UX"], optionsEn: ["Unsafe without permission and moderation", "The best corpus", "A replacement for trends", "Required for UX"], correctIndex: 0, explanationUk: "Фільтр перед навчанням.", explanationEn: "A filter before training." },
      { promptUk: "Скарга без власника циклу…", promptEn: "A complaint with no loop owner…", options: ["гниє; потрібні кейс, реліз і відповідь", "закривається лише вибаченням завжди достатньо", "не потребує набору", "замінює changelog"], optionsEn: ["Can be neglected; assign ownership and track resolution", "Is always fully resolved by an apology", "Needs no evaluation case", "Replaces a changelog"], correctIndex: 0, explanationUk: "Закрити цикл.", explanationEn: "Close the loop." },
      { promptUk: "Кожну одиничну скаргу вшивати в промпт…", promptEn: "Baking every single complaint into the prompt is…", options: ["робить шаблон клаптевим; дивіться повтори", "обов'язкова практика", "заміна оцінки", "єдиний changelog"], optionsEn: ["Likely to create patchwork; consider patterns and severity", "Mandatory practice", "A replacement for evaluation", "The only changelog"], correctIndex: 0, explanationUk: "Паттерн і серйозність.", explanationEn: "Pattern and severity." },
      { promptUk: "Changelog поведінки бота…", promptEn: "A changelog of the bot's behaviour…", options: ["пояснює помітні зміни; вплив на звернення слід виміряти", "замінює набір оцінки", "повинен ховати зміни", "є лише для GPU"], optionsEn: ["Explains visible changes; measure its effect on repeat contacts", "Replaces the evaluation set", "Should hide changes", "Is only for GPUs"], correctIndex: 0, explanationUk: "Помітні зміни оголошують, а вплив перевіряють.", explanationEn: "Announce visible changes and measure the effect." }
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
        conceptUk: "Демо на одному прикладі не доводить готовності до запуску. Заздалегідь визначте пороги якості й безпеки, обмеження оцінювального набору, відповідального за інцидент і план відкату. Перевірте квоти, редакцію логів, доступ до даних, підтвердження ризикових дій та повідомлення користувачу. Прапорець може допомогти вимкнути функцію без деплою, але перевірте затримку його застосування, обробку активних задач і відмову самого механізму. Успішні тести зменшують невизначеність, але не доводять відсутність усіх ризиків.",
        conceptEn: "A demo on one example does not prove launch readiness. Define quality and safety thresholds, evaluation-set limitations, an incident owner, and a rollback plan in advance. Check quotas, log redaction, data access, approval of risky actions, and user messaging. A flag may disable a feature without a deployment, but test propagation delay, in-flight jobs, and failure of the flag mechanism itself. Passing tests reduce uncertainty; they do not prove the absence of all risks.",
        code: "launch_ok = eval_green and jailbreak_green and flag and rollback_runbook and oncall and ui_limits",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чого не вистачає 'запуску', якщо є лише вдале демо й немає feature flag і rollback?", promptEn: "What is missing from a 'launch' if there is only a successful demo and no feature flag or rollback?", options: ["способу швидко вимкнути й відкотити при інциденті", "нічого: демо достатньо", "лише маркетингу", "нового GPU"], optionsEn: ["A way to disable or roll back quickly during an incident", "Nothing; the demo is sufficient", "Only marketing", "A new GPU"], correctIndex: 0, explanationUk: "Керований ризик.", explanationEn: "Managed risk." },
          { kind: "fill", promptUk: "Допишіть вимикач функції без деплою", promptEn: "Fill in the switch that turns the feature off without a deploy", language: "python", code: "if feature.___('ai_returns'): serve_bot()\nelse: serve_classic()", accepted: ["flag", "enabled", "is_on"], caseSensitive: true, explanationUk: "Feature flag.", explanationEn: "A feature flag." },
          { kind: "read", promptUk: "Що має бачити користувач у UI про межі бота?", promptEn: "What should the user see in the UI about the bot's limits?", language: "markdown", code: "# short notice near the input", options: ["що відповіді можуть містити помилки й як повідомити про них", "нічого: це знижує довіру завжди", "повний системний промпт", "собівартість токена"], optionsEn: ["That answers may contain mistakes and how to report them", "Nothing; disclosure always reduces trust", "The full system prompt", "Token production cost"], correctIndex: 0, explanationUk: "Чесне обмеження.", explanationEn: "An honest limitation." }
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
        conceptUk: "Після запуску відстежуйте не лише uptime, а й частку відмов, скарги, латентність, ресурсні витрати та порушення підтвердження дій. Незавершена сесія — привід дослідити можливий відхід, а не доказ поганої відповіді: користувач міг отримати потрібне й закрити сторінку. Порівнюйте показники з базовим рівнем, ураховуйте розмір вибірки та перевіряйте причини на дозволених даних. Сапорт має знати шлях ескалації; команда планує ємність і проводить ретроспективу.",
        conceptEn: "After launch, monitor more than uptime: refusals, complaints, latency, resource cost, and approval bypasses. An unfinished session is a lead for investigating possible drop-off, not proof of a bad answer: the user may have obtained what they needed and left. Compare with a baseline, account for sample size, and investigate causes using authorized data. Support needs an escalation path; the team plans capacity and runs a retrospective.",
        code: "week1: watch refusal, unfinished_sessions, cost/active, latency, tickets\nsupport.can_escalate(flag_off); retro: checklist gaps",
        language: "yaml",
        retrieval: [
          { kind: "mcq", promptUk: "Який сигнал легко пропустити, якщо дивитись лише thumbs і 5xx?", promptEn: "Which signal is easy to miss if you only watch thumbs and 5xx?", options: ["незавершені сесії, причину яких потрібно дослідити", "5xx уже все покривають", "thumbs завжди повні", "вартість на активного не буває сюрпризом"], optionsEn: ["Unfinished sessions whose cause needs investigation", "5xx already cover everything", "Thumbs are always complete", "Cost per active user is never surprising"], correctIndex: 0, explanationUk: "Незавершена сесія — сигнал для дослідження, не доказ невдоволення.", explanationEn: "An unfinished session is a lead to investigate, not proof of dissatisfaction." },
          { kind: "fill", promptUk: "Допишіть право сапорту в інциденті бота", promptEn: "Fill in support's right in a bot incident", language: "yaml", code: "support_can: escalate_to_oncall, request_flag___", accepted: ["_off"], caseSensitive: true, explanationUk: "Ескалація запиту на вимкнення прапорця.", explanationEn: "Escalate a request to turn the flag off." },
          { kind: "read", promptUk: "Що планувати, якщо DAU бота зріс учетверо за тиждень?", promptEn: "What should you plan if the bot's DAU grew fourfold in a week?", language: "sql", code: "SELECT cost / active_users FROM daily", options: ["ємність і бюджет моделі, не лише радість метрик", "вимкнути моніторинг як 'стабільно'", "прибрати HITL", "відмінити ретроспективу"], optionsEn: ["Capacity and model budget, not only success metrics", "Disable monitoring as stable", "Remove human approval", "Cancel the retrospective"], correctIndex: 0, explanationUk: "Успіх множить рахунок.", explanationEn: "Success multiplies the bill." }
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
      { promptUk: "Вдале демо без rollback і flag…", promptEn: "A successful demo without a rollback and a flag is…", options: ["ще не запуск", "повний прод", "заміна гейтів", "достатній on-call"], optionsEn: ["Not sufficient launch preparation", "Complete production readiness", "A replacement for gates", "Sufficient on-call coverage"], correctIndex: 0, explanationUk: "Керований ризик.", explanationEn: "Managed risk." },
      { promptUk: "Feature flag потрібен, щоб…", promptEn: "A feature flag is there so…", options: ["вимкнути функцію без деплою", "замінити оцінку", "сховати обмеження в UI", "прибрати сапорт"], optionsEn: ["A feature can be disabled without a deployment", "It replaces evaluation", "It hides limitations in the UI", "It removes support"], correctIndex: 0, explanationUk: "Швидке вимикання.", explanationEn: "A fast shutdown." },
      { promptUk: "У UI про межі бота…", promptEn: "In the UI about the bot's limits…", options: ["чесно кажуть, що бувають помилки, і як повідомити", "мовчать, щоб не знизити довіру", "друкують системний промпт", "показують собівартість"], optionsEn: ["Explain that mistakes happen and how to report them", "Stay silent to preserve trust", "Print the system prompt", "Show production cost"], correctIndex: 0, explanationUk: "Чесне обмеження.", explanationEn: "An honest limitation." },
      { promptUk: "Черговий у перші дні…", promptEn: "Someone on call in the first days is…", options: ["пункт чекліста запуску", "зайвий, якщо демо вдалось", "заміна квот", "лише для GPU"], optionsEn: ["A launch checklist item", "Unnecessary if the demo worked", "A replacement for quotas", "Only for GPUs"], correctIndex: 0, explanationUk: "Хто відкотить о третій ночі.", explanationEn: "Who rolls back at 3 a.m." },
      { promptUk: "Незавершені сесії після запуску…", promptEn: "Unfinished sessions after launch are…", options: ["можливий сигнал відтоку, причину якого треба дослідити", "завжди успіх", "заміна 5xx", "привід вимкнути моніторинг"], optionsEn: ["A possible drop-off signal whose cause needs investigation", "Always a success", "A replacement for 5xx metrics", "A reason to disable monitoring"], correctIndex: 0, explanationUk: "Досліджуйте причину відтоку.", explanationEn: "Investigate the cause of drop-off." },
      { promptUk: "Зростання DAU вчетверо вимагає…", promptEn: "A fourfold DAU rise requires…", options: ["плану ємності й бюджету моделі", "вимкнути моніторинг", "прибрати HITL", "скасувати ретро"], optionsEn: ["A capacity and model-budget plan", "Disabling monitoring", "Removing human approval", "Canceling the retrospective"], correctIndex: 0, explanationUk: "Успіх множить рахунок.", explanationEn: "Success multiplies the bill." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandAiProduct(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
