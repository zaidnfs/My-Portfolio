import { useEffect } from 'react';
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
import PaperCanvas from './components/PaperCanvas';
import ProjectPage from './components/ProjectPage';
import { useHashRoute } from './router/useHashRoute';

export default function App() {
  const route = useHashRoute();

  // Every route change starts at the top of the fresh page, like turning to a
  // new chapter.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  const projectMatch = route.match(/^\/project\/([\w-]+)$/);

  return (
    <div className="relative min-h-screen text-ink">
      <PaperCanvas />
      <div className="relative z-10">
        <Navbar route={route} />
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
          </main>
        )}
        <Footer />
      </div>
    </div>
  );
}
