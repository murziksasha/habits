import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrder,
  codeOutputMcq,
  codeRead,
  codeRun,
  exam,
  lesson,
  matchEx,
  mcq,
  unit,
} from "./builders.js";

const miltechIntro = unit("miltech-intro", "MilTech intro · C++", "MilTech intro · C++", [
  lesson(
    "ec-miltech-path",
    "Специфіка C++ у Military Tech",
    "C++ specifics in Military Tech",
    1,
    true,
    [
      mcq(
        "ec-i1",
        "У MilTech-системах C++ часто обирають через:",
        "In MilTech systems C++ is often chosen for:",
        ["детермінізм, контроль пам'яті та продуктивність", "тільки красивий UI", "заміну SQL", "відсутність типів"],
        0,
      ),
      mcq(
        "ec-i2",
        "На що варто фокусуватися в C++ для польових систем?",
        "What should you focus on in C++ for field systems?",
        ["надійність, обмежені ресурси, передбачувана поведінка", "лише синтаксичний цукор", "тільки CSS", "відключення логів назавжди"],
        0,
      ),
      codeFill(
        "ec-i3",
        "Точка входу програми",
        "Program entry point",
        "cpp",
        "int ___() { return 0; }",
        ["main"],
        true,
      ),
      matchEx("ec-i4", "Шлях компіляції", "Compilation path", [
        { left: "source .cpp", right: "human-written code" },
        { left: "compiler", right: "to object code" },
        { left: "linker", right: "produces executable" },
      ]),
      codeOutputMcq(
        "ec-i4b",
        "Що виведе програма?",
        "What does this print?",
        "cpp",
        `#include <iostream>
using namespace std;
int main() {
  cout << 2 + 2 << endl;
  return 0;
}`,
        ["4", "22", "2+2", "error"],
        0,
      ),
      codeRun(
        "ec-i4c",
        "Lab: виведи координати 0 0",
        "Lab: print coordinates 0 0",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  // TODO: cout << 0 << " " << 0 << endl;
  return 0;
}
`,
        [{ stdout: "0 0" }],
        {
          requiredSource: ["cout", "main"],
          forbiddenSource: ["system("],
          hintUk: "cout << 0 << \" \" << 0 << endl;",
          hintEn: "cout << 0 << \" \" << 0 << endl;"
        },
      ),
    ],
  ),
  lesson(
    "ec-types-ops",
    "Типи, оператори, умови, bitmap",
    "Types, operators, conditions, bitmap",
    1,
    true,
    [
      mcq(
        "ec-i5",
        "uint8_t у контексті embedded зазвичай означає:",
        "uint8_t in embedded usually means:",
        ["8-бітове беззнакове ціле", "рядок UTF-16", "покажчик на float", "SQL тип"],
        0,
      ),
      codeFill(
        "ec-i6",
        "Бітова перевірка прапорця",
        "Bit flag test",
        "cpp",
        "if (flags ___ MASK) { /* bit set */ }",
        ["&"],
        true,
      ),
      codeRead(
        "ec-i7",
        "Що робить цей код?",
        "What does this code do?",
        "cpp",
        "flags |= (1u << 3);",
        ["встановлює біт 3", "очищає всі біти", "ділить на 3", "викликає SQL"],
        0,
      ),
      mcq(
        "ec-i8",
        "Патерн bitmap корисний для:",
        "Bitmap pattern is useful for:",
        ["компактних прапорців стану / можливостей", "зберігання відео 4K", "CSS layout", "заміни Git"],
        0,
      ),
      codeFill(
        "ec-i8b",
        "Очистити біт",
        "Clear bit",
        "cpp",
        "flags &= ~___;",
        ["MASK", "mask"],
        false,
      ),
      codeRun(
        "ec-i8c",
        "Lab: flags | 4 → 7 якщо flags=3",
        "Lab: flags|4 → 7 when flags=3",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int flags = 3;
  // TODO: set bit 2 (value 4), cout << flags
  return 0;
}
`,
        [{ stdout: "7" }],
        {
          requiredSource: ["flags", "cout"],
          hintUk: "flags |= 4; cout << flags;",
          hintEn: "flags |= 4; cout << flags;"
        },
      ),
    ],
  ),
  lesson(
    "ec-loops-fn",
    "Цикли, функції, main event loop",
    "Loops, functions, main event loop",
    1,
    true,
    [
      codeFill(
        "ec-i9",
        "Цикл for",
        "for loop",
        "cpp",
        "for (int i = 0; i < n; ++___) { }",
        ["i"],
        true,
      ),
      codeFill(
        "ec-i10",
        "Оголошення функції",
        "Function declaration",
        "cpp",
        "___ distance(double x, double y);",
        ["double"],
        true,
      ),
      mcq(
        "ec-i11",
        "Main event loop у embedded зазвичай:",
        "Main event loop in embedded usually:",
        ["циклічно читає вхід / оновлює стан / діє", "запускається один раз і завершується ОС", "є тільки в браузері", "замінює CMake"],
        0,
      ),
      codeOrder(
        "ec-i12",
        "Порядок простого control loop",
        "Simple control loop order",
        "cpp",
        ["read_sensors();", "update_state();", "send_commands();", "sleep_or_yield();"],
        ["read_sensors();", "update_state();", "send_commands();", "sleep_or_yield();"],
      ),
      codeRun(
        "ec-i12b",
        "Lab: 5 тіків циклу, cout ticks",
        "Lab: 5 loop ticks, cout ticks",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int ticks = 0;
  // TODO: for i=0..4 ticks++; then cout << ticks
  return 0;
}
`,
        [{ stdout: "5" }],
        {
          requiredSource: ["for", "cout"],
          hintUk: "for (int i=0;i<5;i++) ticks++; cout << ticks;",
          hintEn: "for (int i=0;i<5;i++) ticks++; cout << ticks;"
        },
      ),
    ],
  ),
  lesson(
    "ec-determinism-logs",
    "Детермінізм, логи, стандарти коду",
    "Determinism, logs, coding standards",
    2,
    true,
    [
      mcq(
        "ec-i13",
        "Детермінізм у control loop означає:",
        "Determinism in a control loop means:",
        ["передбачувана поведінка в часі/ресурсах", "випадкові sleep без бюджету", "лише красивий UI", "відключені логи назавжди"],
        0,
      ),
      matchEx("ec-i14", "Рівні логування", "Log levels", [
        { left: "ERROR", right: "failures needing attention" },
        { left: "WARN", right: "degraded but running" },
        { left: "DEBUG", right: "verbose diagnostics" },
      ]),
      mcq(
        "ec-i15",
        "Стандарти на кшталт MISRA-style допомагають:",
        "MISRA-style rules help:",
        ["зменшити небезпечні конструкції C/C++", "замінити unit tests", "прискорити Wi-Fi", "малювати QML"],
        0,
      ),
      codeFill(
        "ec-i16",
        "constexpr для констант",
        "constexpr for constants",
        "cpp",
        "___ int MAX_SENSORS = 8;",
        ["constexpr", "const"],
        false,
      ),
      mcq(
        "ec-i17",
        "У польовій системі краще уникати:",
        "In field systems better avoid:",
        ["необмежених динамічних алокацій у hot path", "явних типів розміру", "CRC перевірок", "watchdog"],
        0,
      ),
    ],
  ),
  exam("ec-intro-exam", "Контрольна: intro", "Exam: intro", 1, [
      mcq(
        "ec-ie1",
        "C++ у MilTech цінують за:",
        "C++ in MilTech valued for:",
        ["контроль ресурсів і швидкість", "тільки GUI", "SQL ORM", "CSS"],
        0,
      ),
      codeFill(
        "ec-ie2",
        "main",
        "main",
        "cpp",
        "int ___() { return 0; }",
        ["main"],
        true,
      ),
      codeFill(
        "ec-ie3",
        "bit and",
        "bit and",
        "cpp",
        "flags ___ MASK",
        ["&"],
        true,
      ),
      mcq(
        "ec-ie4",
        "Event loop:",
        "Event loop:",
        ["повторюваний цикл реагування на події", "лише linker step", "npm install", "git merge"],
        0,
      ),
      mcq(
        "ec-ie5",
        "Bitmap flags good for:",
        "Bitmap flags good for:",
        ["compact status bits", "4K video store", "CSS only", "git LFS"],
        0,
      ),
      codeRead(
        "ec-ie6",
        "flags &= ~MASK means:",
        "flags &= ~MASK means:",
        "cpp",
        "flags &= ~MASK;",
        ["clear bits in MASK", "set all bits", "divide flags", "open socket"],
        0,
      ),
      mcq(
        "ec-ie7",
        "Determinism priority:",
        "Determinism priority:",
        ["predictable timing & resources", "random sleeps OK", "skip logs forever", "ignore types"],
        0,
      ),
  ]),
]);

const memory = unit("memory", "Пам'ять і структури", "Memory & structures", [
  lesson(
    "ec-arrays-ptr",
    "Масиви, рядки, вказівники",
    "Arrays, strings, pointers",
    2,
    false,
    [
      mcq(
        "ec-m1",
        "Масив у C++ розміщується як:",
        "An array in C++ is laid out as:",
        ["послідовні елементи одного типу", "зв'язаний список за замовчуванням", "хеш-таблиця", "DOM-дерево"],
        0,
      ),
      codeFill(
        "ec-m2",
        "Розмір масиву (кількість елементів)",
        "Array length (element count)",
        "cpp",
        "int a[10]; size_t n = ___(a) / sizeof(a[0]);",
        ["sizeof"],
        true,
      ),
      codeFill(
        "ec-m3",
        "Оголошення вказівника",
        "Pointer declaration",
        "cpp",
        "int___ p = &x;",
        ["*"],
        true,
      ),
      mcq(
        "ec-m4",
        "Типова помилка з масивами:",
        "Typical array bug:",
        ["вихід за межі індексів (buffer overrun)", "занадто багато SQL", "відсутність CSS", "зайвий npm"],
        0,
      ),
      codeRun(
        "ec-m4b",
        "Lab: сума масиву 1+2+3",
        "Lab: sum array 1+2+3",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int a[3] = {1, 2, 3};
  int s = 0;
  // TODO: for loop sum into s, then cout << s
  return 0;
}
`,
        [{ stdout: "6" }],
        {
          requiredSource: ["for", "cout", "a["],
          hintUk: "for (int i=0;i<3;i++) s += a[i]; cout << s;",
          hintEn: "for (int i=0;i<3;i++) s += a[i]; cout << s;"
        },
      ),
    ],
  ),
  lesson(
    "ec-struct-align",
    "Структури, enum, union, alignment",
    "Structs, enum, union, alignment",
    2,
    false,
    [
      codeFill(
        "ec-m5",
        "Структура телеметрії",
        "Telemetry struct",
        "cpp",
        "___ Pose { double x; double y; double yaw; };",
        ["struct"],
        true,
      ),
      codeFill(
        "ec-m6",
        "enum class",
        "enum class",
        "cpp",
        "enum ___ Mode { Idle, Fly, Land };",
        ["class"],
        true,
      ),
      mcq(
        "ec-m7",
        "Вирівнювання пам'яті (alignment) важливе, бо:",
        "Memory alignment matters because:",
        ["впливає на розмір структур і доступ до пам'яті на MCU", "лише на колір UI", "скасовує TCP", "замінює Git"],
        0,
      ),
      matchEx("ec-m8", "Типи даних", "Data kinds", [
        { left: "struct", right: "named fields" },
        { left: "enum", right: "named constants" },
        { left: "union", right: "shared storage variants" },
      ]),
      mcq(
        "ec-m8b",
        "union дозволяє:",
        "union allows:",
        ["різні інтерпретації спільної пам'яті", "нескінченний heap", "заміну CRC", "відключення IRQ"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-endian-pack",
    "Endianness, packed layout, ownership",
    "Endianness, packed layout, ownership",
    3,
    false,
    [
      mcq(
        "ec-m9",
        "Little-endian означає:",
        "Little-endian means:",
        ["молодший байт за нижчою адресою", "старший байт завжди перший у мережі без конверсії", "лише float layout", "відсутність байтів"],
        0,
      ),
      codeFill(
        "ec-m10",
        "Pack hi/lo bytes",
        "Pack hi/lo bytes",
        "cpp",
        "uint16_t v = (uint16_t(hi) << 8) | ___;",
        ["lo", "uint16_t(lo)"],
        false,
      ),
      mcq(
        "ec-m11",
        "Packed struct ризики:",
        "Packed struct risks:",
        ["unaligned access / portability costs", "faster always free", "replaces CRC", "deletes pointers"],
        0,
      ),
      matchEx("ec-m12", "Ownership", "Ownership", [
        { left: "owner pointer", right: "responsible for free" },
        { left: "borrow/view", right: "no free rights" },
        { left: "null check", right: "guard before deref" },
      ]),
      codeRun(
        "ec-m13",
        "Lab: pack bytes hi=1 lo=2 → 258",
        "Lab: pack bytes hi=1 lo=2 → 258",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int hi = 1, lo = 2;
  // TODO: v = (hi<<8)|lo; cout << v
  return 0;
}
`,
        [{ stdout: "258" }],
        {
          requiredSource: ["<<", "cout"],
          hintUk: "cout << ((hi<<8)|lo);",
          hintEn: "cout << ((hi<<8)|lo);"
        },
      ),
    ],
  ),
  exam("ec-mem-exam", "Контрольна: memory", "Exam: memory", 2, [
      codeFill(
        "ec-me1",
        "pointer",
        "pointer",
        "cpp",
        "int___ p = &x;",
        ["*"],
        true,
      ),
      codeFill(
        "ec-me2",
        "struct",
        "struct",
        "cpp",
        "___ Point { int x; int y; };",
        ["struct"],
        true,
      ),
      mcq(
        "ec-me3",
        "Buffer overrun:",
        "Buffer overrun:",
        ["write past array bounds", "git commit", "CSS overflow only", "npm audit"],
        0,
      ),
      mcq(
        "ec-me4",
        "Alignment affects:",
        "Alignment affects:",
        ["struct size & access", "only fonts", "only DNS", "only HTML"],
        0,
      ),
      mcq(
        "ec-me5",
        "Little-endian:",
        "Little-endian:",
        ["LSB at lower address", "always network order", "no bytes", "SQL only"],
        0,
      ),
      codeFill(
        "ec-me6",
        "sizeof",
        "sizeof",
        "cpp",
        "size_t n = ___(a) / sizeof(a[0]);",
        ["sizeof"],
        true,
      ),
      matchEx("ec-me7", "Kinds", "Kinds", [
        { left: "enum", right: "named constants" },
        { left: "union", right: "shared storage" },
      ]),
  ]),
]);

const resources = unit("resources", "Ресурси і I/O", "Resources & I/O", [
  lesson(
    "ec-files-threads",
    "Файли та багатопоточність",
    "Files and multithreading",
    2,
    false,
    [
      codeFill(
        "ec-r1",
        "Відкрити ifstream",
        "Open ifstream",
        "cpp",
        "std::___ in(\"log.bin\", std::ios::binary);",
        ["ifstream"],
        true,
      ),
      mcq(
        "ec-r2",
        "Додаткові потоки потрібні, коли:",
        "Extra threads are useful when:",
        ["паралельна I/O / блокуючі операції, але з ризиками data race", "замість типів", "щоб вимкнути CMake", "лише для CSS"],
        0,
      ),
      codeFill(
        "ec-r3",
        "std::thread",
        "std::thread",
        "cpp",
        "std::___ t(worker); t.join();",
        ["thread"],
        true,
      ),
      mcq(
        "ec-r4",
        "Data race — це:",
        "A data race is:",
        ["конкурентний доступ без синхронізації з UB", "швидкий TCP", "помилка CSS", "успішний unit test"],
        0,
      ),
      codeFill(
        "ec-r4b",
        "mutex lock guard idea",
        "mutex lock guard idea",
        "cpp",
        "std::___ lock(m);",
        ["lock_guard", "unique_lock"],
        false,
      ),
    ],
  ),
  lesson(
    "ec-heap-raii",
    "Динамічна пам'ять і RAII",
    "Dynamic memory & RAII",
    2,
    false,
    [
      mcq(
        "ec-r5",
        "Heap (динамічна пам'ять) відрізняється тим, що:",
        "Heap (dynamic memory) differs in that:",
        ["час життя контролює програміст (new/delete або smart ptr)", "завжди швидша за stack", "не існує в C++", "лише для HTML"],
        0,
      ),
      codeFill(
        "ec-r6",
        "unique_ptr",
        "unique_ptr",
        "cpp",
        "auto p = std::___<Buffer>(n);",
        ["make_unique"],
        true,
      ),
      codeRead(
        "ec-r7",
        "RAII означає:",
        "RAII means:",
        "cpp",
        "class File { File(const char* p){ open(p);} ~File(){ close(); } };",
        ["ресурс захоплюється в ctor і звільняється в dtor", "лише manual free у main", "відключення винятків", "заміну linker"],
        0,
      ),
      mcq(
        "ec-r8",
        "Утечка пам'яті (leak) — це:",
        "A memory leak is:",
        ["виділили і не звільнили / втратили вказівник", "успішний CRC", "git stash", "npm start"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-ownership-patterns",
    "Ownership patterns · no-leak habits",
    "Ownership patterns · no-leak habits",
    3,
    false,
    [
      mcq(
        "ec-r9",
        "unique_ptr vs shared_ptr:",
        "unique_ptr vs shared_ptr:",
        ["unique — один власник; shared — shared ownership", "shared never frees", "unique for SQL only", "same always"],
        0,
      ),
      codeFill(
        "ec-r10",
        "shared_ptr",
        "shared_ptr",
        "cpp",
        "std::___<Node> n;",
        ["shared_ptr"],
        true,
      ),
      matchEx("ec-r11", "Sync tools", "Sync tools", [
        { left: "mutex", right: "mutual exclusion" },
        { left: "atomic", right: "lock-free simple ops" },
        { left: "condition_variable", right: "wait/notify" },
      ]),
      mcq(
        "ec-r12",
        "У hot path на MCU краще:",
        "On MCU hot path better:",
        ["static/stack buffers with known size", "unlimited heap churn", "new in ISR casually", "ignore ownership"],
        0,
      ),
      codeRun(
        "ec-r13",
        "Lab: clamp 150 into [0,100] → 100",
        "Lab: clamp 150 into [0,100] → 100",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int v = 150;
  int lo = 0, hi = 100;
  // TODO: if v>hi v=hi; if v<lo v=lo; cout << v
  return 0;
}
`,
        [{ stdout: "100" }],
        {
          requiredSource: ["cout"],
          hintUk: "if(v>hi)v=hi; if(v<lo)v=lo; cout<<v;",
          hintEn: "if(v>hi)v=hi; if(v<lo)v=lo; cout<<v;"
        },
      ),
    ],
  ),
  exam("ec-res-exam", "Контрольна: resources", "Exam: resources", 2, [
      codeFill(
        "ec-re1",
        "ifstream",
        "ifstream",
        "cpp",
        "std::___ f(\"a.txt\");",
        ["ifstream"],
        true,
      ),
      codeFill(
        "ec-re2",
        "unique",
        "unique",
        "cpp",
        "std::___<int>(1);",
        ["make_unique"],
        true,
      ),
      mcq(
        "ec-re3",
        "RAII:",
        "RAII:",
        ["resource tied to object lifetime", "only SQL join", "CSS flex", "DNS only"],
        0,
      ),
      mcq(
        "ec-re4",
        "Data race risk:",
        "Data race risk:",
        ["shared mutable without sync", "read-only const", "single-thread always safe", "git only"],
        0,
      ),
      codeFill(
        "ec-re5",
        "thread",
        "thread",
        "cpp",
        "std::___ t(fn);",
        ["thread"],
        true,
      ),
      mcq(
        "ec-re6",
        "MCU hot path:",
        "MCU hot path:",
        ["prefer fixed buffers", "unlimited new always", "skip RAII", "ignore races"],
        0,
      ),
  ]),
]);

const linuxDev = unit("linux-dev", "Linux · Bash · Git", "Linux · Bash · Git", [
  lesson(
    "ec-linux-bash",
    "Linux FS, термінал, bash",
    "Linux FS, terminal, bash",
    2,
    false,
    [
      matchEx("ec-l1", "Шляхи Linux", "Linux paths", [
        { left: "/", right: "filesystem root" },
        { left: "/home", right: "user homes" },
        { left: "/dev", right: "device nodes" },
      ]),
      codeFill(
        "ec-l2",
        "Список файлів",
        "List files",
        "bash",
        "___ -la",
        ["ls"],
        true,
      ),
      codeFill(
        "ec-l3",
        "SSH до пристрою",
        "SSH to device",
        "bash",
        "___ user@192.168.1.10",
        ["ssh"],
        true,
      ),
      mcq(
        "ec-l4",
        "chmod +x script.sh:",
        "chmod +x script.sh:",
        ["робить скрипт виконуваним", "компілює C++", "створює Docker image", "відкриває Qt"],
        0,
      ),
      codeFill(
        "ec-l4b",
        "Copy file",
        "Copy file",
        "bash",
        "___ src.bin /opt/app/",
        ["cp"],
        true,
      ),
    ],
  ),
  lesson(
    "ec-containers-git",
    "Контейнери і Git",
    "Containers & Git",
    2,
    false,
    [
      mcq(
        "ec-l5",
        "Контейнери для dev корисні, бо:",
        "Containers help dev because:",
        ["відтворюване середовище збірки/залежностей", "замінюють Git", "прискорюють CSS", "вимикають типи"],
        0,
      ),
      codeFill(
        "ec-l6",
        "git clone",
        "git clone",
        "bash",
        "git ___ https://…/repo.git",
        ["clone"],
        true,
      ),
      codeFill(
        "ec-l7",
        "гілка",
        "branch",
        "bash",
        "git ___ -b feature/telemetry",
        ["checkout", "switch"],
        false,
      ),
      mcq(
        "ec-l8",
        "Що краще НЕ комітити?",
        "What should you usually NOT commit?",
        ["секрети, build artifacts, великі бінарники", "README", "CMakeLists.txt", "unit tests"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-field-deploy",
    "Field deploy · logs · transfer",
    "Field deploy · logs · transfer",
    3,
    false,
    [
      codeFill(
        "ec-l9",
        "scp file to device",
        "scp file to device",
        "bash",
        "___ firmware.bin user@host:/opt/",
        ["scp"],
        true,
      ),
      mcq(
        "ec-l10",
        "journalctl / logs help:",
        "journalctl / logs help:",
        ["diagnose field failures after deploy", "replace CRC", "paint QML", "delete types"],
        0,
      ),
      matchEx("ec-l11", "Deploy tools", "Deploy tools", [
        { left: "ssh", right: "remote shell" },
        { left: "scp/rsync", right: "copy artifacts" },
        { left: "systemd", right: "service lifecycle" },
      ]),
      mcq(
        "ec-l12",
        "Log rotation needed because:",
        "Log rotation needed because:",
        ["disks fill; retain recent diagnostics", "logs never grow", "replaces Git", "disables SSH"],
        0,
      ),
      codeOrder(
        "ec-l13",
        "Safe deploy order",
        "Safe deploy order",
        "bash",
        ["stop service", "copy binary", "start service", "check logs"],
        ["stop service", "copy binary", "start service", "check logs"],
      ),
    ],
  ),
  exam("ec-linux-exam", "Контрольна: linux/git", "Exam: linux/git", 2, [
      codeFill(
        "ec-le1",
        "ls",
        "ls",
        "bash",
        "___ -la",
        ["ls"],
        true,
      ),
      codeFill(
        "ec-le2",
        "ssh",
        "ssh",
        "bash",
        "___ user@host",
        ["ssh"],
        true,
      ),
      codeFill(
        "ec-le3",
        "clone",
        "clone",
        "bash",
        "git ___ url",
        ["clone"],
        true,
      ),
      mcq(
        "ec-le4",
        "Containers give:",
        "Containers give:",
        ["reproducible env", "free RAM always", "replace MCU", "delete types"],
        0,
      ),
      codeFill(
        "ec-le5",
        "scp",
        "scp",
        "bash",
        "___ file user@h:/path",
        ["scp"],
        true,
      ),
      mcq(
        "ec-le6",
        "Do not commit:",
        "Do not commit:",
        ["secrets & huge binaries", "README", "tests", "CMakeLists"],
        0,
      ),
  ]),
]);

const oopStl = unit("oop-stl", "ООП · templates · STL", "OOP · templates · STL", [
  lesson(
    "ec-oop-basics",
    "Класи, інкапсуляція, virtual",
    "Classes, encapsulation, virtual",
    2,
    false,
    [
      codeFill(
        "ec-o1",
        "Клас",
        "Class",
        "cpp",
        "___ Sensor { public: double read(); private: int fd_; };",
        ["class"],
        true,
      ),
      mcq(
        "ec-o2",
        "Інкапсуляція ресурсів у клас допомагає:",
        "Encapsulating resources in a class helps:",
        ["керувати lifetime і API доступу", "прибрати CMake", "замінити TCP", "вимкнути тести"],
        0,
      ),
      codeFill(
        "ec-o3",
        "Віртуальний метод",
        "Virtual method",
        "cpp",
        "___ double sample() = 0;",
        ["virtual"],
        true,
      ),
      codeRead(
        "ec-o4",
        "override означає:",
        "override means:",
        "cpp",
        "double sample() override;",
        ["перевизначає virtual базового класу", "видаляє метод", "лише macro", "SQL view"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-templates-stl",
    "Templates, vector, smart pointers",
    "Templates, vector, smart pointers",
    3,
    false,
    [
      codeFill(
        "ec-o5",
        "Шаблон функції",
        "Function template",
        "cpp",
        "___<typename T> T clamp(T v, T lo, T hi);",
        ["template"],
        true,
      ),
      codeFill(
        "ec-o6",
        "std::vector",
        "std::vector",
        "cpp",
        "std::___<double> samples;",
        ["vector"],
        true,
      ),
      codeFill(
        "ec-o7",
        "shared_ptr",
        "shared_ptr",
        "cpp",
        "std::___<Node> n;",
        ["shared_ptr"],
        true,
      ),
      mcq(
        "ec-o8",
        "O(n) означає:",
        "O(n) means:",
        ["час росте лінійно з розміром входу", "завжди константа", "тільки SQL", "помилка linker"],
        0,
      ),
      codeRun(
        "ec-o8b",
        "Lab: сума {1,2,3,4}",
        "Lab: sum {1,2,3,4}",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int v[4] = {1, 2, 3, 4};
  int s = 0;
  // TODO: sum, cout << s
  return 0;
}
`,
        [{ stdout: "10" }],
        {
          requiredSource: ["for", "cout", "v["],
          hintUk: "for(int i=0;i<4;i++)s+=v[i]; cout<<s;",
          hintEn: "for(int i=0;i<4;i++)s+=v[i]; cout<<s;"
        },
      ),
    ],
  ),
  lesson(
    "ec-drivers-poly",
    "Driver interfaces · complexity",
    "Driver interfaces · complexity",
    3,
    false,
    [
      mcq(
        "ec-o9",
        "Abstract Sensor interface helps:",
        "Abstract Sensor interface helps:",
        ["swap mock/real drivers in tests", "delete CMake", "skip CRC", "force heap always"],
        0,
      ),
      codeFill(
        "ec-o10",
        "pure virtual",
        "pure virtual",
        "cpp",
        "virtual int read() = ___;",
        ["0"],
        true,
      ),
      matchEx("ec-o11", "Complexity", "Complexity", [
        { left: "O(1)", right: "constant time" },
        { left: "O(n)", right: "linear scan" },
        { left: "O(n log n)", right: "typical sort" },
      ]),
      mcq(
        "ec-o12",
        "unique_ptr for driver ownership:",
        "unique_ptr for driver ownership:",
        ["clear single owner of hardware handle", "shared free-for-all", "SQL only", "CSS only"],
        0,
      ),
      codeRun(
        "ec-o13",
        "Lab: count values > 5 in {3,6,7,2}",
        "Lab: count values > 5 in {3,6,7,2}",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int a[4]={3,6,7,2};
  int c=0;
  // TODO: count a[i]>5; cout << c
  return 0;
}
`,
        [{ stdout: "2" }],
        {
          requiredSource: ["for", "cout"],
          hintUk: "if(a[i]>5)c++;",
          hintEn: "if(a[i]>5)c++;"
        },
      ),
    ],
  ),
  exam("ec-oop-exam", "Контрольна: OOP/STL", "Exam: OOP/STL", 2, [
      codeFill(
        "ec-oe1",
        "class",
        "class",
        "cpp",
        "___ Foo {};",
        ["class"],
        true,
      ),
      codeFill(
        "ec-oe2",
        "virtual",
        "virtual",
        "cpp",
        "___ void run();",
        ["virtual"],
        true,
      ),
      codeFill(
        "ec-oe3",
        "vector",
        "vector",
        "cpp",
        "std::___<int> v;",
        ["vector"],
        true,
      ),
      mcq(
        "ec-oe4",
        "unique_ptr vs raw:",
        "unique_ptr vs raw:",
        ["owns and auto-frees", "never frees", "SQL only", "CSS only"],
        0,
      ),
      codeFill(
        "ec-oe5",
        "template",
        "template",
        "cpp",
        "___<typename T> T id(T x);",
        ["template"],
        true,
      ),
      mcq(
        "ec-oe6",
        "Polymorphic drivers:",
        "Polymorphic drivers:",
        ["test with mocks + swap HW", "ban interfaces", "skip tests", "only macros"],
        0,
      ),
  ]),
]);

const toolchain = unit("toolchain", "CMake · debug · tests", "CMake · debug · tests", [
  lesson(
    "ec-cmake-build",
    "Збірка: етапи, make, CMake",
    "Build: stages, make, CMake",
    2,
    false,
    [
      matchEx("ec-t1", "Етапи", "Stages", [
        { left: "preprocess", right: "macros & includes" },
        { left: "compile", right: "to object files" },
        { left: "link", right: "final binary" },
      ]),
      codeFill(
        "ec-t2",
        "CMake мінімум",
        "CMake minimum",
        "cmake",
        "___(VERSION 3.16)",
        ["cmake_minimum_required"],
        true,
      ),
      codeFill(
        "ec-t3",
        "add_executable",
        "add_executable",
        "cmake",
        "___(app main.cpp)",
        ["add_executable"],
        true,
      ),
      mcq(
        "ec-t4",
        "CMake потрібен щоб:",
        "CMake is used to:",
        ["описувати кросплатформенну збірку проєкту", "малювати QML", "замінювати TCP", "хешувати паролі"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-debug-test",
    "GDB, sanitizers, GTest, clean code",
    "GDB, sanitizers, GTest, clean code",
    3,
    false,
    [
      mcq(
        "ec-t5",
        "AddressSanitizer допомагає знайти:",
        "AddressSanitizer helps find:",
        ["помилки пам'яті (use-after-free, OOB)", "лише CSS bugs", "DNS timeouts", "git conflicts"],
        0,
      ),
      codeFill(
        "ec-t6",
        "Google Test assert",
        "Google Test assert",
        "cpp",
        "___(distance(3,4), 5);",
        ["EXPECT_EQ"],
        true,
      ),
      mcq(
        "ec-t7",
        "TDD у спрощеному вигляді:",
        "TDD in short:",
        ["тест → реалізація → рефакторинг", "тільки деплой без тестів", "лише UI mockups", "вимкнути CI"],
        0,
      ),
      matchEx("ec-t8", "Якість коду", "Code quality", [
        { left: "clang-format", right: "formatting" },
        { left: "clang-tidy", right: "static analysis" },
        { left: "SOLID", right: "design principles" },
      ]),
    ],
  ),
  lesson(
    "ec-ci-firmware",
    "CI · golden tests · static analysis",
    "CI · golden tests · static analysis",
    3,
    false,
    [
      mcq(
        "ec-t9",
        "CI for firmware should:",
        "CI for firmware should:",
        ["build + unit tests on every change", "only manual laptop builds", "skip sanitizers always", "commit secrets"],
        0,
      ),
      codeFill(
        "ec-t10",
        "EXPECT_TRUE",
        "EXPECT_TRUE",
        "cpp",
        "___(ok);",
        ["EXPECT_TRUE"],
        true,
      ),
      mcq(
        "ec-t11",
        "Golden test compares:",
        "Golden test compares:",
        ["output against known-good fixture", "random UI colors only", "git blame", "DNS TTL"],
        0,
      ),
      matchEx("ec-t12", "Tools", "Tools", [
        { left: "ASan", right: "memory bugs" },
        { left: "UBSan", right: "undefined behavior" },
        { left: "GTest", right: "unit assertions" },
      ]),
      mcq(
        "ec-t13",
        "clang-tidy helps catch:",
        "clang-tidy helps catch:",
        ["suspicious patterns before runtime", "only fonts", "UDP PHY faults", "battery chemistry"],
        0,
      ),
    ],
  ),
  exam("ec-tool-exam", "Контрольна: toolchain", "Exam: toolchain", 2, [
      codeFill(
        "ec-te1",
        "add_executable",
        "add_executable",
        "cmake",
        "___(app main.cpp)",
        ["add_executable"],
        true,
      ),
      mcq(
        "ec-te2",
        "ASan finds:",
        "ASan finds:",
        ["memory bugs", "only fonts", "only MQTT topics", "SQL joins"],
        0,
      ),
      codeFill(
        "ec-te3",
        "EXPECT_EQ",
        "EXPECT_EQ",
        "cpp",
        "___(a, b);",
        ["EXPECT_EQ"],
        true,
      ),
      mcq(
        "ec-te4",
        "clang-format:",
        "clang-format:",
        ["auto format style", "runtime GC", "UDP stack", "GPU driver"],
        0,
      ),
      codeFill(
        "ec-te5",
        "cmake_minimum_required",
        "cmake_minimum_required",
        "cmake",
        "___(VERSION 3.16)",
        ["cmake_minimum_required"],
        true,
      ),
      mcq(
        "ec-te6",
        "CI goal:",
        "CI goal:",
        ["automate build+test", "ban tests", "skip analysis", "store passwords in repo"],
        0,
      ),
  ]),
]);

const networking = unit("networking", "Протоколи · UDP/TCP", "Protocols · UDP/TCP", [
  lesson(
    "ec-osi-serial",
    "OSI, серіалізація, CRC",
    "OSI, serialization, CRC",
    2,
    false,
    [
      mcq(
        "ec-n1",
        "Модель OSI описує:",
        "The OSI model describes:",
        ["шари мережевої взаємодії", "лише CMake targets", "CSS cascade", "Git branches"],
        0,
      ),
      mcq(
        "ec-n2",
        "Серіалізація — це:",
        "Serialization is:",
        ["перетворення структури даних у послідовність байтів", "видалення об'єктів", "збірка Docker", "рендер QML"],
        0,
      ),
      codeFill(
        "ec-n3",
        "CRC у пакеті",
        "CRC in packet",
        "cpp",
        "uint16_t crc = ___(payload, len);",
        ["crc16"],
        true,
      ),
      mcq(
        "ec-n4",
        "CRC/ECC потрібні для:",
        "CRC/ECC are needed for:",
        ["виявлення (і корекції) помилок передачі", "стиснення відео 8K", "заміни SSH", "форматування коду"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-udp-tcp",
    "UDP vs TCP, сокети",
    "UDP vs TCP, sockets",
    3,
    false,
    [
      matchEx("ec-n5", "UDP vs TCP", "UDP vs TCP", [
        { left: "UDP", right: "datagram, low latency" },
        { left: "TCP", right: "stream, reliable ordered" },
        { left: "telemetry burst", right: "often UDP" },
      ]),
      codeFill(
        "ec-n6",
        "Створити UDP socket (POSIX sketch)",
        "Create UDP socket (POSIX sketch)",
        "cpp",
        "int fd = ___(AF_INET, SOCK_DGRAM, 0);",
        ["socket"],
        true,
      ),
      codeFill(
        "ec-n7",
        "sendto",
        "sendto",
        "cpp",
        "___(fd, buf, n, 0, (sockaddr*)&addr, sizeof(addr));",
        ["sendto"],
        true,
      ),
      mcq(
        "ec-n8",
        "TCP краще, коли критично:",
        "TCP is better when critical:",
        ["надійна впорядкована доставка", "мінімальна затримка будь-якою ціною без ACK", "тільки broadcast Wi-Fi", "рендер CSS"],
        0,
      ),
      codeRun(
        "ec-n8b",
        "Lab: XOR checksum 1,2,3",
        "Lab: XOR checksum 1,2,3",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  unsigned char data[3] = {1, 2, 3};
  unsigned char c = 0;
  // TODO: XOR all, cout << (int)c
  return 0;
}
`,
        [{ stdout: "0" }],
        {
          requiredSource: ["^", "cout"],
          hintUk: "c ^= data[i]; 1^2^3=0",
          hintEn: "c ^= data[i]; 1^2^3=0"
        },
      ),
    ],
  ),
  lesson(
    "ec-framing-seq",
    "Framing · sequence · retransmit",
    "Framing · sequence · retransmit",
    3,
    false,
    [
      mcq(
        "ec-n9",
        "Frame usually includes:",
        "Frame usually includes:",
        ["header + length + payload + checksum", "only CSS classes", "git hash only", "QML anchors"],
        0,
      ),
      codeFill(
        "ec-n10",
        "seq wrap example",
        "seq wrap example",
        "cpp",
        "seq = (seq + 1) % ___;",
        ["256", "N", "MOD"],
        false,
      ),
      matchEx("ec-n11", "Reliability tactics", "Reliability tactics", [
        { left: "ACK", right: "confirm delivery" },
        { left: "retransmit", right: "resend on loss" },
        { left: "seq number", right: "detect gaps/dupes" },
      ]),
      mcq(
        "ec-n12",
        "On lossy radio telemetry often:",
        "On lossy radio telemetry often:",
        ["UDP + app-level seq/CRC", "pure TCP only always", "no checksums", "random bytes"],
        0,
      ),
      codeRun(
        "ec-n13",
        "Lab: seq 255 +1 mod 256 → 0",
        "Lab: seq 255+1 mod 256 → 0",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int seq = 255;
  // TODO: seq = (seq+1)%256; cout << seq
  return 0;
}
`,
        [{ stdout: "0" }],
        {
          requiredSource: ["%", "cout"],
          hintUk: "seq=(seq+1)%256; cout<<seq;",
          hintEn: "seq=(seq+1)%256; cout<<seq;"
        },
      ),
    ],
  ),
  exam("ec-net-exam", "Контрольна: networking", "Exam: networking", 2, [
      mcq(
        "ec-ne1",
        "Serialization:",
        "Serialization:",
        ["bytes representation of data", "only UI theme", "git rebase", "npm pack"],
        0,
      ),
      mcq(
        "ec-ne2",
        "UDP:",
        "UDP:",
        ["connectionless datagrams", "always ordered reliable", "SQL dialect", "QML engine"],
        0,
      ),
      codeFill(
        "ec-ne3",
        "socket",
        "socket",
        "cpp",
        "int fd = ___(AF_INET, SOCK_DGRAM, 0);",
        ["socket"],
        true,
      ),
      mcq(
        "ec-ne4",
        "CRC detects:",
        "CRC detects:",
        ["transmission bit errors", "CSS bugs", "unused imports only", "DNS cache"],
        0,
      ),
      codeFill(
        "ec-ne5",
        "sendto",
        "sendto",
        "cpp",
        "___(fd, buf, n, 0, addr, alen);",
        ["sendto"],
        true,
      ),
      matchEx("ec-ne6", "Frame parts", "Frame parts", [
        { left: "seq", right: "ordering/gaps" },
        { left: "crc", right: "integrity check" },
      ]),
      mcq(
        "ec-ne7",
        "Retransmit used when:",
        "Retransmit used when:",
        ["packet likely lost", "CRC always perfect", "UI redraw", "git merge"],
        0,
      ),
  ]),
]);

const miltechCheckpoint = unit("miltech-checkpoint", "Checkpoint · mid exam", "Checkpoint · mid exam", [
  exam("ec-mid-exam", "Проміжна контрольна MilTech", "MilTech mid-course exam", 2, [
      mcq(
        "ec-mid1",
        "C++ field priority:",
        "C++ field priority:",
        ["reliability & resources", "pretty UI only", "skip tests", "ignore memory"],
        0,
      ),
      codeFill(
        "ec-mid2",
        "bit or set",
        "bit or set",
        "cpp",
        "flags ___= MASK;",
        ["|"],
        true,
      ),
      codeFill(
        "ec-mid3",
        "unique_ptr",
        "unique_ptr",
        "cpp",
        "std::___<T> p;",
        ["unique_ptr"],
        true,
      ),
      codeFill(
        "ec-mid4",
        "add_executable",
        "add_executable",
        "cmake",
        "___(app main.cpp)",
        ["add_executable"],
        true,
      ),
      mcq(
        "ec-mid5",
        "UDP good for:",
        "UDP good for:",
        ["low-latency telemetry bursts", "always file transfer only", "replace flash", "CSS minify"],
        0,
      ),
      mcq(
        "ec-mid6",
        "RAII:",
        "RAII:",
        ["resource lifetime = object lifetime", "manual free only in ISR", "no destructors", "SQL trigger"],
        0,
      ),
      codeFill(
        "ec-mid7",
        "EXPECT_EQ",
        "EXPECT_EQ",
        "cpp",
        "___(a,b);",
        ["EXPECT_EQ"],
        true,
      ),
      matchEx("ec-mid8", "Build stages", "Build stages", [
        { left: "compile", right: "object code" },
        { left: "link", right: "executable" },
      ]),
      mcq(
        "ec-mid9",
        "Buffer overrun is:",
        "Buffer overrun is:",
        ["write past bounds", "git push", "npm audit only", "font overflow"],
        0,
      ),
      codeRead(
        "ec-mid10",
        "Event loop idea:",
        "Event loop idea:",
        "cpp",
        "while(running){ poll(); act(); }",
        ["cooperative control cycle", "single OS exit only", "Qt moc only", "CRC poly"],
        0,
      ),
  ]),
]);

const qtQml = unit("qt-qml", "Qt · QML · MVC", "Qt · QML · MVC", [
  lesson(
    "ec-qt-arch",
    "Qt: signals/slots, event loop",
    "Qt: signals/slots, event loop",
    2,
    false,
    [
      mcq(
        "ec-q1",
        "Qt — це:",
        "Qt is:",
        ["кросплатформенний C++ фреймворк (UI + tools)", "SQL database", "FreeRTOS port", "MAVLink dialect"],
        0,
      ),
      matchEx("ec-q2", "Qt tooling", "Qt tooling", [
        { left: "moc", right: "meta-object compiler" },
        { left: "uic", right: "UI forms compiler" },
        { left: "rcc", right: "resources compiler" },
      ]),
      codeFill(
        "ec-q3",
        "connect signal/slot",
        "connect signal/slot",
        "cpp",
        "QObject::___(btn, &QPushButton::clicked, this, &Win::onClick);",
        ["connect"],
        true,
      ),
      mcq(
        "ec-q4",
        "Signals/slots реалізують патерн:",
        "Signals/slots implement:",
        ["observer / event-driven зв'язок", "лише MVC model", "TCP handshake", "CRC"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-qml-mvc",
    "QML, моделі даних, MVC",
    "QML, data models, MVC",
    3,
    false,
    [
      mcq(
        "ec-q5",
        "QML vs QtWidgets:",
        "QML vs QtWidgets:",
        ["QML — декларативний UI; Widgets — класичний C++ UI", "QML замінює C++ runtime", "Widgets тільки для Python", "однаково без різниці"],
        0,
      ),
      codeFill(
        "ec-q6",
        "QML property binding (idea)",
        "QML property binding (idea)",
        "qml",
        "Text { ___: model.altitude }",
        ["text"],
        true,
      ),
      mcq(
        "ec-q7",
        "MVC розділяє:",
        "MVC separates:",
        ["дані (Model), вигляд (View), логіку (Controller)", "лише UDP/TCP", "тільки CMake stages", "гілки Git"],
        0,
      ),
      codeRead(
        "ec-q8",
        "Навіщо ListModel / custom model?",
        "Why ListModel / custom model?",
        "qml",
        "ListView { model: telemetryModel }",
        ["відображати колекції об'єктів у UI", "компілювати kernel", "замінити FreeRTOS", "генерувати CRC"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-ops-hmi",
    "Operator HMI · signal storms",
    "Operator HMI · signal storms",
    3,
    false,
    [
      mcq(
        "ec-q9",
        "HMI for operators should:",
        "HMI for operators should:",
        ["show critical state clearly, reduce clutter", "spam every DEBUG log on screen", "hide fail-safe status", "block all updates"],
        0,
      ),
      matchEx("ec-q10", "UI data path", "UI data path", [
        { left: "Model", right: "telemetry/state" },
        { left: "View", right: "gauges/maps" },
        { left: "Controller", right: "commands/actions" },
      ]),
      mcq(
        "ec-q11",
        "Signal storm risk:",
        "Signal storm risk:",
        ["UI flood from too many updates", "stronger CRC", "faster linker", "better Git history"],
        0,
      ),
      codeFill(
        "ec-q12",
        "Throttle idea",
        "Throttle idea",
        "cpp",
        "if (now - last < ___) return;",
        ["period_ms", "dt", "interval"],
        false,
      ),
      mcq(
        "ec-q13",
        "Bind UI to rates carefully because:",
        "Bind UI to rates carefully because:",
        ["high-rate telemetry can freeze UI thread", "QML has no models", "UDP forbids display", "tests ban UI"],
        0,
      ),
    ],
  ),
  exam("ec-qt-exam", "Контрольна: Qt/QML", "Exam: Qt/QML", 2, [
      mcq(
        "ec-qe1",
        "moc is for:",
        "moc is for:",
        ["Qt meta-object system", "SQL migration", "UDP checksum", "Docker build"],
        0,
      ),
      codeFill(
        "ec-qe2",
        "connect",
        "connect",
        "cpp",
        "QObject::___(…);",
        ["connect"],
        true,
      ),
      mcq(
        "ec-qe3",
        "QML is:",
        "QML is:",
        ["declarative UI language", "kernel module", "CRC algo", "git hook"],
        0,
      ),
      mcq(
        "ec-qe4",
        "MVC:",
        "MVC:",
        ["Model-View-Controller split", "Memory-Virtual-Cache only", "MAV-Video-Codec", "make-valgrind-cmake"],
        0,
      ),
      mcq(
        "ec-qe5",
        "Signal storm:",
        "Signal storm:",
        ["too many UI updates", "perfect CRC", "Git LFS", "SSH only"],
        0,
      ),
      matchEx("ec-qe6", "Roles", "Roles", [
        { left: "View", right: "presentation" },
        { left: "Model", right: "data" },
      ]),
  ]),
]);

const ros2 = unit("ros2", "ROS 2", "ROS 2", [
  lesson(
    "ec-ros-nodes",
    "Nodes, topics, services",
    "Nodes, topics, services",
    2,
    false,
    [
      mcq(
        "ec-s1",
        "ROS 2 node is:",
        "ROS 2 node is:",
        ["process/component that pub/sub & serves", "SQL table", "CMake flag only", "Qt slot only"],
        0,
      ),
      matchEx("ec-s2", "ROS 2 concepts", "ROS 2 concepts", [
        { left: "topic", right: "pub/sub stream" },
        { left: "service", right: "request/response" },
        { left: "action", right: "long-running goal" },
      ]),
      codeFill(
        "ec-s3",
        "create_publisher sketch",
        "create_publisher sketch",
        "cpp",
        "auto p = ___<Msg>(\"/telem\", 10);",
        ["create_publisher"],
        true,
      ),
      mcq(
        "ec-s4",
        "Separate algorithm from ROS glue:",
        "Separate algorithm from ROS glue:",
        ["pure logic testable + thin adapters", "hardcode ROS in every formula", "delete packages", "skip YAML"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-ros-launch",
    "Launch, params, bags",
    "Launch, params, bags",
    3,
    false,
    [
      mcq(
        "ec-s5",
        "Launch files help:",
        "Launch files help:",
        ["start multi-node graphs with params", "replace CRC", "paint QML", "ban tests"],
        0,
      ),
      codeFill(
        "ec-s6",
        "declare parameter idea",
        "declare parameter idea",
        "cpp",
        "this->___(\"rate_hz\", 10.0);",
        ["declare_parameter"],
        true,
      ),
      mcq(
        "ec-s7",
        "rosbag / record useful for:",
        "rosbag / record useful for:",
        ["replay field data for debug & tests", "delete logs forever", "compile kernel", "format disks"],
        0,
      ),
      matchEx("ec-s8", "Config", "Config", [
        { left: "YAML params", right: "tunable rates/topics" },
        { left: "launch", right: "graph startup" },
        { left: "QoS", right: "reliability/history" },
      ]),
    ],
  ),
  lesson(
    "ec-ros-qos-life",
    "QoS · lifecycle · separation",
    "QoS · lifecycle · separation",
    3,
    false,
    [
      mcq(
        "ec-s9",
        "QoS reliability:",
        "QoS reliability:",
        ["best-effort vs reliable delivery tradeoffs", "only font size", "Git merge strategy", "CSS flex"],
        0,
      ),
      matchEx("ec-s10", "Lifecycle ideas", "Lifecycle ideas", [
        { left: "configure", right: "load params" },
        { left: "activate", right: "start IO" },
        { left: "deactivate", right: "safe stop" },
      ]),
      mcq(
        "ec-s11",
        "Why pure algorithm module?",
        "Why pure algorithm module?",
        ["unit test without ROS runtime", "must call create_publisher in math", "skip sim", "ban mocks"],
        0,
      ),
      codeFill(
        "ec-s12",
        "create_subscription sketch",
        "create_subscription sketch",
        "cpp",
        "auto s = ___<Msg>(\"/cmd\", 10, cb);",
        ["create_subscription"],
        true,
      ),
      mcq(
        "ec-s13",
        "Bag replay enables:",
        "Bag replay enables:",
        ["repeatable offline debugging", "live radio only", "deleting CI", "hiding CRC errors"],
        0,
      ),
    ],
  ),
  exam("ec-ros-exam", "Контрольна: ROS 2", "Exam: ROS 2", 3, [
      mcq(
        "ec-se1",
        "Topic is:",
        "Topic is:",
        ["pub/sub channel", "SQL table", "CMake flag", "Qt slot only"],
        0,
      ),
      codeFill(
        "ec-se2",
        "create_publisher",
        "create_publisher",
        "cpp",
        "auto p = ___<M>(\"/t\", 10);",
        ["create_publisher"],
        true,
      ),
      mcq(
        "ec-se3",
        "Service:",
        "Service:",
        ["request/response", "only fire-and-forget stream", "git LFS", "CRC poly"],
        0,
      ),
      mcq(
        "ec-se4",
        "Separate algorithm:",
        "Separate algorithm:",
        ["testable pure logic + thin ROS wrap", "hardcode ROS in every formula", "delete packages", "skip YAML"],
        0,
      ),
      mcq(
        "ec-se5",
        "QoS matters for:",
        "QoS matters for:",
        ["reliability & history on links", "font kerning", "npm scripts", "SSH keys only"],
        0,
      ),
      matchEx("ec-se6", "ROS pieces", "ROS pieces", [
        { left: "launch", right: "start graph" },
        { left: "bag", right: "record/replay" },
      ]),
  ]),
]);

const embeddedRtos = unit("embedded-rtos", "MCU · peripheral · FreeRTOS", "MCU · peripheral · FreeRTOS", [
  lesson(
    "ec-mcu-arch",
    "Архітектура MCU, регістри, IRQ",
    "MCU architecture, registers, IRQ",
    3,
    false,
    [
      mcq(
        "ec-e1",
        "Мікроконтролер (MCU) — це:",
        "A microcontroller (MCU) is:",
        ["SoC з CPU + пам'ять + периферія для real-time задач", "хмарний Kubernetes", "лише GPU", "SQL engine"],
        0,
      ),
      matchEx("ec-e2", "Ресурси MCU", "MCU resources", [
        { left: "flash", right: "program storage" },
        { left: "RAM", right: "runtime data" },
        { left: "GPIO", right: "digital pins" },
      ]),
      mcq(
        "ec-e3",
        "Переривання (IRQ) дозволяють:",
        "Interrupts (IRQ) allow:",
        ["реагувати на події апаратури без постійного busy-poll", "замінити linker", "прискорити CSS", "вимкнути watchdog"],
        0,
      ),
      codeRead(
        "ec-e4",
        "while(1) superloop:",
        "while(1) superloop:",
        "cpp",
        "while (1) { poll(); act(); }",
        ["простий cooperative loop без RTOS", "завжди multi-core OS", "ROS launch", "Qt moc"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-periph-rtos",
    "UART/I2C/SPI · FreeRTOS",
    "UART/I2C/SPI · FreeRTOS",
    3,
    false,
    [
      matchEx("ec-e5", "Шини", "Buses", [
        { left: "UART", right: "async serial point-to-point" },
        { left: "I2C", right: "multi-device 2-wire bus" },
        { left: "SPI", right: "fast master/slave serial" },
      ]),
      mcq(
        "ec-e6",
        "FreeRTOS відрізняється від while(1) тим, що:",
        "FreeRTOS differs from while(1) by:",
        ["завдання, планування, черги, синхронізація", "вимагає GPU", "замінює Ethernet PHY", "пише QML"],
        0,
      ),
      codeFill(
        "ec-e7",
        "Створити задачу FreeRTOS",
        "Create FreeRTOS task",
        "cpp",
        "___(telemetry_task, \"tel\", 2048, NULL, 1, NULL);",
        ["xTaskCreate"],
        true,
      ),
      codeFill(
        "ec-e8",
        "Черга FreeRTOS",
        "FreeRTOS queue",
        "cpp",
        "___(q, &msg, portMAX_DELAY);",
        ["xQueueSend"],
        true,
      ),
    ],
  ),
  lesson(
    "ec-watchdog-sync",
    "Watchdog · ISR vs task · priorities",
    "Watchdog · ISR vs task · priorities",
    3,
    false,
    [
      mcq(
        "ec-e9",
        "Watchdog timer purpose:",
        "Watchdog timer purpose:",
        ["reset system if software hangs", "replace CRC", "paint UI", "store Git history"],
        0,
      ),
      matchEx("ec-e10", "ISR vs task", "ISR vs task", [
        { left: "ISR", right: "short, deferred work" },
        { left: "task", right: "longer processing" },
        { left: "queue", right: "pass events safely" },
      ]),
      mcq(
        "ec-e11",
        "Priority inversion is:",
        "Priority inversion is:",
        ["low prio holds lock needed by high prio", "always good scheduling", "only CSS z-index", "Git rebase"],
        0,
      ),
      codeFill(
        "ec-e12",
        "mutex take",
        "mutex take",
        "cpp",
        "___(mtx, portMAX_DELAY);",
        ["xSemaphoreTake"],
        true,
      ),
      mcq(
        "ec-e13",
        "Stack size too small leads to:",
        "Stack size too small leads to:",
        ["stack overflow / corruption", "stronger Wi-Fi", "free RAM grow", "auto MISRA pass"],
        0,
      ),
      codeRun(
        "ec-e14",
        "Lab: ring next index (i+1)%8 from 7 → 0",
        "Lab: ring next index (i+1)%8 from 7 → 0",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int i = 7;
  int n = 8;
  // TODO: cout << (i+1)%n
  return 0;
}
`,
        [{ stdout: "0" }],
        {
          requiredSource: ["%", "cout"],
          hintUk: "cout << (i+1)%n;",
          hintEn: "cout << (i+1)%n;"
        },
      ),
    ],
  ),
  exam("ec-emb-exam", "Контрольна: embedded/RTOS", "Exam: embedded/RTOS", 3, [
      mcq(
        "ec-ee1",
        "MCU includes:",
        "MCU includes:",
        ["CPU+mem+peripherals", "only cloud DB", "only browser", "only Qt Designer"],
        0,
      ),
      matchEx("ec-ee2", "Bus pick", "Bus pick", [
        { left: "sensor hub many chips", right: "I2C often" },
        { left: "high-speed ADC", right: "SPI often" },
      ]),
      codeFill(
        "ec-ee3",
        "xTaskCreate",
        "xTaskCreate",
        "cpp",
        "___ (fn, \"n\", stack, …);",
        ["xTaskCreate"],
        true,
      ),
      mcq(
        "ec-ee4",
        "Mutex protects:",
        "Mutex protects:",
        ["shared resource between tasks", "CRC poly only", "CSS variables", "git remotes"],
        0,
      ),
      mcq(
        "ec-ee5",
        "Watchdog:",
        "Watchdog:",
        ["recovers from hangs", "replaces tests", "paints QML", "stores bags"],
        0,
      ),
      codeFill(
        "ec-ee6",
        "xQueueSend",
        "xQueueSend",
        "cpp",
        "___(q,&m,portMAX_DELAY);",
        ["xQueueSend"],
        true,
      ),
      mcq(
        "ec-ee7",
        "Keep ISR short:",
        "Keep ISR short:",
        ["defer heavy work to tasks", "run full ML models there", "allocate huge heap", "block forever"],
        0,
      ),
  ]),
]);

const uavStack = unit("uav-stack", "SBC · drones · MAVLink", "SBC · drones · MAVLink", [
  lesson(
    "ec-sbc-roles",
    "SBC roles · flight stack",
    "SBC roles · flight stack",
    3,
    false,
    [
      matchEx("ec-u1", "Ролі в архітектурі", "Architecture roles", [
        { left: "FC/MCU", right: "hard real-time control" },
        { left: "SBC companion", right: "vision/high-level" },
        { left: "GCS", right: "operator interface" },
      ]),
      mcq(
        "ec-u2",
        "Companion computer typically:",
        "Companion computer typically:",
        ["runs high-level / vision / planning", "always bit-bangs motors only", "replaces battery chemistry", "is CSS CDN"],
        0,
      ),
      mcq(
        "ec-u3",
        "Open flight stacks teach:",
        "Open flight stacks teach:",
        ["sensors→estimate→control→actuators pipeline", "only QML themes", "SQL joins", "npm scripts"],
        0,
      ),
      codeFill(
        "ec-u4",
        "MAVLink idea",
        "MAVLink idea",
        "cpp",
        "// parse ___ message id + payload",
        ["MAVLink", "mavlink"],
        false,
      ),
    ],
  ),
  lesson(
    "ec-mavlink-sim",
    "MAVLink · Gazebo/SITL/QGC",
    "MAVLink · Gazebo/SITL/QGC",
    3,
    false,
    [
      mcq(
        "ec-u5",
        "MAVLink is:",
        "MAVLink is:",
        ["vehicle messaging protocol", "video container only", "mutex type", "QML module"],
        0,
      ),
      codeRead(
        "ec-u6",
        "Heartbeat role:",
        "Heartbeat role:",
        "cpp",
        "// send HEARTBEAT at 1Hz",
        ["alive/status presence signal", "CRC poly definition", "CMake target", "Qt moc"],
        0,
      ),
      matchEx("ec-u7", "Sim stack", "Sim stack", [
        { left: "SITL", right: "software in the loop" },
        { left: "Gazebo", right: "physics/world sim" },
        { left: "QGC", right: "ground control UI" },
      ]),
      mcq(
        "ec-u8",
        "Why simulate first?",
        "Why simulate first?",
        ["safer cheaper iteration before hardware", "skip all tests forever", "ban logging", "delete CRC"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-failsafe-rates",
    "Failsafe concepts · message rates",
    "Failsafe concepts · message rates",
    3,
    false,
    [
      mcq(
        "ec-u9",
        "Failsafe mode example (concept):",
        "Failsafe mode example (concept):",
        ["return/land/hold when link or sensor fails", "ignore all errors", "disable telemetry", "random actuators"],
        0,
      ),
      matchEx("ec-u10", "Rates", "Rates", [
        { left: "attitude", right: "high rate" },
        { left: "GPS", right: "lower rate" },
        { left: "params", right: "on change/slow" },
      ]),
      mcq(
        "ec-u11",
        "HITL differs from SITL by:",
        "HITL differs from SITL by:",
        ["real hardware in the loop", "no sensors ever", "only CSS sim", "Git only"],
        0,
      ),
      codeFill(
        "ec-u12",
        "Rate limit idea",
        "Rate limit idea",
        "cpp",
        "if (now - last_tx < ___) return;",
        ["min_period", "dt", "T"],
        false,
      ),
      mcq(
        "ec-u13",
        "GCS needs reliable:",
        "GCS needs reliable:",
        ["link status + vehicle mode + alerts", "only wallpaper", "CSS minify", "npm audit"],
        0,
      ),
    ],
  ),
  exam("ec-uav-exam", "Контрольна: UAV stack", "Exam: UAV stack", 3, [
      mcq(
        "ec-ue1",
        "Companion computer:",
        "Companion computer:",
        ["high-level / vision", "only PWM motors always", "replaces battery", "CSS CDN"],
        0,
      ),
      mcq(
        "ec-ue2",
        "MAVLink:",
        "MAVLink:",
        ["messaging for vehicles/GCS", "video container only", "mutex type", "QML module"],
        0,
      ),
      mcq(
        "ec-ue3",
        "Gazebo role:",
        "Gazebo role:",
        ["simulation environment", "flight motor driver", "CRC library", "SSH daemon"],
        0,
      ),
      matchEx("ec-ue4", "Who talks MAVLink?", "Who talks MAVLink?", [
        { left: "FC", right: "vehicle side" },
        { left: "GCS", right: "operator side" },
      ]),
      mcq(
        "ec-ue5",
        "SITL:",
        "SITL:",
        ["software-in-the-loop testing", "only hardware burn-in", "CSS layout", "Git LFS"],
        0,
      ),
      mcq(
        "ec-ue6",
        "Failsafe concept:",
        "Failsafe concept:",
        ["safe reaction to faults", "ignore faults", "delete logs", "ban sim"],
        0,
      ),
  ]),
]);

const safetyReliability = unit("safety-reliability", "Safety · reliability", "Safety · reliability", [
  lesson(
    "ec-watchdog-bit",
    "Watchdog · BIT · self-test",
    "Watchdog · BIT · self-test",
    3,
    false,
    [
      mcq(
        "ec-sf1",
        "Built-in test (BIT) checks:",
        "Built-in test (BIT) checks:",
        ["health of sensors/subsystems at start/runtime", "only UI theme", "Git history", "CSS grid"],
        0,
      ),
      matchEx("ec-sf2", "Safety layers", "Safety layers", [
        { left: "watchdog", right: "hang recovery" },
        { left: "CRC", right: "data integrity" },
        { left: "failsafe", right: "safe mode transition" },
      ]),
      mcq(
        "ec-sf3",
        "Red/black logging idea:",
        "Red/black logging idea:",
        ["separate critical vs verbose streams", "delete all logs", "one infinite file only", "no timestamps"],
        0,
      ),
      codeFill(
        "ec-sf4",
        "kick watchdog sketch",
        "kick watchdog sketch",
        "cpp",
        "___(wdg); // pet/kick",
        ["watchdog_kick", "hal_watchdog_refresh", "wdg_kick"],
        false,
      ),
    ],
  ),
  lesson(
    "ec-failsafe-fmea",
    "Fail-safe modes · FMEA-light",
    "Fail-safe modes · FMEA-light",
    3,
    false,
    [
      mcq(
        "ec-sf5",
        "FMEA-light asks:",
        "FMEA-light asks:",
        ["what fails, effect, detection, mitigation", "only marketing color", "CSS breakpoints", "npm version"],
        0,
      ),
      matchEx("ec-sf6", "Fault reactions", "Fault reactions", [
        { left: "sensor loss", right: "hold/safe estimate" },
        { left: "link loss", right: "failsafe mode" },
        { left: "overcurrent", right: "cutoff/protect" },
      ]),
      mcq(
        "ec-sf7",
        "Degraded mode means:",
        "Degraded mode means:",
        ["continue with reduced capability safely", "always full performance", "silent crash", "disable CRC"],
        0,
      ),
      codeOrder(
        "ec-sf8",
        "Fault handling order",
        "Fault handling order",
        "cpp",
        ["detect", "isolate", "mitigate", "report"],
        ["detect", "isolate", "mitigate", "report"],
      ),
    ],
  ),
  lesson(
    "ec-safe-coding",
    "Safe coding habits for field",
    "Safe coding habits for field",
    3,
    false,
    [
      mcq(
        "ec-sf9",
        "Assert vs production checks:",
        "Assert vs production checks:",
        ["critical paths need explicit runtime guards", "asserts replace all field checks", "skip validation", "log only never act"],
        0,
      ),
      codeFill(
        "ec-sf10",
        "saturate helper idea",
        "saturate helper idea",
        "cpp",
        "v = ___(v, lo, hi);",
        ["clamp", "std::clamp"],
        false,
      ),
      mcq(
        "ec-sf11",
        "Avoid in ISR:",
        "Avoid in ISR:",
        ["blocking locks and heavy alloc", "short flag set", "queue send from ISR API", "minimal work"],
        0,
      ),
      codeRun(
        "ec-sf12",
        "Lab: saturate -5 into [0,10] → 0",
        "Lab: saturate -5 into [0,10] → 0",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int v=-5, lo=0, hi=10;
  // TODO: clamp v; cout << v
  return 0;
}
`,
        [{ stdout: "0" }],
        {
          requiredSource: ["cout"],
          hintUk: "if(v<lo)v=lo; if(v>hi)v=hi; cout<<v;",
          hintEn: "if(v<lo)v=lo; if(v>hi)v=hi; cout<<v;"
        },
      ),
    ],
  ),
  exam("ec-safety-exam", "Контрольна: safety", "Exam: safety", 3, [
      mcq(
        "ec-sfe1",
        "Watchdog:",
        "Watchdog:",
        ["reset if software hangs", "UI theme", "Git hook", "CSS only"],
        0,
      ),
      mcq(
        "ec-sfe2",
        "BIT:",
        "BIT:",
        ["built-in health tests", "binary integer type only", "bag file", "QML list"],
        0,
      ),
      matchEx("ec-sfe3", "Mitigate", "Mitigate", [
        { left: "link loss", right: "failsafe" },
        { left: "bad CRC", right: "drop/reject packet" },
      ]),
      codeOrder(
        "ec-sfe4",
        "Handle fault",
        "Handle fault",
        "cpp",
        ["detect", "mitigate", "report"],
        ["detect", "mitigate", "report"],
      ),
      mcq(
        "ec-sfe5",
        "Degraded mode:",
        "Degraded mode:",
        ["safe reduced capability", "ignore faults", "full performance always", "delete sensors"],
        0,
      ),
      codeFill(
        "ec-sfe6",
        "clamp idea",
        "clamp idea",
        "cpp",
        "v = ___(v,0,100);",
        ["clamp", "std::clamp"],
        false,
      ),
  ]),
]);

const datalinkOps = unit("datalink-ops", "Data-link · ops", "Data-link · ops", [
  lesson(
    "ec-link-quality",
    "Link quality · RSSI concepts",
    "Link quality · RSSI concepts",
    3,
    false,
    [
      mcq(
        "ec-d1",
        "Link quality metrics help:",
        "Link quality metrics help:",
        ["decide rate/mode and warn operator", "replace batteries with CSS", "delete CRC", "ban telemetry"],
        0,
      ),
      matchEx("ec-d2", "Metrics", "Metrics", [
        { left: "RSSI/SNR", right: "signal quality proxies" },
        { left: "packet loss", right: "reliability" },
        { left: "latency", right: "delay" },
      ]),
      mcq(
        "ec-d3",
        "When link degrades:",
        "When link degrades:",
        ["reduce rate / prioritize critical msgs", "spam max bitrate always", "disable failsafe", "hide status"],
        0,
      ),
      codeFill(
        "ec-d4",
        "loss percent idea",
        "loss percent idea",
        "cpp",
        "loss = 100 * lost / ___;",
        ["total", "sent", "n"],
        false,
      ),
    ],
  ),
  lesson(
    "ec-rate-budget",
    "Rate limits · bandwidth budget",
    "Rate limits · bandwidth budget",
    3,
    false,
    [
      mcq(
        "ec-d5",
        "Bandwidth budget means:",
        "Bandwidth budget means:",
        ["plan bytes/s across message classes", "infinite free radio", "only video 8K always", "no priorities"],
        0,
      ),
      matchEx("ec-d6", "Priorities", "Priorities", [
        { left: "heartbeat/mode", right: "high priority" },
        { left: "debug logs", right: "low priority" },
        { left: "video", right: "high bandwidth optional" },
      ]),
      mcq(
        "ec-d7",
        "Anti-flood protects:",
        "Anti-flood protects:",
        ["CPU/link from message storms", "Git history", "fonts", "SQL indexes only"],
        0,
      ),
      codeRun(
        "ec-d8",
        "Lab: bytes/s = 64*10 → 640",
        "Lab: bytes/s = 64*10 → 640",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int size=64, hz=10;
  // TODO: cout << size*hz
  return 0;
}
`,
        [{ stdout: "640" }],
        {
          requiredSource: ["cout"],
          hintUk: "cout << size*hz;",
          hintEn: "cout << size*hz;"
        },
      ),
    ],
  ),
  lesson(
    "ec-duty-cycle",
    "Duty cycle · fairness · queues",
    "Duty cycle · fairness · queues",
    3,
    false,
    [
      mcq(
        "ec-d9",
        "Duty cycle limits:",
        "Duty cycle limits:",
        ["on-air time / regulatory & thermal budgets", "CSS animations only", "Git commits/hour", "npm installs"],
        0,
      ),
      matchEx("ec-d10", "Queueing", "Queueing", [
        { left: "drop-old", right: "prefer fresh telemetry" },
        { left: "drop-new", right: "keep backlog" },
        { left: "priority queue", right: "critical first" },
      ]),
      mcq(
        "ec-d11",
        "For control-critical packets prefer:",
        "For control-critical packets prefer:",
        ["priority + bounded latency path", "best-effort debug flood", "unlimited queue growth", "no sequence numbers"],
        0,
      ),
      codeFill(
        "ec-d12",
        "token bucket idea",
        "token bucket idea",
        "cpp",
        "if (tokens < cost) ___; else tokens -= cost;",
        ["return", "drop", "reject"],
        false,
      ),
    ],
  ),
  exam("ec-datalink-exam", "Контрольна: datalink", "Exam: datalink", 3, [
      mcq(
        "ec-de1",
        "Link quality used to:",
        "Link quality used to:",
        ["adapt rate & warn ops", "paint UI only", "delete CRC", "ban SSH"],
        0,
      ),
      mcq(
        "ec-de2",
        "Bandwidth budget:",
        "Bandwidth budget:",
        ["plan message rates/sizes", "infinite capacity", "video only", "no heartbeats"],
        0,
      ),
      matchEx("ec-de3", "Priority", "Priority", [
        { left: "mode/heartbeat", right: "high" },
        { left: "debug", right: "low" },
      ]),
      codeFill(
        "ec-de4",
        "bps",
        "bps",
        "cpp",
        "bps = size * ___;",
        ["hz", "rate", "fps"],
        false,
      ),
      mcq(
        "ec-de5",
        "Anti-flood:",
        "Anti-flood:",
        ["limit storms", "maximize spam", "disable metrics", "hide loss"],
        0,
      ),
      mcq(
        "ec-de6",
        "Drop-old policy:",
        "Drop-old policy:",
        ["keep freshest telemetry", "always keep ancient msgs", "ban queues", "CRC off"],
        0,
      ),
  ]),
]);

const missionAutonomy = unit("mission-autonomy", "Mission · autonomy basics", "Mission · autonomy basics", [
  lesson(
    "ec-waypoints",
    "Waypoints · path following",
    "Waypoints · path following",
    3,
    false,
    [
      mcq(
        "ec-ma1",
        "Waypoint mission is:",
        "Waypoint mission is:",
        ["sequence of target poses/actions", "random CSS path", "SQL migration", "Git rebase"],
        0,
      ),
      matchEx("ec-ma2", "Path terms", "Path terms", [
        { left: "waypoint", right: "target point" },
        { left: "segment", right: "leg between WPs" },
        { left: "acceptance radius", right: "arrival threshold" },
      ]),
      codeFill(
        "ec-ma3",
        "distance sketch",
        "distance sketch",
        "cpp",
        "d = hypot(tx - x, ___);",
        ["ty - y", "ty-y"],
        false,
      ),
      codeRun(
        "ec-ma4",
        "Lab: |3-10|=7 abs error",
        "Lab: abs error |3-10|=7",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int x=3, t=10;
  int e = x-t; if(e<0) e=-e;
  // TODO: cout << e
  return 0;
}
`,
        [{ stdout: "7" }],
        {
          requiredSource: ["cout"],
          hintUk: "cout << e;",
          hintEn: "cout << e;"
        },
      ),
    ],
  ),
  lesson(
    "ec-state-machine",
    "Mission state machine",
    "Mission state machine",
    3,
    false,
    [
      mcq(
        "ec-ma5",
        "State machine helps:",
        "State machine helps:",
        ["explicit modes & legal transitions", "hidden goto soup without rules", "skip failsafes", "ban tests"],
        0,
      ),
      matchEx("ec-ma6", "Modes", "Modes", [
        { left: "IDLE", right: "await command" },
        { left: "RUN", right: "execute plan" },
        { left: "SAFE", right: "failsafe behavior" },
      ]),
      codeFill(
        "ec-ma7",
        "transition guard idea",
        "transition guard idea",
        "cpp",
        "if (state==RUN && link_lost) state = ___;",
        ["SAFE", "Failsafe", "IDLE"],
        false,
      ),
      codeRun(
        "ec-ma8",
        "Lab: state 0→1 print 1",
        "Lab: state 0→1 print 1",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int state = 0;
  // TODO: state = 1; cout << state
  return 0;
}
`,
        [{ stdout: "1" }],
        {
          requiredSource: ["cout"],
          hintUk: "state=1; cout<<state;",
          hintEn: "state=1; cout<<state;"
        },
      ),
    ],
  ),
  lesson(
    "ec-geofence-sim",
    "Safety boundaries · sim validation",
    "Safety boundaries · sim validation",
    3,
    false,
    [
      mcq(
        "ec-ma9",
        "Geofence as safety boundary:",
        "Geofence as safety boundary:",
        ["virtual keep-in/out limits for safe operation", "weapon system", "CSS border only", "Git ignore"],
        0,
      ),
      matchEx("ec-ma10", "Validation", "Validation", [
        { left: "SITL", right: "software validation" },
        { left: "HITL", right: "hardware-in-loop" },
        { left: "flight test", right: "controlled field" },
      ]),
      mcq(
        "ec-ma11",
        "Before field trial:",
        "Before field trial:",
        ["sim + checklists + failsafe review", "skip all sim", "disable logs", "ignore link loss"],
        0,
      ),
      codeOrder(
        "ec-ma12",
        "Autonomy bring-up",
        "Autonomy bring-up",
        "cpp",
        ["unit tests", "SITL scenarios", "HITL if needed", "supervised field"],
        ["unit tests", "SITL scenarios", "HITL if needed", "supervised field"],
      ),
    ],
  ),
  exam("ec-mission-exam", "Контрольна: mission", "Exam: mission", 3, [
      mcq(
        "ec-mae1",
        "Waypoint:",
        "Waypoint:",
        ["target pose/action in plan", "CSS selector", "SQL row only", "npm script"],
        0,
      ),
      mcq(
        "ec-mae2",
        "State machine:",
        "State machine:",
        ["modes + transitions", "random jumps only", "no SAFE mode", "ban logs"],
        0,
      ),
      matchEx("ec-mae3", "Modes", "Modes", [
        { left: "RUN", right: "execute" },
        { left: "SAFE", right: "failsafe" },
      ]),
      codeFill(
        "ec-mae4",
        "on link loss",
        "on link loss",
        "cpp",
        "state = ___;",
        ["SAFE", "Failsafe"],
        false,
      ),
      mcq(
        "ec-mae5",
        "Geofence concept:",
        "Geofence concept:",
        ["safety keep-in/out boundary", "video codec", "Qt widget", "bash alias"],
        0,
      ),
      codeOrder(
        "ec-mae6",
        "Validate order",
        "Validate order",
        "cpp",
        ["SITL", "field"],
        ["SITL", "field"],
      ),
  ]),
]);

const systemsCapstone = unit("systems-capstone", "Systems · capstone", "Systems · capstone", [
  lesson(
    "ec-video-crypto",
    "Video concepts · crypto basics",
    "Video concepts · crypto basics",
    3,
    false,
    [
      mcq(
        "ec-c1",
        "Video pipeline concept:",
        "Video pipeline concept:",
        ["capture → encode → transport → display", "only CRC", "only Git LFS", "SQL view"],
        0,
      ),
      codeFill(
        "ec-c2",
        "integrity check idea",
        "integrity check idea",
        "cpp",
        "ok = verify___(buf, n, tag);",
        ["hmac", "mac", "signature"],
        false,
      ),
      matchEx("ec-c3", "Crypto concepts", "Crypto concepts", [
        { left: "confidentiality", right: "encryption" },
        { left: "integrity", right: "MAC/signature" },
        { left: "authenticity", right: "who sent it" },
      ]),
      mcq(
        "ec-c4",
        "Encrypt telemetry because:",
        "Encrypt telemetry because:",
        ["protect sensitive ops data on links", "replace CRC always", "speed CSS", "delete logs"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-pid-control",
    "PID control intro",
    "PID control intro",
    3,
    false,
    [
      mcq(
        "ec-c5",
        "PID uses:",
        "PID uses:",
        ["error terms P+I+D", "only CRC", "only Git hooks", "only QML anchors"],
        0,
      ),
      codeFill(
        "ec-c6",
        "P term",
        "P term",
        "cpp",
        "u = Kp * ___;",
        ["e", "error"],
        false,
      ),
      matchEx("ec-c7", "PID terms", "PID terms", [
        { left: "P", right: "proportional to error" },
        { left: "I", right: "accumulates error" },
        { left: "D", right: "rate of error" },
      ]),
      mcq(
        "ec-c8",
        "Tuning tradeoff:",
        "Tuning tradeoff:",
        ["компроміс швидкість / overshoot / стійкість", "випадкові числа без тестів", "тільки максимальні K", "ігнорувати одиниці часу"],
        0,
      ),
      codeOutputMcq(
        "ec-c8b",
        "u = Kp*e при Kp=0.5, e=10 →",
        "u = Kp*e with Kp=0.5, e=10 →",
        "cpp",
        `double Kp = 0.5, e = 10.0;
double u = Kp * e; // ?`,
        ["5", "15", "0.05", "50"],
        0,
      ),
      codeRun(
        "ec-c8c",
        "Lab: PID P-term",
        "Lab: PID P-term",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  double Kp = 0.5;
  double e = 10.0;
  // TODO: cout << (Kp * e)
  return 0;
}
`,
        [{ stdout: "5" }],
        {
          requiredSource: ["Kp", "cout"],
          hintUk: "cout << (Kp * e) << endl;",
          hintEn: "cout << (Kp * e) << endl;"
        },
      ),
    ],
  ),
  lesson(
    "ec-project-ringbuf",
    "Project: ring buffer",
    "Project: ring buffer",
    4,
    false,
    [
      {
        id: "ec-proj-ring1",
        type: "code_project",
        promptUk: "C++ mini: ring buffer push/pop + size; README: concurrency notes (ISR vs task).",
        promptEn: "C++ mini: ring buffer push/pop + size; README: concurrency notes (ISR vs task).",
        files: [
          {
            id: "cpp",
            name: "ringbuf.cpp",
            language: "cpp",
            starter: `// TODO: RingBuf with push/pop/size
#include <cstdint>

struct RingBuf {
  static const int N = 8;
  int data[N]{};
  int head{0};
  int tail{0};
  int count{0};
  // bool push(int v); bool pop(int& out); int size() const;
};
`,
          },
          {
            id: "hpp",
            name: "ringbuf.hpp",
            language: "cpp",
            starter: `// TODO: declarations
#pragma once
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Ring buffer

<!-- ISR vs task, overwrite policy -->
`,
          }
        ],
        checks: [
          {
            fileId: "cpp",
            contains: ["RingBuf", "push", "pop", "size"],
            forbidden: ["system(", "exec("],
          },
          {
            fileId: "hpp",
            contains: ["RingBuf"],
          },
          {
            fileId: "md",
            contains: ["ISR", "task"],
          }
        ],
        hintUk: "struct RingBuf; push/pop оновлюють head/tail/count; README: ISR vs task.",
        hintEn: "struct RingBuf; push/pop update head/tail/count; README: ISR vs task.",
      } as Exercise,
    ],
  ),
  lesson(
    "ec-project-packet",
    "Project: framed packet",
    "Project: framed packet",
    4,
    false,
    [
      {
        id: "ec-proj-pkt1",
        type: "code_project",
        promptUk: "C++ mini: frame {seq,len,payload,crc}; encode/decode + crc16 stub; README: UDP vs TCP choice.",
        promptEn: "C++ mini: frame {seq,len,payload,crc}; encode/decode + crc16 stub; README: UDP vs TCP choice.",
        files: [
          {
            id: "cpp",
            name: "packet.cpp",
            language: "cpp",
            starter: `// TODO: Packet frame encode/decode + crc16
#include <cstdint>
#include <cstddef>

struct Packet {
  uint8_t seq{};
  uint8_t len{};
  uint8_t data[16]{};
  uint16_t crc{};
};
// uint16_t crc16(const uint8_t* p, size_t n);
// size_t encode(const Packet& p, uint8_t* out);
// bool decode(const uint8_t* in, size_t n, Packet& p);
`,
          },
          {
            id: "hpp",
            name: "packet.hpp",
            language: "cpp",
            starter: `// TODO: Packet API
#pragma once
#include <cstdint>
#include <cstddef>
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Packet mini

<!-- UDP vs TCP for telemetry -->
`,
          }
        ],
        checks: [
          {
            fileId: "cpp",
            contains: ["Packet", "crc", "encode", "decode"],
            forbidden: ["system(", "exec("],
          },
          {
            fileId: "hpp",
            contains: ["Packet", "crc"],
          },
          {
            fileId: "md",
            contains: ["UDP", "TCP"],
          }
        ],
        hintUk: "Packet + crc16 + encode/decode; README: UDP vs TCP.",
        hintEn: "Packet + crc16 + encode/decode; README: UDP vs TCP.",
      } as Exercise,
    ],
  ),
  lesson(
    "ec-capstone-telemetry",
    "Capstone: telemetry packet + sim step",
    "Capstone: telemetry packet + sim step",
    4,
    false,
    [
      {
        id: "ec-cap1",
        type: "code_project",
        promptUk: "C++ mini: структура Telemetry {x,y,yaw}, encode/decode у байтовий буфер, проста crc16 stub, step_waypoint() оновлює позицію. README: MCU vs SBC vs GCS.",
        promptEn: "C++ mini: Telemetry {x,y,yaw} struct, encode/decode to byte buffer, simple crc16 stub, step_waypoint() updates pose. README: MCU vs SBC vs GCS.",
        files: [
          {
            id: "cpp",
            name: "telemetry.cpp",
            language: "cpp",
            starter: `// TODO: Telemetry struct, encode/decode, crc16, step_waypoint
#include <cstdint>
#include <cstring>

struct Telemetry {
  double x{};
  double y{};
  double yaw{};
};

// uint16_t crc16(const uint8_t* data, size_t n);
// void encode(const Telemetry& t, uint8_t* out);
// bool decode(const uint8_t* in, Telemetry& t);
// void step_waypoint(Telemetry& t, double tx, double ty, double dt);
`,
          },
          {
            id: "hpp",
            name: "telemetry.hpp",
            language: "cpp",
            starter: `// TODO: declarations for Telemetry API
#pragma once
#include <cstdint>
#include <cstddef>
`,
          },
          {
            id: "md",
            name: "README.md",
            language: "markdown",
            starter: `# Telemetry mini

<!-- Describe: MCU flight loop, companion SBC, ground station -->
`,
          }
        ],
        checks: [
          {
            fileId: "cpp",
            contains: ["Telemetry", "crc", "encode", "decode", "step"],
            forbidden: ["system(", "exec("],
          },
          {
            fileId: "hpp",
            contains: ["Telemetry", "crc"],
          },
          {
            fileId: "md",
            contains: ["MCU", "SBC", "GCS"],
          }
        ],
        hintUk: "struct Telemetry; crc16(...); encode/decode з memcpy полів; step_waypoint: рух до (tx,ty) з обмеженням кроку.",
        hintEn: "struct Telemetry; crc16(...); encode/decode with field memcpy; step_waypoint: move toward (tx,ty) with step limit.",
      } as Exercise,
    ],
  ),
  lesson(
    "ec-filters-rate",
    "Filters · moving average · rate limit",
    "Filters · moving average · rate limit",
    3,
    false,
    [
      mcq(
        "ec-c9",
        "Moving average helps:",
        "Moving average helps:",
        ["smooth noisy sensors", "replace CRC", "delete PID", "ban tests"],
        0,
      ),
      codeRun(
        "ec-c10",
        "Lab: avg of 2,4,6 → 4",
        "Lab: avg of 2,4,6 → 4",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int a[3]={2,4,6};
  int s=0;
  // TODO: sum/3 cout
  return 0;
}
`,
        [{ stdout: "4" }],
        {
          requiredSource: ["for", "cout"],
          hintUk: "for(...)s+=a[i]; cout<<s/3;",
          hintEn: "for(...)s+=a[i]; cout<<s/3;"
        },
      ),
      codeFill(
        "ec-c11",
        "alpha filter idea",
        "alpha filter idea",
        "cpp",
        "y = y + alpha * (x - ___);",
        ["y"],
        true,
      ),
      mcq(
        "ec-c12",
        "Rate limit on actuators:",
        "Rate limit on actuators:",
        ["avoid abrupt unsafe jumps", "maximize step always", "ignore units", "skip saturation"],
        0,
      ),
    ],
  ),
  exam("ec-cap-exam", "Фінальна контрольна Embedded C++", "Final Embedded C++ exam", 3, [
      mcq(
        "ec-ce1",
        "C++ in MilTech prioritizes:",
        "C++ in MilTech prioritizes:",
        ["reliability & resources", "only pretty UI", "skip tests", "ignore memory"],
        0,
      ),
      codeFill(
        "ec-ce2",
        "unique_ptr",
        "unique_ptr",
        "cpp",
        "std::___<T> p;",
        ["unique_ptr"],
        true,
      ),
      mcq(
        "ec-ce3",
        "UDP good for:",
        "UDP good for:",
        ["low-latency telemetry bursts", "always file transfer only", "replacing flash", "CSS minify"],
        0,
      ),
      codeFill(
        "ec-ce4",
        "xTaskCreate",
        "xTaskCreate",
        "cpp",
        "___ (task, \"n\", …);",
        ["xTaskCreate"],
        true,
      ),
      mcq(
        "ec-ce5",
        "MAVLink is:",
        "MAVLink is:",
        ["messaging for vehicles/GCS", "video codec", "Qt widget", "bash builtin"],
        0,
      ),
      mcq(
        "ec-ce6",
        "PID uses:",
        "PID uses:",
        ["error terms P+I+D", "only CRC", "only Git hooks", "only QML anchors"],
        0,
      ),
      mcq(
        "ec-ce7",
        "Watchdog:",
        "Watchdog:",
        ["hang recovery reset", "UI skin", "Git LFS", "CSS grid"],
        0,
      ),
      matchEx("ec-ce8", "Architecture", "Architecture", [
        { left: "MCU", right: "real-time control" },
        { left: "SBC", right: "high-level/vision" },
        { left: "GCS", right: "operator" },
      ]),
      codeFill(
        "ec-ce9",
        "crc16",
        "crc16",
        "cpp",
        "uint16_t c = ___(buf,n);",
        ["crc16"],
        true,
      ),
      mcq(
        "ec-ce10",
        "State machine SAFE:",
        "State machine SAFE:",
        ["failsafe behavior mode", "CSS mode", "SQL mode", "npm script"],
        0,
      ),
      mcq(
        "ec-ce11",
        "Bandwidth budget:",
        "Bandwidth budget:",
        ["plan rates across msgs", "infinite radio", "no heartbeats", "ban metrics"],
        0,
      ),
      codeOrder(
        "ec-ce12",
        "Control loop",
        "Control loop",
        "cpp",
        ["read_sensors();", "update_state();", "send_commands();"],
        ["read_sensors();", "update_state();", "send_commands();"],
      ),
  ]),
]);
export const embeddedCppContent: CourseContent = {
  slug: "embedded_cpp",
  titleUk: "Embedded C++ · MilTech",
  titleEn: "Embedded C++ · MilTech",
  descriptionUk:
    "C++ для обмежених ресурсів і miltech-стеку: пам'ять, CMake, мережа, FreeRTOS, MAVLink, safety, data-link, mission, симуляція — deep track + контрольні + labs.",
  descriptionEn:
    "C++ for constrained systems and miltech stack: memory, CMake, networking, FreeRTOS, MAVLink, safety, data-link, mission, simulation — deep track + unit exams + labs.",
  icon: "🪖",
  color: "#4B5320",
  units: [
    miltechIntro,
    memory,
    resources,
    linuxDev,
    oopStl,
    toolchain,
    networking,
    miltechCheckpoint,
    qtQml,
    ros2,
    embeddedRtos,
    uavStack,
    safetyReliability,
    datalinkOps,
    missionAutonomy,
    systemsCapstone,
  ],
};
