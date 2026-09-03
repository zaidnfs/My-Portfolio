import { ACCENTS, milestones } from '../data/projects';

// The journey — a hand-drawn dotted trail winding down the middle of the
// section, with a coloured pin for every milestone and cards alternating
// left/right of the path. Milestones live in data/projects.js: add one there
// and the trail grows automatically. On small screens the curve is hidden and
// the cards stack along a dashed notebook rule instead.

const ACCENT_HEX = {
  sage: '#8fa68e',
  terracotta: '#c97b5d',
  dustyblue: '#7d93a8',
  mustard: '#d9a441',
};

const ACCENT_KEYS = ['sage', 'terracotta', 'dustyblue', 'mustard'];

const ROW_HEIGHT = 190;
const TOP_PAD = 60;

export default function JourneySection() {
  const count = milestones.length;
  const height = TOP_PAD * 2 + count * ROW_HEIGHT;
  const yOf = (i) => TOP_PAD + i * ROW_HEIGHT + ROW_HEIGHT / 2;

  // build the winding dotted path between the card anchors
  let path = `M 500 12 C 500 70, 500 95, 500 ${yOf(0)}`;
  for (let i = 1; i < count; i += 1) {
    const bulge = i % 2 === 1 ? 1 : -1;
    path += ` C ${500 + bulge * 230} ${yOf(i - 1) + 80}, ${500 - bulge * 230} ${yOf(i) - 80}, 500 ${yOf(i)}`;
  }
  path += ` C 500 ${yOf(count - 1) + 90}, 500 ${height - 90}, 500 ${height - 24}`;

  return (
    <section id="journey" className="relative mx-auto max-w-3xl scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="text-center">
        <p className="font-hand text-xl text-dustyblue">~ The Road So Far ~</p>
        <h2 className="mt-1 font-hand text-4xl font-bold text-ink sm:text-5xl">
          Milestones Along the Way
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-inksoft">
          Little pins along the trail — it keeps growing as life happens.
        </p>
      </div>

      <div className="journey-body relative mt-12" style={{ '--jh': `${height}px` }}>
        <svg
          className="journey-curve absolute inset-0 h-full w-full text-ink"
          viewBox={`0 0 1000 ${height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="0.1 14"
            vectorEffect="non-scaling-stroke"
          />
          {milestones.map((m, i) => {
            const hex = ACCENT_HEX[m.accent] || ACCENT_HEX[ACCENT_KEYS[i % ACCENT_KEYS.length]];
            return (
              <g key={m.date}>
                <circle
                  cx="500"
                  cy={yOf(i)}
                  r="12"
                  fill="none"
                  stroke={hex}
                  strokeOpacity="0.45"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx="500" cy={yOf(i)} r="6.5" style={{ fill: hex }} />
              </g>
            );
          })}
          {/* the open dot where the trail keeps going */}
          <circle
            cx="500"
            cy={height - 24}
            r="8"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {milestones.map((m, i) => {
          const accent = ACCENTS[m.accent] || ACCENTS[ACCENT_KEYS[i % ACCENT_KEYS.length]];
          return (
            <div
              key={m.date + m.title}
              className={`journey-item ${i % 2 === 0 ? 'j-left' : 'j-right'}`}
              style={{ '--jy': `${yOf(i)}px` }}
            >
              <div className="paper-card p-5">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-hand text-lg ${accent.chip}`}>
                  {m.date}
                </span>
                <h3 className="mt-2 font-hand text-2xl font-semibold text-ink">{m.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/85">{m.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center font-hand text-xl text-inksoft">…to be continued…</p>
    </section>
  );
}