import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sliders, MessageSquare } from 'lucide-react';
import { HexaLogo } from './HexaLogo';
import { getWhatsAppUrl } from '../data/config';

interface NavbarProps {
  activeSection: string;
  onOpenOwnerGuide?: () => void;
  customLogoUrl?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenOwnerGuide,
  customLogoUrl,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Four strictly defined primary sections
  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#1D1D22]/85 backdrop-blur-xl border-b border-white/5 shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name (Returns to Home) */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D5F5] rounded-lg p-1"
            aria-label="HEXA Portfolio Home"
          >
            <HexaLogo size="sm" animated={false} customLogoUrl={customLogoUrl} />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-wider text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00D5F5] group-hover:to-[#00E99A] transition-all">
                HEXATHUMB
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                    isActive
                      ? 'text-[#00D5F5] font-semibold'
                      : 'text-[#A3A8B3] hover:text-[#F5F7FA]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00D5F5] to-[#00E99A] rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: WhatsApp Direct Chat & Primary CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 text-xs font-semibold transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>

            {onOpenOwnerGuide && (
              <button
                onClick={onOpenOwnerGuide}
                title="Portfolio & Asset Quick Settings"
                aria-label="Open portfolio settings"
                className="p-2 text-[#A3A8B3] hover:text-[#00D5F5] hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg text-[#141418] bg-gradient-to-r from-[#00D5F5] to-[#00E99A] hover:opacity-95 shadow-[0_0_18px_-3px_rgba(0,213,245,0.4)] transition-all cursor-pointer"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {onOpenOwnerGuide && (
              <button
                onClick={onOpenOwnerGuide}
                aria-label="Portfolio settings"
                className="p-2 text-[#A3A8B3] hover:text-[#00D5F5] hover:bg-white/5 rounded-lg"
              >
                <Sliders className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#A3A8B3] hover:text-white rounded-lg hover:bg-white/5 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1D1D22]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/5 text-[#00D5F5] font-semibold'
                      : 'text-[#A3A8B3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-white/5 space-y-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg text-[#0F141A] bg-[#25D366] hover:bg-[#20BA5A]"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp (+91 79900 26523)</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg text-[#141418] bg-gradient-to-r from-[#00D5F5] to-[#00E99A]"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
