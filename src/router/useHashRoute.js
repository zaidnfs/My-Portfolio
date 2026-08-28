import { useEffect, useState } from 'react';

// A tiny hash-based router. Hash routes (`#/project/slug`) are deliberately
// used instead of the History API so the site never 404s on refresh when
// hosted from a sub-path on GitHub Pages.

function parseRoute() {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw || raw === '/') return '/';
  return raw.startsWith('/') ? raw : `/${raw}`;
}

export function navigate(path) {
  if (parseRoute() === path) {
    return;
  }
  window.location.hash = path;
}

export function useHashRoute() {
  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}
