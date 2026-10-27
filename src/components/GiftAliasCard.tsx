import React, { useState } from 'react';
import { Gift, Copy, Check, QrCode, CreditCard, Building2, User, Hash } from 'lucide-react';
import { ButterflyStarCorner, MarkedButterfly } from './CelestialDecorations';

interface GiftAliasCardProps {
  onShowToast: (message: string) => void;
}

export const GiftAliasCard: React.FC<GiftAliasCardProps> = ({ onShowToast }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);

  const bankData = {
    entity: 'Naranja X',
    alias: 'mis.15.celeste.',
    cajaAhorro: '1868436268',
    titular: 'Anabel Julieta Vielma',
    cuil: '27384937719',
  };

  const copyToClipboard = (text: string, label: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    onShowToast(`¡${label} copiado con éxito!`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full p-6 sm:p-10 silver-card border-y-2 border-white/80 overflow-hidden shadow-2xl">
        <ButterflyStarCorner position="top-right" />
        <ButterflyStarCorner position="bottom-left" />

        <div className="w-full max-w-2xl mx-auto">
          {/* Card Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 border-2 border-white text-white shadow-md mb-3">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <span className="block text-xs font-cinzel uppercase tracking-[0.35em] text-white font-bold">
              Lluvia de Sobres
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-black tracking-wide mt-1 drop-shadow-sm">
              Mesa de Regalos
            </h3>
            <div className="silver-divider max-w-xs mx-auto my-3" />
          </div>

          {/* Requested Dedication Phrase */}
          <p className="text-center text-white text-sm sm:text-base font-body max-w-md mx-auto leading-relaxed font-medium italic">
            "Los mejores regalos son los momentos compartidos y el cariño de quienes amo. Si querés regalarme algo más, podés hacerlo a través de una transferencia."
          </p>

          {/* Bank & Transfer Data Showcase - Translucent Blue Container */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-blue-600/35 backdrop-blur-md border-2 border-white/80 shadow-md relative overflow-hidden">
          {/* Subtle light accent glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/20 rounded-full blur-2xl pointer-events-none" />

          {/* Badge Entidad */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/30">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600 border border-white text-white text-xs font-cinzel font-bold">
              <Building2 className="w-3.5 h-3.5 text-white" />
              <span>{bankData.entity}</span>
            </div>
            <span className="text-[11px] font-cinzel uppercase tracking-wider text-sky-100 font-bold">
              Caja de Ahorro en Pesos
            </span>
          </div>

          {/* Data List */}
          <div className="space-y-3.5">
            {/* Alias */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-blue-600/80 border border-white/80">
              <div className="text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-100 font-cinzel block">
                  Alias de Transferencia
                </span>
                <p className="font-mono text-base sm:text-lg font-black text-white tracking-wider select-all">
                  {bankData.alias}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(bankData.alias, 'Alias', 'alias')}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl bg-white hover:bg-sky-100 text-blue-700 font-cinzel text-xs font-black tracking-wider transition-all duration-200 cursor-pointer shadow-md self-start sm:self-center border border-white/90"
              >
                {copiedField === 'alias' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-blue-700" />
                    <span>Copiar Alias</span>
                  </>
                )}
              </button>
            </div>

            {/* Caja de ahorro */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-blue-600/80 border border-white/80">
              <div className="text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-100 font-cinzel block">
                  Caja de Ahorro en Pesos (N° de Cuenta)
                </span>
                <p className="font-mono text-base sm:text-lg font-black text-white tracking-wider select-all">
                  {bankData.cajaAhorro}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(bankData.cajaAhorro, 'Número de cuenta', 'cuenta')}
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl bg-blue-600/90 hover:bg-blue-500 border-2 border-white/80 text-white font-cinzel text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-sm self-start sm:self-center"
              >
                {copiedField === 'cuenta' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="text-emerald-200">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-white" />
                    <span>Copiar Cuenta</span>
                  </>
                )}
              </button>
            </div>

            {/* Titular & CUIL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-1">
              <div className="p-3 rounded-xl bg-blue-600/70 border border-white/80 shadow-inner">
                <span className="text-[10px] font-cinzel uppercase tracking-wider text-sky-100 font-bold block">
                  Titular de la Cuenta
                </span>
                <p className="text-sm font-bold text-white font-body mt-0.5">
                  {bankData.titular}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-600/70 border border-white/80 shadow-inner flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-cinzel uppercase tracking-wider text-sky-100 font-bold block">
                    CUIL
                  </span>
                  <p className="text-sm font-bold text-white font-mono mt-0.5">
                    {bankData.cuil}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(bankData.cuil, 'CUIL', 'cuil')}
                  className="p-1.5 rounded-lg hover:bg-blue-500 text-white transition-colors"
                  title="Copiar CUIL"
                >
                  {copiedField === 'cuil' ? (
                    <Check className="w-4 h-4 text-emerald-300" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Toggle for Bank Transfer */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            className="inline-flex items-center gap-2 text-xs font-cinzel text-white hover:text-sky-100 font-bold transition-colors cursor-pointer underline decoration-white"
          >
            <QrCode className="w-4 h-4" />
            <span>{showQr ? 'Ocultar código QR' : 'Ver código QR de transferencia'}</span>
          </button>

          {showQr && (
            <div className="mt-4 p-5 rounded-2xl bg-white border-2 border-blue-500 inline-block shadow-xl animate-fadeIn">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  bankData.alias
                )}&color=1d4ed8`}
                alt="QR para transferir a Cele"
                className="w-40 h-40 mx-auto rounded-lg"
              />
              <p className="text-[11px] font-mono text-blue-700 font-bold mt-2">
                Alias: {bankData.alias}
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};
