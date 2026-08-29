import { useState } from 'react';

// Two vintage pendant lamps — one hanging from each top corner — present in
// BOTH themes: lights off in daylight (bronze fixtures sketched in ink),
// glowing during night reading (`lit`), with cones and vignette only while
// lit. Purely decorative (aria-hidden, pointer-events-none wrapper) — the
// "pool of light" that follows the section being read is rendered by App.
// Use the navbar button or click either lamp to flick the theme.

export default function NightLamp({ lit = false, onToggle }) {
  const [kicking, setKicking] = useState('');

  // flicking one of the lamps toggles the theme and gives that fixture a kick
  const flick = (side) => {
    if (onToggle) onToggle();
    setKicking('');
    requestAnimationFrame(() => setKicking(side));
    window.setTimeout(() => setKicking(''), 950);
  };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5]">
      {lit && (
        /* the edges of the page fall into shadow — brightest under the lamps */
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 80% 26%, transparent 36%, rgba(6, 4, 2, 0.5) 100%), radial-gradient(ellipse at 20% 26%, transparent 36%, rgba(6, 4, 2, 0.5) 100%)',
          }}
        />
      )}

      {/* two vintage pendant lamps, one from each top corner, swaying gently */}
      {['right', 'left'].map((side) => {
        const isLeft = side === 'left';
        return (
          <div
            key={side}
            className={`absolute top-0 ${
              isLeft
                ? 'left-[6vw] sm:left-[9vw] lg:left-[12vw]'
                : 'right-[6vw] sm:right-[9vw] lg:right-[12vw]'
            }`}
          >
            <div
              className={`lamp-sway lamp-toy pointer-events-auto flex flex-col items-center ${
                lit ? 'lamp-lit' : ''
              } ${kicking === side ? 'lamp-kick' : ''}`}
              onClick={() => flick(side)}
              title="Flick the lights"
            >
              <div className="h-3 w-px bg-ink/25" />
          <svg
            width="120"
            height="176"
            viewBox="0 0 120 176"
            fill="none"
            className="text-ink"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id={`lamp-bulb-glow-${side}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 210, 140, 0.5)" />
                <stop offset="45%" stopColor="rgba(255, 196, 120, 0.2)" />
                <stop offset="100%" stopColor="rgba(255, 196, 120, 0)" />
              </radialGradient>
              <linearGradient id={`lamp-shade-${side}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(66 50 32)" />
                <stop offset="55%" stopColor="rgb(46 34 22)" />
                <stop offset="100%" stopColor="rgb(58 44 27)" />
              </linearGradient>
            </defs>

            {/* ceiling canopy */}
            <path
              d="M52 5 q8 -5 16 0 l5 10 q-13 5 -26 0 Z"
              fill="rgb(56 42 26)"
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="60" cy="17" r="2.5" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />

            {/* chain links */}
            <g stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5">
              <ellipse cx="60" cy="24" rx="2.5" ry="5" />
              <ellipse cx="60" cy="33" rx="5" ry="2.5" />
              <ellipse cx="60" cy="42" rx="2.5" ry="5" />
              <ellipse cx="60" cy="51" rx="5" ry="2.5" />
            </g>

            {/* warm glow around the bulb — bright at night, a tease on hover */}
            <g className="lamp-glow">
              <circle cx="60" cy="128" r="48" fill={`url(#lamp-bulb-glow-${side})`} opacity="0.5" />
              <circle cx="60" cy="128" r="32" fill={`url(#lamp-bulb-glow-${side})`} />
            </g>

            {/* finial knob joining chain to shade */}
            <circle
              cx="60"
              cy="59"
              r="3"
              fill="rgb(56 42 26)"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />

            {/* empire shade with panel ribs */}
            <path
              d="M49 66 Q60 60 71 66 L93 110 Q97 117 89 117 L31 117 Q23 117 27 110 Z"
              fill={`url(#lamp-shade-${side})`}
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <g stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5">
              <path d="M53 68 L37 112" />
              <path d="M60 67 L60 112" />
              <path d="M67 68 L83 112" />
            </g>

            {/* scalloped brass trim along the shade's edge */}
            <path
              d="M28 115 q8 9 16 0 q8 9 16 0 q8 9 16 0 q8 9 16 0"
              stroke="rgba(217, 164, 65, 0.8)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* hanging beads at the trim peaks */}
            <g stroke="rgba(201, 123, 93, 0.85)" strokeWidth="1.5">
              <path d="M36 120 v6" />
              <path d="M84 120 v6" />
            </g>
            <g fill="rgb(219 141 110)">
              <circle cx="36" cy="129" r="2.2" />
              <circle cx="84" cy="129" r="2.2" />
            </g>

            {/* Edison bulb — glowing at night, pale glass in daylight */}
            <circle
              className="lamp-bulb"
              cx="60"
              cy="128"
              r="9"
              stroke={lit ? 'rgba(255, 196, 120, 0.85)' : 'currentColor'}
              strokeOpacity={lit ? undefined : 0.5}
              strokeWidth="1.5"
            />
            <path
              d="M56 126 q2 -4 4 0 q2 4 4 0"
              stroke={lit ? 'rgb(201 123 93)' : 'currentColor'}
              strokeOpacity={lit ? undefined : 0.4}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M56 137 h8 M57 140 q3 2 6 0"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
            </div>
          </div>
        );
      })}

      {lit && (
        <>
          {/* cones of light fanning from both corners across the page */}
          <div
            className="absolute right-0 top-[150px] h-[62vh] w-[min(96vw, 1150px)]"
            style={{
              background:
                'radial-gradient(ellipse at 80% 0%, rgba(255, 196, 120, 0.10), rgba(255, 196, 120, 0.03) 45%, transparent 72%)',
            }}
          />
          <div
            className="absolute left-0 top-[150px] h-[62vh] w-[min(96vw, 1150px)]"
            style={{
              background:
                'radial-gradient(ellipse at 20% 0%, rgba(255, 196, 120, 0.10), rgba(255, 196, 120, 0.03) 45%, transparent 72%)',
            }}
          />
        </>
      )}
    </div>
  );
}
