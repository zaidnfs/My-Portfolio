import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { EnvelopePlaneDoodle, MarginDoodle } from './Doodles';
import { profile } from '../data/projects';

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24">
      <svg
        viewBox="0 0 400 14"
        className="mx-auto h-4 w-full max-w-3xl text-ink/30"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 7 Q 25 1, 50 7 T 100 7 T 150 7 T 200 7 T 250 7 T 300 7 T 350 7 T 400 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
      <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-8 text-center sm:px-6">
        <MarginDoodle side="right" caption="off it goes…">
          <EnvelopePlaneDoodle className="h-32 w-32" />
        </MarginDoodle>
        <p className="font-hand text-3xl text-ink">Write back, won&rsquo;t you?</p>
        <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 text-ink/90 transition hover:text-terracotta"
          >
            <Mail size={16} className="text-terracotta" aria-hidden="true" />
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
            className="flex items-center gap-2 text-ink/90 transition hover:text-terracotta"
          >
            <Phone size={16} className="text-terracotta" aria-hidden="true" />
            {profile.phone}
          </a>
          <p className="flex items-center gap-2 text-ink/90">
            <MapPin size={16} className="text-terracotta" aria-hidden="true" />
            {profile.location}
          </p>
        </div>

        <div className="mt-7 flex items-center justify-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-ink/15 bg-white/70 p-2.5 text-ink transition hover:-translate-y-0.5 hover:bg-white"
          >
            <Github size={18} aria-hidden="true" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-ink/15 bg-white/70 p-2.5 text-ink transition hover:-translate-y-0.5 hover:bg-white"
          >
            <Linkedin size={18} aria-hidden="true" />
          </a>
          <a
            href={profile.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="rounded-full border border-ink/15 bg-white/70 p-2.5 text-ink transition hover:-translate-y-0.5 hover:bg-white"
          >
            <Twitter size={18} aria-hidden="true" />
          </a>
        </div>

        <p className="mt-9 text-sm text-inksoft">
          © {new Date().getFullYear()} Mohammad Zaid Alam · hand-bound with React &amp;
          Tailwind CSS on dotted paper.
        </p>
      </div>
    </footer>
  );
}
