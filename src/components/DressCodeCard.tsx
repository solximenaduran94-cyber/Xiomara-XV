import React from 'react';
import { Shirt, Sparkles, AlertCircle } from 'lucide-react';
import { ButterflyStarCorner, MarkedButterfly } from './CelestialDecorations';

export const DressCodeCard: React.FC = () => {
  return (
    <div className="relative w-full">
      <div className="relative w-full p-6 sm:p-10 silver-card border-y-2 border-white/80 overflow-hidden text-center shadow-2xl">
        <ButterflyStarCorner position="top-left" />
        <ButterflyStarCorner position="bottom-right" />

        <div className="w-full max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 border-2 border-white text-white shadow-md mb-2">
            <Shirt className="w-7 h-7 text-white" />
          </div>

          <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-white font-bold">
            Código de Vestimenta
          </span>

          <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-black tracking-wide mt-1 drop-shadow-sm">
            Elegante Sport
          </h3>

          <div className="silver-divider max-w-xs mx-auto my-3" />

          <p className="text-sm sm:text-base text-white font-body font-medium max-w-md mx-auto leading-relaxed">
            Vení elegante y cómodo para disfrutar, bailar y compartir una noche mágica e inolvidable con Cele.
          </p>

          {/* RESERVED COLORS HIGHLIGHT BOX */}
          <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-blue-600/35 backdrop-blur-md border-2 border-white/80 shadow-md text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 border border-white text-white text-[11px] font-cinzel uppercase tracking-widest font-black mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Reserva Especial de Colores</span>
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>

            <p className="text-sm sm:text-base text-white font-body font-bold leading-relaxed">
              Los colores <span className="underline decoration-white font-black text-sky-100">Azul Francia</span> y <span className="underline decoration-white font-black text-sky-100">Plateado</span> quedan reservados para la cumpleañera.
            </p>

            <div className="mt-3 flex items-center justify-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e40af] border-2 border-white text-white text-xs font-cinzel font-bold shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 border border-white" />
                Azul Francia (Reservado)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 border-2 border-white text-blue-900 text-xs font-cinzel font-black shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-400" />
                Plateado (Reservado)
              </span>
            </div>

            <p className="text-xs text-sky-100 font-body mt-2 font-medium">
              ¡Elegí cualquier otro color de tu agrado para festejar con ella!
            </p>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/35 backdrop-blur-md border-2 border-white/80 text-white text-xs font-cinzel font-bold shadow-md">
            <MarkedButterfly size={16} glow />
            <span>¡Preparate para bailar toda la noche!</span>
            <MarkedButterfly size={16} glow className="scale-x-[-1]" />
          </div>
        </div>
      </div>
    </div>
  );
};
