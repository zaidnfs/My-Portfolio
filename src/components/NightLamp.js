// Night reading: a pendant lamp hangs from the top-right corner and pours warm
// light onto the page. Purely decorative (aria-hidden, pointer-events-none) —
// the "pool of light" that follows the section being read is rendered by App.
// To hang it from the other corner instead, swap the lamp's right-* offsets
// for left-* and mirror the cone/vignette gradient positions.

export default function NightLamp() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5]">
      {/* the edges of the page fall into shadow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 68% 32%, transparent 38%, rgba(6, 4, 2, 0.45) 100%)',
        }}
      />

      {/* the lamp itself, hanging from the top-right corner, swaying gently */}
      <div className="absolute right-[6vw] top-0 sm:right-[9vw] lg:right-[12vw]">
        <div className="lamp-sway flex flex-col items-center">
          <div className="h-16 w-px bg-paper/25" />
          <svg width="88" height="50" viewBox="0 0 88 50" fill="none" aria-hidden="true">
            <path
              d="M8 12 Q44 -8 80 12 L68 32 Q44 40 20 32 Z"
              fill="rgb(38 31 23)"
              stroke="rgba(242, 233, 216, 0.35)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="44" cy="38" r="5.5" fill="rgb(255 214 140)" />
          </svg>
          <div
            className="-mt-2 h-28 w-28 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 206, 130, 0.32), rgba(255, 206, 130, 0.07) 55%, transparent 74%)',
            }}
          />
        </div>
      </div>

      {/* a faint cone of light fanning from the corner across the page */}
      <div
        className="absolute right-0 top-[120px] h-[62vh] w-[min(96vw, 1150px)]"
        style={{
          background:
            'radial-gradient(ellipse at 80% 0%, rgba(255, 196, 120, 0.10), rgba(255, 196, 120, 0.03) 45%, transparent 72%)',
        }}
      />
    </div>
  );
}
