import React from 'react';
import { ArrowUp, Sliders, MessageSquare, Sparkles } from 'lucide-react';
import { HexaLogo } from './HexaLogo';
import { BRAND_CONFIG, getWhatsAppUrl } from '../data/config';

interface FooterProps {
  onOpenOwnerGuide?: () => void;
  customLogoUrl?: string | null;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenOwnerGuide,
  customLogoUrl,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#17171C] text-[#A3A8B3] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <div className="flex items-center gap-3">
            <HexaLogo size="sm" animated={false} customLogoUrl={customLogoUrl} />
            <span className="font-display font-extrabold text-xl text-white tracking-wider">
              HEXATHUMB
            </span>
          </div>
          <p className="text-xs text-[#A3A8B3] max-w-sm">
            Independent graphic design portfolio specializing in bold YouTube thumbnails, high-CTR composition, and attention-capturing digital visuals.
          </p>
          <div className="text-[11px] font-mono-code text-[#00E99A] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E99A]" />
            <span>{BRAND_CONFIG.availability}</span>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <nav className="flex items-center gap-6 text-xs font-medium" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#00D5F5] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] text-xs font-semibold border border-[#25D366]/30 transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp: +91 79900 26523</span>
            </a>

            {onOpenOwnerGuide && (
              <button
                onClick={onOpenOwnerGuide}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#23232A] hover:bg-[#2A2A34] text-xs font-mono-code text-[#A3A8B3] hover:text-[#00D5F5] border border-white/5 transition-all cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-lg bg-[#23232A] hover:bg-[#2A2A34] text-[#A3A8B3] hover:text-white border border-white/5 transition-all cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#A3A8B3]/60">
        <div>
          © {new Date().getFullYear()} HEXA. Independent Graphic Design Portfolio. All rights reserved.
        </div>
        <div className="font-mono-code text-[10px] text-[#00D5F5]/70">
          Photoshop · Visual Hierarchy · 16:9 Composition
        </div>
      </div>
    </footer>
  );
};
