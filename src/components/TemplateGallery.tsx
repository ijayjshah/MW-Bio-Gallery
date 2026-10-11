import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEMPLATE_REGISTRY } from '../templates/templateRegistry';
import { TemplateDefinition, TemplateCategory } from '../templates/templateTypes';
import { DocumentRenderer } from '../templates/DocumentRenderer';
import { sampleBiodataData } from '../features/biodata/biodataDefaults';
import { Eye, ArrowRight } from 'lucide-react';

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
    <section id="templates" className="py-16 sm:py-24 bg-[#F1E8DC]/40 border-b border-[#E7DCD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C7A36A] font-sans font-bold block mb-2">
            The Complete Archive
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#4B1020] tracking-tight">
            Every Story Has Its Own Style
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#786B6B]">
            Filter through our catalog to find the exact tone, aesthetic, and format for your family.
          </p>

          {/* Interactive Filter Tabs (Functional segmented buttons per design constitution) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#4B1020] text-[#FAF6EF] shadow-sm'
                    : 'bg-white text-[#786B6B] hover:text-[#292122] hover:bg-[#FAF6EF] border border-[#E7DCD2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white border border-[#E7DCD2] rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Thumbnail Container */}
              <div
                className="w-full aspect-[210/280] bg-[#FAF6EF] border-b border-[#E7DCD2] relative overflow-hidden cursor-pointer"
                onClick={() => onSelectPreview(template)}
              >
                <div className="w-[150%] transform scale-[0.55] origin-top-left pointer-events-none select-none p-2">
                  <DocumentRenderer
                    data={{ ...sampleBiodataData, templateId: template.id }}
                    isThumbnail={true}
                  />
                </div>
                {/* Hover overlay with button */}
                <div className="absolute inset-0 bg-[#310914]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-[#4B1020] text-white text-xs font-semibold tracking-wider uppercase rounded-sm flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5" /> Preview Template
                  </span>
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#786B6B] mb-1 font-sans">
                    <span className="font-semibold text-[#C7A36A]">Design {template.number}</span>
                    <span>{template.category.join(' · ')}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#4B1020] group-hover:text-[#671C32] transition-colors">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#786B6B] line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2 border-t border-[#F1E8DC]">
                  <button
                    onClick={() => handleCreateWithTemplate(template.id)}
                    className="flex-1 px-3 py-2 text-xs font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] rounded-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Create Biodata</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectPreview(template)}
                    className="px-3 py-2 text-xs font-medium text-[#4B1020] hover:bg-[#FAF6EF] rounded-sm border border-[#E7DCD2] transition-colors"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
