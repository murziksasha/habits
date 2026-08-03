# 73 — Embedded C++ · MilTech deep track

## Course `embedded_cpp`

Deep track inspired by the structure of commercial «C++ for military tech» syllabi (C++ → Linux/tooling → networking → Qt → ROS 2 → embedded/RTOS → UAV stack → systems). Content is **original** EduForge material (UK + EN). Exercises use existing graders only (no C++ runtime / hardware).

| Unit | Focus |
|------|--------|
| miltech-intro | MilTech context, types/ops/bitmap, loops, event loop |
| memory | Arrays, pointers, struct/enum/union, alignment |
| resources | File I/O, threads, heap, RAII |
| linux-dev | Linux FS, bash, SSH, containers, Git hygiene |
| oop-stl | Classes, virtual, templates, STL, big-O |
| toolchain | Compile stages, CMake, ASan, GTest, clean code |
| networking | OSI, serialization, CRC, UDP/TCP sockets |
| qt-qml | Signals/slots, moc, QML, MVC |
| ros2 | Nodes, topics, services, launch, algorithm separation |
| embedded-rtos | MCU, IRQ, UART/I2C/SPI, FreeRTOS tasks/queues |
| uav-stack | SBC roles, OSS FC stacks, MAVLink, Gazebo/SITL/QGC |
| systems-capstone | Video/gstreamer concepts, crypto basics, PID, telemetry mini-project |

Unit exams ≥70%. Hub: `/embedded-cpp`.

Migration: `0024_embedded_cpp`  
Achievement: `embedded_cpp_start`  
XP weight: `1.1`

## Grading note

Theory + code reading/fill for systems topics (ROS, FreeRTOS, MAVLink, etc.). Capstone is `code_project` with substring checks on C++/README.

**Runnable labs:** selected lessons use `code_run` (client C++ via JSCPP — SPEC 74). Not full clang; no server judge.

## Related

- SPEC 05 courses & content
- SPEC 60 unit exams
- SPEC 71 Express fundamentals (wiring pattern)
