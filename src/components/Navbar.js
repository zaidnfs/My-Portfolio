import { navigate } from '../router/useHashRoute';

const LINKS = [
  { id: 'story', label: 'The Story' },
  { id: 'now', label: 'Now' },
  { id: 'bookshelf', label: 'Bookshelf' },
  { id: 'notes', label: 'Notes' },
  { id: 'contact', label: 'Contact' },
];

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar({ route }) {
  const go = (id) => {
    if (route !== '/') {
      navigate('/');
      // wait for the home page to mount, then glide to the section
      window.setTimeout(() => scrollToSection(id), 120);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => go('story')}
          className="font-hand text-2xl font-semibold text-ink transition hover:text-terracotta"
        >
          M. Zaid Alam
        </button>
        <nav aria-label="Primary" className="flex items-center gap-0.5 sm:gap-1">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="rounded-full px-2.5 py-1.5 font-hand text-lg text-ink/75 transition hover:bg-ink/5 hover:text-ink sm:px-3"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
