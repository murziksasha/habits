# DevOps

Slug: `devops`
Group: skill
Hub: `/courses/devops`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `sysadmin`, `express_fundamentals`, `postgresql_apps`, `software_testing`
Recommended next: `applied_algorithms`

## What this course is

One service, forge-status: a Git-to-Kubernetes survey, then Stay up and On call. AWS before Terraform; CI ends at the image. GitOps delivery, database recovery, and incidents.

## Local ForgeBoard Labs

- **Milestone 13 (`forgeboard-m13-devops` v1.0.0)** on lesson `do-forgeboard-delivery-lab` — `/labs/forgeboard-m13-devops-v1.0.0.zip` (`assessmentMode: "local_practice"`, runtime: Node >= 20, pnpm >= 9 (локальна перевірка конфігурації; опційно Docker))

## Program

### `git-workstation` — Workstation and Git

- `do-ssh` — SSH keys [free] (4 exercises)
- `do-git-objects` — Git objects [free] (4 exercises)
- `do-git-branch` — Branch, PR, rebase [free] (4 exercises)
- `do-git-hooks` — Hooks and branch protection [free] (4 exercises)
- `do-git-exam` — Check: Git [exam] (6 exercises)

### `linux-base` — Linux base

- `do-distro` — Distro and FHS [free] (4 exercises)
- `do-users` — Users and sudo (4 exercises)
- `do-systemd` — Your own unit (4 exercises)
- `do-lvm` — Packages and an LVM sketch (4 exercises)
- `do-linux-exam` — Check: Linux [exam] (6 exercises)

### `bash` — Bash and automation

- `do-strict` — A strict script (4 exercises)
- `do-text` — Text and JSON (4 exercises)
- `do-cron` — Cron and rotation (4 exercises)
- `do-metrics` — The metrics script (4 exercises)
- `do-bash-exam` — Check: Bash [exam] (6 exercises)

### `networks` — Networks

- `do-tcp` — TCP and addresses (4 exercises)
- `do-dns` — DNS records (4 exercises)
- `do-tls` — TLS and diagnosis (4 exercises)
- `do-nginx` — Proxy and firewall (4 exercises)
- `do-net-exam` — Check: networks [exam] (6 exercises)

### `python-ops` — Python for ops

- `do-yaml` — Files and YAML (4 exercises)
- `do-retry` — HTTP with retry (4 exercises)
- `do-subprocess` — Processes and venv (4 exercises)
- `do-pytest` — Testing the CLI (4 exercises)
- `do-py-exam` — Check: Python [exam] (6 exercises)

### `containers` — Containers

- `do-image` — Image and process (4 exercises)
- `do-dockerfile` — Multi-stage forge-status (4 exercises)
- `do-compose` — Compose and healthcheck (4 exercises)
- `do-scan` — Non-root and the scan (4 exercises)
- `do-docker-exam` — Check: Docker [exam] (6 exercises)

### `aws-survival` — AWS without a surprise bill

- `do-iam` — IAM and least privilege (4 exercises)
- `do-vpc` — VPC and security groups (4 exercises)
- `do-s3` — EC2 and S3 (4 exercises)
- `do-budget` — Budget and teardown (4 exercises)
- `do-aws-exam` — Check: AWS [exam] (6 exercises)

### `iac` — Terraform and Ansible

- `do-hcl` — HCL and plan (4 exercises)
- `do-modules` — Modules (4 exercises)
- `do-state` — State and the lock (4 exercises)
- `do-ansible` — One Ansible layer (4 exercises)
- `do-iac-exam` — Check: IaC [exam] (6 exercises)

### `ci` — CI through the image

- `do-cicd` — Three different words (4 exercises)
- `do-gha` — GitHub Actions through the push (4 exercises)
- `do-oidc` — OIDC instead of a long-lived key (4 exercises)
- `do-jenkins` — GitLab and Jenkins, a survey (4 exercises)
- `do-ci-exam` — Check: CI [exam] (6 exercises)

### `kubernetes` — Kubernetes

- `do-cp` — Control plane (4 exercises)
- `do-probes` — Pods and the readiness probe (4 exercises)
- `do-ingress` — Service, Ingress, Helm (4 exercises)
- `do-rbac` — Rights, limits, maintenance (4 exercises)
- `do-k8s-exam` — Check: Kubernetes [exam] (6 exercises)

### `observability` — Observability

- `do-golden` — Four signals (4 exercises)
- `do-prom` — Prometheus and the alert (4 exercises)
- `do-loki` — Logs (4 exercises)
- `do-otel` — One trace (4 exercises)
- `do-obs-exam` — Check: observability [exam] (6 exercises)

### `devsecops-gitops` — DevSecOps and GitOps

- `do-shift` — Checks before the merge (4 exercises)
- `do-cosign` — Signature and SBOM (4 exercises)
- `do-vault` — Secrets (4 exercises)
- `do-argo` — Argo CD and rollback (4 exercises)
- `do-sec-exam` — Check: delivery [exam] (6 exercises)

### `k8s-workloads` — Workloads that stay up

- `do-w-config` — Configuration outside the image (6 exercises)
- `do-w-roll` — Verify a rolling update (6 exercises)
- `do-w-probes` — Startup, readiness, liveness (6 exercises)
- `do-w-qos` — Requests, limits and QoS (6 exercises)
- `do-w-hpa` — CPU HPA and scaling bounds (6 exercises)
- `do-w-pdb` — Drain, PDB and diagnosis (6 exercises)
- `do-w-exam` — Check: Kubernetes workloads [exam] (8 exercises)

### `traffic-identity` — Traffic and identity

- `do-edge-svc` — Services and the ingress bill (6 exercises)
- `do-edge-ingress` — Host and path to the API (6 exercises)
- `do-edge-netpol` — Default deny with required ingress (6 exercises)
- `do-edge-sa` — A dedicated API identity (6 exercises)
- `do-edge-tls` — Public names and TLS renewal (6 exercises)
- `do-edge-quota` — Environment bounds in namespaces (6 exercises)
- `do-edge-exam` — Check: the public entry point [exam] (8 exercises)

### `gitops-delivery` — Delivery that CI does not do

- `do-del-env` — Three environments, one artifact (6 exercises)
- `do-del-digest` — Promote a digest without rebuilding (6 exercises)
- `do-del-app` — Application: Git and the live cluster (6 exercises)
- `do-del-drift` — Hand edits, self-heal and prune (6 exercises)
- `do-del-undo` — Application rollback and git revert (6 exercises)
- `do-del-gate` — A person syncs prod (6 exercises)
- `do-del-exam` — Check: green CI, old version [exam] (8 exercises)

### `data-plane` — The database under the service

- `do-data-place` — Where Postgres lives (6 exercises)
- `do-data-migrate` — Expand before contract (6 exercises)
- `do-data-backup` — Snapshots, PITR, and copy validation (6 exercises)
- `do-data-pool` — HPA, connections, and PgBouncer (6 exercises)
- `do-data-rpo` — RPO and RTO in minutes (6 exercises)
- `do-data-dsn` — DSNs through External Secrets or SOPS (6 exercises)
- `do-data-exam` — Exam: the never-restored backup [exam] (8 exercises)

### `alerts-runbooks` — Pages a human can answer

- `do-alert-symptom` — The user-visible symptom (6 exercises)
- `do-alert-burn` — Fast and slow budget burn (6 exercises)
- `do-alert-use` — Node USE and API RED (6 exercises)
- `do-alert-labels` — Loki: service, environment, trace ID (6 exercises)
- `do-alert-trace` — From API to database and a missing span (6 exercises)
- `do-alert-book` — A runbook with a next action (6 exercises)
- `do-alert-exam` — Exam: the 03:00 CPU page [exam] (8 exercises)

### `incident-drills` — Nights on forge-status

- `do-drill-cert` — Expired certificate after failed renewal (6 exercises)
- `do-drill-digest` — Moved tag, unpinned digest (6 exercises)
- `do-drill-disk` — Disk pressure, logs, and eviction (6 exercises)
- `do-drill-5xx` — New digest and late readiness (6 exercises)
- `do-drill-secret` — Rotated secret, stale environment (6 exercises)
- `do-drill-write` — Timeline, impact, and actions (6 exercises)
- `do-drill-exam` — Exam: check first [exam] (8 exercises)

### `sre-capstone` — SRE and the capstone

- `do-slo` — The error budget (4 exercises)
- `do-incident` — Incident and the write-up (4 exercises)
- `do-dr` — Recovery and money (4 exercises)
- `do-path` — The whole forge-status path (4 exercises)
- `do-forgeboard-delivery-lab` — Lab: ForgeBoard deploy & recovery (4 exercises)
- `do-cap-exam` — Capstone: forge-status [exam] (8 exercises)

## Depth now

- Units: 19
- Lessons: 108
- Exams: 19
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_output, code_read, comprehension, match, mcq

