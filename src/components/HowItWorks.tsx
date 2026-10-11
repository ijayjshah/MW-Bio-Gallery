import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, FileEdit, Palette, Download, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: FileEdit,
      title: 'Share Your Details',
      description: 'Add your personal, astrological/horoscope, educational, career, and family details. Every section is flexible, and optional fields can be toggled in or out anytime.',
    },
    {
      number: '02',
      icon: Palette,
      title: 'Choose Your Royal Design',
      description: 'Explore our curated catalog of 12 handcrafted Indian wedding stationery templates. Switch templates instantly in the live builder without losing your entered data.',
    },
    {
      number: '03',
      icon: Download,
      title: 'Download & Share High-Res PDF',
      description: 'Preview your biodata in real time, customize your auspicious God name at the header, and print or export directly to clean, print-perfect A4 PDF.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#FAF6EF] border-b border-[#E7DCD2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C7A36A] font-sans font-bold block mb-1">
            Effortless Creation
          </span>
          <div className="font-marcellus text-base sm:text-xl text-[#C7A36A] tracking-[0.16em] uppercase select-none mb-2 font-medium">
            ✦ Three Simple & Joyful Steps ✦
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#4B1020] tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#786B6B] font-sans">
            Three intuitive steps from blank slate to a beautifully finished matrimonial profile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="bg-white p-8 border-2 border-[#E7DCD2] hover:border-[#C7A36A] rounded-sm shadow-xs hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl sm:text-5xl font-serif font-bold text-[#C7A36A]/50 group-hover:text-[#C7A36A] transition-colors">
                      {step.number}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#FAF6EF] border border-[#C7A36A]/40 flex items-center justify-center text-[#4B1020] group-hover:bg-[#4B1020] group-hover:text-[#FAF6EF] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#4B1020] mb-3 group-hover:text-[#671C32] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#786B6B] leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F1E8DC] text-xs text-[#C7A36A] font-semibold tracking-wider uppercase font-sans flex items-center justify-between">
                  <span>Step {idx + 1} of 3</span>
                  <span className="text-[#C7A36A]">✦</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            to="/create-biodata"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] active:scale-[0.98] rounded-sm transition-all shadow-md hover:shadow-xl group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#310914]" />
            <span>Start Creating Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
