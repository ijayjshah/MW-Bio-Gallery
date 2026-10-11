import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { TemplateCarousel } from '../components/TemplateCarousel';
import { TemplateGallery } from '../components/TemplateGallery';
import { HowItWorks } from '../components/HowItWorks';
import { FaqSection } from '../components/FaqSection';
import { TemplatePreviewModal } from '../components/TemplatePreviewModal';
import { TemplateDefinition } from '../templates/templateTypes';
import { DocumentRenderer } from '../templates/DocumentRenderer';
import { getSampleDataForTemplate } from '../features/biodata/biodataDefaults';
import { ArrowRight, Compass, Sparkles, Heart, Crown } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [activeModalTemplate, setActiveModalTemplate] = useState<TemplateDefinition | null>(null);

  // Stagger animation container
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF]">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#E7DCD2]">
        {/* Subtle Background Sacred Ornament & Floating Petals */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 opacity-15 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" stroke="#4B1020">
            <circle cx="100" cy="100" r="80" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="40" strokeWidth="0.5" strokeDasharray="3 3" />
            <path d="M100 0 V200 M0 100 H200" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Floating Wedding Sparkles */}
        <div className="absolute top-1/4 left-8 text-[#C7A36A]/50 pointer-events-none animate-twinkle">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute top-2/3 left-1/4 text-[#C7A36A]/40 pointer-events-none animate-twinkle" style={{ animationDelay: '1.2s' }}>
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-[#C7A36A]/45 pointer-events-none animate-twinkle" style={{ animationDelay: '0.8s' }}>
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Editorial Headline & Copy with Staggered Entrance */}
            <motion.div
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <motion.div variants={heroItemVariants}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F1E8DC] border border-[#C7A36A] rounded-xs text-[11px] font-sans uppercase tracking-[0.25em] text-[#671C32] font-semibold shadow-xs">
                  <Crown className="w-3.5 h-3.5 text-[#C7A36A]" />
                  <span>MW Art Gallery Presents</span>
                  <span className="text-[#C7A36A]">✦</span>
                </div>
              </motion.div>

              <motion.h1
                variants={heroItemVariants}
                className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#4B1020] tracking-tight leading-[1.08]"
              >
                Your Story.<br />
                Your Beginning.<br />
                <span className="font-marcellus font-normal text-[#C7A36A] text-gold-shimmer tracking-normal block sm:inline">
                  Beautifully Designed.
                </span>
              </motion.h1>

              <motion.p
                variants={heroItemVariants}
                className="text-base sm:text-lg text-[#786B6B] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
              >
                Create a prestigious marriage biodata that honors your journey and heritage. Choose from 12 handcrafted royal Indian wedding stationery templates, personalize with your family Kuldevta invocation and photographs, and print or export an ultra crisp PDF.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={heroItemVariants}
                className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link
                  to="/create-biodata"
                  className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] active:scale-[0.98] rounded-sm transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-[#310914] text-[#310914]" />
                  <span>Create My Biodata</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <a
                  href="#templates"
                  className="w-full sm:w-auto px-6 py-4 text-sm sm:text-base font-medium text-[#4B1020] bg-white border border-[#E7DCD2] hover:bg-[#FAF6EF] hover:border-[#4B1020]/40 active:scale-[0.98] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Compass className="w-4 h-4 text-[#C7A36A]" />
                  <span>Explore 12 Designs</span>
                </a>
              </motion.div>

              {/* Brand Signature */}
              <motion.div
                variants={heroItemVariants}
                className="pt-6 border-t border-[#E7DCD2]/70 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-xs text-[#786B6B]"
              >
                <span className="font-serif font-bold text-[#4B1020] text-sm">MW Bio Gallery</span>
                <span className="hidden sm:inline">·</span>
                <span className="font-sans">Marriage Biodata, Made Beautiful</span>
                <span className="hidden sm:inline">·</span>
                <span className="text-[#C7A36A] font-semibold">Create · Customize · Download · Share</span>
              </motion.div>
            </motion.div>

            {/* Right Column: Layered Stack of Real Biodata Previews with Motion */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[360px] sm:max-w-[400px] h-[480px] sm:h-[520px]">
                {/* Back card - Royal Burgundy angled */}
                <motion.div
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 6, opacity: 0.9 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  whileHover={{ rotate: 9, scale: 1.03 }}
                  className="absolute top-4 -right-4 w-[280px] sm:w-[310px] aspect-[210/297] bg-[#310914] rounded-sm shadow-xl border border-[#C7A36A] overflow-hidden select-none cursor-pointer"
                  onClick={() => {
                    const t = activeModalTemplate || null;
                    if (!t) {
                      const btn = document.getElementById('templates');
                      btn?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <div className="w-[140%] transform scale-[0.45] origin-top-left p-2">
                    <DocumentRenderer
                      data={getSampleDataForTemplate('royal-burgundy')}
                      isThumbnail={true}
                    />
                  </div>
                </motion.div>

                {/* Middle card - Modern Minimal angled left */}
                <motion.div
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: -4, opacity: 0.92 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  whileHover={{ rotate: -7, scale: 1.03 }}
                  className="absolute top-8 -left-4 w-[280px] sm:w-[310px] aspect-[210/297] bg-white rounded-sm shadow-xl border border-[#E7DCD2] overflow-hidden select-none cursor-pointer"
                  onClick={() => {
                    const btn = document.getElementById('templates');
                    btn?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="w-[140%] transform scale-[0.45] origin-top-left p-2">
                    <DocumentRenderer
                      data={getSampleDataForTemplate('modern-minimal')}
                      isThumbnail={true}
                    />
                  </div>
                </motion.div>

                {/* Dominant Front card - Classic Elegance straight */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="absolute top-0 left-4 right-4 sm:left-6 sm:right-6 w-[290px] sm:w-[320px] aspect-[210/297] bg-[#FAF6EF] rounded-sm shadow-2xl border-2 border-[#C7A36A] z-10 overflow-hidden animate-float-slow cursor-pointer animate-gold-glow"
                  onClick={() => {
                    const btn = document.getElementById('templates');
                    btn?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="w-[140%] transform scale-[0.48] sm:scale-[0.52] origin-top-left p-2 pointer-events-none select-none">
                    <DocumentRenderer
                      data={getSampleDataForTemplate('classic-elegance')}
                      isThumbnail={true}
                    />
                  </div>
                  {/* Subtle decorative bottom badge */}
                  <div className="absolute bottom-2 left-2 right-2 bg-white/95 border border-[#C7A36A] p-2 text-center text-[10px] font-sans font-semibold text-[#4B1020] uppercase tracking-wider shadow-xs flex items-center justify-center gap-1.5">
                    <span className="text-[#C7A36A]">✦</span>
                    <span>Classic Elegance · Design 01</span>
                    <span className="text-[#C7A36A]">✦</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
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

