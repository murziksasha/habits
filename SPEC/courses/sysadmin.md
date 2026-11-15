# Sysadmin

Slug: `sysadmin`
Group: skill
Hub: `/courses/sysadmin`
Freemium: first 5 non-exam lesson(s) open without Pro.
Recommended next: `devops`

## What this course is

From a small office to the console: network, backups, Windows desks, bash, permissions, packages, git for configs, systemd, a VPN instead of port forwards, RAID, and recovery.

## Program

### `foundations` — What you are responsible for

- `sa-role` — What a sysadmin owns [free] (5 exercises)
- `sa-hardware` — What fails in an office PC [free] (5 exercises)
- `sa-boot` — The boot path [free] (5 exercises)
- `sa-sizes` — Sizes you will read [free] (5 exercises)
- `sa-exam-foundations` — Exam: foundations [exam] (6 exercises)

### `soho-network` — Small-office network

- `sa-lan` — LAN, gateway, and DNS [free] (5 exercises)
- `sa-dhcp` — DHCP and a static address (5 exercises)
- `sa-wifi` — Office Wi-Fi (5 exercises)
- `sa-nat` — NAT and port forwarding (5 exercises)
- `sa-exam-network` — Exam: office network [exam] (6 exercises)

### `soho-care` — Keep the office running

- `sa-accounts` — Accounts (5 exercises)
- `sa-updates` — Updates and a restart window (5 exercises)
- `sa-backup` — Backup 3-2-1 (5 exercises)
- `sa-runbook` — Printers, shares, UPS, one-page runbook (5 exercises)
- `sa-exam-care` — Exam: office care [exam] (6 exercises)

### `windows-client` — Windows desks

- `sa-win-accounts` — Accounts and UAC (5 exercises)
- `sa-win-updates` — Windows Update and Defender (5 exercises)
- `sa-win-shares` — Shares and mapped drives (5 exercises)
- `sa-powershell` — PowerShell twins (5 exercises)
- `sa-exam-windows` — Exam: Windows desks [exam] (6 exercises)

### `shell` — The shell

- `sa-paths` — pwd, ls, cd (5 exercises)
- `sa-help` — man, --help, history (5 exercises)
- `sa-globs` — Globs and quotes (5 exercises)
- `sa-pipes` — Pipes and redirects (5 exercises)
- `sa-exam-shell` — Exam: the shell [exam] (6 exercises)

### `files-perms` — Files and permissions

- `sa-file-ops` — mkdir, cp, mv, rm (5 exercises)
- `sa-find-du` — find, du, df, links (5 exercises)
- `sa-chmod` — rwx and octal modes (5 exercises)
- `sa-sudo` — Owner, chown, sudo (5 exercises)
- `sa-exam-files` — Exam: files and permissions [exam] (6 exercises)

### `text-packages` — Text, packages, git

- `sa-readers` — less, head, tail, grep (5 exercises)
- `sa-editors` — Editing without panic (5 exercises)
- `sa-apt` — apt update and upgrade (5 exercises)
- `sa-etc` — Git for configs (5 exercises)
- `sa-exam-packages` — Exam: text, packages, git [exam] (6 exercises)

### `processes` — Processes and services

- `sa-ps` — ps and top (5 exercises)
- `sa-signals` — Signals (5 exercises)
- `sa-systemctl` — systemctl (6 exercises)
- `sa-journal` — journalctl (5 exercises)
- `sa-exam-processes` — Exam: processes [exam] (6 exercises)

### `net-cli` — Network from the shell

- `sa-ip` — ip addr and ip route (5 exercises)
- `sa-reach` — ping, ss, DNS, curl (5 exercises)
- `sa-ufw` — ufw (5 exercises)
- `sa-ssh` — SSH keys (5 exercises)
- `sa-exam-netcli` — Exam: network from the shell [exam] (6 exercises)

### `users-disks-cron` — Users, disks, time

- `sa-users` — adduser, groups, visudo (5 exercises)
- `sa-fstab` — lsblk, fstab, and RAID (8 exercises)
- `sa-cron` — cron and timers (5 exercises)
- `sa-diskfull` — The disk is full (5 exercises)
- `sa-exam-users` — Exam: users and disks [exam] (7 exercises)

### `harden-recover` — Stay up and get back

- `sa-least` — VPN instead of an open port (5 exercises)
- `sa-listen` — Where a service listens (5 exercises)
- `sa-restore` — A restore drill (5 exercises)
- `sa-incident` — Incident card (5 exercises)
- `sa-exam-harden` — Exam: stay up and get back [exam] (6 exercises)

### `local_troubleshooting` — Local Troubleshooting Labs

- `sa-lt-ports-procs` — Ports, Processes & EADDRINUSE (3 exercises)
- `sa-lt-perms-logs` — File Permissions, .env & Systemd Logs (3 exercises)
- `sa-lt-backup-recovery` — Backup & Local Recovery Verification (2 exercises)
- `sa-lt-exam` — Checkpoint: Local Troubleshooting [exam] (6 exercises)

### `capstone` — Runbooks

- `sa-day1` — Day one in the office (5 exercises)
- `sa-sitedown` — The site is down (5 exercises)
- `sa-lockout` — Cannot log in (5 exercises)
- `sa-night-disk` — Disk full at night (5 exercises)
- `sa-exam-capstone` — Final exam [exam] (6 exercises)

## Depth now

- Units: 16
- Lessons: 76
- Exams: 16
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_read, match, mcq

## Expansion (Nov 2026)

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `backups_verify` — Backups you can actually restore (4 lessons including exam)
- `containers_home` — Containers at home: Podman, rootless, systemd (4 lessons including exam)
- `observability_home` — Home observability: journals, rotation, and metrics (4 lessons including exam)
