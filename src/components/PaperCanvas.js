import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Eraser, Pencil, Trash2 } from 'lucide-react';

// The dotted-paper background. Two layers:
//   1. paper canvas — a sheet of dot-grid paper, repainted only on resize
//   2. sketch canvas — free-drawing surface, active only in doodle mode
// The toolbar lives outside the aria-hidden wrapper so it stays reachable.

const DOT_GAP = 24;
const INK = '47, 42, 36';

function paintPaper(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return; // jsdom-safe: canvas has no 2d context in tests
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || window.innerWidth;
  const h = canvas.clientHeight || window.innerHeight;
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = `rgba(${INK}, 0.16)`;
  for (let y = DOT_GAP; y < h; y += DOT_GAP) {
    for (let x = DOT_GAP; x < w; x += DOT_GAP) {
      ctx.beginPath();
      ctx.arc(x, y, 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export default function PaperCanvas() {
  const paperRef = useRef(null);
  const sketchRef = useRef(null);
  const drawingRef = useRef(false);
  const lastRef = useRef(null);
  const [doodling, setDoodling] = useState(false);
  const [tool, setTool] = useState('pencil'); // 'pencil' | 'eraser'

  // Paint the dot grid on mount + resize; preserve doodles across resizes.
  useEffect(() => {
    const paper = paperRef.current;
    const sketch = sketchRef.current;
    if (!paper || !sketch) return undefined;

    const sizeSketch = () => {
      const ctx = sketch.getContext('2d');
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      sketch.width = Math.floor(sketch.clientWidth * dpr);
      sketch.height = Math.floor(sketch.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeSketch();

    let raf;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // snapshot existing doodles so a window resize does not erase them
        const old = document.createElement('canvas');
        old.width = sketch.width;
        old.height = sketch.height;
        const oldCtx = old.getContext('2d');
        if (oldCtx) oldCtx.drawImage(sketch, 0, 0);

        paintPaper(paper);
        sizeSketch();

        const ctx = sketch.getContext('2d');
        if (ctx && old.width > 0 && old.height > 0) {
          ctx.drawImage(old, 0, 0, sketch.clientWidth, sketch.clientHeight);
        }
      });
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const applyTool = useCallback(
    (ctx) => {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 20;
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 2.4;
        ctx.strokeStyle = `rgba(${INK}, 0.55)`;
      }
    },
    [tool]
  );

  const getPos = (e) => {
    const rect = sketchRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e) => {
    const ctx = sketchRef.current && sketchRef.current.getContext('2d');
    if (!ctx) return;
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (err) {
        /* pointer capture is best-effort */
      }
    }
    drawingRef.current = true;
    const p = getPos(e);
    lastRef.current = p;
    applyTool(ctx);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + 0.01, p.y + 0.01);
    ctx.stroke();
  };

  const onPointerMove = (e) => {
    if (!drawingRef.current) return;
    const ctx = sketchRef.current && sketchRef.current.getContext('2d');
    if (!ctx) return;
    const p = getPos(e);
    applyTool(ctx);
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastRef.current = p;
  };

  const endStroke = () => {
    drawingRef.current = false;
    lastRef.current = null;
  };

  const clearSketch = () => {
    const sketch = sketchRef.current;
    const ctx = sketch && sketch.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, sketch.width, sketch.height);
    ctx.restore();
  };

  const toolBtn =
    'flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-ink/10';

  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 z-0">
        <canvas ref={paperRef} className="absolute inset-0 h-full w-full" />
        <div className="grain pointer-events-none absolute inset-0" />
        <canvas
          ref={sketchRef}
          className="absolute inset-0 h-full w-full"
          style={{
            touchAction: doodling ? 'none' : 'auto',
            cursor: doodling ? (tool === 'eraser' ? 'cell' : 'crosshair') : 'default',
            pointerEvents: doodling ? 'auto' : 'none',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endStroke}
          onPointerLeave={endStroke}
          onPointerCancel={endStroke}
        />
      </div>

      <div className="fixed bottom-5 right-5 z-50">
        {!doodling ? (
          <button
            type="button"
            onClick={() => setDoodling(true)}
            aria-label="Open doodle mode"
            title="Doodle on the paper"
            className="flex items-center gap-2 rounded-full border border-ink/15 bg-white/80 px-4 py-2 font-hand text-lg text-ink shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
          >
            <Pencil size={16} /> Doodle
          </button>
        ) : (
          <div className="flex items-center gap-1 rounded-full border border-ink/15 bg-white/85 p-1.5 shadow-lg backdrop-blur">
            <button
              type="button"
              onClick={() => setTool('pencil')}
              aria-pressed={tool === 'pencil'}
              aria-label="Pencil"
              title="Pencil"
              className={`${toolBtn} ${tool === 'pencil' ? 'bg-ink/15' : ''}`}
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              onClick={() => setTool('eraser')}
              aria-pressed={tool === 'eraser'}
              aria-label="Eraser"
              title="Eraser"
              className={`${toolBtn} ${tool === 'eraser' ? 'bg-ink/15' : ''}`}
            >
              <Eraser size={16} />
            </button>
            <button
              type="button"
              onClick={clearSketch}
              aria-label="Clear doodles"
              title="Clear the page"
              className={toolBtn}
            >
              <Trash2 size={16} />
            </button>
            <button
              type="button"
              onClick={() => setDoodling(false)}
              aria-label="Close doodle mode"
              title="Done drawing"
              className="flex h-9 items-center gap-1.5 rounded-full bg-ink px-3 font-hand text-lg text-paper transition hover:bg-ink/85"
            >
              <Check size={16} /> Done
            </button>
          </div>
        )}
      </div>
    </>
  );
}
