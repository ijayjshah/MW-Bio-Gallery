import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { TEMPLATE_REGISTRY } from '../templates/templateRegistry';
import { TemplateDefinition, TemplateCategory } from '../templates/templateTypes';
import { DocumentRenderer } from '../templates/DocumentRenderer';
import { getSampleDataForTemplate } from '../features/biodata/biodataDefaults';
import { Eye, ArrowRight, Sparkles, Crown } from 'lucide-react';

interface TemplateGalleryProps {
  onSelectPreview: (template: TemplateDefinition) => void;
}

const CATEGORIES = [
  'All Designs',
  'Minimal',
  'Traditional',
  'Floral',
  'Premium',
  'Modern',
] as const;

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectPreview }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Designs');

  const filteredTemplates = TEMPLATE_REGISTRY.filter((template) => {
    if (selectedCategory === 'All Designs') return true;
    return template.category.includes(selectedCategory as TemplateCategory);
  });

  const handleCreateWithTemplate = (templateId: string) => {
    navigate(`/create-biodata?template=${templateId}`);
  };

  return (
    <section id="templates" className="py-16 sm:py-24 bg-[#F1E8DC]/40 border-b border-[#E7DCD2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C7A36A] font-sans font-bold block mb-1">
            The Complete Archive
          </span>
          <div className="font-marcellus text-base sm:text-xl text-[#C7A36A] tracking-[0.16em] uppercase select-none mb-2 font-medium">
            ✦ All 12 Royal Matrimonial Designs ✦
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#4B1020] tracking-tight">
            Every Story Has Its Own Style
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#786B6B] font-sans">
            Filter through our catalog to find the exact tone, aesthetic, and format for your family.
          </p>

          {/* Interactive Filter Tabs (Functional segmented buttons per design constitution) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-sm transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#4B1020] text-[#FAF6EF] shadow-md border border-[#C7A36A]'
                    : 'bg-white text-[#786B6B] hover:text-[#292122] hover:bg-[#FAF6EF] border border-[#E7DCD2]'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid of Cards with Layout Animation */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredTemplates.map((template) => (
              <motion.div
                layout
                key={template.id}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                whileHover={{ y: -6 }}
                className="bg-white border-2 border-[#E7DCD2] hover:border-[#C7A36A] rounded-sm shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Card Thumbnail Container */}
                <div
                  className="w-full aspect-[210/280] bg-[#FAF6EF] border-b border-[#E7DCD2] relative overflow-hidden cursor-pointer"
                  onClick={() => onSelectPreview(template)}
                >
                  <div className="w-[150%] transform scale-[0.55] origin-top-left pointer-events-none select-none p-2 group-hover:scale-[0.57] transition-transform duration-300">
                    <DocumentRenderer
                      data={getSampleDataForTemplate(template.id)}
                      isThumbnail={true}
                    />
                  </div>
                  {/* Hover overlay with button */}
                  <div className="absolute inset-0 bg-[#310914]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="px-4 py-2 bg-[#4B1020] text-white text-xs font-semibold tracking-wider uppercase rounded-sm flex items-center gap-1.5 shadow-md border border-[#C7A36A]">
                      <Eye className="w-3.5 h-3.5 text-[#C7A36A]" /> Preview Template
                    </span>
                  </div>

                  {/* Top Badge on card */}
                  <div className="absolute top-2 left-2 bg-[#4B1020]/90 text-white text-[10px] font-sans font-semibold px-2 py-0.5 rounded-xs tracking-wider uppercase border border-[#C7A36A]/50">
                    Design {template.number}
                  </div>
                </div>

                {/* Card Meta & Actions */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#786B6B] mb-1 font-sans">
                      <span className="font-semibold text-[#C7A36A]">Design {template.number}</span>
                      <span className="bg-[#FAF6EF] px-1.5 py-0.5 text-[11px] font-medium border border-[#E7DCD2] text-[#4B1020]">{template.category.join(' · ')}</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#4B1020] group-hover:text-[#671C32] transition-colors">
                      {template.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#786B6B] line-clamp-2 leading-relaxed font-sans">
                      {template.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-2 border-t border-[#F1E8DC]">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleCreateWithTemplate(template.id)}
                      className="flex-1 px-3 py-2.5 text-xs font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#310914]" />
                      <span>Create Biodata</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => onSelectPreview(template)}
                      className="px-3 py-2.5 text-xs font-medium text-[#4B1020] hover:bg-[#FAF6EF] rounded-sm border border-[#E7DCD2] hover:border-[#4B1020]/40 transition-colors cursor-pointer bg-white"
                    >
                      Preview
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

