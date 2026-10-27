import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Copy, Check, ExternalLink, CalendarPlus } from 'lucide-react';
import { ButterflyStarCorner, MarkedButterfly } from './CelestialDecorations';

interface LocationCardProps {
  onShowToast: (message: string) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const venue = 'Sindicato Camioneros Neuquén';
  const address = 'Aguado 2385, Neuquén';
  const fullLocationString = `${venue}, ${address}`;
  const mapsUrl = 'https://maps.app.goo.gl/feosKtkzd9m2EP6o7?g_st=aw';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${fullLocationString} - ${mapsUrl}`);
    setCopied(true);
    onShowToast('¡Dirección y ubicación copiadas al portapapeles!');
    setTimeout(() => setCopied(false), 2500);
  };

  // Event: Friday 27 November 2026 at 20:30 to Saturday 28 November 05:00
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Mis XV Cele - 15 Años de Celeste'
  )}&dates=20261127T203000/20261128T050000&details=${encodeURIComponent(
    `Celebración de los 15 años de Celeste (Cele). ¡Te espero para festejar una noche mágica e inolvidable!\nLugar: ${fullLocationString}\nUbicación en Google Maps: ${mapsUrl}`
  )}&location=${encodeURIComponent(fullLocationString)}`;



  return (
    <div className="relative w-full">
      {/* High-contrast Translucent Royal Blue Full-Width Card */}
      <div className="relative w-full p-6 sm:p-10 silver-card border-y-2 border-white/80 overflow-hidden shadow-2xl">
        <ButterflyStarCorner position="top-left" />
        <ButterflyStarCorner position="bottom-right" />

        <div className="w-full max-w-2xl mx-auto">
          {/* Card Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 border-2 border-white text-white shadow-md mb-3">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-white font-bold">
              ¿Cuándo y Dónde?
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-black tracking-wide mt-1 drop-shadow-sm">
              Fecha y Lugar
            </h3>
            <div className="silver-divider max-w-xs mx-auto my-3" />
          </div>

          {/* Date & Time Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
            {/* Day block */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-blue-600/35 backdrop-blur-md border-2 border-white/80 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-blue-600 border border-white/90 flex items-center justify-center text-white shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-cinzel uppercase tracking-wider text-sky-100 font-bold block">
                  Día del Evento
                </span>
                <span className="text-base sm:text-lg font-black text-white font-cinzel block">
                  27 de Noviembre 2026
                </span>
                <span className="text-xs text-white font-bold font-body block">
                  Viernes
                </span>
              </div>
            </div>

            {/* Time block */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-blue-600/35 backdrop-blur-md border-2 border-white/80 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-blue-600 border border-white/90 flex items-center justify-center text-white shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-cinzel uppercase tracking-wider text-sky-100 font-bold block">
                  Horario de Inicio
                </span>
                <span className="text-base sm:text-lg font-black text-white font-cinzel block">
                  20:30 hs
                </span>
                <span className="text-xs text-white font-bold font-body block">
                  Puntual
                </span>
              </div>
            </div>
          </div>

          {/* Venue Information - Translucent Blue Container */}
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-600/35 backdrop-blur-md border-2 border-white/80 text-center mb-6 shadow-md">
          <div className="inline-flex items-center gap-2 text-white mb-2">
            <MarkedButterfly size={16} glow />
            <span className="text-xs uppercase font-cinzel tracking-[0.25em] font-bold text-white">
              Salón de Fiestas
            </span>
            <MarkedButterfly size={16} glow className="scale-x-[-1]" />
          </div>

          <h4 className="font-cinzel text-xl sm:text-2xl font-black text-white tracking-wide uppercase drop-shadow-sm">
            {venue}
          </h4>

          <p className="font-body text-base sm:text-lg text-white font-semibold mt-2 leading-relaxed">
            Aguado 2385
          </p>
          <p className="font-cinzel text-sm text-sky-100 font-bold tracking-wider uppercase mt-0.5">
            Neuquén Capital
          </p>

          {/* Embedded Google Maps Preview */}
          <div className="relative mt-5 rounded-xl overflow-hidden border-2 border-white/80 shadow-md aspect-video max-h-52 w-full">
            <iframe
              title="Ubicación Sindicato Camioneros Neuquén"
              src="https://maps.google.com/maps?q=Aguado+2385,+Neuquen,+Argentina&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Action Row inside venue box */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mt-5">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-white font-cinzel text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg border-2 border-white/80"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir en Google Maps</span>
            </a>

            <button
              type="button"
              onClick={handleCopyAddress}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600/80 hover:bg-blue-500/90 border-2 border-white/80 text-white font-cinzel text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="text-emerald-200 font-bold">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" />
                  <span>Copiar Dirección</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Add to Calendar Section */}
        <div className="flex items-center justify-center pt-2">
          <a
            href={gcalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-blue-600/80 hover:bg-blue-500/90 border-2 border-white/80 text-white font-cinzel text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
          >
            <CalendarPlus className="w-4 h-4 text-white" />
            <span>Guardar en Google Calendar</span>
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};
