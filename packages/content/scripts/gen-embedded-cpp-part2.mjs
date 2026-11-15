export function appendUnits(units, h) {
  const { L, E, U, mcq, fill, read, order, match, out, run, proj, cppMain } = h;

  units.push(
    U("qt-qml", "Qt · QML · MVC", "Qt · QML · MVC", [
      L("ec-qt-arch", "Qt: signals/slots, event loop", "Qt: signals/slots, event loop", 2, false, [
        mcq("ec-q1", "Qt — це:", "Qt is:", ["кросплатформенний C++ фреймворк (UI + tools)", "SQL database", "FreeRTOS port", "MAVLink dialect"], 0),
        match("ec-q2", "Qt tooling", "Qt tooling", [{ left: "moc", right: "meta-object compiler" }, { left: "uic", right: "UI forms compiler" }, { left: "rcc", right: "resources compiler" }]),
        fill("ec-q3", "connect signal/slot", "connect signal/slot", "cpp", "QObject::___(btn, &QPushButton::clicked, this, &Win::onClick);", ["connect"]),
        mcq("ec-q4", "Signals/slots реалізують патерн:", "Signals/slots implement:", ["observer / event-driven зв'язок", "лише MVC model", "TCP handshake", "CRC"], 0),
      ]),
      L("ec-qml-mvc", "QML, моделі даних, MVC", "QML, data models, MVC", 3, false, [
        mcq("ec-q5", "QML vs QtWidgets:", "QML vs QtWidgets:", ["QML — декларативний UI; Widgets — класичний C++ UI", "QML замінює C++ runtime", "Widgets тільки для Python", "однаково без різниці"], 0),
        fill("ec-q6", "QML property binding (idea)", "QML property binding (idea)", "qml", "Text { ___: model.altitude }", ["text"]),
        mcq("ec-q7", "MVC розділяє:", "MVC separates:", ["дані (Model), вигляд (View), логіку (Controller)", "лише UDP/TCP", "тільки CMake stages", "гілки Git"], 0),
        read("ec-q8", "Навіщо ListModel / custom model?", "Why ListModel / custom model?", "qml", "ListView { model: telemetryModel }", ["відображати колекції об'єктів у UI", "компілювати kernel", "замінити FreeRTOS", "генерувати CRC"], 0),
      ]),
      L("ec-ops-hmi", "Operator HMI · signal storms", "Operator HMI · signal storms", 3, false, [
        mcq("ec-q9", "HMI for operators should:", "HMI for operators should:", ["show critical state clearly, reduce clutter", "spam every DEBUG log on screen", "hide fail-safe status", "block all updates"], 0),
        match("ec-q10", "UI data path", "UI data path", [{ left: "Model", right: "telemetry/state" }, { left: "View", right: "gauges/maps" }, { left: "Controller", right: "commands/actions" }]),
        mcq("ec-q11", "Signal storm risk:", "Signal storm risk:", ["UI flood from too many updates", "stronger CRC", "faster linker", "better Git history"], 0),
        fill("ec-q12", "Throttle idea", "Throttle idea", "cpp", "if (now - last < ___) return;", ["period_ms", "dt", "interval"], false),
        mcq("ec-q13", "Bind UI to rates carefully because:", "Bind UI to rates carefully because:", ["high-rate telemetry can freeze UI thread", "QML has no models", "UDP forbids display", "tests ban UI"], 0),
      ]),
      E("ec-qt-exam", "Контрольна: Qt/QML", "Exam: Qt/QML", 2, [
        mcq("ec-qe1", "moc is for:", "moc is for:", ["Qt meta-object system", "SQL migration", "UDP checksum", "Docker build"], 0),
        fill("ec-qe2", "connect", "connect", "cpp", "QObject::___(…);", ["connect"]),
        mcq("ec-qe3", "QML is:", "QML is:", ["declarative UI language", "kernel module", "CRC algo", "git hook"], 0),
        mcq("ec-qe4", "MVC:", "MVC:", ["Model-View-Controller split", "Memory-Virtual-Cache only", "MAV-Video-Codec", "make-valgrind-cmake"], 0),
        mcq("ec-qe5", "Signal storm:", "Signal storm:", ["too many UI updates", "perfect CRC", "Git LFS", "SSH only"], 0),
        match("ec-qe6", "Roles", "Roles", [{ left: "View", right: "presentation" }, { left: "Model", right: "data" }]),
      ]),
    ]),
  );

  units.push(
    U("ros2", "ROS 2", "ROS 2", [
      L("ec-ros-nodes", "Nodes, topics, services", "Nodes, topics, services", 2, false, [
        mcq("ec-s1", "ROS 2 node is:", "ROS 2 node is:", ["process/component that pub/sub & serves", "SQL table", "CMake flag only", "Qt slot only"], 0),
        match("ec-s2", "ROS 2 concepts", "ROS 2 concepts", [{ left: "topic", right: "pub/sub stream" }, { left: "service", right: "request/response" }, { left: "action", right: "long-running goal" }]),
        fill("ec-s3", "create_publisher sketch", "create_publisher sketch", "cpp", 'auto p = ___<Msg>("/telem", 10);', ["create_publisher"]),
        mcq("ec-s4", "Separate algorithm from ROS glue:", "Separate algorithm from ROS glue:", ["pure logic testable + thin adapters", "hardcode ROS in every formula", "delete packages", "skip YAML"], 0),
      ]),
      L("ec-ros-launch", "Launch, params, bags", "Launch, params, bags", 3, false, [
        mcq("ec-s5", "Launch files help:", "Launch files help:", ["start multi-node graphs with params", "replace CRC", "paint QML", "ban tests"], 0),
        fill("ec-s6", "declare parameter idea", "declare parameter idea", "cpp", 'this->___("rate_hz", 10.0);', ["declare_parameter"]),
        mcq("ec-s7", "rosbag / record useful for:", "rosbag / record useful for:", ["replay field data for debug & tests", "delete logs forever", "compile kernel", "format disks"], 0),
        match("ec-s8", "Config", "Config", [{ left: "YAML params", right: "tunable rates/topics" }, { left: "launch", right: "graph startup" }, { left: "QoS", right: "reliability/history" }]),
      ]),
      L("ec-ros-qos-life", "QoS · lifecycle · separation", "QoS · lifecycle · separation", 3, false, [
        mcq("ec-s9", "QoS reliability:", "QoS reliability:", ["best-effort vs reliable delivery tradeoffs", "only font size", "Git merge strategy", "CSS flex"], 0),
        match("ec-s10", "Lifecycle ideas", "Lifecycle ideas", [{ left: "configure", right: "load params" }, { left: "activate", right: "start IO" }, { left: "deactivate", right: "safe stop" }]),
        mcq("ec-s11", "Why pure algorithm module?", "Why pure algorithm module?", ["unit test without ROS runtime", "must call create_publisher in math", "skip sim", "ban mocks"], 0),
        fill("ec-s12", "create_subscription sketch", "create_subscription sketch", "cpp", 'auto s = ___<Msg>("/cmd", 10, cb);', ["create_subscription"]),
        mcq("ec-s13", "Bag replay enables:", "Bag replay enables:", ["repeatable offline debugging", "live radio only", "deleting CI", "hiding CRC errors"], 0),
      ]),
      E("ec-ros-exam", "Контрольна: ROS 2", "Exam: ROS 2", 3, [
        mcq("ec-se1", "Topic is:", "Topic is:", ["pub/sub channel", "SQL table", "CMake flag", "Qt slot only"], 0),
        fill("ec-se2", "create_publisher", "create_publisher", "cpp", 'auto p = ___<M>("/t", 10);', ["create_publisher"]),
        mcq("ec-se3", "Service:", "Service:", ["request/response", "only fire-and-forget stream", "git LFS", "CRC poly"], 0),
        mcq("ec-se4", "Separate algorithm:", "Separate algorithm:", ["testable pure logic + thin ROS wrap", "hardcode ROS in every formula", "delete packages", "skip YAML"], 0),
        mcq("ec-se5", "QoS matters for:", "QoS matters for:", ["reliability & history on links", "font kerning", "npm scripts", "SSH keys only"], 0),
        match("ec-se6", "ROS pieces", "ROS pieces", [{ left: "launch", right: "start graph" }, { left: "bag", right: "record/replay" }]),
      ]),
    ]),
  );

  units.push(
    U("embedded-rtos", "MCU · peripheral · FreeRTOS", "MCU · peripheral · FreeRTOS", [
      L("ec-mcu-arch", "Архітектура MCU, регістри, IRQ", "MCU architecture, registers, IRQ", 3, false, [
        mcq("ec-e1", "Мікроконтролер (MCU) — це:", "A microcontroller (MCU) is:", ["SoC з CPU + пам'ять + периферія для real-time задач", "хмарний Kubernetes", "лише GPU", "SQL engine"], 0),
        match("ec-e2", "Ресурси MCU", "MCU resources", [{ left: "flash", right: "program storage" }, { left: "RAM", right: "runtime data" }, { left: "GPIO", right: "digital pins" }]),
        mcq("ec-e3", "Переривання (IRQ) дозволяють:", "Interrupts (IRQ) allow:", ["реагувати на події апаратури без постійного busy-poll", "замінити linker", "прискорити CSS", "вимкнути watchdog"], 0),
        read("ec-e4", "while(1) superloop:", "while(1) superloop:", "cpp", "while (1) { poll(); act(); }", ["простий cooperative loop без RTOS", "завжди multi-core OS", "ROS launch", "Qt moc"], 0),
      ]),
      L("ec-periph-rtos", "UART/I2C/SPI · FreeRTOS", "UART/I2C/SPI · FreeRTOS", 3, false, [
        match("ec-e5", "Шини", "Buses", [{ left: "UART", right: "async serial point-to-point" }, { left: "I2C", right: "multi-device 2-wire bus" }, { left: "SPI", right: "fast master/slave serial" }]),
        mcq("ec-e6", "FreeRTOS відрізняється від while(1) тим, що:", "FreeRTOS differs from while(1) by:", ["завдання, планування, черги, синхронізація", "вимагає GPU", "замінює Ethernet PHY", "пише QML"], 0),
        fill("ec-e7", "Створити задачу FreeRTOS", "Create FreeRTOS task", "cpp", '___(telemetry_task, "tel", 2048, NULL, 1, NULL);', ["xTaskCreate"]),
        fill("ec-e8", "Черга FreeRTOS", "FreeRTOS queue", "cpp", "___(q, &msg, portMAX_DELAY);", ["xQueueSend"]),
      ]),
      L("ec-watchdog-sync", "Watchdog · ISR vs task · priorities", "Watchdog · ISR vs task · priorities", 3, false, [
        mcq("ec-e9", "Watchdog timer purpose:", "Watchdog timer purpose:", ["reset system if software hangs", "replace CRC", "paint UI", "store Git history"], 0),
        match("ec-e10", "ISR vs task", "ISR vs task", [{ left: "ISR", right: "short, deferred work" }, { left: "task", right: "longer processing" }, { left: "queue", right: "pass events safely" }]),
        mcq("ec-e11", "Priority inversion is:", "Priority inversion is:", ["low prio holds lock needed by high prio", "always good scheduling", "only CSS z-index", "Git rebase"], 0),
        fill("ec-e12", "mutex take", "mutex take", "cpp", "___(mtx, portMAX_DELAY);", ["xSemaphoreTake"]),
        mcq("ec-e13", "Stack size too small leads to:", "Stack size too small leads to:", ["stack overflow / corruption", "stronger Wi-Fi", "free RAM grow", "auto MISRA pass"], 0),
        run("ec-e14", "Lab: ring next index (i+1)%8 from 7 → 0", "Lab: ring next index (i+1)%8 from 7 → 0", cppMain("  int i = 7;\n  int n = 8;\n  // TODO: cout << (i+1)%n"), "0", { req: ["%", "cout"], hintUk: "cout << (i+1)%n;", hintEn: "cout << (i+1)%n;" }),
      ]),
      E("ec-emb-exam", "Контрольна: embedded/RTOS", "Exam: embedded/RTOS", 3, [
        mcq("ec-ee1", "MCU includes:", "MCU includes:", ["CPU+mem+peripherals", "only cloud DB", "only browser", "only Qt Designer"], 0),
        match("ec-ee2", "Bus pick", "Bus pick", [{ left: "sensor hub many chips", right: "I2C often" }, { left: "high-speed ADC", right: "SPI often" }]),
        fill("ec-ee3", "xTaskCreate", "xTaskCreate", "cpp", '___ (fn, "n", stack, …);', ["xTaskCreate"]),
        mcq("ec-ee4", "Mutex protects:", "Mutex protects:", ["shared resource between tasks", "CRC poly only", "CSS variables", "git remotes"], 0),
        mcq("ec-ee5", "Watchdog:", "Watchdog:", ["recovers from hangs", "replaces tests", "paints QML", "stores bags"], 0),
        fill("ec-ee6", "xQueueSend", "xQueueSend", "cpp", "___(q,&m,portMAX_DELAY);", ["xQueueSend"]),
        mcq("ec-ee7", "Keep ISR short:", "Keep ISR short:", ["defer heavy work to tasks", "run full ML models there", "allocate huge heap", "block forever"], 0),
      ]),
    ]),
  );

  units.push(
    U("uav-stack", "SBC · drones · MAVLink", "SBC · drones · MAVLink", [
      L("ec-sbc-roles", "SBC roles · flight stack", "SBC roles · flight stack", 3, false, [
        match("ec-u1", "Ролі в архітектурі", "Architecture roles", [{ left: "FC/MCU", right: "hard real-time control" }, { left: "SBC companion", right: "vision/high-level" }, { left: "GCS", right: "operator interface" }]),
        mcq("ec-u2", "Companion computer typically:", "Companion computer typically:", ["runs high-level / vision / planning", "always bit-bangs motors only", "replaces battery chemistry", "is CSS CDN"], 0),
        mcq("ec-u3", "Open flight stacks teach:", "Open flight stacks teach:", ["sensors→estimate→control→actuators pipeline", "only QML themes", "SQL joins", "npm scripts"], 0),
        fill("ec-u4", "MAVLink idea", "MAVLink idea", "cpp", "// parse ___ message id + payload", ["MAVLink", "mavlink"], false),
      ]),
      L("ec-mavlink-sim", "MAVLink · Gazebo/SITL/QGC", "MAVLink · Gazebo/SITL/QGC", 3, false, [
        mcq("ec-u5", "MAVLink is:", "MAVLink is:", ["vehicle messaging protocol", "video container only", "mutex type", "QML module"], 0),
        read("ec-u6", "Heartbeat role:", "Heartbeat role:", "cpp", "// send HEARTBEAT at 1Hz", ["alive/status presence signal", "CRC poly definition", "CMake target", "Qt moc"], 0),
        match("ec-u7", "Sim stack", "Sim stack", [{ left: "SITL", right: "software in the loop" }, { left: "Gazebo", right: "physics/world sim" }, { left: "QGC", right: "ground control UI" }]),
        mcq("ec-u8", "Why simulate first?", "Why simulate first?", ["safer cheaper iteration before hardware", "skip all tests forever", "ban logging", "delete CRC"], 0),
      ]),
      L("ec-failsafe-rates", "Failsafe concepts · message rates", "Failsafe concepts · message rates", 3, false, [
        mcq("ec-u9", "Failsafe mode example (concept):", "Failsafe mode example (concept):", ["return/land/hold when link or sensor fails", "ignore all errors", "disable telemetry", "random actuators"], 0),
        match("ec-u10", "Rates", "Rates", [{ left: "attitude", right: "high rate" }, { left: "GPS", right: "lower rate" }, { left: "params", right: "on change/slow" }]),
        mcq("ec-u11", "HITL differs from SITL by:", "HITL differs from SITL by:", ["real hardware in the loop", "no sensors ever", "only CSS sim", "Git only"], 0),
        fill("ec-u12", "Rate limit idea", "Rate limit idea", "cpp", "if (now - last_tx < ___) return;", ["min_period", "dt", "T"], false),
        mcq("ec-u13", "GCS needs reliable:", "GCS needs reliable:", ["link status + vehicle mode + alerts", "only wallpaper", "CSS minify", "npm audit"], 0),
      ]),
      E("ec-uav-exam", "Контрольна: UAV stack", "Exam: UAV stack", 3, [
        mcq("ec-ue1", "Companion computer:", "Companion computer:", ["high-level / vision", "only PWM motors always", "replaces battery", "CSS CDN"], 0),
        mcq("ec-ue2", "MAVLink:", "MAVLink:", ["messaging for vehicles/GCS", "video container only", "mutex type", "QML module"], 0),
        mcq("ec-ue3", "Gazebo role:", "Gazebo role:", ["simulation environment", "flight motor driver", "CRC library", "SSH daemon"], 0),
        match("ec-ue4", "Who talks MAVLink?", "Who talks MAVLink?", [{ left: "FC", right: "vehicle side" }, { left: "GCS", right: "operator side" }]),
        mcq("ec-ue5", "SITL:", "SITL:", ["software-in-the-loop testing", "only hardware burn-in", "CSS layout", "Git LFS"], 0),
        mcq("ec-ue6", "Failsafe concept:", "Failsafe concept:", ["safe reaction to faults", "ignore faults", "delete logs", "ban sim"], 0),
      ]),
    ]),
  );

  units.push(
    U("safety-reliability", "Safety · reliability", "Safety · reliability", [
      L("ec-watchdog-bit", "Watchdog · BIT · self-test", "Watchdog · BIT · self-test", 3, false, [
        mcq("ec-sf1", "Built-in test (BIT) checks:", "Built-in test (BIT) checks:", ["health of sensors/subsystems at start/runtime", "only UI theme", "Git history", "CSS grid"], 0),
        match("ec-sf2", "Safety layers", "Safety layers", [{ left: "watchdog", right: "hang recovery" }, { left: "CRC", right: "data integrity" }, { left: "failsafe", right: "safe mode transition" }]),
        mcq("ec-sf3", "Red/black logging idea:", "Red/black logging idea:", ["separate critical vs verbose streams", "delete all logs", "one infinite file only", "no timestamps"], 0),
        fill("ec-sf4", "kick watchdog sketch", "kick watchdog sketch", "cpp", "___(wdg); // pet/kick", ["watchdog_kick", "hal_watchdog_refresh", "wdg_kick"], false),
      ]),
      L("ec-failsafe-fmea", "Fail-safe modes · FMEA-light", "Fail-safe modes · FMEA-light", 3, false, [
        mcq("ec-sf5", "FMEA-light asks:", "FMEA-light asks:", ["what fails, effect, detection, mitigation", "only marketing color", "CSS breakpoints", "npm version"], 0),
        match("ec-sf6", "Fault reactions", "Fault reactions", [{ left: "sensor loss", right: "hold/safe estimate" }, { left: "link loss", right: "failsafe mode" }, { left: "overcurrent", right: "cutoff/protect" }]),
        mcq("ec-sf7", "Degraded mode means:", "Degraded mode means:", ["continue with reduced capability safely", "always full performance", "silent crash", "disable CRC"], 0),
        order("ec-sf8", "Fault handling order", "Fault handling order", "cpp", ["detect", "isolate", "mitigate", "report"], ["detect", "isolate", "mitigate", "report"]),
      ]),
      L("ec-safe-coding", "Safe coding habits for field", "Safe coding habits for field", 3, false, [
        mcq("ec-sf9", "Assert vs production checks:", "Assert vs production checks:", ["critical paths need explicit runtime guards", "asserts replace all field checks", "skip validation", "log only never act"], 0),
        fill("ec-sf10", "saturate helper idea", "saturate helper idea", "cpp", "v = ___(v, lo, hi);", ["clamp", "std::clamp"], false),
        mcq("ec-sf11", "Avoid in ISR:", "Avoid in ISR:", ["blocking locks and heavy alloc", "short flag set", "queue send from ISR API", "minimal work"], 0),
        run("ec-sf12", "Lab: saturate -5 into [0,10] → 0", "Lab: saturate -5 into [0,10] → 0", cppMain("  int v=-5, lo=0, hi=10;\n  // TODO: clamp v; cout << v"), "0", { req: ["cout"], hintUk: "if(v<lo)v=lo; if(v>hi)v=hi; cout<<v;", hintEn: "if(v<lo)v=lo; if(v>hi)v=hi; cout<<v;" }),
      ]),
      E("ec-safety-exam", "Контрольна: safety", "Exam: safety", 3, [
        mcq("ec-sfe1", "Watchdog:", "Watchdog:", ["reset if software hangs", "UI theme", "Git hook", "CSS only"], 0),
        mcq("ec-sfe2", "BIT:", "BIT:", ["built-in health tests", "binary integer type only", "bag file", "QML list"], 0),
        match("ec-sfe3", "Mitigate", "Mitigate", [{ left: "link loss", right: "failsafe" }, { left: "bad CRC", right: "drop/reject packet" }]),
        order("ec-sfe4", "Handle fault", "Handle fault", "cpp", ["detect", "mitigate", "report"], ["detect", "mitigate", "report"]),
        mcq("ec-sfe5", "Degraded mode:", "Degraded mode:", ["safe reduced capability", "ignore faults", "full performance always", "delete sensors"], 0),
        fill("ec-sfe6", "clamp idea", "clamp idea", "cpp", "v = ___(v,0,100);", ["clamp", "std::clamp"], false),
      ]),
    ]),
  );

  units.push(
    U("datalink-ops", "Data-link · ops", "Data-link · ops", [
      L("ec-link-quality", "Link quality · RSSI concepts", "Link quality · RSSI concepts", 3, false, [
        mcq("ec-d1", "Link quality metrics help:", "Link quality metrics help:", ["decide rate/mode and warn operator", "replace batteries with CSS", "delete CRC", "ban telemetry"], 0),
        match("ec-d2", "Metrics", "Metrics", [{ left: "RSSI/SNR", right: "signal quality proxies" }, { left: "packet loss", right: "reliability" }, { left: "latency", right: "delay" }]),
        mcq("ec-d3", "When link degrades:", "When link degrades:", ["reduce rate / prioritize critical msgs", "spam max bitrate always", "disable failsafe", "hide status"], 0),
        fill("ec-d4", "loss percent idea", "loss percent idea", "cpp", "loss = 100 * lost / ___;", ["total", "sent", "n"], false),
      ]),
      L("ec-rate-budget", "Rate limits · bandwidth budget", "Rate limits · bandwidth budget", 3, false, [
        mcq("ec-d5", "Bandwidth budget means:", "Bandwidth budget means:", ["plan bytes/s across message classes", "infinite free radio", "only video 8K always", "no priorities"], 0),
        match("ec-d6", "Priorities", "Priorities", [{ left: "heartbeat/mode", right: "high priority" }, { left: "debug logs", right: "low priority" }, { left: "video", right: "high bandwidth optional" }]),
        mcq("ec-d7", "Anti-flood protects:", "Anti-flood protects:", ["CPU/link from message storms", "Git history", "fonts", "SQL indexes only"], 0),
        run("ec-d8", "Lab: bytes/s = 64*10 → 640", "Lab: bytes/s = 64*10 → 640", cppMain("  int size=64, hz=10;\n  // TODO: cout << size*hz"), "640", { req: ["cout"], hintUk: "cout << size*hz;", hintEn: "cout << size*hz;" }),
      ]),
      L("ec-duty-cycle", "Duty cycle · fairness · queues", "Duty cycle · fairness · queues", 3, false, [
        mcq("ec-d9", "Duty cycle limits:", "Duty cycle limits:", ["on-air time / regulatory & thermal budgets", "CSS animations only", "Git commits/hour", "npm installs"], 0),
        match("ec-d10", "Queueing", "Queueing", [{ left: "drop-old", right: "prefer fresh telemetry" }, { left: "drop-new", right: "keep backlog" }, { left: "priority queue", right: "critical first" }]),
        mcq("ec-d11", "For control-critical packets prefer:", "For control-critical packets prefer:", ["priority + bounded latency path", "best-effort debug flood", "unlimited queue growth", "no sequence numbers"], 0),
        fill("ec-d12", "token bucket idea", "token bucket idea", "cpp", "if (tokens < cost) ___; else tokens -= cost;", ["return", "drop", "reject"], false),
      ]),
      E("ec-datalink-exam", "Контрольна: datalink", "Exam: datalink", 3, [
        mcq("ec-de1", "Link quality used to:", "Link quality used to:", ["adapt rate & warn ops", "paint UI only", "delete CRC", "ban SSH"], 0),
        mcq("ec-de2", "Bandwidth budget:", "Bandwidth budget:", ["plan message rates/sizes", "infinite capacity", "video only", "no heartbeats"], 0),
        match("ec-de3", "Priority", "Priority", [{ left: "mode/heartbeat", right: "high" }, { left: "debug", right: "low" }]),
        fill("ec-de4", "bps", "bps", "cpp", "bps = size * ___;", ["hz", "rate", "fps"], false),
        mcq("ec-de5", "Anti-flood:", "Anti-flood:", ["limit storms", "maximize spam", "disable metrics", "hide loss"], 0),
        mcq("ec-de6", "Drop-old policy:", "Drop-old policy:", ["keep freshest telemetry", "always keep ancient msgs", "ban queues", "CRC off"], 0),
      ]),
    ]),
  );

  units.push(
    U("mission-autonomy", "Mission · autonomy basics", "Mission · autonomy basics", [
      L("ec-waypoints", "Waypoints · path following", "Waypoints · path following", 3, false, [
        mcq("ec-ma1", "Waypoint mission is:", "Waypoint mission is:", ["sequence of target poses/actions", "random CSS path", "SQL migration", "Git rebase"], 0),
        match("ec-ma2", "Path terms", "Path terms", [{ left: "waypoint", right: "target point" }, { left: "segment", right: "leg between WPs" }, { left: "acceptance radius", right: "arrival threshold" }]),
        fill("ec-ma3", "distance sketch", "distance sketch", "cpp", "d = hypot(tx - x, ___);", ["ty - y", "ty-y"], false),
        run("ec-ma4", "Lab: |3-10|=7 abs error", "Lab: abs error |3-10|=7", cppMain("  int x=3, t=10;\n  int e = x-t; if(e<0) e=-e;\n  // TODO: cout << e"), "7", { req: ["cout"], hintUk: "cout << e;", hintEn: "cout << e;" }),
      ]),
      L("ec-state-machine", "Mission state machine", "Mission state machine", 3, false, [
        mcq("ec-ma5", "State machine helps:", "State machine helps:", ["explicit modes & legal transitions", "hidden goto soup without rules", "skip failsafes", "ban tests"], 0),
        match("ec-ma6", "Modes", "Modes", [{ left: "IDLE", right: "await command" }, { left: "RUN", right: "execute plan" }, { left: "SAFE", right: "failsafe behavior" }]),
        fill("ec-ma7", "transition guard idea", "transition guard idea", "cpp", "if (state==RUN && link_lost) state = ___;", ["SAFE", "Failsafe", "IDLE"], false),
        run("ec-ma8", "Lab: state 0→1 print 1", "Lab: state 0→1 print 1", cppMain("  int state = 0;\n  // TODO: state = 1; cout << state"), "1", { req: ["cout"], hintUk: "state=1; cout<<state;", hintEn: "state=1; cout<<state;" }),
      ]),
      L("ec-geofence-sim", "Safety boundaries · sim validation", "Safety boundaries · sim validation", 3, false, [
        mcq("ec-ma9", "Geofence as safety boundary:", "Geofence as safety boundary:", ["virtual keep-in/out limits for safe operation", "weapon system", "CSS border only", "Git ignore"], 0),
        match("ec-ma10", "Validation", "Validation", [{ left: "SITL", right: "software validation" }, { left: "HITL", right: "hardware-in-loop" }, { left: "flight test", right: "controlled field" }]),
        mcq("ec-ma11", "Before field trial:", "Before field trial:", ["sim + checklists + failsafe review", "skip all sim", "disable logs", "ignore link loss"], 0),
        order("ec-ma12", "Autonomy bring-up", "Autonomy bring-up", "cpp", ["unit tests", "SITL scenarios", "HITL if needed", "supervised field"], ["unit tests", "SITL scenarios", "HITL if needed", "supervised field"]),
      ]),
      E("ec-mission-exam", "Контрольна: mission", "Exam: mission", 3, [
        mcq("ec-mae1", "Waypoint:", "Waypoint:", ["target pose/action in plan", "CSS selector", "SQL row only", "npm script"], 0),
        mcq("ec-mae2", "State machine:", "State machine:", ["modes + transitions", "random jumps only", "no SAFE mode", "ban logs"], 0),
        match("ec-mae3", "Modes", "Modes", [{ left: "RUN", right: "execute" }, { left: "SAFE", right: "failsafe" }]),
        fill("ec-mae4", "on link loss", "on link loss", "cpp", "state = ___;", ["SAFE", "Failsafe"], false),
        mcq("ec-mae5", "Geofence concept:", "Geofence concept:", ["safety keep-in/out boundary", "video codec", "Qt widget", "bash alias"], 0),
        order("ec-mae6", "Validate order", "Validate order", "cpp", ["SITL", "field"], ["SITL", "field"]),
      ]),
    ]),
  );

  const ringProj = proj(
    "ec-proj-ring1",
    "C++ mini: ring buffer push/pop + size; README: concurrency notes (ISR vs task).",
    "C++ mini: ring buffer push/pop + size; README: concurrency notes (ISR vs task).",
    [
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
      { id: "hpp", name: "ringbuf.hpp", language: "cpp", starter: `// TODO: declarations\n#pragma once\n` },
      {
        id: "md",
        name: "README.md",
        language: "markdown",
        starter: `# Ring buffer\n\n<!-- ISR vs task, overwrite policy -->\n`,
      },
    ],
    [
      { fileId: "cpp", contains: ["RingBuf", "push", "pop", "size"], forbidden: ["system(", "exec("] },
      { fileId: "hpp", contains: ["RingBuf"] },
      { fileId: "md", contains: ["ISR", "task"] },
    ],
    "struct RingBuf; push/pop оновлюють head/tail/count; README: ISR vs task.",
    "struct RingBuf; push/pop update head/tail/count; README: ISR vs task.",
  );

  const packetProj = proj(
    "ec-proj-pkt1",
    "C++ mini: frame {seq,len,payload,crc}; encode/decode + crc16 stub; README: UDP vs TCP choice.",
    "C++ mini: frame {seq,len,payload,crc}; encode/decode + crc16 stub; README: UDP vs TCP choice.",
    [
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
        starter: `// TODO: Packet API\n#pragma once\n#include <cstdint>\n#include <cstddef>\n`,
      },
      {
        id: "md",
        name: "README.md",
        language: "markdown",
        starter: `# Packet mini\n\n<!-- UDP vs TCP for telemetry -->\n`,
      },
    ],
    [
      { fileId: "cpp", contains: ["Packet", "crc", "encode", "decode"], forbidden: ["system(", "exec("] },
      { fileId: "hpp", contains: ["Packet", "crc"] },
      { fileId: "md", contains: ["UDP", "TCP"] },
    ],
    "Packet + crc16 + encode/decode; README: UDP vs TCP.",
    "Packet + crc16 + encode/decode; README: UDP vs TCP.",
  );

  const telemProj = proj(
    "ec-cap1",
    "C++ mini: структура Telemetry {x,y,yaw}, encode/decode у байтовий буфер, проста crc16 stub, step_waypoint() оновлює позицію. README: MCU vs SBC vs GCS.",
    "C++ mini: Telemetry {x,y,yaw} struct, encode/decode to byte buffer, simple crc16 stub, step_waypoint() updates pose. README: MCU vs SBC vs GCS.",
    [
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
        starter: `// TODO: declarations for Telemetry API\n#pragma once\n#include <cstdint>\n#include <cstddef>\n`,
      },
      {
        id: "md",
        name: "README.md",
        language: "markdown",
        starter: `# Telemetry mini\n\n<!-- Describe: MCU flight loop, companion SBC, ground station -->\n`,
      },
    ],
    [
      { fileId: "cpp", contains: ["Telemetry", "crc", "encode", "decode", "step"], forbidden: ["system(", "exec("] },
      { fileId: "hpp", contains: ["Telemetry", "crc"] },
      { fileId: "md", contains: ["MCU", "SBC", "GCS"] },
    ],
    "struct Telemetry; crc16(...); encode/decode з memcpy полів; step_waypoint: рух до (tx,ty) з обмеженням кроку.",
    "struct Telemetry; crc16(...); encode/decode with field memcpy; step_waypoint: move toward (tx,ty) with step limit.",
  );

  units.push(
    U("systems-capstone", "Systems · capstone", "Systems · capstone", [
      L("ec-video-crypto", "Video concepts · crypto basics", "Video concepts · crypto basics", 3, false, [
        mcq("ec-c1", "Video pipeline concept:", "Video pipeline concept:", ["capture → encode → transport → display", "only CRC", "only Git LFS", "SQL view"], 0),
        fill("ec-c2", "integrity check idea", "integrity check idea", "cpp", "ok = verify___(buf, n, tag);", ["hmac", "mac", "signature"], false),
        match("ec-c3", "Crypto concepts", "Crypto concepts", [{ left: "confidentiality", right: "encryption" }, { left: "integrity", right: "MAC/signature" }, { left: "authenticity", right: "who sent it" }]),
        mcq("ec-c4", "Encrypt telemetry because:", "Encrypt telemetry because:", ["protect sensitive ops data on links", "replace CRC always", "speed CSS", "delete logs"], 0),
      ]),
      L("ec-pid-control", "PID control intro", "PID control intro", 3, false, [
        mcq("ec-c5", "PID uses:", "PID uses:", ["error terms P+I+D", "only CRC", "only Git hooks", "only QML anchors"], 0),
        fill("ec-c6", "P term", "P term", "cpp", "u = Kp * ___;", ["e", "error"], false),
        match("ec-c7", "PID terms", "PID terms", [{ left: "P", right: "proportional to error" }, { left: "I", right: "accumulates error" }, { left: "D", right: "rate of error" }]),
        mcq("ec-c8", "Tuning tradeoff:", "Tuning tradeoff:", ["компроміс швидкість / overshoot / стійкість", "випадкові числа без тестів", "тільки максимальні K", "ігнорувати одиниці часу"], 0),
        out(
          "ec-c8b",
          "u = Kp*e при Kp=0.5, e=10 →",
          "u = Kp*e with Kp=0.5, e=10 →",
          "cpp",
          `double Kp = 0.5, e = 10.0;
double u = Kp * e; // ?`,
          ["5", "15", "0.05", "50"],
          0,
        ),
        run("ec-c8c", "Lab: PID P-term", "Lab: PID P-term", cppMain("  double Kp = 0.5;\n  double e = 10.0;\n  // TODO: cout << (Kp * e)"), "5", { req: ["Kp", "cout"], hintUk: "cout << (Kp * e) << endl;", hintEn: "cout << (Kp * e) << endl;" }),
      ]),
      L("ec-project-ringbuf", "Project: ring buffer", "Project: ring buffer", 4, false, [ringProj]),
      L("ec-project-packet", "Project: framed packet", "Project: framed packet", 4, false, [packetProj]),
      L("ec-capstone-telemetry", "Capstone: telemetry packet + sim step", "Capstone: telemetry packet + sim step", 4, false, [telemProj]),
      L("ec-filters-rate", "Filters · moving average · rate limit", "Filters · moving average · rate limit", 3, false, [
        mcq("ec-c9", "Moving average helps:", "Moving average helps:", ["smooth noisy sensors", "replace CRC", "delete PID", "ban tests"], 0),
        run("ec-c10", "Lab: avg of 2,4,6 → 4", "Lab: avg of 2,4,6 → 4", cppMain("  int a[3]={2,4,6};\n  int s=0;\n  // TODO: sum/3 cout"), "4", { req: ["for", "cout"], hintUk: "for(...)s+=a[i]; cout<<s/3;", hintEn: "for(...)s+=a[i]; cout<<s/3;" }),
        fill("ec-c11", "alpha filter idea", "alpha filter idea", "cpp", "y = y + alpha * (x - ___);", ["y"], true),
        mcq("ec-c12", "Rate limit on actuators:", "Rate limit on actuators:", ["avoid abrupt unsafe jumps", "maximize step always", "ignore units", "skip saturation"], 0),
      ]),
      E("ec-cap-exam", "Фінальна контрольна Embedded C++", "Final Embedded C++ exam", 3, [
        mcq("ec-ce1", "C++ in MilTech prioritizes:", "C++ in MilTech prioritizes:", ["reliability & resources", "only pretty UI", "skip tests", "ignore memory"], 0),
        fill("ec-ce2", "unique_ptr", "unique_ptr", "cpp", "std::___<T> p;", ["unique_ptr"]),
        mcq("ec-ce3", "UDP good for:", "UDP good for:", ["low-latency telemetry bursts", "always file transfer only", "replacing flash", "CSS minify"], 0),
        fill("ec-ce4", "xTaskCreate", "xTaskCreate", "cpp", '___ (task, "n", …);', ["xTaskCreate"]),
        mcq("ec-ce5", "MAVLink is:", "MAVLink is:", ["messaging for vehicles/GCS", "video codec", "Qt widget", "bash builtin"], 0),
        mcq("ec-ce6", "PID uses:", "PID uses:", ["error terms P+I+D", "only CRC", "only Git hooks", "only QML anchors"], 0),
        mcq("ec-ce7", "Watchdog:", "Watchdog:", ["hang recovery reset", "UI skin", "Git LFS", "CSS grid"], 0),
        match("ec-ce8", "Architecture", "Architecture", [{ left: "MCU", right: "real-time control" }, { left: "SBC", right: "high-level/vision" }, { left: "GCS", right: "operator" }]),
        fill("ec-ce9", "crc16", "crc16", "cpp", "uint16_t c = ___(buf,n);", ["crc16"]),
        mcq("ec-ce10", "State machine SAFE:", "State machine SAFE:", ["failsafe behavior mode", "CSS mode", "SQL mode", "npm script"], 0),
        mcq("ec-ce11", "Bandwidth budget:", "Bandwidth budget:", ["plan rates across msgs", "infinite radio", "no heartbeats", "ban metrics"], 0),
        order("ec-ce12", "Control loop", "Control loop", "cpp", ["read_sensors();", "update_state();", "send_commands();"], ["read_sensors();", "update_state();", "send_commands();"]),
      ]),
    ]),
  );
}
