import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { MessageSquareHeart, Send, Music2 } from 'lucide-react';
import {
  ButterflyStarCorner,
  MarkedButterfly,
} from './CelestialDecorations';

export interface GuestMessageDoc {
  id: string;
  authorName: string;
  message: string;
  song?: string;
  createdAt?: Timestamp | null;
}

export async function saveGuestMessageToPage(
  rawAuthorName: string,
  rawMessage: string,
  rawSong?: string
): Promise<void> {
  const authorName = rawAuthorName.trim().slice(0, 80);
  const message = rawMessage.trim().slice(0, 500);
  const song = rawSong ? rawSong.trim().slice(0, 120) : '';

  if (!authorName || !message) {
    return;
  }

  const payload: Record<string, unknown> = {
    authorName,
    message,
    createdAt: serverTimestamp(),
  };

  if (song) {
    payload.song = song;
  }

  try {
    await addDoc(collection(db, 'messages'), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'messages');
  }
}

interface GuestMessagesWallProps {
  onShowToast: (message: string) => void;
}

export const GuestMessagesWall: React.FC<GuestMessagesWallProps> = ({ onShowToast }) => {
  const [messages, setMessages] = useState<GuestMessageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: GuestMessageDoc[] = snapshot.docs
          .map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              authorName: String(data.authorName || ''),
              message: String(data.message || ''),
              song: data.song ? String(data.song) : undefined,
              createdAt: data.createdAt instanceof Timestamp ? data.createdAt : null,
            };
          })
          .filter((msg) => msg.authorName && msg.message && msg.authorName !== 'Test Node');
        setMessages(docs);
        setLoading(false);
      },
      (error) => {
        console.warn('Error reading messages:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handlePostMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      onShowToast('Por favor escribí tu nombre');
      return;
    }
    if (!messageText.trim()) {
      onShowToast('Por favor escribí tu mensaje para Cele');
      return;
    }

    setSubmitting(true);
    try {
      await saveGuestMessageToPage(authorName, messageText);
      setMessageText('');
      onShowToast('¡Tu mensaje para Cele quedó publicado en la página! 🦋');
    } catch {
      onShowToast('No se pudo publicar el mensaje. Intentá nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (ts?: Timestamp | null) => {
    if (!ts) return 'Recién publicado';
    try {
      return ts.toDate().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'short',
      });
    } catch {
      return '';
    }
  };

  return (
    <div className="relative w-full" id="mensajes-cele">
      <div className="relative w-full p-6 sm:p-10 silver-card border-y-2 border-white/80 overflow-hidden shadow-2xl">
        <ButterflyStarCorner position="top-left" />
        <ButterflyStarCorner position="bottom-right" />

        <div className="w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 border-2 border-white text-white shadow-md mb-2">
              <MessageSquareHeart className="w-7 h-7 text-white" />
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-cinzel uppercase tracking-[0.35em] text-white font-bold">
              <MarkedButterfly size={16} glow />
              <span>Libro de Recuerdos</span>
              <MarkedButterfly size={16} glow className="scale-x-[-1]" />
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-black tracking-wide mt-1 drop-shadow-sm">
              Mensajes para Cele 🦋
            </h3>

            <div className="silver-divider max-w-xs mx-auto my-3" />

            <p className="text-sm text-white font-body font-medium max-w-md mx-auto">
              Dejale tus deseos y dedicatorias a Cele. ¡Todos los mensajes quedan guardados acá en su página!
            </p>
          </div>

          {/* Form to write a message directly on the page */}
          <form
            onSubmit={handlePostMessage}
            className="space-y-3.5 text-left bg-blue-600/35 backdrop-blur-md p-4 sm:p-5 rounded-2xl border-2 border-white/80 mb-7 shadow-md"
          >
          <div>
            <label
              htmlFor="wall-author-name"
              className="block text-xs font-cinzel tracking-wider uppercase text-white font-bold mb-1"
            >
              Tu Nombre *
            </label>
            <input
              id="wall-author-name"
              type="text"
              required
              maxLength={80}
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Ej: Tía Laura / Familia Gómez"
              className="w-full px-3.5 py-2.5 rounded-xl bg-blue-600/70 border-2 border-white/70 text-white placeholder-blue-100/70 text-sm focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-colors font-medium shadow-inner"
            />
          </div>

          <div>
            <label
              htmlFor="wall-message-text"
              className="block text-xs font-cinzel tracking-wider uppercase text-white font-bold mb-1"
            >
              Tu Mensaje para Cele *
            </label>
            <textarea
              id="wall-message-text"
              rows={2}
              required
              maxLength={500}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Escribile unas palabras lindas para sus 15 años..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-blue-600/70 border-2 border-white/70 text-white placeholder-blue-100/70 text-sm focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-colors resize-none font-medium shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 disabled:opacity-50 text-white font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer border-2 border-white/80"
          >
            <Send className="w-4 h-4 text-white" />
            <span>{submitting ? 'Publicando...' : 'Publicar Mensaje en la Página'}</span>
          </button>
        </form>

        {/* Messages Wall List */}
        <div className="space-y-3.5 text-left max-h-[420px] overflow-y-auto pr-1">
          {loading ? (
            <div className="text-center py-8 text-white text-sm font-body font-semibold">
              Cargando mensajes para Cele...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-2xl bg-blue-600/35 backdrop-blur-md border-2 border-white/80">
              <div className="flex justify-center mb-2">
                <MarkedButterfly size={26} glow />
              </div>
              <p className="text-sm text-white font-body font-medium">
                ¡Sé la primera persona en dejarle un mensaje especial a Cele! 🦋
              </p>
            </div>
          ) : (
            messages.map((item) => (
              <div
                key={item.id}
                className="relative p-4 rounded-2xl bg-blue-600/35 backdrop-blur-md border-2 border-white/80 shadow-md transition-all hover:bg-blue-500/40"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 border-2 border-white text-white text-xs font-cinzel font-black">
                      {item.authorName.charAt(0).toUpperCase()}
                    </span>
                    <span className="font-cinzel text-sm font-black text-white tracking-wide">
                      {item.authorName}
                    </span>
                  </div>
                  <span className="text-[11px] text-sky-100 font-body font-semibold">
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-white font-body leading-relaxed pl-9 font-medium">
                  “{item.message}”
                </p>

                {item.song && (
                  <div className="mt-2 pl-9 flex items-center gap-1.5 text-xs text-sky-100 font-body font-bold">
                    <Music2 className="w-3.5 h-3.5 shrink-0 text-white" />
                    <span>Tema sugerido: {item.song}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      </div>
    </div>
  );
};
