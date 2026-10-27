import React, { useEffect, useRef } from 'react';

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  twinkleSpeed: number;
  phase: number;
  driftFreq: number;
  driftAmp: number;
  color: string;
  type: 'cross' | 'dot' | 'diamond';
}

const SPARKLE_COLORS = [
  '#ffffff', // Pure crystal white
  '#f0f9ff', // Softest ice
  '#e0f2fe', // Pale sky
  '#bae6fd', // Celestial blue
  '#fffbeb', // Subtle champagne pearl
];

/**
 * AmbientSparkles:
 * Generates an ethereal, delicate ("apenas"), continuous ambient glitter/sparkle effect
 * drifting gently across the entire invitation.
 * Styled to be elegant, subtle, and completely non-intrusive.
 */
export const AmbientSparkles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Number of sparkles: subtle density (around 32 on mobile, 48 on desktop)
    const particleCount = Math.max(26, Math.min(52, Math.floor((width * height) / 26000)));

    const createParticle = (initRandomY = false): SparkleParticle => {
      const typeRand = Math.random();
      const type: 'cross' | 'dot' | 'diamond' =
        typeRand < 0.45 ? 'cross' : typeRand < 0.8 ? 'dot' : 'diamond';

      return {
        x: Math.random() * width,
        y: initRandomY ? Math.random() * height : height + 10 + Math.random() * 20,
        size: type === 'cross' ? 2.5 + Math.random() * 2.5 : 1.2 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.15 - Math.random() * 0.35, // Gentle upward floating
        alpha: 0,
        maxAlpha: 0.35 + Math.random() * 0.35, // "Apenas": subtle transparency, max 0.70
        twinkleSpeed: 0.02 + Math.random() * 0.035,
        phase: Math.random() * Math.PI * 2,
        driftFreq: 0.01 + Math.random() * 0.02,
        driftAmp: 0.4 + Math.random() * 0.8,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        type,
      };
    };

    const particles: SparkleParticle[] = Array.from({ length: particleCount }, () =>
      createParticle(true)
    );

    // Draw delicate 4-point cross star sparkle
    const drawCross = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.shadowColor = '#bae6fd';
      c.shadowBlur = 4;

      // Soft central diamond
      c.beginPath();
      c.moveTo(x, y - size);
      c.lineTo(x + size * 0.28, y);
      c.lineTo(x, y + size);
      c.lineTo(x - size * 0.28, y);
      c.closePath();
      c.fill();

      // Horizontal ray
      c.beginPath();
      c.moveTo(x - size, y);
      c.lineTo(x, y + size * 0.28);
      c.lineTo(x + size, y);
      c.lineTo(x, y - size * 0.28);
      c.closePath();
      c.fill();

      // Tiny center point for bright reflection
      c.beginPath();
      c.arc(x, y, size * 0.25, 0, Math.PI * 2);
      c.fillStyle = '#ffffff';
      c.fill();

      c.restore();
    };

    // Draw mini glowing orb/dust particle
    const drawDot = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.shadowColor = '#ffffff';
      c.shadowBlur = 5;

      c.beginPath();
      c.arc(x, y, size, 0, Math.PI * 2);
      c.fill();

      c.restore();
    };

    // Draw tilted crystal diamond
    const drawDiamond = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.shadowColor = '#7dd3fc';
      c.shadowBlur = 4;

      c.beginPath();
      c.moveTo(x, y - size * 0.9);
      c.lineTo(x + size * 0.7, y);
      c.lineTo(x, y + size * 0.9);
      c.lineTo(x - size * 0.7, y);
      c.closePath();
      c.fill();

      c.restore();
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Float upward and sway horizontally
        p.phase += p.twinkleSpeed;
        p.y += p.vy;
        p.x += p.vx + Math.sin(tick * p.driftFreq + p.phase) * p.driftAmp * 0.3;

        // Twinkle sinusoidal brightness
        // Math.sin oscillates between -1 and 1; map it so it breathes smoothly and spends time near zero/dim
        const sineVal = Math.sin(p.phase);
        const normalized = Math.max(0, sineVal);
        p.alpha = normalized * normalized * p.maxAlpha;

        // Re-spawn if particle moves off top or sides
        if (p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle(false);
          continue;
        }

        // Only draw if visible enough
        if (p.alpha > 0.03) {
          if (p.type === 'cross') {
            drawCross(ctx, p.x, p.y, p.size, p.color, p.alpha);
          } else if (p.type === 'diamond') {
            drawDiamond(ctx, p.x, p.y, p.size, p.color, p.alpha);
          } else {
            drawDot(ctx, p.x, p.y, p.size, p.color, p.alpha);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 select-none"
      style={{
        mixBlendMode: 'screen',
      }}
    />
  );
};
