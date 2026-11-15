import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "buffers_bytes",
    "Буфери, байти й кодування",
    "Buffers, bytes, and encodings",
    [
      {
        slug: "nf-buffer-alloc",
        titleUk: "Buffer.alloc проти неініціалізованої пам'яті",
        titleEn: "Buffer.alloc versus uninitialized memory",
        difficulty: 3,
        pointsUk: ["alloc занулює пам'ять, allocUnsafe — ні", "Unsafe лише якщо ви одразу все перезаписуєте", "Довжина буфера — байти, не символи"],
        pointsEn: ["alloc zeroes memory, allocUnsafe does not", "Unsafe only if you immediately overwrite everything", "Buffer length is bytes, not characters"],
        conceptUk: "Buffer.alloc(n) виділяє n байт і заповнює їх нулями: безпечно для даних, які потім віддаєте клієнту. Buffer.allocUnsafe(n) швидший, бо не затирає попередній вміст пулу — там можуть лишитися чужі дані процесу. allocUnsafe доречний, коли ви одразу повністю перезаписуєте буфер (наприклад, читання з сокета в цей самий буфер). Buffer.from(string, encoding) копіює вже відомі байти. Не плутайте довжину буфера в байтах із довжиною рядка в кодових точках: кирилиця в UTF-8 займає по два байти й більше.",
        conceptEn: "Buffer.alloc(n) allocates n bytes and fills them with zeros: safe for data you later send to a client. Buffer.allocUnsafe(n) is faster because it does not wipe the previous pool contents — leftover data from the process may remain. allocUnsafe is appropriate when you immediately overwrite the whole buffer (for example, a socket read into that same buffer). Buffer.from(string, encoding) copies already-known bytes. Do not confuse buffer length in bytes with string length in code points: Cyrillic in UTF-8 takes two or more bytes each.",
        code: "const safe = Buffer.alloc(16);\nconst fast = Buffer.allocUnsafe(16);\nfast.fill(0); // if you must start clean",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чим Buffer.allocUnsafe небезпечний, якщо буфер віддати клієнту частково незаписаним?", promptEn: "Why is Buffer.allocUnsafe dangerous if a partially unwritten buffer is sent to a client?", options: ["у незаписаних байтах можуть бути чужі дані процесу", "allocUnsafe заборонений у Node", "буфер завжди порожній рядок", "UTF-8 тоді не діє"], correctIndex: 0, explanationUk: "Пам'ять з пулу не затирається.", explanationEn: "Pool memory is not wiped." },
          { kind: "fill", promptUk: "Допишіть безпечне виділення 16 нульових байт", promptEn: "Fill in a safe allocation of 16 zeroed bytes", language: "javascript", code: "const buf = Buffer.___(16);", accepted: ["alloc"], caseSensitive: true, explanationUk: "Безпечний конструктор — alloc.", explanationEn: "The safe constructor is alloc." },
          { kind: "output", promptUk: "Скільки байти займає рядок привіт у UTF-8?", promptEn: "How many bytes does the string pryvit occupy in UTF-8?", language: "javascript", code: "Buffer.byteLength('привіт', 'utf8')", options: ["12, бо кожна літера кирилиці — 2 байти", "6, як length рядка", "0", "16 завжди"], correctIndex: 0, explanationUk: "Кирилиця в UTF-8 — переважно по 2 байти.", explanationEn: "Cyrillic in UTF-8 is mostly 2 bytes each." }
        ],
        whyUk: "Коли обрати allocUnsafe замість alloc?",
        whyEn: "When should you pick allocUnsafe instead of alloc?",
        ideas: [{ labelUk: "повний перезапис", labelEn: "full overwrite", anyOf: ["перезапис", "overwrite", "сокет", "socket", "весь", "whole"] }, { labelUk: "витік даних", labelEn: "data leak", anyOf: ["витік", "leak", "чуж", " leftover", "пул", "pool", "unsafe"] }, { labelUk: "байти не символи", labelEn: "bytes not characters", anyOf: ["байт", "byte", "символ", "character", "utf"] }],
        sampleUk: "allocUnsafe швидший, бо не занулює пул, і доречний лише коли ви одразу повністю перезаписуєте буфер; інакше клієнт може побачити чужі дані, а довжину міряють у байтах, не в символах.",
        sampleEn: "allocUnsafe is faster because it does not zero the pool, and is appropriate only when you immediately overwrite the whole buffer; otherwise a client may see leftover data, and length is measured in bytes, not characters.",
      },
      {
        slug: "nf-uint8-view",
        titleUk: "Buffer і Uint8Array: один клас, різні очікування",
        titleEn: "Buffer and Uint8Array: one class, different expectations",
        difficulty: 3,
        pointsUk: ["Buffer є Uint8Array", "Buffer.slice — вигляд на ту саму пам'ять, не копія", "Віддаючи ArrayBuffer, враховуйте byteOffset"],
        pointsEn: ["Buffer is a Uint8Array", "Buffer.slice is a view of the same memory, not a copy", "When handing over an ArrayBuffer, account for byteOffset"],
        conceptUk: "У сучасній Node.js Buffer успадковує Uint8Array: це типізований масив байтів, не звичайний Array. slice у Buffer повертає вигляд на ту саму пам'ять (як subarray), тоді як TypedArray.prototype.slice копіює. Підпослідовність, яку ви змінюєте, може змінити вихідний буфер — для копії використовуйте Buffer.from або subarray плюс явна копія. Передача Buffer у Web API, що очікує ArrayBuffer, іноді вимагає buf.buffer з урахуванням byteOffset: увесь underlying ArrayBuffer може бути більшим за ваш шматок.",
        conceptEn: "In modern Node.js, Buffer extends Uint8Array: it is a typed array of bytes, not a plain Array. Buffer.slice returns a view of the same memory (like subarray), whereas TypedArray.prototype.slice copies. A subsequence you mutate may change the original buffer — for a copy use Buffer.from, or subarray plus an explicit copy. Passing a Buffer into a Web API that expects an ArrayBuffer sometimes requires buf.buffer with byteOffset in mind: the underlying ArrayBuffer may be larger than your slice.",
        code: "const a = Buffer.from('hello');\nconst v = a.slice(0, 2);\nv[0] = 90; // also changes a",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що робить Buffer.slice порівняно з TypedArray.slice?", promptEn: "What does Buffer.slice do compared with TypedArray.slice?", options: ["повертає вигляд на ту саму пам'ять, не копію", "завжди глибоко копіює", "повертає рядок", "виділяє новий unsafe буфер з нулів"], correctIndex: 0, explanationUk: "Історична поведінка Buffer.slice — view.", explanationEn: "The historical Buffer.slice behaviour is a view." },
          { kind: "fill", promptUk: "Допишіть безпечну копію буфера", promptEn: "Fill in a safe copy of a buffer", language: "javascript", code: "const copy = Buffer.___(other);", accepted: ["from", "alloc"], caseSensitive: true, explanationUk: "Buffer.from копіює байти.", explanationEn: "Buffer.from copies the bytes." },
          { kind: "read", promptUk: "Чому передача buf.buffer у WebCrypto може бути ширшою за buf?", promptEn: "Why can passing buf.buffer into WebCrypto be wider than buf?", language: "javascript", code: "crypto.subtle.digest('SHA-256', buf.buffer);", options: ["underlying ArrayBuffer спільний і може виходити за byteOffset і length", "buf.buffer завжди точно length байт", "WebCrypto ігнорує буфери", "це копіює лише ASCII"], correctIndex: 0, explanationUk: "Використовуйте subarray або new Uint8Array(buf).", explanationEn: "Use subarray or new Uint8Array(buf)." }
        ],
        whyUk: "Чому мутація результату Buffer.slice може змінити вихідний буфер?",
        whyEn: "Why can mutating the result of Buffer.slice change the original buffer?",
        ideas: [{ labelUk: "спільна пам'ять", labelEn: "shared memory", anyOf: ["спільн", "shared", "пам'ят", "memory", "view", "вигляд"] }, { labelUk: "не копія", labelEn: "not a copy", anyOf: ["копі", "copy", "slice", "from"] }, { labelUk: "byteOffset", labelEn: "byteOffset", anyOf: ["offset", "arraybuffer", "underlying"] }],
        sampleUk: "Buffer.slice віддає вигляд на ту саму пам'ять, тому запис у зріз змінює вихідний буфер; для незалежної копії беріть Buffer.from і пам'ятайте про byteOffset, віддаючи underlying ArrayBuffer.",
        sampleEn: "Buffer.slice yields a view of the same memory, so a write into the slice changes the original buffer; take Buffer.from for an independent copy, and remember byteOffset when handing over the underlying ArrayBuffer.",
      },
      {
        slug: "nf-encodings",
        titleUk: "Кодування: utf8, base64, hex і «бінарний рядок»",
        titleEn: "Encodings: utf8, base64, hex, and the binary string",
        difficulty: 2,
        pointsUk: ["utf8 декодує Unicode, на межі чанка потрібен стрім-декодер", "base64 і hex — транспортні текстові форми байтів", "latin1 — один байт на символ, не UTF-8"],
        pointsEn: ["utf8 decodes Unicode; chunk edges need a streaming decoder", "base64 and hex are textual transport forms of bytes", "latin1 is one byte per character, not UTF-8"],
        conceptUk: "Buffer.toString('utf8') декодує байти як Unicode; неповний багатобайтовий символ на межі чанка дає replacement character, якщо не користуватись стрімом-декодером. 'base64' і 'hex' — текстові форми тих самих байтів для транспорту. 'latin1' (і історичний 'binary') зберігає один байт на символ 0–255: це не UTF-8 і не «просто бінарне», а однобайтове відображення. Змішування utf8 і latin1 — типова причина «кракозябр». Для файлів завжди фіксуйте encoding явно; fs читає буфер, якщо encoding не задано.",
        conceptEn: "Buffer.toString('utf8') decodes bytes as Unicode; an incomplete multibyte character at a chunk boundary becomes a replacement character unless you use a streaming decoder. base64 and hex are textual forms of the same bytes for transport. latin1 (and the historical binary) stores one byte per character 0–255: it is not UTF-8 and not 'just binary', it is a one-byte mapping. Mixing utf8 and latin1 is a typical cause of mojibake. For files, always set encoding explicitly; fs returns a buffer if encoding is omitted.",
        code: "const { StringDecoder } = require('string_decoder');\nconst dec = new StringDecoder('utf8');\npush(dec.write(chunk));",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що станеться, якщо розрізати UTF-8 чанк посередині символу і викликати toString('utf8') на кожному чанку окремо?", promptEn: "What happens if you split a UTF-8 chunk mid-character and call toString('utf8') on each chunk alone?", options: ["можна отримати символ заміни замість правильної літери", "Node завжди склеїть символи сам", "буфер стане hex", "помилка компіляції"], correctIndex: 0, explanationUk: "Потрібен StringDecoder або TextDecoder з потоком.", explanationEn: "You need StringDecoder or a streaming TextDecoder." },
          { kind: "fill", promptUk: "Допишіть кодування для hex-ряду", promptEn: "Fill in the encoding for a hex string", language: "javascript", code: "buf.toString('___')", accepted: ["hex"], caseSensitive: true, explanationUk: "Ім'я кодування — hex.", explanationEn: "The encoding name is hex." },
          { kind: "mcq", promptUk: "Чим latin1 відрізняється від utf8?", promptEn: "How does latin1 differ from utf8?", options: ["один байт на символ 0–255, без багатобайтових послідовностей Unicode", "це синонім utf8", "latin1 зберігає лише кирилицю", "latin1 заборонений у Buffer"], correctIndex: 0, explanationUk: "Це однобайтове відображення.", explanationEn: "It is a one-byte mapping." }
        ],
        whyUk: "Чому не можна сліпо викликати toString('utf8') на кожному мережевому чанку?",
        whyEn: "Why should you not blindly call toString('utf8') on every network chunk?",
        ideas: [{ labelUk: "межа символу", labelEn: "character boundary", anyOf: ["меж", "boundary", "чанк", "chunk", "багатобайт", "multibyte"] }, { labelUk: "символ заміни", labelEn: "replacement character", anyOf: ["замін", "replacement", "декодер", "decoder"] }, { labelUk: "стрімовий декодер", labelEn: "streaming decoder", anyOf: ["stringdecoder", "textdecoder", "stream"] }],
        sampleUk: "Чанк може розрізати багатобайтовий символ UTF-8 навпіл, і окремий toString дасть символ заміни; використовуйте стрімовий декодер і не плутайте utf8 з latin1.",
        sampleEn: "A chunk may split a multibyte UTF-8 character, and a lone toString will yield a replacement character; use a streaming decoder and do not mix utf8 with latin1.",
      }
    ],
    "Контрольна: буфери",
    "Exam: buffers",
    [
      { promptUk: "Buffer.alloc на відміну від allocUnsafe…", promptEn: "Unlike allocUnsafe, Buffer.alloc…", options: ["занулює виділену пам'ять", "швидший, бо не затирає пул", "повертає рядок", "не існує в Node 20"], correctIndex: 0, explanationUk: "Безпека за замовчуванням.", explanationEn: "Safety by default." },
      { promptUk: "Buffer.slice повертає…", promptEn: "Buffer.slice returns…", options: ["вигляд на ту саму пам'ять", "завжди глибоку копію", "ArrayBuffer рівно тієї ж довжини без offset", "рядок utf8"], correctIndex: 0, explanationUk: "Це view.", explanationEn: "It is a view." },
      { promptUk: "Неповний символ UTF-8 на межі чанка…", promptEn: "An incomplete UTF-8 character at a chunk edge…", options: ["потребує стрімового декодера", "завжди ігнорується без наслідків", "перетворюється на hex", "ламає процес"], correctIndex: 0, explanationUk: "StringDecoder.", explanationEn: "StringDecoder." },
      { promptUk: "latin1 у Buffer — це…", promptEn: "latin1 on a Buffer is…", options: ["один байт на символ 0–255, не UTF-8", "синонім utf8", "стиснення", "шифрування"], correctIndex: 0, explanationUk: "Однобайтове відображення.", explanationEn: "A one-byte mapping." }
    ],
  ),
  sectionUnit(
    "child_process_ipc",
    "Дочірні процеси й IPC",
    "Child processes and IPC",
    [
      {
        slug: "nf-spawn-vs-exec",
        titleUk: "spawn, exec і execFile: що саме запускається",
        titleEn: "spawn, exec, and execFile: what actually runs",
        difficulty: 3,
        pointsUk: ["spawn без shell, аргументи як масив", "exec іде через shell і буферизує весь вивід", "Великий вивід — стріми spawn, не exec"],
        pointsEn: ["spawn has no shell; arguments are an array", "exec goes through a shell and buffers all output", "Large output belongs on spawn streams, not exec"],
        conceptUk: "child_process.spawn(cmd, args) запускає процес без оболонки: аргументи не інтерпретує shell, тож пробіли й метасимволи безпечніші. exec(command) навпаки запускає команду через shell і буферизує весь stdout — зручно для коротких утиліт, небезпечно якщо command склеєний з вводу користувача (ін'єкція shell). execFile як spawn, але з буферизованим виводом і без shell. shell: true у spawn повертає ризик exec. Для великого виводу завжди spawn зі стрімами, не exec: інакше легко перевищити maxBuffer і впасти.",
        conceptEn: "child_process.spawn(cmd, args) starts a process without a shell: arguments are not interpreted by a shell, so spaces and metacharacters are safer. exec(command) instead runs the command through a shell and buffers all of stdout — convenient for short utilities, dangerous if command is concatenated from user input (shell injection). execFile is like spawn, but with buffered output and no shell. shell: true on spawn brings back exec's risk. For large output always use spawn with streams, not exec: otherwise you can exceed maxBuffer and crash.",
        code: "const { spawn } = require('node:child_process');\nconst child = spawn('git', ['log', '-1'], { stdio: ['ignore', 'pipe', 'pipe'] });",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому exec(userInput) небезпечний?", promptEn: "Why is exec(userInput) dangerous?", options: ["рядок іде в shell, можна вставити метасимволи й інші команди", "exec не існує в Node", "spawn завжди небезпечніший", "stdout тоді порожній"], correctIndex: 0, explanationUk: "Це класична ін'єкція оболонки.", explanationEn: "This is classic shell injection." },
          { kind: "fill", promptUk: "Допишіть запуск без оболонки", promptEn: "Fill in a launch without a shell", language: "javascript", code: "const child = spawn('git', ['___', '-1']);", accepted: ["log", "status", "rev-parse"], caseSensitive: true, explanationUk: "Аргументи окремим масивом.", explanationEn: "Arguments as a separate array." },
          { kind: "mcq", promptUk: "Коли exec не підходить навіть для довіреної команди?", promptEn: "When is exec a poor fit even for a trusted command?", options: ["коли вивід великий і не вміщується в maxBuffer", "коли потрібен код виходу", "коли є лише один аргумент", "коли файл існує"], correctIndex: 0, explanationUk: "Буфер має ліміт, стріми — ні.", explanationEn: "The buffer has a limit; streams do not." }
        ],
        whyUk: "Чому для git log великих репозиторіїв беруть spawn, а не exec?",
        whyEn: "Why do you use spawn, not exec, for git log on large repositories?",
        ideas: [{ labelUk: "стріми, не весь буфер", labelEn: "streams, not the whole buffer", anyOf: ["стрім", "stream", "maxbuffer", "буфер"] }, { labelUk: "без shell", labelEn: "no shell", anyOf: ["shell", "оболон", "ін'єкц", "inject"] }, { labelUk: "аргументи масивом", labelEn: "arguments as an array", anyOf: ["масив", "array", "аргумент", "args"] }],
        sampleUk: "spawn без оболонки стрімить вивід і не впирається в maxBuffer, тоді як exec буферизує все через shell і небезпечний при склеюванні команди з вводу.",
        sampleEn: "spawn without a shell streams output and does not hit maxBuffer, whereas exec buffers everything through a shell and is dangerous when the command is concatenated from input.",
      },
      {
        slug: "nf-stdio-pipe",
        titleUk: "stdio: pipe, inherit, ignore і IPC-канал",
        titleEn: "stdio: pipe, inherit, ignore, and the IPC channel",
        difficulty: 3,
        pointsUk: ["pipe, inherit, ignore — різні долі stdout", "Непрочитаний pipe може зупинити дитину", "close чекає stdio, exit — лише код процесу"],
        pointsEn: ["pipe, inherit, and ignore are different fates for stdout", "An unread pipe can stall the child", "close waits for stdio; exit is only the process code"],
        conceptUk: "Опція stdio керує трьома потоками дитини й опційним каналом повідомлень. 'pipe' дає child.stdout як стрім у батькові; 'inherit' підключає ті самі fd, що в батька (зручно для CLI); 'ignore' відкидає вивід. Якщо не читати pipe-stdout, дитина може зависнути на повному каналі (backpressure). fork() додатково відкриває IPC: child.send і повідомлення 'message'. Об'єкти серіалізуються; для сокетів є sendHandle. Не змішуйте очікування exit і close: close чекає, поки закриються всі stdio.",
        conceptEn: "The stdio option controls the child's three streams and an optional message channel. pipe gives you child.stdout as a stream in the parent; inherit attaches the same fds as the parent (handy for CLIs); ignore discards output. If you do not read a piped stdout, the child can stall on a full pipe (backpressure). fork() also opens IPC: child.send and the message event. Objects are serialized; sockets can travel via sendHandle. Do not mix up exit and close: close waits until all stdio have shut.",
        code: "child.stdout.on('data', onData);\nchild.on('close', (code) => done(code));",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому дитина зі stdio pipe зависає, якщо батько не читає stdout?", promptEn: "Why does a child with stdio pipe hang if the parent never reads stdout?", options: ["канал заповнюється, спрацьовує backpressure", "spawn тоді заборонений", "Node ігнорує stdout завжди", "inherit обов'язковий"], correctIndex: 0, explanationUk: "Непрочитаний pipe має скінченний буфер.", explanationEn: "An unread pipe has a finite buffer." },
          { kind: "fill", promptUk: "Допишіть подію повного закриття потоків", promptEn: "Fill in the event for fully closed streams", language: "javascript", code: "child.on('___', () => console.log('fds done', child.exitCode));", accepted: ["close"], caseSensitive: true, explanationUk: "Подія close чекає stdio.", explanationEn: "The close event waits for stdio." },
          { kind: "mcq", promptUk: "Що дає fork на відміну від spawn('node') без IPC?", promptEn: "What does fork give you that spawn('node') without IPC does not?", options: ["канал child.send і подію message", "обов'язковий inherit", "відсутність коду виходу", "запуск через shell"], correctIndex: 0, explanationUk: "fork відкриває IPC.", explanationEn: "fork opens IPC." }
        ],
        whyUk: "Чим подія close відрізняється від exit у дочірнього процесу?",
        whyEn: "How does the close event differ from exit on a child process?",
        ideas: [{ labelUk: "stdio ще можуть бути відкриті", labelEn: "stdio may still be open", anyOf: ["stdio", "close", "exit", "потік", "stream"] }, { labelUk: "backpressure pipe", labelEn: "pipe backpressure", anyOf: ["backpressure", "pipe", "чита", "read"] }, { labelUk: "IPC send", labelEn: "IPC send", anyOf: ["send", "message", "fork", "ipc"] }],
        sampleUk: "exit сигналізує код завершення процесу, а close чекає, доки закриються всі stdio; непрочитаний pipe може зупинити дитину ще до exit через backpressure.",
        sampleEn: "exit signals the process exit code, while close waits until all stdio have shut; an unread pipe can stall the child before exit through backpressure.",
      },
      {
        slug: "nf-exit-codes",
        titleUk: "Коди виходу, сигнали й таймаут",
        titleEn: "Exit codes, signals, and timeouts",
        difficulty: 3,
        pointsUk: ["Ненульовий код — помилка за угодою, не закон", "Після сигналу code може бути null", "Подія error — процес не стартував, це не exit code"],
        pointsEn: ["A non-zero code is an error by convention, not a law", "After a signal, code may be null", "The error event means the process did not start; that is not an exit code"],
        conceptUk: "Ненульовий exit code означає помилку за узгодженням Unix, але програми самі обирають коди: перевіряйте документацію. Якщо процес убито сигналом, code може бути null, а signal — 'SIGTERM' чи 'SIGKILL'. child.kill('SIGTERM') просить завершитись чемно; якщо не реагує — повторюють SIGKILL після таймауту. timeout у exec убиває команду, spawn потребує власного таймера. Обробляйте помилку 'error' на дочірньому об'єкті (команда не знайдена) окремо від ненульового коду: тоді процес навіть не стартував.",
        conceptEn: "A non-zero exit code means an error by Unix convention, but programs choose their own codes: read the docs. If the process was killed by a signal, code may be null and signal may be SIGTERM or SIGKILL. child.kill('SIGTERM') asks it to finish politely; if it does not, SIGKILL follows after a timeout. exec's timeout kills the command; spawn needs your own timer. Handle the error event on the child object (command not found) separately from a non-zero code: then the process never even started.",
        code: "child.kill('SIGTERM');\nconst t = setTimeout(() => child.kill('SIGKILL'), 5000);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що означає exit з code null і signal SIGKILL?", promptEn: "What does an exit with code null and signal SIGKILL mean?", options: ["процес убито сигналом, а не завершився сам з кодом", "команда не знайдена", "усе пройшло успішно", "stdio ще відкриті"], correctIndex: 0, explanationUk: "Сигнал і код — різні поля.", explanationEn: "Signal and code are different fields." },
          { kind: "fill", promptUk: "Допишіть чемне завершення дитини", promptEn: "Fill in a polite termination of the child", language: "javascript", code: "child.___('SIGTERM');", accepted: ["kill"], caseSensitive: true, explanationUk: "Метод — kill із назвою сигналу.", explanationEn: "The method is kill with a signal name." },
          { kind: "mcq", promptUk: "Коли слухати подію error, а не лише exit?", promptEn: "When should you listen for the error event, not only exit?", options: ["коли бінарник не знайдено і процес не стартував", "error дублює кожен код виходу", "лише для inherit", "error означає код 0"], correctIndex: 0, explanationUk: "Нестартований процес не емітить звичайний exit з кодом команди.", explanationEn: "A process that never started does not emit a normal command exit." }
        ],
        whyUk: "Чому після child.kill('SIGTERM') інколи потрібен ще SIGKILL?",
        whyEn: "Why is SIGKILL sometimes still needed after child.kill('SIGTERM')?",
        ideas: [{ labelUk: "чемний сигнал можна ігнорувати", labelEn: "a polite signal can be ignored", anyOf: ["sigterm", "ігнор", "ignore", "чемн"] }, { labelUk: "SIGKILL не перехопити", labelEn: "SIGKILL cannot be caught", anyOf: ["sigkill", "таймаут", "timeout"] }, { labelUk: "code і signal", labelEn: "code and signal", anyOf: ["null", "signal", "code", "exit"] }],
        sampleUk: "SIGTERM можна обробити або ігнорувати, тому після таймауту надсилають SIGKILL, який не перехопити; у події exit тоді code може бути null, а поле signal — назва сигналу.",
        sampleEn: "SIGTERM can be handled or ignored, so after a timeout you send SIGKILL, which cannot be caught; the exit event may then have a null code and the signal name in the signal field.",
      }
    ],
    "Контрольна: дочірні процеси",
    "Exam: child processes",
    [
      { promptUk: "exec небезпечний з вводом користувача, бо…", promptEn: "exec is dangerous with user input because…", options: ["команда йде через shell", "spawn тоді вимикається", "stdout бінарний", "немає коду виходу"], correctIndex: 0, explanationUk: "Ін'єкція оболонки.", explanationEn: "Shell injection." },
      { promptUk: "Непрочитаний stdout зі stdio pipe…", promptEn: "Unread stdout with stdio pipe…", options: ["може зупинити дитину через backpressure", "автоматично йде в /dev/null", "піднімає код 0", "заборонений у fork"], correctIndex: 0, explanationUk: "Читайте стрім або ignore.", explanationEn: "Read the stream or use ignore." },
      { promptUk: "Подія close на відміну від exit…", promptEn: "The close event, unlike exit,…", options: ["чекає закриття всіх stdio", "означає, що процес не стартував", "замінює SIGKILL", "буферизує stdout"], correctIndex: 0, explanationUk: "Спочатку процес, потім дескриптори.", explanationEn: "Process first, then descriptors." },
      { promptUk: "Подія error на child означає…", promptEn: "The error event on a child means…", options: ["процес часто навіть не стартував (наприклад, немає бінарника)", "успішний код 0", "закрито stdio", "отримано SIGTERM"], correctIndex: 0, explanationUk: "Окремий шлях від exit.", explanationEn: "A path separate from exit." }
    ],
  ),
  sectionUnit(
    "workers_threads",
    "Worker threads і спільна пам'ять",
    "Worker threads and shared memory",
    [
      {
        slug: "nf-worker-threads",
        titleUk: "worker_threads: коли не child_process",
        titleEn: "worker_threads: when not child_process",
        difficulty: 3,
        pointsUk: ["Воркери для CPU, не для заміни асинхронного I/O", "Окремий isolate: пам'ять модулів множиться", "workerData клонується, великі буфери — transferList"],
        pointsEn: ["Workers are for CPU, not as a substitute for async I/O", "A separate isolate: module memory multiplies", "workerData is cloned; large buffers use transferList"],
        conceptUk: "worker_threads запускає додатковий поток V8 у тому ж процесі: немає окремого адресного простору, зате можна передати SharedArrayBuffer. Це для CPU-важких задач (парсинг, крипт, зображення), не для паралельних мережевих запитів — подієве коло вже непогано обслуговує I/O. Кожен worker має власний isolate і свій модульний кеш: імпорт важкого модуля в N воркерів коштує N разів пам'яті. workerData передає стартові дані клонуванням; для великих буферів використовуйте transferList. Не блокуйте головний потік очікуванням join у HTTP-обробнику без черги й ліміту воркерів.",
        conceptEn: "worker_threads starts another V8 thread in the same process: there is no separate address space, but you can pass a SharedArrayBuffer. This is for CPU-heavy work (parsing, crypto, images), not for parallel network requests — the event loop already handles I/O well. Each worker has its own isolate and module cache: importing a heavy module in N workers costs N times the memory. workerData passes startup data by cloning; for large buffers use transferList. Do not block the main thread joining a worker inside an HTTP handler without a queue and a worker limit.",
        code: "const { Worker } = require('node:worker_threads');\nconst w = new Worker(new URL('./job.js', import.meta.url), { workerData: { n } });",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Коли worker_threads доречніший за ще один await fetch?", promptEn: "When is worker_threads more appropriate than another await fetch?", options: ["для важкого синхронного обчислення, що блокує подієве коло", "для будь-якого HTTP-запиту", "завжди замість Promise.all", "лише для читання файлів"], correctIndex: 0, explanationUk: "I/O вже не блокує коло, якщо не робити sync.", explanationEn: "I/O already does not block the loop if you avoid sync APIs." },
          { kind: "fill", promptUk: "Допишіть стартові дані воркера", promptEn: "Fill in the worker's startup data option", language: "javascript", code: "new Worker(url, { ___Data: { jobId } });", accepted: ["worker"], caseSensitive: true, explanationUk: "Опція — workerData.", explanationEn: "The option is workerData." },
          { kind: "mcq", promptUk: "Чому імпорт важкого модуля в кожному воркері дорогий?", promptEn: "Why is importing a heavy module in every worker expensive?", options: ["кожен isolate тримає свою копію модуля в пам'яті", "Worker забороняє import", "модулі діляться автоматично як у браузері", "це коштує лише один раз на процес"], correctIndex: 0, explanationUk: "Кеш модулів не спільний між isolate.", explanationEn: "The module cache is not shared across isolates." }
        ],
        whyUk: "Чому воркер не заміна пулу HTTP-запитів?",
        whyEn: "Why is a worker not a substitute for a pool of HTTP requests?",
        ideas: [{ labelUk: "CPU проти I/O", labelEn: "CPU versus I/O", anyOf: ["cpu", "io", "коло", "loop", "блок", "block"] }, { labelUk: "пам'ять isolate", labelEn: "isolate memory", anyOf: ["isolate", "пам'ят", "memory", "модул", "module"] }, { labelUk: "черга й ліміт", labelEn: "a queue and a limit", anyOf: ["черг", "queue", "ліміт", "limit", "пул", "pool"] }],
        sampleUk: "Воркери потрібні для CPU-роботи, що блокує подієве коло; мережевий I/O вже асинхронний, а кожен isolate множить пам'ять модулів, тому потрібні черга й ліміт, а не воркер на кожен запит.",
        sampleEn: "Workers are for CPU work that blocks the event loop; network I/O is already async, and each isolate multiplies module memory, so you want a queue and a limit, not a worker per request.",
      },
      {
        slug: "nf-message-channel",
        titleUk: "MessageChannel і порт між воркерами",
        titleEn: "MessageChannel and a port between workers",
        difficulty: 3,
        pointsUk: ["MessageChannel з'єднує два воркери напряму", "Порт передають у transferList, не клонують", "Функції структурованим клонуванням не проходять"],
        pointsEn: ["A MessageChannel connects two workers directly", "A port is sent in transferList, not cloned", "Functions do not survive structured cloning"],
        conceptUk: "Батько й воркер спілкуються через parentPort.postMessage. Для зв'язку двох воркерів без проміжного хопу через батька створюють MessageChannel: port1 передають одному, port2 — іншому (у transferList, бо порт передається, не клонується). Після transfer порт у відправника стає нейтральним (detached). Структуроване клонування копіює об'єкти; функції й прототипи не проходять. Для нульової копії великих TypedArray використовуйте transfer або SharedArrayBuffer з Atomics для синхронізації.",
        conceptEn: "Parent and worker talk through parentPort.postMessage. To connect two workers without an extra hop through the parent, you create a MessageChannel: port1 goes to one worker, port2 to the other (in transferList, because a port is transferred, not cloned). After transfer the sender's port is detached. Structured cloning copies objects; functions and prototypes do not travel. For zero-copy of large TypedArrays, use transfer or a SharedArrayBuffer with Atomics for synchronization.",
        code: "const { port1, port2 } = new MessageChannel();\nw1.postMessage({ port: port1 }, [port1]);\nw2.postMessage({ port: port2 }, [port2]);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому MessagePort кладуть у transferList, а не в звичайне поле повідомлення без transfer?", promptEn: "Why does a MessagePort go in transferList, not in a plain message field without transfer?", options: ["порт передається за власністю, після transfer у відправника він від'єднаний", "порти не можна передавати взагалі", "transferList лише для рядків", "інакше Node заблокує воркер"], correctIndex: 0, explanationUk: "Порт — transferable, не клон.", explanationEn: "A port is transferable, not a clone." },
          { kind: "fill", promptUk: "Допишіть створення каналу з двома портами", promptEn: "Fill in creating a channel with two ports", language: "javascript", code: "const { port1, port2 } = new ___();", accepted: ["MessageChannel"], caseSensitive: true, explanationUk: "Клас — MessageChannel.", explanationEn: "The class is MessageChannel." },
          { kind: "read", promptUk: "Що станеться з функцією в postMessage({ fn: () => 1 })?", promptEn: "What happens to a function in postMessage({ fn: () => 1 })?", language: "javascript", code: "parentPort.postMessage({ fn: () => 1 });", options: ["структуроване клонування не вміє функцій, буде помилка або втрата", "функція приїде з тим самим замиканням", "вона стане рядком коду", "її викличе головний потік сам"], correctIndex: 0, explanationUk: "Клонуються дані, не поведінка.", explanationEn: "Data is cloned, not behaviour." }
        ],
        whyUk: "Навіщо MessageChannel між двома воркерами, а не завжди через батька?",
        whyEn: "Why use a MessageChannel between two workers instead of always going through the parent?",
        ideas: [{ labelUk: "прямий канал", labelEn: "a direct channel", anyOf: ["прям", "direct", "канал", "channel", "hop"] }, { labelUk: "transfer порту", labelEn: "port transfer", anyOf: ["transfer", "port", "власн", "ownership"] }, { labelUk: "без функцій у повідомленні", labelEn: "no functions in the message", anyOf: ["функц", "function", "клон", "clone"] }],
        sampleUk: "MessageChannel дає прямий порт між воркерами без зайвого хопу через батька; порт передають у transferList за власністю, а функції структурованим клонуванням не проходять.",
        sampleEn: "A MessageChannel gives a direct port between workers without an extra hop through the parent; the port is transferred by ownership in transferList, and functions do not survive structured cloning.",
      },
      {
        slug: "nf-shared-array",
        titleUk: "SharedArrayBuffer і Atomics",
        titleEn: "SharedArrayBuffer and Atomics",
        difficulty: 3,
        pointsUk: ["Спільна пам'ять без копії, лише байти", "Без Atomics — гонитва даних", "Не для об'єктів JS, лише TypedArray"],
        pointsEn: ["Shared memory without a copy, bytes only", "Without Atomics you get data races", "Not for JS objects, only TypedArrays"],
        conceptUk: "SharedArrayBuffer — блок пам'яті, видимий кільком воркерам одночасно, без копіювання. Запис і читання без синхронізації дає гонитву: потрібні Atomics.wait, Atomics.notify, Atomics.compareExchange. Це низькорівневі примітиви, не черга задач. На вебі SharedArrayBuffer вимагає ізоляції (COOP/COEP); у Node це доступно в воркерах за замовчуванням обережніше. Не використовуйте shared memory для об'єктів JavaScript — лише типізовані масиви. Помилка в індексації псує дані всіх учасників.",
        conceptEn: "SharedArrayBuffer is a memory block visible to several workers at once, without copying. Reads and writes without synchronization race: you need Atomics.wait, Atomics.notify, and Atomics.compareExchange. These are low-level primitives, not a task queue. On the web, SharedArrayBuffer requires isolation (COOP/COEP); in Node it is available to workers with fewer of those headers. Do not put JavaScript objects in shared memory — only typed arrays. An indexing bug corrupts data for every participant.",
        code: "const sab = new SharedArrayBuffer(4);\nconst view = new Int32Array(sab);\nAtomics.store(view, 0, 1);\nAtomics.notify(view, 0, 1);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому простий запис shared[0] = 1 з двох воркерів небезпечний?", promptEn: "Why is a plain shared[0] = 1 from two workers unsafe?", options: ["немає атомарності, можлива гонитва", "SharedArrayBuffer забороняє запис", "воркери не бачать один буфер", "Atomics тоді вимикаються"], correctIndex: 0, explanationUk: "Потрібні атомарні операції.", explanationEn: "You need atomic operations." },
          { kind: "fill", promptUk: "Допишіть очікування на індексі 0", promptEn: "Fill in waiting on index 0", language: "javascript", code: "Atomics.___(view, 0, 0);", accepted: ["wait"], caseSensitive: true, explanationUk: "Примітив очікування — Atomics.wait.", explanationEn: "The wait primitive is Atomics.wait." },
          { kind: "mcq", promptUk: "Що можна покласти в SharedArrayBuffer?", promptEn: "What can you put in a SharedArrayBuffer?", options: ["сирі байти через TypedArray, не об'єкти JS", "будь-які об'єкти й функції", "лише рядки UTF-16", "екземпляри класів з прототипами"], correctIndex: 0, explanationUk: "Це блок байтів, не купа об'єктів.", explanationEn: "It is a byte block, not an object heap." }
        ],
        whyUk: "Навіщо Atomics, якщо SharedArrayBuffer уже «спільний»?",
        whyEn: "Why do you still need Atomics if SharedArrayBuffer is already shared?",
        ideas: [{ labelUk: "гонитва", labelEn: "a race", anyOf: ["гонит", "race", "синхрон", "synchron"] }, { labelUk: "wait і notify", labelEn: "wait and notify", anyOf: ["wait", "notify", "compareexchange"] }, { labelUk: "лише байти", labelEn: "bytes only", anyOf: ["байт", "byte", "typedarray", "об'єкт", "object"] }],
        sampleUk: "Спільна видимість байтів не означає атомарності: без Atomics два воркери створюють гонитву за одним індексом, тому потрібні Atomics.wait і Atomics.notify, і в буфер не кладуть об'єкти JavaScript, лише TypedArray.",
        sampleEn: "Shared visibility of bytes is not atomicity: without Atomics two workers race on one index, and you do not put JavaScript objects in the buffer, only a TypedArray.",
      }
    ],
    "Контрольна: воркери",
    "Exam: workers",
    [
      { promptUk: "worker_threads насамперед для…", promptEn: "worker_threads is primarily for…", options: ["CPU-роботи, що блокує подієве коло", "заміни всіх fetch", "запуску shell-команд", "збільшення ліміту fd"], correctIndex: 0, explanationUk: "Не для I/O-пулу.", explanationEn: "Not for an I/O pool." },
      { promptUk: "MessagePort передають…", promptEn: "A MessagePort is sent…", options: ["через transferList за власністю", "звичайним клонуванням функції", "у workerData як клас", "через SharedArrayBuffer"], correctIndex: 0, explanationUk: "Transfer, не клон.", explanationEn: "Transfer, not a clone." },
      { promptUk: "SharedArrayBuffer без Atomics…", promptEn: "A SharedArrayBuffer without Atomics…", options: ["дає гонитву при паралельному записі", "автоматично серіалізує об'єкти", "заборонений у Node", "копіює пам'ять щоразу"], correctIndex: 0, explanationUk: "Потрібна синхронізація.", explanationEn: "Synchronization is required." },
      { promptUk: "Імпорт важкого модуля в N воркерів…", promptEn: "Importing a heavy module in N workers…", options: ["коштує приблизно N копій у пам'яті", "завжди ділиться однією копією", "заборонений", "йде через SharedArrayBuffer сам"], correctIndex: 0, explanationUk: "Окремі isolate.", explanationEn: "Separate isolates." }
    ],
  ),
  sectionUnit(
    "node_diagnostics",
    "Сигнали, діагностика й канали",
    "Signals, diagnostics, and channels",
    [
      {
        slug: "nf-signals-shutdown",
        titleUk: "SIGTERM, SIGINT і граціозне завершення",
        titleEn: "SIGTERM, SIGINT, and graceful shutdown",
        difficulty: 3,
        pointsUk: ["SIGTERM — час закрити сервер і пул", "SIGKILL не перехопити: вкладіться в grace period", "Реєструйте слухачі на старті"],
        pointsEn: ["SIGTERM is the moment to close the server and the pool", "SIGKILL cannot be caught: finish within the grace period", "Register listeners at startup"],
        conceptUk: "У контейнері оркестратор надсилає SIGTERM перед убивством: процес має закрити HTTP-сервер (перестати брати нові з'єднання), дочекатись активних запитів із таймаутом і закрити пул БД, тоді process.exit. SIGINT — типово Ctrl+C на ТТY. SIGKILL не перехопити: якщо не встигли за таймаут TerminationGracePeriod, процес умре жорстко. Слухачі process.on('SIGTERM') мають бути синхронно зареєстровані на старті. Не ігноруйте помилки під час shutdown і не починайте нову важку роботу після сигналу.",
        conceptEn: "In a container the orchestrator sends SIGTERM before a kill: the process should close the HTTP server (stop accepting new connections), wait for in-flight requests with a timeout, close the database pool, then process.exit. SIGINT is typically Ctrl+C on a TTY. SIGKILL cannot be caught: if you miss the TerminationGracePeriod timeout, the process dies hard. process.on('SIGTERM') listeners should be registered synchronously at startup. Do not swallow errors during shutdown, and do not start new heavy work after the signal.",
        code: "process.on('SIGTERM', async () => {\n  server.close();\n  await Promise.race([drain(), sleep(8000)]);\n  await db.end();\n  process.exit(0);\n});",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що варто зробити першим у обробнику SIGTERM HTTP-сервісу?", promptEn: "What should you do first in a SIGTERM handler for an HTTP service?", options: ["перестати приймати нові з'єднання (server.close) і дочекатись активних", "одразу process.exit(0)", "ігнорувати сигнал", "запустити ще воркери"], correctIndex: 0, explanationUk: "Спочатку припиніть вхід, потім ресурси.", explanationEn: "Stop intake first, then resources." },
          { kind: "fill", promptUk: "Допишіть реєстрацію сигналу завершення", promptEn: "Fill in registering the shutdown signal", language: "javascript", code: "process.on('___', shutdown);", accepted: ["SIGTERM", "SIGINT"], caseSensitive: true, explanationUk: "У контейнері головний сигнал — SIGTERM.", explanationEn: "In a container the main signal is SIGTERM." },
          { kind: "mcq", promptUk: "Чому не можна покладатись лише на обробник SIGKILL?", promptEn: "Why can you not rely on a SIGKILL handler alone?", options: ["SIGKILL не перехоплюється користувацьким кодом", "SIGKILL ніколи не надсилається", "він завжди приходить раніше SIGTERM", "Node перетворює його на виняток"], correctIndex: 0, explanationUk: "Ядро завершує процес негайно.", explanationEn: "The kernel terminates the process immediately." }
        ],
        whyUk: "Що входить у граціозне завершення Node-сервісу після SIGTERM?",
        whyEn: "What does a graceful shutdown of a Node service after SIGTERM include?",
        ideas: [{ labelUk: "закрити прийом з'єднань", labelEn: "close intake of connections", anyOf: ["close", "сервер", "server", "з'єднан", "connection", "sigterm"] }, { labelUk: "таймаут активних", labelEn: "a timeout for in-flight work", anyOf: ["таймаут", "timeout", "запит", "request"] }, { labelUk: "не SIGKILL", labelEn: "not SIGKILL", anyOf: ["sigkill", "перехоп", "catch", "grace"] }],
        sampleUk: "Після SIGTERM закривають сервер для нових з'єднань, чекають активні запити з таймаутом і пул БД; SIGKILL не перехопити, тому все має вкластися в grace period оркестратора.",
        sampleEn: "After SIGTERM you close the server to new connections, wait for in-flight requests with a timeout, and close the database pool; SIGKILL cannot be caught, so everything must fit in the orchestrator's grace period.",
      },
      {
        slug: "nf-diagnostic-channel",
        titleUk: "diagnostics_channel: спостереження без патчу модулів",
        titleEn: "diagnostics_channel: observe without patching modules",
        difficulty: 3,
        pointsUk: ["Іменовані діагностичні події без патчу прототипів", "Підписник має бути дешевим; дивіться hasSubscribers", "Не для бізнес-шини і не для секретів"],
        pointsEn: ["Named diagnostic events without patching prototypes", "Subscribers must stay cheap; check hasSubscribers", "Not a business bus and not for secrets"],
        conceptUk: "diagnostics_channel дозволяє бібліотекам публікувати іменовані події (http.client.request.start), а інструментам підписуватись без мавпячого патчу прототипів. Канал синхронний і має бути дешевим: у підписнику не робіть важкої роботи. Перевірка channel.hasSubscribers уникає зайвої серіалізації, коли ніхто не слухає. Це основа багатьох OpenTelemetry-інтеграцій у Node. Не використовуйте канал як шину бізнес-подій додатка — для цього є EventEmitter або черга — і не кладіть у повідомлення чутливі секрети без редукції.",
        conceptEn: "diagnostics_channel lets libraries publish named events (http.client.request.start) and tools subscribe without monkey-patching prototypes. The channel is synchronous and must stay cheap: do not do heavy work in the subscriber. Checking channel.hasSubscribers avoids extra serialization when nobody is listening. This is the foundation of many OpenTelemetry integrations in Node. Do not use the channel as your app's business-event bus — that is what EventEmitter or a queue is for — and do not put raw secrets in the payload without redaction.",
        code: "import { channel } from 'node:diagnostics_channel';\nconst ch = channel('app.query');\nif (ch.hasSubscribers) ch.publish({ sql: safe });",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо hasSubscribers перед збором важкого корисного навантаження?", promptEn: "Why check hasSubscribers before building a heavy payload?", options: ["щоб не серіалізувати дані, коли ніхто не слухає", "інакше канал не існує", "це вимикає HTTP", "підписка тоді стає асинхронною"], correctIndex: 0, explanationUk: "Діагностика не повинна платна, коли вимкнена.", explanationEn: "Diagnostics should not cost when they are off." },
          { kind: "fill", promptUk: "Допишіть імпорт каналів діагностики", promptEn: "Fill in the diagnostics channel import", language: "javascript", code: "import { channel } from 'node:diagnostics____';", accepted: ["_channel"], caseSensitive: true, explanationUk: "Модуль — node:diagnostics_channel.", explanationEn: "The module is node:diagnostics_channel." },
          { kind: "mcq", promptUk: "Чому діагностичний канал погана шина замовлень інтернет-магазину?", promptEn: "Why is a diagnostics channel a poor bus for an online shop's orders?", options: ["він синхронний, для інструментів, без гарантій доставки бізнес-подій", "канали заборонені в продакшені", "через нього не пройти рядок", "він працює лише в браузері"], correctIndex: 0, explanationUk: "Це телеметрія, не черга задач.", explanationEn: "This is telemetry, not a task queue." }
        ],
        whyUk: "Чим diagnostics_channel кращий за мавпячий патч http.Server?",
        whyEn: "Why is diagnostics_channel better than monkey-patching http.Server?",
        ideas: [{ labelUk: "без патчу прототипів", labelEn: "no prototype patch", anyOf: ["патч", "patch", "прототип", "prototype", "мавп"] }, { labelUk: "іменовані події", labelEn: "named events", anyOf: ["канал", "channel", "поді", "event", "ім'я"] }, { labelUk: "дешевий підписник", labelEn: "a cheap subscriber", anyOf: ["hasSubscribers", "дешев", "cheap", "секрет", "secret"] }],
        sampleUk: "Канал діагностики дає іменовані події без патчу прототипів, підписник має бути дешевим і перевіряти hasSubscribers, а секрети й бізнес-черги туди не кладуть.",
        sampleEn: "A diagnostics channel gives named events without patching prototypes; a subscriber must stay cheap and check hasSubscribers, and you do not put secrets or a business queue on it.",
      },
      {
        slug: "nf-async-hooks-why",
        titleUk: "AsyncLocalStorage: контекст запиту без аргументів",
        titleEn: "AsyncLocalStorage: request context without extra arguments",
        difficulty: 3,
        pointsUk: ["Контекст на асинхронний ланцюжок, не глобальна змінна", "run задає, getStore читає вглибині", "У воркер не переноситься сам"],
        pointsEn: ["Context for an async chain, not a global variable", "run sets it, getStore reads it deep down", "It does not hop to a worker by itself"],
        conceptUk: "AsyncLocalStorage зберігає значення в межах асинхронного ланцюжка: request id, користувач, транзакція. run() задає контекст, getStore() читає його глибоко в колбеках без прокидання параметра крізь усі функції. Це наступник застарілих pattern з async_hooks, які легко витікали й були дорогими. Не кладіть у store важкі об'єкти назавжди і не плутайте зі глобальною змінною: поза run() сховище порожнє. У воркерах контекст не переноситься сам — передавайте явно. Втрачений контекст після стороннього колбека, що «губить» async resource, — відома межа; перевіряйте бібліотеки.",
        conceptEn: "AsyncLocalStorage keeps a value for the duration of an async chain: a request id, a user, a transaction. run() sets the context, getStore() reads it deep in callbacks without threading a parameter through every function. It succeeds older async_hooks patterns that leaked easily and were expensive. Do not put heavy objects in the store forever, and do not confuse it with a global: outside run() the store is empty. Context does not hop to workers by itself — pass it explicitly. Lost context after a third-party callback that drops the async resource is a known edge; audit libraries.",
        code: "const als = new AsyncLocalStorage();\nals.run({ reqId }, () => handler());\n// inside handler: als.getStore().reqId",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чим AsyncLocalStorage відрізняється від глобальної змінної currentUser?", promptEn: "How does AsyncLocalStorage differ from a global currentUser variable?", options: ["значення прив'язане до асинхронного ланцюжка запиту, а не до всього процесу", "це те саме", "глобальна змінна краще в кластері", "ALS працює лише синхронно"], correctIndex: 0, explanationUk: "Паралельні запити не перетирають один одного.", explanationEn: "Concurrent requests do not overwrite each other." },
          { kind: "fill", promptUk: "Допишіть читання сховища контексту", promptEn: "Fill in reading the context store", language: "javascript", code: "const store = als.___();", accepted: ["getStore"], caseSensitive: true, explanationUk: "Метод — getStore.", explanationEn: "The method is getStore." },
          { kind: "mcq", promptUk: "Чи потрапить контекст ALS у worker_threads автоматично?", promptEn: "Does ALS context automatically reach worker_threads?", options: ["ні, його треба передати явно (workerData чи повідомлення)", "так, завжди", "так, якщо SharedArrayBuffer", "лише для SIGTERM"], correctIndex: 0, explanationUk: "Інший isolate — інший контекст.", explanationEn: "Another isolate is another context." }
        ],
        whyUk: "Навіщо AsyncLocalStorage для request id, а не модульна змінна?",
        whyEn: "Why use AsyncLocalStorage for a request id rather than a module variable?",
        ideas: [{ labelUk: "паралельні запити", labelEn: "concurrent requests", anyOf: ["паралел", "concurrent", "запит", "request", "ланцюж", "chain"] }, { labelUk: "getStore у глибині", labelEn: "getStore deep down", anyOf: ["getstore", "run", "параметр", "parameter"] }, { labelUk: "не воркер сам", labelEn: "not a worker by itself", anyOf: ["worker", "воркер", "явно", "explicit"] }],
        sampleUk: "AsyncLocalStorage прив'язує request id до асинхронного ланцюжка, тож паралельні запити не перетирають модульну змінну; у воркер контекст треба передати явно.",
        sampleEn: "AsyncLocalStorage binds a request id to the async chain so concurrent requests do not overwrite a module variable; you must pass the context into a worker explicitly.",
      }
    ],
    "Контрольна: діагностика Node",
    "Exam: Node diagnostics",
    [
      { promptUk: "Після SIGTERM HTTP-сервіс має…", promptEn: "After SIGTERM an HTTP service should…", options: ["закрити прийом з'єднань і злити активні з таймаутом", "одразу викликати SIGKILL собі", "ігнорувати сигнал", "відкрити нові воркери"], correctIndex: 0, explanationUk: "Граціозне завершення.", explanationEn: "A graceful shutdown." },
      { promptUk: "SIGKILL…", promptEn: "SIGKILL…", options: ["не перехоплюється користувацьким кодом", "завжди приходить першим", "є синонімом SIGINT", "закриває лише stdio"], correctIndex: 0, explanationUk: "Вкладіться в grace period.", explanationEn: "Finish within the grace period." },
      { promptUk: "hasSubscribers на діагностичному каналі потрібен, щоб…", promptEn: "hasSubscribers on a diagnostics channel is there to…", options: ["не збирати важке навантаження, коли ніхто не слухає", "вимкнути HTTP", "замінити EventEmitter", "передати контекст у воркер"], correctIndex: 0, explanationUk: "Дешева телеметрія.", explanationEn: "Cheap telemetry." },
      { promptUk: "AsyncLocalStorage зберігає значення…", promptEn: "AsyncLocalStorage stores a value…", options: ["у межах асинхронного ланцюжка, не глобально на процес", "назавжди в модулі", "лише синхронно в одному тіку", "у SharedArrayBuffer автоматично"], correctIndex: 0, explanationUk: "Контекст запиту.", explanationEn: "Request context." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandNodeFundamentals(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
