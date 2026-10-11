import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Share Your Details',
      description: 'Add the personal, educational, professional, and family details you want to include. Every section is flexible, and optional details can be hidden anytime.',
    },
    {
      number: '02',
      title: 'Choose Your Design',
      description: 'Explore our collection of 12 handcrafted stationery templates. Switch designs instantly in the live builder without losing a single line of your information.',
    },
    {
      number: '03',
      title: 'Download and Share',
      description: 'Preview your biodata in real-time, print directly to high-resolution A4 PDF, or share seamlessly with prospective families and matchmakers.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#FAF6EF] border-b border-[#E7DCD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C7A36A] font-sans font-bold block mb-2">
            Effortless Creation
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#4B1020] tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#786B6B]">
            Three intuitive steps from blank slate to a beautifully finished matrimonial profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="bg-white p-8 border border-[#E7DCD2] rounded-sm shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl sm:text-5xl font-serif font-bold text-[#C7A36A]/60 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-serif font-bold text-[#4B1020] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#786B6B] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F1E8DC] text-xs text-[#C7A36A] font-semibold tracking-wider uppercase font-sans">
                Step {idx + 1} of 3
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/create-biodata"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#310914] bg-[#C7A36A] hover:bg-[#e0b979] active:scale-[0.98] rounded-sm transition-all shadow-md"
          >
            <span>Start Creating Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
