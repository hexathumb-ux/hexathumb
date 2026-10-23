import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, ExternalLink, X, Send } from 'lucide-react';
import { getWhatsAppUrl, BRAND_CONFIG } from '../data/config';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const directUrl = getWhatsAppUrl(
    whatsappNumber,
    userMsg.trim() || BRAND_CONFIG.whatsappPrefillMessage
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 sm:w-88 rounded-2xl bg-[#1E1E26] border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] text-[#0F141A] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight text-white">Harsh Singh · HEXA</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/90 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Usually replies in minutes</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close WhatsApp chat preview"
                className="p-1 rounded-lg hover:bg-black/10 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 bg-[#17171E]">
              {/* Incoming Bubble */}
              <div className="p-3 rounded-2xl rounded-tl-sm bg-[#23232C] border border-white/5 text-xs text-[#E1E4EA] space-y-1">
                <p className="font-medium text-white">
                  Hey! I'm Harsh, designer at HEXA.
                </p>
                <p className="text-[#A3A8B3] leading-relaxed">
                  Need high-CTR YouTube thumbnails or graphic design? Message me directly on WhatsApp!
                </p>
                <div className="text-[10px] text-[#00E99A] font-mono-code pt-1">
                  WhatsApp: +91 79900 26523
                </div>
              </div>

              {/* Input for custom message */}
              <div className="space-y-2 pt-1">
                <textarea
                  rows={2}
                  value={userMsg}
                  onChange={(e) => setUserMsg(e.target.value)}
                  placeholder="Type your thumbnail or video idea..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#121217] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#25D366] resize-none"
                />

                <a
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-[#0F141A] bg-[#25D366] hover:bg-[#20BA5A] transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 fill-current" />
                  <span>Start WhatsApp Chat</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2.5 pl-3.5 pr-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-[#0F141A] font-bold text-xs shadow-[0_8px_25px_-5px_rgba(37,211,102,0.6)] cursor-pointer transition-all border border-white/20"
        aria-label="Contact Harsh on WhatsApp: +91 79900 26523"
      >
        <span className="relative flex items-center justify-center">
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#25D366]" />
        </span>
        <span className="hidden sm:inline-block font-sans">
          WhatsApp: +91 79900 26523
        </span>
        <span className="sm:hidden font-sans">
          WhatsApp
        </span>
      </motion.button>
    </div>
  );
};
