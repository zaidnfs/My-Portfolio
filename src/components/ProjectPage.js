import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Flag,
  Hammer,
  Layers,
  Lightbulb,
  Wrench,
} from 'lucide-react';
import { ACCENTS, projects } from '../data/projects';
import { navigate } from '../router/useHashRoute';
import { MarginDoodle, ProjectDoodle } from './Doodles';
import { scrollToSection } from './Navbar';

function ChapterHeading({ icon: Icon, title, accent }) {
  return (
    <h2 className="flex items-center gap-2.5 font-hand text-3xl font-semibold text-ink">
      <span className={`flex h-9 w-9 items-center justify-center rounded-full border ${accent.chip}`}>
        <Icon size={17} aria-hidden="true" />
      </span>
      {title}
    </h2>
  );
}

export default function ProjectPage({ slug }) {
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="font-hand text-2xl text-terracotta">~ A blank page ~</p>
        <h1 className="mt-2 font-hand text-5xl font-bold text-ink">Chapter not found</h1>
        <p className="mx-auto mt-4 max-w-md text-inksoft">
          This page of the storybook seems to be missing. Head back to the shelf and pick
          another bookmark.
        </p>
        <button
          type="button"
          onClick={() => {
            navigate('/');
            window.setTimeout(() => scrollToSection('bookshelf'), 120);
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/25 bg-white/80 px-5 py-2.5 font-hand text-xl text-ink transition hover:-translate-y-0.5 hover:bg-white"
        >
          <ArrowLeft size={18} aria-hidden="true" /> Back to the shelf
        </button>
      </main>
    );
  }

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const accent = ACCENTS[project.accent];

  return (
    <main id="project-chapter" className="relative mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6">
      <MarginDoodle side="left" caption={project.doodleCaption}>
        <ProjectDoodle name={project.doodle} className="h-32 w-32" />
      </MarginDoodle>
      <button
        type="button"
        onClick={() => {
          navigate('/');
          window.setTimeout(() => scrollToSection('bookshelf'), 120);
        }}
        className="inline-flex items-center gap-2 font-hand text-xl text-inksoft transition hover:text-ink"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Back to the shelf
      </button>

      {/* Chapter header */}
      <header className="mt-8 text-center">
        <p className={`font-hand text-xl ${accent.text}`}>~ {project.kind} ~</p>
        <h1 className="mt-2 font-hand text-5xl font-bold leading-tight text-ink sm:text-6xl">
          {project.title}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg italic text-inksoft">{project.tagline}</p>
        <p className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 text-sm text-inksoft">
          <CalendarDays size={15} aria-hidden="true" />
          {project.date}
          {project.company ? ` · ${project.company}` : ''}
          {project.role ? ` · ${project.role}` : ''}
        </p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag} className={`rounded-full border px-3 py-1 text-sm ${accent.chip}`}>
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <div className="rule-dashed my-10" aria-hidden="true" />

      {/* Overview */}
      <section aria-labelledby="overview-heading">
        <ChapterHeading icon={BookOpen} title="Overview" accent={accent} />
        <span id="overview-heading" className="sr-only">
          Overview
        </span>
        <p className="mt-4 leading-relaxed text-ink/90">{project.overview}</p>
      </section>

      {/* Build story */}
      <section className="mt-12" aria-labelledby="build-heading">
        <ChapterHeading icon={Layers} title="The Build Story" accent={accent} />
        <span id="build-heading" className="sr-only">
          The Build Story
        </span>
        <ol className="mt-6 space-y-0">
          {project.buildStory.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
              {i < project.buildStory.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[17px] top-10 h-[calc(100%-2.5rem)] border-l-2 border-dashed border-ink/20"
                />
              )}
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-hand text-xl text-white ${accent.bg}`}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-hand text-2xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 leading-relaxed text-ink/90">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Concepts learned */}
      <section className="mt-12" aria-labelledby="concepts-heading">
        <ChapterHeading icon={Lightbulb} title="Concepts I Learned" accent={accent} />
        <span id="concepts-heading" className="sr-only">
          Concepts I Learned
        </span>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.concepts.map((concept) => (
            <li key={concept} className="paper-card flex items-start gap-2.5 p-4">
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-sage"
                aria-hidden="true"
              />
              <span className="text-[15px] leading-relaxed text-ink/90">{concept}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Issues faced */}
      <section className="mt-12" aria-labelledby="issues-heading">
        <ChapterHeading icon={AlertTriangle} title="Issues I Faced & Fixes" accent={accent} />
        <span id="issues-heading" className="sr-only">
          Issues I Faced and Fixes
        </span>
        <ul className="mt-6 space-y-5">
          {project.issues.map((item) => (
            <li key={item.issue} className="paper-card p-5">
              <div className="flex items-start gap-2.5">
                <AlertTriangle
                  size={17}
                  className="mt-1 shrink-0 text-terracotta"
                  aria-hidden="true"
                />
                <p className="leading-relaxed text-ink/90">
                  <span className="font-hand text-xl text-terracotta">The issue — </span>
                  {item.issue}
                </p>
              </div>
              <div className="mt-3 flex items-start gap-2.5 border-t border-ink/10 pt-3">
                <Wrench size={17} className="mt-1 shrink-0 text-sage" aria-hidden="true" />
                <p className="leading-relaxed text-ink/90">
                  <span className="font-hand text-xl text-sage">The fix — </span>
                  {item.fix}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Stack + outcomes */}
      <section className="mt-12 grid gap-8 sm:grid-cols-2">
        <div aria-labelledby="stack-heading">
          <ChapterHeading icon={Layers} title="Tech Stack" accent={accent} />
          <span id="stack-heading" className="sr-only">
            Tech Stack
          </span>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-ink/15 bg-white/70 px-3 py-1.5 text-sm text-ink/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div aria-labelledby="outcomes-heading">
          <ChapterHeading icon={Flag} title="Outcomes" accent={accent} />
          <span id="outcomes-heading" className="sr-only">
            Outcomes
          </span>
          <ul className="mt-5 space-y-2.5">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={17}
                  className={`mt-0.5 shrink-0 ${accent.text}`}
                  aria-hidden="true"
                />
                <span className="text-[15px] leading-relaxed text-ink/90">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tools I used */}
      <section className="mt-12" aria-labelledby="tools-heading">
        <ChapterHeading icon={Hammer} title="Tools I Used" accent={accent} />
        <span id="tools-heading" className="sr-only">
          Tools I Used
        </span>
        <p className="mt-2 text-inksoft">The kit I reached for while building this chapter.</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.tools.map((tool) => (
            <li key={tool.name} className="paper-card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${accent.bg}`} aria-hidden="true" />
                <h3 className="font-hand text-xl font-semibold text-ink">{tool.name}</h3>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/80">{tool.use}</p>
            </li>
          ))}
        </ul>
      </section>

      {project.source && (
        <p className="mt-10 text-center">
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="font-hand text-xl text-inksoft underline decoration-dotted underline-offset-4 transition hover:text-ink"
          >
            View the source on GitHub
          </a>
        </p>
      )}

      <div className="rule-dashed my-10" aria-hidden="true" />

      {/* Next chapter */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => navigate(`/project/${next.slug}`)}
          className="group inline-flex items-center gap-2 rounded-full border border-ink/25 bg-white/80 px-5 py-2.5 font-hand text-xl text-ink transition hover:-translate-y-0.5 hover:bg-white"
        >
          Next chapter: {next.shortTitle}
          <ArrowRight
            size={18}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </main>
  );
}
