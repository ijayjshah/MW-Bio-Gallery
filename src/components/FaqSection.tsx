import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'What is a marriage biodata?',
      answer:
        'A marriage biodata is a structured summary of personal, educational, professional, and family background commonly exchanged among Indian families during matrimonial discussions. It presents your vital information elegantly and respectfully to prospective partners and their families.',
    },
    {
      question: 'How can I create my marriage biodata?',
      answer:
        'Simply click "Create My Biodata", choose an aesthetic design template from our curated collection, and fill out our guided 6-step form. A live preview updates in real-time on your screen so you can inspect how your biodata looks before printing or saving.',
    },
    {
      question: 'Can I customize the design?',
      answer:
        'Yes. You can switch between all 12 distinct stationery templates at any time without losing any of your entered information. You can also toggle the visibility of specific fields such as income, company name, grandparents, siblings, or partner expectations.',
    },
    {
      question: 'Can I include my parents and grandparents?',
      answer:
        'Absolutely. You can include father, mother, paternal grandfather, paternal grandmother, maternal grandfather, and maternal grandmother details. If you prefer not to display grandparents, you can toggle them off with one click.',
    },
    {
      question: 'Can I add multiple brothers and sisters?',
      answer:
        'Yes. Our family section allows you to select Brother, Sister, Both, or No Siblings. You can add any number of brothers and sisters with their respective ages, occupations, and marital statuses using the "Add Another" button.',
    },
    {
      question: 'Can I leave some details blank?',
      answer:
        'Yes. Sensitive fields like annual income, partner expectations, caste, or grandparents are completely optional. Any field left blank is automatically suppressed so no awkward empty labels or blank spaces appear on your final biodata.',
    },
    {
      question: 'Can I download or print my biodata?',
      answer:
        'Yes. When you click "Print / Save PDF", the system formats the document to standard A4 portrait layout with dedicated print styling. In your browser’s print dialog, simply select "Save as PDF" to download a crisp, high-resolution document ready to email or WhatsApp.',
    },
    {
      question: 'Can I upload my own photograph?',
      answer:
        'Yes. You can upload a portrait photo directly from your device. If you choose not to upload a photo, the template will gracefully display a personalized monogram crest with your initials or a neutral decorative frame.',
    },
    {
      question: 'Do I need to create an account?',
      answer:
        'No account or login is required. You can start creating immediately without passwords, emails, or sign-up walls.',
    },
    {
      question: 'Is my biodata stored online?',
      answer:
        'No. For complete privacy and peace of mind, your personal information remains strictly in your own browser session. We do not store, index, or transmit your confidential matrimonial details to any remote database.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF6EF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C7A36A] font-sans font-bold block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B1020] tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="mt-3 text-sm text-[#786B6B]">
            Clear, honest answers about creating, customizing, and printing your marriage biodata.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={idx * 60}
                duration={550}
              >
                <div
                  className={`bg-white border rounded-sm transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-[#C7A36A] shadow-xs' : 'border-[#E7DCD2] hover:border-[#C7A36A]/60'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full py-4 px-6 text-left flex justify-between items-center gap-4 hover:bg-[#FAF6EF]/50 transition-colors focus:outline-hidden"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif font-medium text-base sm:text-lg text-[#4B1020]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C7A36A] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 text-sm text-[#786B6B] leading-relaxed border-t border-[#F1E8DC] animate-slide-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
