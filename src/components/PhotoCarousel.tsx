import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { MarkedButterfly } from './CelestialDecorations';

import cele01 from '../assets/images/cele_gallery_01.jpg';
import cele02 from '../assets/images/cele_gallery_02.jpg';
import cele03 from '../assets/images/cele_gallery_03.jpg';
import cele04 from '../assets/images/cele_gallery_04.jpg';
import cele05 from '../assets/images/cele_gallery_05.jpg';
import cele06 from '../assets/images/cele_gallery_06.jpg';
import cele07 from '../assets/images/cele_gallery_07.jpg';
import cele08 from '../assets/images/cele_gallery_08.jpg';

const CAROUSEL_PHOTOS: string[] = [
  cele01,
  cele02,
  cele03,
  cele04,
  cele05,
  cele06,
  cele07,
  cele08,
];

export const PhotoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_PHOTOS.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_PHOTOS.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      goToNext();
    } else if (diff < -40) {
      goToPrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <div className="w-full">
      <div className="relative w-full py-8 sm:py-10 px-4 sm:px-6 silver-card border-y-2 border-white/80 overflow-hidden shadow-2xl">
        <div
          className="relative w-full max-w-lg mx-auto select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Title Header above carousel */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-white font-bold mb-1">
              <MarkedButterfly size={16} glow />
              <span>Galería de Fotos</span>
              <MarkedButterfly size={16} glow className="scale-x-[-1]" />
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-black tracking-wide drop-shadow-sm">
              Momentos de Cele
            </h3>
            <div className="silver-divider max-w-xs mx-auto my-2" />
          </div>

          {/* Main Photo Card Frame */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/80 shadow-[0_15px_40px_rgba(29,78,216,0.3)] bg-blue-600/35 backdrop-blur-md group">
            {CAROUSEL_PHOTOS.map((url, index) => {
              const isCurrent = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length;

              let slidePositionClass = 'translate-x-full opacity-0 z-0 pointer-events-none';
              if (isCurrent) {
                slidePositionClass =
                  'translate-x-0 opacity-100 z-20 transition-transform duration-700 ease-out';
              } else if (isPrev) {
                slidePositionClass =
                  '-translate-x-full opacity-100 z-10 transition-transform duration-700 ease-out';
              }

              return (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-blue-600/40 ${slidePositionClass}`}
                >
              {/* Blurred atmospheric backdrop */}
              <img
                src={url}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover object-center blur-2xl opacity-60 scale-110 pointer-events-none"
              />

              {/* Crisp main photo with full visibility */}
              <img
                src={url}
                alt={`Foto ${index + 1} de Celeste`}
                draggable={false}
                className="relative z-10 w-full h-full object-contain object-center pointer-events-none drop-shadow-2xl"
              />
            </div>
          );
        })}

        {/* Counter Badge */}
        <div className="absolute top-4 right-4 z-30 px-3 py-1 rounded-full bg-blue-600/80 border border-white/80 backdrop-blur-md shadow-md text-white font-cinzel text-xs font-bold">
          <span>{currentIndex + 1} / {CAROUSEL_PHOTOS.length}</span>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
          aria-label="Foto anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-blue-600/80 hover:bg-blue-500 border-2 border-white text-white shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          aria-label="Siguiente foto"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-blue-600/80 hover:bg-blue-500 border-2 border-white text-white shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-1.5 px-4 flex-wrap">
          {CAROUSEL_PHOTOS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir a foto ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 h-2 bg-white shadow-md'
                  : 'w-2 h-2 bg-white/60 hover:bg-white border border-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
