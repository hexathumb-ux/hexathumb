import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye,
  Maximize2,
  ArrowRight,
  Sparkles,
  Gamepad2,
  Youtube,
  GraduationCap,
  Briefcase,
  Layers,
  ChevronDown,
  ChevronUp,
  ImagePlus,
} from 'lucide-react';
import { Category, PortfolioItem, CreativeService } from '../types';
import { PORTFOLIO_PROJECTS, CREATIVE_SERVICES } from '../data/config';
import { ThumbnailCanvas } from './ThumbnailCanvas';
import { ProjectModal } from './ProjectModal';

interface PortfolioSectionProps {
  onContactClick: () => void;
  onOpenOwnerGuide?: () => void;
  onSelectProjectForInquiry?: (item: PortfolioItem) => void;
  customProjects?: PortfolioItem[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onContactClick,
  onOpenOwnerGuide,
  onSelectProjectForInquiry,
  customProjects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All Work');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const [showAllItems, setShowAllItems] = useState<boolean>(false);

  // Combine default projects with any custom user projects (supports slot replacement)
  const allProjects = useMemo(() => {
    if (!customProjects || customProjects.length === 0) return PORTFOLIO_PROJECTS;
    const slotMap = new Map<number, PortfolioItem>();
    const unslottedCustom: PortfolioItem[] = [];

    customProjects.forEach((cp) => {
      if (cp.slotNumber) {
        slotMap.set(cp.slotNumber, cp);
      } else {
        unslottedCustom.push(cp);
      }
    });

    const merged = PORTFOLIO_PROJECTS.map((item) => {
      if (item.slotNumber && slotMap.has(item.slotNumber)) {
        return slotMap.get(item.slotNumber)!;
      }
      return item;
    });

    return [...unslottedCustom, ...merged];
  }, [customProjects]);

  const categories: Category[] = [
    'All Work',
    'YouTube Thumbnails',
    'Gaming',
    'Education',
    'Business and Technology',
    'Creative Experiments',
  ];

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All Work') return allProjects;
    return allProjects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, allProjects]);

  // Display limit for "View More Work" (Default 40 so all 35 live designs + 5 reserved upload slots are visible immediately)
  const visibleProjects = showAllItems ? filteredProjects : filteredProjects.slice(0, 40);

  // Modal Next/Prev navigation
  const handleModalPrev = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === activeModalItem.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setActiveModalItem(filteredProjects[prevIndex]);
  };

  const handleModalNext = () => {
    if (!activeModalItem) return;
    const currentIndex = filteredProjects.findIndex((p) => p.id === activeModalItem.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setActiveModalItem(filteredProjects[nextIndex]);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Youtube':
        return <Youtube className="w-5 h-5 text-[#00D5F5]" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-[#00E99A]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#00D5F5]" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#00E99A]" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-[#00D5F5]" />;
    }
  };

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Portfolio Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#00D5F5] mb-2">
            <span>Portfolio</span>
            <span aria-hidden="true">·</span>
            <span>Thumbnails & Visuals</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            Selected Work. Made to Stand Out.
          </h2>
          <p className="text-sm sm:text-base text-[#A3A8B3] max-w-2xl mt-3 leading-relaxed">
            Explore a growing collection of thumbnail designs and creative experiments developed through practice, experimentation, and a passion for visual storytelling.
          </p>
          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00D5F5]/10 border border-[#00D5F5]/30 text-xs font-mono-code text-[#00D5F5] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00D5F5]" />
              35/40 Published Thumbnails
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00E99A]/10 border border-[#00E99A]/30 text-xs font-mono-code text-[#00E99A] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#00E99A]" />
              5 Reserved Drop Slots Available
            </span>
          </div>
        </div>

        {/* Quick helper for portfolio owner */}
        {onOpenOwnerGuide && (
          <button
            onClick={onOpenOwnerGuide}
            className="self-start md:self-end flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#A3A8B3] hover:text-[#00D5F5] bg-[#23232A]/70 hover:bg-[#282833] border border-white/5 hover:border-[#00D5F5]/30 rounded-lg transition-all cursor-pointer shrink-0"
          >
            <ImagePlus className="w-3.5 h-3.5 text-[#00E99A]" />
            <span>Customize / Add Thumbnails</span>
          </button>
        )}
      </div>

      {/* Interactive Category Filter Tabs (Zero-Pill discipline: Segmented controls with functional buttons) */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#23232A]/70 border border-white/5 rounded-xl overflow-x-auto max-w-full mb-10 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowAllItems(false);
              }}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#00D5F5]/15 to-[#00E99A]/15 text-[#00D5F5] font-semibold border border-[#00D5F5]/40 shadow-sm'
                  : 'text-[#A3A8B3] hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Portfolio Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={() => setActiveModalItem(project)}
              className="group relative flex flex-col rounded-2xl bg-[#23232A]/60 border border-white/5 hover:border-[#00D5F5]/50 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_35px_-10px_rgba(0,213,245,0.25)] cursor-pointer"
            >
              {/* Thumbnail Media Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#181820]">
                <div className="w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105">
                  <ThumbnailCanvas item={project} />
                </div>

                {/* Slot number badge in top-left */}
                {project.slotNumber && (
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-black/80 border border-white/15 backdrop-blur-md text-[10px] font-mono-code text-[#00D5F5] font-bold flex items-center gap-1.5 z-10 shadow-md">
                    <span className={`w-1.5 h-1.5 rounded-full ${project.isPlaceholder ? 'bg-[#FFB800]' : 'bg-[#00E99A]'} animate-pulse`} />
                    <span>SLOT #{project.slotNumber}</span>
                  </div>
                )}

                {/* Hover Overlay with Preview Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5 text-[#00D5F5]" />
                    <span>Expand Preview</span>
                  </div>
                </div>

                {/* Subtle aspect ratio badge in corner */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono-code text-white/70 pointer-events-none">
                  {project.aspectRatio}
                </div>
              </div>

              {/* Card Content & Metadata (Zero-pill discipline: unboxed metadata) */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#A3A8B3] mb-2">
                    <span className="text-[#00D5F5] font-semibold">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.softwareUsed || 'Adobe Photoshop'}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#00D5F5] transition-colors leading-snug line-clamp-2 mb-2 font-display">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#A3A8B3] line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Card Footer tags */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#A3A8B3]">
                  <div className="flex items-center gap-1.5 truncate">
                    {project.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-white/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#00E99A] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-medium">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View More Work Button if portfolio exceeds 40 */}
      {filteredProjects.length > 40 && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAllItems(!showAllItems)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#23232A] hover:bg-[#2A2A34] text-xs font-semibold text-white border border-white/10 hover:border-[#00D5F5]/30 transition-all cursor-pointer shadow-lg"
          >
            <span>
              {showAllItems
                ? 'Show Top 40 Slots'
                : `Explore All ${filteredProjects.length} Slots (${filteredProjects.length - 40} More)`}
            </span>
            {showAllItems ? <ChevronUp className="w-4 h-4 text-[#00D5F5]" /> : <ChevronDown className="w-4 h-4 text-[#00D5F5]" />}
          </button>
        </div>
      )}

      {/* =========================================================================
          CREATIVE SERVICES SUBSECTION (Inside Portfolio Section as required)
         ========================================================================= */}
      <div className="mt-28 pt-20 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#00E99A] mb-2">
              <span>Offerings</span>
              <span aria-hidden="true">·</span>
              <span>Available Disciplines</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Creative Services
            </h3>
            <p className="text-sm sm:text-base text-[#A3A8B3] max-w-2xl mt-2 leading-relaxed">
              Focused thumbnail design disciplines and creative visual concepts tailored for content creators, gaming channels, and modern digital brands.
            </p>
          </div>

          <button
            onClick={onContactClick}
            className="self-start md:self-end inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg text-[#141418] bg-gradient-to-r from-[#00D5F5] to-[#00E99A] hover:opacity-95 shadow-[0_0_15px_-3px_rgba(0,213,245,0.4)] transition-all cursor-pointer"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREATIVE_SERVICES.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-[#23232A]/50 border border-white/5 hover:border-[#00D5F5]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#00D5F5]/40 transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-mono-code text-[#00E99A]">
                    HEXA Service
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-[#00D5F5] transition-colors mb-2">
                  {service.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#A3A8B3] leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <div className="text-[11px] font-mono-code text-white/50 uppercase">
                    Deliverables
                  </div>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-[#F5F7FA]/75">
                      <span className="w-1 h-1 rounded-full bg-[#00D5F5]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-[#A3A8B3] font-mono-code">
                  {service.focus}
                </span>
                <button
                  onClick={onContactClick}
                  className="text-xs text-[#00D5F5] group-hover:text-[#00E99A] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <ProjectModal
        item={activeModalItem}
        isOpen={Boolean(activeModalItem)}
        onClose={() => setActiveModalItem(null)}
        onPrev={handleModalPrev}
        onNext={handleModalNext}
        onSelectForInquiry={(project) => {
          if (onSelectProjectForInquiry) {
            onSelectProjectForInquiry(project);
          }
          onContactClick();
        }}
        onOpenOwnerGuide={onOpenOwnerGuide}
      />
    </section>
  );
};
