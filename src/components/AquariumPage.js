import { useEffect, useState, useRef } from 'react';
import {
  ArrowLeft,
  Fish,
  Info,
  Maximize2,
  Minimize2,
  Sliders,
  Sparkles,
  Terminal,
  Waves,
} from 'lucide-react';
import { AsciiOcean, THEME_CONFIGS } from './ascii-ocean';
import { navigate } from '../router/useHashRoute';

const PRESET_ROSTERS = {
  frenzy: {
    label: 'Apex Frenzy (4 Species)',
    sharks: [
      { kind: 'hammerhead', size: 1.0 },
      { kind: 'mako', size: 0.85 },
      { kind: 'tiger', size: 0.75 },
      { kind: 'thresher', size: 0.7 },
    ],
  },
  hammerhead: {
    label: 'Hammerhead Patrol',
    sharks: [
      { kind: 'hammerhead', size: 1.0 },
      { kind: 'hammerhead', size: 0.78 },
      { kind: 'greathammer', size: 0.68 },
    ],
  },
  mako: {
    label: 'Mako Torpedoes',
    sharks: [
      { kind: 'mako', size: 1.0 },
      { kind: 'mako', size: 0.75 },
    ],
  },
  thresher: {
    label: 'Thresher Whip-tails',
    sharks: [
      { kind: 'thresher', size: 1.0 },
      { kind: 'thresher', size: 0.8 },
    ],
  },
  tiger: {
    label: 'Tiger & Zebra Reef',
    sharks: [
      { kind: 'tiger', size: 1.0 },
      { kind: 'zebra', size: 0.82 },
      { kind: 'nurse', size: 0.7 },
    ],
  },
  classic: {
    label: 'Classic Squad',
    sharks: [
      { kind: 'classic', size: 1.0 },
      { kind: 'classic', size: 0.85 },
      { kind: 'classic', size: 0.72 },
    ],
  },
};

export default function AquariumPage() {
  const [selectedRoster, setSelectedRoster] = useState('frenzy');
  const [theme, setTheme] = useState('deep-sea');
  const [collapsedDeck, setCollapsedDeck] = useState(false);
  const [showArchitectureInfo, setShowArchitectureInfo] = useState(false);
  const [telemetry, setTelemetry] = useState({ fps: 60, liveFish: 180, sharks: [] });
  const engineRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Poll engine telemetry at modest interval for smooth HUD updates
  useEffect(() => {
    const timer = setInterval(() => {
      if (engineRef.current) {
        setTelemetry(engineRef.current.getTelemetry());
      }
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const handleFeed = () => {
    if (engineRef.current) {
      engineRef.current.feed(30);
    }
  };

  const handleSplash = () => {
    if (engineRef.current) {
      engineRef.current.splash();
    }
  };

  const currentThemeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS['deep-sea'];
  const isLight = currentThemeConfig.isLight;

  return (
    <div
      className={`relative min-h-screen w-full select-none overflow-hidden font-book transition-colors duration-500 ${
        isLight ? 'bg-paper text-ink' : 'bg-slate-950 text-slate-100'
      }`}
    >
      {/* The Fullscreen Interactive ASCII Ocean Canvas */}
      <AsciiOcean
        theme={theme}
        sharks={PRESET_ROSTERS[selectedRoster]?.sharks}
        interactive={true}
        onEngineReady={(engine) => {
          engineRef.current = engine;
        }}
        className="fixed inset-0 h-full w-full"
      />

      {/* Top Glass Navigation & Telemetry HUD */}
      <header
        className={`fixed left-0 right-0 top-0 z-30 border-b backdrop-blur-md transition-colors ${
          isLight
            ? 'border-ink/10 bg-paper/80 text-ink'
            : 'border-white/10 bg-slate-950/75 text-slate-100'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-hand text-lg transition hover:-translate-y-0.5 ${
                isLight
                  ? 'border-ink/15 bg-white/70 text-ink hover:border-terracotta/50 hover:bg-white'
                  : 'border-white/20 bg-white/10 text-white hover:border-cyan-400 hover:bg-white/20'
              }`}
            >
              <ArrowLeft size={16} />
              <span>Storybook</span>
            </button>
            <div className="hidden sm:block">
              <h1 className="font-hand text-xl font-semibold leading-none">
                Deep Waters Lab
              </h1>
              <p className="mt-0.5 text-xs opacity-65 font-mono">
                ASCII Ocean Physics · Artificial Life Simulation
              </p>
            </div>
          </div>

          {/* Telemetry Pills */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${
                telemetry.fps >= 50
                  ? isLight
                    ? 'border-sage/40 bg-sage/15 text-sage'
                    : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                  : 'border-amber-500/40 bg-amber-500/15 text-amber-400'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {telemetry.fps || 60} FPS
            </span>

            <span
              className={`hidden sm:flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${
                isLight ? 'border-ink/15 bg-white/60' : 'border-white/15 bg-white/5'
              }`}
            >
              <Fish size={13} className="text-terracotta" />
              {telemetry.liveFish} fish
            </span>

            <button
              type="button"
              onClick={() => setShowArchitectureInfo((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition ${
                showArchitectureInfo
                  ? 'border-terracotta bg-terracotta text-white'
                  : isLight
                  ? 'border-ink/15 bg-white/60 hover:bg-white'
                  : 'border-white/15 bg-white/10 hover:bg-white/20'
              }`}
              title="Architecture details"
            >
              <Info size={13} />
              <span className="hidden sm:inline">Engine Details</span>
            </button>
          </div>
        </div>
      </header>

      {/* Architecture Deep-Dive Modal Drawer */}
      {showArchitectureInfo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowArchitectureInfo(false)}
        >
          <div
            className={`relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border p-6 shadow-2xl ${
              isLight
                ? 'border-ink/15 bg-paper text-ink'
                : 'border-white/15 bg-slate-900 text-slate-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-current/15 pb-4">
              <div className="flex items-center gap-2">
                <Terminal size={20} className="text-terracotta" />
                <h3 className="font-hand text-2xl font-bold">
                  ASCII Sharks Architecture &amp; Mechanics
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowArchitectureInfo(false)}
                className="rounded-full p-1 opacity-70 hover:opacity-100 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm leading-relaxed opacity-90">
              <div>
                <h4 className="font-semibold text-terracotta uppercase tracking-wider text-xs">
                  1. Schooling Fish (Reynolds Boids + Couzin Zones)
                </h4>
                <p className="mt-1">
                  Fish behavior is computed at 60 FPS using Reynolds flocking rules (Separation, Alignment, Cohesion) inside directional Couzin zones with a ~127° forward field of view and a rear blind spot. Alarm state propagates like a neural wave across the school when a predator strikes.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-terracotta uppercase tracking-wider text-xs">
                  2. Predator Kinematics &amp; Hunting
                </h4>
                <p className="mt-1">
                  Sharks follow a 20-node follow-the-leader spine with joint stiffness constraints to prevent folding. A wandering circuit patrols the tank until hunger spikes, triggering forward-cone prey acquisition targeting isolated straggler fish rather than impenetrable bait balls.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-terracotta uppercase tracking-wider text-xs">
                  3. Canvas 2D ASCII Rasterization
                </h4>
                <p className="mt-1">
                  Cells are sampled on a fixed monospace typographic grid. Shark silhouettes are supersampled (5 sub-samples per cell) to produce anti-aliased edge glyphs (<code>{':;.,`\''}</code>), while the dorsal body is shaded with a density ramp (<code>{':;t%SX8#@'}</code>) modulated by lighting normals and species skin markers.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-terracotta uppercase tracking-wider text-xs">
                  4. Fluid Wake &amp; Pointer Disturbance
                </h4>
                <p className="mt-1">
                  Fish tail-beats, shark fins, and cursor movement deposit energy into a 2D scalar wake field. The wake diffuses with exponential decay, lighting background dot grid cells with bioluminescent color bursts.
                </p>
              </div>

              <div className="pt-2 text-xs opacity-75 font-mono">
                Engine created by <strong>Andrew Hunter</strong> (<code>stackedlol/ascii-sharks</code>), adapted &amp; themed for Mohammad Zaid Alam&rsquo;s storybook portfolio.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Interactive Control Deck */}
      <div className="fixed bottom-4 left-4 right-4 z-30 mx-auto max-w-4xl">
        <div
          className={`overflow-hidden rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 ${
            isLight
              ? 'border-ink/15 bg-white/85 text-ink'
              : 'border-white/15 bg-slate-900/85 text-slate-100'
          }`}
        >
          {/* Deck Header Bar */}
          <div className="flex items-center justify-between border-b border-current/10 px-4 py-2 text-xs">
            <div className="flex items-center gap-2">
              <Sliders size={14} className="text-terracotta" />
              <span className="font-medium tracking-wide">Simulation Deck</span>
              <span className="hidden sm:inline opacity-60">· Click or drag across water to stir currents</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCollapsedDeck((v) => !v)}
                className="flex items-center gap-1 opacity-70 hover:opacity-100 transition p-1"
                title={collapsedDeck ? 'Expand Deck' : 'Minimize Deck'}
              >
                {collapsedDeck ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
                <span className="text-[11px] font-mono">{collapsedDeck ? 'Expand' : 'Hide'}</span>
              </button>
            </div>
          </div>

          {/* Deck Controls (Collapsible) */}
          {!collapsedDeck && (
            <div className="p-4 space-y-3">
              {/* Shark Squad Roster */}
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold opacity-75 mb-1.5 flex items-center justify-between">
                  <span>Predator Squad</span>
                  <span className="font-mono text-[10px] lowercase opacity-60">
                    {PRESET_ROSTERS[selectedRoster]?.sharks?.length || 0} active in ocean
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(PRESET_ROSTERS).map(([key, config]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedRoster(key)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        selectedRoster === key
                          ? 'bg-terracotta text-white shadow-sm'
                          : isLight
                          ? 'border border-ink/15 bg-white/70 hover:bg-white text-ink'
                          : 'border border-white/15 bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selector & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-current/10">
                {/* Theme Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] uppercase tracking-wider font-semibold opacity-75 mr-1">
                    Theme:
                  </span>
                  {Object.entries(THEME_CONFIGS).map(([key, tConfig]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTheme(key)}
                      className={`rounded-full px-2.5 py-0.5 text-xs transition ${
                        theme === key
                          ? isLight
                            ? 'bg-ink text-paper'
                            : 'bg-cyan-400 text-slate-950 font-semibold'
                          : isLight
                          ? 'bg-ink/5 hover:bg-ink/10 text-ink'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {tConfig.name}
                    </button>
                  ))}
                </div>

                {/* Instant Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFeed}
                    className="flex items-center gap-1 rounded-full border border-terracotta/40 bg-terracotta/15 px-3 py-1 text-xs font-semibold text-terracotta hover:bg-terracotta hover:text-white transition shadow-sm"
                  >
                    <Sparkles size={12} />
                    <span>Drop Chum (+30 Fish)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSplash}
                    className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition ${
                      isLight
                        ? 'border-ink/15 bg-white/70 hover:bg-white text-ink'
                        : 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <Waves size={12} />
                    <span>Splash Center</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

