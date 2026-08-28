import { BadgeCheck, GraduationCap, Trophy } from 'lucide-react';
import { certifications, education, skillGroups } from '../data/projects';

const TAPES = ['bg-mustard/30', 'bg-sage/30', 'bg-terracotta/25', 'bg-dustyblue/30'];

function SectionHeading({ kicker, title, sub }) {
  return (
    <div className="text-center">
      <p className="font-hand text-xl text-dustyblue">{kicker}</p>
      <h2 className="mt-1 font-hand text-4xl font-bold text-ink sm:text-5xl">{title}</h2>
      {sub && (
        <p className="mx-auto mt-3 max-w-xl text-inksoft">{sub}</p>
      )}
    </div>
  );
}

function Note({ tapeIndex = 0, children }) {
  return (
    <div className="paper-card relative p-5 pt-6">
      <span
        aria-hidden="true"
        className={`absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 rounded-sm shadow-sm ${TAPES[tapeIndex % TAPES.length]}`}
      />
      {children}
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="notes" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-16 sm:px-6">
      <SectionHeading
        kicker="~ Marginalia ~"
        title="Notes, Skills & Learnings"
        sub="The tools I keep sharpened, pinned to the inside cover."
      />
      <div className="mt-12 grid gap-7 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Note key={group.name} tapeIndex={i}>
            <h3 className="font-hand text-2xl font-semibold text-ink">{group.name}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-ink/15 bg-white/70 px-3 py-1 text-sm text-ink/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Note>
        ))}
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-10 sm:px-6">
      <SectionHeading kicker="~ The Study Hall ~" title="Education" />
      <div className="mt-10">
        <Note tapeIndex={2}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 font-hand text-2xl font-semibold text-ink">
              <GraduationCap size={22} className="text-dustyblue" aria-hidden="true" />
              {education.school}
            </h3>
            <span className="font-hand text-lg text-inksoft">{education.period}</span>
          </div>
          <p className="mt-1 text-ink/90">{education.degree}</p>
          <p className="text-sm text-inksoft">{education.place}</p>
          <ul className="mt-4 space-y-2">
            {education.notes.map((note) => (
              <li key={note} className="flex items-start gap-2 text-[15px] text-ink/90">
                <Trophy size={16} className="mt-0.5 shrink-0 text-mustard" aria-hidden="true" />
                {note}
              </li>
            ))}
          </ul>
        </Note>
      </div>
    </section>
  );
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-10 sm:px-6">
      <SectionHeading kicker="~ Stamps & Badges ~" title="Certifications & Training" />
      <div className="mt-10 grid gap-7 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <Note key={cert.name} tapeIndex={i + 1}>
            <h3 className="flex items-start gap-2 font-hand text-2xl font-semibold leading-snug text-ink">
              <BadgeCheck size={22} className="mt-1 shrink-0 text-sage" aria-hidden="true" />
              {cert.name}
            </h3>
            <p className="mt-2 text-sm text-inksoft">
              {cert.issuer} · {cert.year}
              {cert.extra ? ` · ${cert.extra}` : ''}
            </p>
          </Note>
        ))}
      </div>
    </section>
  );
}
