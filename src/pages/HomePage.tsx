import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TemplateCarousel } from '../components/TemplateCarousel';
import { TemplateGallery } from '../components/TemplateGallery';
import { HowItWorks } from '../components/HowItWorks';
import { FaqSection } from '../components/FaqSection';
import { TemplatePreviewModal } from '../components/TemplatePreviewModal';
import { TemplateDefinition } from '../templates/templateTypes';
import { DocumentRenderer } from '../templates/DocumentRenderer';
import { sampleBiodataData } from '../features/biodata/biodataDefaults';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [activeModalTemplate, setActiveModalTemplate] = useState<TemplateDefinition | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF6EF]">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#E7DCD2]">
        {/* Subtle Background Ornament SVG */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" stroke="#4B1020">
            <circle cx="100" cy="100" r="80" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" strokeWidth="0.5" />
            <path d="M100 0 V200 M0 100 H200" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F1E8DC] border border-[#C7A36A]/50 rounded-xs text-[11px] font-sans uppercase tracking-[0.25em] text-[#671C32] font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C7A36A] animate-pulse" />
                <span>MW Art Gallery Presents</span>
                <span className="text-[#C7A36A]">✦</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#4B1020] tracking-tight leading-[1.08]">
                Your Story.<br />
                Your Beginning.<br />
                <span className="italic font-normal text-[#671C32] text-gold-shimmer">
                  Beautifully Designed.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#786B6B] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Create a marriage biodata that feels like you. Choose from 12 luxury Indian wedding stationery designs, personalize with your family Kuldevta and photographs, and export a high-resolution printable PDF.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/create-biodata"
                  className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] active:scale-[0.98] rounded-sm transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  <span>Create My Biodata</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#templates"
                  className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-medium text-[#4B1020] bg-white border border-[#E7DCD2] hover:bg-[#FAF6EF] active:scale-[0.98] rounded-sm transition-all flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-[#C7A36A]" />
                  <span>Explore 12 Designs</span>
                </a>
              </div>

              {/* Brand Signature */}
              <div className="pt-6 border-t border-[#E7DCD2]/70 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-xs text-[#786B6B]">
                <span className="font-serif font-bold text-[#4B1020] text-sm">MW Bio Gallery</span>
                <span className="hidden sm:inline">·</span>
                <span>Marriage Biodata, Made Beautiful</span>
                <span className="hidden sm:inline">·</span>
                <span>Create · Customize · Download · Share</span>
              </div>
            </div>

            {/* Right Column: Layered Stack of Real Biodata Previews */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] sm:max-w-[400px] h-[480px] sm:h-[520px]">
                {/* Back card - Royal Burgundy angled */}
                <div className="absolute top-4 -right-4 w-[280px] sm:w-[310px] aspect-[210/297] bg-[#310914] rounded-sm shadow-xl border border-[#C7A36A] transform rotate-6 opacity-85 overflow-hidden pointer-events-none select-none">
                  <div className="w-[140%] transform scale-[0.45] origin-top-left p-2">
                    <DocumentRenderer
                      data={{ ...sampleBiodataData, templateId: 'royal-burgundy' }}
                      isThumbnail={true}
                    />
                  </div>
                </div>

                {/* Middle card - Modern Minimal angled left */}
                <div className="absolute top-8 -left-4 w-[280px] sm:w-[310px] aspect-[210/297] bg-white rounded-sm shadow-xl border border-[#E7DCD2] transform -rotate-4 opacity-90 overflow-hidden pointer-events-none select-none">
                  <div className="w-[140%] transform scale-[0.45] origin-top-left p-2">
                    <DocumentRenderer
                      data={{ ...sampleBiodataData, templateId: 'modern-minimal' }}
                      isThumbnail={true}
                    />
                  </div>
                </div>

                {/* Dominant Front card - Classic Elegance straight */}
                <div className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 w-[290px] sm:w-[320px] aspect-[210/297] bg-[#FAF6EF] rounded-sm shadow-2xl border border-[#C7A36A] z-10 overflow-hidden animate-float-slow">
                  <div className="w-[140%] transform scale-[0.48] sm:scale-[0.52] origin-top-left p-2 pointer-events-none select-none">
                    <DocumentRenderer
                      data={{ ...sampleBiodataData, templateId: 'classic-elegance' }}
                      isThumbnail={true}
                    />
                  </div>
                  {/* Subtle decorative bottom badge */}
                  <div className="absolute bottom-2 left-2 right-2 bg-white/95 border border-[#E7DCD2] p-2 text-center text-[10px] font-sans font-semibold text-[#4B1020] uppercase tracking-wider shadow-xs flex items-center justify-center gap-1.5">
                    <span className="text-[#C7A36A]">✤</span>
                    <span>Classic Elegance · Design 01</span>
                    <span className="text-[#C7A36A]">✤</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Major Section: Interactive Template Carousel */}
      <TemplateCarousel onSelectPreview={(template) => setActiveModalTemplate(template)} />

      {/* Full Template Gallery with Category Filters */}
      <TemplateGallery onSelectPreview={(template) => setActiveModalTemplate(template)} />

      {/* How It Works 3-Step Section */}
      <HowItWorks />

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* Full-size preview modal when triggered from carousel or gallery */}
      <TemplatePreviewModal
        template={activeModalTemplate}
        onClose={() => setActiveModalTemplate(null)}
      />
    </div>
  );
};
