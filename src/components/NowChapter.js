import { Database, ShieldCheck, Workflow, Zap, ArrowRight } from 'lucide-react';
import { DatabaseDoodle, MarginDoodle } from './Doodles';
import { nowStatus } from '../data/projects';
import { navigate } from '../router/useHashRoute';

const HIGHLIGHTS = [
  {
    icon: Database,
    text: 'Multi-tenant PostgreSQL built on isolated schemas and atomic transactions — 100% data isolation across every enterprise tenant.',
  },
  {
    icon: Workflow,
    text: 'An AST-based workflow engine with conditional branching and parallel execution gates across 15+ configurable policy workflows.',
  },
  {
    icon: ShieldCheck,
    text: 'Per-tenant RBAC, django-axes brute-force mitigation, and Template Snapshotting that secures audit trails for 50+ compliance reviews.',
  },
  {
    icon: Zap,
    text: 'A reactive, SPA-like interface in HTMX + Tailwind CSS — roughly 30% lighter payloads with real-time server-client state sync.',
  },
];

export default function NowChapter() {
  return (
    <section id="now" className="scroll-mt-24">
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <MarginDoodle side="left" caption="schemas & safeguards…">
          <DatabaseDoodle className="h-32 w-32" />
        </MarginDoodle>
        <div className="text-center">
          <p className="font-hand text-xl text-sage">~ The Chapter in Progress ~</p>
          <h2 className="mt-1 font-hand text-4xl font-bold text-ink sm:text-5xl">
            Where I Am Right Now
          </h2>
        </div>

        <div className="paper-card relative mt-10 p-6 sm:p-9">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 rounded-sm bg-sage/30 shadow-sm"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage/15 px-3 py-1 font-hand text-lg text-ink">
              <span className="pulse-dot h-2 w-2 rounded-full bg-sage" aria-hidden="true" />
              In Progress
            </span>
            <span className="text-sm text-inksoft">{nowStatus.period}</span>
          </div>

          <h3 className="mt-4 font-hand text-3xl font-semibold text-ink sm:text-4xl">
            {nowStatus.title}
          </h3>
          <p className="mt-1 text-inksoft">
            {nowStatus.role} · {nowStatus.company}, {nowStatus.place}
          </p>
          <p className="mt-4 leading-relaxed text-ink/90">{nowStatus.blurb}</p>

          <ul className="mt-6 space-y-3.5">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sage/40 bg-sage/15">
                  <Icon size={15} className="text-ink" aria-hidden="true" />
                </span>
                <span className="text-[15px] leading-relaxed text-ink/90">{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => navigate(`/project/${nowStatus.slug}`)}
              className="group inline-flex items-center gap-2 rounded-full border border-sage/50 bg-sage/15 px-5 py-2.5 font-hand text-xl text-ink transition hover:-translate-y-0.5 hover:bg-sage/25"
            >
              Read the full story
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="rule-dashed mx-auto max-w-3xl" aria-hidden="true" />
    </section>
  );
}
