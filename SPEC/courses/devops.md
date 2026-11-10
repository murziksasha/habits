# DevOps

Slug: `devops`
Group: skill
Hub: `/courses/devops`
Freemium: the first 5 non-exam lessons in path order.

## What this course is

One service, forge-status: the shipped survey (Git through Kubernetes, observability, GitOps, and an error budget), followed by Stay up and On call. AWS stays before Terraform. CI ends at the image; delivery belongs to GitOps. The final SRE capstone follows the six new units.

## Program

## Foundations

### `git-workstation` — Workstation and Git

- `do-ssh` — SSH keys. Where does the private key for the forge-status repo live? (4 exercises)
- `do-git-objects` — Git objects. Match the Git object to what it stores. (4 exercises)
- `do-git-branch` — Branch, PR, rebase. For forge-status in this course, branches work like this: (4 exercises)
- `do-git-hooks` — Hooks and branch protection. The forge-status pre-commit hook should: (4 exercises)
- `do-git-exam` — Check: Git. Exam. Which one is a pointer, not a snapshot of files? (6 exercises)

### `linux-base` — Linux base

- `do-distro` — Distro and FHS. For the forge-status lab VM in this course, pick: (4 exercises)
- `do-users` — Users and sudo. The forge-status service on a host should run as: (4 exercises)
- `do-systemd` — Your own unit. Enable the forge-status unit and see why it failed. (4 exercises)
- `do-lvm` — Packages and an LVM sketch. Add an apt repository like this: (4 exercises)
- `do-linux-exam` — Check: Linux. Exam. A daemon's logs usually live under: (6 exercises)

### `bash` — Bash and automation

- `do-strict` — A strict script. What does the first line change? (4 exercises)
- `do-text` — Text and JSON. Pull the status field from a /health body. (4 exercises)
- `do-cron` — Cron and rotation. */5 * * * * in the forge user's crontab means: (4 exercises)
- `do-metrics` — The metrics script. The forge-status script collects CPU, RAM, and disk. The Telegram token: (4 exercises)
- `do-bash-exam` — Check: Bash. Exam. set -u breaks the script when: (6 exercises)

### `networks` — Networks

- `do-tcp` — TCP and addresses. The three steps that open a TCP connection: (4 exercises)
- `do-dns` — DNS records. Match the record to its meaning. (4 exercises)
- `do-tls` — TLS and diagnosis. A self-signed certificate on the lab reverse proxy: (4 exercises)
- `do-nginx` — Proxy and firewall. Where does Nginx send a request for / ? (4 exercises)
- `do-net-exam` — Check: networks. Exam. A TCP port identifies: (6 exercises)

### `python-ops` — Python for ops

- `do-yaml` — Files and YAML. The forge-status CLI reads a list of local directories from YAML. Why pathlib? (4 exercises)
- `do-retry` — HTTP with retry. The client polls a neighbour's /health. A retry makes sense for: (4 exercises)
- `do-subprocess` — Processes and venv. Call subprocess.run for df like this: (4 exercises)
- `do-pytest` — Testing the CLI. The inventory test does not call AWS. It: (4 exercises)
- `do-py-exam` — Check: Python. Exam. An f-string versus concatenation for a log line: (6 exercises)

## Ship an image

### `containers` — Containers

- `do-image` — Image and process. The forge-status container differs from a VM because: (4 exercises)
- `do-dockerfile` — Multi-stage forge-status. What lands in the final image? (4 exercises)
- `do-compose` — Compose and healthcheck. depends_on without a healthcheck means: (4 exercises)
- `do-scan` — Non-root and the scan. USER nginx in the final image: (4 exercises)
- `do-docker-exam` — Check: Docker. Exam. The layer cache breaks when: (6 exercises)

### `aws-survival` — AWS without a surprise bill

- `do-iam` — IAM and least privilege. A person and a program enter AWS differently: (4 exercises)
- `do-vpc` — VPC and security groups. A public subnet differs from a private one because: (4 exercises)
- `do-s3` — EC2 and S3. forge-status on a single EC2 in this unit is: (4 exercises)
- `do-budget` — Budget and teardown. Day one in AWS for this course: (4 exercises)
- `do-aws-exam` — Check: AWS. Exam. An access key inside the forge-status repo: (6 exercises)

### `iac` — Terraform and Ansible

- `do-hcl` — HCL and plan. Terraform for the forge-status VPC describes: (4 exercises)
- `do-modules` — Modules. The vpc module in the forge-status repo: (4 exercises)
- `do-state` — State and the lock. The terraform.tfstate file: (4 exercises)
- `do-ansible` — One Ansible layer. After Terraform has created the EC2, Ansible in this course: (4 exercises)
- `do-iac-exam` — Check: IaC. Exam. Two applies at once without a lock: (6 exercises)

### `ci` — CI through the image

- `do-cicd` — Three different words. For forge-status this unit ends like this: (4 exercises)
- `do-gha` — GitHub Actions through the push. Where does this workflow stop? (4 exercises)
- `do-oidc` — OIDC instead of a long-lived key. Why does OIDC beat a long-lived cloud key in GitHub Actions? (4 exercises)
- `do-jenkins` — GitLab and Jenkins, a survey. You should recognise GitLab CI in this lesson by: (4 exercises)
- `do-ci-exam` — Check: CI. Exam. After a green forge-status workflow you have: (6 exercises)

## Run it

### `kubernetes` — Kubernetes

- `do-cp` — Control plane. Who does what in the cluster. (4 exercises)
- `do-probes` — Pods and the readiness probe. Why does forge-status need a readiness probe when liveness already exists? (4 exercises)
- `do-ingress` — Service, Ingress, Helm. ClusterIP for the forge-status api: (4 exercises)
- `do-rbac` — Rights, limits, maintenance. requests and limits on api: (4 exercises)
- `do-k8s-exam` — Check: Kubernetes. Exam. A pod with no readiness probe and a broken /health: (6 exercises)

### `observability` — Observability

- `do-golden` — Four signals. Golden signals for forge-status. (4 exercises)
- `do-prom` — Prometheus and the alert. Prometheus collects metrics like this: (4 exercises)
- `do-loki` — Logs. A forge-status log line should be: (4 exercises)
- `do-otel` — One trace. A trace of a request to forge-status is: (4 exercises)
- `do-obs-exam` — Check: observability. Exam. rate on a CPU gauge: (6 exercises)

### `devsecops-gitops` — DevSecOps and GitOps

- `do-shift` — Checks before the merge. Which tool catches what. (4 exercises)
- `do-cosign` — Signature and SBOM. Why cosign the forge-status image? (4 exercises)
- `do-vault` — Secrets. The forge-status database password does not sit in values.yaml in clear text. Prefer: (4 exercises)
- `do-argo` — Argo CD and rollback. Why does Argo CD deliver forge-status instead of a CI step? (4 exercises)
- `do-sec-exam` — Check: delivery. Exam. The GitOps pull model means: (6 exercises)

## Stay up / Тримати сервіс

### `k8s-workloads` — Workloads that stay up

- `do-w-config` — ConfigMap, Secret, and env; the database URL stays out of the image.
- `do-w-roll` — maxUnavailable, maxSurge, and rollout undo; stop a bad digest before replacing every pod.
- `do-w-probes` — Startup allows slow initialization; readiness removes traffic; liveness restarts a stuck process.
- `do-w-qos` — Requests, limits, Guaranteed / Burstable / BestEffort, and OOMKilled.
- `do-w-hpa` — CPU HPA; custom metrics are names, with no scale-to-zero.
- `do-w-pdb` — PDB, drain, and disk-pressure eviction; voluntary and involuntary disruptions differ.
- `do-w-exam` — A rollout never becomes ready: order the checks.

### `traffic-identity` — Traffic and identity

- `do-edge-svc` — ClusterIP, NodePort, LoadBalancer, and the load balancer bill.
- `do-edge-ingress` — Host and path to forge-status; recognize Gateway API by name.
- `do-edge-netpol` — Default deny and ingress-namespace allowance with NetworkPolicy.
- `do-edge-sa` — A dedicated API ServiceAccount with least privilege.
- `do-edge-tls` — cert-manager, Let's Encrypt, the public name, and renewal; do-tls keeps the self-signed lab proxy.
- `do-edge-quota` — Namespace per environment, ResourceQuota, and LimitRange defaults and bounds.
- `do-edge-exam` — The public name fails TLS: select the first check.

### `gitops-delivery` — Delivery that CI does not do

- `do-del-env` — lab, stage, and prod Helm values with the same image digest.
- `do-del-digest` — Promote a digest without rebuilding; a tag can move.
- `do-del-app` — Argo CD Application: desired Git state, live cluster state, and sync.
- `do-del-drift` — Prune, self-heal, and hand edits as drift.
- `do-del-undo` — Application rollback versus git revert of desired state.
- `do-del-gate` — A person syncs prod; keep OIDC and avoid long-lived cloud keys.
- `do-del-exam` — CI is green while users still see the old digest.

## On call / На зміні

### `data-plane` — The database under the service

- `do-data-place` — Managed Postgres or StatefulSet, never a production API sidecar.
- `do-data-migrate` — Expand then contract; do not drop a column on container startup.
- `do-data-backup` — Snapshots, PITR, and restore onto an isolated copy.
- `do-data-pool` — Connection counts, PgBouncer, and HPA exhausting the database.
- `do-data-rpo` — RPO and RTO in minutes using the previous backup and restore measurements.
- `do-data-dsn` — External Secrets or SOPS for the DSN, never clear text in values.yaml.
- `do-data-exam` — A backup exists but nobody has restored it.

### `alerts-runbooks` — Pages a human can answer

- `do-alert-symptom` — Page on 5xx and latency; CPU is a possible cause.
- `do-alert-burn` — Fast and slow error-budget burn rate, with one rate() reminder.
- `do-alert-use` — Node USE and API RED under do-golden's golden signals.
- `do-alert-labels` — Filterable Loki logs with service, env, and trace id.
- `do-alert-trace` — API-to-database trace; a missing span leaves an evidence gap.
- `do-alert-book` — An alert links an actionable runbook; no-action alerts are noise.
- `do-alert-exam` — A CPU gauge pages someone at 03:00.

### `incident-drills` — Nights on forge-status

Each teaching lesson opens with a bilingual comprehension timeline and then orders the response. No blame or exploit instructions.

- `do-drill-cert` — Expired certificate after failed renewal.
- `do-drill-digest` — A moved tag on a workload not pinned to a digest.
- `do-drill-disk` — Disk pressure, eviction, and container logs filling a node.
- `do-drill-5xx` — 5xx after a new digest with readiness arriving late.
- `do-drill-secret` — Rotated secret with old env in running pods.
- `do-drill-write` — Timeline, user impact, and action items with owners and dates.
- `do-drill-exam` — First checks; reject restart-everything responses.

### `sre-capstone` — SRE and the capstone

- `do-slo` — The error budget. The forge-status SLO is 99% successful requests over 30 days. What is the error budget? (4 exercises)
- `do-incident` — Incident and the write-up. During a forge-status outage, first: (4 exercises)
- `do-dr` — Recovery and money. RPO and RTO for the forge-status database: (4 exercises)
- `do-path` — The whole forge-status path, including digest promotion and a restore drill. (4 exercises)
- `do-cap-exam` — Capstone: forge-status. The outage chain, digest promotion, and recovery verification. (8 exercises)

## Depth now

- Units: 19
- Lessons: 107
- Exams: 19 (70% pass threshold)
- Free non-exam lessons after the freemium pass: 5
- Exercise types in the seed: code_fill, code_order, code_output, code_read, comprehension, match, mcq

The original survey teaching lessons retain 4 exercises. Each of the 36 new teaching lessons has 6 exercises, at most 2 MCQs, and includes reading/output, filling/ordering, and matching/comprehension. Each new exam has 8 exercises including at least 2 code_order and 2 code_read items. The other survey exams retain 6 questions; the final capstone has 8. New lessons are paid. The first 5 non-exam lessons remain free.

Depth here is the seeded player, not a lab you run on a VM. A lesson covers the point in its bullet. It does not add topics that are absent from that bullet.

## Progress and review

The course page groups units into Foundations, Ship an image, Run it, Stay up, and On call without changing global unit numbering. Completing `do-k8s-exam`, `do-del-exam`, or `do-drill-exam` unlocks `devops_cluster`, `devops_gitops`, or `devops_oncall` respectively (20 XP each). `devops_start` and the 6-lesson `path_devops` character path stay unchanged.

The `devops-forge-status` deck grows from 16 to 30 cards. Re-seeding appends missing fronts on that deck while retaining existing card content, IDs, and review progress; other populated decks keep the empty-deck seed behavior.

## Not in this course

Writing Go, a Jenkinsfile, Terragrunt, service-mesh internals, multi-region systems, Kafka, scale-to-zero, or Gateway API as a lab. Live VM, cloud consoles, and a terminal are not in the player. SOHO Windows desks and RAID depth stay in sysadmin. The CI unit stops when the image is pushed. Delivery starts in devsecops-gitops and deepens in Stay up; On call follows it on the same course page.
