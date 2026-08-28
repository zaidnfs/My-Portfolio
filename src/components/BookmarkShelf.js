import { useState } from 'react';
import { ArrowRight, CalendarDays, Folders } from 'lucide-react';
import { MarginDoodle, OpenBookDoodle, ProjectDoodle } from './Doodles';
import { ACCENTS, projects } from '../data/projects';
import { navigate } from '../router/useHashRoute';

// The Bookmark Shelf — project bookmarks poking out of a book edge.
// Clicking a bookmark slides open its summary card; the full story lives
// on a dedicated page, reached through "Read the full story".

export default function BookmarkShelf() {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);
  const active = projects.find((p) => p.slug === activeSlug) || projects[0];
  const accent = ACCENTS[active.accent];

  return (
    <section id="bookshelf" className="relative mx-auto max-w-3xl scroll-mt-24 px-4 py-16 sm:px-6">
      <MarginDoodle side="right" caption="every ribbon is a chapter…">
        <OpenBookDoodle className="h-32 w-32" />
      </MarginDoodle>
      <div className="text-center">
        <p className="font-hand text-xl text-terracotta">~ Pull a Ribbon ~</p>
        <h2 className="mt-1 font-hand text-4xl font-bold text-ink sm:text-5xl">
          The Bookmark Shelf
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-inksoft">
          Every project is a chapter of this book. Pick a bookmark for a glimpse of the
          story — the whole chapter opens on its own page.
        </p>
      </div>

      <div className="mt-12">
        {/* Ribbon tabs */}
        <div
          role="tablist"
          aria-label="Project bookmarks"
          className="flex items-end justify-center gap-2 overflow-x-auto px-2 sm:gap-4"
        >
          {projects.map((p) => {
            const acc = ACCENTS[p.accent];
            const isActive = p.slug === active.slug;
            return (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-expanded={isActive}
                title={p.title}
                onClick={() => setActiveSlug(p.slug)}
                style={{ writingMode: 'vertical-rl' }}
                className={`ribbon-notch relative z-10 flex h-28 w-12 shrink-0 items-center justify-center border font-hand text-xl text-white shadow-md transition-all duration-300 sm:h-32 sm:w-14 ${
                  acc.bg
                } ${acc.border} ${
                  isActive
                    ? 'translate-y-2 brightness-105'
                    : 'opacity-75 hover:-translate-y-1 hover:opacity-100'
                }`}
              >
                <span className="drop-shadow-sm">{p.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* The book block the ribbons hang from */}
        <div className="rounded-b-2xl border border-t-0 border-ink/15 bg-paperdark/70 p-1 shadow-[0_18px_40px_-18px_rgba(47,42,36,0.35)]">
          <div className="h-2.5 rounded-t-xl bg-ink/10" aria-hidden="true" />
          <div key={active.slug} className="card-in relative p-5 sm:p-8">
            <ProjectDoodle
              name={active.doodle}
              className="absolute right-4 top-4 h-14 w-14 rotate-6 text-ink/40 sm:right-8 sm:top-6"
            />
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-hand text-lg ${accent.chip}`}
              >
                <Folders size={14} aria-hidden="true" />
                {active.kind}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-white/70 px-3 py-1 font-hand text-lg text-inksoft">
                <CalendarDays size={14} aria-hidden="true" />
                {active.date}
              </span>
            </div>

            <h3 className="mt-4 font-hand text-3xl font-semibold text-ink sm:text-4xl">
              {active.title}
            </h3>
            <p className="mt-1 text-lg italic text-inksoft">{active.tagline}</p>
            <p className="mt-4 leading-relaxed text-ink/90">{active.summary}</p>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {active.tags.map((tag) => (
                <li
                  key={tag}
                  className={`rounded-full border px-3 py-1 text-sm ${accent.chip}`}
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => navigate(`/project/${active.slug}`)}
                className="group inline-flex items-center gap-2 rounded-full border border-ink/25 bg-white/80 px-5 py-2.5 font-hand text-xl text-ink transition hover:-translate-y-0.5 hover:bg-white"
              >
                Read the full story
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              {active.source && (
                <a
                  href={active.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-hand text-xl text-inksoft underline decoration-dotted underline-offset-4 transition hover:text-ink"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
