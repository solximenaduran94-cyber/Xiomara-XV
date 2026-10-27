import React from 'react';
import { Camera, UploadCloud, ExternalLink } from 'lucide-react';
import { ButterflyStarCorner, MarkedButterfly } from './CelestialDecorations';

const DRIVE_ALBUM_URL =
  'https://drive.google.com/drive/folders/1I8bsH2g1FxWxbUOElGxcFrWkA2PcVoYg?usp=sharing';

export const SharedAlbumCard: React.FC = () => {
  return (
    <div className="relative w-full">
      <div className="relative w-full p-6 sm:p-10 silver-card border-y-2 border-white/80 overflow-hidden text-center shadow-2xl">
        <ButterflyStarCorner position="top-left" />
        <ButterflyStarCorner position="bottom-right" />

        <div className="w-full max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 border-2 border-white text-white shadow-md mb-2">
            <Camera className="w-7 h-7 text-white" />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-white font-bold">
            <MarkedButterfly size={16} glow />
            <span>Recuerdos de la Noche</span>
            <MarkedButterfly size={16} glow className="scale-x-[-1]" />
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-black tracking-wide mt-1 drop-shadow-sm">
            Fotos y Videos de la Fiesta
          </h3>

          <div className="silver-divider max-w-xs mx-auto my-3" />

          <p className="text-sm sm:text-base text-white font-body font-medium max-w-md mx-auto leading-relaxed mb-6">
            ¡Capturá cada momento! Subí todas las fotos y videos que saques durante la noche de los XV de Cele a nuestra carpeta compartida de Google Drive.
          </p>

          <a
            href={DRIVE_ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-white font-cinzel font-bold text-xs sm:text-sm uppercase tracking-[0.2em] border-2 border-white/80 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <UploadCloud className="w-5 h-5 text-white" />
            <span>Subir Fotos y Videos a Google Drive</span>
            <ExternalLink className="w-4 h-4 opacity-90 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};
