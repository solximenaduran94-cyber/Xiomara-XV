import React, { useState, useEffect } from 'react';
import { MarkedButterfly } from './CelestialDecorations';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // Target: 27 November 2026 at 20:30:00 (Month index 10 is November in JS)
      const targetDate = new Date(2026, 10, 27, 20, 30, 0);

      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full">
      <div className="relative w-full p-6 sm:p-9 silver-card overflow-hidden shadow-xl border-y-2 border-white/80">
        {/* Soft celestial blue glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-2xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <MarkedButterfly size={18} glow />
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-white uppercase font-bold">
              Cuenta Regresiva
            </p>
            <MarkedButterfly size={18} glow className="scale-x-[-1]" />
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {timeBlocks.map((block) => (
              <div
                key={block.label}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-blue-600/35 backdrop-blur-md border-2 border-white/80 shadow-md hover:bg-blue-500/45 transition-colors"
              >
                <span className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)] tabular-nums leading-none tracking-tight">
                  {String(block.value).padStart(2, '0')}
                </span>
                <span className="mt-2 text-[10px] sm:text-xs font-black tracking-[0.2em] text-white font-cinzel">
                  {block.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs sm:text-sm text-white font-body italic font-medium">
            {timeLeft.isPast
              ? '¡El gran día ha llegado! ¡A celebrar los 15 de Cele!'
              : 'Falta muy poco para compartir esta noche mágica junto a Cele'}
          </p>
        </div>
      </div>
    </div>
  );
};
