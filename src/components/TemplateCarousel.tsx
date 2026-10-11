import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEMPLATE_REGISTRY } from '../templates/templateRegistry';
import { TemplateDefinition } from '../templates/templateTypes';
import { DocumentRenderer } from '../templates/DocumentRenderer';
import { sampleBiodataData } from '../features/biodata/biodataDefaults';
import { ChevronLeft, ChevronRight, Eye, ArrowRight } from 'lucide-react';

interface TemplateCarouselProps {
  onSelectPreview: (template: TemplateDefinition) => void;
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({ onSelectPreview }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // We have 12 templates
  const total = TEMPLATE_REGISTRY.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const currentTemplate = TEMPLATE_REGISTRY[currentIndex];

  const handleCreateWithTemplate = (templateId: string) => {
    navigate(`/create-biodata?template=${templateId}`);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6EF] overflow-hidden border-b border-[#E7DCD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C7A36A] font-sans font-bold block mb-1">
            Handcrafted Stationery Collection
          </span>
          <div className="font-serif italic text-xl sm:text-2xl text-[#C7A36A] tracking-wider select-none mb-1">
            ~ Timeless Traditions & Royal Grace ~
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#4B1020] tracking-tight">
            Find the Design That Feels Like You
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#786B6B] leading-relaxed">
            From timeless traditions to contemporary elegance, explore designs created to make your story stand out.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Slide Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-sm shadow-xl border border-[#E7DCD2]">
            {/* Left: Document Realistic Scaled Preview */}
            <div className="lg:col-span-7 flex justify-center">
              <div
                className="w-full max-w-[380px] sm:max-w-[420px] aspect-[210/297] bg-[#FAF6EF] shadow-md border border-[#E7DCD2] overflow-hidden relative group cursor-pointer"
                onClick={() => onSelectPreview(currentTemplate)}
              >
                <div className="transform scale-[0.62] sm:scale-[0.72] origin-top-left w-[140%] pointer-events-none select-none">
                  <DocumentRenderer
                    data={{ ...sampleBiodataData, templateId: currentTemplate.id }}
                    isThumbnail={true}
                  />
                </div>
                {/* Subtle Hover overlay */}
                <div className="absolute inset-0 bg-[#310914]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-[#4B1020] text-white text-xs font-semibold tracking-wider uppercase rounded-sm flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5" /> Full Screen Preview
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Template Details & Dual CTAs */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-sans text-[#786B6B] mb-2">
                  <span className="font-semibold text-[#C7A36A]">Design {currentTemplate.number}</span>
                  <span>·</span>
                  <span>{currentTemplate.category.join(' / ')}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4B1020]">
                  {currentTemplate.name}
                </h3>
                <p className="mt-3 text-sm text-[#786B6B] leading-relaxed">
                  {currentTemplate.description}
                </p>
              </div>

              {/* Design features */}
              <div className="space-y-1.5 text-xs text-[#292122]">
                {currentTemplate.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7A36A]"></span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleCreateWithTemplate(currentTemplate.id)}
                  className="flex-1 px-5 py-3 text-xs sm:text-sm font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] active:scale-[0.98] rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Create With This Template</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectPreview(currentTemplate)}
                  className="px-4 py-3 text-xs sm:text-sm font-medium text-[#4B1020] border border-[#4B1020]/30 hover:bg-[#FAF6EF] active:scale-[0.98] rounded-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              </div>

              {/* Counter / Pagination Status */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#786B6B]">
                <span>Template {currentIndex + 1} of {total}</span>
                <div className="flex gap-1.5">
                  {TEMPLATE_REGISTRY.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentIndex ? 'w-6 bg-[#4B1020]' : 'w-2 bg-[#E7DCD2] hover:bg-[#C7A36A]'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white text-[#4B1020] border border-[#E7DCD2] rounded-full shadow-lg flex items-center justify-center hover:bg-[#FAF6EF] transition-all focus:outline-hidden focus:ring-2 focus:ring-[#C7A36A]"
            aria-label="Previous template"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white text-[#4B1020] border border-[#E7DCD2] rounded-full shadow-lg flex items-center justify-center hover:bg-[#FAF6EF] transition-all focus:outline-hidden focus:ring-2 focus:ring-[#C7A36A]"
            aria-label="Next template"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
