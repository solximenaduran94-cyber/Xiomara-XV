import React from 'react';
import customBackgroundImg from '../assets/images/background_custom.jpg';

export const CosmicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-sky-400 via-blue-500 to-sky-600">
      {/* Sky & Butterflies Texture with Luminous Blue Overlay */}
      <img
        src={customBackgroundImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-70 filter brightness-105 contrast-105 pointer-events-none"
      />

      {/* Vibrant Luminous Blue Radiant Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-500/40 via-sky-400/30 to-blue-600/40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Luminous Light Rays & Soft Highlights - Zero Dark Shades */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-sky-200/25 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-blue-300/25 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};

