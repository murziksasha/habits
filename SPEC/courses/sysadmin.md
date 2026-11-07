# Sysadmin

Slug: `sysadmin`
Group: skill
Hub: `/courses/sysadmin`
Freemium: the first 5 non-exam lessons in path order.

## What this course is

From a small office to the console: network, backups, Windows desks, bash, permissions, packages, git for configs, systemd, a VPN instead of port forwards, RAID, and recovery.

## Program

### `foundations` — What you are responsible for

- `sa-role` — What a sysadmin owns. The main job of a small-office sysadmin: (5 exercises)
- `sa-hardware` — What fails in an office PC. Disk and memory are different. A full disk means: (5 exercises)
- `sa-boot` — The boot path. Order of a machine coming up (5 exercises)
- `sa-sizes` — Sizes you will read. One byte is: (5 exercises)
- `sa-exam-foundations` — Exam: foundations. Exam. Which is not a small-office sysadmin duty? (6 exercises)

### `soho-network` — Small-office network

- `sa-lan` — LAN, gateway, and DNS. A modem and a router: (5 exercises)
- `sa-dhcp` — DHCP and a static address. DHCP usually gives a host: (5 exercises)
- `sa-wifi` — Office Wi-Fi. 2.4 GHz compared with 5 GHz: (5 exercises)
- `sa-nat` — NAT and port forwarding. NAT on a home router: (5 exercises)
- `sa-exam-network` — Exam: office network. Exam. Gateway and DNS: (6 exercises)

### `soho-care` — Keep the office running

- `sa-accounts` — Accounts. One shared password for the whole office: (5 exercises)
- `sa-updates` — Updates and a restart window. People delay security updates because: (5 exercises)
- `sa-backup` — Backup 3-2-1. The 3-2-1 rule: (5 exercises)
- `sa-runbook` — Printers, shares, UPS, one-page runbook. A one-page runbook contains: (5 exercises)
- `sa-exam-care` — Exam: office care. Exam. 3-2-1 is: (6 exercises)

### `windows-client` — Windows desks

- `sa-win-accounts` — Accounts and UAC. UAC on Windows: (5 exercises)
- `sa-win-updates` — Windows Update and Defender. Microsoft Defender: (5 exercises)
- `sa-win-shares` — Shares and mapped drives. The effective permission on a Windows share: (5 exercises)
- `sa-powershell` — PowerShell twins. List files in PowerShell: (5 exercises)
- `sa-exam-windows` — Exam: Windows desks. Exam. UAC: (6 exercises)

### `shell` — The shell

- `sa-paths` — pwd, ls, cd. An absolute path: (5 exercises)
- `sa-help` — man, --help, history. A short flag list for a command: (5 exercises)
- `sa-globs` — Globs and quotes. A star * in bash: (5 exercises)
- `sa-pipes` — Pipes and redirects. A pipe | : (5 exercises)
- `sa-exam-shell` — Exam: the shell. Exam. cd /var/log works from anywhere because the path is: (6 exercises)

### `files-perms` — Files and permissions

- `sa-file-ops` — mkdir, cp, mv, rm. mkdir -p a/b/c : (5 exercises)
- `sa-find-du` — find, du, df, links. du -sh on a directory : (5 exercises)
- `sa-chmod` — rwx and octal modes. Permission digits: r, w, x are: (5 exercises)
- `sa-sudo` — Owner, chown, sudo. chown ada:staff notes.txt : (5 exercises)
- `sa-exam-files` — Exam: files and permissions. Exam. A safe cleanup: (6 exercises)

### `text-packages` — Text, packages, git

- `sa-readers` — less, head, tail, grep. Read a long file a page at a time: (5 exercises)
- `sa-editors` — Editing without panic. Before editing a config: (5 exercises)
- `sa-apt` — apt update and upgrade. apt update : (5 exercises)
- `sa-etc` — Git for configs. Why git for a sysadmin config or script: (5 exercises)
- `sa-exam-packages` — Exam: text, packages, git. Exam. apt (6 exercises)

### `processes` — Processes and services

- `sa-ps` — ps and top. PID in ps is: (5 exercises)
- `sa-signals` — Signals. SIGTERM (15): (5 exercises)
- `sa-systemctl` — systemctl. systemctl start nginx : (6 exercises)
- `sa-journal` — journalctl. On Ubuntu, the first place for a service log: (5 exercises)
- `sa-exam-processes` — Exam: processes. Exam. The first signal: (6 exercises)

### `net-cli` — Network from the shell

- `sa-ip` — ip addr and ip route. The current command for addresses on Linux: (5 exercises)
- `sa-reach` — ping, ss, DNS, curl. Gateway ping works, the site name does not, and ping 1.1.1.1 works: (5 exercises)
- `sa-ufw` — ufw. Before you enable ufw on a box you reach over SSH: (5 exercises)
- `sa-ssh` — SSH keys. ssh-keygen : (5 exercises)
- `sa-exam-netcli` — Exam: network from the shell. Exam. Who listens on all interfaces? (6 exercises)

### `users-disks-cron` — Users, disks, time

- `sa-users` — adduser, groups, visudo. On Debian/Ubuntu, a new human account: (5 exercises)
- `sa-fstab` — lsblk, fstab, and RAID. lsblk : (8 exercises)
- `sa-cron` — cron and timers. The five cron fields: (5 exercises)
- `sa-diskfull` — The disk is full. Order when space is gone (5 exercises)
- `sa-exam-users` — Exam: users and disks. Exam. Open sudoers with: (7 exercises)

### `harden-recover` — Stay up and get back

- `sa-least` — VPN instead of an open port. The office file share from a laptop in a cafe: (5 exercises)
- `sa-listen` — Where a service listens. ss shows 0.0.0.0:5432 : (5 exercises)
- `sa-restore` — A restore drill. Restore one file without clobbering the live copy (5 exercises)
- `sa-incident` — Incident card. You suspect the machine is no longer yours (5 exercises)
- `sa-exam-harden` — Exam: stay up and get back. Exam. Office files from a cafe: (6 exercises)

### `capstone` — Runbooks

- `sa-day1` — Day one in the office. Day-one checklist (5 exercises)
- `sa-sitedown` — The site is down. Order when the office site does not open (5 exercises)
- `sa-lockout` — Cannot log in. SSH says known_hosts changed: (5 exercises)
- `sa-night-disk` — Disk full at night. Disk full at night (5 exercises)
- `sa-exam-capstone` — Final exam. Exam. The site is silent (6 exercises)

## Depth now

- Units: 12
- Lessons: 60
- Exams: 12
- Free non-exam lessons after the freemium pass: 5
- Exercise types in the seed: code_fill, code_order, code_read, match, mcq

Depth here is the seeded player, not a lab you run on a VM. A lesson covers the point in its bullet. It does not add topics that are absent from that bullet.

## Not in this course

Containers, reverse proxies, Let's Encrypt, and LVM. Those start in devops. This course is the small office, Windows desks, the Linux console, git for config files, systemd, a VPN instead of an open port, and RAID versus backup.
