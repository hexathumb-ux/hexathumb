import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, ChevronRight, Eye, Layers, Palette } from 'lucide-react';
import { HexaLogo } from './HexaLogo';
import { BRAND_CONFIG } from '../data/config';

interface HeroSectionProps {
  onExploreClick: () => void;
  onContactClick: () => void;
  customLogoUrl?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onContactClick,
  customLogoUrl,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 30; // -15 to +15
    const y = ((clientY - top) / height - 0.5) * 30;
    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden hexa-grid-bg"
    >
      {/* Background Interactive Ambient Parallax Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Floating Hexagonal Wireframe 1 */}
        <motion.div
          className="absolute top-20 left-[8%] w-44 h-44 opacity-25"
          animate={{
            x: mousePos.x * -0.6,
            y: mousePos.y * -0.6,
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
            x: { type: 'spring', damping: 25 },
            y: { type: 'spring', damping: 25 },
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#00D5F5]/40" strokeWidth="1.2">
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
            <polygon points="50,20 78,35 78,65 50,80 22,65 22,35" strokeDasharray="4 4" />
          </svg>
        </motion.div>

        {/* Floating Hexagonal Wireframe 2 */}
        <motion.div
          className="absolute bottom-24 right-[10%] w-56 h-56 opacity-20"
          animate={{
            x: mousePos.x * 0.8,
            y: mousePos.y * 0.8,
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            rotate: { duration: 55, repeat: Infinity, ease: 'linear' },
            x: { type: 'spring', damping: 25 },
            y: { type: 'spring', damping: 25 },
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#00E99A]/40" strokeWidth="1">
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
            <circle cx="50" cy="50" r="30" stroke="#00D5F5" strokeWidth="0.8" strokeDasharray="3 3" />
          </svg>
        </motion.div>

        {/* Floating Mini Thumbnail Preview Card A (Left) */}
        <motion.div
          className="hidden lg:block absolute top-[28%] left-[4%] w-48 p-2 rounded-xl bg-[#23232A]/75 border border-white/5 backdrop-blur-md shadow-2xl"
          animate={{
            x: mousePos.x * -0.9,
            y: [0, -10, 0],
          }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            x: { type: 'spring', damping: 30 },
          }}
        >
          <div className="w-full aspect-video rounded-lg bg-gradient-to-tr from-[#0F1015] via-[#1E1F29] to-[#0A252E] p-2 flex flex-col justify-end border border-white/5 relative overflow-hidden">
            <div className="absolute top-1.5 left-1.5 flex items-center gap-1 text-[9px] font-mono-code text-[#00D5F5]">
              <Eye className="w-2.5 h-2.5" />
              <span>CTR FOCUS</span>
            </div>
            <div className="w-16 h-2 bg-[#00D5F5] rounded-sm mb-1" />
            <div className="w-24 h-3 bg-white/90 rounded-sm" />
          </div>
          <div className="mt-1.5 px-1 flex items-center justify-between text-[10px] text-[#A3A8B3]">
            <span>16:9 Composition</span>
            <span className="text-[#00E99A]">High Impact</span>
          </div>
        </motion.div>

        {/* Floating Mini Creative Card B (Right) */}
        <motion.div
          className="hidden lg:block absolute bottom-[28%] right-[4%] w-52 p-2.5 rounded-xl bg-[#23232A]/75 border border-white/5 backdrop-blur-md shadow-2xl"
          animate={{
            x: mousePos.x * 0.9,
            y: [0, 12, 0],
          }}
          transition={{
            y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
            x: { type: 'spring', damping: 30 },
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-[#00D5F5]/10 border border-[#00D5F5]/30 flex items-center justify-center text-[#00D5F5]">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] font-medium text-white">Color Harmony</div>
          </div>
          <div className="flex items-center gap-1.5 h-2 w-full rounded overflow-hidden">
            <div className="flex-1 h-full bg-[#00D5F5]" />
            <div className="flex-1 h-full bg-[#00E99A]" />
            <div className="flex-1 h-full bg-[#F5F7FA]" />
            <div className="flex-1 h-full bg-[#1D1D22]" />
          </div>
          <div className="mt-2 text-[10px] text-[#A3A8B3] flex justify-between">
            <span>Cyan-to-Mint Brand</span>
            <span className="font-mono-code text-[#00D5F5]">#00D5F5</span>
          </div>
        </motion.div>

        {/* Floating Line Segments & Particles */}
        <div className="absolute top-[18%] right-[22%] w-1.5 h-1.5 rounded-full bg-[#00D5F5] shadow-[0_0_8px_#00D5F5]" />
        <div className="absolute bottom-[22%] left-[20%] w-2 h-2 rounded-full bg-[#00E99A] shadow-[0_0_8px_#00E99A]" />
        <div className="absolute top-[45%] left-[28%] w-1 h-1 rounded-full bg-white opacity-60" />
      </div>

      {/* Main Content Center */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        {/* Availability Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full bg-[#23232A]/80 border border-white/10 backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E99A] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E99A]" />
          </span>
          <span className="text-xs font-medium text-[#F5F7FA]/90">
            {BRAND_CONFIG.availability}
          </span>
        </motion.div>

        {/* SIGNATURE HEXA LOGO WITH 2-STAGE ANIMATION */}
        <div className="mb-6 flex flex-col items-center">
          <HexaLogo
            size="hero"
            animated={true}
            interactive={true}
            showReplayButton={true}
            customLogoUrl={customLogoUrl}
          />
        </div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs sm:text-sm font-mono-code font-medium tracking-[0.22em] text-[#00D5F5] uppercase mb-4"
        >
          {BRAND_CONFIG.eyebrow}
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white mb-6 leading-[1.08]"
        >
          Visuals That{' '}
          <span className="text-gradient-hexa inline-block">
            Capture Attention.
          </span>
        </motion.h1>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-[#A3A8B3] max-w-2xl leading-relaxed mb-10 font-normal"
        >
          {BRAND_CONFIG.heroDescription}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold rounded-xl text-[#141418] bg-gradient-to-r from-[#00D5F5] to-[#00E99A] hover:opacity-95 shadow-[0_0_25px_-5px_rgba(0,213,245,0.45)] transition-all cursor-pointer group"
          >
            <span>Explore My Work</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium rounded-xl text-white bg-[#25252D] hover:bg-[#2C2C36] border border-white/10 hover:border-[#00D5F5]/30 transition-all cursor-pointer"
          >
            <span>Let's Collaborate</span>
          </button>
        </motion.div>
      </div>

      {/* Minimal Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono-code text-[#A3A8B3] cursor-pointer hover:text-[#00D5F5] transition-colors"
        onClick={onExploreClick}
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#00D5F5]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
