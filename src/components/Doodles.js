// Hand-drawn style margin doodles. Every doodle is a stroke-based SVG in a
// 96x96 box, drawn with wobbly paths so it reads as a pencil sketch on the
// paper. Inner <g> accents pick up their own text color (terracotta, sage,
// mustard, dustyblue) while everything else inherits the wrapper's ink color.

export function PencilDoodle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M34 60 L62 32 q2 -2 4 0 l6 6 q2 2 0 4 L44 70 Z" />
      <path d="M34 60 L24 71 L44 70" />
      <path d="M28 68 l3 2" />
      <path d="M50 46 l10 10" />
      <path d="M57 39 l10 10" />
      <path d="M66 24 q7 -3 10 4 q2 7 -6 10" />
      <g className="text-terracotta">
        <path d="M21 78 q9 5 18 2 t18 -3 t16 1" strokeDasharray="1 6" />
      </g>
    </svg>
  );
}

export function DatabaseDoodle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 24 c9 -6 27 -6 36 0 c-9 6 -27 6 -36 0 Z" />
      <path d="M24 24 v37 c9 6 27 6 36 0 v-37" />
      <path d="M24 36 c9 6 27 6 36 0" />
      <path d="M24 48 c9 6 27 6 36 0" />
      <g className="text-sage">
        <path d="M58 52 l11 -4 11 4 v12 q0 9 -11 13 q-11 -4 -11 -13 Z" />
        <path d="M64 61 l4 4 8 -9" />
      </g>
    </svg>
  );
}

export function RocketDoodle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M48 12 q13 11 13 31 q0 15 -13 27 q-13 -12 -13 -27 q0 -20 13 -31 Z" />
      <circle cx="48" cy="38" r="6" />
      <path d="M35 55 q-9 3 -11 16 q9 -3 13 -9" />
      <path d="M61 55 q9 3 11 16 q-9 -3 -13 -9" />
      <g className="text-terracotta">
        <path d="M44 72 q4 9 4 13 q4 -5 4 -13" />
        <path d="M18 20 l8 0 m-4 -4 l0 8" />
        <path d="M70 26 l8 0 m-4 -4 l0 8" />
      </g>
    </svg>
  );
}

export function ChatHeartDoodle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M33 23 q-11 0 -11 11 v16 q0 11 11 11 h13 l-2 12 13 -12 h6 q11 0 11 -11 v-16 q0 -11 -11 -11 Z" />
      <g className="text-terracotta">
        <path d="M48 34 c-3 -6 -12 -4 -12 2 c0 5 7 8 12 12 c5 -4 12 -7 12 -12 c0 -6 -9 -8 -12 -2 Z" />
      </g>
      <g className="text-sage">
        <path d="M16 68 l6 0 m-3 -3 l0 6" />
        <path d="M76 70 l6 0 m-3 -3 l0 6" />
      </g>
    </svg>
  );
}

export function ServerGlobeDoodle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="44" cy="42" r="23" />
      <path d="M44 19 q-11 23 0 46 q11 -23 0 -46" />
      <path d="M22 34 q22 7 44 0" />
      <text
        x="44"
        y="50"
        textAnchor="middle"
        fontSize="15"
        fontFamily="Caveat, cursive"
        fill="currentColor"
        stroke="none"
      >
        HTTP
      </text>
      <g className="text-terracotta">
        <path d="M12 58 q32 26 66 -2" />
        <path d="M78 56 l5 -3 -1 8" />
      </g>
    </svg>
  );
}

export function OpenBookDoodle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M48 30 q-14 -9 -30 -5 v37 q16 -4 30 5 Z" />
      <path d="M48 30 q14 -9 30 -5 v37 q-16 -4 -30 5 Z" />
      <path d="M48 30 v37" />
      <g className="text-terracotta">
        <path d="M30 28 v16 l4 -4 4 4 v-19" />
      </g>
      <g className="text-sage">
        <path d="M62 27 v16 l4 -4 4 4 v-19" />
      </g>
      <g className="text-mustard">
        <path d="M12 18 l6 0 m-3 -3 l0 6" />
      </g>
    </svg>
  );
}

export function PencilRulerDoodle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 74 L70 26 l6 6 L28 80 Z" />
      <path d="M36 60 l6 6 M44 52 l6 6 M52 44 l6 6 M60 36 l6 6" />
      <path d="M24 24 L58 58" />
      <path d="M30 18 L64 52" />
      <path d="M58 58 L74 72" />
      <path d="M64 52 L74 72" />
      <g className="text-terracotta">
        <path d="M68 66 l6 6" />
      </g>
    </svg>
  );
}

export function GradCapDoodle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M48 26 l34 14 -34 14 -34 -14 Z" />
      <path d="M34 48 v10 q14 9 28 0 v-10" />
      <g className="text-terracotta">
        <path d="M82 40 v15 q0 5 -5 6" />
        <circle cx="77" cy="64" r="2.5" />
      </g>
      <g className="text-mustard">
        <path d="M16 18 l6 0 m-3 -3 l0 6" />
      </g>
    </svg>
  );
}

export function RosetteBadgeDoodle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="48" cy="40" r="21" />
      <circle cx="48" cy="40" r="14" />
      <path d="M48 33 l2.5 5 5.5 1 -4 4 1 6 -5 -3 -5 3 1 -6 -4 -4 5.5 -1 Z" />
      <g className="text-mustard">
        <path d="M40 58 l-7 17 9 -5 4 9 6 -19" />
        <path d="M56 58 l7 17 -9 -5 -4 9 -6 -19" />
      </g>
    </svg>
  );
}

export function EnvelopePlaneDoodle({ className = '' }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 38 q26 -3 52 0 v28 q-26 3 -52 0 Z" />
      <path d="M22 38 l26 19 26 -19" />
      <g className="text-terracotta">
        <path d="M48 51 c-2 -4 -8 -2 -8 2 c0 4 5 6 8 8 c3 -2 8 -4 8 -8 c0 -4 -6 -6 -8 -2 Z" />
      </g>
      <g className="text-sage">
        <path d="M78 26 q10 -12 14 -9" strokeDasharray="2 5" />
        <path d="M90 12 l3 9 -9 -3 Z" />
      </g>
    </svg>
  );
}

// A sketch hanging in the margin beside a section. Alternating sides across
// sections keeps the page feeling hand-annotated; hidden below xl so smaller
// screens stay clean and nothing ever overflows.
export function MarginDoodle({ side = 'left', caption, children, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 hidden w-32 -translate-y-1/2 select-none xl:block ${
        side === 'left' ? '-left-40' : '-right-40'
      } ${className}`}
    >
      <div className={`flex flex-col items-center gap-1 ${side === 'left' ? '-rotate-3' : 'rotate-3'}`}>
        {children}
        {caption && (
          <p className="text-center font-hand text-xl leading-tight text-inksoft/75">{caption}</p>
        )}
      </div>
    </div>
  );
}

const PROJECT_DOODLES = {
  database: DatabaseDoodle,
  rocket: RocketDoodle,
  chat: ChatHeartDoodle,
  server: ServerGlobeDoodle,
};

export function ProjectDoodle({ name, className = '' }) {
  const Doodle = PROJECT_DOODLES[name] || OpenBookDoodle;
  return <Doodle className={className} />;
}

