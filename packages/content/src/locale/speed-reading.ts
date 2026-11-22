import type { ExerciseLocaleEnrichment } from "./types.js";

export const SPEED_READING_LOCALE_ENRICHMENT: Record<string, ExerciseLocaleEnrichment> = {
  "sr-ac-1": {
    optionsEn: [
      "a claim is a thesis; evidence is the facts or data supporting it",
      "they are synonyms",
      "evidence is always just the author's opinion",
      "claims can never be verified",
    ],
  },
  "sr-ac-3": {
    passageEn: "Teams that document concise architectural decision records (ADRs) less frequently re-hash the same arguments. An internal study of one engineering organization's retrospectives revealed that after introducing one-page ADRs, duplicate debates regarding tech stack choices decreased significantly. This does not prove ADRs will work universally in every context, but provides solid grounds to pilot them in similar organizations.",
    questionsEn: [
      {
        qEn: "What is the main claim?",
        optionsEn: [
          "Teams documenting short written decisions re-hash arguments less frequently",
          "ADRs work universally in every company without exception",
          "Retrospectives are harmful to software teams",
          "Tech stacks should be overhauled every quarter",
        ],
      },
      {
        qEn: "What is the evidence?",
        optionsEn: [
          "Retrospective data from one organization following ADR introduction",
          "A universal truth without any cited source",
          "A quotation from a celebrity developer",
          "Personal attacks against opponents",
        ],
      },
      {
        qEn: "What limitation does the author acknowledge?",
        optionsEn: [
          "It does not prove that ADRs work universally in all situations",
          "ADRs are strictly prohibited in regulated industries",
          "There was too much data to analyze",
          "The organization did not actually exist",
        ],
      },
    ],
  },
  "sr-ah-1": {
    optionsEn: [
      "they qualify the claim's strength and mitigate the risk of overgeneralization",
      "they always weaken writing and should be stripped",
      "they are filler words without semantic value",
      "they serve as replacement for factual evidence",
    ],
  },
  "sr-ah-3": {
    passageEn: "A weekly review of error budgets may surface regressions earlier than a monthly report. One platform team's dashboard suggested that budget burn over two days typically preceded a user-visible incident. This pattern might not hold for batch workloads, so treat it as a hypothesis to test, not a universal rule.",
    questionsEn: [
      {
        qEn: "How strong is the first sentence?",
        optionsEn: [
          "Hedging/qualified: 'may', not an absolute 'will always'",
          "Absolute: guaranteed everywhere and at all times",
          "An imperative command without exceptions",
          "Humorous or satirical",
        ],
      },
      {
        qEn: "For which workloads does the author express doubt?",
        optionsEn: [
          "Batch workloads",
          "All workloads without exception",
          "Only mobile applications",
          "Only video games",
        ],
      },
      {
        qEn: "How should the pattern be treated?",
        optionsEn: [
          "As a testable hypothesis, not a universal law",
          "As an invariant law of physics",
          "As grounds to immediately disband the team",
          "As proof that dashboards are unnecessary",
        ],
      },
    ],
  },
  "sr-aa-1": {
    optionsEn: [
      "an unstated premise without which the conclusion does not follow",
      "a footnote citation at the bottom of the page",
      "the header title of a section",
      "the font styling of the text",
    ],
  },
  "sr-aa-3": {
    passageEn: "We doubled the number of software engineers, therefore the next product release will arrive twice as fast. Before celebrating, identify the unstated premise: that software delivery scales linearly with headcount without coordination overhead or communication bottlenecks.",
    questionsEn: [
      {
        qEn: "Which assumption sits behind the conclusion?",
        optionsEn: [
          "Productivity scales linearly with headcount without coordination overhead",
          "Engineers work without any compensation",
          "Computers run twice as fast with more people in the office",
          "The release was already shipped last year",
        ],
      },
      {
        qEn: "Why is that assumption worth checking?",
        optionsEn: [
          "Communication overhead often slows teams down (Brooks's Law)",
          "Headcount has zero impact on budget",
          "Doubling headcount is impossible in software",
          "Engineers refuse to write code in pairs",
        ],
      },
    ],
  },
  "sr-aco-1": {
    optionsEn: [
      "to precisely delimit where the findings have not yet been evaluated",
      "to obfuscate the central thesis of the paper",
      "it is an unequivocal sign of weakness in research",
      "to pad the document's total word count",
    ],
  },
  "sr-aco-3": {
    passageEn: "A read-through cache dropped p95 catalog response latency from 800ms to 120ms for read-heavy browsing. However, under high write spikes with frequent price changes, cache invalidation storms saturated the CPU. Do not generalize this read optimization to write-heavy order processing.",
    questionsEn: [
      {
        qEn: "Where is the result clearly established?",
        optionsEn: [
          "For read-heavy catalog browsing traffic",
          "For high-volume write transaction workloads",
          "For database schema migrations",
          "For client-side offline single-page apps",
        ],
      },
      {
        qEn: "What does the author not recommend?",
        optionsEn: [
          "Applying this caching architecture to write-intensive ordering pipelines",
          "Monitoring p95 latency in production",
          "Documenting system bottlenecks",
          "Using caching for catalog browsing",
        ],
      },
    ],
  },
  "sr-ar-1": {
    optionsEn: [
      "thesis → evidence → assumptions → limitations",
      "reject the conclusion immediately and skip the text",
      "count the number of adjectives in each paragraph",
      "focus solely on typographical errors",
    ],
  },
  "sr-ar-3": {
    passageEn: "Open source licenses are not interchangeable. A team that incorporates a copyleft library into a proprietary SaaS codebase without review risks mandatory license disclosure obligations. Before adding a dependency, inspect both permissions and reciprocal requirements.",
    questionsEn: [
      {
        qEn: "The main claim of the first sentence:",
        optionsEn: [
          "Open source licenses possess distinct legal obligations and are not equivalent",
          "All open source software is completely free of restrictions",
          "Proprietary software is illegal",
          "Licenses have no legal effect on web services",
        ],
      },
      {
        qEn: "What is the practical takeaway?",
        optionsEn: [
          "Review both granted permissions and reciprocal conditions before adopting dependencies",
          "Never use open source software under any circumstances",
          "Avoid reading software license texts",
          "Rewrite all third-party libraries from scratch",
        ],
      },
    ],
  },
  "sr-as-1": {
    optionsEn: [
      "why it was done, methodology, key findings, and boundaries/limits",
      "only author name and publication city",
      "promotional marketing slogan without methodology",
      "the raw text of all appendix tables",
    ],
  },
  "sr-as-3": {
    passageEn: "Objective: evaluate whether 10-minute daily speed-reading drills improve reading comprehension in engineering students. Method: randomized trial with 40 participants across 4 weeks. Findings: comprehension remained steady while reading pace increased by 28%. Caveat: drills were tested only on technical documentation.",
    questionsEn: [
      {
        qEn: "What was the method?",
        optionsEn: [
          "A 4-week randomized trial with 40 participants",
          "An informal online survey with 5 respondents",
          "A laboratory study on mice",
          "A historical analysis of 19th-century literature",
        ],
      },
      {
        qEn: "Where should you not generalise the result without a caveat?",
        optionsEn: [
          "Outside technical documentation (e.g. poetry or legal contracts)",
          "To computer screens",
          "To readers who speak English",
          "To daily reading habits",
        ],
      },
    ],
  },
  "sr-am-1": {
    optionsEn: [
      "you need to know sample size, control groups, and exact metrics",
      "article headlines are always deliberately false",
      "methodology sections are forbidden to read",
      "outcomes can never be objectively measured",
    ],
  },
  "sr-am-3": {
    passageEn: "We compared two onboarding checklists within a single company. Team Alpha used an interactive checklist; Team Beta used a wiki document. Team Alpha completed setup 3 days faster. However, Team Alpha also received dedicated senior mentoring, confounding the checklist format effect.",
    questionsEn: [
      {
        qEn: "What is the outcome measure?",
        optionsEn: [
          "Days required to complete onboarding setup",
          "Number of git commits pushed to production",
          "Lines of documentation written per day",
          "Annual employee turnover rate",
        ],
      },
      {
        qEn: "Which factor remains a confounder?",
        optionsEn: [
          "Team Alpha received dedicated senior mentorship alongside the checklist",
          "Team Beta used faster laptops",
          "Team Alpha worked exclusively on weekends",
          "The company changed headquarters mid-study",
        ],
      },
    ],
  },
  "sr-al-1": {
    optionsEn: [
      "how far the conclusions can be generalized to other populations or settings",
      "the spelling precision inside the document",
      "the speed of downloading the PDF file",
      "the author's academic degree title",
    ],
  },
  "sr-al-3": {
    passageEn: "Our team reduced API error rates by 40% after adopting strict TypeScript interfaces. Our engineers were already experienced TypeScript developers working on a greenfield backend. These results may not transfer directly to a legacy JavaScript codebase with junior developers.",
    questionsEn: [
      {
        qEn: "What is distinctive about the sample?",
        optionsEn: [
          "Experienced TypeScript developers building a greenfield service",
          "First-time programmers working on mainframe code",
          "Freelance designers writing CSS stylesheets",
          "Database administrators tuning SQL queries",
        ],
      },
      {
        qEn: "Where does the author doubt transfer?",
        optionsEn: [
          "Legacy codebases maintained by junior developers",
          "Microservices running in Docker containers",
          "Web applications written in English",
          "Projects using version control",
        ],
      },
    ],
  },
  "sr-an-1": {
    optionsEn: [
      "a 1000% increase on 0.001% is still practically tiny (0.01%)",
      "percentage changes are always more meaningful than absolute numbers",
      "relative numbers can never be computed accurately",
      "percentages are only used in retail advertising",
    ],
  },
  "sr-an-3": {
    passageEn: "Incident frequency dropped by 50% year-over-year. In absolute numbers, incidents fell from 2 per year to 1 per year across 50 production microservices. While statistically valid, this represents a low baseline where a single outage next year would double the rate.",
    questionsEn: [
      {
        qEn: "What is the baseline?",
        optionsEn: [
          "Very low baseline: 2 incidents per year across 50 services",
          "Thousands of outages occurring daily",
          "Zero historic incidents",
          "Unmeasured customer complaints",
        ],
      },
      {
        qEn: "What does the author distinguish from formal significance?",
        optionsEn: [
          "Practical significance given the small absolute sample size",
          "The validity of basic arithmetic",
          "The need to run automated backups",
          "The color palette of monitoring dashboards",
        ],
      },
    ],
  },
  "sr-arv-1": {
    optionsEn: [
      "claim, evidence, sample/method, and explicit limitations",
      "only the paper title and abstract keywords",
      "font size, margins, and page numbering",
      "author biography and social media links",
    ],
  },
  "sr-arv-3": {
    passageEn: "When reading research for production architecture decisions, extract four pillars: the core claim, supporting empirical evidence, experimental methodology and sample boundaries, and explicit caveats acknowledged by the authors.",
    questionsEn: [
      {
        qEn: "Which four elements?",
        optionsEn: [
          "Claim, evidence, methodology/sample, and explicit limitations",
          "Title, subtitle, copyright notice, and price",
          "Author name, affiliation, email, and social handle",
          "Introduction, conclusion, index, and bibliography only",
        ],
      },
      {
        qEn: "What if they are missing?",
        optionsEn: [
          "Treat the claim with skepticism until verified with evidence",
          "Immediately adopt the architecture in production",
          "Assume the author is 100% correct without checking",
          "Delete the codebase and switch languages",
        ],
      },
    ],
  },
  "sr-or-1": {
    optionsEn: [
      "the trigger criteria, action steps, rollback condition, and owner",
      "the author's favorite computer games",
      "only the meeting schedule for next month",
      "a philosophical justification of computing",
    ],
  },
  "sr-or-3": {
    passageEn: "Runbook: High CPU on Worker Nodes. Trigger: worker node CPU utilization > 85% for 5 continuous minutes. Actions: 1) Verify traffic surge in Grafana. 2) If genuine traffic, scale deployment replicas from 4 to 8. Caution: If backend DB connection pool is already saturated, scaling workers will crash the DB; do not scale workers before checking DB pool utilization.",
    questionsEn: [
      {
        qEn: "What is the goal?",
        optionsEn: [
          "Resolve high worker CPU without crashing downstream database connections",
          "Terminate all worker processes permanently",
          "Migrate cloud providers immediately",
          "Reboot the production database cluster",
        ],
      },
      {
        qEn: "When should you stop and not scale manually?",
        optionsEn: [
          "When the downstream database connection pool is already saturated",
          "When it is past 5:00 PM",
          "When worker CPU drops below 10%",
          "When users submit customer reviews",
        ],
      },
      {
        qEn: "What must you not do when only one replica is alive?",
        optionsEn: [
          "Terminate the remaining replica without replacement",
          "Check logs in Grafana",
          "Notify on-call engineers",
          "Inspect memory usage",
        ],
      },
    ],
  },
  "sr-oe-1": {
    optionsEn: [
      "timestamp, error code/message, affected user/request ID, and stack trace",
      "only the time of day without timezone",
      "the hostname of the client's laptop",
      "the operating system version of the engineer",
    ],
  },
  "sr-oe-3": {
    passageEn: "2026-11-20T14:32:01Z ERROR [billing-service] [req-98f2] Payment capture failed for order #10842: upstream payment gateway returned HTTP 504 Gateway Timeout after 2100ms. Database transaction rolled back; customer card was NOT charged. Retry scheduled in background queue.",
    questionsEn: [
      {
        qEn: "Which upstream returned the error?",
        optionsEn: [
          "Upstream payment gateway returning HTTP 504 Gateway Timeout",
          "Local PostgreSQL database",
          "Client browser JavaScript engine",
          "Redis session store",
        ],
      },
      {
        qEn: "Was payment captured?",
        optionsEn: [
          "No: transaction rolled back and customer was not charged",
          "Yes: customer was double charged",
          "Payment was converted into cryptocurrency",
          "Unknown because logs were lost",
        ],
      },
      {
        qEn: "Why does 2.1s matter?",
        optionsEn: [
          "It matches the upstream HTTP client timeout threshold of 2000ms",
          "It represents typical database write speeds",
          "It proves the internet was completely disconnected",
          "It is the standard animation duration in CSS",
        ],
      },
    ],
  },
  "sr-of-1": {
    optionsEn: [
      "status of services, error rate deviations, p95/p99 latency, and saturation",
      "aesthetic typography and color gradients",
      "the number of visitors on the marketing homepage",
      "only the total count of Slack messages sent",
    ],
  },
  "sr-of-3": {
    passageEn: "Service Level Objective: Checkout API must maintain 99.9% success rate and p95 latency < 350ms measured over a 30-day rolling window. Alert rule: fire critical PagerDuty notification if error rate exceeds 1% for 3 consecutive minutes or if p95 latency exceeds 1000ms for 5 minutes.",
    questionsEn: [
      {
        qEn: "What is mandatory about the response?",
        optionsEn: [
          "99.9% success rate and p95 latency below 350ms over 30 days",
          "100% uptime with zero maintenance windows ever",
          "Sub-1ms response times worldwide",
          "Zero network traffic on weekends",
        ],
      },
      {
        qEn: "What is forbidden?",
        optionsEn: [
          "Sustained error rate > 1% over 3 minutes or p95 > 1000ms over 5 minutes",
          "Using caching for checkout summaries",
          "Logging errors to disk",
          "Deploying updates during daylight hours",
        ],
      },
    ],
  },
  "sr-ot-1": {
    optionsEn: [
      "exact chronological sequence of events, root cause, impact duration, and preventative action items",
      "blaming specific individuals publicly",
      "deleting monitoring metrics to clean up disk space",
      "ignoring the incident because it was resolved",
    ],
  },
  "sr-ot-3": {
    passageEn: "Incident Timeline: 14:02 - Automated deployment v2.4.1 completed. 14:05 - P99 latency spiked from 180ms to 4200ms. 14:08 - On-call engineer paged. 14:11 - Rollback to v2.4.0 initiated. 14:14 - Rollback finished, latency normalized. Total customer impact duration: 12 minutes. Root cause: unindexed database query in new user profile card.",
    questionsEn: [
      {
        qEn: "What was done at 14:11?",
        optionsEn: [
          "Rollback to stable version v2.4.0 was initiated",
          "Servers were permanently turned off",
          "Database was wiped and restored from tape backup",
          "An all-hands executive meeting was convened",
        ],
      },
      {
        qEn: "How long did user-visible impact last in this record?",
        optionsEn: [
          "12 minutes (14:02 to 14:14)",
          "Over 24 hours",
          "Less than 30 seconds",
          "Two full business weeks",
        ],
      },
    ],
  },
  "sr-ov-1": {
    optionsEn: [
      "verification commands, expected outputs, rollback trigger, and confirmation checks",
      "guessing based on intuition without verification",
      "skipping verification to deploy faster",
      "closing tickets before deploying",
    ],
  },
  "sr-ov-3": {
    passageEn: "Deployment Verification Procedure: 1) Run 'kubectl get pods -n prod' to confirm all 6 pods report Running state. 2) Execute synthetic health check 'curl -f https://api.prod/healthz' expecting HTTP 200 within 50ms. 3) Monitor 5xx error rate in Datadog for 10 minutes. If error rate exceeds 0.05%, trigger immediate rollback.",
    questionsEn: [
      {
        qEn: "Which three sentences?",
        optionsEn: [
          "Confirm pod status, execute synthetic health check, monitor error rate for 10 min",
          "Check email, message team, leave for the day",
          "Reboot router, clear browser cookies, refresh page",
          "Write blog post, deploy code, delete logs",
        ],
      },
      {
        qEn: "What if there is no rollback condition?",
        optionsEn: [
          "The deployment procedure is unsafe and incomplete",
          "The deployment is guaranteed to be 100% bug-free",
          "Rollbacks are never needed in modern cloud",
          "It saves memory in Kubernetes",
        ],
      },
    ],
  },
  "sr-fs-1": {
    optionsEn: [
      "locating a specific keyword or data point without reading full surrounding prose",
      "reading every single word with subvocalization",
      "memorizing the entire document word for word",
      "translating the document into another language",
    ],
  },
  "sr-fs-3": {
    passageEn: "AWS CloudWatch Synthetics canary regional quotas: us-east-1 and us-west-2 support up to 100 concurrent canaries per account. For all secondary regions (e.g. eu-central-1, ap-southeast-1), the default quota is 20 canaries. Quotas do not apply to standard CloudWatch alarms.",
    questionsEn: [
      {
        qEn: "What is the limit in the same region?",
        optionsEn: [
          "100 concurrent canaries in us-east-1 and us-west-2",
          "500 canaries in all regions",
          "Zero canaries allowed",
          "Unlimited canaries per account",
        ],
      },
      {
        qEn: "What does the constraint not apply to?",
        optionsEn: [
          "Standard CloudWatch metric alarms",
          "Canaries in secondary regions",
          "AWS accounts in North America",
          "Lambda execution runtimes",
        ],
      },
    ],
  },
  "sr-fr-1": {
    optionsEn: [
      "rapid overview pass to grasp structure, followed by targeted deep reading of key sections",
      "reading backwards from the last word to the first",
      "reading only vowels in words",
      "skipping all technical terms",
    ],
  },
  "sr-fr-3": {
    passageEn: "First pass: skim the API documentation table of contents and introduction to understand authentication and data formats. Second pass: formulate concrete questions (e.g. 'How does pagination work? How are rate limits signaled?') and read the pagination and error headers sections closely.",
    questionsEn: [
      {
        qEn: "What does the first read give you?",
        optionsEn: [
          "High-level structural orientation and key concepts",
          "Full line-by-line memorization of implementation code",
          "A complete list of typos in the documentation",
          "Proof that the API does not work",
        ],
      },
      {
        qEn: "Why does the second pass need a question?",
        optionsEn: [
          "Specific questions guide attention directly to relevant architectural details",
          "Without questions the browser refuses to display text",
          "Questions are required by the HTTP standard",
          "It increases reading speed by 1000 WPM",
        ],
      },
    ],
  },
  "sr-fh-1": {
    optionsEn: [
      "locating headings, summary boxes, and code blocks before reading body paragraphs",
      "ignoring headings completely",
      "reading footnotes only",
      "closing the document immediately",
    ],
  },
  "sr-fh-3": {
    passageEn: "You can skim a twenty-page RFC to find the section on error handling in 30 seconds by following markdown headers (#, ##). Once located, drop reading pace to scrutinize retry codes, backoff formulas, and timeout invariants word for word.",
    questionsEn: [
      {
        qEn: "What is skimming for in this example?",
        optionsEn: [
          "Quickly locating the relevant error handling section within a large document",
          "Replacing technical implementation with vague intuition",
          "Avoiding reading technical specifications altogether",
          "Formatting the document for printing",
        ],
      },
      {
        qEn: "What is the risk of equal depth on the whole document?",
        optionsEn: [
          "Wasting cognitive energy on boilerplate before reaching the critical logic",
          "The document will be automatically deleted",
          "The RFC becomes invalid",
          "Network bandwidth is consumed",
        ],
      },
    ],
  },
  "sr-ff-1": {
    optionsEn: [
      "take a short break and verify key facts rather than blindly pushing WPM higher",
      "double reading speed to finish faster",
      "close the text and never return to it",
      "read only the first letters of each word",
    ],
  },
  "sr-ff-3": {
    passageEn: "Signs of cognitive fatigue during rapid technical reading: missing negation words ('not', 'never'), rereading the same sentence three times without comprehension, and skimming past quantitative thresholds. When these occur, take a 2-minute break and summarize the last section aloud.",
    questionsEn: [
      {
        qEn: "Which three signs are named?",
        optionsEn: [
          "Missing negations, aimless regression/rereading, and glossing over numeric thresholds",
          "Headaches, hunger, and screen brightness issues",
          "Typographical errors, grammatical slips, and poor font rendering",
          "Slow internet speed, laptop overheating, and battery drain",
        ],
      },
      {
        qEn: "What is more accurate than chasing a WPM record?",
        optionsEn: [
          "Calibrated comprehension and accurate retention of key facts",
          "Maximizing word count per minute regardless of understanding",
          "Reading without pausing for hours",
          "Skipping all diagrams and code samples",
        ],
      },
    ],
  },
  "sr-fv-1": {
    optionsEn: [
      "modulating reading pace based on information density and the cost of misunderstanding",
      "always maintaining the absolute maximum WPM speed",
      "always reading at the slowest possible pace",
      "using a single uniform pace for every genre and document",
    ],
  },
  "sr-fv-3": {
    passageEn: "Three calibrated reading gears: Navigation gear (400-600 WPM) to scan structure and locate sections; Working gear (250-350 WPM) to comprehend flows and architectural trade-offs; Scrutiny gear (100-200 WPM) for legal contracts, cryptographic invariants, and critical regex formulas.",
    questionsEn: [
      {
        qEn: "What is precise speed for?",
        optionsEn: [
          "Critical sections with high cost of error (contracts, crypto invariants, regex)",
          "Marketing blogs and introductory greetings",
          "Skipping through entire books in seconds",
          "Reading fictional stories",
        ],
      },
      {
        qEn: "What if you cannot name the thesis?",
        optionsEn: [
          "Downshift to working gear and review the core paragraph",
          "Increase speed to 800 WPM immediately",
          "Abandon the subject entirely",
          "Assume the thesis is unimportant",
        ],
      },
    ],
  },
  "sr-ri-1": {
    optionsEn: [
      "pause, look away, and restate the core thesis in your own words",
      "transcribe the paragraph word-for-word into a notebook",
      "count the punctuation marks in the sentence",
      "change the font family in your text editor",
    ],
  },
  "sr-ri-3": {
    passageEn: "Cache-aside pattern: the application first queries the cache. On a cache hit, it returns the cached payload. On a cache miss, it queries the primary database, populates the cache with a designated TTL, and returns the data. If DB write occurs, the app must explicitly invalidate the cached key.",
    questionsEn: [
      {
        qEn: "What does the app do when the cache is empty?",
        optionsEn: [
          "Queries the primary database, populates the cache with a TTL, and returns the data",
          "Returns an HTTP 404 Not Found error to the user",
          "Shuts down the application server",
          "Clears all database tables",
        ],
      },
      {
        qEn: "What is the trade-off of a short TTL for frequently changing data?",
        optionsEn: [
          "Reduces duration of stale reads at the cost of more frequent database queries",
          "Eliminates network latency completely",
          "Increases database CPU by 1000x without benefit",
          "Disables caching entirely",
        ],
      },
    ],
  },
  "sr-rk-1": {
    optionsEn: [
      "a few salient keywords and a single-sentence thesis statement",
      "transcribing the entire chapter word for word",
      "only decorative emoji without written context",
      "a verbatim three-page quotation block",
    ],
  },
  "sr-rk-3": {
    passageEn: "After reviewing a section on distributed circuit breakers, a concise effective note reads: 'Circuit breaker states: Closed (healthy), Open (fails fast immediately without calling downstream), Half-Open (probes downstream with limited trial requests). Prevents cascading cluster failure.'",
    questionsEn: [
      {
        qEn: "Which states are mentioned?",
        optionsEn: [
          "Closed (healthy), Open (failing fast), Half-Open (trial probe)",
          "On, Off, Standby, Hibernating",
          "Active, Passive, Dormant, Terminated",
          "Red, Yellow, Green, Blue",
        ],
      },
      {
        qEn: "Why is the note short?",
        optionsEn: [
          "Captures the essential mental model without transcribing implementation details",
          "Because memory cards cannot store more than 10 words",
          "Short notes are required by programming compilers",
          "It prevents copyright infringement",
        ],
      },
    ],
  },
  "sr-rt-1": {
    optionsEn: [
      "understanding has gaps and you should revisit the core definitions",
      "you were reading too slowly and should speed up",
      "the concept is inherently impossible for anyone to explain",
      "explaining ideas is forbidden in engineering",
    ],
  },
  "sr-rt-3": {
    passageEn: "An idempotent HTTP method can be executed multiple times consecutively without changing system state beyond the initial call. For example, PUT /users/42 with the same payload produces the identical database state whether executed once or ten times. POST is typically non-idempotent because each call creates a new resource.",
    questionsEn: [
      {
        qEn: "What does idempotency guarantee here?",
        optionsEn: [
          "Repeated requests yield identical state without duplicate side-effects",
          "Requests execute in zero milliseconds",
          "Network packets are encrypted with quantum keys",
          "Servers never return error status codes",
        ],
      },
      {
        qEn: "How does this differ from a safe GET?",
        optionsEn: [
          "PUT mutates resource state on first call; safe GET never mutates resource state",
          "GET produces random data on every execution",
          "PUT is only supported in web browsers",
          "There is zero difference between them",
        ],
      },
    ],
  },
  "sr-rs-1": {
    optionsEn: [
      "after a few hours or the following day to practice active recall",
      "only after a full calendar year has elapsed",
      "immediately ten times consecutively without pause, then never again",
      "never, if the initial read was completed quickly",
    ],
  },
  "sr-rs-3": {
    passageEn: "Spaced review technique: read a dense technical chapter once in working gear. Close the text and write a 2-minute summary from memory. That evening, review your summary and test recall of key terms. The next morning, test whether you can still explain the core concept without checking the book.",
    questionsEn: [
      {
        qEn: "What should you return to in the evening?",
        optionsEn: [
          "Your written summary to test recall of key terms",
          "Reading the entire book from chapter 1 again",
          "A different book on an unrelated topic",
          "Watching entertainment television",
        ],
      },
      {
        qEn: "What should you do the next day?",
        optionsEn: [
          "Test whether you can explain the core concept without checking notes",
          "Forget everything you studied",
          "Rewrite the notes into a different notebook",
          "Take an official university exam",
        ],
      },
    ],
  },
  "sr-rrv-1": {
    optionsEn: [
      "active recall → identify knowledge gaps → concise summary note → spaced repetition",
      "focus solely on cranking up raw WPM numbers",
      "close the book and never recall the ideas",
      "transcribe the full text verbatim every morning",
    ],
  },
  "sr-rrv-3": {
    passageEn: "Speed-reading is only valuable when you can accurately state the author's core thesis, critique the supporting evidence, and apply the concept to a new problem. A two-minute retrieval practice after reading consolidates memory far more than ten additional minutes of mechanical speed drills.",
    questionsEn: [
      {
        qEn: "What should you be able to name?",
        optionsEn: [
          "The author's core thesis, supporting evidence, and practical applications",
          "The publisher's physical mailing address",
          "The total count of characters in the text",
          "The exact date the paper was printed",
        ],
      },
      {
        qEn: "What raises accuracy more cheaply than ten more minutes of raw RSVP?",
        optionsEn: [
          "A two-minute active retrieval self-check immediately after reading",
          "Drinking more caffeinated beverages",
          "Changing font sizes repeatedly",
          "Reading with eyes half closed",
        ],
      },
    ],
  },
};
