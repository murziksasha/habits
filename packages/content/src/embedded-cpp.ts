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
        [
          "детермінізм, контроль пам'яті та продуктивність",
          "тільки красивий UI",
          "заміну SQL",
          "відсутність типів",
        ],
        0,
      ),
      mcq(
        "ec-i2",
        "На що варто фокусуватися в C++ для польових систем?",
        "What should you focus on in C++ for field systems?",
        [
          "надійність, обмежені ресурси, передбачувана поведінка",
          "лише синтаксичний цукор",
          "тільки CSS",
          "відключення логів назавжди",
        ],
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
          hintUk: 'cout << 0 << " " << 0 << endl;',
          hintEn: 'cout << 0 << " " << 0 << endl;',
          solutionUk: `#include <iostream>
using namespace std;
int main() {
  cout << 0 << " " << 0 << endl;
  return 0;
}`,
          solutionEn: `#include <iostream>
using namespace std;
int main() {
  cout << 0 << " " << 0 << endl;
  return 0;
}`,
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
        [
          "циклічно читає вхід / оновлює стан / діє",
          "запускається один раз і завершується ОС",
          "є тільки в браузері",
          "замінює CMake",
        ],
        0,
      ),
      codeOrder(
        "ec-i12",
        "Порядок простого control loop",
        "Simple control loop order",
        "cpp",
        [
          "read_sensors();",
          "update_state();",
          "send_commands();",
          "sleep_or_yield();",
        ],
        [
          "read_sensors();",
          "update_state();",
          "send_commands();",
          "sleep_or_yield();",
        ],
      ),
    ],
  ),
  exam("ec-intro-exam", "Контрольна: intro", "Exam: intro", 1, [
    mcq("ec-ie1", "C++ у MilTech цінують за:", "C++ in MilTech valued for:", ["контроль ресурсів і швидкість", "тільки GUI", "SQL ORM", "CSS"], 0),
    codeFill("ec-ie2", "main", "main", "cpp", "int ___() { return 0; }", ["main"], true),
    codeFill("ec-ie3", "bit and", "bit and", "cpp", "flags ___ MASK", ["&"], true),
    mcq("ec-ie4", "Event loop:", "Event loop:", ["повторюваний цикл реагування на події", "лише linker step", "npm install", "git merge"], 0),
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
          hintEn: "for (int i=0;i<3;i++) s += a[i]; cout << s;",
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
        [
          "впливає на розмір структур і доступ до пам'яті на MCU",
          "лише на колір UI",
          "скасовує TCP",
          "замінює Git",
        ],
        0,
      ),
      matchEx("ec-m8", "Типи даних", "Data kinds", [
        { left: "struct", right: "named fields" },
        { left: "enum", right: "named constants" },
        { left: "union", right: "shared storage variants" },
      ]),
    ],
  ),
  exam("ec-mem-exam", "Контрольна: memory", "Exam: memory", 2, [
    codeFill("ec-me1", "pointer", "pointer", "cpp", "int___ p = &x;", ["*"], true),
    codeFill("ec-me2", "struct", "struct", "cpp", "___ Point { int x; int y; };", ["struct"], true),
    mcq("ec-me3", "Buffer overrun:", "Buffer overrun:", ["write past array bounds", "git commit", "CSS overflow only", "npm audit"], 0),
    mcq("ec-me4", "Alignment affects:", "Alignment affects:", ["struct size & access", "only fonts", "only DNS", "only HTML"], 0),
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
        [
          "паралельна I/O / блокуючі операції, але з ризиками data race",
          "замість типів",
          "щоб вимкнути CMake",
          "лише для CSS",
        ],
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
        [
          "конкурентний доступ без синхронізації з UB",
          "швидкий TCP",
          "помилка CSS",
          "успішний unit test",
        ],
        0,
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
        [
          "час життя контролює програміст (new/delete або smart ptr)",
          "завжди швидша за stack",
          "не існує в C++",
          "лише для HTML",
        ],
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
        [
          "ресурс захоплюється в ctor і звільняється в dtor",
          "лише manual free у main",
          "відключення винятків",
          "заміну linker",
        ],
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
  exam("ec-res-exam", "Контрольна: resources", "Exam: resources", 2, [
    codeFill("ec-re1", "ifstream", "ifstream", "cpp", "std::___ f(\"a.txt\");", ["ifstream"], true),
    codeFill("ec-re2", "unique", "unique", "cpp", "std::___<int>(1);", ["make_unique"], true),
    mcq("ec-re3", "RAII:", "RAII:", ["resource tied to object lifetime", "only SQL join", "CSS flex", "DNS only"], 0),
    mcq("ec-re4", "Data race risk:", "Data race risk:", ["shared mutable without sync", "read-only const", "single-thread always safe", "git only"], 0),
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
      codeFill("ec-l2", "Список файлів", "List files", "bash", "___ -la", ["ls"], true),
      codeFill("ec-l3", "SSH до пристрою", "SSH to device", "bash", "___ user@192.168.1.10", ["ssh"], true),
      mcq(
        "ec-l4",
        "chmod +x script.sh:",
        "chmod +x script.sh:",
        ["робить скрипт виконуваним", "компілює C++", "створює Docker image", "відкриває Qt"],
        0,
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
      codeFill("ec-l6", "git clone", "git clone", "bash", "git ___ https://…/repo.git", ["clone"], true),
      codeFill("ec-l7", "гілка", "branch", "bash", "git ___ -b feature/telemetry", ["checkout", "switch"], false),
      mcq(
        "ec-l8",
        "Що краще НЕ комітити?",
        "What should you usually NOT commit?",
        ["секрети, build artifacts, великі бінарники", "README", "CMakeLists.txt", "unit tests"],
        0,
      ),
    ],
  ),
  exam("ec-linux-exam", "Контрольна: linux/git", "Exam: linux/git", 2, [
    codeFill("ec-le1", "ls", "ls", "bash", "___ -la", ["ls"], true),
    codeFill("ec-le2", "ssh", "ssh", "bash", "___ user@host", ["ssh"], true),
    codeFill("ec-le3", "clone", "clone", "bash", "git ___ url", ["clone"], true),
    mcq("ec-le4", "Containers give:", "Containers give:", ["reproducible env", "free RAM always", "replace MCU", "delete types"], 0),
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
        "Lab: сума масиву {1,2,3,4} (STL-style loop)",
        "Lab: sum array {1,2,3,4} (STL-style loop)",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  int v[4] = {1, 2, 3, 4};
  int s = 0;
  // TODO: sum v[i] for i in 0..3, cout << s
  return 0;
}
`,
        [{ stdout: "10" }],
        {
          requiredSource: ["for", "cout", "v["],
          hintUk: "for (int i=0;i<4;i++) s+=v[i]; cout << s;",
          hintEn: "for (int i=0;i<4;i++) s+=v[i]; cout << s;",
        },
      ),
    ],
  ),
  exam("ec-oop-exam", "Контрольна: OOP/STL", "Exam: OOP/STL", 2, [
    codeFill("ec-oe1", "class", "class", "cpp", "___ Foo {};", ["class"], true),
    codeFill("ec-oe2", "virtual", "virtual", "cpp", "___ void run();", ["virtual"], true),
    codeFill("ec-oe3", "vector", "vector", "cpp", "std::___<int> v;", ["vector"], true),
    mcq("ec-oe4", "unique_ptr vs raw:", "unique_ptr vs raw:", ["owns and auto-frees", "never frees", "SQL only", "CSS only"], 0),
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
  exam("ec-tool-exam", "Контрольна: toolchain", "Exam: toolchain", 2, [
    codeFill("ec-te1", "add_executable", "add_executable", "cmake", "___(app main.cpp)", ["add_executable"], true),
    mcq("ec-te2", "ASan finds:", "ASan finds:", ["memory bugs", "only fonts", "only MQTT topics", "SQL joins"], 0),
    codeFill("ec-te3", "EXPECT_EQ", "EXPECT_EQ", "cpp", "___(a, b);", ["EXPECT_EQ"], true),
    mcq("ec-te4", "clang-format:", "clang-format:", ["auto format style", "runtime GC", "UDP stack", "GPU driver"], 0),
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
        "Lab: XOR checksum байтів 1,2,3",
        "Lab: XOR checksum of bytes 1,2,3",
        "cpp",
        `#include <iostream>
using namespace std;

int main() {
  unsigned char data[3] = {1, 2, 3};
  unsigned char c = 0;
  // TODO: XOR all bytes into c, cout << (int)c
  return 0;
}
`,
        [{ stdout: "0" }],
        {
          requiredSource: ["^", "cout"],
          hintUk: "c ^= data[i]; 1^2^3 = 0",
          hintEn: "c ^= data[i]; 1^2^3 = 0",
        },
      ),
    ],
  ),
  exam("ec-net-exam", "Контрольна: networking", "Exam: networking", 2, [
    mcq("ec-ne1", "Serialization:", "Serialization:", ["bytes representation of data", "only UI theme", "git rebase", "npm pack"], 0),
    mcq("ec-ne2", "UDP:", "UDP:", ["connectionless datagrams", "always ordered reliable", "SQL dialect", "QML engine"], 0),
    codeFill("ec-ne3", "socket", "socket", "cpp", "int fd = ___(AF_INET, SOCK_DGRAM, 0);", ["socket"], true),
    mcq("ec-ne4", "CRC detects:", "CRC detects:", ["transmission bit errors", "CSS bugs", "unused imports only", "DNS cache"], 0),
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
  exam("ec-qt-exam", "Контрольна: Qt/QML", "Exam: Qt/QML", 2, [
    mcq("ec-qe1", "moc is for:", "moc is for:", ["Qt meta-object system", "SQL migration", "UDP checksum", "Docker build"], 0),
    codeFill("ec-qe2", "connect", "connect", "cpp", "QObject::___(…);", ["connect"], true),
    mcq("ec-qe3", "QML is:", "QML is:", ["declarative UI language", "kernel module", "CRC algo", "git hook"], 0),
    mcq("ec-qe4", "MVC:", "MVC:", ["Model-View-Controller split", "Memory-Virtual-Cache only", "MAV-Video-Codec", "make-valgrind-cmake"], 0),
  ]),
]);

const ros2 = unit("ros2", "ROS 2", "ROS 2", [
  lesson(
    "ec-ros-topics",
    "Nodes, topics, pub/sub",
    "Nodes, topics, pub/sub",
    3,
    false,
    [
      mcq(
        "ec-s1",
        "ROS 2 у MilTech корисний для:",
        "ROS 2 is useful in MilTech for:",
        ["модульної архітектури сенсорів/алгоритмів через pub/sub", "заміни C++", "лише веб-хостингу", "форматування коду"],
        0,
      ),
      matchEx("ec-s2", "ROS 2 concepts", "ROS 2 concepts", [
        { left: "node", right: "process/component" },
        { left: "topic", right: "pub/sub stream" },
        { left: "message", right: "typed payload" },
      ]),
      codeFill(
        "ec-s3",
        "Publisher (rclcpp idea)",
        "Publisher (rclcpp idea)",
        "cpp",
        "auto pub = ___<Msg>(\"/pose\", 10);",
        ["create_publisher"],
        true,
      ),
      mcq(
        "ec-s4",
        "Topic pub/sub vs прямий UDP:",
        "Topic pub/sub vs raw UDP:",
        ["абстракція, discovery, типізація; інша модель доставки", "завжди швидше за raw UDP", "немає різниці", "тільки для CSS"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-ros-services",
    "Services, launch, YAML, separation",
    "Services, launch, YAML, separation",
    3,
    false,
    [
      mcq(
        "ec-s5",
        "Service відрізняється від topic тим, що:",
        "A service differs from a topic by:",
        ["request/response (синхронний виклик)", "тільки broadcast відео", "замінює CMake", "лише SSH"],
        0,
      ),
      codeFill(
        "ec-s6",
        "ros2 CLI list topics",
        "ros2 CLI list topics",
        "bash",
        "ros2 ___ list",
        ["topic"],
        true,
      ),
      mcq(
        "ec-s7",
        "Принцип «алгоритм окремо від ROS»:",
        "\"Algorithm separate from ROS\" means:",
        [
          "чиста логіка без ROS API; тонка обгортка pub/sub",
          "весь код лише в launch YAML",
          "не писати тести",
          "змішувати UI і kernel",
        ],
        0,
      ),
      matchEx("ec-s8", "Конфіг", "Config", [
        { left: "launch", right: "start graph of nodes" },
        { left: "YAML params", right: "runtime configuration" },
        { left: "package", right: "build & install unit" },
      ]),
    ],
  ),
  exam("ec-ros-exam", "Контрольна: ROS 2", "Exam: ROS 2", 3, [
    mcq("ec-se1", "Topic is:", "Topic is:", ["pub/sub channel", "SQL table", "CMake flag", "Qt slot only"], 0),
    codeFill("ec-se2", "create_publisher", "create_publisher", "cpp", "auto p = ___<M>(\"/t\", 10);", ["create_publisher"], true),
    mcq("ec-se3", "Service:", "Service:", ["request/response", "only fire-and-forget stream", "git LFS", "CRC poly"], 0),
    mcq("ec-se4", "Separate algorithm:", "Separate algorithm:", ["testable pure logic + thin ROS wrap", "hardcode ROS in every formula", "delete packages", "skip YAML"], 0),
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
  exam("ec-emb-exam", "Контрольна: embedded/RTOS", "Exam: embedded/RTOS", 3, [
    mcq("ec-ee1", "MCU includes:", "MCU includes:", ["CPU+mem+peripherals", "only cloud DB", "only browser", "only Qt Designer"], 0),
    matchEx("ec-ee2", "Bus pick", "Bus pick", [
      { left: "sensor hub many chips", right: "I2C often" },
      { left: "high-speed ADC", right: "SPI often" },
    ]),
    codeFill("ec-ee3", "xTaskCreate", "xTaskCreate", "cpp", "___ (fn, \"n\", stack, …);", ["xTaskCreate"], true),
    mcq("ec-ee4", "Mutex protects:", "Mutex protects:", ["shared resource between tasks", "CRC poly only", "CSS variables", "git remotes"], 0),
  ]),
]);

const uavStack = unit("uav-stack", "SBC · drones · MAVLink", "SBC · drones · MAVLink", [
  lesson(
    "ec-sbc-oss",
    "SBC і OSS стеки дронів",
    "SBC and OSS drone stacks",
    3,
    false,
    [
      matchEx("ec-u1", "Ролі в архітектурі", "Architecture roles", [
        { left: "flight MCU", right: "hard real-time control" },
        { left: "companion SBC", right: "vision / high-level" },
        { left: "ground station", right: "operator UI / planning" },
      ]),
      mcq(
        "ec-u2",
        "Raspberry Pi / Jetson зазвичай:",
        "Raspberry Pi / Jetson usually:",
        ["бортовий комп'ютер для heavy compute, не hard RT motor loop", "замінюють ESC", "є тільки MCU з 8 KB RAM", "SQL warehouse"],
        0,
      ),
      mcq(
        "ec-u3",
        "OSS проєкти (PX4/ArduPilot тощо) дають:",
        "OSS projects (PX4/ArduPilot etc.) provide:",
        ["готовий FC stack + sim + docs для ітерацій", "секрети бойових прошивок", "заміну фізики", "лише CSS theme"],
        0,
      ),
      codeFill(
        "ec-u4",
        "Документація SITL (ідея)",
        "SITL docs (idea)",
        "bash",
        "# follow project docs: build && run ___",
        ["sitl", "SITL"],
        false,
      ),
    ],
  ),
  lesson(
    "ec-mavlink-gazebo",
    "MAVLink і Gazebo/SITL",
    "MAVLink and Gazebo/SITL",
    3,
    false,
    [
      mcq(
        "ec-u5",
        "MAVLink — це:",
        "MAVLink is:",
        ["lightweight messaging protocol для GCS ↔ vehicle", "відеокодек", "RTOS scheduler", "CMake generator"],
        0,
      ),
      codeRead(
        "ec-u6",
        "Поля заголовка MAVLink (спрощено):",
        "MAVLink header fields (simplified):",
        "cpp",
        "// magic, len, seq, sysid, compid, msgid, payload..., checksum",
        ["структурований пакет з id і checksum", "raw TCP stream без полів", "QML property", "Git LFS pointer"],
        0,
      ),
      matchEx("ec-u7", "Sim stack", "Sim stack", [
        { left: "Gazebo", right: "physics / sensors sim" },
        { left: "SITL", right: "autopilot software in loop" },
        { left: "QGroundControl", right: "operator GCS" },
      ]),
      mcq(
        "ec-u8",
        "Симуляція корисна, бо:",
        "Simulation is useful because:",
        ["безпечне тестування логіки без ризику для апарату", "замінює всі unit-тести", "прибирає потребу в CRC", "скасовує Git"],
        0,
      ),
    ],
  ),
  exam("ec-uav-exam", "Контрольна: UAV stack", "Exam: UAV stack", 3, [
    mcq("ec-ue1", "Companion computer:", "Companion computer:", ["high-level / vision", "only PWM motors always", "replaces battery", "CSS CDN"], 0),
    mcq("ec-ue2", "MAVLink:", "MAVLink:", ["vehicle messaging protocol", "video container only", "mutex type", "QML module"], 0),
    mcq("ec-ue3", "Gazebo role:", "Gazebo role:", ["simulation environment", "flight motor driver", "CRC library", "SSH daemon"], 0),
    matchEx("ec-ue4", "Who talks MAVLink?", "Who talks MAVLink?", [
      { left: "autopilot", right: "onboard FC software" },
      { left: "GCS", right: "operator software" },
    ]),
  ]),
]);

const systemsCapstone = unit("systems-capstone", "Systems · capstone", "Systems · capstone", [
  lesson(
    "ec-video-crypto",
    "Відео пайплайни та крипто основи",
    "Video pipelines & crypto basics",
    3,
    false,
    [
      mcq(
        "ec-c1",
        "Відеокодек потрібен щоб:",
        "A video codec is needed to:",
        ["стискати/розпаковувати відеопотік", "керувати PWM", "замінити MAVLink", "форматувати C++"],
        0,
      ),
      codeFill(
        "ec-c2",
        "gstreamer pipeline idea",
        "gstreamer pipeline idea",
        "bash",
        "___ videotestsrc ! autovideosink",
        ["gst-launch-1.0"],
        true,
      ),
      matchEx("ec-c3", "Crypto concepts", "Crypto concepts", [
        { left: "encryption", right: "confidentiality" },
        { left: "signing", right: "integrity + authenticity" },
        { left: "secure boot", right: "trusted firmware chain" },
      ]),
      mcq(
        "ec-c4",
        "Публічний/приватний ключ:",
        "Public/private keys:",
        ["асиметрична пара; private тримають у секреті", "обидва завжди публічні", "лише для CSS", "замінюють CRC"],
        0,
      ),
    ],
  ),
  lesson(
    "ec-pid-control",
    "Системи керування · PID",
    "Control systems · PID",
    3,
    false,
    [
      mcq(
        "ec-c5",
        "САК (control systems) вивчає:",
        "Control systems study:",
        ["як система реагує на вхід і як стабілізувати поведінку", "лише UI анімації", "тільки DNS", "форматування коду"],
        0,
      ),
      codeFill(
        "ec-c6",
        "PID сума (ідея)",
        "PID sum (idea)",
        "cpp",
        "u = ___*e + Ki*integral + Kd*derivative;",
        ["Kp"],
        true,
      ),
      matchEx("ec-c7", "PID terms", "PID terms", [
        { left: "P", right: "proportional to error" },
        { left: "I", right: "accumulates error" },
        { left: "D", right: "reacts to rate of change" },
      ]),
      mcq(
        "ec-c8",
        "Підбір коефіцієнтів PID:",
        "Tuning PID gains:",
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
          hintEn: "cout << (Kp * e) << endl;",
        },
      ),
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
        promptUk:
          "C++ mini: структура Telemetry {x,y,yaw}, encode/decode у байтовий буфер, проста crc16 stub, step_waypoint() оновлює позицію. README: MCU vs SBC vs GCS.",
        promptEn:
          "C++ mini: Telemetry {x,y,yaw} struct, encode/decode to byte buffer, simple crc16 stub, step_waypoint() updates pose. README: MCU vs SBC vs GCS.",
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
          },
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
          },
        ],
        hintUk:
          "struct Telemetry; crc16(...); encode/decode з memcpy полів; step_waypoint: рух до (tx,ty) з обмеженням кроку.",
        hintEn:
          "struct Telemetry; crc16(...); encode/decode with field memcpy; step_waypoint: move toward (tx,ty) with step limit.",
      } as Exercise,
    ],
  ),
  exam("ec-cap-exam", "Фінальна контрольна Embedded C++", "Final Embedded C++ exam", 3, [
    mcq("ec-ce1", "C++ in MilTech prioritizes:", "C++ in MilTech prioritizes:", ["reliability & resources", "only pretty UI", "skip tests", "ignore memory"], 0),
    codeFill("ec-ce2", "unique_ptr", "unique_ptr", "cpp", "std::___<T> p;", ["unique_ptr"], true),
    mcq("ec-ce3", "UDP good for:", "UDP good for:", ["low-latency telemetry bursts", "always file transfer only", "replacing flash", "CSS minify"], 0),
    codeFill("ec-ce4", "xTaskCreate", "xTaskCreate", "cpp", "___ (task, \"n\", …);", ["xTaskCreate"], true),
    mcq("ec-ce5", "MAVLink is:", "MAVLink is:", ["messaging for vehicles/GCS", "video codec", "Qt widget", "bash builtin"], 0),
    mcq("ec-ce6", "PID uses:", "PID uses:", ["error terms P+I+D", "only CRC", "only Git hooks", "only QML anchors"], 0),
  ]),
]);

export const embeddedCppContent: CourseContent = {
  slug: "embedded_cpp",
  titleUk: "Embedded C++ · MilTech",
  titleEn: "Embedded C++ · MilTech",
  descriptionUk:
    "C++ для обмежених ресурсів і miltech-стеку: пам'ять, CMake, мережа, FreeRTOS, MAVLink, симуляція — deep track + контрольні.",
  descriptionEn:
    "C++ for constrained systems and miltech stack: memory, CMake, networking, FreeRTOS, MAVLink, simulation — deep track + unit exams.",
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
    qtQml,
    ros2,
    embeddedRtos,
    uavStack,
    systemsCapstone,
  ],
};
