import { useEffect, useState } from 'react';
import BookmarkShelf from './components/BookmarkShelf';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import NowChapter from './components/NowChapter';
import {
  CertificationsSection,
  EducationSection,
  SkillsSection,
} from './components/NoteGrid';
import JourneySection from './components/Journey';
import PaperCanvas from './components/PaperCanvas';
import NightLamp from './components/NightLamp';
import ProjectPage from './components/ProjectPage';
import { useHashRoute } from './router/useHashRoute';

export default function App() {
  const route = useHashRoute();

  // Every route change starts at the top of the fresh page, like turning to a
  // new chapter.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // Night reading — the lamp preference survives page reloads.
  const [dark, setDark] = useState(() => {
    try {
      return window.localStorage.getItem('storybook-theme') === 'night';
    } catch (err) {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      window.localStorage.setItem('storybook-theme', dark ? 'night' : 'day');
    } catch (err) {
      /* storage unavailable — theme just won't persist */
    }
  }, [dark]);

  // The lamp pool: while reading at night, find the section nearest the
  // middle of the viewport and pour warm light over exactly that section.
  const toggleTheme = () => setDark((v) => !v);
  const [litRect, setLitRect] = useState(null);
  useEffect(() => {
    if (!dark) {
      setLitRect(null);
      return undefined;
    }
    let raf;
    const update = () => {
      const onProject = route.match(/^\/project\//);
      const ids = onProject
        ? ['project-chapter', 'contact']
        : ['story', 'now', 'bookshelf', 'notes', 'education', 'certifications', 'journey', 'contact'];
      const mid = window.innerHeight / 2;
      let best = null;
      let bestDist = Infinity;
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = rect;
        }
      });
      setLitRect(
        best
          ? {
              top: best.top - 28,
              left: best.left - 40,
              width: best.width + 80,
              height: best.height + 56,
            }
          : null
      );
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [dark, route]);

  const projectMatch = route.match(/^\/project\/([\w-]+)$/);

  return (
    <div className="relative min-h-screen text-ink">
      <PaperCanvas dark={dark} />
      {dark && litRect && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[5] transition-all duration-700 ease-out"
          style={{
            top: litRect.top,
            left: litRect.left,
            width: litRect.width,
            height: litRect.height,
            background:
              'radial-gradient(ellipse at 50% 45%, rgba(255, 196, 120, 0.10), rgba(255, 196, 120, 0.04) 48%, transparent 72%)',
          }}
        />
      )}
      <NightLamp lit={dark} onToggle={toggleTheme} />
      <div className="relative z-10">
        <Navbar route={route} dark={dark} onToggleTheme={toggleTheme} />
        {projectMatch ? (
          <ProjectPage slug={projectMatch[1]} />
        ) : (
          <main>
            <Hero />
            <NowChapter />
            <BookmarkShelf />
            <SkillsSection />
            <EducationSection />
            <CertificationsSection />
            <JourneySection />
          </main>
        )}
        <Footer />
      </div>
    </div>
  );
}
