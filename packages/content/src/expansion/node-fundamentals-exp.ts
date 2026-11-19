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
        conceptUk: "Buffer.alloc(n) виділяє n байт і заповнює їх нулями. Buffer.allocUnsafe(n) може бути швидшим, бо не гарантує занулення: незаписані байти можуть містити старі дані процесу. Перед використанням або передачею повністю ініціалізуйте діапазон, який читаєте; один read може заповнити лише частину буфера. Buffer.from(string, encoding) кодує рядок у байти. Довжина буфера — байти, а string.length у JavaScript рахує кодові одиниці UTF-16, не байти й не завжди символи. Наприклад, 'привіт' має 12 байт у UTF-8 і 6 кодових одиниць UTF-16.",
        conceptEn: "Buffer.alloc(n) allocates n bytes and fills them with zeros. Buffer.allocUnsafe(n) may be faster because it does not guarantee zeroing: unwritten bytes can contain old process data. Fully initialize the range you read or send; a single read can fill only part of a buffer. Buffer.from(string, encoding) encodes the string as bytes. Buffer length counts bytes, whereas JavaScript string.length counts UTF-16 code units, not bytes and not always characters. For example, 'привіт' takes 12 UTF-8 bytes and 6 UTF-16 code units.",
        code: "const safe = Buffer.alloc(16);\nconst fast = Buffer.allocUnsafe(16);\nfast.fill(0); // if you must start clean",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чим Buffer.allocUnsafe небезпечний, якщо буфер віддати клієнту частково незаписаним?", promptEn: "Why is Buffer.allocUnsafe dangerous if a partially unwritten buffer is sent to a client?", options: ["у незаписаних байтах можуть бути старі дані процесу", "allocUnsafe заборонений у Node", "буфер завжди порожній рядок", "UTF-8 тоді не діє"], optionsEn: ["unwritten bytes may contain old process data", "allocUnsafe is forbidden in Node", "the buffer is always an empty string", "UTF-8 stops working"], correctIndex: 0, explanationUk: "Незаписана пам'ять не гарантовано занулена.", explanationEn: "Unwritten memory is not guaranteed to be zeroed." },
          { kind: "fill", promptUk: "Допишіть безпечне виділення 16 нульових байт", promptEn: "Fill in a safe allocation of 16 zeroed bytes", language: "javascript", code: "const buf = Buffer.___(16);", accepted: ["alloc"], caseSensitive: true, explanationUk: "Безпечний конструктор — alloc.", explanationEn: "The safe constructor is alloc." },
          { kind: "output", promptUk: "Скільки байтів займає рядок 'привіт' у UTF-8?", promptEn: "How many bytes does the string 'привіт' occupy in UTF-8?", language: "javascript", code: "Buffer.byteLength('привіт', 'utf8')", options: ["12: у цьому рядку кожна літера займає 2 байти", "6, як length рядка", "0", "16"], optionsEn: ["12: each letter in this string takes 2 bytes", "6, matching the string's length", "0", "16"], correctIndex: 0, explanationUk: "Кожна з шести літер у цьому прикладі займає два байти UTF-8.", explanationEn: "Each of the six letters in this example takes two UTF-8 bytes." }
        ],
        whyUk: "Коли обрати allocUnsafe замість alloc?",
        whyEn: "When should you pick allocUnsafe instead of alloc?",
        ideas: [{ labelUk: "повний перезапис", labelEn: "full overwrite", anyOf: ["перезапис", "overwrite", "сокет", "socket", "весь", "whole"] }, { labelUk: "витік даних", labelEn: "data leak", anyOf: ["витік", "leak", "чуж", " leftover", "пул", "pool", "unsafe"] }, { labelUk: "байти не символи", labelEn: "bytes not characters", anyOf: ["байт", "byte", "символ", "character", "utf"] }],
        sampleUk: "allocUnsafe може бути швидшим, бо не гарантує занулення, і доречний коли ви повністю перезаписуєте використаний діапазон; інакше можливий витік старих даних, а довжину буфера міряють у байтах, не в символах.",
        sampleEn: "allocUnsafe may be faster because zeroing is not guaranteed, and is appropriate when you fully overwrite the range used; otherwise leftover data may leak, and buffer length is measured in bytes, not characters.",
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
          { kind: "mcq", promptUk: "Що робить Buffer.slice порівняно з TypedArray.slice?", promptEn: "What does Buffer.slice do compared with TypedArray.slice?", options: ["повертає вигляд на ту саму пам'ять, не копію", "завжди глибоко копіює", "повертає рядок", "виділяє новий unsafe буфер з нулів"], optionsEn: ["returns a view of the same memory, not a copy", "always makes a deep copy", "returns a string", "allocates a zero-filled unsafe buffer"], correctIndex: 0, explanationUk: "Історична поведінка Buffer.slice — view.", explanationEn: "The historical Buffer.slice behaviour is a view." },
          { kind: "fill", promptUk: "Допишіть метод from, який створює незалежну копію іншого буфера.", promptEn: "Complete the from method that creates an independent copy of another buffer.", language: "javascript", code: "const copy = Buffer.___(other);", accepted: ["from"], caseSensitive: true, explanationUk: "Buffer.from(other) копіює байти; alloc очікує розмір, а не буфер.", explanationEn: "Buffer.from(other) copies the bytes; alloc expects a size, not a buffer." },
          { kind: "read", promptUk: "Чому передача buf.buffer у WebCrypto може бути ширшою за buf?", promptEn: "Why can passing buf.buffer into WebCrypto be wider than buf?", language: "javascript", code: "crypto.subtle.digest('SHA-256', buf.buffer);", options: ["underlying ArrayBuffer спільний і може виходити за byteOffset і length", "buf.buffer завжди точно length байт", "WebCrypto ігнорує буфери", "це копіює лише ASCII"], optionsEn: ["the shared underlying ArrayBuffer can extend beyond byteOffset and length", "buf.buffer always has exactly length bytes", "WebCrypto ignores buffers", "this copies only ASCII"], correctIndex: 0, explanationUk: "Передайте сам buf як BufferSource або створіть new Uint8Array(buf) для незалежної копії потрібних байтів.", explanationEn: "Pass buf itself as a BufferSource, or use new Uint8Array(buf) for an independent copy of the intended bytes." }
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
          { kind: "mcq", promptUk: "Що станеться, якщо розрізати UTF-8 чанк посередині символу і викликати toString('utf8') на кожному чанку окремо?", promptEn: "What happens if you split a UTF-8 chunk mid-character and call toString('utf8') on each chunk alone?", options: ["можна отримати символ заміни замість правильної літери", "Node завжди склеїть символи сам", "буфер стане hex", "помилка компіляції"], optionsEn: ["replacement characters may appear instead of the intended character", "Node always joins characters automatically", "the buffer becomes hex", "a compilation error occurs"], correctIndex: 0, explanationUk: "Потрібен StringDecoder або TextDecoder з потоком.", explanationEn: "You need StringDecoder or a streaming TextDecoder." },
          { kind: "fill", promptUk: "Допишіть кодування для hex-ряду", promptEn: "Fill in the encoding for a hex string", language: "javascript", code: "buf.toString('___')", accepted: ["hex"], caseSensitive: true, explanationUk: "Ім'я кодування — hex.", explanationEn: "The encoding name is hex." },
          { kind: "mcq", promptUk: "Чим latin1 відрізняється від utf8?", promptEn: "How does latin1 differ from utf8?", options: ["один байт на символ 0–255, без багатобайтових послідовностей Unicode", "це синонім utf8", "latin1 зберігає лише кирилицю", "latin1 заборонений у Buffer"], optionsEn: ["one byte maps to each character from 0–255, without UTF-8 multibyte sequences", "it is a synonym for utf8", "latin1 stores only Cyrillic", "latin1 is forbidden in Buffer"], correctIndex: 0, explanationUk: "Це однобайтове відображення.", explanationEn: "It is a one-byte mapping." }
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
      { promptUk: "Buffer.alloc на відміну від allocUnsafe…", promptEn: "Unlike allocUnsafe, Buffer.alloc…", options: ["занулює виділену пам'ять", "швидший, бо не затирає пул", "повертає рядок", "не існує в Node 20"], optionsEn: ["zeroes allocated memory", "is faster because it leaves pool memory unchanged", "returns a string", "does not exist in Node 20"], correctIndex: 0, explanationUk: "Безпека за замовчуванням.", explanationEn: "Safety by default." },
      { promptUk: "Buffer.slice повертає…", promptEn: "Buffer.slice returns…", options: ["вигляд на ту саму пам'ять", "завжди глибоку копію", "ArrayBuffer рівно тієї ж довжини без offset", "рядок utf8"], optionsEn: ["a view of the same memory", "always a deep copy", "an ArrayBuffer of exactly that length without an offset", "a UTF-8 string"], correctIndex: 0, explanationUk: "Це view.", explanationEn: "It is a view." },
      { promptUk: "Як зберегти неповний символ UTF-8 на межі чанків до отримання решти байтів?", promptEn: "How can an incomplete UTF-8 character at a chunk boundary be preserved until the remaining bytes arrive?", options: ["Використати потоковий декодер", "Декодувати кожен чанк окремо без стану", "Перетворити буфер на hex і відкинути його", "Завершити процес"], optionsEn: ["Use a streaming decoder", "Decode each chunk separately without state", "Convert the buffer to hex and discard it", "Terminate the process"], correctIndex: 0, explanationUk: "StringDecoder зберігає неповну послідовність між чанками.", explanationEn: "StringDecoder retains an incomplete sequence between chunks." },
      { promptUk: "latin1 у Buffer — це…", promptEn: "latin1 on a Buffer is…", options: ["один байт на символ 0–255, не UTF-8", "синонім utf8", "стиснення", "шифрування"], optionsEn: ["one byte per character from 0–255, not UTF-8", "a synonym for utf8", "compression", "encryption"], correctIndex: 0, explanationUk: "Однобайтове відображення.", explanationEn: "A one-byte mapping." }
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
        conceptUk: "spawn(cmd, args) за замовчуванням запускає процес без оболонки, а exec(command) використовує shell і буферизує stdout та stderr до maxBuffer. Не склеюйте користувацький ввід у shell-команду. execFile за замовчуванням запускає файл без shell і також буферизує вивід; shell: true змінює цю властивість. Масив аргументів усуває інтерпретацію shell, але сама утиліта може сприйняти ввід як опцію: перевіряйте аргументи та використовуйте роздільник --, якщо він підтримується. Для великого виводу обробляйте обидва потоки spawn з урахуванням backpressure та помилок.",
        conceptEn: "spawn(cmd, args) starts a process without a shell by default, whereas exec(command) uses a shell and buffers stdout and stderr up to maxBuffer. Do not concatenate user input into a shell command. execFile starts a file without a shell by default and also buffers output; shell: true changes that property. An argument array avoids shell interpretation, but the target program may interpret input as an option: validate arguments and use the -- separator when supported. For large output, consume both spawn streams with backpressure and error handling.",
        code: "const { spawn } = require('node:child_process');\nconst child = spawn('git', ['log', '-1'], { stdio: ['ignore', 'pipe', 'pipe'] });",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому exec(userInput) небезпечний?", promptEn: "Why is exec(userInput) dangerous?", options: ["рядок іде в shell, можна вставити метасимволи й інші команди", "exec не існує в Node", "spawn завжди небезпечніший", "stdout тоді порожній"], optionsEn: ["the string goes through a shell and can contain metacharacters and other commands", "exec does not exist in Node", "spawn is always more dangerous", "stdout is empty"], correctIndex: 0, explanationUk: "Це класична ін'єкція оболонки.", explanationEn: "This is classic shell injection." },
          { kind: "fill", promptUk: "Допишіть git log, щоб отримати останній коміт через spawn без shell.", promptEn: "Complete git log to retrieve the latest commit via spawn without a shell.", language: "javascript", code: "const child = spawn('git', ['___', '-1']);", accepted: ["log"], caseSensitive: true, explanationUk: "log -1 показує останній коміт; аргументи передано окремим масивом.", explanationEn: "log -1 shows the latest commit; arguments are passed as an array." },
          { kind: "mcq", promptUk: "Коли exec не підходить навіть для довіреної команди?", promptEn: "When is exec a poor fit even for a trusted command?", options: ["коли вивід великий і не вміщується в maxBuffer", "коли потрібен код виходу", "коли є лише один аргумент", "коли файл існує"], optionsEn: ["when output exceeds maxBuffer", "when an exit code is needed", "when there is only one argument", "when the file exists"], correctIndex: 0, explanationUk: "exec буферизує вивід; потоки spawn також треба споживати й контролювати.", explanationEn: "exec buffers output; spawn streams still need to be consumed and managed." }
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
          { kind: "mcq", promptUk: "Чому дочірній процес зі stdio pipe може зависнути, якщо батько не читає stdout?", promptEn: "Why can a child with stdio pipe hang if the parent never reads stdout?", options: ["канал заповнюється, спрацьовує backpressure", "spawn тоді заборонений", "Node ігнорує stdout завжди", "inherit обов'язковий"], optionsEn: ["the pipe fills and backpressure stalls the writer", "spawn is forbidden", "Node always ignores stdout", "inherit is required"], correctIndex: 0, explanationUk: "Непрочитаний pipe має скінченний буфер.", explanationEn: "An unread pipe has a finite buffer." },
          { kind: "fill", promptUk: "Допишіть подію повного закриття потоків", promptEn: "Fill in the event for fully closed streams", language: "javascript", code: "child.on('___', () => console.log('fds done', child.exitCode));", accepted: ["close"], caseSensitive: true, explanationUk: "Подія close чекає stdio.", explanationEn: "The close event waits for stdio." },
          { kind: "mcq", promptUk: "Що дає fork на відміну від spawn('node') без IPC?", promptEn: "What does fork give you that spawn('node') without IPC does not?", options: ["канал child.send і подію message", "обов'язковий inherit", "відсутність коду виходу", "запуск через shell"], optionsEn: ["an IPC channel with child.send and message events", "mandatory inherit", "no exit code", "execution through a shell"], correctIndex: 0, explanationUk: "fork відкриває IPC.", explanationEn: "fork opens IPC." }
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
        pointsUk: ["Ненульовий код — помилка за угодою", "Після сигналу code може бути null", "error може означати збій запуску, сигналу або IPC"],
        pointsEn: ["A non-zero code is an error by convention", "After a signal, code may be null", "error may indicate spawn, signal, or IPC failure"],
        conceptUk: "Ненульовий exit code зазвичай означає помилку, але значення визначає програма. Після завершення сигналом code може бути null, а signal містить назву сигналу. На POSIX SIGTERM можна обробити або ігнорувати; на Windows Node трактує поширені сигнали інакше і завершує процес примусово. spawn підтримує timeout і killSignal: таймаут надсилає сигнал, але не доводить завершення чи зупинку нащадків. Подія error може означати збій запуску, надсилання сигналу або IPC; обробляйте її окремо від exit і не припускайте, що error завжди означає невдалий запуск. При власній ескалації очищуйте таймер після exit: повторний сигнал після виходу може потрапити процесу з повторно використаним PID.",
        conceptEn: "A nonzero exit code generally means failure, but the program defines its meaning. After termination by signal, code may be null and signal gives its name. On POSIX SIGTERM can be handled or ignored; on Windows Node treats common signals differently and terminates the process forcefully. spawn supports timeout and killSignal: a timeout sends a signal but does not prove exit or termination of descendants. An error event can indicate spawn, signal, or IPC failure; handle it separately from exit and do not assume every error means startup failed. If implementing escalation, clear its timer on exit: a late signal can reach a process with a reused PID.",
        code: "const child = spawn('node', ['task.js'], { timeout: 5000 });\nchild.on('error', reportError);\nchild.on('close', (code, signal) => reportExit(code, signal));",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що означає exit з code null і signal SIGKILL?", promptEn: "What does an exit with code null and signal SIGKILL mean?", options: ["процес убито сигналом, а не завершився сам з кодом", "команда не знайдена", "усе пройшло успішно", "stdio ще відкриті"], optionsEn: ["the process terminated due to a signal rather than exiting with a code", "the command was not found", "the operation succeeded", "stdio is still open"], correctIndex: 0, explanationUk: "Сигнал і код — різні поля.", explanationEn: "Signal and code are different fields." },
          { kind: "fill", promptUk: "Допишіть метод kill для надсилання SIGTERM дочірньому процесу.", promptEn: "Complete the kill method to send SIGTERM to the child process.", language: "javascript", code: "child.___('SIGTERM');", accepted: ["kill"], caseSensitive: true, explanationUk: "Поводження із сигналом залежить від платформи.", explanationEn: "Signal handling depends on the platform." },
          { kind: "mcq", promptUk: "Навіщо слухати подію error окремо від exit?", promptEn: "Why listen for error separately from exit?", options: ["Вона повідомляє зокрема про помилку запуску або надсилання сигналу", "Вона дублює кожен код виходу", "Вона виникає лише для inherit", "Вона завжди означає код 0"], optionsEn: ["It can report failures to spawn or send a signal", "It duplicates every exit code", "It occurs only for inherit", "It always means exit code 0"], correctIndex: 0, explanationUk: "Наприклад, команда може не запуститися; error також має інші причини.", explanationEn: "For example, a command may fail to spawn; error has other causes too." }
        ],
        whyUk: "Чому на POSIX після child.kill('SIGTERM') інколи потрібен ще SIGKILL?",
        whyEn: "Why might SIGKILL still be needed after child.kill('SIGTERM') on POSIX?",
        ideas: [{ labelUk: "чемний сигнал можна ігнорувати", labelEn: "a polite signal can be ignored", anyOf: ["sigterm", "ігнор", "ignore", "чемн"] }, { labelUk: "SIGKILL не перехопити", labelEn: "SIGKILL cannot be caught", anyOf: ["sigkill", "таймаут", "timeout"] }, { labelUk: "code і signal", labelEn: "code and signal", anyOf: ["null", "signal", "code", "exit"] }],
        sampleUk: "На POSIX SIGTERM можна обробити або ігнорувати, тому після таймауту живому процесу можуть надіслати SIGKILL; таймер треба скасувати після exit, де code може бути null, а signal — назвою сигналу.",
        sampleEn: "On POSIX SIGTERM can be handled or ignored, so after a timeout a still-running process may receive SIGKILL; clear the timer on exit, where code may be null and signal names the signal.",
      }
    ],
    "Контрольна: дочірні процеси",
    "Exam: child processes",
    [
      { promptUk: "exec небезпечний з вводом користувача, бо…", promptEn: "exec is dangerous with user input because…", options: ["команда йде через shell", "spawn тоді вимикається", "stdout бінарний", "немає коду виходу"], optionsEn: ["the command passes through a shell", "spawn is disabled", "stdout is binary", "there is no exit code"], correctIndex: 0, explanationUk: "Ін'єкція оболонки.", explanationEn: "Shell injection." },
      { promptUk: "Непрочитаний stdout зі stdio pipe…", promptEn: "Unread stdout with stdio pipe…", options: ["може зупинити дочірній процес через backpressure", "автоматично йде в /dev/null", "піднімає код 0", "заборонений у fork"], optionsEn: ["can stall the child due to backpressure", "automatically goes to /dev/null", "sets exit code 0", "is forbidden in fork"], correctIndex: 0, explanationUk: "Читайте стрім або ignore.", explanationEn: "Read the stream or use ignore." },
      { promptUk: "Подія close на відміну від exit…", promptEn: "The close event, unlike exit,…", options: ["чекає закриття всіх stdio", "означає, що процес не стартував", "замінює SIGKILL", "буферизує stdout"], optionsEn: ["waits for stdio streams to close", "means the process failed to start", "replaces SIGKILL", "buffers stdout"], correctIndex: 0, explanationUk: "close також настає після error, якщо запуск не вдався.", explanationEn: "close also follows error if spawning fails." },
      { promptUk: "Яка ситуація може викликати подію error на child?", promptEn: "Which situation can trigger an error event on a child?", options: ["Помилка запуску або надсилання сигналу", "Будь-який успішний код 0", "Кожне закриття stdio", "Кожне отримання SIGTERM"], optionsEn: ["A failure to spawn or send a signal", "Every successful exit code 0", "Every stdio closure", "Every receipt of SIGTERM"], correctIndex: 0, explanationUk: "error може виникнути з кількох причин, окремо від exit.", explanationEn: "error can have several causes, separate from exit." }
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
        pointsUk: ["Воркери корисні для CPU-роботи", "Кожен worker має власний isolate і модульний кеш", "Клонування, transfer і спільна пам'ять мають різні наслідки"],
        pointsEn: ["Workers are useful for CPU-heavy work", "Each worker has its own isolate and module cache", "Cloning, transfer, and shared memory have different consequences"],
        conceptUk: "worker_threads запускає JavaScript у додатковому потоці того самого процесу; воркери корисні для CPU-роботи, яка затримує event loop. Мережевий I/O вже асинхронний і сам по собі не потребує воркера. Кожен worker має окремий isolate та модульний кеш, тому пул має накладні витрати на пам'ять. workerData зазвичай клонується; придатний ArrayBuffer можна передати через transferList, а SharedArrayBuffer — розділяти за належної синхронізації. Буфери з внутрішнього пулу Node не можна вважати безпечно передаваними без копії. Обмежуйте чергу й кількість воркерів та обробляйте message, error і exit.",
        conceptEn: "worker_threads runs JavaScript on another thread in the same process; workers are useful for CPU work that delays the event loop. Network I/O is already asynchronous and does not inherently need a worker. Each worker has a separate isolate and module cache, so a pool has memory overhead. workerData is generally cloned; a transferable ArrayBuffer can be sent with transferList, while SharedArrayBuffer can be shared with proper synchronization. Node's pooled Buffers must not be assumed transferable without copying. Bound the queue and worker count, and handle message, error, and exit.",
        code: "import { Worker } from 'node:worker_threads';\nconst w = new Worker(new URL('./job.js', import.meta.url), { workerData: { n: 42 } });",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Коли worker_threads доречніший за ще один await fetch?", promptEn: "When is worker_threads more appropriate than another await fetch?", options: ["для важкого синхронного обчислення, що блокує подієве коло", "для будь-якого HTTP-запиту", "завжди замість Promise.all", "лише для читання файлів"], optionsEn: ["for heavy synchronous computation that blocks the event loop", "for every HTTP request", "always instead of Promise.all", "only for reading files"], correctIndex: 0, explanationUk: "Асинхронний мережевий I/O зазвичай не потребує окремого воркера.", explanationEn: "Asynchronous network I/O generally does not need a separate worker." },
          { kind: "fill", promptUk: "Допишіть стартові дані воркера", promptEn: "Fill in the worker's startup data option", language: "javascript", code: "new Worker(url, { ___Data: { jobId } });", accepted: ["worker"], caseSensitive: true, explanationUk: "Опція — workerData.", explanationEn: "The option is workerData." },
          { kind: "mcq", promptUk: "Чому імпорт важкого модуля в кожному воркері може бути дорогим?", promptEn: "Why can importing a heavy module in every worker be expensive?", options: ["кожен isolate має власний модульний кеш і стан", "Worker забороняє import", "модулі діляться автоматично як у браузері", "це завжди коштує лише один раз на процес"], optionsEn: ["each isolate has its own module cache and state", "Worker forbids import", "modules are automatically shared as in a browser", "the cost is always paid only once per process"], correctIndex: 0, explanationUk: "Кеш модулів не спільний між isolate.", explanationEn: "The module cache is not shared across isolates." }
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
        conceptUk: "Батько й воркер спілкуються через worker.postMessage та parentPort. Для прямого каналу між двома воркерами передайте кожен порт MessageChannel у transferList; після передачі відправник уже не може його використовувати. Structured clone не копіює функції, а власні прототипи й аксесори не зберігає. Передача придатного ArrayBuffer від'єднує всі його view у відправника. Буфери з внутрішнього пулу Node можуть бути клоновані разом із пулом, а не передані; перевіряйте походження пам'яті. SharedArrayBuffer розділяється без transfer і потребує узгодженого протоколу синхронізації.",
        conceptEn: "Parent and worker communicate through worker.postMessage and parentPort. For a direct channel between two workers, transfer each MessageChannel port in transferList; the sender can no longer use it after transfer. Structured clone cannot copy functions and does not preserve custom prototypes or accessors. Transferring a transferable ArrayBuffer detaches all of its sender-side views. Buffers from Node's internal pool may be cloned along with the pool rather than transferred; check memory ownership. SharedArrayBuffer is shared without transfer and requires a coordinated synchronization protocol.",
        code: "const { port1, port2 } = new MessageChannel();\nw1.postMessage({ port: port1 }, [port1]);\nw2.postMessage({ port: port2 }, [port2]);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чому MessagePort кладуть у transferList, а не в звичайне поле повідомлення без transfer?", promptEn: "Why does a MessagePort go in transferList, not in a plain message field without transfer?", options: ["порт передається за власністю, після transfer у відправника він від'єднаний", "порти не можна передавати взагалі", "transferList лише для рядків", "інакше Node заблокує воркер"], optionsEn: ["ownership transfers and the sender can no longer use the port", "ports cannot be passed at all", "transferList is only for strings", "otherwise Node blocks the worker"], correctIndex: 0, explanationUk: "Порт — transferable, не клон.", explanationEn: "A port is transferable, not a clone." },
          { kind: "fill", promptUk: "Допишіть створення каналу з двома портами", promptEn: "Fill in creating a channel with two ports", language: "javascript", code: "const { port1, port2 } = new ___();", accepted: ["MessageChannel"], caseSensitive: true, explanationUk: "Клас — MessageChannel.", explanationEn: "The class is MessageChannel." },
          { kind: "read", promptUk: "Що станеться з функцією в postMessage({ fn: () => 1 })?", promptEn: "What happens to a function in postMessage({ fn: () => 1 })?", language: "javascript", code: "parentPort.postMessage({ fn: () => 1 });", options: ["Виклик викине DataCloneError: функцію не можна клонувати", "Функція приїде з тим самим замиканням", "Вона стане рядком коду", "Її викличе головний потік сам"], optionsEn: ["The call throws DataCloneError because functions cannot be cloned", "The function arrives with its closure", "It becomes a source-code string", "The main thread calls it automatically"], correctIndex: 0, explanationUk: "Функції не підтримуються structured clone.", explanationEn: "Functions are not supported by structured clone." }
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
        pointsUk: ["Спільна пам'ять містить байти", "Синхронізація залежить від протоколу доступу", "Atomics.add дає атомарний інкремент"],
        pointsEn: ["Shared memory contains bytes", "Synchronization depends on the access protocol", "Atomics.add provides an atomic increment"],
        conceptUk: "SharedArrayBuffer надає кільком воркерам доступ до одного блоку байтів через представлення, наприклад Int32Array. Якщо два воркери одночасно виконують view[0]++, інкремент складається з читання та запису, тому оновлення може загубитися. Atomics.add(view, 0, 1) виконує цей інкремент атомарно; wait і notify допомагають будувати окремі протоколи очікування. Не всі операції потребують усіх цих примітивів: оберіть і перевірте протокол синхронізації. Не блокуйте головний event loop через Atomics.wait. У браузері доступ до SharedArrayBuffer залежить від ізоляції сторінки; у Node заголовки COOP/COEP не застосовуються.",
        conceptEn: "SharedArrayBuffer gives multiple workers access to the same byte block through a view such as Int32Array. If two workers execute view[0]++ concurrently, the increment consists of a read and a write, so an update can be lost. Atomics.add(view, 0, 1) performs that increment atomically; wait and notify help build separate waiting protocols. Not every operation needs all of these primitives: choose and verify a synchronization protocol. Do not block the main event loop with Atomics.wait. Browser SharedArrayBuffer access depends on page isolation; COOP/COEP headers do not apply to Node.",
        code: "const sab = new SharedArrayBuffer(4);\nconst view = new Int32Array(sab);\nAtomics.store(view, 0, 1);\nAtomics.notify(view, 0, 1);",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Два воркери одночасно виконують view[0]++. Який ризик?", promptEn: "Two workers execute view[0]++ concurrently. What is the risk?", options: ["Один інкремент може загубитися через окремі читання й записи", "SharedArrayBuffer забороняє запис", "Воркери не бачать один буфер", "Atomics автоматично вимикаються"], optionsEn: ["An increment can be lost because reading and writing are separate operations", "SharedArrayBuffer forbids writing", "Workers cannot see the same buffer", "Atomics are automatically disabled"], correctIndex: 0, explanationUk: "Atomics.add виконує інкремент атомарно.", explanationEn: "Atomics.add performs the increment atomically." },
          { kind: "fill", promptUk: "Допишіть очікування на індексі 0", promptEn: "Fill in waiting on index 0", language: "javascript", code: "Atomics.___(view, 0, 0);", accepted: ["wait"], caseSensitive: true, explanationUk: "Примітив очікування — Atomics.wait.", explanationEn: "The wait primitive is Atomics.wait." },
          { kind: "mcq", promptUk: "Що можна зберігати в SharedArrayBuffer?", promptEn: "What can be stored in a SharedArrayBuffer?", options: ["байти через представлення, не об'єкти JS безпосередньо", "будь-які об'єкти й функції", "лише рядки UTF-16", "екземпляри класів з прототипами"], optionsEn: ["bytes accessed through views, not JavaScript objects directly", "arbitrary objects and functions", "only UTF-16 strings", "class instances with their prototypes"], correctIndex: 0, explanationUk: "Це блок байтів, не купа об'єктів.", explanationEn: "It is a byte block, not an object heap." }
        ],
        whyUk: "Навіщо Atomics, якщо SharedArrayBuffer уже «спільний»?",
        whyEn: "Why do you still need Atomics if SharedArrayBuffer is already shared?",
        ideas: [{ labelUk: "гонитва", labelEn: "a race", anyOf: ["гонит", "race", "синхрон", "synchron"] }, { labelUk: "wait і notify", labelEn: "wait and notify", anyOf: ["wait", "notify", "compareexchange"] }, { labelUk: "лише байти", labelEn: "bytes only", anyOf: ["байт", "byte", "typedarray", "об'єкт", "object"] }],
        sampleUk: "Спільна видимість байтів не означає атомарності: без Atomics два воркери створюють гонитву за одним індексом, тому потрібні Atomics.wait і Atomics.notify, і в буфер не кладуть об'єкти JavaScript, лише TypedArray.",
        sampleEn: "Shared visibility of bytes is not atomicity: without Atomics two workers can race on an increment; Atomics.add avoids lost updates, while wait and notify support a waiting protocol for shared bytes.",
      }
    ],
    "Контрольна: воркери",
    "Exam: workers",
    [
      { promptUk: "worker_threads насамперед для…", promptEn: "worker_threads is primarily for…", options: ["CPU-роботи, що блокує подієве коло", "заміни всіх fetch", "запуску shell-команд", "збільшення ліміту fd"], optionsEn: ["CPU work that blocks the event loop", "replacing every fetch", "running shell commands", "increasing the file-descriptor limit"], correctIndex: 0, explanationUk: "Не для I/O-пулу.", explanationEn: "Not for an I/O pool." },
      { promptUk: "MessagePort передають…", promptEn: "A MessagePort is sent…", options: ["через transferList за власністю", "звичайним клонуванням функції", "у workerData як клас", "через SharedArrayBuffer"], optionsEn: ["through transferList, transferring ownership", "by cloning a function", "in workerData as a class", "through SharedArrayBuffer"], correctIndex: 0, explanationUk: "Transfer, не клон.", explanationEn: "Transfer, not a clone." },
      { promptUk: "Як безпечно інкрементувати спільний лічильник з кількох воркерів?", promptEn: "How can multiple workers safely increment a shared counter?", options: ["Використати Atomics.add на відповідному TypedArray", "Виконати view[0]++ без синхронізації", "Клонувати функцію в буфер", "Змінити розширення файла"], optionsEn: ["Use Atomics.add on an appropriate TypedArray", "Run view[0]++ without synchronization", "Clone a function into the buffer", "Change the file extension"], correctIndex: 0, explanationUk: "Atomics.add запобігає втраті інкрементів.", explanationEn: "Atomics.add prevents lost increments." },
      { promptUk: "Імпорт важкого модуля в N воркерів…", promptEn: "Importing a heavy module in N workers…", options: ["може збільшити споживання пам'яті через окремі isolate", "завжди ділиться однією копією", "заборонений", "йде через SharedArrayBuffer сам"], optionsEn: ["can increase memory use because isolates are separate", "always shares one copy", "is forbidden", "automatically uses SharedArrayBuffer"], correctIndex: 0, explanationUk: "Окремі isolate.", explanationEn: "Separate isolates." }
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
        conceptUk: "Оркестратор зазвичай надсилає SIGTERM перед примусовою зупинкою. Позначте сервіс неготовим, припиніть приймати нові з'єднання, дочекайтеся активних запитів і лише потім закрийте пул БД. Обмежте весь shutdown дедлайном; його перевищення — не успішне завершення, і незавершені запити не можна вважати злитими. process.exit може перервати незавершений вивід, тому за успіху дайте процесу завершитися природно. SIGINT часто надходить від Ctrl+C; на POSIX SIGKILL не перехопити. Реєструйте обробник до приймання трафіку й обробляйте помилки.",
        conceptEn: "An orchestrator normally sends SIGTERM before forced termination. Mark the service unready, stop accepting new connections, let in-flight requests finish, and only then close the database pool. Bound the entire shutdown with a deadline; exceeding it is not success and unfinished requests are not drained. process.exit can interrupt pending output, so allow a natural exit on success. SIGINT often comes from Ctrl+C; on POSIX SIGKILL cannot be caught. Register the handler before accepting traffic and handle errors.",
        code: "process.once('SIGTERM', () => {\n  markUnready();\n  const deadline = setTimeout(() => process.exit(1), 8000);\n  deadline.unref();\n  server.close(async (err) => {\n    if (err) { process.exitCode = 1; return; }\n    try { await db.end(); clearTimeout(deadline); }\n    catch (error) { console.error(error); process.exitCode = 1; }\n  });\n});",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Що варто зробити на початку обробки SIGTERM HTTP-сервісу?", promptEn: "What should an HTTP service do at the start of SIGTERM handling?", options: ["Позначити сервіс неготовим і припинити приймати нові з'єднання", "Одразу викликати process.exit(0)", "Ігнорувати сигнал", "Запустити ще воркери"], optionsEn: ["Mark the service unready and stop accepting new connections", "Immediately call process.exit(0)", "Ignore the signal", "Start more workers"], correctIndex: 0, explanationUk: "Після зупинки прийому дочекайтеся активних запитів і закрийте ресурси.", explanationEn: "After stopping intake, drain active requests and close resources." },
          { kind: "fill", promptUk: "Допишіть реєстрацію сигналу завершення", promptEn: "Fill in registering the shutdown signal", language: "javascript", code: "process.on('___', shutdown);", accepted: ["SIGTERM", "SIGINT"], caseSensitive: true, explanationUk: "У контейнері головний сигнал — SIGTERM.", explanationEn: "In a container the main signal is SIGTERM." },
          { kind: "mcq", promptUk: "Чому на POSIX не можна покладатись на обробник SIGKILL?", promptEn: "Why can you not rely on a SIGKILL handler on POSIX?", options: ["SIGKILL не перехоплюється користувацьким кодом", "SIGKILL ніколи не надсилається", "він завжди приходить раніше SIGTERM", "Node перетворює його на виняток"], optionsEn: ["SIGKILL cannot be caught by user code", "SIGKILL is never sent", "it always arrives before SIGTERM", "Node converts it into an exception"], correctIndex: 0, explanationUk: "Ядро примусово завершує процес.", explanationEn: "The kernel forcibly terminates the process." }
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
          { kind: "mcq", promptUk: "Навіщо hasSubscribers перед збором важкого корисного навантаження?", promptEn: "Why check hasSubscribers before building a heavy payload?", options: ["щоб не серіалізувати дані, коли ніхто не слухає", "інакше канал не існує", "це вимикає HTTP", "підписка тоді стає асинхронною"], optionsEn: ["to avoid preparing data when nobody is listening", "otherwise the channel does not exist", "it disables HTTP", "it makes subscriptions asynchronous"], correctIndex: 0, explanationUk: "Перевірка дозволяє пропустити непотрібну підготовку даних.", explanationEn: "The check lets you skip unnecessary payload preparation." },
          { kind: "fill", promptUk: "Допишіть _channel у назві вбудованого модуля діагностики.", promptEn: "Complete _channel in the built-in diagnostics module name.", language: "javascript", code: "import { channel } from 'node:diagnostics___';", accepted: ["_channel"], caseSensitive: true, explanationUk: "Модуль — node:diagnostics_channel.", explanationEn: "The module is node:diagnostics_channel." },
          { kind: "mcq", promptUk: "Чому діагностичний канал погана шина замовлень інтернет-магазину?", promptEn: "Why is a diagnostics channel a poor bus for an online shop's orders?", options: ["він синхронний, для інструментів, без гарантій доставки бізнес-подій", "канали заборонені в продакшені", "через нього не пройти рядок", "він працює лише в браузері"], optionsEn: ["it is synchronous instrumentation without durable business-event delivery", "channels are forbidden in production", "strings cannot pass through it", "it works only in browsers"], correctIndex: 0, explanationUk: "Це телеметрія, не черга задач.", explanationEn: "This is telemetry, not a task queue." }
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
        conceptUk: "AsyncLocalStorage зберігає значення в асинхронному контексті, наприклад request id. run() задає store для callback-а та асинхронної роботи, створеної всередині нього; getStore() читає його в цьому ланцюжку. За відсутності активного store getStore() повертає undefined. Не плутайте це з глобальною змінною і не зберігайте секрети без потреби. У воркер контекст автоматично не переноситься — передавайте потрібні дані явно. Деякі сторонні callback API можуть втрачати контекст; перевіряйте інтеграцію.",
        conceptEn: "AsyncLocalStorage stores a value in an asynchronous context, such as a request id. run() sets the store for its callback and asynchronous work created inside it; getStore() reads it within that chain. When no store is active, getStore() returns undefined. Do not confuse this with a global variable or retain secrets unnecessarily. Context is not automatically propagated to a worker; pass the needed data explicitly. Some third-party callback APIs can lose context, so verify the integration.",
        code: "import { AsyncLocalStorage } from 'node:async_hooks';\nconst als = new AsyncLocalStorage();\nals.run({ reqId: 'request-123' }, () => handler());\n// handler can read als.getStore()?.reqId",
        language: "javascript",
        retrieval: [
          { kind: "mcq", promptUk: "Чим AsyncLocalStorage відрізняється від глобальної змінної currentUser?", promptEn: "How does AsyncLocalStorage differ from a global currentUser variable?", options: ["значення прив'язане до асинхронного ланцюжка запиту, а не до всього процесу", "це те саме", "глобальна змінна краще в кластері", "ALS працює лише синхронно"], optionsEn: ["the value is bound to a request's async context rather than the whole process", "they are the same", "a global variable is better in a cluster", "ALS works only synchronously"], correctIndex: 0, explanationUk: "Для кожного запиту можна створити окремий store.", explanationEn: "Each request can receive a separate store." },
          { kind: "fill", promptUk: "Допишіть читання сховища контексту", promptEn: "Fill in reading the context store", language: "javascript", code: "const store = als.___();", accepted: ["getStore"], caseSensitive: true, explanationUk: "Метод — getStore.", explanationEn: "The method is getStore." },
          { kind: "mcq", promptUk: "Чи потрапить контекст ALS у worker_threads автоматично?", promptEn: "Does ALS context automatically reach worker_threads?", options: ["ні, його треба передати явно (workerData чи повідомлення)", "так, завжди", "так, якщо SharedArrayBuffer", "лише для SIGTERM"], optionsEn: ["no; pass the needed data explicitly via workerData or a message", "yes, always", "yes, if using SharedArrayBuffer", "only for SIGTERM"], correctIndex: 0, explanationUk: "Інший isolate — інший контекст.", explanationEn: "Another isolate is another context." }
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
      { promptUk: "Після SIGTERM HTTP-сервіс має…", promptEn: "After SIGTERM an HTTP service should…", options: ["закрити прийом з'єднань і дочекатися активних із дедлайном", "одразу викликати SIGKILL собі", "ігнорувати сигнал", "відкрити нові воркери"], optionsEn: ["stop accepting connections and drain active requests with a deadline", "immediately send SIGKILL to itself", "ignore the signal", "start more workers"], correctIndex: 0, explanationUk: "Граціозне завершення.", explanationEn: "A graceful shutdown." },
      { promptUk: "На POSIX SIGKILL…", promptEn: "On POSIX, SIGKILL…", options: ["не перехоплюється користувацьким кодом", "завжди приходить першим", "є синонімом SIGINT", "закриває лише stdio"], optionsEn: ["cannot be caught by user code", "always arrives first", "is a synonym for SIGINT", "only closes stdio"], correctIndex: 0, explanationUk: "Вкладіться в grace period.", explanationEn: "Finish within the grace period." },
      { promptUk: "hasSubscribers на діагностичному каналі потрібен, щоб…", promptEn: "hasSubscribers on a diagnostics channel is there to…", options: ["не збирати важке навантаження, коли ніхто не слухає", "вимкнути HTTP", "замінити EventEmitter", "передати контекст у воркер"], optionsEn: ["avoid building an expensive payload when nobody is listening", "disable HTTP", "replace EventEmitter", "pass context to a worker"], correctIndex: 0, explanationUk: "Дешева телеметрія.", explanationEn: "Cheap telemetry." },
      { promptUk: "AsyncLocalStorage зберігає значення…", promptEn: "AsyncLocalStorage stores a value…", options: ["у межах асинхронного ланцюжка, не глобально на процес", "назавжди в модулі", "лише синхронно в одному тіку", "у SharedArrayBuffer автоматично"], optionsEn: ["within an asynchronous context rather than globally for the process", "forever in a module", "only synchronously within one tick", "automatically in SharedArrayBuffer"], correctIndex: 0, explanationUk: "Контекст запиту.", explanationEn: "Request context." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandNodeFundamentals(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
