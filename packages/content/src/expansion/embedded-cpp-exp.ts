import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "isr_concurrency",
    "Переривання: ISR, volatile і відкладена робота",
    "Interrupts: ISRs, volatile, and deferred work",
    [
      {
        slug: "emb-isr-short",
        titleUk: "ISR має бути коротким: що дозволено в обробнику",
        titleEn: "An ISR must be short: what is allowed in the handler",
        difficulty: 3,
        pointsUk: ["У ISR лише короткі операції без блокувань", "Важку роботу відкладають у задачу", "Скидайте прапорець, інакше буде шторм"],
        pointsEn: ["Only short non-blocking work in the ISR", "Heavy work is deferred to a task", "Clear the flag, or you get a storm"],
        conceptUk: "Обробник переривання виконується в контексті, де заборонені блокування, купа з непередбачуваним часом, і часто printf. Він має зчитати прапорець периферії, покласти байт у кільцевий буфер, виставити семафор і вийти, щоб не затримувати інші IRQ й основний цикл. Важку роботу (розбір протоколу, запис у флеш, лог) відкладають у task (FreeRTOS deferred interrupt, bottom half). Пріоритети NVIC: вкладені переривання потребують узгоджених критичних секцій. Забутий скид прапорця периферії дає повторний вхід у ISR («шторм»).",
        conceptEn: "An interrupt handler runs in a context where blocking, a heap with unpredictable time, and often printf are forbidden. It should read the peripheral flag, put a byte in a ring buffer, give a semaphore, and return, so other IRQs and the main loop are not delayed. Heavy work (protocol parse, flash write, logging) is deferred to a task (FreeRTOS deferred interrupt, a bottom half). NVIC priorities: nested interrupts need consistent critical sections. A forgotten clear of the peripheral flag re-enters the ISR (a 'storm').",
        code: "void UART_IRQHandler() {\n  buf.push(UART->DR);\n  UART->SR = ~RX_FLAG;\n  xSemaphoreGiveFromISR(sem, &hp);\n}",
        language: "cpp",
        retrieval: [
          { kind: "mcq", promptUk: "Чому malloc у ISR на мікроконтролері небезпечний?", promptEn: "Why is malloc in an ISR dangerous on a microcontroller?", options: ["невизначений час і ризик блокування або порчі купи з іншого контексту", "malloc заборонений компілятором C++ завжди", "ISR не може читати змінні", "купу не можна використовувати в embedded взагалі"], correctIndex: 0, explanationUk: "Детермінований короткий шлях.", explanationEn: "A deterministic short path." },
          { kind: "fill", promptUk: "Допишіть місце для важкого розбору кадру після IRQ", promptEn: "Fill in where heavy frame parsing goes after an IRQ", language: "cpp", code: "// ISR: push byte, xSemaphoreGiveFromISR;  ___ task: parse frame", accepted: ["worker", "deferred", "task"], caseSensitive: true, explanationUk: "Розбір — у задачі, не в ISR.", explanationEn: "Parsing belongs in a task, not the ISR." },
          { kind: "mcq", promptUk: "Що станеться, якщо UART ISR не скине прапорець RX?", promptEn: "What happens if a UART ISR never clears the RX flag?", options: ["контролер одразу знову ввійде в той самий ISR (шторм)", "прапорець скинеться сам через 1 мс завжди", "основний цикл прискориться", "NVIC вимкне UART назавжди"], correctIndex: 0, explanationUk: "Скидання прапорця — частина контракту периферії.", explanationEn: "Clearing the flag is part of the peripheral contract." }
        ],
        whyUk: "Що дозволено в ISR приймача UART, а що треба відкласти?",
        whyEn: "What is allowed in a UART receive ISR, and what should be deferred?",
        ideas: [{ labelUk: "короткий буфер", labelEn: "a short buffer", anyOf: ["кільцев", "ring", "байт", "byte", "семафор", "semaphore"] }, { labelUk: "не malloc і не флеш", labelEn: "no malloc and no flash", anyOf: ["malloc", "флеш", "flash", "printf", "блок"] }, { labelUk: "скинути прапорець", labelEn: "clear the flag", anyOf: ["прапор", "flag", "шторм", "storm", "відклад", "defer"] }],
        sampleUk: "ISR UART лише кладе байт у кільцевий буфер, дає семафор і скидає прапорець; розбір кадру, запис у флеш і malloc відкладають у задачу, інакше можливий шторм переривань.",
        sampleEn: "A UART ISR only puts a byte in a ring buffer, gives a semaphore, and clears the flag; frame parsing, flash writes, and malloc are deferred to a task, or you can get an interrupt storm.",
      },
      {
        slug: "emb-volatile-shared",
        titleUk: "volatile і атомарність спільного з ISR стану",
        titleEn: "volatile and the atomicity of state shared with an ISR",
        difficulty: 3,
        pointsUk: ["volatile запобігає викиданню читань, не дає атомарності", "Багатобайтові ++ потребують критичної секції або atomic", "Між задачами RTOS — не лише volatile"],
        pointsEn: ["volatile prevents discarded reads, it does not give atomicity", "Multi-byte ++ needs a critical section or atomic", "Between RTOS tasks, volatile alone is not enough"],
        conceptUk: "volatile каже компілятору не викидати повторні читання змінної, яку змінює ISR: без нього цикл while (!flag) може бути оптимізований у нескінченне порожнє очікування. volatile не робить операцію атомарною: ++ на 32-бітному лічильнику на 8-бітному MCU або на 64-бітному значенні — це кілька інструкцій, ISR може вклинитись посередині. Для спільного стану — критична секція (вимкнути IRQ на короткий час), кільцевий буфер з одним продюсером й одним споживачем, або атоміки C++ (std::atomic з правильним memory order). Не використовуйте volatile як заміну м'ютексу в задачах RTOS.",
        conceptEn: "volatile tells the compiler not to discard repeated reads of a variable an ISR mutates: without it, a while (!flag) loop may be optimized into an infinite empty wait. volatile does not make an operation atomic: ++ on a 32-bit counter on an 8-bit MCU, or on a 64-bit value, is several instructions, and the ISR can preempt in the middle. For shared state use a critical section (IRQ off for a short time), a single-producer single-consumer ring buffer, or C++ atomics (std::atomic with the right memory order). Do not use volatile as a mutex substitute between RTOS tasks.",
        code: "volatile bool ready;\nstd::atomic<uint32_t> ticks{0};\nvoid SysTick_Handler() { ticks.fetch_add(1, std::memory_order_relaxed); }",
        language: "cpp",
        retrieval: [
          { kind: "mcq", promptUk: "Чому while (!ready) без volatile може не побачити запис із ISR?", promptEn: "Why may while (!ready) without volatile never see the ISR's write?", options: ["компілятор тримає ready в регістрі й не перечитує пам'ять", "ISR не може писати в глобальні", "while заборонений у C++", "volatile тоді вимикає IRQ"], correctIndex: 0, explanationUk: "Оптимізатор вважає ready незмінним у цьому потоці.", explanationEn: "The optimizer treats ready as unchanged in this thread." },
          { kind: "fill", promptUk: "Допишіть кваліфікатор спільного з ISR прапорця", promptEn: "Fill in the qualifier for a flag shared with an ISR", language: "cpp", code: "___ bool ready;", accepted: ["volatile"], caseSensitive: true, explanationUk: "Кваліфікатор — volatile.", explanationEn: "The qualifier is volatile." },
          { kind: "mcq", promptUk: "Чи достатньо volatile для counter++ , якщо ISR теж робить counter++ на 16-бітному MCU з 16-бітним int?", promptEn: "Is volatile enough for counter++ if the ISR also does counter++ on a 16-bit MCU with a 16-bit int?", options: ["не обов'язково: навіть «натуральний» розмір потребує уваги до read-modify-write; краще atomic або критична секція", "так, volatile завжди атомарний", "++ завжди одна інструкція на всіх архітектурах", "ISR не може робити ++"], correctIndex: 0, explanationUk: "read-modify-write — не одна неподільна дія.", explanationEn: "Read-modify-write is not one indivisible action." }
        ],
        whyUk: "Чим volatile відрізняється від критичної секції для лічильника з ISR?",
        whyEn: "How does volatile differ from a critical section for a counter shared with an ISR?",
        ideas: [{ labelUk: "видимість читань", labelEn: "visibility of reads", anyOf: ["volatile", "регістр", "register", "оптиміз", "optim"] }, { labelUk: "не атомарність", labelEn: "not atomicity", anyOf: ["атомар", "atomic", "++", "rmw"] }, { labelUk: "критична секція", labelEn: "a critical section", anyOf: ["критичн", "critical", "irq", "atomic"] }],
        sampleUk: "volatile змушує перечитувати прапорець, але не робить ++ атомарним; для лічильника, який чіпає ISR, потрібна критична секція або std::atomic.",
        sampleEn: "volatile forces the flag to be reread, but it does not make ++ atomic; a counter touched by an ISR needs a critical section or std::atomic.",
      },
      {
        slug: "emb-crit-section",
        titleUk: "Критичні секції, пріоритети й FromISR API",
        titleEn: "Critical sections, priorities, and the FromISR API",
        difficulty: 3,
        pointsUk: ["Критична секція коротка, інакше росте latency", "З ISR лише FromISR-варіанти API", "Після GiveFromISR можливий негайний yield"],
        pointsEn: ["A critical section is short, or latency grows", "From an ISR, only the FromISR API variants", "After GiveFromISR an immediate yield may be needed"],
        conceptUk: "Критична секція вимикає переривання (або піднімає базу пріоритету BASEPRI на Cortex-M) на кілька інструкцій: довга секція збільшує затримку (latency) всіх IRQ, включно з контролем мотора. FreeRTOS розділяє API: xQueueSend з задачі й xQueueSendFromISR з обробника — неправильний виклик може зіпсувати чергу. Після FromISR перевіряють pxHigherPriorityTaskWoken і роблять portYIELD_FROM_ISR. Не викликайте блокуючі взяття черги з ISR. Вкладені критичні секції мають бути парними (лічильник вкладеності).",
        conceptEn: "A critical section disables interrupts (or raises the BASEPRI priority floor on Cortex-M) for a few instructions: a long section increases the latency of every IRQ, including motor control. FreeRTOS splits the API: xQueueSend from a task and xQueueSendFromISR from a handler — the wrong call can corrupt the queue. After FromISR you check pxHigherPriorityTaskWoken and call portYIELD_FROM_ISR. Do not take a queue with a block from an ISR. Nested critical sections must be paired (a nesting count).",
        code: "BaseType_t w = pdFALSE;\nxQueueSendFromISR(q, &b, &w);\nportYIELD_FROM_ISR(w);",
        language: "cpp",
        retrieval: [
          { kind: "mcq", promptUk: "Чому довгу роботу не обгортають у taskENTER_CRITICAL на всю функцію парсингу?", promptEn: "Why should you not wrap a whole parse function in taskENTER_CRITICAL?", options: ["усі переривання чекатимуть, зросте затримка керування в реальному часі", "критичні секції заборонені в FreeRTOS", "парсинг тоді не компілюється", "ENTER_CRITICAL вимикає лише SysTick на 1 такт"], correctIndex: 0, explanationUk: "Секція — мікросекунди, не мілісекунди.", explanationEn: "The section is microseconds, not milliseconds." },
          { kind: "fill", promptUk: "Допишіть варіант відправки в чергу з обробника", promptEn: "Fill in the queue-send variant from a handler", language: "cpp", code: "xQueueSend___(q, &b, &woken);", accepted: ["FromISR"], caseSensitive: true, explanationUk: "Суфікс — FromISR.", explanationEn: "The suffix is FromISR." },
          { kind: "mcq", promptUk: "Навіщо portYIELD_FROM_ISR, якщо woken = pdTRUE?", promptEn: "Why portYIELD_FROM_ISR when woken is pdTRUE?", options: ["щоб одразу перемкнутись на розбуджену вищу задачу, не чекаючи наступного тика", "щоб вимкнути планувальник назавжди", "це очищає чергу", "це скидає NVIC"], correctIndex: 0, explanationUk: "Інакше затримка до наступного SysTick.", explanationEn: "Otherwise you wait until the next SysTick." }
        ],
        whyUk: "Як коректно передати байт з ISR у чергу FreeRTOS?",
        whyEn: "How do you correctly pass a byte from an ISR into a FreeRTOS queue?",
        ideas: [{ labelUk: "FromISR API", labelEn: "the FromISR API", anyOf: ["fromisr", "queue", "семафор", "semaphore"] }, { labelUk: "woken і yield", labelEn: "woken and yield", anyOf: ["woken", "yield", "пріоритет", "priority"] }, { labelUk: "коротка секція", labelEn: "a short section", anyOf: ["критичн", "critical", "latency", "затрим"] }],
        sampleUk: "З ISR викликають xQueueSendFromISR, перевіряють woken і за потреби portYIELD_FROM_ISR; критична секція лишається короткою, щоб не ростила затримку інших IRQ.",
        sampleEn: "From an ISR you call xQueueSendFromISR, check woken, and if needed portYIELD_FROM_ISR; the critical section stays short so it does not grow other IRQs' latency.",
      }
    ],
    "Контрольна: переривання",
    "Exam: interrupts",
    [
      { promptUk: "Важкий розбір кадру в UART ISR…", promptEn: "Heavy frame parsing in a UART ISR is…", options: ["неприпустимий: відкладають у задачу", "обов'язковий для детермінізму", "швидший за чергу завжди", "єдиний спосіб скинути прапорець"], correctIndex: 0, explanationUk: "ISR короткий.", explanationEn: "The ISR is short." },
      { promptUk: "volatile гарантує…", promptEn: "volatile guarantees…", options: ["перечитування пам'яті, не атомарність ++", "атомарність будь-якого ++", "взаємне виключення задач", "скидання NVIC"], correctIndex: 0, explanationUk: "Видимість, не неподільність.", explanationEn: "Visibility, not indivisibility." },
      { promptUk: "xQueueSend з ISR замість FromISR…", promptEn: "xQueueSend from an ISR instead of FromISR…", options: ["може зіпсувати чергу", "є рекомендованим API", "само робить yield", "вимикає volatile"], correctIndex: 0, explanationUk: "Інший контекст — інший API.", explanationEn: "A different context, a different API." },
      { promptUk: "Забутий скид прапорця периферії…", promptEn: "A forgotten clear of a peripheral flag…", options: ["дає шторм повторних ISR", "прискорює основний цикл", "обов'язковий для DMA", "вимикає BASEPRI"], correctIndex: 0, explanationUk: "Контракт периферії.", explanationEn: "The peripheral contract." },
      { promptUk: "printf або запис у флеш у ISR…", promptEn: "printf or a flash write in an ISR is…", options: ["заборонені: невизначений час, роботу відкладають", "рекомендовані для логів", "швидші за чергу", "скидають прапорець самі"], correctIndex: 0, explanationUk: "Важку роботу — у задачу.", explanationEn: "Heavy work belongs in a task." },
      { promptUk: "Вкладені критичні секції мають бути…", promptEn: "Nested critical sections must be…", options: ["парними, з лічильником вкладеності", "залишені відкритими", "завжди глобальним вимкненням на секунди", "заміною FromISR"], correctIndex: 0, explanationUk: "Enter і Exit парні.", explanationEn: "Enter and Exit are paired." }
    ],
  ),
  sectionUnit(
    "power_management",
    "Споживання: сон, джерела пробудження, периферія",
    "Power: sleep, wake sources, and peripherals",
    [
      {
        slug: "emb-sleep-modes",
        titleUk: "Режими сну: що зупиняється, що ще тікає струм",
        titleEn: "Sleep modes: what stops, and where current still leaks",
        difficulty: 3,
        pointsUk: ["Глибший сон — менше струму, довший і складніший старт", "Струм плати ≠ цифра з даташита", "Налагоджувач спотворює вимір сну"],
        pointsEn: ["Deeper sleep means less current and a longer, harder start", "Board current is not the datasheet figure", "A debugger distorts a sleep measurement"],
        conceptUk: "Sleep / idle зупиняє ядро, периферія й PLL можуть працювати — споживання середнє, пробудження швидке (переривання). Stop / deep sleep гасить більше тактів і часто RAM утримується, але старт довший, треба відновити тактову деревину. Standby майже вимикає все, стан лише в backup-регістрах — після пробудження майже як ресет. Даташит дає мікроампери в ідеалі; на платі тягнуть підтяжки, світлодіоди, невимкнений LDO і плаваючі піни. Вимірюйте струм на реальному виробі в темряві без налагоджувача, який тримає ядро «не зовсім сплячим».",
        conceptEn: "Sleep / idle stops the core while peripherals and the PLL may keep running — medium consumption, fast wake (an interrupt). Stop / deep sleep gates more clocks and often keeps RAM, but startup is longer and the clock tree must be restored. Standby almost powers everything down, with state only in backup registers — after wake it is almost a reset. The datasheet quotes microamps in the ideal; on the board, pull-ups, LEDs, an enabled LDO, and floating pins still draw. Measure current on the real product in the dark without a debugger that keeps the core 'not quite asleep'.",
        code: "// measure: remove debug, pull unused pins, disable LEDs, then WFI/WFE in the chosen mode",
        language: "cpp",
        retrieval: [
          { kind: "mcq", promptUk: "Чому струм «у sleep» на макеті часто вищий за даташит?", promptEn: "Why is 'sleep' current on a proto board often higher than the datasheet?", options: ["підтяжки, світлодіоди, LDO і плаваючі піни споживають поза ядром", "даташити завжди брешуть у десять разів", "sleep не існує на Cortex-M", "компілятор додає sleep сам"], correctIndex: 0, explanationUk: "Споживає вся плата, не лише CPU.", explanationEn: "The whole board draws, not only the CPU." },
          { kind: "fill", promptUk: "Допишіть найглибший типовий режим з майже повним вимкненням", promptEn: "Fill in the deepest typical mode with almost a full power-down", language: "cpp", code: "// STM32: PWR_CR &= ~PDDS;  enter ___by", accepted: ["stand", "Stand"], caseSensitive: true, explanationUk: "Standby зберігає лише backup-домен.", explanationEn: "Standby keeps only the backup domain." },
          { kind: "mcq", promptUk: "Що треба зробити після виходу з Stop, перш ніж знову тактувати UART на повній швидкості?", promptEn: "What must you do after leaving Stop before you clock UART at full speed again?", options: ["відновити осцилятори, PLL і дерево тактів за документацією", "нічого, UART пам'ятає все сам", "перепрошити бутлоадер", "вимкнути NVIC назавжди"], correctIndex: 0, explanationUk: "Тактова деревина часто скинута.", explanationEn: "The clock tree is often reset." }
        ],
        whyUk: "Як обрати режим сну для датчика, що прокидається раз на хвилину?",
        whyEn: "How do you choose a sleep mode for a sensor that wakes once a minute?",
        ideas: [{ labelUk: "глибина проти часу старту", labelEn: "depth versus start time", anyOf: ["stop", "standby", "idle", "старт", "start"] }, { labelUk: "струм усієї плати", labelEn: "current of the whole board", anyOf: ["плата", "board", "підтяж", "pull", "ldo", "даташит"] }, { labelUk: "без дебагера", labelEn: "without a debugger", anyOf: ["дебаг", "debug", "вимір", "measur"] }],
        sampleUk: "Раз на хвилину часто вигідний глибокий Stop або Standby, якщо час відновлення прийнятний; струм міряють на всій платі без налагоджувача, бо даташит не враховує підтяжки й LDO.",
        sampleEn: "Once a minute, a deep Stop or Standby often pays off if restore time is acceptable; you measure current on the whole board without a debugger, because the datasheet does not include pull-ups and the LDO.",
      },
      {
        slug: "emb-wake-sources",
        titleUk: "Джерела пробудження: RTC, GPIO, watchdog",
        titleEn: "Wake sources: RTC, GPIO, and the watchdog",
        difficulty: 3,
        pointsUk: ["Розрізняйте причину пробудження", "Watchdog — не будильник застосунку", "Дребезг і хибні пробудження з'їдають батарею"],
        pointsEn: ["Distinguish the wake cause", "A watchdog is not the application's alarm clock", "Bounce and spurious wakes eat the battery"],
        conceptUk: "Пробудження планують свідомо: RTC wakeup для періодичного опитування, зовнішній GPIO (фронт датчика) для події, watchdog як останній рубіж, не як будильник застосунку. Кілька джерел мають однозначно розрізнятись після старту (регістр reset cause): інакше ПЗ не знає, чи треба слати пакет, чи калібруватись. Фільтр дребезгу на GPIO-пробі побудження: механічна кнопка без нього розбудить десятки раз. У Stop деякі джерела недоступні — читайте таблицю режиму. Після хибного пробудження якнайшвидше знову спіть, щоб не з'їсти бюджет батареї.",
        conceptEn: "Wake sources are planned on purpose: an RTC wakeup for periodic polling, an external GPIO (a sensor edge) for an event, a watchdog as a last resort, not as the application's alarm clock. Several sources must be distinguishable after start (a reset-cause register): otherwise software does not know whether to send a packet or to calibrate. Debounce on a GPIO wake pin: a mechanical button without it will wake tens of times. In Stop, some sources are unavailable — read the mode table. After a spurious wake, go back to sleep as soon as you can, so you do not eat the battery budget.",
        code: "if (RCC->CSR & RCC_CSR_IWDGRSTF) recover_from_hang();\nelse if (rtc_wakeup) send_sample();",
        language: "cpp",
        retrieval: [
          { kind: "mcq", promptUk: "Чому IWDG поганий як єдиний «таймер хвилини» для регулярної телеметрії?", promptEn: "Why is the IWDG a poor sole 'one-minute timer' for regular telemetry?", options: ["watchdog призначений рятувати від зависання, його таймаут і поведінка — не зручний планувальник задач", "IWDG не вміє скидати MCU", "RTC заборонений разом із watchdog", "хвилина не вміщається в лічильник"], correctIndex: 0, explanationUk: "Для періоду використовуйте RTC wakeup.", explanationEn: "For a period, use an RTC wakeup." },
          { kind: "fill", promptUk: "Допишіть регістр причини скидання / пробудження (типова назва)", promptEn: "Fill in the reset/wake cause register (a typical name)", language: "cpp", code: "uint32_t cause = RCC->___R; // reset status", accepted: ["CSR", "RSR", "CSR"], caseSensitive: true, explanationUk: "Часто RCC_CSR або еквівалент.", explanationEn: "Often RCC_CSR or an equivalent." },
          { kind: "mcq", promptUk: "Що зробити в обробнику пробудження від кнопки без дребезгу?", promptEn: "What should you do in a wake handler from a button with no hardware debounce?", options: ["підтвердити стабільний рівень із короткою затримкою або таймером, інакше буде пачка пробуджень", "ігнорувати кнопку надалі", "підняти частоту ядра до максимуму назавжди", "вимкнути RTC"], correctIndex: 0, explanationUk: "Пакет пробуджень розрядить батарею.", explanationEn: "A burst of wakes will drain the battery." }
        ],
        whyUk: "Як розрізнити пробудження від RTC і від аварійного watchdog?",
        whyEn: "How do you distinguish an RTC wake from an emergency watchdog reset?",
        ideas: [{ labelUk: "причина скидання", labelEn: "the reset cause", anyOf: ["cause", "rcc", "csr", "причина", "reset"] }, { labelUk: "RTC для періоду", labelEn: "RTC for the period", anyOf: ["rtc", "wakeup", "хвилин", "minute"] }, { labelUk: "watchdog — аварія", labelEn: "watchdog is an emergency", anyOf: ["watchdog", "iwdg", "зависан", "hang"] }],
        sampleUk: "Після старту читають регістр причини: RTC wakeup — плановий цикл, watchdog — аварійне зависання з іншим шляхом відновлення; watchdog не використовують як хвилинний будильник.",
        sampleEn: "After start you read the cause register: an RTC wakeup is a planned cycle, a watchdog is an emergency hang with a different recovery path; you do not use the watchdog as a one-minute alarm.",
      },
      {
        slug: "emb-peri-clock-gating",
        titleUk: "Тактування периферії й піни в сонному режимі",
        titleEn: "Peripheral clocks and pins in sleep",
        difficulty: 2,
        pointsUk: ["Вимикайте такти невикористовуваної периферії", "Піни — не плаваючі, підтяжки — до живого живлення", "Порядок вимкнення й увімкнення зворотний"],
        pointsEn: ["Gate clocks of unused peripherals", "Pins must not float; pull-ups go to a live rail", "The off and on sequences are reverses of each other"],
        conceptUk: "Невикористовуваний UART, ADC чи таймер зі увімкненим тактом споживає більше, ніж ядро в idle. Перед сном вимикають такти в RCC, переводять піни в Analog або в визначений рівень (не плаваючий вхід, що ловить наводки і тягне буфери). Підтяжки до живлення, яке ви вимикаєте, стають шляхами витоку. DMA теж треба коректно зупинити. Послідовність: зупинити передачу, дочекатись кінця кадру, вимкнути периферію, потім такти, потім WFI. Після пробудження — зворотний порядок. Документуйте «карту сну» плати.",
        conceptEn: "An unused UART, ADC, or timer with its clock on draws more than the core in idle. Before sleep you gate clocks in the RCC and put pins in Analog or at a defined level (not a floating input that picks up noise and drives buffers). Pull-ups to a rail you are turning off become leak paths. DMA must be stopped cleanly too. The sequence: stop the transfer, wait for the end of the frame, disable the peripheral, then the clocks, then WFI. After wake — the reverse order. Document a 'sleep map' of the board.",
        code: "uart_wait_idle();\nUSART1->CR1 &= ~UE;\nRCC->APB2ENR &= ~USART1EN;\nconfig_pins_analog();\n__WFI();",
        language: "cpp",
        retrieval: [
          { kind: "mcq", promptUk: "Чому плаваючий вхід GPIO збільшує струм у Stop?", promptEn: "Why does a floating GPIO input increase current in Stop?", options: ["наводки змушують вхідні буфери перемикатись і споживати", "плаваючий пін заборонений специфікацією USB", "Stop тоді не вмикається", "WFI ігнорує GPIO"], correctIndex: 0, explanationUk: "Фіксуйте рівень або режим Analog.", explanationEn: "Fix the level or use Analog mode." },
          { kind: "fill", promptUk: "Допишіть інструкцію очікування переривання / сну ядра", promptEn: "Fill in the wait-for-interrupt / core sleep instruction", language: "cpp", code: "__asm volatile (\"___\");", accepted: ["wfi", "WFI", "wfe", "WFE"], caseSensitive: true, explanationUk: "WFI — wait for interrupt.", explanationEn: "WFI is wait for interrupt." },
          { kind: "mcq", promptUk: "Що не так, якщо підтяжка піна йде на лінію, яку LDO вимикає в сон?", promptEn: "What is wrong if a pin's pull-up goes to a rail the LDO turns off in sleep?", options: ["з'являється шлях витоку через внутрішні діоди/підтяжку до «мертвого» живлення", "так завжди економлять струм", "LDO тоді працює ефективніше", "це обов'язковий патерн STM32"], correctIndex: 0, explanationUk: "Підтягуйте до домену, що лишається живим.", explanationEn: "Pull up to a domain that stays alive." }
        ],
        whyUk: "Яка послідовність вимкнення UART перед глибоким сном?",
        whyEn: "What is the shutdown sequence for a UART before deep sleep?",
        ideas: [{ labelUk: "доробити кадр", labelEn: "finish the frame", anyOf: ["кадр", "frame", "передач", "transfer", "dma"] }, { labelUk: "вимкнути периферію і такт", labelEn: "disable the peripheral and the clock", anyOf: ["такт", "clock", "rcc", "gate", "uart"] }, { labelUk: "піни й WFI", labelEn: "pins and WFI", anyOf: ["пин", "pin", "analog", "wfi", "підтяж", "pull"] }],
        sampleUk: "Спочатку завершують кадр і DMA, вимикають UART і його такт, фіксують піни й підтяжки до живого домену, потім WFI; пробудження йде у зворотному порядку.",
        sampleEn: "First you finish the frame and DMA, disable the UART and its clock, fix pins and pull-ups to a live domain, then WFI; wake is the reverse order.",
      }
    ],
    "Контрольна: живлення",
    "Exam: power",
    [
      { promptUk: "Цифра струму з даташита в sleep…", promptEn: "The datasheet sleep-current figure is…", options: ["ідеал ядра; плата з підтяжками споживає більше", "завжди точний струм виробу", "включає всі світлодіоди", "виміряна з підключеним SWD завжди"], correctIndex: 0, explanationUk: "Міряйте виріб.", explanationEn: "Measure the product." },
      { promptUk: "IWDG як хвилинний будильник телеметрії…", promptEn: "IWDG as a one-minute telemetry alarm is…", options: ["погана ідея: watchdog для зависань, період — RTC", "рекомендований патерн", "єдиний таймер Cortex-M", "точніший за RTC завжди"], correctIndex: 0, explanationUk: "Різне призначення.", explanationEn: "Different purposes." },
      { promptUk: "Плаваючі GPIO у Stop…", promptEn: "Floating GPIO in Stop…", options: ["збільшують струм через перемикання буферів", "обов'язкові для пробудження", "вимикають LDO", "зменшують latency ISR"], correctIndex: 0, explanationUk: "Фіксуйте рівень.", explanationEn: "Fix the level." },
      { promptUk: "Після Stop перед повним UART треба…", promptEn: "After Stop, before a full-speed UART you must…", options: ["відновити дерево тактів", "нічого не робити", "стерти Flash", "підняти BASEPRI назавжди"], correctIndex: 0, explanationUk: "Тактова деревина скинута.", explanationEn: "The clock tree was reset." },
      { promptUk: "Підтяжка до живлення, яке LDO вимикає в сон…", promptEn: "A pull-up to a rail the LDO turns off in sleep is…", options: ["шлях витоку; підтягуйте до живого домену", "найкращий спосіб економії", "обов'язкова для RTC", "вимикає watchdog"], correctIndex: 0, explanationUk: "Живі домени для підтяжок.", explanationEn: "Live domains for pull-ups." },
      { promptUk: "Watchdog як єдиний планувальник телеметрії…", promptEn: "A watchdog as the only telemetry scheduler is…", options: ["погана практика: для періоду — RTC wakeup", "точніший за будь-який RTC", "єдиний дозволений таймер", "замінює GPIO пробудження"], correctIndex: 0, explanationUk: "Різні ролі джерел.", explanationEn: "Different roles for sources." }
    ],
  ),
  sectionUnit(
    "bootloader_ota",
    "Бутлоадер, OTA і відкат",
    "Bootloader, OTA, and rollback",
    [
      {
        slug: "emb-ab-slots",
        titleUk: "Два слоти прошивки: активний і запасний",
        titleEn: "Two firmware slots: active and spare",
        difficulty: 3,
        pointsUk: ["Пишуть у неактивний слот, підтверджує вже новий код", "Немає підтвердження — відкат", "Один банк без запасу — ризик цегли"],
        pointsEn: ["You write to the inactive slot; the new code itself confirms", "No confirmation means rollback", "A single bank with no spare risks a brick"],
        conceptUk: "Схема A/B (або активний + кандидат) тримає дві копії застосунку в різних регіонах флеш. Бутлоадер стартує останній підтверджений слот. Новий образ пишуть у неактивний, перевіряють підпис і CRC, перемикають вказівник, але «підтвердження» (mark good) робить уже новий код після самоперевірки. Якщо підтвердження немає за таймаут або watchdog — бутлоадер відкочує попередній слот. Один банк «стерти й надіятись» без запасу залишає цеглу при обриві живлення посередині запису.",
        conceptEn: "An A/B scheme (or active + candidate) keeps two copies of the application in different flash regions. The bootloader starts the last confirmed slot. A new image is written to the inactive one, signature and CRC are checked, the pointer is switched, but 'mark good' is done by the new code itself after a self-check. If confirmation does not arrive before a timeout or a watchdog, the bootloader rolls back to the previous slot. A single bank 'erase and hope' with no spare bricks the device if power drops mid-write.",
        code: "// boot: if !slot[next].confirmed && slot[next].pending && timed_out: boot slot[prev];",
        language: "cpp",
        retrieval: [
          { kind: "mcq", promptUk: "Хто має виставити позначку «образ добрий» у схемі A/B?", promptEn: "Who should set the 'image good' mark in an A/B scheme?", options: ["новий застосунок після успішної самоперевірки, не бутлоадер одразу після копіювання", "завжди лише хост у момент завантаження", "CRC в бутлоадері вже достатньо як підтвердження роботи периферії", "позначка не потрібна, якщо є два слоти"], correctIndex: 0, explanationUk: "CRC не доводить, що новий код вміє тримати радіо.", explanationEn: "A CRC does not prove the new code can hold the radio." },
          { kind: "fill", promptUk: "Допишіть стратегію двох банків прошивки", promptEn: "Fill in the two-bank firmware strategy", language: "cpp", code: "// slot ___ / slot B, boot confirmed", accepted: ["A"], caseSensitive: true, explanationUk: "Схема A/B.", explanationEn: "An A/B scheme." },
          { kind: "mcq", promptUk: "Чому запис нового образу поверх єдиного банку під час OTA небезпечний?", promptEn: "Why is writing a new image over a single bank during OTA dangerous?", options: ["обрив живлення залишає неповний образ без робочого запасу", "флеш не можна писати взагалі", "два слоти заборонені стандартом", "CRC тоді не обчислюється"], correctIndex: 0, explanationUk: "Потрібен запасний валідний образ.", explanationEn: "You need a spare valid image." }
        ],
        whyUk: "Що відбувається, якщо новий образ зависає одразу після першого старту?",
        whyEn: "What happens if a new image hangs right after first boot?",
        ideas: [{ labelUk: "немає mark good", labelEn: "no mark good", anyOf: ["підтверд", "confirm", "mark", "good", "таймаут"] }, { labelUk: "відкат бутлоадера", labelEn: "bootloader rollback", anyOf: ["відкат", "rollback", "слот", "slot", "watchdog"] }, { labelUk: "не єдиний банк", labelEn: "not a single bank", anyOf: ["цегл", "brick", "банк", "bank", "живлен", "power"] }],
        sampleUk: "Якщо новий код не підтвердить себе, бутлоадер після таймауту або watchdog відкотить попередній слот; запис поверх єдиного банку при обриві живлення лишає цеглу.",
        sampleEn: "If the new code does not confirm itself, the bootloader rolls back to the previous slot after a timeout or watchdog; writing over a single bank with a power drop leaves a brick.",
      },
      {
        slug: "emb-image-sign",
        titleUk: "Підпис образу, CRC і відмова від непідписаного",
        titleEn: "Image signature, CRC, and refusing the unsigned",
        difficulty: 3,
        pointsUk: ["CRC — цілісність, підпис — автентичність", "Непідписане відхиляють і в лабораторії", "Anti-rollback проти накату старої вразливої версії"],
        pointsEn: ["CRC is integrity, a signature is authenticity", "Unsigned images are rejected in the lab too", "Anti-rollback against flashing an old vulnerable version"],
        conceptUk: "CRC або SHA ловить випадкове пошкодження, але не зловмисника: він перерахує CRC. Автентичність дає підпис (ECDSA, Ed25519) ключем виробника; відкритий ключ — у бутлоадері, який сам не оновлюється або оновлюється ще суворіше. Непідписаний або невірний образ відхиляють, навіть «з USB в лабораторії», інакше цей шлях лишиться в полі. Ключ не тримають у репозиторії прошивки пристрою. Версія образу не повинна зменшуватись (anti-rollback), щоб не накатали відому вразливу збірку. Метадані (розмір, версія, хеш) входять у підписаний блок.",
        conceptEn: "A CRC or SHA catches accidental corruption, but not an attacker: they can recompute the CRC. Authenticity is a signature (ECDSA, Ed25519) with the vendor key; the public key lives in the bootloader, which is not updated, or is updated even more strictly. An unsigned or invalid image is rejected, even 'from USB in the lab', or that path will remain in the field. The private key is not kept in the device firmware repository. The image version must not decrease (anti-rollback), so a known-vulnerable build cannot be flashed. Metadata (size, version, hash) is inside the signed block.",
        code: "if (!verify_sig(pub, meta, image) || image.version < min_version) reject();",
        language: "cpp",
        retrieval: [
          { kind: "mcq", promptUk: "Чому самої CRC32 недостатньо для OTA в полі?", promptEn: "Why is CRC32 alone not enough for OTA in the field?", options: ["нападник може змінити образ і підігнати CRC", "CRC не ловить випадкові помилки біта", "флеш не зберігає CRC", "підпис повільніший, отже гірший завжди"], correctIndex: 0, explanationUk: "CRC не є криптографічною автентичністю.", explanationEn: "A CRC is not cryptographic authenticity." },
          { kind: "fill", promptUk: "Допишіть політику заборони зменшення версії", promptEn: "Fill in the policy that forbids decreasing the version", language: "cpp", code: "// ___-rollback: reject image.version < current", accepted: ["anti", "Anti"], caseSensitive: true, explanationUk: "Політика — anti-rollback.", explanationEn: "The policy is anti-rollback." },
          { kind: "mcq", promptUk: "Де зберігати приватний ключ підпису образів?", promptEn: "Where should the private key that signs images be stored?", options: ["у захищеному контурі збірки виробника, не в репозиторії прошивки пристрою", "у відкритому репозиторії поруч із бутлоадером «для зручності»", "у кожному пристрої однаковий приватний", "у тексті цього уроку"], correctIndex: 0, explanationUk: "На пристрої лише відкритий ключ перевірки.", explanationEn: "Only the public verify key is on the device." }
        ],
        whyUk: "Що перевіряє бутлоадер перед запуском щойно записаного слота?",
        whyEn: "What does the bootloader verify before starting a newly written slot?",
        ideas: [{ labelUk: "підпис і хеш", labelEn: "signature and hash", anyOf: ["підпис", "signature", "ecdsa", "хеш", "hash", "crc"] }, { labelUk: "версія не нижча", labelEn: "version not lower", anyOf: ["anti-rollback", "версі", "version", "вразлив"] }, { labelUk: "відмова непідписаного", labelEn: "refusal of the unsigned", anyOf: ["непідпис", "unsigned", "відхил", "reject"] }],
        sampleUk: "Бутлоадер перевіряє підпис, хеш і що версія не нижча за поточну; CRC сама не зупинить підміну, а непідписаний образ відхиляють і в лабораторії.",
        sampleEn: "The bootloader checks the signature, the hash, and that the version is not lower than the current one; a CRC alone will not stop a substitution, and an unsigned image is rejected in the lab too.",
      },
      {
        slug: "emb-ota-atomic",
        titleUk: "Атомарне перемикання й буфер завантаження",
        titleEn: "Atomic switchover and the download buffer",
        difficulty: 3,
        pointsUk: ["Качають у запас, активний образ не чіпають", "Прапорець слота оновлюють атомарно після перевірки", "Докачка й стійкість до обриву живлення під час program"],
        pointsEn: ["You download into the spare; the active image is not touched", "The slot flag is updated atomically after verify", "Resume and survival of a power drop during program"],
        conceptUk: "Завантаження OTA йде в буфер (другий слот або зовнішній NOR): обрив мережі не чіпає активний образ. Лише після повної перевірки атомарно оновлюють metadata (подвійний запис або журналювання), бо стертий посередині сектор прапорця лишає невизначений стан. Живлення під час erase/program флеш — найгірший момент: схема має витримати, бутлоадер — зрозуміти незавершений запис. Прогрес (який пакет прийнято) зберігають, щоб докачати, не починати з нуля. Після успіху старий слот можна лишити до наступного оновлення як відкат.",
        conceptEn: "An OTA download goes into a buffer (the second slot or external NOR): a network drop does not touch the active image. Only after a full verify do you atomically update metadata (a dual write or a journal), because a flag sector erased mid-way leaves an undefined state. Power during a flash erase/program is the worst moment: the design must survive it, and the bootloader must understand a partial write. Progress (which packet was received) is stored so you can resume, not start from zero. After success the old slot can stay until the next update as a rollback.",
        code: "// write image to slot B; if verify(B): atomic_set(boot=B, pending=1); // A stays until mark_good",
        language: "cpp",
        retrieval: [
          { kind: "mcq", promptUk: "Коли безпечно перемкнути вказівник «завантажувати слот B»?", promptEn: "When is it safe to switch the 'boot slot B' pointer?", options: ["після повного запису, CRC і підпису, атомарним записом метаданих", "на першому прийнятому пакеті, «щоб швидше»", "під час erase сектора образу", "коли мережа лише почала сесію"], correctIndex: 0, explanationUk: "Спочатку валідний образ, потім вказівник.", explanationEn: "A valid image first, then the pointer." },
          { kind: "fill", promptUk: "Допишіть докачку з збереженого зсуву", promptEn: "Fill in a resume from a saved offset", language: "cpp", code: "uint32_t off = load_progress();  request_range(off, ___ - off);", accepted: ["total", "image_size", "size"], caseSensitive: true, explanationUk: "Прогрес дозволяє не починати з нуля.", explanationEn: "Progress lets you avoid starting at zero." },
          { kind: "mcq", promptUk: "Що має зробити бутлоадер, побачивши стертий (0xFF) сектор прапорця після обриву живлення?", promptEn: "What should the bootloader do if it sees an erased (0xFF) flag sector after a power drop?", options: ["вважати перемикання незавершеним і стартувати останній підтверджений слот", "запустити будь-який слот навмання", "стерети обидва слоти", "чекати мережі без таймауту"], correctIndex: 0, explanationUk: "Невизначений прапорець ≠ новий образ валідний.", explanationEn: "An undefined flag does not mean the new image is valid." }
        ],
        whyUk: "Як зробити OTA стійким до обриву мережі й живлення?",
        whyEn: "How do you make OTA robust to a drop of network and of power?",
        ideas: [{ labelUk: "запис у запасний слот", labelEn: "write to the spare slot", anyOf: ["запас", "spare", "активн", "active", "буфер"] }, { labelUk: "атомарні метадані", labelEn: "atomic metadata", anyOf: ["атомар", "atomic", "прапор", "flag", "журнал", "journal"] }, { labelUk: "докачка й відкат", labelEn: "resume and rollback", anyOf: ["докач", "resume", "живлен", "power", "відкат"] }],
        sampleUk: "Образ качають у запасний слот із докачкою, вказівник перемикають атомарно лише після перевірки, а після обриву живлення бутлоадер стартує останній підтверджений слот.",
        sampleEn: "The image is downloaded into the spare slot with resume, the pointer is switched atomically only after verify, and after a power drop the bootloader starts the last confirmed slot.",
      }
    ],
    "Контрольна: бутлоадер і OTA",
    "Exam: bootloader and OTA",
    [
      { promptUk: "Позначку «образ добрий» виставляє…", promptEn: "The 'image good' mark is set by…", options: ["новий застосунок після самоперевірки", "бутлоадер одразу після копіювання байтів", "перший мережевий пакет", "CRC без запуску коду"], correctIndex: 0, explanationUk: "CRC не доводить роботу радіо.", explanationEn: "A CRC does not prove the radio works." },
      { promptUk: "CRC без підпису…", promptEn: "A CRC without a signature…", options: ["не зупиняє навмисну підміну", "достатня автентичність у полі", "замінює anti-rollback", "зберігає приватний ключ"], correctIndex: 0, explanationUk: "Потрібен підпис виробника.", explanationEn: "You need the vendor signature." },
      { promptUk: "Запис OTA поверх єдиного банку…", promptEn: "An OTA write over a single bank is…", options: ["ризик цегли при обриві живлення", "надійніший за A/B", "обов'язковий для підпису", "єдиний спосіб anti-rollback"], correctIndex: 0, explanationUk: "Потрібен запасний валідний образ.", explanationEn: "You need a spare valid image." },
      { promptUk: "Anti-rollback забороняє…", promptEn: "Anti-rollback forbids…", options: ["накат образу зі старішою версією", "підпис ECDSA", "два слоти", "докачку"], correctIndex: 0, explanationUk: "Відомі вразливі збірки не повертають.", explanationEn: "Known-vulnerable builds are not restored." },
      { promptUk: "Непідписаний образ лише в лабораторії…", promptEn: "An unsigned image only in the lab is…", options: ["небезпечний шлях, який лишиться в полі — відхиляйте завжди", "рекомендований для відладки назавжди", "замінює CRC", "потрібний для A/B"], correctIndex: 0, explanationUk: "Той самий бутлоадер, що і в полі.", explanationEn: "The same bootloader as in the field." },
      { promptUk: "Метадані слота після повної перевірки оновлюють…", promptEn: "Slot metadata after a full verify is updated…", options: ["атомарно (подвійний запис або журнал)", "на першому пакеті мережі", "під час erase образу", "лише в RAM без флеш"], correctIndex: 0, explanationUk: "Інакше обрив живлення лишає невизначений прапорець.", explanationEn: "Otherwise a power drop leaves an undefined flag." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandEmbeddedCpp(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
