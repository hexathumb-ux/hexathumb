/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { InteractivePlayground } from './components/InteractivePlayground';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OwnerCustomizerModal } from './components/OwnerCustomizerModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PortfolioItem } from './types';
import { BRAND_CONFIG } from './data/config';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isOwnerGuideOpen, setIsOwnerGuideOpen] = useState<boolean>(false);
  const [initialInquiryProject, setInitialInquiryProject] = useState<PortfolioItem | null>(null);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  // Persistent settings for portfolio owner (default: Harsh Singh +91 79900 26523)
  const [whatsappNumber, setWhatsappNumber] = useState<string>(() => {
    const saved = localStorage.getItem('hexa_whatsapp_number');
    if (!saved || saved.includes('1555') || saved === '15550194392') {
      localStorage.setItem('hexa_whatsapp_number', BRAND_CONFIG.defaultWhatsappNumber);
      return BRAND_CONFIG.defaultWhatsappNumber;
    }
    return saved;
  });


  const [customProjects, setCustomProjects] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('hexa_custom_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track active section for navbar indicators
  useEffect(() => {
    const sectionIds = ['home', 'about', 'portfolio', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpdateWhatsapp = (newNumber: string) => {
    setWhatsappNumber(newNumber);
    localStorage.setItem('hexa_whatsapp_number', newNumber);
  };

  const handleUpdateCustomLogo = (url: string | null) => {
    setCustomLogoUrl(url);
    if (url) {
      localStorage.setItem('hexa_custom_logo', url);
    } else {
      localStorage.removeItem('hexa_custom_logo');
    }
  };

  const handleAddCustomProject = (project: PortfolioItem) => {
    const updated = [project, ...customProjects];
    setCustomProjects(updated);
    localStorage.setItem('hexa_custom_projects', JSON.stringify(updated));
  };

  const handleDeleteCustomProject = (id: string) => {
    const updated = customProjects.filter((p) => p.id !== id);
    setCustomProjects(updated);
    localStorage.setItem('hexa_custom_projects', JSON.stringify(updated));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#1D1D22] text-[#F5F7FA] selection:bg-[#00D5F5]/25 selection:text-[#00E99A] relative overflow-x-hidden">
      {/* Top Sticky Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)}
        customLogoUrl={customLogoUrl}
      />

      <main>
        {/* 1. Home Section — Signature HEXA Logo Animation & Hero */}
        <HeroSection
          onExploreClick={() => scrollToSection('portfolio')}
          onContactClick={() => scrollToSection('contact')}
          customLogoUrl={customLogoUrl}
        />

        {/* 2. About Section — The Creative Journey, Photoshop Workspace & Developing Skills */}
        <AboutSection />

        {/* 3. Portfolio Section — Selected Work & Creative Services Subsection */}
        <PortfolioSection
          onContactClick={() => scrollToSection('contact')}
          onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)}
          onSelectProjectForInquiry={(project) => {
            setInitialInquiryProject(project);
            scrollToSection('contact');
          }}
          customProjects={customProjects}
        />

        {/* Interactive Creative Object Playground */}
        <InteractivePlayground />

        {/* 4. Contact Section — WhatsApp Contact & Functional Form */}
        <ContactSection
          configuredWhatsappNumber={whatsappNumber}
          onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)}
          initialProjectInquiry={initialInquiryProject}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenOwnerGuide={() => setIsOwnerGuideOpen(true)}
        customLogoUrl={customLogoUrl}
      />

      {/* Portfolio Owner Quick Customizer & Guide Modal */}
      <OwnerCustomizerModal
        isOpen={isOwnerGuideOpen}
        onClose={() => setIsOwnerGuideOpen(false)}
        currentWhatsappNumber={whatsappNumber}
        onUpdateWhatsappNumber={handleUpdateWhatsapp}
        customLogoUrl={customLogoUrl}
        onUpdateCustomLogo={handleUpdateCustomLogo}
        customProjects={customProjects}
        onAddCustomProject={handleAddCustomProject}
        onDeleteCustomProject={handleDeleteCustomProject}
      />
    </div>
  );
}
