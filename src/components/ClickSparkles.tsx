import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  color: string;
  glowColor: string;
  type: 'butterfly' | 'orb' | 'sparkle';
}

interface ShimmerRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

const SPARKLE_PALETTE = [
  { color: '#0284c7', glow: 'rgba(2, 132, 199, 0.8)' },
  { color: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.8)' },
  { color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.8)' },
  { color: '#7dd3fc', glow: 'rgba(125, 211, 252, 0.9)' },
  { color: '#ffffff', glow: 'rgba(255, 255, 255, 0.95)' },
];

export const ClickSparkles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number | null = null;
    const particles: Particle[] = [];
    const rings: ShimmerRing[] = [];

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Draw a miniature stylized blue butterfly
    const drawMiniButterfly = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      scale: number,
      rotation: number,
      color: string
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.scale(scale, scale);

      // Left forewing
      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(-6, -8, -12, -4, -10, 4);
      context.bezierCurveTo(-8, 8, -2, 6, 0, 0);
      context.fillStyle = color;
      context.fill();

      // Right forewing
      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(6, -8, 12, -4, 10, 4);
      context.bezierCurveTo(8, 8, 2, 6, 0, 0);
      context.fillStyle = color;
      context.fill();

      // Center body
      context.beginPath();
      context.arc(0, 0, 1.2, 0, Math.PI * 2);
      context.fillStyle = '#0284c7';
      context.fill();

      context.restore();
    };

    const renderLoop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Expanding rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.radius += (r.maxRadius - r.radius) * 0.16;
        r.alpha -= 0.045;

        if (r.alpha <= 0.01) {
          rings.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // Particles (mini butterflies & soft sky shimmer orbs)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy = p.vy * 0.95 + 0.04;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        const currentAlpha = Math.max(0, Math.min(1, p.alpha));

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 8;

        if (p.type === 'butterfly') {
          drawMiniButterfly(ctx, p.x, p.y, (p.size / 10) * currentAlpha, p.rotation, p.color);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5 * currentAlpha, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        ctx.restore();
      }

      if (particles.length > 0 || rings.length > 0) {
        animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        animationFrameId = null;
      }
    };

    const spawnSparkleBurst = (x: number, y: number) => {
      rings.push({
        x,
        y,
        radius: 2,
        maxRadius: 36,
        alpha: 0.8,
      });

      const count = 12;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 1.5 + Math.random() * 3.8;
        const palette = SPARKLE_PALETTE[Math.floor(Math.random() * SPARKLE_PALETTE.length)];
        const isButterfly = Math.random() < 0.4;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: isButterfly ? 8 + Math.random() * 6 : 3 + Math.random() * 4,
          alpha: 1,
          decay: 0.018 + Math.random() * 0.016,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.1,
          color: palette.color,
          glowColor: palette.glow,
          type: isButterfly ? 'butterfly' : 'orb',
        });
      }

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      spawnSparkleBurst(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};
