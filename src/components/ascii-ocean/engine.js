import { AsciiRenderer } from './renderer';
import { World } from './world';

const STEP = 1 / 60;
const MAX_STEPS = 4;

export class OceanEngine {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {{ sharks?, fishCount?, theme?, interactive? }} options
   */
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    const { sharks, fishCount, theme = 'deep-sea', interactive = true } = options;

    // ── jsdom / SSR guard ──────────────────────────────────────────────
    // If ResizeObserver or canvas 2D context are unavailable the engine
    // becomes a harmless no-op so tests can render without polyfills.
    const canRun =
      typeof ResizeObserver !== 'undefined' &&
      typeof IntersectionObserver !== 'undefined' &&
      typeof canvas.getContext === 'function' &&
      !!canvas.getContext('2d');

    this.disabled = !canRun;
    if (this.disabled) {
      this.disposed = true;
      return; // no-op engine
    }
    // ──────────────────────────────────────────────────────────────────

    this.world = new World(sharks, fishCount);
    this.renderer = new AsciiRenderer(canvas, theme);
    this.renderer.setFontFamily(getComputedStyle(canvas).fontFamily || 'ui-monospace, monospace');
    this.reducedMotion = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : { matches: false, addEventListener: () => {}, removeEventListener: () => {} };

    this.interactive = interactive;
    this.raf = 0;
    this.last = 0;
    this.acc = 0;
    this.visible = true;
    this.disposed = false;

    // Telemetry tracking
    this.fps = 60;
    this.frameCount = 0;
    this.fpsTimer = performance.now();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);

    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.schedule();
    });
    this.intersectionObserver.observe(canvas);

    this.reducedMotion.addEventListener('change', this.onMotionPreference);

    if (this.interactive) {
      window.addEventListener('pointermove', this.onPointerMove, { passive: true });
      window.addEventListener('pointerdown', this.onPointerDown, { passive: true });
      document.documentElement.addEventListener('pointerleave', this.onPointerLeave);
      window.addEventListener('blur', this.onPointerLeave);
    }

    this.resize();
    if (document.fonts?.load) {
      document.fonts.load(`600 16px ${this.renderer.fontFamily}`).then(() => {
        if (!this.disposed && this.reducedMotion.matches) this.drawStill();
      });
    }
    this.schedule();
  }

  setTheme(theme) {
    if (this.disabled) return;
    this.renderer.setTheme(theme);
  }

  setSharks(sharks) {
    if (this.disabled) return;
    this.world.setSharkSpecs(sharks);
  }

  splash(x = this.canvas.clientWidth / 2, y = this.canvas.clientHeight / 2) {
    if (this.disabled) return;
    this.world.splash(x, y);
  }

  feed(count = 24) {
    if (this.disabled) return;
    this.world.addChum(count);
  }

  getTelemetry() {
    if (this.disabled) return { fps: 0, liveFish: 0, totalFish: 0, sharks: [], time: 0 };
    const liveFish = this.world.fish.filter((f) => f.alive).length;
    const sharks = this.world.sharks.map((sh) => ({
      kind: sh.kind,
      speed: Math.round(sh.speed),
      hunger: Math.round(sh.hunger * 100),
      hunting: sh.hunger > 0.3 && Boolean(sh.target?.alive),
    }));
    return {
      fps: this.fps,
      liveFish,
      totalFish: this.world.fish.length,
      sharks,
      time: Math.round(this.world.time),
    };
  }

  destroy() {
    if (this.disabled) return; // nothing to tear down
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    this.reducedMotion.removeEventListener('change', this.onMotionPreference);
    if (this.interactive) {
      window.removeEventListener('pointermove', this.onPointerMove);
      window.removeEventListener('pointerdown', this.onPointerDown);
      document.documentElement.removeEventListener('pointerleave', this.onPointerLeave);
      window.removeEventListener('blur', this.onPointerLeave);
    }
  }

  resize() {
    if (this.disabled) return;
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (
      Math.abs(rect.width - this.renderer.width) < 1 &&
      Math.abs(rect.height - this.renderer.height) < 1 &&
      dpr === this.renderer.dpr
    ) {
      return;
    }
    this.renderer.resize(rect.width, rect.height, dpr);
    this.world.resize(rect.width, rect.height, this.renderer.cellWidth, this.renderer.cellHeight);
    if (this.reducedMotion.matches) this.drawStill();
  }

  schedule() {
    cancelAnimationFrame(this.raf);
    if (this.disposed || !this.visible || this.reducedMotion.matches) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  frame = (now) => {
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    this.acc += dt;
    let steps = 0;
    while (this.acc >= STEP && steps < MAX_STEPS) {
      this.world.step(STEP);
      this.acc -= STEP;
      steps++;
    }
    if (steps === MAX_STEPS) this.acc = 0;
    this.renderer.render(this.world, dt);

    // FPS calculation
    this.frameCount++;
    if (now - this.fpsTimer >= 600) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.fpsTimer));
      this.frameCount = 0;
      this.fpsTimer = now;
    }

    this.raf = requestAnimationFrame(this.frame);
  };

  drawStill() {
    if (this.world.time < 4) {
      for (let i = 0; i < 240; i++) this.world.step(STEP);
    }
    this.renderer.render(this.world, STEP);
  }

  onMotionPreference = () => {
    if (this.reducedMotion.matches) {
      cancelAnimationFrame(this.raf);
      this.drawStill();
    } else {
      this.schedule();
    }
  };

  toLocal(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    return { x, y, inside };
  }

  onPointerMove = (e) => {
    const { x, y, inside } = this.toLocal(e);
    const p = this.world.pointer;
    p.x = x;
    p.y = y;
    p.active = inside && e.pointerType !== 'touch';
  };

  onPointerDown = (e) => {
    const { x, y, inside } = this.toLocal(e);
    if (inside && !this.reducedMotion.matches) this.world.splash(x, y);
  };

  onPointerLeave = () => {
    this.world.pointer.active = false;
  };
}

