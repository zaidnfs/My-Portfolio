// ============================================================================
// DATA — the single source of truth for every word on this portfolio.
// Edit this file to update any story, project chapter, skill note or link.
// ============================================================================

// Accent palettes used across the site. Class strings are written out in full
// so Tailwind's JIT compiler can always find them.
export const ACCENTS = {
  sage: {
    text: 'text-sage',
    bg: 'bg-sage',
    border: 'border-sage',
    soft: 'bg-sage/15',
    chip: 'border-sage/40 bg-sage/15',
    tape: 'bg-sage/30',
  },
  terracotta: {
    text: 'text-terracotta',
    bg: 'bg-terracotta',
    border: 'border-terracotta',
    soft: 'bg-terracotta/15',
    chip: 'border-terracotta/40 bg-terracotta/15',
    tape: 'bg-terracotta/25',
  },
  dustyblue: {
    text: 'text-dustyblue',
    bg: 'bg-dustyblue',
    border: 'border-dustyblue',
    soft: 'bg-dustyblue/15',
    chip: 'border-dustyblue/40 bg-dustyblue/15',
    tape: 'bg-dustyblue/30',
  },
  mustard: {
    text: 'text-mustard',
    bg: 'bg-mustard',
    border: 'border-mustard',
    soft: 'bg-mustard/15',
    chip: 'border-mustard/40 bg-mustard/15',
    tape: 'bg-mustard/30',
  },
};

export const profile = {
  name: 'Mohammad Zaid Alam',
  role: 'Lead Full-Stack Developer & Architect (Intern)',
  subrole: 'Python · Go · React · Kubernetes · PostgreSQL',
  location: 'West Bengal, India',
  email: 'zaidlc319@gmail.com',
  phone: '+91 89278-95633',
  github: 'https://github.com/zaidnfs',
  linkedin: 'https://www.linkedin.com/in/zaid-alam',
  x: 'https://x.com/Akii_hello',
  intro:
    'I am a full-stack developer from West Bengal, India, who likes building systems end-to-end: multi-tenant SaaS backends, ML pipelines that ship to Kubernetes, and the occasional HTTP server written from raw TCP sockets just to understand what frameworks hide. By day I lead architecture on an enterprise compliance platform; the rest of the time I am usually fine-tuning a transformer, grinding DSA, or adding another page to this storybook. Every chapter below is an honest field journal — what I built, what I learned, and everything that broke along the way.',
};

export const nowStatus = {
  label: 'Current Status',
  title: 'STREAM — Enterprise Policy & Compliance SaaS',
  company: 'Salire Attitude Pvt. Ltd.',
  place: 'Bangalore, India',
  role: 'Lead Full-Stack Developer & Architect (Intern)',
  period: 'Jan 2026 — Present',
  blurb:
    'Right now I am the sole technical owner of STREAM: a Python/Django SaaS platform that helps FMCG and pharmaceutical clients manage policies and prove compliance. I design the multi-tenant data layer, build the workflow engine that drives configurable policy flows, and shape a fast HTMX/Tailwind interface — all while keeping enterprise-grade security and audit trails intact.',
  slug: 'stream',
};

export const projects = [
  {
    slug: 'codesprint',
    title: 'CodeSprint — Event Management Platform',
    shortTitle: 'CodeSprint',
    tagline: 'A full event-management platform, designed and shipped inside a 24-hour hackathon.',
    kind: 'Hackathon Project',
    company: null,
    role: null,
    date: 'January 2026',
    accent: 'terracotta',
    doodle: 'rocket',
    doodleCaption: '24 hours on the clock…',
    source: 'https://github.com/zaidnfs',
    tags: ['Django', 'Python', 'CRUD', 'RBAC'],
    summary:
      'In a 24-hour university hackathon I built a full-stack event management web app in Django with separate participant and admin panels behind role-based access control, plus CRUD modules for events, registration and scheduling that handled 10+ concurrent events and 100+ participant registrations.',
    overview:
      'CodeSprint was a 24-hour university hackathon where our team shipped a complete event-management platform in Django. Participants browse and register for events; organizers get an admin panel to create events, manage registrations, and schedule sessions. Role-based access control keeps the two worlds separate, and the CRUD modules are built to survive real concurrency — our demo ran 10+ concurrent events with 100+ registrations without a hiccup.',
    buildStory: [
      {
        title: 'Hour 0–2: scope the MVP',
        detail:
          'We whiteboarded the data model first — Event, Participant, Registration, ScheduleSlot — and the two user journeys. The rule for the next 22 hours: if a feature was not needed to create an event, register a participant, or print a schedule, it did not exist. That discipline is what made the deadline reachable.',
      },
      {
        title: 'Scaffolding Django fast',
        detail:
          'We leaned on Django’s batteries: models with constraints from minute one, the admin app customized into the organizer panel instead of building one from scratch, and template views for the participant side. Speed came from using the framework instead of fighting it.',
      },
      {
        title: 'RBAC as a wall, not a curtain',
        detail:
          'Participant and admin panels were separated with Django groups and permission decorators enforced at the view layer — hiding an admin link in the UI was never accepted as access control. Every admin view checks the role server-side.',
      },
      {
        title: 'CRUD under time pressure',
        detail:
          'Event creation, participant registration, and scheduling each got dedicated modules with real validation: duplicate registrations rejected by a unique constraint, scheduling conflicts checked before save, and forms that fail loudly rather than silently corrupting data.',
      },
      {
        title: 'Ship, seed, rehearse',
        detail:
          'In the final stretch we cut every nice-to-have, wrote a seed script for believable demo data, and rehearsed the demo twice. The lesson: a rehearsed demo of a smaller feature set beats a crashed demo of an ambitious one.',
      },
    ],
    concepts: [
      'Rapid data modeling and MVP scoping under a hard deadline',
      'Role-based access control with Django groups and permission decorators',
      'CRUD patterns backed by database-level integrity constraints',
      'Server-side enforcement vs UI hiding for authorization',
      'Timezone-aware scheduling in Django',
      'Demo engineering: seed data and rehearsal as engineering tasks',
    ],
    issues: [
      {
        issue:
          'Two quick test registrations for the same event both succeeded — a race condition that would double-book seats in production.',
        fix: 'We added a unique constraint on (event, participant) and used select_for_update on the registration path so concurrent requests serialize instead of both inserting.',
      },
      {
        issue:
          'A participant could open an admin URL directly — the admin panel was only “hidden”, not protected.',
        fix: 'Every admin view got permission decorators enforced server-side, and we added a test asserting an unauthenticated request to any admin URL is redirected.',
      },
      {
        issue:
          'The schedule rendered times inconsistently across machines because naive datetimes mixed with local time zones.',
        fix: 'We standardized on timezone-aware datetimes stored in UTC and rendered to local time only at the template layer.',
      },
      {
        issue:
          'A late-night model change invalidated earlier migrations and nearly cost us the demo build.',
        fix: 'We froze the schema two hours before the deadline, kept a seed script to rebuild state, and agreed any change after the freeze had to be a bug fix, not a feature.',
      },
    ],
    stack: ['Python', 'Django', 'Django Admin', 'RBAC (groups & permissions)', 'HTML templates'],
    outcomes: [
      'Shipped a working platform within the 24-hour window',
      '10+ concurrent events managed through the admin panel',
      '100+ participant registrations handled without data integrity issues',
      'Separate participant & admin panels enforced via RBAC',
    ],
  },
  {
    slug: 'stream',
    title: 'STREAM — Policy & Compliance SaaS',
    shortTitle: 'STREAM',
    tagline: 'An enterprise policy-management platform, architected end-to-end as sole technical owner.',
    kind: 'Work · Featured Chapter',
    company: 'Salire Attitude Pvt. Ltd., Bangalore, India',
    role: 'Lead Full-Stack Developer & Architect (Intern)',
    date: 'Jan 2026 — Present',
    accent: 'sage',
    doodle: 'database',
    doodleCaption: 'schemas & safeguards…',
    source: null,
    tags: ['Python', 'Django', 'PostgreSQL', 'HTMX', 'Tailwind CSS'],
    summary:
      'STREAM is the enterprise SaaS platform I architect at Salire Attitude: a Python/Django system for policy management and compliance serving FMCG and pharmaceutical clients. Multi-tenant PostgreSQL, a configurable workflow engine, and a reactive HTMX interface — built to compliance-grade standards.',
    overview:
      'STREAM is an enterprise SaaS platform for policy management and compliance, built for FMCG and pharmaceutical clients where a leaked record or a missing audit trail is a regulatory problem, not just a bug. I joined as the Lead Full-Stack Developer & Architect (Intern) and became the sole technical owner: I designed the multi-tenant PostgreSQL backbone, the workflow engine that encodes policy logic, the security layers, and the reactive interface on top. The product treats tenant isolation, auditability, and configurability as first-class features rather than afterthoughts.',
    buildStory: [
      {
        title: 'Choosing a tenancy model',
        detail:
          'The first architectural decision was how to isolate tenants. I compared shared-row tenancy (row-level security), database-per-tenant (expensive to operate), and isolated schemas. I went with isolated schemas: each tenant gets its own PostgreSQL schema, which gives hard structural isolation, per-tenant migration control, and clean data removal when a client leaves. Cross-schema writes are wrapped in atomic transactions so a partial failure can never leave a tenant half-migrated.',
      },
      {
        title: 'Designing the workflow engine',
        detail:
          'Compliance teams need policy workflows they can configure without a developer. I modeled each workflow as a state machine and built a rule evaluator that parses conditions into an AST before executing them. That gives safe conditional branching and parallel execution gates — steps that must all clear before a policy advances — across 15+ configurable workflows. No string-eval shortcuts, and every rule is testable in isolation.',
      },
      {
        title: 'Building the security layer',
        detail:
          'Security had to be per-tenant from day one. I implemented RBAC with tenant-scoped roles so an admin in one tenant has no implicit power in another, added django-axes for brute-force mitigation on login endpoints, and built a Template Snapshotting system that freezes exactly what a reviewer saw at review time — so audit trails for 50+ compliance reviews cannot be quietly rewritten later.',
      },
      {
        title: 'The reactive interface',
        detail:
          'For the frontend I chose HTMX + Tailwind CSS over a heavy SPA framework: the server stays the source of truth, and the browser swaps small HTML fragments instead of shipping a JavaScript bundle. The result feels SPA-like — real-time server-client state sync, instant partial updates — while cutting frontend payload size by roughly 30%.',
      },
      {
        title: 'Keeping it all honest',
        detail:
          'I set up automated checks that treat isolation as a testable property: tests that assert no query can cross tenant schemas, migration runs that iterate every tenant schema atomically, and response-fragment checks for the HTMX flows. When your product promise is compliance, the tests are the product.',
      },
    ],
    concepts: [
      'Multi-tenancy trade-offs: isolated schemas vs row-level security vs database-per-tenant',
      'PostgreSQL schemas, search_path hygiene, and atomic transactions',
      'AST-based expression evaluation as a safe alternative to eval()',
      'State machine design for configurable workflows',
      'RBAC design with tenant-scoped roles and permission matrices',
      'Brute-force mitigation and login hardening with django-axes',
      'Immutable audit trails via template snapshotting',
      'HTMX hypermedia architecture: server-driven partial swaps',
    ],
    issues: [
      {
        issue:
          'Early prototypes let query builders compose filters freely — one misplaced join could have surfaced another tenant’s rows.',
        fix: 'I funneled every data access through a single tenant-scoped repository layer that sets the schema per request in middleware, banned raw cross-schema joins, and added automated tests that fail the build if any query escapes its tenant boundary.',
      },
      {
        issue:
          'Shipping a schema change meant migrating every tenant schema, and one failing tenant could leave the whole fleet inconsistent.',
        fix: 'I built a migration runner that iterates tenant schemas in a defined order, wraps each in a transaction, and rolls back per tenant with a progress report — so a bad migration fails loudly for one tenant instead of silently for all.',
      },
      {
        issue:
          'HTMX partial swaps caused state drift: duplicated element IDs and stale fragments after quick successive updates.',
        fix: 'I standardized fragment templates with unique IDs, used out-of-band swaps for shared regions, and added checks that assert every swapped fragment is self-consistent.',
      },
      {
        issue: 'Login endpoints became a target for credential-stuffing once pilot tenants onboarded.',
        fix: 'django-axes lockouts with per-tenant thresholds, plus lockout telemetry so suspicious patterns are visible to admins instead of being silently locked away.',
      },
    ],
    stack: ['Python', 'Django', 'PostgreSQL (isolated schemas)', 'HTMX', 'Tailwind CSS', 'django-axes'],
    outcomes: [
      '100% data isolation maintained across all enterprise tenants',
      '15+ configurable policy workflows with branching and parallel gates',
      '50+ compliance reviews secured with tamper-evident audit trails',
      '~30% smaller frontend payloads with SPA-like responsiveness',
    ],
  },
  {
    slug: 'sentiment-pipeline',
    title: 'Sentiment Analysis Pipeline',
    shortTitle: 'Sentiment',
    tagline: 'Fine-tuning BERT, then shipping it like a product: containers, clusters, and CI/CD.',
    kind: 'ML Systems Project',
    company: null,
    role: null,
    date: 'August 2025',
    accent: 'dustyblue',
    doodle: 'chat',
    doodleCaption: 'teaching BERT feelings…',
    source: 'https://github.com/zaidnfs',
    tags: ['Python', 'BERT', 'HuggingFace', 'Docker', 'Kubernetes', 'CI/CD'],
    summary:
      'I fine-tuned a pretrained BERT transformer with HuggingFace for NLP sentiment classification, wrapped it in a REST API and web UI, containerized both with Docker, orchestrated them on Kubernetes, and automated the whole path with a GitHub Actions CI/CD pipeline.',
    overview:
      'This project was about treating an ML model as a deployed system rather than a notebook. On the modeling side, I fine-tuned a pretrained BERT transformer using HuggingFace Transformers for sentiment classification, with a Pandas/NumPy pipeline for cleaning and preprocessing. On the systems side, the model is served through a REST API with a small web UI, both containerized with Docker and orchestrated as multi-container deployments on Kubernetes — with GitHub Actions building, testing, and releasing every change automatically.',
    buildStory: [
      {
        title: 'Data first',
        detail:
          'The preprocessing pipeline in Pandas/NumPy handles cleaning, normalization, and deduplication before anything touches the model. Splits are stratified so every class is represented in train/validation/test — a lesson learned after early runs looked great overall and quietly failed on the minority class.',
      },
      {
        title: 'Fine-tuning BERT',
        detail:
          'Using HuggingFace Transformers, I fine-tuned a pretrained BERT checkpoint: tokenization matched to the model, a small learning rate, early stopping, and per-class F1 tracked alongside accuracy so improvements in the average could not hide regressions in one class.',
      },
      {
        title: 'Serving predictions',
        detail:
          'The model sits behind a REST API with a predict endpoint and a small web UI on top, so the same model can be exercised programmatically and by humans. Keeping inference code separate from training code made both easier to test.',
      },
      {
        title: 'Containerizing',
        detail:
          'The API and UI each get their own Docker image with pinned dependencies and model weights baked in — a pod must never download weights at boot. Local development used the same images that production runs.',
      },
      {
        title: 'Orchestrating on Kubernetes',
        detail:
          'On Kubernetes, the API and UI run as separate Deployments with Services between them, resource requests/limits tuned for inference bursts, and readiness/liveness probes so traffic only reaches pods that can actually serve.',
      },
      {
        title: 'Automating the path',
        detail:
          'GitHub Actions runs linting and tests on every push, builds and pushes images, and deploys to the cluster — turning releases from a manual checklist into a repeatable pipeline.',
      },
    ],
    concepts: [
      'Transformer fine-tuning: tokenization, learning rates, early stopping',
      'Class imbalance and why per-class F1 matters more than accuracy',
      'Reproducible environments with Docker and pinned dependencies',
      'Kubernetes Deployments, Services, probes, and resource limits',
      'ML inference as a stateless, horizontally scalable service',
      'CI/CD design for ML systems: test, build, push, deploy',
    ],
    issues: [
      {
        issue:
          'First fine-tuning runs overfit fast — training loss kept dropping while validation F1 collapsed after epoch three.',
        fix: 'Early stopping, dropout, a lower learning rate, and initially freezing encoder layers brought validation performance back in line with training.',
      },
      {
        issue:
          'Accuracy looked healthy while the minority class was being predicted almost at chance.',
        fix: 'Stratified splits, class weighting, and evaluating per-class F1 made the imbalance visible and fixable instead of hidden inside an average.',
      },
      {
        issue: 'Pods were slow to become ready because each one downloaded model weights at startup.',
        fix: 'Baked weights into the image and cached them on a volume, cutting cold-start time dramatically and making rollouts predictable.',
      },
      {
        issue: 'Inference bursts OOM-killed pods that had been sized for average load.',
        fix: 'Tuned memory requests/limits from real usage, reduced per-request batch size, and let the autoscaler add replicas during bursts.',
      },
      {
        issue: 'The CI pipeline was flaky because test jobs depended on model downloads and GPU assumptions.',
        fix: 'Tests run CPU-only against small fixture models, Docker layer caching was added, and the pipeline became deterministic instead of optimistic.',
      },
    ],
    stack: ['Python', 'HuggingFace Transformers', 'BERT', 'Pandas', 'NumPy', 'REST API', 'Docker', 'Kubernetes', 'GitHub Actions'],
    outcomes: [
      'Fine-tuned BERT served through a REST API and web UI',
      'Multi-container deployment orchestrated on Kubernetes',
      'Automated build, test & deploy pipeline with GitHub Actions',
      'Scalable, fault-tolerant ML inference with repeatable releases',
    ],
  },
  {
    slug: 'http-server',
    title: 'HTTP Server from Scratch',
    shortTitle: 'HTTP/1.1',
    tagline: 'Building the web’s front door from raw TCP sockets — no net/http allowed.',
    kind: 'Systems Project',
    company: null,
    role: null,
    date: 'June 2025',
    accent: 'mustard',
    doodle: 'server',
    doodleCaption: 'raw sockets, no training wheels…',
    source: 'https://github.com/zaidnfs',
    tags: ['Go', 'TCP/IP', 'Sockets', 'Goroutines', 'Concurrency'],
    summary:
      'In Go, I built a fully functional HTTP/1.1 server directly on raw TCP sockets — bypassing net/http entirely — with concurrent connection handling via goroutines sustaining 500+ simultaneous clients, manual request/header/Content-Length parsing, MIME detection, and directory-traversal protection.',
    overview:
      'I wanted to understand HTTP at the layer most frameworks never show you, so I built one from raw TCP sockets in Go — deliberately bypassing the standard net/http library. The server implements the HTTP/1.1 core itself: reading the request line and headers off the wire, parsing Content-Length for bodies, generating responses, detecting MIME types for file routing, and protecting against directory-traversal attacks. Goroutines and buffered I/O keep it concurrent — it sustains 500+ simultaneous client connections.',
    buildStory: [
      {
        title: 'Starting at the socket',
        detail:
          'The journey begins with a TCP listener and an accept loop. Every accepted connection gets its own goroutine, which is what makes the server concurrent instead of sequential — and forces every piece of shared state to be deliberately synchronized.',
      },
      {
        title: 'Parsing the wire format',
        detail:
          'I implemented the HTTP/1.1 request format by hand: read the request line, parse method/target/version, collect headers into a map, and read exactly Content-Length bytes for the body. Doing this manually teaches you why malformed requests are a security problem, not just an error.',
      },
      {
        title: 'Routing and files',
        detail:
          'The server maps request targets to files and returns them with correct MIME-type detection, status codes, and headers. File routing is where the security work lives: every path is canonicalized and checked against the document root before a single byte is read.',
      },
      {
        title: 'Concurrency hardening',
        detail:
          'Connections get read deadlines so a slow client cannot hold a goroutine forever, buffers are reused sensibly, and connection shutdown is explicit. Load testing with hundreds of concurrent clients drove most of these decisions.',
      },
      {
        title: 'Testing like an adversary',
        detail:
          'curl covered the happy path; everything else — malformed request lines, missing Content-Length, ../ traversals, oversized headers — got its own tests. Writing a server means assuming every request is hostile until proven otherwise.',
      },
    ],
    concepts: [
      'The HTTP/1.1 wire format: request line, headers, Content-Length bodies',
      'TCP sockets vs the application protocol layered on top',
      'Goroutines, channels, and synchronizing shared state',
      'Buffered I/O and why per-connection goroutines scale',
      'MIME-type detection and correct response headers',
      'Path canonicalization as a defense against directory traversal',
    ],
    issues: [
      {
        issue: 'Early tests served /../../etc/passwd happily — a textbook directory-traversal vulnerability.',
        fix: 'Every requested path is cleaned and canonicalized, then rejected unless it resolves inside the document root; traversal attempts get a 403 and a log entry.',
      },
      {
        issue:
          'Slow clients that opened connections and never finished sending could pin goroutines indefinitely.',
        fix: 'Per-connection read deadlines close stalled connections, so no single client can exhaust the server’s capacity.',
      },
      {
        issue:
          'Request bodies were read incorrectly when I trusted a single Read call to return everything Content-Length promised.',
        fix: 'Body reads loop until the declared length is satisfied or the connection errors — a reminder that Read returns “up to n bytes”, never “exactly n”.',
      },
      {
        issue: 'Abandoned connections leaked goroutines until restart under load testing.',
        fix: 'Explicit connection lifecycles: close on error or deadline, drain buffers, and context-based timeouts so cleanup happens even on unexpected paths.',
      },
    ],
    stack: ['Go', 'TCP sockets', 'HTTP/1.1', 'Goroutines', 'Buffered I/O'],
    outcomes: [
      'Working HTTP/1.1 server built on raw TCP — net/http bypassed entirely',
      '500+ simultaneous client connections sustained',
      'Manual parsing of requests, headers & Content-Length',
      'MIME-type detection and directory-traversal protection built in',
    ],
  },
];

export const skillGroups = [
  { name: 'Languages', items: ['Python', 'Go', 'JavaScript', 'SQL', 'C', 'C++'] },
  {
    name: 'Backend',
    items: ['Django', 'Node.js', 'Express.js', 'REST APIs', 'State Machine Design', 'Multi-Tenant Architecture'],
  },
  {
    name: 'Security & Infra',
    items: ['RBAC', 'Brute-Force Mitigation', 'Data Isolation', 'Linux', 'Git', 'Vercel'],
  },
  { name: 'Frontend', items: ['React', 'HTMX', 'Tailwind CSS'] },
  {
    name: 'Databases',
    items: ['PostgreSQL (Isolated Schemas, Atomic Transactions)', 'MongoDB'],
  },
  {
    name: 'AI / ML',
    items: [
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'BERT',
      'HuggingFace Transformers',
      'Model Fine-Tuning',
      'Sentiment Analysis',
      'Pandas',
      'NumPy',
    ],
  },
  {
    name: 'DevOps & MLOps',
    items: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
  },
];

export const education = {
  school: 'Integral University',
  place: 'Lucknow, India',
  degree: 'B.Tech, Computer Science & Engineering (Cloud Computing & AI)',
  period: 'Aug 2023 — Aug 2027',
  notes: ['Competitive Programming: Ranked Tier 1, Google Code Jam University team.'],
};

export const certifications = [
  { name: 'Full Stack Web Development', issuer: 'Udemy', year: '2023' },
  { name: 'Prompt Engineering', issuer: 'Udemy', year: '2024' },
  { name: 'Data Structures & Algorithms (DSA)', issuer: 'Udemy', year: '2024' },
  { name: 'GCP Badge', issuer: 'Google', year: '2025', extra: 'verified on Credly' },
];
