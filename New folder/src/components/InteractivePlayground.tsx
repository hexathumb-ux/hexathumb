import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { RotateCw, RefreshCw, Sparkles, Move, Hand } from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 15, y: -25 });
  const [isDragging3D, setIsDragging3D] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resetKey, setResetKey] = useState(0);

  // 3D Rotation Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging3D(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging3D) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotation((prev) => ({
      x: Math.max(-50, Math.min(50, prev.x - deltaY * 0.4)),
      y: Math.max(-60, Math.min(60, prev.y + deltaX * 0.4)),
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging3D(false);
  };

  const handleReset = () => {
    setRotation({ x: 15, y: -25 });
    setResetKey((prev) => prev + 1);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-gradient-to-b from-[#23232A]/80 to-[#191920]/90 border border-white/10 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        {/* Background grid accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#00D5F5_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#00E99A] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#00D5F5]" />
              <span>Interactive Space</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              HEXA Geometric Lab
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A8B3]">
              Drag and rotate the 3D-inspired hexagonal mark or arrange the geometric design facets.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#272733] hover:bg-[#323240] text-xs font-mono-code text-[#A3A8B3] hover:text-[#00D5F5] border border-white/5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Positions</span>
            </button>
          </div>
        </div>

        {/* Playground Interactive Canvas */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#141419]/90 border border-white/5 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          {/* Subtle instructions in corner */}
          <div className="absolute top-3 left-3 text-[10px] font-mono-code text-[#A3A8B3]/60 flex items-center gap-1.5 pointer-events-none">
            <Hand className="w-3 h-3 text-[#00D5F5]" />
            <span>Click & drag to rotate center prism / drag loose shapes</span>
          </div>

          {/* 3D-Inspired Rotatable HEXA Prism */}
          <div
            onMouseDown={handleMouseDown}
            style={{
              perspective: '1000px',
            }}
            className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center"
          >
            <motion.div
              animate={{
                rotateX: rotation.x,
                rotateY: rotation.y,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              style={{
                transformStyle: 'preserve-3d',
              }}
              className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center"
            >
              {/* Central Isometric Hexagonal Mark */}
              <div
                className="absolute inset-0 flex items-center justify-center filter drop-shadow-[0_0_25px_rgba(0,213,245,0.4)]"
                style={{ transform: 'translateZ(30px)' }}
              >
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="labGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D5F5" />
                      <stop offset="100%" stopColor="#00E99A" />
                    </linearGradient>
                  </defs>
                  {/* Faceted Hexagonal H */}
                  <polygon points="25,24 42,14 42,44 58,44 58,14 75,24 75,76 58,86 58,56 42,56 42,86 25,76" fill="url(#labGrad)" />
                  <polygon points="42,14 50,9 58,14 50,19" fill="#FFFFFF" opacity="0.3" />
                  <polygon points="42,86 50,81 58,86 50,91" fill="#000000" opacity="0.3" />
                </svg>
              </div>

              {/* Wireframe Orbit Ring */}
              <div
                className="absolute inset-0 border border-[#00E99A]/30 rounded-full"
                style={{ transform: 'translateZ(0px) scale(1.3)' }}
              />
              <div
                className="absolute inset-0 border border-[#00D5F5]/30 rounded-full"
                style={{ transform: 'translateZ(-20px) scale(1.15) rotate(45deg)' }}
              />
            </motion.div>
          </div>

          {/* Draggable Geometric Accent 1: Cyan Cube */}
          <motion.div
            key={`drag-1-${resetKey}`}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            className="absolute top-12 left-12 w-14 h-14 rounded-xl bg-gradient-to-tr from-[#00D5F5]/20 to-[#00D5F5]/5 border border-[#00D5F5]/50 backdrop-blur-md flex flex-col items-center justify-center shadow-lg cursor-move"
          >
            <Move className="w-3.5 h-3.5 text-[#00D5F5]" />
            <span className="text-[9px] font-mono-code text-[#00D5F5] mt-1">HEX</span>
          </motion.div>

          {/* Draggable Geometric Accent 2: Mint Cube */}
          <motion.div
            key={`drag-2-${resetKey}`}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            className="absolute bottom-12 right-12 w-14 h-14 rounded-xl bg-gradient-to-tr from-[#00E99A]/20 to-[#00E99A]/5 border border-[#00E99A]/50 backdrop-blur-md flex flex-col items-center justify-center shadow-lg cursor-move"
          >
            <Move className="w-3.5 h-3.5 text-[#00E99A]" />
            <span className="text-[9px] font-mono-code text-[#00E99A] mt-1">MINT</span>
          </motion.div>

          {/* Draggable Geometric Accent 3: Mini Thumbnail Preview */}
          <motion.div
            key={`drag-3-${resetKey}`}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            className="hidden sm:flex absolute bottom-10 left-16 px-3 py-2 rounded-xl bg-[#23232A]/80 border border-white/10 backdrop-blur-md items-center gap-2 shadow-xl cursor-move"
          >
            <div className="w-6 h-6 rounded bg-[#00D5F5]/10 border border-[#00D5F5]/30 flex items-center justify-center text-[10px] font-bold text-[#00D5F5]">
              16:9
            </div>
            <div className="text-[11px] text-white font-medium">CTR Composition</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
