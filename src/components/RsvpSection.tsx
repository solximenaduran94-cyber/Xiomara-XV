import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Music2, Users } from 'lucide-react';
import { ButterflyStarCorner, MarkedButterfly } from './CelestialDecorations';
import { saveGuestMessageToPage } from './GuestMessagesWall';

interface RsvpSectionProps {
  onShowToast: (message: string) => void;
}

interface SavedRsvp {
  name: string;
  attending: boolean;
  guests: number;
  song: string;
  message: string;
  date: string;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guests, setGuests] = useState('1');
  const [song, setSong] = useState('');
  const [message, setMessage] = useState('');
  const [savedRsvp, setSavedRsvp] = useState<SavedRsvp | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cele_15_rsvp');
      if (stored) {
        setSavedRsvp(JSON.parse(stored));
      }
    } catch {
      // ignore storage error
    }
  }, []);

  const WHATSAPP_PHONE = '5492995481194';
  const WHATSAPP_DISPLAY = '+54 9 299 548-1194';

  const buildWhatsAppUrl = (data: SavedRsvp) => {
    const attendingText =
      data.attending ? '¡Sí, confirmo mi asistencia! 🎉' : 'Lamentablemente no podré asistir 🥺';
    let waText = `🦋 *CONFIRMACIÓN DE ASISTENCIA - MIS XV CELE* 🦋\n\n`;
    waText += `👤 *Nombre:* ${data.name}\n`;
    waText += `💌 *Asistencia:* ${attendingText}\n`;
    if (data.attending) {
      waText += `👥 *Cantidad de personas que asisten:* ${data.guests}\n`;
    }
    if (data.attending && data.song) {
      waText += `🎵 *Canción sugerida:* ${data.song}\n`;
    }
    if (data.message) {
      waText += `💬 *Dedicatoria para Cele:* "${data.message}"\n`;
    }
    waText += `\n📅 *Evento:* Viernes 27 de Noviembre - 20:30 hs - Sindicato Camioneros Neuquén (Aguado 2385)`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waText)}`;
  };

  const openWhatsAppLink = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onShowToast('Por favor escribe tu nombre y apellido');
      return;
    }

    const rsvpData: SavedRsvp = {
      name: name.trim(),
      attending: attending === 'yes',
      guests: attending === 'yes' ? parseInt(guests, 10) || 1 : 0,
      song: song.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('es-AR'),
    };

    if (rsvpData.message) {
      saveGuestMessageToPage(rsvpData.name, rsvpData.message, rsvpData.song).catch(() => {});
    }

    localStorage.setItem('cele_15_rsvp', JSON.stringify(rsvpData));
    setSavedRsvp(rsvpData);
    onShowToast('¡Confirmación guardada y redirigiendo a WhatsApp!');

    const waUrl = buildWhatsAppUrl(rsvpData);
    openWhatsAppLink(waUrl);
  };

  const handleReset = () => {
    localStorage.removeItem('cele_15_rsvp');
    setSavedRsvp(null);
  };

  return (
    <div className="relative w-full" id="rsvp">
      <div className="relative w-full p-6 sm:p-10 silver-card border-y-2 border-white/80 overflow-hidden shadow-2xl">
        <ButterflyStarCorner position="top-left" />
        <ButterflyStarCorner position="bottom-right" />

        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-white font-bold">
              Acompañame en mi Noche
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-black tracking-wide mt-1 drop-shadow-sm">
              Confirmar Asistencia
            </h3>
            <div className="silver-divider max-w-xs mx-auto my-3" />
            <p className="text-sm text-white font-body font-medium">
              Por favor, confirmá tu presencia por WhatsApp al{' '}
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  '¡Hola! Quiero confirmar mi asistencia a los XV de Cele 🦋'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-black underline decoration-white hover:text-sky-100 transition-colors"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </p>
          </div>

          {savedRsvp ? (
            <div className="p-6 rounded-2xl bg-blue-600/35 backdrop-blur-md border-2 border-white/80 text-center animate-fadeIn shadow-lg">
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white text-white mx-auto flex items-center justify-center mb-4 shadow-md">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-cinzel text-xl text-white font-black mb-1">
              ¡Gracias, {savedRsvp.name}!
            </h4>
            <p className="text-sm text-white font-body mb-2 font-medium">
              {savedRsvp.attending
                ? 'Confirmaste tu asistencia. ¡Nos vemos para celebrar los XV de Cele!'
                : 'Gracias por avisar. ¡Te vamos a extrañar mucho!'}
            </p>
            {savedRsvp.attending && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 border border-white text-white text-xs font-cinzel font-bold mb-4 shadow-sm">
                <Users className="w-3.5 h-3.5 text-white" />
                <span>Lugares confirmados: <strong>{savedRsvp.guests} {savedRsvp.guests === 1 ? 'persona' : 'personas'}</strong></span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openWhatsAppLink(buildWhatsAppUrl(savedRsvp))}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-white font-cinzel text-xs font-bold tracking-wider cursor-pointer shadow-md border-2 border-white/80"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Reenviar a WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto text-xs text-white hover:text-sky-100 underline font-cinzel py-2 font-bold cursor-pointer"
              >
                Modificar confirmación
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Full Name */}
            <div>
              <label htmlFor="guest-name" className="block text-xs font-cinzel uppercase tracking-wider text-white font-bold mb-1.5">
                Nombre y Apellido *
              </label>
              <input
                id="guest-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Anabel Vielma"
                className="w-full px-4 py-3 rounded-xl bg-blue-600/70 border-2 border-white/70 text-white placeholder-blue-100/70 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-colors shadow-inner font-medium"
              />
            </div>

            {/* Attendance Radio */}
            <div>
              <span className="block text-xs font-cinzel uppercase tracking-wider text-white font-bold mb-2">
                ¿Asistirás a la fiesta? *
              </span>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    attending === 'yes'
                      ? 'bg-white border-white text-blue-900 font-black shadow-[0_0_15px_rgba(255,255,255,0.6)]'
                      : 'bg-blue-600/60 border-white/60 text-white hover:bg-blue-500/80 font-bold'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={attending === 'yes'}
                    onChange={() => setAttending('yes')}
                    className="sr-only"
                  />
                  <span>¡Sí, voy! 🎉</span>
                </label>

                <label
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    attending === 'no'
                      ? 'bg-white border-white text-blue-900 font-black shadow-[0_0_15px_rgba(255,255,255,0.6)]'
                      : 'bg-blue-600/60 border-white/60 text-white hover:bg-blue-500/80 font-bold'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={attending === 'no'}
                    onChange={() => setAttending('no')}
                    className="sr-only"
                  />
                  <span>No puedo ir 🥺</span>
                </label>
              </div>
            </div>

            {/* Number of Guests Attending */}
            {attending === 'yes' && (
              <div className="p-3.5 rounded-2xl bg-blue-600/35 backdrop-blur-md border-2 border-white/80 animate-fadeIn">
                <label htmlFor="guest-count-custom" className="block text-xs font-cinzel uppercase tracking-wider text-white font-bold mb-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-white" />
                    <span>Cantidad de personas que van a asistir *</span>
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(String(num))}
                      className={`flex-1 py-2.5 rounded-xl border-2 font-cinzel font-bold text-sm transition-all cursor-pointer ${
                        guests === String(num)
                          ? 'bg-white border-white text-blue-900 shadow-md font-black scale-105'
                          : 'bg-blue-600/70 border-white/70 text-white hover:bg-blue-500'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <div className="flex-1 min-w-[68px]">
                    <input
                      id="guest-count-custom"
                      type="number"
                      min={1}
                      max={20}
                      value={parseInt(guests, 10) > 5 ? guests : ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val) setGuests(val);
                      }}
                      aria-label="Más de 5 personas"
                      placeholder="+5"
                      className="w-full py-2.5 px-2 text-center rounded-xl bg-blue-600/70 border-2 border-white/70 text-white placeholder-white/80 font-cinzel font-bold text-sm focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-sky-100 font-body font-medium mt-1.5">
                  Confirmando: <strong className="text-white font-bold">{guests} {parseInt(guests, 10) === 1 ? 'persona' : 'personas'}</strong> (incluyéndote a vos).
                </p>
              </div>
            )}

            {/* Song Suggestion */}
            <div>
              <label htmlFor="song-request" className="block text-xs font-cinzel uppercase tracking-wider text-white font-bold mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <Music2 className="w-3.5 h-3.5 text-white" />
                  <span>¿Qué tema no puede faltar en la fiesta?</span>
                </span>
              </label>
              <input
                id="song-request"
                type="text"
                value={song}
                onChange={(e) => setSong(e.target.value)}
                placeholder="Tema y artista favorito"
                className="w-full px-4 py-3 rounded-xl bg-blue-600/70 border-2 border-white/70 text-white placeholder-blue-100/70 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-colors shadow-inner font-medium"
              />
            </div>

            {/* Message for Cele */}
            <div>
              <label htmlFor="message-box" className="block text-xs font-cinzel uppercase tracking-wider text-white font-bold mb-1.5">
                Dedicatoria o mensaje para Cele
              </label>
              <textarea
                id="message-box"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribile un mensaje especial para que quede publicado en su muro de dedicatorias..."
                className="w-full px-4 py-3 rounded-xl bg-blue-600/70 border-2 border-white/70 text-white placeholder-blue-100/70 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-colors shadow-inner font-medium resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-white font-cinzel font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5 border-2 border-white/80"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Confirmar por WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
      </div>
    </div>
  );
};
