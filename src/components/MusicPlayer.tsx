import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    // Song: Christina Perri - A Thousand Years
    const songUrl = '/audio/a_thousand_years.mp3';
    const audio = new Audio(songUrl);
    audio.loop = true;
    audio.volume = 0.8;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Attempt automatic autoplay immediately
    const attemptAutoplay = async () => {
      try {
        await audio.play();
        userInteractedRef.current = true;
        setIsPlaying(true);
      } catch {
        // Autoplay policy prevented immediate playback without user gesture.
        // Listen to first gesture anywhere on the screen (click, touch, scroll, swipe)
        const startOnUserGesture = () => {
          if (userInteractedRef.current) return;
          userInteractedRef.current = true;
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {});
          }
          cleanupGestureListeners();
        };

        const cleanupGestureListeners = () => {
          window.removeEventListener('click', startOnUserGesture, true);
          window.removeEventListener('touchstart', startOnUserGesture, true);
          window.removeEventListener('pointerdown', startOnUserGesture, true);
          window.removeEventListener('scroll', startOnUserGesture, true);
          window.removeEventListener('keydown', startOnUserGesture, true);
        };

        window.addEventListener('click', startOnUserGesture, { capture: true, once: true });
        window.addEventListener('touchstart', startOnUserGesture, { capture: true, once: true });
        window.addEventListener('pointerdown', startOnUserGesture, { capture: true, once: true });
        window.addEventListener('scroll', startOnUserGesture, { capture: true, once: true });
        window.addEventListener('keydown', startOnUserGesture, { capture: true, once: true });
      }
    };

    attemptAutoplay();

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    userInteractedRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  return (
    <aside aria-label="Reproductor de música de fondo">
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pausar música: A Thousand Years' : 'Reproducir música: A Thousand Years'}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border-2 border-white text-white shadow-[0_4px_25px_rgba(37,99,235,0.45)] transition-all duration-300 group cursor-pointer ${
          isPlaying
            ? 'bg-blue-600/95 hover:bg-blue-500 scale-100'
            : 'bg-blue-700/90 hover:bg-blue-600 scale-105 animate-pulse'
        }`}
        title={isPlaying ? 'Pausar: A Thousand Years - Christina Perri' : 'Reproducir: A Thousand Years - Christina Perri'}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <>
              <span className="absolute -inset-1 rounded-full bg-sky-300/50 animate-ping" />
              <Volume2 className="w-4 h-4 text-sky-200 relative z-10" />
            </>
          ) : (
            <>
              <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping" />
              <Music className="w-4 h-4 text-white relative z-10" />
            </>
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[11px] font-cinzel font-black tracking-wider text-white whitespace-nowrap leading-tight">
            {isPlaying ? 'A Thousand Years' : 'Reproducir Música'}
          </span>
          <span className="text-[9px] font-cinzel tracking-wider text-sky-200 uppercase whitespace-nowrap leading-none">
            {isPlaying ? 'Christina Perri' : 'A Thousand Years'}
          </span>
        </div>

        {isPlaying ? (
          <span className="flex items-center gap-0.5 ml-1" aria-hidden="true">
            <span className="w-0.5 h-3 bg-sky-300 rounded-full animate-bounce" />
            <span className="w-0.5 h-4 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-0.5 h-2 bg-sky-300 rounded-full animate-bounce [animation-delay:300ms]" />
          </span>
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-sky-200 ml-1" />
        )}
      </button>
    </aside>
  );
};
