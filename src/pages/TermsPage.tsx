import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF6EF] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B1020] hover:text-[#671C32] mb-8 font-sans transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to MW Bio Gallery</span>
        </Link>

        <div className="bg-white border border-[#E7DCD2] p-8 sm:p-12 rounded-sm shadow-sm space-y-8">
          <div className="border-b border-[#F1E8DC] pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF6EF] border border-[#E7DCD2] text-xs font-sans uppercase tracking-wider text-[#671C32] font-semibold mb-2">
              <FileText className="w-3.5 h-3.5 text-[#C7A36A]" />
              <span>Standard User Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B1020]">
              Terms of Use
            </h1>
            <p className="text-xs text-[#786B6B] mt-2 font-sans">
              Last Updated: March 2026 · MW Bio Gallery
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#292122] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-serif font-bold text-[#4B1020]">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using MW Bio Gallery, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our website.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif font-bold text-[#4B1020]">
                2. Nature of Service
              </h2>
              <p>
                MW Bio Gallery provides an online design and formatting tool for creating personal marriage biodatas. We are not a matchmaking, matrimonial agency, or background verification service. We make no claims or warranties regarding matrimonial matches, prospective candidates, or outcomes resulting from the exchange of biodatas created with our tool.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif font-bold text-[#4B1020]">
                3. User Accuracy and Responsibility
              </h2>
              <p>
                Users are solely responsible for ensuring the accuracy, truthfulness, and appropriateness of the information entered into their biodata. MW Bio Gallery does not review, verify, or validate user-entered information.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif font-bold text-[#4B1020]">
                4. Intellectual Property
              </h2>
              <p>
                All template layouts, typographic compositions, branding elements, and visual artwork are the proprietary property of MW Bio Gallery and MW Art Gallery. You are granted a personal, non-exclusive license to generate and print your individual marriage biodata. Reproduction, redistribution, or commercial resale of the underlying templates or digital software is strictly prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-serif font-bold text-[#4B1020]">
                5. Jurisdiction
              </h2>
              <p>
                These terms are governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Pune, Maharashtra, India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
