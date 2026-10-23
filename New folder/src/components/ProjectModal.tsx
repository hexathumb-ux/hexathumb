import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Layers, Sparkles, ArrowRight, CheckCircle2, ImagePlus, MessageSquare } from 'lucide-react';
import { PortfolioItem } from '../types';
import { ThumbnailCanvas } from './ThumbnailCanvas';
import { getWhatsAppUrl } from '../data/config';

interface ProjectModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectForInquiry: (item: PortfolioItem) => void;
  onOpenOwnerGuide?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  item,
  isOpen,
  onClose,
  onPrev,
  onNext,
  onSelectForInquiry,
  onOpenOwnerGuide,
}) => {
  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard navigation: Escape to close, Left/Right arrow keys for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#1D1D22] border border-white/10 rounded-2xl shadow-2xl z-10 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-[#1D1D22]/90 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-2.5 text-xs text-[#A3A8B3]">
              {item.slotNumber && (
                <span className="px-2 py-0.5 rounded bg-[#00D5F5]/10 border border-[#00D5F5]/30 text-[#00D5F5] font-mono-code font-bold">
                  SLOT #{item.slotNumber}
                </span>
              )}
              <span className="text-white font-semibold tracking-wide uppercase">{item.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-code text-[11px] text-[#A3A8B3]">{item.aspectRatio} Aspect Ratio</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                aria-label="Previous project"
                className="p-1.5 text-[#A3A8B3] hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNext}
                aria-label="Next project"
                className="p-1.5 text-[#A3A8B3] hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="ml-2 p-1.5 text-[#A3A8B3] hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-5 sm:p-7 space-y-6">
            {/* Large High-Fidelity Thumbnail View */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
              <ThumbnailCanvas item={item} isDetailedView={true} />
            </div>

            {/* Title & Metadata */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                {item.title}
              </h2>
              <p className="text-sm sm:text-base text-[#A3A8B3] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Design Breakdown & Composition Notes */}
            {item.compositionNotes && item.compositionNotes.length > 0 && (
              <div className="bg-[#24242C] p-4 sm:p-5 rounded-xl border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#00E99A] uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-[#00D5F5]" />
                  <span>Photoshop Composition & Visual Hierarchy</span>
                </div>
                <ul className="space-y-2">
                  {item.compositionNotes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-[#F5F7FA]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#00D5F5] shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags & Action Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-white/5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#A3A8B3]">
                <span className="text-white/40">Techniques:</span>
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="font-mono-code text-[11px] text-[#00D5F5]">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {item.isPlaceholder && onOpenOwnerGuide && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenOwnerGuide();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#252530] hover:bg-[#2F2F3D] text-[#00D5F5] border border-[#00D5F5]/40 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    <ImagePlus className="w-4 h-4" />
                    <span>Upload Thumbnail to Slot #{item.slotNumber}</span>
                  </button>
                )}

                <a
                  href={getWhatsAppUrl(
                    undefined,
                    `Hi Harsh! I'm interested in getting a YouTube thumbnail designed similar to "${item.title}" (Slot #${item.slotNumber}). Can you share availability and details?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-[#0F141A] text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onSelectForInquiry(item);
                    onClose();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00D5F5] to-[#00E99A] text-[#141418] text-xs sm:text-sm font-semibold rounded-lg hover:opacity-95 transition-all shadow-[0_0_20px_-3px_rgba(0,213,245,0.4)] cursor-pointer"
                >
                  <span>
                    {item.isPlaceholder
                      ? `Request Slot #${item.slotNumber}`
                      : 'Discuss in Form'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
