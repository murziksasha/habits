import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const L = (slug, uk, en, diff, free, ex) => ({ kind: "lesson", slug, uk, en, diff, free, ex });
const E = (slug, uk, en, diff, ex) => ({ kind: "exam", slug, uk, en, diff, free: false, ex });
const U = (slug, uk, en, lessons) => ({ slug, uk, en, lessons });

const mcq = (id, uk, en, opts, ci) => ({ t: "mcq", id, uk, en, opts, ci });
const fill = (id, uk, en, lang, code, acc, cs = true) => ({
  t: "fill",
  id,
  uk,
  en,
  lang,
  code,
  acc,
  cs,
});
const read = (id, uk, en, lang, code, opts, ci) => ({ t: "read", id, uk, en, lang, code, opts, ci });
const order = (id, uk, en, lang, lines, correct) => ({ t: "order", id, uk, en, lang, lines, correct });
const match = (id, uk, en, pairs) => ({ t: "match", id, uk, en, pairs });
const out = (id, uk, en, lang, code, opts, ci) => ({ t: "out", id, uk, en, lang, code, opts, ci });
const run = (id, uk, en, starter, stdout, extra = {}) => ({
  t: "run",
  id,
  uk,
  en,
  starter,
  tests: [{ stdout }],
  ...extra,
});
const proj = (id, uk, en, files, checks, hintUk, hintEn) => ({
  t: "proj",
  id,
  uk,
  en,
  files,
  checks,
  hintUk,
  hintEn,
});

const cppMain = (body) => `#include <iostream>
using namespace std;

int main() {
${body}
  return 0;
}
`;

const units = [];

units.push(
  U("miltech-intro", "MilTech intro · C++", "MilTech intro · C++", [
    L("ec-miltech-path", "Специфіка C++ у Military Tech", "C++ specifics in Military Tech", 1, true, [
      mcq("ec-i1", "У MilTech-системах C++ часто обирають через:", "In MilTech systems C++ is often chosen for:", ["детермінізм, контроль пам'яті та продуктивність", "тільки красивий UI", "заміну SQL", "відсутність типів"], 0),
      mcq("ec-i2", "На що варто фокусуватися в C++ для польових систем?", "What should you focus on in C++ for field systems?", ["надійність, обмежені ресурси, передбачувана поведінка", "лише синтаксичний цукор", "тільки CSS", "відключення логів назавжди"], 0),
      fill("ec-i3", "Точка входу програми", "Program entry point", "cpp", "int ___() { return 0; }", ["main"]),
      match("ec-i4", "Шлях компіляції", "Compilation path", [{ left: "source .cpp", right: "human-written code" }, { left: "compiler", right: "to object code" }, { left: "linker", right: "produces executable" }]),
      out("ec-i4b", "Що виведе програма?", "What does this print?", "cpp", `#include <iostream>
using namespace std;
int main() {
  cout << 2 + 2 << endl;
  return 0;
}`, ["4", "22", "2+2", "error"], 0),
      run("ec-i4c", "Lab: виведи координати 0 0", "Lab: print coordinates 0 0", cppMain('  // TODO: cout << 0 << " " << 0 << endl;'), "0 0", { req: ["cout", "main"], forb: ["system("], hintUk: 'cout << 0 << " " << 0 << endl;', hintEn: 'cout << 0 << " " << 0 << endl;' }),
    ]),
    L("ec-types-ops", "Типи, оператори, умови, bitmap", "Types, operators, conditions, bitmap", 1, true, [
      mcq("ec-i5", "uint8_t у контексті embedded зазвичай означає:", "uint8_t in embedded usually means:", ["8-бітове беззнакове ціле", "рядок UTF-16", "покажчик на float", "SQL тип"], 0),
      fill("ec-i6", "Бітова перевірка прапорця", "Bit flag test", "cpp", "if (flags ___ MASK) { /* bit set */ }", ["&"]),
      read("ec-i7", "Що робить цей код?", "What does this code do?", "cpp", "flags |= (1u << 3);", ["встановлює біт 3", "очищає всі біти", "ділить на 3", "викликає SQL"], 0),
      mcq("ec-i8", "Патерн bitmap корисний для:", "Bitmap pattern is useful for:", ["компактних прапорців стану / можливостей", "зберігання відео 4K", "CSS layout", "заміни Git"], 0),
      fill("ec-i8b", "Очистити біт", "Clear bit", "cpp", "flags &= ~___;", ["MASK", "mask"], false),
      run("ec-i8c", "Lab: flags | 4 → 7 якщо flags=3", "Lab: flags|4 → 7 when flags=3", cppMain("  int flags = 3;\n  // TODO: set bit 2 (value 4), cout << flags"), "7", { req: ["flags", "cout"], hintUk: "flags |= 4; cout << flags;", hintEn: "flags |= 4; cout << flags;" }),
    ]),
    L("ec-loops-fn", "Цикли, функції, main event loop", "Loops, functions, main event loop", 1, true, [
      fill("ec-i9", "Цикл for", "for loop", "cpp", "for (int i = 0; i < n; ++___) { }", ["i"]),
      fill("ec-i10", "Оголошення функції", "Function declaration", "cpp", "___ distance(double x, double y);", ["double"]),
      mcq("ec-i11", "Main event loop у embedded зазвичай:", "Main event loop in embedded usually:", ["циклічно читає вхід / оновлює стан / діє", "запускається один раз і завершується ОС", "є тільки в браузері", "замінює CMake"], 0),
      order("ec-i12", "Порядок простого control loop", "Simple control loop order", "cpp", ["read_sensors();", "update_state();", "send_commands();", "sleep_or_yield();"], ["read_sensors();", "update_state();", "send_commands();", "sleep_or_yield();"]),
      run("ec-i12b", "Lab: 5 тіків циклу, cout ticks", "Lab: 5 loop ticks, cout ticks", cppMain("  int ticks = 0;\n  // TODO: for i=0..4 ticks++; then cout << ticks"), "5", { req: ["for", "cout"], hintUk: "for (int i=0;i<5;i++) ticks++; cout << ticks;", hintEn: "for (int i=0;i<5;i++) ticks++; cout << ticks;" }),
    ]),
    L("ec-determinism-logs", "Детермінізм, логи, стандарти коду", "Determinism, logs, coding standards", 2, true, [
      mcq("ec-i13", "Детермінізм у control loop означає:", "Determinism in a control loop means:", ["передбачувана поведінка в часі/ресурсах", "випадкові sleep без бюджету", "лише красивий UI", "відключені логи назавжди"], 0),
      match("ec-i14", "Рівні логування", "Log levels", [{ left: "ERROR", right: "failures needing attention" }, { left: "WARN", right: "degraded but running" }, { left: "DEBUG", right: "verbose diagnostics" }]),
      mcq("ec-i15", "Стандарти на кшталт MISRA-style допомагають:", "MISRA-style rules help:", ["зменшити небезпечні конструкції C/C++", "замінити unit tests", "прискорити Wi-Fi", "малювати QML"], 0),
      fill("ec-i16", "constexpr для констант", "constexpr for constants", "cpp", "___ int MAX_SENSORS = 8;", ["constexpr", "const"], false),
      mcq("ec-i17", "У польовій системі краще уникати:", "In field systems better avoid:", ["необмежених динамічних алокацій у hot path", "явних типів розміру", "CRC перевірок", "watchdog"], 0),
    ]),
    E("ec-intro-exam", "Контрольна: intro", "Exam: intro", 1, [
      mcq("ec-ie1", "C++ у MilTech цінують за:", "C++ in MilTech valued for:", ["контроль ресурсів і швидкість", "тільки GUI", "SQL ORM", "CSS"], 0),
      fill("ec-ie2", "main", "main", "cpp", "int ___() { return 0; }", ["main"]),
      fill("ec-ie3", "bit and", "bit and", "cpp", "flags ___ MASK", ["&"]),
      mcq("ec-ie4", "Event loop:", "Event loop:", ["повторюваний цикл реагування на події", "лише linker step", "npm install", "git merge"], 0),
      mcq("ec-ie5", "Bitmap flags good for:", "Bitmap flags good for:", ["compact status bits", "4K video store", "CSS only", "git LFS"], 0),
      read("ec-ie6", "flags &= ~MASK means:", "flags &= ~MASK means:", "cpp", "flags &= ~MASK;", ["clear bits in MASK", "set all bits", "divide flags", "open socket"], 0),
      mcq("ec-ie7", "Determinism priority:", "Determinism priority:", ["predictable timing & resources", "random sleeps OK", "skip logs forever", "ignore types"], 0),
    ]),
  ]),
);

// Import remaining units from companion data to keep this file maintainable —
// continued in same file below for single-run generation.

function addRest() {
  units.push(
    U("memory", "Пам'ять і структури", "Memory & structures", [
      L("ec-arrays-ptr", "Масиви, рядки, вказівники", "Arrays, strings, pointers", 2, false, [
        mcq("ec-m1", "Масив у C++ розміщується як:", "An array in C++ is laid out as:", ["послідовні елементи одного типу", "зв'язаний список за замовчуванням", "хеш-таблиця", "DOM-дерево"], 0),
        fill("ec-m2", "Розмір масиву (кількість елементів)", "Array length (element count)", "cpp", "int a[10]; size_t n = ___(a) / sizeof(a[0]);", ["sizeof"]),
        fill("ec-m3", "Оголошення вказівника", "Pointer declaration", "cpp", "int___ p = &x;", ["*"]),
        mcq("ec-m4", "Типова помилка з масивами:", "Typical array bug:", ["вихід за межі індексів (buffer overrun)", "занадто багато SQL", "відсутність CSS", "зайвий npm"], 0),
        run("ec-m4b", "Lab: сума масиву 1+2+3", "Lab: sum array 1+2+3", cppMain("  int a[3] = {1, 2, 3};\n  int s = 0;\n  // TODO: for loop sum into s, then cout << s"), "6", { req: ["for", "cout", "a["], hintUk: "for (int i=0;i<3;i++) s += a[i]; cout << s;", hintEn: "for (int i=0;i<3;i++) s += a[i]; cout << s;" }),
      ]),
      L("ec-struct-align", "Структури, enum, union, alignment", "Structs, enum, union, alignment", 2, false, [
        fill("ec-m5", "Структура телеметрії", "Telemetry struct", "cpp", "___ Pose { double x; double y; double yaw; };", ["struct"]),
        fill("ec-m6", "enum class", "enum class", "cpp", "enum ___ Mode { Idle, Fly, Land };", ["class"]),
        mcq("ec-m7", "Вирівнювання пам'яті (alignment) важливе, бо:", "Memory alignment matters because:", ["впливає на розмір структур і доступ до пам'яті на MCU", "лише на колір UI", "скасовує TCP", "замінює Git"], 0),
        match("ec-m8", "Типи даних", "Data kinds", [{ left: "struct", right: "named fields" }, { left: "enum", right: "named constants" }, { left: "union", right: "shared storage variants" }]),
        mcq("ec-m8b", "union дозволяє:", "union allows:", ["різні інтерпретації спільної пам'яті", "нескінченний heap", "заміну CRC", "відключення IRQ"], 0),
      ]),
      L("ec-endian-pack", "Endianness, packed layout, ownership", "Endianness, packed layout, ownership", 3, false, [
        mcq("ec-m9", "Little-endian означає:", "Little-endian means:", ["молодший байт за нижчою адресою", "старший байт завжди перший у мережі без конверсії", "лише float layout", "відсутність байтів"], 0),
        fill("ec-m10", "Pack hi/lo bytes", "Pack hi/lo bytes", "cpp", "uint16_t v = (uint16_t(hi) << 8) | ___;", ["lo", "uint16_t(lo)"], false),
        mcq("ec-m11", "Packed struct ризики:", "Packed struct risks:", ["unaligned access / portability costs", "faster always free", "replaces CRC", "deletes pointers"], 0),
        match("ec-m12", "Ownership", "Ownership", [{ left: "owner pointer", right: "responsible for free" }, { left: "borrow/view", right: "no free rights" }, { left: "null check", right: "guard before deref" }]),
        run("ec-m13", "Lab: pack bytes hi=1 lo=2 → 258", "Lab: pack bytes hi=1 lo=2 → 258", cppMain("  int hi = 1, lo = 2;\n  // TODO: v = (hi<<8)|lo; cout << v"), "258", { req: ["<<", "cout"], hintUk: "cout << ((hi<<8)|lo);", hintEn: "cout << ((hi<<8)|lo);" }),
      ]),
      E("ec-mem-exam", "Контрольна: memory", "Exam: memory", 2, [
        fill("ec-me1", "pointer", "pointer", "cpp", "int___ p = &x;", ["*"]),
        fill("ec-me2", "struct", "struct", "cpp", "___ Point { int x; int y; };", ["struct"]),
        mcq("ec-me3", "Buffer overrun:", "Buffer overrun:", ["write past array bounds", "git commit", "CSS overflow only", "npm audit"], 0),
        mcq("ec-me4", "Alignment affects:", "Alignment affects:", ["struct size & access", "only fonts", "only DNS", "only HTML"], 0),
        mcq("ec-me5", "Little-endian:", "Little-endian:", ["LSB at lower address", "always network order", "no bytes", "SQL only"], 0),
        fill("ec-me6", "sizeof", "sizeof", "cpp", "size_t n = ___(a) / sizeof(a[0]);", ["sizeof"]),
        match("ec-me7", "Kinds", "Kinds", [{ left: "enum", right: "named constants" }, { left: "union", right: "shared storage" }]),
      ]),
    ]),
  );

  units.push(
    U("resources", "Ресурси і I/O", "Resources & I/O", [
      L("ec-files-threads", "Файли та багатопоточність", "Files and multithreading", 2, false, [
        fill("ec-r1", "Відкрити ifstream", "Open ifstream", "cpp", 'std::___ in("log.bin", std::ios::binary);', ["ifstream"]),
        mcq("ec-r2", "Додаткові потоки потрібні, коли:", "Extra threads are useful when:", ["паралельна I/O / блокуючі операції, але з ризиками data race", "замість типів", "щоб вимкнути CMake", "лише для CSS"], 0),
        fill("ec-r3", "std::thread", "std::thread", "cpp", "std::___ t(worker); t.join();", ["thread"]),
        mcq("ec-r4", "Data race — це:", "A data race is:", ["конкурентний доступ без синхронізації з UB", "швидкий TCP", "помилка CSS", "успішний unit test"], 0),
        fill("ec-r4b", "mutex lock guard idea", "mutex lock guard idea", "cpp", "std::___ lock(m);", ["lock_guard", "unique_lock"], false),
      ]),
      L("ec-heap-raii", "Динамічна пам'ять і RAII", "Dynamic memory & RAII", 2, false, [
        mcq("ec-r5", "Heap (динамічна пам'ять) відрізняється тим, що:", "Heap (dynamic memory) differs in that:", ["час життя контролює програміст (new/delete або smart ptr)", "завжди швидша за stack", "не існує в C++", "лише для HTML"], 0),
        fill("ec-r6", "unique_ptr", "unique_ptr", "cpp", "auto p = std::___<Buffer>(n);", ["make_unique"]),
        read("ec-r7", "RAII означає:", "RAII means:", "cpp", "class File { File(const char* p){ open(p);} ~File(){ close(); } };", ["ресурс захоплюється в ctor і звільняється в dtor", "лише manual free у main", "відключення винятків", "заміну linker"], 0),
        mcq("ec-r8", "Утечка пам'яті (leak) — це:", "A memory leak is:", ["виділили і не звільнили / втратили вказівник", "успішний CRC", "git stash", "npm start"], 0),
      ]),
      L("ec-ownership-patterns", "Ownership patterns · no-leak habits", "Ownership patterns · no-leak habits", 3, false, [
        mcq("ec-r9", "unique_ptr vs shared_ptr:", "unique_ptr vs shared_ptr:", ["unique — один власник; shared — shared ownership", "shared never frees", "unique for SQL only", "same always"], 0),
        fill("ec-r10", "shared_ptr", "shared_ptr", "cpp", "std::___<Node> n;", ["shared_ptr"]),
        match("ec-r11", "Sync tools", "Sync tools", [{ left: "mutex", right: "mutual exclusion" }, { left: "atomic", right: "lock-free simple ops" }, { left: "condition_variable", right: "wait/notify" }]),
        mcq("ec-r12", "У hot path на MCU краще:", "On MCU hot path better:", ["static/stack buffers with known size", "unlimited heap churn", "new in ISR casually", "ignore ownership"], 0),
        run("ec-r13", "Lab: clamp 150 into [0,100] → 100", "Lab: clamp 150 into [0,100] → 100", cppMain("  int v = 150;\n  int lo = 0, hi = 100;\n  // TODO: if v>hi v=hi; if v<lo v=lo; cout << v"), "100", { req: ["cout"], hintUk: "if(v>hi)v=hi; if(v<lo)v=lo; cout<<v;", hintEn: "if(v>hi)v=hi; if(v<lo)v=lo; cout<<v;" }),
      ]),
      E("ec-res-exam", "Контрольна: resources", "Exam: resources", 2, [
        fill("ec-re1", "ifstream", "ifstream", "cpp", 'std::___ f("a.txt");', ["ifstream"]),
        fill("ec-re2", "unique", "unique", "cpp", "std::___<int>(1);", ["make_unique"]),
        mcq("ec-re3", "RAII:", "RAII:", ["resource tied to object lifetime", "only SQL join", "CSS flex", "DNS only"], 0),
        mcq("ec-re4", "Data race risk:", "Data race risk:", ["shared mutable without sync", "read-only const", "single-thread always safe", "git only"], 0),
        fill("ec-re5", "thread", "thread", "cpp", "std::___ t(fn);", ["thread"]),
        mcq("ec-re6", "MCU hot path:", "MCU hot path:", ["prefer fixed buffers", "unlimited new always", "skip RAII", "ignore races"], 0),
      ]),
    ]),
  );

  units.push(
    U("linux-dev", "Linux · Bash · Git", "Linux · Bash · Git", [
      L("ec-linux-bash", "Linux FS, термінал, bash", "Linux FS, terminal, bash", 2, false, [
        match("ec-l1", "Шляхи Linux", "Linux paths", [{ left: "/", right: "filesystem root" }, { left: "/home", right: "user homes" }, { left: "/dev", right: "device nodes" }]),
        fill("ec-l2", "Список файлів", "List files", "bash", "___ -la", ["ls"]),
        fill("ec-l3", "SSH до пристрою", "SSH to device", "bash", "___ user@192.168.1.10", ["ssh"]),
        mcq("ec-l4", "chmod +x script.sh:", "chmod +x script.sh:", ["робить скрипт виконуваним", "компілює C++", "створює Docker image", "відкриває Qt"], 0),
        fill("ec-l4b", "Copy file", "Copy file", "bash", "___ src.bin /opt/app/", ["cp"]),
      ]),
      L("ec-containers-git", "Контейнери і Git", "Containers & Git", 2, false, [
        mcq("ec-l5", "Контейнери для dev корисні, бо:", "Containers help dev because:", ["відтворюване середовище збірки/залежностей", "замінюють Git", "прискорюють CSS", "вимикають типи"], 0),
        fill("ec-l6", "git clone", "git clone", "bash", "git ___ https://…/repo.git", ["clone"]),
        fill("ec-l7", "гілка", "branch", "bash", "git ___ -b feature/telemetry", ["checkout", "switch"], false),
        mcq("ec-l8", "Що краще НЕ комітити?", "What should you usually NOT commit?", ["секрети, build artifacts, великі бінарники", "README", "CMakeLists.txt", "unit tests"], 0),
      ]),
      L("ec-field-deploy", "Field deploy · logs · transfer", "Field deploy · logs · transfer", 3, false, [
        fill("ec-l9", "scp file to device", "scp file to device", "bash", "___ firmware.bin user@host:/opt/", ["scp"]),
        mcq("ec-l10", "journalctl / logs help:", "journalctl / logs help:", ["diagnose field failures after deploy", "replace CRC", "paint QML", "delete types"], 0),
        match("ec-l11", "Deploy tools", "Deploy tools", [{ left: "ssh", right: "remote shell" }, { left: "scp/rsync", right: "copy artifacts" }, { left: "systemd", right: "service lifecycle" }]),
        mcq("ec-l12", "Log rotation needed because:", "Log rotation needed because:", ["disks fill; retain recent diagnostics", "logs never grow", "replaces Git", "disables SSH"], 0),
        order("ec-l13", "Safe deploy order", "Safe deploy order", "bash", ["stop service", "copy binary", "start service", "check logs"], ["stop service", "copy binary", "start service", "check logs"]),
      ]),
      E("ec-linux-exam", "Контрольна: linux/git", "Exam: linux/git", 2, [
        fill("ec-le1", "ls", "ls", "bash", "___ -la", ["ls"]),
        fill("ec-le2", "ssh", "ssh", "bash", "___ user@host", ["ssh"]),
        fill("ec-le3", "clone", "clone", "bash", "git ___ url", ["clone"]),
        mcq("ec-le4", "Containers give:", "Containers give:", ["reproducible env", "free RAM always", "replace MCU", "delete types"], 0),
        fill("ec-le5", "scp", "scp", "bash", "___ file user@h:/path", ["scp"]),
        mcq("ec-le6", "Do not commit:", "Do not commit:", ["secrets & huge binaries", "README", "tests", "CMakeLists"], 0),
      ]),
    ]),
  );

  units.push(
    U("oop-stl", "ООП · templates · STL", "OOP · templates · STL", [
      L("ec-oop-basics", "Класи, інкапсуляція, virtual", "Classes, encapsulation, virtual", 2, false, [
        fill("ec-o1", "Клас", "Class", "cpp", "___ Sensor { public: double read(); private: int fd_; };", ["class"]),
        mcq("ec-o2", "Інкапсуляція ресурсів у клас допомагає:", "Encapsulating resources in a class helps:", ["керувати lifetime і API доступу", "прибрати CMake", "замінити TCP", "вимкнути тести"], 0),
        fill("ec-o3", "Віртуальний метод", "Virtual method", "cpp", "___ double sample() = 0;", ["virtual"]),
        read("ec-o4", "override означає:", "override means:", "cpp", "double sample() override;", ["перевизначає virtual базового класу", "видаляє метод", "лише macro", "SQL view"], 0),
      ]),
      L("ec-templates-stl", "Templates, vector, smart pointers", "Templates, vector, smart pointers", 3, false, [
        fill("ec-o5", "Шаблон функції", "Function template", "cpp", "___<typename T> T clamp(T v, T lo, T hi);", ["template"]),
        fill("ec-o6", "std::vector", "std::vector", "cpp", "std::___<double> samples;", ["vector"]),
        fill("ec-o7", "shared_ptr", "shared_ptr", "cpp", "std::___<Node> n;", ["shared_ptr"]),
        mcq("ec-o8", "O(n) означає:", "O(n) means:", ["час росте лінійно з розміром входу", "завжди константа", "тільки SQL", "помилка linker"], 0),
        run("ec-o8b", "Lab: сума {1,2,3,4}", "Lab: sum {1,2,3,4}", cppMain("  int v[4] = {1, 2, 3, 4};\n  int s = 0;\n  // TODO: sum, cout << s"), "10", { req: ["for", "cout", "v["], hintUk: "for(int i=0;i<4;i++)s+=v[i]; cout<<s;", hintEn: "for(int i=0;i<4;i++)s+=v[i]; cout<<s;" }),
      ]),
      L("ec-drivers-poly", "Driver interfaces · complexity", "Driver interfaces · complexity", 3, false, [
        mcq("ec-o9", "Abstract Sensor interface helps:", "Abstract Sensor interface helps:", ["swap mock/real drivers in tests", "delete CMake", "skip CRC", "force heap always"], 0),
        fill("ec-o10", "pure virtual", "pure virtual", "cpp", "virtual int read() = ___;", ["0"]),
        match("ec-o11", "Complexity", "Complexity", [{ left: "O(1)", right: "constant time" }, { left: "O(n)", right: "linear scan" }, { left: "O(n log n)", right: "typical sort" }]),
        mcq("ec-o12", "unique_ptr for driver ownership:", "unique_ptr for driver ownership:", ["clear single owner of hardware handle", "shared free-for-all", "SQL only", "CSS only"], 0),
        run("ec-o13", "Lab: count values > 5 in {3,6,7,2}", "Lab: count values > 5 in {3,6,7,2}", cppMain("  int a[4]={3,6,7,2};\n  int c=0;\n  // TODO: count a[i]>5; cout << c"), "2", { req: ["for", "cout"], hintUk: "if(a[i]>5)c++;", hintEn: "if(a[i]>5)c++;" }),
      ]),
      E("ec-oop-exam", "Контрольна: OOP/STL", "Exam: OOP/STL", 2, [
        fill("ec-oe1", "class", "class", "cpp", "___ Foo {};", ["class"]),
        fill("ec-oe2", "virtual", "virtual", "cpp", "___ void run();", ["virtual"]),
        fill("ec-oe3", "vector", "vector", "cpp", "std::___<int> v;", ["vector"]),
        mcq("ec-oe4", "unique_ptr vs raw:", "unique_ptr vs raw:", ["owns and auto-frees", "never frees", "SQL only", "CSS only"], 0),
        fill("ec-oe5", "template", "template", "cpp", "___<typename T> T id(T x);", ["template"]),
        mcq("ec-oe6", "Polymorphic drivers:", "Polymorphic drivers:", ["test with mocks + swap HW", "ban interfaces", "skip tests", "only macros"], 0),
      ]),
    ]),
  );

  units.push(
    U("toolchain", "CMake · debug · tests", "CMake · debug · tests", [
      L("ec-cmake-build", "Збірка: етапи, make, CMake", "Build: stages, make, CMake", 2, false, [
        match("ec-t1", "Етапи", "Stages", [{ left: "preprocess", right: "macros & includes" }, { left: "compile", right: "to object files" }, { left: "link", right: "final binary" }]),
        fill("ec-t2", "CMake мінімум", "CMake minimum", "cmake", "___(VERSION 3.16)", ["cmake_minimum_required"]),
        fill("ec-t3", "add_executable", "add_executable", "cmake", "___(app main.cpp)", ["add_executable"]),
        mcq("ec-t4", "CMake потрібен щоб:", "CMake is used to:", ["описувати кросплатформенну збірку проєкту", "малювати QML", "замінювати TCP", "хешувати паролі"], 0),
      ]),
      L("ec-debug-test", "GDB, sanitizers, GTest, clean code", "GDB, sanitizers, GTest, clean code", 3, false, [
        mcq("ec-t5", "AddressSanitizer допомагає знайти:", "AddressSanitizer helps find:", ["помилки пам'яті (use-after-free, OOB)", "лише CSS bugs", "DNS timeouts", "git conflicts"], 0),
        fill("ec-t6", "Google Test assert", "Google Test assert", "cpp", "___(distance(3,4), 5);", ["EXPECT_EQ"]),
        mcq("ec-t7", "TDD у спрощеному вигляді:", "TDD in short:", ["тест → реалізація → рефакторинг", "тільки деплой без тестів", "лише UI mockups", "вимкнути CI"], 0),
        match("ec-t8", "Якість коду", "Code quality", [{ left: "clang-format", right: "formatting" }, { left: "clang-tidy", right: "static analysis" }, { left: "SOLID", right: "design principles" }]),
      ]),
      L("ec-ci-firmware", "CI · golden tests · static analysis", "CI · golden tests · static analysis", 3, false, [
        mcq("ec-t9", "CI for firmware should:", "CI for firmware should:", ["build + unit tests on every change", "only manual laptop builds", "skip sanitizers always", "commit secrets"], 0),
        fill("ec-t10", "EXPECT_TRUE", "EXPECT_TRUE", "cpp", "___(ok);", ["EXPECT_TRUE"]),
        mcq("ec-t11", "Golden test compares:", "Golden test compares:", ["output against known-good fixture", "random UI colors only", "git blame", "DNS TTL"], 0),
        match("ec-t12", "Tools", "Tools", [{ left: "ASan", right: "memory bugs" }, { left: "UBSan", right: "undefined behavior" }, { left: "GTest", right: "unit assertions" }]),
        mcq("ec-t13", "clang-tidy helps catch:", "clang-tidy helps catch:", ["suspicious patterns before runtime", "only fonts", "UDP PHY faults", "battery chemistry"], 0),
      ]),
      E("ec-tool-exam", "Контрольна: toolchain", "Exam: toolchain", 2, [
        fill("ec-te1", "add_executable", "add_executable", "cmake", "___(app main.cpp)", ["add_executable"]),
        mcq("ec-te2", "ASan finds:", "ASan finds:", ["memory bugs", "only fonts", "only MQTT topics", "SQL joins"], 0),
        fill("ec-te3", "EXPECT_EQ", "EXPECT_EQ", "cpp", "___(a, b);", ["EXPECT_EQ"]),
        mcq("ec-te4", "clang-format:", "clang-format:", ["auto format style", "runtime GC", "UDP stack", "GPU driver"], 0),
        fill("ec-te5", "cmake_minimum_required", "cmake_minimum_required", "cmake", "___(VERSION 3.16)", ["cmake_minimum_required"]),
        mcq("ec-te6", "CI goal:", "CI goal:", ["automate build+test", "ban tests", "skip analysis", "store passwords in repo"], 0),
      ]),
    ]),
  );

  units.push(
    U("networking", "Протоколи · UDP/TCP", "Protocols · UDP/TCP", [
      L("ec-osi-serial", "OSI, серіалізація, CRC", "OSI, serialization, CRC", 2, false, [
        mcq("ec-n1", "Модель OSI описує:", "The OSI model describes:", ["шари мережевої взаємодії", "лише CMake targets", "CSS cascade", "Git branches"], 0),
        mcq("ec-n2", "Серіалізація — це:", "Serialization is:", ["перетворення структури даних у послідовність байтів", "видалення об'єктів", "збірка Docker", "рендер QML"], 0),
        fill("ec-n3", "CRC у пакеті", "CRC in packet", "cpp", "uint16_t crc = ___(payload, len);", ["crc16"]),
        mcq("ec-n4", "CRC/ECC потрібні для:", "CRC/ECC are needed for:", ["виявлення (і корекції) помилок передачі", "стиснення відео 8K", "заміни SSH", "форматування коду"], 0),
      ]),
      L("ec-udp-tcp", "UDP vs TCP, сокети", "UDP vs TCP, sockets", 3, false, [
        match("ec-n5", "UDP vs TCP", "UDP vs TCP", [{ left: "UDP", right: "datagram, low latency" }, { left: "TCP", right: "stream, reliable ordered" }, { left: "telemetry burst", right: "often UDP" }]),
        fill("ec-n6", "Створити UDP socket (POSIX sketch)", "Create UDP socket (POSIX sketch)", "cpp", "int fd = ___(AF_INET, SOCK_DGRAM, 0);", ["socket"]),
        fill("ec-n7", "sendto", "sendto", "cpp", "___(fd, buf, n, 0, (sockaddr*)&addr, sizeof(addr));", ["sendto"]),
        mcq("ec-n8", "TCP краще, коли критично:", "TCP is better when critical:", ["надійна впорядкована доставка", "мінімальна затримка будь-якою ціною без ACK", "тільки broadcast Wi-Fi", "рендер CSS"], 0),
        run("ec-n8b", "Lab: XOR checksum 1,2,3", "Lab: XOR checksum 1,2,3", cppMain("  unsigned char data[3] = {1, 2, 3};\n  unsigned char c = 0;\n  // TODO: XOR all, cout << (int)c"), "0", { req: ["^", "cout"], hintUk: "c ^= data[i]; 1^2^3=0", hintEn: "c ^= data[i]; 1^2^3=0" }),
      ]),
      L("ec-framing-seq", "Framing · sequence · retransmit", "Framing · sequence · retransmit", 3, false, [
        mcq("ec-n9", "Frame usually includes:", "Frame usually includes:", ["header + length + payload + checksum", "only CSS classes", "git hash only", "QML anchors"], 0),
        fill("ec-n10", "seq wrap example", "seq wrap example", "cpp", "seq = (seq + 1) % ___;", ["256", "N", "MOD"], false),
        match("ec-n11", "Reliability tactics", "Reliability tactics", [{ left: "ACK", right: "confirm delivery" }, { left: "retransmit", right: "resend on loss" }, { left: "seq number", right: "detect gaps/dupes" }]),
        mcq("ec-n12", "On lossy radio telemetry often:", "On lossy radio telemetry often:", ["UDP + app-level seq/CRC", "pure TCP only always", "no checksums", "random bytes"], 0),
        run("ec-n13", "Lab: seq 255 +1 mod 256 → 0", "Lab: seq 255+1 mod 256 → 0", cppMain("  int seq = 255;\n  // TODO: seq = (seq+1)%256; cout << seq"), "0", { req: ["%", "cout"], hintUk: "seq=(seq+1)%256; cout<<seq;", hintEn: "seq=(seq+1)%256; cout<<seq;" }),
      ]),
      E("ec-net-exam", "Контрольна: networking", "Exam: networking", 2, [
        mcq("ec-ne1", "Serialization:", "Serialization:", ["bytes representation of data", "only UI theme", "git rebase", "npm pack"], 0),
        mcq("ec-ne2", "UDP:", "UDP:", ["connectionless datagrams", "always ordered reliable", "SQL dialect", "QML engine"], 0),
        fill("ec-ne3", "socket", "socket", "cpp", "int fd = ___(AF_INET, SOCK_DGRAM, 0);", ["socket"]),
        mcq("ec-ne4", "CRC detects:", "CRC detects:", ["transmission bit errors", "CSS bugs", "unused imports only", "DNS cache"], 0),
        fill("ec-ne5", "sendto", "sendto", "cpp", "___(fd, buf, n, 0, addr, alen);", ["sendto"]),
        match("ec-ne6", "Frame parts", "Frame parts", [{ left: "seq", right: "ordering/gaps" }, { left: "crc", right: "integrity check" }]),
        mcq("ec-ne7", "Retransmit used when:", "Retransmit used when:", ["packet likely lost", "CRC always perfect", "UI redraw", "git merge"], 0),
      ]),
    ]),
  );

  units.push(
    U("miltech-checkpoint", "Checkpoint · mid exam", "Checkpoint · mid exam", [
      E("ec-mid-exam", "Проміжна контрольна MilTech", "MilTech mid-course exam", 2, [
        mcq("ec-mid1", "C++ field priority:", "C++ field priority:", ["reliability & resources", "pretty UI only", "skip tests", "ignore memory"], 0),
        fill("ec-mid2", "bit or set", "bit or set", "cpp", "flags ___= MASK;", ["|"]),
        fill("ec-mid3", "unique_ptr", "unique_ptr", "cpp", "std::___<T> p;", ["unique_ptr"]),
        fill("ec-mid4", "add_executable", "add_executable", "cmake", "___(app main.cpp)", ["add_executable"]),
        mcq("ec-mid5", "UDP good for:", "UDP good for:", ["low-latency telemetry bursts", "always file transfer only", "replace flash", "CSS minify"], 0),
        mcq("ec-mid6", "RAII:", "RAII:", ["resource lifetime = object lifetime", "manual free only in ISR", "no destructors", "SQL trigger"], 0),
        fill("ec-mid7", "EXPECT_EQ", "EXPECT_EQ", "cpp", "___(a,b);", ["EXPECT_EQ"]),
        match("ec-mid8", "Build stages", "Build stages", [{ left: "compile", right: "object code" }, { left: "link", right: "executable" }]),
        mcq("ec-mid9", "Buffer overrun is:", "Buffer overrun is:", ["write past bounds", "git push", "npm audit only", "font overflow"], 0),
        read("ec-mid10", "Event loop idea:", "Event loop idea:", "cpp", "while(running){ poll(); act(); }", ["cooperative control cycle", "single OS exit only", "Qt moc only", "CRC poly"], 0),
      ]),
    ]),
  );

  // Remaining units 9-16 in part 2
}

addRest();
await import("./gen-embedded-cpp-part2.mjs").then((m) => m.appendUnits(units, { L, E, U, mcq, fill, read, order, match, out, run, proj, cppMain }));

function q(s) {
  return JSON.stringify(s);
}

function emitEx(ex) {
  if (ex.t === "mcq") {
    return `      mcq(
        ${q(ex.id)},
        ${q(ex.uk)},
        ${q(ex.en)},
        [${ex.opts.map(q).join(", ")}],
        ${ex.ci},
      )`;
  }
  if (ex.t === "fill") {
    return `      codeFill(
        ${q(ex.id)},
        ${q(ex.uk)},
        ${q(ex.en)},
        ${q(ex.lang)},
        ${q(ex.code)},
        [${ex.acc.map(q).join(", ")}],
        ${ex.cs !== false},
      )`;
  }
  if (ex.t === "read") {
    return `      codeRead(
        ${q(ex.id)},
        ${q(ex.uk)},
        ${q(ex.en)},
        ${q(ex.lang)},
        ${q(ex.code)},
        [${ex.opts.map(q).join(", ")}],
        ${ex.ci},
      )`;
  }
  if (ex.t === "order") {
    return `      codeOrder(
        ${q(ex.id)},
        ${q(ex.uk)},
        ${q(ex.en)},
        ${q(ex.lang)},
        [${ex.lines.map(q).join(", ")}],
        [${ex.correct.map(q).join(", ")}],
      )`;
  }
  if (ex.t === "match") {
    return `      matchEx(${q(ex.id)}, ${q(ex.uk)}, ${q(ex.en)}, [
${ex.pairs.map((p) => `        { left: ${q(p.left)}, right: ${q(p.right)} },`).join("\n")}
      ])`;
  }
  if (ex.t === "out") {
    return `      codeOutputMcq(
        ${q(ex.id)},
        ${q(ex.uk)},
        ${q(ex.en)},
        ${q(ex.lang)},
        \`${ex.code.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
        [${ex.opts.map(q).join(", ")}],
        ${ex.ci},
      )`;
  }
  if (ex.t === "run") {
    const extras = [];
    if (ex.req) extras.push(`requiredSource: [${ex.req.map(q).join(", ")}]`);
    if (ex.forb) extras.push(`forbiddenSource: [${ex.forb.map(q).join(", ")}]`);
    if (ex.hintUk) extras.push(`hintUk: ${q(ex.hintUk)}`);
    if (ex.hintEn) extras.push(`hintEn: ${q(ex.hintEn)}`);
    return `      codeRun(
        ${q(ex.id)},
        ${q(ex.uk)},
        ${q(ex.en)},
        "cpp",
        \`${ex.starter.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
        [{ stdout: ${q(ex.tests[0].stdout)} }],
        {
          ${extras.join(",\n          ")}
        },
      )`;
  }
  if (ex.t === "proj") {
    const files = ex.files
      .map(
        (f) => `          {
            id: ${q(f.id)},
            name: ${q(f.name)},
            language: ${q(f.language)},
            starter: \`${f.starter.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
          }`,
      )
      .join(",\n");
    const checks = ex.checks
      .map((c) => {
        const forb = c.forbidden ? `\n            forbidden: [${c.forbidden.map(q).join(", ")}],` : "";
        return `          {
            fileId: ${q(c.fileId)},
            contains: [${c.contains.map(q).join(", ")}],${forb}
          }`;
      })
      .join(",\n");
    return `      {
        id: ${q(ex.id)},
        type: "code_project",
        promptUk: ${q(ex.uk)},
        promptEn: ${q(ex.en)},
        files: [
${files}
        ],
        checks: [
${checks}
        ],
        hintUk: ${q(ex.hintUk)},
        hintEn: ${q(ex.hintEn)},
      } as Exercise`;
  }
  throw new Error("unknown " + ex.t);
}

function emitLesson(l) {
  if (l.kind === "exam") {
    return `  exam(${q(l.slug)}, ${q(l.uk)}, ${q(l.en)}, ${l.diff}, [
${l.ex.map((e) => emitEx(e) + ",").join("\n")}
  ])`;
  }
  return `  lesson(
    ${q(l.slug)},
    ${q(l.uk)},
    ${q(l.en)},
    ${l.diff},
    ${l.free},
    [
${l.ex.map((e) => emitEx(e) + ",").join("\n")}
    ],
  )`;
}

const unitConsts = units.map((u) => {
  const varName = u.slug
    .split("-")
    .map((p, i) => (i === 0 ? p : p[0].toUpperCase() + p.slice(1)))
    .join("");
  return {
    varName,
    code: `const ${varName} = unit(${q(u.slug)}, ${q(u.uk)}, ${q(u.en)}, [
${u.lessons.map((l) => emitLesson(l) + ",").join("\n")}
]);`,
  };
});

const header = `import type { CourseContent, Exercise } from "./types.js";
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

`;

const outPath = join(__dirname, "../src/embedded-cpp.ts");
const exportPart = `
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
    ${unitConsts.map((x) => x.varName).join(",\n    ")},
  ],
};
`;

writeFileSync(outPath, header + unitConsts.map((x) => x.code).join("\n\n") + exportPart);

const lessons = units.reduce((a, u) => a + u.lessons.length, 0);
const exams = units.reduce((a, u) => a + u.lessons.filter((l) => l.kind === "exam").length, 0);
const runs = JSON.stringify(units).split('"t":"run"').length - 1;
const projs = JSON.stringify(units).split('"t":"proj"').length - 1;
console.log({ units: units.length, lessons, exams, runs, projs, outPath });
