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
  router/useHashRoute.js ← hash router hook (#/ and #/project/<slug>)
  components/
    PaperCanvas.js       ← dotted-paper background + optional doodle mode
    Doodles.js           ← hand-drawn margin sketches with captions
    Journey.js           ← winding milestone trail (data-driven)
    Navbar.js            ← sticky paper-tab navigation
    Hero.js              ← Chapter One: overview & contact
    NowChapter.js        ← featured "currently working on" card
    BookmarkShelf.js     ← project bookmarks + inline summary cards
    NoteGrid.js          ← skills / education / certifications notes
    ProjectPage.js       ← dedicated chapter page per project
    Footer.js            ← contact & socials
```

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
