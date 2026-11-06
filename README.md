# My Portfolio — A Storybook on Dotted Paper

The personal portfolio of **Mohammad Zaid Alam**, rebuilt as a warm, storybook-style
site on a dotted-paper canvas. Every project is a "chapter" that opens into a
dedicated detail page covering the full build story, concepts learned, and the
issues faced along the way.

Built with **React 19 + Create React App + Tailwind CSS 3** (no other runtime
dependencies). Routing is a tiny custom hash router, chosen so the site never
404s on refresh when hosted from a sub-path on GitHub Pages.

## Structure

```
src/
  data/projects.js       ← every word on the site: profile, chapters, skills
  router/useHashRoute.js ← hash router hook (#/, #/project/<slug>, #/aquarium)
  components/
    PaperCanvas.js       ← dotted-paper background + freehand doodle surface
    Doodles.js           ← hand-drawn margin sketches with captions
    Journey.js           ← winding milestone trail (data-driven)
    Navbar.js            ← sticky paper-tab navigation + Deep Sea lab link
    Hero.js              ← Chapter One: overview, contact & ambient ASCII ocean
    NowChapter.js        ← featured "currently working on" card
    BookmarkShelf.js     ← project bookmarks + inline summary cards
    NoteGrid.js          ← skills / education / certifications notes
    ProjectPage.js       ← dedicated chapter page per project (+ live ASCII sandbox)
    AquariumPage.js      ← full-screen interactive ASCII Sharks playground
    Footer.js            ← contact, socials & deep waters link
    ascii-ocean/         ← zero-dependency Canvas 2D ASCII simulation engine
      species.js         ← boid flocking, shark kinematic spines, hunting AI
      renderer.js        ← multi-theme ASCII rasterizer (paper, night, deep-sea, matrix, amber)
      world.js           ← physics simulation step, chum feeding, collision & splash
      engine.js          ← 60fps game loop, Resize/IntersectionObserver, telemetry
      math.js            ← vector math, PRNG hash, smoothing & clamping utilities
      AsciiOcean.js      ← React component wrapper with dynamic theme/roster syncing
```

## Features

- **Ambient Hero Ocean ("Ink on Parchment"):** A subtle ASCII ocean simulation swims exclusively behind the Hero chapter intro, rendering sharks and schools of fish with faint pencil-wash strokes and ink glyphs in daylight, and bioluminescent deep-sea glowing currents in night mode. Its position remains steady and seamless across theme toggles.
- **Deep Sea Night Mode:** Switching the lamp toggle shifts both the paper theme and the Hero ocean canvas without interrupting or resetting swimming trajectories.
- **Terminal Aquarium Sandbox (`#/aquarium`):** Dedicated full-screen interactive playground featuring 6 predator squad presets (Great White, Hammerhead, Pelagic Trio, Reef Patrol, etc.), 5 retro terminal color themes, chum feeding, splash mechanics, and real-time telemetry HUD.
- **Interactive Project Chapter (`#/project/ascii-sharks`):** Dedicated deep-dive into the ASCII Sharks engine architecture with an inline interactive canvas.
- **Zero Runtime Dependencies:** The entire simulation and rendering engine is implemented with pure vanilla Canvas 2D, ported and optimized without external graphics or physics libraries. Attribution to Andrew Hunter ([stackedlol/ascii-sharks](https://github.com/stackedlol/ascii-sharks)).

## Editing content

All copy lives in `src/data/projects.js` — add a project entry there and a new
bookmark ribbon, summary card, and full chapter page are generated automatically.

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`

Runs the Jest + Testing Library suite (CI mode: `npm test -- --watchAll=false`).

### `npm run build`

Builds the production bundle into `build/` (hosted at `/My-Portfolio/` per the
`homepage` field in `package.json`).

### `npm run deploy`

Builds and publishes to GitHub Pages via `gh-pages`.
