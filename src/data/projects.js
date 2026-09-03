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
  title: 'STREAM — Multi-Tenant Compliance SaaS',
  company: 'Salire Attitude Pvt. Ltd.',
  place: 'Bangalore, India',
  role: 'Lead Full-Stack Developer & Architect (Intern)',
  period: 'Jan 2026 — Present',
  blurb:
    'Right now I am the sole technical owner of STREAM: a Django 5 / PostgreSQL multi-tenant SaaS that helps FMCG and pharmaceutical clients manage policies and prove 21 CFR Part 11 compliance. I design the schema-isolated data layer, build the approval-workflow and RSA-JWT licensing engines, harden the 14-layer middleware pipeline, and shape a fast HTMX/Tailwind interface.',
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
    tools: [
      { name: 'Django Admin', use: 'Customized into the organizer panel — instant CRUD for events, registrations and schedules.' },
      { name: 'Django Migrations', use: 'Schema control through a weekend of rapid model changes.' },
      { name: 'Python venv & pip', use: 'A reproducible environment the whole team could agree on in minutes.' },
      { name: 'Git & GitHub', use: 'Branch-and-merge flow so everyone could ship in parallel without colliding.' },
      { name: 'HTML Templates', use: 'Participant-facing pages straight from Django’s template engine — no build step under pressure.' },
    ],
  },
  {
    slug: 'stream',
    title: 'STREAM — Multi-Tenant Compliance SaaS',
    shortTitle: 'STREAM',
    tagline: 'A 21 CFR Part 11-grade platform for regulated industries — architected end-to-end as sole technical owner.',
    kind: 'Work · Featured Chapter',
    company: 'Salire Attitude Pvt. Ltd., Bangalore, India',
    role: 'Lead Full-Stack Developer & Architect (Intern)',
    date: 'Jan 2026 — Present',
    accent: 'sage',
    doodle: 'database',
    doodleCaption: 'schemas & safeguards…',
    source: null,
    tags: ['Python 3.12', 'Django 5', 'PostgreSQL 16', 'django-tenants', 'HTMX', 'Tailwind CSS', 'Docker'],
    summary:
      'STREAM is the enterprise platform I architect at Salire Attitude: a Django 5 / PostgreSQL 16 SaaS for policy and document compliance in FMCG and pharma (21 CFR Part 11). Fifteen Django apps on schema-based multi-tenancy, a configurable approval-workflow engine, an RSA-JWT licensing engine, a 14-layer middleware pipeline and an HTMX/Tailwind interface — covered by 40+ tenant-aware tests.',
    overview:
      'STREAM is a multi-tenant SaaS platform for policy management and document compliance, built for FMCG and pharmaceutical organisations where records are regulated under 21 CFR Part 11 — a leaked record or a missing audit trail is a regulatory problem, not just a bug. I joined as the Lead Full-Stack Developer & Architect (Intern) and became the sole technical owner. The platform runs on PostgreSQL schema-based multi-tenancy (django-tenants) with fifteen purpose-built Django apps, a configurable multi-step approval workflow engine, a from-scratch RSA-JWT licensing engine, and a hardened 14-layer middleware pipeline — presented through an HTMX + Tailwind interface with a full dark-mode design system, and covered by 40+ tenant-aware integration tests plus Bandit and pip-audit security scanning.',
    buildStory: [
      {
        title: 'Choosing a tenancy model',
        detail:
          'Compliance clients need hard isolation, so I built STREAM on django-tenants: every organisation gets its own PostgreSQL schema, with SHARED_APPS (tenants, accounts, core, licensing) in the public schema and fifteen tenant apps living per-schema. I extended TenantMainMiddleware with a custom StreamTenantMiddleware — exact-domain matching, hostname fallback, subdomain extraction, plus a session-based fallback for the login flow — and split routing into urls_public.py and urls_tenant.py so the two worlds never meet.',
      },
      {
        title: 'Designing the approval workflow engine',
        detail:
          'Compliance teams need document approvals they can configure without a developer. The engine supports three workflow types — SOP (steps fixed at design time), Flexi (approvers chosen at submission) and Ad Hoc (steps added at runtime) — with parallel execution groups (steps 2.1/2.2 running concurrently), five step types, deferred approver assignment, configurable rejection routing and one-time approval delegation for leave coverage. Step deadlines are computed in working days against a holiday calendar.',
      },
      {
        title: 'Building 21 CFR Part 11 document management',
        detail:
          'The repository auto-generates document numbers (SOP-QSP-HR-0001), versions them semantically (01.00 → 01.01 → 02.00) and chains every version immutably through previous_version / superseded_by self-references — old versions are archived, never deleted. Approvals record electronic signatures with their meaning (“Approved by Quality Head”), the acting vs assigned approver, timezone-aware timestamps and client IP, all inside a 1,500+ line model file that keeps the repository honest.',
      },
      {
        title: 'Engineering the licensing engine',
        detail:
          'I implemented a cryptographic licensing engine from scratch: RSA-2048 key pairs sign license payloads as JWTs, verified on install and bound to a SHA-256 fingerprint of schema_name:customer_id. A LicenseEnforcementMiddleware blocks every tenant request when a license is inactive, expired or tampered — signature verification makes any modified claim mathematically detectable — while a five-minute status cache keeps verification off the hot path. Licenses carry user pools (Named 1:1, Concurrent 1.5x), module entitlements, storage/CPU limits, role caps and a one-day grace period, with every lifecycle event in a license audit log.',
      },
      {
        title: 'Hardening the security layer',
        detail:
          'Security is tenant-scoped end to end: a 700+ line custom AbstractUser model with role-based permissions, per-tenant PasswordPolicy singletons read at runtime by a custom validator (length, complexity, expiry, history), force-change middleware, django-axes brute-force lockouts (5 attempts → 30-minute cooloff) and Cloudflare Turnstile on login. Rich text is sanitised by a pure-Python SafeHTMLParser I wrote from scratch — whitelisted tags, javascript:/data:/vbscript: schemes stripped, on* handlers removed — and the stack ships CSP, HSTS, Permissions-Policy and trusted-proxy-aware IP extraction.',
      },
      {
        title: 'Modelling the organisation',
        detail:
          'The org chart supports multi-division membership with per-division reporting lines, primary flags, and external contractors as credential-free records that can later be promoted to full users. Manager assignment runs a BFS descendant check so circular reporting chains are impossible, CEO uniqueness is validated at the model layer, and unique business IDs (ORG-, CUST-, PO-) are generated concurrency-safely with SELECT … FOR UPDATE plus an IntegrityError retry loop.',
      },
      {
        title: 'The reactive interface',
        detail:
          'For the frontend I chose HTMX + Tailwind CSS over a heavy SPA framework: django-htmx detects partial requests and the server swaps small HTML fragments for infinite scroll, inline editing and modals — cutting payload size by roughly 30%. The design system is documented in a 540+ line DESIGN.md and covers a full dark mode on CSS variables, a collapsible sidebar (64px → 240px) and a toast notification system.',
      },
      {
        title: 'Shipping with a middleware pipeline & quality gates',
        detail:
          'Fourteen middlewares run in a precise order — tenant resolution → license enforcement → module access → security → session management → audit — including concurrent-session tracking with admin termination and stale-session cleanup. Quality is engineered in: 40+ test classes on django-tenants TenantTestCase infrastructure, Bandit SAST and pip-audit scanning, a three-stage Dockerfile (non-root, health checks), Docker Compose with resource limits, Gunicorn behind Nginx Proxy Manager with SSL, WhiteNoise static serving — plus install/update scripts, an Installation Qualification document for pharma validation, and post_save signals that seed every new tenant’s master data automatically.',
      },
    ],
    concepts: [
      'django-tenants: shared vs tenant apps, schema_context switching and the TenantSyncRouter',
      'Middleware chain design — 14+ components ordered from tenant resolution to security headers',
      'RSA JWT licensing: signing, verification, fingerprint binding and tamper detection',
      '21 CFR Part 11: electronic signatures with meaning, immutable audit trails, version chains',
      'PostgreSQL internals: GIN trigram indexes, SELECT … FOR UPDATE row locking, PROTECT cascades',
      'Workflow engine design: SOP / Flexi / Ad Hoc strategies, parallel groups, delegation',
      'Django signals as the observer pattern for provisioning, caching and audit hooks',
      'Singleton configuration models enforced with unique-key constraints',
      'BFS cycle detection in self-referential hierarchies (org charts, reporting lines)',
      'Pure-Python XSS defence: HTML whitelist parsing and dangerous-URI stripping',
      'Multi-stage Docker builds, non-root containers, health checks and Compose orchestration',
      'Tenant-aware testing with TenantTestCase, plus Bandit SAST and pip-audit scanning',
    ],
    issues: [
      {
        issue:
          'Early prototypes could reach public-schema resources, and a request that arrived before tenant resolution had nowhere safe to go.',
        fix: 'I split routing into urls_public.py and urls_tenant.py, added a PublicSchemaGuardMiddleware that blocks non-system-admins from public resources, and gave StreamTenantMiddleware a session-based fallback so the login flow always resolves a tenant before a single query runs.',
      },
      {
        issue:
          'RSA license verification on every request was expensive — and a tampered claim had to be caught without exception.',
        fix: 'License status is cached for five minutes between verifications to keep the hot path fast, while RSA signature checks make any modified claim mathematically detectable; enforcement middleware then blocks inactive, expired or tampered licenses after a one-day grace period.',
      },
      {
        issue:
          'Concurrent sign-ups raced on unique business IDs (ORG-, CUST-, PO-) generated from MAX queries — two requests could claim the same number.',
        fix: 'Generation now takes SELECT … FOR UPDATE row locks inside an atomic transaction and retries through IntegrityError, so collisions resolve quietly instead of crashing the request.',
      },
      {
        issue:
          'A manager reassignment could create a circular reporting chain and quietly break the entire org chart.',
        fix: 'Assignment runs a BFS descendant traversal that rejects any cycle before it persists, alongside CEO-uniqueness and department-division consistency validations at the model layer.',
      },
      {
        issue:
          'Rich-text content was an XSS vector — Quill HTML could carry event handlers or javascript: URIs straight into stored documents.',
        fix: 'I wrote a dependency-free SafeHTMLParser that whitelists tags and attributes, strips javascript:/data:/vbscript: schemes and on* handlers, then re-serialises the clean HTML back into the Quill JSON before it ever touches the database.',
      },
      {
        issue:
          'Compliance audit rows had to be truly immutable — a careless ORM update or delete would silently rewrite regulated history.',
        fix: 'Audit models override save() and delete() to raise ValueError and declare only add/view permissions in Meta, so history is written once and can only ever be read afterwards.',
      },
    ],
    stack: ['Python 3.12', 'Django 5', 'PostgreSQL 16', 'django-tenants', 'HTMX', 'Tailwind CSS', 'Gunicorn + Nginx', 'Docker'],
    outcomes: [
      '15 Django apps with full CRUD, admin and test coverage',
      '40+ tenant-aware test classes; Bandit SAST + pip-audit scanning',
      '14-layer middleware pipeline from tenant resolution to security headers',
      '1,500+ line document model; 700+ line custom User model',
      '400+ line RSA JWT licensing engine with tamper detection',
      '100% tenant data isolation; ~30% lighter frontend payloads',
      '540+ line documented design system with full dark mode',
    ],
    tools: [
      { name: 'PostgreSQL 16', use: 'Schema-based multi-tenancy, GIN trigram search indexes and SELECT … FOR UPDATE row locking.' },
      { name: 'Django 5 & django-tenants', use: 'Fifteen purpose-built apps split across shared and tenant schemas.' },
      { name: 'HTMX + django-htmx', use: 'Partial swaps, infinite scroll, inline editing and modals without a JS framework.' },
      { name: 'Tailwind CSS v3', use: 'The design system — dark mode on CSS variables, responsive sidebar, toasts.' },
      { name: 'Docker & Docker Compose', use: 'Three-stage builds, health checks, resource limits and non-root execution.' },
      { name: 'Gunicorn + Nginx Proxy Manager', use: 'Production WSGI serving behind SSL termination.' },
      { name: 'WhiteNoise', use: 'Compressed, manifest-cached static files served straight from Django.' },
      { name: 'django-axes', use: 'Brute-force lockouts — 5 failed attempts, 30-minute cooloff.' },
      { name: 'Cloudflare Turnstile', use: 'Bot protection with server-side token verification on login.' },
      { name: 'Quill + LibreOffice headless', use: 'Rich-text authoring (sanitised) and DOCX → PDF preview conversion.' },
      { name: 'Bandit & pip-audit', use: 'Static security analysis plus dependency vulnerability scanning.' },
      { name: 'select2 / simple-history / tree-queries / cleanup', use: 'AJAX selects, per-schema history, tree queries and automatic file cleanup.' },
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
    tools: [
      { name: 'HuggingFace Transformers', use: 'Loading and fine-tuning the pretrained BERT checkpoint.' },
      { name: 'Pandas / NumPy', use: 'Text cleaning, normalization and stratified dataset splits.' },
      { name: 'Jupyter notebooks', use: 'Prototyping the training loop before productionizing it.' },
      { name: 'Docker', use: 'API and UI images with pinned dependencies and baked-in model weights.' },
      { name: 'Kubernetes', use: 'Deployments, services and probes for fault-tolerant inference.' },
      { name: 'GitHub Actions', use: 'The CI/CD path — test, build, push, deploy on every change.' },
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
    tools: [
      { name: 'Go', use: 'The whole server — goroutines, raw TCP sockets and hand-parsed HTTP/1.1.' },
      { name: 'curl', use: 'Happy-path smoke tests across methods, headers and file routes.' },
      { name: 'Load-test harness', use: 'Hundreds of concurrent connections to surface goroutine leaks and slow reads.' },
      { name: 'go test', use: 'Adversarial request cases — traversals, malformed lines, oversized headers.' },
      { name: 'Git', use: 'Checkpointing every milestone of the server’s evolution.' },
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

// Life milestones — pin new ones here and the trail grows automatically.
// `accent` rotates through sage / terracotta / dustyblue / mustard if omitted.
export const milestones = [
  {
    date: 'July 2021',
    title: 'Passed out of high school',
    detail: 'Closed the school chapter and started pointing everything at science, code and glowing screens.',
    accent: 'sage',
  },
  {
    date: 'May 2023',
    title: 'Passed my +2',
    detail: 'Cleared the intermediate leap and earned a seat in engineering.',
    accent: 'terracotta',
  },
  {
    date: 'Jan 2026',
    title: 'First internship',
    detail: 'Joined Salire Attitude Pvt. Ltd. — the door into STREAM, multi-tenancy and real enterprise software.',
    accent: 'dustyblue',
  },
  {
    date: 'Feb 2026',
    title: 'First hackathon',
    detail: 'CodeSprint: twenty-four hours, a full Django platform, and a lifelong appetite for shipping under pressure.',
    accent: 'mustard',
  },
];
