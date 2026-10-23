import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw } from 'lucide-react';

interface HexaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  animated?: boolean;
  interactive?: boolean;
  className?: string;
  showReplayButton?: boolean;
  customLogoUrl?: string | null;
}

export const HexaLogo: React.FC<HexaLogoProps> = ({
  size = 'md',
  animated = true,
  interactive = true,
  className = '',
  showReplayButton = false,
  customLogoUrl = null,
}) => {
  const [animationStage, setAnimationStage] = useState<'lines' | 'sweep' | 'settled'>('lines');
  const [replayKey, setReplayKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Size mapping
  const sizeMap = {
    sm: { width: 36, height: 36, text: 'text-lg', scale: 0.8 },
    md: { width: 54, height: 54, text: 'text-xl', scale: 1 },
    lg: { width: 84, height: 84, text: 'text-2xl', scale: 1.4 },
    xl: { width: 140, height: 140, text: 'text-4xl', scale: 2 },
    hero: { width: 190, height: 190, text: 'text-5xl', scale: 2.6 },
  };

  const currentSize = sizeMap[size];

  // Stage 1 -> Stage 2 sequence on initial mount or replay
  useEffect(() => {
    if (!animated) {
      setAnimationStage('settled');
      return;
    }

    setAnimationStage('lines');

    // Stage 1: Line Formation runs for ~1.6s
    const stage1Timer = setTimeout(() => {
      setAnimationStage('sweep');
    }, 1600);

    // Stage 2: Light Sweep Reveal runs for ~1.0s then settles
    const stage2Timer = setTimeout(() => {
      setAnimationStage('settled');
    }, 2800);

    return () => {
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
    };
  }, [replayKey, animated]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient Radial Backlight behind the logo */}
      <motion.div
        className="absolute rounded-full pointer-events-none -z-10"
        style={{
          width: currentSize.width * 1.8,
          height: currentSize.height * 1.8,
          background: 'radial-gradient(circle, rgba(0, 213, 245, 0.28) 0%, rgba(0, 233, 154, 0.16) 45%, transparent 75%)',
          filter: 'blur(22px)',
        }}
        animate={{
          scale: isHovered ? 1.25 : [1, 1.08, 1],
          opacity: animationStage === 'lines' ? 0.3 : isHovered ? 0.9 : 0.65,
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Logo Container */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: currentSize.width, height: currentSize.height }}
      >
        {customLogoUrl ? (
          // If user configured a custom transparent raster/vector file
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img
              src={customLogoUrl}
              alt="HEXA Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(0,213,245,0.45)]"
            />
            {/* Light Sweep Highlight Overlay */}
            {(animationStage === 'sweep' || isHovered) && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(0, 213, 245, 0.7) 40%, rgba(0, 233, 154, 0.9) 60%, transparent 100%)',
                  mixBlendMode: 'screen',
                }}
                initial={{ x: '-150%', skewX: -25 }}
                animate={{ x: '180%', skewX: -25 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            )}
          </div>
        ) : (
          // Standard Official HEXA Vector Logo with 2-Stage Line Formation & Light Sweep
          <div className="relative w-full h-full flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible drop-shadow-[0_4px_24px_rgba(0,213,245,0.35)]"
            >
              <defs>
                {/* Official Cyan-to-Green Gradient */}
                <linearGradient id="hexaGradPrimary" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00D5F5" />
                  <stop offset="100%" stopColor="#00E99A" />
                </linearGradient>

                <linearGradient id="hexaGradCyanSide" x1="30" y1="40" x2="90" y2="160" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#00B4D8" />
                </linearGradient>

                <linearGradient id="hexaGradMintSide" x1="110" y1="40" x2="170" y2="160" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00F5A0" />
                  <stop offset="100%" stopColor="#00D084" />
                </linearGradient>

                <linearGradient id="hexaGradCrossbar" x1="60" y1="85" x2="140" y2="115" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00D5F5" />
                  <stop offset="50%" stopColor="#00E2B8" />
                  <stop offset="100%" stopColor="#00E99A" />
                </linearGradient>

                {/* Sweep Laser Gradient */}
                <linearGradient id="hexaSweepGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="35%" stopColor="rgba(0, 213, 245, 0.4)" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="65%" stopColor="rgba(0, 233, 154, 0.5)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>

                {/* Glow filter */}
                <filter id="hexaGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Stage 1: Line Formation (Thin glowing strokes tracing the angular interlocking H structure) */}
              <AnimatePresence>
                {animationStage === 'lines' && (
                  <motion.g
                    key={`lines-${replayKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.4 } }}
                  >
                    {/* Floating guide points/particles */}
                    <motion.circle
                      cx="50"
                      cy="40"
                      r="3.5"
                      fill="#00D5F5"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.8] }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.circle
                      cx="150"
                      cy="40"
                      r="3.5"
                      fill="#00E99A"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.8] }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="4"
                      fill="#FFFFFF"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.6, 1], opacity: [0, 1, 0.9] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.circle
                      cx="50"
                      cy="160"
                      r="3.5"
                      fill="#00D5F5"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.8] }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                    />
                    <motion.circle
                      cx="150"
                      cy="160"
                      r="3.5"
                      fill="#00E99A"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.8] }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    />

                    {/* Left Column Stroke Tracing */}
                    <motion.path
                      d="M 44,48 L 76,30 L 76,82 L 44,98 Z"
                      stroke="#00D5F5"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      filter="url(#hexaGlow)"
                    />
                    <motion.path
                      d="M 44,102 L 76,118 L 76,170 L 44,152 Z"
                      stroke="#00D5F5"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
                      filter="url(#hexaGlow)"
                    />

                    {/* Right Column Stroke Tracing */}
                    <motion.path
                      d="M 124,30 L 156,48 L 156,98 L 124,82 Z"
                      stroke="#00E99A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
                      filter="url(#hexaGlow)"
                    />
                    <motion.path
                      d="M 124,118 L 156,102 L 156,152 L 124,170 Z"
                      stroke="#00E99A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.45, ease: 'easeInOut' }}
                      filter="url(#hexaGlow)"
                    />

                    {/* Interlocking Central Crossbar Stroke */}
                    <motion.path
                      d="M 76,86 L 124,86 L 124,114 L 76,114 Z"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.65, ease: 'easeInOut' }}
                      filter="url(#hexaGlow)"
                    />

                    {/* Hexagonal Isometric Outer Contour Stroke */}
                    <motion.path
                      d="M 100,20 L 166,55 L 166,145 L 100,180 L 34,145 L 34,55 Z"
                      stroke="rgba(0, 213, 245, 0.4)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Completed Interlocking Geometric H Logo */}
              <motion.g
                initial={{ opacity: animated ? 0 : 1, scale: animated ? 0.95 : 1 }}
                animate={{
                  opacity: animationStage !== 'lines' ? 1 : 0,
                  scale: animationStage !== 'lines' ? (isHovered ? 1.04 : 1) : 0.95,
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {/* Outer Facets / Shadows for 3D Interlocking Depth */}
                <path
                  d="M 44,48 L 76,30 L 76,170 L 44,152 Z"
                  fill="url(#hexaGradCyanSide)"
                  opacity="0.95"
                />
                <path
                  d="M 124,30 L 156,48 L 156,152 L 124,170 Z"
                  fill="url(#hexaGradMintSide)"
                  opacity="0.95"
                />

                {/* Central Interlocking Crossbar with Isometric Chamfer */}
                <path
                  d="M 76,84 L 124,84 L 124,116 L 76,116 Z"
                  fill="url(#hexaGradCrossbar)"
                />

                {/* Isometric Top Bevel Highlights */}
                <polygon
                  points="44,48 76,30 100,43 68,61"
                  fill="#5BFFD7"
                  opacity="0.25"
                />
                <polygon
                  points="124,30 156,48 132,61 100,43"
                  fill="#00E99A"
                  opacity="0.3"
                />

                {/* Center Core Hexagonal Notch Facet */}
                <polygon
                  points="76,84 100,72 124,84 100,96"
                  fill="#FFFFFF"
                  opacity="0.18"
                />
                <polygon
                  points="76,116 100,104 124,116 100,128"
                  fill="#000000"
                  opacity="0.32"
                />

                {/* Fine crisp highlight line across diagonal crest */}
                <path
                  d="M 44,48 L 76,30 L 100,43 L 124,30 L 156,48"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.4"
                />
                <path
                  d="M 44,152 L 76,170 L 100,157 L 124,170 L 156,152"
                  stroke="rgba(0, 233, 154, 0.6)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </motion.g>

              {/* Stage 2: Light Sweep Reveal (Narrow cyan-to-mint highlight beam travelling across) */}
              {(animationStage === 'sweep' || (animationStage === 'settled' && isHovered)) && (
                <motion.rect
                  x="-80"
                  y="0"
                  width="70"
                  height="200"
                  fill="url(#hexaSweepGlow)"
                  transform="skewX(-25)"
                  initial={{ x: -100 }}
                  animate={{ x: 280 }}
                  transition={{
                    duration: 1.0,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{ mixBlendMode: 'overlay' }}
                />
              )}
            </svg>
          </div>
        )}
      </div>

      {/* Optional Replay Button for the Signature Animation */}
      {showReplayButton && (
        <button
          onClick={handleReplay}
          title="Replay HEXA signature logo animation"
          aria-label="Replay logo animation"
          className="mt-3 flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono-code text-[#A3A8B3] hover:text-[#00D5F5] bg-[#23232A]/80 hover:bg-[#2A2A34] border border-white/5 hover:border-[#00D5F5]/30 rounded-md transition-all cursor-pointer"
        >
          <RotateCcw className="w-3 h-3 text-[#00D5F5]" />
          <span>Replay Intro</span>
        </button>
      )}
    </div>
  );
};
