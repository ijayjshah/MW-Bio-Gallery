import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { TemplateDefinition } from '../templates/templateTypes';
import { DocumentRenderer } from '../templates/DocumentRenderer';
import { getSampleDataForTemplate, sampleBiodataData } from '../features/biodata/biodataDefaults';
import { X, Check, Sparkles } from 'lucide-react';

interface TemplatePreviewModalProps {
  template: TemplateDefinition | null;
  onClose: () => void;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleUseTemplate = () => {
    if (!template) return;
    navigate(`/create-biodata?template=${template.id}`);
  };

  const previewData = template
    ? getSampleDataForTemplate(template.id)
    : sampleBiodataData;

  return (
    <AnimatePresence>
      {template && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop with fade animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs"
          />

          {/* Modal Card with scale and fade animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-[#FAF6EF] w-full max-w-4xl rounded-sm shadow-2xl border border-[#C7A36A]/60 overflow-hidden my-8 z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#4B1020] text-[#FAF6EF] border-b border-[#310914]">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C7A36A] font-bold block">
                  Template Preview
                </span>
                <h3 className="text-xl font-serif font-bold text-[#FAF6EF]">
                  {template.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#FAF6EF]/80 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start justify-between pb-4 border-b border-[#E7DCD2]">
                <div>
                  <p className="text-sm text-[#786B6B] max-w-xl">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {template.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-[#4B1020] flex items-center gap-1 font-medium"
                      >
                        <Check className="w-3 h-3 text-[#C7A36A]" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleUseTemplate}
                  className="px-6 py-2.5 text-sm font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] active:scale-[0.98] rounded-sm transition-all shadow-md shrink-0 whitespace-nowrap"
                >
                  Create With This Template
                </button>
              </div>

              {/* Full preview container */}
              <div className="p-4 sm:p-8 bg-[#F1E8DC]/40 border border-[#E7DCD2] rounded-sm flex justify-center">
                <div className="w-full max-w-[650px] shadow-lg">
                  <DocumentRenderer data={previewData} isThumbnail={false} />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#F1E8DC] border-t border-[#E7DCD2] flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-[#786B6B] hover:text-[#292122] transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleUseTemplate}
                className="px-6 py-2 text-sm font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] active:scale-[0.98] rounded-sm transition-all shadow-xs"
              >
                Use {template.name}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
