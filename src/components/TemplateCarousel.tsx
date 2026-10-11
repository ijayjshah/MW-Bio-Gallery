import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { TEMPLATE_REGISTRY } from '../templates/templateRegistry';
import { TemplateDefinition } from '../templates/templateTypes';
import { DocumentRenderer } from '../templates/DocumentRenderer';
import { getSampleDataForTemplate } from '../features/biodata/biodataDefaults';
import { ChevronLeft, ChevronRight, Eye, ArrowRight, Sparkles, Play, Pause } from 'lucide-react';

interface TemplateCarouselProps {
  onSelectPreview: (template: TemplateDefinition) => void;
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({ onSelectPreview }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // We have 12 templates
  const total = TEMPLATE_REGISTRY.length;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Optional gentle auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, total]);

  const currentTemplate = TEMPLATE_REGISTRY[currentIndex];

  const handleCreateWithTemplate = (templateId: string) => {
    navigate(`/create-biodata?template=${templateId}`);
  };

  return (
    <section
      className="py-16 sm:py-24 bg-[#FAF6EF] overflow-hidden border-b border-[#E7DCD2] relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C7A36A] font-sans font-bold block mb-1">
            Handcrafted Stationery Collection
          </span>
          <div className="font-marcellus text-lg sm:text-2xl text-[#C7A36A] tracking-[0.18em] uppercase select-none mb-2 font-medium">
            ✦ Timeless Traditions & Royal Grace ✦
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#4B1020] tracking-tight">
            Find the Design That Feels Like You
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#786B6B] leading-relaxed font-sans">
            From timeless traditions to contemporary elegance, explore designs created to make your story stand out.
          </p>

          <div className="flex items-center justify-center gap-3 mt-4 text-xs text-[#786B6B]">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E7DCD2] rounded-xs hover:bg-[#F1E8DC] transition-colors cursor-pointer text-[11px]"
              title={isAutoPlaying ? 'Pause rotation' : 'Resume rotation'}
            >
              {isAutoPlaying ? <Pause className="w-3 h-3 text-[#C7A36A]" /> : <Play className="w-3 h-3 text-[#C7A36A]" />}
              <span>{isAutoPlaying ? 'Auto-rotate On' : 'Auto-rotate Paused'}</span>
            </button>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Slide Card with AnimatePresence */}
          <div className="bg-white p-6 sm:p-10 rounded-sm shadow-xl border-2 border-[#E7DCD2] hover:border-[#C7A36A]/50 transition-colors overflow-hidden min-h-[520px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentTemplate.id}
                initial={{ opacity: 0, x: direction * 45 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -45 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] as const }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Document Realistic Scaled Preview */}
                <div className="lg:col-span-7 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="w-full max-w-[380px] sm:max-w-[420px] aspect-[210/297] bg-[#FAF6EF] shadow-md border-2 border-[#C7A36A]/60 overflow-hidden relative group cursor-pointer animate-gold-glow"
                    onClick={() => onSelectPreview(currentTemplate)}
                  >
                    <div className="transform scale-[0.62] sm:scale-[0.72] origin-top-left w-[140%] pointer-events-none select-none">
                      <DocumentRenderer
                        data={getSampleDataForTemplate(currentTemplate.id)}
                        isThumbnail={true}
                      />
                    </div>
                    {/* Subtle Hover overlay */}
                    <div className="absolute inset-0 bg-[#310914]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                      <span className="px-5 py-2.5 bg-[#4B1020] text-white text-xs font-semibold tracking-wider uppercase rounded-sm flex items-center gap-2 shadow-lg border border-[#C7A36A]">
                        <Eye className="w-4 h-4 text-[#C7A36A]" /> View High-Res Template
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Right: Template Details & Dual CTAs */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-sans text-[#786B6B] mb-2">
                      <span className="font-semibold text-[#C7A36A] uppercase tracking-wider">Design {currentTemplate.number}</span>
                      <span>·</span>
                      <span className="bg-[#FAF6EF] px-2 py-0.5 border border-[#E7DCD2] text-[#4B1020] font-medium">{currentTemplate.category.join(' / ')}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4B1020]">
                      {currentTemplate.name}
                    </h3>
                    <p className="mt-3 text-sm text-[#786B6B] leading-relaxed font-sans">
                      {currentTemplate.description}
                    </p>
                  </div>

                  {/* Design features */}
                  <div className="space-y-2 text-xs text-[#292122] font-sans">
                    {currentTemplate.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C7A36A]"></span>
                        <span className="font-medium text-[#4B1020]">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCreateWithTemplate(currentTemplate.id)}
                      className="flex-1 px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] rounded-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#310914]" />
                      <span>Use This Template</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectPreview(currentTemplate)}
                      className="px-4 py-3.5 text-xs sm:text-sm font-medium text-[#4B1020] border border-[#4B1020]/30 hover:bg-[#FAF6EF] rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-white"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </motion.button>
                  </div>

                  {/* Counter / Pagination Status */}
                  <div className="pt-2 flex items-center justify-between text-xs text-[#786B6B]">
                    <span className="font-sans font-medium">Template {currentIndex + 1} of {total}</span>
                    <div className="flex gap-1.5">
                      {TEMPLATE_REGISTRY.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                          }}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            idx === currentIndex ? 'w-7 bg-[#4B1020]' : 'w-2 bg-[#E7DCD2] hover:bg-[#C7A36A]'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={handlePrev}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white text-[#4B1020] border-2 border-[#E7DCD2] hover:border-[#C7A36A] rounded-full shadow-lg flex items-center justify-center hover:bg-[#FAF6EF] transition-all focus:outline-hidden focus:ring-2 focus:ring-[#C7A36A] z-10 cursor-pointer"
            aria-label="Previous template"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleNext}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white text-[#4B1020] border-2 border-[#E7DCD2] hover:border-[#C7A36A] rounded-full shadow-lg flex items-center justify-center hover:bg-[#FAF6EF] transition-all focus:outline-hidden focus:ring-2 focus:ring-[#C7A36A] z-10 cursor-pointer"
            aria-label="Next template"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

