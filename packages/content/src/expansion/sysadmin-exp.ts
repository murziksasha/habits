import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "backups_verify",
    "Резервні копії, які можна відновити",
    "Backups you can actually restore",
    [
      {
        slug: "sa-backup-321",
        titleUk: "Правило 3-2-1 і чому одна копія на тому ж диску — не бекап",
        titleEn: "The 3-2-1 rule, and why one copy on the same disk is not a backup",
        difficulty: 2,
        pointsUk: ["3 копії, 2 носії, 1 поза майданчиком", "Копія на тому ж диску не рятує від його відмови", "Версії в часі проти псування і шифрувальника"],
        pointsEn: ["3 copies, 2 media, 1 off-site", "A copy on the same disk does not survive its failure", "Points in time against corruption and ransomware"],
        conceptUk: "Правило 3-2-1: три копії даних, на двох різних носіях, одна з них поза майданчиком (off-site). Файл server.bak на тому ж SSD, що й база — це не бекап: відмова диска забирає обидва. Другий носій — інший диск, стрічка або об'єктне сховище; off-site захищає від пожежі й крадіжки. Версіонування (кілька точок у часі) рятує від тихого псування і ransomware, які шифрують і «бекап» на підключеному диску. Шифруйте копії в дорозі й на спокої, а ключ не кладіть лише в той самий сейф, що й дані.",
        conceptEn: "The 3-2-1 rule: three copies of the data, on two different media, one of them off-site. A server.bak file on the same SSD as the database is not a backup: a disk failure takes both. The second medium is another disk, tape, or object storage; off-site protects against fire and theft. Versioning (several points in time) saves you from silent corruption and from ransomware that encrypts the 'backup' on a mounted disk too. Encrypt copies in transit and at rest, and do not keep the only key in the same safe as the data.",
        code: "# 3-2-1: laptop + USB disk + s3://bucket/restic (immutable, versioned)",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому копія /var/lib/db.bak на тому ж розділі, що й база, не є бекапом?", promptEn: "Why is a /var/lib/db.bak copy on the same partition as the database not a backup?", options: ["відмова диска або шифрувальник забирає оригінал і копію разом", "bak файли не читаються", "3-2-1 забороняє будь-які локальні копії", "rsync тоді не працює"], correctIndex: 0, explanationUk: "Потрібен інший носій і бажано off-site.", explanationEn: "You need different media and preferably off-site." },
          { kind: "fill", promptUk: "Допишіть правило кількості копій і носіїв", promptEn: "Fill in the rule for copies and media", language: "bash", code: "# ___-2-1 : three copies, two media, one off-site", accepted: ["3"], caseSensitive: true, explanationUk: "Правило 3-2-1.", explanationEn: "The 3-2-1 rule." },
          { kind: "read", promptUk: "Що рятує, якщо ransomware зашифрував і мережевий диск, підключений як backup?", promptEn: "What still saves you if ransomware also encrypted a network drive mounted as backup?", language: "bash", code: "# mount //nas/backup /mnt/backup && rclone sync /data /mnt/backup", options: ["незмінна (immutable) або відключена off-site копія з версіями в часі", "ще один файл .bak поруч із даними", "той самий mount після перезавантаження", "пароль від NAS у тому ж репозиторії"], correctIndex: 0, explanationUk: "Підключений 'бекап' — частина поверхні атаки.", explanationEn: "A mounted 'backup' is part of the attack surface." }
        ],
        whyUk: "Як застосувати 3-2-1 до домашнього сервера з фото й базою?",
        whyEn: "How do you apply 3-2-1 to a home server with photos and a database?",
        ideas: [{ labelUk: "три копії", labelEn: "three copies", anyOf: ["3-2-1", "три", "three", "копі", "cop"] }, { labelUk: "різні носії й off-site", labelEn: "different media and off-site", anyOf: ["носі", "media", "off-site", "off site", "пожеж", "fire"] }, { labelUk: "версії проти ransomware", labelEn: "versions against ransomware", anyOf: ["версі", "version", "ransomware", "шифр", "immutable"] }],
        sampleUk: "Для домашнього сервера тримають три копії на двох носіях і одну off-site з версіями в часі: файл bak на тому ж диску не рятує ні від відмови, ні від ransomware на підключеному томі.",
        sampleEn: "For a home server you keep three copies on two media and one off-site with points in time: a bak file on the same disk saves you neither from failure nor from ransomware on a mounted volume.",
      },
      {
        slug: "sa-restore-test",
        titleUk: "Бекап без перевірки відновлення — це надія, не план",
        titleEn: "A backup without a restore test is hope, not a plan",
        difficulty: 3,
        pointsUk: ["Відновлення на чистому середовищі — єдина справжня перевірка", "Контрольна сума архіву не доводить, що сервіс стартує", "Регулярний drill і запис RTO"],
        pointsEn: ["A restore in a clean environment is the only real check", "An archive checksum does not prove the service starts", "A regular drill and a recorded RTO"],
        conceptUk: "Єдина перевірка бекапу — відновити його на чистому середовищі й переконатись, що сервіс стартує, дані цілі й час відновлення (RTO) вклався в обіцянку. Контрольна сума файлу архіву недостатня: архів відкривається, а postgres не піднімається через стару major-версію. Плануйте регулярний restore drill (раз на місяць або після зміни схеми). Записуйте кроки й час. Перевіряйте не лише «файл є», а й що остання транзакція чи відомий рядок на місці. Якщо відновлення ніхто не робив рік — вважайте, що бекапу немає.",
        conceptEn: "The only check of a backup is to restore it in a clean environment and confirm that the service starts, the data is intact, and the restore time (RTO) fits the promise. A checksum of the archive file is not enough: the archive opens, and postgres will not start because of an old major version. Plan a regular restore drill (monthly, or after a schema change). Record the steps and the time. Check not only that 'the file exists', but that the last transaction or a known row is there. If nobody has restored in a year — treat it as no backup.",
        code: "# monthly: restore dump into empty VM, start service, SELECT known order, record minutes",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому md5 архіву недостатньо як перевірка бекапу Postgres?", promptEn: "Why is an md5 of the archive not enough as a check of a Postgres backup?", options: ["файл може бути цілим, але не підніматись на поточному рушієві чи без WAL", "md5 завжди бреше", "архіви Postgres не мають checksum", "RTO тоді стає нульовим"], correctIndex: 0, explanationUk: "Треба справді відновити й відкрити дані.", explanationEn: "You must actually restore and open the data." },
          { kind: "fill", promptUk: "Допишіть цільовий час відновлення", promptEn: "Fill in the restore-time objective", language: "bash", code: "# measured ___ = 42 minutes (last drill)", accepted: ["RTO", "rto"], caseSensitive: true, explanationUk: "RTO — Recovery Time Objective.", explanationEn: "RTO is Recovery Time Objective." },
          { kind: "read", promptUk: "Що перевірити після тестового restore інтернет-магазину?", promptEn: "What should you check after a test restore of an online shop?", language: "bash", code: "pg_restore -d shop_test shop.dump && systemctl start shop", options: ["сервіс стартує і відомий недавній заказ/рядок на місці, плюс час процедури", "лише що файл dump не нульового розміру", "лише код виходу 0 у tar", "що диск майже повний"], correctIndex: 0, explanationUk: "Цілісність бізнесу, не лише файлу.", explanationEn: "Business integrity, not only the file." }
        ],
        whyUk: "Як організувати місячний restore drill для домашнього сервера?",
        whyEn: "How do you run a monthly restore drill for a home server?",
        ideas: [{ labelUk: "чисте середовище", labelEn: "a clean environment", anyOf: ["чист", "clean", "віднов", "restore", "drill"] }, { labelUk: "сервіс і дані", labelEn: "service and data", anyOf: ["стартує", "starts", "рядок", "row", "wal"] }, { labelUk: "записати RTO", labelEn: "record the RTO", anyOf: ["rto", "час", "time", "місяц", "month"] }],
        sampleUk: "Раз на місяць відновлюють бекап на чистому середовищі, перевіряють, що сервіс стартує й відомі дані на місці, і записують RTO; одна контрольна сума архіву цього не замінює.",
        sampleEn: "Once a month you restore the backup in a clean environment, check that the service starts and known data is there, and record the RTO; a single archive checksum does not replace that.",
      },
      {
        slug: "sa-restic-snapshots",
        titleUk: "restic: знімки, репозиторій і забутий пароль",
        titleEn: "restic: snapshots, a repository, and a forgotten password",
        difficulty: 3,
        pointsUk: ["Знімки в зашифрований репозиторій, пароль окремо", "forget+prune за політикою, не rm", "check перед prune; copy — другий репозиторій"],
        pointsEn: ["Snapshots in an encrypted repository, password stored separately", "forget+prune by policy, not rm", "check before prune; copy is a second repository"],
        conceptUk: "restic робить дедупліковані знімки в репозиторій (локальний диск, S3, SFTP). restic backup /data, restic snapshots, restic restore latest --target /tmp/restore. Репозиторій шифрується паролем або ключем: втрачений пароль = втрачені знімки, його треба зберігати в менеджері паролів окремо від репозиторію. forget --keep-daily 7 --keep-monthly 6 і prune звільняють місце за політикою утримання, не навмання rm. Перевірка restic check ловить псування. Не запускайте prune до успішного check. Для 3-2-1 можна restic copy в другий репозиторій.",
        conceptEn: "restic takes deduplicated snapshots into a repository (a local disk, S3, SFTP). restic backup /data, restic snapshots, restic restore latest --target /tmp/restore. The repository is encrypted with a password or a key: a lost password means lost snapshots, so store it in a password manager separate from the repository. forget --keep-daily 7 --keep-monthly 6 and prune free space by a retention policy, not by a casual rm. restic check catches corruption. Do not run prune before a successful check. For 3-2-1 you can restic copy into a second repository.",
        code: "restic backup /data\nrestic forget --keep-daily 7 --keep-monthly 6 --prune\nrestic copy --repo2 s3:offsite",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Що станеться, якщо забути пароль репозиторію restic?", promptEn: "What happens if you forget the restic repository password?", options: ["знімки не розшифруєте: дані фактично втрачені", "restic відновить пароль з метаданих", "достатньо rm і init заново, старі знімки лишаться читабельними", "S3 сам розшифрує"], correctIndex: 0, explanationUk: "Немає бекдора виробника.", explanationEn: "There is no vendor backdoor." },
          { kind: "fill", promptUk: "Допишіть команду перевірки цілісності репозиторію", promptEn: "Fill in the command that checks repository integrity", language: "bash", code: "restic ___", accepted: ["check"], caseSensitive: true, explanationUk: "restic check.", explanationEn: "restic check." },
          { kind: "mcq", promptUk: "Чому не варто rm -rf data/ у репозиторії замість forget і prune?", promptEn: "Why should you not rm -rf data/ inside the repository instead of forget and prune?", options: ["зіпсуєте структуру індексу й дедуплікацію; політику утримання виконує forget", "rm завжди безпечний для restic", "prune тоді стає швидшим", "forget не видаляє нічого"], correctIndex: 0, explanationUk: "Репозиторій — не папка зі звичайними файлами.", explanationEn: "A repository is not a folder of ordinary files." }
        ],
        whyUk: "Як тримати restic-бекап за правилом 3-2-1 без втрати пароля?",
        whyEn: "How do you keep a restic backup on the 3-2-1 rule without losing the password?",
        ideas: [{ labelUk: "два репозиторії", labelEn: "two repositories", anyOf: ["copy", "репозитор", "repositor", "s3", "off-site"] }, { labelUk: "пароль окремо", labelEn: "password separately", anyOf: ["пароль", "password", "менеджер", "manager", "втрач", "lost"] }, { labelUk: "check і prune", labelEn: "check and prune", anyOf: ["check", "forget", "prune", "утриман", "retention"] }],
        sampleUk: "Роблять знімки в один репозиторій і restic copy в другий off-site, пароль тримають у менеджері окремо, перед prune запускають check, а не rm всередині репозиторію.",
        sampleEn: "You take snapshots in one repository and restic copy into a second off-site one, keep the password in a manager separately, run check before prune, and do not rm inside the repository.",
      }
    ],
    "Контрольна: бекапи",
    "Exam: backups",
    [
      { promptUk: "Копія на тому ж диску, що й дані…", promptEn: "A copy on the same disk as the data is…", options: ["не бекап проти відмови цього диска", "достатній 3-2-1", "off-site за визначенням", "замінює restore drill"], correctIndex: 0, explanationUk: "Потрібен інший носій.", explanationEn: "You need different media." },
      { promptUk: "Єдина справжня перевірка бекапу…", promptEn: "The only real check of a backup is…", options: ["відновити в чистому середовищі й перевірити сервіс і дані", "подивитись розмір файлу", "порахувати md5 і зупинитись", "переконатись, що cron спрацював"], correctIndex: 0, explanationUk: "Restore drill.", explanationEn: "A restore drill." },
      { promptUk: "Втрачений пароль restic означає…", promptEn: "A lost restic password means…", options: ["знімки не розшифрувати", "S3 надішле пароль", "достатньо init заново", "prune відновить ключ"], correctIndex: 0, explanationUk: "Пароль — окремо від репозиторію.", explanationEn: "The password is separate from the repository." },
      { promptUk: "forget і prune потрібні, щоб…", promptEn: "forget and prune are there to…", options: ["звільнити місце за політикою утримання, не ламаючи репозиторій", "замінити off-site", "виконати 3-2-1 самі", "розшифрувати без пароля"], correctIndex: 0, explanationUk: "Не rm вручну всередині репо.", explanationEn: "Do not rm by hand inside the repo." },
      { promptUk: "RTO — це…", promptEn: "RTO is…", options: ["цільовий час відновлення, який міряють на drill", "кількість копій", "алгоритм шифрування", "ім'я репозиторію"], correctIndex: 0, explanationUk: "Recovery Time Objective.", explanationEn: "Recovery Time Objective." },
      { promptUk: "Підключений мережевий «бекап» під час ransomware…", promptEn: "A mounted network 'backup' during ransomware is…", options: ["частина поверхні атаки, потрібна незмінна або відключена копія", "завжди безпечний off-site", "замінює 3-2-1", "не шифрується ніколи"], correctIndex: 0, explanationUk: "Immutable або відключений носій.", explanationEn: "Immutable or disconnected media." }
    ],
  ),
  sectionUnit(
    "containers_home",
    "Контейнери вдома: Podman, rootless, systemd",
    "Containers at home: Podman, rootless, systemd",
    [
      {
        slug: "sa-podman-rootless",
        titleUk: "Rootless Podman: без dockerd і без кореня",
        titleEn: "Rootless Podman: no dockerd and no root",
        difficulty: 3,
        pointsUk: ["Немає dockerd: процес від вашого користувача", "Rootless — не uid 0 на хості", "Не віддавайте docker.sock у контейнер"],
        pointsEn: ["There is no dockerd: the process is from your user", "Rootless is not uid 0 on the host", "Do not hand docker.sock to a container"],
        conceptUk: "Podman запускає контейнери без постійного демона: команда fork/exec від вашого користувача. Rootless означає, що процес не має uid 0 на хості — компрометація контейнера не дає одразу корінь машини (з нюансами підпросторів користувачів). Образи й томи лежать у домашній теці (~/.local/share/containers). Порти нижче 1024 без додаткових можливостей недоступні. Інтеграція systemd --user: podman generate systemd або Quadlet. Docker-сокет /var/run/docker.sock, відданий контейнеру, фактично дорівнює кореню — у rootless моделі цього сокета немає, і це плюс.",
        conceptEn: "Podman runs containers without a long-lived daemon: the command fork/execs from your user. Rootless means the process is not uid 0 on the host — compromising the container does not immediately give root on the machine (with user-namespace caveats). Images and volumes live in the home directory (~/.local/share/containers). Ports below 1024 are unavailable without extra capabilities. systemd --user integration: podman generate systemd or Quadlet. A Docker socket /var/run/docker.sock given to a container is effectively root — the rootless model has no such socket, and that is a plus.",
        code: "podman run -d --name web -p 8080:8080 -v ./data:/data:Z ghcr.io/app:1.2",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чим небезпечний монтований /var/run/docker.sock у контейнері?", promptEn: "Why is a mounted /var/run/docker.sock inside a container dangerous?", options: ["через сокет можна керувати демоном і фактично стати коренем хоста", "сокет лише для логів", "rootless тоді стає швидшим", "Podman вимагає цей сокет"], correctIndex: 0, explanationUk: "Сокет демона — це привілей адміністратора.", explanationEn: "The daemon socket is an administrator privilege." },
          { kind: "fill", promptUk: "Допишіть режим без кореня", promptEn: "Fill in the without-root mode", language: "bash", code: "podman run --___ -d -p 8080:8080 ghcr.io/app", accepted: ["uidmap", "user"], caseSensitive: true, explanationUk: "Типовий rootless не потребує --privileged.", explanationEn: "Typical rootless does not need --privileged." },
          { kind: "read", promptUk: "Де rootless Podman зберігає образи за замовчуванням?", promptEn: "Where does rootless Podman store images by default?", language: "bash", code: "podman info --format '{{.Store.GraphRoot}}'", options: ["у домашній теці користувача, не в /var/lib/docker", "лише в /var/lib/docker", "лише в RAM", "у EFI-розділі"], correctIndex: 0, explanationUk: "Це простір користувача.", explanationEn: "It is user space." }
        ],
        whyUk: "Навіщо домашньому серверу rootless Podman замість Docker з сокетом у контейнері?",
        whyEn: "Why would a home server prefer rootless Podman over Docker with a socket in a container?",
        ideas: [{ labelUk: "без демона й сокета", labelEn: "no daemon and no socket", anyOf: ["dockerd", "socket", "демон", "daemon", "podman"] }, { labelUk: "не uid 0", labelEn: "not uid 0", anyOf: ["rootless", "uid", "корінь", "root", "хост", "host"] }, { labelUk: "systemd user", labelEn: "systemd user", anyOf: ["systemd", "user", "quadlet", "домашн"] }],
        sampleUk: "Rootless Podman запускає контейнер від вашого користувача без dockerd і без віддачі docker.sock, тож компрометація не дає одразу корінь хоста; томи живуть у домашній теці, сервіси — у systemd --user.",
        sampleEn: "Rootless Podman runs the container from your user without dockerd and without handing over docker.sock, so a compromise does not immediately give host root; volumes live in the home directory, services under systemd --user.",
      },
      {
        slug: "sa-quadlet-user",
        titleUk: "Quadlet: контейнер як systemd --user юніт",
        titleEn: "Quadlet: a container as a systemd --user unit",
        difficulty: 3,
        pointsUk: ["*.container генерує user-юніт systemd", "enable-linger потрібен для старту без логіну", "Секрети не комітять у файл юніта"],
        pointsEn: ["A *.container file generates a systemd user unit", "enable-linger is needed to start without a login", "Secrets are not committed in the unit file"],
        conceptUk: "Quadlet (підсистема Podman) читає файли *.container у ~/.config/containers/systemd/ і генерує user-юніти: Restart=always, залежності від мережі, автозапуск після loginctl enable-linger, щоб сесія користувача не мусила бути відкритою. Це надійніше за podman run у crontab @reboot. Volume і мережі описують поруч (*.volume, *.network). Після зміни файлу: systemctl --user daemon-reload. Не запускайте графічний контейнер як linger-сервіс без потреби. Логи — journalctl --user -u app.service. Секрети — у файлі з правами 600, не в юніті у git.",
        conceptEn: "Quadlet (a Podman subsystem) reads *.container files in ~/.config/containers/systemd/ and generates user units: Restart=always, network dependencies, autostart after loginctl enable-linger so the user session does not have to stay open. That is more reliable than podman run in a crontab @reboot. Volumes and networks are described alongside (*.volume, *.network). After a file change: systemctl --user daemon-reload. Do not run a graphical container as a linger service without a need. Logs are journalctl --user -u app.service. Secrets go in a 600-permission file, not in a unit in git.",
        code: "# ~/.config/containers/systemd/web.container\n[Container]\nImage=ghcr.io/app:1.2\nPublishPort=8080:8080\nEnvironmentFile=/home/me/.config/app.env",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Навіщо loginctl enable-linger користувачу з домашніми контейнерами?", promptEn: "Why enable-linger for a user with home containers?", options: ["щоб user-юніти стартували без інтерактивного логіну", "щоб отримати uid 0", "це вимикає journald", "інакше Podman заборонений"], correctIndex: 0, explanationUk: "Без linger user-сесія завершується після logout.", explanationEn: "Without linger the user session ends after logout." },
          { kind: "fill", promptUk: "Допишіть перезавантаження user-юнітів після правки Quadlet", promptEn: "Fill in reloading user units after a Quadlet edit", language: "bash", code: "systemctl --user ___-reload", accepted: ["daemon"], caseSensitive: true, explanationUk: "daemon-reload підхоплює нові файли.", explanationEn: "daemon-reload picks up new files." },
          { kind: "mcq", promptUk: "Чому пароль БД не варто писати в Image= і Environment= у файлі, що лежить у git?", promptEn: "Why should a DB password not be written in Image= and Environment= in a file that lives in git?", options: ["секрет потрапить в історію репозиторію; беріть EnvironmentFile з правами 600 поза git", "systemd ігнорує Environment", "Quadlet не вміє змінних", "git шифрує юніти сам"], correctIndex: 0, explanationUk: "Секрет і маніфест розділяють.", explanationEn: "The secret and the manifest are separated." }
        ],
        whyUk: "Як зробити, щоб домашній контейнер піднімався після ребута без логіну?",
        whyEn: "How do you make a home container start after reboot without a login?",
        ideas: [{ labelUk: "Quadlet і user-юніт", labelEn: "Quadlet and a user unit", anyOf: ["quadlet", "container", "systemd", "user"] }, { labelUk: "enable-linger", labelEn: "enable-linger", anyOf: ["linger", "логін", "login", "logout"] }, { labelUk: "секрети окремо", labelEn: "secrets separately", anyOf: ["секрет", "secret", "600", "git", "environmentfile"] }],
        sampleUk: "Описують *.container для systemd --user, вмикають linger, щоб юніт стартував без логіну, і секрети тримають у файлі 600 поза git, не в маніфесті.",
        sampleEn: "You describe a *.container for systemd --user, enable linger so the unit starts without a login, and you keep secrets in a 600 file outside git, not in the manifest.",
      },
      {
        slug: "sa-container-updates",
        titleUk: "Оновлення образів: теги, дигест і відкат",
        titleEn: "Image updates: tags, a digest, and rollback",
        difficulty: 3,
        pointsUk: ["Фіксуйте версію або sha256, не лише latest", "Зберігайте старий дигест для відкату", "Після оновлення — димова перевірка"],
        pointsEn: ["Pin a version or a sha256, not only latest", "Keep the old digest for rollback", "After an update — a smoke check"],
        conceptUk: "Тег :latest плаває: сьогоднішній pull не той, що місяць тому, і відтворити збій важко. Фіксуйте версію (:1.2.3) або, ще краще, дигест @sha256:... — це незмінний вміст. Перед оновленням збережіть ім'я старого дигесту, щоб відкотити. podman auto-update може підтягувати нові образи за міткою, але для домашнього сервера робіть це свідомо й дивіться журнал. Після оновлення — димовий запит до сервісу. Не оновлюйте всі контейнери одночасно вперше на проді в п'ятницю ввечері. Томи з даними не повинні бути частиною образу.",
        conceptEn: "The :latest tag floats: today's pull is not last month's, and reproducing a failure is hard. Pin a version (:1.2.3) or, better, a digest @sha256:... — that is immutable content. Before an update, save the old digest name so you can roll back. podman auto-update can pull new images by a label, but on a home server do it deliberately and watch the journal. After an update — a smoke request to the service. Do not update every container at once for the first time in production on a Friday evening. Data volumes must not be part of the image.",
        code: "# save: podman inspect -f '{{.Digest}}' web\npodman pull ghcr.io/app:1.2.4\n# smoke curl && or podman run ...@sha256:OLD",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому Image=app:latest ускладнює відкат?", promptEn: "Why does Image=app:latest make rollback harder?", options: ["latest уже вказує на новий вміст, старий треба було запам'ятати дигестом", "latest завжди незмінний", "Podman забороняє latest", "теги не можна змінити"], correctIndex: 0, explanationUk: "Дигест однозначно ідентифікує байти.", explanationEn: "A digest uniquely identifies the bytes." },
          { kind: "fill", promptUk: "Допишіть незмінне посилання на образ", promptEn: "Fill in an immutable image reference", language: "bash", code: "podman pull ghcr.io/app@sha256:___", accepted: ["ab", "deadbeef", "sha"], caseSensitive: true, explanationUk: "Після sha256: йде хеш.", explanationEn: "A hash follows sha256:." },
          { kind: "mcq", promptUk: "Де мають жити фото користувачів — в образі чи в томі?", promptEn: "Where should user photos live — in the image or in a volume?", options: ["у томі, інакше оновлення образу зітре або роздує дані", "в образі, так простіше бекапити", "лише в шарі alpine", "у тегу latest"], correctIndex: 0, explanationUk: "Образ незмінний, дані — окремо.", explanationEn: "The image is immutable, data is separate." }
        ],
        whyUk: "Як оновити домашній контейнер так, щоб можна було відкотитись?",
        whyEn: "How do you update a home container so you can still roll back?",
        ideas: [{ labelUk: "записати старий дигест", labelEn: "record the old digest", anyOf: ["дигест", "digest", "sha256", "відкат", "rollback"] }, { labelUk: "не лише latest", labelEn: "not only latest", anyOf: ["latest", "тег", "tag", "версі", "version"] }, { labelUk: "димовий запит", labelEn: "a smoke request", anyOf: ["smoke", "димов", "том", "volume", "дані", "data"] }],
        sampleUk: "Перед оновленням записують дигест поточного образу, тягнуть конкретну версію або sha256, перевіряють сервіс димом і за потреби повертають старий дигест; дані живуть у томі, не в образі.",
        sampleEn: "Before an update you record the current image digest, you pull a concrete version or sha256, you smoke-check the service, and if needed you return to the old digest; data lives in a volume, not in the image.",
      }
    ],
    "Контрольна: контейнери вдома",
    "Exam: home containers",
    [
      { promptUk: "docker.sock у контейнері…", promptEn: "docker.sock in a container is…", options: ["фактично доступ кореня до хоста", "безпечний за замовчуванням", "потрібний Podman rootless обов'язково", "лише для логів"], correctIndex: 0, explanationUk: "Не віддавайте сокет демона.", explanationEn: "Do not hand over the daemon socket." },
      { promptUk: "enable-linger потрібен, щоб…", promptEn: "enable-linger is needed so…", options: ["user-юніти стартували без відкритої сесії", "отримати uid 0", "вимкнути Quadlet", "замінити томи"], correctIndex: 0, explanationUk: "Сервіс після ребута без логіну.", explanationEn: "A service after reboot without a login." },
      { promptUk: "Тег latest…", promptEn: "The latest tag is…", options: ["плаває і ускладнює відтворення й відкат", "незмінний як sha256", "заборонений у Podman", "зберігає томи"], correctIndex: 0, explanationUk: "Фіксуйте версію або дигест.", explanationEn: "Pin a version or a digest." },
      { promptUk: "Rootless Podman зберігає образи…", promptEn: "Rootless Podman stores images…", options: ["у домашній теці користувача", "лише в /var/lib/docker", "у EFI", "у ядрі"], correctIndex: 0, explanationUk: "Простір користувача.", explanationEn: "User space." },
      { promptUk: "Секрети в Quadlet-файлі, що в git…", promptEn: "Secrets in a Quadlet file that is in git are…", options: ["витік; беріть EnvironmentFile 600 поза git", "зашифровані git сам", "рекомендовані", "ігноруються systemd"], correctIndex: 0, explanationUk: "Маніфест і секрет окремо.", explanationEn: "The manifest and the secret are separate." },
      { promptUk: "Дані користувача мають жити…", promptEn: "User data should live…", options: ["у томі, не в шарі образу", "у тегу latest", "у docker.sock", "у Image="], correctIndex: 0, explanationUk: "Оновлення образу не повинно стирати дані.", explanationEn: "An image update must not wipe data." }
    ],
  ),
  sectionUnit(
    "observability_home",
    "Спостереження вдома: журнали, ротація, метрики",
    "Home observability: journals, rotation, and metrics",
    [
      {
        slug: "sa-journald-persist",
        titleUk: "journald: постійне сховище, місце й пріоритети",
        titleEn: "journald: persistent storage, space, and priorities",
        difficulty: 2,
        pointsUk: ["persistent зберігає журнал після ребута", "Обмежте місце на диску", "Фільтруйте за юнітом, пріоритетом, завантаженням"],
        pointsEn: ["persistent keeps the journal after a reboot", "Cap disk space", "Filter by unit, priority, and boot"],
        conceptUk: "За замовчуванням на деяких системах журнал лише в RAM (volatile) і зникає після ребута — для розслідування падіння це погано. Storage=persistent у /etc/systemd/journald.conf пише в /var/log/journal. Обмежте SystemMaxUse, інакше логи з'їдять диск. journalctl -u nginx -p err --since today — фільтр за юнітом, пріоритетом і часом. -b -1 — попереднє завантаження (після kernel panic). VacuumTime прибирає старе. Не тримайте секрети в логах застосунків. Для віддаленого збору — systemd-journal-remote або Vector, не відкритий порт journal без автентифікації.",
        conceptEn: "By default on some systems the journal is only in RAM (volatile) and vanishes after a reboot — that is poor for investigating a crash. Storage=persistent in /etc/systemd/journald.conf writes to /var/log/journal. Cap SystemMaxUse, or logs will eat the disk. journalctl -u nginx -p err --since today filters by unit, priority, and time. -b -1 is the previous boot (after a kernel panic). VacuumTime drops the old. Do not keep secrets in application logs. For remote collection — systemd-journal-remote or Vector, not an open journal port without authentication.",
        code: "Storage=persistent\nSystemMaxUse=500M\n# journalctl -b -1 -p err",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому після аварійного ребута в journalctl порожньо, якщо Storage=volatile?", promptEn: "Why is journalctl empty after a crash reboot if Storage=volatile?", options: ["журнал жив лише в RAM і зник разом із сесією", "journald не вміє ребутів", "потрібен обов'язково syslog", "volatile шифрує логи"], correctIndex: 0, explanationUk: "Для розслідування — persistent.", explanationEn: "For an investigation, use persistent." },
          { kind: "fill", promptUk: "Допишіть журнал попереднього завантаження", promptEn: "Fill in the previous-boot journal", language: "bash", code: "journalctl -b ___ -p err", accepted: ["-1"], caseSensitive: true, explanationUk: "-b -1 — минуле завантаження.", explanationEn: "-b -1 is the previous boot." },
          { kind: "mcq", promptUk: "Навіщо SystemMaxUse=500M?", promptEn: "Why set SystemMaxUse=500M?", options: ["щоб логи не заповнили диск до відмови системи", "щоб вимкнути persistent", "це обов'язково для -p err", "journald тоді стає syslog"], correctIndex: 0, explanationUk: "Дисковий бюджет для журналу.", explanationEn: "A disk budget for the journal." }
        ],
        whyUk: "Як налаштувати journald, щоб після kernel panic можна було прочитати причину?",
        whyEn: "How do you set up journald so that after a kernel panic you can still read the cause?",
        ideas: [{ labelUk: "persistent", labelEn: "persistent", anyOf: ["persistent", "volatile", "ребут", "reboot", "journal"] }, { labelUk: "попереднє завантаження", labelEn: "the previous boot", anyOf: ["-b", "-1", "panic", "завантаж", "boot"] }, { labelUk: "ліміт місця", labelEn: "a space limit", anyOf: ["maxuse", "диск", "disk", "vacuum"] }],
        sampleUk: "Вмикають Storage=persistent і ліміт SystemMaxUse, а після падіння дивляться journalctl -b -1; volatile журнал у RAM після ребута порожній.",
        sampleEn: "You turn on Storage=persistent and a SystemMaxUse cap, and after a crash you look at journalctl -b -1; a volatile RAM journal is empty after reboot.",
      },
      {
        slug: "sa-logrotate",
        titleUk: "Ротація текстових логів: size, delaycompress, не копити вічно",
        titleEn: "Rotating text logs: size, delaycompress, and not keeping them forever",
        difficulty: 2,
        pointsUk: ["Ротація обрізає ріст текстових логів", "delaycompress і reopen/USR1 кращі за сліпий copytruncate, коли можна", "Не плутати з vacuum journald"],
        pointsEn: ["Rotation caps the growth of text logs", "delaycompress and reopen/USR1 are better than blind copytruncate when possible", "Do not confuse this with journald vacuum"],
        conceptUk: "Додатки, що пишуть у /var/log/app.log, самі рідко обрізають файл. logrotate за розкладом перейменовує, стискає (delaycompress — стиснути попередній, поки поточний ще може писатись) і видаляє старі за rotate N. copytruncate потрібен, коли процес тримає inode і не вміє reopen; краще сигнал USR1 (nginx). Пропущена ротація заповнює диск і валить сервіси. Перевіряйте logrotate -d (dry-run) і дату файлів. Не ротуйте journald цими ж правилами — у нього свій vacuum. Права на архівні логи не повинні бути світові.",
        conceptEn: "Applications that write to /var/log/app.log rarely trim the file themselves. logrotate on a schedule renames, compresses (delaycompress compresses the previous one while the current may still be written) and deletes old ones per rotate N. copytruncate is needed when the process holds the inode and cannot reopen; a USR1 signal (nginx) is better. A missed rotation fills the disk and takes services down. Check logrotate -d (dry-run) and file dates. Do not rotate journald with these same rules — it has its own vacuum. Archived logs must not be world-readable.",
        code: "/var/log/nginx/*.log {\n  daily\n  rotate 14\n  delaycompress\n  postrotate\n    systemctl kill -s USR1 nginx\n  endscript\n}",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Що зробить процес, який тримає відкритим старий inode, якщо ротація лише перейменувала файл без сигналу?", promptEn: "What will a process that still holds the old inode do if rotation only renamed the file with no signal?", options: ["продовжить писати в уже перейменований (або видалений) файл, новий порожній не наповниться", "автоматично відкриє новий шлях завжди", "logrotate тоді падає", "диск не може заповнитись"], correctIndex: 0, explanationUk: "Потрібен reopen (USR1) або copytruncate.", explanationEn: "You need a reopen (USR1) or copytruncate." },
          { kind: "fill", promptUk: "Допишіть перевірку конфігурації без змін", promptEn: "Fill in checking the configuration without changes", language: "bash", code: "logrotate ___ /etc/logrotate.d/app", accepted: ["-d", "--debug"], caseSensitive: true, explanationUk: "Dry-run — -d.", explanationEn: "Dry-run is -d." },
          { kind: "mcq", promptUk: "Чому архіви логів із 640 і групою adm кращі за 666?", promptEn: "Why are log archives with 640 and group adm better than 666?", options: ["у логах бувають токени й персональні дані, їх не читає кожен користувач", "666 швидше стискається", "logrotate вимагає 666", "journald ігнорує 640"], correctIndex: 0, explanationUk: "Логи — чутливі дані.", explanationEn: "Logs are sensitive data." }
        ],
        whyUk: "Як ротувати access.log nginx, щоб не втратити рядки й не відкрити архіви всім?",
        whyEn: "How do you rotate nginx access.log so you do not drop lines and do not open archives to everyone?",
        ideas: [{ labelUk: "сигнал reopen", labelEn: "a reopen signal", anyOf: ["usr1", "reopen", "copytruncate", "inode"] }, { labelUk: "delaycompress і rotate N", labelEn: "delaycompress and rotate N", anyOf: ["delaycompress", "rotate", "стисн", "compress"] }, { labelUk: "права 640", labelEn: "640 permissions", anyOf: ["640", "прав", "perm", "adm", "секрет", "secret"] }],
        sampleUk: "Для nginx після перейменування шлють USR1, щоб процес відкрив новий файл, ставлять delaycompress і rotate N, архіви з правами 640; journald ротують його власним vacuum.",
        sampleEn: "For nginx you send USR1 after the rename so the process opens the new file, you set delaycompress and rotate N, and archives are mode 640; journald is rotated with its own vacuum.",
      },
      {
        slug: "sa-node-exporter",
        titleUk: "Прості метрики хоста: вузли, диск, що будити",
        titleEn: "Simple host metrics: nodes, disk, and what to wake you for",
        difficulty: 3,
        pointsUk: ["Кілька алертів про відмову, не про шум", "Експортер не в відкритий інтернет", "Метрики й логи доповнюють одне одного"],
        pointsEn: ["A few failure alerts, not noise", "The exporter is not on the open internet", "Metrics and logs complement each other"],
        conceptUk: "node_exporter (або аналог) віддає метрики CPU, диску, inode, SMART на /metrics для Prometheus або навіть для Grafana Agent. Для домашнього сервера достатньо кількох алертів: диск > 85%, inode низькі, SMART failing, unit у failed, температура. Алерт «CPU > 20%» розбудить нікому не потрібний шум. Зберігайте історію кілька тижнів, щоб бачити ріст диску. Відкритий порт експортера в інтернет без захисту — зайва поверхня; слухайте localhost або VPN. Метрики не замінюють логи: вони кажуть «щось не так», журнал — «що саме».",
        conceptEn: "node_exporter (or a similar agent) exposes CPU, disk, inode, and SMART metrics on /metrics for Prometheus or even Grafana Agent. For a home server a few alerts are enough: disk > 85%, low inodes, SMART failing, a unit in failed, temperature. A 'CPU > 20%' alert is noise nobody asked to be woken for. Keep a few weeks of history so you can see disk growth. An exporter port open on the internet with no protection is extra surface; listen on localhost or a VPN. Metrics do not replace logs: they say 'something is wrong', the journal says 'what exactly'.",
        code: "# node_exporter --web.listen-address=127.0.0.1:9100\n# alert: node_filesystem_avail_ratio < 0.15  OR  smart_failing == 1",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Який алерт корисніший о 3-й ночі на домашньому NAS?", promptEn: "Which alert is more useful at 3 a.m. on a home NAS?", options: ["диск 95% або SMART failing, а не CPU 25%", "кожен стрибок ping на 2 мс", "CPU > 10% на хвилину", "кількість відкритих ssh щомиті"], correctIndex: 0, explanationUk: "Будіть через ризик втрати даних.", explanationEn: "Wake for a risk of data loss." },
          { kind: "fill", promptUk: "Допишіть типовий шлях метрик експортера", promptEn: "Fill in the exporter's typical metrics path", language: "bash", code: "curl -s http://127.0.0.1:9100/___ | grep node_filesystem", accepted: ["metrics"], caseSensitive: true, explanationUk: "Шлях — /metrics.", explanationEn: "The path is /metrics." },
          { kind: "mcq", promptUk: "Чому не варто відкривати :9100 на 0.0.0.0 у роутер без пароля?", promptEn: "Why should you not open :9100 on 0.0.0.0 through the router with no password?", options: ["метрики розкривають склад хоста й стають поверхнею атаки", "Prometheus тоді не працює", "9100 заборонений удома", "SMART перестає читатись"], correctIndex: 0, explanationUk: "Локальний слухач або VPN.", explanationEn: "A local listener or a VPN." }
        ],
        whyUk: "Які три сигнали варто збирати на домашньому сервері?",
        whyEn: "Which three signals are worth collecting on a home server?",
        ideas: [{ labelUk: "диск і SMART", labelEn: "disk and SMART", anyOf: ["диск", "disk", "85", "smart", "inode"] }, { labelUk: "не шум CPU", labelEn: "not CPU noise", anyOf: ["cpu", "шум", "noise", "алерт", "alert"] }, { labelUk: "метрики плюс журнал", labelEn: "metrics plus the journal", anyOf: ["метрик", "metrics", "журнал", "journal", "vpn", "localhost"] }],
        sampleUk: "Збирають метрики диска, inode й SMART, будять лише через ризик втрати даних, а не через шум CPU; експортер слухає localhost або VPN, а деталі дивляться в журналі.",
        sampleEn: "You collect disk, inode, and SMART metrics, and you wake only for a risk of data loss, not for CPU noise; the exporter listens on localhost or a VPN, and the details are in the journal.",
      }
    ],
    "Контрольна: спостереження",
    "Exam: observability",
    [
      { promptUk: "Storage=volatile після ребута…", promptEn: "Storage=volatile after a reboot…", options: ["журнал зникає, розслідувати падіння важко", "зберігає логи на диску", "замінює SystemMaxUse", "вмикає -b -1 автоматично"], correctIndex: 0, explanationUk: "Для розслідування — persistent.", explanationEn: "For an investigation, persistent." },
      { promptUk: "journalctl -b -1 показує…", promptEn: "journalctl -b -1 shows…", options: ["попереднє завантаження", "лише сьогодні", "тільки kernel forever", "вакуум journald"], correctIndex: 0, explanationUk: "Корисно після panic.", explanationEn: "Useful after a panic." },
      { promptUk: "Процес без reopen після ротації…", promptEn: "A process with no reopen after rotation…", options: ["пише в старий inode, новий файл порожній", "завжди відкриває новий шлях", "стискає логи сам", "вимикає logrotate"], correctIndex: 0, explanationUk: "USR1 або copytruncate.", explanationEn: "USR1 or copytruncate." },
      { promptUk: "Алерт CPU > 20% о третій ночі…", promptEn: "A CPU > 20% alert at 3 a.m. is…", options: ["зазвичай шум; краще диск, SMART, failed unit", "найважливіший сигнал NAS", "замінює логи", "обов'язковий для node_exporter"], correctIndex: 0, explanationUk: "Будіть через втрату даних.", explanationEn: "Wake for data loss." },
      { promptUk: "Порт експортера метрик у відкритий інтернет…", promptEn: "An exporter metrics port on the open internet is…", options: ["зайва поверхня; слухайте localhost або VPN", "обов'язковий для Grafana", "безпечний без автентифікації завжди", "замінює journald"], correctIndex: 0, explanationUk: "Обмежте слухача.", explanationEn: "Limit the listener." },
      { promptUk: "Архівні логи з правами 666…", promptEn: "Archived logs with mode 666 are…", options: ["занадто відкриті: у логах бувають секрети", "рекомендовані logrotate", "потрібні для USR1", "ігноруються UNIX"], correctIndex: 0, explanationUk: "640 і обмежена група.", explanationEn: "640 and a limited group." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandSysadmin(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
