import React from 'react';
import celeTopHero from '../assets/images/cele_top_hero.jpg';

export const TopPhotoBanner: React.FC = () => {
  return (
    <section aria-label="Foto de presentación de Celeste" className="relative w-full overflow-hidden select-none bg-blue-600">
      {/* 
        Full-bleed Edge-to-Edge Container covering 100% of the screen width and sides.
        Completely clear and unobstructed: ZERO gradients, ZERO badges, ZERO text overlays covering Celeste.
      */}
      <div className="relative w-full flex items-center justify-center overflow-hidden">
        <img
          src={celeTopHero}
          alt="Celeste - Mis XV Años"
          draggable={false}
          className="w-full h-auto max-h-[85vh] sm:max-h-[90vh] md:max-h-[95vh] object-cover object-[center_top] pointer-events-none drop-shadow-2xl"
          style={{
            imageRendering: 'auto',
          }}
        />
      </div>

      {/* Elegant clean separator line at the bottom of the photo */}
      <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-white to-blue-600 shadow-md" />
    </section>
  );
};
