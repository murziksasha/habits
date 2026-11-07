# DevOps

Slug: `devops`
Group: skill
Hub: `/courses/devops`
Freemium: the first 5 non-exam lessons in path order.

## What this course is

One service, forge-status: Git, Linux, bash, the network, Python, containers, AWS before Terraform, CI through the image, Kubernetes, observability, GitOps, and an error budget.

## Program

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

### `sre-capstone` — SRE and the capstone

- `do-slo` — The error budget. The forge-status SLO is 99% successful requests over 30 days. What is the error budget? (4 exercises)
- `do-incident` — Incident and the write-up. During a forge-status outage, first: (4 exercises)
- `do-dr` — Recovery and money. RPO and RTO for the forge-status database: (4 exercises)
- `do-path` — The whole forge-status path. From an empty directory to an alert. The whole course as one chain. (4 exercises)
- `do-cap-exam` — Capstone: forge-status. Exam. The night 5xx climbed right after a new tag. (6 exercises)

## Depth now

- Units: 13
- Lessons: 65
- Exams: 13
- Free non-exam lessons after the freemium pass: 5
- Exercise types in the seed: code_fill, code_order, code_output, code_read, match, mcq

Depth here is the seeded player, not a lab you run on a VM. A lesson covers the point in its bullet. It does not add topics that are absent from that bullet.

## Not in this course

Writing Go, a Jenkinsfile, Terragrunt, and service-mesh internals. Live VM and cloud consoles are not in the player. SOHO Windows desks and RAID depth stay in sysadmin. The CI unit stops when the image is pushed. Delivery starts in devsecops-gitops.
