import React from 'react';
import { PortfolioItem } from '../types';
import { Layers, Sparkles } from 'lucide-react';

interface ThumbnailCanvasProps {
  item: PortfolioItem;
  className?: string;
  isDetailedView?: boolean;
}

export const ThumbnailCanvas: React.FC<ThumbnailCanvasProps> = ({
  item,
  className = '',
  isDetailedView = false,
}) => {
  // If item has a real image URL (uploaded by user or loaded from /assets/aistudio)
  const imageSource = item.imageUrl || item.customImage;
  if (imageSource) {
    return (
      <div className={`relative w-full aspect-video overflow-hidden rounded-lg bg-[#18181D] ${className}`}>
        <img
          src={imageSource}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
        
        {/* Subtle badge for software */}
        {isDetailedView && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded text-[11px] font-mono-code text-[#00D5F5] flex items-center gap-1.5 pointer-events-none">
            <Layers className="w-3.5 h-3.5 text-[#00E99A]" />
            <span>{item.softwareUsed || 'Adobe Photoshop'}</span>
          </div>
        )}
      </div>
    );
  }

  // If this is a reserved drop slot for the upcoming 40 thumbnails
  if (item.isPlaceholder) {
    return (
      <div className={`relative w-full aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-[#1A1A22] via-[#141419] to-[#0F1015] border border-dashed border-[#00D5F5]/30 flex flex-col items-center justify-center p-4 group-hover:border-[#00D5F5]/70 transition-all ${className}`}>
        <div className="w-12 h-12 rounded-2xl bg-[#00D5F5]/10 border border-[#00D5F5]/30 flex items-center justify-center text-[#00D5F5] mb-2 group-hover:scale-110 transition-transform">
          <Sparkles className="w-5 h-5 text-[#00E99A]" />
        </div>
        <div className="text-xs font-bold text-white text-center font-display">
          HEXA Slot #{item.slotNumber}
        </div>
        <div className="text-[10px] font-mono-code text-[#00D5F5] mt-0.5">
          Ready to Publish
        </div>
        <div className="mt-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-[#A3A8B3] flex items-center gap-1">
          <span>Click to Upload Thumbnail</span>
        </div>
      </div>
    );
  }

  // Render high-fidelity SVG graphic design thumbnail artwork crafted specifically for this project
  const renderArt = () => {
    switch (item.id) {
      case 'p1-cyber-future':
        return (
          <svg viewBox="0 0 1280 720" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="p1-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B0B10" />
                <stop offset="50%" stopColor="#14141E" />
                <stop offset="100%" stopColor="#071924" />
              </linearGradient>
              <linearGradient id="p1-cyan-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D5F5" />
                <stop offset="100%" stopColor="#00E99A" />
              </linearGradient>
              <filter id="p1-blur">
                <feGaussianBlur stdDeviation="16" />
              </filter>
            </defs>
            <rect width="1280" height="720" fill="url(#p1-bg)" />
            {/* Cyber Grid Lines */}
            <g stroke="#00D5F5" strokeWidth="1" opacity="0.15">
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 80 + 40} x2="1280" y2={i * 80 + 40} />
              ))}
              {Array.from({ length: 15 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 90} y1="0" x2={i * 90} y2="720" />
              ))}
            </g>
            {/* Holographic glowing ring */}
            <circle cx="880" cy="360" r="230" fill="none" stroke="#00D5F5" strokeWidth="4" opacity="0.6" filter="url(#p1-blur)" />
            <circle cx="880" cy="360" r="210" fill="none" stroke="#00E99A" strokeWidth="2" opacity="0.8" strokeDasharray="18 12" />
            <circle cx="880" cy="360" r="160" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" />
            {/* Cybernetic Focal Head Silhouette */}
            <path
              d="M 800,200 C 900,160 1020,240 1010,380 C 1000,480 920,560 840,560 C 760,560 720,460 740,360 C 750,260 780,210 800,200 Z"
              fill="#181824"
              stroke="#00D5F5"
              strokeWidth="5"
            />
            {/* Cyan Rim Light */}
            <path
              d="M 750,230 C 720,310 730,420 790,520"
              fill="none"
              stroke="#00D5F5"
              strokeWidth="12"
              strokeLinecap="round"
              filter="url(#p1-blur)"
            />
            {/* Mint Rim Light on opposite cheek */}
            <path
              d="M 1010,240 C 1030,320 1010,430 960,530"
              fill="none"
              stroke="#00E99A"
              strokeWidth="10"
              strokeLinecap="round"
              filter="url(#p1-blur)"
            />
            {/* Eye visor glowing bar */}
            <rect x="760" y="320" width="220" height="28" rx="14" fill="#00D5F5" filter="url(#p1-blur)" />
            <rect x="770" y="324" width="200" height="20" rx="10" fill="#FFFFFF" />
            {/* Bold Thumbnail Typography */}
            <rect x="80" y="110" width="460" height="48" rx="8" fill="#00D5F5" opacity="0.9" />
            <text x="100" y="144" fill="#0F1014" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="30" letterSpacing="3">
              WHAT HAPPENS IN 2027?
            </text>
            <text x="80" y="270" fill="#FFFFFF" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="108" letterSpacing="1">
              AI SINGULARITY
            </text>
            <text x="80" y="380" fill="#00D5F5" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="96" letterSpacing="1">
              IS HERE.
            </text>
            {/* Warning tag */}
            <g transform="translate(80, 480)">
              <rect width="280" height="64" rx="12" fill="#1C1D24" stroke="#00E99A" strokeWidth="2" />
              <text x="28" y="42" fill="#00E99A" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="26">
                ⚡ EXCLUSIVE BREAKDOWN
              </text>
            </g>
          </svg>
        );

      case 'p2-apex-champions':
        return (
          <svg viewBox="0 0 1280 720" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="p2-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1A000A" />
                <stop offset="45%" stopColor="#280516" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>
              <filter id="p2-glow">
                <feGaussianBlur stdDeviation="12" />
              </filter>
            </defs>
            <rect width="1280" height="720" fill="url(#p2-bg)" />
            {/* Action Speed Lines & Slash Particles */}
            <g opacity="0.3" stroke="#FF0055" strokeWidth="3">
              <line x1="0" y1="100" x2="1280" y2="400" />
              <line x1="0" y1="250" x2="1280" y2="550" strokeWidth="6" />
              <line x1="0" y1="50" x2="1280" y2="350" stroke="#00D5F5" />
            </g>
            {/* Neon Diamond Shield */}
            <polygon points="980,140 1180,340 980,580 780,340" fill="#1A0D18" stroke="#FF0055" strokeWidth="8" />
            <polygon points="980,180 1140,340 980,530 820,340" fill="none" stroke="#00D5F5" strokeWidth="4" filter="url(#p2-glow)" />
            {/* Gamer Skull / Crosshair Icon */}
            <circle cx="980" cy="340" r="70" fill="#00D5F5" opacity="0.2" filter="url(#p2-glow)" />
            <circle cx="980" cy="340" r="50" fill="none" stroke="#FFFFFF" strokeWidth="5" />
            <line x1="910" y1="340" x2="1050" y2="340" stroke="#FF0055" strokeWidth="6" />
            <line x1="980" y1="270" x2="980" y2="410" stroke="#FF0055" strokeWidth="6" />
            {/* Aggressive angled badge */}
            <polygon points="60,90 400,90 370,160 30,160" fill="#FF0055" />
            <text x="75" y="140" fill="#FFFFFF" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="36" fontStyle="italic">
              RANKED #1 PREDATOR
            </text>
            {/* Big Impact Gaming Hook */}
            <text x="60" y="300" fill="#FFFFFF" fontFamily="Outfit, sans-serif" fontWeight="950" fontSize="130" fontStyle="italic">
              1V3 CLUTCH
            </text>
            <text x="60" y="440" fill="#00D5F5" fontFamily="Outfit, sans-serif" fontWeight="950" fontSize="110" fontStyle="italic">
              UNSTOPPABLE!
            </text>
            {/* Sparks */}
            <circle cx="680" cy="280" r="8" fill="#FFCC00" filter="url(#p2-glow)" />
            <circle cx="720" cy="360" r="12" fill="#FF0055" filter="url(#p2-glow)" />
            <circle cx="640" cy="460" r="6" fill="#00D5F5" filter="url(#p2-glow)" />
          </svg>
        );

      case 'p3-deep-space':
        return (
          <svg viewBox="0 0 1280 720" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="p3-nebula" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#070714" />
                <stop offset="50%" stopColor="#1B0C32" />
                <stop offset="100%" stopColor="#04202C" />
              </linearGradient>
              <radialGradient id="p3-planet" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#55DDE0" />
                <stop offset="50%" stopColor="#2F4858" />
                <stop offset="100%" stopColor="#0E161C" />
              </radialGradient>
              <filter id="p3-blur">
                <feGaussianBlur stdDeviation="25" />
              </filter>
            </defs>
            <rect width="1280" height="720" fill="url(#p3-nebula)" />
            {/* Cosmic Star Dust */}
            {Array.from({ length: 45 }).map((_, i) => (
              <circle
                key={`star-${i}`}
                cx={(i * 97) % 1280}
                cy={(i * 53) % 720}
                r={(i % 3) + 1.2}
                fill="#FFFFFF"
                opacity={0.3 + (i % 5) * 0.15}
              />
            ))}
            {/* Glowing Nebula Cloud */}
            <circle cx="950" cy="380" r="280" fill="#9D4EDD" opacity="0.25" filter="url(#p3-blur)" />
            <circle cx="1020" cy="320" r="200" fill="#00D5F5" opacity="0.2" filter="url(#p3-blur)" />
            {/* Planet with atmosphere ring */}
            <circle cx="960" cy="360" r="170" fill="url(#p3-planet)" />
            <ellipse cx="960" cy="360" rx="280" ry="70" fill="none" stroke="#00E99A" strokeWidth="6" opacity="0.75" transform="rotate(-22 960 360)" />
            {/* Clean Editorial Title Hook */}
            <text x="90" y="160" fill="#00D5F5" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="32" letterSpacing="4">
              JAMES WEBB TELESCOPE
            </text>
            <text x="90" y="290" fill="#FFFFFF" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="105" letterSpacing="0">
              WE FOUND
            </text>
            <text x="90" y="410" fill="#00E99A" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="105" letterSpacing="0">
              SOMETHING.
            </text>
            <rect x="90" y="470" width="380" height="56" rx="8" fill="#1B1B26" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="120" y="506" fill="#A3A8B3" fontFamily="Outfit, sans-serif" fontWeight="700" fontSize="22">
              🔭 13.8 BILLION LIGHT YEARS AWAY
            </text>
          </svg>
        );

      case 'p4-market-crash':
        return (
          <svg viewBox="0 0 1280 720" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="p4-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#101216" />
                <stop offset="100%" stopColor="#181B22" />
              </linearGradient>
            </defs>
            <rect width="1280" height="720" fill="url(#p4-bg)" />
            {/* Graph Grid */}
            <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`g-${i}`} x1="80" y1={100 + i * 70} x2="1200" y2={100 + i * 70} />
              ))}
            </g>
            {/* Downward Crash Arrow Graphic */}
            <path
              d="M 680,160 L 840,240 L 960,190 L 1150,520"
              fill="none"
              stroke="#FF3366"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polygon points="1150,520 1100,480 1170,450" fill="#FF3366" />
            {/* Upward recovery dashed projection */}
            <path
              d="M 960,190 L 1180,120"
              fill="none"
              stroke="#00E99A"
              strokeWidth="6"
              strokeDasharray="14 10"
              opacity="0.4"
            />
            {/* Bold Financial Text Headline */}
            <rect x="80" y="90" width="360" height="44" rx="8" fill="#FF3366" />
            <text x="100" y="122" fill="#FFFFFF" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="24" letterSpacing="2">
              ⚠️ URGENT MARKET UPDATE
            </text>
            <text x="80" y="260" fill="#FFFFFF" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="102">
              HOUSING
            </text>
            <text x="80" y="380" fill="#FF3366" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="118">
              CRASH 2026?
            </text>
            <text x="80" y="470" fill="#A3A8B3" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600" fontSize="32">
              The Numbers Wall Street Won't Show You.
            </text>
          </svg>
        );

      case 'p5-survival-craft':
        return (
          <svg viewBox="0 0 1280 720" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="p5-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B1B2B" />
                <stop offset="60%" stopColor="#D9531E" />
                <stop offset="100%" stopColor="#F4A261" />
              </linearGradient>
            </defs>
            <rect width="1280" height="720" fill="url(#p5-sky)" />
            {/* Mountain Silhouettes */}
            <polygon points="400,720 700,340 1000,720" fill="#1C1824" />
            <polygon points="100,720 450,280 800,720" fill="#120F19" />
            <polygon points="750,720 1050,420 1280,720" fill="#0C0A10" />
            {/* Dramatic Moon */}
            <circle cx="1060" cy="180" r="90" fill="#FFEAA7" opacity="0.9" />
            {/* Massive 100 DAYS Badge */}
            <rect x="90" y="90" width="540" height="170" rx="20" fill="#14141C" stroke="#00D5F5" strokeWidth="8" />
            <text x="130" y="215" fill="#FFFFFF" fontFamily="Outfit, sans-serif" fontWeight="950" fontSize="135" letterSpacing="4">
              100 DAYS
            </text>
            <text x="90" y="370" fill="#FFEAA7" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="96">
              IN HARDCORE
            </text>
            <text x="90" y="480" fill="#00E99A" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="88">
              DID I SURVIVE?
            </text>
          </svg>
        );

      case 'p6-speedrun-glitch':
        return (
          <svg viewBox="0 0 1280 720" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1280" height="720" fill="#0C0D12" />
            {/* Scanlines */}
            <g stroke="#00D5F5" strokeWidth="1" opacity="0.1">
              {Array.from({ length: 36 }).map((_, i) => (
                <line key={`sl-${i}`} x1="0" y1={i * 20} x2="1280" y2={i * 20} />
              ))}
            </g>
            {/* Chromatic glitch blocks */}
            <rect x="740" y="160" width="380" height="340" fill="#FF0055" opacity="0.15" />
            <rect x="760" y="180" width="380" height="340" fill="#00D5F5" opacity="0.25" />
            <rect x="750" y="170" width="380" height="340" fill="#181824" stroke="#00D5F5" strokeWidth="4" />
            <text x="820" y="360" fill="#FFFFFF" fontFamily="JetBrains Mono, monospace" fontWeight="800" fontSize="64">
              [CORRUPT]
            </text>
            {/* Glitch Headline */}
            <text x="80" y="190" fill="#FFCC00" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="48" letterSpacing="4">
              GAME-BREAKING GLITCH
            </text>
            <text x="80" y="320" fill="#FFFFFF" fontFamily="Outfit, sans-serif" fontWeight="950" fontSize="110">
              SECRET SKIP
            </text>
            <text x="80" y="450" fill="#00D5F5" fontFamily="Outfit, sans-serif" fontWeight="950" fontSize="110">
              AFTER 7 YEARS!
            </text>
          </svg>
        );

      case 'p7-mind-neuroscience':
        return (
          <svg viewBox="0 0 1280 720" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="p7-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0E131F" />
                <stop offset="100%" stopColor="#1B2433" />
              </linearGradient>
            </defs>
            <rect width="1280" height="720" fill="url(#p7-bg)" />
            {/* Symmetrical Neural Glow */}
            <circle cx="940" cy="360" r="190" fill="none" stroke="#00E99A" strokeWidth="3" opacity="0.4" />
            <circle cx="940" cy="360" r="140" fill="none" stroke="#00D5F5" strokeWidth="2" opacity="0.6" strokeDasharray="12 8" />
            <circle cx="940" cy="360" r="80" fill="#00D5F5" opacity="0.15" />
            {/* Neural nodes */}
            {Array.from({ length: 14 }).map((_, i) => (
              <circle
                key={`n-${i}`}
                cx={940 + Math.cos((i * Math.PI) / 7) * 110}
                cy={360 + Math.sin((i * Math.PI) / 7) * 110}
                r="6"
                fill="#00E99A"
              />
            ))}
            {/* Typography */}
            <text x="90" y="160" fill="#00E99A" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="30" letterSpacing="4">
              NEUROSCIENCE EXPERIMENT
            </text>
            <text x="90" y="280" fill="#FFFFFF" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="98">
              10 MINUTES
            </text>
            <text x="90" y="390" fill="#00D5F5" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="98">
              OF SILENCE
            </text>
            <text x="90" y="490" fill="#F5F7FA" fontFamily="Outfit, sans-serif" fontWeight="700" fontSize="42">
              Rewires Your Brain Chemistry
            </text>
          </svg>
        );

      case 'p8-neon-tokyo':
        return (
          <svg viewBox="0 0 1280 720" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1280" height="720" fill="#0A0A10" />
            {/* Isometric city lines */}
            <g stroke="#00D5F5" strokeWidth="2" opacity="0.35">
              <path d="M 640,120 L 1080,340 L 640,560 L 200,340 Z" fill="#13131F" />
              <line x1="640" y1="560" x2="640" y2="720" />
              <line x1="1080" y1="340" x2="1080" y2="520" />
              <line x1="200" y1="340" x2="200" y2="520" />
            </g>
            {/* Neon Glow Bars */}
            <line x1="450" y1="260" x2="830" y2="260" stroke="#FF007A" strokeWidth="8" opacity="0.8" />
            <line x1="500" y1="420" x2="780" y2="420" stroke="#00E99A" strokeWidth="8" opacity="0.8" />
            {/* Experimental Title */}
            <text x="80" y="140" fill="#00D5F5" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="28" letterSpacing="4">
              LIGHTING & ISOMETRIC STUDY
            </text>
            <text x="80" y="260" fill="#FFFFFF" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="100">
              NEON TOKYO
            </text>
            <text x="80" y="370" fill="#FF007A" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="90">
              EXPERIMENT
            </text>
          </svg>
        );

      case 'p9-creator-gear':
      default:
        return (
          <svg viewBox="0 0 1280 720" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1280" height="720" fill="#121318" />
            {/* Studio Lighting spotlight */}
            <ellipse cx="920" cy="380" rx="320" ry="220" fill="#00D5F5" opacity="0.08" />
            {/* Camera Lens Graphic */}
            <circle cx="920" cy="380" r="160" fill="#1C1D24" stroke="#00D5F5" strokeWidth="6" />
            <circle cx="920" cy="380" r="120" fill="#15161C" stroke="#00E99A" strokeWidth="3" />
            <circle cx="920" cy="380" r="70" fill="#0B0C10" />
            {/* Flare reflection */}
            <path d="M 860,320 Q 920,300 980,340" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.5" />
            {/* Typography */}
            <rect x="80" y="100" width="320" height="42" rx="6" fill="#00D5F5" />
            <text x="96" y="130" fill="#121318" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="22" letterSpacing="3">
              CREATOR DESK 2026
            </text>
            <text x="80" y="260" fill="#FFFFFF" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="105">
              THE ONLY GEAR
            </text>
            <text x="80" y="380" fill="#00E99A" fontFamily="Outfit, sans-serif" fontWeight="900" fontSize="105">
              YOU NEED.
            </text>
            <text x="80" y="470" fill="#A3A8B3" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600" fontSize="28">
              Zero clutter. Maximum creator output.
            </text>
          </svg>
        );
    }
  };

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-lg bg-[#15151B] group ${className}`}>
      {renderArt()}
      
      {/* Subtle corner badge for software */}
      {isDetailedView && (
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded text-[11px] font-mono-code text-[#00D5F5] flex items-center gap-1.5 pointer-events-none">
          <Layers className="w-3.5 h-3.5 text-[#00E99A]" />
          <span>{item.softwareUsed || 'Adobe Photoshop'}</span>
        </div>
      )}
    </div>
  );
};
