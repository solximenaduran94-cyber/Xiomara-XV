import React from 'react';

/**
 * Vibrant Blue Morpho Butterfly for Daytime Sky Theme
 * Rich royal blue, electric cyan and celeste tones with delicate wing patterns
 */
export const MarkedButterfly: React.FC<{
  className?: string;
  size?: number;
  glow?: boolean;
}> = ({ className = '', size = 32, glow = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${
        glow ? 'filter drop-shadow-[0_2px_8px_rgba(2,132,199,0.6)]' : 'filter drop-shadow-[0_2px_4px_rgba(2,132,199,0.3)]'
      } ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Outer Wing Vibrant Blue to Sky Blue Gradient */}
        <linearGradient id="blueWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        {/* Inner Wing Luminous Sky to Cyan Gradient */}
        <linearGradient id="wingHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#7dd3fc" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
        </linearGradient>

        <radialGradient id="wingGlow" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
        </radialGradient>

        <linearGradient id="butterflyBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* Top Left Forewing */}
      <path
        d="M48 35 C38 18 16 16 7 26 C-2 36 3 58 24 58 C38 58 46 48 48 35 Z"
        fill="url(#wingGlow)"
        stroke="#1d4ed8"
        strokeWidth="1.8"
      />
      <path
        d="M48 35 C36 24 20 22 14 30 C9 38 14 52 28 52 C38 52 45 44 48 35 Z"
        fill="url(#wingHighlight)"
        opacity="0.9"
      />
      {/* Wing Vein Details (Left) */}
      <path d="M48 35 C36 34 22 36 12 30" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
      <path d="M48 37 C34 40 22 45 15 42" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" />
      <path d="M48 40 C36 46 28 52 22 54" stroke="#1e3a8a" strokeWidth="1" strokeLinecap="round" />
      <circle cx="16" cy="31" r="1.5" fill="#ffffff" />
      <circle cx="11" cy="39" r="1.3" fill="#ffffff" />
      <circle cx="20" cy="24" r="1.2" fill="#dbeafe" />

      {/* Top Right Forewing */}
      <path
        d="M52 35 C62 18 84 16 93 26 C102 36 97 58 76 58 C62 58 54 48 52 35 Z"
        fill="url(#wingGlow)"
        stroke="#1d4ed8"
        strokeWidth="1.8"
      />
      <path
        d="M52 35 C64 24 80 22 86 30 C91 38 86 52 72 52 C62 52 55 44 52 35 Z"
        fill="url(#wingHighlight)"
        opacity="0.9"
      />
      {/* Wing Vein Details (Right) */}
      <path d="M52 35 C64 34 78 36 88 30" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
      <path d="M52 37 C66 40 78 45 85 42" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" />
      <path d="M52 40 C64 46 72 52 78 54" stroke="#1e3a8a" strokeWidth="1" strokeLinecap="round" />
      <circle cx="84" cy="31" r="1.5" fill="#ffffff" />
      <circle cx="89" cy="39" r="1.3" fill="#ffffff" />
      <circle cx="80" cy="24" r="1.2" fill="#dbeafe" />

      {/* Bottom Left Hindwing */}
      <path
        d="M48 52 C36 55 18 64 22 78 C25 89 42 86 47 70 C48 64 48 56 48 52 Z"
        fill="url(#blueWingGrad)"
        stroke="#1e3a8a"
        strokeWidth="1.6"
      />
      <path
        d="M47 54 C38 58 28 66 30 75 C33 80 41 77 46 67 Z"
        fill="url(#wingHighlight)"
        opacity="0.8"
      />
      <circle cx="26" cy="75" r="1.4" fill="#ffffff" />
      <circle cx="34" cy="80" r="1.2" fill="#ffffff" />

      {/* Bottom Right Hindwing */}
      <path
        d="M52 52 C64 55 82 64 78 78 C75 89 58 86 53 70 C52 64 52 56 52 52 Z"
        fill="url(#blueWingGrad)"
        stroke="#1e3a8a"
        strokeWidth="1.6"
      />
      <path
        d="M53 54 C62 58 72 66 70 75 C67 80 59 77 54 67 Z"
        fill="url(#wingHighlight)"
        opacity="0.8"
      />
      <circle cx="74" cy="75" r="1.4" fill="#ffffff" />
      <circle cx="66" cy="80" r="1.2" fill="#ffffff" />

      {/* Butterfly Body & Antennae */}
      <path
        d="M50 30 C48.5 42 48.5 58 50 72 C51.5 58 51.5 42 50 30 Z"
        fill="url(#butterflyBody)"
        stroke="#0c4a6e"
        strokeWidth="1"
      />
      <circle cx="50" cy="27" r="3" fill="#082f49" />
      {/* Left antenna */}
      <path d="M49 25 C45 16 38 12 34 14" stroke="#0f172a" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="34" cy="14" r="1.5" fill="#1d4ed8" />
      {/* Right antenna */}
      <path d="M51 25 C55 16 62 12 66 14" stroke="#0f172a" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="66" cy="14" r="1.5" fill="#1d4ed8" />
    </svg>
  );
};

export const BlueButterfly = MarkedButterfly;

/**
 * Star removals: Keep empty/no-op components so existing imports don't break,
 * rendering zero stars as requested.
 */
export const MarkedEightPointStar: React.FC<{
  className?: string;
  size?: number;
}> = () => {
  return null;
};

export const MarkedFourPointStar: React.FC<{
  className?: string;
  size?: number;
}> = () => {
  return null;
};

/**
 * Daytime Sky Medallion:
 * Crisp pearl-white frosted sunlit glass, framed by sky blue filigrees
 * and vibrant blue morpho butterflies perched proudly. NO STARS.
 */
export const CelestialMedallion: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className = '', children }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Soft rich royal blue ambient glow */}
      <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute inset-3 bg-blue-400/25 rounded-full blur-xl pointer-events-none" />

      {/* Main circular frame */}
      <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full flex items-center justify-center">
        {/* Outer Filigree Ring SVG - Deep Royal Blue Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer dashed royal blue ring */}
          <circle
            cx="120"
            cy="120"
            r="114"
            stroke="rgba(29, 78, 216, 0.6)"
            strokeWidth="1.4"
            strokeDasharray="4 6"
          />

          {/* Solid precision royal sapphire ring */}
          <circle
            cx="120"
            cy="120"
            r="105"
            stroke="rgba(56, 189, 248, 0.75)"
            strokeWidth="2"
          />

          {/* Inner accent ring */}
          <circle
            cx="120"
            cy="120"
            r="94"
            stroke="rgba(96, 165, 250, 0.85)"
            strokeWidth="1.4"
          />

          {/* Inner dotted track */}
          <circle
            cx="120"
            cy="120"
            r="84"
            stroke="rgba(186, 230, 253, 0.7)"
            strokeWidth="1.2"
            strokeDasharray="2 6"
          />
        </svg>

        {/* 4 Flanking Blue Butterflies perched on outer ring */}
        <div className="absolute top-2 -left-4 sm:top-4 sm:-left-6 -rotate-25 transition-transform hover:scale-110">
          <MarkedButterfly size={46} glow />
        </div>
        <div className="absolute top-2 -right-4 sm:top-4 sm:-right-6 rotate-25 scale-x-[-1] transition-transform hover:scale-110">
          <MarkedButterfly size={46} glow />
        </div>
        <div className="absolute -bottom-2 -left-2 rotate-12 scale-90">
          <MarkedButterfly size={36} glow />
        </div>
        <div className="absolute -bottom-2 -right-2 -rotate-12 scale-x-[-1] scale-90">
          <MarkedButterfly size={36} glow />
        </div>

        {/* Central Luminous Vibrant Blue Chamber with Zero Dark Shades */}
        <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-blue-500 via-sky-500 to-blue-600 border-2 border-white shadow-[0_0_35px_rgba(255,255,255,0.45)] flex flex-col items-center justify-center text-center p-3 backdrop-blur-md">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Transparent Blue Butterfly Corner filigree with glowing cyan/azure lines.
 * Zero stars, pure elegant blue butterflies and delicate royal blue scrolls.
 */
export const ButterflyStarCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const transformClasses = {
    'top-left': 'top-2.5 left-2.5',
    'top-right': 'top-2.5 right-2.5 scale-x-[-1]',
    'bottom-left': 'bottom-2.5 left-2.5 scale-y-[-1]',
    'bottom-right': 'bottom-2.5 right-2.5 scale-[-1]',
  };

  return (
    <div
      className={`absolute pointer-events-none z-10 ${transformClasses[position]} ${className}`}
      aria-hidden="true"
    >
      <div className="relative w-14 h-14 sm:w-16 sm:h-16">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Corner framing lines in luminous celestial sky and azure */}
          <path
            d="M6 35 L6 14 C6 9.5 9.5 6 14 6 L35 6"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 26 L10 14 C10 11.8 11.8 10 14 10 L26 10"
            stroke="rgba(125, 211, 252, 0.85)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Delicate scroll curve */}
          <path
            d="M14 6 C24 12 32 20 38 34"
            stroke="rgba(147, 197, 253, 0.65)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>

        {/* Small Blue Butterfly perched on the corner */}
        <div className="absolute top-2 left-2 rotate-[-20deg]">
          <MarkedButterfly size={26} glow />
        </div>
      </div>
    </div>
  );
};

/**
 * Blue Butterfly Divider with radiant celestial & royal blue gradient
 */
export const SilverButterflyStarDivider: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-2.5 my-6 ${className}`}
      aria-hidden="true"
    >
      <div className="h-0.5 w-16 sm:w-32 bg-gradient-to-r from-transparent via-sky-400 to-sky-200 rounded-full" />
      <div className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
      
      {/* Central Blue Butterfly */}
      <div className="relative px-1 -my-2 transform hover:scale-110 transition-transform">
        <MarkedButterfly size={36} glow />
      </div>

      <div className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
      <div className="h-0.5 w-16 sm:w-32 bg-gradient-to-l from-transparent via-sky-400 to-sky-200 rounded-full" />
    </div>
  );
};

/**
 * Ambient floating blue butterflies fluttering gently across the daytime sky.
 * ZERO STARS. Only vivid blue butterflies.
 */
export const FloatingCelestialButterflies: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[4] overflow-hidden">
      {/* Butterfly 1 - Top Left */}
      <div className="absolute top-[10%] left-[3%] sm:left-[6%] opacity-90 animate-float-slow">
        <MarkedButterfly size={42} glow />
      </div>

      {/* Butterfly 2 - Mid Right */}
      <div className="absolute top-[32%] right-[4%] sm:right-[8%] opacity-90 scale-x-[-1] animate-float-medium">
        <MarkedButterfly size={48} glow />
      </div>

      {/* Butterfly 3 - Mid Left */}
      <div className="absolute top-[56%] left-[2%] sm:left-[5%] opacity-85 animate-float-reverse">
        <MarkedButterfly size={38} glow />
      </div>

      {/* Butterfly 4 - Lower Right */}
      <div className="absolute top-[78%] right-[5%] sm:right-[9%] opacity-90 scale-x-[-1] animate-float-slow">
        <MarkedButterfly size={44} glow />
      </div>

      {/* Butterfly 5 - Lower Left */}
      <div className="absolute top-[90%] left-[6%] sm:left-[10%] opacity-85 animate-float-medium">
        <MarkedButterfly size={34} glow />
      </div>
    </div>
  );
};
