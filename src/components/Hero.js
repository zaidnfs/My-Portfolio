import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { MarginDoodle, PencilDoodle } from './Doodles';
import { profile } from '../data/projects';

function ContactChip({ href, icon: Icon, label, external = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-4 py-2 text-sm text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-terracotta/50 hover:bg-white"
    >
      <Icon size={16} className="text-terracotta" aria-hidden="true" />
      {label}
    </a>
  );
}

export default function Hero() {
  return (
    <section id="story" className="scroll-mt-24">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-20">
        <MarginDoodle side="right" caption="once upon a commit…">
          <PencilDoodle className="h-32 w-32" />
        </MarginDoodle>
        <p className="font-hand text-xl text-terracotta">~ Chapter One ~</p>
        <h1 className="mt-2 font-hand text-6xl font-bold leading-tight text-ink sm:text-7xl">
          {profile.name}
        </h1>
        <svg
          viewBox="0 0 220 12"
          className="mt-1 h-3 w-52 text-terracotta"
          aria-hidden="true"
        >
          <path
            d="M3 8 C 40 2, 80 10, 118 6 S 190 4, 217 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <p className="mt-5 text-lg text-ink sm:text-xl">{profile.role}</p>
        <p className="mt-2 font-hand text-xl text-inksoft">{profile.subrole}</p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-inksoft">
          <MapPin size={15} className="text-sage" aria-hidden="true" />
          {profile.location}
        </p>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink/90 sm:text-lg">
          {profile.intro}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ContactChip href={`mailto:${profile.email}`} icon={Mail} label={profile.email} />
          <ContactChip href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`} icon={Phone} label={profile.phone} />
          <ContactChip href={profile.github} icon={Github} label="GitHub" external />
          <ContactChip href={profile.linkedin} icon={Linkedin} label="LinkedIn" external />
        </div>
      </div>
      <div className="rule-dashed mx-auto max-w-3xl" aria-hidden="true" />
    </section>
  );
}
