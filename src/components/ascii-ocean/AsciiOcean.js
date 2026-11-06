import { useEffect, useRef } from 'react';
import { OceanEngine } from './engine';

/**
 * AsciiOcean: Renders an interactive ASCII ocean canvas.
 */
export default function AsciiOcean({
  className = '',
  style = {},
  theme = 'deep-sea',
  sharks,
  fishCount,
  interactive = true,
  onEngineReady,
}) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new OceanEngine(canvas, {
      theme,
      sharks,
      fishCount,
      interactive,
    });
    engineRef.current = engine;

    if (onEngineReady) {
      onEngineReady(engine);
    }

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync theme changes dynamically
  useEffect(() => {
    if (engineRef.current && theme) {
      engineRef.current.setTheme(theme);
    }
  }, [theme]);

  const prevSharksRef = useRef(null);

  // Sync sharks roster changes dynamically
  useEffect(() => {
    if (!engineRef.current || !sharks) return;
    const key = JSON.stringify(sharks);
    if (prevSharksRef.current === key) return;
    prevSharksRef.current = key;
    engineRef.current.setSharks(sharks);
  }, [sharks]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={style}
      className={`ascii-ocean block ${className}`}
    />
  );
}

