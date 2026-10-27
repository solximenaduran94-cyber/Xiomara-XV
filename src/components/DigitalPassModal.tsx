import React from 'react';
import { X, Share2, Printer } from 'lucide-react';
import { MarkedButterfly } from './CelestialDecorations';

interface DigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const DigitalPassModal: React.FC<DigitalPassModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Mis XV Cele 🦋',
          text: '¡Estás invitado a mis 15 años! Viernes 27 de Noviembre - 20:30 hs en Sindicato Camioneros Neuquén.',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('¡Enlace de la invitación copiado!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-blue-600 via-sky-600 to-blue-700 border-2 border-white text-center shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Cerrar tarjeta digital"
          className="absolute top-4 right-4 p-2 rounded-full bg-blue-500/80 border border-white text-white hover:bg-blue-400 transition-colors cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="inline-flex items-center gap-2 text-white mb-2">
          <MarkedButterfly size={16} glow />
          <span className="text-[11px] font-cinzel uppercase tracking-[0.35em] font-bold">
            Pase de Invitación VIP
          </span>
          <MarkedButterfly size={16} glow className="scale-x-[-1]" />
        </div>

        {/* Central Monogram */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-b from-blue-500 to-sky-500 border-2 border-white flex flex-col items-center justify-center shadow-lg relative">
            <span className="font-display text-4xl text-white font-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
              15
            </span>
            <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-white font-bold">
              Años
            </span>

            {/* Perched Blue Butterflies */}
            <div className="absolute -top-3 -left-3 -rotate-25">
              <MarkedButterfly size={32} glow />
            </div>
            <div className="absolute -top-3 -right-3 rotate-25 scale-x-[-1]">
              <MarkedButterfly size={32} glow />
            </div>
          </div>
        </div>

        <p className="font-script text-3xl sm:text-4xl text-white leading-none drop-shadow-sm">
          Mis Quince Años
        </p>

        {/* Celeste */}
        <h2 className="font-cinzel text-3xl sm:text-4xl font-black text-white tracking-[0.1em] mt-1 drop-shadow-sm">
          CELESTE
        </h2>

        <div className="silver-divider my-4 max-w-xs mx-auto" />

        <div className="space-y-1.5 text-xs font-body text-white">
          <p className="font-cinzel text-sm text-white font-bold">
            Viernes 27 de Noviembre · 20:30 hs
          </p>
          <p className="text-white font-semibold">
            Sindicato Camioneros Neuquén · Aguado 2385
          </p>
          <p className="text-sky-100 font-cinzel text-[11px] font-bold tracking-wider uppercase">
            Vestimenta: Elegante Sport
          </p>
          <p className="text-[10px] text-white/95 font-body font-bold">
            (Azul Francia y Plateado reservados para la cumpleañera)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-6 pt-4 border-t border-white/30">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white hover:bg-sky-100 text-blue-900 font-cinzel text-xs font-black tracking-wider cursor-pointer shadow-md border-2 border-white"
          >
            <Share2 className="w-4 h-4 text-blue-900" />
            <span>Compartir</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-500/80 hover:bg-blue-400 border-2 border-white text-white font-cinzel text-xs font-bold tracking-wider cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
