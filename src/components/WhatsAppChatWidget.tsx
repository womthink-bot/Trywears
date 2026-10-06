import React, { useState } from "react";
import { MessageCircle, X, Send, PhoneCall, Sparkles, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const WHATSAPP_NUMBER = "+923185519151";
export const WHATSAPP_DISPLAY = "+92 318 5519151";
export const WHATSAPP_DEFAULT_MSG = "Hello TRYWEARS, I would like to inquire about custom apparel and fightwear manufacturing.";

export const getWhatsAppUrl = (customMessage?: string) => {
  const text = encodeURIComponent(customMessage || WHATSAPP_DEFAULT_MSG);
  return `https://wa.me/923185519151?text=${text}`;
};

export const WhatsAppChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleStartChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalMsg = message.trim() || WHATSAPP_DEFAULT_MSG;
    window.open(getWhatsAppUrl(finalMsg), "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <aside aria-label="WhatsApp live chat assistant" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Chat Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-3 w-[330px] sm:w-[360px] rounded-3xl bg-[#0d1410] border border-emerald-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden font-sans text-white"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-display font-black text-white text-base">
                    TW
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-700 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm tracking-wide text-white">
                    TRYWEARS Factory Desk
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-100 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                    <span>Live 24/7 • {WHATSAPP_DISPLAY}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 bg-[#090d0b]">
              <div className="p-3 rounded-2xl bg-[#111915] border border-emerald-500/20 text-xs space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                  <span className="font-bold uppercase">TRYWEARS Sialkot Team</span>
                  <span>Just now</span>
                </div>
                <p className="text-neutral-200 leading-relaxed">
                  Hi there! 👋 Connect directly with our Senior Merchandiser for instant quotes, tech pack reviews, sampling timelines, or custom inquiries.
                </p>
                <div className="flex items-center justify-end text-emerald-400 text-[10px] gap-1">
                  <CheckCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                  Quick Inquiries:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Get Wholesale Pricing & MOQ",
                    "Custom Tech Pack Review",
                    "UK DDP Shipping Time",
                    "Order Physical PPS Sample"
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setMessage(preset);
                        window.open(getWhatsAppUrl(preset), "_blank", "noopener,noreferrer");
                        setIsOpen(false);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#14211a] hover:bg-emerald-600 hover:text-white text-emerald-300 border border-emerald-500/30 text-[11px] font-mono transition-colors cursor-pointer text-left"
                    >
                      {preset} →
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Message Form */}
              <form onSubmit={handleStartChat} className="space-y-2 pt-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#111915] border border-emerald-500/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 font-sans pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all cursor-pointer"
                    title="Send to WhatsApp"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                <a
                  href={getWhatsAppUrl(message || WHATSAPP_DEFAULT_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Start Live WhatsApp Chat</span>
                </a>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-2.5 px-4 sm:px-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-300/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.75)] transition-all cursor-pointer"
          aria-label="Open live WhatsApp chat"
        >
          {/* Animated WhatsApp Icon */}
          <div className="relative">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-black leading-tight text-white flex items-center gap-1">
              LIVE CHAT
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            </span>
            <span className="text-[9px] text-emerald-200 tracking-normal font-sans font-medium">
              WhatsApp 24/7 Desk
            </span>
          </div>
        </button>
      </motion.div>
    </aside>
  );
};
