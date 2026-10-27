import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import {
  CelestialMedallion,
  SilverButterflyStarDivider,
  FloatingCelestialButterflies,
  MarkedButterfly,
} from './components/CelestialDecorations';
import { TopPhotoBanner } from './components/TopPhotoBanner';
import { PhotoCarousel } from './components/PhotoCarousel';
import { CountdownTimer } from './components/CountdownTimer';
import { LocationCard } from './components/LocationCard';
import { DressCodeCard } from './components/DressCodeCard';
import { GiftAliasCard } from './components/GiftAliasCard';
import { SharedAlbumCard } from './components/SharedAlbumCard';
import { RsvpSection } from './components/RsvpSection';
import { GuestMessagesWall } from './components/GuestMessagesWall';
import { MusicPlayer } from './components/MusicPlayer';
import { ClickSparkles } from './components/ClickSparkles';
import { AmbientSparkles } from './components/AmbientSparkles';
import { Toast } from './components/Toast';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Mis XV Cele 🦋';
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white font-body selection:bg-white selection:text-blue-700">
      {/* Interactive Click/Tap Blue Butterfly Bursts */}
      <ClickSparkles />

      {/* Delicado efecto de brillitos tenues en toda la invitación */}
      <AmbientSparkles />

      {/* Vibrant Luminous Celestial Blue Sky Background */}
      <CosmicBackground />

      {/* Fluttering Blue Butterflies across the Sky */}
      <FloatingCelestialButterflies />

      {/* Music Player */}
      <MusicPlayer />

      {/* Action Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* FOTO PRINCIPAL DE CELESTE - FULL BLEED CUBRIENDO TODOS LOS LADOS ARRIBA DE TODO */}
      <TopPhotoBanner />

      {/* Main Invitation Layout - Full Width Edge-to-Edge Sections */}
      <main className="relative z-10 w-full pt-4 pb-24 text-center space-y-8 sm:space-y-12">

        {/* HERO SECTION - Full width luminous royal blue translucent glass banner */}
        <header className="relative w-full silver-card border-y-2 border-white/80 overflow-hidden shadow-2xl py-8 sm:py-12">
          {/* Subtle light glows */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-sky-300/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-300/25 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">
            {/* Top Badge with Blue Butterfly */}
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white font-cinzel font-bold mb-3">
              <MarkedButterfly size={16} glow />
              <span>Te Invito a Celebrar</span>
              <MarkedButterfly size={16} glow className="scale-x-[-1]" />
            </div>

            {/* Medallion with Blue Butterflies & 15 Monogram */}
            <div className="my-2">
              <CelestialMedallion className="w-44 h-44 sm:w-56 sm:h-56">
                <span className="font-display text-5xl sm:text-6xl text-white font-black tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
                  15
                </span>
                <span className="font-cinzel text-xs sm:text-sm tracking-[0.4em] uppercase text-sky-100 font-bold mt-1">
                  Años
                </span>
              </CelestialMedallion>
            </div>

            {/* Calligraphic Script Header in Radiant White */}
            <p className="font-script text-4xl sm:text-6xl text-white leading-tight mt-3 drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]">
              Mis Quince Años
            </p>

            {/* Celebrant Name in Luxury Typography - CELESTE */}
            <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-[0.14em] uppercase mt-1 mb-1 drop-shadow-[0_2px_15px_rgba(255,255,255,0.6)]">
              CELESTE
            </h1>
            <p className="font-cinzel text-base sm:text-xl text-sky-100 font-bold tracking-[0.35em] uppercase mb-2">
              🦋 Mis XV Cele 🦋
            </p>

            {/* Blue Butterfly Divider */}
            <SilverButterflyStarDivider className="my-3" />

            {/* Emotional Quote */}
            <div className="max-w-lg mx-auto px-4 mt-1 mb-5">
              <p className="font-serif-luxury italic text-base sm:text-xl text-white leading-relaxed font-normal">
                "Hay momentos en la vida que soñamos desde siempre, pero compartirlos con las
                personas que más queremos los convierte en recuerdos inolvidables."
              </p>
              <p className="text-xs sm:text-sm text-sky-100 font-cinzel tracking-widest mt-2 uppercase font-bold">
                ¡Quiero que seas parte de esta noche mágica!
              </p>
            </div>

            {/* Key Date & Place Quick Summary - Luminous Translucent Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-2 text-xs sm:text-sm font-cinzel text-white">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/40 border-2 border-white/80 backdrop-blur-md shadow-md hover:bg-blue-500/50 transition-colors">
                <Calendar className="w-4 h-4 text-white" />
                <strong className="font-bold">Viernes 27 Noviembre 2026</strong>
              </span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/40 border-2 border-white/80 backdrop-blur-md shadow-md hover:bg-blue-500/50 transition-colors">
                <Clock className="w-4 h-4 text-white" />
                <strong className="font-bold">20:30 hs</strong>
              </span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/40 border-2 border-white/80 backdrop-blur-md shadow-md hover:bg-blue-500/50 transition-colors">
                <MapPin className="w-4 h-4 text-white" />
                <strong className="font-bold">Sindicato Camioneros Neuquén</strong>
              </span>
            </div>
          </div>
        </header>

        {/* COUNTDOWN TIMER */}
        <section aria-label="Cuenta regresiva del evento" className="w-full">
          <CountdownTimer />
        </section>

        {/* CARRUSEL DE FOTOS AUTOMÁTICO */}
        <section aria-label="Carrusel de fotos de Cele" className="w-full">
          <PhotoCarousel />
        </section>

        {/* LOCATION & VENUE SECTION */}
        <section aria-label="Ubicación y horario del evento" className="w-full">
          <LocationCard onShowToast={showToast} />
        </section>

        {/* DRESS CODE SECTION */}
        <section aria-label="Código de vestimenta" className="w-full">
          <DressCodeCard />
        </section>

        {/* GIFT & LLUVIA DE SOBRES / TRANSFERENCIA SECTION */}
        <section aria-label="Información de regalos y alias de transferencia" className="w-full">
          <GiftAliasCard onShowToast={showToast} />
        </section>

        {/* SHARED PARTY PHOTOS & VIDEOS ALBUM SECTION */}
        <section aria-label="Subir fotos y videos de la fiesta" className="w-full">
          <SharedAlbumCard />
        </section>

        {/* RSVP CONFIRMATION FORM */}
        <section aria-label="Confirmación de asistencia" className="w-full">
          <RsvpSection onShowToast={showToast} />
        </section>

        {/* GUESTBOOK MESSAGES WALL FOR CELE */}
        <section aria-label="Mensajes y dedicatorias para Cele" className="w-full">
          <GuestMessagesWall onShowToast={showToast} />
        </section>

        {/* FOOTER */}
        <footer className="w-full max-w-3xl mx-auto px-4 mt-14 pt-8 border-t border-white/40 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <MarkedButterfly size={26} glow />
            <MarkedButterfly size={26} glow className="scale-x-[-1]" />
          </div>
          <p className="font-script text-3xl sm:text-4xl text-white leading-none drop-shadow-sm">
            ¡Te espero para festejar juntos!
          </p>
          <p className="font-cinzel text-xl sm:text-2xl text-white font-black tracking-widest uppercase mt-1">
            MIS XV CELE · 2026
          </p>
          <p className="text-[11px] text-sky-100 uppercase tracking-widest font-cinzel mt-2 font-bold">
            Viernes 27 de Noviembre · Sindicato Camioneros Neuquén (Aguado 2385)
          </p>
        </footer>
      </main>
    </div>
  );
}
