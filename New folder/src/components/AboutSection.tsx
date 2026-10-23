import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Sparkles,
  Sliders,
  Eye,
  CheckCircle2,
  Clock,
  Compass,
  Zap,
  Palette,
  Type,
  FileImage,
  LayoutGrid,
} from 'lucide-react';
import {
  BRAND_CONFIG,
  STATISTICS_DATA,
  TIMELINE_DATA,
  SKILLS_DATA,
} from '../data/config';

export const AboutSection: React.FC = () => {
  const [activeLayerTab, setActiveLayerTab] = useState<number>(0);

  // Photoshop layer simulation panels for the creative workspace
  const workspaceLayers = [
    {
      name: 'FX: Cyan-to-Mint Rim Light',
      type: 'Adjustment Layer (Screen 85%)',
      desc: 'Dual rim lighting emphasizing subject edges against dark charcoal background',
      color: '#00D5F5',
    },
    {
      name: 'Typography Hierarchy & Extrusions',
      type: 'Text Group (Bold Display)',
      desc: '16:9 mobile readable display fonts with high contrast 8px black stroke',
      color: '#FFFFFF',
    },
    {
      name: 'Focal Subject & Masking',
      type: 'Smart Object (Pen Tool Cutout)',
      desc: 'Hand-refined hair masking, dodge & burn highlights, depth positioning',
      color: '#00E99A',
    },
    {
      name: 'Atmospheric Fog & Particle Depth',
      type: 'Brush Overlay (Color Dodge)',
      desc: 'Floating dust motes and directional lighting beams guiding the eye',
      color: '#A3A8B3',
    },
    {
      name: 'Base Color Grade & LUT',
      type: 'Camera Raw Filter',
      desc: 'High dynamic range contrast tuning and saturated color harmonics',
      color: '#00D5F5',
    },
  ];

  const getSkillIcon = (skillName: string) => {
    switch (skillName) {
      case 'Thumbnail Composition':
        return <LayoutGrid className="w-4 h-4 text-[#00D5F5]" />;
      case 'Typography and Visual Hierarchy':
        return <Type className="w-4 h-4 text-[#00E99A]" />;
      case 'Color Theory':
        return <Palette className="w-4 h-4 text-[#00D5F5]" />;
      case 'Visual Storytelling':
        return <Eye className="w-4 h-4 text-[#00E99A]" />;
      case 'Image Editing and Manipulation':
        return <FileImage className="w-4 h-4 text-[#00D5F5]" />;
      case 'Creative Layout Design':
        return <Compass className="w-4 h-4 text-[#00E99A]" />;
      case 'Adobe Photoshop':
      default:
        return <Layers className="w-4 h-4 text-[#00D5F5]" />;
    }
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Eyebrow kicker */}
      <div className="flex items-center gap-2 mb-3 text-xs font-mono-code uppercase tracking-wider text-[#00D5F5]">
        <span>About HEXA</span>
        <span aria-hidden="true">·</span>
        <span>The Creative Journey</span>
      </div>

      {/* Main Split-Screen Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Side: Editorial Story & Details */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight mb-6">
              {BRAND_CONFIG.aboutHeading}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#A3A8B3] leading-relaxed">
              {BRAND_CONFIG.aboutDescription.map((paragraph, idx) => {
                if (idx === 0) {
                  return (
                    <p
                      key={idx}
                      className="text-lg sm:text-xl font-semibold text-white tracking-tight"
                    >
                      {paragraph}
                    </p>
                  );
                }
                if (idx === 1 || idx === 2) {
                  return (
                    <p key={idx} className="text-[#D3D8E2]">
                      {paragraph}
                    </p>
                  );
                }
                if (idx === 3) {
                  return (
                    <div key={idx} className="pt-2">
                      <p className="text-[#F5F7FA] font-medium">
                        {paragraph}
                      </p>
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-[#A3A8B3]">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Animated Statistics Counters */}
          <div className="pt-2">
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-white/50 mb-4">
              Practiced Foundations & Focus
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {STATISTICS_DATA.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#23232A]/70 border border-white/5 hover:border-[#00D5F5]/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="text-2xl sm:text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-[#00D5F5] to-[#00E99A] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white mb-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-[#A3A8B3] leading-snug">
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Animated Creative Workspace Simulator */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-28 space-y-6">
            {/* Photoshop Layer Simulator Card */}
            <div className="rounded-2xl bg-[#1E1E26] border border-white/10 p-5 shadow-2xl relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#00D5F5]/20 flex items-center justify-center text-[#00D5F5] font-bold text-[10px]">
                    Ps
                  </div>
                  <span className="font-semibold text-white tracking-wide">
                    Adobe Photoshop Workspace
                  </span>
                </div>
                <span className="text-[11px] font-mono-code text-[#00E99A] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E99A] animate-pulse" />
                  Live Breakdown
                </span>
              </div>

              {/* Thumbnail Mini Live Composition Canvas */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#121218] border border-white/5 mb-4 group">
                <svg viewBox="0 0 400 225" className="w-full h-full">
                  <defs>
                    <linearGradient id="miniBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0E0F14" />
                      <stop offset="100%" stopColor="#1E202B" />
                    </linearGradient>
                    <filter id="miniGlow">
                      <feGaussianBlur stdDeviation="4" />
                    </filter>
                  </defs>
                  <rect width="400" height="225" fill="url(#miniBg)" />

                  {/* Dynamic layer toggles based on activeLayerTab */}
                  {activeLayerTab >= 0 && (
                    <g opacity="0.3" stroke="#00D5F5" strokeWidth="0.5">
                      <line x1="0" y1="40" x2="400" y2="40" />
                      <line x1="0" y1="120" x2="400" y2="120" />
                      <line x1="0" y1="180" x2="400" y2="180" />
                    </g>
                  )}

                  {/* Subject Silhouette */}
                  <circle cx="280" cy="115" r="55" fill="#181822" stroke="#00D5F5" strokeWidth="2" />
                  
                  {/* Rim Lighting */}
                  <path
                    d="M 235,90 C 230,120 250,150 280,165"
                    fill="none"
                    stroke="#00D5F5"
                    strokeWidth="4"
                    filter="url(#miniGlow)"
                  />
                  <path
                    d="M 325,90 C 330,120 310,150 280,165"
                    fill="none"
                    stroke="#00E99A"
                    strokeWidth="4"
                    filter="url(#miniGlow)"
                  />

                  {/* Text Layer */}
                  <rect x="25" y="55" width="130" height="20" rx="3" fill="#00D5F5" />
                  <text x="32" y="70" fill="#000" fontSize="12" fontWeight="900" fontFamily="Outfit">
                    HIGH RETENTION
                  </text>
                  <text x="25" y="115" fill="#FFF" fontSize="30" fontWeight="900" fontFamily="Outfit">
                    DESIGN
                  </text>
                  <text x="25" y="148" fill="#00E99A" fontSize="28" fontWeight="900" fontFamily="Outfit">
                    IN ACTION
                  </text>
                </svg>

                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-mono-code text-[#00D5F5]">
                  1920x1080 Native
                </div>
              </div>

              {/* Interactive Layer Stack */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono-code text-[#A3A8B3] uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Composition Layers</span>
                  <span className="text-[10px] text-[#00D5F5]">Click to inspect</span>
                </div>
                {workspaceLayers.map((layer, idx) => {
                  const isSelected = activeLayerTab === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveLayerTab(idx)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#292934] border border-[#00D5F5]/40 text-white'
                          : 'bg-[#181820]/60 hover:bg-[#22222C] border border-white/5 text-[#A3A8B3]'
                      }`}
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: layer.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate flex items-center justify-between">
                          <span>{layer.name}</span>
                          <span className="text-[10px] font-mono-code text-[#A3A8B3]">
                            L{5 - idx}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#A3A8B3]/80 truncate mt-0.5">
                          {layer.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Timeline Section */}
      <div className="mt-24 pt-16 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-mono-code uppercase tracking-wider text-[#00D5F5] mb-2">
            Milestones & Dedication
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            The Creative Timeline
          </h3>
          <p className="text-sm text-[#A3A8B3] mt-2">
            From initial curiosity to high-volume deliberate thumbnail practice and independent brand creation.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {TIMELINE_DATA.map((milestone, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#23232A]/50 border border-white/5 hover:border-[#00D5F5]/30 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black font-mono-code text-transparent bg-clip-text bg-gradient-to-r from-[#00D5F5] to-[#00E99A]">
                  {milestone.step}
                </span>
                <span className="text-[10px] font-mono-code text-[#A3A8B3] px-2 py-0.5 rounded bg-white/5">
                  {milestone.timeframe}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-bold text-white group-hover:text-[#00D5F5] transition-colors leading-snug">
                  {milestone.title}
                </h4>
                <p className="text-xs text-[#A3A8B3] leading-relaxed">
                  {milestone.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] font-medium text-[#00E99A]">
                {milestone.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developing Skills Section */}
      <div className="mt-24 pt-16 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-mono-code uppercase tracking-wider text-[#00D5F5] mb-2">
            Core Disciplines
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Developing Creative Skills
          </h3>
          <p className="text-sm text-[#A3A8B3] mt-2">
            Disciplines honed through 100+ thumbnail studies, composition breakdowns, and Photoshop iteration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS_DATA.map((skill, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#23232A]/60 border border-white/5 hover:border-[#00D5F5]/30 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#00D5F5]/40 transition-colors">
                    {getSkillIcon(skill.name)}
                  </div>
                  <span className="text-[10px] font-mono-code text-[#00E99A] uppercase">
                    {skill.highlight}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-[#00D5F5] transition-colors mb-2">
                  {skill.name}
                </h4>
                <p className="text-xs text-[#A3A8B3] leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#A3A8B3]">
                <span>Focus area</span>
                <span className="text-white/60 font-medium">{skill.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
